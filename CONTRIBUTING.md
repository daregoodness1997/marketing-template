# Contributing Guide

Thanks for contributing to this project.

## Prerequisites

- Node.js 20+
- npm 10+

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy and configure environment variables:

```bash
cp .env.example .env.local
```

3. Start development server:

```bash
npm run dev
```

## Project Basics

- Framework: Next.js 16
- Styling: Tailwind CSS 4
- i18n: next-intl + next-intlayer
- Translation sync: Intlayer + @intlayer/sync-json-plugin
- Validation: Zod

## Intlayer Contributor Notes

- Intlayer configuration is in `intlayer.config.ts`.
- Locale message files are loaded from `src/messages/<locale>.json`.
- Keep `src/messages/cs.json` and `src/messages/en.json` aligned when adding or renaming keys.
- Run development with Intlayer watch enabled via `npm run dev`.

If you use AI-assisted Intlayer workflows locally, set one of these environment variables:

- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`
- `OPENAI_API_KEY`

## Development Workflow

1. Create a feature branch from `master`.
2. Make focused, minimal changes.
3. Keep translation files in sync when adding or renaming UI copy:
   - `src/messages/cs.json`
   - `src/messages/en.json`
4. If you add a locale, also update `internationalization.locales` in `intlayer.config.ts`.
5. Run checks before committing:

```bash
npm run lint
npm run typecheck
npm run build
```

## Code Standards

- Use TypeScript for all app code.
- Keep components small and reusable.
- Prefer existing utilities in `src/lib` and UI primitives in `src/components/ui`.
- Do not introduce breaking API or route changes without documenting them.

## Commit Guidelines

- Use clear, imperative commit messages.
- Keep each commit scoped to a single purpose.
- Example:

```text
feat(blog): add localized blog listing section
```

## Pull Request Guidelines

Include the following in your PR:

- Summary of what changed
- Why the change is needed
- Screenshots for UI changes (desktop and mobile)
- Notes on i18n, analytics, SEO, or consent impacts if relevant
- Verification steps and command output summary

## Notes on Static Export

This project uses static export. Confirm export compatibility for any new feature, especially dynamic routes and data fetching behavior.
