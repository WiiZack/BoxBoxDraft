/* results-events.js — Wires up the results screen: race-strip animation, 'build another' and 'copy result' buttons. */
"use strict";

function wireResultsEvents(r) {

  var strip = document.getElementById("raceStrip");
  r.log.forEach(function (cat, i) {
    var sq = document.createElement("div");
    sq.className = "race-sq " + cat;
    sq.style.animationDelay = (i * 0.035) + "s";
    strip.appendChild(sq);
  });

  document.getElementById("againBtn").addEventListener("click", function () {
    state = freshState(state.mode);
    render();
  });
  var copyBtn = document.getElementById("copyBtn");
  copyBtn.addEventListener("click", function () {
    var emoji = r.log.map(function (c) { return c === "win" ? "\ud83d\udfe9" : c === "pod" ? "\ud83d\udfe8" : "\u2b1b"; }).join("");
    var lineupText = state.roles.map(function (role) { return role.name + ": " + role.driver.name + " (" + role.driver.team + " " + role.driver.season + ")"; }).join("\n");
    var standingsText = r.standings.map(function (row, i) { return (i + 1) + ". " + row.team + " — " + row.points; }).join("\n");
    var text = "BOX BOX DRAFT — finished P" + r.rank + " of 12, " + r.points + " points, " + r.win + " wins, " + r.poles + " poles, " + r.podiums + " podiums\n" + emoji + "\n\n" + lineupText + "\n\nFinal standings:\n" + standingsText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = "Copied";
        setTimeout(function () { copyBtn.textContent = "Copy result"; }, 1500);
      }).catch(function () { /* clipboard unavailable — silently ignore */ });
    }
  });
}
