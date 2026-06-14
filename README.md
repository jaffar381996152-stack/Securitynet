# SecurityNet (XN Presale)

SecurityNet is an AI-powered surveillance and security platform. This repo is
its marketing site and presale dApp for **XN**, the BEP-20 utility token that
powers the SecurityNet ecosystem on BNB Smart Chain — wallet connection,
USDT → XN purchases (BSC/ETH/TRON), on-chain payment verification, automated
token distribution, a blog/news CMS, and the public marketing pages.

Built with Next.js 16 (App Router), React 19, MongoDB Atlas, Reown AppKit
(wallet connect), Moralis (chain indexing/webhooks), ethers.js, and NextAuth.

## Local development

```bash
npm install
cp .env.production.template .env.local   # then fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app auto-reloads as
you edit files under `src/`.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve a production build locally
npm run lint    # ESLint (next/core-web-vitals ruleset)
```

## Environment variables

**`.env.production.template` is the source of truth for every variable the
app needs** — copy it to `.env.local` for local development and provide real
values in your hosting provider's environment settings for production. Never
commit a file containing real secrets (`.env.local` and `.env*.local` are
already gitignored).

A few notes worth calling out:

- `OWNER_PRIVATE_KEY` is a wallet secret (it signs XN token transfers) that
  should **only** ever be set at the production level (e.g. AWS Amplify →
  Environment variables) — never in a local `.env` file.
- `NEXT_PUBLIC_DEPOSIT_WALLET_BSC` / `_ETH` / `_TRON` are the public deposit
  addresses where buyers send USDT. They're a single source of truth — shown on
  the buy page **and** watched by the server for incoming payments — so set just
  these three (they are public addresses, not secrets).
- `MONGODB_URI` / `MONGODB_DB` point at the MongoDB Atlas cluster used for
  blog posts, presale purchase records, and auth.
- `NEXT_PUBLIC_PRESALE_END_DATE` drives the presale countdown — set it to the
  real end date before launch (it falls back to a placeholder date otherwise).
- Admin-only API routes (`/api/posts`, dashboard, etc.) are gated by
  `requireAdmin()`, which checks for an authenticated session with an
  `"admin"` role — not a shared secret.
- `ADMIN_SECRET` is a one-time setup credential used only by
  `/api/setup-stream` to register the Moralis webhook stream.

## Deployment

This project deploys to **AWS Amplify** — see [`amplify.yml`](amplify.yml) for
the build spec (`npm ci` → `npm run build`, artifacts from `.next`). Set all
required environment variables in the Amplify console before deploying; the
app will build but core features (wallet purchases, email, blog) will be
degraded or disabled without them.

## Project structure

- `src/app/` — Next.js App Router routes, grouped by `(auth)`, `(main)`, and
  `(dashboard)` route groups, plus `api/` route handlers
- `src/components/` — shared UI: brand assets, animation primitives
  (glassmorphism cards, magnetic buttons, neural-orb visuals, etc.)
- `src/app/libs/` — server-side helpers (`mongodb`, `auth`, `rateLimit`,
  `validators`, `requireAdmin`, `sanitizePostContent`, `seo`)
- `src/utils/` — legacy config/model helpers still in active use
