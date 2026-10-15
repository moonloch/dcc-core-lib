# character

## Interfaces

### ACBonus

Defined in: [character/armor-class.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L43)

Simple AC bonus for spell effects, magic items, etc.

This is a simplified type compared to RollBonus since AC
bonuses are always flat modifiers.

#### Properties

##### value

```ts
value: number;
```

Defined in: [character/armor-class.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L45)

Numeric value to add to AC

##### source?

```ts
optional source?: {
  name: string;
  category?: string;
};
```

Defined in: [character/armor-class.ts:48](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L48)

Source information for display

###### name

```ts
name: string;
```

Source name (e.g., "Mage Armor", "Ring of Protection")

###### category?

```ts
optional category?: string;
```

Optional category (for UI grouping)

***

### ACInput

Defined in: [character/armor-class.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L64)

Input for calculating armor class

#### Properties

##### agilityModifier

```ts
agilityModifier: number;
```

Defined in: [character/armor-class.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L66)

Agility modifier

##### armor?

```ts
optional armor?: ArmorStats;
```

Defined in: [character/armor-class.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L69)

Equipped armor (optional - unarmored if not provided)

##### shield?

```ts
optional shield?: ShieldStats;
```

Defined in: [character/armor-class.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L72)

Equipped shield (optional)

##### bonuses?

```ts
optional bonuses?: ACBonus[];
```

Defined in: [character/armor-class.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L75)

Additional bonuses (spells, magic items, etc.)

***

### ACResult

Defined in: [character/armor-class.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L81)

Result of AC calculation with breakdown

#### Properties

##### total

```ts
total: number;
```

Defined in: [character/armor-class.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L83)

Final AC value

##### base

```ts
base: number;
```

Defined in: [character/armor-class.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L86)

Base AC (10)

##### agilityBonus

```ts
agilityBonus: number;
```

Defined in: [character/armor-class.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L89)

Agility modifier contribution

##### armorBonus

```ts
armorBonus: number;
```

Defined in: [character/armor-class.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L92)

Armor contribution (if any)

##### shieldBonus

```ts
shieldBonus: number;
```

Defined in: [character/armor-class.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L95)

Shield contribution (if any)

##### otherBonuses

```ts
otherBonuses: number;
```

Defined in: [character/armor-class.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L98)

Other bonuses (magic, spells, etc.)

##### breakdown

```ts
breakdown: ACBreakdown[];
```

Defined in: [character/armor-class.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L101)

Breakdown of all components

***

### ACBreakdown

Defined in: [character/armor-class.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L107)

Single component of AC calculation

#### Properties

##### source

```ts
source: string;
```

Defined in: [character/armor-class.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L109)

Source of the bonus

##### value

```ts
value: number;
```

Defined in: [character/armor-class.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L112)

Value contributed

***

### OccupationEntry

Defined in: [character/create.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L51)

An occupation entry from the occupation table.

#### Properties

##### roll

```ts
roll: string | number;
```

Defined in: [character/create.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L53)

Roll value or range (e.g., 1, or "1-2")

##### name

```ts
name: string;
```

Defined in: [character/create.ts:56](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L56)

Occupation name

##### trainedWeapon

```ts
trainedWeapon: string;
```

Defined in: [character/create.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L59)

Trained weapon

##### tradeGoods

```ts
tradeGoods: string;
```

Defined in: [character/create.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L62)

Trade goods

##### startingFunds?

```ts
optional startingFunds?: number;
```

Defined in: [character/create.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L65)

Starting funds (in copper pieces)

##### isFarmer?

```ts
optional isFarmer?: boolean;
```

Defined in: [character/create.ts:68](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L68)

Whether this is a farmer (gets additional trade goods)

##### notes?

```ts
optional notes?: string;
```

Defined in: [character/create.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L71)

Special notes

***

### CharacterCreationData

Defined in: [character/create.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L78)

Data required for character creation.
Injected to keep functions pure and testable.

#### Properties

##### occupations

```ts
occupations: OccupationEntry[];
```

Defined in: [character/create.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L80)

Occupation entries to roll/select from

##### birthAugurs

```ts
birthAugurs: BirthAugurEntry[];
```

Defined in: [character/create.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L83)

Birth augur entries to roll/select from

##### customDiceMethods?

```ts
optional customDiceMethods?: Record<string, DiceMethodDefinition>;
```

Defined in: [character/create.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L86)

Custom dice methods (if using method: "custom" with string ID)

##### customHPMethods?

```ts
optional customHPMethods?: Record<string, HPMethodDefinition>;
```

Defined in: [character/create.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L89)

Custom HP methods (if using method: "custom" with string ID)

