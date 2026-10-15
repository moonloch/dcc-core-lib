# skills

## Interfaces

### SkillResolveOptions

Defined in: [skills/resolve.ts:227](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L227)

Options for skill resolution (sync)

#### Extends

- [`RollOptions`](types.md#rolloptions)

#### Extended by

- [`RollCheckOptions`](checks.md#rollcheckoptions)

#### Properties

##### threatRange?

```ts
optional threatRange?: number;
```

Defined in: [skills/resolve.ts:229](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L229)

Threat range for critical success (default: max on die)

##### mode?

```ts
optional mode?: RollMode;
```

Defined in: [types/dice.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L52)

Whether to just build the formula or actually evaluate it

###### Inherited from

[`RollOptions`](types.md#rolloptions).[`mode`](types.md#mode-2)

##### roller?

```ts
optional roller?: DiceRoller;
```

Defined in: [types/dice.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L55)

Synchronous custom roller — used instead of built-in RNG when provided

###### Inherited from

[`RollOptions`](types.md#rolloptions).[`roller`](types.md#roller)

***

### SkillResolveOptionsAsync

Defined in: [skills/resolve.ts:235](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L235)

Options for skill resolution (async)

#### Extends

- [`RollOptionsAsync`](types.md#rolloptionsasync)

#### Extended by

- [`RollCheckOptionsAsync`](checks.md#rollcheckoptionsasync)

#### Properties

##### threatRange?

```ts
optional threatRange?: number;
```

Defined in: [skills/resolve.ts:237](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L237)

Threat range for critical success (default: max on die)

##### mode?

```ts
optional mode?: RollMode;
```

Defined in: [types/dice.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L64)

Whether to just build the formula or actually evaluate it

###### Inherited from

[`RollOptionsAsync`](types.md#rolloptionsasync).[`mode`](types.md#mode-3)

##### roller

```ts
roller: AsyncDiceRoller;
```

Defined in: [types/dice.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/dice.ts#L67)

Asynchronous custom roller. Required for async evaluation.

###### Inherited from

[`RollOptionsAsync`](types.md#rolloptionsasync).[`roller`](types.md#roller-1)

## Functions

### resolveSkillCheck()

```ts
function resolveSkillCheck(
   input: SkillCheckInput, 
   options?: SkillResolveOptions, 
   events?: SkillEvents
): SkillCheckResult;
```

Defined in: [skills/resolve.ts:336](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L336)

Resolve a skill check (sync).

Implements the 7-phase modifier pipeline from docs/MODIFIERS.md §3:
1. Die selection (set-die, bump-die)
2. Formula construction (add, add-dice)
3. Roll execution (evaluateRoll with optional custom roller)
4. Multiplicative arithmetic (multiply)
5. Threat range resolution (threat-shift) + crit/fumble classification
6. Applied flagging on add / add-dice modifiers
7. Resource tracking + event emission

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`SkillCheckInput`](types.md#skillcheckinput) |
| `options?` | [`SkillResolveOptions`](#skillresolveoptions) |
| `events?` | [`SkillEvents`](types.md#skillevents) |

#### Returns

[`SkillCheckResult`](types.md#skillcheckresult)

***

### resolveSkillCheckAsync()

```ts
function resolveSkillCheckAsync(
   input: SkillCheckInput, 
   options: SkillResolveOptionsAsync, 
   events?: SkillEvents
): Promise<SkillCheckResult>;
```

Defined in: [skills/resolve.ts:377](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L377)

Resolve a skill check (async). Same pipeline as the sync variant;
uses an async custom roller for the dice evaluation step.

Use this when your roll machinery is Promise-based
(e.g. FoundryVTT's `Roll.evaluate()`).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`SkillCheckInput`](types.md#skillcheckinput) |
| `options` | [`SkillResolveOptionsAsync`](#skillresolveoptionsasync) |
| `events?` | [`SkillEvents`](types.md#skillevents) |

#### Returns

`Promise`\<[`SkillCheckResult`](types.md#skillcheckresult)\>

***

### quickSkillCheck()

```ts
function quickSkillCheck(
   skillId: string, 
   die: `d${number}`, 
   abilityScore: number, 
   abilityId: string, 
   level: number, 
   options?: SkillResolveOptions
): SkillCheckResult;
```

Defined in: [skills/resolve.ts:413](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L413)

Quick skill check with minimal input

Convenience function for simple skill checks.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `skillId` | `string` |
| `die` | `` `d${number}` `` |
| `abilityScore` | `number` |
| `abilityId` | `string` |
| `level` | `number` |
| `options?` | [`SkillResolveOptions`](#skillresolveoptions) |

#### Returns

[`SkillCheckResult`](types.md#skillcheckresult)

***

### abilityCheck()

```ts
function abilityCheck(
   abilityId: string, 
   abilityScore: number, 
   options?: SkillResolveOptions
): SkillCheckResult;
```

Defined in: [skills/resolve.ts:444](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L444)

Create a simple ability check

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilityId` | `string` |
| `abilityScore` | `number` |
| `options?` | [`SkillResolveOptions`](#skillresolveoptions) |

#### Returns

[`SkillCheckResult`](types.md#skillcheckresult)

***

### savingThrow()

```ts
function savingThrow(
   saveType: string, 
   abilityId: string, 
   abilityScore: number, 
   saveBonus: number, 
   options?: SkillResolveOptions
): SkillCheckResult;
```

Defined in: [skills/resolve.ts:472](https://github.com/moonloch/dcc-core-lib/blob/main/src/skills/resolve.ts#L472)

Create a saving throw check

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `saveType` | `string` |
| `abilityId` | `string` |
| `abilityScore` | `number` |
| `saveBonus` | `number` |
| `options?` | [`SkillResolveOptions`](#skillresolveoptions) |

#### Returns

[`SkillCheckResult`](types.md#skillcheckresult)
