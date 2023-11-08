import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(req, res) {
  const name = req.url.split("/").pop();

  if (!db) {
    db = await open({
      filename: "./pitches.db",
      driver: sqlite3.Database,
    });
  }

  const query = `
    SELECT DISTINCT
      players.player_id,
      players.name_use AS "First Name",
      players.name_last AS "Last Name"
    FROM players
    INNER JOIN pitches ON players.player_id = pitches.pitcher_id
    WHERE players.name_last = ? OR players.name_use = ?;
  `;

  const item = await db.all(query, [name, name]);

  return new Response(JSON.stringify(item), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}