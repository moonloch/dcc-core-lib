# types

## Interfaces

### BonusSource

Defined in: [types/bonuses.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L53)

Detailed source information for a bonus.
Allows both simple and detailed tracking.

#### Properties

##### type

```ts
type: BonusSourceType;
```

Defined in: [types/bonuses.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L55)

High-level source type

##### id?

```ts
optional id?: string;
```

Defined in: [types/bonuses.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L61)

Specific identifier for the source (optional).
Examples: "str", "ring-of-protection", "enlarge-person"

##### name?

```ts
optional name?: string;
```

Defined in: [types/bonuses.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L67)

Human-readable name for display.
If not provided, can be derived from type/id.

***

### BonusFlatModifier

Defined in: [types/bonuses.ts:87](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L87)

A flat numeric modifier bonus

#### Properties

##### type

```ts
type: "modifier";
```

Defined in: [types/bonuses.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L88)

##### value

```ts
value: number;
```

Defined in: [types/bonuses.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L90)

The numeric value to add (can be negative)

***

### BonusDieRoll

Defined in: [types/bonuses.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L96)

A die-based bonus (adds a die roll to the result)

#### Properties

##### type

```ts
type: "die";
```

Defined in: [types/bonuses.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L97)

##### die

```ts
die: `d${number}`;
```

Defined in: [types/bonuses.ts:99](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L99)

The die to roll and add

##### count?

```ts
optional count?: number;
```

Defined in: [types/bonuses.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L101)

Number of dice (default 1)

***

### BonusDiceChain

Defined in: [types/bonuses.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L107)

A dice chain bump (changes the action die)

#### Properties

##### type

```ts
type: "dice-chain";
```

Defined in: [types/bonuses.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L108)

##### steps

```ts
steps: number;
```

Defined in: [types/bonuses.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L110)

Steps to move on the dice chain (+1 = up one step, -2 = down two)

***

### BonusSetDie

Defined in: [types/bonuses.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L116)

Sets the die to a specific value (rare, for special abilities)

#### Properties

##### type

```ts
type: "set-die";
```

Defined in: [types/bonuses.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L117)

##### die

```ts
die: `d${number}`;
```

Defined in: [types/bonuses.ts:119](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L119)

The die to use instead

***

### BonusReroll

Defined in: [types/bonuses.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L125)

Allows a reroll (like advantage)

#### Properties

##### type

```ts
type: "reroll";
```

Defined in: [types/bonuses.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L126)

##### mode

```ts
mode: "take-higher" | "take-lower" | "choice";
```

Defined in: [types/bonuses.ts:128](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L128)

How the reroll works

***

### RollBonus

Defined in: [types/bonuses.ts:182](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L182)

A complete bonus that can apply to a roll.

This is the core type for the bonus system. Every bonus - whether from
strength, a magic ring, burning luck, or a spell - is represented as
a RollBonus.

#### Examples

```ts
// Strength modifier
const strBonus: RollBonus = {
  id: "ability:str",
  label: "Strength",
  source: { type: "ability", id: "str" },
  category: "inherent",
  effect: { type: "modifier", value: 2 },
};
```

```ts
// Luck burn
const luckBonus: RollBonus = {
  id: "luck-burn",
  label: "Luck burn (3 points)",
  source: { type: "luck" },
  category: "luck",
  effect: { type: "modifier", value: 3 },
};
```

```ts
// Judge's dice chain bump
const judgeBump: RollBonus = {
  id: "judge:favorable-terrain",
  label: "High ground",
  source: { type: "judge", name: "Favorable terrain" },
  category: "circumstance",
  effect: { type: "dice-chain", steps: 1 },
};
```

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/bonuses.ts:188](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L188)

Unique identifier for this bonus instance.
Format: "{source-type}:{specific-id}" recommended.
Examples: "ability:str", "item:ring-of-protection", "spell:enlarge"

##### label

```ts
label: string;
```

Defined in: [types/bonuses.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L194)

Human-readable label for display.
Should be concise but descriptive.

##### source

```ts
source: BonusSource;
```

Defined in: [types/bonuses.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L199)

Where this bonus comes from.

##### category

```ts
category: BonusCategory;
```

Defined in: [types/bonuses.ts:204](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L204)

Category for grouping and application timing.

##### effect

```ts
effect: BonusEffect;
```

Defined in: [types/bonuses.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L209)

What effect this bonus has on the roll.

##### condition?

```ts
optional condition?: string;
```

Defined in: [types/bonuses.ts:220](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L220)

Optional condition for when this bonus applies.
If not specified, bonus always applies when present.

Examples:
- "melee-attack" - only on melee attacks
- "vs-undead" - only against undead
- "in-darkness" - only in dark conditions

##### priority?

```ts
optional priority?: number;
```

Defined in: [types/bonuses.ts:227](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L227)

Priority for ordering when multiple bonuses modify the same thing.
Higher priority bonuses are applied first.
Default is 0. Dice chain effects should typically be high priority.

***

### BonusList

Defined in: [types/bonuses.ts:238](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L238)

A collection of bonuses organized by category.
Useful for separating "always on" vs "per-roll" bonuses.

#### Properties

##### inherent

```ts
inherent: RollBonus[];
```

Defined in: [types/bonuses.ts:240](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L240)

Bonuses that always apply (ability, class, equipment)

##### situational

```ts
situational: RollBonus[];
```

Defined in: [types/bonuses.ts:243](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L243)

Bonuses added for this specific roll

***

### ComputedBonuses

Defined in: [types/bonuses.ts:405](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L405)

Result of computing bonuses for a roll

#### Properties

##### totalModifier

```ts
totalModifier: number;
```

Defined in: [types/bonuses.ts:407](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L407)

Total flat modifier to add to the roll

##### diceChainSteps

```ts
diceChainSteps: number;
```

Defined in: [types/bonuses.ts:410](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L410)

Net dice chain steps (positive = up, negative = down)

##### additionalDice

```ts
additionalDice: {
  die: `d${number}`;
  count: number;
}[];
```

Defined in: [types/bonuses.ts:413](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L413)

Additional dice to roll and add to the result

###### die

```ts
die: `d${number}`;
```

###### count

```ts
count: number;
```

##### hasReroll

```ts
hasReroll: boolean;
```

Defined in: [types/bonuses.ts:416](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L416)

Whether a reroll is available

##### rerollMode?

```ts
optional rerollMode?: "take-higher" | "take-lower" | "choice";
```

Defined in: [types/bonuses.ts:417](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L417)

##### forcedDie?

```ts
optional forcedDie?: `d${number}`;
```

Defined in: [types/bonuses.ts:420](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L420)

If a specific die is forced

##### appliedBonuses

```ts
appliedBonuses: RollBonus[];
```

Defined in: [types/bonuses.ts:423](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L423)

All bonuses that were applied, for display

***

### DiceMethodDefinition

Defined in: [types/character-creation.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L21)

Definition for a custom dice rolling method.
Used when ability score method is "custom".

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/character-creation.ts:23](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L23)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/character-creation.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L26)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/character-creation.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L29)

Description of the method

##### diceCount

```ts
diceCount: number;
```

Defined in: [types/character-creation.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L32)

Number of dice to roll

##### dieSize

```ts
dieSize: number;
```

Defined in: [types/character-creation.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L35)

Die size (e.g., 6 for d6)

##### keep?

```ts
optional keep?: {
  count: number;
  which: "highest" | "lowest";
};
```

Defined in: [types/character-creation.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L41)

How many dice to keep after rolling.
If undefined, keep all dice.

###### count

```ts
count: number;
```

###### which

```ts
which: "highest" | "lowest";
```

##### modifier?

```ts
optional modifier?: number;
```

Defined in: [types/character-creation.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L50)

Flat modifier to add after rolling.
e.g., +6 for "2d6+6"

##### divisor?

```ts
optional divisor?: number;
```

Defined in: [types/character-creation.ts:56](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L56)

Divisor to apply after rolling.
e.g., 2 for "6d6/2"

##### minimum?

```ts
optional minimum?: number;
```

Defined in: [types/character-creation.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L62)

Minimum result (floor).
e.g., 3 for methods that can't go below 3

##### maximum?

```ts
optional maximum?: number;
```

Defined in: [types/character-creation.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L68)

Maximum result (ceiling).
e.g., 18 for standard ability scores

***

### HPMethodDefinition

Defined in: [types/character-creation.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L74)

Definition for a custom hit point rolling method.

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/character-creation.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L76)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/character-creation.ts:79](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L79)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/character-creation.ts:82](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L82)

Description of the method

##### dieSize?

```ts
optional dieSize?: number;
```

Defined in: [types/character-creation.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L88)

Die size override.
If undefined, uses class hit die.

##### diceCount?

```ts
optional diceCount?: number;
```

Defined in: [types/character-creation.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L94)

Number of dice to roll.
Default: 1

##### rerollBelow?

```ts
optional rerollBelow?: number;
```

Defined in: [types/character-creation.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L100)

Re-roll dice that show this value or lower.
e.g., 1 for "re-roll 1s"

##### takeMultiple?

```ts
optional takeMultiple?: {
  count: number;
  which: "highest" | "lowest";
};
```

Defined in: [types/character-creation.ts:105](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L105)

Roll multiple dice and take highest/lowest.

###### count

```ts
count: number;
```

###### which

```ts
which: "highest" | "lowest";
```

##### modifier?

```ts
optional modifier?: number;
```

Defined in: [types/character-creation.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L113)

Flat modifier to add.

##### useMax?

```ts
optional useMax?: boolean;
```

Defined in: [types/character-creation.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L118)

Use maximum possible value instead of rolling.

##### useAverage?

```ts
optional useAverage?: boolean;
```

Defined in: [types/character-creation.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L123)

Use average (rounded up) instead of rolling.

##### percentageOfMax?

```ts
optional percentageOfMax?: number;
```

Defined in: [types/character-creation.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L129)

Use percentage of maximum possible.
e.g., 0.5 for 50%

***

### LuckySignModeDefinition

Defined in: [types/character-creation.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L135)

Definition for a custom lucky sign mode.

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/character-creation.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L137)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/character-creation.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L140)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/character-creation.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L143)

Description of the mode

##### hideWhen?

```ts
optional hideWhen?: "zero" | "negative" | "non-positive";
```

Defined in: [types/character-creation.ts:149](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L149)

Hide the lucky sign if luck modifier meets this condition.
e.g., "zero" to hide when modifier is 0

##### minimumBonus?

```ts
optional minimumBonus?: number;
```

Defined in: [types/character-creation.ts:155](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L155)

Minimum bonus to apply (floor).
e.g., 1 for "always at least +1"

##### positiveOnly?

```ts
optional positiveOnly?: boolean;
```

Defined in: [types/character-creation.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L160)

Only apply if luck modifier is positive.

##### minimumOrLuck?

```ts
optional minimumOrLuck?: number;
```

Defined in: [types/character-creation.ts:166](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L166)

Use the better of luck modifier or this value.
e.g., 1 for "luck mod OR +1, whichever higher"

***

### AbilityScoreConfig

Defined in: [types/character-creation.ts:188](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L188)

Configuration for ability score generation

#### Properties

##### method

```ts
method: AbilityScoreMethod;
```

Defined in: [types/character-creation.ts:190](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L190)

Method for rolling ability scores

##### customMethod?

```ts
optional customMethod?: string | DiceMethodDefinition;
```

Defined in: [types/character-creation.ts:196](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L196)

Custom method definition (required if method is "custom").
Can be inline definition or string ID referencing loaded data.

##### manualScores?

```ts
optional manualScores?: [number, number, number, number, number, number];
```

Defined in: [types/character-creation.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L199)

For manual method: the scores to use [str, agl, sta, per, int, lck]

##### minTotalModifier?

```ts
optional minTotalModifier?: number;
```

Defined in: [types/character-creation.ts:206](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L206)

Minimum total ability modifier sum allowed.
Characters below this are re-rolled.
undefined = no minimum

##### maxTotalModifier?

```ts
optional maxTotalModifier?: number;
```

Defined in: [types/character-creation.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L213)

Maximum total ability modifier sum allowed.
Characters above this are re-rolled.
undefined = no maximum

##### rerollLowPrimaryStats?

```ts
optional rerollLowPrimaryStats?: boolean;
```

Defined in: [types/character-creation.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L219)

Re-roll if primary class stats are below threshold.
When true, re-rolls if primary stat < 11 or secondary stat < 8.

***

### HitPointConfig

Defined in: [types/character-creation.ts:254](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L254)

Configuration for hit point generation

#### Properties

##### zeroLevelMethod

```ts
zeroLevelMethod: ZeroLevelHPMethod;
```

Defined in: [types/character-creation.ts:256](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L256)

Method for 0-level HP

##### customZeroLevelMethod?

```ts
optional customZeroLevelMethod?: string | HPMethodDefinition;
```

Defined in: [types/character-creation.ts:262](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L262)

Custom 0-level HP method (required if zeroLevelMethod is "custom").
Can be inline definition or string ID referencing loaded data.

##### leveledMethod

```ts
leveledMethod: LeveledHPMethod;
```

Defined in: [types/character-creation.ts:265](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L265)

Method for leveled HP

##### customLeveledMethod?

```ts
optional customLeveledMethod?: string | HPMethodDefinition;
```

Defined in: [types/character-creation.ts:271](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L271)

Custom leveled HP method (required if leveledMethod is "custom").
Can be inline definition or string ID referencing loaded data.

##### hpPercentage?

```ts
optional hpPercentage?: number;
```

Defined in: [types/character-creation.ts:277](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L277)

For percentage method: what % of max HP (0.25 to 1.0)
e.g., 0.5 = 50% of maximum possible HP

##### minHPPerLevel?

```ts
optional minHPPerLevel?: number;
```

Defined in: [types/character-creation.ts:283](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L283)

Minimum HP per level (after STA mod).
Common house rule: minimum 1 HP per level.

***

### BirthAugurConfig

Defined in: [types/character-creation.ts:305](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L305)

Configuration for birth augur handling

#### Properties

##### mode

```ts
mode: LuckySignMode;
```

Defined in: [types/character-creation.ts:307](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L307)

How to handle the lucky sign bonus

##### customMode?

```ts
optional customMode?: string | LuckySignModeDefinition;
```

Defined in: [types/character-creation.ts:313](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L313)

Custom mode definition (required if mode is "custom").
Can be inline definition or string ID referencing loaded data.

##### specificAugurId?

```ts
optional specificAugurId?: string;
```

Defined in: [types/character-creation.ts:319](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L319)

Specific augur ID to assign (if not random).
If undefined, roll randomly.

***

### OccupationConfig

Defined in: [types/character-creation.ts:339](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L339)

Configuration for occupation selection

#### Properties

##### source

```ts
source: OccupationSource;
```

Defined in: [types/character-creation.ts:341](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L341)

Source for occupation table

##### customTableId?

```ts
optional customTableId?: string;
```

Defined in: [types/character-creation.ts:346](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L346)

Custom occupation table ID (required if source is "custom").

##### specificOccupation?

```ts
optional specificOccupation?: string;
```

Defined in: [types/character-creation.ts:352](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L352)

Specific occupation to assign (if not random).
If undefined, roll randomly from source table.

***

### ClassSelectionConfig

Defined in: [types/character-creation.ts:362](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L362)

Configuration for class selection

#### Properties

##### classId?

```ts
optional classId?: string;
```

Defined in: [types/character-creation.ts:367](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L367)

Specific class to assign.
If undefined, either random or determined by other means.

##### allowRandom?

```ts
optional allowRandom?: boolean;
```

Defined in: [types/character-creation.ts:373](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L373)

If true and classId is undefined, pick randomly.
If false and classId is undefined, error.

##### availableClasses?

```ts
optional availableClasses?: string[];
```

Defined in: [types/character-creation.ts:379](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L379)

Classes to include in random selection.
If undefined, all classes from system config are available.

***

### EquipmentConfig

Defined in: [types/character-creation.ts:389](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L389)

Configuration for starting equipment and funds

#### Properties

##### includeFunds

```ts
includeFunds: boolean;
```

Defined in: [types/character-creation.ts:391](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L391)

Include starting funds from occupation

##### includeTradeGoods

```ts
includeTradeGoods: boolean;
```

Defined in: [types/character-creation.ts:394](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L394)

Include trade goods from occupation

##### includeOccupationEquipment

```ts
includeOccupationEquipment: boolean;
```

Defined in: [types/character-creation.ts:397](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L397)

Include occupation-based equipment

##### includeOccupationWeapon

```ts
includeOccupationWeapon: boolean;
```

Defined in: [types/character-creation.ts:400](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L400)

Include occupation weapon

***

### LanguageConfig

Defined in: [types/character-creation.ts:410](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L410)

Configuration for language assignment

#### Properties

##### determineBonusLanguages

```ts
determineBonusLanguages: boolean;
```

Defined in: [types/character-creation.ts:412](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L412)

Determine bonus languages from INT

##### alwaysGrantRacialLanguage

```ts
alwaysGrantRacialLanguage: boolean;
```

Defined in: [types/character-creation.ts:418](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L418)

Non-humans always get racial language regardless of INT.
Standard rule: need INT 8+ for racial language.

***

### NameConfig

Defined in: [types/character-creation.ts:428](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L428)

Configuration for automatic name generation

#### Properties

##### generateName

```ts
generateName: boolean;
```

Defined in: [types/character-creation.ts:430](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L430)

Generate a random name for the character

##### includeEpithet?

```ts
optional includeEpithet?: boolean;
```

Defined in: [types/character-creation.ts:436](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L436)

Include epithet in generated name.
e.g., "the Bold", "Ironfoot"

##### epithetChance?

```ts
optional epithetChance?: number;
```

Defined in: [types/character-creation.ts:442](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L442)

Chance of including epithet if enabled (0-1).
Default: 0.3 (30%)

***

### DwarfRulesConfig

Defined in: [types/character-creation.ts:459](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L459)

Configuration for dwarf-specific rules

#### Properties

##### ignoreArmorSpeedPenalty

```ts
ignoreArmorSpeedPenalty: boolean;
```

Defined in: [types/character-creation.ts:464](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L464)

Ignore armor speed penalty for dwarves.
House rule: dwarves are unaffected by heavy armor.

***

### CharacterCreationConfig

Defined in: [types/character-creation.ts:476](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L476)

Complete configuration for character creation.

All fields are optional - unspecified fields use defaults.

#### Properties

##### abilityScores?

```ts
optional abilityScores?: Partial<AbilityScoreConfig>;
```

Defined in: [types/character-creation.ts:478](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L478)

Ability score generation options

##### hitPoints?

```ts
optional hitPoints?: Partial<HitPointConfig>;
```

Defined in: [types/character-creation.ts:481](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L481)

Hit point generation options

##### birthAugur?

```ts
optional birthAugur?: Partial<BirthAugurConfig>;
```

Defined in: [types/character-creation.ts:484](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L484)

Birth augur / lucky sign options

##### occupation?

```ts
optional occupation?: Partial<OccupationConfig>;
```

Defined in: [types/character-creation.ts:487](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L487)

Occupation selection options

##### classSelection?

```ts
optional classSelection?: Partial<ClassSelectionConfig>;
```

Defined in: [types/character-creation.ts:490](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L490)

Class selection options (for leveled characters)

##### equipment?

```ts
optional equipment?: Partial<EquipmentConfig>;
```

Defined in: [types/character-creation.ts:493](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L493)

Equipment and funds options

##### languages?

```ts
optional languages?: Partial<LanguageConfig>;
```

Defined in: [types/character-creation.ts:496](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L496)

Language options

##### dwarfRules?

```ts
optional dwarfRules?: Partial<DwarfRulesConfig>;
```

Defined in: [types/character-creation.ts:499](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L499)

Dwarf-specific rules

##### name?

```ts
optional name?: Partial<NameConfig>;
```

Defined in: [types/character-creation.ts:502](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L502)

Name generation options

##### alignment?

```ts
optional alignment?: Alignment;
```

Defined in: [types/character-creation.ts:505](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L505)

Alignment (if not random)

##### allowRandomAlignment?

```ts
optional allowRandomAlignment?: boolean;
```

Defined in: [types/character-creation.ts:508](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L508)

Allow random alignment if not specified

***

### AbilityScore

Defined in: [types/character.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L34)

A single ability score with current and max values.
Current can differ from max due to spellburn, poison, etc.

#### Properties

##### current

```ts
current: number;
```

Defined in: [types/character.ts:36](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L36)

Current value (may be reduced by spellburn, etc.)

##### max

```ts
max: number;
```

Defined in: [types/character.ts:39](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L39)

Maximum/base value

***

### SavingThrows

Defined in: [types/character.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L68)

Saving throw values

#### Properties

##### reflex

```ts
reflex: number;
```

Defined in: [types/character.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L69)

##### fortitude

```ts
fortitude: number;
```

Defined in: [types/character.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L70)

##### will

```ts
will: number;
```

Defined in: [types/character.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L71)

***

### BirthAugur

Defined in: [types/character.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L81)

Birth augur (lucky sign) that affects a specific roll type

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/character.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L83)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/character.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L86)

Display name (e.g., "Harsh Winter")

##### effect

```ts
effect: string;
```

Defined in: [types/character.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L89)

What this augur affects (e.g., "All attack rolls")

##### modifies

```ts
modifies: string;
```

Defined in: [types/character.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L92)

The roll or mechanic this modifies

##### multiplier

```ts
multiplier: number;
```

