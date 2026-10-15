# dice

## Interfaces

### ParsedFormula

Defined in: [dice/roll.ts:191](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L191)

Parse a complete roll formula into components

Handles formulas like:
- "1d20"
- "2d6+5"
- "1d20+3-2"
- "1d20+1d6+5"

#### Param

**formula**

The formula to parse

#### Properties

##### dice

```ts
dice: ParsedDiceExpression | null;
```

Defined in: [dice/roll.ts:193](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L193)

The primary dice expression

##### totalModifier

```ts
totalModifier: number;
```

Defined in: [dice/roll.ts:196](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L196)

Total of all numeric modifiers

##### modifierValues

```ts
modifierValues: number[];
```

Defined in: [dice/roll.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L199)

Individual modifier values found

##### additionalDice

```ts
additionalDice: ParsedDiceExpression[];
```

Defined in: [dice/roll.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L202)

Additional dice expressions found

##### original

```ts
original: string;
```

Defined in: [dice/roll.ts:205](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L205)

The original formula

##### normalized

```ts
normalized: string;
```

Defined in: [dice/roll.ts:208](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L208)

Cleaned/normalized formula

***

### DieSelection

Defined in: [dice/roll.ts:555](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L555)

Result of die selection (pipeline phase 1): applies set-die and
bump-die modifiers to a base die.

#### Properties

##### die

```ts
die: `d${number}`;
```

Defined in: [dice/roll.ts:556](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L556)

##### supersededSetDies

```ts
supersededSetDies: readonly `d${number}`[];
```

Defined in: [dice/roll.ts:559](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L559)

Set-die modifiers that were superseded by later set-die modifiers
 (and thus not applied). Stored for renderers.

## Functions

### parseDiceExpression()

```ts
function parseDiceExpression(expression: string): ParsedDiceExpression | null;
```

Defined in: [dice/dice-chain.ts:25](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L25)

Parse a dice expression into its components

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `expression` | `string` | Dice expression like "1d20+5" or "2d6" |

#### Returns

