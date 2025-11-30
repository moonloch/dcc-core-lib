# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
