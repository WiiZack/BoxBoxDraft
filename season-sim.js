/* season-sim.js — Runs the 22-race season simulation and builds the final constructor standings. */
"use strict";

function simulateSeason(roles, challenge) {
  var t = teamStats(roles);
  var raceDom = dominance(t.avg, 92, 5);
  var baseRange = 34 - raceDom * 20;
  var minRange = 12 - raceDom * 8;
  var varianceRange = Math.max(minRange, baseRange - t.stdev * 1.1);

  // qualifying strength leans heavily on the Pole Hunter's driver, with the
  // rest of the lineup's quali pace folded in as a smaller supporting factor
  var poleHunterRole = roles.filter(function (r) { return r.key === "quali"; })[0];
  var qualiAvg = roles.reduce(function (a, r) { return a + (r.driver ? r.driver.quali : 0); }, 0) / roles.length;
  var qualiStrength = poleHunterRole && poleHunterRole.driver
    ? poleHunterRole.driver.quali * 0.65 + qualiAvg * 0.35
    : qualiAvg;
  // normal pole chance: same random-spread roll as before (pole = "P1" on the roll)
  var normalPoleChance = Math.min(1, Math.max(0, (qualiStrength + varianceRange - 94) / (2 * varianceRange)));
  // elite lineups get lifted by the curve; everyone else keeps their normal chance
  var poleChance = Math.max(normalPoleChance, elitePoleChance(qualiStrength));

  var win = 0, pod = 0, off = 0, poles = 0, log = [], totalPoints = 0;
  for (var i = 0; i < RACE_COUNT; i++) {
    var rollA = t.avg + (Math.random() * 2 - 1) * varianceRange;
    var rollB = t.avg + (Math.random() * 2 - 1) * varianceRange;
    var posA = rollToPosition(rollA);
    var posB = rollToPosition(rollB);
    totalPoints += pointsForPosition(posA) + pointsForPosition(posB);
    var best = Math.min(posA, posB);
    var cat = best === 1 ? "win" : (best <= 3 ? "pod" : "off");
    if (cat === "win") win++; else if (cat === "pod") pod++; else off++;
    log.push(cat);

    if (Math.random() < poleChance) poles++;
  }
  var standings = buildStandings(totalPoints);
  // a win is also a podium, so podiums = wins + the P2/P3 finishes
  var podiums = win + pod;
  var challengeMet = challenge ? (poles >= challenge.poles && podiums >= challenge.podiums) : false;
  return {
    win: win, pod: pod, podiums: podiums, off: off, poles: poles, log: log,
    points: totalPoints,
    strength: Math.round(t.avg),
    consistency: Math.round(100 - t.stdev),
    standings: standings,
    rank: standings.findIndex(function (row) { return row.you; }) + 1,
    challenge: challenge,
    challengeMet: challengeMet
  };
}

function buildStandings(yourPoints) {
  var rows = RIVAL_TEAMS.map(function (team) {
    var isTop = TOP_TEAMS.indexOf(team) !== -1;
    // top teams roll from a higher band so they land near the front more often,
    // while the random spread still leaves room for a midfield team to sneak up
    var points = isTop
      ? Math.floor(Math.random() * 360) + 300  // 300–659
      : Math.floor(Math.random() * 420) + 60;   // 60–479
    return { team: team, points: points, you: false };
  });
  rows.push({ team: "Your Team", points: yourPoints, you: true });
  rows.sort(function (a, b) { return b.points - a.points; });
  return rows;
}
