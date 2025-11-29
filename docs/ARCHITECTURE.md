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
- Sneak Attack / Backstab (enables damage multiplier)

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

  // Level-based skill unlocks
  skillProgression?: Record<number, string[]>;

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
};
```

### Skill Resolution

A single function handles all skill checks:

```typescript
interface SkillCheckInput {
  skill: SkillDefinition;
  character: CharacterState;
  situationalModifiers?: Modifier[];
}

interface SkillCheckResult {
  roll: number;
  die: string;
  modifiers: AppliedModifier[];
  total: number;
  tableResult?: TableLookupResult;
  success?: boolean;
  effects?: SkillEffect[];
}

function resolveSkillCheck(
  input: SkillCheckInput,
  events?: SkillEvents,
  loader?: DataLoader
): Promise<SkillCheckResult>;
```

### Benefits

1. **Data-Driven Classes**: New classes are JSON, not code changes
2. **Consistent Events**: `onSkillCheck` covers all class abilities
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

Rather than building an event system into the library, functions accept optional event callbacks:

```typescript
interface RollEvents {
  onRollStart?: (context: RollContext) => void;
  onRollComplete?: (result: RollResult) => void;
  onCritical?: (result: CriticalResult) => void;
  onFumble?: (result: FumbleResult) => void;
}

function performAttackRoll(
  attacker: AttackContext,
  options?: AttackOptions,
  events?: RollEvents
): AttackResult {
  events?.onRollStart?.({ type: 'attack', attacker });

  const result = calculateAttack(attacker, options);

  if (result.isCritical) {
    events?.onCritical?.(result.critical);
  }

  events?.onRollComplete?.(result);
  return result;
}
```

### Adapter Pattern

Each integration creates an adapter that bridges to its event system:

```typescript
// foundry-adapter.ts
function createFoundryEvents(): RollEvents {
  return {
    onRollComplete: (result) => Hooks.call('dcc.rollComplete', result),
    onCritical: (result) => Hooks.call('dcc.critical', result),
  };
}

// node-adapter.ts
function createEmitterEvents(emitter: EventEmitter): RollEvents {
  return {
    onRollComplete: (result) => emitter.emit('rollComplete', result),
    onCritical: (result) => emitter.emit('critical', result),
  };
}
```

### Event Types

Events are organized by domain:

| Domain | Events |
|--------|--------|
| Dice | `onRollStart`, `onRollComplete`, `onDiceChainBump` |
| Combat | `onAttack`, `onDamage`, `onCritical`, `onFumble`, `onInitiative` |
| Spells | `onSpellCheck`, `onSpellSuccess`, `onSpellFailure`, `onMercurialEffect`, `onDisapproval` |
| Character | `onLevelUp`, `onAbilityCheck`, `onSavingThrow`, `onLuckBurn` |

## Data Loading & Copyright Separation

### Philosophy: Strict Separation of Code and Data

**This library (`dcc-core-lib`) contains NO copyrighted game data.**

DCC RPG content is copyrighted by Goodman Games. To respect this:

1. **`dcc-core-lib` (public)** - Contains only:
   - Pure calculation functions
   - Type definitions
   - Data loaders/parsers
   - Static lookup tables (ability modifiers, dice chain - game mechanics, not content)
   - Fan-made sample data for testing

2. **`licensed-data-package` (private)** - Contains official DCC content:
   - Birth augurs (Table 1-2)
   - Occupations (Table 1-3)
   - Class progressions (all 7 core classes)
   - Turn Unholy, Lay on Hands tables
   - Crit tables, fumble tables
   - Spell definitions

### Registry Pattern for Class Data

Class progression data must be registered at runtime, not hardcoded:

```typescript
// In your application startup
import { registerClassProgressions } from "dcc-core-lib";
import { ALL_CLASS_PROGRESSIONS } from "licensed-data-package";

// Register official data
registerClassProgressions(ALL_CLASS_PROGRESSIONS);

