# data

## Interfaces

### RawClassLevelData

Defined in: [data/loaders/class-loader.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L24)

Raw level data as it appears in source JSON

#### Properties

##### class

```ts
class: string;
```

Defined in: [data/loaders/class-loader.ts:25](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L25)

##### level

```ts
level: string;
```

Defined in: [data/loaders/class-loader.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L26)

##### levelData

```ts
levelData: string;
```

Defined in: [data/loaders/class-loader.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L27)

##### levelDataLawful?

```ts
optional levelDataLawful?: string;
```

Defined in: [data/loaders/class-loader.ts:28](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L28)

##### levelDataNeutral?

```ts
optional levelDataNeutral?: string;
```

Defined in: [data/loaders/class-loader.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L29)

##### levelDataChaotic?

```ts
optional levelDataChaotic?: string;
```

Defined in: [data/loaders/class-loader.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L30)

***

### RawSpellDefinition

Defined in: [data/loaders/spell-loader.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L24)

Raw spell definition from JSON source

#### Properties

##### id

```ts
id: string;
```

Defined in: [data/loaders/spell-loader.ts:25](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L25)

##### name

```ts
name: string;
```

Defined in: [data/loaders/spell-loader.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L26)

##### level

```ts
level: number;
```

Defined in: [data/loaders/spell-loader.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L27)

##### casterTypes

```ts
casterTypes: string[];
```

Defined in: [data/loaders/spell-loader.ts:28](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L28)

##### description?

```ts
optional description?: string;
```

Defined in: [data/loaders/spell-loader.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L29)

##### range?

```ts
optional range?: string;
```

Defined in: [data/loaders/spell-loader.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L30)

##### duration?

```ts
optional duration?: string;
```

Defined in: [data/loaders/spell-loader.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L31)

##### castingTime?

```ts
optional castingTime?: string;
```

Defined in: [data/loaders/spell-loader.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L32)

##### save?

```ts
optional save?: string;
```

Defined in: [data/loaders/spell-loader.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L33)

##### tags?

```ts
optional tags?: string[];
```

Defined in: [data/loaders/spell-loader.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L34)

##### source?

```ts
optional source?: string;
```

Defined in: [data/loaders/spell-loader.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L35)

***

### RawMercurialEffectData

Defined in: [data/loaders/spell-loader.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L41)

Raw mercurial effect data from JSON source

#### Properties

##### type

```ts
type: string;
```

Defined in: [data/loaders/spell-loader.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L42)

##### modifier?

```ts
optional modifier?: number;
```

Defined in: [data/loaders/spell-loader.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L43)

##### dice?

```ts
optional dice?: string;
```

Defined in: [data/loaders/spell-loader.ts:44](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L44)

##### trigger?

```ts
optional trigger?: string;
```

Defined in: [data/loaders/spell-loader.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L45)

##### duration?

```ts
optional duration?: string;
```

Defined in: [data/loaders/spell-loader.ts:46](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L46)

##### data?

```ts
optional data?: Record<string, unknown>;
```

Defined in: [data/loaders/spell-loader.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L47)

***

### RawMercurialTableEntry

Defined in: [data/loaders/spell-loader.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L53)

Raw mercurial table entry from JSON source

#### Properties

##### min

```ts
min: number;
```

Defined in: [data/loaders/spell-loader.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L54)

##### max

```ts
max: number;
```

Defined in: [data/loaders/spell-loader.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L55)

##### summary

```ts
summary: string;
```

Defined in: [data/loaders/spell-loader.ts:56](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L56)

##### description

```ts
description: string;
```

Defined in: [data/loaders/spell-loader.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L57)

##### displayOnCast?

```ts
optional displayOnCast?: boolean;
```

Defined in: [data/loaders/spell-loader.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L58)

##### effect?

```ts
optional effect?: RawMercurialEffectData;
```

Defined in: [data/loaders/spell-loader.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L59)

***

### RawMercurialTable

Defined in: [data/loaders/spell-loader.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L65)

Raw mercurial table from JSON source

#### Properties

##### id

```ts
id: string;
```

Defined in: [data/loaders/spell-loader.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L66)

##### name

```ts
name: string;
```

Defined in: [data/loaders/spell-loader.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L67)

##### entries

```ts
entries: RawMercurialTableEntry[];
```

Defined in: [data/loaders/spell-loader.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L68)

***

### InvalidSpellEntry

Defined in: [data/loaders/spell-loader.ts:224](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L224)

Invalid spell entry with reason

#### Properties

##### raw

```ts
raw: RawSpellDefinition;
```

Defined in: [data/loaders/spell-loader.ts:225](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L225)

##### reason

```ts
reason: string;
```

Defined in: [data/loaders/spell-loader.ts:226](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L226)

***

### SpellValidationResult

Defined in: [data/loaders/spell-loader.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L232)

Validation result for spell definitions

#### Properties

##### valid

```ts
valid: SpellDefinition[];
```

Defined in: [data/loaders/spell-loader.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L233)

##### invalid

```ts
invalid: InvalidSpellEntry[];
```

Defined in: [data/loaders/spell-loader.ts:234](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L234)

***

### MercurialTableValidationResult

Defined in: [data/loaders/spell-loader.ts:359](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L359)

Validation result for mercurial table

#### Properties

##### valid

```ts
valid: boolean;
```

Defined in: [data/loaders/spell-loader.ts:360](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L360)

