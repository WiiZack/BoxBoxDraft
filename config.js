/* config.js — Game constants: roles, season-goal challenges, points table, helmet icon. */
"use strict";

var HELMET_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14c0-5 3.5-9 8-9s8 4 8 9v2H4v-2z" fill="#0E0F11" opacity="0.85"/><path d="M4 16h16v1.5c0 1-1 1.8-2 1.8H6c-1 0-2-.8-2-1.8V16z" fill="#0E0F11"/><rect x="9" y="10.5" width="9" height="3" rx="1.2" fill="#F2F1ED"/></svg>';

var ROLES = [
  { key: "leader", name: "Points Machine", hint: "All-round race pace", weights: { pace: 0.5, quali: 0.2, tyre: 0.15, overtake: 0.15 } },
  { key: "quali", name: "Pole Hunter", hint: "One-lap qualifying speed", weights: { quali: 0.7, pace: 0.3 } },
  { key: "wet", name: "Rain King", hint: "Wet-weather craft", weights: { wet: 0.7, pace: 0.3 } },
  { key: "tyre", name: "Strategist", hint: "Tyre management & race pace", weights: { tyre: 0.6, pace: 0.4 } },
  { key: "overtake", name: "Overtaker", hint: "Wheel-to-wheel racing", weights: { overtake: 0.7, pace: 0.3 } }
];

/* ---------- season challenge: a pole/podium goal set at the start of each draft ---------- */
var CHALLENGES = [
  { label: "Solid Season", poles: 2, podiums: 6 },
  { label: "Podium Regular", poles: 4, podiums: 9 },
  { label: "Front-Runner", poles: 6, podiums: 12 },
  { label: "Title Contender", poles: 8, podiums: 15 }
];

function randomChallenge() {
  return CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
}

var RACE_COUNT = 22;
var POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
