import { sql } from "./db.js";

export async function getAllRooms() {
    return await sql`
        SELECT *
        FROM raum
    `;
}

export async function getRoom(id) {
    const rows = await sql`
        SELECT *
        FROM raum
        WHERE room_id = ${id}
    `;

    return rows[0];
}

export async function getRoomsByType(type) {
    return await sql`
        SELECT *
        FROM raum
        WHERE typ = ${type}
    `;
}