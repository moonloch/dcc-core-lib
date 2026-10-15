# parsers

## Interfaces

### ConvertOptions

Defined in: [parsers/convert.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/convert.ts#L41)

Options for conversion

#### Properties

##### generateId?

```ts
optional generateId?: () => string;
```

Defined in: [parsers/convert.ts:46](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/convert.ts#L46)

Generate a unique ID for the character.
If not provided, a random UUID-like ID will be generated.

###### Returns

`string`

##### defaultName?

```ts
optional defaultName?: string;
```

Defined in: [parsers/convert.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/convert.ts#L52)

Default name if the character doesn't have one.
Purple Sorcerer doesn't generate names, so this is often needed.

##### defaultAlignment?

```ts
optional defaultAlignment?: Alignment;
```

Defined in: [parsers/convert.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/convert.ts#L57)

Default alignment for 0-level characters.

***

### PSGeneratorSettings

Defined in: [parsers/purple-sorcerer-types.ts:18](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L18)

Generator settings from the output header

#### Properties

##### source

```ts
source: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:19](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L19)

##### rollMode

```ts
rollMode: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L20)

##### hpMode

```ts
hpMode: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L21)

##### hpUpMode?

```ts
optional hpUpMode?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:22](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L22)

##### augurMode

```ts
augurMode: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:23](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L23)

***

### PSAbilityScore

Defined in: [parsers/purple-sorcerer-types.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L29)

Parsed ability score

#### Properties

##### score

```ts
score: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L30)

##### modifier

```ts
modifier: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L31)

***

### PSAbilityScores

Defined in: [parsers/purple-sorcerer-types.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L37)

Parsed ability scores (all six)

#### Properties

##### strength

```ts
strength: PSAbilityScore;
```

Defined in: [parsers/purple-sorcerer-types.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L38)

##### agility

```ts
agility: PSAbilityScore;
```

Defined in: [parsers/purple-sorcerer-types.ts:39](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L39)

##### stamina

```ts
stamina: PSAbilityScore;
```

Defined in: [parsers/purple-sorcerer-types.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L40)

##### personality

```ts
personality: PSAbilityScore;
```

Defined in: [parsers/purple-sorcerer-types.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L41)

##### intelligence

```ts
intelligence: PSAbilityScore;
```

Defined in: [parsers/purple-sorcerer-types.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L42)

##### luck

```ts
luck: PSAbilityScore;
```

Defined in: [parsers/purple-sorcerer-types.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L43)

***

### PSWeapon

Defined in: [parsers/purple-sorcerer-types.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L49)

Parsed weapon data

#### Properties

##### name

```ts
name: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L50)

##### type

```ts
type: "melee" | "ranged";
```

Defined in: [parsers/purple-sorcerer-types.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L51)

##### attackMod

```ts
attackMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L52)

##### damage

```ts
damage: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L53)

##### magicBonus?

```ts
optional magicBonus?: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L54)

***

### PSArmor

Defined in: [parsers/purple-sorcerer-types.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L60)

Parsed armor data

#### Properties

##### name

```ts
name: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L61)

##### acBonus

```ts
acBonus: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L62)

##### checkPenalty

```ts
checkPenalty: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L63)

##### fumbleDie

```ts
fumbleDie: `d${number}`;
```

Defined in: [parsers/purple-sorcerer-types.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L64)

##### speedPenalty?

```ts
optional speedPenalty?: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:65](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L65)

***

### PSThiefSkill

Defined in: [parsers/purple-sorcerer-types.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L71)

Parsed thief skill

#### Properties

##### name

```ts
name: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L72)

##### bonus

```ts
bonus: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L73)

##### checkPenalty

```ts
checkPenalty: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L74)

***

### PSSpell

Defined in: [parsers/purple-sorcerer-types.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L80)

Parsed spell entry

#### Properties

##### level

```ts
level: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L81)

##### name

```ts
name: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:82](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L82)

***

### PSLuckySign

Defined in: [parsers/purple-sorcerer-types.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L88)

Lucky sign / birth augur

#### Properties

##### name

```ts
name: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L89)

##### effect

```ts
effect: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L90)

##### modifier

```ts
modifier: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L91)

***

### PSCharacter

Defined in: [parsers/purple-sorcerer-types.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L109)

Complete parsed character from Purple Sorcerer

#### Properties

##### settings?

```ts
optional settings?: PSGeneratorSettings;
```

Defined in: [parsers/purple-sorcerer-types.ts:111](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L111)

##### occupation

```ts
occupation: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L114)

