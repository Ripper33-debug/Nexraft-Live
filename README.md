# Nexraft

Engineering studio site � Next.js App Router, Tailwind, Stripe hosted billing, Supabase.

## Stripe billing (test mode)

Billing uses **Stripe Checkout** (subscribe) and the **Stripe Customer Portal** (manage cards, invoices, cancel). No card data is collected on this site.

### Environment variables

Add these to `.env.local` (development) and your hosting provider (Vercel):

| Variable | Where | Purpose |
|----------|--------|---------|
| `STRIPE_SECRET_KEY` | Server only | Stripe API secret (`sk_test_...` in test mode) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser | Publishable key (`pk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Server only | Webhook signing secret (`whsec_...`) |
| `STRIPE_PRICE_CARE_150` | Server only | Care retainer $150/mo |
| `STRIPE_PRICE_CARE_275` | Server only | Care retainer $275/mo |
| `STRIPE_PRICE_CARE_400` | Server only | Care retainer $400/mo |
| `STRIPE_PRICE_GROWTH_750` | Server only | Growth retainer $750/mo |
| `STRIPE_PRICE_GROWTH_1125` | Server only | Growth retainer $1,125/mo |
| `STRIPE_PRICE_GROWTH_1500` | Server only | Growth retainer $1,500/mo |
| `STRIPE_PRICE_BUILD_3000` | Server only | Build one-time $3,000 |
| `STRIPE_PRICE_BUILD_4500` | Server only | Build one-time $4,500 |
| `STRIPE_PRICE_BUILD_6000` | Server only | Build one-time $6,000 |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser | Supabase publishable key (`sb_publishable_...` or `eyJ...` anon key) |
| `SUPABASE_SECRET_KEY` | Server only | Supabase secret key (`sb_secret_...` or service role) � bypasses RLS for webhooks |
| `NEXT_PUBLIC_SITE_URL` | Browser + server | Canonical site URL (e.g. `http://localhost:3000` or `https://nexraft.com`) |
| `NEXT_PUBLIC_BOOKING_URL` | Browser | Cal.com or Calendly link for pricing and hero "Book a call" CTAs |
| `FORMSPREE_FORM_ID` | Server only | Formspree form ID for homepage contact inquiries |
| `UPSTASH_REDIS_REST_URL` | Server only | Upstash Redis REST URL (rate limits + portal tokens). Vercel KV uses `KV_REST_API_URL` as an alias. |
| `UPSTASH_REDIS_REST_TOKEN` | Server only | Upstash Redis REST token. Vercel KV uses `KV_REST_API_TOKEN` as an alias. |
| `RESEND_API_KEY` | Server only | Resend API key for billing portal magic links |
| `RESEND_FROM_EMAIL` | Server only | Verified sender, e.g. `Nexraft <barry@nexraft.com>` |

`SUPABASE_SERVICE_ROLE_KEY` is still accepted as a fallback for `SUPABASE_SECRET_KEY`.

### Contact form (Formspree)

Submissions email **barry@nexraft.com** and **alex@nexraft.com** via [Formspree](https://formspree.io).

**Setup**

1. Sign in at [formspree.io](https://formspree.io) and create a new form (e.g. "Nexraft inquiries").
2. Under **Settings ? Email**, set the notification address to `barry@nexraft.com`. Add `alex@nexraft.com` as an additional recipient (Business plan) or forward from Barry's inbox.
3. Copy the form ID from the form endpoint: `https://formspree.io/f/YOUR_FORM_ID` ? use `YOUR_FORM_ID`.
4. Add to `.env.local` and Vercel Production:

   ```bash
   FORMSPREE_FORM_ID=your_form_id
   ```

5. Restart the dev server (or redeploy). Submit a test inquiry on the homepage contact form.

If `FORMSPREE_FORM_ID` is missing, the form shows an error and visitors can email barry@nexraft.com or alex@nexraft.com directly.

### Supabase schema

Run in the Supabase SQL editor (or via CLI):

1. `supabase/migrations/002_subscriptions.sql` - **required** (`subscriptions` table)
2. `supabase/migrations/003_subscriptions_rls.sql` - **required** (deny public access; service role only)
3. `supabase/migrations/001_stripe_billing.sql` - optional legacy tables (not used by current code)

### Billing portal security

The `/pay` billing portal uses a **magic link** flow:

1. Client enters their checkout email.
2. Server stores a one-time token in Redis and emails a link via Resend.
3. The link opens Stripe Customer Portal and expires in 15 minutes.

Requires `UPSTASH_REDIS_REST_*` (or Vercel KV) and `RESEND_API_KEY` in production.

### Stripe products (test mode)

Create all products and prices in one step:

```bash
STRIPE_SECRET_KEY=sk_test_... npm run stripe:sync
```

Copy the printed `STRIPE_PRICE_*` lines into `.env.local` and Vercel, then restart the dev server.

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
