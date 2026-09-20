/* scoring.js — Per-role fit scoring and the race-position/points math. */
"use strict";

/* ---------- simulation engine: scoring & race outcomes ---------- */
function roleScore(role, driver) {
  var w = role.weights, total = 0;
  for (var k in w) { total += (driver[k] || 0) * w[k]; }
  return Math.round(total);
}

function teamStats(roles) {
  var scores = roles.map(function (r) { return roleScore(r, r.driver); });
  var avg = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
  var variance = scores.reduce(function (a, b) { return a + Math.pow(b - avg, 2); }, 0) / scores.length;
  var stdev = Math.sqrt(variance);
  return { scores: scores, avg: avg, stdev: stdev };
}

function rollToPosition(roll) {
  var pos = Math.round((100 - roll) / 4);
  if (pos < 1) pos = 1;
  if (pos > 20) pos = 20;
  return pos;
}

function pointsForPosition(pos) {
  return pos <= 10 ? POINTS_TABLE[pos - 1] : 0;
}
