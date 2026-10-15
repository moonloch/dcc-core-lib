# parsers

## Interfaces

### ConvertOptions

Defined in: parsers/convert.ts:41

Options for conversion

#### Properties

##### generateId?

```ts
optional generateId?: () => string;
```

Defined in: parsers/convert.ts:46

Generate a unique ID for the character.
If not provided, a random UUID-like ID will be generated.

###### Returns

`string`

##### defaultName?

```ts
optional defaultName?: string;
```

Defined in: parsers/convert.ts:52

Default name if the character doesn't have one.
Purple Sorcerer doesn't generate names, so this is often needed.

##### defaultAlignment?

```ts
optional defaultAlignment?: Alignment;
```

Defined in: parsers/convert.ts:57

Default alignment for 0-level characters.

***

### PSGeneratorSettings

Defined in: parsers/purple-sorcerer-types.ts:18

Generator settings from the output header

#### Properties

##### source

```ts
source: string;
```

Defined in: parsers/purple-sorcerer-types.ts:19

##### rollMode

```ts
rollMode: string;
```

Defined in: parsers/purple-sorcerer-types.ts:20

##### hpMode

```ts
hpMode: string;
```

Defined in: parsers/purple-sorcerer-types.ts:21

##### hpUpMode?

```ts
optional hpUpMode?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:22

##### augurMode

```ts
augurMode: string;
```

Defined in: parsers/purple-sorcerer-types.ts:23

***

### PSAbilityScore

Defined in: parsers/purple-sorcerer-types.ts:29

Parsed ability score

#### Properties

##### score

```ts
score: number;
```

Defined in: parsers/purple-sorcerer-types.ts:30

##### modifier

```ts
modifier: number;
```

Defined in: parsers/purple-sorcerer-types.ts:31

***

### PSAbilityScores

Defined in: parsers/purple-sorcerer-types.ts:37

Parsed ability scores (all six)

#### Properties

##### strength

```ts
strength: PSAbilityScore;
```

Defined in: parsers/purple-sorcerer-types.ts:38

##### agility

```ts
agility: PSAbilityScore;
```

Defined in: parsers/purple-sorcerer-types.ts:39

##### stamina

```ts
stamina: PSAbilityScore;
```

Defined in: parsers/purple-sorcerer-types.ts:40

##### personality

```ts
personality: PSAbilityScore;
```

Defined in: parsers/purple-sorcerer-types.ts:41

##### intelligence

```ts
intelligence: PSAbilityScore;
```

Defined in: parsers/purple-sorcerer-types.ts:42

##### luck

```ts
luck: PSAbilityScore;
```

Defined in: parsers/purple-sorcerer-types.ts:43

***

### PSWeapon

Defined in: parsers/purple-sorcerer-types.ts:49

Parsed weapon data

#### Properties

##### name

```ts
name: string;
```

Defined in: parsers/purple-sorcerer-types.ts:50

##### type

```ts
type: "melee" | "ranged";
```

Defined in: parsers/purple-sorcerer-types.ts:51

##### attackMod

```ts
attackMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:52

##### damage

```ts
damage: string;
```

Defined in: parsers/purple-sorcerer-types.ts:53

##### magicBonus?

```ts
optional magicBonus?: number;
```

Defined in: parsers/purple-sorcerer-types.ts:54

***

### PSArmor

Defined in: parsers/purple-sorcerer-types.ts:60

Parsed armor data

#### Properties

##### name

```ts
name: string;
```

Defined in: parsers/purple-sorcerer-types.ts:61

##### acBonus

```ts
acBonus: number;
```

Defined in: parsers/purple-sorcerer-types.ts:62

##### checkPenalty

```ts
checkPenalty: number;
```

Defined in: parsers/purple-sorcerer-types.ts:63

##### fumbleDie

```ts
fumbleDie: `d${number}`;
```

Defined in: parsers/purple-sorcerer-types.ts:64

##### speedPenalty?

```ts
optional speedPenalty?: number;
```

Defined in: parsers/purple-sorcerer-types.ts:65

***

### PSThiefSkill

Defined in: parsers/purple-sorcerer-types.ts:71

Parsed thief skill

#### Properties

##### name

```ts
name: string;
```

Defined in: parsers/purple-sorcerer-types.ts:72

##### bonus

```ts
bonus: number;
```

Defined in: parsers/purple-sorcerer-types.ts:73

##### checkPenalty

