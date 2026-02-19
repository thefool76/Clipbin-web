-- Temporary table for collecting testing signups from the homepage form.
create table if not exists public.testing_emails (
  id bigint generated always as identity primary key,
  email text not null,
  source text not null default 'website_home',
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists testing_emails_email_lower_unique
  on public.testing_emails (lower(email));

alter table public.testing_emails enable row level security;

grant insert on table public.testing_emails to anon, authenticated;

drop policy if exists "allow_public_testing_email_insert" on public.testing_emails;
create policy "allow_public_testing_email_insert"
  on public.testing_emails
  for insert
  to anon, authenticated
  with check (email is not null and length(email) <= 320);
