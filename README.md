# SpinSlotSpin

## Runtime Theme Loading (Backoffice)

The game can load a runtime theme from backoffice-generated files at startup.

### File locations

- `/themes/samurai-slot/manifest.json`
- `/themes/samurai-slot/game-config.json` (or another path set in `manifest.configPath`)
- `/themes/samurai-slot/assets/*` (URLs referenced by `manifest.assets`)

In local source terms, backoffice output should be placed under:
- `/public/themes/samurai-slot/manifest.json`
- `/public/themes/samurai-slot/game-config.json`
- `/public/themes/samurai-slot/assets/*.png`

### Expected JSON shape

`manifest.json`

```json
{
  "version": "1.0.0",
  "configPath": "game-config.json",
  "assets": {
    "intro_BG": "assets/intro.png",
    "dungeon_BG": "assets/background.png",
    "game_logo": "assets/logo.png",
    "game_frame": "assets/frame.png",
    "reel_background": "assets/reels.png",
    "high_symbol_strip": "assets/high-strip.png",
    "mid_symbol_strip": "assets/mid-strip.png",
    "low_symbol_strip": "assets/low-strip.png",
    "UI-pick": "assets/ui-pick.wav",
    "music-1": "assets/music.mp3",
    "reel-thud": "assets/reel-thud.mp3",
    "coin-count-loop": "assets/coin-loop.wav",
    "coin-flung": "assets/coin-flung.mp3"
  }
}
```

`game-config.json`

```json
{
  "gameWidth": 320,
  "gameHeight": 500,
  "reelScale": 1,
  "reelSpinSpeed": 19,
  "defaultBet": 5,
  "betChangeAmount": 5,
  "bankBalance": 500,
  "useForcedResult": false,
  "useForcedResultIndex": 1,
  "probabilityFRChosen": 9,
  "symbols": {
    "H": [{ "id": "H1", "payout": 10 }],
    "M": [{ "id": "M1", "payout": 5 }],
    "L": [{ "id": "L1", "payout": 3 }]
  },
  "paylines": {
    "1": [["X", "X", "X", "X"], ["0", "0", "0", "0"], ["0", "0", "0", "0"], ["0", "0", "0", "0"]]
  }
}
```

Notes:
- `symbols` can be either tiered (`H`/`M`/`L`) or a flat `symbolDefinitions` array with `{ id, tier, payout }`.
- `manifest.version` is appended as `?v=...` to config and asset URLs for cache-busting.

### Fallback behavior

- If `manifest.json` fails to load or is invalid, the game logs a warning and uses built-in hardcoded defaults.
- If `game-config.json` fails to load or is invalid, the game logs a warning and keeps built-in runtime defaults.
- If any asset key is missing in `manifest.assets`, that specific asset falls back to its local bundled path.
