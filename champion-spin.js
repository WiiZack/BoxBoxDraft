/* champion-spin.js — The 'What champion are you?' spin: fully random, not tied to date or browser. */
"use strict";

/* ---------- "what champion are you?" spin: fully random each time, no two people (or spins) tied together ---------- */
var championView = { phase: "idle", champ: null };
var championAnim = null;

function initialsOf(name) {
  return name.split(" ").map(function (p) { return p.charAt(0); }).join("").toUpperCase();
}

function randomChampion() {
  return WORLD_CHAMPIONS[Math.floor(Math.random() * WORLD_CHAMPIONS.length)];
}

function championRow(c) {
  return '<div class="dd-row" style="--team-color:' + teamColor(c.team) + ';">' +
    '<div class="dd-name">' + c.name + '</div>' +
    '<div class="dd-meta">' + c.team + ' &middot; ' + c.year + ' World Champion</div></div>';
}

function paintChampion() {
  var card = document.getElementById("championCard");
  if (!card) { return; }
  var v = championView;
  var html = '<div class="daily-head"><div class="display daily-title">What champion are you?</div>' +
    '<div class="daily-sub">Spin for a random F1 World Drivers\u2019 Champion, 2001&ndash;2025 &mdash; everyone gets their own, purely random pick.</div></div>';
  html += '<div class="daily-body"><div class="number-ball champion-ball' + (v.phase === "spinning" ? " spinning" : "") + '" id="championBall">' + (v.champ ? initialsOf(v.champ.name) : "?") + '</div>';
  html += '<div class="daily-side">';
  if (v.phase === "idle") {
    html += '<p class="daily-hint">Spin to find out which champion you are.</p>';
    html += '<button class="btn" id="championSpinBtn" type="button">Spin for a champion</button>';
  } else if (v.phase === "spinning") {
    html += '<p class="daily-hint">Spinning&hellip;</p>';
  } else {
    html += '<div class="daily-label">You are&hellip;</div>';
    html += '<div class="dd-list">' + championRow(v.champ) + '</div>';
    html += '<div class="daily-actions"><button class="btn secondary" id="championSpinBtn" type="button">Spin again</button></div>';
  }
  html += '</div></div>';
  card.innerHTML = html;

  var btn = document.getElementById("championSpinBtn");
  if (btn) { btn.addEventListener("click", spinChampion); }
}

function spinChampion() {
  clearTimeout(championAnim);
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finalChamp = randomChampion();
  function finish() {
    championView = { phase: "result", champ: finalChamp };
    paintChampion();
  }
  if (reduce) { finish(); return; }
  championView = { phase: "spinning", champ: null };
  paintChampion();
  var ticks = 0, total = 20;
  (function step() {
    var ball = document.getElementById("championBall");
    if (!ball) { return; } // left the setup screen mid-spin
    if (ticks >= total) { finish(); return; }
    ball.textContent = initialsOf(randomChampion().name);
    ticks++;
    championAnim = setTimeout(step, 40 + ticks * 8); // slows down like a wheel settling
  })();
}
