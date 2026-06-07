import { sql } from "./db.js";


export async function createReservation(userId, roomId, datum, startzeit, endzeit) {
    await sql`
        INSERT INTO reservierung (user_id, room_id, datum, startzeit, endzeit, status)
        VALUES (${userId}, ${roomId}, ${datum}, ${startzeit}, ${endzeit}, 'wartet')
    `;
}


export async function getReservationsByRoom(roomId) {
    return await sql`
        SELECT 
            reservierung.reservation_id,
            reservierung.datum,
            reservierung.startzeit,
            reservierung.endzeit,
            reservierung.status,
            benutzer.name AS user_name
        FROM reservierung
        JOIN benutzer ON reservierung.user_id = benutzer.user_id
        WHERE reservierung.room_id = ${roomId}
        ORDER BY reservierung.datum, reservierung.startzeit
    `;
}


export async function getReservationsByRoomForUser(roomId, userId) {
    return await sql`
        SELECT 
            reservierung.reservation_id,
            reservierung.datum,
            reservierung.startzeit,
            reservierung.endzeit,
            reservierung.status,
            benutzer.name AS user_name
        FROM reservierung
        JOIN benutzer ON reservierung.user_id = benutzer.user_id
        WHERE reservierung.room_id = ${roomId}
        AND reservierung.user_id = ${userId}
        ORDER BY reservierung.datum, reservierung.startzeit
    `;
}


export async function getReservationForUser(id, userId) {
    const rows = await sql`
        SELECT *
        FROM reservierung
        WHERE reservation_id = ${id}
        AND user_id = ${userId}
    `;

    return rows[0];
}


export async function updateReservation(id, userId, datum, startzeit, endzeit) {
    await sql`
        UPDATE reservierung
        SET datum = ${datum},
            startzeit = ${startzeit},
            endzeit = ${endzeit},
            status = 'wartet'
        WHERE reservation_id = ${id}
        AND user_id = ${userId}
    `;
}


export async function deleteReservation(id) {
    await sql`
        DELETE FROM reservierung
        WHERE reservation_id = ${id}
    `;
}


export async function deleteReservationForUser(id, userId) {
    await sql`
        DELETE FROM reservierung
        WHERE reservation_id = ${id}
        AND user_id = ${userId}
    `;
}