[`ParsedDiceExpression`](types.md#parseddiceexpression) \| `null`

Parsed components, or null if invalid

***

### getPrimaryDie()

```ts
function getPrimaryDie(expression: string): `d${number}` | null;
```

Defined in: [dice/dice-chain.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L54)

Get the primary die type from an expression

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `expression` | `string` | Dice expression like "1d20+5" |

#### Returns

`` `d${number}` `` \| `null`

The die type (e.g., "d20"), or null if no die found

***

### getPrimaryDieFaces()

```ts
function getPrimaryDieFaces(expression: string): number;
```

Defined in: [dice/dice-chain.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L72)

Get the number of faces on the primary die

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `expression` | `string` | Dice expression like "1d20+5" |

#### Returns

`number`

Number of faces, or 20 if no die found

***

### countDice()

```ts
function countDice(expression: string): number;
```

Defined in: [dice/dice-chain.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L86)

Count the number of dice in an expression

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `expression` | `string` | Dice expression like "2d20+5" |

#### Returns

`number`

Number of dice, or 0 if invalid

***

### getDieRank()

```ts
function getDieRank(faces: number, diceChain?: readonly number[]): number;
```

Defined in: [dice/dice-chain.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L98)

Get the rank (index) of a die in the dice chain

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `faces` | `number` | `undefined` | Number of faces on the die |
| `diceChain?` | readonly `number`[] | `DEFAULT_DICE_CHAIN` | The dice chain to use (defaults to standard DCC chain) |

#### Returns

`number`

Index in the chain, or -1 if not found

***

### rankDiceExpression()

```ts
function rankDiceExpression(expression: string, diceChain?: readonly number[]): number;
```

Defined in: [dice/dice-chain.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L112)

Get the rank of the primary die in an expression

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `expression` | `string` | `undefined` | Dice expression like "1d20+5" |
| `diceChain?` | readonly `number`[] | `DEFAULT_DICE_CHAIN` | The dice chain to use |

#### Returns

`number`

Rank in the chain, or -1 if not in chain

***

### bumpDie()

```ts
function bumpDie(
   expression: string, 
   steps: number, 
   diceChain?: readonly number[]
): string;
```

Defined in: [dice/dice-chain.ts:128](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L128)

Bump a die up or down the dice chain

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `expression` | `string` | `undefined` | Dice expression like "1d20+5" |
| `steps` | `number` | `undefined` | Number of steps to move (positive = up, negative = down) |
| `diceChain?` | readonly `number`[] | `DEFAULT_DICE_CHAIN` | The dice chain to use |

#### Returns

`string`

New expression with bumped die, or original if can't bump

***

### bumpDieCount()

```ts
function bumpDieCount(
   expression: string, 
   adjustment: number, 
   maxCount?: number
): string;
```

Defined in: [dice/dice-chain.ts:165](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L165)

Adjust the number of dice in an expression

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `expression` | `string` | Dice expression like "2d20+5" |
| `adjustment` | `number` | Number of dice to add (or remove if negative) |
| `maxCount?` | `number` | Optional maximum number of dice |

#### Returns

`string`

New expression with adjusted count, or original if invalid

***

### calculateCritAdjustment()

```ts
function calculateCritAdjustment(original: string, adjusted: string): number;
```

Defined in: [dice/dice-chain.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L199)

Calculate the adjustment to critical range when die size changes

For DCC's "strict critical hit" rules, when action die changes,
the crit range adjusts proportionally.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `original` | `string` | Original dice expression |
| `adjusted` | `string` | New dice expression after chain adjustment |

#### Returns

`number`

Difference in die faces (for crit range adjustment)

***

### calculateProportionalCritRange()

```ts
function calculateProportionalCritRange(
   originalCritRange: number, 
   originalDieSize: number, 
   newDieSize: number
): number;
```

Defined in: [dice/dice-chain.ts:229](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L229)

Calculate proportional critical range for strict crit rules

When a character's action die changes size, their crit range
should scale proportionally. A warrior with 19-20 crit range on d20
should have equivalent odds on a d24.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `originalCritRange` | `number` | Original minimum roll for crit (e.g., 19 for 19-20) |
| `originalDieSize` | `number` | Original die faces (e.g., 20) |
| `newDieSize` | `number` | New die faces (e.g., 24) |

#### Returns

`number`

New minimum roll for crit

#### Example

```ts
// Warrior with 19-20 crit on d20, now rolling d24
calculateProportionalCritRange(19, 20, 24) // Returns 23 (23-24 range)
```

***

### getDiceChain()

```ts
function getDiceChain(): number[];
```

Defined in: [dice/dice-chain.ts:248](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L248)

Get the full dice chain

#### Returns

`number`[]

Copy of the default dice chain array

***

### isInDiceChain()

```ts
function isInDiceChain(faces: number, diceChain?: readonly number[]): boolean;
```

Defined in: [dice/dice-chain.ts:259](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/dice-chain.ts#L259)

Check if a die face count is in the dice chain

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `faces` | `number` | `undefined` | Number of faces to check |
| `diceChain?` | readonly `number`[] | `DEFAULT_DICE_CHAIN` | The dice chain to check against |

#### Returns

`boolean`

True if the die is in the chain

***

### ensurePlus()

```ts
function ensurePlus(value: string, includeZero?: boolean): string;
```

Defined in: [dice/roll.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L98)

Ensure a modifier string has a + prefix if positive

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `string` | `undefined` | The value to format |
| `includeZero?` | `boolean` | `true` | If true, returns "+0" for zero; if false, returns "" |

#### Returns

`string`

Formatted string with + prefix for non-negative values

#### Example

```ts
ensurePlus("5") // "+5"
ensurePlus("-3") // "-3"
ensurePlus("0") // "+0"
ensurePlus("0", false) // ""
ensurePlus("d6") // "+d6"
```

***

### getFirstDie()

```ts
function getFirstDie(formula: string): string;
```

Defined in: [dice/roll.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L129)

Extract the first die expression from a formula

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `formula` | `string` | Roll formula like "1d20+5+1d6" |

#### Returns

`string`

First die expression (e.g., "1d20") or empty string

***

### getFirstMod()

```ts
function getFirstMod(formula: string): string;
```

Defined in: [dice/roll.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L143)

Extract the first numeric modifier from a formula

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `formula` | `string` | Roll formula like "1d20+5-2" |

#### Returns

`string`

First modifier (e.g., "+5") or empty string

***

### buildFormula()

```ts
function buildFormula(
   die: `d${number}`, 
   count: number, 
   modifiers: LegacyRollModifier[]
): string;
```

Defined in: [dice/roll.ts:163](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L163)

Build a roll formula from components (LEGACY).

Used by subsystems still on the flat `LegacyRollModifier` shape.
New code should use `buildFormulaFromModifiers` which understands
the tagged-union `RollModifier`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `die` | `` `d${number}` `` | Base die (e.g., "d20") |
| `count` | `number` | Number of dice |
| `modifiers` | [`LegacyRollModifier`](types.md#legacyrollmodifier)[] | Array of legacy modifiers to add |

#### Returns

`string`

Complete formula string

***

### parseFormula()

```ts
function parseFormula(formula: string): ParsedFormula;
```

Defined in: [dice/roll.ts:211](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L211)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `formula` | `string` |

#### Returns

[`ParsedFormula`](#parsedformula)

***

### evaluateRoll()

```ts
function evaluateRoll(formula: string, options?: RollOptions): RollResult;
```

Defined in: [dice/roll.ts:268](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L268)

Evaluate a roll formula (sync).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `formula` | `string` | The roll formula (e.g., "1d20+5") |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options (mode, custom roller) |

#### Returns

[`RollResult`](types.md#rollresult)

Roll result

***

### evaluateRollAsync()

```ts
function evaluateRollAsync(formula: string, options: RollOptionsAsync): Promise<RollResult>;
```

Defined in: [dice/roll.ts:338](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L338)

Evaluate a roll formula (async).

Use this when the custom roller is Promise-based (e.g. FoundryVTT's
`Roll.evaluate()`). The roller is required; if you have a sync
roller, use `evaluateRoll` instead.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `formula` | `string` | The roll formula |
| `options` | [`RollOptionsAsync`](types.md#rolloptionsasync) | Async roll options (mode + async roller) |

#### Returns

`Promise`\<[`RollResult`](types.md#rollresult)\>

Promise of roll result

***

### createRoll()

```ts
function createRoll(
   die: `d${number}`, 
   modifiers: LegacyRollModifier[], 
   options?: RollOptions
): RollResult;
```

Defined in: [dice/roll.ts:396](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L396)

Create a roll with legacy modifiers (LEGACY).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `die` | `` `d${number}` `` | The die to roll |
| `modifiers` | [`LegacyRollModifier`](types.md#legacyrollmodifier)[] | Legacy modifiers to apply |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options |

#### Returns

[`RollResult`](types.md#rollresult)

Roll result

***

### rollSimple()

```ts
function rollSimple(
   die: `d${number}`, 
   modifier?: number, 
   options?: RollOptions
): RollResult;
```

Defined in: [dice/roll.ts:420](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L420)

Roll a simple die (LEGACY).

Convenience function for quick single-die rolls.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `die` | `` `d${number}` `` | `undefined` | Die type (e.g., "d20") |
| `modifier?` | `number` | `0` | Optional flat modifier |
| `options?` | [`RollOptions`](types.md#rolloptions) | `{}` | Roll options |

#### Returns

[`RollResult`](types.md#rollresult)

Roll result

***

### isNatural20()

```ts
function isNatural20(result: RollResult): boolean;
```

Defined in: [dice/roll.ts:434](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L434)

Check if a roll is a natural 20 (or max on the die)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`RollResult`](types.md#rollresult) |

#### Returns

`boolean`

***

### isNatural1()

```ts
function isNatural1(result: RollResult): boolean;
```

Defined in: [dice/roll.ts:445](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L445)

Check if a roll is a natural 1

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`RollResult`](types.md#rollresult) |

#### Returns

`boolean`

***

### meetsFumbleRange()

```ts
function meetsFumbleRange(result: RollResult, fumbleRange?: number): boolean;
```

Defined in: [dice/roll.ts:462](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L462)

Check if a roll falls inside a fumble range

The fumble range is a natural-roll threshold on the die actually
rolled (1 = only a natural 1, 2 = natural 1-2, etc.). Unlike the
threat range it is NEVER rescaled when the die changes size — a
weapon that fumbles on 1-2 fumbles on a natural 1-2 whether the
action die is a d16, d20, or d24.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `result` | [`RollResult`](types.md#rollresult) | `undefined` | The roll result |
| `fumbleRange?` | `number` | `1` | Highest natural roll that fumbles (default 1) |

#### Returns

`boolean`

True if the natural roll is within the fumble range

***

### adjustThreatRange()

```ts
function adjustThreatRange(threatRange: number, dieFaces: number): number;
```

Defined in: [dice/roll.ts:483](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L483)

Adjust threat range for dice larger than d20

A threat range represents "top N values of the die". For example:
- Threat range 20 on d20 = only 20 (top 1 value)
- Threat range 19 on d20 = 19-20 (top 2 values)
- Threat range 19 on d24 = 23-24 (top 2 values)

Formula: adjustedRange = dieFaces - (20 - threatRange)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `threatRange` | `number` | Base threat range (designed for d20) |
| `dieFaces` | `number` | Number of faces on the die being rolled |

#### Returns

`number`

Adjusted threat range for the die

***

### meetsThreatRange()

```ts
function meetsThreatRange(
   result: RollResult, 
   threatRange: number, 
   isNatural?: boolean
): boolean;
```

Defined in: [dice/roll.ts:512](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L512)

Check if a roll meets or exceeds a threat range

By default the threat range is d20-relative and is adjusted to the
rolled die to preserve the same "top N values" relationship — a
threat range of 19-20 on d20 becomes 23-24 on d24, or 15-16 on d16
(the warrior multi-die scaling rule).

When `isNatural` is true the threshold is a natural-roll value on
the die actually rolled and is compared as-is. Use this for rules
that name a fixed natural number — the halfling two-weapon "crits
on a natural 16", or Agl 16-17 "crits on the max face of the die
rolled" — where rescaling would produce absurd ranges (a natural-16
threshold on a d12 would otherwise become 8+).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `result` | [`RollResult`](types.md#rollresult) | `undefined` | The roll result |
| `threatRange` | `number` | `undefined` | Minimum natural roll for threat (e.g., 19 for 19-20 on d20) |
| `isNatural?` | `boolean` | `false` | Compare against the natural roll without d20-relative rescaling |

#### Returns

`boolean`

True if natural roll meets the (possibly adjusted) threat range

***

### isAutoHit()

```ts
function isAutoHit(result: RollResult): boolean;
```

Defined in: [dice/roll.ts:538](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L538)

Check if a roll is an automatic hit (natural max on the die)

Only a natural 20 on d20 (or the maximum value on larger dice)
is an automatic hit. This is distinct from threat range - a warrior
with 19-20 threat range rolling a 19 does NOT auto-hit.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`RollResult`](types.md#rollresult) | The roll result |

#### Returns

`boolean`

True if natural roll equals the die's maximum value

***

### selectDie()

```ts
function selectDie(baseDie: `d${number}`, modifiers: RollModifier[]): DieSelection;
```

Defined in: [dice/roll.ts:569](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L569)

Phase 1 of the pipeline: determine the effective die.

Applies `set-die` modifiers (last wins) then `bump-die` modifiers
(sum of steps). Returns the effective die and any superseded
`set-die` values for display purposes.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `baseDie` | `` `d${number}` `` |
| `modifiers` | [`RollModifier`](types.md#rollmodifier)[] |

#### Returns

[`DieSelection`](#dieselection)

***

### buildFormulaFromModifiers()

```ts
function buildFormulaFromModifiers(die: `d${number}`, modifiers: RollModifier[]): string;
```

Defined in: [dice/roll.ts:602](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L602)

Phase 2 of the pipeline: build the formula string from additive
modifiers against a pre-selected die.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `die` | `` `d${number}` `` |
| `modifiers` | [`RollModifier`](types.md#rollmodifier)[] |

#### Returns

`string`

***

### applyMultipliers()

```ts
function applyMultipliers(subtotal: number, modifiers: RollModifier[]): number;
```

Defined in: [dice/roll.ts:634](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L634)

Phase 4 of the pipeline: apply multiplicative modifiers to a subtotal.
Multiplicative modifiers compose by multiplication
(factor1 * factor2 * ...). Used primarily by damage rolls.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subtotal` | `number` |
| `modifiers` | [`RollModifier`](types.md#rollmodifier)[] |

#### Returns

`number`

***

### resolveThreatRange()

```ts
function resolveThreatRange(
   baseThreatRange: number, 
   dieFaces: number, 
   modifiers: RollModifier[]
): number;
```

Defined in: [dice/roll.ts:654](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L654)

Phase 5 of the pipeline: resolve effective threat range by summing
`threat-shift` modifier amounts against a base threat range, then
scaling for dice larger than d20.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `baseThreatRange` | `number` | Base threat range in d20 space (e.g. 20 for crit-on-20, 19 for 19-20) |
| `dieFaces` | `number` | Faces on the die being rolled |
| `modifiers` | [`RollModifier`](types.md#rollmodifier)[] | The modifier list |

#### Returns

`number`

The effective threat range to compare the natural roll against

***

### markApplied()

```ts
function markApplied(modifiers: RollModifier[]): RollModifier[];
```

Defined in: [dice/roll.ts:678](https://github.com/moonloch/dcc-core-lib/blob/main/src/dice/roll.ts#L678)

Phase 6 of the pipeline: return a new modifier list with `applied`
flags set on `add` and `add-dice` kinds.

- `add` modifiers are `applied: true` when their `value !== 0`.
- `add-dice` modifiers are always `applied: true` (a dice expression
  always contributes at least 1 to the total).
- Other kinds pass through untouched.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `modifiers` | [`RollModifier`](types.md#rollmodifier)[] |

#### Returns

[`RollModifier`](types.md#rollmodifier)[]
