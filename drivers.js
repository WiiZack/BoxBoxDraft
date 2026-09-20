/* ==========================================================
   drivers.js — the driver & team data for Box Box Draft
   ----------------------------------------------------------
   Contains the full draftable driver pool (2026 grid plus
   historic seasons back to 2005), the eleven 2026 rival
   constructors, and each team's brand color. Loaded before
   script.js, which reads these as plain globals.
   ========================================================== */

/* ---------- driver pool: 2026 grid + past-decade legends ---------- */
var DRIVERS = [
  // 2026 grid
  { name: "Lando Norris", team: "McLaren", season: 2026, pace: 95, quali: 92, wet: 94, tyre: 91, overtake: 92 },
  { name: "Oscar Piastri", team: "McLaren", season: 2026, pace: 93, quali: 90, wet: 80, tyre: 87, overtake: 86 },
  { name: "George Russell", team: "Mercedes", season: 2026, pace: 92, quali: 92, wet: 90, tyre: 89, overtake: 92 },
  { name: "Kimi Antonelli", team: "Mercedes", season: 2026, pace: 93, quali: 93, wet: 90, tyre: 90, overtake: 94 },
  { name: "Max Verstappen", team: "Red Bull", season: 2026, pace: 97, quali: 91, wet: 96, tyre: 92, overtake: 96 },
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
  // 1970s-80s icons: two of the sport's most famous rivalries.
  // Senna's raw speed and overtaking were unmatched; Lauda's precision (tyre management
  // and cool-headed wet-weather racing after his '76 comeback) made him "The Computer".
  { name: "Ayrton Senna", team: "McLaren", season: 1988, pace: 99, quali: 91, wet: 92, tyre: 90, overtake: 99 },
  { name: "Alain Prost", team: "McLaren", season: 1989, pace: 90, quali: 95, wet: 90, tyre: 98, overtake: 90 },
  { name: "Niki Lauda", team: "Ferrari", season: 1976, pace: 90, quali: 90, wet: 99, tyre: 99, overtake: 90 },
  { name: "James Hunt", team: "McLaren", season: 1976, pace: 86, quali: 85, wet: 93, tyre: 85, overtake: 93 },
  // 2005 — champion Alonso (Renault), runner-up Räikkönen (McLaren), top 4 rounded out by Montoya & Schumacher
  // this era's tyre-management focus (one set per race, no changes allowed) makes it a showcase for the Strategist role
  { name: "Fernando Alonso", team: "Renault", season: 2005, pace: 96, quali: 95, wet: 95, tyre: 97, overtake: 95 },
  { name: "Kimi Raikkonen", team: "McLaren", season: 2005, pace: 97, quali: 95, wet: 95, tyre: 95, overtake: 95 },
  { name: "Juan Pablo Montoya", team: "McLaren", season: 2005, pace: 89, quali: 90, wet: 80, tyre: 82, overtake: 91 },
  { name: "Michael Schumacher", team: "Ferrari", season: 2005, pace: 98, quali: 97, wet: 98, tyre: 97, overtake: 97 },
  // 2006 — champion Alonso (Renault, back-to-back title), runner-up Schumacher (Ferrari, dramatic farewell season)
  { name: "Fernando Alonso", team: "Renault", season: 2006, pace: 94, quali: 90, wet: 91, tyre: 96, overtake: 89 },
  { name: "Michael Schumacher", team: "Ferrari", season: 2006, pace: 98, quali: 97, wet: 97, tyre: 97, overtake: 97 },
  { name: "Felipe Massa", team: "Ferrari", season: 2006, pace: 87, quali: 88, wet: 78, tyre: 83, overtake: 82 },
  { name: "Kimi Raikkonen", team: "McLaren", season: 2006, pace: 92, quali: 89, wet: 84, tyre: 89, overtake: 84 },
  // 2007 — champion Räikkönen (Ferrari, snatched it in the last race — legendary tyre management that year)
  // runners-up Hamilton & Alonso tied on points as feuding McLaren teammates
  { name: "Kimi Raikkonen", team: "Ferrari", season: 2007, pace: 95, quali: 90, wet: 88, tyre: 97, overtake: 87 },
  { name: "Lewis Hamilton", team: "McLaren", season: 2007, pace: 93, quali: 92, wet: 92, tyre: 85, overtake: 88 },
  { name: "Fernando Alonso", team: "McLaren", season: 2007, pace: 92, quali: 89, wet: 90, tyre: 88, overtake: 87 },
  // 2008 — champion Hamilton (McLaren, won on the final corner of the final race), runner-up Massa (Ferrari, lost by one point at home)
  { name: "Lewis Hamilton", team: "McLaren", season: 2008, pace: 94, quali: 92, wet: 95, tyre: 86, overtake: 89 },
  { name: "Felipe Massa", team: "Ferrari", season: 2008, pace: 90, quali: 90, wet: 82, tyre: 85, overtake: 85 },
  // 2009 — champion Button (Brawn GP), runner-up Vettel (Red Bull), plus the rest of that title fight
  { name: "Jenson Button", team: "Brawn GP", season: 2009, pace: 92, quali: 91, wet: 93, tyre: 90, overtake: 90 },
  { name: "Sebastian Vettel", team: "Red Bull", season: 2009, pace: 89, quali: 90, wet: 78, tyre: 82, overtake: 82 },
  { name: "Mark Webber", team: "Red Bull", season: 2009, pace: 90, quali: 92, wet: 88, tyre: 90, overtake: 91 },
  { name: "Rubens Barrichello", team: "Brawn GP", season: 2009, pace: 91, quali: 90, wet: 90, tyre: 91, overtake: 90 },
  // 2010 — champion Vettel (Red Bull), runner-up Alonso (Ferrari) — decided at the final race
  { name: "Sebastian Vettel", team: "Red Bull", season: 2010, pace: 92, quali: 93, wet: 80, tyre: 84, overtake: 84 },
  { name: "Fernando Alonso", team: "Ferrari", season: 2010, pace: 93, quali: 91, wet: 93, tyre: 91, overtake: 92 },
  // 2011 — champion Vettel (Red Bull), runner-up Button (McLaren)
  { name: "Sebastian Vettel", team: "Red Bull", season: 2011, pace: 95, quali: 96, wet: 85, tyre: 86, overtake: 86 },
  { name: "Jenson Button", team: "McLaren", season: 2011, pace: 90, quali: 90, wet: 94, tyre: 90, overtake: 90 },
  // 2012 — champion Vettel (Red Bull), runner-up Alonso (Ferrari) — one of Alonso's best-ever drives, plus the rest of the fight
  { name: "Sebastian Vettel", team: "Red Bull", season: 2012, pace: 93, quali: 92, wet: 83, tyre: 85, overtake: 88 },
  { name: "Fernando Alonso", team: "Ferrari", season: 2012, pace: 94, quali: 91, wet: 95, tyre: 91, overtake: 94 },
  { name: "Kimi Raikkonen", team: "Lotus", season: 2012, pace: 90, quali: 87, wet: 87, tyre: 93, overtake: 85 },
  { name: "Mark Webber", team: "Red Bull", season: 2012, pace: 90, quali: 91, wet: 87, tyre: 90, overtake: 90 },
  // 2013 — champion Vettel (Red Bull), 9 wins in a row; runner-up Alonso (Ferrari)
  { name: "Sebastian Vettel", team: "Red Bull", season: 2013, pace: 99, quali: 97, wet: 97, tyre: 97, overtake: 97 },
  { name: "Fernando Alonso", team: "Ferrari", season: 2013, pace: 92, quali: 91, wet: 92, tyre: 90, overtake: 91 },
  // 2014 — champion Hamilton (Mercedes), runner-up Rosberg (Mercedes), start of the hybrid era
  { name: "Lewis Hamilton", team: "Mercedes", season: 2014, pace: 96, quali: 94, wet: 96, tyre: 89, overtake: 88 },
  { name: "Nico Rosberg", team: "Mercedes", season: 2014, pace: 90, quali: 92, wet: 74, tyre: 82, overtake: 76 },
  // 2015 — champion Hamilton (Mercedes), runner-up Rosberg (Mercedes)
  { name: "Lewis Hamilton", team: "Mercedes", season: 2015, pace: 96, quali: 93, wet: 97, tyre: 88, overtake: 90 },
  { name: "Sebastian Vettel", team: "Ferrari", season: 2015, pace: 90, quali: 88, wet: 82, tyre: 86, overtake: 84 },
  { name: "Nico Rosberg", team: "Mercedes", season: 2015, pace: 87, quali: 91, wet: 70, tyre: 80, overtake: 72 },
  { name: "Daniel Ricciardo", team: "Red Bull", season: 2015, pace: 85, quali: 84, wet: 75, tyre: 89, overtake: 93 },
  { name: "Nico Rosberg", team: "Mercedes", season: 2016, pace: 90, quali: 92, wet: 75, tyre: 82, overtake: 74 },
  { name: "Max Verstappen", team: "Red Bull", season: 2016, pace: 88, quali: 82, wet: 85, tyre: 84, overtake: 92 },
  { name: "Kimi Raikkonen", team: "Ferrari", season: 2016, pace: 88, quali: 85, wet: 83, tyre: 93, overtake: 83 },
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
  { name: "Max Verstappen", team: "Red Bull", season: 2023, pace: 99, quali: 97, wet: 97, tyre: 97, overtake: 98 },
  { name: "Fernando Alonso", team: "Aston Martin", season: 2023, pace: 90, quali: 87, wet: 92, tyre: 90, overtake: 93 },
  { name: "Lando Norris", team: "McLaren", season: 2024, pace: 90, quali: 91, wet: 82, tyre: 86, overtake: 85 },
  { name: "Oscar Piastri", team: "McLaren", season: 2024, pace: 87, quali: 86, wet: 78, tyre: 87, overtake: 88 }
];

