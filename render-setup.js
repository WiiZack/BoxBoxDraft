/* render-setup.js — Renders the start screen: mode picker and intro copy. */
"use strict";

/* ---------- render: setup screen ---------- */
function renderSetup() {
  var html = '';
  html += '<div class="panel setup-card">';
  html += '<h2 class="display">Can your grid beat all eleven teams?</h2>';
  html += '<p>Draft five drivers &mdash; pulled from the current 2026 field or from any season of the last decade &mdash; into five roles. Then find out if your team could top the Constructors\u2019 Championship against a 2026 field where the new regulations have scrambled everyone\u2019s form.</p>';
  html += '<div class="mode-row">';
  html += modeButton("classic", "Classic", "Full ratings shown while you draft, plus one role swap.");
  html += modeButton("expert", "Expert", "Names and teams only. Ratings revealed at the flag.");
  html += modeButton("challenge", "Challenge", "Full ratings, plus a season goal for poles &amp; podiums.");
  html += '</div>';
  html += '<button class="btn" id="startBtn">Start the draft</button>';
  html += '<div class="roles-legend">';
  ROLES.forEach(function (r) {
    html += '<div class="role-chip"><span class="display">' + r.name + '</span><span class="desc">' + r.hint + '</span></div>';
  });
  html += '</div>';
  html += '<div class="grid-note"><b>Your rivals:</b> all eleven 2026 constructors &mdash; McLaren, Mercedes, Red Bull, Ferrari, Williams, Racing Bulls, Aston Martin, Haas, Audi, Alpine and Cadillac &mdash; each handed a randomised points total. <b>Your draft pool:</b> the 22 drivers on that same 2026 grid, plus a rotating cast of past-decade seasons from Hamilton, Vettel, Verstappen, Alonso and more.</div>';
  html += '</div>';
  html += '<div class="panel daily-card" id="dailyCard"></div>';
  html += '<div class="panel daily-card" id="championCard"></div>';
  app.innerHTML = html;

  var selectedMode = "classic";
  document.querySelectorAll(".mode-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectedMode = btn.getAttribute("data-mode");
      document.querySelectorAll(".mode-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
    });
  });
  document.querySelector('.mode-btn[data-mode="classic"]').classList.add("active");

  document.getElementById("startBtn").addEventListener("click", function () {
    state = freshState(selectedMode);
    render();
  });

  initDaily();
  paintChampion();
}

function modeButton(key, title, desc) {
  return '<div class="mode-btn" data-mode="' + key + '" tabindex="0">' +
    '<span class="display">' + title + '</span><span class="desc">' + desc + '</span></div>';
}
