# checks

## Interfaces

### CharacterAccessors

Defined in: checks/accessors.ts:38

Functions to extract check-relevant data from a character.

Mapping summary (default DCC):
- Ability ID 'str' → character.state.abilities.str.current
- Save ID 'reflex' → character.state.saves.reflex (bonus)
- Level → character.classInfo?.level ?? 0
- Luck → character.state.abilities.lck.current

#### Properties

##### getAbilityScore

```ts
getAbilityScore: (character: Character, abilityId: string) => number | undefined;
```

Defined in: checks/accessors.ts:48

Get an ability score value for modifier calculation.

Default mapping: id → character.state.abilities[id].current

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |
| `abilityId` | `string` | The ability ID (e.g., 'str', 'agl') |

###### Returns

`number` \| `undefined`

The ability score (e.g., 16), or undefined if not found

##### getSaveBonus

```ts
getSaveBonus: (character: Character, saveId: string) => number;
```

Defined in: checks/accessors.ts:59

Get a saving throw bonus (class-based bonus, not ability modifier).

Default mapping: id → character.state.saves[id]

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |
| `saveId` | `string` | The save ID (e.g., 'reflex', 'fortitude', 'will') |

###### Returns

`number`

The save bonus (e.g., 2), or 0 if not found

##### getLevel

```ts
getLevel: (character: Character) => number;
```

Defined in: checks/accessors.ts:69

Get the character's level.

Default mapping: character.classInfo?.level ?? 0

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |

###### Returns

`number`

The character level (0 for 0-level characters)

##### getLuck

```ts
getLuck: (character: Character) => number;
```

Defined in: checks/accessors.ts:79

Get the character's current luck score (for luck burning).

Default mapping: character.state.abilities.lck.current

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |

###### Returns

`number`

The current luck score

##### getClassId

```ts
getClassId: (character: Character) => string | undefined;
```

Defined in: checks/accessors.ts:89

Get the character's class ID.

Default mapping: character.classInfo?.classId

###### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |

###### Returns

`string` \| `undefined`

The class ID, or undefined for 0-level

***

### ParsedCheckId

Defined in: checks/constants.ts:104

Parsed check ID with namespace and value

#### Properties

##### namespace

```ts
namespace: CheckNamespaceType | null;
```

Defined in: checks/constants.ts:105

##### value

```ts
value: string;
```

Defined in: checks/constants.ts:106

##### raw

```ts
raw: string;
```

Defined in: checks/constants.ts:107

***

### LuckCheckResult

Defined in: checks/luck-check.ts:19

Result of a luck check

#### Properties

##### roll

```ts
roll: number;
```

Defined in: checks/luck-check.ts:21

The d20 roll

##### target

```ts
target: number;
```

Defined in: checks/luck-check.ts:24

The luck score being checked against

##### success

```ts
success: boolean;
```

Defined in: checks/luck-check.ts:27

Whether the check succeeded (roll <= target)

##### label

```ts
label: string;
```

Defined in: checks/luck-check.ts:30

Description of the check

***

### RollLuckCheckOptions

Defined in: checks/luck-check.ts:36

Options for rolling a luck check

#### Properties

##### roller?

```ts
optional roller?: DiceRoller;
```

Defined in: checks/luck-check.ts:38

Custom dice roller

##### accessors?

```ts
optional accessors?: CharacterAccessors;
```

Defined in: checks/luck-check.ts:41

Custom accessors for extracting data from the character

##### label?

```ts
optional label?: string;
```

Defined in: checks/luck-check.ts:44

Label for the check

***

### InlineCheckConfig

Defined in: checks/roll.ts:38

Inline check configuration for custom/ad-hoc checks

#### Properties

##### ability

```ts
ability: string;
```

Defined in: checks/roll.ts:40

Ability to use for the modifier (raw ID like 'str', not namespaced)

##### die?

```ts
optional die?: `d${number}`;
```

Defined in: checks/roll.ts:43

Die to roll (default: d20)

