import { sql } from "./db.js";

export async function getAllMachines() {
    return await sql`
        SELECT *
        FROM waschmaschine
    `;
}

export async function getMachine(id) {
    const rows = await sql`
        SELECT *
        FROM waschmaschine
        WHERE machine_id = ${id}
    `;

    return rows[0];
}