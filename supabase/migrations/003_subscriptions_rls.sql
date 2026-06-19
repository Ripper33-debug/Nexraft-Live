-- Row-level security for subscriptions (service role bypasses RLS in app code)

alter table public.subscriptions enable row level security;

-- Block anon and authenticated API access. Server webhooks use SUPABASE_SECRET_KEY.
create policy "subscriptions_deny_anon"
  on public.subscriptions
  for all
  to anon
  using (false)
  with check (false);

create policy "subscriptions_deny_authenticated"
  on public.subscriptions
  for all
  to authenticated
  using (false)
  with check (false);