```ts
checkPenalty: number;
```

Defined in: parsers/purple-sorcerer-types.ts:74

***

### PSSpell

Defined in: parsers/purple-sorcerer-types.ts:80

Parsed spell entry

#### Properties

##### level

```ts
level: number;
```

Defined in: parsers/purple-sorcerer-types.ts:81

##### name

```ts
name: string;
```

Defined in: parsers/purple-sorcerer-types.ts:82

***

### PSLuckySign

Defined in: parsers/purple-sorcerer-types.ts:88

Lucky sign / birth augur

#### Properties

##### name

```ts
name: string;
```

Defined in: parsers/purple-sorcerer-types.ts:89

##### effect

```ts
effect: string;
```

Defined in: parsers/purple-sorcerer-types.ts:90

##### modifier

```ts
modifier: number;
```

Defined in: parsers/purple-sorcerer-types.ts:91

***

### PSCharacter

Defined in: parsers/purple-sorcerer-types.ts:109

Complete parsed character from Purple Sorcerer

#### Properties

##### settings?

```ts
optional settings?: PSGeneratorSettings;
```

Defined in: parsers/purple-sorcerer-types.ts:111

##### occupation

```ts
occupation: string;
```

Defined in: parsers/purple-sorcerer-types.ts:114

##### alignment?

```ts
optional alignment?: Alignment;
```

Defined in: parsers/purple-sorcerer-types.ts:115

##### classType?

```ts
optional classType?: PSClassType;
```

Defined in: parsers/purple-sorcerer-types.ts:116

##### level

```ts
level: number;
```

Defined in: parsers/purple-sorcerer-types.ts:117

##### abilities

```ts
abilities: PSAbilityScores;
```

Defined in: parsers/purple-sorcerer-types.ts:120

##### ac

```ts
ac: number;
```

Defined in: parsers/purple-sorcerer-types.ts:123

##### hp

```ts
hp: number;
```

Defined in: parsers/purple-sorcerer-types.ts:124

##### speed

```ts
speed: number;
```

Defined in: parsers/purple-sorcerer-types.ts:125

##### initiative

```ts
initiative: number;
```

Defined in: parsers/purple-sorcerer-types.ts:126

##### reflex

```ts
reflex: number;
```

Defined in: parsers/purple-sorcerer-types.ts:129

##### fortitude

```ts
fortitude: number;
```

Defined in: parsers/purple-sorcerer-types.ts:130

##### will

```ts
will: number;
```

Defined in: parsers/purple-sorcerer-types.ts:131

##### baseAttackMod?

```ts
optional baseAttackMod?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:134

##### attackDice?

```ts
optional attackDice?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:135

##### critDie?

```ts
optional critDie?: `d${number}`;
```

Defined in: parsers/purple-sorcerer-types.ts:136

##### critTable?

```ts
optional critTable?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:137

##### occupationWeapon?

```ts
optional occupationWeapon?: PSWeapon;
```

Defined in: parsers/purple-sorcerer-types.ts:140

##### mainWeapon?

```ts
optional mainWeapon?: PSWeapon;
```

Defined in: parsers/purple-sorcerer-types.ts:141

##### secondaryWeapon?

```ts
optional secondaryWeapon?: PSWeapon;
```

Defined in: parsers/purple-sorcerer-types.ts:142

##### weapon?

```ts
optional weapon?: PSWeapon;
```

Defined in: parsers/purple-sorcerer-types.ts:144

##### armor?

```ts
optional armor?: PSArmor;
```

Defined in: parsers/purple-sorcerer-types.ts:147

##### equipment

```ts
equipment: string[];
```

Defined in: parsers/purple-sorcerer-types.ts:150

##### tradeGood?

```ts
optional tradeGood?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:151

##### startingFunds

```ts
startingFunds: string;
```

Defined in: parsers/purple-sorcerer-types.ts:152

##### luckySign?

```ts
optional luckySign?: PSLuckySign;
```

Defined in: parsers/purple-sorcerer-types.ts:155

##### languages

```ts
languages: string[];
```

Defined in: parsers/purple-sorcerer-types.ts:158

##### racialTraits?

```ts
optional racialTraits?: string[];
```

Defined in: parsers/purple-sorcerer-types.ts:161

##### classTrait?

