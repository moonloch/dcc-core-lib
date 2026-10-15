# Architecture

## Goals

Extract reusable game logic from the FoundryVTT DCC system (`dcc`) into a standalone TypeScript library that can be used by:

- FoundryVTT system (original use case)
- REST/GraphQL APIs
- CLI tools
- Discord bots
- Other VTT integrations
- Mobile apps

## Design Principles

### Pure Functions, No Classes

All game logic is implemented as pure functions. No stateful objects or class hierarchies. This makes the library:

- Easy to test
- Easy to integrate with any state management
- Tree-shakeable
- Predictable

### Platform Agnostic

The core library has zero dependencies on FoundryVTT, browser APIs, or Node.js-specific APIs. All platform-specific behavior is injected via:

- Event handlers (for notifications)
- Data loaders (for game data)

### Typed Events

The library emits typed events for game actions, enabling integrations to react to game state changes.

## Unified Skill System

### Philosophy

All class abilities are modeled as **skills**. There is no fundamental difference between:
- A thief's "Climb Sheer Surfaces" check
- A cleric's "Turn Unholy" ability
- A wizard's spell check
- A warrior's "Mighty Deed"

This unified approach enables:
- **Homebrew classes**: Define a class as a list of skills in JSON
- **Consistent UI**: All skills can use the same roll interface
- **Extensibility**: Add new abilities without new code

### Skill Definition

Every skill has a common structure:

```typescript
interface SkillDefinition {
  id: string;
  name: string;
  description: string;

  // What type of skill is this?
  type: 'check' | 'modifier' | 'passive';

  // The roll formula components
  roll?: {
    die: string;                    // "d20", "d24", or dice chain reference
    useDiceChain?: boolean;         // Can this die be bumped up/down?
    ability?: AbilityId;            // Which ability modifier applies
    levelModifier?: LevelModifierType; // How level affects the roll
    otherModifiers?: ModifierSource[]; // Luck, situational, etc.
  };

  // For skills with table-based results
  resultTable?: {
    tableId: string;                // Reference to external table data
    rollModifier?: string;          // Additional modifier to table roll
  };

  // For modifier-type skills that augment other actions
  modifies?: {
    action: 'attack' | 'damage' | 'initiative' | 'save' | 'ac';
    effect: ModifierEffect;
  };

  // For skills that enable other actions
  enables?: {
    action: string;                 // e.g., "extra-attack", "deed-roll"
    condition?: string;             // When does this trigger?
  };

  // Progression by level (for class skills)
  progression?: Record<number, SkillProgression>;

  // Resource costs
  cost?: {
    resource: 'luck' | 'spellburn' | 'disapproval' | 'custom';
    amount: number | string;        // Fixed or formula
  };
}
```

### Skill Types

#### Check Skills
Standalone rolls that produce a result. Examples:
- Thief skills (Climb Sheer Surfaces, Find Trap, etc.)
- Turn Unholy (d20 + personality + level → table lookup)
- Lay on Hands (d20 + personality + level → table lookup)
- Spell checks (d20 + ability + level → spell result)

```typescript
const turnUnholy: SkillDefinition = {
  id: 'turn-unholy',
  name: 'Turn Unholy',
  type: 'check',
  roll: {
    die: 'd20',
    ability: 'personality',
    levelModifier: 'cleric-level',
  },
  resultTable: {
    tableId: 'turn-unholy-results',
  },
  cost: {
    resource: 'disapproval',
    amount: 1,  // Increases disapproval range on failure
  },
};
```

#### Modifier Skills
Passive abilities that modify other actions. Examples:
- Lucky Sign bonuses (modify specific roll types)
- Armor training (reduce check penalties)
- Weapon training (bonus to specific weapons)

```typescript
const luckySign: SkillDefinition = {
  id: 'lucky-sign-attack',
  name: 'Born Under the Sign of the Sword',
  type: 'modifier',
  modifies: {
    action: 'attack',
    effect: { type: 'luck-modifier', multiplier: 1 },
  },
};
```

