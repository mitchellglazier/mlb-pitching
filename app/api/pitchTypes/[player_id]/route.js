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

  const pitchTypeObj = {};

  data.forEach((pitch) => {
    const pitchType = pitch.pitch_type;
  
    if (pitchType) {
      if (!pitchTypeObj[pitchType]) {
        pitchTypeObj[pitchType] = {
            pitchTypeAbbr: pitch.pitch_type_abbrev,
            numberOfPitches: 0,
            numberOfHitPitches: 0,
            totalSpeed: 0,
            totalSpinRate: 0,
            totalHitExitSpeed: 0,
            totalHitLaunchAngle: 0,
            totalHorizontalBreak: 0,
            totalInducedVerticalBreak: 0
        };
      }
  
      pitchTypeObj[pitchType].numberOfPitches++;
      if (pitch.release_speed) {
        pitchTypeObj[pitchType].totalSpeed += pitch.release_speed;
      }
      if (pitch.spin_rate) {
        pitchTypeObj[pitchType].totalSpinRate += pitch.spin_rate;
      }
      if (pitch.pitch_call == 'InPlay') {
        pitchTypeObj[pitchType].numberOfHitPitches++;
      }
      if (pitch.hit_exit_speed && pitch.pitch_call == 'InPlay') {
        pitchTypeObj[pitchType].totalHitExitSpeed += pitch.hit_exit_speed;
      }
      if (pitch.hit_launch_angle && pitch.pitch_call == 'InPlay') {
        pitchTypeObj[pitchType].totalHitLaunchAngle += pitch.hit_launch_angle;
      }
      if (pitch.horizontal_break) {
        pitchTypeObj[pitchType].totalHorizontalBreak += pitch.horizontal_break;
      }
      if (pitch.induced_vertical_break) {
        pitchTypeObj[pitchType].totalInducedVerticalBreak += pitch.induced_vertical_break
      }
    }
  });

  let totalPitches = 0;

  for (const pitchType in pitchTypeObj) {
    const stats = pitchTypeObj[pitchType];
    if (stats.numberOfPitches > 0) {
      stats.averageSpeed = stats.totalSpeed / stats.numberOfPitches;
      stats.averageSpinRate = stats.totalSpinRate / stats.numberOfPitches;
      stats.averageHorizontalBreak = stats.totalHorizontalBreak / stats.numberOfPitches;
      stats.averageInducedVerticalBreak = stats.totalInducedVerticalBreak / stats.numberOfPitches;
    }
    if (stats.numberOfHitPitches > 0) {
      stats.averageHitExitSpeed = stats.totalHitExitSpeed / stats.numberOfHitPitches;
      stats.averageHitLaunchAngle = stats.totalHitLaunchAngle / stats.numberOfHitPitches;
    } else {
      stats.averageHitExitSpeed = 0
      stats.averageHitLaunchAngle = 0
    }
    delete stats.totalSpeed;
    delete stats.totalSpinRate;
    delete stats.totalHitExitSpeed;
    delete stats.totalHitLaunchAngle;
    delete stats.totalHorizontalBreak;
    delete stats.totalInducedVerticalBreak;
    totalPitches += stats.numberOfPitches
  }

  const pitchTypeArray = Object.keys(pitchTypeObj).map((pitchType) => ({
    "Pitch Type": pitchType,
    "Pitch Type Abbr": pitchTypeObj[pitchType].pitchTypeAbbr,
    "Pitches Thrown": pitchTypeObj[pitchType].numberOfPitches,
    "Avg Speed": pitchTypeObj[pitchType].averageSpeed.toFixed(2),
    "Avg Spin Rate": pitchTypeObj[pitchType].averageSpinRate.toFixed(0),
    "Avg Exit Speed": pitchTypeObj[pitchType].averageHitExitSpeed.toFixed(2),
    "Avg Launch Angle": Math.round(pitchTypeObj[pitchType].averageHitLaunchAngle),
    "Avg HB": pitchTypeObj[pitchType].averageHorizontalBreak.toFixed(2),
    "Avg VB": pitchTypeObj[pitchType].averageInducedVerticalBreak.toFixed(2),
    "Usage": (Math.round((pitchTypeObj[pitchType].numberOfPitches / totalPitches) * 100))
  }))
  return new Response(JSON.stringify(pitchTypeArray), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}