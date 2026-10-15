# cleric

## Interfaces

### DivineAidInput

Defined in: [cleric/divine-aid.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L73)

Input for a Divine Aid check

#### Properties

##### level

```ts
level: number;
```

Defined in: [cleric/divine-aid.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L75)

Cleric's level

##### personality

```ts
personality: number;
```

Defined in: [cleric/divine-aid.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L78)

Cleric's Personality score

##### disapprovalRange

```ts
disapprovalRange: number;
```

Defined in: [cleric/divine-aid.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L81)

Current disapproval range

##### luck?

```ts
optional luck?: number;
```

Defined in: [cleric/divine-aid.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L84)

Optional luck score (for burning)

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [cleric/divine-aid.ts:87](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L87)

Luck points to burn on this roll

##### situationalModifiers?

```ts
optional situationalModifiers?: RollModifier[];
```

Defined in: [cleric/divine-aid.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L90)

Situational modifiers

##### requestType?

```ts
optional requestType?: AidRequestType;
```

Defined in: [cleric/divine-aid.ts:93](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L93)

Type of aid being requested

##### requestDescription?

```ts
optional requestDescription?: string;
```

Defined in: [cleric/divine-aid.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L96)

Specific description of requested aid

##### aidSpellLevel?

```ts
optional aidSpellLevel?: number;
```

Defined in: [cleric/divine-aid.ts:99](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L99)

Spell level equivalent of requested aid (affects DC)

***

### DivineAidEffect

Defined in: [cleric/divine-aid.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L115)

Structured Divine Aid effect data

#### Properties

##### type

```ts
type: DivineAidEffectType;
```

Defined in: [cleric/divine-aid.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L117)

Type of aid granted

##### spellLevelEquivalent?

```ts
optional spellLevelEquivalent?: number;
```

Defined in: [cleric/divine-aid.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L120)

Equivalent spell level of aid granted

##### duration?

```ts
optional duration?: string;
```

Defined in: [cleric/divine-aid.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L123)

Duration of the aid effect

##### requestGranted?

```ts
optional requestGranted?: boolean;
```

Defined in: [cleric/divine-aid.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L126)

Whether the deity granted the specific request

##### aidDescription?

```ts
optional aidDescription?: string;
```

Defined in: [cleric/divine-aid.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L129)

Description of the aid provided

***

### DivineAidResult

Defined in: [cleric/divine-aid.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L135)

Result of a Divine Aid check

#### Properties

##### check

```ts
check: SkillCheckResult;
```

Defined in: [cleric/divine-aid.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L137)

The skill check result

##### success

```ts
success: boolean;
```

Defined in: [cleric/divine-aid.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L140)

Whether the divine aid was successful

##### natural

```ts
natural: number;
```

Defined in: [cleric/divine-aid.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L143)

The natural die roll (for disapproval check)

##### description

```ts
description: string;
```

Defined in: [cleric/divine-aid.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L146)

Description of the result

##### effect

```ts
effect: DivineAidEffect;
```

Defined in: [cleric/divine-aid.ts:149](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L149)

Structured effect data

##### disapprovalTriggered

```ts
disapprovalTriggered: boolean;
```

Defined in: [cleric/divine-aid.ts:152](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L152)

Whether disapproval was triggered

##### newDisapprovalRange

```ts
newDisapprovalRange: number;
```

Defined in: [cleric/divine-aid.ts:155](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L155)

New disapproval range (if increased)

##### tableEffect?

```ts
optional tableEffect?: TableEffect;
```

Defined in: [cleric/divine-aid.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L158)

The raw table effect (if available)

***

### LayOnHandsTarget

Defined in: [cleric/lay-on-hands.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L60)

#### Properties

##### hitDie

```ts
hitDie: `d${number}`;
```

Defined in: [cleric/lay-on-hands.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L62)

Target's hit die (d4, d6, d8, d10, d12). Dice type for HP healing.

##### hitDice

```ts
hitDice: number;
```

Defined in: [cleric/lay-on-hands.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L64)

Target's hit dice or class level. Caps the dice count when healing HP.

***

### LayOnHandsInput

Defined in: [cleric/lay-on-hands.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L69)

#### Properties

##### level

```ts
level: number;
```

Defined in: [cleric/lay-on-hands.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L71)

Cleric level

##### personality

```ts
personality: number;
```

Defined in: [cleric/lay-on-hands.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L73)

Cleric Personality score

##### alignment

```ts
alignment: LayOnHandsAlignment;
```

Defined in: [cleric/lay-on-hands.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L75)

Cleric–subject alignment relationship

##### target

```ts
target: LayOnHandsTarget;
```

Defined in: [cleric/lay-on-hands.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L77)

