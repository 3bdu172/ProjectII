INSERT INTO benutzer (user_id, login, firstname, lastname, password_hash, zimmernummer, created_at) VALUES
    (1, 'anne', 'Anne', 'Müller', 'test-hash', '204', datetime('now')),
    (2, 'max', 'Max', 'Schneider', 'test-hash', '112', datetime('now')),
    (3, 'sara', 'Sara', 'Weber', 'test-hash', '305', datetime('now')),
    (4, 'jakub', 'Jakub', 'Novak', 'test-hash', '410', datetime('now'));

INSERT INTO raum (room_id, name, typ, beschreibung, status) VALUES
    (1, 'Musikraum', 'music', 'Raum zum Musizieren und Üben', 'verfügbar'),
    (2, 'Partyraum', 'party', 'Raum für Feiern und Treffen', 'verfügbar');


INSERT INTO waschmaschine (machine_id, nummer, status, remaining_time) VALUES
    (1, 1, 'belegt', '0:35 h'),
    (2, 2, 'belegt', '0:02 h'),
    (3, 3, 'belegt', '0:13 h'),
    (4, 4, 'frei', NULL),
    (5, 5, 'frei', NULL),
    (6, 6, 'belegt', '0:38 h');


INSERT INTO reservierung (reservation_id, user_id, room_id, datum, startzeit, endzeit, status) VALUES
    (1, 1, 1, '2026-06-03', '16:00', '18:00', 'bestätigt'),
    (2, 2, 1, '2026-06-04', '18:00', '20:00', 'bestätigt'),
    (3, 3, 2, '2026-06-05', '19:00', '23:00', 'bestätigt'),
    (4, 4, 2, '2026-06-06', '18:00', '22:00', 'bestätigt');


INSERT INTO chat_nachricht (message_id, user_id, text, created_at) VALUES
    (1, 1, 'Ist der Musikraum heute frei?', datetime('now', '-3 hours')),
    (2, 2, 'Waschmaschine 2 ist gleich fertig.', datetime('now', '-2 hours')),
    (3, 3, 'Hat jemand meinen Schlüssel gefunden?', datetime('now', '-1 hours')),
    (4, 4, 'Der Partyraum ist am Samstag reserviert.', datetime('now'));