Defined in: [types/character.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L95)

Luck modifier multiplier (usually 1, sometimes 2)

***

### CharacterIdentity

Defined in: [types/character.ts:105](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L105)

Core character identity - things that don't change

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/character.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L107)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/character.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L110)

Character name

##### occupation

```ts
occupation: string;
```

Defined in: [types/character.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L113)

0-level occupation

##### alignment

```ts
alignment: Alignment;
```

Defined in: [types/character.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L116)

Character alignment

##### birthAugur

```ts
birthAugur: BirthAugur;
```

Defined in: [types/character.ts:119](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L119)

Birth augur / lucky sign

##### startingLuck

```ts
startingLuck: number;
```

Defined in: [types/character.ts:122](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L122)

Starting luck score (for reference, since luck can be burned)

##### languages

```ts
languages: string[];
```

Defined in: [types/character.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L125)

Languages known

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/character.ts:128](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L128)

Player notes

***

### CharacterClassInfo

Defined in: [types/character.ts:138](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L138)

Character's class and level information

#### Properties

##### classId

```ts
classId: string;
```

Defined in: [types/character.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L140)

Class identifier (e.g., "warrior", "wizard")

##### level

```ts
level: number;
```

Defined in: [types/character.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L143)

Current level in this class

##### title?

```ts
optional title?: string;
```

Defined in: [types/character.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L146)

Class title at current level (e.g., "Squire", "Magician")

***

### CombatStats

Defined in: [types/character.ts:156](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L156)

Combat-related statistics

#### Properties

##### attackBonus

```ts
attackBonus: number;
```

Defined in: [types/character.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L158)

Base attack bonus (from class/level)

##### actionDice

```ts
actionDice: `d${number}`[];
```

Defined in: [types/character.ts:161](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L161)

Action dice available (e.g., ["1d20"] or ["1d20", "1d14"])

##### critDie

```ts
critDie: string;
```

Defined in: [types/character.ts:164](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L164)

Critical hit die formula (e.g., "d12", "2d20", "d30+2")

##### critTable

```ts
critTable: string;
```

Defined in: [types/character.ts:167](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L167)

Critical hit table (I-V or custom ID)

##### threatRange

```ts
threatRange: number;
```

Defined in: [types/character.ts:170](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L170)

Threat range (20 = only nat 20, 19 = 19-20, etc.)

##### ac

```ts
ac: number;
```

Defined in: [types/character.ts:173](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L173)

Armor class

##### speed

```ts
speed: number;
```

Defined in: [types/character.ts:176](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L176)

Speed in feet

##### initiative

```ts
initiative: number;
```

Defined in: [types/character.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L179)

Initiative modifier

***

### HPRollRecord

Defined in: [types/character.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L189)

Record of HP rolled at a specific level

#### Properties

##### level

```ts
level: number;
```

Defined in: [types/character.ts:191](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L191)

Level at which this HP was gained (0 for 0-level)

##### die

```ts
die: string;
```

Defined in: [types/character.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L194)

Die used (d4 for 0-level, class hit die for levels 1+)

##### rolled

```ts
rolled: number;
```

Defined in: [types/character.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L197)

Raw roll result before modifiers

##### staminaModifier

```ts
staminaModifier: number;
```

Defined in: [types/character.ts:200](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L200)

Stamina modifier at time of roll

##### gained

```ts
gained: number;
```

Defined in: [types/character.ts:203](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L203)

HP actually gained (after minimum 1 rule)

***

### HitPoints

Defined in: [types/character.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L209)

Hit point tracking

#### Properties

##### current

```ts
current: number;
```

Defined in: [types/character.ts:211](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L211)

Current HP

##### max

```ts
max: number;
```

Defined in: [types/character.ts:214](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L214)

Maximum HP

##### temp

```ts
temp: number;
```

Defined in: [types/character.ts:217](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L217)

Temporary HP (from spells, etc.)

##### history?

```ts
optional history?: HPRollRecord[];
```

Defined in: [types/character.ts:220](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L220)

History of HP rolls per level (for recalculation if stamina changes)

***

### ClericState

Defined in: [types/character.ts:230](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L230)

Cleric-specific state

#### Properties

##### disapprovalRange

```ts
disapprovalRange: number;
```

Defined in: [types/character.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L232)

Current disapproval range (starts at 1)

##### deity?

```ts
optional deity?: string;
```

Defined in: [types/character.ts:235](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L235)

Deity name

##### sins?

```ts
optional sins?: string[];
```

Defined in: [types/character.ts:238](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L238)

Sins or other disapproval notes

##### spellbook?

```ts
optional spellbook?: Spellbook;
```

Defined in: [types/character.ts:241](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L241)

Known spells and spellbook data

***

### WizardState

Defined in: [types/character.ts:247](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L247)

Wizard-specific state

#### Properties

##### corruption

```ts
corruption: string[];
```

Defined in: [types/character.ts:249](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L249)

Known corruption effects

##### patron?

```ts
optional patron?: string;
```

Defined in: [types/character.ts:252](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L252)

Patron name

##### familiar?

```ts
optional familiar?: string;
```

Defined in: [types/character.ts:255](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L255)

Familiar description

##### spellburnDamage?

```ts
optional spellburnDamage?: Partial<Record<DCCAbilityId, number>>;
```

Defined in: [types/character.ts:258](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L258)

Spellburn damage by ability (heals 1/day)

##### spellbook?

```ts
optional spellbook?: Spellbook;
```

Defined in: [types/character.ts:261](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L261)

Known spells and spellbook data

***

### ThiefState

Defined in: [types/character.ts:271](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L271)

Thief-specific state

Note: backstab mechanics are derived, not stored. The attack bonus
comes from class progression (alignment + level), and the auto-crit
is inherent to the class — nothing to persist here.

#### Properties

##### luckDie

```ts
luckDie: `d${number}`;
```

Defined in: [types/character.ts:273](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L273)

Luck die for spending luck

***

### WarriorState

Defined in: [types/character.ts:279](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L279)

Warrior-specific state

#### Properties

##### luckyWeapon?

```ts
optional luckyWeapon?: string;
```

Defined in: [types/character.ts:281](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L281)

Lucky weapon name (if any)

##### deedDie

```ts
deedDie: `d${number}`;
```

Defined in: [types/character.ts:284](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L284)

Deed die at current level

***

### DwarfState

Defined in: [types/character.ts:290](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L290)

Dwarf-specific state

#### Properties

##### luckyWeapon?

```ts
optional luckyWeapon?: string;
```

Defined in: [types/character.ts:292](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L292)

Lucky weapon name (if any)

##### deedDie

```ts
deedDie: `d${number}`;
```

Defined in: [types/character.ts:295](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L295)

Deed die at current level

***

### ElfState

Defined in: [types/character.ts:301](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L301)

Elf-specific state

#### Properties

##### patron?

```ts
optional patron?: string;
```

Defined in: [types/character.ts:303](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L303)

Patron name

##### corruption

```ts
corruption: string[];
```

Defined in: [types/character.ts:306](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L306)

Known corruption effects

##### spellbook?

```ts
optional spellbook?: Spellbook;
```

Defined in: [types/character.ts:309](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L309)

Known spells and spellbook data

***

### HalflingState

Defined in: [types/character.ts:315](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L315)

Halfling-specific state

#### Properties

##### twoWeaponFighting

```ts
twoWeaponFighting: boolean;
```

Defined in: [types/character.ts:317](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L317)

Two-weapon fighting capability

***

### ClassSpecificState

Defined in: [types/character.ts:323](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L323)

All possible class-specific states

#### Properties

##### cleric?

```ts
optional cleric?: ClericState;
```

Defined in: [types/character.ts:324](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L324)

##### wizard?

```ts
optional wizard?: WizardState;
```

Defined in: [types/character.ts:325](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L325)

##### thief?

```ts
optional thief?: ThiefState;
```

Defined in: [types/character.ts:326](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L326)

##### warrior?

```ts
optional warrior?: WarriorState;
```

Defined in: [types/character.ts:327](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L327)

##### dwarf?

```ts
optional dwarf?: DwarfState;
```

Defined in: [types/character.ts:328](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L328)

##### elf?

```ts
optional elf?: ElfState;
```

Defined in: [types/character.ts:329](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L329)

##### halfling?

```ts
optional halfling?: HalflingState;
```

Defined in: [types/character.ts:330](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L330)

***

### Experience

Defined in: [types/character.ts:340](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L340)

Experience point tracking

#### Properties

##### current

```ts
current: number;
```

Defined in: [types/character.ts:342](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L342)

Current XP total

##### nextLevel

```ts
nextLevel: number;
```

Defined in: [types/character.ts:345](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L345)

XP needed for next level

***

### InventoryItem

Defined in: [types/character.ts:360](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L360)

An item in the character's inventory

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/character.ts:362](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L362)

Unique identifier for this item instance

##### name

```ts
name: string;
```

Defined in: [types/character.ts:365](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L365)

Item name

##### category

```ts
category: ItemCategory;
```

Defined in: [types/character.ts:368](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L368)

Item category

##### quantity

```ts
quantity: number;
```

Defined in: [types/character.ts:371](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L371)

Quantity (default 1)

##### equipped?

```ts
optional equipped?: boolean;
```

Defined in: [types/character.ts:374](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L374)

Is this item currently equipped?

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/character.ts:377](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L377)

Additional notes about the item

##### value?

```ts
optional value?: number;
```

Defined in: [types/character.ts:380](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L380)

Value in copper pieces (if known)

***

### Inventory

Defined in: [types/character.ts:386](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L386)

Character's inventory/equipment

#### Properties

##### items

```ts
items: InventoryItem[];
```

Defined in: [types/character.ts:388](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L388)

All items carried

***

### Currency

Defined in: [types/character.ts:434](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L434)

Currency holdings

#### Properties

##### pp

```ts
pp: number;
```

Defined in: [types/character.ts:436](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L436)

Platinum pieces

##### ep

```ts
ep: number;
```

Defined in: [types/character.ts:439](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L439)

Electrum pieces

##### gp

```ts
gp: number;
```

Defined in: [types/character.ts:442](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L442)

Gold pieces

##### sp

```ts
sp: number;
```

Defined in: [types/character.ts:445](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L445)

Silver pieces

##### cp

```ts
cp: number;
```

Defined in: [types/character.ts:448](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L448)

Copper pieces

***

### CharacterState

Defined in: [types/character.ts:458](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L458)

Mutable character state - things that change during play

#### Properties

##### hp

```ts
hp: HitPoints;
```

Defined in: [types/character.ts:460](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L460)

Current hit points

##### abilities

```ts
abilities: AbilityScores;
```

Defined in: [types/character.ts:463](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L463)

Current ability scores (may differ from max due to damage)

##### xp

```ts
xp: Experience;
```

Defined in: [types/character.ts:466](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L466)

Current experience

##### saves

```ts
saves: SavingThrows;
```

Defined in: [types/character.ts:469](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L469)

Current saving throws (computed from class + ability mods)

##### combat

```ts
combat: CombatStats;
```

Defined in: [types/character.ts:472](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L472)

Combat statistics

##### currency

```ts
currency: Currency;
```

Defined in: [types/character.ts:475](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L475)

Currency

##### inventory

```ts
inventory: Inventory;
```

Defined in: [types/character.ts:478](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L478)

Inventory/equipment

##### conditions

```ts
conditions: string[];
```

Defined in: [types/character.ts:481](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L481)

Active conditions/effects

##### classState?

```ts
optional classState?: ClassSpecificState;
```

Defined in: [types/character.ts:484](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L484)

Class-specific state (only populated for relevant class)

***

### Character

Defined in: [types/character.ts:497](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L497)

Complete character record

Combines identity (immutable) with class info and mutable state.
For 0-level characters, `classInfo` is undefined.

#### Properties

##### identity

```ts
identity: CharacterIdentity;
```

Defined in: [types/character.ts:499](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L499)

Character identity (mostly immutable)

##### classInfo?

```ts
optional classInfo?: CharacterClassInfo;
```

Defined in: [types/character.ts:502](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L502)

Class information (undefined for 0-level)

##### state

```ts
state: CharacterState;
```

Defined in: [types/character.ts:505](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L505)

Mutable character state

***

### AlignmentLevelData

Defined in: [types/class-progression.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L31)

Alignment-specific data at a level

#### Properties

##### title

```ts
title: string;
```

Defined in: [types/class-progression.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L33)

Title at this level (e.g., "Bravo", "Thug")

##### skills

```ts
skills: SkillBonuses;
```

Defined in: [types/class-progression.ts:36](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L36)

Skill bonuses for this alignment at this level

***

### ProgressionBaseLevelData

Defined in: [types/class-progression.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L42)

Core level data (same regardless of alignment)

#### Extended by

