import { sql } from "./models/db.js";
import { parseCookies } from "./cookies.ts";

export async function getUser(userId: number) {
    const rows = await sql`
        SELECT *
        FROM benutzer
        WHERE user_id = ${userId}
    `;

    return rows[0] ?? null;
}

export async function getUserByLogin(login: string) {
    const rows = await sql`
        SELECT *
        FROM benutzer
        WHERE login = ${login}
    `;

    return rows[0] ?? null;
}

export async function createUser(
    login: string,
    firstname: string,
    lastname: string,
    passwordHash: string
) {
    await sql`
        INSERT INTO benutzer 
        (login, firstname, lastname, password_hash, created_at)
        VALUES 
        (${login}, ${firstname}, ${lastname}, ${passwordHash}, datetime('now'))
    `;
}

export async function checkCredentials(login: string, password: string) {
    const user = await getUserByLogin(login);

    if (!user) {
        return null;
    }

    const passwordIsCorrect = Bun.password.verifySync(
        password,
        user.password_hash
    );

    if (!passwordIsCorrect) {
        return null;
    }

    return user;
}

export async function authenticateUser(req: any) {
    const cookies = parseCookies(req.headers.cookie);

    if (!cookies.user_id) {
        return null;
    }

    const userId = Number(cookies.user_id);

    if (Number.isNaN(userId)) {
        return null;
    }

    return await getUser(userId);
}