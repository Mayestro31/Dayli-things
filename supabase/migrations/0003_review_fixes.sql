-- Folge-Migration nach dem Code-Review: Mindestlänge für Anzeigenamen
-- und ein Feld, um den gewählten Premium-Tarif tatsächlich zu speichern.

alter table public.profiles
  add constraint display_name_length check (char_length(display_name) >= 2);

alter table public.profiles
  add column if not exists premium_plan text check (premium_plan in ('monthly', 'yearly'));
