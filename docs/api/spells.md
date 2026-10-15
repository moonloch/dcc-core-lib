# spells

## Interfaces

### DisapprovalResult

Defined in: [spells/disapproval.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L86)

Result of rolling on the disapproval table

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [spells/disapproval.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L92)

The disapproval roll: (natural)d4 minus the cleric's Luck modifier.
Not clamped — may be below 1 when Luck is high. The table lookup
clamps to row 1 (see `rollDisapproval`).

##### formula

```ts
formula: string;
```

Defined in: [spells/disapproval.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L95)

The dice expression rolled, e.g. "3d4"

##### diceCount

```ts
diceCount: number;
```

Defined in: [spells/disapproval.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L98)

Number of d4s rolled (equals the triggering natural roll)

##### naturalRoll

```ts
naturalRoll: number;
```

Defined in: [spells/disapproval.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L101)

The natural spell-check roll that triggered disapproval

##### luckModifier

```ts
luckModifier: number;
```

Defined in: [spells/disapproval.ts:104](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L104)

The cleric's Luck modifier (subtracted from the dice total)

##### matched

```ts
matched: boolean;
```

Defined in: [spells/disapproval.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L110)

Whether the table had a row for the roll. False when the roll is above
the table's last row (a high natural can roll up to 80).

##### description

```ts
description: string;
```

Defined in: [spells/disapproval.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L116)

Description of the disapproval effect: the matched row's text, or ""
when no row matched (consumers render their own localized fallback).

##### duration?

```ts
optional duration?: string;
```

Defined in: [spells/disapproval.ts:119](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L119)

Duration of the effect (if applicable)

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: [spells/disapproval.ts:122](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L122)

Structured effect data

##### disapprovalRange

```ts
disapprovalRange: number;
```

Defined in: [spells/disapproval.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L125)

The disapproval range that was used

***

### MisfireResult

Defined in: [spells/fumble.ts:192](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L192)

Misfire result - spell goes wrong in some way

#### Properties

##### description

```ts
description: string;
```

Defined in: [spells/fumble.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L194)

Description of the misfire

##### type

```ts
type: 
  | "other"
  | "target-change"
  | "effect-reverse"
  | "random-effect"
  | "backfire";
```

Defined in: [spells/fumble.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L197)

Type of misfire

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [spells/fumble.ts:200](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L200)

Additional data

***

### MercurialTable

Defined in: [spells/mercurial.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L24)

A mercurial magic table (typically d100 with ranges)

#### Properties

##### id

```ts
id: string;
```

Defined in: [spells/mercurial.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L26)

Table identifier

##### name

```ts
name: string;
```

Defined in: [spells/mercurial.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L29)

Table name

##### entries

```ts
entries: MercurialTableEntry[];
```

Defined in: [spells/mercurial.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L32)

Entries sorted by min value

***

### PatronTaintCheckOutcome

