/* state.js — Persisted best-run stats (localStorage) and the live game state object. */
"use strict";

/* ---------- persisted stats ---------- */
var stats = { builds: 0, bestRank: null };
try {
  var raw = localStorage.getItem("flawless_2026_stats_v2");
  if (raw) { var parsed = JSON.parse(raw); if (parsed && typeof parsed === "object") { stats = parsed; } }
} catch (e) { /* storage unavailable — continue with defaults */ }

function saveStats() {
  try { localStorage.setItem("flawless_2026_stats_v2", JSON.stringify(stats)); } catch (e) { /* ignore */ }
}

function renderHeaderStats() {
  document.getElementById("statBuilds").textContent = stats.builds;
  document.getElementById("statBest").textContent = stats.bestRank ? ("P" + stats.bestRank) : "—";
}

/* ---------- state ---------- */
var state = null;
var spinTimer = null;

var SPINS_PER_ROUND = 3;

/* one-time role swap: move a drafted driver to a different role (or trade two roles).
   Add "expert" / "challenge" here if you want it in those modes too. */
var SWAP_MODES = ["classic"];
function swapEnabled(st) { return SWAP_MODES.indexOf(st.mode) !== -1; }

function freshState(mode) {
  return {
    phase: "drafting",
    mode: mode,
    round: 1,
    roles: ROLES.map(function (r) { return Object.assign({}, r, { driver: null }); }),
    usedNames: [],
    currentDraw: null,
    pickedDriver: null,
    spinning: false,
    spinsLeft: SPINS_PER_ROUND,
    swapUsed: false,
    swapMode: false,
    swapFrom: null,
    challenge: mode === "challenge" ? randomChallenge() : null,
    result: null
  };
}