##### nameData?

```ts
optional nameData?: NameGenerationData;
```

Defined in: [character/create.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L92)

Name generation data (defaults to DEFAULT_NAME_DATA if not provided)

***

### CharacterCreationResult

Defined in: [character/create.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L98)

Result of character creation, including the character and metadata.

#### Properties

##### character

```ts
character: Character;
```

Defined in: [character/create.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L100)

The created character

##### rolls

```ts
rolls: {
  abilityRolls: {
     ability: DCCAbilityId;
     rolls: number[];
     kept: number[];
     total: number;
  }[];
  birthAugurRoll: number;
  occupationRoll: number;
  hpRoll: number;
};
```

Defined in: [character/create.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L103)

Metadata about the creation process

###### abilityRolls

```ts
abilityRolls: {
  ability: DCCAbilityId;
  rolls: number[];
  kept: number[];
  total: number;
}[];
```

Individual ability score rolls

###### birthAugurRoll

```ts
birthAugurRoll: number;
```

Birth augur roll (1-30)

###### occupationRoll

```ts
occupationRoll: number;
```

Occupation roll

###### hpRoll

```ts
hpRoll: number;
```

HP roll

***

### XPThresholds

Defined in: [character/level-up.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L53)

XP thresholds for a single class (XP needed to reach each level)

Index 0 = XP to reach level 1 (from 0-level)
Index 1 = XP to reach level 2
...
Index 9 = XP to reach level 10

#### Properties

##### classId

```ts
classId: string;
```

Defined in: [character/level-up.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L55)

Class ID this threshold applies to

##### thresholds

```ts
thresholds: number[];
```

Defined in: [character/level-up.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L58)

XP needed to reach each level (index 0 = level 1)

***

### LevelUpResult

Defined in: [character/level-up.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L64)

Result of a level-up operation

#### Properties

##### success

```ts
success: boolean;
```

Defined in: [character/level-up.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L66)

Whether the level-up was successful

##### error?

```ts
optional error?: string;
```

Defined in: [character/level-up.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L69)

Error message if not successful

##### character?

```ts
optional character?: Character;
```

Defined in: [character/level-up.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L72)

The updated character (if successful)

##### changes?

```ts
optional changes?: LevelUpChanges;
```

Defined in: [character/level-up.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L75)

Details about what changed

***

### LevelUpChanges

Defined in: [character/level-up.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L81)

Details of what changed during level-up

#### Properties

##### previousLevel

```ts
previousLevel: number;
```

Defined in: [character/level-up.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L83)

Previous level

##### newLevel

```ts
newLevel: number;
```

Defined in: [character/level-up.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L86)

New level

##### hpRolled

```ts
hpRolled: number;
```

Defined in: [character/level-up.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L89)

HP rolled for this level

##### hpGained

```ts
hpGained: number;
```

Defined in: [character/level-up.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L92)

HP gained (after modifiers, minimum 1)

##### newTitle?

```ts
optional newTitle?: string;
```

Defined in: [character/level-up.ts:95](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L95)

New title (if any)

##### newSaves

```ts
newSaves: {
  reflex: number;
  fortitude: number;
  will: number;
};
```

Defined in: [character/level-up.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L98)

New save bonuses

###### reflex

```ts
reflex: number;
```

###### fortitude

```ts
fortitude: number;
```

###### will

```ts
will: number;
```

##### newAttackBonus

```ts
newAttackBonus: string | number;
```

Defined in: [character/level-up.ts:105](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L105)

New attack bonus

##### newActionDice

```ts
newActionDice: string[];
```

Defined in: [character/level-up.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L108)

New action dice

##### newCritData

```ts
newCritData: {
  die: string;
  table: string;
  range?: number;
};
```

Defined in: [character/level-up.ts:111](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L111)

New crit data

###### die

```ts
die: string;
```

###### table

```ts
table: string;
```

###### range?

```ts
optional range?: number;
```

***

### HPRollResult

Defined in: [character/level-up.ts:294](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L294)

Result of rolling HP for a level

#### Properties

##### rolled

```ts
rolled: number;
```

Defined in: [character/level-up.ts:296](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L296)

Raw die result

##### gained

```ts
gained: number;
```

Defined in: [character/level-up.ts:299](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L299)

HP actually gained (after minimum 1 rule)

##### staminaModifier

```ts
staminaModifier: number;
```

Defined in: [character/level-up.ts:302](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L302)

Stamina modifier applied

##### die

```ts
die: string;
```

Defined in: [character/level-up.ts:305](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L305)

Die that was rolled

***

### SaveCalculationInput

Defined in: [character/saving-throws.ts:32](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L32)

