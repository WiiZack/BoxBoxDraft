/* render-draft.js — Renders the draft screen: role slots, the four-card draw, and pick/assign UI. */
"use strict";

/* ---------- render: draft screen (spin, pick, assign) ---------- */
function renderDraft() {
  var html = '<div class="progress-row">';
  html += '<div class="progress-dots">';
  for (var i = 1; i <= 5; i++) {
    var cls = i < state.round ? "done" : (i === state.round ? "current" : "");
    html += '<div class="dot ' + cls + '"></div>';
  }
  html += '</div>';
  html += '<div class="progress-label">' + (state.phase === "review" ? "Lineup complete" : "Round " + state.round + " of 5") + ' &middot; ' + (state.mode === "expert" ? "Expert mode" : state.mode === "challenge" ? "Challenge mode" : "Classic mode") + '</div>';
  html += '</div>';

  html += '<div class="draft-grid">';

  html += '<div class="roles-col">';
  if (state.challenge) {
    html += '<div class="challenge-card"><div class="challenge-label">SEASON GOAL &middot; ' + state.challenge.label + '</div><div class="challenge-targets"><span>' + state.challenge.poles + '+ poles</span><span>' + state.challenge.podiums + '+ podiums</span></div></div>';
  }
  if (swapEnabled(state)) { html += swapBar(); }
  state.roles.forEach(function (r) {
    var open = !r.driver && state.pickedDriver;
    var swapCls = "";
    if (state.swapMode) {
      if (state.swapFrom === r.key) { swapCls = "swap-source"; }
      else if (state.swapFrom) { swapCls = "swap-dest"; }
      else if (r.driver) { swapCls = "swap-pick"; }
    }
    var focusable = open || swapCls;
    html += '<div class="role-slot ' + (r.driver ? "filled" : "") + ' ' + (open ? "open-target" : "") + ' ' + swapCls + '" data-role="' + r.key + '" tabindex="' + (focusable ? "0" : "-1") + '">';
    html += '<div class="role-name display">' + r.name + '</div>';
    if (r.driver) {
      html += '<div class="filled-driver"><div><div class="name"><span class="swatch" style="background:' + teamColor(r.driver.team) + '"></span>' + r.driver.name + '</div><div class="team">' + r.driver.team + ' &middot; ' + r.driver.season + '</div></div>' +
        '<div class="score mono">' + roleScore(r, r.driver) + '</div></div>';
    } else {
      html += '<div class="role-hint">' + r.hint + '</div>';
    }
    html += '</div>';
  });
  html += '</div>';

  html += '<div class="panel draft-area">';
  if (state.phase === "review") {
    html += '<div class="spin-zone review-zone">';
    html += '<div class="display" style="font-size:22px;">Lineup complete</div>';
    if (!state.swapUsed) {
      html += '<p>All five roles are filled. You still have your <b>one swap</b> &mdash; use the button on the left to move a driver into a better-suited role. Happy with it? Send it.</p>';
    } else {
      html += '<p>Swap used. Your lineup is locked in &mdash; time to see how it stacks up against the grid.</p>';
    }
    html += '<button class="btn" id="runSeasonBtn">Run the season</button>';
    html += '</div>';
  } else if (state.spinning) {
    html += '<div class="spin-zone">';
    html += '<div class="display" style="font-size:22px;">Pulling from the grid&hellip;</div>';
    html += '<div class="reel"><span class="reel-text mono" id="reelText">&nbsp;</span></div>';
    html += spinMeterRow(state);
    html += '</div>';
  } else if (!state.currentDraw) {
    html += '<div class="spin-zone">';
    html += '<div class="display" style="font-size:22px;">Pull four from the grid</div>';
    html += '<p>Draws four drivers at random from the pool &mdash; current 2026 racers and past-decade seasons alike, minus anyone you\u2019ve already drafted. You get ' + SPINS_PER_ROUND + ' spins each round to reroll the draw before you have to pick.</p>';
    html += spinMeterRow(state);
    html += '<button class="btn" id="spinBtn">Spin<span class="spin-hint-count">' + state.spinsLeft + ' of ' + SPINS_PER_ROUND + ' spins left</span></button>';
    html += '</div>';
  } else {
    var remaining = availablePool(state).length;
    html += '<div class="pool-tag"><span>Drawn from the grid</span><span class="count">' + remaining + ' left in the pool</span></div>';
    if (!state.pickedDriver) { html += spinMeterRow(state); }
    html += '<div class="cards-grid">';
    state.currentDraw.forEach(function (d, idx) {
      var picked = state.pickedDriver && state.pickedDriver.name === d.name && state.pickedDriver.season === d.season;
      var unselected = state.pickedDriver && !picked;
      var tc = teamColor(d.team);
      html += '<div class="driver-card ' + (picked ? "picked" : "") + ' ' + (unselected ? "unselected" : "") + '" style="--team-color:' + tc + ';animation-delay:' + (idx * 0.07) + 's;" data-idx="' + idx + '" tabindex="0" aria-pressed="' + (picked ? "true" : "false") + '">';
      html += '<div class="avatar-row"><div class="avatar" style="background:' + tc + '22;border:1px solid ' + tc + ';">' + HELMET_SVG + '</div><div class="name-block"><span class="dname">' + d.name + '</span><div class="dteam">' + d.team + ' &middot; ' + d.season + '</div></div></div>';
      if (state.mode === "classic" || state.mode === "challenge") {
        html += '<div class="attrs">';
        html += attrRow("PACE", d.pace);
        html += attrRow("QUALI", d.quali);
        html += attrRow("WET", d.wet);
        html += attrRow("TYRE", d.tyre);
        html += attrRow("OVERTAKE", d.overtake);
        html += '</div>';
      } else {
        html += '<div class="expert-note">Stats hidden &mdash; draft on instinct.</div>';
      }
      html += '</div>';
    });
    html += '</div>';
    if (state.pickedDriver) {
      html += '<div class="assign-hint">' + state.pickedDriver.name + ' is selected &mdash; tap an open role on the left to slot them in, or tap another driver above to swap your pick.</div>';
    } else if (state.spinsLeft > 0) {
      html += '<div class="respin-row"><button class="btn respin" id="respinBtn">Respin (' + state.spinsLeft + ' left)</button></div>';
    } else {
      html += '<div class="respin-row"><span class="out-of-spins">Out of spins this round &mdash; pick one of these four</span></div>';
    }
  }
  html += '</div>';
  html += '</div>';

  app.innerHTML = html;
  wireDraftEvents();
  if (state.spinning) { runSpinAnimation(); }
}
