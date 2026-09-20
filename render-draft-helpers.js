/* render-draft-helpers.js — Small HTML builders used by the draft screen (spin meter, attribute bars, stat tiles). */
"use strict";

function spinMeterRow(st) {
  var out = '<div class="spin-meter-row"><span class="spin-meter-label">Spins</span><div class="spin-meter">';
  for (var i = 0; i < SPINS_PER_ROUND; i++) {
    out += '<span class="spin-pip ' + (i < st.spinsLeft ? "on" : "spent") + '"></span>';
  }
  out += '</div></div>';
  return out;
}

function statTile(cls, value, label, isMax) {
  return '<div class="stat-tile ' + cls + (isMax ? ' is-max' : '') + '"><div class="tile-n">' + value + '</div>' +
    '<div class="tile-l">' + label + '</div><div class="tile-max">' + (isMax ? 'MAX' : 'of ' + RACE_COUNT) + '</div></div>';
}

function attrRow(label, val) {
  return '<div class="attr-row"><span>' + label + '</span><div class="attr-bar"><i style="width:' + val + '%"></i></div><span class="attr-val">' + val + '</span></div>';
}
