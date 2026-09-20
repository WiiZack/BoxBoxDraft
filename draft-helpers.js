/* draft-helpers.js — Shuffling the pool and drawing four drivers for a spin. */
"use strict";

/* ---------- draft helpers: shuffling & drawing the pool ---------- */
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function availablePool(st) {
  return DRIVERS.filter(function (d) { return st.usedNames.indexOf(d.name) === -1; });
}

function drawDrivers(st) {
  return shuffle(availablePool(st)).slice(0, 4);
}
