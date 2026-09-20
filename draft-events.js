/* draft-events.js — Spin animation and all click handling on the draft screen. */
"use strict";

function runSpinAnimation() {
  var el = document.getElementById("reelText");
  if (!el) return;
  var pool = availablePool(state);
  var ticks = 0;
  clearInterval(spinTimer);
  spinTimer = setInterval(function () {
    var d = pool[Math.floor(Math.random() * pool.length)];
    if (el) el.textContent = d ? d.name : "";
    ticks++;
    if (ticks > 12) {
      clearInterval(spinTimer);
      state.spinning = false;
      state.currentDraw = drawDrivers(state);
      render();
    }
  }, 65);
}

function useSpin() {
  if (state.spinsLeft <= 0 || state.pickedDriver) return;
  state.swapMode = false; state.swapFrom = null;
  state.spinsLeft -= 1;
  state.spinning = true;
  render();
}

function wireDraftEvents() {
  var spinBtn = document.getElementById("spinBtn");
  if (spinBtn) { spinBtn.addEventListener("click", useSpin); }
  var respinBtn = document.getElementById("respinBtn");
  if (respinBtn) { respinBtn.addEventListener("click", useSpin); }
  document.querySelectorAll(".driver-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var idx = parseInt(card.getAttribute("data-idx"), 10);
      var d = state.currentDraw[idx];
      state.swapMode = false; state.swapFrom = null; // picking a driver cancels an in-progress swap
      var alreadyPicked = state.pickedDriver && state.pickedDriver.name === d.name && state.pickedDriver.season === d.season;
      state.pickedDriver = alreadyPicked ? null : d; // click again to deselect, click another to swap
      render();
    });
  });
  var swapStart = document.getElementById("swapStartBtn");
  if (swapStart) { swapStart.addEventListener("click", function () { state.swapMode = true; state.swapFrom = null; render(); }); }
  var swapCancel = document.getElementById("swapCancelBtn");
  if (swapCancel) { swapCancel.addEventListener("click", function () { state.swapMode = false; state.swapFrom = null; render(); }); }
  var runBtn = document.getElementById("runSeasonBtn");
  if (runBtn) { runBtn.addEventListener("click", finishDraft); }
  document.querySelectorAll(".role-slot.swap-pick, .role-slot.swap-dest, .role-slot.swap-source").forEach(function (slot) {
    slot.addEventListener("click", function () { handleSwapClick(slot.getAttribute("data-role")); });
  });
  document.querySelectorAll(".role-slot.open-target").forEach(function (slot) {
    slot.addEventListener("click", function () {
      var key = slot.getAttribute("data-role");
      var role = state.roles.filter(function (r) { return r.key === key; })[0];
      if (!role || role.driver) return;
      role.driver = state.pickedDriver;
      state.usedNames.push(state.pickedDriver.name);
      state.pickedDriver = null;
      state.currentDraw = null;
      state.spinsLeft = SPINS_PER_ROUND;
      state.round += 1;
      if (state.round > 5) {
        // classic mode still holds an unused swap: pause on a review screen before simulating
        if (swapEnabled(state) && !state.swapUsed) { state.phase = "review"; }
        else { finishDraft(); return; }
      }
      render();
    });
  });
}