```ts
optional classTrait?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:164

##### thiefSkills?

```ts
optional thiefSkills?: PSThiefSkill[];
```

Defined in: parsers/purple-sorcerer-types.ts:167

##### spells?

```ts
optional spells?: PSSpell[];
```

Defined in: parsers/purple-sorcerer-types.ts:170

##### spellCheck?

```ts
optional spellCheck?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:171

##### luckDie?

```ts
optional luckDie?: `d${number}`;
```

Defined in: parsers/purple-sorcerer-types.ts:174

##### castSpellFromScrollDie?

```ts
optional castSpellFromScrollDie?: `d${number}`;
```

Defined in: parsers/purple-sorcerer-types.ts:175

***

### PSJsonZeroLevel

Defined in: parsers/purple-sorcerer-types.ts:185

Raw character from Purple Sorcerer JSON format (0-level)

#### Properties

##### occTitle

```ts
occTitle: string;
```

Defined in: parsers/purple-sorcerer-types.ts:186

##### strengthScore

```ts
strengthScore: string;
```

Defined in: parsers/purple-sorcerer-types.ts:187

##### strengthMod

```ts
strengthMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:188

##### agilityScore

```ts
agilityScore: string;
```

Defined in: parsers/purple-sorcerer-types.ts:189

##### agilityMod

```ts
agilityMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:190

##### staminaScore

```ts
staminaScore: string;
```

Defined in: parsers/purple-sorcerer-types.ts:191

##### staminaMod

```ts
staminaMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:192

##### personalityScore

```ts
personalityScore: string;
```

Defined in: parsers/purple-sorcerer-types.ts:193

##### personalityMod

```ts
personalityMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:194

##### intelligenceScore

```ts
intelligenceScore: string;
```

Defined in: parsers/purple-sorcerer-types.ts:195

##### intelligenceMod

```ts
intelligenceMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:196

##### luckScore

```ts
luckScore: string;
```

Defined in: parsers/purple-sorcerer-types.ts:197

##### luckMod

```ts
luckMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:198

##### armorClass

```ts
armorClass: string;
```

Defined in: parsers/purple-sorcerer-types.ts:199

##### hitPoints

```ts
hitPoints: string;
```

Defined in: parsers/purple-sorcerer-types.ts:200

##### weapon

```ts
weapon: string;
```

Defined in: parsers/purple-sorcerer-types.ts:201

##### attackMod

```ts
attackMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:202

##### attackDamageMod

```ts
attackDamageMod: string;
```

Defined in: parsers/purple-sorcerer-types.ts:203

##### attackDamage

```ts
attackDamage: string;
```

Defined in: parsers/purple-sorcerer-types.ts:204

##### attackModMelee

```ts
attackModMelee: string;
```

Defined in: parsers/purple-sorcerer-types.ts:205

##### attackDamageMelee

```ts
attackDamageMelee: string;
```

Defined in: parsers/purple-sorcerer-types.ts:206

##### attackModRanged

```ts
attackModRanged: string;
```

Defined in: parsers/purple-sorcerer-types.ts:207

##### attackDamageRanged

```ts
attackDamageRanged: string;
```

Defined in: parsers/purple-sorcerer-types.ts:208

##### speed

```ts
speed: string;
```

Defined in: parsers/purple-sorcerer-types.ts:209

##### initiative

```ts
initiative: string;
```

Defined in: parsers/purple-sorcerer-types.ts:210

##### saveReflex

```ts
saveReflex: string;
```

Defined in: parsers/purple-sorcerer-types.ts:211

##### saveFort

```ts
saveFort: string;
```

Defined in: parsers/purple-sorcerer-types.ts:212

##### saveWill

```ts
saveWill: string;
```

Defined in: parsers/purple-sorcerer-types.ts:213

##### equipment

```ts
equipment: string;
```

Defined in: parsers/purple-sorcerer-types.ts:214

##### equipment2?

```ts
optional equipment2?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:215

##### equipment3?

```ts
optional equipment3?: string;
```

Defined in: parsers/purple-sorcerer-types.ts:216

##### tradeGood

```ts
tradeGood: string;
```

Defined in: parsers/purple-sorcerer-types.ts:217

##### startingFunds

```ts
startingFunds: string;
```

Defined in: parsers/purple-sorcerer-types.ts:218

##### luckySign

```ts
luckySign: string;
```

Defined in: parsers/purple-sorcerer-types.ts:219

##### languages

```ts
languages: string;
```

Defined in: parsers/purple-sorcerer-types.ts:220

##### racialTraits

```ts
racialTraits: string;
```

