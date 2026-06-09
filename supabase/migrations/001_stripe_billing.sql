-- Stripe billing tables for Nexraft webhook sync

create table if not exists public.stripe_customers (
  id uuid primary key default gen_random_uuid(),
  stripe_customer_id text not null unique,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_subscriptions (
  id uuid primary key default gen_random_uuid(),
  stripe_subscription_id text not null unique,
  stripe_customer_id text not null references public.stripe_customers (stripe_customer_id) on delete cascade,
  stripe_price_id text,
  status text not null,
  plan_key text,
  current_period_end timestamptz,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists stripe_customers_email_idx
  on public.stripe_customers (lower(email));

create index if not exists stripe_subscriptions_customer_idx
  on public.stripe_subscriptions (stripe_customer_id);

create index if not exists stripe_subscriptions_status_idx
  on public.stripe_subscriptions (status);