Healing target (HD type + HD count for the cap)

##### healingCondition?

```ts
optional healingCondition?: string;
```

Defined in: [cleric/lay-on-hands.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L84)

If set, heal a condition instead of HP. The value is a condition id
matched against `LayOnHandsTable.conditions` thresholds. RAW examples:
"broken-limb", "organ-damage", "disease", "paralysis", "poison",
"blindness". Declared BEFORE rolling per RAW.

##### luck?

```ts
optional luck?: number;
```

Defined in: [cleric/lay-on-hands.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L86)

Optional Luck score

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [cleric/lay-on-hands.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L88)

Luck points burned on this check

##### healingDiceMode?

```ts
optional healingDiceMode?: LayOnHandsHealingDiceMode;
```

Defined in: [cleric/lay-on-hands.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L95)

How HP healing dice are rolled. "raw" (default) rolls only the capped
dice. "keep-highest" (house rule) rolls every die the table grants and
keeps the highest `min(rawDiceCount, target.hitDice)`. Ignored for
condition healing.

##### situationalModifiers?

```ts
optional situationalModifiers?: RollModifier[];
```

Defined in: [cleric/lay-on-hands.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L97)

Extra situational modifiers on the spell check (NOT alignment)

***

### LayOnHandsResult

Defined in: [cleric/lay-on-hands.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L100)

#### Properties

##### check

```ts
check: SkillCheckResult;
```

Defined in: [cleric/lay-on-hands.ts:102](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L102)

The underlying spell-check roll

##### success

```ts
success: boolean;
```

Defined in: [cleric/lay-on-hands.ts:104](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L104)

True if at least 1 die was granted (check total met the minimum row)

##### rawDiceCount

```ts
rawDiceCount: number;
```

Defined in: [cleric/lay-on-hands.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L106)

Dice count from the (total, alignment) lookup, before HP cap

##### diceCount

```ts
diceCount: number;
```

Defined in: [cleric/lay-on-hands.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L108)

Dice actually rolled — min(rawDiceCount, target.hitDice) for HP; rawDiceCount for conditions

##### hpHealed?

```ts
optional hpHealed?: number;
```

Defined in: [cleric/lay-on-hands.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L110)

HP restored (only when healing HP, not conditions)

##### healingRolls?

```ts
optional healingRolls?: number[];
```

Defined in: [cleric/lay-on-hands.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L116)

Individual healing die results, in roll order ("keep-highest" mode only:
all `rawDiceCount` dice are rolled one at a time so the kept ones can be
chosen). The kept dice are `keptHealingRolls`.

##### keptHealingRolls?

```ts
optional keptHealingRolls?: number[];
```

Defined in: [cleric/lay-on-hands.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L118)

The dice that counted toward `hpHealed` ("keep-highest" mode only), highest first

##### condition?

```ts
optional condition?: {
  id: string;
  cured: boolean;
  threshold: number;
};
```

Defined in: [cleric/lay-on-hands.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L120)

If condition healing was requested, the id, and whether it was cured

###### id

```ts
id: string;
```

###### cured

```ts
cured: boolean;
```

###### threshold

```ts
threshold: number;
```

##### extraEffects?

```ts
optional extraEffects?: LayOnHandsExtraEffects;
```

Defined in: [cleric/lay-on-hands.ts:122](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L122)

Extra row-level effects (disease cure, limb restore, etc.)

##### row?

```ts
optional row?: LayOnHandsRow;
```

Defined in: [cleric/lay-on-hands.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L124)

The matched row (for UI display / debugging)

##### description

```ts
description: string;
```

Defined in: [cleric/lay-on-hands.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L126)

Human-readable description

***

### TurnUnholyInput

Defined in: [cleric/turn-unholy.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L51)

Input for a Turn Unholy check

#### Properties

##### level

```ts
level: number;
```

Defined in: [cleric/turn-unholy.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L53)

Cleric's level

##### personality

```ts
personality: number;
```

Defined in: [cleric/turn-unholy.ts:56](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L56)

Cleric's Personality score

##### luck?

```ts
optional luck?: number;
```

Defined in: [cleric/turn-unholy.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L59)

Optional luck score (for burning)

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [cleric/turn-unholy.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L62)

Luck points to burn on this roll

##### situationalModifiers?

```ts
optional situationalModifiers?: RollModifier[];
```

Defined in: [cleric/turn-unholy.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L65)

Situational modifiers

##### targetHD?

```ts
optional targetHD?: number;
```

Defined in: [cleric/turn-unholy.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L68)

HD of the highest-HD unholy creature being turned

***

### TurnEffect

Defined in: [cleric/turn-unholy.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L84)