#### Enabling Skills
Skills that unlock or enable other game mechanics. Examples:
- Mighty Deed (enables deed die on attacks)
- Shield Bash (enables extra shield attack)
- Two-Weapon Fighting (enables off-hand attack)
- Backstab (enables auto-crit on Crit Table II for thieves; adds the Table 1-9 attack bonus)

```typescript
const mightyDeed: SkillDefinition = {
  id: 'mighty-deed',
  name: 'Mighty Deed of Arms',
  type: 'passive',
  enables: {
    action: 'deed-roll',
    condition: 'on-attack',
  },
  progression: {
    1: { deedDie: 'd3' },
    3: { deedDie: 'd4' },
    5: { deedDie: 'd5' },
    // ...
  },
};

const shieldBash: SkillDefinition = {
  id: 'shield-bash',
  name: 'Shield Bash',
  type: 'passive',
  enables: {
    action: 'extra-attack',
    condition: 'wielding-shield',
  },
  modifies: {
    action: 'damage',
    effect: { type: 'fixed', value: 'd3' },
  },
};
```

### Class as Skill Collection

A character class becomes a collection of skills plus base statistics:

```typescript
interface ClassDefinition {
  id: string;
  name: string;

  // Base statistics
  hitDie: string;
  attackProgression: 'warrior' | 'cleric' | 'wizard' | 'thief';
  saveProgression: SaveProgressionType;
  critTable: string;

  // Skills granted by this class
  skills: string[];  // Skill IDs

  // Per-level data (attack bonus, saves, skill values, ...)
  levels: Record<number, ClassLevelData>;

  // Restrictions
  requirements?: {
    abilities?: Partial<Record<AbilityId, number>>;
    alignment?: Alignment[];
  };
}

// Example: Warrior class
const warrior: ClassDefinition = {
  id: 'warrior',
  name: 'Warrior',
  hitDie: 'd12',
  attackProgression: 'warrior',
  saveProgression: 'warrior',
  critTable: 'crit-table-iii',
  skills: [
    'mighty-deed',
    'warrior-crit-range',
    'threat-range-progression',
  ],
  levels: { /* supplied by a registered data source */ },
};

// Example: Cleric class
const cleric: ClassDefinition = {
  id: 'cleric',
  name: 'Cleric',
  hitDie: 'd8',
  attackProgression: 'cleric',
  saveProgression: 'cleric',
  critTable: 'crit-table-ii',
  skills: [
    'turn-unholy',
    'lay-on-hands',
    'divine-aid',
    'spell-casting-cleric',
    'disapproval-tracking',
  ],
  levels: { /* supplied by a registered data source */ },
};
```

### Skill Resolution

A single function handles all skill checks:

```typescript
interface SkillCheckInput {
  skill: SkillDefinition;
  abilities: Record<string, number>;
  level: number;
  classId?: string;
  situationalModifiers?: RollModifier[];   // see docs/MODIFIERS.md
  luck?: number;
  luckBurn?: number;
}

interface SkillCheckResult {
  skillId: string;
  die: DieType;
  natural?: number;
  modifiers: RollModifier[];
  total?: number;
  formula: string;
  tableResult?: TableLookupResult;
  success?: boolean;
  critical?: boolean;
  fumble?: boolean;
  effects?: SkillEffect[];
  resourcesConsumed?: { resource: ResourceType; amount: number }[];
}

function resolveSkillCheck(
  input: SkillCheckInput,
  options?: SkillResolveOptions,   // RollOptions + threatRange
  events?: SkillEvents
): SkillCheckResult;

// Promise-based variant for async dice rollers (e.g. FoundryVTT)
function resolveSkillCheckAsync(
  input: SkillCheckInput,
  options: SkillResolveOptionsAsync,
  events?: SkillEvents
): Promise<SkillCheckResult>;
```

Higher-level wrappers in `src/checks/` (`rollCheck`, `rollAbilityCheck`, `rollSavingThrow` and their `*Async` forms) build the `SkillCheckInput` from a `Character`.

### Benefits

1. **Data-Driven Classes**: New classes are JSON, not code changes
2. **Consistent Events**: `onSkillCheckStart` / `onSkillCheckComplete` cover all class abilities
3. **Unified Modifiers**: Luck, situational bonuses work the same everywhere
4. **Homebrew Friendly**: GMs can create classes by assembling skills
5. **Testable**: One skill resolution function to test thoroughly

