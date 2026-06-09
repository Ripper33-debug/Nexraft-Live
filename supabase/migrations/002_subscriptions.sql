-- Single subscriptions table for Stripe webhook sync (run after 001 or standalone)

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  email text,
  plan text,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_customer_idx
  on public.subscriptions (stripe_customer_id);

create index if not exists subscriptions_email_idx
  on public.subscriptions (lower(email));

create index if not exists subscriptions_status_idx
  on public.subscriptions (status);
