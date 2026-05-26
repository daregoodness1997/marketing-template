import { type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const projectLocales = [
  "cs",
  "en",
  "fr",
  "es",
  "pt",
  "sw",
  "yo",
  "ha",
  "ja",
  "zh",
] as const;
type ConfigInternationalization = NonNullable<
  IntlayerConfig["internationalization"]
>;

const typedProjectLocales =
  projectLocales as unknown as ConfigInternationalization["locales"];

const aiProvider: IntlayerConfig["ai"] = process.env.ANTHROPIC_API_KEY
  ? {
      provider: "anthropic",
      model: "claude-sonnet-4-20250514",
      apiKey: process.env.ANTHROPIC_API_KEY,
    }
  : process.env.GOOGLE_API_KEY
    ? {
        provider: "gemini",
        model: "gemini-2.0-flash",
        apiKey: process.env.GOOGLE_API_KEY,
      }
    : {
        provider: "openai",
        model: "gpt-4o-mini",
        apiKey: process.env.OPENAI_API_KEY,
      };

const config: IntlayerConfig = {
  internationalization: {
    locales: typedProjectLocales,
    defaultLocale: "cs",
  },
  ai: aiProvider,
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale }) => `./src/messages/${locale}.json`,
    }),
  ],
};

export default config;
