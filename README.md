# @moonloch/dcc-core-lib

A TypeScript library providing core game logic for Dungeon Crawl Classics (DCC) RPG. Built with pure functions and zero platform dependencies.

The primary consumer is the [DCC system for FoundryVTT](https://github.com/foundryvtt-dcc/dcc), which vendors this library's compiled output. Game-logic fixes for that system belong here, with a regression test — see [CONTRIBUTING.md](CONTRIBUTING.md).

This library contains **logic only**. It ships no official Goodman Games rulebook data (class progressions, spell tables, crit/fumble tables, etc.); apps register that data at runtime. See [Copyright separation](#copyright-separation).

## Features

- **Character Creation** - Generate 0-level peasants with occupations, equipment, birth augurs
- **Character Serialization** - Versioned JSON export/import for persistent storage
- **Dice Chain System** - Full DCC dice chain with bump up/down, crit range scaling
- **Spell System** - Complete spell casting with spellbooks, spellburn, disapproval, corruption, mercurial magic
- **Unified Skill Resolution** - All class abilities modeled as skills for consistent handling
- **Bonus System** - Comprehensive modifier tracking (ability, luck, spell, equipment, circumstance)
- **Table Lookup System** - Simple, multi-column, and tiered tables for result lookups
- **Data Loaders** - Parse FoundryVTT format class progressions, rollable tables, and spell definitions
- **Pure Functions** - No classes, no side effects, easy to test and integrate
- **Platform Agnostic** - Works in Node.js, browsers, FoundryVTT, or anywhere JavaScript runs

## Installation

The package is **not** on the public npm registry, and the unscoped name `dcc-core-lib` is not this package. There are three ways to consume it:

### 1. Vendored by the DCC FoundryVTT system (primary consumer)

FoundryVTT has no bundler, so the [DCC system](https://github.com/foundryvtt-dcc/dcc) commits this library's built `dist/` into `module/vendor/dcc-core-lib/` and imports it directly. The system repo's `scripts/sync-core-lib.mjs` builds a local checkout of this repo and copies `dist/` across (writing `VERSION.json` with the source commit). See [CONTRIBUTING.md](CONTRIBUTING.md#how-a-fix-reaches-the-dcc-system).

### 2. GitHub Packages

Each GitHub release publishes `@moonloch/dcc-core-lib` to GitHub Packages. GitHub Packages' npm registry requires authentication even for public packages, so you need a personal access token (classic) with the `read:packages` scope.

```ini
# .npmrc (project or ~/.npmrc) — do not commit the token
@moonloch:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @moonloch/dcc-core-lib
```

### 3. From source

```bash
git clone https://github.com/moonloch/dcc-core-lib.git
cd dcc-core-lib
npm ci
npm run build   # emits dist/
```

## Quick Start

```typescript
import {
  evaluateRoll,
  bumpDie,
  resolveSkillCheck,
  getAbilityModifier,
} from '@moonloch/dcc-core-lib';

// Roll dice
const result = evaluateRoll('1d20+3', { mode: 'evaluate' });
console.log(result.total); // e.g., 15

// Use the dice chain (expressions include the die count)
const blessedDie = bumpDie('1d20', 1);  // Returns '1d24'
const cursedDie = bumpDie('1d20', -2);  // Returns '1d14'

// Get ability modifiers
const modifier = getAbilityModifier(16); // Returns 2

// Resolve a skill check
const checkResult = resolveSkillCheck(
  {
    skill: climbSheerSurfaces, // a SkillDefinition, see below
    abilities: { agl: 16 },
    level: 3,
  },
  { mode: 'evaluate' }
);
```

## Modules

### Dice

```typescript
import {
  evaluateRoll,
  parseFormula,
  bumpDie,
  getDieRank,
  getDiceChain,
  calculateProportionalCritRange,
} from '@moonloch/dcc-core-lib';

// Parse and evaluate dice expressions
const parsed = parseFormula('2d6+1d4+3'); // parsed.totalModifier === 3
const result = evaluateRoll('3d6', { mode: 'evaluate' });

// Dice chain operations (die sizes as face counts)
const chain = getDiceChain();
// [3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 30]

const rank = getDieRank(20);           // Returns 10 (index in the chain)
const bumped = bumpDie('1d16', 2);     // Returns '1d24'

// Crit range scaling when the action die changes size
// (originalCritMin, originalDieSize, newDieSize)
const critMin = calculateProportionalCritRange(19, 20, 24);
// Returns 23 (19-20 on a d20 becomes 23-24 on a d24)
```

### Skills

```typescript
import { resolveSkillCheck } from '@moonloch/dcc-core-lib';
import type { SkillDefinition } from '@moonloch/dcc-core-lib';

// Define a skill
const climbSheerSurfaces: SkillDefinition = {
  id: 'climb-sheer-surfaces',
  name: 'Climb Sheer Surfaces',
  type: 'check',
  roll: {
    die: 'd20',
    ability: 'agl',
  },
};

// Resolve synchronously, with optional event callbacks
// (use resolveSkillCheckAsync with an async roller, e.g. Foundry's Roll)
const result = resolveSkillCheck(
  { skill: climbSheerSurfaces, abilities: { agl: 14 }, level: 3 },
  { mode: 'evaluate' },
  {
    onSkillCheckComplete: (r) => console.log('Rolled:', r.total),
  }
);
```

### Data Loaders

```typescript
import {
  loadClassProgression,
  getSkillBonusFromProgression,
  loadRollableTable,
  loadBirthAugurs,
  getBirthAugurModifier,
} from '@moonloch/dcc-core-lib';

// Load class progression from FoundryVTT format class-level JSON documents
const thiefProgression = loadClassProgression(
  'thief', 'Thief', ['backstab', 'sneakSilently'], thiefLevelFiles
);
const backstabBonus = getSkillBonusFromProgression(
  thiefProgression,
  5,          // level
  'chaotic',  // alignment
  'backstab'
);

// Load rollable tables (FoundryVTT RollTable JSON)
const fumbleTable = loadRollableTable(fumbleTableJson);

// Load birth augurs from a luck table
const augurs = loadBirthAugurs(luckTableJson);
const augurEffect = getBirthAugurModifier(luckModifier, augurs[0]);
// { modifier, affects, effectType }
```

### Character Creation

```typescript
import {
  createZeroLevelCharacter,
  DEFAULT_CHARACTER_CREATION_DATA,
  defaultRandomSource,
} from '@moonloch/dcc-core-lib';
import type { CharacterCreationConfig } from '@moonloch/dcc-core-lib';

// Create a random 0-level character
const result = createZeroLevelCharacter(
  DEFAULT_CHARACTER_CREATION_DATA,
  { name: { generateName: true, includeEpithet: true } },
  defaultRandomSource
);

console.log(result.character.identity.name);       // "Bram the Bold"
console.log(result.character.identity.occupation); // "Farmer"
console.log(result.character.state.hp.current);    // 3
console.log(result.character.state.inventory.items); // [{ name: "Pitchfork", ... }]

// With specific options
const config: CharacterCreationConfig = {
  name: { generateName: false },
  occupation: { specificOccupation: "Blacksmith" },
  alignment: "l", // Lawful
};
const smith = createZeroLevelCharacter(DEFAULT_CHARACTER_CREATION_DATA, config, defaultRandomSource);
```

### Character Serialization

```typescript
import {
  exportCharacter,
  importCharacter,
  CHARACTER_FORMAT_VERSION,
} from '@moonloch/dcc-core-lib';

// Export to versioned JSON
const json = exportCharacter(character);
// {
//   "version": "1.0",
//   "format": "dcc-core-lib",
//   "exportedAt": "2025-11-27T...",
//   "character": { ... }
// }

// Import from JSON (handles version checking)
const result = importCharacter(json);
if (result.success) {
  console.log(result.character);
  if (result.warnings) {
    console.log('Warnings:', result.warnings); // e.g., version mismatch
  }
}
```

### Bonus System

```typescript
import {
  createAbilityBonus,
  createLuckBonus,
  createEquipmentBonus,
  computeBonuses,
} from '@moonloch/dcc-core-lib';
import type { RollBonus } from '@moonloch/dcc-core-lib';

// Create bonuses from various sources
const bonuses: RollBonus[] = [
  createAbilityBonus('str', 'Strength', 2),
  createLuckBonus(3),  // Burn 3 luck
  createEquipmentBonus('magic-sword', 'Sword +1', 1),
];

// Compute total effect
const computed = computeBonuses(bonuses);
console.log(computed.totalModifier);  // 6 (all stack in DCC)
console.log(computed.appliedBonuses); // List of applied bonuses
```

### Table Lookup System

```typescript
import {
  registerTable,
  getTable,
  lookup,
  lookupSimple,
  validateTable,
  TEST_TURN_UNHOLY_TABLE,
} from '@moonloch/dcc-core-lib';

// Register a table
registerTable(TEST_TURN_UNHOLY_TABLE);

// Look up a result
const table = getTable('test-turn-unholy');
if (table) {
  const result = lookup(table, 15);
  console.log(result?.text);   // "Success. Turn 1d6+level HD..."
  console.log(result?.effect); // { type: 'turn', dice: '1d6+CL', ... }
}

// Validate table structure (no gaps/overlaps)
const validation = validateTable(TEST_TURN_UNHOLY_TABLE);
console.log(validation.valid);  // true
```

### Spell System

```typescript
import {
  castSpell,
  rollMercurialMagic,
  validateSpellburn,
  applySpellburn,
  rollDisapproval,
  rollCorruption,
  addSpellToSpellbook,
  markSpellLost,
  recoverAllSpells,
} from '@moonloch/dcc-core-lib';
import type { SpellCastInput, CasterProfile, SpellburnCommitment } from '@moonloch/dcc-core-lib';

// Cast a spell
const result = castSpell({
  spell: magicMissile,
  character: wizard,
  casterProfile: { type: 'wizard', level: 3, usesCorruption: true, usesDisapproval: false },
  spellbookEntry: wizardSpellbook.spells[0],
});

console.log(result.total);        // Spell check result
console.log(result.tier);         // "lost", "failure", or "success"
console.log(result.fumble);       // True if natural 1

// Spellburn - sacrifice ability scores for spell bonus
const commitment: SpellburnCommitment = { str: 2, agl: 0, sta: 3 };
const validation = validateSpellburn(wizard.abilities, commitment);
if (validation.valid) {
  const newAbilities = applySpellburn(wizard.abilities, commitment);
  // +5 bonus to spell check from burning 5 total points
}

// Mercurial magic - rolled once when learning a spell
const mercurial = rollMercurialMagic(wizard.luckMod, mercurialTable);
console.log(mercurial.summary);     // e.g., "Spell produces bright flash"
console.log(mercurial.displayOnCast); // Show effect when casting?

// Cleric disapproval
const disapproval = rollDisapproval(cleric.disapprovalRange, disapprovalTable);
console.log(disapproval.description); // Effect description
console.log(disapproval.severity);    // "minor", "moderate", etc.

// Spellbook management
let spellbook = addSpellToSpellbook(emptySpellbook, magicMissile, mercurial);
spellbook = markSpellLost(spellbook, 'magic-missile');  // Lost for the day
spellbook = recoverAllSpells(spellbook);                // After rest
```

### Static Data

```typescript
import { getAbilityModifier, formatAbilityModifier } from '@moonloch/dcc-core-lib';

// Standard DCC ability modifier lookup
getAbilityModifier(3);   // Returns -3
getAbilityModifier(10);  // Returns 0
getAbilityModifier(18);  // Returns 3

formatAbilityModifier(18); // Returns '+3' (takes a score)
```

## Architecture

This library follows a **pure functional approach**:

- All game logic is implemented as pure functions with no side effects
- No classes or stateful objects
- Platform-specific behavior injected via callbacks and data loaders
- Event system uses callback injection pattern

For detailed architecture documentation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## System Variants

The library supports DCC variants (MCC, XCrawl, etc.) through `SystemConfig`:

```typescript
import type { SystemConfig } from '@moonloch/dcc-core-lib';
import { DCC_SYSTEM } from '@moonloch/dcc-core-lib';

// Use the default DCC system config
console.log(DCC_SYSTEM.abilities);
// [{ id: 'str', name: 'Strength' }, ...]

// Or define your own for MCC, etc.
const mccSystem: SystemConfig = {
  id: 'mcc',
  name: 'Mutant Crawl Classics',
  // ... custom abilities, classes, mechanics
};
```

## Copyright separation

DCC RPG is © Goodman Games. This repository contains logic, types, loaders, and clearly labeled fan-made sample data only. Official table values (class progressions, spell lists and results, crit/fumble/corruption tables, occupations, birth augurs, patron taints, ...) are registered at runtime by the consuming app — e.g. via `registerClassProgressions()` — from a separate data source. Contributions must not add official rulebook data or text; see [CONTRIBUTING.md](CONTRIBUTING.md#copyright-separation).

## Development

```bash
npm run check        # Lint + typecheck + tests (what CI and the pre-push hook run)
npm run build        # Compile TypeScript to dist/
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run typecheck    # Type-check without emitting
npm run clean        # Remove dist/
```

Run a single test file:

```bash
npx vitest run src/path/to/file.test.ts
```

## Project Status

Modules under `src/`: `adventure`, `character`, `checks`, `cleric`, `combat`, `data`, `dice`, `occupation`, `parsers`, `patron`, `skills`, `spells`, `tables`, `types`. Everything is exported from the package root (`src/index.ts`).

- Character creation (0-level with occupations, equipment, birth augurs), level-up, saves, AC, hit points
- Character serialization (versioned JSON export/import)
- Dice system (dice chain, roll evaluation, sync and async rollers)
- Skill resolution (unified skill checks) and ability/luck checks
- Combat (attacks, damage, crits, fumbles, initiative, action dice, two-weapon fighting, morale, death and dying)
- Spell system (spell checks, spellbooks, spellburn, disapproval, corruption, mercurial magic, spell duels)
- Cleric abilities (turn unholy, lay on hands, divine aid) and patrons (bond, invoke, taint)
- Bonus system and table lookup system (simple, multi-column, tiered tables)
- Data loaders and parsers (FoundryVTT class progressions, rollable tables, birth augurs, spell definitions, statblocks, Purple Sorcerer output)

See [CHANGELOG.md](CHANGELOG.md) for release history. Full API reference: [docs/API.md](docs/API.md).

## Contributing

Bug reports and PRs are welcome — please read [CONTRIBUTING.md](CONTRIBUTING.md) first. Every bug fix needs a regression test.

## License

[MIT](LICENSE) © 2025-2026 Tim L. White. Dungeon Crawl Classics and DCC RPG are trademarks of Goodman Games; this project is not affiliated with or endorsed by Goodman Games.
