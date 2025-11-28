# dcc-core-lib

A TypeScript library providing core game logic for Dungeon Crawl Classics (DCC) RPG. Built with pure functions and zero platform dependencies.

## Features

- **Character Creation** - Generate 0-level peasants with occupations, equipment, birth augurs
- **Character Serialization** - Versioned JSON export/import for persistent storage
- **Dice Chain System** - Full DCC dice chain with bump up/down, crit range scaling
- **Unified Skill Resolution** - All class abilities modeled as skills for consistent handling
- **Bonus System** - Comprehensive modifier tracking (ability, luck, spell, equipment, circumstance)
- **Table Lookup System** - Simple, multi-column, and tiered tables for result lookups
- **Data Loaders** - Parse FoundryVTT format class progressions and rollable tables
- **Pure Functions** - No classes, no side effects, easy to test and integrate
- **Platform Agnostic** - Works in Node.js, browsers, FoundryVTT, or anywhere JavaScript runs

## Installation

```bash
npm install dcc-core-lib
```

## Quick Start

```typescript
import {
  evaluateRoll,
  bumpDie,
  resolveSkillCheck,
  getAbilityModifier,
} from 'dcc-core-lib';

// Roll dice
const result = evaluateRoll('1d20+3');
console.log(result.total); // e.g., 15

// Use the dice chain
const blessedDie = bumpDie('d20', 1);  // Returns 'd24'
const cursedDie = bumpDie('d20', -2);  // Returns 'd14'

// Get ability modifiers
const modifier = getAbilityModifier(16); // Returns +2

// Resolve a skill check
const checkResult = await resolveSkillCheck({
  skill: thiefBackstab,
  character: { level: 3, abilities: { agl: 16 } },
  modifiers: [{ source: 'situational', value: 2 }],
});
```

## Modules

### Dice

```typescript
import {
  evaluateRoll,
  parseExpression,
  bumpDie,
  rankDie,
  getDiceChain,
  calculateProportionalCritRange,
} from 'dcc-core-lib';

// Parse and evaluate dice expressions
const parsed = parseExpression('2d6+1d4+3');
const result = evaluateRoll('3d6');

// Dice chain operations
const chain = getDiceChain();
// ['d3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd10', 'd12', 'd14', 'd16', 'd20', 'd24', 'd30']

const rank = rankDie('d20');  // Returns 10
const bumped = bumpDie('d16', 2);  // Returns 'd24'

// Crit range scaling for non-d20 action dice
const critRange = calculateProportionalCritRange('d16', 19, 20);
// Returns { min: 16, max: 16 } (scaled from 19-20 on d20)
```

### Skills

```typescript
import { resolveSkillCheck } from 'dcc-core-lib';
import type { SkillDefinition, SkillCheckInput } from 'dcc-core-lib';

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

// Resolve with events
const result = await resolveSkillCheck(
  {
    skill: climbSheerSurfaces,
    character: { level: 3, abilities: { agl: 14 } },
  },
  {
    onRollComplete: (r) => console.log('Rolled:', r.total),
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
} from 'dcc-core-lib';

// Load class progression from FoundryVTT format JSON files
const thiefProgression = loadClassProgression(thiefLevelFiles);
const backstabBonus = getSkillBonusFromProgression(
  thiefProgression,
  5,        // level
  'backstab'
);

// Load rollable tables
const fumbleTable = loadRollableTable(fumbleTableJson);

// Load birth augurs from luck table
const augurs = loadBirthAugurs(luckTableJson);
const modifier = getBirthAugurModifier(augurs[0], 16, 14);
// Calculates luck modifier based on birth augur effect
```

### Character Creation

```typescript
import {
  createZeroLevelCharacter,
  DEFAULT_CHARACTER_CREATION_DATA,
  defaultRandomSource,
} from 'dcc-core-lib';
import type { CharacterCreationConfig } from 'dcc-core-lib';

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
} from 'dcc-core-lib';

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
} from 'dcc-core-lib';
import type { RollBonus } from 'dcc-core-lib';

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
} from 'dcc-core-lib';

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

### Static Data

```typescript
import { getAbilityModifier, getAbilityModifierRange } from 'dcc-core-lib';

// Standard DCC ability modifier lookup
getAbilityModifier(3);   // Returns -3
getAbilityModifier(10);  // Returns 0
getAbilityModifier(18);  // Returns +3

// Get score range for a modifier
getAbilityModifierRange(2);  // Returns { min: 15, max: 16 }
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
import type { SystemConfig } from 'dcc-core-lib';
import { DCC_SYSTEM } from 'dcc-core-lib';

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

## Development

```bash
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

Core implementation complete with 415 passing tests:

- Character creation (0-level with occupations, equipment, birth augurs)
- Character serialization (versioned JSON export/import)
- Inventory system (weapons, armor, gear, trade goods)
- Dice system (dice chain, roll evaluation)
- Skill resolution (unified skill checks)
- Bonus system (ability, luck, spell, equipment modifiers)
- Table lookup system (simple, multi-column, tiered tables)
- Data loaders (class progressions, rollable tables, birth augurs)
- Ability modifier lookup

See [docs/STATUS.md](docs/STATUS.md) for current progress and next steps.

## License

MIT