// Now utility functions work
const saves = getSavingThrows("warrior", 5);
const attackBonus = getAttackBonus("thief", 3);
```

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

### Solution: Data Loader Interface

```typescript
interface DataLoader {
  loadTable(tableId: string): Promise<TableData>;
  loadClassData(classId: string): Promise<ClassData>;
  loadSpellData(spellId: string): Promise<SpellData>;
}

// File system loader
const fsLoader: DataLoader = {
  async loadTable(id) {
    const path = `./data/tables/${id}.json`;
    return JSON.parse(await fs.readFile(path, 'utf-8'));
  },
  // ...
};

// HTTP loader
const httpLoader: DataLoader = {
  async loadTable(id) {
    const response = await fetch(`${baseUrl}/tables/${id}.json`);
    return response.json();
  },
  // ...
};

// FoundryVTT loader
const foundryLoader: DataLoader = {
  async loadTable(id) {
    const pack = game.packs.get(`dcc.${id}`);
    return pack.getDocuments();
  },
  // ...
};
```

### Data Separation

**Important:** Official game data lives in the **private** `licensed-data-package` repository:

```
licensed-data-package/           # PRIVATE - contains copyrighted content
├── src/
│   ├── index.ts             # Main exports
│   ├── tables/
│   │   ├── birth-augurs.ts  # Table 1-2
│   │   ├── occupations.ts   # Table 1-3
│   │   ├── turn-unholy.ts   # Table 4-4
│   │   └── lay-on-hands.ts  # Table 4-2
│   └── classes/             # Class progressions (levels 1-10)
│       ├── warrior.ts
│       ├── wizard.ts
│       ├── cleric.ts
│       ├── thief.ts
│       ├── dwarf.ts
│       ├── elf.ts
│       └── halfling.ts
└── dist/                    # Compiled TypeScript
```

This library (`dcc-core-lib`) contains only:
- Static lookup tables (ability modifiers, dice chain - game mechanics)
- Pure calculation functions
- Type definitions
- Data loaders/parsers for external data
- Fan-made sample data for testing (NOT official content)

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

The library accepts a `SystemConfig` that defines the game system:

```typescript
interface SystemConfig {
  id: string;                           // 'dcc', 'mcc', 'xcrawl'
  name: string;

  // Ability scores for this system
  abilities: AbilityDefinition[];       // [{id: 'str', name: 'Strength'}, ...]

  // Which ability is used for common things
  abilityMappings: {
    meleeAttack: string;                // 'str' in DCC
    missileAttack: string;              // 'agl' in DCC
    armorClass: string;                 // 'agl' in DCC
    hitPoints: string;                  // 'sta' in DCC
    willSave: string;                   // 'per' in DCC (varies by system)
    // ... etc
  };

  // Available classes in this system
  classes: string[];                    // Class IDs to load

  // Dice chain (usually same across systems)
  diceChain?: string[];                 // Override if different

  // System-specific mechanics
  mechanics?: {
    hasMutations?: boolean;
    hasDisapproval?: boolean;
    hasMercurial?: boolean;
    // ... etc
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
  },
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
  },
  classes: ['sentinel', 'rover', 'shaman', 'healer', 'mutant', 'manimal', 'plantient'],
  mechanics: {
    hasMutations: true,
    hasWetware: true,
    hasArtifacts: true,
  },
};
```

### Usage

Functions that need system context accept the config:

```typescript
function resolveSkillCheck(
  input: SkillCheckInput,
  system: SystemConfig,      // System defines ability mappings
  events?: SkillEvents,
  loader?: DataLoader
): Promise<SkillCheckResult>;