- [`ProgressionLevelData`](#progressionleveldata)

#### Properties

##### attackBonus

```ts
attackBonus: number | `d${number}`;
```

Defined in: [types/class-progression.ts:44](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L44)

Attack bonus (can be a die like "d3" for warriors)

##### criticalDie

```ts
criticalDie: string;
```

Defined in: [types/class-progression.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L47)

Critical hit die

##### criticalTable

```ts
criticalTable: string;
```

Defined in: [types/class-progression.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L50)

Critical hit table

##### actionDice

```ts
actionDice: string[];
```

Defined in: [types/class-progression.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L53)

Action dice available

##### hitDie

```ts
hitDie: `d${number}`;
```

Defined in: [types/class-progression.ts:56](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L56)

Hit die for this class

##### saves

```ts
saves: Record<ProgressionSaveType, number>;
```

Defined in: [types/class-progression.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L59)

Saving throw bonuses

***

### ProgressionLevelData

Defined in: [types/class-progression.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L65)

Complete level data including alignment variations

#### Extends

- [`ProgressionBaseLevelData`](#progressionbaseleveldata)

#### Properties

##### attackBonus

```ts
attackBonus: number | `d${number}`;
```

Defined in: [types/class-progression.ts:44](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L44)

Attack bonus (can be a die like "d3" for warriors)

###### Inherited from

[`ProgressionBaseLevelData`](#progressionbaseleveldata).[`attackBonus`](#attackbonus-1)

##### criticalDie

```ts
criticalDie: string;
```

Defined in: [types/class-progression.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L47)

Critical hit die

###### Inherited from

[`ProgressionBaseLevelData`](#progressionbaseleveldata).[`criticalDie`](#criticaldie)

##### criticalTable

```ts
criticalTable: string;
```

Defined in: [types/class-progression.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L50)

Critical hit table

###### Inherited from

[`ProgressionBaseLevelData`](#progressionbaseleveldata).[`criticalTable`](#criticaltable)

##### actionDice

```ts
actionDice: string[];
```

Defined in: [types/class-progression.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L53)

Action dice available

###### Inherited from

[`ProgressionBaseLevelData`](#progressionbaseleveldata).[`actionDice`](#actiondice-1)

##### hitDie

```ts
hitDie: `d${number}`;
```

Defined in: [types/class-progression.ts:56](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L56)

Hit die for this class

###### Inherited from

[`ProgressionBaseLevelData`](#progressionbaseleveldata).[`hitDie`](#hitdie)

##### saves

```ts
saves: Record<ProgressionSaveType, number>;
```

Defined in: [types/class-progression.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L59)

Saving throw bonuses

###### Inherited from

[`ProgressionBaseLevelData`](#progressionbaseleveldata).[`saves`](#saves-1)

##### lawful?

```ts
optional lawful?: AlignmentLevelData;
```

Defined in: [types/class-progression.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L67)

Lawful alignment data

##### neutral?

```ts
optional neutral?: AlignmentLevelData;
```

Defined in: [types/class-progression.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L70)

Neutral alignment data

##### chaotic?

```ts
optional chaotic?: AlignmentLevelData;
```

Defined in: [types/class-progression.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L73)

Chaotic alignment data

##### luckDie?

```ts
optional luckDie?: `d${number}`;
```

Defined in: [types/class-progression.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L76)

Luck die (for thieves, halflings)

##### critRange?

```ts
optional critRange?: number;
```

Defined in: [types/class-progression.ts:79](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L79)

Threat range for critical hits (warriors get 19-20)

***

### ClassProgression

Defined in: [types/class-progression.ts:85](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L85)

Complete class progression (all levels)

#### Properties

##### classId

```ts
classId: string;
```

Defined in: [types/class-progression.ts:87](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L87)

Class ID

##### name

```ts
name: string;
```

Defined in: [types/class-progression.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L90)

Class name

##### skills

```ts
skills: string[];
```

Defined in: [types/class-progression.ts:93](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L93)

Skill IDs this class has access to

##### levels

```ts
levels: Record<number, ProgressionLevelData>;
```

Defined in: [types/class-progression.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L96)

Level-by-level progression data

***

### ClassLevelData

Defined in: [types/classes.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L55)

Level-specific class data

#### Properties

##### attackBonus?

```ts
optional attackBonus?: number;
```

Defined in: [types/classes.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L57)

Attack bonus at this level

##### actionDice?

```ts
optional actionDice?: string;
```

Defined in: [types/classes.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L60)

Action dice at this level (e.g., "1d20", "1d20+1d14")

##### critDie?

```ts
optional critDie?: string;
```

Defined in: [types/classes.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L63)

Crit die formula at this level (e.g., "d12", "2d20", "d30+2")

##### threatRange?

```ts
optional threatRange?: number;
```

Defined in: [types/classes.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L66)

Threat range at this level (e.g., 19 for 19-20)

##### saves?

```ts
optional saves?: Partial<Record<SaveType, number>>;
```

Defined in: [types/classes.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L69)

Saves at this level

##### title?

```ts
optional title?: string;
```

Defined in: [types/classes.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L72)

Titles at this level

##### skillsUnlocked?

```ts
optional skillsUnlocked?: string[];
```

Defined in: [types/classes.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L75)

Skills unlocked at this level

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [types/classes.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L78)

Any other level-specific data

***

### ClassRequirements

Defined in: [types/classes.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L84)

Requirements to take a class

#### Properties

##### abilities?

```ts
optional abilities?: Partial<Record<string, number>>;
```

Defined in: [types/classes.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L86)

Minimum ability scores

##### alignments?

```ts
optional alignments?: Alignment[];
```

Defined in: [types/classes.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L89)

Allowed alignments

##### race?

```ts
optional race?: string;
```

Defined in: [types/classes.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L92)

Required race (for race-as-class)

***

### ClassDefinition

Defined in: [types/classes.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L98)

Complete class definition

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/classes.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L100)

Unique identifier (e.g., "warrior", "wizard")

##### name

```ts
name: string;
```

Defined in: [types/classes.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L103)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/classes.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L106)

Class description

##### hitDie

```ts
hitDie: `d${number}`;
```

Defined in: [types/classes.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L109)

Hit die (e.g., "d12" for warrior)

##### attackProgression

```ts
attackProgression: AttackProgression;
```

Defined in: [types/classes.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L112)

Attack bonus progression type

##### saveProgression

```ts
saveProgression: SaveProgression;
```

Defined in: [types/classes.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L115)

Save progression type

##### critTable

```ts
critTable: CritTable;
```

Defined in: [types/classes.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L118)

Which crit table to use

##### customCritTable?

```ts
optional customCritTable?: string;
```

Defined in: [types/classes.ts:121](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L121)

Custom crit table ID (if critTable is "custom")

##### baseThreatRange?

```ts
optional baseThreatRange?: number;
```

Defined in: [types/classes.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L124)

Base threat range (20 = only on 20, 19 = 19-20)

##### skills

```ts
skills: string[];
```

Defined in: [types/classes.ts:127](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L127)

Skills this class grants

##### levels

```ts
levels: Record<number, ClassLevelData>;
```

Defined in: [types/classes.ts:130](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L130)

Level-by-level progression

##### requirements?

```ts
optional requirements?: ClassRequirements;
```

Defined in: [types/classes.ts:133](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L133)

Requirements to take this class

##### isSpellcaster?

```ts
optional isSpellcaster?: boolean;
```

Defined in: [types/classes.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L136)

Whether this is a spellcasting class

##### spellcastingAbility?

```ts
optional spellcastingAbility?: string;
```

Defined in: [types/classes.ts:139](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L139)

Spellcasting ability (if spellcaster)

##### maxSpellLevel?

```ts
optional maxSpellLevel?: Record<number, number>;
```

Defined in: [types/classes.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L142)

Maximum spell level by class level

##### tags?

```ts
optional tags?: string[];
```

Defined in: [types/classes.ts:145](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L145)

Tags for categorization

***

### CharacterClass

Defined in: [types/classes.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L151)

A character's class instance (for multiclassing support)

#### Properties

##### classId

```ts
classId: string;
```

Defined in: [types/classes.ts:153](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L153)

The class definition ID

##### level

```ts
level: number;
```

Defined in: [types/classes.ts:156](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L156)

Level in this class

##### xp?

```ts
optional xp?: number;
```

Defined in: [types/classes.ts:159](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L159)

XP in this class (if tracking separately)

***

### AttackInput

Defined in: [types/combat.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L24)

Input for making an attack roll

#### Properties

##### attackType

```ts
attackType: AttackType;
```

Defined in: [types/combat.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L26)

Type of attack

##### attackBonus

```ts
attackBonus: number;
```

Defined in: [types/combat.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L29)

Base attack bonus from class/level

##### actionDie

```ts
actionDie: `d${number}`;
```

Defined in: [types/combat.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L32)

Action die to use (e.g., "d20", "d16")

##### threatRange

```ts
threatRange: number;
```

Defined in: [types/combat.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L35)

Threat range for critical hits (20 = only on 20, 19 = 19-20, etc.)

##### threatRangeIsNatural?

```ts
optional threatRangeIsNatural?: boolean;
```

Defined in: [types/combat.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L50)

Treat `threatRange` as a natural-roll threshold on the die actually
rolled, instead of a d20-relative range that gets rescaled to the
rolled die's "top N faces".

By default `threatRange: 19` means "top 2 faces" and becomes 15-16
on a d16 (the warrior multi-die scaling rule). Some rules specify a
fixed natural number instead — the halfling two-weapon "crits on a
natural 16", or the Agl 16-17 "crits on the max face of the die
rolled" — and rescaling those produces absurd ranges (a natural-16
threshold on a d12 would become 8+). Set this flag when the caller
has already expressed `threatRange` for the die in `actionDie`.

##### fumbleRange?

```ts
optional fumbleRange?: number;
```

Defined in: [types/combat.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L62)

Fumble range as a natural-roll threshold on the die actually rolled
(1 = only a natural 1, 2 = natural 1-2, etc.). Defaults to 1.

Unlike `threatRange` this is NEVER rescaled when the action die
changes size — a cursed weapon that fumbles on 1-2 fumbles on a
natural 1-2 whether it is rolled on a d16, d20, or d24. A roll in
the fumble range always misses and can never be a critical threat
(including backstab auto-crits).

##### abilityModifier

```ts
abilityModifier: number;
```

Defined in: [types/combat.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L65)

Ability modifier to add (usually STR for melee, AGL for missile)

##### deedDie?

```ts
optional deedDie?: `d${number}`;
```

Defined in: [types/combat.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L68)

Deed die for warriors/dwarves (e.g., "d3", "d4")

##### bonuses?

```ts
optional bonuses?: RollBonus[];
```

Defined in: [types/combat.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L71)

Additional bonuses from equipment, spells, luck, etc.

##### targetAC?

```ts
optional targetAC?: number;
```

Defined in: [types/combat.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L74)

Target's armor class (optional, for hit determination)

##### isBackstab?

```ts
optional isBackstab?: boolean;
```

Defined in: [types/combat.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L89)

Thief backstab attack: a hit is automatically a critical threat
(DCC core rules, Crit Table II). A natural 1 is still a fumble
and does NOT auto-crit. This flag controls ONLY the auto-crit
behavior.

The Table 1-9 alignment/level attack bonus is NOT derived from
this flag — callers must precompute it via
`getBackstabAttackBonus(progression, level, alignment)` and pass
it as a full `RollBonus` in `bonuses` (e.g. with `id: "class:backstab"`,
`source: { type: "class", id: "thief" }`, `effect: { type: "modifier",
value: N }`). See `makeAttackRoll` docstring for a full example.

***

### ActionDieSlot

Defined in: [types/combat.ts:122](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L122)

One action die in an actor's per-round budget. A high-level warrior's
`"1d20+1, 1d20, 1d14"` becomes three slots; an NPC's `"2d20"` becomes two.

`die` is always a single die (count 1) — NPC stat blocks like `"2d20"`
expand to two separate slots rather than one slot of count 2.

#### Properties

##### slot

```ts
slot: number;
```

Defined in: [types/combat.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L124)

0-based position in the budget (slot 0 is the primary die).

##### die

```ts
die: `d${number}`;
```

Defined in: [types/combat.ts:127](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L127)

The die for this slot, e.g. `"d20"`, `"d16"`.

##### modifier

```ts
modifier: number;
```

Defined in: [types/combat.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L135)

Per-die rider parsed from a `"1d20+4"` authoring token (DCC top-end
warriors carry a flat bonus on their first action die). `0` when the
slot has no rider. This is the action die's *own* adjustment — see the
`suppressAttackBonus` note on `actionDieRollTerms`.

##### use

```ts
use: ActionDieUse;
```

Defined in: [types/combat.ts:138](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L138)

What this slot may be spent on.

***

### ActionDiceState

Defined in: [types/combat.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L146)

Live per-round spend state for an actor's action dice. Owned and
persisted by the caller (e.g. a Foundry combatant flag); the lib only
provides pure transitions over it.

#### Properties

##### round

```ts
round: number;
```

Defined in: [types/combat.ts:148](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L148)

The combat round these `spent` flags are valid for.

##### spent

```ts
spent: boolean[];
```

Defined in: [types/combat.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L151)

Parallel to the slot list: `spent[i]` is true once slot `i` is used.

***

### ActionDieRollTerms

Defined in: [types/combat.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L158)

Roll terms for a chosen action-die slot, reconciling the slot's own
modifier against the generic attack/spell bonus. See `actionDieRollTerms`.

#### Properties

##### die

```ts
die: `d${number}`;
```

Defined in: [types/combat.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L160)

The die to roll for this action.

##### modifier

```ts
modifier: number;
```

Defined in: [types/combat.ts:163](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L163)

The slot's per-die modifier (0 when none).

##### suppressAttackBonus

```ts
suppressAttackBonus: boolean;
```

Defined in: [types/combat.ts:171](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L171)

When true, the slot carries its own authoritative modifier and the
caller must NOT also add the generic attack-bonus term for this action
(otherwise `"1d20+4"` would roll `+4+4`). When false, the caller applies
its normal attack-bonus / ability-modifier logic.

***

### TwoWeaponDiceConfig

Defined in: [types/combat.ts:183](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L183)

Two-weapon fighting configuration derived from the attacker's Agility
(DCC core rules Table 4-3, plus halfling class overrides). Reductions
step each hand's action die DOWN the dice chain.

#### Properties

##### primaryDieReduction

```ts
primaryDieReduction: number;
```

Defined in: [types/combat.ts:185](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L185)

Number of dice-chain steps to reduce the primary hand's action die.

##### offHandDieReduction

```ts
offHandDieReduction: number;
```

Defined in: [types/combat.ts:187](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L187)

Number of dice-chain steps to reduce the off-hand's action die.

##### primaryCanCrit

```ts
primaryCanCrit: boolean;
```

Defined in: [types/combat.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L189)

Whether the primary hand is capable of scoring a critical hit at all.

##### offHandCanCrit

```ts
offHandCanCrit: boolean;
```

Defined in: [types/combat.ts:191](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L191)

Whether the off-hand is capable of scoring a critical hit at all.

##### primaryCritRequiresBeatAC

```ts
primaryCritRequiresBeatAC: boolean;
```

Defined in: [types/combat.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L197)

Agl-16-17 row (non-halfling): the primary hand crits only on a
natural max that ALSO beats the target's AC. The natural max does
NOT auto-hit — the attacker must actually beat AC.

##### halflingAutoCritOnMax

```ts
halflingAutoCritOnMax: boolean;
```

Defined in: [types/combat.ts:204](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L204)

Halfling class override on the clamped Agl-16 row: a natural max
on the reduced die is both an auto-hit AND an auto-crit, applied
to both hands (halflings crit with either hand on a natural max).
Replaces the non-halfling `primaryCritRequiresBeatAC` rule.

##### halflingFumbleRequiresBoth1s

```ts
halflingFumbleRequiresBoth1s: boolean;
```

Defined in: [types/combat.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L209)

Halfling class override: a natural 1 on a single hand is NOT a
fumble — halflings fumble only when BOTH hands roll natural 1.

***

### TwoWeaponAttackInput

Defined in: [types/combat.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L219)

Input for rolling a full two-weapon attack round (both hands).

The primary and off-hand attack inputs should omit `actionDie` —
the wrapper computes each hand's die from `baseActionDie` via
the Table 4-3 reductions.

#### Properties

##### agility

```ts
agility: number;
```

Defined in: [types/combat.ts:221](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L221)

Attacker's Agility score (raw, pre-halfling-clamp).

##### isHalfling?

```ts
optional isHalfling?: boolean;
```

Defined in: [types/combat.ts:227](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L227)

When true, applies the halfling class overrides: min effective
Agility 16 for row lookup, auto-crit/auto-hit on natural max of
the reduced die, and "both rolls must be natural 1" fumble rule.

##### baseActionDie

```ts
baseActionDie: `d${number}`;
```

Defined in: [types/combat.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L232)

Base action die before two-weapon reduction. Typically `d20`, or
`d16` when already two-handing a single weapon (rare combo).

##### primary

```ts
primary: Omit<AttackInput, "actionDie">;
```

Defined in: [types/combat.ts:234](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L234)

Primary-hand attack input (without `actionDie`).

##### offHand

```ts
offHand: Omit<AttackInput, "actionDie">;
```

Defined in: [types/combat.ts:236](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L236)

Off-hand attack input (without `actionDie`).

***

### TwoWeaponAttackResult

Defined in: [types/combat.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L242)

Result of a two-weapon attack round.

#### Properties

##### primary

```ts
primary: AttackResult;
```

Defined in: [types/combat.ts:243](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L243)

##### offHand

```ts
offHand: AttackResult;
```

Defined in: [types/combat.ts:244](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L244)

##### config

```ts
config: TwoWeaponDiceConfig;
```

Defined in: [types/combat.ts:245](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L245)

***

### AttackResult

Defined in: [types/combat.ts:258](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L258)

Result of an attack roll

#### Properties

##### roll

```ts
roll: RollResult;
```

Defined in: [types/combat.ts:260](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L260)

The roll result

##### deedRoll?

```ts
optional deedRoll?: RollResult;
```

Defined in: [types/combat.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L263)

The deed die result (if applicable)

##### totalBonus

```ts
totalBonus: number;
```

Defined in: [types/combat.ts:266](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L266)

Total attack bonus after all modifiers

##### total

```ts
total: number;
```

Defined in: [types/combat.ts:269](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L269)

Final total (roll + bonus)

##### isCriticalThreat

```ts
isCriticalThreat: boolean;
```

Defined in: [types/combat.ts:272](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L272)

Whether this is a critical threat

##### critSource?

```ts
optional critSource?: CritSource;
```

Defined in: [types/combat.ts:278](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L278)

When `isCriticalThreat` is true, what caused it. `undefined` when
the attack is not a critical threat.

##### isFumble

```ts
isFumble: boolean;
```

Defined in: [types/combat.ts:281](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L281)

Whether this is a fumble (natural 1)

##### isHit?

```ts
optional isHit?: boolean;
```

Defined in: [types/combat.ts:284](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L284)

Whether the attack hits (if targetAC was provided)

##### appliedModifiers

```ts
appliedModifiers: LegacyRollModifier[];
```

Defined in: [types/combat.ts:287](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L287)

All modifiers that were applied

##### deedSuccess?

```ts
optional deedSuccess?: boolean;
```

Defined in: [types/combat.ts:290](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L290)

Whether the deed was successful (roll >= 3)

***

### DamageInput

Defined in: [types/combat.ts:300](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L300)

Input for calculating damage

#### Properties

##### damageDie

```ts
damageDie: `d${number}`;
```

Defined in: [types/combat.ts:302](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L302)

Base weapon damage die (e.g., "d8" for longsword)

##### diceCount?

```ts
optional diceCount?: number;
```

Defined in: [types/combat.ts:305](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L305)

Number of damage dice (usually 1)

##### strengthModifier

```ts
strengthModifier: number;
```

Defined in: [types/combat.ts:308](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L308)

Strength modifier for melee, 0 for most missile

##### deedDieResult?

```ts
optional deedDieResult?: number;
```

Defined in: [types/combat.ts:311](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L311)

Deed die result (added to damage for warriors)

##### magicBonus?

```ts
optional magicBonus?: number;
```

Defined in: [types/combat.ts:318](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L318)

Magic weapon bonus (positive) or cursed penalty (negative).
Surfaced in `breakdown` as `source: "magic"` when positive and
`source: "cursed"` when negative.

##### extraDamageDice?

```ts
optional extraDamageDice?: {
  count: number;
  die: `d${number}`;
  flavor?: string;
  source?: string;
}[];
```

Defined in: [types/combat.ts:330](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L330)

Extra dice beyond the base weapon die. Each term is rolled
separately and added to `modifierDamage`, with its own
`breakdown` entry labelled by `source ?? flavor ?? "extra"`.

Covers dice-bearing magic weapon bonuses (e.g. `+1d4 fire`) and
multi-type per-term damage formulas (e.g. `1d6[fire]+1d6[cold]`
splits as base `d6` + one extra term `{count:1, die:"d6",
flavor:"cold"}`).

###### count

```ts
count: number;
```

###### die

```ts
die: `d${number}`;
```

###### flavor?

```ts
optional flavor?: string;
```

###### source?

```ts
optional source?: string;
```

##### bonuses?

```ts
optional bonuses?: RollBonus[];
```

Defined in: [types/combat.ts:338](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L338)

Additional bonuses

***

### DamageResult

Defined in: [types/combat.ts:344](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L344)

Result of a damage roll

#### Properties

##### roll

```ts
roll: RollResult;
```

Defined in: [types/combat.ts:346](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L346)

The damage roll result

##### baseDamage

```ts
baseDamage: number;
```

Defined in: [types/combat.ts:349](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L349)

Base damage from dice

##### modifierDamage

```ts
modifierDamage: number;
```

Defined in: [types/combat.ts:352](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L352)

Modifier damage (str, deed, magic, etc.)

##### total

```ts
total: number;
```

Defined in: [types/combat.ts:355](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L355)

Final total damage

##### breakdown

```ts
breakdown: DamageBreakdown[];
```

Defined in: [types/combat.ts:358](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L358)

Breakdown of damage sources

***

### DamageBreakdown

Defined in: [types/combat.ts:364](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L364)

Single source of damage

#### Properties

##### source

```ts
source: string;
```

Defined in: [types/combat.ts:366](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L366)

Source of the damage

##### amount

```ts
amount: number;
```

Defined in: [types/combat.ts:369](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L369)

Amount

***

### CriticalInput

Defined in: [types/combat.ts:384](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L384)

Input for rolling a critical hit

#### Properties

##### critTable

```ts
critTable: CritTableId;
```

Defined in: [types/combat.ts:386](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L386)

Which crit table to use

##### critDie

```ts
critDie: string;
```

Defined in: [types/combat.ts:389](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L389)

Crit die formula (e.g., "d12", "2d20", or "d30+2").

##### luckModifier

```ts
luckModifier: number;
```

Defined in: [types/combat.ts:392](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L392)

Luck modifier (the roller's own Luck; added to the crit roll)

##### defenderLuckModifier?

```ts
optional defenderLuckModifier?: number;
```

Defined in: [types/combat.ts:401](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L401)

Defending PC's Luck modifier, for a critical hit scored *against* that PC.
Per DCC RAW a PC's Luck modifier always alters a monster's critical hit:
a positive modifier reduces the monster's roll, a negative one grants a
bonus to it. Applied as a subtraction of this value from the crit total.
Omit (or 0) when the crit is not against a luck-bearing defender.

##### level?

```ts
optional level?: number;
```

Defined in: [types/combat.ts:404](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L404)

Level (adds to crit roll for some classes)

##### bonuses?

```ts
optional bonuses?: RollBonus[];
```

Defined in: [types/combat.ts:407](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L407)

Additional crit modifiers (from items, spells, etc.)

***

### CriticalResult

Defined in: [types/combat.ts:413](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L413)

Result of a critical hit roll

#### Properties

##### roll

```ts
roll: RollResult;
```

Defined in: [types/combat.ts:415](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L415)

The crit roll result

##### total

```ts
total: number;
```

Defined in: [types/combat.ts:418](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L418)

Total crit roll (die + modifiers)

##### critTable

```ts
critTable: CritTableId;
```

Defined in: [types/combat.ts:421](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L421)

Which table to look up the result on

##### tableResult?

```ts
optional tableResult?: string;
```

Defined in: [types/combat.ts:424](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L424)

The table result (from lookup)

##### extraDamageDice?

```ts
optional extraDamageDice?: string;
```

Defined in: [types/combat.ts:427](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L427)

Extra damage dice from the crit

##### extraDamageModifier?

```ts
optional extraDamageModifier?: number;
```

Defined in: [types/combat.ts:430](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L430)

Extra damage modifier

##### effect?

```ts
optional effect?: string;
```

Defined in: [types/combat.ts:433](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L433)

Special effect description

***

### ArmorStats

Defined in: [types/combat.ts:490](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L490)

Armor statistics for equipped armor

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/combat.ts:492](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L492)

Armor name

##### type

```ts
type: ArmorType;
```

Defined in: [types/combat.ts:495](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L495)

Armor type

##### acBonus

```ts
acBonus: number;
```

Defined in: [types/combat.ts:498](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L498)

AC bonus (can differ from standard for magic armor)

##### magicBonus?

```ts
optional magicBonus?: number;
```

Defined in: [types/combat.ts:501](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L501)

Magic bonus (if any)

##### checkPenalty

```ts
checkPenalty: number;
```

Defined in: [types/combat.ts:504](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L504)

Check penalty (negative number, can be reduced by magic)

##### speedPenalty

```ts
speedPenalty: number;
```

Defined in: [types/combat.ts:507](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L507)

Speed penalty in feet

##### fumbleDie

```ts
fumbleDie: `d${number}`;
```

Defined in: [types/combat.ts:510](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L510)

Fumble die

***

### ShieldStats

Defined in: [types/combat.ts:516](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L516)

Shield statistics

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/combat.ts:518](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L518)

Shield name

##### acBonus

```ts
acBonus: number;
```

Defined in: [types/combat.ts:521](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L521)

AC bonus (usually 1, can be higher for magic shields)

##### magicBonus?

```ts
optional magicBonus?: number;
```

Defined in: [types/combat.ts:524](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L524)

Magic bonus (if any)

***

### FumbleInput

Defined in: [types/combat.ts:530](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L530)

Input for rolling a fumble

#### Properties

##### armorType

```ts
armorType: ArmorType;
```

Defined in: [types/combat.ts:532](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L532)

Armor type worn (determines fumble die)

##### luckModifier

```ts
luckModifier: number;
```

Defined in: [types/combat.ts:535](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L535)

Luck modifier (subtracted from fumble roll - lower is worse!)

##### fumbleDieOverride?

```ts
optional fumbleDieOverride?: `d${number}`;
```

Defined in: [types/combat.ts:538](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L538)

Override fumble die (for special circumstances)

***

### FumbleResult

Defined in: [types/combat.ts:544](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L544)

Result of a fumble roll

#### Properties

##### roll

```ts
roll: RollResult;
```

Defined in: [types/combat.ts:546](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L546)

The fumble roll result

##### total

```ts
total: number;
```

Defined in: [types/combat.ts:549](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L549)

Total fumble roll (die - luck, minimum 0)

##### fumbleDie

```ts
fumbleDie: `d${number}`;
```

Defined in: [types/combat.ts:552](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L552)

The fumble die used

##### tableResult?

```ts
optional tableResult?: string;
```

Defined in: [types/combat.ts:555](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L555)

The table result (from lookup)

##### effect?

```ts
optional effect?: string;
```

Defined in: [types/combat.ts:558](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L558)

Effect description

***

### InitiativeInput

Defined in: [types/combat.ts:572](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L572)

Input for rolling initiative

RAW (Core Book Ch. 4): roll 1d20 + Agility mod. A character wielding a
two-handed weapon rolls d16 instead of d20. Warriors add their class
level as a flat modifier — pass it as `classModifier`.

#### Properties

##### initiativeDie

```ts
initiativeDie: `d${number}`;
```

Defined in: [types/combat.ts:577](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L577)

Initiative die. Callers should pass `d20` by default, or `d16` when
wielding a two-handed weapon. See `getInitiativeDie`.

##### agilityModifier

```ts
agilityModifier: number;
```

Defined in: [types/combat.ts:580](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L580)

Agility modifier

##### classModifier?

```ts
optional classModifier?: number;
```

Defined in: [types/combat.ts:586](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L586)

Flat class-based initiative modifier. Warriors pass their class
level here (RAW: warriors add level to initiative).

##### bonuses?

```ts
optional bonuses?: RollBonus[];
```

Defined in: [types/combat.ts:589](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L589)

Additional bonuses

***

### InitiativeResult

Defined in: [types/combat.ts:595](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L595)

Result of an initiative roll

#### Properties

##### roll

```ts
roll: RollResult;
```

Defined in: [types/combat.ts:597](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L597)

The initiative roll result

##### total

```ts
total: number;
```

Defined in: [types/combat.ts:600](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L600)

Total initiative

##### modifiers

```ts
modifiers: LegacyRollModifier[];
```

Defined in: [types/combat.ts:603](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L603)

All modifiers applied

***

### CombatEvents

Defined in: [types/combat.ts:613](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L613)

Events emitted during combat

#### Properties

##### onAttackRoll?

```ts
optional onAttackRoll?: (result: AttackResult) => void;
```

Defined in: [types/combat.ts:615](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L615)

Called when an attack roll is made

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`AttackResult`](#attackresult) |

###### Returns

`void`

##### onCriticalThreat?

```ts
optional onCriticalThreat?: (result: AttackResult) => void;
```

Defined in: [types/combat.ts:618](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L618)

Called when a critical threat is rolled

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`AttackResult`](#attackresult) |

###### Returns

`void`

##### onFumbleRoll?

```ts
optional onFumbleRoll?: (result: AttackResult) => void;
```

Defined in: [types/combat.ts:621](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L621)

Called when a fumble is rolled

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`AttackResult`](#attackresult) |

###### Returns

`void`

##### onDamageRoll?

```ts
optional onDamageRoll?: (result: DamageResult) => void;
```

Defined in: [types/combat.ts:624](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L624)

Called when damage is rolled

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`DamageResult`](#damageresult) |

###### Returns

`void`

##### onCriticalResult?

```ts
optional onCriticalResult?: (result: CriticalResult) => void;
```

Defined in: [types/combat.ts:627](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L627)

Called when a crit table result is determined

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`CriticalResult`](#criticalresult) |

###### Returns

`void`

##### onFumbleResult?

```ts
optional onFumbleResult?: (result: FumbleResult) => void;
```

Defined in: [types/combat.ts:630](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L630)

Called when a fumble table result is determined

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`FumbleResult`](#fumbleresult) |

###### Returns

`void`

##### onInitiativeRoll?

```ts
optional onInitiativeRoll?: (result: InitiativeResult) => void;
```

Defined in: [types/combat.ts:633](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L633)

Called when initiative is rolled

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`InitiativeResult`](#initiativeresult) |

###### Returns

`void`

##### onDeedAttempt?

```ts
optional onDeedAttempt?: (deedRoll: RollResult, success: boolean) => void;
```

Defined in: [types/combat.ts:636](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L636)

Called when a deed is attempted

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `deedRoll` | [`RollResult`](#rollresult) |
| `success` | `boolean` |

###### Returns

`void`

***

### BackstabDamage

Defined in: [types/combat.ts:650](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L650)

Alternate damage expression used when a thief lands a successful
backstab using a backstab-friendly weapon (DCC Table 3-1 footnote).

The thief rolls this expression *instead of* the weapon's normal
damage — it is a full replacement, not an additive bonus.

#### Properties

##### damageDie

```ts
damageDie: `d${number}`;
```

Defined in: [types/combat.ts:652](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L652)

Alternate damage die rolled on a successful backstab

##### diceCount?

```ts
optional diceCount?: number;
```

Defined in: [types/combat.ts:655](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L655)

Number of damage dice (defaults to 1)

***

### WeaponStats

Defined in: [types/combat.ts:661](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L661)

Weapon properties for combat calculations

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/combat.ts:663](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L663)

Weapon name

##### damageDie

```ts
damageDie: `d${number}`;
```

Defined in: [types/combat.ts:666](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L666)

Damage die

##### diceCount?

```ts
optional diceCount?: number;
```

Defined in: [types/combat.ts:669](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L669)

Number of damage dice

##### isMelee

```ts
isMelee: boolean;
```

Defined in: [types/combat.ts:672](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L672)

Whether this is a melee weapon

##### isRanged

```ts
isRanged: boolean;
```

Defined in: [types/combat.ts:675](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L675)

Whether this is a ranged weapon

##### twoHanded?

```ts
optional twoHanded?: boolean;
```

Defined in: [types/combat.ts:678](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L678)

Whether this weapon can be used two-handed for extra damage

##### twoHandedDamageDie?

```ts
optional twoHandedDamageDie?: `d${number}`;
```

Defined in: [types/combat.ts:681](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L681)

Two-handed damage die (if different)

##### magicBonus?

```ts
optional magicBonus?: number;
```

Defined in: [types/combat.ts:684](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L684)

Magic bonus (if any)

##### range?

```ts
optional range?: number;
```

Defined in: [types/combat.ts:687](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L687)

Range in feet (for ranged weapons)

##### attackAbility?

```ts
optional attackAbility?: DCCAbilityId;
```

Defined in: [types/combat.ts:690](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L690)

Ability used for attack (override default)

##### damageAbility?

```ts
optional damageAbility?: DCCAbilityId;
```

Defined in: [types/combat.ts:693](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L693)

Ability used for damage (override default)

##### backstabDamage?

```ts
optional backstabDamage?: BackstabDamage;
```

Defined in: [types/combat.ts:701](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L701)

Alternate damage used on a successful thief backstab. Only a small
set of weapons has this (DCC Table 3-1 footnote: dagger, blackjack,
blowgun, garrote). When the attacker is a thief AND the attack is
a backstab, roll this instead of the normal damage.

***

### CreatureAttack

Defined in: [types/creatures.ts:12](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L12)

Creature attack definition

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/creatures.ts:14](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L14)

Attack name (e.g., "bite", "claw", "mace")

##### toHit

```ts
toHit: string;
```

Defined in: [types/creatures.ts:17](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L17)

Attack bonus (e.g., "+5")

##### melee

```ts
melee: boolean;
```

Defined in: [types/creatures.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L20)

Whether this is a melee attack

##### range?

```ts
optional range?: string;
```

Defined in: [types/creatures.ts:23](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L23)

Range for missile attacks (e.g., "60'")

##### damage

```ts
damage: string;
```

Defined in: [types/creatures.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L26)

Damage expression (e.g., "1d6+5", "2d4")

***

### CreatureSaves

Defined in: [types/creatures.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L32)

Creature saving throws

#### Properties

##### fort

```ts
fort: number;
```

Defined in: [types/creatures.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L34)

Fortitude save

##### ref

```ts
ref: number;
```

Defined in: [types/creatures.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L37)

Reflex save

##### will

```ts
will: number;
```

Defined in: [types/creatures.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L40)

Will save

***

### CreatureSpeed

Defined in: [types/creatures.ts:46](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L46)

Creature movement speeds

#### Properties

##### land

```ts
land: string;
```

Defined in: [types/creatures.ts:48](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L48)

Base land speed (e.g., "30'")

##### fly?

```ts
optional fly?: string;
```

Defined in: [types/creatures.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L51)

Flying speed if any

##### swim?

```ts
optional swim?: string;
```

Defined in: [types/creatures.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L54)

Swimming speed if any

##### other?

```ts
optional other?: string;
```

Defined in: [types/creatures.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L57)

Other movement (e.g., "climb 20'")

***

### Creature

Defined in: [types/creatures.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L63)

Core creature/NPC data structure

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/creatures.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L65)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/creatures.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L68)

Display name

##### ac

```ts
ac: number;
```

Defined in: [types/creatures.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L71)

Armor Class

##### hitDice

```ts
hitDice: string;
```

Defined in: [types/creatures.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L74)

Hit Dice expression (e.g., "4d8+4")

##### hp

```ts
hp: number;
```

Defined in: [types/creatures.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L77)

Average/default HP

##### init

```ts
init: number;
```

Defined in: [types/creatures.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L80)

Initiative modifier

##### speed

```ts
speed: CreatureSpeed;
```

Defined in: [types/creatures.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L83)

Movement speed

##### actionDice

```ts
actionDice: string;
```

Defined in: [types/creatures.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L86)

Action dice (e.g., "1d20", "3d20")

##### critDie

```ts
critDie: string;
```

Defined in: [types/creatures.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L89)

Critical hit die (e.g., "1d10")

##### critTable

```ts
critTable: string;
```

Defined in: [types/creatures.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L92)

Critical hit table (e.g., "M", "III")

##### saves

```ts
saves: CreatureSaves;
```

Defined in: [types/creatures.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L95)

Saving throws

##### alignment

```ts
alignment: Alignment;
```

Defined in: [types/creatures.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L98)

Alignment

##### attacks

```ts
attacks: CreatureAttack[];
```

Defined in: [types/creatures.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L101)

Attacks

##### special?

```ts
optional special?: string;
```

Defined in: [types/creatures.ts:104](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L104)

Special abilities description

##### statline

```ts
statline: string;
```

Defined in: [types/creatures.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L107)

Full statline from source

##### category?

```ts
optional category?: string;
```

Defined in: [types/creatures.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L110)

Category for grouping related creatures

***

### RollOptions

Defined in: [types/dice.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L50)

Options for synchronous roll evaluation.

#### Extended by

- [`SkillResolveOptions`](skills.md#skillresolveoptions)
- [`SpellCheckOptions`](#spellcheckoptions)

#### Properties

##### mode?

```ts
optional mode?: RollMode;
```

Defined in: [types/dice.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L52)

Whether to just build the formula or actually evaluate it

##### roller?

```ts
optional roller?: DiceRoller;
```

Defined in: [types/dice.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L55)

Synchronous custom roller — used instead of built-in RNG when provided

***

### RollOptionsAsync

Defined in: [types/dice.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L62)

Options for asynchronous roll evaluation. Used by evaluateRollAsync
and the async-sibling resolveSkillCheckAsync / rollCheckAsync variants.

#### Extended by

- [`SkillResolveOptionsAsync`](skills.md#skillresolveoptionsasync)

#### Properties

##### mode?

```ts
optional mode?: RollMode;
```

Defined in: [types/dice.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L64)

Whether to just build the formula or actually evaluate it

##### roller

```ts
roller: AsyncDiceRoller;
```

Defined in: [types/dice.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L67)

Asynchronous custom roller. Required for async evaluation.

***

### ModifierOrigin

Defined in: [types/dice.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L83)

Origin metadata — structured "why this modifier exists" information
used by renderers for grouping, filtering, and i18n.

#### Properties

##### category

```ts
category: ModifierCategory;
```

Defined in: [types/dice.ts:85](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L85)

Which category this modifier falls into. Closed union.

##### id

```ts
id: string;
```

Defined in: [types/dice.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L94)

Stable identifier within the category. Examples:
- `'str'` for ability modifiers
- `'armor-check-penalty'` for the DCC armor check penalty
- `'mighty-deed'` for a warrior's deed die contribution
- a Foundry item/AE UUID for equipment or active-effect sources

##### label?

```ts
optional label?: string;
```

Defined in: [types/dice.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L101)

Human-readable label for display. Typically English at emission;
renderers may localize via a catalog. Optional — renderers can
synthesize a fallback from `category` + `id`.

##### moduleId?

```ts
optional moduleId?: string;
```

Defined in: [types/dice.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L107)

Module identifier, only set when `category === 'module'`.
Examples: `'dcc-qol'`, `'xcc'`.

##### stackGroup?

```ts
optional stackGroup?: string;
```

Defined in: [types/dice.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L114)

Optional hint for future stacking-rule engines. Modifiers sharing
a stack group may be deduplicated or limited. Not interpreted by
the evaluator today; reserved for use by variants and homebrew.

***

### AddModifier

Defined in: [types/dice.ts:141](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L141)

Flat numeric adjustment to the total. The most common case.
The evaluator sets `applied` to reflect whether the value contributed.

#### Properties

##### kind

```ts
kind: "add";
```

Defined in: [types/dice.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L142)

##### value

```ts
value: number;
```

Defined in: [types/dice.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L143)

##### origin

```ts
origin: ModifierOrigin;
```

Defined in: [types/dice.ts:144](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L144)

##### applied?

```ts
optional applied?: boolean;
```

Defined in: [types/dice.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L146)

Output-only: set by the evaluator. True if the value affected the total.

***

### AddDiceModifier

Defined in: [types/dice.ts:152](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L152)

Add a dice expression to the formula (e.g. Mighty Deed "+1d3").

#### Properties

##### kind

```ts
kind: "add-dice";
```

Defined in: [types/dice.ts:153](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L153)

##### dice

```ts
dice: string;
```

Defined in: [types/dice.ts:155](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L155)

A bare dice expression, e.g. "1d3", "2d6".

##### origin

```ts
origin: ModifierOrigin;
```

Defined in: [types/dice.ts:156](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L156)

##### applied?

```ts
optional applied?: boolean;
```

Defined in: [types/dice.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L158)

Output-only: set by the evaluator.

***

### SetDieModifier

Defined in: [types/dice.ts:165](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L165)

Replace the base die with a specific die. When multiple `set-die`
modifiers are present, the LAST in list order wins.

#### Properties

##### kind

```ts
kind: "set-die";
```

Defined in: [types/dice.ts:166](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L166)

##### die

```ts
die: `d${number}`;
```

Defined in: [types/dice.ts:167](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L167)

##### origin

```ts
origin: ModifierOrigin;
```

Defined in: [types/dice.ts:168](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L168)

***

### BumpDieModifier

Defined in: [types/dice.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L174)

Shift the die up or down the DCC dice chain. Multiple bumps sum.

#### Properties

##### kind

```ts
kind: "bump-die";
```

Defined in: [types/dice.ts:175](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L175)

##### steps

```ts
steps: number;
```

Defined in: [types/dice.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L177)

Positive bumps up the chain; negative bumps down.

##### origin

```ts
origin: ModifierOrigin;
```

Defined in: [types/dice.ts:178](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L178)

***

### MultiplyModifier

Defined in: [types/dice.ts:186](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L186)

Multiplicative factor applied after additive modifiers. Primarily
used by damage rolls (e.g. spell-effect damage doubling, critical
multipliers).

#### Properties

##### kind

```ts
kind: "multiply";
```

Defined in: [types/dice.ts:187](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L187)

##### factor

```ts
factor: number;
```

Defined in: [types/dice.ts:188](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L188)

##### origin

```ts
origin: ModifierOrigin;
```

Defined in: [types/dice.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L189)

***

### ThreatShiftModifier

Defined in: [types/dice.ts:196](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L196)

Shift the effective threat range for critical detection.
Positive `amount` widens (e.g. 19-20 → 18-20); negative narrows.

#### Properties

##### kind

```ts
kind: "threat-shift";
```

Defined in: [types/dice.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L197)

##### amount

```ts
amount: number;
```

Defined in: [types/dice.ts:198](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L198)

##### origin

```ts
origin: ModifierOrigin;
```

Defined in: [types/dice.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L199)

***

### DisplayModifier

Defined in: [types/dice.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L207)

Shown in the breakdown but NOT added to the total. Informational.
Used for things like a 0-value Armor Check Penalty that players
still want to see.

#### Properties

##### kind

```ts
kind: "display";
```

Defined in: [types/dice.ts:208](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L208)

##### value

```ts
value: number;
```

Defined in: [types/dice.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L209)

##### origin

```ts
origin: ModifierOrigin;
```

Defined in: [types/dice.ts:210](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L210)

***

### LegacyRollModifier

Defined in: [types/dice.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L242)

---------------------------------------------------------------------
Legacy modifier type

The former flat `{ source, value, label }` shape. Frozen in form.
Subsystems that haven't migrated to the tagged-union `RollModifier`
yet (combat, spells, patron, occupation — see docs/MODIFIERS.md §9)
continue to use this type. It will be deleted when every subsystem
has migrated.

Do NOT use this type in new code — always reach for `RollModifier`.
---------------------------------------------------------------------

#### Properties

##### source

```ts
source: string;
```

Defined in: [types/dice.ts:244](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L244)

Source of the modifier (e.g., "strength", "luck", "situational")

##### value

```ts
value: number;
```

Defined in: [types/dice.ts:247](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L247)

The modifier value

##### label?

```ts
optional label?: string;
```

Defined in: [types/dice.ts:250](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L250)

Optional label for display

***

### RollResult

Defined in: [types/dice.ts:256](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L256)

Result of a dice roll

#### Properties

##### formula

```ts
formula: string;
```

Defined in: [types/dice.ts:258](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L258)

The complete formula (e.g., "1d20+5")

##### modifiers

```ts
modifiers: LegacyRollModifier[];
```

Defined in: [types/dice.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L263)

Breakdown of all legacy-shape modifiers that contributed. Produced
 by evaluateRoll from the parsed formula for backward compatibility
 with consumers that haven't migrated to the new RollModifier yet.

##### total?

```ts
optional total?: number;
```

Defined in: [types/dice.ts:266](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L266)

The total result - only present if mode was 'evaluate'

##### natural?

```ts
optional natural?: number;
```

Defined in: [types/dice.ts:269](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L269)

The natural die roll before modifiers - only present if mode was 'evaluate'

##### die

```ts
die: `d${number}`;
```

Defined in: [types/dice.ts:272](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L272)

The die used for the roll (e.g., "d20")

##### diceCount

```ts
diceCount: number;
```

Defined in: [types/dice.ts:275](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L275)

Number of dice rolled

***

### ParsedDiceExpression

Defined in: [types/dice.ts:281](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L281)

A parsed dice expression

#### Properties

##### count

```ts
count: number;
```

Defined in: [types/dice.ts:283](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L283)

Number of dice (e.g., 2 in "2d20")

##### faces

```ts
faces: number;
```

Defined in: [types/dice.ts:286](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L286)

Faces on each die (e.g., 20 in "2d20")

##### suffix

```ts
suffix: string;
```

Defined in: [types/dice.ts:289](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L289)

Any suffix after the dice (e.g., "+5" in "1d20+5")

##### original

```ts
original: string;
```

Defined in: [types/dice.ts:292](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L292)

The original expression

***

### EquipmentEntry

Defined in: [types/equipment.ts:16](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L16)

Equipment entry representing an item from the DCC equipment table

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:18](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L18)

Item name

##### valueInCopper

```ts
valueInCopper: number;
```

Defined in: [types/equipment.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L21)

Value in copper pieces

##### description?

```ts
optional description?: string;
```

Defined in: [types/equipment.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L24)

Optional description/notes about the item

***

### ArmorEntry

Defined in: [types/equipment.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L34)

Armor entry representing armor or shield from the DCC armor table

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:36](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L36)

Armor name

##### acBonus

```ts
acBonus: number;
```

Defined in: [types/equipment.ts:39](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L39)

AC bonus provided by this armor

##### checkPenalty

```ts
checkPenalty: number;
```

Defined in: [types/equipment.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L42)

Check penalty (negative number, applied to certain skill checks)

##### speedPenalty

```ts
speedPenalty: string;
```

Defined in: [types/equipment.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L45)

Speed penalty (e.g., "-5'" or "" for none)

##### fumbleDie

```ts
fumbleDie: string;
```

Defined in: [types/equipment.ts:48](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L48)

Fumble die when wearing this armor (e.g., "d8", "d12", "d16")

##### costGp

```ts
costGp: number;
```

Defined in: [types/equipment.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L51)

Cost in gold pieces

##### isShield

```ts
isShield: boolean;
```

Defined in: [types/equipment.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L54)

Whether this is a shield rather than body armor

***

### WeaponEntry

Defined in: [types/equipment.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L64)

Weapon entry representing a weapon from the DCC weapons table

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L66)

Weapon name

##### damage

```ts
damage: string;
```

Defined in: [types/equipment.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L69)

Base damage die (e.g., "1d8", "1d6", "1d4")

##### melee

```ts
melee: boolean;
```

Defined in: [types/equipment.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L72)

Whether this is a melee weapon

##### range?

```ts
optional range?: string;
```

Defined in: [types/equipment.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L75)

Range increments for ranged/thrown weapons (e.g., "10/20/30")

##### twoHanded

```ts
twoHanded: boolean;
```

Defined in: [types/equipment.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L78)

Whether this requires two hands

##### doubleIfMounted

```ts
doubleIfMounted: boolean;
```

Defined in: [types/equipment.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L81)

Whether damage is doubled on a mounted charge

##### shortRangeStrength

```ts
shortRangeStrength: boolean;
```

Defined in: [types/equipment.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L84)

Whether strength bonus applies at short range (thrown weapons)

##### subdual

```ts
subdual: boolean;
```

Defined in: [types/equipment.ts:87](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L87)

Whether this deals subdual (non-lethal) damage

##### costGp

```ts
costGp: number;
```

Defined in: [types/equipment.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L90)

Cost in gold pieces

##### costSp

```ts
costSp: number;
```

Defined in: [types/equipment.ts:93](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L93)

Cost in silver pieces (for items costing less than 1 gp)

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/equipment.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L96)