var RIVAL_TEAMS = ["McLaren", "Mercedes", "Red Bull", "Ferrari", "Williams", "Racing Bulls", "Aston Martin", "Haas", "Audi", "Alpine", "Cadillac"];
var TOP_TEAMS = ["Red Bull", "Mercedes", "McLaren", "Ferrari"]; // biased to finish near the front, but not guaranteed

/* ---------- World Drivers' Champions, 2001–2025 (for the "What champion are you?" spin) ---------- */
var WORLD_CHAMPIONS = [
  { year: 2001, name: "Michael Schumacher", team: "Ferrari" },
  { year: 2002, name: "Michael Schumacher", team: "Ferrari" },
  { year: 2003, name: "Michael Schumacher", team: "Ferrari" },
  { year: 2004, name: "Michael Schumacher", team: "Ferrari" },
  { year: 2005, name: "Fernando Alonso", team: "Renault" },
  { year: 2006, name: "Fernando Alonso", team: "Renault" },
  { year: 2007, name: "Kimi Raikkonen", team: "Ferrari" },
  { year: 2008, name: "Lewis Hamilton", team: "McLaren" },
  { year: 2009, name: "Jenson Button", team: "Brawn GP" },
  { year: 2010, name: "Sebastian Vettel", team: "Red Bull" },
  { year: 2011, name: "Sebastian Vettel", team: "Red Bull" },
  { year: 2012, name: "Sebastian Vettel", team: "Red Bull" },
  { year: 2013, name: "Sebastian Vettel", team: "Red Bull" },
  { year: 2014, name: "Lewis Hamilton", team: "Mercedes" },
  { year: 2015, name: "Lewis Hamilton", team: "Mercedes" },
  { year: 2016, name: "Nico Rosberg", team: "Mercedes" },
  { year: 2017, name: "Lewis Hamilton", team: "Mercedes" },
  { year: 2018, name: "Lewis Hamilton", team: "Mercedes" },
  { year: 2019, name: "Lewis Hamilton", team: "Mercedes" },
  { year: 2020, name: "Lewis Hamilton", team: "Mercedes" },
  { year: 2021, name: "Max Verstappen", team: "Red Bull" },
  { year: 2022, name: "Max Verstappen", team: "Red Bull" },
  { year: 2023, name: "Max Verstappen", team: "Red Bull" },
  { year: 2024, name: "Max Verstappen", team: "Red Bull" },
  { year: 2025, name: "Lando Norris", team: "McLaren" }
];

