# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Lay on Hands "keep-highest" healing dice house rule.** `LayOnHandsInput`
  gains an optional `healingDiceMode` (`"raw"` default | `"keep-highest"`).
  In keep-highest mode every die the table grants is rolled (one at a time,
  so custom rollers still expose each result) and only the highest
  `min(rawDiceCount, target.hitDice)` are kept, so a strong check is no
  longer wasted on a low-level target. `LayOnHandsResult` reports
  `healingRolls` / `keptHealingRolls` in that mode. Condition healing is
  unaffected. New exported type `LayOnHandsHealingDiceMode`.

- **Weapon fumble ranges — foundryvtt-dcc/dcc#343.** `AttackInput` gains
  an optional `fumbleRange` (default 1): the highest natural roll that
  fumbles, expressed as a natural threshold on the die actually rolled
  and never rescaled when the action die changes size. A roll inside
  the fumble range always misses and can never be a critical threat
  (including backstab auto-crits). New `meetsFumbleRange(result,
  fumbleRange)` helper in `dice/roll.ts`; `rollTwoWeaponAttack` passes
  each hand's `fumbleRange` through, and the halfling both-hands rule
  applies to the expanded range unchanged.

### Removed

- **Lay on Hands `healingSelf` −4 penalty.** Not in the DCC core rules
  (p. 31); removed `LayOnHandsInput.healingSelf` and the third
  `healingSelf` parameter of `getLayOnHandsModifier`. Callers that need a
  judge-discretion penalty can pass it via `situationalModifiers`.

## [0.13.0] - 2026-07-26

### Added

- **Special mercurial-magic table entries ("Roll again twice") —
  foundryvtt-dcc/dcc#339.** The DCC core Table 5-2 entries 99 (roll
  twice more on the table) and 100+ (roll twice more, using a different
  formula in place of d%) are meta-instructions, not literal effects. New
  support in `spells/mercurial.ts` + `types/spells.ts`:
  - `MercurialSpecial` / `MercurialSpecialAction` — a `special` field on
    `MercurialTableEntry` (`{ action: "rollAgain", count, formula? }`)
    marks such entries; table loaders populate it (the Foundry adapter
    maps it from `flags.dcc.mercurial` on the `TableResult`).
  - `rollMercurialMagic` now expands a drawn special entry: it makes
    `count` sub-rolls using the special's `formula` (default `"1d100"`,
    luck ×10 still applied) and returns a combined `MercurialEffect`
    (joined summary/description) with the individual effects in the new
    `subEffects` field. Sub-rolls landing on another special entry
    recurse, capped at `MAX_MERCURIAL_SPECIAL_DEPTH` (5); a capped or
    roller-less lookup returns the literal effect with `special` set and
    no `subEffects` so consumers can detect the unexpanded state.
  - `lookupMercurialEffect` stays a pure lookup — it copies `special`
    through without rolling. New `expandMercurialSpecial(effect,
    luckModifier, table, options?)` expands such a looked-up effect
    with real rolls (used by callers resolving a manually entered
    table value).
  - `special.count` is defensively clamped to 10 sub-rolls.
  - The effect accessors (`getMercurialModifier`,
    `getMercurialDiceModifier`, `getMercurialDuration`,
    `getMercurialData`, `shouldMercurialTrigger`,
    `classifyMercurialEffect`, `summarizeMercurialEffect`) understand
    combined effects: modifiers sum and dice concatenate across
    `subEffects` (every sub-effect applies), triggering is "any
    sub-effect triggers", classification merges (uniform stays,
    disagreement → mixed), and duration/data return the first defined
    (documented — iterate `subEffects` for per-effect values).
  - Sub-roll formulas may carry flat modifiers ("1d100+20"): the
    built-in evaluator path routes through `evaluateRoll`, and a custom
    `roller` receives the full expression.

### Fixed

- `spellbook.ts` entry copies now deep-copy `mercurialEffect` —
  including its `effect` (and nested `data`), `special`, and the
  recursive `subEffects` tree — so mutating an entry returned by the
  query helpers can no longer corrupt the source spellbook.

