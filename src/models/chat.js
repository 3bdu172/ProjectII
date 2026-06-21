import { sql } from "./db.js";

export async function getAllMessages() {
    return await sql`
        SELECT 
            chat_nachricht.message_id,
            chat_nachricht.text,
            chat_nachricht.created_at,
            benutzer.firstname || ' ' || benutzer.lastname AS author
        FROM chat_nachricht
        JOIN benutzer ON chat_nachricht.user_id = benutzer.user_id
        ORDER BY chat_nachricht.created_at ASC
    `;
}

export async function createMessage(userId, text) {
    return await sql`
        INSERT INTO chat (user_id, text, created_at)
        VALUES (${userId}, ${text}, datetime('now'))
    `;
}