// Or create a bound context
const dcc = createSystemContext(dccSystem, loader, events);
dcc.resolveSkillCheck(input);  // Uses DCC config
```

### Data Organization

System-specific data lives in the data package:

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
├── index.ts              # Public API exports
├── types/                # TypeScript type definitions
│   ├── character.ts      # Character state, ability scores
│   ├── skills.ts         # SkillDefinition, SkillCheckResult
│   ├── classes.ts        # ClassDefinition, progression
│   ├── system.ts         # SystemConfig for variants
│   ├── combat.ts         # Attack, damage, initiative
│   ├── dice.ts           # Dice expressions, roll results
│   ├── events.ts         # Event callback interfaces
│   ├── items.ts          # Weapons, armor, equipment
│   └── tables.ts         # Table data structures
├── dice/
│   ├── dice-chain.ts     # Dice progression logic
│   ├── roll.ts           # Roll formula parsing
│   └── index.ts
├── skills/
│   ├── resolve.ts        # Unified skill resolution
│   ├── modifiers.ts      # Modifier calculation helpers
│   └── index.ts
├── character/
│   ├── abilities.ts      # Ability score calculations
│   ├── armor-class.ts    # AC calculations
│   ├── hit-points.ts     # HP calculations
│   └── index.ts
├── combat/
│   ├── attack.ts         # Attack roll calculations
│   ├── damage.ts         # Damage calculations
│   ├── initiative.ts     # Initiative calculations
│   ├── crits.ts          # Critical hit logic
│   ├── fumbles.ts        # Fumble logic
│   └── index.ts
├── parsers/
│   ├── purple-sorcerer-types.ts  # Types for parsed data
│   ├── parse-text.ts             # Purple Sorcerer text format parser
│   ├── parse-json.ts             # Purple Sorcerer JSON format parser
│   ├── convert.ts                # Convert parsed data to Character type
│   ├── npc-parser.ts             # NPC stat block parser (TODO)
│   └── index.ts                  # Unified parser with auto-detection
└── data/
    ├── ability-modifiers.ts  # Static modifier table (shared)
    ├── dice-chain.ts         # Default dice chain
    └── index.ts
```

## Integration Examples

### FoundryVTT Integration

```typescript
import { performAttackRoll, createDiceChain } from 'dcc-core-lib';
import { createFoundryEvents, createFoundryDataLoader } from 'dcc-foundry-adapter';

// In actor.js
async rollAttack(weaponId) {
  const weapon = this.items.get(weaponId);
  const events = createFoundryEvents();
  const loader = createFoundryDataLoader();

  const result = await performAttackRoll(
    {
      attackBonus: this.system.details.attackBonus,
      actionDie: this.system.details.actionDice,
      // ...
    },
    { weapon: weapon.system },
    events,
    loader
  );

  // FoundryVTT-specific: create chat message
  await this.createAttackChatMessage(result);
}
```

### API Integration

```typescript
import { performAttackRoll } from 'dcc-core-lib';
import { createHttpDataLoader } from './data-loader';

app.post('/api/attack', async (req, res) => {
  const loader = createHttpDataLoader(process.env.DATA_URL);

  const result = await performAttackRoll(
    req.body.attacker,
    req.body.options,
    undefined,  // no events needed for API
    loader
  );

  res.json(result);
});
```

## Error Handling Patterns

The library uses a consistent layered approach to error handling:

### 1. Internal Parsing Utilities → `null`

Low-level parsing functions return `null` when they cannot parse input. This allows callers to easily check for failure and provide fallback behavior.

```typescript
// dice/dice-chain.ts
function parseDice(expression: string): ParsedDice | null {
  const match = DICE_REGEX.exec(expression);
  if (!match) {
    return null;  // Not a valid dice expression
  }
  // ... parse and return
}

// Usage
const parsed = parseDice(userInput);
if (!parsed) {
  // Handle invalid input or use default
}
```

**Examples:**
- `parseDice()` - returns `null` for invalid dice expressions
- `parseAugurDescription()` - returns `null` for malformed descriptions

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
function rollAbilityScores(config: AbilityScoreConfig, ...): AbilityScores {
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
| Parsing may fail | `return null` | `parseDice("invalid")` → `null` |
| User input may be invalid | Result object | `importCharacter(json)` → `{success: false, error}` |
| Programmer error | `throw Error` | Missing required config |

This layered approach keeps the API clean:
- `null` for "try to parse, might not work"
- Result objects for "operation with expected failure modes"
- Exceptions for "this should never happen if used correctly"

## Versioning Strategy

- Core library follows semver
- Game data package versioned separately
- FoundryVTT adapter tracks FoundryVTT API versions
- Breaking changes to event interfaces are major version bumps