Optional notes about special properties

***

### AmmunitionEntry

Defined in: [types/equipment.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L106)

Ammunition entry representing projectiles for ranged weapons

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L108)

Ammunition name

##### quantity

```ts
quantity: number;
```

Defined in: [types/equipment.ts:111](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L111)

Quantity per purchase (e.g., 20 arrows, 30 sling stones)

##### costGp

```ts
costGp: number;
```

Defined in: [types/equipment.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L114)

Cost in gold pieces

##### costSp

```ts
costSp: number;
```

Defined in: [types/equipment.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L117)

Cost in silver pieces (for items costing less than 1 gp)

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/equipment.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L120)

Optional notes

***

### MountEntry

Defined in: [types/equipment.ts:130](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L130)

Mount entry representing a rideable animal

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:132](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L132)

Mount name

##### costGp

```ts
costGp: number;
```

Defined in: [types/equipment.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L135)

Cost in gold pieces

***

### BardingEntry

Defined in: [types/equipment.ts:141](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L141)

Barding entry representing horse/mount armor

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L143)

Barding name (armor type)

##### costGp

```ts
costGp: number;
```

Defined in: [types/equipment.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L146)

Cost in gold pieces (4x normal armor cost)

##### acBonus

```ts
acBonus: number;
```

Defined in: [types/equipment.ts:149](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L149)

AC bonus (same as equivalent armor)

***

### MountEquipmentEntry

Defined in: [types/equipment.ts:155](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L155)

Mount equipment entry

#### Properties

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:157](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L157)

Item name

##### costGp

```ts
costGp: number;
```

Defined in: [types/equipment.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L160)

Cost in gold pieces

##### costSp

```ts
costSp: number;
```

Defined in: [types/equipment.ts:163](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L163)

Cost in silver pieces (for items costing less than 1 gp)

##### costCp

```ts
costCp: number;
```

Defined in: [types/equipment.ts:166](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L166)

Cost in copper pieces (for items costing less than 1 sp)

***

### OccupationWeapon

Defined in: [types/equipment.ts:176](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L176)

