/* swap.js — The one-time Classic-mode role swap: its UI bar, click handling, and the confirm dialog. */
"use strict";

function swapBar() {
  var filled = state.roles.filter(function (r) { return r.driver; }).length;
  var html = '<div class="swap-bar' + (state.swapMode ? ' active' : '') + (state.swapUsed ? ' used' : '') + '">';
  if (state.swapUsed) {
    html += '<span class="swap-title">Swap used</span><span class="swap-sub">Lineup locked in</span>';
  } else if (state.swapMode) {
    var from = state.swapFrom ? roleByKey(state.swapFrom) : null;
    html += '<div class="swap-text"><span class="swap-title">' + (from ? 'Move ' + from.driver.name : 'Pick a driver to move') + '</span>';
    html += '<span class="swap-sub">' + (from ? 'Tap an open role, or another driver to trade places.' : 'Tap any filled role below.') + '</span></div>';
    html += '<button class="swap-btn" id="swapCancelBtn" type="button">Cancel</button>';
  } else {
    var canSwap = filled > 0 && !state.pickedDriver && !state.spinning;
    html += '<div class="swap-text"><span class="swap-title">Role swap</span><span class="swap-sub">' + (canSwap ? 'One chance to move a driver to another role.' : (state.pickedDriver ? 'Slot your pick first, then you can swap.' : 'Available once you have drafted a driver.')) + '</span></div>';
    html += '<button class="swap-btn" id="swapStartBtn" type="button"' + (canSwap ? '' : ' disabled') + '>Swap (1 left)</button>';
  }
  html += '</div>';
  return html;
}

function roleByKey(key) {
  return state.roles.filter(function (r) { return r.key === key; })[0];
}

/* in-page confirm dialog (native confirm() is blocked in some embedded/hosted pages) */
function confirmDialog(msg, onYes) {
  var overlay = document.createElement("div");
  overlay.className = "confirm-overlay";
  overlay.innerHTML = '<div class="confirm-box" role="dialog" aria-modal="true"><p></p><div class="confirm-actions"><button class="btn secondary confirm-no" type="button">Cancel</button><button class="btn confirm-yes" type="button">Confirm</button></div></div>';
  overlay.querySelector("p").textContent = msg;
  function close() { if (overlay.parentNode) { overlay.parentNode.removeChild(overlay); } }
  overlay.querySelector(".confirm-no").addEventListener("click", close);
  overlay.querySelector(".confirm-yes").addEventListener("click", function () { close(); onYes(); });
  overlay.addEventListener("click", function (e) { if (e.target === overlay) { close(); } });
  document.body.appendChild(overlay);
  overlay.querySelector(".confirm-yes").focus();
}

function handleSwapClick(key) {
  var role = roleByKey(key);
  if (!role) return;
  if (!state.swapFrom) {
    if (role.driver) { state.swapFrom = key; render(); }
    return;
  }
  if (state.swapFrom === key) { state.swapFrom = null; render(); return; } // tap again to deselect
  var from = roleByKey(state.swapFrom);
  var msg = role.driver
    ? "Swap " + from.driver.name + " and " + role.driver.name + " between " + from.name + " and " + role.name + "? This uses your one swap."
    : "Move " + from.driver.name + " from " + from.name + " to " + role.name + "? This uses your one swap.";
  confirmDialog(msg, function () {
    var tmp = role.driver;
    role.driver = from.driver;
    from.driver = tmp; // null when moving into an open role
    state.swapUsed = true;
    state.swapMode = false;
    state.swapFrom = null;
    render();
  });
}

function finishDraft() {
  state.phase = "results";
  state.swapMode = false;
  state.swapFrom = null;
  state.result = simulateSeason(state.roles, state.challenge);
  stats.builds += 1;
  if (stats.bestRank === null || state.result.rank < stats.bestRank) {
    stats.bestRank = state.result.rank;
  }
  saveStats();
  render();
}