Defined in: parsers/purple-sorcerer-types.ts:221

***

### PSJsonCharacterList

Defined in: parsers/purple-sorcerer-types.ts:227

Container for multiple JSON characters

#### Properties

##### characters

```ts
characters: PSJsonZeroLevel[];
```

Defined in: parsers/purple-sorcerer-types.ts:228

***

### PSParseResult

Defined in: parsers/purple-sorcerer-types.ts:238

Result of parsing Purple Sorcerer data

#### Properties

##### success

```ts
success: boolean;
```

Defined in: parsers/purple-sorcerer-types.ts:239

##### characters

```ts
characters: PSCharacter[];
```

Defined in: parsers/purple-sorcerer-types.ts:240

##### errors

```ts
errors: string[];
```

Defined in: parsers/purple-sorcerer-types.ts:241

##### warnings

```ts
warnings: string[];
```

Defined in: parsers/purple-sorcerer-types.ts:242

***

### StatBlockParseResult

Defined in: parsers/statblock-types.ts:16

Result of parsing a stat block

#### Properties

##### success

```ts
success: boolean;
```

Defined in: parsers/statblock-types.ts:18

Whether parsing succeeded

##### creature?

```ts
optional creature?: Creature;
```

Defined in: parsers/statblock-types.ts:21

Parsed creature data (if successful)

##### error?

```ts
optional error?: string;
```

Defined in: parsers/statblock-types.ts:24

Error message (if failed)

##### warnings?

```ts
optional warnings?: string[];
```

Defined in: parsers/statblock-types.ts:27

Warnings about potentially incorrect parsing

##### original

```ts
original: string;
```

Defined in: parsers/statblock-types.ts:30

The original stat block text

***

### ParsedAttack

Defined in: parsers/statblock-types.ts:36

Intermediate parsed attack data before conversion

#### Properties

##### name

```ts
name: string;
```

Defined in: parsers/statblock-types.ts:38

Attack name

##### toHit

```ts
toHit: string;
```

Defined in: parsers/statblock-types.ts:41

Attack bonus as string (e.g., "+5", "-2")

##### melee

```ts
melee: boolean;
```

Defined in: parsers/statblock-types.ts:44

Whether this is a melee attack

##### damage

```ts
damage: string;
```

Defined in: parsers/statblock-types.ts:47

Damage expression

##### range?

```ts
optional range?: string;
```

Defined in: parsers/statblock-types.ts:50

Range for missile attacks

##### isSpecial?

```ts
optional isSpecial?: boolean;
```

Defined in: parsers/statblock-types.ts:53

Whether this is a special attack (see below, spell, etc.)

***

### ParsedStatBlock

Defined in: parsers/statblock-types.ts:59

Intermediate parsed stat block data

#### Properties

##### name

```ts
name: string;
```

Defined in: parsers/statblock-types.ts:61

Creature name

##### init

```ts
init: number;
```

Defined in: parsers/statblock-types.ts:64

Initiative modifier

##### attacks

```ts
attacks: ParsedAttack[];
```

Defined in: parsers/statblock-types.ts:67

Parsed attacks

##### ac

```ts
ac: number;
```

Defined in: parsers/statblock-types.ts:70

Armor Class

##### acNotes?

```ts
optional acNotes?: string;
```

Defined in: parsers/statblock-types.ts:73

AC notes (e.g., "scale mail")

##### hitDice

```ts
hitDice: string;
```

Defined in: parsers/statblock-types.ts:76

Hit Dice expression

##### speed

```ts
speed: CreatureSpeed;
```

Defined in: parsers/statblock-types.ts:79

Movement speeds

##### actionDice

```ts
actionDice: string;
```

Defined in: parsers/statblock-types.ts:82

Action dice expression

##### special?

```ts
optional special?: string;
```

Defined in: parsers/statblock-types.ts:85

Special abilities

##### saves

```ts
saves: CreatureSaves;
```

Defined in: parsers/statblock-types.ts:88

Saving throws

##### alignment

```ts
alignment: Alignment;
```

Defined in: parsers/statblock-types.ts:91

Alignment

##### critDie?

```ts
optional critDie?: string;
```

Defined in: parsers/statblock-types.ts:94

Crit die (if specified)

##### critTable?

```ts
optional critTable?: string;
```

Defined in: parsers/statblock-types.ts:97

Crit table (if specified)

##### critRange?

```ts
optional critRange?: string;
```