##### table?

```ts
optional table?: MercurialTable;
```

Defined in: [data/loaders/spell-loader.ts:361](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L361)

##### errors

```ts
errors: string[];
```

Defined in: [data/loaders/spell-loader.ts:362](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L362)

***

### RawTableResult

Defined in: [data/loaders/table-loader.ts:17](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L17)

Raw table result from FoundryVTT format

#### Properties

##### range

```ts
range: [number, number];
```

Defined in: [data/loaders/table-loader.ts:18](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L18)

##### description

```ts
description: string;
```

Defined in: [data/loaders/table-loader.ts:19](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L19)

##### type?

```ts
optional type?: string;
```

Defined in: [data/loaders/table-loader.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L20)

##### weight?

```ts
optional weight?: number;
```

Defined in: [data/loaders/table-loader.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L21)

***

### RawTableData

Defined in: [data/loaders/table-loader.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L27)

Raw table data from FoundryVTT format

#### Properties

##### \_id

```ts
_id: string;
```

Defined in: [data/loaders/table-loader.ts:28](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L28)

##### name

```ts
name: string;
```

Defined in: [data/loaders/table-loader.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L29)

##### description?

```ts
optional description?: string;
```

Defined in: [data/loaders/table-loader.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L30)

##### formula

```ts
formula: string;
```

Defined in: [data/loaders/table-loader.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L31)

##### results

```ts
results: RawTableResult[];
```

Defined in: [data/loaders/table-loader.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L32)

***

### NameData

Defined in: [data/names.ts:14](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L14)

Name data organized by ancestry/race.

#### Properties

##### ancestry

```ts
ancestry: string;
```

Defined in: [data/names.ts:16](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L16)

Display name for this ancestry

##### firstNames

```ts
firstNames: string[];
```

Defined in: [data/names.ts:19](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L19)

First names

##### epithets?

```ts
optional epithets?: string[];
```

Defined in: [data/names.ts:22](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L22)

Optional epithets/titles (e.g., "the Bold", "Ironfoot")

***

### NameGenerationData

Defined in: [data/names.ts:28](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L28)

Collection of all name data.

#### Properties

##### human

```ts
human: NameData;
```

Defined in: [data/names.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L29)

##### dwarf

```ts
dwarf: NameData;
```

Defined in: [data/names.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L30)

##### elf

```ts
elf: NameData;
```

Defined in: [data/names.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L31)

##### halfling

```ts
halfling: NameData;
```

Defined in: [data/names.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L32)

***

### NameGenerationOptions

Defined in: [data/names.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L38)

Options for name generation.

#### Properties

##### includeEpithet?

```ts
optional includeEpithet?: boolean;
```

Defined in: [data/names.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L40)

Include an epithet (default: false)

##### epithetChance?

```ts
optional epithetChance?: number;
```

Defined in: [data/names.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L43)

Chance of epithet if includeEpithet is true (0-1, default: 0.3)

***

### GeneratedName

Defined in: [data/names.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L49)

Result of name generation.

#### Properties

##### firstName

```ts
firstName: string;
```

Defined in: [data/names.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L51)

The first name

##### epithet?

```ts
optional epithet?: string;
```

Defined in: [data/names.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L54)

Optional epithet

##### fullName

```ts
fullName: string;
```

Defined in: [data/names.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L57)

Full formatted name

##### ancestry

```ts
ancestry: string;
```

Defined in: [data/names.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L60)

The ancestry used

## Type Aliases

### Ancestry

```ts
type Ancestry = keyof NameGenerationData;
```

Defined in: [data/names.ts:168](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L168)

Ancestry type for name generation.

## Variables

### ABILITY\_MODIFIERS

```ts
const ABILITY_MODIFIERS: Readonly<Record<number, number>>;
```

