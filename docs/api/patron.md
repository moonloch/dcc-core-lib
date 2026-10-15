# patron

## Interfaces

### BondBreakConsequences

Defined in: [patron/bond.ts:305](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L305)

Information about the consequences of breaking a patron bond.
In DCC, this is extremely dangerous and often results in death or worse.

#### Properties

##### description

```ts
description: string;
```

Defined in: [patron/bond.ts:307](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L307)

Description of the consequences

##### suggestedEffects

```ts
suggestedEffects: string[];
```

Defined in: [patron/bond.ts:310](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L310)

Suggested mechanical effects

##### potentiallyFatal

```ts
potentiallyFatal: boolean;
```

Defined in: [patron/bond.ts:313](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L313)

Is this potentially fatal?

***

### PatronSpellGrant

Defined in: [types/patron.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L21)

A patron spell granted to bound wizards/elves.
These are spells unique to a patron that aren't in the standard spell list.

#### Properties

##### spellId

```ts
spellId: string;
```

Defined in: [types/patron.ts:23](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L23)

Spell ID reference

##### minLevel

```ts
minLevel: number;
```

Defined in: [types/patron.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L26)

Minimum level to learn this patron spell

##### description?

```ts
optional description?: string;
```

Defined in: [types/patron.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L29)

Description of how/when this spell is granted

***

### PatronDefinition

Defined in: [types/patron.ts:36](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L36)

Patron definition loaded from external JSON.
Each patron has unique invoke results, taint, and granted spells.

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/patron.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L38)

Unique identifier (e.g., "bobugbubilz", "the-king-of-elfland")

##### name

```ts
name: string;
```

Defined in: [types/patron.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L41)

Display name

##### description?

```ts
optional description?: string;
```

Defined in: [types/patron.ts:44](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L44)

Full description of the patron

##### domain?

```ts
optional domain?: string;
```

Defined in: [types/patron.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L47)

Domain or sphere of influence (e.g., "demons", "nature", "chaos")

##### alignment?

```ts
optional alignment?: "lawful" | "neutral" | "chaotic";
```

Defined in: [types/patron.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L50)

Typical alignment of patron (informational)

##### source?

```ts
optional source?: string;
```

Defined in: [types/patron.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L53)

Source reference (e.g., "DCC Core Rules p.321")

##### invokeTableId

```ts
invokeTableId: string;
```

Defined in: [types/patron.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L59)

Invoke Patron result table ID.
References a TieredTable with results for different check totals.

##### taintTableId

```ts
taintTableId: string;
```

Defined in: [types/patron.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L65)

Patron taint table ID.
References a SimpleTable rolled on fumbles or certain spell results.

##### grantedSpells

```ts
grantedSpells: PatronSpellGrant[];
```

Defined in: [types/patron.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L71)

Spells granted by this patron.
These become available when the bond is formed.

##### bondRequirements?

```ts
optional bondRequirements?: string;
```

Defined in: [types/patron.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L76)

Special requirements for bonding with this patron.

***

### PatronBond

Defined in: [types/patron.ts:87](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L87)

Record of the bond between character and patron.
Stored in character's class state.

#### Properties

##### patronId

```ts
patronId: string;
```

Defined in: [types/patron.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L89)

Patron ID

##### bondedAt

```ts
bondedAt: string;
```

Defined in: [types/patron.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L92)

When the bond was formed (ISO date string)

##### bondStrength?

```ts
optional bondStrength?: "normal" | "weak" | "strong";
```

Defined in: [types/patron.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L95)

Current bond strength (optional, for systems that track this)

##### taintCount

```ts
taintCount: number;
```

Defined in: [types/patron.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L98)

Accumulated taint count (for tracking how much taint received)

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/patron.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L101)

Notes about the bond relationship

***

### InvokePatronInput

Defined in: [types/patron.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L112)

Input for invoking a patron.
This is used when a wizard/elf casts Invoke Patron spell.

#### Properties

##### patronId

```ts
patronId: string;
```

Defined in: [types/patron.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L114)

The patron being invoked

##### casterLevel

```ts
casterLevel: number;
```

Defined in: [types/patron.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L117)

Caster level

##### abilityModifier

```ts
abilityModifier: number;
```

Defined in: [types/patron.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L120)

Spell check ability modifier (Intelligence for wizard/elf)

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [types/patron.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L123)