An occupation item that can be used as a weapon

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/equipment.ts:178](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L178)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:181](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L181)

Item name (e.g., "Awl (as dagger)")

##### type

```ts
type: "weapon";
```

Defined in: [types/equipment.ts:184](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L184)

Item type

##### damage

```ts
damage: string;
```

Defined in: [types/equipment.ts:187](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L187)

Damage dice

##### melee

```ts
melee: boolean;
```

Defined in: [types/equipment.ts:190](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L190)

Whether this is a melee weapon

##### range?

```ts
optional range?: string;
```

Defined in: [types/equipment.ts:193](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L193)

Range for thrown/ranged weapons

##### twoHanded?

```ts
optional twoHanded?: boolean;
```

Defined in: [types/equipment.ts:196](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L196)

Whether this requires two hands

***

### OccupationTradeGood

Defined in: [types/equipment.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L202)

An occupation item that is trade goods/equipment

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/equipment.ts:204](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L204)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L207)

Item name

##### type

```ts
type: "equipment";
```

Defined in: [types/equipment.ts:210](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L210)

Item type

***

### OccupationTreasure

Defined in: [types/equipment.ts:216](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L216)

An occupation item that is treasure (coins, gems, etc.)

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/equipment.ts:218](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L218)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:221](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L221)

Item name

##### type

```ts
type: "treasure";
```

Defined in: [types/equipment.ts:224](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L224)

Item type

***

### OccupationArmor

Defined in: [types/equipment.ts:230](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L230)

An occupation item that is armor

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/equipment.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L232)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/equipment.ts:235](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L235)

Item name

##### type

```ts
type: "armor";
```

Defined in: [types/equipment.ts:238](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L238)

Item type

***

### RandomSource

Defined in: [types/random.ts:16](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L16)

Source of randomness for dice rolls and selections.

Implementations:
- `createDefaultRandomSource()` - Uses Math.random()
- `createSeededRandomSource(seed)` - Reproducible results
- `createMockRandomSource(values)` - Predetermined values for testing

#### Methods

##### roll()

```ts
roll(sides: number): number;
```

Defined in: [types/random.ts:22](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L22)

Roll a single die, returning a value from 1 to sides (inclusive).

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `sides` | `number` | Number of sides on the die (e.g., 6 for d6) |

###### Returns

`number`

A value from 1 to sides

##### rollMultiple()

```ts
rollMultiple(count: number, sides: number): number[];
```

Defined in: [types/random.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L30)

Roll multiple dice of the same type.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `count` | `number` | Number of dice to roll |
| `sides` | `number` | Number of sides on each die |

###### Returns

`number`[]

Array of individual die results

##### randomIndex()

```ts
randomIndex(max: number): number;
```

Defined in: [types/random.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L38)

Pick a random index from 0 to max-1.
Useful for selecting from arrays.

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `max` | `number` | Exclusive upper bound |

###### Returns

`number`

A value from 0 to max-1

##### pick()

```ts
pick<T>(array: readonly T[]): T | undefined;
```

Defined in: [types/random.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L45)

Pick a random element from an array.

###### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | readonly `T`[] | Array to pick from |

###### Returns

`T` \| `undefined`

A random element, or undefined if array is empty

***

### MockRandomQueue

Defined in: [types/random.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L123)

Queue of predetermined values for mock random source.

#### Properties

##### rolls?

```ts
optional rolls?: number[];
```

Defined in: [types/random.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L125)

Predetermined die roll results (consumed in order)

##### indices?

```ts
optional indices?: number[];
```

Defined in: [types/random.ts:128](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L128)

Predetermined index selections (consumed in order)

***

### ModifierEffect

Defined in: [types/skills.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L71)

Effect of a modifier skill

#### Properties

##### type

```ts
type: ModifierEffectType;
```

Defined in: [types/skills.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L72)

##### value?

```ts
optional value?: number;
```

Defined in: [types/skills.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L75)

For flat bonuses

##### multiplier?

```ts
optional multiplier?: number;
```

Defined in: [types/skills.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L78)

For luck-multiplied effects

##### die?

```ts
optional die?: `d${number}`;
```

Defined in: [types/skills.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L81)

For die-based effects

##### ability?

```ts
optional ability?: string;
```

Defined in: [types/skills.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L84)

For ability-based effects

***

### SkillRollConfig

Defined in: [types/skills.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L90)

Configuration for a skill's roll

#### Properties

##### die

```ts
die: `d${number}`;
```

Defined in: [types/skills.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L92)

Base die to roll (e.g., "d20", "d24")

##### useDiceChain?

```ts
optional useDiceChain?: boolean;
```

Defined in: [types/skills.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L95)

Can this die be bumped up/down the dice chain?

##### ability?

```ts
optional ability?: string;
```

Defined in: [types/skills.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L98)

Which ability modifier applies (if any)

##### levelModifier?

```ts
optional levelModifier?: LevelModifierType;
```

Defined in: [types/skills.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L101)

How level affects the roll

##### allowLuck?

```ts
optional allowLuck?: boolean;
```

Defined in: [types/skills.ts:104](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L104)

Can luck be applied to this roll?

##### luckMultiplier?

```ts
optional luckMultiplier?: number;
```

Defined in: [types/skills.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L107)

Luck multiplier (default 1)

***

### ResultTableConfig

Defined in: [types/skills.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L113)

Configuration for table-based results

#### Properties

##### tableId

```ts
tableId: string;
```

Defined in: [types/skills.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L115)

ID of the table to look up

##### rollModifier?

```ts
optional rollModifier?: string;
```

Defined in: [types/skills.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L118)

Additional modifier to the table roll

##### column?

```ts
optional column?: string;
```

Defined in: [types/skills.ts:121](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L121)

Column to use in the table (if multi-column)

***

### ModifiesConfig

Defined in: [types/skills.ts:127](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L127)

Configuration for skills that modify other actions

#### Properties

##### action

```ts
action: ModifiableAction;
```

Defined in: [types/skills.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L129)

What action this skill modifies

##### effect

```ts
effect: ModifierEffect;
```

Defined in: [types/skills.ts:132](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L132)

The effect to apply

##### condition?

```ts
optional condition?: string;
```

Defined in: [types/skills.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L135)

Condition when this applies (e.g., "with-melee-weapon")

***

### EnablesConfig

Defined in: [types/skills.ts:141](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L141)

Configuration for skills that enable other mechanics

#### Properties

##### action

```ts
action: string;
```

Defined in: [types/skills.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L143)

What action/mechanic this enables

##### condition?

```ts
optional condition?: string;
```

Defined in: [types/skills.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L146)

When this triggers (e.g., "on-attack", "wielding-shield")

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [types/skills.ts:149](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L149)

Additional data for the enabled action

***

### SkillCost

Defined in: [types/skills.ts:155](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L155)

Resource cost for using a skill

#### Properties

##### resource

```ts
resource: ResourceType;
```

Defined in: [types/skills.ts:157](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L157)

Type of resource consumed

##### amount

```ts
amount: string | number;
```

Defined in: [types/skills.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L160)

Amount consumed (number or formula)

##### timing?

```ts
optional timing?: "before" | "after-failure" | "after-success" | "always";
```

Defined in: [types/skills.ts:163](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L163)

When the cost is paid (before roll, after failure, etc.)

***

### SkillProgression

Defined in: [types/skills.ts:169](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L169)

Level-based progression for a skill

#### Properties

##### die?

```ts
optional die?: `d${number}`;
```

Defined in: [types/skills.ts:171](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L171)

Die to use at this level

##### bonus?

```ts
optional bonus?: number;
```

Defined in: [types/skills.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L174)

Flat bonus at this level

##### enables?

```ts
optional enables?: EnablesConfig;
```

Defined in: [types/skills.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L177)

For enabling skills, what's enabled at this level

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [types/skills.ts:180](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L180)

Any other level-specific data

***

### SkillDefinition

Defined in: [types/skills.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L189)

Complete skill definition

This is the core of the unified skill system. Every class ability,
from thief skills to turn unholy to mighty deeds, is defined as a skill.

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/skills.ts:191](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L191)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/skills.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L194)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/skills.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L197)

Description of what the skill does

##### type

```ts
type: SkillType;
```

Defined in: [types/skills.ts:200](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L200)

What type of skill this is

##### roll?

```ts
optional roll?: SkillRollConfig;
```

Defined in: [types/skills.ts:203](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L203)

Roll configuration (for check-type skills)

##### resultTable?

```ts
optional resultTable?: ResultTableConfig;
```

Defined in: [types/skills.ts:206](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L206)

Result table configuration

##### modifies?

```ts
optional modifies?: ModifiesConfig;
```

Defined in: [types/skills.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L209)

What this skill modifies (for modifier-type skills)

##### enables?

```ts
optional enables?: EnablesConfig;
```

Defined in: [types/skills.ts:212](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L212)

What this skill enables (for passive-type skills)

##### progression?

```ts
optional progression?: Record<number, SkillProgression>;
```

Defined in: [types/skills.ts:215](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L215)

Level-based progression

##### cost?

```ts
optional cost?: SkillCost;
```

Defined in: [types/skills.ts:218](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L218)

Resource cost to use

##### tags?

```ts
optional tags?: string[];
```

Defined in: [types/skills.ts:221](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L221)

Tags for categorization and filtering

##### classes?

```ts
optional classes?: string[];
```

Defined in: [types/skills.ts:224](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L224)

Which classes have access to this skill

##### alignments?

```ts
optional alignments?: string[];
```

Defined in: [types/skills.ts:227](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L227)

Alignment restrictions

***

### SkillCheckInput

Defined in: [types/skills.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L233)

Input for resolving a skill check

#### Properties

##### skill

```ts
skill: SkillDefinition;
```

Defined in: [types/skills.ts:235](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L235)

The skill being used

##### abilities

```ts
abilities: Record<string, number>;
```

Defined in: [types/skills.ts:238](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L238)

Character's ability scores

##### level

```ts
level: number;
```

Defined in: [types/skills.ts:241](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L241)

Character's level

##### classId?

```ts
optional classId?: string;
```

Defined in: [types/skills.ts:244](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L244)

Character's class (for class-level modifiers)

##### situationalModifiers?

```ts
optional situationalModifiers?: RollModifier[];
```

Defined in: [types/skills.ts:247](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L247)

Situational modifiers

##### luck?

```ts
optional luck?: number;
```

Defined in: [types/skills.ts:250](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L250)

Current luck score (for luck-based bonuses)

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [types/skills.ts:253](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L253)

Luck to burn on this roll

***

### TableLookupResult

Defined in: [types/skills.ts:259](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L259)

Result from looking up a result table

#### Properties

##### tableId

```ts
tableId: string;
```

Defined in: [types/skills.ts:261](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L261)

The table that was used

##### rollValue

```ts
rollValue: number;
```

Defined in: [types/skills.ts:264](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L264)

The roll result used for lookup

##### text

```ts
text: string;
```

Defined in: [types/skills.ts:267](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L267)

The text result from the table

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [types/skills.ts:270](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L270)

Any structured data from the table entry

***

### SkillEffect

Defined in: [types/skills.ts:276](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L276)

Effect produced by a skill

#### Properties

##### type

```ts
type: string;
```

Defined in: [types/skills.ts:278](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L278)

Type of effect

##### target?

```ts
optional target?: string;
```

Defined in: [types/skills.ts:281](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L281)

Target of the effect

##### duration?

```ts
optional duration?: string;
```

Defined in: [types/skills.ts:284](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L284)

Duration of the effect

##### value?

```ts
optional value?: number;
```

Defined in: [types/skills.ts:287](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L287)

Numeric value of the effect

##### description?

```ts
optional description?: string;
```

Defined in: [types/skills.ts:290](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L290)

Description of the effect

***

### SkillCheckResult

Defined in: [types/skills.ts:296](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L296)

Complete result of a skill check

#### Properties

##### skillId

```ts
skillId: string;
```

Defined in: [types/skills.ts:298](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L298)

The skill that was used

##### die

```ts
die: `d${number}`;
```

Defined in: [types/skills.ts:301](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L301)

The die that was rolled

##### natural?

```ts
optional natural?: number;
```

Defined in: [types/skills.ts:304](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L304)

The natural die result (if evaluated)

##### modifiers

```ts
modifiers: RollModifier[];
```

Defined in: [types/skills.ts:307](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L307)

All modifiers that were applied

##### total?

```ts
optional total?: number;
```

Defined in: [types/skills.ts:310](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L310)

The total result (if evaluated)

##### formula

```ts
formula: string;
```

Defined in: [types/skills.ts:313](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L313)

The complete roll formula

##### tableResult?

```ts
optional tableResult?: TableLookupResult;
```

Defined in: [types/skills.ts:316](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L316)

Result from table lookup (if applicable)

##### success?

```ts
optional success?: boolean;
```

Defined in: [types/skills.ts:319](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L319)

Whether the check succeeded (if determinable)

##### critical?

```ts
optional critical?: boolean;
```

Defined in: [types/skills.ts:322](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L322)

Whether this was a critical success

##### fumble?

```ts
optional fumble?: boolean;
```

Defined in: [types/skills.ts:325](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L325)

Whether this was a fumble

##### effects?

```ts
optional effects?: SkillEffect[];
```

Defined in: [types/skills.ts:328](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L328)

Effects produced by this skill use

##### resourcesConsumed?

```ts
optional resourcesConsumed?: {
  resource: ResourceType;
  amount: number;
}[];
```

Defined in: [types/skills.ts:331](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L331)

Resources consumed

###### resource

```ts
resource: ResourceType;
```

###### amount

```ts
amount: number;
```

***

### SkillEvents

Defined in: [types/skills.ts:340](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L340)

Event callbacks for skill resolution

#### Properties

##### onSkillCheckStart?

```ts
optional onSkillCheckStart?: (input: SkillCheckInput) => void;
```

Defined in: [types/skills.ts:342](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L342)

