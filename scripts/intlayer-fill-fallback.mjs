import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

function parseDotEnv(content) {
  const vars = {};

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    vars[key] = value;
  }

  return vars;
}

function hasArg(args, name) {
  return args.some((arg) => arg === name || arg.startsWith(`${name}=`));
}

function runFill(provider, args, env, label) {
  const cmd = process.platform === "win32" ? "npx.cmd" : "npx";
  const fullArgs = ["intlayer", "fill", "--provider", provider, ...args];

  console.log(`\n[intlayer-fallback] Trying ${label}...`);

  const result = spawnSync(cmd, fullArgs, {
    stdio: "inherit",
    env,
  });

  if (result.error) {
    console.error(
      `[intlayer-fallback] Failed to start ${label}:`,
      result.error.message,
    );
    return 1;
  }

  return result.status ?? 1;
}

const projectRoot = process.cwd();
const envFile = resolve(projectRoot, ".env.local");
const envFromFile = existsSync(envFile)
  ? parseDotEnv(readFileSync(envFile, "utf8"))
  : {};

const googleKey =
  process.env.GOOGLE_API_KEY || envFromFile.GOOGLE_API_KEY || "";
const openAiKey =
  process.env.OPENAI_API_KEY || envFromFile.OPENAI_API_KEY || "";

const userArgs = process.argv.slice(2);
const baseArgs = [...userArgs];

if (!hasArg(baseArgs, "--env-file") && existsSync(envFile)) {
  baseArgs.unshift("--env-file", envFile);
}

if (!googleKey && !openAiKey) {
  console.error(
    "[intlayer-fallback] No GOOGLE_API_KEY or OPENAI_API_KEY found in process env or .env.local.",
  );
  process.exit(1);
}

const attempts = [];
if (googleKey) attempts.push({ provider: "gemini", label: "Google Gemini" });
if (openAiKey) attempts.push({ provider: "openai", label: "OpenAI" });

let lastStatus = 1;
for (const attempt of attempts) {
  const env = {
    ...process.env,
    GOOGLE_API_KEY: googleKey,
    OPENAI_API_KEY: openAiKey,
  };

  const status = runFill(attempt.provider, baseArgs, env, attempt.label);
  lastStatus = status;

  if (status === 0) {
    console.log(`[intlayer-fallback] Success with ${attempt.label}.`);
    process.exit(0);
  }

  console.warn(
    `[intlayer-fallback] ${attempt.label} failed with exit code ${status}.`,
  );
}

console.error("[intlayer-fallback] All providers failed.");
process.exit(lastStatus);