Luck to burn on this check

##### luckModifier?

```ts
optional luckModifier?: number;
```

Defined in: [types/patron.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L126)

Luck modifier (from current luck score)

##### spellburn?

```ts
optional spellburn?: {
  str: number;
  agl: number;
  sta: number;
};
```

Defined in: [types/patron.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L129)

Spellburn commitment

###### str

```ts
str: number;
```

###### agl

```ts
agl: number;
```

###### sta

```ts
sta: number;
```

##### situationalModifiers?

```ts
optional situationalModifiers?: {
  source: string;
  value: number;
}[];
```

Defined in: [types/patron.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L136)

Additional situational modifiers

###### source

```ts
source: string;
```

###### value

```ts
value: number;
```

##### invokeTable?

```ts
optional invokeTable?: TieredTable;
```

Defined in: [types/patron.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L142)

Pre-loaded invoke patron table

##### taintTable?

```ts
optional taintTable?: SimpleTable;
```

Defined in: [types/patron.ts:145](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L145)

Pre-loaded taint table (for fumbles)

***

### InvokePatronResult

Defined in: [types/patron.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L151)

Result of invoking a patron.

#### Properties

##### patronId

```ts
patronId: string;
```

Defined in: [types/patron.ts:153](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L153)

The patron that was invoked

##### natural

```ts
natural: number;
```

Defined in: [types/patron.ts:156](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L156)

Natural die result (d20)

##### total

```ts
total: number;
```

Defined in: [types/patron.ts:159](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L159)

Total check result (after all modifiers)

##### formula

```ts
formula: string;
```

Defined in: [types/patron.ts:162](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L162)

Formula used for display

##### critical

```ts
critical: boolean;
```

Defined in: [types/patron.ts:165](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L165)

Was this a critical (natural 20)?

##### fumble

```ts
fumble: boolean;
```

Defined in: [types/patron.ts:168](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L168)

Was this a fumble (natural 1)?

##### tier?

```ts
optional tier?: string;
```

Defined in: [types/patron.ts:171](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L171)

Result tier from the invoke table

##### resultText?

```ts
optional resultText?: string;
```

Defined in: [types/patron.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L174)

Result text describing the patron's aid

##### success

```ts
success: boolean;
```

Defined in: [types/patron.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L177)

Did the invocation succeed (patron answered)?

##### taintIncurred

```ts
taintIncurred: boolean;
```

Defined in: [types/patron.ts:180](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L180)

Was patron taint incurred?

##### taintDescription?

```ts
optional taintDescription?: string;
```

Defined in: [types/patron.ts:183](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L183)

Taint description if incurred

##### spellLost

```ts
spellLost: boolean;
```

Defined in: [types/patron.ts:186](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L186)

Is the spell lost for the day?

##### modifiers

```ts
modifiers: {
  source: string;
  value: number;
}[];
```

Defined in: [types/patron.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L189)

All modifiers that were applied

###### source

```ts
source: string;
```

###### value

```ts
value: number;
```

***

### PatronEvents

Defined in: [types/patron.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L202)

Event callbacks for patron system.

#### Properties

##### onInvokeStart?

```ts
optional onInvokeStart?: (input: InvokePatronInput) => void;
```

Defined in: [types/patron.ts:204](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L204)

