/* app-init.js — Screen router, the Home button's leave-draft confirmation, and the app's first paint. */
"use strict";

/* ---------- render: screen router ---------- */
var app = document.getElementById("app");

function render() {
  if (!state) { renderSetup(); }
  else if (state.phase === "drafting" || state.phase === "review") { renderDraft(); }
  else if (state.phase === "results") { renderResults(); }
}

/* ---------- init: home navigation & first paint ---------- */
function goHome() {
  function leave() {
    clearInterval(spinTimer);
    state = null;
    render();
  }
  if (state && (state.phase === "drafting" || state.phase === "review") && (state.round > 1 || state.roles.some(function (r) { return r.driver; }) || state.pickedDriver)) {
    confirmDialog("Leave this draft? Your progress on this team will be lost.", leave);
    return;
  }
  leave();
}

var homeBtn = document.getElementById("homeBtn");
if (homeBtn) { homeBtn.addEventListener("click", goHome); }

renderHeaderStats();
render();