##### name?

```ts
optional name?: string;
```

Defined in: checks/roll.ts:46

Display name for the check

***

### RollCheckOptions

Defined in: checks/roll.ts:57

Options for rollCheck (sync)

#### Extends

- [`SkillResolveOptions`](skills.md#skillresolveoptions)

#### Properties

##### modifiers?

```ts
optional modifiers?: RollModifier[];
```

Defined in: checks/roll.ts:59

Additional situational modifiers

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: checks/roll.ts:62

Luck to burn on this roll

##### events?

```ts
optional events?: SkillEvents;
```

Defined in: checks/roll.ts:65

Event callbacks

##### accessors?

```ts
optional accessors?: CharacterAccessors;
```

Defined in: checks/roll.ts:74

Custom accessors for extracting data from the character.
Override to support different character structures.

###### See

 - [CharacterAccessors](#characteraccessors) for the interface
 - [DEFAULT\_ACCESSORS](#default_accessors) for the default implementation

##### additionalAbilities?

```ts
optional additionalAbilities?: string[];
```

Defined in: checks/roll.ts:81

Additional ability IDs to extract from the character.
Use this when your skill references a custom ability.
Standard DCC abilities (str, agl, sta, per, int, lck) are always included.

##### threatRange?

```ts
optional threatRange?: number;
```

Defined in: skills/resolve.ts:229

Threat range for critical success (default: max on die)

###### Inherited from

[`SkillResolveOptions`](skills.md#skillresolveoptions).[`threatRange`](skills.md#threatrange)

##### mode?

```ts
optional mode?: RollMode;
```

Defined in: types/dice.ts:52

Whether to just build the formula or actually evaluate it

###### Inherited from

[`SkillResolveOptions`](skills.md#skillresolveoptions).[`mode`](skills.md#mode)

##### roller?

```ts
optional roller?: DiceRoller;
```

Defined in: types/dice.ts:55

Synchronous custom roller — used instead of built-in RNG when provided

###### Inherited from

[`SkillResolveOptions`](skills.md#skillresolveoptions).[`roller`](skills.md#roller)

***

### RollCheckOptionsAsync

Defined in: checks/roll.ts:89

Options for rollCheckAsync. Uses an async custom roller — required
when the underlying roll machinery is Promise-based (e.g. FoundryVTT's
`Roll.evaluate()`).

#### Extends

- [`SkillResolveOptionsAsync`](skills.md#skillresolveoptionsasync)

#### Properties

##### modifiers?

```ts
optional modifiers?: RollModifier[];
```

Defined in: checks/roll.ts:90

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: checks/roll.ts:91

##### events?

```ts
optional events?: SkillEvents;
```

Defined in: checks/roll.ts:92

##### accessors?

```ts
optional accessors?: CharacterAccessors;
```

Defined in: checks/roll.ts:93

##### additionalAbilities?

```ts
optional additionalAbilities?: string[];
```

Defined in: checks/roll.ts:94

##### threatRange?

```ts
optional threatRange?: number;
```

Defined in: skills/resolve.ts:237

Threat range for critical success (default: max on die)

###### Inherited from

[`SkillResolveOptionsAsync`](skills.md#skillresolveoptionsasync).[`threatRange`](skills.md#threatrange-1)

##### mode?

```ts
optional mode?: RollMode;
```

Defined in: types/dice.ts:64

Whether to just build the formula or actually evaluate it

###### Inherited from

[`SkillResolveOptionsAsync`](skills.md#skillresolveoptionsasync).[`mode`](skills.md#mode-1)

##### roller

```ts
roller: AsyncDiceRoller;
```

Defined in: types/dice.ts:67

Asynchronous custom roller. Required for async evaluation.

###### Inherited from

[`SkillResolveOptionsAsync`](skills.md#skillresolveoptionsasync).[`roller`](skills.md#roller-1)

## Type Aliases

### CheckNamespaceType

```ts
type CheckNamespaceType = typeof CheckNamespace[keyof typeof CheckNamespace];
```

Defined in: checks/constants.ts:31

Character-Level Check API

High-level API for rolling ability checks, saving throws,
and skills against a character using namespaced IDs.

## Namespaced IDs

All check IDs are namespaced to make the check type explicit:
- `ability:str` - Ability check
- `save:reflex` - Saving throw
- `skill:backstab` - Skill check

#### Example

```ts
import { Ability, Save, rollCheck } from '@moonloch/dcc-core-lib';

// Roll a strength check (Ability.STR = "ability:str")
const result = rollCheck(Ability.STR, character);

// Roll a reflex save (Save.REF = "save:reflex")
const result = rollCheck(Save.REF, character);

// Roll with custom modifier
const result = rollCheck(Ability.AGL, character, {
  modifiers: [{ source: 'bless', value: 1, label: 'Bless' }]
});

// Custom accessors for different character structures
const result = rollCheck(Ability.STR, character, {
  accessors: myCustomAccessors
});
```

***

### AbilityCheckId

```ts
type AbilityCheckId = typeof Ability[keyof typeof Ability];
```

Defined in: checks/constants.ts:55

Namespaced ability ID type

***

### AbilityId

```ts
type AbilityId = "str" | "agl" | "sta" | "per" | "int" | "lck";
```

Defined in: checks/constants.ts:60

Raw ability ID (without namespace)

***

### SaveCheckId

```ts
type SaveCheckId = typeof Save[keyof typeof Save];
```

Defined in: checks/constants.ts:81

Namespaced save ID type

***

### SaveId

```ts
type SaveId = "reflex" | "fortitude" | "will";
```

Defined in: checks/constants.ts:86

Raw save ID (without namespace)

***

### CheckInput

```ts
type CheckInput = 
  | string
  | SkillDefinition
  | InlineCheckConfig;
```

Defined in: checks/roll.ts:52

What can be passed as a check identifier

## Variables

### DEFAULT\_ACCESSORS

```ts
const DEFAULT_ACCESSORS: CharacterAccessors;
```

Defined in: checks/accessors.ts:111

Default accessors for standard DCC Character structure.

These map check IDs to the standard character data paths:

| Check ID    | Character Path                          |
|-------------|----------------------------------------|
| 'str'       | state.abilities.str.current            |
| 'agl'       | state.abilities.agl.current            |
| 'sta'       | state.abilities.sta.current            |
| 'per'       | state.abilities.per.current            |
| 'int'       | state.abilities.int.current            |
| 'lck'       | state.abilities.lck.current            |
| 'reflex'    | state.saves.reflex (total: class+agl)  |
| 'fortitude' | state.saves.fortitude (total: class+sta)|
| 'will'      | state.saves.will (total: class+per)    |
| level       | classInfo?.level ?? 0                  |
| classId     | classInfo?.classId                     |

***

### CheckNamespace

```ts
const CheckNamespace: {
  ABILITY: "ability";
  SAVE: "save";
  SKILL: "skill";
};
```

Defined in: checks/constants.ts:25

Check type namespaces

#### Type Declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-ability"></a> `ABILITY` | `"ability"` | `"ability"` | checks/constants.ts:26 |
| <a id="property-save"></a> `SAVE` | `"save"` | `"save"` | checks/constants.ts:27 |
| <a id="property-skill"></a> `SKILL` | `"skill"` | `"skill"` | checks/constants.ts:28 |

***

### Ability

```ts
const Ability: {
  STR: "ability:str";
  AGL: "ability:agl";
  STA: "ability:sta";
  PER: "ability:per";
  INT: "ability:int";
  LCK: "ability:lck";
};
```

Defined in: checks/constants.ts:43

Standard DCC ability check identifiers (namespaced)

#### Type Declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-str"></a> `STR` | `"ability:str"` | `"ability:str"` | checks/constants.ts:44 |
| <a id="property-agl"></a> `AGL` | `"ability:agl"` | `"ability:agl"` | checks/constants.ts:45 |
| <a id="property-sta"></a> `STA` | `"ability:sta"` | `"ability:sta"` | checks/constants.ts:46 |
| <a id="property-per"></a> `PER` | `"ability:per"` | `"ability:per"` | checks/constants.ts:47 |
| <a id="property-int"></a> `INT` | `"ability:int"` | `"ability:int"` | checks/constants.ts:48 |
| <a id="property-lck"></a> `LCK` | `"ability:lck"` | `"ability:lck"` | checks/constants.ts:49 |

#### Example

```ts
rollCheck(Ability.STR, character);  // rolls "ability:str"
```

***

### Save

```ts
const Save: {
  REF: "save:reflex";
  FORT: "save:fortitude";
  WIL: "save:will";
};
```

Defined in: checks/constants.ts:72

Standard DCC saving throw identifiers (namespaced)

#### Type Declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-ref"></a> `REF` | `"save:reflex"` | `"save:reflex"` | checks/constants.ts:73 |
| <a id="property-fort"></a> `FORT` | `"save:fortitude"` | `"save:fortitude"` | checks/constants.ts:74 |
| <a id="property-wil"></a> `WIL` | `"save:will"` | `"save:will"` | checks/constants.ts:75 |

#### Example

```ts
rollCheck(Save.REF, character);  // rolls "save:reflex"
```

***

### SAVE\_ABILITY\_MAP

```ts
const SAVE_ABILITY_MAP: Record<SaveId, AbilityId>;
```

Defined in: checks/constants.ts:91

Map from save ID to the ability that modifies it

***

### ABILITY\_CHECK\_DEFINITIONS

```ts
const ABILITY_CHECK_DEFINITIONS: Record<AbilityId, SkillDefinition>;
```

Defined in: checks/definitions.ts:47

Ability check skill definitions (keyed by raw ability ID)

***

### SAVE\_DEFINITIONS

```ts
const SAVE_DEFINITIONS: Record<SaveId, SkillDefinition>;
```

Defined in: checks/definitions.ts:87

Saving throw skill definitions (keyed by raw save ID)

## Functions

### extractAbilityScores()

```ts
function extractAbilityScores(
   character: Character, 
   accessors?: CharacterAccessors, 
   abilityIds?: string[]
): Record<string, number>;
```

Defined in: checks/accessors.ts:154

Extract all ability scores as a flat record.

This is used internally by resolveSkillCheck which expects
a Record<string, number> of ability scores.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | `undefined` | The character |
| `accessors?` | [`CharacterAccessors`](#characteraccessors) | `DEFAULT_ACCESSORS` | The accessors to use |
| `abilityIds?` | `string`[] | `...` | Which ability IDs to extract (defaults to standard DCC) |

#### Returns

`Record`\<`string`, `number`\>

***

### parseCheckId()

```ts
function parseCheckId(id: string): ParsedCheckId;
```

Defined in: checks/constants.ts:117

Parse a namespaced check ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

[`ParsedCheckId`](#parsedcheckid)

#### Example

```ts
parseCheckId("ability:str")  // { namespace: "ability", value: "str", raw: "ability:str" }
parseCheckId("str")          // { namespace: null, value: "str", raw: "str" }
```

***

### createCheckId()

```ts
function createCheckId(namespace: CheckNamespaceType, value: string): string;
```

Defined in: checks/constants.ts:143

Create a namespaced check ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | [`CheckNamespaceType`](#checknamespacetype) |
| `value` | `string` |

#### Returns

`string`

***

### isAbilityCheckId()

```ts
function isAbilityCheckId(id: string): id is AbilityCheckId;
```

Defined in: checks/constants.ts:150

Check if a string is a namespaced ability check ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`id is AbilityCheckId`

***

### isSaveCheckId()

```ts
function isSaveCheckId(id: string): id is SaveCheckId;
```

Defined in: checks/constants.ts:161

Check if a string is a namespaced save check ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`id is SaveCheckId`

***

### isAbilityId()

```ts
function isAbilityId(id: string): id is AbilityId;
```

Defined in: checks/constants.ts:172

Check if a raw string (no namespace) is a valid ability ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`id is AbilityId`

***

### isSaveId()

```ts
function isSaveId(id: string): id is SaveId;
```

Defined in: checks/constants.ts:180

Check if a raw string (no namespace) is a valid save ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`id is SaveId`

***

### getCheckDefinition()

```ts
function getCheckDefinition(id: string): SkillDefinition | undefined;
```

Defined in: checks/definitions.ts:128

Get a check definition by namespaced ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

[`SkillDefinition`](types.md#skilldefinition) \| `undefined`

#### Example

```ts
getCheckDefinition("ability:str")  // Returns Strength Check definition
getCheckDefinition("save:reflex")  // Returns Reflex Save definition
getCheckDefinition("str")          // Returns undefined (must be namespaced)
```

***

### getCheckDefinitionByParts()

```ts
function getCheckDefinitionByParts(namespace: CheckNamespaceType, value: string): SkillDefinition | undefined;
```

Defined in: checks/definitions.ts:138

Get a check definition by namespace and value

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | [`CheckNamespaceType`](#checknamespacetype) |
| `value` | `string` |

#### Returns

[`SkillDefinition`](types.md#skilldefinition) \| `undefined`

#### Example

```ts
getCheckDefinitionByParts("ability", "str")  // Returns Strength Check definition
```

***

### registerCheckDefinition()

```ts
function registerCheckDefinition(definition: SkillDefinition): void;
```

Defined in: checks/definitions.ts:150

Register a custom check definition

The definition's ID should be namespaced (e.g., "skill:backstab")

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `definition` | [`SkillDefinition`](types.md#skilldefinition) |

#### Returns

`void`

***

### hasCheckDefinition()

```ts
function hasCheckDefinition(id: string): boolean;
```

Defined in: checks/definitions.ts:157

Check if a check definition exists

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`boolean`

***

### getRegisteredCheckIds()

```ts
function getRegisteredCheckIds(): string[];
```

Defined in: checks/definitions.ts:164

Get all registered check IDs

#### Returns

`string`[]

***

### getCheckIdsByNamespace()

```ts
function getCheckIdsByNamespace(namespace: CheckNamespaceType): string[];
```

Defined in: checks/definitions.ts:171

Get all registered check IDs for a specific namespace

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | [`CheckNamespaceType`](#checknamespacetype) |

#### Returns

`string`[]

***

### rollLuckCheck()

```ts
function rollLuckCheck(character: Character, options?: RollLuckCheckOptions): LuckCheckResult;
```

Defined in: checks/luck-check.ts:89

Roll a luck check for a character

Luck checks use roll-under mechanics: roll 1d20 and succeed if the result
is equal to or less than the character's current Luck score.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character making the check |
| `options?` | [`RollLuckCheckOptions`](#rollluckcheckoptions) | Roll options |

#### Returns

[`LuckCheckResult`](#luckcheckresult)

The luck check result

#### Example

```ts
import { rollLuckCheck } from '@moonloch/dcc-core-lib';

const result = rollLuckCheck(character);
if (result.success) {
  console.log(`Success! Rolled ${result.roll} vs Luck ${result.target}`);
}
```

***

### rollLuckCheckSimple()

```ts
function rollLuckCheckSimple(
   luckScore: number, 
   roller?: DiceRoller, 
   label?: string
): LuckCheckResult;
```

Defined in: checks/luck-check.ts:133

Roll a luck check with a specific target score

Use this when you need to check against a specific luck value
rather than extracting it from a character.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `luckScore` | `number` | `undefined` | The luck score to check against |
| `roller?` | [`DiceRoller`](types.md#diceroller) | `undefined` | Custom dice roller (optional) |
| `label?` | `string` | `"Luck Check"` | Label for the check (optional) |

#### Returns

[`LuckCheckResult`](#luckcheckresult)

The luck check result

#### Example

```ts
import { rollLuckCheckSimple } from '@moonloch/dcc-core-lib';

const result = rollLuckCheckSimple(12);
if (result.success) {
  console.log(`Success! Rolled ${result.roll} vs ${result.target}`);
}
```

***

### rollCheck()

```ts
function rollCheck(
   check: CheckInput, 
   character: Character, 
   options?: RollCheckOptions
): SkillCheckResult;
```

Defined in: checks/roll.ts:254

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `check` | [`CheckInput`](#checkinput) |
| `character` | [`Character`](types.md#character) |
| `options?` | [`RollCheckOptions`](#rollcheckoptions) |

#### Returns

[`SkillCheckResult`](types.md#skillcheckresult)

***

### rollCheckAsync()

```ts
function rollCheckAsync(
   check: CheckInput, 
   character: Character, 
   options: RollCheckOptionsAsync
): Promise<SkillCheckResult>;
```

Defined in: checks/roll.ts:271

Roll a check for a character (async).

Same semantics as `rollCheck`, but the dice evaluation is performed
via an async custom roller (see `RollCheckOptionsAsync.roller`). Use
this when integrating with Promise-based roll machinery like
FoundryVTT's `Roll.evaluate()`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `check` | [`CheckInput`](#checkinput) |
| `character` | [`Character`](types.md#character) |
| `options` | [`RollCheckOptionsAsync`](#rollcheckoptionsasync) |

#### Returns

`Promise`\<[`SkillCheckResult`](types.md#skillcheckresult)\>

***

### rollAbilityCheck()

```ts
function rollAbilityCheck(
   abilityId: string, 
   character: Character, 
   options?: RollCheckOptions
): SkillCheckResult;
```

Defined in: checks/roll.ts:289

Roll an ability check for a character

Convenience function that's more explicit than rollCheck.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `abilityId` | `string` | The ability to check (namespaced like "ability:str" or raw like "str") |
| `character` | [`Character`](types.md#character) | The character making the check |
| `options?` | [`RollCheckOptions`](#rollcheckoptions) | Roll options |

#### Returns

[`SkillCheckResult`](types.md#skillcheckresult)

***

### rollSavingThrow()

```ts
function rollSavingThrow(
   saveId: string, 
   character: Character, 
   options?: RollCheckOptions
): SkillCheckResult;
```

Defined in: checks/roll.ts:314

Roll a saving throw for a character

Convenience function that's more explicit than rollCheck.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `saveId` | `string` | The save type (namespaced like "save:reflex" or raw like "reflex") |
| `character` | [`Character`](types.md#character) | The character making the save |
| `options?` | [`RollCheckOptions`](#rollcheckoptions) | Roll options |

#### Returns

[`SkillCheckResult`](types.md#skillcheckresult)

***

### rollAbilityCheckAsync()

```ts
function rollAbilityCheckAsync(
   abilityId: string, 
   character: Character, 
   options: RollCheckOptionsAsync
): Promise<SkillCheckResult>;
```

Defined in: checks/roll.ts:333

Roll an ability check for a character (async).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `abilityId` | `string` |
| `character` | [`Character`](types.md#character) |
| `options` | [`RollCheckOptionsAsync`](#rollcheckoptionsasync) |

#### Returns

`Promise`\<[`SkillCheckResult`](types.md#skillcheckresult)\>

***

### rollSavingThrowAsync()

```ts
function rollSavingThrowAsync(
   saveId: string, 
   character: Character, 
   options: RollCheckOptionsAsync
): Promise<SkillCheckResult>;
```

Defined in: checks/roll.ts:348

Roll a saving throw for a character (async).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `saveId` | `string` |
| `character` | [`Character`](types.md#character) |
| `options` | [`RollCheckOptionsAsync`](#rollcheckoptionsasync) |

#### Returns

`Promise`\<[`SkillCheckResult`](types.md#skillcheckresult)\>