## [0.12.0] - 2026-06-22

### Added

- **Missile fire range penalties (DCC core rulebook p. 96).** New pure
  helpers in `combat/misc-rules.ts`, exported from `combat`:
  - `parseMissileRange(range)` — parses a weapon's range string into
    structured `{ short, medium, long }` bands. Accepts the canonical
    `"short/medium/long"` form (e.g. `"30/60/120"`) and the single-value
    form (e.g. `"60"`, treated as the maximum reach with no intermediate
    penalty bands). Tolerates whitespace and trailing unit markers on each
    segment — feet (`70'`), inches (`30"`), smart quotes (`30’`/`30”`), or
    word units (`30 ft`) — reading only the leading number (no unit
    conversion); returns `null` for unparseable input.
  - `getMissileRangePenalty(distance, bands, actionDie?)` — classifies a
    measured distance into a `MissileRangeBand` and reports the penalty
    owed: short = none, medium = `-2` to the attack roll, long = `-1d`
    (the action die steps down one rung on the dice chain), beyond long =
    out of range. Returns both the flat `attackModifier` and the
    `actionDieSteps` so callers without a concrete action die can still
    apply the rule; when an `actionDie` is supplied, the stepped-down die
    is returned too.

- **Firing-into-melee to-hit penalty (DCC core rulebook p. 96).** New
  `FIRING_INTO_MELEE_PENALTY` constant (`-1`) and `getFiringIntoMeleePenalty(targetEngagedInMelee)`
  helper in `combat/misc-rules.ts`, exported from `combat`. This is the
  flat attack-roll penalty for shooting at a target engaged in melee,
  distinct from the existing `checkFiringIntoMelee` friendly-fire check on
  a miss. Whether the target is engaged is a positional question the caller
  answers Foundry-side.

