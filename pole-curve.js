/* pole-curve.js — The 'elite lineup' dominance curve that makes near-perfect teams capable of sweeping poles. */
"use strict";

/* ---------- dominance: elite lineups can sweep the season ----------
   Below ~92 the maths is untouched. Above it, race-to-race randomness shrinks
   and a small strength bonus kicks in, so a genuinely all-95+ lineup can reach
   22/22 podiums and 22/22 poles (still not guaranteed — poles need a dream
   Pole Hunter as well as a strong supporting cast). */
function dominance(value, floor, span) {
  return Math.min(1, Math.max(0, (value - floor) / span));
}

// per-race pole chance for elite qualifying strength: ~55% at 94, ~85% at 95,
// ~95% at 96, ~99% at 97 — so 22/22 poles needs an all-95+ lineup with a
// near-perfect Pole Hunter, and even then it isn't a given
var ELITE_POLE_CURVE = [[92, 0], [94, 0.55], [95, 0.85], [96, 0.95], [97, 0.99], [98, 1]];

function elitePoleChance(qs) {
  var c = ELITE_POLE_CURVE;
  if (qs <= c[0][0]) return 0;
  for (var i = 1; i < c.length; i++) {
    if (qs <= c[i][0]) {
      var a = c[i - 1], b = c[i];
      return a[1] + (b[1] - a[1]) * (qs - a[0]) / (b[0] - a[0]);
    }
  }
  return 1;
}
