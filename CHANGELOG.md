# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **Save check no longer double-counts the governing ability modifier.**
  `createSaveDefinition` previously set `roll.ability`, which caused the
  resolver (`skills/resolve.ts#getAbilityMod`) to add Sta/Agl/Per on top
  of `state.saves.{fortitude,reflex,will}` — but `state.saves.*` is
  already the full save total per `calculateSavingThrows`
  (class bonus + ability mod). Removed `roll.ability` from save
  definitions. Repro: a 0-level character with sta 14 and
  `state.saves.fortitude = 1` previously produced formula `1d20+2`;
  now produces the correct `1d20+1`. Existing roll-test fixtures
  updated to assert the de-duplicated total.

## [0.6.0] - 2026-04-20

### Added

- **`DamageInput.extraDamageDice`** — optional array of extra damage
  terms rolled separately from the base weapon die. Each term is
  `{ count, die, flavor?, source? }`; each contributes its own
  `DamageBreakdown` entry labelled by `source ?? flavor ?? "extra"`.
  Covers dice-bearing magic weapon bonuses (e.g. `+1d4 fire`) and
  multi-type per-term damage formulas (e.g. `1d6[fire]+1d6[cold]`).

### Changed

- **`DamageInput.magicBonus` now accepts negative values** for cursed
  weapons (e.g. a `-1` sword). `rollDamage` adds the bonus whenever
  it is non-zero, and labels the `breakdown` entry `"cursed"` for
  negative values (unchanged `"magic"` label for positive). Callers
  that were passing only non-negative magic bonuses see no behavior
  change.

## [0.5.0] - 2026-04-19

### Changed (BREAKING)

- **Combat rules brought in line with RAW** following a validation pass
  of `src/combat/**` against the DCC core rulebook (Chapter 4 +
  Tables 3-3, 4-3). Findings catalogued in `docs/COMBAT_RULES_FIXES.md`.
- **Initiative rewrite** (`src/combat/initiative.ts`):
  - Default initiative die changed from `d16` to `d20` (Core Book Ch. 4:
    initiative is rolled on a d20).
  - Removed the per-level warrior/dwarf initiative-die map. Warriors now
    add their **class level** as a flat modifier — pass it via
    `InitiativeInput.classModifier`. Dwarves use the standard d20.
  - Added `TWO_HANDED_INITIATIVE_DIE = "d16"` and a new
    `getInitiativeDie(isWieldingTwoHanded?)` helper for the two-handed
    weapon case.
  - **Removed**: `WARRIOR_INITIATIVE_DIE`, `getTwoWeaponInitiativeBonus`
    (the halfling `+1` two-weapon initiative bonus was fabricated —
    halfling two-weapon advantages are die-chain reductions only).
  - **Removed**: `InitiativeInput.twoWeaponBonus`.
- **Two-weapon fighting rewrite** (`src/combat/attack.ts`):
  - Replaces the flat `-2` (or `-1` for halflings) attack penalty with
    the Table 4-3 die-chain reduction model. Each hand's action die is
    stepped down the dice chain based on the attacker's Agility.
  - **Removed**: `AttackInput.twoWeaponPenalty`, `getTwoWeaponPenalty`.
  - **Added**: `getTwoWeaponDice(agility, { isHalfling })` returning
    `TwoWeaponDiceConfig` (per-hand die reduction, crit eligibility,
    Agl-16-17 "no auto-hit" flag, halfling overrides).
  - **Added**: `rollTwoWeaponAttack(input, roller?, events?)` — high-
    level wrapper that rolls both hands, clamps any improved threat
    range to 20 (warriors lose improved threat range when two-weapon
    fighting per the Table 4-3 footnote), and applies the Agl-16-17
    "primary crits on max die that beats AC, no auto-hit" rule.
  - Halfling class overrides: clamps effective Agility to a minimum
    of 16 for row lookup; auto-hit + auto-crit on natural max of the
    reduced die (either hand); and fumble only when **both** rolls
    are natural 1.
- **Armor check penalties corrected to Table 3-3** (`src/combat/fumbles.ts`):
  - Padded check penalty: `-1` → `0`. Leather: `-2` → `-1`.
  - **Added**: `studded-leather` armor type (AC +3, check -2,
    fumble d8). `getArmorType()` now matches "studded" before
    "leather" (substring overlap).