##### alignment?

```ts
optional alignment?: Alignment;
```

Defined in: [parsers/purple-sorcerer-types.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L115)

##### classType?

```ts
optional classType?: PSClassType;
```

Defined in: [parsers/purple-sorcerer-types.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L116)

##### level

```ts
level: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L117)

##### abilities

```ts
abilities: PSAbilityScores;
```

Defined in: [parsers/purple-sorcerer-types.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L120)

##### ac

```ts
ac: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L123)

##### hp

```ts
hp: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L124)

##### speed

```ts
speed: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L125)

##### initiative

```ts
initiative: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L126)

##### reflex

```ts
reflex: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L129)

##### fortitude

```ts
fortitude: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:130](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L130)

##### will

```ts
will: number;
```

Defined in: [parsers/purple-sorcerer-types.ts:131](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L131)

##### baseAttackMod?

```ts
optional baseAttackMod?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:134](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L134)

##### attackDice?

```ts
optional attackDice?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L135)

##### critDie?

```ts
optional critDie?: `d${number}`;
```

Defined in: [parsers/purple-sorcerer-types.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L136)

##### critTable?

```ts
optional critTable?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L137)

##### occupationWeapon?

```ts
optional occupationWeapon?: PSWeapon;
```

Defined in: [parsers/purple-sorcerer-types.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L140)

##### mainWeapon?

```ts
optional mainWeapon?: PSWeapon;
```

Defined in: [parsers/purple-sorcerer-types.ts:141](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L141)

##### secondaryWeapon?

```ts
optional secondaryWeapon?: PSWeapon;
```

Defined in: [parsers/purple-sorcerer-types.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L142)

##### weapon?

```ts
optional weapon?: PSWeapon;
```

Defined in: [parsers/purple-sorcerer-types.ts:144](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L144)

##### armor?

```ts
optional armor?: PSArmor;
```

Defined in: [parsers/purple-sorcerer-types.ts:147](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L147)

##### equipment

```ts
equipment: string[];
```

Defined in: [parsers/purple-sorcerer-types.ts:150](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L150)

##### tradeGood?

```ts
optional tradeGood?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L151)

##### startingFunds

```ts
startingFunds: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:152](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L152)

##### luckySign?

```ts
optional luckySign?: PSLuckySign;
```

Defined in: [parsers/purple-sorcerer-types.ts:155](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L155)

##### languages

```ts
languages: string[];
```

Defined in: [parsers/purple-sorcerer-types.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L158)

##### racialTraits?

```ts
optional racialTraits?: string[];
```

Defined in: [parsers/purple-sorcerer-types.ts:161](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L161)

##### classTrait?

```ts
optional classTrait?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:164](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L164)

##### thiefSkills?

```ts
optional thiefSkills?: PSThiefSkill[];
```

Defined in: [parsers/purple-sorcerer-types.ts:167](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L167)

##### spells?

```ts
optional spells?: PSSpell[];
```

Defined in: [parsers/purple-sorcerer-types.ts:170](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L170)

##### spellCheck?

```ts
optional spellCheck?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:171](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L171)

##### luckDie?

```ts
optional luckDie?: `d${number}`;
```

Defined in: [parsers/purple-sorcerer-types.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L174)

##### castSpellFromScrollDie?

```ts
optional castSpellFromScrollDie?: `d${number}`;
```

Defined in: [parsers/purple-sorcerer-types.ts:175](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L175)

***

### PSJsonZeroLevel

Defined in: [parsers/purple-sorcerer-types.ts:185](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L185)

Raw character from Purple Sorcerer JSON format (0-level)

#### Properties

##### occTitle

```ts
occTitle: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:186](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L186)

##### strengthScore

```ts
strengthScore: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:187](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L187)

##### strengthMod

```ts
strengthMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:188](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L188)

##### agilityScore

```ts
agilityScore: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L189)

##### agilityMod

```ts
agilityMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:190](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L190)

##### staminaScore

```ts
staminaScore: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:191](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L191)

##### staminaMod

```ts
staminaMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:192](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L192)

##### personalityScore

```ts
personalityScore: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:193](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L193)

##### personalityMod

```ts
personalityMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L194)

##### intelligenceScore

```ts
intelligenceScore: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:195](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L195)

