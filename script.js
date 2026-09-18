    (function () {
      "use strict";

      /* ---------- driver pool: 2026 grid + past-decade legends ---------- */
      var DRIVERS = [
        // 2026 grid
        { name: "Lando Norris", team: "McLaren", season: 2026, pace: 95, quali: 92, wet: 84, tyre: 88, overtake: 87 },
        { name: "Oscar Piastri", team: "McLaren", season: 2026, pace: 93, quali: 90, wet: 80, tyre: 87, overtake: 86 },
        { name: "George Russell", team: "Mercedes", season: 2026, pace: 89, quali: 90, wet: 82, tyre: 85, overtake: 82 },
        { name: "Kimi Antonelli", team: "Mercedes", season: 2026, pace: 85, quali: 84, wet: 78, tyre: 80, overtake: 80 },
        { name: "Max Verstappen", team: "Red Bull", season: 2026, pace: 97, quali: 91, wet: 89, tyre: 92, overtake: 96 },
        { name: "Isack Hadjar", team: "Red Bull", season: 2026, pace: 82, quali: 80, wet: 76, tyre: 78, overtake: 83 },
        { name: "Charles Leclerc", team: "Ferrari", season: 2026, pace: 90, quali: 94, wet: 80, tyre: 82, overtake: 86 },
        { name: "Lewis Hamilton", team: "Ferrari", season: 2026, pace: 89, quali: 87, wet: 96, tyre: 87, overtake: 86 },
        { name: "Alex Albon", team: "Williams", season: 2026, pace: 84, quali: 83, wet: 79, tyre: 84, overtake: 81 },
        { name: "Carlos Sainz", team: "Williams", season: 2026, pace: 87, quali: 86, wet: 81, tyre: 85, overtake: 84 },
        { name: "Liam Lawson", team: "Racing Bulls", season: 2026, pace: 80, quali: 78, wet: 75, tyre: 79, overtake: 82 },
        { name: "Arvid Lindblad", team: "Racing Bulls", season: 2026, pace: 76, quali: 75, wet: 70, tyre: 74, overtake: 77 },
        { name: "Fernando Alonso", team: "Aston Martin", season: 2026, pace: 87, quali: 85, wet: 93, tyre: 89, overtake: 91 },
        { name: "Lance Stroll", team: "Aston Martin", season: 2026, pace: 76, quali: 76, wet: 74, tyre: 78, overtake: 73 },
        { name: "Esteban Ocon", team: "Haas", season: 2026, pace: 81, quali: 80, wet: 78, tyre: 81, overtake: 79 },
        { name: "Ollie Bearman", team: "Haas", season: 2026, pace: 82, quali: 81, wet: 76, tyre: 80, overtake: 82 },
        { name: "Nico Hulkenberg", team: "Audi", season: 2026, pace: 82, quali: 82, wet: 79, tyre: 83, overtake: 80 },
        { name: "Gabriel Bortoleto", team: "Audi", season: 2026, pace: 79, quali: 78, wet: 74, tyre: 77, overtake: 78 },
        { name: "Pierre Gasly", team: "Alpine", season: 2026, pace: 83, quali: 82, wet: 80, tyre: 81, overtake: 81 },
        { name: "Franco Colapinto", team: "Alpine", season: 2026, pace: 77, quali: 76, wet: 73, tyre: 76, overtake: 79 },
        { name: "Valtteri Bottas", team: "Cadillac", season: 2026, pace: 82, quali: 84, wet: 77, tyre: 82, overtake: 76 },
        { name: "Sergio Perez", team: "Cadillac", season: 2026, pace: 83, quali: 79, wet: 81, tyre: 90, overtake: 86 },
        // past-decade legends
        { name: "Lewis Hamilton", team: "Mercedes", season: 2015, pace: 96, quali: 93, wet: 97, tyre: 88, overtake: 90 },
        { name: "Sebastian Vettel", team: "Ferrari", season: 2015, pace: 90, quali: 88, wet: 82, tyre: 86, overtake: 84 },
        { name: "Nico Rosberg", team: "Mercedes", season: 2015, pace: 87, quali: 91, wet: 70, tyre: 80, overtake: 72 },
        { name: "Daniel Ricciardo", team: "Red Bull", season: 2015, pace: 85, quali: 84, wet: 75, tyre: 89, overtake: 93 },
        { name: "Nico Rosberg", team: "Mercedes", season: 2016, pace: 90, quali: 92, wet: 75, tyre: 82, overtake: 74 },
        { name: "Max Verstappen", team: "Red Bull", season: 2016, pace: 88, quali: 82, wet: 85, tyre: 84, overtake: 92 },
        { name: "Sebastian Vettel", team: "Ferrari", season: 2017, pace: 92, quali: 90, wet: 80, tyre: 87, overtake: 85 },
        { name: "Lewis Hamilton", team: "Mercedes", season: 2017, pace: 96, quali: 95, wet: 97, tyre: 88, overtake: 89 },
        { name: "Valtteri Bottas", team: "Mercedes", season: 2017, pace: 87, quali: 89, wet: 72, tyre: 83, overtake: 75 },
        { name: "Lewis Hamilton", team: "Mercedes", season: 2018, pace: 97, quali: 95, wet: 98, tyre: 89, overtake: 90 },
        { name: "Max Verstappen", team: "Red Bull", season: 2018, pace: 92, quali: 86, wet: 90, tyre: 87, overtake: 95 },
        { name: "Daniel Ricciardo", team: "Red Bull", season: 2018, pace: 87, quali: 86, wet: 77, tyre: 91, overtake: 92 },
        { name: "Lewis Hamilton", team: "Mercedes", season: 2019, pace: 97, quali: 94, wet: 98, tyre: 90, overtake: 89 },
        { name: "Max Verstappen", team: "Red Bull", season: 2019, pace: 93, quali: 88, wet: 90, tyre: 88, overtake: 95 },
        { name: "Charles Leclerc", team: "Ferrari", season: 2019, pace: 89, quali: 93, wet: 80, tyre: 82, overtake: 84 },
        { name: "Lewis Hamilton", team: "Mercedes", season: 2020, pace: 98, quali: 95, wet: 97, tyre: 91, overtake: 88 },
        { name: "Sergio Perez", team: "Racing Point", season: 2020, pace: 84, quali: 80, wet: 82, tyre: 92, overtake: 87 },
        { name: "Max Verstappen", team: "Red Bull", season: 2021, pace: 96, quali: 90, wet: 88, tyre: 91, overtake: 96 },
        { name: "Lewis Hamilton", team: "Mercedes", season: 2021, pace: 97, quali: 93, wet: 98, tyre: 90, overtake: 91 },
        { name: "Sergio Perez", team: "Red Bull", season: 2021, pace: 86, quali: 82, wet: 83, tyre: 93, overtake: 88 },
        { name: "Max Verstappen", team: "Red Bull", season: 2022, pace: 97, quali: 90, wet: 87, tyre: 92, overtake: 96 },
        { name: "Charles Leclerc", team: "Ferrari", season: 2022, pace: 91, quali: 95, wet: 78, tyre: 80, overtake: 86 },
        { name: "George Russell", team: "Mercedes", season: 2022, pace: 88, quali: 87, wet: 79, tyre: 85, overtake: 82 },
        { name: "Max Verstappen", team: "Red Bull", season: 2023, pace: 99, quali: 92, wet: 89, tyre: 93, overtake: 97 },
        { name: "Fernando Alonso", team: "Aston Martin", season: 2023, pace: 90, quali: 87, wet: 92, tyre: 90, overtake: 93 },
        { name: "Lando Norris", team: "McLaren", season: 2024, pace: 90, quali: 91, wet: 82, tyre: 86, overtake: 85 },
        { name: "Oscar Piastri", team: "McLaren", season: 2024, pace: 87, quali: 86, wet: 78, tyre: 87, overtake: 88 }
      ];

      var RIVAL_TEAMS = ["McLaren", "Mercedes", "Red Bull", "Ferrari", "Williams", "Racing Bulls", "Aston Martin", "Haas", "Audi", "Alpine", "Cadillac"];

      var TEAM_COLORS = {
        "McLaren": "#FF8000", "Mercedes": "#00A19B", "Red Bull": "#1E41FF", "Ferrari": "#E8002D",
        "Williams": "#00A3E0", "Racing Bulls": "#1660B0", "Aston Martin": "#229971", "Haas": "#C7CBCE",
        "Audi": "#BB0A30", "Alpine": "#2173B8", "Cadillac": "#C9A227", "Racing Point": "#F363A4"
      };
      function teamColor(team) { return TEAM_COLORS[team] || "#6b6e74"; }

      var HELMET_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 14c0-5 3.5-9 8-9s8 4 8 9v2H4v-2z" fill="#0E0F11" opacity="0.85"/><path d="M4 16h16v1.5c0 1-1 1.8-2 1.8H6c-1 0-2-.8-2-1.8V16z" fill="#0E0F11"/><rect x="9" y="10.5" width="9" height="3" rx="1.2" fill="#F2F1ED"/></svg>';

      var ROLES = [
        { key: "leader", name: "Points Machine", hint: "All-round race pace", weights: { pace: 0.5, quali: 0.2, tyre: 0.15, overtake: 0.15 } },
        { key: "quali", name: "Pole Hunter", hint: "One-lap qualifying speed", weights: { quali: 0.7, pace: 0.3 } },
        { key: "wet", name: "Rain King", hint: "Wet-weather craft", weights: { wet: 0.7, pace: 0.3 } },
        { key: "tyre", name: "Strategist", hint: "Tyre management & race pace", weights: { tyre: 0.6, pace: 0.4 } },
        { key: "overtake", name: "Overtaker", hint: "Wheel-to-wheel racing", weights: { overtake: 0.7, pace: 0.3 } }
      ];

      var RACE_COUNT = 22;
      var POINTS_TABLE = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

      /* ---------- persisted stats ---------- */
      var stats = { builds: 0, bestRank: null };
      try {
        var raw = localStorage.getItem("flawless_2026_stats_v2");
        if (raw) { var parsed = JSON.parse(raw); if (parsed && typeof parsed === "object") { stats = parsed; } }
      } catch (e) { /* storage unavailable — continue with defaults */ }

      function saveStats() {
        try { localStorage.setItem("flawless_2026_stats_v2", JSON.stringify(stats)); } catch (e) { /* ignore */ }
      }

      function renderHeaderStats() {
        document.getElementById("statBuilds").textContent = stats.builds;
        document.getElementById("statBest").textContent = stats.bestRank ? ("P" + stats.bestRank) : "—";
      }

      /* ---------- state ---------- */
      var state = null;
      var spinTimer = null;

      var SPINS_PER_ROUND = 3;

      function freshState(mode) {
        return {
          phase: "drafting",
          mode: mode,
          round: 1,
          roles: ROLES.map(function (r) { return Object.assign({}, r, { driver: null }); }),
          usedNames: [],
          currentDraw: null,
          pickedDriver: null,
          spinning: false,
          spinsLeft: SPINS_PER_ROUND,
          result: null
        };
      }

      /* ---------- helpers ---------- */
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

      function roleScore(role, driver) {
        var w = role.weights, total = 0;
        for (var k in w) { total += (driver[k] || 0) * w[k]; }
        return Math.round(total);
      }

      function teamStats(roles) {
        var scores = roles.map(function (r) { return roleScore(r, r.driver); });
        var avg = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
        var variance = scores.reduce(function (a, b) { return a + Math.pow(b - avg, 2); }, 0) / scores.length;
        var stdev = Math.sqrt(variance);
        return { scores: scores, avg: avg, stdev: stdev };
      }

      function rollToPosition(roll) {
        var pos = Math.round((100 - roll) / 4);
        if (pos < 1) pos = 1;
        if (pos > 20) pos = 20;
        return pos;
      }

      function pointsForPosition(pos) {
        return pos <= 10 ? POINTS_TABLE[pos - 1] : 0;
      }

      function simulateSeason(roles) {
        var t = teamStats(roles);
        var varianceRange = Math.max(12, 34 - t.stdev * 1.1);
        var win = 0, pod = 0, off = 0, log = [], totalPoints = 0;
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
        }
        var standings = buildStandings(totalPoints);
        return {
          win: win, pod: pod, off: off, log: log,
          points: totalPoints,
          strength: Math.round(t.avg),
          consistency: Math.round(100 - t.stdev),
          standings: standings,
          rank: standings.findIndex(function (row) { return row.you; }) + 1
        };
      }

      function buildStandings(yourPoints) {
        var rows = RIVAL_TEAMS.map(function (team) {
          return { team: team, points: Math.floor(Math.random() * 541) + 40, you: false };
        });
        rows.push({ team: "Your Team", points: yourPoints, you: true });
        rows.sort(function (a, b) { return b.points - a.points; });
        return rows;
      }

      /* ---------- render ---------- */
      var app = document.getElementById("app");

      function render() {
        if (!state) { renderSetup(); }
        else if (state.phase === "drafting") { renderDraft(); }
        else if (state.phase === "results") { renderResults(); }
      }

      function renderSetup() {
        var html = '';
        html += '<div class="panel setup-card">';
        html += '<h2 class="display">Can your grid beat all eleven teams?</h2>';
        html += '<p>Draft five drivers &mdash; pulled from the current 2026 field or from any season of the last decade &mdash; into five roles. Then find out if your team could top the Constructors\u2019 Championship against a 2026 field where the new regulations have scrambled everyone\u2019s form.</p>';
        html += '<div class="mode-row">';
        html += modeButton("classic", "Classic", "Full ratings shown while you draft.");
        html += modeButton("expert", "Expert", "Names and teams only. Ratings revealed at the flag.");
        html += '</div>';
        html += '<button class="btn" id="startBtn">Start the draft</button>';
        html += '<div class="roles-legend">';
        ROLES.forEach(function (r) {
          html += '<div class="role-chip"><span class="display">' + r.name + '</span><span class="desc">' + r.hint + '</span></div>';
        });
        html += '</div>';
        html += '<div class="grid-note"><b>Your rivals:</b> all eleven 2026 constructors &mdash; McLaren, Mercedes, Red Bull, Ferrari, Williams, Racing Bulls, Aston Martin, Haas, Audi, Alpine and Cadillac &mdash; each handed a randomised points total. <b>Your draft pool:</b> the 22 drivers on that same 2026 grid, plus a rotating cast of past-decade seasons from Hamilton, Vettel, Verstappen, Alonso and more.</div>';
        html += '</div>';
        app.innerHTML = html;

        var selectedMode = "classic";
        document.querySelectorAll(".mode-btn").forEach(function (btn) {
          btn.addEventListener("click", function () {
            selectedMode = btn.getAttribute("data-mode");
            document.querySelectorAll(".mode-btn").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
          });
        });
        document.querySelector('.mode-btn[data-mode="classic"]').classList.add("active");

        document.getElementById("startBtn").addEventListener("click", function () {
          state = freshState(selectedMode);
          render();
        });
      }

      function modeButton(key, title, desc) {
        return '<div class="mode-btn" data-mode="' + key + '" tabindex="0">' +
          '<span class="display">' + title + '</span><span class="desc">' + desc + '</span></div>';
      }

      function renderDraft() {
        var html = '<div class="progress-row">';
        html += '<div class="progress-dots">';
        for (var i = 1; i <= 5; i++) {
          var cls = i < state.round ? "done" : (i === state.round ? "current" : "");
          html += '<div class="dot ' + cls + '"></div>';
        }
        html += '</div>';
        html += '<div class="progress-label">Round ' + state.round + ' of 5 &middot; ' + (state.mode === "expert" ? "Expert mode" : "Classic mode") + '</div>';
        html += '</div>';

        html += '<div class="draft-grid">';

        html += '<div class="roles-col">';
        state.roles.forEach(function (r) {
          var open = !r.driver && state.pickedDriver;
          html += '<div class="role-slot ' + (r.driver ? "filled" : "") + ' ' + (open ? "open-target" : "") + '" data-role="' + r.key + '" tabindex="' + (open ? "0" : "-1") + '">';
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
        if (state.spinning) {
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
            if (state.mode === "classic") {
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

      function spinMeterRow(st) {
        var out = '<div class="spin-meter-row"><span class="spin-meter-label">Spins</span><div class="spin-meter">';
        for (var i = 0; i < SPINS_PER_ROUND; i++) {
          out += '<span class="spin-pip ' + (i < st.spinsLeft ? "on" : "spent") + '"></span>';
        }
        out += '</div></div>';
        return out;
      }

      function attrRow(label, val) {
        return '<div class="attr-row"><span>' + label + '</span><div class="attr-bar"><i style="width:' + val + '%"></i></div><span class="attr-val">' + val + '</span></div>';
      }

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
            var alreadyPicked = state.pickedDriver && state.pickedDriver.name === d.name && state.pickedDriver.season === d.season;
            state.pickedDriver = alreadyPicked ? null : d; // click again to deselect, click another to swap
            render();
          });
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
              state.phase = "results";
              state.result = simulateSeason(state.roles);
              stats.builds += 1;
              if (stats.bestRank === null || state.result.rank < stats.bestRank) {
                stats.bestRank = state.result.rank;
              }
              saveStats();
            }
            render();
          });
        });
      }

      function renderResults() {
        var r = state.result;
        var champion = r.rank === 1;
        var html = '';
        html += '<div class="panel record-banner">';
        html += '<div class="sub">' + (champion ? "TOOK ON THE WHOLE GRID AND WON" : "SEASON COMPLETE") + '</div>';
        html += '<div class="big ' + (champion ? "perfect" : "") + '">P' + r.rank + ' of 12</div>';
        html += '<div class="sub">' + r.points + ' points &middot; ' + r.win + ' wins &middot; ' + r.pod + ' podiums &middot; ' + r.off + ' off the box, across ' + RACE_COUNT + ' races</div>';
        html += '<div class="breakdown">';
        html += '<div class="pts"><div class="n">' + r.points + '</div><div class="l">Championship points</div></div>';
        html += '<div class="win"><div class="n">' + r.strength + '</div><div class="l">Grid strength</div></div>';
        html += '<div class="pod"><div class="n">' + r.consistency + '</div><div class="l">Consistency</div></div>';
        html += '</div>';
        html += '<div class="race-strip" id="raceStrip"></div>';

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
          var text = "BOX BOX DRAFT — finished P" + r.rank + " of 12, " + r.points + " points\n" + emoji + "\n\n" + lineupText + "\n\nFinal standings:\n" + standingsText;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              copyBtn.textContent = "Copied";
              setTimeout(function () { copyBtn.textContent = "Copy result"; }, 1500);
            }).catch(function () { /* clipboard unavailable — silently ignore */ });
          }
        });
      }

      function goHome() {
        if (state && state.phase === "drafting" && (state.round > 1 || state.roles.some(function (r) { return r.driver; }) || state.pickedDriver)) {
          if (!confirm("Leave this draft? Your progress on this team will be lost.")) return;
        }
        clearInterval(spinTimer);
        state = null;
        render();
      }

      var homeBtn = document.getElementById("homeBtn");
      if (homeBtn) { homeBtn.addEventListener("click", goHome); }

      renderHeaderStats();
      render();
    })();
