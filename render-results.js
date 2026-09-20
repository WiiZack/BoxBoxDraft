/* render-results.js — Renders the results screen: stat tiles, podium graphic, standings table, lineup cards. */
"use strict";

/* ---------- render: results screen ---------- */
function renderResults() {
  var r = state.result;
  var champion = r.rank === 1;
  var c = r.challenge;
  var html = '';
  html += '<div class="panel record-banner">';
  html += '<div class="sub">' + (champion ? "TOOK ON THE WHOLE GRID AND WON" : "SEASON COMPLETE") + '</div>';
  html += '<div class="big ' + (champion ? "perfect" : "") + '">P' + r.rank + ' of 12</div>';
  html += '<div class="sub">' + r.points + ' points across ' + RACE_COUNT + ' races</div>';
  html += '<div class="stat-tiles">';
  html += statTile("st-win", r.win, "Wins", false);
  html += statTile("st-pole", r.poles, "Poles", r.poles === RACE_COUNT);
  html += statTile("st-pod", r.podiums, "Podiums", r.podiums === RACE_COUNT);
  html += statTile("st-off", r.off, "Off the box", false);
  html += '</div>';
  if (r.poles === RACE_COUNT || r.podiums === RACE_COUNT) {
    var maxBits = [];
    if (r.poles === RACE_COUNT) { maxBits.push("every pole"); }
    if (r.podiums === RACE_COUNT) { maxBits.push("every podium"); }
    html += '<div class="max-banner">PERFECT SEASON &mdash; ' + maxBits.join(" &amp; ") + ' taken</div>';
  }
  if (c) {
    html += '<div class="challenge-result ' + (r.challengeMet ? "met" : "missed") + '">';
    html += '<div class="cr-title">' + (r.challengeMet ? "\u2705 Goal achieved" : "\u274c Goal missed") + ' &mdash; ' + c.label + '</div>';
    html += '<div class="cr-detail">Needed ' + c.poles + '+ poles &amp; ' + c.podiums + '+ podiums &middot; you got ' + r.poles + ' poles &amp; ' + r.podiums + ' podiums</div>';
    html += '</div>';
  }
  html += '<div class="breakdown">';
  html += '<div class="pts"><div class="n">' + r.points + '</div><div class="l">Championship points</div></div>';
  html += '<div class="win"><div class="n">' + r.strength + '</div><div class="l">Grid strength</div></div>';
  html += '<div class="pod"><div class="n">' + r.consistency + '</div><div class="l">Consistency</div></div>';
  html += '</div>';
  html += '<div class="race-strip" id="raceStrip"></div>';
  html += '<div class="strip-legend"><span><i class="lg win"></i>Win</span><span><i class="lg pod"></i>Podium</span><span><i class="lg off"></i>Off the box</span></div>';

  // podium graphic for the top 3 of the final standings
  var top3 = r.standings.slice(0, 3);
  var order = [1, 0, 2]; // display 2nd, 1st, 3rd
  var heights = { 0: 92, 1: 70, 2: 54 };
  html += '<div class="podium">';
  order.forEach(function (i) {
    var row = top3[i];
    if (!row) return;
    var tc = row.you ? "var(--signal)" : teamColor(row.team);
    html += '<div class="podium-slot ' + (row.you ? "you" : "") + '">';
    html += '<div class="plabel">' + (i + 1) + (i === 0 ? "st" : i === 1 ? "nd" : "rd") + '<b>' + row.team + '</b>' + row.points + ' pts</div>';
    html += '<div class="podium-block" style="height:' + heights[i] + 'px;background:' + tc + ';">' + (i + 1) + '</div>';
    html += '</div>';
  });
  html += '</div>';

  html += '<div class="section-title display">Final constructors\u2019 standings</div>';
  html += '<table class="standings"><thead><tr><th>Pos</th><th>Team</th><th style="text-align:right;">Points</th></tr></thead><tbody>';
  r.standings.forEach(function (row, i) {
    var tc = row.you ? "var(--signal)" : teamColor(row.team);
    html += '<tr class="' + (row.you ? "you" : "") + '"><td class="pos">' + (i + 1) + '</td><td><span class="swatch" style="background:' + tc + '"></span>' + row.team + '</td><td class="pts">' + row.points + '</td></tr>';
  });
  html += '</tbody></table>';

  html += '<div class="section-title display">Your lineup</div>';
  html += '<div class="lineup-list">';
  state.roles.forEach(function (role) {
    html += '<div class="lineup-card" style="--team-color:' + teamColor(role.driver.team) + ';">';
    html += '<div class="role">' + role.name + '</div>';
    html += '<div class="name">' + role.driver.name + '</div>';
    html += '<div class="team">' + role.driver.team + ' &middot; ' + role.driver.season + '</div>';
    html += '<div class="fit">Fit ' + roleScore(role, role.driver) + ' / 100</div>';
    html += '</div>';
  });
  html += '</div>';

  html += '<div class="actions-row">';
  html += '<button class="btn" id="againBtn">Build another grid</button>';
  html += '<button class="btn secondary" id="copyBtn">Copy result</button>';
  html += '</div>';
  html += '</div>';

  app.innerHTML = html;
  wireResultsEvents(r);
}
