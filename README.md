# Nexraft

Engineering studio site — Next.js App Router, Tailwind, Stripe hosted billing, Supabase.

## Stripe billing (test mode)

Billing uses **Stripe Checkout** (subscribe) and the **Stripe Customer Portal** (manage cards, invoices, cancel). No card data is collected on this site.

### Environment variables

Add these to `.env.local` (development) and your hosting provider (Vercel):

| Variable | Where | Purpose |
|----------|--------|---------|
| `STRIPE_SECRET_KEY` | Server only | Stripe API secret (`sk_test_...` in test mode) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser | Publishable key (`pk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Server only | Webhook signing secret (`whsec_...`) |
| `STRIPE_PRICE_STARTER` | Server only | Price ID for Web Starter retainer |
| `STRIPE_PRICE_GROWTH` | Server only | Price ID for Web Growth retainer |
| `STRIPE_PRICE_BUILD` | Server only | Price ID for Web Build retainer |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser | Supabase publishable key (`sb_publishable_...` or `eyJ...` anon key) |
| `SUPABASE_SECRET_KEY` | Server only | Supabase secret key (`sb_secret_...` or service role) — bypasses RLS for webhooks |
| `NEXT_PUBLIC_SITE_URL` | Browser + server | Canonical site URL (e.g. `http://localhost:3000` or `https://nexraft.com`) |

`SUPABASE_SERVICE_ROLE_KEY` is still accepted as a fallback for `SUPABASE_SECRET_KEY`.

### Supabase schema

Run in the Supabase SQL editor (or via CLI):

1. `supabase/migrations/002_subscriptions.sql` — **required** (`subscriptions` table)
2. `supabase/migrations/001_stripe_billing.sql` — optional legacy tables (not used by current code)

### Local webhook testing

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the signing secret into `STRIPE_WEBHOOK_SECRET`, then restart the dev server.

### Going live

1. Create matching **live** Products and Prices in the Stripe Dashboard.
2. Replace test keys with live keys (`sk_live_...`, `pk_live_...`).
3. Update price IDs to live `price_...` values.
4. Register the production webhook endpoint: `https://nexraft.com/api/stripe/webhook`
5. Set `NEXT_PUBLIC_SITE_URL` to your production domain.

Keep test and live webhook secrets separate per environment.
