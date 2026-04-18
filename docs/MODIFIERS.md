# Modifier System

> Design doc for the roll-modifier type used throughout the check, skill,
> attack, damage, and spell pipelines.
>
> **Status:** Proposal · 2026-04-17 · **staged migration in progress**
>
> This document pins the type shape, application order, and
> origin-categorization scheme. The implementation is landing in
> stages, subsystem-by-subsystem (see §9). Once every subsystem is
> migrated, this doc becomes the single reference for adding new
> modifier kinds and for writing adapter code that emits modifiers.

---

## 0. Why this doc exists

The current `RollModifier` is a flat struct:

```ts
interface RollModifier {
  source: string;
  value: number;
  label?: string;
}
```

This handles additive arithmetic cleanly but forces every non-additive
case to either abuse `value` (negative numbers as penalties, dice
expressions impossible) or leak out of the modifier list entirely:

- `CheckPenalty` lives as a separate Foundry-side term with `apply: false`
- Threat-range shifts live as a top-level `threatRange` option
- Dice-chain bumps live as pre-mutations on the `Character` before the
  lib sees it
- Die-replacement (warrior's d24 action die) isn't modeled at all
- Multipliers (backstab ×2 damage) have no representation

Every time one of these escapes the modifier list, two things break:

1. **Chat rendering** can't show a unified breakdown of "why this roll
   ended up this way." The consumer has to know to look in three places.
2. **Module authors** (dcc-qol, xcc, homebrew) can't uniformly inject
   their own modifications. They have to know which escape hatch to use.

The fix is to make `RollModifier` a **tagged union of transformations**
paired with a **structured origin**, and to funnel every roll-altering
input through that one type.

## 1. Design principles

1. **Closed tagged union.** Each modifier declares exactly one
   transformation from a fixed set of kinds. New kinds are non-breaking
   additions. Unknown kinds cause the evaluator to throw, not silently
   skip.
2. **Data, not functions.** Modifiers are plain JSON. They round-trip
   through chat messages, saved game state, and external serializers
   (bots, APIs) without losing information.
3. **Separate what from why.** The `kind` field says what the modifier
   *does* to the roll. The `origin` field says where the modifier came
   *from*. Renderers group by origin; evaluators dispatch on kind.
4. **Applied state is an output, not an input.** Callers emit what they
   *want* to apply. The evaluator returns each modifier with an
   `applied: true | false` flag reflecting whether it actually affected
   the total. This keeps the input clean and gives renderers a reliable
   "show as struck-through?" signal.
5. **Conditions are resolved at emission.** The modifier list represents
   the concrete set of modifications that ARE happening in this call.
   Callers decide whether a conditional modifier applies (e.g. "am I
   wielding two weapons?") before emitting it. This keeps the evaluator
   pure and testable; richer predicates can be layered later without
   breaking the type.
6. **No backwards compatibility with the old `RollModifier`.** The lib
   is pre-1.0 and not heavily used outside this Foundry system. Clean
   break, one type.

## 2. The types

```ts
// -------------------------------------------------------------------
// What the modifier does — one transformation per variant
// -------------------------------------------------------------------
export type RollModifier =
  | AddModifier
  | AddDiceModifier
  | SetDieModifier
  | BumpDieModifier
  | MultiplyModifier
  | ThreatShiftModifier
  | DisplayModifier

/** Flat numeric adjustment to the total. The common case. */
export interface AddModifier {
  kind: 'add'
  value: number                // positive, negative, or zero
  origin: ModifierOrigin
  applied?: boolean            // output-only — set by the evaluator
}

/** Add a dice expression to the formula (e.g. Mighty Deed +1d3). */
export interface AddDiceModifier {
  kind: 'add-dice'
  dice: string                 // "1d3", "2d6", must match /^\d+d\d+$/
  origin: ModifierOrigin
  applied?: boolean
}

/** Replace the base die with a specific die. Last-one-wins if multiple. */
export interface SetDieModifier {
  kind: 'set-die'
  die: DieType                 // "d14", "d24", etc.
  origin: ModifierOrigin
}

/** Shift the die up or down the DCC dice chain. Sums across modifiers. */
export interface BumpDieModifier {
  kind: 'bump-die'
  steps: number                // positive bumps up, negative down
  origin: ModifierOrigin
}

/** Multiplicative factor applied after additive modifiers. Damage rolls. */
export interface MultiplyModifier {
  kind: 'multiply'
  factor: number               // 2 for backstab; can be fractional
  origin: ModifierOrigin
}

/** Shift the effective threat range for critical detection. */
export interface ThreatShiftModifier {
  kind: 'threat-shift'
  amount: number               // +1 widens threat range by 1 (19-20 → 18-20)
  origin: ModifierOrigin
}

/** Shown in the breakdown but NOT totaled. Informational. */
export interface DisplayModifier {
  kind: 'display'
  value: number                // what would've been the value if applied
  origin: ModifierOrigin
}

// -------------------------------------------------------------------
// Why the modifier exists — structured origin for rendering + filtering
// -------------------------------------------------------------------
export interface ModifierOrigin {
  category: ModifierCategory
  /** Stable identifier within the category. 'str', 'armor-check-penalty',
   *  'backstab', an item UUID, an active effect UUID, etc. */
  id: string
  /** Human-readable label. Emitters may provide English; renderers
   *  localize at display time. Not required — renderers can synthesize
   *  a fallback from category + id. */
  label?: string
  /** Only meaningful when category === 'module'. Identifies the
   *  injecting module (e.g. 'dcc-qol'). */
  moduleId?: string
  /** Optional hint for future stacking-rule engines. Modifiers sharing
   *  a stack group may be deduplicated or limited. Unused today. */
  stackGroup?: string
}

export type ModifierCategory =
  | 'ability'          // ability score modifier (str, agl, ...)
  | 'level'            // character level contribution
  | 'progression'      // class progression bonus (e.g. class-specific)
  | 'luck-burn'        // spent luck
  | 'penalty'          // armor check penalty, encumbrance, etc.
  | 'equipment'        // gear providing a bonus or penalty
  | 'active-effect'    // Foundry AE or equivalent temporary effect
  | 'class-feature'    // class-specific ability (Mighty Deed, Backstab)
  | 'spell'            // active spell effect
  | 'situational'      // circumstantial (flanking, prone, etc.)
  | 'dialog-input'     // user-entered at the modifier dialog
  | 'module'           // injected by a third-party module
  | 'other'            // escape hatch for truly ad-hoc cases
```

### Closed vs. open category

`ModifierCategory` is a closed union. This gives:

- Compile-time exhaustiveness checking when a renderer groups by
  category (the `switch` statement's `default` clause provably only
  matches `'other'`).
- A finite set of icons / colors / section headers for chat rendering.
- A forcing function: adding a new legitimate category requires a lib
  change, which is a natural review point.

For cases that genuinely don't fit, emitters use `'other'` with a
descriptive `id`. Renderers show these as a generic bucket.

### Why `applied` is output-only

Callers don't know ahead of time whether a given modifier will end up
affecting the total — that depends on the evaluation order and on
other modifiers in the list. (E.g. a `multiply: 0` modifier could
suppress all additives; a `set-die: 'd20'` when the base is already
d20 is a no-op.) Forcing the caller to predict this is brittle.

The evaluator walks the list and returns the same list with `applied`
set on each `add` and `add-dice` modifier. Renderers use this to
decide whether to strike through the modifier in the breakdown. Kinds
that always apply (`set-die`, `bump-die`, `multiply`, `threat-shift`)
don't carry `applied` — they're either in the list or not.

## 3. Application order

The evaluator applies modifiers in a deterministic pipeline. Within
each phase, modifiers are processed in the order they appear in the
input list unless otherwise noted.

```
1. DIE SELECTION
   a. Start from the skill's base die (from SkillDefinition or
      progression for the level).
   b. Apply all `set-die` modifiers. If multiple are present, the
      LAST one wins; earlier ones are marked ignored in the result.
   c. Apply all `bump-die` modifiers by summing their `steps` values
      and shifting along DEFAULT_DICE_CHAIN.

2. FORMULA CONSTRUCTION
   a. Start the formula with "1d<selected-die>".
   b. Append each `add-dice` modifier as "+<dice>".
   c. Sum all `add` modifier values into a single trailing numeric
      modifier. (For display purposes, the breakdown retains individual
      modifiers; the formula string collapses them.)

3. ROLL EXECUTION
   a. Evaluate the formula via the provided roller (sync or async).
   b. Extract the natural die value and the total.

4. POST-ROLL ARITHMETIC
   a. Apply `multiply` modifiers to the subtotal in input order
      (composition: final = subtotal * factor1 * factor2 * ...).
      Multipliers are used primarily by damage rolls.

5. THRESHOLD RESOLUTION
   a. Compute the effective threat range: base threat range + sum of
      `threat-shift` modifier amounts, then pass through
      `adjustThreatRange` for dice larger than d20.
   b. Classify the natural roll as critical / fumble / normal.

6. APPLIED FLAGGING
   a. Walk the input `add` and `add-dice` modifiers. Mark `applied:
      true` if the modifier contributed to the total; `applied: false`
      if suppressed (e.g. zero-value in the input, redundant
      `set-die`, etc.).
   b. `display` modifiers pass through untouched — renderer-only.

7. RESOURCE + EVENT EMISSION
   a. Walk `luck-burn` origin modifiers (any kind) to compute resources
      consumed.
   b. Emit skill-level events (onSkillCheckStart, onCritical, onFumble,
      onSkillCheckComplete).
```

### Invariants

- The primary die in the rolled formula is always exactly one die.
  `add-dice` contributes *extra* dice; it does not change the primary.
- `display` modifiers never reach the formula or the total. They're
  for the renderer only.
- If the input list contains an unknown `kind`, the evaluator throws
  `UnknownModifierKindError`. It does not silently skip.
- The order of modifiers in the input list is preserved in the output.
  Renderers can rely on input order when grouping.

## 4. DCC case catalogue

Every current and near-term DCC scenario, represented as modifier
lists. This table is the acceptance criterion for the type.

| Case | Modifier list |
|---|---|
| Str −1 ability mod on a STR check | `[{ kind: 'add', value: -1, origin: { category: 'ability', id: 'str', label: 'Strength' } }]` |
| CheckPenalty shown but not applied (e.g. 0-penalty armor) | `[{ kind: 'display', value: 0, origin: { category: 'penalty', id: 'armor-check-penalty' } }]` |
| CheckPenalty −2 actually applied | `[{ kind: 'add', value: -2, origin: { category: 'penalty', id: 'armor-check-penalty' } }]` — evaluator sets `applied: true` |
| User dialog +1 situational | `[{ kind: 'add', value: 1, origin: { category: 'dialog-input', id: 'user-mod' } }]` |
| AE +2 Reflex save | `[{ kind: 'add', value: 2, origin: { category: 'active-effect', id: '<ae-uuid>', label: 'Bless' } }]` |
| Luck burn +3 | `[{ kind: 'add', value: 3, origin: { category: 'luck-burn', id: 'lck' } }]` |
| Warrior Mighty Deed +d3 | `[{ kind: 'add-dice', dice: '1d3', origin: { category: 'class-feature', id: 'mighty-deed', label: 'Deed Die' } }]` |
| Warrior d24 action die (manual pick) | `[{ kind: 'set-die', die: 'd24', origin: { category: 'class-feature', id: 'warrior-action-die' } }]` |
| AE dice-chain bump (+1 step) | `[{ kind: 'bump-die', steps: 1, origin: { category: 'active-effect', id: '<ae-uuid>' } }]` |
| Magic weapon threat 19-20 → 18-20 | `[{ kind: 'threat-shift', amount: 1, origin: { category: 'equipment', id: '<item-uuid>' } }]` |
| Backstab ×2 damage | `[{ kind: 'multiply', factor: 2, origin: { category: 'class-feature', id: 'backstab' } }]` |
| dcc-qol injected +1 | `[{ kind: 'add', value: 1, origin: { category: 'module', moduleId: 'dcc-qol', id: '<whatever>' } }]` |
| Homebrew unclassifiable modifier | `[{ kind: 'add', value: 1, origin: { category: 'other', id: 'my-custom-thing', label: 'Custom' } }]` |

A realistic attack roll from a 3rd-level warrior with Mighty Deed +d3,
magic longsword (+1 bonus, 19-20 threat), in an AE-blessed state
(+1 dice chain), against a prone target (+2 situational):

```ts
[
  { kind: 'add',          value: +1,   origin: { category: 'level',          id: 'level',        label: 'Level 3' } },
  { kind: 'add',          value: +2,   origin: { category: 'ability',        id: 'str',          label: 'Strength' } },
  { kind: 'add-dice',     dice: '1d3', origin: { category: 'class-feature',  id: 'mighty-deed',  label: 'Deed Die' } },
  { kind: 'add',          value: +1,   origin: { category: 'equipment',      id: '<sword-uuid>', label: 'Magic Longsword' } },
  { kind: 'threat-shift', amount: 1,   origin: { category: 'equipment',      id: '<sword-uuid>', label: 'Magic Longsword' } },
  { kind: 'bump-die',     steps: 1,    origin: { category: 'active-effect',  id: '<bless-uuid>', label: 'Bless' } },
  { kind: 'add',          value: +2,   origin: { category: 'situational',    id: 'prone-target', label: 'Target prone' } },
]
```

Chat renderer groups by `origin.category`, orders the groups
(ability → level → class-feature → equipment → active-effect →
situational → …), and displays each modifier's `label` with its
formatted value. A single rendering pipeline handles the simplest
ability check and the most complex attack.

## 5. What `RollCheckOptions` becomes

With modifiers unified, most of the fields that used to live on
`RollCheckOptions` / `SkillResolveOptions` fold into the modifier list:

| Old option | New location |
|---|---|
| `modifiers: RollModifier[]` | Same list, new type. |
| `luckBurn: number` | Emitted as `{ kind: 'add', origin.category: 'luck-burn' }`. |
| `threatRange: number` | Base stays on `SkillDefinition`; shifts go via `threat-shift` modifiers. |

Fields that stay on the options object:

| Option | Reason |
|---|---|
| `mode: 'formula' \| 'evaluate'` | Top-level dispatch, not a modification. |
| `roller: DiceRoller` | Platform injection, not a modification. |
| `events: SkillEvents` | Callback injection, orthogonal. |
| `accessors: CharacterAccessors` | Character-data injection, orthogonal. |
| `additionalAbilities: string[]` | Variant/system config, not a per-roll modifier. |

## 6. Scope of this change

This type change affects:

1. **`types/dice.ts`** — replace `RollModifier` with the tagged union;
   add `ModifierOrigin`, `ModifierCategory`.
2. **`dice/roll.ts`** — update `buildFormula`, `evaluateRoll`,
   `createRoll` to handle the new kinds. Split formula building
   between additive and dice-additive.
3. **`skills/resolve.ts`** — rewrite `buildModifiers` to emit the new
   shape; extend the application pipeline through multiplicative,
   threat-shift, and applied-flag computation.
4. **`checks/roll.ts`** — update call sites that pass modifier-like
   inputs.
5. **`types/skills.ts`** — `SkillCheckResult.modifiers` becomes
   `RollModifier[]` of the new shape; renderers now get `applied`
   flags.
6. **All internal tests** — rewrite assertions against the new shape.
7. **New tests** — one per kind covering apply, suppress, and
   combination cases.

## 7. Out of scope

Explicitly not tackled here; listed so nobody expects them:

- **Conditional modifiers.** Callers resolve conditions at emission.
  If a future feature needs deferred predicates, a `condition?: ...`
  field can be added non-breakingly.
- **Stacking rules.** `stackGroup` is reserved in the type but has no
  behavior. Stacking logic is a later project — when real homebrew
  modules start colliding.
- **Character-state modifications.** Modifiers shape a single roll,
  not the character. Things like "permanent +1 to Strength from a
  magic ring" are character-state concerns, applied before the lib
  sees the `Character`.
- **Async roller.** Making the roller optionally async is a separate,
  orthogonal decision. It affects the evaluator's signature but not
  the modifier type.

## 9. Staged migration plan

The design in §2 is the end state. Reaching it in one commit would
touch ~20 files plus their test suites. To keep each commit reviewable
and to let the FoundryVTT adapter refactor make forward progress
without waiting for unrelated subsystems (combat, spells) to migrate,
the lib ships the new type alongside the old and retires the old one
subsystem-by-subsystem.

### During transition

- **`RollModifier`** — the new tagged union defined in §2. Used by the
  check/skill pipeline (`src/checks/`, `src/skills/`, `src/dice/`,
  `src/types/dice.ts`, `src/types/skills.ts`).
- **`LegacyRollModifier`** — the former flat `{ source, value, label }`
  shape, kept alive and renamed so importers are explicit about
  depending on the old form. Used by the subsystems not yet migrated.
  Lives in `src/types/dice.ts` with a doc comment pointing at this §9.

Both types export from the same module. Consumers import whichever
shape they need.

### Migration order

| Wave | Subsystem | When it migrates | Notes |
|---|---|---|---|
| 1 | `checks/`, `skills/`, `dice/roll.ts` | **Now** (with this doc's implementation) | Needed by the Foundry adapter's Phase 1 (ability check → save → skill → init). |
| 2 | `spells/`, `cleric/`, `patron/` | Foundry adapter Phase 2 | Spell check pipeline + cleric disapproval + patron taint. |
| 3 | `combat/` (attack, damage, crits, fumbles, initiative, misc-rules, morale) | Foundry adapter Phase 3 | The largest chunk — attack/damage/crit chain interleaves lots of modifier types. |
| 4 | `occupation/` | Opportunistic | Small surface; may migrate with wave 2 or 3. |

### Retirement criteria

`LegacyRollModifier` is deleted the day no non-test file imports it.
That's when the last wave lands. The one-line deletion + a follow-up
doc edit to collapse §9 back into the main text marks the end of the
transition.

### Invariants during transition

- No file mixes both types. A subsystem is either fully on the new
  type or fully on the legacy one.
- `LegacyRollModifier` retains its original shape verbatim. It is
  frozen — no new fields or changes — so migrations target a stable
  form.
- New features never reach for `LegacyRollModifier`. Anything new uses
  the tagged union, even inside subsystems that haven't finished
  migrating (if feasible).
- The `SkillCheckResult.modifiers` field is on the new type from wave
  1 forward. Combat and spell result types keep their current shapes
  until their waves land.

## 10. Open questions for the author of the first caller

These don't block the type design but will surface while building the
first adapter (DCC Foundry system, Phase 1 of the `refactor/
dcc-core-lib-adapter` branch):

1. **Should the `ModifierOrigin.label` be expected to be English
   (renderer i18n-izes) or pre-localized?** Leaning English-at-emit,
   renderer localizes via a catalog. Keeps the lib i18n-free.
2. **How do renderers discover an icon / color for a category?** Out
   of lib scope — renderers own their own mapping.
3. **Does `add-dice` need to support a label per die roll** (to show
   "Deed Die: rolled 3" specifically)? Currently the breakdown shows
   the modifier but doesn't enumerate individual dice within it. Add
   if Phase 3 attack chat rendering demands it.