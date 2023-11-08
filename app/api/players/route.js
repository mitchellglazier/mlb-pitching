import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(req, res) {
  if (!db) {
    db = await open({
      filename: "./pitches.db",
      driver: sqlite3.Database,
    });
  }

  const query = `
    SELECT DISTINCT 
      players.player_id,
      players.name_use As "First Name",
      players.name_last As "Last Name"
    FROM players
    INNER JOIN pitches ON players.player_id = pitches.pitcher_id
    LIMIT 10;
  `

  const items = await db.all(query);

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}