var TEAM_COLORS = {
  "McLaren": "#FF8000", "Mercedes": "#00A19B", "Red Bull": "#1E41FF", "Ferrari": "#E8002D",
  "Williams": "#00A3E0", "Racing Bulls": "#1660B0", "Aston Martin": "#229971", "Haas": "#C7CBCE",
  "Audi": "#BB0A30", "Alpine": "#2173B8", "Cadillac": "#C9A227", "Racing Point": "#F363A4",
  "Brawn GP": "#7FBF3F", "Lotus": "#C7A339", "Renault": "#FFD500",
  "Sauber": "#52E252", "Alfa Romeo": "#9B0000", "Toro Rosso": "#469BFF", "AlphaTauri": "#2B4562",
  "Marussia": "#B00020", "Manor": "#E03A3E", "Caterham": "#00754A"
};
function teamColor(team) { return TEAM_COLORS[team] || "#6b6e74"; }


/* ---------- daily number spin: who has raced each number ----------
   Source: the official permanent-number system (2014-2026), plus stand-in
   appearances on temporary numbers and three pre-2014 legends whose numbers
   are iconic. now = on the 2026 grid, sub = stand-in / temporary number,
   legend = pre-2014 icon. Numbers not listed here were never raced. */
var NUMBER_DRIVERS = {
  1: [{ name: "Lando Norris", team: "McLaren", years: "2026", now: true }, { name: "Max Verstappen", team: "Red Bull", years: "2022-25" }, { name: "Sebastian Vettel", team: "Red Bull", years: "2014" }],
  2: [{ name: "Stoffel Vandoorne", team: "McLaren", years: "2017-18" }, { name: "Logan Sargeant", team: "Williams", years: "2023-24" }],
  3: [{ name: "Max Verstappen", team: "Red Bull", years: "2026-", now: true }, { name: "Daniel Ricciardo", team: "Red Bull, McLaren", years: "2014-24" }],
  4: [{ name: "Lando Norris", team: "McLaren", years: "2019-25" }, { name: "Max Chilton", team: "Marussia", years: "2014" }],
  5: [{ name: "Gabriel Bortoleto", team: "Audi", years: "2025-", now: true }, { name: "Sebastian Vettel", team: "Ferrari, Aston Martin", years: "2015-22" }, { name: "Nigel Mansell", team: "Williams", years: "1991-92", legend: true }],
  6: [{ name: "Isack Hadjar", team: "Red Bull", years: "2025-", now: true }, { name: "Nico Rosberg", team: "Mercedes", years: "2014-16" }, { name: "Nicholas Latifi", team: "Williams", years: "2020-22" }],
  7: [{ name: "Kimi Raikkonen", team: "Ferrari, Alfa Romeo", years: "2014-21" }, { name: "Jack Doohan", team: "Alpine", years: "2025" }],
  8: [{ name: "Romain Grosjean", team: "Lotus, Haas", years: "2014-20" }],
  9: [{ name: "Marcus Ericsson", team: "Sauber", years: "2014-18" }, { name: "Nikita Mazepin", team: "Haas", years: "2021" }],
  10: [{ name: "Pierre Gasly", team: "Alpine", years: "2017-", now: true }, { name: "Kamui Kobayashi", team: "Caterham", years: "2014" }],
  11: [{ name: "Sergio Perez", team: "Cadillac", years: "2014-", now: true }],
  12: [{ name: "Kimi Antonelli", team: "Mercedes", years: "2025-", now: true }, { name: "Ayrton Senna", team: "Lotus, McLaren", years: "1985-88", legend: true }, { name: "Felipe Nasr", team: "Sauber", years: "2015-16" }],
  13: [{ name: "Pastor Maldonado", team: "Lotus", years: "2014-15" }],
  14: [{ name: "Fernando Alonso", team: "Aston Martin", years: "2014-", now: true }],
  16: [{ name: "Charles Leclerc", team: "Ferrari", years: "2018-", now: true }],
  17: [{ name: "Jules Bianchi", team: "Marussia", years: "2014", note: "Number retired in his honour" }],
  18: [{ name: "Lance Stroll", team: "Aston Martin", years: "2017-", now: true }],
  19: [{ name: "Felipe Massa", team: "Williams", years: "2014-17" }],
  20: [{ name: "Kevin Magnussen", team: "Haas, McLaren", years: "2014-24" }],
  21: [{ name: "Esteban Gutierrez", team: "Sauber, Haas", years: "2014-16" }, { name: "Nyck de Vries", team: "AlphaTauri", years: "2023" }],
  22: [{ name: "Jenson Button", team: "McLaren", years: "2014-17" }, { name: "Yuki Tsunoda", team: "Red Bull, AlphaTauri", years: "2021-25" }],
  23: [{ name: "Alex Albon", team: "Williams", years: "2019-", now: true }],
  24: [{ name: "Zhou Guanyu", team: "Alfa Romeo, Sauber", years: "2022-24" }],
  25: [{ name: "Jean-Eric Vergne", team: "Toro Rosso", years: "2014" }],
  26: [{ name: "Daniil Kvyat", team: "Toro Rosso, Red Bull", years: "2014-20" }],
  27: [{ name: "Nico Hulkenberg", team: "Audi", years: "2014-", now: true }, { name: "Gilles Villeneuve", team: "Ferrari", years: "1981-82", legend: true }],
  28: [{ name: "Brendon Hartley", team: "Toro Rosso", years: "2017-18" }, { name: "Will Stevens", team: "Manor", years: "2015" }],
  30: [{ name: "Liam Lawson", team: "Racing Bulls", years: "2024-", now: true }, { name: "Jolyon Palmer", team: "Renault", years: "2016-17" }],
  31: [{ name: "Esteban Ocon", team: "Haas", years: "2016-", now: true }],
  33: [{ name: "Max Verstappen", team: "Red Bull", years: "2015-21" }],
  35: [{ name: "Sergey Sirotkin", team: "Williams", years: "2018" }],
  36: [{ name: "Antonio Giovinazzi", team: "Sauber", years: "2017", sub: true }],
  38: [{ name: "Oliver Bearman", team: "Ferrari", years: "2024", sub: true }],
  39: [{ name: "Brendon Hartley", team: "Toro Rosso", years: "2017", sub: true }],
  40: [{ name: "Liam Lawson", team: "AlphaTauri", years: "2023", sub: true }, { name: "Paul di Resta", team: "Williams", years: "2017", sub: true }],
  41: [{ name: "Arvid Lindblad", team: "Racing Bulls", years: "2026-", now: true }],
  43: [{ name: "Franco Colapinto", team: "Alpine", years: "2024-", now: true }],
  44: [{ name: "Lewis Hamilton", team: "Ferrari, Mercedes", years: "2014-", now: true }],
  45: [{ name: "Nyck de Vries", team: "Williams", years: "2022", sub: true }, { name: "Andre Lotterer", team: "Caterham", years: "2014", sub: true }],
  46: [{ name: "Will Stevens", team: "Caterham", years: "2014", sub: true }],
  47: [{ name: "Mick Schumacher", team: "Haas", years: "2021-22" }, { name: "Stoffel Vandoorne", team: "McLaren", years: "2016", sub: true }],
  50: [{ name: "Oliver Bearman", team: "Haas", years: "2024", sub: true }],
  51: [{ name: "Pietro Fittipaldi", team: "Haas", years: "2020", sub: true }],
  53: [{ name: "Alexander Rossi", team: "Marussia", years: "2015" }],
  55: [{ name: "Carlos Sainz", team: "Williams", years: "2015-", now: true }],
  61: [{ name: "Jack Doohan", team: "Alpine", years: "2024", sub: true }],
  63: [{ name: "George Russell", team: "Mercedes", years: "2019-", now: true }],
  77: [{ name: "Valtteri Bottas", team: "Cadillac", years: "2014-", now: true }],
  81: [{ name: "Oscar Piastri", team: "McLaren", years: "2023-", now: true }],
  87: [{ name: "Oliver Bearman", team: "Haas", years: "2025-", now: true }],
  88: [{ name: "Robert Kubica", team: "Williams, Alfa Romeo", years: "2019-21" }, { name: "Rio Haryanto", team: "Manor", years: "2016" }],
  89: [{ name: "Jack Aitken", team: "Williams", years: "2020" }],
  94: [{ name: "Pascal Wehrlein", team: "Manor, Sauber", years: "2016-17" }],
  98: [{ name: "Roberto Merhi", team: "Manor", years: "2015" }],
  99: [{ name: "Antonio Giovinazzi", team: "Alfa Romeo", years: "2019-21" }, { name: "Adrian Sutil", team: "Sauber", years: "2014" }]
};
