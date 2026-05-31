import { sql } from "./db.js";

export async function getAllReservations() {
    return await sql`
        SELECT 
            reservierung.reservation_id,
            reservierung.datum,
            reservierung.startzeit,
            reservierung.endzeit,
            reservierung.status,
            benutzer.name AS user_name,
            raum.name AS room_name
        FROM reservierung
        JOIN benutzer ON reservierung.user_id = benutzer.user_id
        JOIN raum ON reservierung.room_id = raum.room_id
    `;
}

export async function getReservationsByRoom(roomId) {
    return await sql`
        SELECT *
        FROM reservierung
        WHERE room_id = ${roomId}
    `;
}

export async function createReservation(userId, roomId, datum, startzeit, endzeit, status) {
    return await sql`
        INSERT INTO reservierung (user_id, room_id, datum, startzeit, endzeit, status)
        VALUES (${userId}, ${roomId}, ${datum}, ${startzeit}, ${endzeit}, ${status})
    `;
}