Called when skill check starts

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`SkillCheckInput`](#skillcheckinput) |

###### Returns

`void`

##### onSkillCheckComplete?

```ts
optional onSkillCheckComplete?: (result: SkillCheckResult) => void;
```

Defined in: [types/skills.ts:345](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L345)

Called when skill check completes

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SkillCheckResult`](#skillcheckresult) |

###### Returns

`void`

##### onCritical?

```ts
optional onCritical?: (result: SkillCheckResult) => void;
```

Defined in: [types/skills.ts:348](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L348)

Called on critical success

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SkillCheckResult`](#skillcheckresult) |

###### Returns

`void`

##### onFumble?

```ts
optional onFumble?: (result: SkillCheckResult) => void;
```

Defined in: [types/skills.ts:351](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L351)

Called on fumble

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SkillCheckResult`](#skillcheckresult) |

###### Returns

`void`

##### onResourceConsumed?

```ts
optional onResourceConsumed?: (resource: ResourceType, amount: number) => void;
```

Defined in: [types/skills.ts:354](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L354)

Called when resources are consumed

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `resource` | [`ResourceType`](#resourcetype) |
| `amount` | `number` |

###### Returns

`void`

##### onTableLookup?

```ts
optional onTableLookup?: (result: TableLookupResult) => void;
```

Defined in: [types/skills.ts:357](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L357)

Called when a table lookup occurs

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`TableLookupResult`](#tablelookupresult) |

###### Returns

`void`

***

### SpellResultRange

Defined in: [types/spells.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L33)

Range bracket for a spell result

#### Properties

##### min

```ts
min: number;
```

Defined in: [types/spells.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L35)

Minimum roll (inclusive)

##### max

```ts
max: number;
```

Defined in: [types/spells.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L37)

Maximum roll (inclusive)

***

### SpellResult

Defined in: [types/spells.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L43)

A single result entry in a spell result table

#### Properties

##### range

```ts
range: SpellResultRange;
```

Defined in: [types/spells.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L45)

The roll range that triggers this result (inclusive)

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L47)

Description of the spell effect at this roll level

***

### SpellResultTable

Defined in: [types/spells.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L53)

Complete spell result table for spell check resolution

#### Properties

##### spellName

```ts
spellName: string;
```

Defined in: [types/spells.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L55)

Spell name this table applies to

##### castingMode

```ts
castingMode: SpellCastingMode;
```

Defined in: [types/spells.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L57)

Casting mode (wizard, cleric, or patron)

##### results

```ts
results: SpellResult[];
```

Defined in: [types/spells.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L59)

Ordered list of results by roll range

***

### Spell

Defined in: [types/spells.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L66)

Core spell data structure for spell catalogs.
This is the "data" type for spell storage/lookup.

#### Extended by

- [`SpellWithResults`](#spellwithresults)

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/spells.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L68)

Unique identifier for the spell

##### name

```ts
name: string;
```

Defined in: [types/spells.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L70)

Display name

##### level

```ts
level: number;
```

Defined in: [types/spells.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L72)

Spell level (1-5)

##### castingMode

```ts
castingMode: SpellCastingMode;
```

Defined in: [types/spells.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L74)

Casting mode

##### page

```ts
page: string;
```

Defined in: [types/spells.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L76)

Rulebook page reference

##### range

```ts
range: string;
```

Defined in: [types/spells.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L78)

Spell range

##### duration

```ts
duration: string;
```

Defined in: [types/spells.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L80)

Spell duration

##### castingTime

```ts
castingTime: string;
```

Defined in: [types/spells.ts:82](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L82)

Casting time

##### save

```ts
save: string;
```

Defined in: [types/spells.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L84)

Save type (e.g., "None", "Will vs. spell check DC")

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L86)

General description of the spell

***

### SpellWithResults

Defined in: [types/spells.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L92)

Extended spell data with result table included

#### Extends

- [`Spell`](#spell)

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/spells.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L68)

Unique identifier for the spell

###### Inherited from

[`Spell`](#spell).[`id`](#id-16)

##### name

```ts
name: string;
```

Defined in: [types/spells.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L70)

Display name

###### Inherited from

[`Spell`](#spell).[`name`](#name-27)

##### level

```ts
level: number;
```

Defined in: [types/spells.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L72)

Spell level (1-5)

###### Inherited from

[`Spell`](#spell).[`level`](#level-5)

##### castingMode

```ts
castingMode: SpellCastingMode;
```

Defined in: [types/spells.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L74)

Casting mode

###### Inherited from

[`Spell`](#spell).[`castingMode`](#castingmode-1)

##### page

```ts
page: string;
```

Defined in: [types/spells.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L76)

Rulebook page reference

###### Inherited from

[`Spell`](#spell).[`page`](#page)

##### range

```ts
range: string;
```

Defined in: [types/spells.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L78)

Spell range

###### Inherited from

[`Spell`](#spell).[`range`](#range-5)

##### duration

```ts
duration: string;
```

Defined in: [types/spells.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L80)

Spell duration

###### Inherited from

[`Spell`](#spell).[`duration`](#duration-1)

##### castingTime

```ts
castingTime: string;
```

Defined in: [types/spells.ts:82](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L82)

Casting time

###### Inherited from

[`Spell`](#spell).[`castingTime`](#castingtime)

##### save

```ts
save: string;
```

Defined in: [types/spells.ts:84](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L84)

Save type (e.g., "None", "Will vs. spell check DC")

###### Inherited from

[`Spell`](#spell).[`save`](#save)

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L86)

General description of the spell

###### Inherited from

[`Spell`](#spell).[`description`](#description-8)

##### resultTable

```ts
resultTable: SpellResultTable;
```

Defined in: [types/spells.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L94)

Result table for spell check resolution

***

### SpellCollection

Defined in: [types/spells.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L100)

Collection of spells organized by level

#### Properties

##### castingMode

```ts
castingMode: SpellCastingMode;
```

Defined in: [types/spells.ts:102](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L102)

Casting mode for this collection

##### spellsByLevel

```ts
spellsByLevel: Record<number, Spell[]>;
```

Defined in: [types/spells.ts:104](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L104)

Spells indexed by level

***

### CasterProfile

Defined in: [types/spells.ts:119](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L119)

How a caster learns/casts spells (determines which mechanics apply)

#### Properties

##### type

```ts
type: CasterType;
```

Defined in: [types/spells.ts:121](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L121)

The caster type

##### spellCheckAbility

```ts
spellCheckAbility: DCCAbilityId;
```

Defined in: [types/spells.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L124)

Which ability is used for spell checks

##### usesMercurial

```ts
usesMercurial: boolean;
```

Defined in: [types/spells.ts:127](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L127)

Does this caster use mercurial magic?

##### usesCorruption

```ts
usesCorruption: boolean;
```

Defined in: [types/spells.ts:130](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L130)

Does this caster use corruption?

##### usesDisapproval

```ts
usesDisapproval: boolean;
```

Defined in: [types/spells.ts:133](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L133)

Does this caster use disapproval?

##### canSpellburn

```ts
canSpellburn: boolean;
```

Defined in: [types/spells.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L136)

Can this caster spellburn?

##### lostSpellRecovery

```ts
lostSpellRecovery: "none" | "rest" | "prayer";
```

Defined in: [types/spells.ts:139](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L139)

How lost spells can be recovered

##### losesSpellOnFailure?

```ts
optional losesSpellOnFailure?: boolean;
```

Defined in: [types/spells.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L146)

Is the spell lost for the day when a spell check fails? DCC RAW: true for
wizards and elves; a cleric's failure raises disapproval instead. When
omitted, casters that use disapproval keep the spell and all others lose it.

***

### SpellResultEntry

Defined in: [types/spells.ts:192](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L192)

A spell result entry (for inline results or loaded from tables)

#### Properties

##### min

```ts
min: number;
```

Defined in: [types/spells.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L194)

Minimum check result

##### max?

```ts
optional max?: number;
```

Defined in: [types/spells.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L197)

Maximum check result (optional, defaults to next entry's min - 1)

##### tier

```ts
tier: ResultTier;
```

Defined in: [types/spells.ts:200](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L200)

Result tier

##### text

```ts
text: string;
```

Defined in: [types/spells.ts:203](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L203)

Result text

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: [types/spells.ts:206](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L206)

Structured effect data

##### lost?

```ts
optional lost?: boolean;
```

Defined in: [types/spells.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L209)

Is the spell lost after this result?

##### corruption?

```ts
optional corruption?: boolean;
```

Defined in: [types/spells.ts:212](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L212)

Does this trigger corruption? (wizard/elf)

##### disapproval?

```ts
optional disapproval?: boolean;
```

Defined in: [types/spells.ts:215](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L215)

Does this trigger disapproval increase? (cleric)

##### manifestation?

```ts
optional manifestation?: string;
```

Defined in: [types/spells.ts:218](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L218)

Manifestation description for this result

***

### SpellDefinition

Defined in: [types/spells.ts:225](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L225)

A spell's base definition loaded from external JSON.
This is the "template" - character-specific instances are stored in spellbooks.

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/spells.ts:227](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L227)

Unique identifier (e.g., "magic-missile", "bless")

##### name

```ts
name: string;
```

Defined in: [types/spells.ts:230](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L230)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/spells.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L233)

Full description

##### level

```ts
level: number;
```

Defined in: [types/spells.ts:236](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L236)

Spell level (1-5 for wizards, 1-5 for clerics)

##### casterTypes

```ts
casterTypes: CasterType[];
```

Defined in: [types/spells.ts:239](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L239)

Which caster types can use this spell

##### range?

```ts
optional range?: string;
```

Defined in: [types/spells.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L242)

Range description

##### duration?

```ts
optional duration?: string;
```

Defined in: [types/spells.ts:245](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L245)

Duration description

##### castingTime?

```ts
optional castingTime?: string;
```

Defined in: [types/spells.ts:248](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L248)

Casting time description

##### save?

```ts
optional save?: "reflex" | "fortitude" | "will" | "none";
```

Defined in: [types/spells.ts:251](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L251)

Save type if applicable

##### tags?

```ts
optional tags?: string[];
```

Defined in: [types/spells.ts:254](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L254)

General/school/type tags for filtering

##### source?

```ts
optional source?: string;
```

Defined in: [types/spells.ts:257](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L257)

Source reference (e.g., "DCC Core Rules p.XXX")

##### resultTableId?

```ts
optional resultTableId?: string;
```

Defined in: [types/spells.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L263)

Result table ID for looking up spell results.
If undefined, use inline `results` array.

##### results?

```ts
optional results?: SpellResultEntry[];
```

Defined in: [types/spells.ts:269](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L269)

Inline tiered results (alternative to resultTableId).
Simpler spells can embed results directly.

##### manifestationTableId?

```ts
optional manifestationTableId?: string;
```

Defined in: [types/spells.ts:272](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L272)

Manifestation table ID (optional)

***

### MercurialEffectData

Defined in: [types/spells.ts:293](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L293)

Structured mercurial effect for programmatic handling

#### Properties

##### type

```ts
type: string;
```

Defined in: [types/spells.ts:295](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L295)

Effect type (e.g., "modifier", "condition", "damage", "heal")

##### modifier?

```ts
optional modifier?: number;
```

Defined in: [types/spells.ts:298](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L298)

Numeric modifier if applicable

##### dice?

```ts
optional dice?: string;
```

Defined in: [types/spells.ts:301](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L301)

Dice modifier if applicable (e.g., "+1d4")

##### trigger?

```ts
optional trigger?: MercurialTrigger;
```

Defined in: [types/spells.ts:304](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L304)

When this triggers

##### duration?

```ts
optional duration?: string;
```

Defined in: [types/spells.ts:307](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L307)

Duration of effect

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [types/spells.ts:310](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L310)

Additional structured data

***

### MercurialSpecial

Defined in: [types/spells.ts:325](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L325)

Instruction attached to a mercurial table entry that, when drawn,
triggers meta-handling instead of being a literal effect.

#### Properties

##### action

```ts
action: "rollAgain";
```

Defined in: [types/spells.ts:327](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L327)

What kind of special handling this entry requires

##### count

```ts
count: number;
```

Defined in: [types/spells.ts:330](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L330)

Number of additional rolls to make (e.g. 2 for "roll again twice")

##### formula?

```ts
optional formula?: string;
```

Defined in: [types/spells.ts:336](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L336)

Dice expression for the sub-rolls (default "1d100"). The luck
modifier (×10) is still added on top of this expression's total.

***

### MercurialEffect

Defined in: [types/spells.ts:342](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L342)

A mercurial magic effect stored with a spell

#### Properties

##### rollValue

```ts
rollValue: number;
```

Defined in: [types/spells.ts:344](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L344)

The roll result that determined this effect (d100 + luck mod * 10)

##### summary

```ts
summary: string;
```

Defined in: [types/spells.ts:347](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L347)

Short summary of the effect (for display)

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:350](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L350)

Full description of the effect

##### displayOnCast

```ts
displayOnCast: boolean;
```

Defined in: [types/spells.ts:353](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L353)

Should this display in chat/output when casting?

##### effect?

```ts
optional effect?: MercurialEffectData;
```

Defined in: [types/spells.ts:356](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L356)

Structured effect data (if parseable for automation)

##### special?

```ts
optional special?: MercurialSpecial;
```

Defined in: [types/spells.ts:366](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L366)

The special instruction on the table entry this effect came from.
Present alongside `subEffects` when the special was expanded by
`rollMercurialMagic`; present WITHOUT `subEffects` when the entry
was merely looked up (no roller available) or the recursion cap
was hit — in that case the effect text is the literal instruction
and the consumer may expand it itself.

##### subEffects?

```ts
optional subEffects?: MercurialEffect[];
```

Defined in: [types/spells.ts:373](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L373)

The individual effects a `rollAgain` special expanded into. Each
sub-effect may itself carry `special`/`subEffects` when a sub-roll
landed on another special entry.

***

### MercurialTableEntry

Defined in: [types/spells.ts:379](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L379)

A single entry in a mercurial magic table

#### Properties

##### min

```ts
min: number;
```

Defined in: [types/spells.ts:381](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L381)

Minimum roll value (inclusive)

##### max

```ts
max: number;
```

Defined in: [types/spells.ts:384](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L384)

Maximum roll value (inclusive)

##### summary

```ts
summary: string;
```

Defined in: [types/spells.ts:387](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L387)

Short summary

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:390](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L390)

Full description

##### displayOnCast

```ts
displayOnCast: boolean;
```

Defined in: [types/spells.ts:393](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L393)

Whether to display on each cast

##### effect?

```ts
optional effect?: MercurialEffectData;
```

Defined in: [types/spells.ts:396](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L396)

Structured effect (optional)

##### special?

```ts
optional special?: MercurialSpecial;
```

Defined in: [types/spells.ts:399](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L399)

Special (meta) handling instruction (optional)

***

### SpellbookEntry

Defined in: [types/spells.ts:410](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L410)

A spell known by a specific character.
Includes character-specific data like mercurial effect.

#### Properties

##### spellId

```ts
spellId: string;
```

Defined in: [types/spells.ts:412](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L412)

Reference to spell definition ID

##### learnedAt?

```ts
optional learnedAt?: string;
```

Defined in: [types/spells.ts:415](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L415)

When this spell was learned (ISO date string, for tracking)

##### lost

```ts
lost: boolean;
```

Defined in: [types/spells.ts:418](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L418)

Is this spell currently lost? (for the day)

##### mercurialEffect?

```ts
optional mercurialEffect?: MercurialEffect;
```

Defined in: [types/spells.ts:421](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L421)

Mercurial magic effect (for wizards/elves)

##### manifestation?

```ts
optional manifestation?: string;
```

Defined in: [types/spells.ts:424](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L424)

Custom manifestation description (optional override)

##### lastResult?

```ts
optional lastResult?: number;
```

Defined in: [types/spells.ts:427](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L427)

Last check result rolled (for GM adjustment feature)

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/spells.ts:430](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L430)

Player notes about this spell

***

### Spellbook

Defined in: [types/spells.ts:436](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L436)

A character's complete spellbook

#### Properties

##### spells

```ts
spells: SpellbookEntry[];
```

Defined in: [types/spells.ts:438](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L438)

All known spells

##### maxSpellsPerLevel?

```ts
optional maxSpellsPerLevel?: Partial<Record<number, number>>;
```

Defined in: [types/spells.ts:441](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L441)

Maximum spells known per level (from class/level progression)

***

### SpellburnCommitment

Defined in: [types/spells.ts:461](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L461)

Spellburn commitment for a spell check (wizard/elf only)
Points are temporarily burned from physical abilities.

#### Properties

##### str

```ts
str: number;
```

Defined in: [types/spells.ts:463](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L463)

Points burned from Strength

##### agl

```ts
agl: number;
```

Defined in: [types/spells.ts:466](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L466)

Points burned from Agility

##### sta

```ts
sta: number;
```

Defined in: [types/spells.ts:469](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L469)

Points burned from Stamina

***

### CorruptionResult

Defined in: [types/spells.ts:493](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L493)

Result of rolling on the corruption table

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [types/spells.ts:495](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L495)

The die roll result

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:498](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L498)

Description of the corruption effect

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: [types/spells.ts:501](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L501)

Structured effect data

##### permanent

```ts
permanent: boolean;
```

Defined in: [types/spells.ts:504](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L504)

Is this corruption permanent? (most are)

##### tier?

```ts
optional tier?: "minor" | "major" | "greater";
```

Defined in: [types/spells.ts:507](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L507)

Corruption tier (minor, major, greater)

***

### SpellFumbleResult

Defined in: [types/spells.ts:525](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L525)

Result of rolling on the spell fumble table.

Note: patron taint is intentionally NOT on this shape. RAW (DCC core
rulebook) triggers patron taint via the two independent paths
handled by `handlePatronTaintTriggers` in `spell-check.ts`
(per-cast creeping chance + spell-result-table entries);
fumble tables do not produce patron taint. An earlier
`patronTaint: boolean` flag here was dead code (parsed but never
read by orchestration) and was removed in 0.8.0.

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [types/spells.ts:527](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L527)

The die roll result

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:530](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L530)

Description of the fumble effect

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: [types/spells.ts:533](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L533)

Structured effect data

##### misfire

```ts
misfire: boolean;
```

Defined in: [types/spells.ts:536](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L536)

Did the spell misfire?

##### corruption

```ts
corruption: boolean;
```

Defined in: [types/spells.ts:539](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L539)

Should roll on corruption table?

***

### PatronTaintResult

Defined in: [types/spells.ts:545](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L545)

Result of rolling on the patron taint table

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [types/spells.ts:547](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L547)

The die roll result

##### patronId

```ts
patronId: string;
```

Defined in: [types/spells.ts:550](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L550)

Patron ID that caused the taint

##### description

```ts
description: string;
```

Defined in: [types/spells.ts:553](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L553)

Description of the taint effect

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: [types/spells.ts:556](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L556)

Structured effect data

***

### SpellCastInput

Defined in: [types/spells.ts:566](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L566)

Input for casting a spell

#### Properties

##### spell

```ts
spell: SpellDefinition;
```

Defined in: [types/spells.ts:568](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L568)

The spell being cast (definition)

##### spellbookEntry?

```ts
optional spellbookEntry?: SpellbookEntry;
```

Defined in: [types/spells.ts:585](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L585)

The spellbook entry (character-specific data).

Optional to support "naked" spell-check casts where the caster has
no spellbook entry — e.g. ad-hoc divine arbitration checks, GM-
triggered checks, or skill-table mechanics (Turn Unholy) that
borrow the spell-check pipeline without owning a spellbook slot.
When omitted:
  - `castSpell` skips the spellbook-entry manifestation override
    (`spellbookEntry.manifestation`).
  - `castSpell` skips the spellbook-entry mercurial-effect
    attachment (`spellbookEntry.mercurialEffect`).
  - `spellLost` semantics still fire but the caller has nothing
    to mark lost; treat the field as advisory.

##### casterProfile

```ts
casterProfile: CasterProfile;
```

Defined in: [types/spells.ts:588](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L588)

Caster's profile (determines mechanics)

##### casterLevel

```ts
casterLevel: number;
```

Defined in: [types/spells.ts:591](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L591)

Caster level

##### abilityScore

```ts
abilityScore: number;
```

Defined in: [types/spells.ts:594](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L594)

Spell check ability score (current value)

##### abilityModifier

```ts
abilityModifier: number;
```

Defined in: [types/spells.ts:597](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L597)

Ability modifier (pre-calculated)

##### luck?

```ts
optional luck?: number;
```

Defined in: [types/spells.ts:600](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L600)

Current luck score (for luck burn calculations)

##### startingLuck?

```ts
optional startingLuck?: number;
```

Defined in: [types/spells.ts:603](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L603)

Starting luck score (for birth augur effects)

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [types/spells.ts:606](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L606)

Luck to burn on this check

##### luckMultiplier?

```ts
optional luckMultiplier?: number;
```

Defined in: [types/spells.ts:609](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L609)

Luck modifier multiplier from birth augur (default 1)

##### spellburn?

```ts
optional spellburn?: SpellburnCommitment;
```

Defined in: [types/spells.ts:612](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L612)

Spellburn commitment (wizard/elf only)

##### disapprovalRange?

```ts
optional disapprovalRange?: number;
```

Defined in: [types/spells.ts:615](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L615)

Current disapproval range (cleric only, starts at 1)

##### patron?

```ts
optional patron?: string;
```

Defined in: [types/spells.ts:618](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L618)

Patron ID (for patron taint acquisition)

##### patronTaintChance?

```ts
optional patronTaintChance?: number;
```

Defined in: [types/spells.ts:626](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L626)

Current patron-taint chance as an integer percent (1-100).
RAW (DCC core): every patron-based cast rolls d100 vs this value;
on acquisition the chance resets to 1, otherwise it increments by 1.
Defaults to 1 when omitted.

##### isPatronSpell?

```ts
optional isPatronSpell?: boolean;
```

Defined in: [types/spells.ts:635](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L635)

Caller override for "is this cast a patron-based spell?" When set, the
lib honors it directly. When omitted, the lib falls back to
`spell.tags?.includes('patron')`. Foundry-style systems that detect
patron spells by name prefix ("Patron Bond", "Invoke Patron") or by a
per-item flag should pass this explicitly.

##### situationalModifiers?

```ts
optional situationalModifiers?: LegacyRollModifier[];
```

Defined in: [types/spells.ts:638](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L638)

Situational modifiers to apply

##### actionDie?

```ts
optional actionDie?: `d${number}`;
```

Defined in: [types/spells.ts:641](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L641)

Action die override (if not d20)

##### resultTable?

```ts
optional resultTable?: TieredTable;
```

Defined in: [types/spells.ts:644](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L644)

Result table for spell effects (pre-loaded)

##### fumbleTable?

```ts
optional fumbleTable?: SimpleTable;
```

Defined in: [types/spells.ts:647](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L647)

Fumble table (pre-loaded)

##### corruptionTable?

```ts
optional corruptionTable?: SimpleTable;
```

Defined in: [types/spells.ts:650](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L650)

Corruption table (pre-loaded)

##### patronTaintTable?

```ts
optional patronTaintTable?: SimpleTable;
```

Defined in: [types/spells.ts:653](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L653)

Patron taint table (pre-loaded, if applicable)

***

### SpellCastResult

Defined in: [types/spells.ts:659](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L659)

Result of casting a spell

#### Extended by

- [`SpellCheckResult`](spells.md#spellcheckresult)

#### Properties

##### spellId

```ts
spellId: string;
```

Defined in: [types/spells.ts:661](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L661)

The spell that was cast

##### die

```ts
die: `d${number}`;
```

Defined in: [types/spells.ts:664](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L664)

Die used for the check

##### natural?

```ts
optional natural?: number;
```

Defined in: [types/spells.ts:667](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L667)

Natural die result (before modifiers)

##### total?

```ts
optional total?: number;
```

Defined in: [types/spells.ts:670](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L670)

Total check result (after all modifiers)

##### formula

```ts
formula: string;
```

Defined in: [types/spells.ts:673](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L673)

The formula used

##### modifiers

```ts
modifiers: LegacyRollModifier[];
```

Defined in: [types/spells.ts:676](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L676)

All modifiers applied

##### critical

```ts
critical: boolean;
```

Defined in: [types/spells.ts:679](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L679)

Was this a critical (natural 20)?

##### fumble

```ts
fumble: boolean;
```

Defined in: [types/spells.ts:682](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L682)

Was this a fumble (natural 1)?

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

##### tier?

```ts
optional tier?: ResultTier;
```

Defined in: [types/spells.ts:695](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L695)

Result tier (lost, failure, success levels)

##### resultText?

```ts
optional resultText?: string;
```

Defined in: [types/spells.ts:698](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L698)

Result text from table lookup

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: [types/spells.ts:701](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L701)

Structured effect from result

##### spellLost

```ts
spellLost: boolean;
```

Defined in: [types/spells.ts:704](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L704)

Was the spell lost for the day?

##### corruptionTriggered

```ts
corruptionTriggered: boolean;
```

Defined in: [types/spells.ts:707](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L707)

Was corruption triggered? (wizard/elf only)

##### corruptionResult?

```ts
optional corruptionResult?: CorruptionResult;
```

Defined in: [types/spells.ts:710](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L710)

Corruption result (if rolled, filled by corruption module)

##### fumbleResult?

```ts
optional fumbleResult?: SpellFumbleResult;
```

Defined in: [types/spells.ts:713](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L713)

Fumble result (if applicable)

##### patronTaintChecked

```ts
patronTaintChecked: boolean;
```

Defined in: [types/spells.ts:720](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L720)

Did the per-cast creeping-chance patron-taint check fire this cast?
True when `patron` is set AND `isPatronCast` returns true — regardless
of spell outcome (success, failure, fumble all still check).

##### patronTaintRoll?

```ts
optional patronTaintRoll?: number;
```

Defined in: [types/spells.ts:723](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L723)

The d100 rolled for the creeping-chance check (only present when checked).

##### patronTaintAcquired

```ts
patronTaintAcquired: boolean;
```

Defined in: [types/spells.ts:731](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L731)

Was patron taint acquired on this cast? True when either:
1. Creeping-chance check hit (roll <= chance), OR
2. The spell's result-table entry carries a patron-taint outcome
   (`effect.type === 'patron-taint'` or `effect.data.patronTaint === true`).

##### patronTaintSource?

```ts
optional patronTaintSource?: "creeping-chance" | "result-table";
```

Defined in: [types/spells.ts:734](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L734)

Which trigger acquired the taint (only present when acquired).

##### newPatronTaintChance?

```ts
optional newPatronTaintChance?: number;
```

Defined in: [types/spells.ts:740](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L740)

Post-cast patron-taint chance. Only set when `patronTaintChecked`.
RAW: resets to 1 on acquisition, else currentChance + 1.

##### patronTaintResult?

```ts
optional patronTaintResult?: PatronTaintResult;
```

Defined in: [types/spells.ts:746](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L746)

Patron-taint manifestation (only present when acquired AND a
`patronTaintTable` was provided). Rolled via `rollPatronTaint`.

##### disapprovalIncrease

```ts
disapprovalIncrease: number;
```

Defined in: [types/spells.ts:749](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L749)

Disapproval increase amount (cleric)

##### newDisapprovalRange?

```ts
optional newDisapprovalRange?: number;
```

Defined in: [types/spells.ts:752](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L752)

New disapproval range after this cast (cleric)

##### mercurialEffect?

```ts
optional mercurialEffect?: MercurialEffect;
```

Defined in: [types/spells.ts:755](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L755)

Mercurial effect that applied (if any)

##### spellburnApplied?

```ts
optional spellburnApplied?: SpellburnCommitment;
```

Defined in: [types/spells.ts:758](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L758)

Spellburn that was applied

##### luckBurned

```ts
luckBurned: number;
```

Defined in: [types/spells.ts:761](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L761)

Luck points burned

##### manifestation?

```ts
optional manifestation?: string;
```

Defined in: [types/spells.ts:764](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L764)

Manifestation description (if rolled/provided)

***

### SpellEvents

Defined in: [types/spells.ts:775](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L775)

Event callbacks for spell casting
Allows UI layer to react to spell events without coupling.

#### Properties

##### onSpellCheckStart?

```ts
optional onSpellCheckStart?: (input: SpellCastInput) => void;
```

Defined in: [types/spells.ts:777](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L777)

Called when spell check starts

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`SpellCastInput`](#spellcastinput) |

###### Returns

`void`

##### onSpellCheckComplete?

```ts
optional onSpellCheckComplete?: (result: SpellCastResult) => void;
```

Defined in: [types/spells.ts:780](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L780)

Called when spell check completes

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCastResult`](#spellcastresult) |

###### Returns

`void`

##### onCritical?

```ts
optional onCritical?: (result: SpellCastResult) => void;
```

Defined in: [types/spells.ts:783](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L783)

Called on critical (natural 20)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCastResult`](#spellcastresult) |

###### Returns

`void`

##### onFumble?

```ts
optional onFumble?: (result: SpellCastResult) => void;
```

Defined in: [types/spells.ts:786](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L786)

Called on fumble (natural 1)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCastResult`](#spellcastresult) |

###### Returns

`void`

##### onSpellLost?

```ts
optional onSpellLost?: (result: SpellCastResult) => void;
```

Defined in: [types/spells.ts:789](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L789)

Called when spell is lost

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCastResult`](#spellcastresult) |

###### Returns

`void`

##### onCorruptionTriggered?

```ts
optional onCorruptionTriggered?: (result: SpellCastResult, corruption: CorruptionResult) => void;
```

Defined in: [types/spells.ts:792](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L792)

Called when corruption is triggered

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCastResult`](#spellcastresult) |
| `corruption` | [`CorruptionResult`](#corruptionresult) |

###### Returns

`void`

##### onDisapprovalIncreased?

```ts
optional onDisapprovalIncreased?: (result: SpellCastResult, newRange: number) => void;
```

Defined in: [types/spells.ts:795](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L795)

Called when disapproval range increases

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCastResult`](#spellcastresult) |
| `newRange` | `number` |

###### Returns

`void`

##### onSpellburnApplied?

```ts
optional onSpellburnApplied?: (burn: SpellburnCommitment) => void;
```

Defined in: [types/spells.ts:798](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L798)

Called when spellburn is applied

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `burn` | [`SpellburnCommitment`](#spellburncommitment) |

###### Returns

`void`

##### onMercurialEffect?

```ts
optional onMercurialEffect?: (effect: MercurialEffect, result: SpellCastResult) => void;
```

Defined in: [types/spells.ts:801](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L801)

Called when mercurial effect triggers

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `effect` | [`MercurialEffect`](#mercurialeffect) |
| `result` | [`SpellCastResult`](#spellcastresult) |

###### Returns

`void`

##### onPatronTaint?

```ts
optional onPatronTaint?: (result: SpellCastResult, taint: PatronTaintResult) => void;
```

Defined in: [types/spells.ts:804](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L804)

Called when patron taint is triggered

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`SpellCastResult`](#spellcastresult) |
| `taint` | [`PatronTaintResult`](#patrontaintresult) |

###### Returns

`void`

***

### SpellLookupOptions

Defined in: [types/spells.ts:814](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L814)

Options for looking up spells

#### Properties

##### casterType?

```ts
optional casterType?: CasterType;
```

Defined in: [types/spells.ts:816](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L816)

Filter by caster type

##### level?

```ts
optional level?: number;
```

Defined in: [types/spells.ts:819](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L819)

Filter by spell level

##### tags?

```ts
optional tags?: string[];
```

Defined in: [types/spells.ts:822](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L822)

Filter by tags

##### nameSearch?

```ts
optional nameSearch?: string;
```

Defined in: [types/spells.ts:825](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L825)

Search by name (partial match)

***

### SpellCheckOptions

Defined in: [types/spells.ts:831](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L831)

Options for rolling spell checks

#### Extends

- [`RollOptions`](#rolloptions)

#### Properties

##### mode?

```ts
optional mode?: RollMode;
```

Defined in: [types/dice.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L52)

Whether to just build the formula or actually evaluate it

###### Inherited from

[`RollOptions`](#rolloptions).[`mode`](#mode-2)

##### roller?

```ts
optional roller?: DiceRoller;
```

Defined in: [types/dice.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L55)

Synchronous custom roller — used instead of built-in RNG when provided

###### Inherited from

[`RollOptions`](#rolloptions).[`roller`](#roller)

##### skipMercurial?

```ts
optional skipMercurial?: boolean;
```

Defined in: [types/spells.ts:833](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L833)

Skip mercurial magic application

##### skipCorruption?

```ts
optional skipCorruption?: boolean;
```

Defined in: [types/spells.ts:836](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L836)

Skip corruption rolling (even on trigger)

##### skipFumble?

```ts
optional skipFumble?: boolean;
```

Defined in: [types/spells.ts:839](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L839)

Skip fumble table rolling

##### forceTier?

```ts
optional forceTier?: ResultTier;
```

Defined in: [types/spells.ts:842](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L842)

Force a specific tier result (for testing/GM override)

##### forceNatural?

```ts
optional forceNatural?: number;
```

Defined in: [types/spells.ts:845](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L845)

Override the natural die roll (for testing/GM override)

##### profileOverride?

```ts
optional profileOverride?: CasterProfile;
```

Defined in: [types/spells.ts:869](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L869)

Override the caster profile derived from `character.classInfo.classId`.

When a spell's mechanic class differs from the actor's actual class
(e.g. a cleric-style spell cast by a wizard, or a wizard-style spell
cast by a cleric), the caller supplies the profile that should drive
behavior selection. When omitted, the profile is derived from
`character.classInfo.classId` via `getCasterProfile`.

The override governs:
  - Spell `casterTypes` validation (must include the override's `type`)
  - Spellburn allowance (`canSpellburn`)
  - Disapproval trigger (`usesDisapproval`)
  - Corruption / patron-taint trigger (`usesCorruption`)
  - Spell-loss recovery (`lostSpellRecovery`)
  - Spell-check ability (`spellCheckAbility`)

Class-bound state continues to be read from
`character.state.classState`, keyed by the override's `type` — callers
are responsible for populating `state.classState.<override.type>` with
the appropriate spellbook, disapproval range, patron, etc.

***

### AbilityDefinition

Defined in: [types/system.ts:11](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L11)

Definition of an ability score

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/system.ts:13](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L13)

Unique identifier (e.g., "str", "agl")

##### name

```ts
name: string;
```

Defined in: [types/system.ts:16](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L16)

Full name (e.g., "Strength", "Agility")

##### abbrev

```ts
abbrev: string;
```

Defined in: [types/system.ts:19](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L19)

Abbreviation for display (e.g., "STR", "AGL")

##### description?

```ts
optional description?: string;
```

Defined in: [types/system.ts:22](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L22)

Optional description

***

### AlignmentDefinition

Defined in: [types/system.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L38)

Alignment definition with display info

#### Properties

##### id

```ts
id: Alignment;
```

Defined in: [types/system.ts:39](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L39)

##### name

```ts
name: string;
```

Defined in: [types/system.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L40)

##### abbrev

```ts
abbrev: string;
```

Defined in: [types/system.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L41)

***

### AbilityMappings

Defined in: [types/system.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L47)

Mapping of abilities to their common uses

#### Properties

##### meleeAttack

```ts
meleeAttack: string;
```

Defined in: [types/system.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L49)

Ability used for melee attack rolls

##### meleeDamage

```ts
meleeDamage: string;
```

Defined in: [types/system.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L52)

Ability used for melee damage

##### missileAttack

```ts
missileAttack: string;
```

Defined in: [types/system.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L55)

Ability used for missile attack rolls

##### missileDamage?

```ts
optional missileDamage?: string;
```

Defined in: [types/system.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L58)

Ability used for missile damage (if any)

##### armorClass

```ts
armorClass: string;
```

Defined in: [types/system.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L61)

Ability used for armor class

##### hitPoints

```ts
hitPoints: string;
```

Defined in: [types/system.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L64)

Ability used for hit points

##### reflexSave

```ts
reflexSave: string;
```

Defined in: [types/system.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L67)

Ability used for Reflex saves

##### fortSave

```ts
fortSave: string;
```

Defined in: [types/system.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L70)

Ability used for Fortitude saves

##### willSave

```ts
willSave: string;
```

Defined in: [types/system.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L73)

Ability used for Will saves

##### initiative

```ts
initiative: string;
```

Defined in: [types/system.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L76)

Ability used for initiative

##### wizardSpellCheck?

```ts
optional wizardSpellCheck?: string;
```

Defined in: [types/system.ts:79](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L79)

Ability used for spell checks (wizards)

##### clericSpellCheck?

```ts
optional clericSpellCheck?: string;
```

Defined in: [types/system.ts:82](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L82)

Ability used for spell checks (clerics)

***

### SaveDefinition

Defined in: [types/system.ts:93](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L93)

Save definition

#### Properties

##### id

```ts
id: SaveType;
```

Defined in: [types/system.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L94)

##### name

```ts
name: string;
```

Defined in: [types/system.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L95)

##### abbrev

```ts
abbrev: string;
```

Defined in: [types/system.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L96)

##### ability

```ts
ability: string;
```

Defined in: [types/system.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L97)

***

### SystemMechanics

Defined in: [types/system.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L103)

System-specific mechanics flags

#### Properties

##### hasDisapproval?

```ts
optional hasDisapproval?: boolean;
```

Defined in: [types/system.ts:105](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L105)

Does this system use cleric disapproval?

##### hasMercurial?

```ts
optional hasMercurial?: boolean;
```

Defined in: [types/system.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L108)

Does this system use wizard mercurial magic?

##### hasMutations?

```ts
optional hasMutations?: boolean;
```

Defined in: [types/system.ts:111](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L111)

Does this system have mutations (MCC)?

##### hasWetware?

```ts
optional hasWetware?: boolean;
```

Defined in: [types/system.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L114)

Does this system have wetware/cyberware (MCC)?

##### hasArtifacts?

```ts
optional hasArtifacts?: boolean;
```

Defined in: [types/system.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L117)

Does this system have AI artifacts (MCC)?

##### hasLuckDie?

```ts
optional hasLuckDie?: boolean;
```

Defined in: [types/system.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L120)

Does this system use luck for specific rolls?

##### hasFleetingLuck?

```ts
optional hasFleetingLuck?: boolean;
```

Defined in: [types/system.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L123)

Does this system use fleeting luck?

***

### SystemConfig

Defined in: [types/system.ts:131](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L131)

Complete system configuration

This defines everything needed to run a DCC-family game system.

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/system.ts:133](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L133)

Unique system identifier (e.g., "dcc", "mcc", "xcrawl")

##### name

```ts
name: string;
```

Defined in: [types/system.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L136)

Display name (e.g., "Dungeon Crawl Classics")

##### version?

```ts
optional version?: string;
```

Defined in: [types/system.ts:139](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L139)

System version

##### abilities

```ts
abilities: AbilityDefinition[];
```

Defined in: [types/system.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L142)

Ability scores used in this system

##### abilityMappings

```ts
abilityMappings: AbilityMappings;
```

Defined in: [types/system.ts:145](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L145)

How abilities map to common game uses

##### alignments

```ts
alignments: AlignmentDefinition[];
```

Defined in: [types/system.ts:148](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L148)

Alignments available in this system

##### saves

```ts
saves: SaveDefinition[];
```

Defined in: [types/system.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L151)

Saving throws in this system

##### classes

```ts
classes: string[];
```

Defined in: [types/system.ts:154](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L154)

Character classes available (IDs reference class data)

##### diceChain?

```ts
optional diceChain?: number[];
```

Defined in: [types/system.ts:157](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L157)

Custom dice chain (if different from standard DCC)

##### mechanics

```ts
mechanics: SystemMechanics;
```

Defined in: [types/system.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L160)

System-specific mechanics

***

### TableEntry

Defined in: [types/tables.ts:10](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L10)

A single entry in a rollable table

#### Properties

##### min

```ts
min: number;
```

Defined in: [types/tables.ts:12](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L12)

Minimum roll value for this entry

##### max

```ts
max: number;
```

Defined in: [types/tables.ts:15](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L15)

Maximum roll value for this entry

##### text

```ts
text: string;
```

Defined in: [types/tables.ts:18](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L18)

The result text/description

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [types/tables.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L21)

Optional structured data parsed from the text

***

### RollableTable

Defined in: [types/tables.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L27)

A complete rollable table

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/tables.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L29)

Unique identifier

##### name

```ts
name: string;
```

Defined in: [types/tables.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L32)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/tables.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L35)

Description of the table

##### formula

```ts
formula: string;
```

Defined in: [types/tables.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L38)

The die formula to roll (e.g., "1d30")

##### entries

```ts
entries: TableEntry[];
```

Defined in: [types/tables.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L41)

Table entries sorted by range

***

### BirthAugurEntry

Defined in: [types/tables.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L47)

Birth augur (luck) table entry with parsed data

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [types/tables.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L49)

Roll value (1-30)

##### name

```ts
name: string;
```

Defined in: [types/tables.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L52)

Name of the birth augur (e.g., "Harsh winter")

##### affects

```ts
affects: string;
```

Defined in: [types/tables.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L55)

What the luck modifier affects (e.g., "All attack rolls")

##### effectType?

```ts
optional effectType?: BirthAugurEffectType;
```

Defined in: [types/tables.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L58)

Parsed effect type for programmatic use

## Type Aliases

### BonusSourceType

```ts
type BonusSourceType = 
  | "ability"
  | "class"
  | "item"
  | "spell"
  | "luck"
  | "assist"
  | "judge"
  | "condition"
  | "other";
```

Defined in: [types/bonuses.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L26)

High-level category of where a bonus comes from.
Used for organization and UI grouping.

***

### BonusCategory

```ts
type BonusCategory = "inherent" | "equipment" | "circumstance" | "luck" | "spell" | "other";
```

Defined in: [types/bonuses.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L41)

Category that determines when bonuses apply.
Inherent bonuses are always active; situational are per-roll.

***

### BonusEffectType

```ts
type BonusEffectType = "modifier" | "die" | "dice-chain" | "set-die" | "reroll";
```

Defined in: [types/bonuses.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L77)

What kind of effect the bonus has on the roll.

***

### BonusEffect

```ts
type BonusEffect = 
  | BonusFlatModifier
  | BonusDieRoll
  | BonusDiceChain
  | BonusSetDie
  | BonusReroll;
```

Defined in: [types/bonuses.ts:134](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L134)

Union of all bonus effect types

***

### AbilityScoreMethod

```ts
type AbilityScoreMethod = "3d6" | "4d6-drop-lowest" | "2d6+6" | "2d10" | "manual" | "custom";
```

Defined in: [types/character-creation.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L177)

Built-in methods for generating ability scores.
Use "custom" with a DiceMethodDefinition for other methods.

***

### ZeroLevelHPMethod

```ts
type ZeroLevelHPMethod = 
  | "1d4"
  | "1d4-reroll-ones"
  | "2d4-take-high"
  | "1d2+2"
  | "1d4+2"
  | "max"
  | "custom";
```

Defined in: [types/character-creation.ts:230](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L230)

Built-in methods for rolling 0-level hit points.
Use "custom" with an HPMethodDefinition for other methods.

***

### LeveledHPMethod

```ts
type LeveledHPMethod = "standard" | "reroll-ones" | "average" | "max" | "percentage" | "custom";
```

Defined in: [types/character-creation.ts:243](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L243)

Built-in methods for rolling leveled character hit points.
Use "custom" with an HPMethodDefinition for other methods.

***

### LuckySignMode

```ts
type LuckySignMode = 
  | "standard"
  | "hide-if-zero"
  | "minimum-plus-one"
  | "positive-only"
  | "best-of"
  | "custom";
```

Defined in: [types/character-creation.ts:294](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L294)

Built-in modes for handling the birth augur / lucky sign.
Use "custom" with a LuckySignModeDefinition for other modes.

***

### OccupationSource

```ts
type OccupationSource = "core" | "core-human" | "core-demihuman" | "custom";
```

Defined in: [types/character-creation.ts:330](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L330)

Built-in sources for occupation tables.
Use "custom" with a table ID for other sources.

***

### DeepReadonly

```ts
type DeepReadonly<T> = T extends infer U[] ? readonly DeepReadonly<U>[] : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;
```

Defined in: [types/character.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L20)

Deep readonly utility for immutable function inputs

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

***

### AbilityScores

```ts
type AbilityScores = Record<DCCAbilityId, AbilityScore>;
```

Defined in: [types/character.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L45)

All six DCC ability scores

***

### ItemCategory

```ts
type ItemCategory = "weapon" | "armor" | "gear" | "trade-goods" | "treasure" | "other";
```

Defined in: [types/character.ts:355](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L355)

Item category for organization

***

### ProgressionAlignment

```ts
type ProgressionAlignment = "lawful" | "neutral" | "chaotic";
```

Defined in: [types/class-progression.ts:16](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L16)

Alignment types for progression data (long form)

***

### ProgressionSaveType

```ts
type ProgressionSaveType = "ref" | "frt" | "wil";
```

Defined in: [types/class-progression.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L21)

Saving throw short codes (as used in source data)

***

### SkillBonuses

```ts
type SkillBonuses = Record<string, number | DieType>;
```

Defined in: [types/class-progression.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L26)

Skill bonuses at a specific level

***

### AttackProgression

```ts
type AttackProgression = 
  | "warrior"
  | "cleric"
  | "wizard"
  | "thief"
  | "dwarf"
  | "elf"
  | "halfling"
  | "custom";
```

Defined in: [types/classes.ts:18](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L18)

Attack bonus progression type

***

### SaveProgression

```ts
type SaveProgression = 
  | "warrior"
  | "cleric"
  | "wizard"
  | "thief"
  | "dwarf"
  | "elf"
  | "halfling"
  | "custom";
```

Defined in: [types/classes.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L31)

Save progression type

***

### CritTable

```ts
type CritTable = "I" | "II" | "III" | "IV" | "V" | "custom";
```

Defined in: [types/classes.ts:44](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/classes.ts#L44)

Crit table to use

***

### AttackType

```ts
type AttackType = "melee" | "missile" | "special";
```

Defined in: [types/combat.ts:19](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L19)

Type of attack being made

***

### ActionDieUse

```ts
type ActionDieUse = 
  | "any"
  | "spell"
  | "attack"
  | string & {
};
```

Defined in: [types/combat.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L107)

What an action die may be spent on.

In DCC, the **wizard** is the only core class that restricts an extra
action die: its second die may be spent on spell checks alone. Every
other class — including the elf and cleric, who are also casters — may
use its extra dice for anything. See `classExtraActionDieUse`.

Extensible by design (homebrew may add `"turnUndead"`, `"mightyDeed"`, …);
unknown tags simply never match a given `ActionType`.

***

### ActionType

```ts
type ActionType = "attack" | "spell" | "check";
```

Defined in: [types/combat.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L113)

The kind of action a roll represents, used to test eligibility against
an `ActionDieSlot.use` tag.

***

### CritSource

```ts
type CritSource = "threat-range" | "backstab-auto" | "natural-max";
```

Defined in: [types/combat.ts:253](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L253)

Why a critical threat fired. Drives downstream crit-table selection
(a backstab auto-crit always rolls on Crit Table II regardless of
the attacker's normal crit table).

***

### CritTableId

```ts
type CritTableId = "I" | "II" | "III" | "IV" | "V";
```

Defined in: [types/combat.ts:379](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L379)

Crit table identifier

***

### ArmorType

```ts
type ArmorType = 
  | "unarmored"
  | "padded"
  | "leather"
  | "studded-leather"
  | "hide"
  | "scale"
  | "chainmail"
  | "banded"
  | "half-plate"
  | "full-plate";
```

Defined in: [types/combat.ts:443](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L443)

Armor type affects fumble die

***

### CreatureCollection

```ts
type CreatureCollection = Record<string, Creature>;
```

Defined in: [types/creatures.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/creatures.ts#L116)

Collection of creatures indexed by ID

***

### DiceChainFaces

```ts
type DiceChainFaces = typeof DEFAULT_DICE_CHAIN[number];
```

Defined in: [types/dice.ts:14](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L14)

***

### DieType

```ts
type DieType = `d${number}`;
```

Defined in: [types/dice.ts:19](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L19)

A die type string like "d20" or "d16"

***

### CritDieFormula

```ts
type CritDieFormula = string;
```

Defined in: [types/dice.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L27)

A crit-die formula. Covers single dice ("d12"), multi-dice ("2d20"),
and dice-plus-modifier ("d30+2"). The DCC crit die progressions for
high-level warriors and thieves outgrow a single die, so this type is
used wherever a crit die value is stored or rolled.

***

### RollMode

```ts
type RollMode = "formula" | "evaluate";
```

Defined in: [types/dice.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L32)

How a roll should be handled

***

### DiceRoller

```ts
type DiceRoller = (expression: string) => number;
```

Defined in: [types/dice.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L38)

Function signature for a synchronous custom dice roller.
Takes a dice expression (e.g., "1d20") and returns the total.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `expression` | `string` |

#### Returns

`number`

***

### AsyncDiceRoller

```ts
type AsyncDiceRoller = (expression: string) => Promise<number>;
```

Defined in: [types/dice.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L45)

Function signature for an asynchronous custom dice roller.
Use this when the underlying roll machinery is Promise-based
(e.g. FoundryVTT's `Roll.evaluate()` returns a Promise).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `expression` | `string` |

#### Returns

`Promise`\<`number`\>

***

### ModifierCategory

```ts
type ModifierCategory = 
  | "ability"
  | "level"
  | "progression"
  | "luck-burn"
  | "penalty"
  | "equipment"
  | "active-effect"
  | "class-feature"
  | "spell"
  | "situational"
  | "dialog-input"
  | "module"
  | "other";
```

Defined in: [types/dice.ts:122](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L122)

Closed union of origin categories. Adding a new category is a
breaking change (by design — it's a natural review point).
Use `'other'` as an escape hatch for genuinely ad-hoc cases.

***

### RollModifier

```ts
type RollModifier = 
  | AddModifier
  | AddDiceModifier
  | SetDieModifier
  | BumpDieModifier
  | MultiplyModifier
  | ThreatShiftModifier
  | DisplayModifier;
```

Defined in: [types/dice.ts:220](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L220)

The tagged-union RollModifier. Every roll modification is one of
these variants; the evaluator dispatches on `kind`.

#### See

docs/MODIFIERS.md §2 for the full design and §3 for the
application pipeline.

***

### OccupationItem

```ts
type OccupationItem = 
  | OccupationWeapon
  | OccupationTradeGood
  | OccupationTreasure
  | OccupationArmor;
```

Defined in: [types/equipment.ts:244](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/equipment.ts#L244)

Union type for all occupation items

***

### SkillType

```ts
type SkillType = "check" | "modifier" | "passive";
```

Defined in: [types/skills.ts:23](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L23)

Types of skills

- check: Standalone roll that produces a result (thief skills, turn unholy)
- modifier: Passive bonus that modifies other actions (lucky sign, armor training)
- passive: Enables other game mechanics (mighty deed, shield bash)

***

### ModifiableAction

```ts
type ModifiableAction = 
  | "attack"
  | "damage"
  | "initiative"
  | "save"
  | "ac"
  | "spell-check"
  | "skill-check";
```

Defined in: [types/skills.ts:28](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L28)

What action a modifier skill affects

***

### LevelModifierType

```ts
type LevelModifierType = "none" | "full" | "half" | "class-level" | "caster-level" | "custom";
```

Defined in: [types/skills.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L40)

How level affects a skill's roll

***

### ResourceType

```ts
type ResourceType = "luck" | "spellburn" | "disapproval" | "hp" | "custom";
```

Defined in: [types/skills.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L51)

Resource types that skills can cost

***

### ModifierEffectType

```ts
type ModifierEffectType = "flat" | "luck" | "luck-multiplied" | "die" | "ability";
```

Defined in: [types/skills.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/skills.ts#L61)

Modifier effect types

***

### SpellCastingMode

```ts
type SpellCastingMode = "wizard" | "cleric" | "patron";
```

Defined in: [types/spells.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L24)

Spell casting mode determines how the spell is cast.
Used in spell data catalogs to categorize spells.

***

### CasterType

```ts
type CasterType = "wizard" | "cleric" | "elf";
```

Defined in: [types/spells.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L114)

Types of spellcasters in DCC

***

### MercurialTrigger

```ts
type MercurialTrigger = 
  | "always"
  | "on-cast"
  | "on-success"
  | "on-failure"
  | "on-crit"
  | "on-fumble";
```

Defined in: [types/spells.ts:282](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L282)

Trigger conditions for mercurial effects

***

### MercurialSpecialAction

```ts
type MercurialSpecialAction = "rollAgain";
```

Defined in: [types/spells.ts:319](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L319)

Special (meta) table-entry actions that need handling beyond "store the
text". Currently the only action is `rollAgain` — the DCC core Table 5-2
entries 99 ("Roll again twice.") and 100+ ("Roll again twice, but ...
roll 4d20 ...") — but the discriminator leaves room for future specials.

***

### DCCAbilityId

```ts
type DCCAbilityId = "str" | "agl" | "sta" | "per" | "int" | "lck";
```

Defined in: [types/system.ts:28](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L28)

Standard DCC ability IDs

***

### Alignment

```ts
type Alignment = "l" | "n" | "c";
```

Defined in: [types/system.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L33)

Alignment options

***

### SaveType

```ts
type SaveType = "reflex" | "fortitude" | "will";
```

Defined in: [types/system.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L88)

Save type identifiers

***

### BirthAugurEffectType

```ts
type BirthAugurEffectType = 
  | "attack-all"
  | "attack-melee"
  | "attack-missile"
  | "attack-unarmed"
  | "attack-mounted"
  | "damage-all"
  | "damage-melee"
  | "damage-missile"
  | "skill-check"
  | "find-trap"
  | "find-secret-door"
  | "spell-check"
  | "spell-damage"
  | "turn-unholy"
  | "magical-healing"
  | "saving-throw-all"
  | "saving-throw-trap"
  | "saving-throw-poison"
  | "saving-throw-reflex"
  | "saving-throw-fortitude"
  | "saving-throw-will"
  | "armor-class"
  | "initiative"
  | "hit-points"
  | "critical-table"
  | "fumble-table"
  | "corruption"
  | "languages"
  | "speed"
  | "starting-weapon"
  | "unknown";
```

Defined in: [types/tables.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L64)

Types of effects birth augurs can have

## Variables

### DEFAULT\_NAME\_CONFIG

```ts
const DEFAULT_NAME_CONFIG: NameConfig;
```

Defined in: [types/character-creation.ts:448](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L448)

Default name configuration (no automatic generation)

***

### DEFAULT\_ABILITY\_SCORE\_CONFIG

```ts
const DEFAULT_ABILITY_SCORE_CONFIG: AbilityScoreConfig;
```

Defined in: [types/character-creation.ts:518](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L518)

Default ability score configuration (standard DCC rules)

***

### DEFAULT\_HIT\_POINT\_CONFIG

```ts
const DEFAULT_HIT_POINT_CONFIG: HitPointConfig;
```

Defined in: [types/character-creation.ts:526](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L526)

Default hit point configuration (standard DCC rules)

***

### DEFAULT\_BIRTH\_AUGUR\_CONFIG

```ts
const DEFAULT_BIRTH_AUGUR_CONFIG: BirthAugurConfig;
```

Defined in: [types/character-creation.ts:534](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L534)

Default birth augur configuration (standard DCC rules)

***

### DEFAULT\_OCCUPATION\_CONFIG

```ts
const DEFAULT_OCCUPATION_CONFIG: OccupationConfig;
```

Defined in: [types/character-creation.ts:541](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L541)

Default occupation configuration (standard DCC rules)

***

### DEFAULT\_CLASS\_SELECTION\_CONFIG

```ts
const DEFAULT_CLASS_SELECTION_CONFIG: ClassSelectionConfig;
```

Defined in: [types/character-creation.ts:548](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L548)

Default class selection configuration

***

### DEFAULT\_EQUIPMENT\_CONFIG

```ts
const DEFAULT_EQUIPMENT_CONFIG: EquipmentConfig;
```

Defined in: [types/character-creation.ts:555](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L555)

Default equipment configuration (standard DCC rules)

***

### DEFAULT\_LANGUAGE\_CONFIG

```ts
const DEFAULT_LANGUAGE_CONFIG: LanguageConfig;
```

Defined in: [types/character-creation.ts:565](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L565)

Default language configuration (standard DCC rules)

***

### DEFAULT\_DWARF\_RULES\_CONFIG

```ts
const DEFAULT_DWARF_RULES_CONFIG: DwarfRulesConfig;
```

Defined in: [types/character-creation.ts:573](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L573)

Default dwarf rules configuration (standard DCC rules)

***

### DEFAULT\_CHARACTER\_CREATION\_CONFIG

```ts
const DEFAULT_CHARACTER_CREATION_CONFIG: Required<CharacterCreationConfig>;
```

Defined in: [types/character-creation.ts:580](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L580)

Complete default configuration (standard DCC rules)

***

### BUILT\_IN\_DICE\_METHODS

```ts
const BUILT_IN_DICE_METHODS: Record<Exclude<AbilityScoreMethod, "manual" | "custom">, DiceMethodDefinition>;
```

Defined in: [types/character-creation.ts:602](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L602)

Built-in dice method definitions.
These correspond to the AbilityScoreMethod union values.

***

### BUILT\_IN\_ZERO\_LEVEL\_HP\_METHODS

```ts
const BUILT_IN_ZERO_LEVEL_HP_METHODS: Record<Exclude<ZeroLevelHPMethod, "custom">, HPMethodDefinition>;
```

Defined in: [types/character-creation.ts:641](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L641)

Built-in 0-level HP method definitions.

***

### FUMBLE\_DICE

```ts
const FUMBLE_DICE: Record<ArmorType, DieType>;
```

Defined in: [types/combat.ts:448](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L448)

Fumble die by armor type

***

### ARMOR\_AC\_BONUS

```ts
const ARMOR_AC_BONUS: Record<ArmorType, number>;
```

Defined in: [types/combat.ts:464](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L464)

AC bonus by armor type (DCC core rules Table 3-3)

***

### SHIELD\_AC\_BONUS

```ts
const SHIELD_AC_BONUS: 1 = 1;
```

Defined in: [types/combat.ts:480](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L480)

Shield AC bonus

***

### BASE\_AC

```ts
const BASE_AC: 10 = 10;
```

Defined in: [types/combat.ts:485](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L485)

Base AC without any armor or modifiers

***

### COMMON\_WEAPONS

```ts
const COMMON_WEAPONS: Record<string, WeaponStats>;
```

Defined in: [types/combat.ts:707](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/combat.ts#L707)

Common weapon stats

***

### DEFAULT\_DICE\_CHAIN

```ts
const DEFAULT_DICE_CHAIN: readonly [3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 30];
```

Defined in: [types/dice.ts:12](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L12)

Standard DCC dice chain - the progression of dice sizes
d3 → d4 → d5 → d6 → d7 → d8 → d10 → d12 → d14 → d16 → d20 → d24 → d30

***

### defaultRandomSource

```ts
const defaultRandomSource: RandomSource;
```

Defined in: [types/random.ts:172](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L172)

Default random source instance.
Use this when you don't need reproducibility or testing.

***

### CASTER\_PROFILES

```ts
const CASTER_PROFILES: Record<CasterType, CasterProfile>;
```

Defined in: [types/spells.ts:152](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L152)

Standard caster profiles for DCC classes

***

### DCC\_ABILITIES

```ts
const DCC_ABILITIES: readonly AbilityDefinition[];
```

Defined in: [types/system.ts:166](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L166)

Standard DCC abilities

***

### DCC\_ALIGNMENTS

```ts
const DCC_ALIGNMENTS: readonly AlignmentDefinition[];
```

Defined in: [types/system.ts:178](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L178)

Standard DCC alignments

***

### DCC\_SAVES

```ts
const DCC_SAVES: readonly SaveDefinition[];
```

Defined in: [types/system.ts:187](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L187)

Standard DCC saves

***

### DCC\_ABILITY\_MAPPINGS

```ts
const DCC_ABILITY_MAPPINGS: AbilityMappings;
```

Defined in: [types/system.ts:196](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L196)

Standard DCC ability mappings

***

### DCC\_SYSTEM

```ts
const DCC_SYSTEM: SystemConfig;
```

Defined in: [types/system.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L213)

Standard DCC system configuration

## Functions

### createEmptyBonusList()

```ts
function createEmptyBonusList(): BonusList;
```

Defined in: [types/bonuses.ts:249](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L249)

Create an empty bonus list

#### Returns

[`BonusList`](#bonuslist)

***

### createAbilityBonus()

```ts
function createAbilityBonus(
   abilityId: string, 
   abilityName: string, 
   modifier: number
): RollBonus;
```

Defined in: [types/bonuses.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L263)

Create an ability modifier bonus

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilityId` | `string` |
| `abilityName` | `string` |
| `modifier` | `number` |

#### Returns

[`RollBonus`](#rollbonus)

***

### createLevelBonus()

```ts
function createLevelBonus(
   classId: string, 
   level: number, 
   modifier: number, 
   label?: string
): RollBonus;
```

Defined in: [types/bonuses.ts:280](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L280)

Create a level/class bonus

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |
| `level` | `number` |
| `modifier` | `number` |
| `label?` | `string` |

#### Returns

[`RollBonus`](#rollbonus)

***

### createLuckBonus()

```ts
function createLuckBonus(pointsBurned: number, multiplier?: number): RollBonus;
```

Defined in: [types/bonuses.ts:298](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L298)

Create a luck burn bonus

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `pointsBurned` | `number` | `undefined` |
| `multiplier?` | `number` | `1` |

#### Returns

[`RollBonus`](#rollbonus)

***

### createEquipmentBonus()

```ts
function createEquipmentBonus(
   itemId: string, 
   itemName: string, 
   modifier: number
): RollBonus;
```

Defined in: [types/bonuses.ts:317](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L317)

Create an equipment bonus

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `itemId` | `string` |
| `itemName` | `string` |
| `modifier` | `number` |

#### Returns

[`RollBonus`](#rollbonus)

***

### createSpellBonus()

```ts
function createSpellBonus(
   spellId: string, 
   spellName: string, 
   effect: BonusEffect
): RollBonus;
```

Defined in: [types/bonuses.ts:334](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L334)

Create a spell effect bonus

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spellId` | `string` |
| `spellName` | `string` |
| `effect` | [`BonusEffect`](#bonuseffect) |

#### Returns

[`RollBonus`](#rollbonus)

***

### createAssistBonus()

```ts
function createAssistBonus(helperName: string, modifier?: number): RollBonus;
```

Defined in: [types/bonuses.ts:351](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L351)

Create an assist bonus (another character helping)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `helperName` | `string` | `undefined` |
| `modifier?` | `number` | `2` |

#### Returns

[`RollBonus`](#rollbonus)

***

### createJudgeBonus()

```ts
function createJudgeBonus(reason: string, effect: BonusEffect): RollBonus;
```

Defined in: [types/bonuses.ts:367](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L367)

Create a judge's situational bonus

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `reason` | `string` |
| `effect` | [`BonusEffect`](#bonuseffect) |

#### Returns

[`RollBonus`](#rollbonus)

***

### createDiceChainBonus()

```ts
function createDiceChainBonus(
   source: BonusSource, 
   steps: number, 
   label: string
): RollBonus;
```

Defined in: [types/bonuses.ts:383](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L383)

Create a dice chain bump bonus

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `source` | [`BonusSource`](#bonussource) |
| `steps` | `number` |
| `label` | `string` |

#### Returns

[`RollBonus`](#rollbonus)

***

### computeBonuses()

```ts
function computeBonuses(bonuses: RollBonus[], condition?: string): ComputedBonuses;
```

Defined in: [types/bonuses.ts:434](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L434)

Compute the total effect of all bonuses.
All bonuses stack in DCC.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bonuses` | [`RollBonus`](#rollbonus)[] | Array of bonuses to apply |
| `condition?` | `string` | Optional condition to filter bonuses (e.g., "melee-attack") |

#### Returns

[`ComputedBonuses`](#computedbonuses)

Computed totals for modifiers, dice chain, etc.

***

### mergeBonuses()

```ts
function mergeBonuses(list: BonusList): RollBonus[];
```

Defined in: [types/bonuses.ts:490](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L490)

Merge inherent and situational bonuses into a single list

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `list` | [`BonusList`](#bonuslist) |

#### Returns

[`RollBonus`](#rollbonus)[]

***

### getTotalModifier()

```ts
function getTotalModifier(bonuses: RollBonus[]): number;
```

Defined in: [types/bonuses.ts:497](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L497)

Get the total modifier from a list of bonuses (quick helper)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bonuses` | [`RollBonus`](#rollbonus)[] |

#### Returns

`number`

***

### getDiceChainSteps()

```ts
function getDiceChainSteps(bonuses: RollBonus[]): number;
```

Defined in: [types/bonuses.ts:509](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/bonuses.ts#L509)

Get net dice chain steps from a list of bonuses

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bonuses` | [`RollBonus`](#rollbonus)[] |

#### Returns

`number`

***

### resolveCharacterCreationConfig()

```ts
function resolveCharacterCreationConfig(userConfig?: CharacterCreationConfig): Required<CharacterCreationConfig>;
```

Defined in: [types/character-creation.ts:695](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L695)

Merge user config with defaults

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `userConfig?` | [`CharacterCreationConfig`](#charactercreationconfig) |

#### Returns

`Required`\<[`CharacterCreationConfig`](#charactercreationconfig)\>

***

### getDiceMethodDefinition()

```ts
function getDiceMethodDefinition(
   method: AbilityScoreMethod, 
   customMethod?: string | DiceMethodDefinition, 
   customMethodsRegistry?: Record<string, DiceMethodDefinition>
): DiceMethodDefinition | undefined;
```

Defined in: [types/character-creation.ts:750](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character-creation.ts#L750)

Get dice method definition by ID or built-in name.
Returns undefined if not found.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `method` | [`AbilityScoreMethod`](#abilityscoremethod) |
| `customMethod?` | `string` \| [`DiceMethodDefinition`](#dicemethoddefinition) |
| `customMethodsRegistry?` | `Record`\<`string`, [`DiceMethodDefinition`](#dicemethoddefinition)\> |

#### Returns

[`DiceMethodDefinition`](#dicemethoddefinition) \| `undefined`

***

### createDefaultAbilityScores()

```ts
function createDefaultAbilityScores(): AbilityScores;
```

Defined in: [types/character.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L50)

Create default ability scores (all 10s)

#### Returns

[`AbilityScores`](#abilityscores-1)

***

### createEmptyInventory()

```ts
function createEmptyInventory(): Inventory;
```

Defined in: [types/character.ts:394](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L394)

Create an empty inventory

#### Returns

[`Inventory`](#inventory)

***

### createInventoryItem()

```ts
function createInventoryItem(
   name: string, 
   category: ItemCategory, 
   options?: Partial<Omit<InventoryItem, "name" | "category">>
): InventoryItem;
```

Defined in: [types/character.ts:401](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/character.ts#L401)

Create an inventory item with defaults

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |
| `category` | [`ItemCategory`](#itemcategory) |
| `options?` | `Partial`\<`Omit`\<[`InventoryItem`](#inventoryitem), `"name"` \| `"category"`\>\> |

#### Returns

[`InventoryItem`](#inventoryitem)

***

### getSkillBonus()

```ts
function getSkillBonus(
   progression: ClassProgression, 
   level: number, 
   alignment: ProgressionAlignment, 
   skillId: string
): number | `d${number}` | undefined;
```

Defined in: [types/class-progression.ts:102](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/class-progression.ts#L102)

Helper to get skill bonus for a character

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `progression` | [`ClassProgression`](#classprogression) |
| `level` | `number` |
| `alignment` | [`ProgressionAlignment`](#progressionalignment) |
| `skillId` | `string` |

#### Returns

`number` \| `` `d${number}` `` \| `undefined`

***

### createDefaultRandomSource()

```ts
function createDefaultRandomSource(): RandomSource;
```

Defined in: [types/random.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L52)

Create a random source using Math.random().
This is the default for production use.

#### Returns

[`RandomSource`](#randomsource)

***

### createSeededRandomSource()

```ts
function createSeededRandomSource(seed: number): RandomSource;
```

Defined in: [types/random.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L83)

Create a seeded random source for reproducible results.
Uses a simple LCG (Linear Congruential Generator).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `seed` | `number` | Initial seed value |

#### Returns

[`RandomSource`](#randomsource)

***

### createMockRandomSource()

```ts
function createMockRandomSource(queue: MockRandomQueue): RandomSource;
```

Defined in: [types/random.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/random.ts#L140)

Create a mock random source with predetermined values.
Useful for testing specific scenarios.

When the queue is exhausted, falls back to returning 1 for rolls
and 0 for indices.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `queue` | [`MockRandomQueue`](#mockrandomqueue) | Predetermined values to return |

#### Returns

[`RandomSource`](#randomsource)

***

### createEmptySpellbook()

```ts
function createEmptySpellbook(): Spellbook;
```

Defined in: [types/spells.ts:447](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L447)

Create an empty spellbook

#### Returns

[`Spellbook`](#spellbook-3)

***

### createEmptySpellburn()

```ts
function createEmptySpellburn(): SpellburnCommitment;
```

Defined in: [types/spells.ts:475](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L475)

Create an empty spellburn commitment

#### Returns

[`SpellburnCommitment`](#spellburncommitment)

***

### totalSpellburn()

```ts
function totalSpellburn(commitment: SpellburnCommitment): number;
```

Defined in: [types/spells.ts:482](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/spells.ts#L482)

Calculate total spellburn points

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `commitment` | [`SpellburnCommitment`](#spellburncommitment) |

#### Returns

`number`

***

### findAbility()

```ts
function findAbility(abilities: readonly AbilityDefinition[], id: string): AbilityDefinition | undefined;
```

Defined in: [types/system.ts:240](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L240)

Helper to find an ability by ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilities` | readonly [`AbilityDefinition`](#abilitydefinition)[] |
| `id` | `string` |

#### Returns

[`AbilityDefinition`](#abilitydefinition) \| `undefined`

***

### findSave()

```ts
function findSave(saves: readonly SaveDefinition[], id: SaveType): SaveDefinition | undefined;
```

Defined in: [types/system.ts:250](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/system.ts#L250)

Helper to find a save by ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `saves` | readonly [`SaveDefinition`](#savedefinition)[] |
| `id` | [`SaveType`](#savetype) |

#### Returns

[`SaveDefinition`](#savedefinition) \| `undefined`

***

### lookupTableResult()

```ts
function lookupTableResult(table: RollableTable, roll: number): TableEntry | undefined;
```

Defined in: [types/tables.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L100)

Look up a result in a table by roll value

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`RollableTable`](#rollabletable) |
| `roll` | `number` |

#### Returns

[`TableEntry`](#tableentry) \| `undefined`

***

### lookupBirthAugurEntry()

```ts
function lookupBirthAugurEntry(augurs: BirthAugurEntry[], roll: number): BirthAugurEntry | undefined;
```

Defined in: [types/tables.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/tables.ts#L110)

Look up a birth augur by roll value

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `augurs` | [`BirthAugurEntry`](#birthaugurentry)[] |
| `roll` | `number` |

#### Returns

[`BirthAugurEntry`](#birthaugurentry) \| `undefined`