Input for calculating saving throws

#### Properties

##### classId?

```ts
optional classId?: string;
```

Defined in: [character/saving-throws.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L34)

Class ID (undefined for 0-level)

##### level

```ts
level: number;
```

Defined in: [character/saving-throws.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L37)

Character level (0 for 0-level)

##### abilities

```ts
abilities: AbilityScores;
```

Defined in: [character/saving-throws.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L40)

Current ability scores

***

### SaveBreakdown

Defined in: [character/saving-throws.ts:46](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L46)

Detailed breakdown of a saving throw calculation

#### Properties

##### total

```ts
total: number;
```

Defined in: [character/saving-throws.ts:48](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L48)

Total save bonus

##### classBonus

```ts
classBonus: number;
```

Defined in: [character/saving-throws.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L51)

Base bonus from class/level

##### abilityModifier

```ts
abilityModifier: number;
```

Defined in: [character/saving-throws.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L54)

Bonus from ability modifier

##### ability

```ts
ability: "agl" | "sta" | "per";
```

Defined in: [character/saving-throws.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L57)

Which ability affects this save

***

### SaveBreakdowns

Defined in: [character/saving-throws.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L63)

Complete save breakdown for all three saves

#### Properties

##### reflex

```ts
reflex: SaveBreakdown;
```

Defined in: [character/saving-throws.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L64)

##### fortitude

```ts
fortitude: SaveBreakdown;
```

Defined in: [character/saving-throws.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L65)

##### will

```ts
will: SaveBreakdown;
```

Defined in: [character/saving-throws.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L66)

***

### ExportedCharacter

Defined in: [character/serialize.ts:22](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L22)

Exported character wrapper with metadata.

#### Properties

##### version

```ts
version: string;
```

Defined in: [character/serialize.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L24)

Format version for compatibility checking

##### format

```ts
format: "dcc-core-lib";
```

Defined in: [character/serialize.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L27)

Format identifier

##### exportedAt

```ts
exportedAt: string;
```

Defined in: [character/serialize.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L30)

Export timestamp (ISO 8601)

##### character

```ts
character: Character;
```

Defined in: [character/serialize.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L33)

The character data

***

### ExportOptions

Defined in: [character/serialize.ts:39](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L39)

Options for character export.

#### Properties

##### pretty?

```ts
optional pretty?: boolean;
```

Defined in: [character/serialize.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L41)

Pretty print with indentation (default: true)

##### indent?

```ts
optional indent?: number;
```

Defined in: [character/serialize.ts:44](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L44)

Indentation spaces when pretty printing (default: 2)

***

### ImportResult

Defined in: [character/serialize.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L91)

Result of importing a character.

#### Properties

##### success

```ts
success: boolean;
```

Defined in: [character/serialize.ts:93](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L93)

Whether the import was successful

##### character?

```ts
optional character?: Character;
```

Defined in: [character/serialize.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L96)

The imported character (if successful)

##### error?

```ts
optional error?: string;
```

Defined in: [character/serialize.ts:99](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L99)

Error message (if failed)

##### warnings?

```ts
optional warnings?: string[];
```

Defined in: [character/serialize.ts:102](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L102)

Warnings about the import (e.g., version mismatch)

***

### PeekResult

Defined in: [character/serialize.ts:249](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L249)

Result of peeking at exported character metadata.

#### Properties

##### valid

```ts
valid: boolean;
```

Defined in: [character/serialize.ts:250](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L250)

##### version?

```ts
optional version?: string;
```

Defined in: [character/serialize.ts:251](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L251)

##### format?

```ts
optional format?: string;
```

Defined in: [character/serialize.ts:252](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L252)

##### exportedAt?

```ts
optional exportedAt?: string;
```

Defined in: [character/serialize.ts:253](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L253)

##### characterName?

```ts
optional characterName?: string;
```

Defined in: [character/serialize.ts:254](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L254)

##### occupation?

```ts
optional occupation?: string;
```

Defined in: [character/serialize.ts:255](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L255)

##### error?

```ts
optional error?: string;
```

Defined in: [character/serialize.ts:256](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L256)

## Variables

### CHARACTER\_FORMAT\_VERSION

```ts
const CHARACTER_FORMAT_VERSION: "1.1" = "1.1";
```

Defined in: [character/serialize.ts:17](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L17)

Current export format version.
Increment when making breaking changes to the format.

1.1 — dropped `ThiefState.backstabMultiplier` (DCC backstab is
      auto-crit + Table 1-9 attack bonus, not a damage multiplier).
      Legacy imports are migrated automatically on read.

## Functions

### calculateAC()

