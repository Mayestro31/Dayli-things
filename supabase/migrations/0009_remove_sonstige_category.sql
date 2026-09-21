-- Entfernt die Kategorie "sonstige" wieder: bestehende Einträge werden zu "hobby",
-- danach ist nur noch "alltag"/"hobby" erlaubt (analog zur Kuratierung in 0007).

update public.hobbies set category = 'hobby' where category = 'sonstige';

drop policy if exists "Nutzer kann eigene Einträge anlegen" on public.hobbies;
create policy "Nutzer kann eigene Einträge anlegen" on public.hobbies
  for insert to authenticated with check (category in ('alltag', 'hobby'));

alter table public.hobbies drop constraint if exists hobbies_category_check;
alter table public.hobbies add constraint hobbies_category_check
  check (category in ('alltag', 'hobby'));
