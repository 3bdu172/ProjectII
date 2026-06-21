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


export async function getUserByLogin(login) {
    const rows = await sql`
        SELECT *
        FROM benutzer
        WHERE login = ${login}
    `;

    return rows[0];
}

export async function createUser(login, firstname, lastname, passwordHash) {
    await sql`
        INSERT INTO benutzer (login, firstname, lastname, password_hash)
        VALUES (${login}, ${firstname}, ${lastname}, ${passwordHash})
    `;
}