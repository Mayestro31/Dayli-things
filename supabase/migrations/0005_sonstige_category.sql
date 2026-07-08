-- Erlaubt eine dritte Präferenz-Kategorie "sonstige" für frei von Nutzern angelegte Einträge.

alter table public.hobbies drop constraint if exists hobbies_category_check;
alter table public.hobbies add constraint hobbies_category_check
  check (category in ('alltag', 'hobby', 'sonstige'));

-- Nutzer dürfen eigene Einträge in der Kategorie "sonstige" anlegen (Alltag/Hobby bleiben kuratiert).
create policy "Nutzer kann eigene Sonstige-Einträge anlegen" on public.hobbies
  for insert to authenticated with check (category = 'sonstige');
