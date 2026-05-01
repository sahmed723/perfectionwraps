-- Perfection Wraps lead pipeline
-- Apply via: supabase db push

create extension if not exists pg_cron;
create extension if not exists pgcrypto;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  service_slug text not null,
  city_slug text,
  vehicle text,
  notes text,
  source text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'opted_out')),
  won_at timestamptz,
  review_requested_at timestamptz,
  review_followup_at timestamptz,
  opted_out_at timestamptz,
  consent_sms boolean not null default false
);

create index if not exists leads_status_won_idx on leads (status, won_at);
create index if not exists leads_created_idx on leads (created_at desc);
create index if not exists leads_phone_idx on leads (phone);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references leads(id) on delete set null,
  external_id text unique,
  starts_at timestamptz not null,
  ends_at timestamptz,
  service_slug text,
  status text not null default 'booked'
    check (status in ('booked', 'completed', 'no_show', 'cancelled')),
  notes text
);

create index if not exists appointments_starts_idx on appointments (starts_at);

create table if not exists review_cache (
  id bigserial primary key,
  fetched_at timestamptz not null default now(),
  place_id text not null,
  rating numeric,
  review_count int,
  payload jsonb not null
);

create index if not exists review_cache_place_idx on review_cache (place_id, fetched_at desc);

create table if not exists sms_log (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  lead_id uuid references leads(id) on delete set null,
  direction text not null check (direction in ('out', 'in')),
  to_number text,
  from_number text,
  body text,
  twilio_sid text,
  status text
);

create index if not exists sms_log_lead_idx on sms_log (lead_id, created_at desc);

-- Review request: 48h after won, no review yet
-- Owner must wire pg_cron permissions in Supabase dashboard before this fires.
do $$
begin
  if not exists (
    select 1 from cron.job where jobname = 'pw_review_request'
  ) then
    perform cron.schedule(
      'pw_review_request',
      '*/15 * * * *',
      $cron$
        select net.http_post(
          url := current_setting('app.settings.review_dispatch_url', true),
          headers := jsonb_build_object('content-type', 'application/json'),
          body := jsonb_build_object(
            'leads',
            (
              select coalesce(jsonb_agg(jsonb_build_object('id', id, 'name', name, 'phone', phone)), '[]'::jsonb)
              from leads
              where status = 'won'
                and won_at is not null
                and won_at < now() - interval '48 hours'
                and review_requested_at is null
                and consent_sms = true
                and opted_out_at is null
              limit 25
            )
          )
        );
      $cron$
    );
  end if;
end$$;