## Event System

### Challenge

Different platforms handle events differently:
- FoundryVTT uses `Hooks.call()` / `Hooks.on()`
- Node.js uses `EventEmitter`
- Browsers use `CustomEvent` / `addEventListener`
- Some systems need async event handling
- Some need event cancellation

### Solution: Callback Injection

Rather than building an event system into the library, functions accept an optional `events` object (usually the last parameter) whose callbacks are invoked synchronously:

```typescript
interface SkillEvents {
  onSkillCheckStart?: (input: SkillCheckInput) => void;
  onSkillCheckComplete?: (result: SkillCheckResult) => void;
  onCritical?: (result: SkillCheckResult) => void;
  onFumble?: (result: SkillCheckResult) => void;
  // ...
}

function resolveSkillCheck(
  input: SkillCheckInput,
  options: SkillResolveOptions = {},
  events?: SkillEvents
): SkillCheckResult {
  events?.onSkillCheckStart?.(input);
  // ... build modifiers, roll, look up result table ...
  if (result.critical) events?.onCritical?.(result);
  if (result.fumble) events?.onFumble?.(result);
  events?.onSkillCheckComplete?.(result);
  return result;
}
```

### Adapter Pattern

Each integration creates an adapter that bridges to its event system:

```typescript
// foundry-adapter.ts
function createFoundryEvents(): SkillEvents {
  return {
    onSkillCheckComplete: (result) => Hooks.call('dcc.skillCheckComplete', result),
    onCritical: (result) => Hooks.call('dcc.critical', result),
  };
}

// node-adapter.ts
function createEmitterEvents(emitter: EventEmitter): SkillEvents {
  return {
    onSkillCheckComplete: (result) => emitter.emit('skillCheckComplete', result),
    onCritical: (result) => emitter.emit('critical', result),
  };
}
```

### Event Types

Events are organized by domain, one interface per domain (see [EVENTS.md](./EVENTS.md) for payloads):

| Interface | Events |
|-----------|--------|
| `SkillEvents` (skills; checks via `options.events`) | `onSkillCheckStart`, `onSkillCheckComplete`, `onCritical`, `onFumble`, `onResourceConsumed`, `onTableLookup` |
| `CombatEvents` | `onAttackRoll`, `onCriticalThreat`, `onFumbleRoll`, `onDamageRoll`, `onCriticalResult`, `onFumbleResult`, `onInitiativeRoll`, `onDeedAttempt` |
| `SpellEvents` | `onSpellCheckStart`, `onSpellCheckComplete`, `onCritical`, `onFumble`, `onSpellLost`, `onCorruptionTriggered`, `onDisapprovalIncreased`, `onSpellburnApplied`, `onMercurialEffect`, `onPatronTaint` |
| `PatronEvents` | `onInvokeStart`, `onInvokeComplete`, `onPatronAnswers`, `onPatronIgnores`, `onTaintIncurred`, `onBondFormed` |
| `OccupationSkillEvents` | `onCheckStart`, `onCheckComplete`, `onCritical`, `onFumble` |

## Data Loading & Copyright Separation

### Philosophy: Strict Separation of Code and Data

**This library (`dcc-core-lib`) contains NO copyrighted game data.**

DCC RPG content is copyrighted by Goodman Games. To respect this:

1. **`dcc-core-lib` (this repo, public)** - Contains only:
   - Pure calculation functions
   - Type definitions
   - Registries and data loaders/parsers
   - Static lookup tables (ability modifiers, dice chain - game mechanics, not content)
   - Fan-made sample data for testing (`src/data/sample-data.ts`, the `test-*` tables in `src/data/tables/`, and the fixtures in `test_data/`)

2. **Official data** - Class progressions, occupations, birth augurs, crit/fumble/corruption tables, spell definitions and spell result tables are supplied at runtime by the consuming application (the FoundryVTT DCC system loads them from its own content) or by a separately maintained data package. None of it is committed here.

