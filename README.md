# Box Box Draft

A browser-based F1 fantasy draft game. Spin the grid, draft five drivers from any era into five roles, and take your team on against all eleven 2026 constructors for the championship.

## How it works

- **Draft**: Each round, spin to draw four random drivers from the pool — current 2026 racers and past-decade legends alike. You get 3 spins per round to reroll before you have to commit.
- **Roles**: Fill five roles — Points Machine, Pole Hunter, Rain King, Strategist, and Overtaker — each rewarding a different driver strength.
- **Compete**: Once your five-driver team is set, it's simulated against all eleven 2026 constructor teams for a final championship standing.
- **Classic vs. Expert vs. Challenge**: Classic shows full driver ratings while drafting; Expert hides the stats so you're drafting on instinct alone; Challenge shows ratings and sets a pole/podium goal for the season.
- **Role swap (Classic only)**: you get one swap per team — move a drafted driver to a different role (or trade two roles) if you change your mind. After the fifth pick you get a review screen so you can still use it before the season runs. To enable it in other modes, edit `SWAP_MODES` in `script.js`.
- **Results**: the results screen shows wins, poles and podiums (a win counts as a podium) out of 22. A lineup that is elite across the board can take every pole and every podium for a "perfect season" — in every mode.

## Daily number spin

The home screen has a **Daily number spin**: one number from 1 to 100 per day (the same number for everyone on a given date, saved in the browser so it survives a reload). It shows every driver who has raced that number in F1 — for example #22 gives both Jenson Button and Yuki Tsunoda, and #3 gives Daniel Ricciardo and Max Verstappen. Numbers come from the official permanent-number system (2014–2026), stand-in appearances on temporary numbers, and a few pre-2014 icons (Senna #12, Mansell #5, Gilles Villeneuve #27). If nobody has ever raced the number, it simply says so — no driver is made up or borrowed from another number. A "Practice spin" button lets you try other numbers without touching today's. The data lives in `NUMBER_DRIVERS` in `drivers.js`.

## Running it

No build step, no dependencies to install — it's plain HTML/CSS/JS.

1. Clone or download this repo.
2. Open `index.html` in a browser.

Or serve it locally:

```bash
npx serve .
```

## Project structure

```
box-box-draft/
├── index.html   # page markup
├── style.css    # all styling
├── drivers.js   # driver pool, rival teams, team colours
└── script.js    # game logic (draft, swap, simulation, rendering)
```

## Notes

Historic driver seasons and current 2026 pairings are real; attribute ratings and every simulated result are fictional game values, not official statistics.