- **Body recovery field rename** (`src/combat/death-and-dying.ts`):
  - `BodyRecoveryResult.targetDC` → `luckTarget`. Body recovery is a
    roll-under-Luck check, not a meet-or-exceed DC; the field name now
    reflects the mechanic.

- **Thief backstab rewritten to match DCC rules-as-written.** The prior
  implementation applied a level-scaled damage multiplier (×2 → ×5),
  which is not how DCC backstab works. The corrected mechanic:
  - Attack-roll bonus from Table 1-9 (alignment × level).
  - Automatic critical hit on any successful hit (Crit Table II with
    the thief's level-scaled crit die).
  - Trigger is "target behind **or** unaware" (inclusive), not both.
  - Target must have clear anatomical vulnerabilities.
- **Character format bumped to 1.1.** Legacy v1.0 exports import
  successfully; `thief.backstabMultiplier` is stripped on read.
- **Removed**: `getBackstabMultiplier`, `getBackstabMultiplierFromSkill`,
  `DamageInput.backstabMultiplier`, `DamageResult.subtotal`,
  `DamageResult.multiplier`, `ThiefState.backstabMultiplier`,
  `BACKSTAB_ENABLING` (renamed — see below).
- **Added**:
  - `getBackstabAttackBonus(progression, level, alignment)` — returns
    `number | undefined` (undefined distinguishes missing-data from a
    legitimate +0 bonus).
  - `isBackstabTriggeredRaw(attackerIsBehind, targetIsUnaware)` — the
    stock DCC trigger. Extensions (magic items, spells, extra classes)
    compose their own trigger by OR-ing this with extra conditions.
  - `canBackstab(isBackstabTriggered, classId, targetHasAnatomy?)` —
    now takes a precomputed trigger boolean (caller computes RAW or
    extension trigger) and enforces class + anatomy gates.
  - `BACKSTAB_BONUS_ID = "class:backstab"` — canonical `RollBonus.id`
    for the Table 1-9 attack bonus.
  - `AttackInput.isBackstab` — drives auto-crit on a hit (a natural 1
    fumble is still a miss and does NOT auto-crit).
  - `AttackResult.critSource: "threat-range" | "backstab-auto" |
    "natural-max" | undefined` — tells downstream code why a crit
    fired (used to select the right crit table).
  - `WeaponStats.backstabDamage` + `getWeaponDamage(weapon, isBackstab)`
    for Table 3-1 backstab-friendly weapons (dagger, blackjack,
    blowgun, garrote). `getWeaponDamage` lives in `src/combat/damage.ts`.
- **Consolidated**: `BACKSTAB_ENABLING` renamed to `BACKSTAB`; the
  previous `BACKSTAB` stub in `thief-skills.ts` now re-exports the
  enabling-skills definition so there is a single source of truth.
- `canBackstab` signature changed from
  `(surprised, behind, classId, anatomy?)` to
  `(triggered, classId, anatomy?)`. Migrate by passing
  `isBackstabTriggeredRaw(behind, unaware)` (or your extension's
  trigger) as the first argument.

## [0.1.0] - 2024-11-29

### Added

#### Core Systems
- **Dice System**: Full dice chain logic with `bumpDie()`, `rankDie()`, `getPrimaryDie()`, and critical range calculations
- **Roll Parser**: Parse and evaluate dice expressions like "2d6+3" with custom roller support for testing

#### Character System
- **Character Creation**: `createZeroLevelCharacter()` with configurable ability score methods (3d6, 4d6-drop-lowest, 2d6+6, manual)
- **Character Serialization**: Versioned JSON export/import with `exportCharacter()` and `importCharacter()`
- **Level Advancement**: XP threshold registry, `levelUp()`, `levelUpFrom0()`, HP rolling with history tracking
- **Hit Points**: `calculateMaxHP()` from roll history, `recalculateHP()` when stamina changes, HP estimation functions
- **Saving Throws**: `calculateSavingThrows()` with class bonus + ability modifier breakdown
- **Armor Class**: `calculateAC()` with armor, shield, magic items, and spell effect bonuses
- **Name Generation**: Ancestry-aware name generation with `generateNameForOccupation()`

#### Check API
- **Namespaced Check IDs**: `Ability.STR`, `Save.REF`, etc. with type-safe parsing
- **Check Definitions**: Registry for ability checks, saving throws, and custom checks
- **High-Level API**: `rollCheck()`, `rollAbilityCheck()`, `rollSavingThrow()` with character accessors

#### Combat System
- **Attack Rolls**: `makeAttackRoll()` with deed die, two-weapon fighting, and all modifiers
- **Damage**: `rollDamage()` with backstab multipliers and weapon modifiers
- **Critical Hits**: `rollCritical()` with class-specific tables and crit dice
- **Fumbles**: `rollFumble()` with armor-based fumble dice
- **Initiative**: `rollInitiative()` with class-specific initiative dice

#### Spell System
- **Spell Checks**: `calculateSpellCheck()` orchestration for all caster types
- **Spellbook Management**: Track known spells, lost status, mercurial effects
- **Spellburn**: `applySpellburn()` and `recoverSpellburn()` for wizards/elves
- **Disapproval**: Range tracking and `rollDisapproval()` for clerics
- **Corruption**: `rollCorruption()` and `rollPatronTaint()` for arcane casters
- **Mercurial Magic**: Per-spell mercurial effects with d100 + luck modifier

#### Cleric Abilities
- **Turn Unholy**: `turnUnholy()` with HD expression resolution
- **Lay on Hands**: `layOnHands()` with self-heal penalty and alignment modifiers
- **Divine Aid**: `divineAid()` with disapproval integration and spell level equivalents

#### Patron System
- **Patron Registry**: `registerPatron()`, `findPatrons()` with filtering
- **Invoke Patron**: Full spell check mechanics with taint on fumble
- **Patron Bonds**: `formWizardPatronBond()`, `formElfPatronBond()` with spell grants

#### Occupation Skills
- **Weapon Training**: `isTrainedWeapon()`, `getTrainedWeaponBonus()`
- **Trade Skills**: Background knowledge skills from occupations
- **Limited Thief Skills**: Occupation-based access to specific thief skills

#### Enabling Skills
- **Mighty Deed of Arms**: Warrior/Dwarf deed die progression
- **Backstab**: Thief backstab multiplier progression
- **Two-Weapon Fighting**: Halfling reduced penalties
- **Luck Recovery**: Thief/Halfling luck die mechanics
- **Shield Bash**: Dwarf shield attack
- **Luck Sharing**: Halfling luck sharing with allies

#### Data Loading
- **Class Progressions**: Load from external data (licensed-data-package) via `registerClassProgressions()`
- **Tables**: `loadTableFromJson()`, `loadTablesFromJson()` for rollable tables
- **Birth Augurs**: `loadBirthAugurs()` with effect type classification

#### Parsers
- **Purple Sorcerer**: Parse text and JSON formats from Purple Sorcerer generator
- **Stat Blocks**: Parse DCC stat blocks into `Creature` objects

#### Table System
- **Table Types**: Simple (range), multi-column (crit), tiered (spell) tables
- **Lookup Functions**: `lookupSimple()`, `lookupMultiColumn()`, `lookupTiered()`
- **Table Registry**: `registerTable()`, `getTable()` for runtime table management

#### Bonus System
- **Unified Bonuses**: `RollBonus` type for all modifier sources
- **Factory Functions**: `createAbilityBonus()`, `createLuckBonus()`, `createEquipmentBonus()`, etc.
- **Bonus Computation**: `computeBonuses()` to aggregate all bonuses

#### Types
- **Character Types**: `Character`, `CharacterIdentity`, `CharacterState`, `AbilityScores`
- **Combat Types**: `AttackInput`, `AttackResult`, `DamageInput`, `CriticalResult`, etc.
- **Spell Types**: `SpellDefinition`, `Spellbook`, `SpellCastInput`, `SpellCastResult`
- **Creature Types**: `Creature`, `CreatureAttack`, `CreatureSaves`, `CreatureSpeed`
- **Equipment Types**: `ArmorEntry`, `WeaponEntry`, `AmmunitionEntry`, `MountEntry`

### Notes
- Pure functional architecture - no classes or objects, only pure functions
- All official DCC data is in separate private repository (licensed-data-package)
- Fan-made sample data included for testing
- 1079 tests passing