Structured Turn Unholy effect data

#### Properties

##### type

```ts
type: TurnEffectType;
```

Defined in: [cleric/turn-unholy.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L86)

Type of turning effect

##### hdAffected?

```ts
optional hdAffected?: string;
```

Defined in: [cleric/turn-unholy.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L89)

HD of creatures affected (dice expression or number)

##### hdDestroyed?

```ts
optional hdDestroyed?: string;
```

Defined in: [cleric/turn-unholy.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L92)

HD of creatures destroyed (if any)

##### duration?

```ts
optional duration?: string;
```

Defined in: [cleric/turn-unholy.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L95)

Duration of the turning effect

##### flee?

```ts
optional flee?: boolean;
```

Defined in: [cleric/turn-unholy.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L98)

Whether turned creatures flee

##### command?

```ts
optional command?: boolean;
```

Defined in: [cleric/turn-unholy.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L101)

Whether the cleric can command the creatures

***

### TurnUnholyResult

Defined in: [cleric/turn-unholy.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L107)

Result of a Turn Unholy check

#### Properties

##### check

```ts
check: SkillCheckResult;
```

Defined in: [cleric/turn-unholy.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L109)

The skill check result

##### success

```ts
success: boolean;
```

Defined in: [cleric/turn-unholy.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L112)

Whether the turning was successful

##### description

```ts
description: string;
```

Defined in: [cleric/turn-unholy.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L115)

Description of the result

##### effect

```ts
effect: TurnEffect;
```

Defined in: [cleric/turn-unholy.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L118)

Structured effect data

##### tableEffect?

```ts
optional tableEffect?: TableEffect;
```

Defined in: [cleric/turn-unholy.ts:121](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L121)

The raw table effect (if available)

## Type Aliases

### AidRequestType

```ts
type AidRequestType = 
  | "general"
  | "smite-enemy"
  | "heal-wounds"
  | "cure-affliction"
  | "protection"
  | "guidance"
  | "escape"
  | "miracle";
```

Defined in: [cleric/divine-aid.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L60)

Type of aid being requested from the deity

***

### DivineAidEffectType

```ts
type DivineAidEffectType = "none" | "minor-aid" | "moderate-aid" | "major-aid" | "miraculous-aid";
```

Defined in: [cleric/divine-aid.ts:105](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L105)

Effect type for Divine Aid results

***

### LayOnHandsHealingDiceMode

```ts
type LayOnHandsHealingDiceMode = "raw" | "keep-highest";
```

Defined in: [cleric/lay-on-hands.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L67)

***

### TurnEffectType

```ts
type TurnEffectType = "none" | "turn" | "turn-destroy" | "destroy" | "command";
```

Defined in: [cleric/turn-unholy.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L74)

Effect type for Turn Unholy results

## Variables

### DIVINE\_AID\_SKILL

```ts
const DIVINE_AID_SKILL: SkillDefinition;
```

Defined in: [cleric/divine-aid.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L34)

Divine Aid skill definition.
Clerics roll d20 + Personality modifier + level (spell check).

***

### LAY\_ON\_HANDS\_SKILL

```ts
const LAY_ON_HANDS_SKILL: SkillDefinition;
```

Defined in: [cleric/lay-on-hands.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L40)

***

### TURN\_UNHOLY\_SKILL

```ts
const TURN_UNHOLY_SKILL: SkillDefinition;
```

Defined in: [cleric/turn-unholy.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L24)

Turn Unholy skill definition.
Clerics roll d20 + Personality modifier + level.

## Functions

### divineAid()

```ts
function divineAid(
   input: DivineAidInput, 
   aidTable: SimpleTable, 
   options?: RollOptions
): DivineAidResult;
```

Defined in: [cleric/divine-aid.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L177)

Perform a Divine Aid check.