Called when Invoke Patron starts

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`InvokePatronInput`](#invokepatroninput) |

###### Returns

`void`

##### onInvokeComplete?

```ts
optional onInvokeComplete?: (result: InvokePatronResult) => void;
```

Defined in: [types/patron.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L207)

Called when Invoke Patron completes

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`InvokePatronResult`](#invokepatronresult) |

###### Returns

`void`

##### onPatronAnswers?

```ts
optional onPatronAnswers?: (result: InvokePatronResult) => void;
```

Defined in: [types/patron.ts:210](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L210)

Called when patron answers (success)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`InvokePatronResult`](#invokepatronresult) |

###### Returns

`void`

##### onPatronIgnores?

```ts
optional onPatronIgnores?: (result: InvokePatronResult) => void;
```

Defined in: [types/patron.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L213)

Called when patron ignores (failure)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`InvokePatronResult`](#invokepatronresult) |

###### Returns

`void`

##### onTaintIncurred?

```ts
optional onTaintIncurred?: (patronId: string, description: string) => void;
```

Defined in: [types/patron.ts:216](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L216)

Called when patron taint is incurred

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `patronId` | `string` |
| `description` | `string` |

###### Returns

`void`

##### onBondFormed?

```ts
optional onBondFormed?: (bond: PatronBond) => void;
```

Defined in: [types/patron.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L219)

Called when bond is formed

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `bond` | [`PatronBond`](#patronbond) |

###### Returns

`void`

***

### PatronLookupOptions

Defined in: [types/patron.ts:229](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L229)

Options for filtering/searching patrons

#### Properties

##### alignment?

```ts
optional alignment?: "lawful" | "neutral" | "chaotic";
```

Defined in: [types/patron.ts:231](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L231)

Filter by alignment

##### domain?

```ts
optional domain?: string;
```

Defined in: [types/patron.ts:234](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L234)

Filter by domain

##### nameSearch?

```ts
optional nameSearch?: string;
```

Defined in: [types/patron.ts:237](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/patron.ts#L237)

Search by name (partial match)

## Variables

### INVOKE\_PATRON\_MIN\_SUCCESS

```ts
const INVOKE_PATRON_MIN_SUCCESS: 12 = 12;
```

Defined in: [patron/invoke.ts:28](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L28)

Minimum check result for patron to answer.
Below this threshold, the invocation fails.

***

### INVOKE\_PATRON\_FUMBLE\_TRIGGERS\_TAINT

```ts
const INVOKE_PATRON_FUMBLE_TRIGGERS_TAINT: true = true;
```

Defined in: [patron/invoke.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L33)

Natural 1 always triggers patron taint on invoke.

## Functions

### createPatronBond()

```ts
function createPatronBond(patronId: string, options?: {
  bondStrength?: "normal" | "weak" | "strong";
  notes?: string;
}): PatronBond;
```

Defined in: [patron/bond.ts:25](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L25)

Create a new patron bond.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's ID |
| `options?` | \{ `bondStrength?`: `"normal"` \| `"weak"` \| `"strong"`; `notes?`: `string`; \} | Optional bond configuration |
| `options.bondStrength?` | `"normal"` \| `"weak"` \| `"strong"` | - |
| `options.notes?` | `string` | - |

#### Returns

[`PatronBond`](#patronbond)

A new patron bond record

***

### canFormPatronBond()

```ts
function canFormPatronBond(character: Character, patronId: string): {
  canBond: boolean;
  reason?: string;
};
```

Defined in: [patron/bond.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L60)

Check if a character can form a bond with a patron.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character attempting to bond |
| `patronId` | `string` | The patron to bond with |

#### Returns

```ts
{
  canBond: boolean;
  reason?: string;
}
```

Object with canBond flag and reason if false

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `canBond` | `boolean` | [patron/bond.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L63) |
| `reason?` | `string` | [patron/bond.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L63) |

***

### getCharacterPatronId()

```ts
function getCharacterPatronId(character: Character): string | undefined;
```

Defined in: [patron/bond.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L94)

Get the patron ID from a character's state.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |

#### Returns

`string` \| `undefined`

Patron ID or undefined if not bonded

***

### hasPatronBond()

```ts
function hasPatronBond(character: Character): boolean;
```

Defined in: [patron/bond.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L107)

Check if a character has a patron bond.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |

#### Returns

`boolean`

True if character has a patron

***

### formWizardPatronBond()

```ts
function formWizardPatronBond(
   currentState: 
  | {
  corruption: string[];
  patron?: string;
  familiar?: string;
  spellburnDamage?: Partial<Record<string, number>>;
  spellbook?: Spellbook;
}
  | undefined, 
   patronId: string, 
   _patronDef?: PatronDefinition
): {
  corruption: string[];
  patron: string;
  familiar?: string;
  spellburnDamage?: Partial<Record<string, number>>;
  spellbook?: Spellbook;
};
```

Defined in: [patron/bond.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L124)

Form a patron bond for a wizard.
Returns the updated wizard state.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currentState` | \| \{ `corruption`: `string`[]; `patron?`: `string`; `familiar?`: `string`; `spellburnDamage?`: `Partial`\<`Record`\<`string`, `number`\>\>; `spellbook?`: [`Spellbook`](types.md#spellbook-3); \} \| `undefined` | Current wizard state (or undefined for new) |
| `patronId` | `string` | The patron to bond with |
| `_patronDef?` | [`PatronDefinition`](#patrondefinition) | The patron definition (reserved for validation; currently unused) |

#### Returns

```ts
{
  corruption: string[];
  patron: string;
  familiar?: string;
  spellburnDamage?: Partial<Record<string, number>>;
  spellbook?: Spellbook;
}
```

Updated wizard state

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `corruption` | `string`[] | [patron/bond.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L135) |
| `patron` | `string` | [patron/bond.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L136) |
| `familiar?` | `string` | [patron/bond.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L137) |
| `spellburnDamage?` | `Partial`\<`Record`\<`string`, `number`\>\> | [patron/bond.ts:138](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L138) |
| `spellbook?` | [`Spellbook`](types.md#spellbook-3) | [patron/bond.ts:139](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L139) |

***

### formElfPatronBond()

```ts
function formElfPatronBond(
   currentState: 
  | {
  patron?: string;
  corruption: string[];
  spellbook?: Spellbook;
}
  | undefined, 
   patronId: string, 
   _patronDef?: PatronDefinition
): {
  patron: string;
  corruption: string[];
  spellbook?: Spellbook;
};
```

Defined in: [patron/bond.ts:175](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L175)

Form a patron bond for an elf.
Returns the updated elf state.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currentState` | \| \{ `patron?`: `string`; `corruption`: `string`[]; `spellbook?`: [`Spellbook`](types.md#spellbook-3); \} \| `undefined` | Current elf state (or undefined for new) |
| `patronId` | `string` | The patron to bond with |
| `_patronDef?` | [`PatronDefinition`](#patrondefinition) | The patron definition (reserved for validation; currently unused) |

#### Returns

```ts
{
  patron: string;
  corruption: string[];
  spellbook?: Spellbook;
}
```

Updated elf state

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `patron` | `string` | [patron/bond.ts:184](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L184) |
| `corruption` | `string`[] | [patron/bond.ts:185](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L185) |
| `spellbook?` | [`Spellbook`](types.md#spellbook-3) | [patron/bond.ts:186](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L186) |

***

### getAvailablePatronSpells()

```ts
function getAvailablePatronSpells(character: Character): string[];
```

Defined in: [patron/bond.ts:215](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L215)

Get the patron spells available to a character.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |

#### Returns

`string`[]

Array of available patron spell IDs

***

### canLearnPatronSpell()

```ts
function canLearnPatronSpell(character: Character, spellId: string): boolean;
```

Defined in: [patron/bond.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L232)

Check if a character can learn a specific patron spell.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |
| `spellId` | `string` | The spell to check |

#### Returns

`boolean`

True if the spell is available from their patron at their level

***

### createPatronSpellEntry()

```ts
function createPatronSpellEntry(spellId: string): SpellbookEntry;
```

Defined in: [patron/bond.ts:245](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L245)

Create a spellbook entry for a patron spell.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `spellId` | `string` | The patron spell ID |

#### Returns

[`SpellbookEntry`](types.md#spellbookentry)

A new spellbook entry

***

### incrementTaintCount()

```ts
function incrementTaintCount(bond: PatronBond): PatronBond;
```

Defined in: [patron/bond.ts:264](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L264)

Increment the taint count on a patron bond.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bond` | [`PatronBond`](#patronbond) | The current patron bond |

#### Returns

[`PatronBond`](#patronbond)

Updated patron bond with incremented taint count

***

### addTaintToNotes()

```ts
function addTaintToNotes(bond: PatronBond, taintDescription: string): PatronBond;
```

Defined in: [patron/bond.ts:278](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L278)

Add a taint description to the bond notes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bond` | [`PatronBond`](#patronbond) | The current patron bond |
| `taintDescription` | `string` | Description of the taint received |

#### Returns

[`PatronBond`](#patronbond)

Updated patron bond

***

### getPatronBondBreakConsequences()

```ts
function getPatronBondBreakConsequences(patronId: string): BondBreakConsequences;
```

Defined in: [patron/bond.ts:323](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L323)

Get information about breaking a patron bond.
This doesn't actually break the bond - just informs about consequences.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron whose bond would be broken |

#### Returns

[`BondBreakConsequences`](#bondbreakconsequences)

Information about consequences

***

### canBreakPatronBond()

```ts
function canBreakPatronBond(character: Character): {
  canBreak: boolean;
  warning: string;
};
```

Defined in: [patron/bond.ts:351](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L351)

Check if a character is eligible to break their patron bond.
This is always possible but always dangerous.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character |

#### Returns

```ts
{
  canBreak: boolean;
  warning: string;
}
```

Object with canBreak flag and warning

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `canBreak` | `boolean` | [patron/bond.ts:352](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L352) |
| `warning` | `string` | [patron/bond.ts:353](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/bond.ts#L353) |

***

### buildInvokeModifiers()

```ts
function buildInvokeModifiers(input: InvokePatronInput): LegacyRollModifier[];
```

Defined in: [patron/invoke.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L45)

Calculate all modifiers for an Invoke Patron check.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`InvokePatronInput`](#invokepatroninput) | Invoke patron input |

#### Returns

[`LegacyRollModifier`](types.md#legacyrollmodifier)[]

Array of roll modifiers

***

### sumModifiers()

```ts
function sumModifiers(modifiers: readonly LegacyRollModifier[]): number;
```

Defined in: [patron/invoke.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L112)

Sum all modifiers to get total modifier value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `modifiers` | readonly [`LegacyRollModifier`](types.md#legacyrollmodifier)[] | Array of roll modifiers |

#### Returns

`number`

Total modifier value

***

### buildInvokeFormula()

```ts
function buildInvokeFormula(natural: number, modifiers: readonly LegacyRollModifier[]): string;
```

Defined in: [patron/invoke.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L123)

Build the formula string for display.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `natural` | `number` | The natural die roll |
| `modifiers` | readonly [`LegacyRollModifier`](types.md#legacyrollmodifier)[] | Array of roll modifiers |

#### Returns

`string`

Formula string (e.g., "15 + 3 + 2 = 20")

***

### invokePatron()

```ts
function invokePatron(
   input: InvokePatronInput, 
   options?: RollOptions, 
   events?: PatronEvents
): InvokePatronResult;
```

Defined in: [patron/invoke.ts:167](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L167)

Invoke a patron.

This performs the Invoke Patron spell check:
1. Roll d20 + modifiers
2. Check for fumble (natural 1) - triggers patron taint
3. Check for critical (natural 20) - enhanced result
4. Look up result in patron's invoke table
5. Determine if patron answers based on total

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`InvokePatronInput`](#invokepatroninput) | Invoke patron input |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options (including custom roller) |
| `events?` | [`PatronEvents`](#patronevents) | Event callbacks |

#### Returns

[`InvokePatronResult`](#invokepatronresult)

Invoke patron result

***

### isInvokeSuccess()

```ts
function isInvokeSuccess(result: InvokePatronResult): boolean;
```

Defined in: [patron/invoke.ts:299](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L299)

Check if an invoke result was successful.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`InvokePatronResult`](#invokepatronresult) | The invoke patron result |

#### Returns

`boolean`

True if patron answered

***

### isInvokeFumble()

```ts
function isInvokeFumble(result: InvokePatronResult): boolean;
```

Defined in: [patron/invoke.ts:309](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L309)

Check if an invoke result was a fumble.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`InvokePatronResult`](#invokepatronresult) | The invoke patron result |

#### Returns

`boolean`

True if natural 1 was rolled

***

### getInvokeSummary()

```ts
function getInvokeSummary(result: InvokePatronResult): string;
```

Defined in: [patron/invoke.ts:319](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L319)

Get a summary of the invoke result for display.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`InvokePatronResult`](#invokepatronresult) | The invoke patron result |

#### Returns

`string`

Summary string

***

### getMinimumForInvokeTier()

```ts
function getMinimumForInvokeTier(invokeTable: TieredTable, desiredTier: string): number | undefined;
```

Defined in: [patron/invoke.ts:366](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L366)

Calculate the minimum check needed for a specific invoke result tier.
This helps players understand what they need to roll for desired effects.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `invokeTable` | [`TieredTable`](tables.md#tieredtable) | The patron's invoke table |
| `desiredTier` | `string` | The tier to achieve |

#### Returns

`number` \| `undefined`

Minimum check total needed, or undefined if tier not in table

***

### estimateInvokeSuccessChance()

```ts
function estimateInvokeSuccessChance(totalModifier: number, targetDC?: number): number;
```

Defined in: [patron/invoke.ts:386](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/invoke.ts#L386)

Estimate the chance of success given modifiers.
Assumes a d20 roll.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `totalModifier` | `number` | `undefined` | Total modifier to the roll |
| `targetDC?` | `number` | `INVOKE_PATRON_MIN_SUCCESS` | Target DC (default INVOKE_PATRON_MIN_SUCCESS) |

#### Returns

`number`

Probability of success (0-1)

***

### registerPatron()

```ts
function registerPatron(patron: PatronDefinition): void;
```

Defined in: [patron/registry.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L30)

Register a patron definition.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patron` | [`PatronDefinition`](#patrondefinition) | The patron definition to register |

#### Returns

`void`

#### Throws

Error if patron with same ID already exists

***

### registerPatrons()

```ts
function registerPatrons(patrons: readonly PatronDefinition[]): void;
```

Defined in: [patron/registry.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L42)

Register multiple patron definitions.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patrons` | readonly [`PatronDefinition`](#patrondefinition)[] | Array of patron definitions to register |

#### Returns

`void`

***

### clearPatronRegistry()

```ts
function clearPatronRegistry(): void;
```

Defined in: [patron/registry.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L52)

Clear all registered patrons.
Primarily for testing purposes.

#### Returns

`void`

***

### getPatron()

```ts
function getPatron(patronId: string): PatronDefinition | undefined;
```

Defined in: [patron/registry.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L66)

Get a patron by ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's unique identifier |

#### Returns

[`PatronDefinition`](#patrondefinition) \| `undefined`

The patron definition, or undefined if not found

***

### requirePatron()

```ts
function requirePatron(patronId: string): PatronDefinition;
```

Defined in: [patron/registry.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L77)

Get a patron by ID, throwing if not found.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's unique identifier |

#### Returns

[`PatronDefinition`](#patrondefinition)

The patron definition

#### Throws

Error if patron is not registered

***

### hasPatron()

```ts
function hasPatron(patronId: string): boolean;
```

Defined in: [patron/registry.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L91)

Check if a patron is registered.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's unique identifier |

#### Returns

`boolean`

True if patron is registered

***

### getRegisteredPatronIds()

```ts
function getRegisteredPatronIds(): string[];
```

Defined in: [patron/registry.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L100)

Get all registered patron IDs.

#### Returns

`string`[]

Array of registered patron IDs

***

### getAllPatrons()

```ts
function getAllPatrons(): PatronDefinition[];
```

Defined in: [patron/registry.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L109)

Get all registered patrons.

#### Returns

[`PatronDefinition`](#patrondefinition)[]

Array of all patron definitions

***

### findPatrons()

```ts
function findPatrons(options: PatronLookupOptions): PatronDefinition[];
```

Defined in: [patron/registry.ts:119](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L119)

Find patrons matching the given criteria.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`PatronLookupOptions`](#patronlookupoptions) | Lookup/filter options |

#### Returns

[`PatronDefinition`](#patrondefinition)[]

Array of matching patron definitions

***

### getPatronInvokeTableId()

```ts
function getPatronInvokeTableId(patronId: string): string | undefined;
```

Defined in: [patron/registry.ts:148](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L148)

Get the invoke table ID for a patron.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's unique identifier |

#### Returns

`string` \| `undefined`

The invoke table ID, or undefined if patron not found

***

### getPatronTaintTableId()

```ts
function getPatronTaintTableId(patronId: string): string | undefined;
```

Defined in: [patron/registry.ts:159](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L159)

Get the taint table ID for a patron.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's unique identifier |

#### Returns

`string` \| `undefined`

The taint table ID, or undefined if patron not found

***

### getPatronSpells()

```ts
function getPatronSpells(patronId: string, casterLevel?: number): PatronSpellGrant[];
```

Defined in: [patron/registry.ts:171](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L171)

Get spells granted by a patron.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `patronId` | `string` | The patron's unique identifier |
| `casterLevel?` | `number` | Optional level filter (only return spells available at this level) |

#### Returns

[`PatronSpellGrant`](#patronspellgrant)[]

Array of spell grant info

***

### getPatronCount()

```ts
function getPatronCount(): number;
```

Defined in: [patron/registry.ts:190](https://github.com/moonloch/dcc-core-lib/blob/main/src/patron/registry.ts#L190)

Get the number of registered patrons.

#### Returns

`number`

Number of registered patrons
