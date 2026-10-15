# tables

## Interfaces

### TableMetadata

Defined in: tables/types.ts:19

Common metadata for all table types

#### Extended by

- [`LayOnHandsTable`](#layonhandstable)
- [`SimpleTable`](#simpletable)
- [`MultiColumnTable`](#multicolumntable)
- [`TieredTable`](#tieredtable)

#### Properties

##### id

```ts
id: string;
```

Defined in: tables/types.ts:21

Unique identifier for this table

##### name

```ts
name: string;
```

Defined in: tables/types.ts:24

Display name

##### description?

```ts
optional description?: string;
```

Defined in: tables/types.ts:27

Description of what this table is for

##### source?

```ts
optional source?: string;
```

Defined in: tables/types.ts:30

Source/reference (e.g., "DCC Core Rules p.82")

##### tags?

```ts
optional tags?: string[];
```

Defined in: tables/types.ts:33

Tags for categorization

***

### LayOnHandsExtraEffects

Defined in: tables/types.ts:60

Extra, non-healing effects that some RAW rows grant (e.g., cure disease,
neutralise poison, restore limb). Rulebook specifies these are discretionary
judge effects at high check totals; the table row carries the flags.

#### Properties

##### curesDisease?

```ts
optional curesDisease?: boolean;
```

Defined in: tables/types.ts:61

##### curesAllDiseases?

```ts
optional curesAllDiseases?: boolean;
```

Defined in: tables/types.ts:62

##### neutralizesPoison?

```ts
optional neutralizesPoison?: boolean;
```

Defined in: tables/types.ts:63

##### neutralizesAllPoisons?

```ts
optional neutralizesAllPoisons?: boolean;
```

Defined in: tables/types.ts:64

##### restoresLimb?

```ts
optional restoresLimb?: boolean;
```

Defined in: tables/types.ts:65

***

### LayOnHandsRow

Defined in: tables/types.ts:73

One row of the Lay on Hands table. The check total (roll + Per mod + level)
picks the row; the cleric-subject alignment picks the dice count column.
A dice count of 0 means the check fails (below the healing threshold).

#### Properties

##### min

```ts
min: number;
```

Defined in: tables/types.ts:75

Minimum check total (inclusive)

##### max

```ts
max: number;
```

Defined in: tables/types.ts:77

Maximum check total (inclusive)

##### dice

```ts
dice: Record<LayOnHandsAlignment, number>;
```

Defined in: tables/types.ts:79

Dice count by alignment; 0 = failure on that column

##### extra?

```ts
optional extra?: LayOnHandsExtraEffects;
```

Defined in: tables/types.ts:81

Optional extra discretionary effects granted at this row

##### text?

```ts
optional text?: string;
```

Defined in: tables/types.ts:83

Optional display text for this row

***

### LayOnHandsTable

Defined in: tables/types.ts:100

RAW Lay on Hands table (Table 4-2, DCC core p.31). Rulebook data values
are supplied by the consuming application; this type is the shape
core-lib expects.

#### Extends

- [`TableMetadata`](#tablemetadata)

#### Properties

##### id

```ts
id: string;
```

Defined in: tables/types.ts:21

Unique identifier for this table

###### Inherited from

[`TableMetadata`](#tablemetadata).[`id`](#id)

##### name

```ts
name: string;
```

Defined in: tables/types.ts:24

Display name

###### Inherited from

[`TableMetadata`](#tablemetadata).[`name`](#name)

##### description?

```ts
optional description?: string;
```

Defined in: tables/types.ts:27

Description of what this table is for

###### Inherited from

[`TableMetadata`](#tablemetadata).[`description`](#description)

##### source?

```ts
optional source?: string;
```

Defined in: tables/types.ts:30

Source/reference (e.g., "DCC Core Rules p.82")

###### Inherited from

[`TableMetadata`](#tablemetadata).[`source`](#source)

##### tags?

```ts
optional tags?: string[];
```

Defined in: tables/types.ts:33

Tags for categorization

###### Inherited from

[`TableMetadata`](#tablemetadata).[`tags`](#tags)

##### type

```ts
type: "lay-on-hands";
```

Defined in: tables/types.ts:101

##### rows

```ts
rows: LayOnHandsRow[];
```

Defined in: tables/types.ts:104

Rows ordered by min check total

##### conditions?

```ts
optional conditions?: LayOnHandsConditionThresholds;
```

Defined in: tables/types.ts:107

Optional per-condition dice thresholds (for condition healing)

***

### SimpleTableEntry

Defined in: tables/types.ts:118

A single entry in a simple range table.
Matched when roll >= min AND roll <= max.

#### Properties

##### min

```ts
min: number;
```

Defined in: tables/types.ts:120

Minimum roll value (inclusive)

##### max

```ts
max: number;
```

Defined in: tables/types.ts:123

Maximum roll value (inclusive)

##### text

```ts
text: string;
```

Defined in: tables/types.ts:126

The result text/description

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: tables/types.ts:129

Optional structured effect data

***

### SimpleTable

Defined in: tables/types.ts:149

A simple range-based lookup table.
Used for: fumbles, turn unholy, lay on hands, etc.

#### Example

```ts
// Turn Unholy table
{
  id: "turn-unholy",
  type: "simple",
  name: "Turn Unholy",
  entries: [
    { min: 1, max: 11, text: "Failure", effect: { type: "none" } },
    { min: 12, max: 13, text: "Turn 1d4 HD", effect: { type: "turn", dice: "1d4" } },
    ...
  ]
}
```

#### Extends

- [`TableMetadata`](#tablemetadata)

#### Properties

##### id

```ts
id: string;
```

Defined in: tables/types.ts:21

Unique identifier for this table

###### Inherited from

[`TableMetadata`](#tablemetadata).[`id`](#id)

##### name

```ts
name: string;
```

Defined in: tables/types.ts:24

Display name

###### Inherited from

[`TableMetadata`](#tablemetadata).[`name`](#name)

##### description?

```ts
optional description?: string;
```

Defined in: tables/types.ts:27

Description of what this table is for

###### Inherited from

[`TableMetadata`](#tablemetadata).[`description`](#description)

##### source?

```ts
optional source?: string;
```

Defined in: tables/types.ts:30

Source/reference (e.g., "DCC Core Rules p.82")

###### Inherited from

[`TableMetadata`](#tablemetadata).[`source`](#source)

##### tags?

```ts
optional tags?: string[];
```

Defined in: tables/types.ts:33

Tags for categorization

###### Inherited from

[`TableMetadata`](#tablemetadata).[`tags`](#tags)

##### type

```ts
type: "simple";
```

Defined in: tables/types.ts:150

##### die?

```ts
optional die?: `d${number}`;
```

Defined in: tables/types.ts:153

The die to roll for this table (informational)

##### entries

```ts
entries: SimpleTableEntry[];
```

Defined in: tables/types.ts:156

Table entries sorted by min value

***

### MultiColumnRow

Defined in: tables/types.ts:167

A single row in a multi-column table.
The row is selected by roll value, then a specific column is read.

#### Properties

##### min

```ts
min: number;
```

Defined in: tables/types.ts:169

Minimum roll value (inclusive)

##### max

```ts
max: number;
```

Defined in: tables/types.ts:172

Maximum roll value (inclusive)

##### columns

```ts
columns: Record<string, {
  text: string;
  effect?: TableEffect;
}>;
```

Defined in: tables/types.ts:175

Results keyed by column ID

***

### ColumnDefinition

Defined in: tables/types.ts:184

Definition of a column in a multi-column table

#### Properties

##### id

```ts
id: string;
```

Defined in: tables/types.ts:186

Column identifier (e.g., "d4", "d6", "d8")

##### label

```ts
label: string;
```

Defined in: tables/types.ts:189

Display label

##### description?

```ts
optional description?: string;
```

Defined in: tables/types.ts:192

Optional description

***

### MultiColumnTable

Defined in: tables/types.ts:223

A multi-column lookup table.
Used for: crit tables (where column = crit die type)

#### Example

```ts
// Crit Table III
{
  id: "crit-iii",
  type: "multi-column",
  name: "Crit Table III",
  columns: [
    { id: "d4", label: "d4" },
    { id: "d6", label: "d6" },
    ...
  ],
  rows: [
    {
      min: 1, max: 2,
      columns: {
        "d4": { text: "+1d3 damage", effect: { type: "damage", dice: "1d3" } },
        "d6": { text: "+1d4 damage", effect: { type: "damage", dice: "1d4" } },
        ...
      }
    },
    ...
  ]
}
```

#### Extends

- [`TableMetadata`](#tablemetadata)

#### Properties

##### id

```ts
id: string;
```

Defined in: tables/types.ts:21

Unique identifier for this table

###### Inherited from

[`TableMetadata`](#tablemetadata).[`id`](#id)

##### name

```ts
name: string;
```

Defined in: tables/types.ts:24

Display name

###### Inherited from

[`TableMetadata`](#tablemetadata).[`name`](#name)

##### description?

```ts
optional description?: string;
```

Defined in: tables/types.ts:27

Description of what this table is for

###### Inherited from

[`TableMetadata`](#tablemetadata).[`description`](#description)

##### source?

```ts
optional source?: string;
```

Defined in: tables/types.ts:30

Source/reference (e.g., "DCC Core Rules p.82")

###### Inherited from

[`TableMetadata`](#tablemetadata).[`source`](#source)

##### tags?

```ts
optional tags?: string[];
```

Defined in: tables/types.ts:33

Tags for categorization

###### Inherited from

[`TableMetadata`](#tablemetadata).[`tags`](#tags)

##### type

```ts
type: "multi-column";
```

Defined in: tables/types.ts:224

##### columns

```ts
columns: ColumnDefinition[];
```

Defined in: tables/types.ts:227

Column definitions

##### rows

```ts
rows: MultiColumnRow[];
```

Defined in: tables/types.ts:230

Table rows

***

### TieredEntry

Defined in: tables/types.ts:253

A tiered result entry.
Each entry represents one possible outcome at a specific tier.

#### Properties

##### min

```ts
min: number;
```

Defined in: tables/types.ts:255

Minimum check result for this entry

##### max?

```ts
optional max?: number;
```

Defined in: tables/types.ts:258

Maximum check result for this entry (optional, defaults to next entry's min - 1)

##### tier

```ts
tier: ResultTier;
```

Defined in: tables/types.ts:261

The result tier

##### text

```ts
text: string;
```

Defined in: tables/types.ts:264

Result text/description

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: tables/types.ts:267

Structured effect data

##### spellLevel?

```ts
optional spellLevel?: number;
```

Defined in: tables/types.ts:270

For spells: the spell level this result applies to

##### manifestation?

```ts
optional manifestation?: string;
```

Defined in: tables/types.ts:273

Manifestation description (for spells)

***

### TieredTable

Defined in: tables/types.ts:301

A tiered result table (used for spells and similar effects).

#### Example

```ts
// Magic Missile spell
{
  id: "spell-magic-missile",
  type: "tiered",
  name: "Magic Missile",
  spellLevel: 1,
  tiers: {
    lost: { min: 1, max: 1 },
    failure: { min: 2, max: 11 },
    "success-minor": { min: 12, max: 13 },
    success: { min: 14, max: 17 },
    ...
  },
  entries: [
    { min: 1, max: 1, tier: "lost", text: "Lost. Failure.", effect: { type: "lost" } },
    { min: 2, max: 11, tier: "failure", text: "Failure.", effect: { type: "none" } },
    { min: 12, max: 13, tier: "success-minor", text: "1 missile, 1d4 damage", ... },
    ...
  ]
}
```

#### Extends

- [`TableMetadata`](#tablemetadata)

#### Properties

##### id

```ts
id: string;
```

Defined in: tables/types.ts:21

Unique identifier for this table

###### Inherited from

[`TableMetadata`](#tablemetadata).[`id`](#id)

##### name

```ts
name: string;
```

Defined in: tables/types.ts:24

Display name

###### Inherited from

[`TableMetadata`](#tablemetadata).[`name`](#name)

##### description?

```ts
optional description?: string;
```

Defined in: tables/types.ts:27

Description of what this table is for

###### Inherited from

[`TableMetadata`](#tablemetadata).[`description`](#description)

##### source?

```ts
optional source?: string;
```

Defined in: tables/types.ts:30

Source/reference (e.g., "DCC Core Rules p.82")

###### Inherited from

[`TableMetadata`](#tablemetadata).[`source`](#source)

##### tags?

```ts
optional tags?: string[];
```

Defined in: tables/types.ts:33

Tags for categorization

###### Inherited from

[`TableMetadata`](#tablemetadata).[`tags`](#tags)

##### type

```ts
type: "tiered";
```

Defined in: tables/types.ts:302

##### spellLevel?

```ts
optional spellLevel?: number;
```

Defined in: tables/types.ts:305

For spells: the spell level

##### tiers?

```ts
optional tiers?: Partial<Record<ResultTier, {
  min: number;
  max: number;
}>>;
```

Defined in: tables/types.ts:308

Tier thresholds (optional, for quick tier lookup)

##### entries

```ts
entries: TieredEntry[];
```

Defined in: tables/types.ts:311

All entries

***

### TableEffect

Defined in: tables/types.ts:322

Structured effect that can be parsed from a table result.
Allows programmatic handling of table outcomes.

#### Properties

##### type

```ts
type: string;
```

Defined in: tables/types.ts:324

Effect type identifier

##### dice?

```ts
optional dice?: string;
```

Defined in: tables/types.ts:327

For damage effects: the dice formula

##### value?

```ts
optional value?: number;
```

Defined in: tables/types.ts:330

For numeric effects: a value

##### duration?

```ts
optional duration?: string;
```

Defined in: tables/types.ts:333

Duration of effect

##### target?

```ts
optional target?: string;
```

Defined in: tables/types.ts:336

Target of effect

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: tables/types.ts:339

Additional structured data

***

### SimpleLookupResult

Defined in: tables/types.ts:358

Result from a simple table lookup

#### Properties

##### tableType

```ts
tableType: "simple";
```

Defined in: tables/types.ts:359

##### tableId

```ts
tableId: string;
```

Defined in: tables/types.ts:360

##### tableName

```ts
tableName: string;
```

Defined in: tables/types.ts:361

##### roll

```ts
roll: number;
```

Defined in: tables/types.ts:362

##### text

```ts
text: string;
```

Defined in: tables/types.ts:363

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: tables/types.ts:364

##### entry

```ts
entry: SimpleTableEntry;
```

Defined in: tables/types.ts:365

***

### MultiColumnLookupResult

Defined in: tables/types.ts:371

Result from a multi-column table lookup

#### Properties

##### tableType

```ts
tableType: "multi-column";
```

Defined in: tables/types.ts:372

##### tableId

```ts
tableId: string;
```

Defined in: tables/types.ts:373

##### tableName

```ts
tableName: string;
```

Defined in: tables/types.ts:374

##### roll

```ts
roll: number;
```

Defined in: tables/types.ts:375

##### column

```ts
column: string;
```

Defined in: tables/types.ts:376

##### text

```ts
text: string;
```

Defined in: tables/types.ts:377

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: tables/types.ts:378

##### row

```ts
row: MultiColumnRow;
```

Defined in: tables/types.ts:379

***

### TieredLookupResult

Defined in: tables/types.ts:385

Result from a tiered table lookup

#### Properties

##### tableType

```ts
tableType: "tiered";
```

Defined in: tables/types.ts:386

##### tableId

```ts
tableId: string;
```

Defined in: tables/types.ts:387

##### tableName

```ts
tableName: string;
```

Defined in: tables/types.ts:388

##### roll

```ts
roll: number;
```

Defined in: tables/types.ts:389

##### tier

```ts
tier: ResultTier;
```

Defined in: tables/types.ts:390

##### text

```ts
text: string;
```

Defined in: tables/types.ts:391

##### effect?

```ts
optional effect?: TableEffect;
```

Defined in: tables/types.ts:392

##### entry

```ts
entry: TieredEntry;
```

Defined in: tables/types.ts:393

##### manifestation?

```ts
optional manifestation?: string;
```

Defined in: tables/types.ts:394

***

### TableReference

Defined in: tables/types.ts:413

Reference to a table from a skill definition.
Specifies which table to use and how to determine the column (if applicable).

#### Properties

##### tableId

```ts
tableId: string;
```

Defined in: tables/types.ts:415

Table ID to look up

##### columnSource?

```ts
optional columnSource?: string;
```

Defined in: tables/types.ts:423

For multi-column tables: how to determine the column.
- "crit-die": Use the character's crit die
- "action-die": Use the action die
- A specific column ID

##### rollModifier?

```ts
optional rollModifier?: string | number;
```

Defined in: tables/types.ts:429

Modifier to apply to the roll before lookup.
Can be a number or a reference like "luck" or "level".

## Type Aliases

### TableType

```ts
type TableType = "simple" | "multi-column" | "tiered" | "lay-on-hands";
```

Defined in: tables/types.ts:39

The type of table structure

***

### LayOnHandsAlignment

```ts
type LayOnHandsAlignment = "same" | "adjacent" | "opposed";
```

Defined in: tables/types.ts:53

Cleric–subject alignment relationship used to pick a column on the
RAW Lay on Hands table.

- "same":      cleric and subject share an alignment
- "adjacent":  one-step difference (e.g., lawful vs neutral)
- "opposed":   antithetical alignment (lawful vs chaotic)

***

### LayOnHandsConditionThresholds

```ts
type LayOnHandsConditionThresholds = Record<string, number>;
```

Defined in: tables/types.ts:93

Dice thresholds for alleviating specific conditions instead of HP (RAW p.31).
If the cleric declares a condition before rolling and the resolved dice count
meets or exceeds the threshold, the condition is cured — no HP overflow.
Keys are condition ids chosen by the data author (e.g., "broken-limb",
"organ-damage", "disease", "paralysis", "poison", "blindness").

***

### ResultTier

```ts
type ResultTier = 
  | "lost"
  | "failure"
  | "success-minor"
  | "success"
  | "success-major"
  | "success-critical";
```

Defined in: tables/types.ts:241

Result tier for spell-like tables.
Spells have distinct outcome tiers based on check result.

***

### LookupTable

```ts
type LookupTable = 
  | SimpleTable
  | MultiColumnTable
  | TieredTable
  | LayOnHandsTable;
```

Defined in: tables/types.ts:349

Any type of lookup table

***

### LookupResult

```ts
type LookupResult = 
  | SimpleLookupResult
  | MultiColumnLookupResult
  | TieredLookupResult;
```

Defined in: tables/types.ts:400

Union of all lookup result types

## Functions

### findSimpleEntry()

```ts
function findSimpleEntry(table: SimpleTable, roll: number): SimpleTableEntry | undefined;
```

Defined in: tables/lookup.ts:29

Find the matching entry in a simple table for a given roll.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`SimpleTable`](#simpletable) |
| `roll` | `number` |

#### Returns

[`SimpleTableEntry`](#simpletableentry) \| `undefined`

***

### lookupSimple()

```ts
function lookupSimple(table: SimpleTable, roll: number): SimpleLookupResult | undefined;
```

Defined in: tables/lookup.ts:43

Look up a result in a simple range table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `table` | [`SimpleTable`](#simpletable) | The simple table to search |
| `roll` | `number` | The roll result to look up |

#### Returns

[`SimpleLookupResult`](#simplelookupresult) \| `undefined`

The lookup result, or undefined if no match

***

### findMultiColumnRow()

```ts
function findMultiColumnRow(table: MultiColumnTable, roll: number): MultiColumnRow | undefined;
```

Defined in: tables/lookup.ts:70

Find the matching row in a multi-column table for a given roll.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`MultiColumnTable`](#multicolumntable) |
| `roll` | `number` |

#### Returns

[`MultiColumnRow`](#multicolumnrow) \| `undefined`

***

### lookupMultiColumn()

```ts
function lookupMultiColumn(
   table: MultiColumnTable, 
   roll: number, 
   column: string
): MultiColumnLookupResult | undefined;
```

Defined in: tables/lookup.ts:85

Look up a result in a multi-column table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `table` | [`MultiColumnTable`](#multicolumntable) | The multi-column table to search |
| `roll` | `number` | The roll result to look up |
| `column` | `string` | The column ID to read |

#### Returns

[`MultiColumnLookupResult`](#multicolumnlookupresult) \| `undefined`

The lookup result, or undefined if no match

***

### getTableColumns()

```ts
function getTableColumns(table: MultiColumnTable): string[];
```

Defined in: tables/lookup.ts:116

Get available column IDs for a multi-column table.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`MultiColumnTable`](#multicolumntable) |

#### Returns

`string`[]

***

### findTieredEntry()

```ts
function findTieredEntry(table: TieredTable, roll: number): TieredEntry | undefined;
```

Defined in: tables/lookup.ts:127

Find the matching entry in a tiered table for a given roll.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`TieredTable`](#tieredtable) |
| `roll` | `number` |

#### Returns

[`TieredEntry`](#tieredentry) \| `undefined`

***

### determineTier()

```ts
function determineTier(table: TieredTable, roll: number): ResultTier | undefined;
```

Defined in: tables/lookup.ts:144

Determine the result tier for a roll in a tiered table.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`TieredTable`](#tieredtable) |
| `roll` | `number` |

#### Returns

[`ResultTier`](#resulttier) \| `undefined`

***

### lookupTiered()

```ts
function lookupTiered(table: TieredTable, roll: number): TieredLookupResult | undefined;
```

Defined in: tables/lookup.ts:169

Look up a result in a tiered table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `table` | [`TieredTable`](#tieredtable) | The tiered table to search |
| `roll` | `number` | The roll result to look up |

#### Returns

[`TieredLookupResult`](#tieredlookupresult) \| `undefined`

The lookup result, or undefined if no match

***

### getEntriesForTier()

```ts
function getEntriesForTier(table: TieredTable, tier: ResultTier): TieredEntry[];
```

Defined in: tables/lookup.ts:194

Get all entries for a specific tier.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`TieredTable`](#tieredtable) |
| `tier` | [`ResultTier`](#resulttier) |

#### Returns

[`TieredEntry`](#tieredentry)[]

***

### lookup()

```ts
function lookup(
   table: LookupTable, 
   roll: number, 
   column?: string
): LookupResult | undefined;
```

Defined in: tables/lookup.ts:213

Look up a result in any table type.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `table` | [`LookupTable`](#lookuptable) | Any lookup table |
| `roll` | `number` | The roll result to look up |
| `column?` | `string` | Column ID (required for multi-column tables) |

#### Returns

[`LookupResult`](#lookupresult) \| `undefined`

The lookup result, or undefined if no match

***

### getTableRange()

```ts
function getTableRange(table: LookupTable): {
  min: number;
  max: number;
};
```

Defined in: tables/lookup.ts:247

Get the valid roll range for a table.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`LookupTable`](#lookuptable) |

#### Returns

```ts
{
  min: number;
  max: number;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `min` | `number` | tables/lookup.ts:249 |
| `max` | `number` | tables/lookup.ts:249 |

***

### validateTable()

```ts
function validateTable(table: LookupTable): {
  valid: boolean;
  errors: string[];
};
```

Defined in: tables/lookup.ts:292

Validate that a table has no gaps or overlaps in its ranges.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`LookupTable`](#lookuptable) |

#### Returns

```ts
{
  valid: boolean;
  errors: string[];
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `valid` | `boolean` | tables/lookup.ts:294 |
| `errors` | `string`[] | tables/lookup.ts:294 |

***

### tableCoversRoll()

```ts
function tableCoversRoll(table: LookupTable, roll: number): boolean;
```

Defined in: tables/lookup.ts:336

Check if a table covers a specific roll value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `table` | [`LookupTable`](#lookuptable) |
| `roll` | `number` |

#### Returns

`boolean`

***

### registerTable()

```ts
function registerTable(table: LookupTable, options?: {
  overwrite?: boolean;
  validate?: boolean;
}): void;
```

Defined in: tables/registry.ts:38

Register a table in the registry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `table` | [`LookupTable`](#lookuptable) | The table to register |
| `options?` | \{ `overwrite?`: `boolean`; `validate?`: `boolean`; \} | Registration options |
| `options.overwrite?` | `boolean` | - |
| `options.validate?` | `boolean` | - |

#### Returns

`void`

#### Throws

If table ID already exists and overwrite is false

***

### registerTables()

```ts
function registerTables(tables: LookupTable[], options?: {
  overwrite?: boolean;
  validate?: boolean;
}): void;
```

Defined in: tables/registry.ts:63

Register multiple tables at once.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tables` | [`LookupTable`](#lookuptable)[] |
| `options?` | \{ `overwrite?`: `boolean`; `validate?`: `boolean`; \} |
| `options.overwrite?` | `boolean` |
| `options.validate?` | `boolean` |

#### Returns

`void`

***

### unregisterTable()

```ts
function unregisterTable(tableId: string): boolean;
```

Defined in: tables/registry.ts:75

Unregister a table from the registry.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tableId` | `string` |

#### Returns

`boolean`

***

### clearRegistry()

```ts
function clearRegistry(): void;
```

Defined in: tables/registry.ts:82

Clear all registered tables.

#### Returns

`void`

***

### getTable()

```ts
function getTable(tableId: string): LookupTable | undefined;
```

Defined in: tables/registry.ts:93

Get a table by ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tableId` | `string` |

#### Returns

[`LookupTable`](#lookuptable) \| `undefined`

***

### requireTable()

```ts
function requireTable(tableId: string): LookupTable;
```

Defined in: tables/registry.ts:100

Get a table by ID, throwing if not found.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tableId` | `string` |

#### Returns

[`LookupTable`](#lookuptable)

***

### getSimpleTable()

```ts
function getSimpleTable(tableId: string): SimpleTable | undefined;
```

Defined in: tables/registry.ts:111

Get a simple table by ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tableId` | `string` |

#### Returns

[`SimpleTable`](#simpletable) \| `undefined`

***

### getMultiColumnTable()

```ts
function getMultiColumnTable(tableId: string): MultiColumnTable | undefined;
```

Defined in: tables/registry.ts:122

Get a multi-column table by ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tableId` | `string` |

#### Returns

[`MultiColumnTable`](#multicolumntable) \| `undefined`

***

### getTieredTable()

```ts
function getTieredTable(tableId: string): TieredTable | undefined;
```

Defined in: tables/registry.ts:135

Get a tiered table by ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tableId` | `string` |

#### Returns

[`TieredTable`](#tieredtable) \| `undefined`

***

### hasTable()

```ts
function hasTable(tableId: string): boolean;
```

Defined in: tables/registry.ts:146

Check if a table exists in the registry.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tableId` | `string` |

#### Returns

`boolean`

***

### getTableIds()

```ts
function getTableIds(): string[];
```

Defined in: tables/registry.ts:153

Get all registered table IDs.

#### Returns

`string`[]

***

### getTablesByType()

```ts
function getTablesByType(type: TableType): LookupTable[];
```

Defined in: tables/registry.ts:160

Get all tables of a specific type.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | [`TableType`](#tabletype) |

#### Returns

[`LookupTable`](#lookuptable)[]

***

### getTablesByTag()

```ts
function getTablesByTag(tag: string): LookupTable[];
```

Defined in: tables/registry.ts:167

Get all tables with a specific tag.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `tag` | `string` |

#### Returns

[`LookupTable`](#lookuptable)[]

***

### parseTable()

```ts
function parseTable(data: unknown): 
  | {
  success: true;
  table: LookupTable;
}
  | {
  success: false;
  error: string;
};
```

Defined in: tables/registry.ts:225

Parse a table from JSON data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `unknown` | Raw JSON data |

#### Returns

  \| \{
  `success`: `true`;
  `table`: [`LookupTable`](#lookuptable);
\}
  \| \{
  `success`: `false`;
  `error`: `string`;
\}

Parsed table or error

***

### loadTableFromJson()

```ts
function loadTableFromJson(json: string): 
  | {
  success: true;
  table: LookupTable;
}
  | {
  success: false;
  error: string;
};
```

Defined in: tables/registry.ts:267

Load a table from a JSON string.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `json` | `string` |

#### Returns

  \| \{
  `success`: `true`;
  `table`: [`LookupTable`](#lookuptable);
\}
  \| \{
  `success`: `false`;
  `error`: `string`;
\}

***

### loadAndRegisterTable()

```ts
function loadAndRegisterTable(json: string, options?: {
  overwrite?: boolean;
  validate?: boolean;
}): 
  | {
  success: true;
  tableId: string;
}
  | {
  success: false;
  error: string;
};
```

Defined in: tables/registry.ts:283

Load and register a table from JSON.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `json` | `string` |
| `options?` | \{ `overwrite?`: `boolean`; `validate?`: `boolean`; \} |
| `options.overwrite?` | `boolean` |
| `options.validate?` | `boolean` |

#### Returns

  \| \{
  `success`: `true`;
  `tableId`: `string`;
\}
  \| \{
  `success`: `false`;
  `error`: `string`;
\}

***

### loadTablesFromJson()

```ts
function loadTablesFromJson(json: string): 
  | {
  success: true;
  tables: LookupTable[];
}
  | {
  success: false;
  error: string;
};
```

Defined in: tables/registry.ts:306

Load multiple tables from a JSON array.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `json` | `string` |

#### Returns

  \| \{
  `success`: `true`;
  `tables`: [`LookupTable`](#lookuptable)[];
\}
  \| \{
  `success`: `false`;
  `error`: `string`;
\}
