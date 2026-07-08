-- Inserate: konkrete Gesuche/Angebote ("Suche Mittwoch einen vierten Mann zum Padel spielen in Koblenz")
-- Werden im "Anbieten"-Modus erstellt und im "Suchen"-Modus von anderen Nutzern gefunden.

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  hobby_id uuid references public.hobbies (id) on delete set null,
  title text not null check (char_length(title) between 3 and 140),
  description text check (description is null or char_length(description) <= 1000),
  city text not null,
  lat double precision,
  lng double precision,
  event_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_listings_author on public.listings (author_id);
create index if not exists idx_listings_hobby on public.listings (hobby_id);

alter table public.listings enable row level security;

create policy "Inserate sind für eingeloggte Nutzer sichtbar" on public.listings
  for select to authenticated using (true);

create policy "Nutzer kann eigenes Inserat erstellen" on public.listings
  for insert to authenticated with check (auth.uid() = author_id);

create policy "Nutzer kann eigenes Inserat bearbeiten" on public.listings
  for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);

create policy "Nutzer kann eigenes Inserat löschen" on public.listings
  for delete to authenticated using (auth.uid() = author_id);

-- Standortbasierte Suche für Inserate (gleiches Haversine-Prinzip wie nearby_profiles).
create or replace function public.nearby_listings(
  origin_lat double precision,
  origin_lng double precision,
  radius_km double precision default 50,
  max_results integer default 100
)
returns table (
  id uuid,
  author_id uuid,
  hobby_id uuid,
  title text,
  description text,
  city text,
  event_at timestamptz,
  created_at timestamptz,
  distance_km double precision
) as $$
  select *
  from (
    select
      l.id,
      l.author_id,
      l.hobby_id,
      l.title,
      l.description,
      l.city,
      l.event_at,
      l.created_at,
      (
        6371 * acos(
          least(1, greatest(-1,
            cos(radians(origin_lat)) * cos(radians(l.lat)) *
            cos(radians(l.lng) - radians(origin_lng)) +
            sin(radians(origin_lat)) * sin(radians(l.lat))
          ))
        )
      ) as distance_km
    from public.listings l
    where l.is_active = true
      and l.author_id <> auth.uid()
      and l.lat is not null
      and l.lng is not null
  ) nearby
  where distance_km <= radius_km
  order by created_at desc
  limit max_results;
$$ language sql stable security definer set search_path = public;