Defined in: parsers/statblock-types.ts:100

Crit range (if specified, e.g., "19-20", "20-24")

***

### StatBlockParseOptions

Defined in: parsers/statblock-types.ts:106

Options for stat block parsing

#### Properties

##### category?

```ts
optional category?: string;
```

Defined in: parsers/statblock-types.ts:108

Category to assign to parsed creature

##### id?

```ts
optional id?: string;
```

Defined in: parsers/statblock-types.ts:111

Custom ID to use (otherwise derived from name)

##### defaultHp?

```ts
optional defaultHp?: number;
```

Defined in: parsers/statblock-types.ts:114

Default HP if not calculable (uses average of HD)

##### defaultCritDie?

```ts
optional defaultCritDie?: string;
```

Defined in: parsers/statblock-types.ts:117

Default crit die if not specified in stat block

##### defaultCritTable?

```ts
optional defaultCritTable?: string;
```

Defined in: parsers/statblock-types.ts:120

Default crit table if not specified in stat block

## Type Aliases

### PSClassType

```ts
type PSClassType = "warrior" | "wizard" | "cleric" | "thief" | "dwarf" | "elf" | "halfling";
```

Defined in: parsers/purple-sorcerer-types.ts:97

Class type (lowercase, matches classId in the library)

## Functions

### convertPSCharacter()

```ts
function convertPSCharacter(ps: PSCharacter, options?: ConvertOptions): Character;
```

Defined in: parsers/convert.ts:460

Convert a parsed Purple Sorcerer character to the library's Character type

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ps` | [`PSCharacter`](#pscharacter) |
| `options?` | [`ConvertOptions`](#convertoptions) |

#### Returns

[`Character`](types.md#character)

***

### convertPSCharacters()

```ts
function convertPSCharacters(characters: PSCharacter[], options?: ConvertOptions): Character[];
```

Defined in: parsers/convert.ts:557

Convert multiple parsed characters

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `characters` | [`PSCharacter`](#pscharacter)[] |
| `options?` | [`ConvertOptions`](#convertoptions) |

#### Returns

[`Character`](types.md#character)[]

***

### parsePurpleSorcerer()

```ts
function parsePurpleSorcerer(input: string): PSParseResult;
```

Defined in: parsers/index.ts:85

Parse Purple Sorcerer data (auto-detects format)

Supports:
- Text format (copy-paste from Purple Sorcerer website)
- JSON format (export from Purple Sorcerer API)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | Text or JSON data from Purple Sorcerer |

#### Returns

[`PSParseResult`](#psparseresult)

Parse result with characters and any errors/warnings

***

### parsePurpleSorcererJson()

```ts
function parsePurpleSorcererJson(jsonString: string): PSParseResult;
```

Defined in: parsers/parse-json.ts:220

Parse Purple Sorcerer JSON format
Handles both single character and array of characters

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `jsonString` | `string` |

#### Returns

[`PSParseResult`](#psparseresult)

***

### parseStatBlock()

```ts
function parseStatBlock(statblock: string, options?: StatBlockParseOptions): StatBlockParseResult;
```

Defined in: parsers/parse-statblock.ts:38

Parse a DCC stat block string into a Creature object

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `statblock` | `string` | The stat block text to parse |
| `options?` | [`StatBlockParseOptions`](#statblockparseoptions) | Optional parsing configuration |

#### Returns

[`StatBlockParseResult`](#statblockparseresult)

Parse result with creature data or error

#### Example

```ts
parseStatBlock("Road Reaver: Init +1; Atk hooked blade +3 melee (1d7+1); AC 14; HD 1d10; MV 25'; Act 1d20; SV Fort +2, Ref +4, Will -1; AL C.")
```

***

### parseStatBlocks()

```ts
function parseStatBlocks(text: string, options?: StatBlockParseOptions): StatBlockParseResult[];
```

Defined in: parsers/parse-statblock.ts:73

Parse multiple stat blocks from text (separated by blank lines or double newlines)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |
| `options?` | [`StatBlockParseOptions`](#statblockparseoptions) |

#### Returns

[`StatBlockParseResult`](#statblockparseresult)[]

***

### parsePurpleSorcererText()

```ts
function parsePurpleSorcererText(text: string): PSParseResult;
```

Defined in: parsers/parse-text.ts:696

Parse Purple Sorcerer text format
Handles both single and multiple character outputs

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

[`PSParseResult`](#psparseresult)
