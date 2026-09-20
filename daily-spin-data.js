/* daily-spin-data.js — Daily Number Spin: per-browser number generation and localStorage persistence. */
"use strict";

/* ---------- daily number spin: a number from 1-100, and the driver(s) who raced it ---------- */
var DAILY_KEY = "box_box_daily_v1";
var CLIENT_ID_KEY = "box_box_client_id";
var dailyView = { phase: "idle", number: null, practice: false };
var dailyAnim = null;
var dailyClock = null;

function pad2(n) { return n < 10 ? "0" + n : "" + n; }

function todayKey() {
  var d = new Date();
  return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
}

// a random ID generated once per browser and reused after that, so each
// person's daily number is their own rather than shared by everyone
function getClientId() {
  try {
    var id = localStorage.getItem(CLIENT_ID_KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return id;
  } catch (e) {
    return "anon-" + Math.random(); // storage unavailable — still varies per call, just won't persist
  }
}

// same date + same browser -> same number all day (so it still feels "daily"),
// but a different browser/person gets a different number (FNV-1a hash)
function dailyNumberFor(key) {
  var full = key + "|" + getClientId();
  var h = 2166136261;
  for (var i = 0; i < full.length; i++) { h ^= full.charCodeAt(i); h = Math.imul(h, 16777619); }
  h ^= h >>> 13; h = Math.imul(h, 1540483477); h ^= h >>> 15;
  return (h >>> 0) % 100 + 1;
}

// every driver who has raced the number (empty if nobody has)
function driversForNumber(n) {
  return { number: n, list: NUMBER_DRIVERS[n] || [] };
}

function loadDaily() {
  try {
    var saved = JSON.parse(localStorage.getItem(DAILY_KEY));
    if (saved && saved.date === todayKey() && saved.number >= 1 && saved.number <= 100) { return saved; }
  } catch (e) { /* storage unavailable */ }
  return null;
}

function saveDaily(number) {
  try { localStorage.setItem(DAILY_KEY, JSON.stringify({ date: todayKey(), number: number })); } catch (e) { /* ignore */ }
}

function fmtYears(y) {
  var out = String(y).replace(/(\d)-(\d)/, "$1\u2013$2");
  return /-$/.test(out) ? out.slice(0, -1) + "\u2013present" : out;
}

function dailyDriverRow(dr) {
  var firstTeam = dr.team.split(",")[0].trim();
  var badges = "";
  if (dr.now) { badges += '<span class="dd-badge now">On the 2026 grid</span>'; }
  if (dr.sub) { badges += '<span class="dd-badge">Stand-in number</span>'; }
  if (dr.legend) { badges += '<span class="dd-badge legend">Legend</span>'; }
  return '<div class="dd-row" style="--team-color:' + teamColor(firstTeam) + ';">' +
    '<div class="dd-name">' + dr.name + '</div>' +
    '<div class="dd-meta">' + dr.team + ' &middot; ' + fmtYears(dr.years) + '</div>' +
    (dr.note ? '<div class="dd-meta">' + dr.note + '</div>' : '') +
    (badges ? '<div class="dd-badges">' + badges + '</div>' : '') + '</div>';
}

function msUntilMidnight() {
  var now = new Date();
  var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return next - now;
}

function countdownText() {
  var mins = Math.max(1, Math.ceil(msUntilMidnight() / 60000));
  return Math.floor(mins / 60) + "h " + pad2(mins % 60) + "m";
}
