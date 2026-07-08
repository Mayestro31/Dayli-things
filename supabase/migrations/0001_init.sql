-- DayliThings – initiales Datenbankschema
-- Führe diese Datei im Supabase SQL Editor aus (oder via `supabase db push`).

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  bio text,
  avatar_url text,
  city text,
  lat double precision,
  lng double precision,
  is_premium boolean not null default false,
  premium_since timestamptz,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Öffentliches Profil je registriertem Nutzer.';

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Legt automatisch ein Profil an, sobald sich ein Nutzer registriert.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_on_auth_user_created on auth.users;
create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Hobbys / Alltag-Kategorien (Referenztabelle für Präferenzen)
-- ---------------------------------------------------------------------------
create table if not exists public.hobbies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null check (category in ('alltag', 'hobby')),
  icon text not null default '✨'
);

create table if not exists public.profile_preferences (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  hobby_id uuid not null references public.hobbies (id) on delete cascade,
  primary key (profile_id, hobby_id)
);

-- ---------------------------------------------------------------------------
-- Bewertungen
-- ---------------------------------------------------------------------------
create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  rated_user_id uuid not null references public.profiles (id) on delete cascade,
  rated_by_id uuid not null references public.profiles (id) on delete cascade,
  stars smallint not null check (stars between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (rated_user_id, rated_by_id),
  check (rated_user_id <> rated_by_id)
);

-- ---------------------------------------------------------------------------
-- Chat: Konversationen (1:1) & Nachrichten
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user1_id uuid not null references public.profiles (id) on delete cascade,
  user2_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  check (user1_id <> user2_id),
  unique (user1_id, user2_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists idx_messages_conversation on public.messages (conversation_id, created_at);

-- Findet (oder erstellt) die 1:1 Konversation zwischen zwei Nutzern, unabhängig von der Reihenfolge.
create or replace function public.get_or_create_conversation(other_user_id uuid)
returns uuid as $$
declare
  conv_id uuid;
  me uuid := auth.uid();
  u1 uuid;
  u2 uuid;
begin
  if me is null then
    raise exception 'not authenticated';
  end if;

  u1 := least(me, other_user_id);
  u2 := greatest(me, other_user_id);

  select id into conv_id from public.conversations where user1_id = u1 and user2_id = u2;

  if conv_id is null then
    insert into public.conversations (user1_id, user2_id) values (u1, u2)
    returning id into conv_id;
  end if;

  return conv_id;
end;
$$ language plpgsql security definer set search_path = public;

-- ---------------------------------------------------------------------------
-- Standortbasierte Suche (Haversine-Distanz in km, ohne PostGIS-Abhängigkeit)
-- ---------------------------------------------------------------------------
create or replace function public.nearby_profiles(
  origin_lat double precision,
  origin_lng double precision,
  radius_km double precision default 25,
  max_results integer default 50
)
returns table (
  id uuid,
  display_name text,
  bio text,
  avatar_url text,
  city text,
  is_premium boolean,
  distance_km double precision
) as $$
  select *
  from (
    select
      p.id,
      p.display_name,
      p.bio,
      p.avatar_url,
      p.city,
      p.is_premium,
      (
        6371 * acos(
          least(1, greatest(-1,
            cos(radians(origin_lat)) * cos(radians(p.lat)) *
            cos(radians(p.lng) - radians(origin_lng)) +
            sin(radians(origin_lat)) * sin(radians(p.lat))
          ))
        )
      ) as distance_km
    from public.profiles p
    where p.id <> auth.uid()
      and p.lat is not null
      and p.lng is not null
      and p.onboarding_completed = true
  ) nearby
  where distance_km <= radius_km
  order by distance_km asc
  limit max_results;
$$ language sql stable security definer set search_path = public;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.hobbies enable row level security;
alter table public.profile_preferences enable row level security;
alter table public.ratings enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Profiles: alle eingeloggten Nutzer können Profile lesen, aber nur ihr eigenes ändern.
create policy "Profiles sind für eingeloggte Nutzer sichtbar" on public.profiles
  for select to authenticated using (true);

create policy "Nutzer können eigenes Profil aktualisieren" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Hobbys: öffentlich lesbar (Referenzdaten).
create policy "Hobbys sind öffentlich lesbar" on public.hobbies
  for select to authenticated using (true);

-- Präferenzen: jeder darf lesen (für Matching/Filter), nur Owner darf schreiben.
create policy "Präferenzen sind sichtbar" on public.profile_preferences
  for select to authenticated using (true);

create policy "Nutzer verwaltet eigene Präferenzen (insert)" on public.profile_preferences
  for insert to authenticated with check (auth.uid() = profile_id);

create policy "Nutzer verwaltet eigene Präferenzen (delete)" on public.profile_preferences
  for delete to authenticated using (auth.uid() = profile_id);

-- Ratings: lesbar für alle, Insert nur für sich selbst als Bewertenden.
create policy "Bewertungen sind sichtbar" on public.ratings
  for select to authenticated using (true);

create policy "Nutzer kann Bewertung abgeben" on public.ratings
  for insert to authenticated with check (auth.uid() = rated_by_id);

create policy "Nutzer kann eigene Bewertung bearbeiten" on public.ratings
  for update to authenticated using (auth.uid() = rated_by_id) with check (auth.uid() = rated_by_id);

-- Conversations: nur Teilnehmer dürfen lesen/erstellen.
create policy "Teilnehmer sehen ihre Konversationen" on public.conversations
  for select to authenticated using (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "Nutzer kann Konversation erstellen" on public.conversations
  for insert to authenticated with check (auth.uid() = user1_id or auth.uid() = user2_id);

-- Messages: nur Teilnehmer der zugehörigen Konversation.
create policy "Teilnehmer sehen Nachrichten" on public.messages
  for select to authenticated using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user1_id = auth.uid() or c.user2_id = auth.uid())
    )
  );

create policy "Teilnehmer kann Nachricht senden" on public.messages
  for insert to authenticated with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user1_id = auth.uid() or c.user2_id = auth.uid())
    )
  );

create policy "Empfänger kann Nachricht als gelesen markieren" on public.messages
  for update to authenticated using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user1_id = auth.uid() or c.user2_id = auth.uid())
    )
  );

-- ---------------------------------------------------------------------------
-- Realtime für Chat aktivieren
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table public.messages;

-- ---------------------------------------------------------------------------
-- Storage Bucket für Avatare
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatare sind öffentlich lesbar" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Nutzer kann eigenen Avatar hochladen" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Nutzer kann eigenen Avatar aktualisieren" on storage.objects
  for update to authenticated using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
