-- Räumt die Alltag- & Hobby-Listen auf und ersetzt sie durch eine kuratierte Auswahl.
-- Umbenennungen laufen per UPDATE (behalten die id, damit bestehende profile_preferences/listings weiter funktionieren).

update public.hobbies set name = 'Heimwerken', icon = '🔧' where name = 'DIY & Heimwerken';
update public.hobbies set name = 'Nachbarschaftshilfen' where name = 'Nachbarschaftshilfe';
update public.hobbies set name = 'Fahrgemeinschaften', icon = '🚗' where name = 'Gemeinsam pendeln';
update public.hobbies set name = 'Gesellschaftsspiele' where name = 'Brettspiele';
update public.hobbies set name = 'Yoga', icon = '🧘' where name = 'Yoga & Meditation';

-- Einträge ohne Platz in der neuen kuratierten Liste entfernen
-- (bestehende profile_preferences-Verknüpfungen dazu werden per cascade mitgelöscht).
delete from public.hobbies
  where name in ('Spazierengehen', 'Kaffee & Café-Besuche', 'Kinder & Familie', 'Sport & Fitness', 'Kino & Serien', 'Handwerk & Basteln');

-- Neue kuratierte Liste einfügen. Bereits von Nutzern als "Sonstige" angelegte Stichworte
-- (z. B. Padel, Golf, Rasenmähen, Schwimmen, Hundesitting) werden hier automatisch in
-- die passende Kategorie umsortiert, ohne ihre id (und damit bestehende Verknüpfungen) zu verlieren.
insert into public.hobbies (name, category, icon) values
  ('Heimwerken', 'alltag', '🔧'),
  ('Einkaufen', 'alltag', '🛒'),
  ('Rasenmähen', 'alltag', '🌿'),
  ('Hecke schneiden', 'alltag', '✂️'),
  ('Blumen gießen', 'alltag', '🪴'),
  ('Gartenarbeit', 'alltag', '🌱'),
  ('Fahrgemeinschaften', 'alltag', '🚗'),
  ('Hundesitting', 'alltag', '🐕'),
  ('Haustiere', 'alltag', '🐾'),
  ('Babysitting', 'alltag', '👶'),
  ('Putzhilfe', 'alltag', '🧹'),
  ('Bügelhilfe', 'alltag', '👕'),
  ('Nachbarschaftshilfen', 'alltag', '🤝'),
  ('Kochen & Backen', 'alltag', '🍳'),
  ('Joggen', 'hobby', '🏃'),
  ('Fahrradfahren', 'hobby', '🚴'),
  ('Gesellschaftsspiele', 'hobby', '🎲'),
  ('Fotografie', 'hobby', '📷'),
  ('Tanzen', 'hobby', '💃'),
  ('Lesen', 'hobby', '📚'),
  ('Malen & Zeichnen', 'hobby', '🎨'),
  ('Gassi gehen', 'hobby', '🐕‍🦺'),
  ('Reiten', 'hobby', '🐎'),
  ('Musik machen', 'hobby', '🎸'),
  ('Schwimmen', 'hobby', '🏊'),
  ('Gym', 'hobby', '🏋️'),
  ('Padel', 'hobby', '🏓'),
  ('Schach', 'hobby', '♟️'),
  ('Yoga', 'hobby', '🧘'),
  ('Fußball', 'hobby', '⚽'),
  ('Handball', 'hobby', '🤾'),
  ('Tennis', 'hobby', '🎾'),
  ('Golf', 'hobby', '⛳'),
  ('Wandern', 'hobby', '🥾'),
  ('Videospiele', 'hobby', '🎮'),
  ('Reisen', 'hobby', '✈️'),
  ('Jagen', 'hobby', '🏹'),
  ('Pickleball', 'hobby', '🥒'),
  ('Hyrox', 'hobby', '🔥')
on conflict (name) do update set category = excluded.category, icon = excluded.icon;

-- Nutzer dürfen jetzt auch direkt in "alltag" und "hobby" eigene Einträge anlegen
-- (bisher war das nur für "sonstige" erlaubt) – Kategorie muss vorher per Klick gewählt werden.
drop policy if exists "Nutzer kann eigene Sonstige-Einträge anlegen" on public.hobbies;
create policy "Nutzer kann eigene Einträge anlegen" on public.hobbies
  for insert to authenticated with check (category in ('alltag', 'hobby', 'sonstige'));
