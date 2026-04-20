# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `dcc-core-lib`, a TypeScript library providing core game logic for Dungeon Crawl Classics (DCC) RPG. The library follows a **pure functional approach** - no classes or objects, only pure functions.

## Commands

```bash
npm run build        # Compile TypeScript to dist/
npm run lint         # Run ESLint on src/
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

## Architecture

- **Pure Functions**: All game logic must be implemented as pure functions with no side effects
- **ESM Module**: Uses ES modules (`"type": "module"`)
- **Modules**: `dice`, `skills`, `data`, `character`, `types`

## Key Modules

- `src/character/create.ts` - 0-level character generation
- `src/character/serialize.ts` - Versioned JSON export/import (CHARACTER_FORMAT_VERSION = "1.0")
- `src/types/character.ts` - Character, Inventory, InventoryItem types
- `src/dice/` - Dice chain, roll evaluation
- `src/skills/` - Skill resolution system
- `src/data/` - Static data (occupations, birth augurs, names, ability modifiers)

## TypeScript Configuration

Strict mode is enabled with maximum strictness settings including:
- `noUncheckedIndexedAccess`: Array/object index access returns `T | undefined`
- `exactOptionalPropertyTypes`: Optional properties must use explicit `undefined`
- `noPropertyAccessFromIndexSignature`: Must use bracket notation for index signatures

## ESLint Configuration

Uses `typescript-eslint` with `strictTypeChecked` and `stylisticTypeChecked` configs.

Unused variables pattern: prefix with `_` (e.g., `_unusedParam`)

## Documentation

- `docs/ARCHITECTURE.md` - Goal architecture, event system design, data loading strategy
- `docs/TASKS.md` - Extraction task checklist
- `docs/STATUS.md` - Current project status and next steps

## Source Repository

Game logic is being extracted from the FoundryVTT DCC system at:
`<local path>`

## Rules Reference (local, read-only)

When verifying that logic in this library matches the DCC rules as written, consult the FoundryVTT `dcc-core-book` module already installed on this machine. Do **not** copy rulebook text into this repository — read it on demand. (Rules text is Goodman Games copyrighted material; treat it as reference only.)

### Locations

- **Per-topic journals** (preferred entry point) — one file per table/topic/class:
  `<local path>`
- **Full rulebook prose** (chapters 1–9 + appendices, all in one file):
  `<local path>`
- **Monster fumble tables** (separate pack):
  `<local path>`

### File shape

Each journal JSON has a `pages[]` array. Rules text is in `pages[*].text.content` as HTML (paragraphs, headings, `<table>`). Grep inside the content via the `Grep` tool; strip tags when reading. The ID hash suffix in filenames varies, so glob against the human-readable prefix.

### Module ↔ journal mapping

Use these when checking that code implements the rules correctly.

**Dice** (`src/dice/`):
- Dice chain, bump up/down, crit range scaling → `Core_Book_Text_*.json` (search for "dice chain")
- Attack roll modifiers → `Table_4_1__Attack_Roll_Modifiers_*`
- Mighty deeds → `Mighty_Deeds_of_Arms_*`

**Character creation** (`src/character/`):
- Ability score modifiers → `Table_1_1__Ability_Score_Modifiers_*`
- Luck score / birth augurs → `Table_1_2__Luck_Score_*`
- Occupations → `Table_1_3__Occupation_*`
- XP thresholds → `Table_1_4__XP_Level_Thresholds_*`
- Starting gold → `Starting_Gold_*`

**Classes & progressions** (`src/data/`, `src/skills/`, `src/tables/`):
- Warrior → `Warrior_*`, `Table_1_10`, `Table_1_11`
- Cleric → `Cleric_*`, `Table_1_5`, `Table_1_6`, `Turning_Unholy_*`, `Table_4_4__Turn_Unholy_*`
- Thief → `Thief_*`, `Table_1_7`, `Table_1_8`, `Table_1_9__Thief_Skills_by_Level_and_Alignment_*`
- Wizard → `Wizard_*`, `Table_1_12`, `Table_1_13`
- Dwarf → `Dwarf_*`, `Table_1_14`, `Table_1_15`
- Elf → `Elf_*`, `Table_1_16`, `Table_1_17`
- Halfling → `Halfling_*`, `Table_1_18`, `Table_1_19`

**Combat** (`src/combat/`):
- Attack modifiers → `Table_4_1__Attack_Roll_Modifiers_*`
- Fumbles → `Table_4_2__Fumbles_*`
- Two-weapon attacks → `Table_4_3__Two_weapon_Attacks_*`
- Crit tables → `Crit_Table_I`..`Crit_Table_V_*`, `Crit_Table_M`, `Crit_Table_U`, `Crit_Table_G`, `Crit_Table_DR`, `Crit_Table_DN`
- Combat activities → `Combat_Activities_*`
- Overland speed → `Overland_Speed_*`

**Spells / magic** (`src/spells/`, `src/cleric/`, `src/patron/`):
- Spellburn → `Table_5_1__Spellburn_Actions_*` + per-patron `Spellburn__<Patron>_*`
- Mercurial magic → `Table_5_2__Mercurial_Magic_*`
- Corruption (minor/major/greater) and misfire → `Table_5_3`..`Table_5_6_*`
- Cleric disapproval → `Table_5_7__Disapproval_*`
- Wizard spell list → `Table_5_8__Wizard_Spells__with_page_number__*` + `Wizard_Spells_*`
- Cleric spell list → `Table_5_9__Cleric_Spells__with_page_number__*` + `Cleric_Spells_*`
- Patron spells → `Table_5_10__Patron_Spells__with_page_number__*`
- Patron taints → `Patron_Taint__<Patron>_*`
- Patron overviews → `Patrons_*`, per-patron files (`Azi_Dahaka_*`, `Bobugbubilz_*`, `Sezrekan_*`, `The_King_of_Elfland_*`, `The_Three_Fates_*`, `Ydgrll*`, `Obitu_que_*`, `Ithha_*`)
- Spell duels → `Table_4_5__Spell_Duel_*`, `Table_4_6__Counterspell_*`, `Table_4_7__Phlogiston_*`, `Spell_Duels_*`

**Checks & skills** (`src/checks/`, `src/skills/`):
- Divine aid DCs → `Table_7_8__Divine_Aid_Check_DCs_*`
- Deity requests → `Table_7_7__Deity_Requests_*`
- Luck changes → `Table_7_9__Luck_Changes_*`

**Adventure / judge's rules** (`src/adventure/`):
- Spell knowledge tables → `Table_7_1`..`Table_7_3_*`
- Familiars → `Table_7_4__Familiar_Type_*`, `Table_7_5__Familiar_Physical_Configuration_*`, `Table_7_6__Familiar_Personality_*`
- XP awards → `Experience_Points_*`, `Scaling_XP_Awards_*`
- Consulting spirits → `Consulting_a_Spirit_*`

**Equipment** (for validators / skill bonuses dependent on gear):
- Weapons, ammo, armor, equipment, mounts → `Table_3_1`..`Table_3_5_*` + prose files (`Equipment_*`, `Armor_*`, `Ammunition_*`, `Mounts_*`, `Coinage_*`)

**Monsters** (generation tables used when modelling NPC behaviors):
- Humanoid tables → `Table_9_1`..`Table_9_4_*`
- Un-dead tables → `Table_9_5`, `Table_9_6_*`
- Monster traits → `Table_9_7`, `Table_9_8`, `Table_9_9_*`
- Monster crit matrix → `Table_9_10__Monster_Critical_Hit_Matrix_*`
- Demon generation → `Table_9_11`..`Table_9_14_*`, `Demons_*`, `Demon_Statistics_Range_*`
- Dragon generation → `Dragon_Table_I`..`Dragon_Table_VIII_*`
- Magic swords → `Table_8_1`..`Table_8_9_*`
- Scrolls / magic item creation → `Table_8_10`..`Table_8_13_*`

**Appendices** (`src/tables/`):
- Languages → `Appendix_L__Languages_*`
- Inspirational reading → `Appendix_N__Inspirational_Reading_*`
- Poisons → `Appendix_P__Poisons_*`
- Sobriquets → `Appendix_S__Sobriquets_*`
- Titles → `Appendix_T__Titles_*`

### When to use

Reach for this reference when:
- Implementing a new rules-based function and unsure of RAW behavior.
- A test case's expected value needs rulebook justification.
- Reviewing a PR that touches rules logic (dice chain, crit range, spellburn, corruption, etc.).
- Cross-checking values in `../licensed-data-package` against the authoritative tables.

Workflow: glob the relevant filename prefix under `packs/dcc-core-journals/src/`, read the matching file, extract rules text from `pages[*].text.content`. Fall back to `Core_Book_Text_*.json` for narrative chapters that aren't in a named table.

### Companion data repo

`../licensed-data-package` contains the typed table data values that implement these rules. When verifying logic here, confirm that the data values there match the rulebook text referenced above. Both repos share the same rules-reference convention.

### Separation of concerns: core-lib vs. licensed-data-package

**This library contains logic (functions) only. It does not contain DCC rulebook data.**

All per-class progressions, spell lists, crit/fumble/corruption table entries, occupation/augur tables, patron/taint tables, and any other Goodman-copyrighted table values belong in `licensed-data-package` (or another registered data source), never in `dcc-core-lib`. Core-lib exposes:

- Type definitions (`ClassProgression`, `SpellDefinition`, etc.)
- A registry (`registerClassProgression`, `registerClassProgressions`, `clearClassProgressions`) that data packages populate at app startup
- Functions that read from the registry (`getCriticalHitData`, `getSavingThrows`, `getCritDie`, `getCritTable`, `getTitle`, …)

**Red flags — do NOT do these in this repo:**

- A `Record<number, …>` or similar keyed by character level hardcoding dice, saves, titles, or spells by class (e.g., `WARRIOR_CRIT_DIE`, `CLERIC_SAVES`, `THIEF_LUCK_DIE`).
- `switch` statements on `classId` that encode rulebook values.
- Constants named after a class (`HALFLING_*`, `DWARF_*`, etc.) that contain numeric rulebook values.
- Any rulebook text, even in a comment.

If a function needs class-specific rulebook data, read it from the registry. If the registry is empty (because no data package is loaded), return a minimal neutral default — do not inline "reasonable" defaults drawn from the rulebook.

**Green flags — these belong in this repo:**

- Pure algorithmic logic: "spell check = d20 + level + ability mod", "natural 1 on a cleric cast triggers disapproval", "halfling TWF penalty is one step better than the base TWF penalty".
- Mechanic shapes and types: how lay-on-hands resolves, how disapproval range grows, how mercurial magic is rolled.
- Fan-made sample data in `src/data/sample-data.ts` and similar, clearly labeled as "FAN-MADE, NOT OFFICIAL".
- Tests that use synthetic class IDs (e.g., `"test-fighter"`) with inline minimal progressions, so the test suite does not depend on `licensed-data-package`.

When tempted to "just put the table here for convenience," add it to `../licensed-data-package` instead, and have core-lib read it through the registry.