##### intelligenceMod

```ts
intelligenceMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:196](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L196)

##### luckScore

```ts
luckScore: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L197)

##### luckMod

```ts
luckMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:198](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L198)

##### armorClass

```ts
armorClass: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L199)

##### hitPoints

```ts
hitPoints: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:200](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L200)

##### weapon

```ts
weapon: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:201](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L201)

##### attackMod

```ts
attackMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:202](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L202)

##### attackDamageMod

```ts
attackDamageMod: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:203](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L203)

##### attackDamage

```ts
attackDamage: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:204](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L204)

##### attackModMelee

```ts
attackModMelee: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:205](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L205)

##### attackDamageMelee

```ts
attackDamageMelee: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:206](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L206)

##### attackModRanged

```ts
attackModRanged: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L207)

##### attackDamageRanged

```ts
attackDamageRanged: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:208](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L208)

##### speed

```ts
speed: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L209)

##### initiative

```ts
initiative: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:210](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L210)

##### saveReflex

```ts
saveReflex: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:211](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L211)

##### saveFort

```ts
saveFort: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:212](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L212)

##### saveWill

```ts
saveWill: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L213)

##### equipment

```ts
equipment: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:214](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L214)

##### equipment2?

```ts
optional equipment2?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:215](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L215)

##### equipment3?

```ts
optional equipment3?: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:216](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L216)

##### tradeGood

```ts
tradeGood: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:217](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L217)

##### startingFunds

```ts
startingFunds: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:218](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L218)

##### luckySign

```ts
luckySign: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L219)

##### languages