Divine Aid allows clerics to request miraculous intervention.
The spell check determines the level of aid the deity is willing to provide.
Rolling within the disapproval range triggers disapproval.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`DivineAidInput`](#divineaidinput) | Divine Aid input |
| `aidTable` | [`SimpleTable`](tables.md#simpletable) | The Divine Aid result table |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options |

#### Returns

[`DivineAidResult`](#divineaidresult)

Divine Aid result

***

### getDivineAidModifier()

```ts
function getDivineAidModifier(level: number, personality: number): number;
```

Defined in: [cleric/divine-aid.ts:250](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L250)

Calculate the Divine Aid modifier without rolling.
Useful for displaying to players before they commit to the action.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `number` | Cleric level |
| `personality` | `number` | Personality score |

#### Returns

`number`

Total modifier

***

### getDivineAidDie()

```ts
function getDivineAidDie(): `d${number}`;
```

Defined in: [cleric/divine-aid.ts:261](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L261)

Get the die used for Divine Aid.
Always d20 for standard clerics.

#### Returns

`` `d${number}` ``

***

### getMinimumCheckForSpellLevel()

```ts
function getMinimumCheckForSpellLevel(spellLevel: number): number;
```

Defined in: [cleric/divine-aid.ts:272](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L272)

Calculate the minimum check result needed for a given spell level equivalent.
In DCC, divine aid roughly maps to spell levels.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellLevel` | `number` | Desired spell level equivalent (1-5) |

#### Returns

`number`

Minimum check result needed

***

### estimateAidSpellLevel()

```ts
function estimateAidSpellLevel(checkResult: number): number;
```

Defined in: [cleric/divine-aid.ts:295](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L295)

Estimate the spell level equivalent of aid for a given check result.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `checkResult` | `number` | The total check result |

#### Returns

`number`

Estimated spell level equivalent

***

### describePotentialAid()

```ts
function describePotentialAid(modifier: number): string;
```

Defined in: [cleric/divine-aid.ts:381](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/divine-aid.ts#L381)

Get a description of what type of aid might be available at a given modifier.
Useful for helping players understand their chances.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `modifier` | `number` | The cleric's total modifier |

#### Returns

`string`

Description of potential aid levels

***

### layOnHands()

```ts
function layOnHands(
   input: LayOnHandsInput, 
   table: LayOnHandsTable, 
   options?: RollOptions
): LayOnHandsResult;
```

Defined in: [cleric/lay-on-hands.ts:133](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L133)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`LayOnHandsInput`](#layonhandsinput) |
| `table` | [`LayOnHandsTable`](tables.md#layonhandstable) |
| `options?` | [`RollOptions`](types.md#rolloptions) |

#### Returns

[`LayOnHandsResult`](#layonhandsresult)

***

### getLayOnHandsModifier()

```ts
function getLayOnHandsModifier(level: number, personality: number): number;
```

Defined in: [cleric/lay-on-hands.ts:225](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L225)

Lay on Hands check-only modifier, useful for showing players before rolling.
Note: alignment is NOT a roll modifier (RAW); it only affects the result
lookup.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `level` | `number` |
| `personality` | `number` |

#### Returns

`number`

***

### getLayOnHandsDie()

```ts
function getLayOnHandsDie(): `d${number}`;
```

Defined in: [cleric/lay-on-hands.ts:229](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/lay-on-hands.ts#L229)

#### Returns

`` `d${number}` ``

***

### turnUnholy()

```ts
function turnUnholy(
   input: TurnUnholyInput, 
   turnTable: SimpleTable, 
   options?: RollOptions
): TurnUnholyResult;
```

Defined in: [cleric/turn-unholy.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L136)

Perform a Turn Unholy check.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`TurnUnholyInput`](#turnunholyinput) | Turn Unholy input |
| `turnTable` | [`SimpleTable`](tables.md#simpletable) | The Turn Unholy result table |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options |

#### Returns

[`TurnUnholyResult`](#turnunholyresult)

Turn Unholy result

***

### getTurnUnholyModifier()

```ts
function getTurnUnholyModifier(level: number, personality: number): number;
```

Defined in: [cleric/turn-unholy.ts:187](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L187)

Calculate the Turn Unholy modifier without rolling.
Useful for displaying to players before they commit to the action.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `number` | Cleric level |
| `personality` | `number` | Personality score |

#### Returns

`number`

Total modifier

***

### getTurnUnholyDie()

```ts
function getTurnUnholyDie(): `d${number}`;
```

Defined in: [cleric/turn-unholy.ts:198](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L198)

Get the die used for Turn Unholy.
Always d20 for standard clerics.

#### Returns

`` `d${number}` ``

***

### resolveHDExpression()

```ts
function resolveHDExpression(hdExpression: string, level: number): string;
```

Defined in: [cleric/turn-unholy.ts:275](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L275)

Calculate the HD affected by a turn result.
Replaces "CL" in dice expressions with the cleric's level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hdExpression` | `string` | The HD expression (e.g., "1d6+CL") |
| `level` | `number` | Cleric level |

#### Returns

`string`

Resolved expression (e.g., "1d6+5" for level 5)

***

### calculateAverageHD()

```ts
function calculateAverageHD(hdExpression: string): number;
```

Defined in: [cleric/turn-unholy.ts:289](https://github.com/moonloch/dcc-core-lib/blob/main/src/cleric/turn-unholy.ts#L289)

Calculate average HD for an expression.
Useful for quick estimates.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hdExpression` | `string` | Resolved HD expression (e.g., "1d6+5") |

#### Returns

`number`

Average HD value