Defined in: [spells/patron-taint-check.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/patron-taint-check.ts#L76)

Result of the creeping-chance d100 roll.

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [spells/patron-taint-check.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/patron-taint-check.ts#L78)

The d100 roll value.

##### acquired

```ts
acquired: boolean;
```

Defined in: [spells/patron-taint-check.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/patron-taint-check.ts#L81)

True when roll <= currentChance.

***

### SpellCheckInput

Defined in: [spells/spell-check.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L50)

Simplified input for spell checks.
The function will extract needed data from character state.

#### Properties

##### spell

```ts
spell: SpellDefinition;
```

Defined in: [spells/spell-check.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L52)

The spell being cast (definition)

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [spells/spell-check.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L55)

Luck to burn on this check (optional)

##### spellburn?

```ts
optional spellburn?: SpellburnCommitment;
```

Defined in: [spells/spell-check.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L58)

Spellburn commitment (wizard/elf only)

##### situationalModifiers?

```ts
optional situationalModifiers?: LegacyRollModifier[];
```

Defined in: [spells/spell-check.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L61)

Situational modifiers to apply

##### actionDie?

```ts
optional actionDie?: `d${number}`;
```

Defined in: [spells/spell-check.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L64)

Action die override (if not d20)

##### resultTable?

```ts
optional resultTable?: TieredTable;
```

Defined in: [spells/spell-check.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L67)

Result table for spell effects (pre-loaded)

##### fumbleTable?

```ts
optional fumbleTable?: SimpleTable;
```

Defined in: [spells/spell-check.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L70)

Fumble table (pre-loaded)

##### corruptionTable?

```ts
optional corruptionTable?: SimpleTable;
```

Defined in: [spells/spell-check.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L73)

Corruption table (pre-loaded)

##### disapprovalTable?

```ts
optional disapprovalTable?: SimpleTable;
```

Defined in: [spells/spell-check.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L76)

Disapproval table (pre-loaded, for clerics)

##### patronTaintTable?

```ts
optional patronTaintTable?: SimpleTable;
```

Defined in: [spells/spell-check.ts:79](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L79)

Patron taint table (pre-loaded, if applicable)

##### patronTaintChance?

```ts
optional patronTaintChance?: number;
```

Defined in: [spells/spell-check.ts:85](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L85)

Current patron-taint chance as integer percent. Defaults to 1 when
omitted. See `SpellCastInput.patronTaintChance`.

##### isPatronSpell?

```ts
optional isPatronSpell?: boolean;
```

Defined in: [spells/spell-check.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L91)

Caller override for "is this cast a patron-based spell?". When omitted,
the lib falls back to `spell.tags?.includes('patron')`.

***

### SpellCheckResult

Defined in: [spells/spell-check.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L97)

Complete result of a spell check including all follow-up rolls

#### Extends

- [`SpellCastResult`](types.md#spellcastresult)

#### Properties

##### disapprovalResult?

```ts
optional disapprovalResult?: DisapprovalResult;
```

Defined in: [spells/spell-check.ts:99](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L99)

Disapproval result (if cleric triggered disapproval)

##### updatedSpellbookEntry?

```ts
optional updatedSpellbookEntry?: SpellbookEntry;
```

Defined in: [spells/spell-check.ts:102](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L102)

Updated spellbook entry (with lost status)

##### error?

```ts
optional error?: string;
```

Defined in: [spells/spell-check.ts:105](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L105)

Error message if spell check could not be performed

##### spellId

```ts
spellId: string;
```

Defined in: [types/spells.ts:661](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L661)

The spell that was cast

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`spellId`](types.md#spellid-2)

##### die

```ts
die: `d${number}`;
```

Defined in: [types/spells.ts:664](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L664)

Die used for the check

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`die`](types.md#die-11)

##### natural?

```ts
optional natural?: number;
```

Defined in: [types/spells.ts:667](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L667)

Natural die result (before modifiers)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`natural`](types.md#natural-2)

##### total?

```ts
optional total?: number;
```

Defined in: [types/spells.ts:670](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L670)

Total check result (after all modifiers)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`total`](types.md#total-7)

##### formula

```ts
formula: string;
```

Defined in: [types/spells.ts:673](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L673)

The formula used

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`formula`](types.md#formula-3)

##### modifiers

```ts
modifiers: LegacyRollModifier[];
```

Defined in: [types/spells.ts:676](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L676)

All modifiers applied

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`modifiers`](types.md#modifiers-3)

##### critical

```ts
critical: boolean;
```

Defined in: [types/spells.ts:679](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L679)

Was this a critical (natural 20)?

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`critical`](types.md#critical-1)

##### fumble

```ts
fumble: boolean;
```

Defined in: [types/spells.ts:682](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L682)

Was this a fumble (natural 1)?

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`fumble`](types.md#fumble-1)

##### disapprovalAutoFail

```ts
disapprovalAutoFail: boolean;
```

Defined in: [types/spells.ts:692](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L692)

Did the natural roll land inside the caster's disapproval range
(excluding the natural-1 fumble)? Per DCC RAW (core rulebook, cleric
magic) such a roll is a failure no matter what the modified total
would otherwise have achieved, so the result-table lookup is forced to
the failure row exactly like a fumble. Only ever true for profiles
with `usesDisapproval` when `disapprovalRange` was provided.

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`disapprovalAutoFail`](types.md#disapprovalautofail)

##### tier?

```ts
optional tier?: ResultTier;
```

Defined in: [types/spells.ts:695](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L695)

Result tier (lost, failure, success levels)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`tier`](types.md#tier-2)

##### resultText?

```ts
optional resultText?: string;
```

Defined in: [types/spells.ts:698](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L698)

Result text from table lookup

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`resultText`](types.md#resulttext)

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: [types/spells.ts:701](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L701)

Structured effect from result

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`effect`](types.md#effect-11)

##### spellLost

```ts
spellLost: boolean;
```

Defined in: [types/spells.ts:704](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L704)

Was the spell lost for the day?

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`spellLost`](types.md#spelllost)

##### corruptionTriggered

```ts
corruptionTriggered: boolean;
```

Defined in: [types/spells.ts:707](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L707)

Was corruption triggered? (wizard/elf only)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`corruptionTriggered`](types.md#corruptiontriggered)

##### corruptionResult?

```ts
optional corruptionResult?: CorruptionResult;
```

Defined in: [types/spells.ts:710](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L710)

Corruption result (if rolled, filled by corruption module)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`corruptionResult`](types.md#corruptionresult-1)

##### fumbleResult?

```ts
optional fumbleResult?: SpellFumbleResult;
```

Defined in: [types/spells.ts:713](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L713)

Fumble result (if applicable)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`fumbleResult`](types.md#fumbleresult-1)

##### patronTaintChecked

```ts
patronTaintChecked: boolean;
```

Defined in: [types/spells.ts:720](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L720)

Did the per-cast creeping-chance patron-taint check fire this cast?
True when `patron` is set AND `isPatronCast` returns true — regardless
of spell outcome (success, failure, fumble all still check).

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`patronTaintChecked`](types.md#patrontaintchecked)

##### patronTaintRoll?

```ts
optional patronTaintRoll?: number;
```

Defined in: [types/spells.ts:723](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L723)

The d100 rolled for the creeping-chance check (only present when checked).

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`patronTaintRoll`](types.md#patrontaintroll)

##### patronTaintAcquired

```ts
patronTaintAcquired: boolean;
```

Defined in: [types/spells.ts:731](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L731)

Was patron taint acquired on this cast? True when either:
1. Creeping-chance check hit (roll <= chance), OR
2. The spell's result-table entry carries a patron-taint outcome
   (`effect.type === 'patron-taint'` or `effect.data.patronTaint === true`).

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`patronTaintAcquired`](types.md#patrontaintacquired)

##### patronTaintSource?

```ts
optional patronTaintSource?: "creeping-chance" | "result-table";
```

Defined in: [types/spells.ts:734](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L734)

Which trigger acquired the taint (only present when acquired).

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`patronTaintSource`](types.md#patrontaintsource)

##### newPatronTaintChance?

```ts
optional newPatronTaintChance?: number;
```

Defined in: [types/spells.ts:740](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L740)

Post-cast patron-taint chance. Only set when `patronTaintChecked`.
RAW: resets to 1 on acquisition, else currentChance + 1.

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`newPatronTaintChance`](types.md#newpatrontaintchance)

##### patronTaintResult?

```ts
optional patronTaintResult?: PatronTaintResult;
```

Defined in: [types/spells.ts:746](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L746)

Patron-taint manifestation (only present when acquired AND a
`patronTaintTable` was provided). Rolled via `rollPatronTaint`.

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`patronTaintResult`](types.md#patrontaintresult-1)

##### disapprovalIncrease

```ts
disapprovalIncrease: number;
```

Defined in: [types/spells.ts:749](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L749)

Disapproval increase amount (cleric)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`disapprovalIncrease`](types.md#disapprovalincrease)

##### newDisapprovalRange?

```ts
optional newDisapprovalRange?: number;
```

Defined in: [types/spells.ts:752](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L752)

New disapproval range after this cast (cleric)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`newDisapprovalRange`](types.md#newdisapprovalrange)

##### mercurialEffect?

```ts
optional mercurialEffect?: MercurialEffect;
```

Defined in: [types/spells.ts:755](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L755)

Mercurial effect that applied (if any)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`mercurialEffect`](types.md#mercurialeffect-2)

##### spellburnApplied?

```ts
optional spellburnApplied?: SpellburnCommitment;
```

Defined in: [types/spells.ts:758](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L758)

Spellburn that was applied

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`spellburnApplied`](types.md#spellburnapplied)

##### luckBurned

```ts
luckBurned: number;
```

Defined in: [types/spells.ts:761](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L761)

Luck points burned

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`luckBurned`](types.md#luckburned)

##### manifestation?

```ts
optional manifestation?: string;
```

Defined in: [types/spells.ts:764](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L764)

Manifestation description (if rolled/provided)

###### Inherited from

[`SpellCastResult`](types.md#spellcastresult).[`manifestation`](types.md#manifestation-2)

***

### CounterspellPowerEntry

Defined in: [spells/spell-duel-tables.ts:25](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L25)

Entry for Table 4-6: Counterspell Power

#### Properties

##### min

```ts
min: number;
```

Defined in: [spells/spell-duel-tables.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L27)

Minimum roll value for this entry (inclusive)

##### max

```ts
max: number;
```

Defined in: [spells/spell-duel-tables.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L29)

Maximum roll value for this entry (inclusive)

##### effect

```ts
effect: string;
```

Defined in: [spells/spell-duel-tables.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L31)

Effect description

##### attackerSpellEffective

```ts
attackerSpellEffective: boolean;
```

Defined in: [spells/spell-duel-tables.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L33)

Whether attacker's spell takes effect

##### defenderSpellEffective

```ts
defenderSpellEffective: boolean;
```

Defined in: [spells/spell-duel-tables.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L35)

Whether defender's spell takes effect

##### attackerCheckModifier

```ts
attackerCheckModifier: number;
```

Defined in: [spells/spell-duel-tables.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L37)

Modifier to attacker's effective spell check

##### defenderCheckModifier

```ts
defenderCheckModifier: number;
```

Defined in: [spells/spell-duel-tables.ts:39](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L39)

Modifier to defender's effective spell check

##### simultaneousEffect

```ts
simultaneousEffect: boolean;
```

Defined in: [spells/spell-duel-tables.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L41)

Whether both spells go off simultaneously

***

### CounterspellPowerTable

Defined in: [spells/spell-duel-tables.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L47)

Table 4-6 data structure

#### Properties

##### attackerHigh

```ts
attackerHigh: CounterspellPowerEntry[];
```

Defined in: [spells/spell-duel-tables.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L49)

Results for when attacker has higher spell check

##### defenderHigh

```ts
defenderHigh: CounterspellPowerEntry[];
```

Defined in: [spells/spell-duel-tables.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L51)

Results for when defender has higher spell check

***

### PhlogistonDisturbanceEntry

Defined in: [spells/spell-duel-tables.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L57)

Entry for Table 4-7: Phlogiston Disturbance

#### Properties

##### min

```ts
min: number;
```

Defined in: [spells/spell-duel-tables.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L59)

Minimum roll value (inclusive)

##### max

```ts
max: number;
```

Defined in: [spells/spell-duel-tables.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L61)

Maximum roll value (inclusive)

##### effect

```ts
effect: string;
```

Defined in: [spells/spell-duel-tables.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L63)

Effect description

##### affectsAttacker

```ts
affectsAttacker: boolean;
```

Defined in: [spells/spell-duel-tables.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L65)

Whether this affects the attacker

##### affectsDefender

```ts
affectsDefender: boolean;
```

Defined in: [spells/spell-duel-tables.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L67)

Whether this affects the defender

##### affectsBystanders

```ts
affectsBystanders: boolean;
```

Defined in: [spells/spell-duel-tables.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L69)

Whether this affects bystanders

##### damage?

```ts
optional damage?: string;
```

Defined in: [spells/spell-duel-tables.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L71)

Damage dealt (if any)

##### areaOfEffect?

```ts
optional areaOfEffect?: number;
```

Defined in: [spells/spell-duel-tables.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L73)

Area of effect in feet (if any)

##### specialEffect?

```ts
optional specialEffect?: 
  | "corruption"
  | "patron-taint"
  | "deity-displeasure"
  | "supernatural-entity"
  | "dimensional-rift"
  | "time-distortion"
  | "magical-chaos";
```

Defined in: [spells/spell-duel-tables.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L75)

Special effect type

***

### SpellDuelTables

Defined in: [spells/spell-duel-tables.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L94)

All spell duel tables bundled together

#### Properties

##### getComparisonDie

```ts
getComparisonDie: ComparisonDieLookup;
```

Defined in: [spells/spell-duel-tables.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L96)

Comparison die lookup function (Table 4-5)

##### counterspellPower

```ts
counterspellPower: CounterspellPowerTable;
```

Defined in: [spells/spell-duel-tables.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L98)

Counterspell power results (Table 4-6)

##### phlogistonDisturbance

```ts
phlogistonDisturbance: PhlogistonDisturbanceTable;
```

Defined in: [spells/spell-duel-tables.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L100)

Phlogiston disturbance results (Table 4-7)

***

### SpellDuelParticipant

Defined in: [spells/spell-duel.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L78)

A participant in a spell duel

#### Properties

##### id

```ts
id: string;
```

Defined in: [spells/spell-duel.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L80)

Unique identifier for the participant

##### name

```ts
name: string;
```

Defined in: [spells/spell-duel.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L83)

Display name

##### casterType

```ts
casterType: SpellDuelCasterType;
```

Defined in: [spells/spell-duel.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L86)

Type of caster

##### momentum

```ts
momentum: number;
```

Defined in: [spells/spell-duel.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L89)

Current momentum (starts at 10)

##### initiative

```ts
initiative: number;
```

Defined in: [spells/spell-duel.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L92)

Initiative roll for ordering

##### patron?

```ts
optional patron?: string;
```

Defined in: [spells/spell-duel.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L95)

Patron name if invoking patron (for same-patron cancellation)

***

### SpellDuelSpell

Defined in: [spells/spell-duel.ts:111](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L111)

A spell being cast or used to counter

#### Properties

##### name

```ts
name: string;
```

Defined in: [spells/spell-duel.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L113)

Name of the spell

##### level

```ts
level: number;
```

Defined in: [spells/spell-duel.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L116)

Spell level (affects minimum spell check threshold)

##### category

```ts
category: CounterspellCategory;
```

Defined in: [spells/spell-duel.ts:119](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L119)

Category for counterspell matching

##### counters?

```ts
optional counters?: string[];
```

Defined in: [spells/spell-duel.ts:122](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L122)

Specific spells this can counter (for defensive spells)

##### patron?

```ts
optional patron?: string;
```

Defined in: [spells/spell-duel.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L125)

The patron being invoked (if invoke patron)

***

### SpellDuelCheck

Defined in: [spells/spell-duel.ts:131](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L131)

Result of a spell check in the duel

#### Properties

##### casterId

```ts
casterId: string;
```

Defined in: [spells/spell-duel.ts:133](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L133)

The caster making the check

##### spell

```ts
spell: SpellDuelSpell;
```

Defined in: [spells/spell-duel.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L136)

The spell being cast

##### naturalRoll

```ts
naturalRoll: number;
```

Defined in: [spells/spell-duel.ts:139](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L139)

Natural roll on the die

##### total

```ts
total: number;
```

Defined in: [spells/spell-duel.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L142)

Total spell check result

##### succeeded

```ts
succeeded: boolean;
```

Defined in: [spells/spell-duel.ts:145](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L145)

Whether the check succeeded (met minimum threshold)

##### spellLost

```ts
spellLost: boolean;
```

Defined in: [spells/spell-duel.ts:148](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L148)

Whether the spell is lost for the day

***

### SpellCheckComparison

Defined in: [spells/spell-duel.ts:170](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L170)

Result of comparing spell checks (Table 4-5)

#### Properties

##### attackerCheck

```ts
attackerCheck: number;
```

Defined in: [spells/spell-duel.ts:172](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L172)

Attacker's spell check total

##### defenderCheck

```ts
defenderCheck: number;
```

Defined in: [spells/spell-duel.ts:175](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L175)

Defender's spell check total

##### attackerHigh

```ts
attackerHigh: boolean;
```

Defined in: [spells/spell-duel.ts:178](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L178)

Whether attacker had higher check

##### comparisonDie

```ts
comparisonDie: ComparisonDie;
```

Defined in: [spells/spell-duel.ts:181](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L181)

Die to roll on Table 4-6, or "PD" for phlogiston disturbance

##### isPhlogistonDisturbance

```ts
isPhlogistonDisturbance: boolean;
```

Defined in: [spells/spell-duel.ts:184](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L184)

Whether this triggers phlogiston disturbance

***

### CounterspellPowerResult

Defined in: [spells/spell-duel.ts:190](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L190)

Result from Table 4-6: Counterspell Power

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [spells/spell-duel.ts:192](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L192)

Roll on the comparison die

##### momentumModifier

```ts
momentumModifier: number;
```

Defined in: [spells/spell-duel.ts:195](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L195)

Momentum modifier applied

##### modifiedResult

```ts
modifiedResult: number;
```

Defined in: [spells/spell-duel.ts:198](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L198)

Final modified result

##### effect

```ts
effect: string;
```

Defined in: [spells/spell-duel.ts:201](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L201)

Effect description

##### attackerSpellEffective

```ts
attackerSpellEffective: boolean;
```

Defined in: [spells/spell-duel.ts:204](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L204)

Whether attacker's spell takes effect

##### defenderSpellEffective

```ts
defenderSpellEffective: boolean;
```

Defined in: [spells/spell-duel.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L207)

Whether defender's spell takes effect

##### attackerCheckModifier

```ts
attackerCheckModifier: number;
```

Defined in: [spells/spell-duel.ts:210](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L210)

Modifier to attacker's effective spell check (can reduce it)

##### defenderCheckModifier

```ts
defenderCheckModifier: number;
```

Defined in: [spells/spell-duel.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L213)

Modifier to defender's effective spell check (can reduce it)

##### simultaneousEffect

```ts
simultaneousEffect: boolean;
```

Defined in: [spells/spell-duel.ts:216](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L216)

Whether both spells go off simultaneously

***

### PhlogistonDisturbanceResult

Defined in: [spells/spell-duel.ts:222](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L222)

Result from Table 4-7: Phlogiston Disturbance

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [spells/spell-duel.ts:224](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L224)

Roll on the table

##### effect

```ts
effect: string;
```

Defined in: [spells/spell-duel.ts:227](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L227)

Effect description

##### affectsAttacker

```ts
affectsAttacker: boolean;
```

Defined in: [spells/spell-duel.ts:230](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L230)

Whether this affects the attacker

##### affectsDefender

```ts
affectsDefender: boolean;
```

Defined in: [spells/spell-duel.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L233)

Whether this affects the defender

##### affectsBystanders

```ts
affectsBystanders: boolean;
```

Defined in: [spells/spell-duel.ts:236](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L236)

Whether this affects bystanders

##### damage?

```ts
optional damage?: string;
```

Defined in: [spells/spell-duel.ts:239](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L239)

Damage dealt (if any)

##### areaOfEffect?

```ts
optional areaOfEffect?: number;
```

Defined in: [spells/spell-duel.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L242)

Area of effect in feet (if any)

##### specialEffect?

```ts
optional specialEffect?: 
  | "corruption"
  | "patron-taint"
  | "deity-displeasure"
  | "supernatural-entity"
  | "dimensional-rift"
  | "time-distortion"
  | "magical-chaos";
```

Defined in: [spells/spell-duel.ts:245](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L245)

Special effect type

***

### CounterspellExchangeResult

Defined in: [spells/spell-duel.ts:259](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L259)

Result of a single counterspell exchange

#### Properties

##### attackerCheck

```ts
attackerCheck: SpellDuelCheck;
```

Defined in: [spells/spell-duel.ts:261](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L261)

The attacking caster's check

##### defenderCheck

```ts
defenderCheck: SpellDuelCheck;
```

Defined in: [spells/spell-duel.ts:264](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L264)

The defending caster's check

##### comparison

```ts
comparison: SpellCheckComparison;
```

Defined in: [spells/spell-duel.ts:267](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L267)

Comparison result

##### counterspellPower?

```ts
optional counterspellPower?: CounterspellPowerResult;
```

Defined in: [spells/spell-duel.ts:270](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L270)

Counterspell power result (if not phlogiston disturbance)

##### phlogistonDisturbance?

```ts
optional phlogistonDisturbance?: PhlogistonDisturbanceResult;
```

Defined in: [spells/spell-duel.ts:273](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L273)

Phlogiston disturbance result (if checks were equal)

##### newAttackerMomentum

```ts
newAttackerMomentum: number;
```

Defined in: [spells/spell-duel.ts:276](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L276)

Updated attacker momentum

##### newDefenderMomentum

```ts
newDefenderMomentum: number;
```

Defined in: [spells/spell-duel.ts:279](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L279)

Updated defender momentum

##### samePatronCancellation

```ts
samePatronCancellation: boolean;
```

Defined in: [spells/spell-duel.ts:282](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L282)

Whether same-patron cancellation occurred

***

### SpellDuelState

Defined in: [spells/spell-duel.ts:288](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L288)

State of an ongoing spell duel

#### Properties

##### participants

```ts
participants: SpellDuelParticipant[];
```

Defined in: [spells/spell-duel.ts:290](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L290)

All participants in the duel

##### exchanges

```ts
exchanges: CounterspellExchangeResult[];
```

Defined in: [spells/spell-duel.ts:293](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L293)

History of exchanges

##### active

```ts
active: boolean;
```

Defined in: [spells/spell-duel.ts:296](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L296)

Whether the duel is still active

##### currentAttackerId?

```ts
optional currentAttackerId?: string;
```

Defined in: [spells/spell-duel.ts:299](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L299)

ID of the current attacker

##### currentAttackSpell?

```ts
optional currentAttackSpell?: SpellDuelSpell;
```

Defined in: [spells/spell-duel.ts:302](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L302)

The spell being attacked with

***

### ResolveExchangeOptions

Defined in: [spells/spell-duel.ts:605](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L605)

Options for resolving a counterspell exchange

#### Properties

##### roller?

```ts
optional roller?: DiceRoller;
```

Defined in: [spells/spell-duel.ts:607](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L607)

Optional dice roller

##### tables?

```ts
optional tables?: SpellDuelTables;
```

Defined in: [spells/spell-duel.ts:609](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L609)

Optional custom tables (for official tables)

***

### CanLearnResult

Defined in: [spells/spellbook.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L177)

Result of checking if a spell can be learned

#### Properties

##### allowed

```ts
allowed: boolean;
```

Defined in: [spells/spellbook.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L179)

Whether the spell can be learned

##### reason?

```ts
optional reason?: string;
```

Defined in: [spells/spellbook.ts:182](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L182)

Reason if not allowed

***

### SpellburnValidationResult

Defined in: [spells/spellburn.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L21)

Result of validating a spellburn commitment

#### Properties

##### valid

```ts
valid: boolean;
```

Defined in: [spells/spellburn.ts:23](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L23)

Whether the spellburn is valid

##### errors

```ts
errors: string[];
```

Defined in: [spells/spellburn.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L26)

Error messages if invalid

##### warnings

```ts
warnings: string[];
```

Defined in: [spells/spellburn.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L29)

Warning messages (valid but potentially problematic)

## Type Aliases

### DisapprovalSeverity

```ts
type DisapprovalSeverity = "minor" | "moderate" | "major" | "severe" | "catastrophic";
```

Defined in: [spells/disapproval.ts:236](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L236)

Disapproval severity level

***

### FumbleSeverity

```ts
type FumbleSeverity = "minor" | "moderate" | "major" | "catastrophic";
```

Defined in: [spells/fumble.ts:127](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L127)

Fumble severity level

***

### MercurialClassification

```ts
type MercurialClassification = "beneficial" | "detrimental" | "neutral" | "mixed";
```

Defined in: [spells/mercurial.ts:379](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L379)

Mercurial effect classification

***

### ComparisonDieLookup

```ts
type ComparisonDieLookup = (attackerCheck: number, defenderCheck: number) => ComparisonDie;
```

Defined in: [spells/spell-duel-tables.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L20)

Function type for looking up comparison die (Table 4-5)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `attackerCheck` | `number` |
| `defenderCheck` | `number` |

#### Returns

[`ComparisonDie`](#comparisondie)

***

### PhlogistonDisturbanceTable

```ts
type PhlogistonDisturbanceTable = PhlogistonDisturbanceEntry[];
```

Defined in: [spells/spell-duel-tables.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L89)

Table 4-7 data structure

***

### SpellDuelCasterType

```ts
type SpellDuelCasterType = "wizard" | "cleric" | "other";
```

Defined in: [spells/spell-duel.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L73)

Types of casters that can participate in spell duels

***

### CounterspellCategory

```ts
type CounterspellCategory = 
  | "fire-resistance"
  | "magic-shield"
  | "dispel-magic"
  | "invoke-patron"
  | "same-spell";
```

Defined in: [spells/spell-duel.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L101)

Categories of spells that can counter each other

***

### ComparisonDie

```ts
type ComparisonDie = "d3" | "d4" | "d5" | "d6" | "d7" | "d8" | "d10" | "d12" | "d14" | "d16" | "PD";
```

Defined in: [spells/spell-duel.ts:154](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L154)

Comparison die from Table 4-5

## Variables

### SPELL\_CHECK\_THRESHOLDS

```ts
const SPELL_CHECK_THRESHOLDS: Record<number, number>;
```

Defined in: [spells/cast.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L129)

Minimum spell check total to succeed, by spell level (DCC RAW: 10 + 2 × level)

***

### DEFAULT\_DISAPPROVAL\_RANGE

```ts
const DEFAULT_DISAPPROVAL_RANGE: 1 = 1;
```

Defined in: [spells/disapproval.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L20)

Default starting disapproval range for clerics

***

### MAX\_DISAPPROVAL\_RANGE

```ts
const MAX_DISAPPROVAL_RANGE: 20 = 20;
```

Defined in: [spells/disapproval.ts:25](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L25)

Maximum disapproval range (at which point casting becomes very difficult)

***

### MAX\_MERCURIAL\_SPECIAL\_DEPTH

```ts
const MAX_MERCURIAL_SPECIAL_DEPTH: 5 = 5;
```

Defined in: [spells/mercurial.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L52)

Maximum recursion depth when expanding `rollAgain` specials. A sub-roll
landing on another special entry recurses; past this depth the literal
(unexpanded) effect is returned instead so a pathological table cannot
loop forever.

***

### DEFAULT\_COUNTERSPELL\_POWER\_TABLE

```ts
const DEFAULT_COUNTERSPELL_POWER_TABLE: CounterspellPowerTable;
```

Defined in: [spells/spell-duel-tables.ts:153](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L153)

Default counterspell power table (fan-made)

This provides a balanced set of outcomes for spell duels.
Lower results favor the defender, higher results favor the attacker.

***

### DEFAULT\_PHLOGISTON\_DISTURBANCE\_TABLE

```ts
const DEFAULT_PHLOGISTON_DISTURBANCE_TABLE: PhlogistonDisturbanceTable;
```

Defined in: [spells/spell-duel-tables.ts:310](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L310)

Default phlogiston disturbance table (fan-made)

When spell checks are equal, magical energies collide unpredictably.
Roll d20 to determine the effect.

***

### DEFAULT\_SPELL\_DUEL\_TABLES

```ts
const DEFAULT_SPELL_DUEL_TABLES: SpellDuelTables;
```

Defined in: [spells/spell-duel-tables.ts:421](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L421)

Default spell duel tables (fan-made)

Use these when official DCC tables are not available.

***

### STARTING\_MOMENTUM

```ts
const STARTING_MOMENTUM: 10 = 10;
```

Defined in: [spells/spell-duel.ts:312](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L312)

Starting momentum for all duel participants

***

### COUNTERSPELL\_RELATIONSHIPS

```ts
const COUNTERSPELL_RELATIONSHIPS: Record<string, string[]>;
```

Defined in: [spells/spell-duel.ts:317](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L317)

Default spells and what they can counter

## Functions

### buildSpellCheckModifiers()

```ts
function buildSpellCheckModifiers(input: SpellCastInput): LegacyRollModifier[];
```

Defined in: [spells/cast.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L32)

Build the modifier list for a spell check.
Combines ability modifier, caster level, luck burn, spellburn, and situational modifiers.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`SpellCastInput`](types.md#spellcastinput) |

#### Returns

[`LegacyRollModifier`](types.md#legacyrollmodifier)[]

***

### findInlineResult()

```ts
function findInlineResult(results: readonly SpellResultEntry[], roll: number): SpellResultEntry | undefined;
```

Defined in: [spells/cast.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L113)

Find a spell result entry from inline results

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `results` | readonly [`SpellResultEntry`](types.md#spellresultentry)[] |
| `roll` | `number` |

#### Returns

[`SpellResultEntry`](types.md#spellresultentry) \| `undefined`

***

### getSpellCheckThreshold()

```ts
function getSpellCheckThreshold(spellLevel: number): number;
```

Defined in: [spells/cast.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L140)

Get the minimum spell check threshold for a spell level

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spellLevel` | `number` |

#### Returns

`number`

***

### didSpellCheckSucceed()

```ts
function didSpellCheckSucceed(total: number, spellLevel: number): boolean;
```

Defined in: [spells/cast.ts:147](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L147)

Check if a spell check succeeded (met minimum threshold)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `total` | `number` |
| `spellLevel` | `number` |

#### Returns

`boolean`

***

### determineSpellResult()

```ts
function determineSpellResult(
   total: number, 
   spell: SpellDefinition, 
   resultTable?: TieredTable
): 
  | {
  tier: ResultTier;
  entry?:   | TieredEntry
     | SpellResultEntry;
  text?: string;
}
  | undefined;
```

Defined in: [spells/cast.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L160)

Determine the spell result from a check total.
Uses inline results if available, otherwise falls back to table lookup.

Without inline results or a table, the default tiers apply the spell-level
threshold: a total below `getSpellCheckThreshold(spell.level)` is a failure.
A missing or invalid level is treated as level 1.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `total` | `number` |
| `spell` | [`SpellDefinition`](types.md#spelldefinition) |
| `resultTable?` | [`TieredTable`](tables.md#tieredtable) |

#### Returns

  \| \{
  `tier`: [`ResultTier`](tables.md#resulttier);
  `entry?`:   \| [`TieredEntry`](tables.md#tieredentry)
     \| [`SpellResultEntry`](types.md#spellresultentry);
  `text?`: `string`;
\}
  \| `undefined`

***

### losesSpellOnFailure()

```ts
function losesSpellOnFailure(profile: CasterProfile): boolean;
```

Defined in: [spells/cast.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L219)

Does this caster lose the spell for the day on a failed spell check?
See `CasterProfile.losesSpellOnFailure`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `profile` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

`boolean`

***

### isSpellLostResult()

```ts
function isSpellLostResult(
   entry: 
  | TieredEntry
  | SpellResultEntry
  | undefined, 
   tier: ResultTier, 
   profile?: CasterProfile
): boolean;
```

Defined in: [spells/cast.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L232)

Check if a result indicates the spell is lost.

An entry's explicit `lost` flag always wins. Otherwise, with a caster
profile, DCC RAW applies: a wizard or elf loses the spell on any failed
check (`failure` or `lost` tier), and a cleric keeps it (a failed cleric
check raises disapproval instead). Without a profile, only the `lost`
tier counts.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | \| [`TieredEntry`](tables.md#tieredentry) \| [`SpellResultEntry`](types.md#spellresultentry) \| `undefined` |
| `tier` | [`ResultTier`](tables.md#resulttier) |
| `profile?` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

`boolean`

***

### triggersCorruption()

```ts
function triggersCorruption(
   entry: 
  | TieredEntry
  | SpellResultEntry
  | undefined, 
   natural: number | undefined, 
   profile: CasterProfile
): boolean;
```

Defined in: [spells/cast.ts:252](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L252)

Check if a result triggers corruption

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | \| [`TieredEntry`](tables.md#tieredentry) \| [`SpellResultEntry`](types.md#spellresultentry) \| `undefined` |
| `natural` | `number` \| `undefined` |
| `profile` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

`boolean`

***

### checkDisapproval()

```ts
function checkDisapproval(natural: number, disapprovalRange: number): boolean;
```

Defined in: [spells/cast.ts:282](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L282)

Check if a spell check triggers disapproval (clerics only)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `natural` | `number` |
| `disapprovalRange` | `number` |

#### Returns

`boolean`

***

### calculateDisapprovalIncrease()

```ts
function calculateDisapprovalIncrease(
   natural: number | undefined, 
   profile: CasterProfile, 
   disapprovalRange?: number
): number;
```

Defined in: [spells/cast.ts:307](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L307)

Calculate the disapproval-range increase this cast causes.

DCC RAW (core rulebook, cleric magic): every failed spell check widens the
disapproval range by one, and a natural roll inside the range is an
automatic failure. So a natural inside the range (natural 1 included)
is a failed check and raises the range by exactly 1.

Only in-range naturals are counted here. A check that fails on its total
(outside the range) also raises the range under RAW, but whether a total
fails depends on the spell's result table, so that increase is left to
the caller.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `natural` | `number` \| `undefined` | `undefined` | The natural spell-check roll |
| `profile` | [`CasterProfile`](types.md#casterprofile) | `undefined` | The caster profile |
| `disapprovalRange?` | `number` | `1` | Current disapproval range. When omitted, only a natural 1 counts (the range is always at least 1). |

#### Returns

`number`

***

### castSpell()

```ts
function castSpell(
   input: SpellCastInput, 
   options?: SpellCheckOptions, 
   events?: SpellEvents
): SpellCastResult;
```

Defined in: [spells/cast.ts:337](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L337)

Cast a spell, performing the spell check and determining results.

This is the main entry point for spell casting. It:
1. Builds the modifier list
2. Rolls the spell check (if mode is evaluate)
3. Determines the result tier
4. Handles critical/fumble detection
5. Triggers events for UI integration

Note: Corruption rolling, fumble tables, and mercurial effects
are handled by their respective modules - this function sets
the flags indicating when they should be triggered.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`SpellCastInput`](types.md#spellcastinput) |
| `options?` | [`SpellCheckOptions`](types.md#spellcheckoptions) |
| `events?` | [`SpellEvents`](types.md#spellevents) |

#### Returns

[`SpellCastResult`](types.md#spellcastresult)

***

### getCasterProfile()

```ts
function getCasterProfile(classId: string): CasterProfile | undefined;
```

Defined in: [spells/cast.ts:545](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L545)

Get the default caster profile for a class

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |

#### Returns

[`CasterProfile`](types.md#casterprofile) \| `undefined`

***

### isSuccess()

```ts
function isSuccess(tier: ResultTier | undefined): boolean;
```

Defined in: [spells/cast.ts:582](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L582)

Check if a result is a success (any success tier)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tier` | [`ResultTier`](tables.md#resulttier) \| `undefined` |

#### Returns

`boolean`

***

### isFailure()

```ts
function isFailure(tier: ResultTier | undefined): boolean;
```

Defined in: [spells/cast.ts:590](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L590)

Check if a result is a failure (failure or lost)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tier` | [`ResultTier`](tables.md#resulttier) \| `undefined` |

#### Returns

`boolean`

***

### getSpellCheckTotalModifier()

```ts
function getSpellCheckTotalModifier(modifiers: LegacyRollModifier[]): number;
```

Defined in: [spells/cast.ts:598](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/cast.ts#L598)

Calculate the total modifier sum from a spell check modifiers list

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `modifiers` | [`LegacyRollModifier`](types.md#legacyrollmodifier)[] |

#### Returns

`number`

***

### rollCorruption()

```ts
function rollCorruption(
   corruptionTable: SimpleTable, 
   tier?: "minor" | "major" | "greater", 
   options?: RollOptions
): CorruptionResult;
```

Defined in: [spells/corruption.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L37)

Roll for corruption effect.

In DCC, corruption is typically rolled on d10 for minor,
d10+10 for major, or d10+20 for greater corruption.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `corruptionTable` | [`SimpleTable`](tables.md#simpletable) | `undefined` | Table to look up the result |
| `tier?` | `"minor"` \| `"major"` \| `"greater"` | `"minor"` | Corruption tier (determines die modifier) |
| `options?` | [`RollOptions`](types.md#rolloptions) | `{}` | Roll options |

#### Returns

[`CorruptionResult`](types.md#corruptionresult)

The corruption result

***

### rollCorruptionWithModifier()

```ts
function rollCorruptionWithModifier(
   corruptionTable: SimpleTable, 
   modifier: number, 
   tier?: "minor" | "major" | "greater", 
   options?: RollOptions
): CorruptionResult;
```

Defined in: [spells/corruption.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L78)

Roll corruption with a specific modifier (e.g., from luck).

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `corruptionTable` | [`SimpleTable`](tables.md#simpletable) | `undefined` |
| `modifier` | `number` | `undefined` |
| `tier?` | `"minor"` \| `"major"` \| `"greater"` | `"minor"` |
| `options?` | [`RollOptions`](types.md#rolloptions) | `{}` |

#### Returns

[`CorruptionResult`](types.md#corruptionresult)

***

### addCorruption()

```ts
function addCorruption(currentCorruptions: readonly string[], newCorruption: CorruptionResult): string[];
```

Defined in: [spells/corruption.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L125)

Add a corruption to a character's corruption list.
Returns the updated corruption array.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currentCorruptions` | readonly `string`[] |
| `newCorruption` | [`CorruptionResult`](types.md#corruptionresult) |

#### Returns

`string`[]

***

### getCorruptions()

```ts
function getCorruptions(character: Character): readonly string[];
```

Defined in: [spells/corruption.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L136)

Get corruptions from a character's class state.
Works for both wizards and elves.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

readonly `string`[]

***

### getCorruptionCount()

```ts
function getCorruptionCount(character: Character): number;
```

Defined in: [spells/corruption.ts:153](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L153)

Count the number of corruptions a character has.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### hasCorruptions()

```ts
function hasCorruptions(character: Character): boolean;
```

Defined in: [spells/corruption.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L160)

Check if a character has any corruptions.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`boolean`

***

### determineCorruptionTier()

```ts
function determineCorruptionTier(spellLevel: number): "minor" | "major" | "greater";
```

Defined in: [spells/corruption.ts:172](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L172)

Determine corruption tier based on spell level.
Higher level spells risk greater corruption.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spellLevel` | `number` |

#### Returns

`"minor"` \| `"major"` \| `"greater"`

***

### getCorruptionSeverity()

```ts
function getCorruptionSeverity(roll: number): "minor" | "major" | "greater";
```

Defined in: [spells/corruption.ts:183](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L183)

Determine corruption tier based on roll result.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `roll` | `number` |

#### Returns

`"minor"` \| `"major"` \| `"greater"`

***

### rollPatronTaint()

```ts
function rollPatronTaint(
   patronId: string, 
   taintTable: SimpleTable, 
   options?: RollOptions
): PatronTaintResult;
```

Defined in: [spells/corruption.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L202)

Roll for patron taint.
Patron taint is similar to corruption but specific to the patron.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's identifier |
| `taintTable` | [`SimpleTable`](tables.md#simpletable) | Table to look up the result |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options |

#### Returns

[`PatronTaintResult`](types.md#patrontaintresult)

The patron taint result

***

### removeCorruption()

```ts
function removeCorruption(currentCorruptions: readonly string[], indexToRemove: number): string[];
```

Defined in: [spells/corruption.ts:241](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L241)

Remove a corruption from a character (very rare in DCC).
Returns the updated corruption array.

Note: In most DCC games, corruption is permanent. This function
exists for special cases like divine intervention or powerful magic.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `currentCorruptions` | readonly `string`[] |
| `indexToRemove` | `number` |

#### Returns

`string`[]

***

### clearAllCorruptions()

```ts
function clearAllCorruptions(): string[];
```

Defined in: [spells/corruption.ts:251](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/corruption.ts#L251)

Remove all corruptions from a character (extremely rare).

#### Returns

`string`[]

***

### rollTriggersDisapproval()

```ts
function rollTriggersDisapproval(natural: number, disapprovalRange: number): boolean;
```

Defined in: [spells/disapproval.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L34)

Check if a natural roll triggers disapproval.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `natural` | `number` | The natural die roll |
| `disapprovalRange` | `number` | Current disapproval range (e.g., 1 means only nat 1) |

#### Returns

`boolean`

True if the roll is within the disapproval range

***

### increaseDisapprovalRange()

```ts
function increaseDisapprovalRange(currentRange: number, increase?: number): number;
```

Defined in: [spells/disapproval.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L49)

Increase the disapproval range.
Range increases by 1 on natural 1 (by default).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `currentRange` | `number` | `undefined` | Current disapproval range |
| `increase?` | `number` | `1` | Amount to increase (default 1) |

#### Returns

`number`

New disapproval range (capped at MAX_DISAPPROVAL_RANGE)

***

### reduceDisapprovalRange()

```ts
function reduceDisapprovalRange(
   currentRange: number, 
   reduction?: number, 
   minimum?: number
): number;
```

Defined in: [spells/disapproval.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L64)

Reduce the disapproval range (after appropriate penance/atonement).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `currentRange` | `number` | `undefined` | Current disapproval range |
| `reduction?` | `number` | `1` | Amount to reduce by (default 1) |
| `minimum?` | `number` | `DEFAULT_DISAPPROVAL_RANGE` | Floor for the result (default DEFAULT_DISAPPROVAL_RANGE) |

#### Returns

`number`

New disapproval range

***

### resetDisapprovalRange()

```ts
function resetDisapprovalRange(): number;
```

Defined in: [spells/disapproval.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L75)

Fully reset disapproval range to default.

#### Returns

`number`

***

### rollDisapproval()

```ts
function rollDisapproval(
   naturalRoll: number, 
   disapprovalRange: number, 
   disapprovalTable: SimpleTable, 
   luckModifier?: number, 
   options?: RollOptions
): DisapprovalResult;
```

Defined in: [spells/disapproval.ts:159](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L159)

Roll for disapproval effect.

DCC RAW (core rulebook, Table 5-7): the cleric rolls 1d4 for every point
of the natural spell-check roll (a natural 1 rolls 1d4, a natural 4 inside
the range rolls 4d4), and the roll is reduced by the cleric's Luck
modifier. The disapproval range itself only decides *whether* disapproval
happens; it does not scale the roll.

A Luck modifier can push the roll below 1. The table starts at 1, so the
lookup clamps to 1 (the mildest result); `roll` keeps the unclamped value
so callers can show the arithmetic.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `naturalRoll` | `number` | `undefined` | The natural d20 roll that triggered disapproval |
| `disapprovalRange` | `number` | `undefined` | Current disapproval range (reported only) |
| `disapprovalTable` | [`SimpleTable`](tables.md#simpletable) | `undefined` | Table to look up the result |
| `luckModifier?` | `number` | `0` | The cleric's Luck modifier (default 0) |
| `options?` | [`RollOptions`](types.md#rolloptions) | `{}` | Roll options. A custom roller receives "Nd4". |

#### Returns

[`DisapprovalResult`](#disapprovalresult)

The disapproval result

***

### checkAndRollDisapproval()

```ts
function checkAndRollDisapproval(
   natural: number, 
   disapprovalRange: number, 
   disapprovalTable: SimpleTable, 
   luckModifier?: number, 
   options?: RollOptions
): DisapprovalResult | undefined;
```

Defined in: [spells/disapproval.ts:215](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L215)

Combined check and roll for disapproval.
Returns undefined if disapproval was not triggered.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `natural` | `number` | `undefined` | The natural die roll from the spell check |
| `disapprovalRange` | `number` | `undefined` | Current disapproval range |
| `disapprovalTable` | [`SimpleTable`](tables.md#simpletable) | `undefined` | Table to look up the result |
| `luckModifier?` | `number` | `0` | The cleric's Luck modifier (default 0) |
| `options?` | [`RollOptions`](types.md#rolloptions) | `{}` | Roll options |

#### Returns

[`DisapprovalResult`](#disapprovalresult) \| `undefined`

DisapprovalResult if triggered, undefined otherwise

***

### getDisapprovalSeverity()

```ts
function getDisapprovalSeverity(roll: number): DisapprovalSeverity;
```

Defined in: [spells/disapproval.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L242)

Get the severity level of a disapproval roll.
Based on typical DCC disapproval table structure.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `roll` | `number` |

#### Returns

[`DisapprovalSeverity`](#disapprovalseverity)

***

### getExpectedSeverity()

```ts
function getExpectedSeverity(disapprovalRange: number, luckModifier?: number): {
  minimum: DisapprovalSeverity;
  maximum: DisapprovalSeverity;
  average: DisapprovalSeverity;
};
```

Defined in: [spells/disapproval.ts:259](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L259)

Calculate the expected disapproval severity for a given range.
Useful for warning players about high disapproval ranges.

Any natural roll from 1 to the range triggers disapproval, and the roll is
(natural)d4 − Luck modifier, so the best case is a natural 1 rolling a 1
and the worst case is a natural equal to the range rolling all 4s.
The average assumes each triggering natural is equally likely.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `disapprovalRange` | `number` | `undefined` |
| `luckModifier?` | `number` | `0` |

#### Returns

```ts
{
  minimum: DisapprovalSeverity;
  maximum: DisapprovalSeverity;
  average: DisapprovalSeverity;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `minimum` | [`DisapprovalSeverity`](#disapprovalseverity) | [spells/disapproval.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L263) |
| `maximum` | [`DisapprovalSeverity`](#disapprovalseverity) | [spells/disapproval.ts:264](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L264) |
| `average` | [`DisapprovalSeverity`](#disapprovalseverity) | [spells/disapproval.ts:265](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L265) |

***

### getDisapprovalProbability()

```ts
function getDisapprovalProbability(disapprovalRange: number): number;
```

Defined in: [spells/disapproval.ts:287](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L287)

Calculate the probability of triggering disapproval on a d20.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `disapprovalRange` | `number` |

#### Returns

`number`

***

### getDisapprovalRiskDescription()

```ts
function getDisapprovalRiskDescription(disapprovalRange: number): string;
```

Defined in: [spells/disapproval.ts:294](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/disapproval.ts#L294)

Get a description of how risky the current disapproval range is.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `disapprovalRange` | `number` |

#### Returns

`string`

***

### rollSpellFumble()

```ts
function rollSpellFumble(
   spellLevel: number, 
   fumbleTable: SimpleTable, 
   options?: RollOptions
): SpellFumbleResult;
```

Defined in: [spells/fumble.ts:39](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L39)

Roll on the spell fumble table.

In DCC, spell fumbles are typically rolled on 1d4 modified by:
- Spell level (higher level = worse fumbles)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellLevel` | `number` | Level of the spell that fumbled |
| `fumbleTable` | [`SimpleTable`](tables.md#simpletable) | Table to look up the result |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options |

#### Returns

[`SpellFumbleResult`](types.md#spellfumbleresult)

The fumble result

***

### rollSpellFumbleWithModifier()

```ts
function rollSpellFumbleWithModifier(
   spellLevel: number, 
   modifier: number, 
   fumbleTable: SimpleTable, 
   options?: RollOptions
): SpellFumbleResult;
```

Defined in: [spells/fumble.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L81)

Roll spell fumble with a modifier (e.g., from luck or other sources).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spellLevel` | `number` |
| `modifier` | `number` |
| `fumbleTable` | [`SimpleTable`](tables.md#simpletable) |
| `options?` | [`RollOptions`](types.md#rolloptions) |

#### Returns

[`SpellFumbleResult`](types.md#spellfumbleresult)

***

### getFumbleSeverity()

```ts
function getFumbleSeverity(roll: number): FumbleSeverity;
```

Defined in: [spells/fumble.ts:132](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L132)

Determine fumble severity from the roll.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `roll` | `number` |

#### Returns

[`FumbleSeverity`](#fumbleseverity)

***

### getExpectedFumbleRange()

```ts
function getExpectedFumbleRange(spellLevel: number): {
  min: number;
  max: number;
  averageSeverity: FumbleSeverity;
};
```

Defined in: [spells/fumble.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L142)

Calculate expected fumble range for a spell level.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spellLevel` | `number` |

#### Returns

```ts
{
  min: number;
  max: number;
  averageSeverity: FumbleSeverity;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `min` | `number` | [spells/fumble.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L143) |
| `max` | `number` | [spells/fumble.ts:144](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L144) |
| `averageSeverity` | [`FumbleSeverity`](#fumbleseverity) | [spells/fumble.ts:145](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L145) |

***

### isSpellFumble()

```ts
function isSpellFumble(natural: number): boolean;
```

Defined in: [spells/fumble.ts:166](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L166)

Check if a natural roll is a fumble.
Fumbles occur on natural 1 for spell checks.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `natural` | `number` |

#### Returns

`boolean`

***

### fumbleRequiresCorruption()

```ts
function fumbleRequiresCorruption(fumbleResult: SpellFumbleResult, profile: CasterProfile): boolean;
```

Defined in: [spells/fumble.ts:173](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L173)

Check if a fumble result requires a corruption roll.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fumbleResult` | [`SpellFumbleResult`](types.md#spellfumbleresult) |
| `profile` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

`boolean`

***

### parseMisfireType()

```ts
function parseMisfireType(fumbleResult: SpellFumbleResult): MisfireResult | undefined;
```

Defined in: [spells/fumble.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L207)

Determine misfire type from fumble result.
This is a helper for systems that want to parse misfire effects.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fumbleResult` | [`SpellFumbleResult`](types.md#spellfumbleresult) |

#### Returns

[`MisfireResult`](#misfireresult) \| `undefined`

***

### isClericSpellFailure()

```ts
function isClericSpellFailure(natural: number, profile: CasterProfile): boolean;
```

Defined in: [spells/fumble.ts:247](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L247)

Cleric natural 1 handling is different - it's disapproval, not fumble.
This function documents the distinction.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `natural` | `number` |
| `profile` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

`boolean`

***

### getFailureType()

```ts
function getFailureType(natural: number, profile: CasterProfile): "none" | "disapproval" | "fumble";
```

Defined in: [spells/fumble.ts:262](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/fumble.ts#L262)

Get the appropriate failure type for a caster.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `natural` | `number` |
| `profile` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

`"none"` \| `"disapproval"` \| `"fumble"`

***

### rollMercurialMagic()

```ts
function rollMercurialMagic(
   luckModifier: number, 
   table: MercurialTable, 
   options?: RollOptions
): MercurialEffect;
```

Defined in: [spells/mercurial.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L97)

Roll for mercurial magic effect.

In DCC, mercurial magic is rolled on d100 + (Luck modifier × 10).
This creates a range roughly from -20 to 130+.

When the drawn entry carries a `special` instruction (e.g. Table 5-2's
99 "Roll again twice."), the special is expanded: `count` sub-rolls are
made with the special's `formula` (default "1d100") plus the same luck
modifier, and the returned effect combines the sub-effects (individually
available via `subEffects`). Sub-rolls landing on another special entry
recurse, capped at [MAX\_MERCURIAL\_SPECIAL\_DEPTH](#max_mercurial_special_depth).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `luckModifier` | `number` | Character's luck modifier |
| `table` | [`MercurialTable`](#mercurialtable) | Mercurial magic table to look up the result |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options |

#### Returns

[`MercurialEffect`](types.md#mercurialeffect)

The mercurial effect

***

### expandMercurialSpecial()

```ts
function expandMercurialSpecial(
   effect: MercurialEffect, 
   luckModifier: number, 
   table: MercurialTable, 
   options?: RollOptions, 
   depth?: number
): MercurialEffect;
```

Defined in: [spells/mercurial.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L146)

Expand a looked-up special (`rollAgain`) effect into its sub-effects.

Useful directly for consumers that resolved an effect via
[lookupMercurialEffect](#lookupmercurialeffect) (e.g. a manual "look up value 99") and
want it expanded with real rolls. No-op (returns the effect unchanged)
when the effect carries no special or is already expanded.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) | `undefined` | A special-carrying effect from `lookupMercurialEffect` |
| `luckModifier` | `number` | `undefined` | Character's luck modifier (applied to sub-rolls) |
| `table` | [`MercurialTable`](#mercurialtable) | `undefined` | The mercurial table to draw sub-effects from |
| `options?` | [`RollOptions`](types.md#rolloptions) | `{}` | Roll options (the roller receives the sub-roll formula) |
| `depth?` | `number` | `0` | Current recursion depth (internal; defaults to 0) |

#### Returns

[`MercurialEffect`](types.md#mercurialeffect)

A combined effect with `subEffects` populated

***

### lookupMercurialEffect()

```ts
function lookupMercurialEffect(roll: number, table: MercurialTable): MercurialEffect;
```

Defined in: [spells/mercurial.ts:188](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L188)

Look up a mercurial effect by roll value.

Pure lookup — a `special` entry is NOT expanded (no roller is available
here); its instruction is copied onto the returned effect so callers can
detect it (`effect.special && !effect.subEffects`) and expand via
[expandMercurialSpecial](#expandmercurialspecial) or their own roll machinery.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `roll` | `number` |
| `table` | [`MercurialTable`](#mercurialtable) |

#### Returns

[`MercurialEffect`](types.md#mercurialeffect)

***

### shouldMercurialTrigger()

```ts
function shouldMercurialTrigger(
   effect: MercurialEffect, 
   natural: number, 
   success: boolean
): boolean;
```

Defined in: [spells/mercurial.ts:240](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L240)

Check if a mercurial effect should trigger based on the spell check result.

A combined (roll-again) effect triggers when ANY of its sub-effects
would trigger — the sub-effects are independent effects that each
apply on their own terms, so callers wanting per-effect precision
should iterate `subEffects` and check each individually.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) | The mercurial effect to check |
| `natural` | `number` | The natural roll on the spell check |
| `success` | `boolean` | Whether the spell check succeeded |

#### Returns

`boolean`

True if the effect should trigger

***

### getMercurialModifier()

```ts
function getMercurialModifier(effect: MercurialEffect): number;
```

Defined in: [spells/mercurial.ts:282](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L282)

Get the spell check modifier from a mercurial effect.
Returns 0 if the effect doesn't provide a modifier.

For a combined (roll-again) effect the sub-effect modifiers are
summed — every sub-effect applies.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) |

#### Returns

`number`

***

### getMercurialDiceModifier()

```ts
function getMercurialDiceModifier(effect: MercurialEffect): string | undefined;
```

Defined in: [spells/mercurial.ts:301](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L301)

Get the dice modifier from a mercurial effect (e.g., "+1d4").
Returns undefined if the effect doesn't provide a dice modifier.

For a combined (roll-again) effect the sub-effect dice modifiers are
concatenated (e.g. "+1d4" and "+1d3" → "+1d4+1d3") — every
sub-effect applies.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) |

#### Returns

`string` \| `undefined`

***

### getMercurialDuration()

```ts
function getMercurialDuration(effect: MercurialEffect): string | undefined;
```

Defined in: [spells/mercurial.ts:330](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L330)

Get the duration adjustment from a mercurial effect.
Returns undefined if the effect doesn't modify duration.

Durations don't combine — for a combined (roll-again) effect this
returns the FIRST sub-effect duration found; iterate `subEffects`
for per-effect durations.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) |

#### Returns

`string` \| `undefined`

***

### getMercurialData()

```ts
function getMercurialData(effect: MercurialEffect): Record<string, unknown> | undefined;
```

Defined in: [spells/mercurial.ts:355](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L355)

Get custom data from a mercurial effect.
Returns undefined if no custom data exists.

Custom data doesn't merge — for a combined (roll-again) effect this
returns the FIRST sub-effect data found; iterate `subEffects` for
per-effect data.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) |

#### Returns

`Record`\<`string`, `unknown`\> \| `undefined`

***

### classifyMercurialEffect()

```ts
function classifyMercurialEffect(effect: MercurialEffect): MercurialClassification;
```

Defined in: [spells/mercurial.ts:393](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L393)

Classify a mercurial effect as beneficial, detrimental, neutral, or mixed.

A combined (roll-again) effect is classified from its sub-effects:
uniformly beneficial/detrimental sub-effects keep that class, any
disagreement (or a mixed sub-effect) is "mixed", and all-neutral
stays "neutral".

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) |

#### Returns

[`MercurialClassification`](#mercurialclassification)

***

### summarizeMercurialEffect()

```ts
function summarizeMercurialEffect(effect: MercurialEffect): string;
```

Defined in: [spells/mercurial.ts:463](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L463)

Get a summary of what the mercurial effect does numerically.

A combined (roll-again) effect summarizes each sub-effect and joins
them with "; ".

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) |

#### Returns

`string`

***

### validateMercurialTable()

```ts
function validateMercurialTable(table: MercurialTable): {
  valid: boolean;
  errors: string[];
};
```

Defined in: [spells/mercurial.ts:514](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L514)

Validate that a mercurial table has no gaps or overlaps.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`MercurialTable`](#mercurialtable) |

#### Returns

```ts
{
  valid: boolean;
  errors: string[];
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `valid` | `boolean` | [spells/mercurial.ts:516](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L516) |
| `errors` | `string`[] | [spells/mercurial.ts:516](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L516) |

***

### getMercurialTableRange()

```ts
function getMercurialTableRange(table: MercurialTable): {
  min: number;
  max: number;
};
```

Defined in: [spells/mercurial.ts:555](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L555)

Get the roll range covered by a mercurial table.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`MercurialTable`](#mercurialtable) |

#### Returns

```ts
{
  min: number;
  max: number;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `min` | `number` | [spells/mercurial.ts:557](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L557) |
| `max` | `number` | [spells/mercurial.ts:557](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L557) |

***

### countMercurialByClassification()

```ts
function countMercurialByClassification(table: MercurialTable): Record<MercurialClassification, number>;
```

Defined in: [spells/mercurial.ts:574](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L574)

Count entries by classification.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`MercurialTable`](#mercurialtable) |

#### Returns

`Record`\<[`MercurialClassification`](#mercurialclassification), `number`\>

***

### createNoMercurialEffect()

```ts
function createNoMercurialEffect(): MercurialEffect;
```

Defined in: [spells/mercurial.ts:610](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L610)

Create a "no effect" mercurial result for spells that don't use mercurial magic.

#### Returns

[`MercurialEffect`](types.md#mercurialeffect)

***

### isMercurialEffectPlaceholder()

```ts
function isMercurialEffectPlaceholder(effect: MercurialEffect): boolean;
```

Defined in: [spells/mercurial.ts:622](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/mercurial.ts#L622)

Check if a mercurial effect is the "no effect" placeholder.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](types.md#mercurialeffect) |

#### Returns

`boolean`

***

### isPatronCast()

```ts
function isPatronCast(spell: SpellDefinition, input: SpellCastInput): boolean;
```

Defined in: [spells/patron-taint-check.ts:48](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/patron-taint-check.ts#L48)

Determine whether a cast counts as a "patron-based spell" for taint-check
purposes. The caller's explicit `isPatronSpell` takes precedence; otherwise
fall back to the spell definition's `tags` array.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spell` | [`SpellDefinition`](types.md#spelldefinition) |
| `input` | [`SpellCastInput`](types.md#spellcastinput) |

#### Returns

`boolean`

***

### effectTriggersTaint()

```ts
function effectTriggersTaint(effect: TableEffect | undefined): boolean;
```

Defined in: [spells/patron-taint-check.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/patron-taint-check.ts#L67)

Detect whether a spell result-table entry's effect marks a patron-taint
outcome. Accepts two content-authoring forms:

  - `effect.type === 'patron-taint'` (primary-effect tagging)
  - `effect.data.patronTaint === true` (flag alongside another primary
    type, e.g. for compound outcomes like "Lost, failure, and patron
    taint" where the entry's primary type may be `lost`)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`TableEffect`](tables.md#tableeffect) \| `undefined` |

#### Returns

`boolean`

***

### rollPatronTaintChanceCheck()

```ts
function rollPatronTaintChanceCheck(currentChance: number, options?: RollOptions): PatronTaintCheckOutcome;
```

Defined in: [spells/patron-taint-check.ts:93](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/patron-taint-check.ts#L93)

Roll the per-cast creeping-chance check. Does NOT apply the acquisition
consequences (chance reset, manifestation roll) — that is the orchestrator's
job, because acquisition may also come from the result-table path and the
two must be merged.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currentChance` | `number` | integer percent (1-100); values below 1 are clamped to 1. |
| `options?` | [`RollOptions`](types.md#rolloptions) | roll options; honors `options.roller` for deterministic tests. |

#### Returns

[`PatronTaintCheckOutcome`](#patrontaintcheckoutcome)

***

### applyPatronTaintAcquisition()

```ts
function applyPatronTaintAcquisition(
   patronId: string, 
   taintTable: SimpleTable | undefined, 
   options: RollOptions, 
   events: SpellEvents | undefined, 
   result: SpellCastResult
): PatronTaintResult | undefined;
```

Defined in: [spells/patron-taint-check.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/patron-taint-check.ts#L110)

Apply patron-taint acquisition consequences. Rolls the manifestation table
when provided, fires the `onPatronTaint` event, and returns the manifestation
result (if any) so the orchestrator can attach it to the spell result.

Intentionally does NOT mutate `patronTaintChance`; the orchestrator computes
`newPatronTaintChance` from merged trigger state (reset-to-1 on acquisition).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `patronId` | `string` |
| `taintTable` | [`SimpleTable`](tables.md#simpletable) \| `undefined` |
| `options` | [`RollOptions`](types.md#rolloptions) |
| `events` | [`SpellEvents`](types.md#spellevents) \| `undefined` |
| `result` | [`SpellCastResult`](types.md#spellcastresult) |

#### Returns

[`PatronTaintResult`](types.md#patrontaintresult) \| `undefined`

***

### getCasterLevel()

```ts
function getCasterLevel(character: Character): number;
```

Defined in: [spells/spell-check.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L115)

Get the caster level from character

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### getCasterProfileFromCharacter()

```ts
function getCasterProfileFromCharacter(character: Character): CasterProfile | undefined;
```

Defined in: [spells/spell-check.ts:122](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L122)

Get the caster profile from character class

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

[`CasterProfile`](types.md#casterprofile) \| `undefined`

***

### getSpellCheckAbility()

```ts
function getSpellCheckAbility(character: Character, profile: CasterProfile): {
  score: number;
  modifier: number;
};
```

Defined in: [spells/spell-check.ts:131](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L131)

Get the spell check ability score and modifier from character

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |
| `profile` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

```ts
{
  score: number;
  modifier: number;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `score` | `number` | [spells/spell-check.ts:134](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L134) |
| `modifier` | `number` | [spells/spell-check.ts:134](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L134) |

***

### getCurrentLuck()

```ts
function getCurrentLuck(character: Character): number;
```

Defined in: [spells/spell-check.ts:144](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L144)

Get current luck from character

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### getStartingLuck()

```ts
function getStartingLuck(character: Character): number;
```

Defined in: [spells/spell-check.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L151)

Get starting luck from character identity

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### getLuckMultiplier()

```ts
function getLuckMultiplier(character: Character): number;
```

Defined in: [spells/spell-check.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L158)

Get luck modifier multiplier from birth augur

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### getDisapprovalRange()

```ts
function getDisapprovalRange(character: Character): number;
```

Defined in: [spells/spell-check.ts:165](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L165)

Get disapproval range for cleric

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### getPatronId()

```ts
function getPatronId(character: Character): string | undefined;
```

Defined in: [spells/spell-check.ts:183](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L183)

Get patron ID for wizard/elf

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`string` \| `undefined`

***

### getSpellbookEntry()

```ts
function getSpellbookEntry(
   character: Character, 
   spellId: string, 
   profile?: CasterProfile
): SpellbookEntry | undefined;
```

Defined in: [spells/spell-check.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L197)

Get spellbook entry for a spell.

When `profile` is supplied, the lookup is restricted to that profile's
classState slot — important for the `profileOverride` flow, where the
character may have a populated spellbook for its actual class but the
caller wants the override's spellbook to take precedence. When omitted,
the historical `wizard ?? cleric ?? elf` walk preserves backward
compatibility for callers that don't know which profile is active.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |
| `spellId` | `string` |
| `profile?` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

[`SpellbookEntry`](types.md#spellbookentry) \| `undefined`

***

### buildSpellCastInput()

```ts
function buildSpellCastInput(
   character: Character, 
   input: SpellCheckInput, 
   profile: CasterProfile
): 
  | SpellCastInput
  | {
  error: string;
};
```

Defined in: [spells/spell-check.ts:224](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L224)

Build the full SpellCastInput from character state and simplified input

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |
| `input` | [`SpellCheckInput`](#spellcheckinput) |
| `profile` | [`CasterProfile`](types.md#casterprofile) |

#### Returns

  \| [`SpellCastInput`](types.md#spellcastinput)
  \| \{
  `error`: `string`;
\}

***

### calculateSpellCheck()

```ts
function calculateSpellCheck(
   character: Character, 
   input: SpellCheckInput, 
   options?: SpellCheckOptions, 
   events?: SpellEvents
): SpellCheckResult;
```

Defined in: [spells/spell-check.ts:340](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L340)

Calculate a complete spell check with all follow-up effects.

This is the main entry point for spell casting. It:
1. Validates the character can cast the spell
2. Builds the full spell check input
3. Performs the spell check roll
4. Handles fumbles (for wizards/elves)
5. Handles corruption (for wizards/elves)
6. Handles disapproval (for clerics)
7. Marks spell as lost if applicable
8. Returns comprehensive result

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character casting the spell |
| `input` | [`SpellCheckInput`](#spellcheckinput) | Simplified spell check input |
| `options?` | [`SpellCheckOptions`](types.md#spellcheckoptions) | Roll options |
| `events?` | [`SpellEvents`](types.md#spellevents) | Event callbacks for UI integration |

#### Returns

[`SpellCheckResult`](#spellcheckresult)

Complete spell check result

***

### isSpellCheckSuccess()

```ts
function isSpellCheckSuccess(result: SpellCheckResult): boolean;
```

Defined in: [spells/spell-check.ts:628](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L628)

Check if a spell check result is successful

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCheckResult`](#spellcheckresult) |

#### Returns

`boolean`

***

### isSpellCheckFailure()

```ts
function isSpellCheckFailure(result: SpellCheckResult): boolean;
```

Defined in: [spells/spell-check.ts:637](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L637)

Check if a spell check result is a failure

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCheckResult`](#spellcheckresult) |

#### Returns

`boolean`

***

### getSpellCheckSummary()

```ts
function getSpellCheckSummary(result: SpellCheckResult): string;
```

Defined in: [spells/spell-check.ts:646](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-check.ts#L646)

Get a summary of the spell check result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCheckResult`](#spellcheckresult) |

#### Returns

`string`

***

### defaultGetComparisonDie()

```ts
function defaultGetComparisonDie(attackerCheck: number, defenderCheck: number): ComparisonDie;
```

Defined in: [spells/spell-duel-tables.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L114)

Default comparison die lookup

This is a fan-made interpretation of spell duel mechanics.
When spell checks are equal, a Phlogiston Disturbance occurs.
Otherwise, the difference determines the die size to roll.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `attackerCheck` | `number` |
| `defenderCheck` | `number` |

#### Returns

[`ComparisonDie`](#comparisondie)

***

### lookupCounterspellPowerEntry()

```ts
function lookupCounterspellPowerEntry(table: CounterspellPowerEntry[], roll: number): CounterspellPowerEntry;
```

Defined in: [spells/spell-duel-tables.ts:434](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L434)

Look up a counterspell power entry by roll value

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`CounterspellPowerEntry`](#counterspellpowerentry)[] |
| `roll` | `number` |

#### Returns

[`CounterspellPowerEntry`](#counterspellpowerentry)

***

### lookupPhlogistonDisturbanceEntry()

```ts
function lookupPhlogistonDisturbanceEntry(table: PhlogistonDisturbanceTable, roll: number): PhlogistonDisturbanceEntry;
```

Defined in: [spells/spell-duel-tables.ts:454](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L454)

Look up a phlogiston disturbance entry by roll value

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`PhlogistonDisturbanceTable`](#phlogistondisturbancetable) |
| `roll` | `number` |

#### Returns

[`PhlogistonDisturbanceEntry`](#phlogistondisturbanceentry)

***

### entryToCounterspellPowerResult()

```ts
function entryToCounterspellPowerResult(
   entry: CounterspellPowerEntry, 
   roll: number, 
   momentumModifier: number, 
   modifiedResult: number
): CounterspellPowerResult;
```

Defined in: [spells/spell-duel-tables.ts:474](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L474)

Convert a counterspell power entry to the full result format

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`CounterspellPowerEntry`](#counterspellpowerentry) |
| `roll` | `number` |
| `momentumModifier` | `number` |
| `modifiedResult` | `number` |

#### Returns

[`CounterspellPowerResult`](#counterspellpowerresult)

***

### entryToPhlogistonDisturbanceResult()

```ts
function entryToPhlogistonDisturbanceResult(entry: PhlogistonDisturbanceEntry, roll: number): PhlogistonDisturbanceResult;
```

Defined in: [spells/spell-duel-tables.ts:496](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel-tables.ts#L496)

Convert a phlogiston disturbance entry to the full result format

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `entry` | [`PhlogistonDisturbanceEntry`](#phlogistondisturbanceentry) |
| `roll` | `number` |

#### Returns

[`PhlogistonDisturbanceResult`](#phlogistondisturbanceresult)

***

### getComparisonDie()

```ts
function getComparisonDie(
   attackerCheck: number, 
   defenderCheck: number, 
   lookupFn?: ComparisonDieLookup
): ComparisonDie;
```

Defined in: [spells/spell-duel.ts:337](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L337)

Table 4-5 lookup - returns the die to roll based on attacker and defender checks

The table is symmetric around the diagonal (where checks are equal = PD)
Distance from diagonal determines the die size

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attackerCheck` | `number` | Attacker's spell check total |
| `defenderCheck` | `number` | Defender's spell check total |
| `lookupFn?` | [`ComparisonDieLookup`](#comparisondielookup) | Optional custom lookup function (for official tables) |

#### Returns

[`ComparisonDie`](#comparisondie)

***

### compareSpellChecks()

```ts
function compareSpellChecks(
   attackerCheck: number, 
   defenderCheck: number, 
   lookupFn?: ComparisonDieLookup
): SpellCheckComparison;
```

Defined in: [spells/spell-duel.ts:353](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L353)

Compare spell checks and determine the die to roll

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attackerCheck` | `number` | Attacker's spell check total |
| `defenderCheck` | `number` | Defender's spell check total |
| `lookupFn?` | [`ComparisonDieLookup`](#comparisondielookup) | Optional custom lookup function (for official tables) |

#### Returns

[`SpellCheckComparison`](#spellcheckcomparison)

***

### rollCounterspellPower()

```ts
function rollCounterspellPower(
   comparisonDie: ComparisonDie, 
   attackerHigh: boolean, 
   momentumDifference: number, 
   roller?: DiceRoller, 
   table?: CounterspellPowerTable
): CounterspellPowerResult;
```

Defined in: [spells/spell-duel.ts:386](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L386)

Table 4-6: Counterspell Power results

Roll is modified by the difference between momentum trackers
If attacker high, use "Attacker High" column
If defender high, use "Defender High" column

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `comparisonDie` | [`ComparisonDie`](#comparisondie) | The die to roll (from Table 4-5) |
| `attackerHigh` | `boolean` | Whether the attacker had the higher spell check |
| `momentumDifference` | `number` | Absolute difference between momentum trackers |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Optional dice roller |
| `table?` | [`CounterspellPowerTable`](#counterspellpowertable) | Optional custom table data (for official tables) |

#### Returns

[`CounterspellPowerResult`](#counterspellpowerresult)

***

### rollPhlogistonDisturbance()

```ts
function rollPhlogistonDisturbance(roller?: DiceRoller, table?: PhlogistonDisturbanceTable): PhlogistonDisturbanceResult;
```

Defined in: [spells/spell-duel.ts:429](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L429)

Roll on Table 4-7: Phlogiston Disturbance

This occurs when both spell checks are identical
Dangerous magical effects can occur

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Optional dice roller |
| `table?` | [`PhlogistonDisturbanceTable`](#phlogistondisturbancetable) | Optional custom table data (for official tables) |

#### Returns

[`PhlogistonDisturbanceResult`](#phlogistondisturbanceresult)

***

### createSpellDuelState()

```ts
function createSpellDuelState(participants: {
  id: string;
  name: string;
  casterType: SpellDuelCasterType;
  initiative: number;
  patron?: string;
}[]): SpellDuelState;
```

Defined in: [spells/spell-duel.ts:453](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L453)

Create initial spell duel state

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `participants` | \{ `id`: `string`; `name`: `string`; `casterType`: [`SpellDuelCasterType`](#spellduelcastertype); `initiative`: `number`; `patron?`: `string`; \}[] |

#### Returns

[`SpellDuelState`](#spellduelstate)

***

### createSpellDuelParticipant()

```ts
function createSpellDuelParticipant(
   id: string, 
   name: string, 
   casterType: SpellDuelCasterType, 
   initiative: number, 
   patron?: string
): SpellDuelParticipant;
```

Defined in: [spells/spell-duel.ts:475](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L475)

Create a spell duel participant

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |
| `name` | `string` |
| `casterType` | [`SpellDuelCasterType`](#spellduelcastertype) |
| `initiative` | `number` |
| `patron?` | `string` |

#### Returns

[`SpellDuelParticipant`](#spellduelparticipant)

***

### checkSpellLostInDuel()

```ts
function checkSpellLostInDuel(
   _naturalRoll: number, 
   total: number, 
   spellLevel: number
): boolean;
```

Defined in: [spells/spell-duel.ts:495](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L495)

Determine if a spell is lost based on the initial check (spell duel context)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_naturalRoll` | `number` |
| `total` | `number` |
| `spellLevel` | `number` |

#### Returns

`boolean`

***

### canCounter()

```ts
function canCounter(attackSpell: SpellDuelSpell, counterSpell: SpellDuelSpell): boolean;
```

Defined in: [spells/spell-duel.ts:513](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L513)

Check if a defending spell can counter an attacking spell

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `attackSpell` | [`SpellDuelSpell`](#spellduelspell) |
| `counterSpell` | [`SpellDuelSpell`](#spellduelspell) |

#### Returns

`boolean`

***

### isSamePatronInvocation()

```ts
function isSamePatronInvocation(attackSpell: SpellDuelSpell, counterSpell: SpellDuelSpell): boolean;
```

Defined in: [spells/spell-duel.ts:555](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L555)

Check if two invoke patron spells are for the same patron (auto-cancel)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `attackSpell` | [`SpellDuelSpell`](#spellduelspell) |
| `counterSpell` | [`SpellDuelSpell`](#spellduelspell) |

#### Returns

`boolean`

***

### makeSpellDuelCheck()

```ts
function makeSpellDuelCheck(
   spell: SpellDuelSpell, 
   casterId: string, 
   spellCheckBonus: number, 
   roller?: DiceRoller
): SpellDuelCheck;
```

Defined in: [spells/spell-duel.ts:577](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L577)

Make a spell check for a duel participant

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spell` | [`SpellDuelSpell`](#spellduelspell) |
| `casterId` | `string` |
| `spellCheckBonus` | `number` |
| `roller?` | [`DiceRoller`](types.md#diceroller) |

#### Returns

[`SpellDuelCheck`](#spellduelcheck)

***

### resolveCounterspellExchange()

```ts
function resolveCounterspellExchange(
   state: SpellDuelState, 
   attackerId: string, 
   defenderId: string, 
   attackerCheck: SpellDuelCheck, 
   defenderCheck: SpellDuelCheck, 
   rollerOrOptions?: 
  | DiceRoller
  | ResolveExchangeOptions
): CounterspellExchangeResult;
```

Defined in: [spells/spell-duel.ts:622](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L622)

Resolve a counterspell exchange between attacker and defender

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | [`SpellDuelState`](#spellduelstate) | Current spell duel state |
| `attackerId` | `string` | ID of the attacking caster |
| `defenderId` | `string` | ID of the defending caster |
| `attackerCheck` | [`SpellDuelCheck`](#spellduelcheck) | Attacker's spell check result |
| `defenderCheck` | [`SpellDuelCheck`](#spellduelcheck) | Defender's spell check result |
| `rollerOrOptions?` | \| [`DiceRoller`](types.md#diceroller) \| [`ResolveExchangeOptions`](#resolveexchangeoptions) | Either a dice roller or options object |

#### Returns

[`CounterspellExchangeResult`](#counterspellexchangeresult)

***

### applyExchangeResult()

```ts
function applyExchangeResult(state: SpellDuelState, result: CounterspellExchangeResult): SpellDuelState;
```

Defined in: [spells/spell-duel.ts:737](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L737)

Apply a counterspell exchange result to update the duel state

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`SpellDuelState`](#spellduelstate) |
| `result` | [`CounterspellExchangeResult`](#counterspellexchangeresult) |

#### Returns

[`SpellDuelState`](#spellduelstate)

***

### getInitiativeOrder()

```ts
function getInitiativeOrder(state: SpellDuelState): SpellDuelParticipant[];
```

Defined in: [spells/spell-duel.ts:761](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L761)

Get participants sorted by initiative (highest first)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`SpellDuelState`](#spellduelstate) |

#### Returns

[`SpellDuelParticipant`](#spellduelparticipant)[]

***

### canCounterspellByInitiative()

```ts
function canCounterspellByInitiative(
   state: SpellDuelState, 
   attackerId: string, 
   defenderId: string
): boolean;
```

Defined in: [spells/spell-duel.ts:769](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L769)

Check if a participant can counterspell based on initiative
A caster can only counterspell someone with higher initiative

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`SpellDuelState`](#spellduelstate) |
| `attackerId` | `string` |
| `defenderId` | `string` |

#### Returns

`boolean`

***

### formatSpellDuelCheck()

```ts
function formatSpellDuelCheck(check: SpellDuelCheck): string;
```

Defined in: [spells/spell-duel.ts:792](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L792)

Format a spell duel check result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `check` | [`SpellDuelCheck`](#spellduelcheck) |

#### Returns

`string`

***

### formatExchangeResult()

```ts
function formatExchangeResult(
   result: CounterspellExchangeResult, 
   attackerName: string, 
   defenderName: string
): string;
```

Defined in: [spells/spell-duel.ts:801](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L801)

Format a counterspell exchange result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`CounterspellExchangeResult`](#counterspellexchangeresult) |
| `attackerName` | `string` |
| `defenderName` | `string` |

#### Returns

`string`

***

### formatSpellDuelState()

```ts
function formatSpellDuelState(state: SpellDuelState): string;
```

Defined in: [spells/spell-duel.ts:856](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spell-duel.ts#L856)

Format the current state of a spell duel

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`SpellDuelState`](#spellduelstate) |

#### Returns

`string`

***

### findSpellEntry()

```ts
function findSpellEntry(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, spellId: string): SpellbookEntry | undefined;
```

Defined in: [spells/spellbook.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L88)

Find a spell entry in a spellbook by ID

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |

#### Returns

[`SpellbookEntry`](types.md#spellbookentry) \| `undefined`

***

### knowsSpell()

```ts
function knowsSpell(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, spellId: string): boolean;
```

Defined in: [spells/spellbook.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L100)

Check if a spell is known

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |

#### Returns

`boolean`

***

### isSpellLost()

```ts
function isSpellLost(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, spellId: string): boolean;
```

Defined in: [spells/spellbook.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L110)

Check if a spell is currently lost (for the day)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |

#### Returns

`boolean`

***

### getSpellCountAtLevel()

```ts
function getSpellCountAtLevel(
   spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, 
   spells: readonly {
  id: string;
  name: string;
  description?: string;
  level: number;
  casterTypes: readonly CasterType[];
  range?: string;
  duration?: string;
  castingTime?: string;
  save?: "reflex" | "fortitude" | "will" | "none";
  tags?: readonly string[];
  source?: string;
  resultTableId?: string;
  results?: readonly {
     min: number;
     max?: number;
     tier: ResultTier;
     text: string;
     effect?: {
        type: string;
        dice?: string;
        value?: number;
        duration?: string;
        target?: string;
        data?: {
         [key: string]: unknown;
        };
     };
     lost?: boolean;
     corruption?: boolean;
     disapproval?: boolean;
     manifestation?: string;
  }[];
  manifestationTableId?: string;
}[], 
   level: number
): number;
```

Defined in: [spells/spellbook.ts:121](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L121)

Get count of spells known at a specific level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spells` | readonly \{ `id`: `string`; `name`: `string`; `description?`: `string`; `level`: `number`; `casterTypes`: readonly [`CasterType`](types.md#castertype)[]; `range?`: `string`; `duration?`: `string`; `castingTime?`: `string`; `save?`: `"reflex"` \| `"fortitude"` \| `"will"` \| `"none"`; `tags?`: readonly `string`[]; `source?`: `string`; `resultTableId?`: `string`; `results?`: readonly \{ `min`: `number`; `max?`: `number`; `tier`: [`ResultTier`](tables.md#resulttier); `text`: `string`; `effect?`: \{ `type`: `string`; `dice?`: `string`; `value?`: `number`; `duration?`: `string`; `target?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `lost?`: `boolean`; `corruption?`: `boolean`; `disapproval?`: `boolean`; `manifestation?`: `string`; \}[]; `manifestationTableId?`: `string`; \}[] | - |
| `level` | `number` | - |

#### Returns

`number`

***

### getSpellsAtLevel()

```ts
function getSpellsAtLevel(
   spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, 
   spells: readonly {
  id: string;
  name: string;
  description?: string;
  level: number;
  casterTypes: readonly CasterType[];
  range?: string;
  duration?: string;
  castingTime?: string;
  save?: "reflex" | "fortitude" | "will" | "none";
  tags?: readonly string[];
  source?: string;
  resultTableId?: string;
  results?: readonly {
     min: number;
     max?: number;
     tier: ResultTier;
     text: string;
     effect?: {
        type: string;
        dice?: string;
        value?: number;
        duration?: string;
        target?: string;
        data?: {
         [key: string]: unknown;
        };
     };
     lost?: boolean;
     corruption?: boolean;
     disapproval?: boolean;
     manifestation?: string;
  }[];
  manifestationTableId?: string;
}[], 
   level: number
): SpellbookEntry[];
```

Defined in: [spells/spellbook.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L135)

Get all spell entries at a specific level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spells` | readonly \{ `id`: `string`; `name`: `string`; `description?`: `string`; `level`: `number`; `casterTypes`: readonly [`CasterType`](types.md#castertype)[]; `range?`: `string`; `duration?`: `string`; `castingTime?`: `string`; `save?`: `"reflex"` \| `"fortitude"` \| `"will"` \| `"none"`; `tags?`: readonly `string`[]; `source?`: `string`; `resultTableId?`: `string`; `results?`: readonly \{ `min`: `number`; `max?`: `number`; `tier`: [`ResultTier`](tables.md#resulttier); `text`: `string`; `effect?`: \{ `type`: `string`; `dice?`: `string`; `value?`: `number`; `duration?`: `string`; `target?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `lost?`: `boolean`; `corruption?`: `boolean`; `disapproval?`: `boolean`; `manifestation?`: `string`; \}[]; `manifestationTableId?`: `string`; \}[] | - |
| `level` | `number` | - |

#### Returns

[`SpellbookEntry`](types.md#spellbookentry)[]

***

### getLostSpells()

```ts
function getLostSpells(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}): SpellbookEntry[];
```

Defined in: [spells/spellbook.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L151)

Get all lost spells

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |

#### Returns

[`SpellbookEntry`](types.md#spellbookentry)[]

***

### getCastableSpells()

```ts
function getCastableSpells(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}): SpellbookEntry[];
```

Defined in: [spells/spellbook.ts:162](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L162)

Get all castable (not lost) spells from a spellbook

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |

#### Returns

[`SpellbookEntry`](types.md#spellbookentry)[]

***

### canLearnSpell()

```ts
function canLearnSpell(
   spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, 
   spell: {
  id: string;
  name: string;
  description?: string;
  level: number;
  casterTypes: readonly CasterType[];
  range?: string;
  duration?: string;
  castingTime?: string;
  save?: "reflex" | "fortitude" | "will" | "none";
  tags?: readonly string[];
  source?: string;
  resultTableId?: string;
  results?: readonly {
     min: number;
     max?: number;
     tier: ResultTier;
     text: string;
     effect?: {
        type: string;
        dice?: string;
        value?: number;
        duration?: string;
        target?: string;
        data?: {
         [key: string]: unknown;
        };
     };
     lost?: boolean;
     corruption?: boolean;
     disapproval?: boolean;
     manifestation?: string;
  }[];
  manifestationTableId?: string;
}, 
   casterType: CasterType, 
   allSpells: readonly {
  id: string;
  name: string;
  description?: string;
  level: number;
  casterTypes: readonly CasterType[];
  range?: string;
  duration?: string;
  castingTime?: string;
  save?: "reflex" | "fortitude" | "will" | "none";
  tags?: readonly string[];
  source?: string;
  resultTableId?: string;
  results?: readonly {
     min: number;
     max?: number;
     tier: ResultTier;
     text: string;
     effect?: {
        type: string;
        dice?: string;
        value?: number;
        duration?: string;
        target?: string;
        data?: {
         [key: string]: unknown;
        };
     };
     lost?: boolean;
     corruption?: boolean;
     disapproval?: boolean;
     manifestation?: string;
  }[];
  manifestationTableId?: string;
}[]
): CanLearnResult;
```

Defined in: [spells/spellbook.ts:188](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L188)

Check if a character can learn a specific spell

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spell` | \{ `id`: `string`; `name`: `string`; `description?`: `string`; `level`: `number`; `casterTypes`: readonly [`CasterType`](types.md#castertype)[]; `range?`: `string`; `duration?`: `string`; `castingTime?`: `string`; `save?`: `"reflex"` \| `"fortitude"` \| `"will"` \| `"none"`; `tags?`: readonly `string`[]; `source?`: `string`; `resultTableId?`: `string`; `results?`: readonly \{ `min`: `number`; `max?`: `number`; `tier`: [`ResultTier`](tables.md#resulttier); `text`: `string`; `effect?`: \{ `type`: `string`; `dice?`: `string`; `value?`: `number`; `duration?`: `string`; `target?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `lost?`: `boolean`; `corruption?`: `boolean`; `disapproval?`: `boolean`; `manifestation?`: `string`; \}[]; `manifestationTableId?`: `string`; \} | - |
| `spell.id` | `string` | Unique identifier (e.g., "magic-missile", "bless") |
| `spell.name` | `string` | Display name |
| `spell.description?` | `string` | Full description |
| `spell.level` | `number` | Spell level (1-5 for wizards, 1-5 for clerics) |
| `spell.casterTypes` | readonly [`CasterType`](types.md#castertype)[] | Which caster types can use this spell |
| `spell.range?` | `string` | Range description |
| `spell.duration?` | `string` | Duration description |
| `spell.castingTime?` | `string` | Casting time description |
| `spell.save?` | `"reflex"` \| `"fortitude"` \| `"will"` \| `"none"` | Save type if applicable |
| `spell.tags?` | readonly `string`[] | General/school/type tags for filtering |
| `spell.source?` | `string` | Source reference (e.g., "DCC Core Rules p.XXX") |
| `spell.resultTableId?` | `string` | Result table ID for looking up spell results. If undefined, use inline `results` array. |
| `spell.results?` | readonly \{ `min`: `number`; `max?`: `number`; `tier`: [`ResultTier`](tables.md#resulttier); `text`: `string`; `effect?`: \{ `type`: `string`; `dice?`: `string`; `value?`: `number`; `duration?`: `string`; `target?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `lost?`: `boolean`; `corruption?`: `boolean`; `disapproval?`: `boolean`; `manifestation?`: `string`; \}[] | Inline tiered results (alternative to resultTableId). Simpler spells can embed results directly. |
| `spell.manifestationTableId?` | `string` | Manifestation table ID (optional) |
| `casterType` | [`CasterType`](types.md#castertype) | - |
| `allSpells` | readonly \{ `id`: `string`; `name`: `string`; `description?`: `string`; `level`: `number`; `casterTypes`: readonly [`CasterType`](types.md#castertype)[]; `range?`: `string`; `duration?`: `string`; `castingTime?`: `string`; `save?`: `"reflex"` \| `"fortitude"` \| `"will"` \| `"none"`; `tags?`: readonly `string`[]; `source?`: `string`; `resultTableId?`: `string`; `results?`: readonly \{ `min`: `number`; `max?`: `number`; `tier`: [`ResultTier`](tables.md#resulttier); `text`: `string`; `effect?`: \{ `type`: `string`; `dice?`: `string`; `value?`: `number`; `duration?`: `string`; `target?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `lost?`: `boolean`; `corruption?`: `boolean`; `disapproval?`: `boolean`; `manifestation?`: `string`; \}[]; `manifestationTableId?`: `string`; \}[] | - |

#### Returns

[`CanLearnResult`](#canlearnresult)

***

### addSpellToSpellbook()

```ts
function addSpellToSpellbook(
   spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, 
   spell: {
  id: string;
  name: string;
  description?: string;
  level: number;
  casterTypes: readonly CasterType[];
  range?: string;
  duration?: string;
  castingTime?: string;
  save?: "reflex" | "fortitude" | "will" | "none";
  tags?: readonly string[];
  source?: string;
  resultTableId?: string;
  results?: readonly {
     min: number;
     max?: number;
     tier: ResultTier;
     text: string;
     effect?: {
        type: string;
        dice?: string;
        value?: number;
        duration?: string;
        target?: string;
        data?: {
         [key: string]: unknown;
        };
     };
     lost?: boolean;
     corruption?: boolean;
     disapproval?: boolean;
     manifestation?: string;
  }[];
  manifestationTableId?: string;
}, 
   mercurialEffect?: MercurialEffect, 
   manifestation?: string
): Spellbook;
```

Defined in: [spells/spellbook.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L232)

Add a spell to a spellbook.
Returns a new spellbook with the spell added.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spell` | \{ `id`: `string`; `name`: `string`; `description?`: `string`; `level`: `number`; `casterTypes`: readonly [`CasterType`](types.md#castertype)[]; `range?`: `string`; `duration?`: `string`; `castingTime?`: `string`; `save?`: `"reflex"` \| `"fortitude"` \| `"will"` \| `"none"`; `tags?`: readonly `string`[]; `source?`: `string`; `resultTableId?`: `string`; `results?`: readonly \{ `min`: `number`; `max?`: `number`; `tier`: [`ResultTier`](tables.md#resulttier); `text`: `string`; `effect?`: \{ `type`: `string`; `dice?`: `string`; `value?`: `number`; `duration?`: `string`; `target?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `lost?`: `boolean`; `corruption?`: `boolean`; `disapproval?`: `boolean`; `manifestation?`: `string`; \}[]; `manifestationTableId?`: `string`; \} | - |
| `spell.id` | `string` | Unique identifier (e.g., "magic-missile", "bless") |
| `spell.name` | `string` | Display name |
| `spell.description?` | `string` | Full description |
| `spell.level` | `number` | Spell level (1-5 for wizards, 1-5 for clerics) |
| `spell.casterTypes` | readonly [`CasterType`](types.md#castertype)[] | Which caster types can use this spell |
| `spell.range?` | `string` | Range description |
| `spell.duration?` | `string` | Duration description |
| `spell.castingTime?` | `string` | Casting time description |
| `spell.save?` | `"reflex"` \| `"fortitude"` \| `"will"` \| `"none"` | Save type if applicable |
| `spell.tags?` | readonly `string`[] | General/school/type tags for filtering |
| `spell.source?` | `string` | Source reference (e.g., "DCC Core Rules p.XXX") |
| `spell.resultTableId?` | `string` | Result table ID for looking up spell results. If undefined, use inline `results` array. |
| `spell.results?` | readonly \{ `min`: `number`; `max?`: `number`; `tier`: [`ResultTier`](tables.md#resulttier); `text`: `string`; `effect?`: \{ `type`: `string`; `dice?`: `string`; `value?`: `number`; `duration?`: `string`; `target?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `lost?`: `boolean`; `corruption?`: `boolean`; `disapproval?`: `boolean`; `manifestation?`: `string`; \}[] | Inline tiered results (alternative to resultTableId). Simpler spells can embed results directly. |
| `spell.manifestationTableId?` | `string` | Manifestation table ID (optional) |
| `mercurialEffect?` | [`MercurialEffect`](types.md#mercurialeffect) | - |
| `manifestation?` | `string` | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### removeSpellFromSpellbook()

```ts
function removeSpellFromSpellbook(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, spellId: string): Spellbook;
```

Defined in: [spells/spellbook.ts:271](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L271)

Remove a spell from a spellbook.
Returns a new spellbook with the spell removed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### markSpellLost()

```ts
function markSpellLost(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, spellId: string): Spellbook;
```

Defined in: [spells/spellbook.ts:292](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L292)

Mark a spell as lost for the day.
Returns a new spellbook with the spell marked as lost.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### markSpellRecovered()

```ts
function markSpellRecovered(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, spellId: string): Spellbook;
```

Defined in: [spells/spellbook.ts:316](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L316)

Mark a spell as recovered (no longer lost).
Returns a new spellbook with the spell marked as available.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### recoverAllSpells()

```ts
function recoverAllSpells(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}): Spellbook;
```

Defined in: [spells/spellbook.ts:340](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L340)

Recover all lost spells (after rest/prayer).
Returns a new spellbook with all spells marked as available.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### updateSpellLastResult()

```ts
function updateSpellLastResult(
   spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, 
   spellId: string, 
   result: number
): Spellbook;
```

Defined in: [spells/spellbook.ts:361](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L361)

Update the last result for a spell (for GM adjustment feature).
Returns a new spellbook with the result recorded.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |
| `result` | `number` | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### updateSpellNotes()

```ts
function updateSpellNotes(
   spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, 
   spellId: string, 
   notes: string | undefined
): Spellbook;
```

Defined in: [spells/spellbook.ts:386](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L386)

Update notes for a spell.
Returns a new spellbook with updated notes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |
| `notes` | `string` \| `undefined` | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### setSpellLimits()

```ts
function setSpellLimits(spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, limits: Partial<Record<number, number>>): Spellbook;
```

Defined in: [spells/spellbook.ts:417](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L417)

Set the maximum spells per level limits.
Returns a new spellbook with updated limits.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `limits` | `Partial`\<`Record`\<`number`, `number`\>\> | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### updateMercurialEffect()

```ts
function updateMercurialEffect(
   spellbook: {
  spells: readonly {
     spellId: string;
     learnedAt?: string;
     lost: boolean;
     mercurialEffect?: {
        rollValue: number;
        summary: string;
        description: string;
        displayOnCast: boolean;
        effect?: {
           type: string;
           modifier?: number;
           dice?: string;
           trigger?: MercurialTrigger;
           duration?: string;
           data?: {
            [key: string]: unknown;
           };
        };
        special?: {
           action: "rollAgain";
           count: number;
           formula?: string;
        };
        subEffects?: readonly { readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: { readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: { ...; }; }; readonly ...[];
     };
     manifestation?: string;
     lastResult?: number;
     notes?: string;
  }[];
  maxSpellsPerLevel?: {
   [key: number]: number | undefined;
  };
}, 
   spellId: string, 
   mercurialEffect: MercurialEffect | undefined
): Spellbook;
```

Defined in: [spells/spellbook.ts:431](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellbook.ts#L431)

Update a spell's mercurial effect.
Returns a new spellbook with updated mercurial effect.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellbook` | \{ `spells`: readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[]; `maxSpellsPerLevel?`: \{ \[`key`: `number`\]: `number` \| `undefined`; \}; \} | - |
| `spellbook.spells` | readonly \{ `spellId`: `string`; `learnedAt?`: `string`; `lost`: `boolean`; `mercurialEffect?`: \{ `rollValue`: `number`; `summary`: `string`; `description`: `string`; `displayOnCast`: `boolean`; `effect?`: \{ `type`: `string`; `modifier?`: `number`; `dice?`: `string`; `trigger?`: [`MercurialTrigger`](types.md#mercurialtrigger); `duration?`: `string`; `data?`: \{ \[`key`: `string`\]: `unknown`; \}; \}; `special?`: \{ `action`: `"rollAgain"`; `count`: `number`; `formula?`: `string`; \}; `subEffects?`: readonly \{ readonly rollValue: number; readonly summary: string; readonly description: string; readonly displayOnCast: boolean; readonly effect?: \{ readonly type: string; readonly modifier?: number; readonly dice?: string; readonly trigger?: MercurialTrigger; readonly duration?: string; readonly data?: \{ ...; \}; \}; readonly ...[]; \}; `manifestation?`: `string`; `lastResult?`: `number`; `notes?`: `string`; \}[] | All known spells |
| `spellbook.maxSpellsPerLevel?` | \{ \[`key`: `number`\]: `number` \| `undefined`; \} | Maximum spells known per level (from class/level progression) |
| `spellId` | `string` | - |
| `mercurialEffect` | [`MercurialEffect`](types.md#mercurialeffect) \| `undefined` | - |

#### Returns

[`Spellbook`](types.md#spellbook-3)

***

### validateSpellburn()

```ts
function validateSpellburn(abilities: AbilityScores, commitment: SpellburnCommitment): SpellburnValidationResult;
```

Defined in: [spells/spellburn.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L42)

Validate that a spellburn commitment is possible given current ability scores.

Rules:
- Cannot burn more than the current score (a physical ability may be
  burned all the way to 0). Per DCC RAW this is permitted and is
  potentially lethal — e.g. burning Stamina to 0 kills the caster.
- Can only burn from STR, AGL, STA
- Total burn must be positive to have any effect

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) |
| `commitment` | [`SpellburnCommitment`](types.md#spellburncommitment) |

#### Returns

[`SpellburnValidationResult`](#spellburnvalidationresult)

***

### getMaxSpellburn()

```ts
function getMaxSpellburn(abilities: AbilityScores): SpellburnCommitment;
```

Defined in: [spells/spellburn.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L96)

Get the maximum spellburn possible for each ability

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) |

#### Returns

[`SpellburnCommitment`](types.md#spellburncommitment)

***

### getTotalMaxSpellburn()

```ts
function getTotalMaxSpellburn(abilities: AbilityScores): number;
```

Defined in: [spells/spellburn.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L109)

Get total maximum spellburn across all abilities

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) |

#### Returns

`number`

***

### applySpellburn()

```ts
function applySpellburn(abilities: AbilityScores, commitment: SpellburnCommitment): AbilityScores;
```

Defined in: [spells/spellburn.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L124)

Apply spellburn to ability scores.
Returns new ability scores with reduced current values.

Note: This function does NOT validate - call validateSpellburn first.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) |
| `commitment` | [`SpellburnCommitment`](types.md#spellburncommitment) |

#### Returns

[`AbilityScores`](types.md#abilityscores-1)

***

### recoverSpellburn()

```ts
function recoverSpellburn(abilities: AbilityScores, pointsPerAbility?: number): AbilityScores;
```

Defined in: [spells/spellburn.ts:162](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L162)

Recover spellburn damage (1 point per day per ability).
Returns new ability scores with recovered values.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) | `undefined` |
| `pointsPerAbility?` | `number` | `1` |

#### Returns

[`AbilityScores`](types.md#abilityscores-1)

***

### fullyRecoverSpellburn()

```ts
function fullyRecoverSpellburn(abilities: AbilityScores): AbilityScores;
```

Defined in: [spells/spellburn.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L194)

Fully recover all spellburn damage.
Restores all physical abilities to their max values.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) |

#### Returns

[`AbilityScores`](types.md#abilityscores-1)

***

### getSpellburnDamage()

```ts
function getSpellburnDamage(abilities: AbilityScores): SpellburnCommitment;
```

Defined in: [spells/spellburn.ts:208](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L208)

Get the current spellburn damage (difference between max and current).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) |

#### Returns

[`SpellburnCommitment`](types.md#spellburncommitment)

***

### hasSpellburnDamage()

```ts
function hasSpellburnDamage(abilities: AbilityScores): boolean;
```

Defined in: [spells/spellburn.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/spells/spellburn.ts#L219)

Check if any spellburn damage remains

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | [`AbilityScores`](types.md#abilityscores-1) |

#### Returns

`boolean`