Defined in: [data/ability-modifiers.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/ability-modifiers.ts#L21)

Ability modifier lookup table
Key: ability score (0-24)
Value: modifier (-4 to +6)

***

### MIN\_ABILITY\_SCORE

```ts
const MIN_ABILITY_SCORE: 0 = 0;
```

Defined in: [data/ability-modifiers.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/ability-modifiers.ts#L52)

Minimum ability score with a defined modifier

***

### MAX\_ABILITY\_SCORE

```ts
const MAX_ABILITY_SCORE: 24 = 24;
```

Defined in: [data/ability-modifiers.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/ability-modifiers.ts#L57)

Maximum ability score with a defined modifier

***

### DEFAULT\_NAME\_DATA

```ts
const DEFAULT_NAME_DATA: NameGenerationData;
```

Defined in: [data/names.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L158)

Default name generation data with all ancestries.

***

### SAMPLE\_BIRTH\_AUGURS

```ts
const SAMPLE_BIRTH_AUGURS: BirthAugurEntry[];
```

Defined in: [data/sample-data.ts:26](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L26)

Example birth augur data for testing.
These are original fan-made entries, not official DCC content.
Roll 1d30 to select a birth augur.

***

### SAMPLE\_OCCUPATIONS

```ts
const SAMPLE_OCCUPATIONS: OccupationEntry[];
```

Defined in: [data/sample-data.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L68)

Example occupation data for testing.
These are original fan-made entries, not official DCC content.
Roll 1d100 to select an occupation.

***

### DEFAULT\_CHARACTER\_CREATION\_DATA

```ts
const DEFAULT_CHARACTER_CREATION_DATA: {
  birthAugurs: BirthAugurEntry[];
  occupations: OccupationEntry[];
};
```

Defined in: [data/sample-data.ts:161](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L161)

Default character creation data using fan-made content.
Use this for testing or when official data isn't available.

For official DCC RPG data, supply your own licensed data instead.

#### Type Declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-birthaugurs"></a> `birthAugurs` | [`BirthAugurEntry`](types.md#birthaugurentry)[] | `SAMPLE_BIRTH_AUGURS` | [data/sample-data.ts:162](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L162) |
| <a id="property-occupations"></a> `occupations` | [`OccupationEntry`](character.md#occupationentry)[] | `SAMPLE_OCCUPATIONS` | [data/sample-data.ts:163](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L163) |

***

### SAMPLE\_XP\_THRESHOLDS

```ts
const SAMPLE_XP_THRESHOLDS: XPThresholds[];
```

Defined in: [data/sample-data.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L242)

Sample XP thresholds for all core classes.
These are fan-made approximations for testing.

***

### MIGHTY\_DEED

```ts
const MIGHTY_DEED: SkillDefinition;
```

Defined in: [data/skills/enabling-skills.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L31)

Mighty Deed of Arms

Warriors and dwarves can attempt spectacular combat maneuvers.
On any attack, they roll a deed die alongside their attack roll.
If the deed die shows 3+, they can attempt a special action in
addition to dealing bonus damage.

The deed die improves with level.

***

### SHIELD\_BASH

```ts
const SHIELD_BASH: SkillDefinition;
```

Defined in: [data/skills/enabling-skills.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L77)

Shield Bash

Dwarves can use their shield as an offensive weapon, making an
extra attack each round while wielding a shield.

***

### BACKSTAB\_BONUS\_ID

```ts
const BACKSTAB_BONUS_ID: "class:backstab" = "class:backstab";
```

Defined in: [data/skills/enabling-skills.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L129)

Canonical `RollBonus.id` for the thief's Table 1-9 backstab attack
bonus. Use this when constructing the `RollBonus` that carries the
precomputed backstab value into `makeAttackRoll`.

***

### BACKSTAB

```ts
const BACKSTAB: SkillDefinition;
```

Defined in: [data/skills/enabling-skills.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L143)

Backstab

Per DCC core rules: when a thief strikes from behind, or strikes a
foe who has not noticed them, the thief adds an alignment- and
level-scaled attack bonus (Table 1-9) and, on a hit, automatically
scores a critical hit rolled on Crit Table II with the thief's
level-scaled crit die (Table 1-7).

There is no RAW damage multiplier; bonus damage, where it applies,
comes from backstab-friendly weapons (see `WeaponStats.backstabDamage`).

***

### TWO\_WEAPON\_FIGHTING

```ts
const TWO_WEAPON_FIGHTING: SkillDefinition;
```

Defined in: [data/skills/enabling-skills.ts:250](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L250)

Two-Weapon Fighting

Halflings are skilled at fighting with two weapons. They suffer
reduced penalties compared to other classes and gain an initiative
bonus when doing so.

***

### LUCK\_RECOVERY

```ts
const LUCK_RECOVERY: SkillDefinition;
```

Defined in: [data/skills/enabling-skills.ts:323](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L323)

Luck Recovery

Thieves and halflings can recover spent luck points. Thieves recover
luck when they succeed at certain thief skills. Halflings can share
their luck recovery with nearby allies.

***

### LUCK\_SHARING

```ts
const LUCK_SHARING: SkillDefinition;
```

Defined in: [data/skills/enabling-skills.ts:381](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L381)

Luck Sharing (Halfling)

Halflings can spend their luck to aid allies within 30 feet.

***

### ENABLING\_SKILLS

```ts
const ENABLING_SKILLS: Record<string, SkillDefinition>;
```

Defined in: [data/skills/enabling-skills.ts:424](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L424)

All enabling skills indexed by ID

***

### ENABLING\_SKILL\_IDS

```ts
const ENABLING_SKILL_IDS: string[];
```

Defined in: [data/skills/enabling-skills.ts:436](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L436)

List of enabling skill IDs

***

### SNEAK\_SILENTLY

```ts
const SNEAK_SILENTLY: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L21)

Sneak Silently - move without being heard

***

### HIDE\_IN\_SHADOWS

```ts
const HIDE_IN_SHADOWS: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L41)

Hide in Shadows - conceal oneself in darkness

***

### PICK\_POCKETS

```ts
const PICK_POCKETS: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L61)

Pick Pockets - steal from a target without detection

***

### CLIMB\_SHEER\_SURFACES

```ts
const CLIMB_SHEER_SURFACES: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L81)

Climb Sheer Surfaces - scale walls and cliffs

***

### PICK\_LOCK

```ts
const PICK_LOCK: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L101)

Pick Lock - open locks without a key

***

### FIND\_TRAP

```ts
const FIND_TRAP: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:121](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L121)

Find Trap - locate hidden traps

***

### DISABLE\_TRAP

```ts
const DISABLE_TRAP: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:141](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L141)

Disable Trap - safely disarm detected traps

***

### FORGE\_DOCUMENT

```ts
const FORGE_DOCUMENT: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:161](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L161)

Forge Document - create fake documents

***

### DISGUISE\_SELF

