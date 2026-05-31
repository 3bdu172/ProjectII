DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS reservierung;
DROP TABLE IF EXISTS waschmaschine;
DROP TABLE IF EXISTS raum;
DROP TABLE IF EXISTS benutzer;


CREATE TABLE IF NOT EXISTS benutzer (
    user_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    passwort TEXT NOT NULL,
    zimmernummer TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS raum (
    room_id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    typ TEXT NOT NULL,
    beschreibung TEXT,
    status TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS reservierung (
    reservation_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    datum DATE NOT NULL,
    startzeit TIME NOT NULL,
    endzeit TIME NOT NULL,
    status TEXT NOT NULL,

    FOREIGN KEY (user_id) REFERENCES benutzer(user_id),
    FOREIGN KEY (room_id) REFERENCES raum(room_id)
);


CREATE TABLE IF NOT EXISTS chat (
    message_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL,

    FOREIGN KEY (user_id) REFERENCES benutzer(user_id)
);


CREATE TABLE IF NOT EXISTS waschmaschine (
    machine_id INTEGER PRIMARY KEY,
    nummer INTEGER UNIQUE NOT NULL,
    status TEXT NOT NULL,
    remaining_time TEXT
);