```ts
languages: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:220](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L220)

##### racialTraits

```ts
racialTraits: string;
```

Defined in: [parsers/purple-sorcerer-types.ts:221](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L221)

***

### PSJsonCharacterList

Defined in: [parsers/purple-sorcerer-types.ts:227](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L227)

Container for multiple JSON characters

#### Properties

##### characters

```ts
characters: PSJsonZeroLevel[];
```

Defined in: [parsers/purple-sorcerer-types.ts:228](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L228)

***

### PSParseResult

Defined in: [parsers/purple-sorcerer-types.ts:238](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L238)

Result of parsing Purple Sorcerer data

#### Properties

##### success

```ts
success: boolean;
```

Defined in: [parsers/purple-sorcerer-types.ts:239](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L239)

##### characters

```ts
characters: PSCharacter[];
```

Defined in: [parsers/purple-sorcerer-types.ts:240](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L240)

##### errors

```ts
errors: string[];
```

Defined in: [parsers/purple-sorcerer-types.ts:241](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L241)

##### warnings

```ts
warnings: string[];
```

Defined in: [parsers/purple-sorcerer-types.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L242)

***

### StatBlockParseResult

Defined in: [parsers/statblock-types.ts:16](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L16)

Result of parsing a stat block

#### Properties

##### success

```ts
success: boolean;
```

Defined in: [parsers/statblock-types.ts:18](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L18)

Whether parsing succeeded

##### creature?

```ts
optional creature?: Creature;
```

Defined in: [parsers/statblock-types.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L21)

Parsed creature data (if successful)

##### error?

```ts
optional error?: string;
```

Defined in: [parsers/statblock-types.ts:24](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L24)

Error message (if failed)

##### warnings?

```ts
optional warnings?: string[];
```

Defined in: [parsers/statblock-types.ts:27](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L27)

Warnings about potentially incorrect parsing

##### original

```ts
original: string;
```

Defined in: [parsers/statblock-types.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L30)

The original stat block text

***

### ParsedAttack

Defined in: [parsers/statblock-types.ts:36](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L36)

Intermediate parsed attack data before conversion

#### Properties

##### name

```ts
name: string;
```

Defined in: [parsers/statblock-types.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L38)

Attack name

##### toHit

```ts
toHit: string;
```

Defined in: [parsers/statblock-types.ts:41](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L41)

Attack bonus as string (e.g., "+5", "-2")

##### melee

```ts
melee: boolean;
```

Defined in: [parsers/statblock-types.ts:44](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L44)

Whether this is a melee attack

##### damage

```ts
damage: string;
```

Defined in: [parsers/statblock-types.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L47)

Damage expression

##### range?

```ts
optional range?: string;
```

Defined in: [parsers/statblock-types.ts:50](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L50)

Range for missile attacks

##### isSpecial?

```ts
optional isSpecial?: boolean;
```

Defined in: [parsers/statblock-types.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L53)

Whether this is a special attack (see below, spell, etc.)

***

### ParsedStatBlock

Defined in: [parsers/statblock-types.ts:59](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L59)

Intermediate parsed stat block data

#### Properties

##### name

```ts
name: string;
```

Defined in: [parsers/statblock-types.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L61)

Creature name

##### init

```ts
init: number;
```

Defined in: [parsers/statblock-types.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L64)

Initiative modifier

##### attacks

```ts
attacks: ParsedAttack[];
```

Defined in: [parsers/statblock-types.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L67)

Parsed attacks

##### ac

```ts
ac: number;
```

Defined in: [parsers/statblock-types.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L70)

Armor Class

##### acNotes?

```ts
optional acNotes?: string;
```

Defined in: [parsers/statblock-types.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L73)

AC notes (e.g., "scale mail")

##### hitDice

```ts
hitDice: string;
```

Defined in: [parsers/statblock-types.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L76)

Hit Dice expression

##### speed

```ts
speed: CreatureSpeed;
```

Defined in: [parsers/statblock-types.ts:79](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L79)

Movement speeds

##### actionDice

```ts
actionDice: string;
```

Defined in: [parsers/statblock-types.ts:82](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L82)

Action dice expression

##### special?

```ts
optional special?: string;
```

Defined in: [parsers/statblock-types.ts:85](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L85)

Special abilities

##### saves

```ts
saves: CreatureSaves;
```

Defined in: [parsers/statblock-types.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L88)

Saving throws

##### alignment

```ts
alignment: Alignment;
```

Defined in: [parsers/statblock-types.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L91)

Alignment

##### critDie?

```ts
optional critDie?: string;
```

Defined in: [parsers/statblock-types.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L94)

Crit die (if specified)

##### critTable?

```ts
optional critTable?: string;
```

Defined in: [parsers/statblock-types.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L97)

Crit table (if specified)

##### critRange?

```ts
optional critRange?: string;
```

Defined in: [parsers/statblock-types.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L100)

Crit range (if specified, e.g., "19-20", "20-24")

***

### StatBlockParseOptions

Defined in: [parsers/statblock-types.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L106)

Options for stat block parsing

#### Properties

##### category?

```ts
optional category?: string;
```

Defined in: [parsers/statblock-types.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L108)

Category to assign to parsed creature

##### id?

```ts
optional id?: string;
```

Defined in: [parsers/statblock-types.ts:111](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L111)

Custom ID to use (otherwise derived from name)

##### defaultHp?

```ts
optional defaultHp?: number;
```

Defined in: [parsers/statblock-types.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L114)

Default HP if not calculable (uses average of HD)

##### defaultCritDie?

```ts
optional defaultCritDie?: string;
```

Defined in: [parsers/statblock-types.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L117)

Default crit die if not specified in stat block

##### defaultCritTable?

```ts
optional defaultCritTable?: string;
```

Defined in: [parsers/statblock-types.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/statblock-types.ts#L120)

Default crit table if not specified in stat block

## Type Aliases

### PSClassType

```ts
type PSClassType = "warrior" | "wizard" | "cleric" | "thief" | "dwarf" | "elf" | "halfling";
```

Defined in: [parsers/purple-sorcerer-types.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/purple-sorcerer-types.ts#L97)

Class type (lowercase, matches classId in the library)

## Functions

### convertPSCharacter()

```ts
function convertPSCharacter(ps: PSCharacter, options?: ConvertOptions): Character;
```

Defined in: [parsers/convert.ts:460](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/convert.ts#L460)

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

Defined in: [parsers/convert.ts:557](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/convert.ts#L557)

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

Defined in: [parsers/index.ts:85](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/index.ts#L85)

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

Defined in: [parsers/parse-json.ts:220](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/parse-json.ts#L220)

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

Defined in: [parsers/parse-statblock.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/parse-statblock.ts#L38)

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

Defined in: [parsers/parse-statblock.ts:73](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/parse-statblock.ts#L73)

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

Defined in: [parsers/parse-text.ts:696](https://github.com/moonloch/dcc-core-lib/blob/main/src/parsers/parse-text.ts#L696)

Parse Purple Sorcerer text format
Handles both single and multiple character outputs

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

[`PSParseResult`](#psparseresult)