```ts
const DISGUISE_SELF: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:181](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L181)

Disguise Self - alter appearance

***

### READ\_LANGUAGES

```ts
const READ_LANGUAGES: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:201](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L201)

Read Languages - decipher unknown writings

***

### HANDLE\_POISON

```ts
const HANDLE_POISON: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:221](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L221)

Handle Poison - work with poisons safely

***

### CAST\_SPELL\_FROM\_SCROLL

```ts
const CAST_SPELL_FROM_SCROLL: SkillDefinition;
```

Defined in: [data/skills/thief-skills.ts:244](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L244)

Cast Spell from Scroll - use magical scrolls

Unlike other thief skills, this uses a variable die based on level,
not a d20 with a bonus.

***

### THIEF\_SKILLS

```ts
const THIEF_SKILLS: Record<string, SkillDefinition>;
```

Defined in: [data/skills/thief-skills.ts:265](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L265)

All thief skills indexed by ID

***

### THIEF\_SKILL\_IDS

```ts
const THIEF_SKILL_IDS: string[];
```

Defined in: [data/skills/thief-skills.ts:284](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/thief-skills.ts#L284)

List of thief skill IDs

***

### TEST\_LAY\_ON\_HANDS\_TABLE

```ts
const TEST_LAY_ON_HANDS_TABLE: LayOnHandsTable;
```

Defined in: [data/tables/test-lay-on-hands.ts:14](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/tables/test-lay-on-hands.ts#L14)

Fan-made Lay on Hands table for testing. Structure matches RAW (3 alignment
columns, dice-count cells), values are original.

***

### TEST\_TURN\_UNHOLY\_TABLE

```ts
const TEST_TURN_UNHOLY_TABLE: SimpleTable;
```

Defined in: [data/tables/test-turn-unholy.ts:17](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/tables/test-turn-unholy.ts#L17)

Fan-made Turn Unholy result table for testing.
Simplified version with fewer entries for test coverage.

## Functions

### getAbilityModifier()

```ts
function getAbilityModifier(score: number): number;
```

Defined in: [data/ability-modifiers.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/ability-modifiers.ts#L65)

Get the modifier for an ability score

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `score` | `number` | The ability score (0-24) |

#### Returns

`number`

The modifier, or 0 if score is out of range

***

### formatAbilityModifier()

```ts
function formatAbilityModifier(score: number): string;
```

Defined in: [data/ability-modifiers.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/ability-modifiers.ts#L83)

Get the modifier with a plus sign prefix for positive values

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `score` | `number` | The ability score |

#### Returns

`string`

Formatted modifier string (e.g., "+2", "-1", "0")

***

### registerClassProgression()

```ts
function registerClassProgression(progression: ClassProgression): void;
```

Defined in: [data/classes/progression-utils.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L43)

Register a class progression in the registry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `progression` | [`ClassProgression`](types.md#classprogression) | The class progression to register |

#### Returns

`void`

#### Example

```typescript
import { WARRIOR_PROGRESSION } from "./my-class-data.js"; // your own data
registerClassProgression(WARRIOR_PROGRESSION);
```

***

### registerClassProgressions()

```ts
function registerClassProgressions(progressions: ClassProgression[]): void;
```

Defined in: [data/classes/progression-utils.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L58)

Register multiple class progressions at once.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `progressions` | [`ClassProgression`](types.md#classprogression)[] | Array of class progressions to register |

#### Returns

`void`

#### Example

```typescript
import { ALL_CLASS_PROGRESSIONS } from "./my-class-data.js"; // your own data
registerClassProgressions(ALL_CLASS_PROGRESSIONS);
```

***

### clearClassProgressions()

```ts
function clearClassProgressions(): void;
```

Defined in: [data/classes/progression-utils.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L68)

Clear all registered class progressions.
Useful for testing or resetting state.

#### Returns

`void`

***

### getClassProgression()

```ts
function getClassProgression(classId: string): ClassProgression | undefined;
```

Defined in: [data/classes/progression-utils.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L78)

Get a registered class progression by ID.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID (e.g., "warrior", "thief") |

#### Returns

[`ClassProgression`](types.md#classprogression) \| `undefined`

The class progression, or undefined if not registered

***

### getRegisteredClassIds()

```ts
function getRegisteredClassIds(): string[];
```

Defined in: [data/classes/progression-utils.ts:87](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L87)

Get all registered class IDs.

#### Returns

`string`[]

Array of registered class IDs

***

### getSaveBonus()

```ts
function getSaveBonus(
   classId: string, 
   level: number, 
   save: ProgressionSaveType
): number;
```

Defined in: [data/classes/progression-utils.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L103)

Get save bonus from a class progression at a specific level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID (e.g., "warrior", "thief") |
| `level` | `number` | The character level |
| `save` | [`ProgressionSaveType`](types.md#progressionsavetype) | The save type ("ref", "frt", or "wil") |

#### Returns

`number`

The save bonus, or 0 if class/level not found

#### Example

```ts
// Get warrior's fortitude save at level 5
const frt = getSaveBonus("warrior", 5, "frt"); // 3
```

***

### getSavingThrows()

```ts
function getSavingThrows(classId: string, level: number): SavingThrows;
```

Defined in: [data/classes/progression-utils.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L129)

Get all saving throw bonuses from a class progression at a specific level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID (e.g., "warrior", "thief") |
| `level` | `number` | The character level |

#### Returns

[`SavingThrows`](types.md#savingthrows)

The saving throw bonuses

#### Example

```ts
// Get warrior's saves at level 5
const saves = getSavingThrows("warrior", 5);
// { reflex: 2, fortitude: 3, will: 1 }
```

***

### getAttackBonus()

```ts
function getAttackBonus(classId: string, level: number): string | number;
```

Defined in: [data/classes/progression-utils.ts:159](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L159)

Get the attack bonus from a class progression at a specific level.
Note: For warriors and dwarves, this returns the deed die as a string.
For other classes, this returns a number.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID |
| `level` | `number` | The character level |

#### Returns

`string` \| `number`

The attack bonus (number or die type string)

***

### getActionDice()

```ts
function getActionDice(classId: string, level: number): string[];
```

Defined in: [data/classes/progression-utils.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L179)

Get the action dice from a class progression at a specific level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID |
| `level` | `number` | The character level |

#### Returns

`string`[]

Array of action dice (e.g., ["1d20", "1d14"])

***

### getCriticalHitData()

```ts
function getCriticalHitData(classId: string, level: number): {
  die: string;
  table: string;
  range?: number;
};
```

Defined in: [data/classes/progression-utils.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L199)

Get the critical hit data from a class progression at a specific level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID |
| `level` | `number` | The character level |

#### Returns

```ts
{
  die: string;
  table: string;
  range?: number;
}
```

The critical die and table

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `die` | `string` | [data/classes/progression-utils.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L202) |
| `table` | `string` | [data/classes/progression-utils.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L202) |
| `range?` | `number` | [data/classes/progression-utils.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L202) |

***

### getTitle()

```ts
function getTitle(
   classId: string, 
   level: number, 
   alignment: "lawful" | "neutral" | "chaotic"
): string | undefined;
```

Defined in: [data/classes/progression-utils.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L233)

Get the title for a character of a specific class, level, and alignment.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID |
| `level` | `number` | The character level |
| `alignment` | `"lawful"` \| `"neutral"` \| `"chaotic"` | The character alignment ("lawful", "neutral", "chaotic") |

#### Returns

`string` \| `undefined`

The title, or undefined if not found

***

### hasDeedDie()

```ts
function hasDeedDie(classId: string): boolean;
```

Defined in: [data/classes/progression-utils.ts:253](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L253)

Check if a class has deed die (warrior-style attack bonus).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID |

#### Returns

`boolean`

True if the class uses deed die

***

### getHitDie()

```ts
function getHitDie(classId: string): string;
```

Defined in: [data/classes/progression-utils.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L263)

Get the hit die for a class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID |

#### Returns

`string`

The hit die (e.g., "d8", "d10")

***

### getLuckDie()

```ts
function getLuckDie(classId: string, level: number): string | undefined;
```

Defined in: [data/classes/progression-utils.ts:283](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/classes/progression-utils.ts#L283)

Get the luck die for a class at a specific level (used by thieves and
halflings). Returns `undefined` for classes without a luck die, or when no
progression is registered.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | The class ID |
| `level` | `number` | The character level |

#### Returns

`string` \| `undefined`

The luck die (e.g., "d3", "d14") or undefined

***

### parseClassLevel()

```ts
function parseClassLevel(raw: RawClassLevelData): ProgressionLevelData;
```

Defined in: [data/loaders/class-loader.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L158)

Parse a single level's raw data into ProgressionLevelData

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | [`RawClassLevelData`](#rawclassleveldata) |

#### Returns

[`ProgressionLevelData`](types.md#progressionleveldata)

***

### loadClassProgression()

```ts
function loadClassProgression(
   classId: string, 
   name: string, 
   skills: string[], 
   rawLevels: RawClassLevelData[]
): ClassProgression;
```

Defined in: [data/loaders/class-loader.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L194)

Load class progression from an array of raw level data

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |
| `name` | `string` |
| `skills` | `string`[] |
| `rawLevels` | [`RawClassLevelData`](#rawclassleveldata)[] |

#### Returns

[`ClassProgression`](types.md#classprogression)

***

### getSkillBonusFromProgression()

```ts
function getSkillBonusFromProgression(
   progression: ClassProgression, 
   level: number, 
   alignment: ProgressionAlignment, 
   skillId: string
): number | `d${number}` | undefined;
```

Defined in: [data/loaders/class-loader.ts:220](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/class-loader.ts#L220)

Get skill bonus for a character from progression data

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `progression` | [`ClassProgression`](types.md#classprogression) |
| `level` | `number` |
| `alignment` | [`ProgressionAlignment`](types.md#progressionalignment) |
| `skillId` | `string` |

#### Returns

`number` \| `` `d${number}` `` \| `undefined`

***

### parseSpellDefinition()

```ts
function parseSpellDefinition(raw: RawSpellDefinition): SpellDefinition | undefined;
```

Defined in: [data/loaders/spell-loader.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L137)

Parse a raw spell definition into a typed SpellDefinition

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | [`RawSpellDefinition`](#rawspelldefinition) |

#### Returns

[`SpellDefinition`](types.md#spelldefinition) \| `undefined`

***

### loadSpellDefinitions()

```ts
function loadSpellDefinitions(rawSpells: RawSpellDefinition[]): SpellDefinition[];
```

Defined in: [data/loaders/spell-loader.ts:206](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L206)

Load multiple spell definitions from raw JSON array

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rawSpells` | [`RawSpellDefinition`](#rawspelldefinition)[] |

#### Returns

[`SpellDefinition`](types.md#spelldefinition)[]

***

### loadSpellDefinitionsWithValidation()

```ts
function loadSpellDefinitionsWithValidation(rawSpells: RawSpellDefinition[]): SpellValidationResult;
```

Defined in: [data/loaders/spell-loader.ts:240](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L240)

Load spell definitions with validation reporting

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rawSpells` | [`RawSpellDefinition`](#rawspelldefinition)[] |

#### Returns

[`SpellValidationResult`](#spellvalidationresult)

***

### loadMercurialTable()

```ts
function loadMercurialTable(raw: RawMercurialTable): MercurialTable;
```

Defined in: [data/loaders/spell-loader.ts:346](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L346)

Load a mercurial table from raw JSON

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | [`RawMercurialTable`](#rawmercurialtable) |

#### Returns

[`MercurialTable`](spells.md#mercurialtable)

***

### loadMercurialTableWithValidation()

```ts
function loadMercurialTableWithValidation(raw: RawMercurialTable): MercurialTableValidationResult;
```

Defined in: [data/loaders/spell-loader.ts:368](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L368)

Load mercurial table with validation

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | [`RawMercurialTable`](#rawmercurialtable) |

#### Returns

[`MercurialTableValidationResult`](#mercurialtablevalidationresult)

***

### groupSpellsByLevel()

```ts
function groupSpellsByLevel(spells: readonly SpellDefinition[]): Map<number, SpellDefinition[]>;
```

Defined in: [data/loaders/spell-loader.ts:439](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L439)

Group spells by level

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spells` | readonly [`SpellDefinition`](types.md#spelldefinition)[] |

#### Returns

`Map`\<`number`, [`SpellDefinition`](types.md#spelldefinition)[]\>

***

### groupSpellsByCasterType()

```ts
function groupSpellsByCasterType(spells: readonly SpellDefinition[]): Map<CasterType, SpellDefinition[]>;
```

Defined in: [data/loaders/spell-loader.ts:459](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L459)

Group spells by caster type

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spells` | readonly [`SpellDefinition`](types.md#spelldefinition)[] |

#### Returns

`Map`\<[`CasterType`](types.md#castertype), [`SpellDefinition`](types.md#spelldefinition)[]\>

***

### findSpellById()

```ts
function findSpellById(spells: readonly SpellDefinition[], id: string): SpellDefinition | undefined;
```

Defined in: [data/loaders/spell-loader.ts:481](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L481)

Find a spell by ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spells` | readonly [`SpellDefinition`](types.md#spelldefinition)[] |
| `id` | `string` |

#### Returns

[`SpellDefinition`](types.md#spelldefinition) \| `undefined`

***

### findSpellsByName()

```ts
function findSpellsByName(spells: readonly SpellDefinition[], name: string): SpellDefinition[];
```

Defined in: [data/loaders/spell-loader.ts:491](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L491)

Find spells by name (case-insensitive partial match)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spells` | readonly [`SpellDefinition`](types.md#spelldefinition)[] |
| `name` | `string` |

#### Returns

[`SpellDefinition`](types.md#spelldefinition)[]

***

### getAvailableSpells()

```ts
function getAvailableSpells(
   spells: readonly SpellDefinition[], 
   casterType: CasterType, 
   maxLevel: number
): SpellDefinition[];
```

Defined in: [data/loaders/spell-loader.ts:502](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/spell-loader.ts#L502)

Get all spells available to a specific caster type at a given level

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `spells` | readonly [`SpellDefinition`](types.md#spelldefinition)[] |
| `casterType` | [`CasterType`](types.md#castertype) |
| `maxLevel` | `number` |

#### Returns

[`SpellDefinition`](types.md#spelldefinition)[]

***

### loadRollableTable()

```ts
function loadRollableTable(raw: RawTableData): RollableTable;
```

Defined in: [data/loaders/table-loader.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L50)

Load a rollable table from raw FoundryVTT data

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | [`RawTableData`](#rawtabledata) |

#### Returns

[`RollableTable`](types.md#rollabletable)

***

### loadBirthAugurs()

```ts
function loadBirthAugurs(raw: RawTableData): BirthAugurEntry[];
```

Defined in: [data/loaders/table-loader.ts:144](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L144)

Load birth augurs from a raw luck table

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | [`RawTableData`](#rawtabledata) |

#### Returns

[`BirthAugurEntry`](types.md#birthaugurentry)[]

***

### getBirthAugurModifier()

```ts
function getBirthAugurModifier(luckModifier: number, augur: BirthAugurEntry): {
  modifier: number;
  affects: string;
  effectType: BirthAugurEffectType;
};
```

Defined in: [data/loaders/table-loader.ts:176](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L176)

Get modifier value based on luck score and birth augur

In DCC, the luck modifier applies to the birth augur's affected roll.
The modifier is calculated from the luck score using the standard
ability modifier table.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `luckModifier` | `number` | The calculated modifier from the luck score |
| `augur` | [`BirthAugurEntry`](types.md#birthaugurentry) | The character's birth augur |

#### Returns

```ts
{
  modifier: number;
  affects: string;
  effectType: BirthAugurEffectType;
}
```

Object with the modifier value and what it affects

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `modifier` | `number` | [data/loaders/table-loader.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L179) |
| `affects` | `string` | [data/loaders/table-loader.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L179) |
| `effectType` | [`BirthAugurEffectType`](types.md#birthaugureffecttype) | [data/loaders/table-loader.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/loaders/table-loader.ts#L179) |

***

### generateName()

```ts
function generateName(
   ancestry: keyof NameGenerationData, 
   data?: NameGenerationData, 
   options?: NameGenerationOptions, 
   random?: RandomSource
): GeneratedName;
```

Defined in: [data/names.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L179)

Generate a random name for the given ancestry.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `ancestry` | keyof [`NameGenerationData`](#namegenerationdata) | `undefined` | The ancestry/race to generate a name for |
| `data?` | [`NameGenerationData`](#namegenerationdata) | `DEFAULT_NAME_DATA` | Name generation data (defaults to DEFAULT_NAME_DATA) |
| `options?` | [`NameGenerationOptions`](#namegenerationoptions) | `{}` | Generation options |
| `random?` | [`RandomSource`](types.md#randomsource) | `...` | Random source (defaults to createDefaultRandomSource()) |

#### Returns

[`GeneratedName`](#generatedname)

Generated name result

***

### detectAncestryFromOccupation()

```ts
function detectAncestryFromOccupation(occupation: string): keyof NameGenerationData;
```

Defined in: [data/names.ts:226](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L226)

Detect likely ancestry from occupation name.
Returns 'human' as default if no specific ancestry detected.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupation` | `string` | The occupation string to analyze |

#### Returns

keyof [`NameGenerationData`](#namegenerationdata)

Detected ancestry

***

### generateNameForOccupation()

```ts
function generateNameForOccupation(
   occupation: string, 
   data?: NameGenerationData, 
   options?: NameGenerationOptions, 
   random?: RandomSource
): GeneratedName;
```

Defined in: [data/names.ts:252](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/names.ts#L252)

Generate a name based on the character's occupation.
Automatically detects ancestry from occupation keywords.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `occupation` | `string` | `undefined` | The character's occupation |
| `data?` | [`NameGenerationData`](#namegenerationdata) | `DEFAULT_NAME_DATA` | Name generation data |
| `options?` | [`NameGenerationOptions`](#namegenerationoptions) | `{}` | Generation options |
| `random?` | [`RandomSource`](types.md#randomsource) | `...` | Random source |

#### Returns

[`GeneratedName`](#generatedname)

Generated name result

***

### occupationMatchesRoll()

```ts
function occupationMatchesRoll(occupation: OccupationEntry, roll: number): boolean;
```

Defined in: [data/sample-data.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L174)

Check if a roll matches an occupation entry.
Handles both single numbers and ranges like "23-24".

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `occupation` | [`OccupationEntry`](character.md#occupationentry) |
| `roll` | `number` |

#### Returns

`boolean`

***

### findOccupationByRoll()

```ts
function findOccupationByRoll(occupations: OccupationEntry[], roll: number): OccupationEntry | undefined;
```

Defined in: [data/sample-data.ts:193](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L193)

Find an occupation by roll value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `occupations` | [`OccupationEntry`](character.md#occupationentry)[] |
| `roll` | `number` |

#### Returns

[`OccupationEntry`](character.md#occupationentry) \| `undefined`

***

### findBirthAugurByRoll()

```ts
function findBirthAugurByRoll(augurs: BirthAugurEntry[], roll: number): BirthAugurEntry | undefined;
```

Defined in: [data/sample-data.ts:203](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L203)

Find a birth augur by roll value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `augurs` | [`BirthAugurEntry`](types.md#birthaugurentry)[] |
| `roll` | `number` |

#### Returns

[`BirthAugurEntry`](types.md#birthaugurentry) \| `undefined`

***

### getBirthAugurEffectType()

```ts
function getBirthAugurEffectType(augur: BirthAugurEntry): BirthAugurEffectType;
```

Defined in: [data/sample-data.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/sample-data.ts#L213)

Get the effect type ID for programmatic use.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `augur` | [`BirthAugurEntry`](types.md#birthaugurentry) |

#### Returns

[`BirthAugurEffectType`](types.md#birthaugureffecttype)

***

### getDeedSuccessThreshold()

```ts
function getDeedSuccessThreshold(): number;
```

Defined in: [data/skills/enabling-skills.ts:56](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L56)

Get the deed success threshold from the skill definition

#### Returns

`number`

***

### canShieldBash()

```ts
function canShieldBash(hasShieldEquipped: boolean, classId: string): boolean;
```

Defined in: [data/skills/enabling-skills.ts:102](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L102)

Check if a character can perform a shield bash

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `hasShieldEquipped` | `boolean` |
| `classId` | `string` |

#### Returns

`boolean`

***

### getShieldBashDamageDie()

```ts
function getShieldBashDamageDie(): `d${number}`;
```

Defined in: [data/skills/enabling-skills.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L109)

Get the shield bash damage die from the skill definition

#### Returns

`` `d${number}` ``

***

### getBackstabAttackBonus()

```ts
function getBackstabAttackBonus(
   progression: ClassProgression, 
   level: number, 
   alignment: ProgressionAlignment
): number | undefined;
```

Defined in: [data/skills/enabling-skills.ts:178](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L178)

Look up the thief's backstab attack-roll bonus for a given level and
alignment from class progression data (Table 1-9).

The value comes from the loaded class progression, which mirrors the
rulebook table (e.g., L1 Lawful +1, L1 Chaotic +3, L10 Chaotic +15).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `progression` | [`ClassProgression`](types.md#classprogression) |
| `level` | `number` |
| `alignment` | [`ProgressionAlignment`](types.md#progressionalignment) |

#### Returns

`number` \| `undefined`

The attack bonus, or `undefined` when the progression has
  no entry for the given level/alignment (out-of-range level, wrong
  class, or missing skill entry). A legitimate +0 is still returned
  as `0` — `undefined` is reserved for "no data".

***

### isBackstabTriggeredRaw()

```ts
function isBackstabTriggeredRaw(attackerIsBehind: boolean, targetIsUnaware: boolean): boolean;
```

Defined in: [data/skills/enabling-skills.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L202)

RAW backstab trigger (DCC core rulebook, Thief class, paraphrased): the
attack comes from behind, OR the target is unaware of the attacker.

This helper covers only the rulebook trigger. Extensions (extra
classes, magic items, spells, special effects) that grant backstab
under broader circumstances should OR their own conditions in and
hand the combined boolean to `canBackstab`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attackerIsBehind` | `boolean` | True if the attacker is attacking from behind the target. |
| `targetIsUnaware` | `boolean` | True if the target is otherwise unaware of the attacker (surprise round, sleeping, blinded, distracted, flanked-and-engaged, etc.). Not limited to the surprise round. |

#### Returns

`boolean`

***

### canBackstab()

```ts
function canBackstab(
   isBackstabTriggered: boolean, 
   classId: string, 
   targetHasAnatomy?: boolean
): boolean;
```

Defined in: [data/skills/enabling-skills.ts:230](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L230)

Check if the preconditions for a backstab attempt are met.

The *trigger* (RAW: behind or unaware) is intentionally a boolean
the caller computes — typically via `isBackstabTriggeredRaw` for
stock rules, or by OR-ing the RAW trigger with any extension-supplied
conditions (magic item, spell effect, homebrew class ability).

This function owns the class and anatomy gates, which an extension
should not be able to bypass:
 - Only thieves have backstab.
 - Target must have clear anatomical vulnerabilities (oozes,
   elementals, and amorphous monsters typically do not).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `isBackstabTriggered` | `boolean` | `undefined` | Whether the in-world trigger conditions are met (RAW: behind or unaware; or any extension's equivalent). |
| `classId` | `string` | `undefined` | The attacker's class. |
| `targetHasAnatomy?` | `boolean` | `true` | Whether the target has clear anatomical vulnerabilities. Defaults to true for callers that don't yet thread monster anatomy data. |

#### Returns

`boolean`

***

### hasTwoWeaponFighting()

```ts
function hasTwoWeaponFighting(classId: string): boolean;
```

Defined in: [data/skills/enabling-skills.ts:274](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L274)

Check if a character has two-weapon fighting capability

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |

#### Returns

`boolean`

***

### getTwoWeaponAttackPenalty()

```ts
function getTwoWeaponAttackPenalty(classId: string): number;
```

Defined in: [data/skills/enabling-skills.ts:281](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L281)

Get the two-weapon fighting attack penalty from skill definition

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |

#### Returns

`number`

***

### getTwoWeaponInitBonus()

```ts
function getTwoWeaponInitBonus(classId: string): number;
```

Defined in: [data/skills/enabling-skills.ts:298](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L298)

Get the initiative bonus for two-weapon fighting from skill definition

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |

#### Returns

`number`

***

### canRecoverLuck()

```ts
function canRecoverLuck(classId: string): boolean;
```

Defined in: [data/skills/enabling-skills.ts:347](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L347)

Check if a character can recover luck

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |

#### Returns

`boolean`

***

### getHalflingDailyLuckRecovery()

```ts
function getHalflingDailyLuckRecovery(): number;
```

Defined in: [data/skills/enabling-skills.ts:354](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L354)

Get daily luck recovery amount for halflings from skill definition

#### Returns

`number`

***

### thiefShouldRecoverLuck()

```ts
function thiefShouldRecoverLuck(naturalRoll: number, isThiefSkill: boolean): boolean;
```

Defined in: [data/skills/enabling-skills.ts:368](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L368)

Check if a thief should recover luck (on natural 20 of thief skill)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `naturalRoll` | `number` |
| `isThiefSkill` | `boolean` |

#### Returns

`boolean`

***

### canShareLuck()

```ts
function canShareLuck(classId: string, distanceToAlly: number): boolean;
```

Defined in: [data/skills/enabling-skills.ts:404](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L404)

Check if a halfling can share luck with an ally

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |
| `distanceToAlly` | `number` |

#### Returns

`boolean`

***

### getEnablingSkillsForClass()

```ts
function getEnablingSkillsForClass(classId: string): SkillDefinition[];
```

Defined in: [data/skills/enabling-skills.ts:441](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L441)

Get all enabling skills for a given class

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |

#### Returns

[`SkillDefinition`](types.md#skilldefinition)[]

***

### classHasEnablingSkill()

```ts
function classHasEnablingSkill(classId: string, skillId: string): boolean;
```

Defined in: [data/skills/enabling-skills.ts:450](https://github.com/moonloch/dcc-core-lib/blob/main/src/data/skills/enabling-skills.ts#L450)

Check if a class has a specific enabling skill

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classId` | `string` |
| `skillId` | `string` |

#### Returns

`boolean`