- **Defender Luck on monster critical hits (DCC RAW).** New optional
  `CriticalInput.defenderLuckModifier`. Per RAW, a PC's Luck modifier always
  alters a monster's critical hit scored against them — a positive modifier
  reduces the monster's roll, a negative one grants a bonus — so the value is
  subtracted from the crit total and surfaces as a distinct `"Target's Luck"`
  roll modifier (kept separate from the roller's own `luckModifier`). 4 new
  crit tests covering the rulebook's two examples, stacking, and the
  minimum-roll floor.

- **Optional Monster Fumbles rule — PC Luck steps the die (DCC Yearbook #8).** New
  `getMonsterFumbleDie(targetLuckModifier)` and `MONSTER_FUMBLE_BASE_DIE`
  (`"1d10"`) in `combat/fumbles.ts`, exported from `combat`. Under this
  optional rule, a monster fumbling against a PC rolls a fumble die stepped
  along the dice chain by the targeted PC's Luck modifier — base `1d10` at +0,
  one rung up per +1 (`d12`/`d14`/`d16`), one rung down per -1
  (`d8`/`d7`/`d6`) — reproducing the annual's printed table exactly and
  extrapolating past ±3. Distinct from the core fumble rule (`rollFumble`),
  where the *fumbler's own* Luck is a flat roll modifier; here a *defending*
  PC's Luck resizes the *die*. Multi-target attacks use the highest Luck among
  the targets (the caller maxes). 3 new tests.

  Part of bringing the `dcc-qol` module's combat automation into core DCC:
  the rules live here as pure, unit-tested logic, while token geometry,
  distance measurement, and the out-of-range confirmation dialog stay
  Foundry-side. The remaining dcc-qol RAW combat rules already have lib
  homes — `checkFiringIntoMelee` covers friendly fire, and `rollFumble`
  covers a PC fumbler's own Luck + armor die — so they need only system-side
  wiring, not new lib code. 24 new tests across `misc-rules.test.ts` and
  `combat.test.ts`.

## [0.11.0] - 2026-05-31

### Changed

- **Spellburn may now reduce a physical ability all the way to 0 (DCC RAW).**
  Previously the floor was 1 — `validateSpellburn` rejected any burn that
  would drop a score below 1, `getMaxSpellburn` capped at `current - 1`,
  and `applySpellburn` clamped the result with `Math.max(1, …)`. Per DCC
  RAW spellburn has no such floor: a caster may burn STR/AGL/STA to 0, and
  burning Stamina to 0 is lethal — an intentional rules feature, not an
  edge case to design away. The floor is now 0:
  - `validateSpellburn` permits `burn === current` (still rejects
    `burn > current` and negative burns); it continues to warn when a burn
    reduces a score to 3 or below (which now includes the lethal burn to 0).
  - `getMaxSpellburn` returns the full current score.
  - `applySpellburn` clamps at 0 (guarding only against an oversized
    commitment), never at 1.

  This is the floor-of-1-vs-0 design call deferred in the DCC system's
  PR #720 review backlog, resolved in favor of RAW fidelity. New dedicated
  `spellburn.test.ts` (10 tests) pins the floor-0 contract.

## [0.10.0] - 2026-05-17

### Changed

- **`SpellCastInput.spellbookEntry` is now optional.** Enables "naked"
  spell-check casts where the caster carries no spellbook slot — ad-hoc
  GM-arbitrated checks, divine-arbitration checks, or skill-table
  mechanics (Turn Unholy, divine aid) that borrow the spell-check
  pipeline without owning a spellbook entry. When omitted, `castSpell`:
  - Skips the spellbook-entry manifestation override
    (`spellbookEntry.manifestation`).
  - Skips the spellbook-entry mercurial-effect attachment
    (`spellbookEntry.mercurialEffect`) and the corresponding
    `onMercurialEffect` event.
  - All other behavior (modifier list, crit/fumble detection,
    `forceNatural` override, disapproval increment, corruption trigger,
    tier classification) runs unchanged.

  Callers using `calculateSpellCheck` are unaffected — that orchestrator
  still builds a spellbookEntry internally from `character.state` and
  errors out when none is found. Only direct `castSpell` callers gain
  the option to omit it. +5 tests in `castSpell with optional
  spellbookEntry`.

## [0.9.0] - 2026-05-17

### Added

- **`SpellCheckOptions.profileOverride`.** Lets callers supply an
  explicit `CasterProfile` that overrides the character-derived profile
  for a single `calculateSpellCheck` call. The override governs spell
  `casterTypes` validation, spellburn allowance, disapproval trigger,
  corruption / patron-taint trigger, spell-loss recovery, and the
  spell-check ability. Use case: a spell whose mechanic class differs
  from the actor's class (e.g. a wizard-castingMode spell cast by a
  cleric actor, or a cleric-castingMode spell cast by a wizard actor).
  Class-bound state continues to be read from
  `character.state.classState`, keyed by the override's `type` — callers
  populate `state.classState.<override.type>` with the appropriate
  spellbook, disapproval range, patron, etc.

### Changed

- **`getSpellbookEntry` accepts an optional `profile` parameter.** When
  supplied, the lookup is restricted to that profile's `classState` slot.
  When omitted, the historical `wizard ?? cleric ?? elf` walk preserves
  backward compatibility for callers that don't track the active profile.
  Internal `calculateSpellCheck` + `buildSpellCastInput` calls pass the
  active profile so the override flow looks up against the synthetic
  spellbook the caller populated, not the actor's actual-class spellbook.
- **`markSpellLost` writeback uses the active profile's spellbook slot.**
  Matches `getSpellbookEntry`'s lookup so the lost flag updates the same
  spellbook the cast read from when an override is in play.

## [0.8.0] - 2026-04-24

### Changed (BREAKING)

- **Retire dormant `SpellFumbleResult.patronTaint` flag +
  fumble-entry tag parsing.** `rollSpellFumble` /
  `rollSpellFumbleWithModifier` no longer parse
  `effect.type === "patron-taint"` / `effect.data.patronTaint === true`
  off fumble-table entries, and `SpellFumbleResult` no longer carries a
  `patronTaint: boolean` field. The flag was dead in practice — nothing
  in the orchestration (`spell-check.ts`) ever read it, and RAW patron
  taint triggers (creeping chance + spell-result-table entries) are
  fully handled by `handlePatronTaintTriggers` in `spell-check.ts`
  since 0.7.0. Audited compendium content across `dcc-core-book` +
  `xcc-core-book` (including spell fumble tables) and the downstream
  DCC Foundry system + sibling modules (`dcc-qol`, `xcc`,
  `mcc-classes`, `dcc-crawl-classes`) — zero consumers read the flag,
  zero authored fumble-table entries tag with the taint effect. Pure
  dead-code removal; no runtime behavior change. Consumers of
  `SpellFumbleResult` that destructure `patronTaint` (none known) must
  drop the field; TypeScript strict-mode consumers will catch the
  shape change at compile.

## [0.7.0] - 2026-04-24

### Changed (BREAKING)

- **Patron taint brought in line with DCC RAW.** Previously the lib
  modelled patron taint as a spell-fumble-table-gated mechanic
  (`effect.type === 'patron-taint'` on entries, rolled via
  `fumbleRequiresPatronTaint` inside `handleWizardFumble`). That
  interpretation was wrong: neither the spell fumble table nor the
  combat fumble table carries patron taint in RAW — they cover
  misfires, corruption, and catastrophic outcomes. RAW patron taint
  has two independent triggers, both now modelled:
  - **Creeping-chance trigger.** Every patron-based cast rolls 1d100
    vs the caster's current `patronTaintChance` (defaults to 1 when
    omitted). On hit, taint is acquired and the chance resets to 1.
    On miss, the chance increments by 1. This matches the rulebook's
    rule: the chance starts at 1% on the first patron cast, grows by
    1% with every later patron cast, and drops back to 1% once taint
    has been acquired.
  - **Result-table trigger.** Patron-spell result-table entries that
    explicitly specify taint as an outcome (e.g. Bobugbubilz's
    *Tadpole Transformation* roll of 1: "Lost, failure, and patron
    taint") acquire taint when hit. Content tagging supports two
    forms: `effect.type === 'patron-taint'` (primary-effect tag) or
    `effect.data.patronTaint === true` (flag alongside another
    primary type, for compound outcomes like "lost + taint").
  - **Fumble forces result-table row 1.** Natural 1 on a spell check
    now forces the result-table lookup total to 1, discarding
    modifiers (per RAW, a natural 1 ignores all spell check
    modifiers). This is what allows the result-table trigger to
    fire for high-modifier casters on spells like Tadpole
    Transformation; without it, a +5 INT wizard's "1+5=6" would
    miss the roll-1 entry.
  - **Both triggers run independently.** Either acquires taint;
    `SpellCastResult.patronTaintSource` identifies which fired
    (`"creeping-chance"` wins precedence when both hit on the same
    cast).
- **New inputs** on `SpellCastInput` / `SpellCheckInput`:
  `patronTaintChance?: number`, `isPatronSpell?: boolean`. The latter
  is a caller override; absent it, the lib falls back to
  `spell.tags?.includes('patron')`.
- **New result fields** on `SpellCastResult` (required):
  `patronTaintChecked`, `patronTaintAcquired`. Optional:
  `patronTaintRoll`, `patronTaintSource`, `newPatronTaintChance`,
  `patronTaintResult`. Callers should persist `newPatronTaintChance`
  back to character state when `patronTaintChecked` is true.
- **Removed**: `fumbleRequiresPatronTaint` (no RAW basis). The
  `SpellFumbleResult.patronTaint` boolean is still emitted but is
  now dead in practice — slated for removal in a follow-up release
  after a sibling-module + content audit.

### Added

- New module `src/spells/patron-taint-check.ts` exporting pure
  helpers for both acquisition paths: `rollPatronTaintChanceCheck`,
  `effectTriggersTaint`, `isPatronCast`,
  `applyPatronTaintAcquisition`.
- `onPatronTaint` event now fires on creeping-chance or result-table
  acquisition (previously fired only on fumble-table acquisition,
  which was RAW-incorrect and effectively dead).

## [0.6.1] - 2026-04-23

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
