import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(req, res) {
    const player_id = req.url.split("/").pop();

    if (!db) {
        db = await open({
          filename: "./pitches.db",
          driver: sqlite3.Database,
        });
      }

    const data = await db.all(`SELECT * FROM pitches WHERE pitcher_id = ?`, player_id);

    const gameDataObj = {};
    const fastballData = [];

    data.forEach((pitch) => {
      const gameID = pitch.game_pk
      const pitchType = pitch.pitch_type;
      const gameDate = pitch.game_date;
      const relSpeed = pitch.release_speed;

      if (gameID && pitchType) {
        if (!gameDataObj[gameID]) {
          gameDataObj[gameID] = {
            gameDate,
            totalPitches: 0,
            pitchTypeCounts: {}
          };
        }

        gameDataObj[gameID].totalPitches++;

        if (!gameDataObj[gameID].pitchTypeCounts[pitchType]) {
          gameDataObj[gameID].pitchTypeCounts[pitchType] = 0;
        }

        gameDataObj[gameID].pitchTypeCounts[pitchType]++;

        if (pitchType === "Fastball" || pitchType === "Sinker") {
          fastballData.push({gameDate, relSpeed});
        }
      }
    });

    const gameDataArray = Object.keys(gameDataObj).map((gameID) => {
      const gameInfo = gameDataObj[gameID];
      const pitchTypeCounts = gameInfo.pitchTypeCounts;
      const totalPitches = gameInfo.totalPitches;
      const pitchTypeUsage = [];

      for (const pitchType in pitchTypeCounts) {
        const usage = Math.round((pitchTypeCounts[pitchType] / totalPitches) * 100)
        pitchTypeUsage.push({
          pitchType,
          usage
        })
      }

      const filteredData = fastballData.filter(
        (item) => item.gameDate === gameInfo.gameDate
      );
      const filteredCount = filteredData.length;
      const filteredTotalSpeed = filteredData.reduce(
        (sum, item) => sum + item.relSpeed,
        0
      );
      const averageFastballSpeed =
        filteredCount > 0
          ? filteredTotalSpeed / filteredCount
          : 0;

      return {
        gameID,
        "Game Date": gameInfo.gameDate,
        "Pitches Thrown": totalPitches,
        pitchTypeUsage,
        "Avg Fastball Velo": (averageFastballSpeed).toFixed(2)
      };
    });

    return new Response(JSON.stringify(gameDataArray), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
}