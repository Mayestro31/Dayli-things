-- Vorname/Nachname als eigene Felder, plus Telefonnummer-Status für die SMS-Verifizierung.

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists phone text,
  add column if not exists phone_verified boolean not null default false;

-- Trigger aktualisieren: legt Vor-/Nachname sowie einen datenschutzfreundlichen
-- Anzeigenamen ("Vorname N.") aus den bei der Registrierung übergebenen Metadaten an.
create or replace function public.handle_new_user()
returns trigger as $$
declare
  v_first_name text := new.raw_user_meta_data->>'first_name';
  v_last_name text := new.raw_user_meta_data->>'last_name';
  v_display_name text;
begin
  if v_first_name is not null and v_last_name is not null then
    v_display_name := v_first_name || ' ' || left(v_last_name, 1) || '.';
  else
    v_display_name := coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1));
  end if;

  insert into public.profiles (id, display_name, first_name, last_name, phone)
  values (new.id, v_display_name, v_first_name, v_last_name, new.raw_user_meta_data->>'phone');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- Setzt phone_verified, sobald Supabase die Telefonnummer (auth.users.phone_confirmed_at) bestätigt hat.
create or replace function public.handle_phone_verified()
returns trigger as $$
begin
  if new.phone_confirmed_at is not null and (old.phone_confirmed_at is null or old.phone_confirmed_at is distinct from new.phone_confirmed_at) then
    update public.profiles
      set phone_verified = true, phone = new.phone
      where id = new.id;
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trg_on_auth_user_phone_verified on auth.users;
create trigger trg_on_auth_user_phone_verified
  after update of phone_confirmed_at on auth.users
  for each row execute function public.handle_phone_verified();
