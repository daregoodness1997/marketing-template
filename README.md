# Marketing Template

Reusable Next.js marketing website template with i18n, GDPR consent, GTM, and static export.

## Stack

- **Next.js 16** — Static export (`output: "export"`)
- **Tailwind CSS 4.1** — `@theme` design tokens in `globals.css`
- **next-intl 4** — Czech (default) + English, `localePrefix: "as-needed"`
- **Motion** — Scroll-triggered section animations
- **React Hook Form + Zod** — Contact form with server-validated schema
- **GTM Consent Mode v2** — GDPR-compliant analytics with granular categories

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Fill in .env.local with your values

# 4. Start dev server
npm run dev

# 5. Build static export
npm run build
```

The static output lands in `out/`.

## Customization Checklist

### Branding
- [ ] Replace colors in `src/app/globals.css` (search `CHANGE THESE PER PROJECT`)
- [ ] Update `Logo.tsx` props or swap in your SVG
- [ ] Replace `public/manifest.webmanifest` icons and metadata

### Content
- [ ] Edit `src/messages/en.json` and `src/messages/cs.json` with your copy
- [ ] Update FAQ questions, feature descriptions, audience groups
- [ ] Replace hero stats / demo metrics

### SEO & Analytics
- [ ] Set `NEXT_PUBLIC_SITE_URL` in `.env.local`
- [ ] Set `NEXT_PUBLIC_GTM_ID` for Google Tag Manager
- [ ] Update `SITE_NAME`, `SITE_URL`, and structured data in `src/lib/seo.tsx`
- [ ] Update OG image path in `generatePageMetadata()`

### Contact Form
- [ ] Set `NEXT_PUBLIC_CONTACT_API_URL` to your form endpoint
- [ ] Adjust Zod schema in `src/lib/schemas/contact.ts` if needed

### Deployment
- [ ] `web.config` is included for IIS/Azure — remove if deploying elsewhere

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens + global styles
│   ├── layout.tsx           # Root layout (redirect-only)
│   ├── page.tsx             # Root page (locale redirect)
│   ├── not-found.tsx        # 404 page
│   ├── robots.ts            # robots.txt
│   ├── sitemap.ts           # sitemap.xml
│   └── [locale]/
│       ├── layout.tsx       # Locale layout (fonts, GTM, providers)
│       └── page.tsx         # Home page (sections + structured data)
├── components/
│   ├── layout/              # Header, Footer, CookieBanner, etc.
│   ├── sections/            # Hero, Features, Audience, FAQ, etc.
│   └── ui/                  # Button, Card, Input, Alert, etc.
├── i18n/                    # next-intl routing + config
├── lib/                     # Utilities, analytics, consent, SEO
│   ├── schemas/             # Zod validation schemas
│   └── services/            # API service functions
└── messages/
    ├── cs.json              # Czech translations
    └── en.json              # English translations
```

## Adding a New Locale

1. Add the locale code to `src/i18n/routing.ts` → `locales` array
2. Create `src/messages/<locale>.json` (copy from `en.json`)
3. Add alternate URLs in `src/app/sitemap.ts`
4. Update `not-found.tsx` copy object

## Adding a New Section

1. Create component in `src/components/sections/NewSection.tsx`
2. Add translation keys to both `cs.json` and `en.json`
3. Import in `src/app/[locale]/page.tsx` (use `dynamic()` for below-fold)
