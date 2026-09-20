/* daily-spin.js — Daily Number Spin: the UI paint function and the spin animation. */
"use strict";

function paintDaily() {
  var card = document.getElementById("dailyCard");
  if (!card) { return; }
  var v = dailyView;
  var html = '<div class="daily-head"><div class="display daily-title">Daily number spin</div>' +
    '<div class="daily-sub">Your own number for today, 1&ndash;100 &mdash; different from everyone else\'s. See which F1 driver ran it.</div></div>';
  html += '<div class="daily-body"><div class="number-ball' + (v.phase === "spinning" ? " spinning" : "") + '" id="dailyBall">' + (v.number === null ? "?" : v.number) + '</div>';
  html += '<div class="daily-side">';
  if (v.phase === "idle") {
    html += '<p class="daily-hint">Spin to find out your driver for the day.</p>';
    html += '<button class="btn" id="dailySpinBtn" type="button">Spin today&rsquo;s number</button>';
  } else if (v.phase === "spinning") {
    html += '<p class="daily-hint">Spinning&hellip;</p>';
  } else {
    var res = driversForNumber(v.number);
    if (res.list.length) {
      html += '<div class="daily-label">' + (v.practice ? "Practice spin" : "Your driver" + (res.list.length > 1 ? "s" : "") + " for the day") + '</div>';
      html += '<div class="dd-list">' + res.list.map(dailyDriverRow).join("") + '</div>';
    } else {
      html += '<div class="daily-label">' + (v.practice ? "Practice spin" : "Today\u2019s number") + '</div>';
      html += '<div class="dd-row dd-empty"><div class="dd-name">No driver</div><div class="dd-meta">Nobody has raced #' + v.number + ' in F1.</div></div>';
    }
    if (v.practice) {
      html += '<div class="daily-actions"><button class="btn secondary" id="dailyBackBtn" type="button">Back to today&rsquo;s number</button><button class="btn secondary" id="dailyPracticeBtn" type="button">Spin again</button></div>';
    } else {
      html += '<div class="daily-actions"><span class="daily-next">Next number in <b id="dailyCountdown">' + countdownText() + '</b></span><button class="btn secondary" id="dailyPracticeBtn" type="button">Practice spin</button></div>';
    }
  }
  html += '</div></div>';
  card.innerHTML = html;

  var spin = document.getElementById("dailySpinBtn");
  if (spin) { spin.addEventListener("click", function () { spinDaily(dailyNumberFor(todayKey()), false); }); }
  var prac = document.getElementById("dailyPracticeBtn");
  if (prac) { prac.addEventListener("click", function () { spinDaily(Math.floor(Math.random() * 100) + 1, true); }); }
  var back = document.getElementById("dailyBackBtn");
  if (back) { back.addEventListener("click", function () { dailyView = { phase: "result", number: dailyNumberFor(todayKey()), practice: false }; paintDaily(); }); }
}

function spinDaily(finalNumber, practice) {
  clearTimeout(dailyAnim);
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function finish() {
    if (!practice) { saveDaily(finalNumber); }
    dailyView = { phase: "result", number: finalNumber, practice: practice };
    paintDaily();
  }
  if (reduce) { finish(); return; }
  dailyView = { phase: "spinning", number: null, practice: practice };
  paintDaily();
  var ticks = 0, total = 24;
  (function step() {
    var ball = document.getElementById("dailyBall");
    if (!ball) { return; } // left the setup screen mid-spin
    if (ticks >= total) { finish(); return; }
    ball.textContent = Math.floor(Math.random() * 100) + 1;
    ticks++;
    dailyAnim = setTimeout(step, 40 + ticks * 8); // slows down like a wheel settling
  })();
}

function initDaily() {
  clearTimeout(dailyAnim);
  clearInterval(dailyClock);
  var saved = loadDaily();
  dailyView = saved ? { phase: "result", number: saved.number, practice: false } : { phase: "idle", number: null, practice: false };
  paintDaily();
  dailyClock = setInterval(function () {
    var el = document.getElementById("dailyCountdown");
    if (el) { el.textContent = countdownText(); }
    if (!document.getElementById("dailyCard")) { clearInterval(dailyClock); }
    // a new day started while the page was open: reset to spin-ready
    if (dailyView.phase === "result" && !dailyView.practice && dailyView.number !== null && !loadDaily()) { initDaily(); }
  }, 30000);
}
