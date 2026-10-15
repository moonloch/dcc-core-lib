# Supplying game data

`@moonloch/dcc-core-lib` ships rules **logic** only. Every rulebook table
(class progressions, occupations, birth augurs, crit/fumble/corruption/
disapproval tables, spell lists, patrons, XP thresholds) is data that the
consuming application supplies at startup. This document describes what the
library expects, where each kind of data goes, and how to build a data
directory of your own from a licensed copy of the rulebook.

The library does no I/O. Your app reads files, compendiums, or HTTP responses
however its platform allows, then hands the parsed JSON to the functions
below. There is no path argument, environment variable, or config file; the
only path in the codebase is `TEST_DATA_PATH` in
`src/data/loaders/integration.test.ts`, which the test suite uses to find the
fixtures in `test_data/`.

## Copyright

DCC RPG is © Goodman Games. Build your data directory from your **own
licensed copy** of the rulebook (or from a content package you are licensed
to use), keep it in a private package or in your app's own content, and never
submit official text or table values to this repository. See
[CONTRIBUTING.md](../CONTRIBUTING.md#copyright-separation) for what may and
may not be committed here.

## The data kinds at a glance

| Data | Governing type | Input format | How it reaches the lib |
|------|----------------|--------------|------------------------|
| Class progressions | `ClassProgression` (`src/types/class-progression.ts`) | FoundryVTT `class-level` item JSON, or build the type directly | `loadClassProgression()` then `registerClassProgression(s)()` (registry) |
| XP thresholds | `XPThresholds` (`src/character/level-up.ts`) | Build the type directly | `registerXPThresholds()` / `registerAllXPThresholds()` (registry) |
| Lookup tables: crit, fumble, turn unholy, divine aid, disapproval, corruption, patron taint/invoke, spell results, lay on hands | `LookupTable` (`src/tables/types.ts`) | Library JSON format | `loadTableFromJson()` / `registerTable()` (registry), or pass the table object straight to the rules function |
| Birth augurs | `BirthAugurEntry` (`src/types/tables.ts`) | FoundryVTT `RollTable` JSON, or build the type directly | `loadBirthAugurs()`, then pass in `CharacterCreationData` |
| Occupations | `OccupationEntry` (`src/character/create.ts`) | Build the type directly | Pass in `CharacterCreationData` |
| Name lists | `NameGenerationData` (`src/data/names.ts`) | Build the type directly | Pass in `CharacterCreationData.nameData` |
| Spells | `SpellDefinition` (`src/types/spells.ts`) | Plain JSON (`RawSpellDefinition`) | `loadSpellDefinitions()`; no registry, keep the array in your app |
| Mercurial magic table | `MercurialTable` (`src/spells/mercurial.ts`) | Plain JSON (`RawMercurialTable`) | `loadMercurialTable()`, then pass to `rollMercurialMagic()` |
| Patrons | `PatronDefinition` (`src/types/patron.ts`) | Build the type directly | `registerPatron(s)()` (registry) |
| Check / skill definitions | `SkillDefinition` (`src/types/skills.ts`) | Build the type directly | `registerCheckDefinition()` (registry) |
| Spell-duel tables | `SpellDuelTables` (`src/spells/spell-duel-tables.ts`) | Build the type directly | Optional argument to `rollCounterspellPower()` / `rollPhlogistonDisturbance()` |

"Build the type directly" means there is no parser: write JSON whose shape
matches the TypeScript interface and `JSON.parse` it.

Two kinds of handoff are used:

- **Registries** (`register*` functions) hold data in module-level maps that
  other library functions read. Register once at app startup. The class-progression, XP, patron and table
  registries have `clear*` functions for tests; the check registry does not.
- **Arguments.** Most rules functions take their table as a parameter
  (`turnUnholy(input, turnTable)`, `rollCorruption(corruptionTable, ...)`,
  `castSpell({ ..., resultTable })`). The table registry
  (`registerTable` / `getTable`) is a convenience store for your app; no rules
  function reads it on its own.

## Class progressions

### Shape

```typescript
interface ClassProgression {
  classId: string;                  // "warrior", "thief", "my-druid"
  name: string;                     // display name
  skills: string[];                 // skill IDs this class has access to (may be [])
  levels: Record<number, ProgressionLevelData>;   // sparse; keys 1..10
}

interface ProgressionLevelData {
  attackBonus: number | DieType;    // "d3" for deed-die classes
  criticalDie: string;              // "1d12"
  criticalTable: string;            // "III"
  actionDice: string[];             // ["1d20"], ["1d20", "1d14"]
  hitDie: DieType;                  // stored as given, e.g. "1d12" from Foundry data
  saves: { ref: number; frt: number; wil: number };
  luckDie?: DieType;                // thieves, halflings
  critRange?: number;               // 19 for a 19-20 threat range
  lawful?: AlignmentLevelData;      // { title: string; skills: Record<string, number | DieType> }
  neutral?: AlignmentLevelData;
  chaotic?: AlignmentLevelData;
}
```

### Loading from FoundryVTT class-level items

`loadClassProgression(classId, name, skills, rawLevels)` and
`parseClassLevel(raw)` accept the `system` block of a DCC FoundryVTT
`class-level` item (`RawClassLevelData`):

```json
{
  "class": "thief",
  "level": "1",
  "levelData": "system.details.attackBonus=+0\nsystem.attributes.critical.die=1d10\nsystem.attributes.critical.table=II\nsystem.attributes.actionDice.value=1d20\nsystem.attributes.hitDice.value=1d6\nsystem.class.luckDie=d3\nsystem.saves.ref.classBonus=+1\nsystem.saves.frt.classBonus=+1\nsystem.saves.wil.classBonus=+0",
  "levelDataLawful": "system.details.title.value=Bravo\nsystem.class.backstab=+1\nsystem.skills.sneakSilently.value=+3\nsystem.skills.castSpellFromScroll.die=d10",
  "levelDataNeutral": "...",
  "levelDataChaotic": "..."
}
```

Each `levelData*` string is newline-separated `key=value` pairs. The loader
recognizes these keys and ignores everything else:

| Key | Field | Parsing |
|-----|-------|---------|
| `system.details.attackBonus` | `attackBonus` | `+3` → `3`; `d3` / `+d3` → `"d3"`; unparsable → `0` |
| `system.attributes.critical.die` | `criticalDie` | string as-is |
| `system.attributes.critical.table` | `criticalTable` | string as-is |
| `system.attributes.actionDice.value` | `actionDice` | split on `,`, trimmed |
| `system.attributes.hitDice.value` | `hitDie` | string as-is (`1d6` stays `1d6`) |
| `system.class.luckDie` | `luckDie` | string as-is |
| `system.details.critRange` | `critRange` | `parseInt` |
| `system.saves.ref.classBonus`, `.frt.`, `.wil.` | `saves` | number |
| `system.details.title.value` (alignment blocks) | `title` | string |
| `system.skills.<camelName>.value` or `.die` (alignment blocks) | `skills["<kebab-name>"]` | `+3` → `3`; `d12` → `"d12"`; `sneakSilently` → `sneak-silently` |
| `system.class.backstab` (alignment blocks) | `skills["backstab"]` | number |

Defaults when a key is missing: `attackBonus 0`, `criticalDie "1d8"`,
`criticalTable "I"`, `actionDice ["1d20"]`, `hitDie "d6"`, saves `0`. A raw
level whose `level` is not an integer is skipped. The loader reports no
errors; validate your source before loading if you need strictness.

### Registering and reading

```typescript
import {
  loadClassProgression,
  registerClassProgression,
  registerClassProgressions,
  getSavingThrows,
  getCriticalHitData,
  getTitle,
} from "@moonloch/dcc-core-lib";

const thief = loadClassProgression("thief", "Thief", ["backstab", "sneak-silently"], rawThiefLevels);
registerClassProgression(thief);           // or registerClassProgressions([...])

getSavingThrows("thief", 5);              // { reflex, fortitude, will }
getCriticalHitData("thief", 5);           // { die: "1d20", table: "II" }
getTitle("thief", 5, "chaotic");
```

Readers: `getClassProgression`, `getRegisteredClassIds`, `getSaveBonus`,
`getSavingThrows`, `getAttackBonus`, `getActionDice`, `getCriticalHitData`,
`getTitle`, `getHitDie`, `getLuckDie`, plus `getCritTable` / `getCritDie` in
`combat` and `levelUp` in `character`. With nothing registered they return
neutral defaults (saves `0`, attack `0`, action dice `["1d20"]`, crit
`{ die: "1d4", table: "I" }`, hit die `"d4"`, luck die / title `undefined`).
`hasDeedDie(classId)` is the one class-name special case: it returns `true`
only for `"warrior"` and `"dwarf"`.

## XP thresholds

```typescript
interface XPThresholds {
  classId: string;
  thresholds: number[];   // index 0 = XP to reach level 1, index 9 = level 10
}
registerXPThresholds({ classId: "thief", thresholds: [10, 50, ...] });
registerAllXPThresholds([...]);
```

`getXPThresholds`, `getXPForLevel`, `calculateLevelFromXP`, `canLevelUp` and
`levelUp` read this registry. For an unregistered class they fall back to a
**fan-made** default progression (`DEFAULT_XP_THRESHOLDS` in
`src/character/level-up.ts`), so register real values for every class.

## Lookup tables

The table system (`src/tables/`) has its own JSON format, discriminated by
`type`. All four variants share `TableMetadata`:
`id` (required), `name` (required), `description?`, `source?`, `tags?`.

### `simple` - one result per roll range

Used for fumbles, turn unholy, divine aid, disapproval, corruption, patron
taint.

```json
{
  "id": "my-turn-unholy",
  "name": "Turn Unholy",
  "type": "simple",
  "die": "d20",
  "entries": [
    { "min": 1,  "max": 11, "text": "Failure.",          "effect": { "type": "none" } },
    { "min": 12, "max": 13, "text": "Turn 1d4 HD.",      "effect": { "type": "turn", "dice": "1d4" } },
    { "min": 14, "max": 999, "text": "Turn 1d6+CL HD.",  "effect": { "type": "turn", "dice": "1d6+CL" } }
  ]
}
```

`entries[].effect` is an optional `TableEffect`
(`{ type, dice?, value?, duration?, target?, data? }`) for programmatic
handling; `text` is what players see. Use a large `max` on the last entry to
cover high totals.

### `multi-column` - row by roll, column by die

Used for crit tables, where the column is the crit die.

```json
{
  "id": "my-crit-iii",
  "name": "Crit Table III",
  "type": "multi-column",
  "columns": [ { "id": "d4", "label": "d4" }, { "id": "d6", "label": "d6" } ],
  "rows": [
    { "min": 1, "max": 2, "columns": { "d4": { "text": "..." }, "d6": { "text": "..." } } }
  ]
}
```

### `tiered` - results with an outcome tier

Used for spell result tables and patron invoke tables.

```json
{
  "id": "spell-my-bolt",
  "name": "My Bolt",
  "type": "tiered",
  "spellLevel": 1,
  "entries": [
    { "min": 1,  "max": 1,  "tier": "lost",          "text": "Lost. Failure." },
    { "min": 2,  "max": 11, "tier": "failure",       "text": "Failure." },
    { "min": 12, "max": 13, "tier": "success-minor", "text": "..." },
    { "min": 14, "max": 17, "tier": "success",       "text": "...", "manifestation": "..." }
  ]
}
```

`tier` is one of `lost`, `failure`, `success-minor`, `success`,
`success-major`, `success-critical`. `max` is optional (defaults to the next
entry's `min - 1`). Optional `tiers` gives quick thresholds per tier.

### `lay-on-hands` - rows by check total, dice count by alignment

```json
{
  "id": "my-lay-on-hands",
  "name": "Lay on Hands",
  "type": "lay-on-hands",
  "rows": [
    { "min": 1,  "max": 11, "dice": { "same": 0, "adjacent": 0, "opposed": 0 }, "text": "Failure." },
    { "min": 12, "max": 13, "dice": { "same": 2, "adjacent": 1, "opposed": 1 } }
  ],
  "conditions": { "disease": 2, "poison": 3 }
}
```

Note: `parseTable` / `loadTableFromJson` recognize `simple`, `multi-column`
and `tiered` only. A `lay-on-hands` table must be built as an object and
passed to `registerTable()` or straight to `layOnHands()`.

### Loading, validating, registering

```typescript
import { loadTableFromJson, loadTablesFromJson, loadAndRegisterTable,
         registerTable, getTable, validateTable } from "@moonloch/dcc-core-lib";

loadTableFromJson(jsonString);        // { success: true, table } | { success: false, error }
loadTablesFromJson(jsonArrayString);  // same, for an array
loadAndRegisterTable(jsonString, { overwrite: false, validate: true });
registerTable(table, { overwrite: false, validate: true });   // throws on duplicate id / invalid
getTable("my-turn-unholy");
```

`parseTable` checks that `id`, `name` and `type` are strings and that the
type-specific array exists. `validateTable` (run by `registerTable` unless
`validate: false`) sorts the ranges and rejects overlaps and gaps; it does
not validate `effect` contents. Other registry functions: `registerTables`,
`requireTable`, `getSimpleTable`, `getMultiColumnTable`, `getTieredTable`,
`hasTable`, `getTableIds`, `getTablesByType`, `getTablesByTag`,
`unregisterTable`, `clearRegistry`.

### Which rules function takes which table

| Function | Parameter | Table type |
|----------|-----------|------------|
| `turnUnholy(input, turnTable)` | `turnTable` | `SimpleTable` |
| `divineAid(input, aidTable)` | `aidTable` | `SimpleTable` |
| `layOnHands(input, table)` | `table` | `LayOnHandsTable` |
| `rollDisapproval(range, disapprovalTable, …)`, `checkAndRollDisapproval` | `disapprovalTable` | `SimpleTable` |
| `rollCorruption(corruptionTable, …)`, `rollCorruptionWithModifier` | `corruptionTable` | `SimpleTable` |
| `rollPatronTaint(…, taintTable)` | `taintTable` | `SimpleTable` |
| `castSpell(input)` | `input.resultTable` (optional; else `spell.results` inline, else level threshold) | `TieredTable` |
| `invokePatron(input)` | `input.invokeTable`, `input.taintTable` (both optional) | `TieredTable`, `SimpleTable` |
| `rollCounterspellPower(…, table?)`, `rollPhlogistonDisturbance(…, table?)` | optional; fan-made `DEFAULT_SPELL_DUEL_TABLES` otherwise | `CounterspellPowerTable`, `PhlogistonDisturbanceTable` |

`rollCritical` and `rollFumble` do **not** take a table: they roll the die
and apply modifiers, returning a total for your app to look up (for example
with `lookupMultiColumn(critTable, total, "d12")`).

## Birth augurs and occupations (character creation)

`createZeroLevelCharacter(data, config?, random?)` takes a
`CharacterCreationData`:

```typescript
interface CharacterCreationData {
  occupations: OccupationEntry[];
  birthAugurs: BirthAugurEntry[];
  customDiceMethods?: Record<string, DiceMethodDefinition>;
  customHPMethods?: Record<string, HPMethodDefinition>;
  nameData?: NameGenerationData;     // defaults to the fan-made DEFAULT_NAME_DATA
}
```

### Birth augurs

```typescript
interface BirthAugurEntry {
  roll: number;                    // 1-30
  name: string;
  affects: string;                 // what the luck modifier applies to
  effectType?: BirthAugurEffectType;   // "attack-all", "spell-check", ... (see src/types/tables.ts)
}
```

`loadBirthAugurs(raw)` builds this from a FoundryVTT `RollTable` export
(`RawTableData`: `{ _id, name, description?, formula, results: [{ range: [min, max], description }] }`).
Each `description` must be `"Name: What it affects"`; results without a colon
are skipped, `roll` is `range[0]`, and `effectType` is inferred by matching
the text after the colon against a fixed list of phrases (`/all attack rolls/i`
→ `attack-all`, `/spell checks/i` → `spell-check`, `/^saving throws$/i` →
`saving-throw-all`, …; first match wins, otherwise `"unknown"`). Write the
`affects` text so one of those phrases matches, or set `effectType` yourself.
`loadRollableTable(raw)` converts the same input into a generic
`RollableTable` if you want the table for display.

### Occupations

```typescript
interface OccupationEntry {
  roll: number | string;      // 7 or "23-24"
  name: string;
  trainedWeapon: string;      // "Hammer (as club)" - parseWeaponTraining() understands "(as X)"
  tradeGoods: string;
  startingFunds?: number;     // copper pieces
  isFarmer?: boolean;
  notes?: string;
}
```

There is no occupation loader; write the array as JSON. `findOccupationByRoll`
and `selectOccupation` resolve numeric and `"a-b"` ranges.
`OccupationWithSkills` (`src/types/occupation-skills.ts`) extends the entry
with `skills?: OccupationSkillGrant[]` for the occupation-skill check API.

## Spells and mercurial magic

### Spell definitions

`loadSpellDefinitions(rawSpells)` and `loadSpellDefinitionsWithValidation(rawSpells)`
accept an array of `RawSpellDefinition`:

```json
{
  "id": "my-bolt",
  "name": "My Bolt",
  "level": 1,
  "casterTypes": ["wizard", "elf"],
  "description": "...",
  "range": "...", "duration": "...", "castingTime": "...",
  "save": "reflex",
  "tags": ["attack"],
  "source": "My Rulebook p.123"
}
```

Required: `id` and `name` (non-empty strings), `level` (number, the loader
accepts 1-9),
`casterTypes` (non-empty, values among `wizard`, `cleric`, `elf`;
case-insensitive, unknown values dropped). `save` must be `reflex`,
`fortitude`, `will` or `none` or it is dropped. Invalid spells are skipped by
`loadSpellDefinitions` and reported with a reason by the `WithValidation`
variant.

The loader does not read `resultTableId`, `results` (inline tiered results)
or `manifestationTableId`; set those on the returned `SpellDefinition`
yourself, or construct `SpellDefinition` objects directly. There is no spell
registry: keep the array and use `findSpellById`, `findSpellsByName`,
`getAvailableSpells`, `groupSpellsByLevel`, `groupSpellsByCasterType`.

### Mercurial magic table

`loadMercurialTable(raw)` / `loadMercurialTableWithValidation(raw)` take:

```json
{
  "id": "my-mercurial",
  "name": "Mercurial Magic",
  "entries": [
    { "min": 1, "max": 10, "summary": "...", "description": "...",
      "displayOnCast": true,
      "effect": { "type": "modifier", "modifier": 1, "trigger": "on-cast" } }
  ]
}
```

`effect` is optional (`type` required; `modifier?`, `dice?`, `trigger?` among
`always`, `on-cast`, `on-success`, `on-failure`, `on-crit`, `on-fumble`;
`duration?`, `data?`). The validating loader rejects a missing `id`/`name`,
empty `entries`, non-numeric or inverted `min`/`max`, missing `summary` or
`description`, and gaps or overlaps between entries. The loader does not read
`special` (the "roll again twice" style meta-entries, `MercurialSpecial`);
add those to the parsed table directly. `validateMercurialTable(table)`
checks a built table.

## Patrons

```typescript
interface PatronDefinition {
  id: string;
  name: string;
  description?: string;
  domain?: string;
  alignment?: "lawful" | "neutral" | "chaotic";
  source?: string;
  invokeTableId: string;            // your ID for the patron's TieredTable
  taintTableId: string;             // your ID for the patron's SimpleTable
  grantedSpells: { spellId: string; minLevel: number; description?: string }[];
  bondRequirements?: string;
}
registerPatron(patron);             // throws if the id is already registered
registerPatrons([...]);
```

Readers: `getPatron`, `requirePatron`, `hasPatron`, `getRegisteredPatronIds`,
`getAllPatrons`, `findPatrons`, `getPatronInvokeTableId`,
`getPatronTaintTableId`, `getPatronSpells`. The two table IDs are for your
app to resolve (for example via `getTable`); `invokePatron` receives the
table objects in its input.

## Check and skill definitions

`registerCheckDefinition(definition: SkillDefinition)` adds a namespaced
check (`"skill:backstab"`, `"ability:str"`) to the check registry that
`rollCheck`, `rollAbilityCheck` and `rollSavingThrow` resolve IDs against. The built-in definitions describe
mechanic shapes, not rulebook values; a homebrew class is a list of
`SkillDefinition`s plus a `ClassProgression`. See
[ARCHITECTURE.md](ARCHITECTURE.md#unified-skill-system).

## How the DCC FoundryVTT system does it

The open-source [DCC system](https://github.com/foundryvtt-dcc/dcc) ships
this library's `dist/` and a loader, but no progression data. Licensed
content modules (the DCC core book module and sibling class packs) register
their compendium packs with the system at `init`
(`CONFIG.DCC.levelDataPacks.addPack("my-module.my-levels")`, plus
`game.dcc.registerHomebrewClassForProgressionLoad(classId, itemPrefix)` for
non-core classes). At `ready` the system walks those packs, reads each
`{Prefix}-{level}` item's `system.levelData`, and calls
`registerClassProgressions(...)` before firing its `dcc.ready` hook. The
other tables stay as Foundry `RollTable` documents: the system's adapter
converts disapproval and mercurial tables into the lib's `SimpleTable` /
`MercurialTable` shapes on demand when it calls `rollDisapproval` /
`rollMercurialMagic`, and reads crit and fumble result text from Foundry
after `rollCritical` / `rollFumble` return the total. The system does not
use the lib's table registry.

## `test_data/` is not a template

`test_data/` holds a handful of **fan-made** fixtures in the FoundryVTT
shapes above (ten thief level items, one warrior level item, one d30 luck
table) so that `src/data/loaders/integration.test.ts` can exercise the
FoundryVTT-format loaders end to end. They reuse table and augur names with
altered values and contain no rulebook text. Do not copy real values into
them, and do not add official data there; build your own directory outside
this repository.

## Minimal worked example

The smallest useful data directory is one class progression. Create
`my-dcc-data/classes/fighter.json` with one FoundryVTT-shaped level:

```json
[
  {
    "class": "fighter",
    "level": "1",
    "levelData": "system.details.attackBonus=+d3\nsystem.attributes.critical.die=1d10\nsystem.attributes.critical.table=II\nsystem.attributes.actionDice.value=1d20\nsystem.attributes.hitDice.value=1d10\nsystem.saves.ref.classBonus=+0\nsystem.saves.frt.classBonus=+2\nsystem.saves.wil.classBonus=+0",
    "levelDataLawful": "system.details.title.value=Shieldbearer",
    "levelDataNeutral": "system.details.title.value=Wanderer",
    "levelDataChaotic": "system.details.title.value=Raider"
  }
]
```

Then, in Node:

```typescript
import { readFile } from "node:fs/promises";
import {
  loadClassProgression,
  registerClassProgression,
  getSavingThrows,
  getCriticalHitData,
  getAttackBonus,
  getTitle,
} from "@moonloch/dcc-core-lib";

const rawLevels = JSON.parse(await readFile("my-dcc-data/classes/fighter.json", "utf-8"));
registerClassProgression(loadClassProgression("fighter", "Fighter", [], rawLevels));

getSavingThrows("fighter", 1);     // { reflex: 0, fortitude: 2, will: 0 }
getCriticalHitData("fighter", 1);  // { die: "1d10", table: "II" }
getAttackBonus("fighter", 1);      // "d3"
getTitle("fighter", 1, "lawful");  // "Shieldbearer"
```

Add the remaining levels, then the other kinds of data from the table above,
one JSON file per table or list, and load them the same way at startup. In a
browser or a VTT, replace `readFile` with `fetch` or a compendium read; the
library calls are identical.