```ts
function calculateAC(input: ACInput): ACResult;
```

Defined in: [character/armor-class.ts:152](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L152)

Calculate total armor class

AC = Base (10) + Agility Mod + Armor Bonus + Shield Bonus + Other Bonuses

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`ACInput`](#acinput) | AC calculation input |

#### Returns

[`ACResult`](#acresult)

AC result with breakdown

#### Examples

```ts
// Unarmored with good agility
const ac = calculateAC({ agilityModifier: 2 });
// ac.total = 12 (10 + 2)
```

```ts
// Chainmail and shield with average agility
const ac = calculateAC({
  agilityModifier: 0,
  armor: createArmorStats("chainmail"),
  shield: { name: "Shield", acBonus: 1 },
});
// ac.total = 16 (10 + 0 + 5 + 1)
```

```ts
// Magic armor with penalties
const ac = calculateAC({
  agilityModifier: -1,
  armor: {
    ...createArmorStats("leather"),
    magicBonus: 2, // +2 leather armor
  },
});
// ac.total = 13 (10 - 1 + 2 + 2)
```

***

### calculateSimpleAC()

```ts
function calculateSimpleAC(
   agilityModifier: number, 
   armorType?: ArmorType, 
   hasShield?: boolean
): number;
```

Defined in: [character/armor-class.ts:238](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L238)

Calculate AC with just the basics (no bonus system)

Simple version for quick calculations.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `agilityModifier` | `number` | `undefined` | Agility modifier |
| `armorType?` | [`ArmorType`](types.md#armortype) | `"unarmored"` | Type of armor worn |
| `hasShield?` | `boolean` | `false` | Whether carrying a shield |

#### Returns

`number`

Total AC

#### Example

```ts
const ac = calculateSimpleAC(2, "leather", true);
// ac = 15 (10 + 2 + 2 + 1)
```

***

### createArmorStats()

```ts
function createArmorStats(type: ArmorType, name?: string): ArmorStats;
```

Defined in: [character/armor-class.ts:266](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L266)

Create armor stats from armor type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`ArmorType`](types.md#armortype) | Armor type |
| `name?` | `string` | Optional custom name |

#### Returns

[`ArmorStats`](types.md#armorstats)

ArmorStats with all derived values

#### Example

```ts
const chainmail = createArmorStats("chainmail");
// Returns: { name: "Chainmail", type: "chainmail", acBonus: 5, ... }
```

***

### createMagicArmorStats()

```ts
function createMagicArmorStats(
   type: ArmorType, 
   magicBonus: number, 
   name?: string
): ArmorStats;
```

Defined in: [character/armor-class.ts:294](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L294)

Create magic armor stats

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`ArmorType`](types.md#armortype) | Base armor type |
| `magicBonus` | `number` | Magic bonus (e.g., +1, +2) |
| `name?` | `string` | Optional custom name |

#### Returns

[`ArmorStats`](types.md#armorstats)

ArmorStats with magic bonus

#### Example

```ts
const magicChainmail = createMagicArmorStats("chainmail", 2);
// +2 chainmail with reduced penalties
```

***

### createShieldStats()

```ts
function createShieldStats(name?: string, magicBonus?: number): ShieldStats;
```

Defined in: [character/armor-class.ts:319](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L319)

Create shield stats

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `name?` | `string` | `"Shield"` | Shield name |
| `magicBonus?` | `number` | `undefined` | Optional magic bonus |

#### Returns

[`ShieldStats`](types.md#shieldstats)

ShieldStats

***

### getArmorACBonus()

```ts
function getArmorACBonus(type: ArmorType): number;
```

Defined in: [character/armor-class.ts:364](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L364)

Get AC bonus for armor type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`ArmorType`](types.md#armortype) | Armor type |

#### Returns

`number`

AC bonus

***

### getArmorDetails()

```ts
function getArmorDetails(type: ArmorType): {
  acBonus: number;
  checkPenalty: number;
  speedPenalty: number;
  fumbleDie: `d${number}`;
};
```

Defined in: [character/armor-class.ts:374](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L374)

Get all armor stats for an armor type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | [`ArmorType`](types.md#armortype) | Armor type |

#### Returns

```ts
{
  acBonus: number;
  checkPenalty: number;
  speedPenalty: number;
  fumbleDie: `d${number}`;
}
```

Object with all armor-related values

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `acBonus` | `number` | [character/armor-class.ts:375](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L375) |
| `checkPenalty` | `number` | [character/armor-class.ts:376](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L376) |
| `speedPenalty` | `number` | [character/armor-class.ts:377](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L377) |
| `fumbleDie` | `` `d${number}` `` | [character/armor-class.ts:378](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L378) |

***

### getAllArmorStats()

```ts
function getAllArmorStats(): {
  type: ArmorType;
  name: string;
  acBonus: number;
  checkPenalty: number;
  speedPenalty: number;
  fumbleDie: `d${number}`;
}[];
```

Defined in: [character/armor-class.ts:391](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/armor-class.ts#L391)

List all armor types with their stats

#### Returns

\{
  `type`: [`ArmorType`](types.md#armortype);
  `name`: `string`;
  `acBonus`: `number`;
  `checkPenalty`: `number`;
  `speedPenalty`: `number`;
  `fumbleDie`: `` `d${number}` ``;
\}[]

***

### rollAbilityScores()

```ts
function rollAbilityScores(
   config: AbilityScoreConfig, 
   random: RandomSource, 
   customMethods?: Record<string, DiceMethodDefinition>
): {
  scores: AbilityScores;
  rolls: {
     ability: DCCAbilityId;
     rolls: number[];
     kept: number[];
     total: number;
  }[];
};
```

Defined in: [character/create.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L142)

Roll ability scores using the specified method.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`AbilityScoreConfig`](types.md#abilityscoreconfig) |
| `random` | [`RandomSource`](types.md#randomsource) |
| `customMethods?` | `Record`\<`string`, [`DiceMethodDefinition`](types.md#dicemethoddefinition)\> |

#### Returns

```ts
{
  scores: AbilityScores;
  rolls: {
     ability: DCCAbilityId;
     rolls: number[];
     kept: number[];
     total: number;
  }[];
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `scores` | [`AbilityScores`](types.md#abilityscores-1) | [character/create.ts:147](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L147) |
| `rolls` | \{ `ability`: [`DCCAbilityId`](types.md#dccabilityid); `rolls`: `number`[]; `kept`: `number`[]; `total`: `number`; \}[] | [character/create.ts:148](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L148) |

***

### checkAbilityModifierConstraints()

```ts
function checkAbilityModifierConstraints(scores: AbilityScores, config: AbilityScoreConfig): boolean;
```

Defined in: [character/create.ts:270](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L270)

Check if ability scores meet the minimum/maximum total modifier constraints.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `scores` | [`AbilityScores`](types.md#abilityscores-1) |
| `config` | [`AbilityScoreConfig`](types.md#abilityscoreconfig) |

#### Returns

`boolean`

***

### rollZeroLevelHP()

```ts
function rollZeroLevelHP(
   config: HitPointConfig, 
   staminaScore: number, 
   random: RandomSource, 
   customMethods?: Record<string, HPMethodDefinition>
): {
  hp: number;
  roll: number;
};
```

Defined in: [character/create.ts:307](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L307)

Roll hit points for a 0-level character.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`HitPointConfig`](types.md#hitpointconfig) |
| `staminaScore` | `number` |
| `random` | [`RandomSource`](types.md#randomsource) |
| `customMethods?` | `Record`\<`string`, [`HPMethodDefinition`](types.md#hpmethoddefinition)\> |

#### Returns

```ts
{
  hp: number;
  roll: number;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `hp` | `number` | [character/create.ts:312](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L312) |
| `roll` | `number` | [character/create.ts:312](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L312) |

***

### selectBirthAugur()

```ts
function selectBirthAugur(
   config: BirthAugurConfig, 
   augurs: BirthAugurEntry[], 
   random: RandomSource
): {
  augur: BirthAugur;
  roll: number;
};
```

Defined in: [character/create.ts:398](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L398)

Select or roll a birth augur.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config` | [`BirthAugurConfig`](types.md#birthaugurconfig) |
| `augurs` | [`BirthAugurEntry`](types.md#birthaugurentry)[] |
| `random` | [`RandomSource`](types.md#randomsource) |

#### Returns

```ts
{
  augur: BirthAugur;
  roll: number;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `augur` | [`BirthAugur`](types.md#birthaugur-1) | [character/create.ts:402](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L402) |
| `roll` | `number` | [character/create.ts:402](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L402) |

***

### calculateLuckySignBonus()

```ts
function calculateLuckySignBonus(luckModifier: number, mode: LuckySignMode): number;
```

Defined in: [character/create.ts:437](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L437)

Calculate the effective luck modifier based on the lucky sign mode.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `luckModifier` | `number` |
| `mode` | [`LuckySignMode`](types.md#luckysignmode) |

#### Returns

`number`

***

### selectOccupation()

```ts
function selectOccupation(
   occupations: OccupationEntry[], 
   specificOccupation: string | undefined, 
   random: RandomSource
): {
  occupation: OccupationEntry;
  roll: number;
};
```

Defined in: [character/create.ts:473](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L473)

Select or roll an occupation.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `occupations` | [`OccupationEntry`](#occupationentry)[] |
| `specificOccupation` | `string` \| `undefined` |
| `random` | [`RandomSource`](types.md#randomsource) |

#### Returns

```ts
{
  occupation: OccupationEntry;
  roll: number;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `occupation` | [`OccupationEntry`](#occupationentry) | [character/create.ts:477](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L477) |
| `roll` | `number` | [character/create.ts:477](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L477) |

***

### createZeroLevelCharacter()

```ts
function createZeroLevelCharacter(
   data: CharacterCreationData, 
   config?: CharacterCreationConfig, 
   random?: RandomSource
): CharacterCreationResult;
```

Defined in: [character/create.ts:526](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/create.ts#L526)

Create a new 0-level character.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `data` | [`CharacterCreationData`](#charactercreationdata) | `undefined` | Required data (occupations, birth augurs) |
| `config?` | [`CharacterCreationConfig`](types.md#charactercreationconfig) | `undefined` | Optional creation configuration (defaults to standard DCC rules) |
| `random?` | [`RandomSource`](types.md#randomsource) | `defaultRandomSource` | Optional random source (defaults to Math.random) |

#### Returns

[`CharacterCreationResult`](#charactercreationresult)

The created character and roll metadata

***

### calculateMaxHP()

```ts
function calculateMaxHP(character: Character): number;
```

Defined in: [character/hit-points.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L41)

Calculate max HP from roll history with current stamina modifier

If no history is available, returns the current max HP unchanged.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to calculate HP for |

#### Returns

`number`

Calculated max HP based on history and current stamina

#### Example

```typescript
const maxHP = calculateMaxHP(character);
```

***

### recalculateHP()

```ts
function recalculateHP(character: Character): Character;
```

Defined in: [character/hit-points.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L78)

Recalculate character HP based on history and current stamina

Returns a new character with updated HP values. If stamina has changed,
this will adjust max HP accordingly. Current HP is adjusted proportionally.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to recalculate HP for |

#### Returns

[`Character`](types.md#character)

New character with recalculated HP

#### Example

```typescript
// After stamina damage heals
const updated = recalculateHP(character);
```

***

### estimateMaxHP()

```ts
function estimateMaxHP(
   classId: string | undefined, 
   level: number, 
   staminaModifier: number
): number;
```

Defined in: [character/hit-points.ts:133](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L133)

Estimate expected max HP for a character of given class and level

Uses average die rolls. Useful for NPC generation or validation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` \| `undefined` | Class ID (for hit die lookup) |
| `level` | `number` | Character level (0 for 0-level) |
| `staminaModifier` | `number` | Stamina modifier to apply per level |

#### Returns

`number`

Estimated max HP

#### Example

```typescript
// Expected HP for level 5 warrior with +2 STA mod
const hp = estimateMaxHP("warrior", 5, 2); // ~45 HP
```

***

### calculateMinimumHP()

```ts
function calculateMinimumHP(level: number): number;
```

Defined in: [character/hit-points.ts:170](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L170)

Calculate minimum possible HP for a character

Assumes minimum rolls on all dice. Useful for validation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `number` | Character level (0 for 0-level) |

#### Returns

`number`

Minimum possible HP (at least 1 per level)

***

### calculateMaximumHP()

```ts
function calculateMaximumHP(
   classId: string | undefined, 
   level: number, 
   staminaModifier: number
): number;
```

Defined in: [character/hit-points.ts:185](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L185)

Calculate maximum possible HP for a character

Assumes maximum rolls on all dice with given stamina modifier.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` \| `undefined` | Class ID (for hit die lookup) |
| `level` | `number` | Character level (0 for 0-level) |
| `staminaModifier` | `number` | Stamina modifier to apply per level |

#### Returns

`number`

Maximum possible HP

***

### createHPRollRecord()

```ts
function createHPRollRecord(
   level: number, 
   die: string, 
   rolled: number, 
   staminaModifier: number
): HPRollRecord;
```

Defined in: [character/hit-points.ts:224](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L224)

Create an HP roll record for a level-up

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `number` | Level at which HP is being gained |
| `die` | `string` | Die being rolled |
| `rolled` | `number` | Raw die result |
| `staminaModifier` | `number` | Current stamina modifier |

#### Returns

[`HPRollRecord`](types.md#hprollrecord)

HP roll record

***

### addHPRollToHistory()

```ts
function addHPRollToHistory(character: Character, record: HPRollRecord): Character;
```

Defined in: [character/hit-points.ts:246](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L246)

Add an HP roll to a character's history

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to update |
| `record` | [`HPRollRecord`](types.md#hprollrecord) | HP roll record to add |

#### Returns

[`Character`](types.md#character)

Updated character with new HP history entry

***

### getTotalHPFromHistory()

```ts
function getTotalHPFromHistory(history: HPRollRecord[]): number;
```

Defined in: [character/hit-points.ts:270](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/hit-points.ts#L270)

Get total HP gained from history

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `history` | [`HPRollRecord`](types.md#hprollrecord)[] | HP roll history |

#### Returns

`number`

Total HP from all recorded rolls

***

### registerXPThresholds()

```ts
function registerXPThresholds(thresholds: XPThresholds): void;
```

Defined in: [character/level-up.ts:149](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L149)

Register XP thresholds for a class

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `thresholds` | [`XPThresholds`](#xpthresholds) | XP thresholds to register |

#### Returns

`void`

***

### registerAllXPThresholds()

```ts
function registerAllXPThresholds(thresholds: XPThresholds[]): void;
```

Defined in: [character/level-up.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L158)

Register multiple XP thresholds at once

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `thresholds` | [`XPThresholds`](#xpthresholds)[] | Array of XP thresholds to register |

#### Returns

`void`

***

### clearXPThresholds()

```ts
function clearXPThresholds(): void;
```

Defined in: [character/level-up.ts:167](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L167)

Clear all registered XP thresholds (for testing)

#### Returns

`void`

***

### getXPThresholds()

```ts
function getXPThresholds(classId: string): number[];
```

Defined in: [character/level-up.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L177)

Get XP thresholds for a class

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | Class ID |

#### Returns

`number`[]

XP thresholds, or default if not registered

***

### getXPForLevel()

```ts
function getXPForLevel(classId: string, level: number): number | undefined;
```

Defined in: [character/level-up.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L199)

Get XP required to reach a specific level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | Class ID |
| `level` | `number` | Target level (1-10) |

#### Returns

`number` \| `undefined`

XP required, or undefined if level out of range

#### Example

```ts
const xpForLevel5 = getXPForLevel("warrior", 5); // 290
```

***

### getXPForNextLevel()

```ts
function getXPForNextLevel(classId: string, currentLevel: number): number | undefined;
```

Defined in: [character/level-up.ts:215](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L215)

Get XP required for next level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | Class ID |
| `currentLevel` | `number` | Current level (0-9) |

#### Returns

`number` \| `undefined`

XP required for next level, or undefined if at max

***

### calculateLevelFromXP()

```ts
function calculateLevelFromXP(classId: string, xp: number): number;
```

Defined in: [character/level-up.ts:226](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L226)

Calculate what level a character should be based on XP

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | Class ID |
| `xp` | `number` | Current XP total |

#### Returns

`number`

Level the character should be (0-10)

***

### canLevelUp()

```ts
function canLevelUp(character: Character): boolean;
```

Defined in: [character/level-up.ts:245](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L245)

Check if a character can level up

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to check |

#### Returns

`boolean`

True if character has enough XP for next level

***

### getXPNeeded()

```ts
function getXPNeeded(character: Character): number | undefined;
```

Defined in: [character/level-up.ts:271](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L271)

Get how much XP is needed for next level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to check |

#### Returns

`number` \| `undefined`

XP needed, or undefined if at max level

***

### rollHPForLevel()

```ts
function rollHPForLevel(
   hitDie: `d${number}`, 
   staminaModifier: number, 
   random?: RandomSource
): HPRollResult;
```

Defined in: [character/level-up.ts:316](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L316)

Roll HP for a new level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `hitDie` | `` `d${number}` `` | The hit die to roll (e.g., "d8") |
| `staminaModifier` | `number` | Stamina modifier to add |
| `random?` | [`RandomSource`](types.md#randomsource) | Random source for rolling |

#### Returns

[`HPRollResult`](#hprollresult)

Object with roll result and final HP (minimum 1)

***

### levelUpFrom0()

```ts
function levelUpFrom0(
   character: Character, 
   classId: string, 
   random?: RandomSource
): LevelUpResult;
```

Defined in: [character/level-up.ts:364](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L364)

Level up a 0-level character to 1st level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The 0-level character |
| `classId` | `string` | The class to take |
| `random?` | [`RandomSource`](types.md#randomsource) | Random source for HP roll |

#### Returns

[`LevelUpResult`](#levelupresult)

Level-up result

***

### levelUp()

```ts
function levelUp(character: Character, random?: RandomSource): LevelUpResult;
```

Defined in: [character/level-up.ts:493](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L493)

Level up a character to the next level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to level up |
| `random?` | [`RandomSource`](types.md#randomsource) | Random source for HP roll |

#### Returns

[`LevelUpResult`](#levelupresult)

Level-up result

***

### addXP()

```ts
function addXP(character: Character, xp: number): Character;
```

Defined in: [character/level-up.ts:619](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/level-up.ts#L619)

Add XP to a character

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to update |
| `xp` | `number` | Amount of XP to add |

#### Returns

[`Character`](types.md#character)

Updated character

***

### calculateSavingThrows()

```ts
function calculateSavingThrows(character: Character): SavingThrows;
```

Defined in: [character/saving-throws.ts:85](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L85)

Calculate all saving throws for a character

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to calculate saves for |

#### Returns

[`SavingThrows`](types.md#savingthrows)

All three saving throw values

#### Example

```typescript
const saves = calculateSavingThrows(character);
console.log(saves.reflex, saves.fortitude, saves.will);
```

***

### calculateSavesFromInput()

```ts
function calculateSavesFromInput(input: SaveCalculationInput): SavingThrows;
```

Defined in: [character/saving-throws.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L96)

Calculate saving throws from raw input

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`SaveCalculationInput`](#savecalculationinput) | Save calculation input |

#### Returns

[`SavingThrows`](types.md#savingthrows)

All three saving throw values

***

### calculateSavingThrowsWithBreakdown()

```ts
function calculateSavingThrowsWithBreakdown(character: Character): SaveBreakdowns;
```

Defined in: [character/saving-throws.ts:119](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L119)

Calculate saving throws with detailed breakdown

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to calculate saves for |

#### Returns

[`SaveBreakdowns`](#savebreakdowns)

Breakdown of each save's components

#### Example

```typescript
const breakdown = calculateSavingThrowsWithBreakdown(character);
console.log(`Reflex: ${breakdown.reflex.classBonus} + ${breakdown.reflex.abilityModifier}`);
```

***

### calculateReflexSave()

```ts
function calculateReflexSave(character: Character): number;
```

Defined in: [character/saving-throws.ts:153](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L153)

Calculate Reflex save (Agility-based)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### calculateFortitudeSave()

```ts
function calculateFortitudeSave(character: Character): number;
```

Defined in: [character/saving-throws.ts:163](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L163)

Calculate Fortitude save (Stamina-based)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### calculateWillSave()

```ts
function calculateWillSave(character: Character): number;
```

Defined in: [character/saving-throws.ts:173](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L173)

Calculate Will save (Personality-based)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `character` | [`Character`](types.md#character) |

#### Returns

`number`

***

### recalculateSavingThrows()

```ts
function recalculateSavingThrows(character: Character): Character;
```

Defined in: [character/saving-throws.ts:193](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/saving-throws.ts#L193)

Recalculate and update a character's saving throws

Returns a new character with updated save values.
Use this after abilities change (spellburn, curse, etc.)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to update |

#### Returns

[`Character`](types.md#character)

New character with recalculated saves

***

### exportCharacter()

```ts
function exportCharacter(character: Character, options?: ExportOptions): string;
```

Defined in: [character/serialize.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L54)

Export a character to JSON string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to export |
| `options?` | [`ExportOptions`](#exportoptions) | Export options |

#### Returns

`string`

JSON string representation

***

### exportCharacterRaw()

```ts
function exportCharacterRaw(character: Character, options?: ExportOptions): string;
```

Defined in: [character/serialize.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L78)

Export just the character data without wrapper metadata.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character to export |
| `options?` | [`ExportOptions`](#exportoptions) | Export options |

#### Returns

`string`

JSON string of character data only

***

### importCharacter()

```ts
function importCharacter(json: string): ImportResult;
```

Defined in: [character/serialize.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L113)

Import a character from JSON string.

Accepts both wrapped format (with metadata) and raw character JSON.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `json` | `string` | JSON string to import |

#### Returns

[`ImportResult`](#importresult)

Import result with character or error

***

### peekExportedCharacter()

```ts
function peekExportedCharacter(json: string): PeekResult;
```

Defined in: [character/serialize.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/character/serialize.ts#L263)

Parse exported character metadata without importing the full character.
Useful for previewing before import.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `json` | `string` |

#### Returns

[`PeekResult`](#peekresult)

## References

### BASE\_AC

Re-exports [BASE_AC](types.md#base_ac)

***

### ARMOR\_AC\_BONUS

Re-exports [ARMOR_AC_BONUS](types.md#armor_ac_bonus)

***

### SHIELD\_AC\_BONUS

Re-exports [SHIELD_AC_BONUS](types.md#shield_ac_bonus)
