import { SQL } from "bun";

export const sql = new SQL("sqlite://./data/app.sqlite");

await sql`PRAGMA foreign_keys = ON`;

await sql.file("data/create.sql");
await sql.file("data/populate.sql");