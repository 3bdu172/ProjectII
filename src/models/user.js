import { sql } from "./db.js";

export async function getAllUsers() {
    return await sql`
        SELECT *
        FROM benutzer
    `;
}

export async function getUser(id) {
    const rows = await sql`
        SELECT *
        FROM benutzer
        WHERE user_id = ${id}
    `;

    return rows[0];
}

export async function getUserByEmail(email) {
    const rows = await sql`
        SELECT *
        FROM benutzer
        WHERE email = ${email}
    `;

    return rows[0];
}

export async function createUser(name, email, passwort, zimmernummer) {
    return await sql`
        INSERT INTO benutzer (name, email, passwort, zimmernummer)
        VALUES (${name}, ${email}, ${passwort}, ${zimmernummer})
    `;
}