See [CONTRIBUTING.md](../CONTRIBUTING.md#copyright-separation) for the exact rules on what may and may not be added to this repository.

### Registry Pattern for Class Data

Class progression data must be registered at runtime, not hardcoded:

```typescript
// In your application startup
import {
  registerClassProgressions,
  getSavingThrows,
  getAttackBonus,
} from "@moonloch/dcc-core-lib";
import { ALL_CLASS_PROGRESSIONS } from "your-data-package";

// Register class data
registerClassProgressions(ALL_CLASS_PROGRESSIONS);

// Now utility functions work
const saves = getSavingThrows("warrior", 5);
const attackBonus = getAttackBonus("thief", 3);
```

Tables (crit, fumble, turn unholy, etc.) use the same pattern via the table registry (`registerTable`, `registerTables`, `loadAndRegisterTable`, `getTable`, ...).

This pattern ensures:
- Core library has no copyright violations
- Data can come from official or fan-made sources
- Tests use fan-made sample data
- Production uses official data

### Challenge

Game data (spell tables, crit tables, class progressions) needs to be loaded from different sources:
- JSON files on disk (Node.js, build tools)
- HTTP URLs (browsers, APIs)
- FoundryVTT compendiums
- Bundled inline (single-file deployments)

### Solution: Caller Loads, Library Parses

The library does no I/O and all of its functions are synchronous with respect to data. The caller fetches raw data however its platform allows, then hands it to a pure loader that converts it to the library's types, and registers the result:

```typescript
import {
  loadClassProgression,
  registerClassProgression,
  loadAndRegisterTable,
  loadSpellDefinitions,
} from "@moonloch/dcc-core-lib";

// Node.js: read from disk
loadAndRegisterTable(await fs.readFile("./data/tables/crit-table-iii.json", "utf-8"));

// Browser / API: fetch over HTTP
const spells = loadSpellDefinitions(await (await fetch(`${baseUrl}/spells.json`)).json());

// FoundryVTT: read compendium documents and convert them
const levelDocs = (await game.packs.get("my-module.class-levels").getDocuments()).map((d) => d.toObject());
registerClassProgression(loadClassProgression("warrior", "Warrior", ["mighty-deed"], levelDocs));
```

The loaders in `src/data/loaders/` convert raw JSON to library types: `loadClassProgression` / `parseClassLevel` and `loadRollableTable` / `loadBirthAugurs` accept the FoundryVTT document JSON shape, so data exported from Foundry compendiums can be used directly; `loadSpellDefinitions` and `loadMercurialTable` (plus `*WithValidation` variants) take plain JSON. The table registry's `loadTableFromJson` / `loadAndRegisterTable` take a JSON string in the library's own table format. `src/data/loaders/integration.test.ts` exercises them against the fan-made fixtures in `test_data/`.

## System Variants (MCC, XCrawl, etc.)

DCC has spawned several derived systems that share core mechanics:
- **Mutant Crawl Classics (MCC)**: Post-apocalyptic, mutations, different classes
- **Star Crawl**: Sci-fi adaptation
- **XCrawl**: Modern dungeon sport setting
- **DCC Lankhmar**: Sword & sorcery variant

### Challenge

These systems share:
- Dice chain mechanics
- Core roll resolution (d20 + modifiers)
- Skill/ability framework
- Critical/fumble system

But differ in:
- Ability score names (MCC: "Luck" → "Luck", but some variants rename others)
- Class roster (MCC has Mutants, Sentinels, etc.)
- Available skills
- Tables (crit tables, mutation tables, etc.)
- Special mechanics (mutations, AI artifacts, etc.)

### Solution: System Configuration

A `SystemConfig` type (in `src/types/system.ts`) defines a game system. The library exports the DCC configuration as `DCC_SYSTEM` (built from `DCC_ABILITIES`, `DCC_ALIGNMENTS`, `DCC_SAVES`, `DCC_ABILITY_MAPPINGS`) plus `findAbility()` / `findSave()` helpers. No other system configs ship with the library; the MCC example below is illustrative.

```typescript
interface SystemConfig {
  id: string;                           // 'dcc', 'mcc', 'xcrawl'
  name: string;
  version?: string;

  // Ability scores for this system
  abilities: AbilityDefinition[];       // [{id: 'str', name: 'Strength', abbrev: 'STR'}, ...]

  // Which ability is used for common things
  abilityMappings: {
    meleeAttack: string;                // 'str' in DCC
    meleeDamage: string;
    missileAttack: string;              // 'agl' in DCC
    missileDamage?: string;
    armorClass: string;                 // 'agl' in DCC
    hitPoints: string;                  // 'sta' in DCC
    reflexSave: string;
    fortSave: string;
    willSave: string;                   // 'per' in DCC (varies by system)
    initiative: string;
    wizardSpellCheck?: string;
    clericSpellCheck?: string;
  };

  alignments: AlignmentDefinition[];
  saves: SaveDefinition[];

  // Available classes in this system
  classes: string[];                    // Class IDs to load

  // Dice chain (usually same across systems)
  diceChain?: number[];                 // Override if different

  // System-specific mechanics
  mechanics: {
    hasDisapproval?: boolean;
    hasMercurial?: boolean;
    hasMutations?: boolean;
    hasWetware?: boolean;
    hasArtifacts?: boolean;
    hasLuckDie?: boolean;
    hasFleetingLuck?: boolean;
  };
}

// Example: Standard DCC
const dccSystem: SystemConfig = {
  id: 'dcc',
  name: 'Dungeon Crawl Classics',
  abilities: [
    { id: 'str', name: 'Strength', abbrev: 'STR' },
    { id: 'agl', name: 'Agility', abbrev: 'AGL' },
    { id: 'sta', name: 'Stamina', abbrev: 'STA' },
    { id: 'per', name: 'Personality', abbrev: 'PER' },
    { id: 'int', name: 'Intelligence', abbrev: 'INT' },
    { id: 'lck', name: 'Luck', abbrev: 'LCK' },
  ],
  abilityMappings: {
    meleeAttack: 'str',
    missileAttack: 'agl',
    armorClass: 'agl',
    hitPoints: 'sta',
    willSave: 'per',
    reflexSave: 'agl',
    fortSave: 'sta',
    // ... meleeDamage, initiative, etc.
  },
  // ... alignments, saves
  classes: ['warrior', 'wizard', 'cleric', 'thief', 'dwarf', 'elf', 'halfling'],
  mechanics: {
    hasDisapproval: true,
    hasMercurial: true,
  },
};

// Example: Mutant Crawl Classics
const mccSystem: SystemConfig = {
  id: 'mcc',
  name: 'Mutant Crawl Classics',
  abilities: [
    { id: 'str', name: 'Strength', abbrev: 'STR' },
    { id: 'agl', name: 'Agility', abbrev: 'AGL' },
    { id: 'sta', name: 'Stamina', abbrev: 'STA' },
    { id: 'per', name: 'Personality', abbrev: 'PER' },
    { id: 'int', name: 'Intelligence', abbrev: 'INT' },
    { id: 'lck', name: 'Luck', abbrev: 'LCK' },
  ],
  abilityMappings: {
    meleeAttack: 'str',
    missileAttack: 'agl',
    armorClass: 'agl',
    hitPoints: 'sta',
    willSave: 'per',
    reflexSave: 'agl',
    fortSave: 'sta',
    // ... meleeDamage, initiative, etc.
  },
  // ... alignments, saves
  classes: ['sentinel', 'rover', 'shaman', 'healer', 'mutant', 'manimal', 'plantient'],
  mechanics: {
    hasMutations: true,
    hasWetware: true,
    hasArtifacts: true,
  },
};
```

### Usage

**Not yet implemented.** Today no library function takes a `SystemConfig`; functions use DCC's ability mappings directly. The intended shape is for functions that need system context to accept the config:

```typescript
// Hypothetical signatures — neither exists today
function resolveSkillCheck(
  input: SkillCheckInput,
  system: SystemConfig,      // System defines ability mappings
  options?: SkillResolveOptions,
  events?: SkillEvents
): SkillCheckResult;

// Or create a bound context
const dcc = createSystemContext(DCC_SYSTEM, events);
dcc.resolveSkillCheck(input);  // Uses DCC config
```

### Data Organization

A possible layout for system-specific data in a data package (no such package is part of this repository):

```
dcc-game-data/
├── systems/
│   ├── dcc/
│   │   ├── system.json       # SystemConfig
│   │   ├── classes/
│   │   └── skills/
│   ├── mcc/
│   │   ├── system.json
│   │   ├── classes/
│   │   ├── skills/
│   │   └── mutations/        # MCC-specific
│   └── xcrawl/
│       └── ...
└── shared/
    ├── tables/               # Shared crit tables, etc.
    └── dice-chain.json
```

## Module Structure

```
src/
├── index.ts              # Public API: re-exports every module below
├── types/                # TypeScript type definitions
│   ├── character.ts      # Character, Inventory, InventoryItem
│   ├── character-creation.ts
│   ├── class-progression.ts  # ClassProgression (registry data shape)
│   ├── classes.ts        # ClassDefinition
│   ├── skills.ts         # SkillDefinition, SkillCheckResult, SkillEvents
│   ├── system.ts         # SystemConfig, DCC_SYSTEM
│   ├── combat.ts         # Attack, damage, crits, fumbles, CombatEvents
│   ├── spells.ts         # Spells, corruption, mercurial, SpellEvents
│   ├── patron.ts         # Patrons, bonds, PatronEvents
│   ├── occupation-skills.ts
│   ├── dice.ts           # Dice types, RollModifier / LegacyRollModifier
│   ├── bonuses.ts        # RollBonus and bonus computation
│   ├── creatures.ts, equipment.ts, random.ts, tables.ts
│   └── index.ts
├── dice/                 # dice-chain.ts (chain + parsing), roll.ts (formulas, modifier pipeline)
├── skills/               # resolve.ts: unified skill resolution (sync + async)
├── checks/               # Character-level checks: roll.ts, luck-check.ts, definitions, accessors
├── character/            # create.ts (0-level), level-up, armor-class, hit-points,
│                         # saving-throws, serialize.ts (versioned JSON export/import)
├── combat/               # attack, damage, crits, fumbles, initiative, action-dice,
│                         # death-and-dying, morale, misc-rules
├── spells/               # cast, spell-check, spellbook, spellburn, corruption, disapproval,
│                         # fumble, mercurial, patron-taint-check, spell-duel(-tables)
├── cleric/               # turn-unholy, lay-on-hands, divine-aid
├── patron/               # registry, invoke, bond
├── occupation/           # Occupation-based skill checks (+ fan-made sample skills)
├── tables/               # Table registry and lookup
├── parsers/              # Purple Sorcerer text/JSON parsers, stat-block parser, convert.ts
├── adventure/            # Encounter and narrative engines
└── data/
    ├── ability-modifiers.ts  # Static modifier table (shared mechanic)
    ├── names.ts              # Name generation
    ├── sample-data.ts        # FAN-MADE sample data for tests/demos
    ├── classes/              # Class progression registry + accessors
    ├── loaders/              # Raw JSON → library types (class, table, spell loaders)
    ├── skills/               # Enabling-skill and thief-skill definitions/helpers
    └── tables/               # Fan-made test tables (test-turn-unholy, ...)
```

## Integration Examples

### FoundryVTT Integration

The FoundryVTT DCC system is the primary consumer. It vendors this library's `dist/` and keeps its own adapter layer (dice roller, event-to-hook bridge, data registration) in the system repo; see [CONTRIBUTING.md](../CONTRIBUTING.md#how-a-fix-reaches-the-dcc-system). A simplified sketch of an attack:

```typescript
import { makeAttackRoll, type CombatEvents, type DiceRoller } from '@moonloch/dcc-core-lib';

// In actor.js
rollAttack(weaponId) {
  const weapon = this.items.get(weaponId);
  const events: CombatEvents = {
    onCriticalThreat: (result) => Hooks.call('dcc.criticalThreat', result),
  };
  const roller: DiceRoller = (expression) => new Roll(expression).evaluateSync().total;

  const result = makeAttackRoll(
    {
      attackType: 'melee',
      attackBonus: this.system.details.attackBonus,
      actionDie: this.system.attributes.actionDice.value,
      threatRange: weapon.system.critRange,
      abilityModifier: this.system.abilities.str.mod,
      // ...
    },
    roller,
    events
  );

  // FoundryVTT-specific: create chat message
  return this.createAttackChatMessage(result);
}
```

### API Integration

```typescript
import { makeAttackRoll } from '@moonloch/dcc-core-lib';

app.post('/api/attack', (req, res) => {
  // No roller: uses the built-in random roller. No events needed for an API.
  const result = makeAttackRoll(req.body.attack);
  res.json(result);
});
```

## Error Handling Patterns

The library uses a consistent layered approach to error handling:

### 1. Internal Parsing Utilities → `null`

Low-level parsing functions return `null` when they cannot parse input. This allows callers to easily check for failure and provide fallback behavior.

```typescript
// dice/dice-chain.ts
function parseDiceExpression(expression: string): ParsedDiceExpression | null {
  const match = DICE_REGEX.exec(expression);
  if (!match) {
    return null;  // Not a valid dice expression
  }
  // ... parse and return
}

// Usage
const parsed = parseDiceExpression(userInput);
if (!parsed) {
  // Handle invalid input or use default
}
```

**Examples:**
- `parseDiceExpression()` / `getPrimaryDie()` - return `null` for invalid dice expressions
- `parseMissileRange()` - returns `null` for an unparseable range string
- `parseBirthAugurDescription()` (internal to the table loader) - returns `null` for malformed descriptions

### 2. User-Facing APIs → Result Objects

Operations that can fail in expected ways (file import, validation) return structured result objects with success/failure status:

```typescript
interface ImportResult {
  success: boolean;
  character?: Character;
  error?: string;
  warnings?: string[];
}

function importCharacter(json: string): ImportResult {
  // Invalid JSON
  if (!isValidJson(json)) {
    return { success: false, error: "Invalid JSON" };
  }

  // Version mismatch (non-fatal)
  const warnings: string[] = [];
  if (data.version !== CURRENT_VERSION) {
    warnings.push(`Version mismatch: expected ${CURRENT_VERSION}, got ${data.version}`);
  }

  return {
    success: true,
    character: parseCharacter(data),
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}
```

**Benefits:**
- Explicit success/failure without exceptions
- Can include warnings for non-fatal issues
- Type-safe error messages
- Easy to pattern match on results

**Examples:**
- `importCharacter()` - returns `{ success: boolean, error?, warnings?, character? }`
- `peekExportedCharacter()` - returns `{ valid: boolean, error?, ...metadata }`

### 3. Programming Errors → Throw

Invalid function arguments (programmer errors) throw immediately. These indicate bugs that should be fixed, not runtime conditions to handle.

```typescript
function rollAbilityScores(config: AbilityScoreConfig, random: RandomSource, ...): { scores: AbilityScores; rolls: ... } {
  if (config.method === "manual" && !config.manualScores) {
    throw new Error("Manual method requires manualScores to be provided");
  }
  // ...
}
```

**Examples:**
- Missing required configuration
- Invalid enum values
- Constraint violations that indicate misuse

### Summary Table

| Scenario | Pattern | Example |
|----------|---------|---------|
| Parsing may fail | `return null` | `parseDiceExpression("invalid")` → `null` |
| User input may be invalid | Result object | `importCharacter(json)` → `{success: false, error}` |
| Programmer error | `throw Error` | Missing required config |

This layered approach keeps the API clean:
- `null` for "try to parse, might not work"
- Result objects for "operation with expected failure modes"
- Exceptions for "this should never happen if used correctly"

## Versioning Strategy

- Core library follows semver (pre-1.0: minor versions may contain breaking changes, marked in [CHANGELOG.md](../CHANGELOG.md))
- Exported character JSON carries its own format version (`CHARACTER_FORMAT_VERSION`, see `src/character/serialize.ts`)
- Official game data is versioned separately by whoever supplies it
- The FoundryVTT adapter lives in the DCC system repo, which pins a vendored lib build (`module/vendor/dcc-core-lib/VERSION.json`)
- Breaking changes to event interfaces are major version bumps