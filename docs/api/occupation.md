# occupation

## Interfaces

### OccupationSkillGrant

Defined in: [types/occupation-skills.ts:53](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L53)

A skill granted by an occupation.

#### Properties

##### id

```ts
id: string;
```

Defined in: [types/occupation-skills.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L55)

Unique identifier for this skill grant

##### name

```ts
name: string;
```

Defined in: [types/occupation-skills.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L58)

Display name

##### description

```ts
description: string;
```

Defined in: [types/occupation-skills.ts:61](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L61)

Description of what this skill allows

##### category

```ts
category: OccupationSkillCategory;
```

Defined in: [types/occupation-skills.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L64)

Category of skill

##### abilityId?

```ts
optional abilityId?: string;
```

Defined in: [types/occupation-skills.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L70)

For trade skills: what ability score applies
(e.g., "int" for knowledge, "per" for social, "agl" for physical)

##### thiefSkillId?

```ts
optional thiefSkillId?: ThiefSkillId;
```

Defined in: [types/occupation-skills.ts:75](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L75)

For limited thief skills: which thief skill this grants access to

##### effectiveLevel?

```ts
optional effectiveLevel?: number;
```

Defined in: [types/occupation-skills.ts:81](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L81)

For limited thief skills: the effective level for the skill
(e.g., -2 means treat as 2 levels lower, minimum 0)

##### die?

```ts
optional die?: `d${number}`;
```

Defined in: [types/occupation-skills.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L86)

Die used for checks (default: d10 for thief skills, d20 for others)

##### bonus?

```ts
optional bonus?: number;
```

Defined in: [types/occupation-skills.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L91)

Fixed bonus to the check (in addition to ability mod)

##### baseDC?

```ts
optional baseDC?: number;
```

Defined in: [types/occupation-skills.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L96)

DC/target for simple pass/fail checks

##### usesPerDay?

```ts
optional usesPerDay?: number;
```

Defined in: [types/occupation-skills.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L101)

Is this a one-time daily ability?

##### tags?

```ts
optional tags?: string[];
```

Defined in: [types/occupation-skills.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L106)

Tags for categorization

***

### OccupationWeaponTraining

Defined in: [types/occupation-skills.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L112)

Weapon training from an occupation.

#### Properties

##### weaponName

```ts
weaponName: string;
```

Defined in: [types/occupation-skills.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L114)

The weapon name from the occupation

##### weaponType

```ts
weaponType: string;
```

Defined in: [types/occupation-skills.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L117)

Normalized weapon type (e.g., "dagger", "club", "longsword")

##### attackBonus

```ts
attackBonus: number;
```

Defined in: [types/occupation-skills.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L120)

Bonus to attack with trained weapon (typically +1 for 0-level)

##### damageBonus

```ts
damageBonus: number;
```

Defined in: [types/occupation-skills.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L123)

Bonus to damage with trained weapon (typically 0)

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/occupation-skills.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L126)

Special notes (e.g., "Hammer (as club)")

***

### OccupationWithSkills

Defined in: [types/occupation-skills.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L137)

Extended occupation entry with skill grants.
This extends the base OccupationEntry with skill information.

#### Properties

##### roll

```ts
roll: string | number;
```

Defined in: [types/occupation-skills.ts:139](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L139)

Roll value or range

##### name

```ts
name: string;
```

Defined in: [types/occupation-skills.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L142)

Occupation name

##### trainedWeapon

```ts
trainedWeapon: string;
```

Defined in: [types/occupation-skills.ts:145](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L145)

Trained weapon

##### tradeGoods

```ts
tradeGoods: string;
```

Defined in: [types/occupation-skills.ts:148](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L148)

Trade goods

##### startingFunds?

```ts
optional startingFunds?: number;
```

Defined in: [types/occupation-skills.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L151)

Starting funds in copper pieces

##### isFarmer?

```ts
optional isFarmer?: boolean;
```

Defined in: [types/occupation-skills.ts:154](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L154)

Is this a farmer?

##### notes?

```ts
optional notes?: string;
```

Defined in: [types/occupation-skills.ts:157](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L157)

Notes

##### skills?

```ts
optional skills?: OccupationSkillGrant[];
```

Defined in: [types/occupation-skills.ts:163](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L163)

Skills granted by this occupation.
These are in addition to weapon training.

##### weaponTraining?

```ts
optional weaponTraining?: OccupationWeaponTraining;
```

Defined in: [types/occupation-skills.ts:169](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L169)

Normalized weapon training data.
Parsed from trainedWeapon string.

***

### OccupationSkillCheckInput

Defined in: [types/occupation-skills.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L179)

Input for an occupation skill check.

#### Properties

##### skill

```ts
skill: OccupationSkillGrant;
```

Defined in: [types/occupation-skills.ts:181](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L181)

The skill being checked

##### level

```ts
level: number;
```

Defined in: [types/occupation-skills.ts:184](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L184)

Character's level (affects some calculations)

##### abilities

```ts
abilities: Record<string, number>;
```

Defined in: [types/occupation-skills.ts:187](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L187)

Character's ability scores

##### luck?

```ts
optional luck?: number;
```

Defined in: [types/occupation-skills.ts:190](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L190)

Character's luck score (if applicable)

##### luckBurn?

```ts
optional luckBurn?: number;
```

Defined in: [types/occupation-skills.ts:193](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L193)

Luck to burn on this check

##### situationalModifiers?

```ts
optional situationalModifiers?: {
  source: string;
  value: number;
}[];
```

Defined in: [types/occupation-skills.ts:196](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L196)

Situational modifiers

###### source

```ts
source: string;
```

###### value

```ts
value: number;
```

***

### OccupationSkillCheckResult

Defined in: [types/occupation-skills.ts:205](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L205)

Result of an occupation skill check.

#### Properties

##### skillId

```ts
skillId: string;
```

Defined in: [types/occupation-skills.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L207)

The skill that was checked

##### die

```ts
die: `d${number}`;
```

Defined in: [types/occupation-skills.ts:210](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L210)

Die used

##### formula

```ts
formula: string;
```

Defined in: [types/occupation-skills.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L213)

Complete formula

##### natural?

```ts
optional natural?: number;
```

Defined in: [types/occupation-skills.ts:216](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L216)

Natural die result

##### total?

```ts
optional total?: number;
```

Defined in: [types/occupation-skills.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L219)

Total after modifiers

##### critical?

```ts
optional critical?: boolean;
```

Defined in: [types/occupation-skills.ts:222](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L222)

Was this a critical success?

##### fumble?

```ts
optional fumble?: boolean;
```

Defined in: [types/occupation-skills.ts:225](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L225)

Was this a fumble?

##### success?

```ts
optional success?: boolean;
```

Defined in: [types/occupation-skills.ts:228](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L228)

Did the check succeed? (for DC-based checks)

##### modifiers

```ts
modifiers: {
  source: string;
  value: number;
}[];
```

Defined in: [types/occupation-skills.ts:231](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L231)

All modifiers applied

###### source

```ts
source: string;
```

###### value

```ts
value: number;
```

##### luckBurned

```ts
luckBurned: number;
```

Defined in: [types/occupation-skills.ts:237](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L237)

Luck burned

***

### OccupationSkillEvents

Defined in: [types/occupation-skills.ts:247](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L247)

Event callbacks for occupation skill system.

#### Properties

##### onCheckStart?

```ts
optional onCheckStart?: (input: OccupationSkillCheckInput) => void;
```

Defined in: [types/occupation-skills.ts:249](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L249)

Called when a skill check starts

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`OccupationSkillCheckInput`](#occupationskillcheckinput) |

###### Returns

`void`

##### onCheckComplete?

```ts
optional onCheckComplete?: (result: OccupationSkillCheckResult) => void;
```

Defined in: [types/occupation-skills.ts:252](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L252)

Called when a skill check completes

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`OccupationSkillCheckResult`](#occupationskillcheckresult) |

###### Returns

`void`

##### onCritical?

```ts
optional onCritical?: (result: OccupationSkillCheckResult) => void;
```

Defined in: [types/occupation-skills.ts:255](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L255)

Called on critical success

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`OccupationSkillCheckResult`](#occupationskillcheckresult) |

###### Returns

`void`

##### onFumble?

```ts
optional onFumble?: (result: OccupationSkillCheckResult) => void;
```

Defined in: [types/occupation-skills.ts:258](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L258)

Called on fumble

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`OccupationSkillCheckResult`](#occupationskillcheckresult) |

###### Returns

`void`

## Type Aliases

### OccupationSkillCategory

```ts
type OccupationSkillCategory = 
  | "weapon-training"
  | "trade-skill"
  | "limited-thief"
  | "craft"
  | "knowledge"
  | "social";
```

Defined in: [types/occupation-skills.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L20)

Categories of occupation skills.

***

### ThiefSkillId

```ts
type ThiefSkillId = 
  | "backstab"
  | "sneak-silently"
  | "hide-in-shadows"
  | "pick-pocket"
  | "climb-sheer-surfaces"
  | "pick-lock"
  | "find-trap"
  | "disable-trap"
  | "forge-document"
  | "disguise-self"
  | "read-languages"
  | "handle-poison"
  | "cast-spell-from-scroll";
```

Defined in: [types/occupation-skills.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/types/occupation-skills.ts#L31)

Thief skills that occupations can grant limited access to.

## Variables

### PICKPOCKET\_SKILL

```ts
const PICKPOCKET_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:20](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L20)

Pickpocket occupation grants limited pick pocket ability.

***

### KEY\_MAKER\_SKILL

```ts
const KEY_MAKER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L37)

Key Maker occupation grants limited lock picking ability.

***

### SEWER\_WORKER\_SKILL

```ts
const SEWER_WORKER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L54)

Sewer Worker occupation grants limited find trap ability.

***

### CONTRABAND\_RUNNER\_SKILL

```ts
const CONTRABAND_RUNNER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L71)

Contraband Runner grants limited hide in shadows ability.

***

### HEALER\_SKILL

```ts
const HEALER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L92)

Village Healer grants basic healing knowledge.

***

### HERB\_GATHERER\_SKILL

```ts
const HERB_GATHERER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L109)

Herb Gatherer grants plant identification.

***

### STAR\_READER\_SKILL

```ts
const STAR_READER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L126)

Star Reader grants fortune telling and astronomy knowledge.

***

### GAME\_HUNTER\_SKILL

```ts
const GAME_HUNTER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L142)

Game Hunter grants tracking ability.

***

### GEM\_CUTTER\_SKILL

```ts
const GEM_CUTTER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:158](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L158)

Gem Cutter grants appraisal ability.

***

### TRADER\_SKILL

```ts
const TRADER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L174)

Trader grants general appraisal and bargaining.

***

### COURT\_FOOL\_SKILL

```ts
const COURT_FOOL_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:190](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L190)

Court Fool grants performance ability.

***

### SNAKE\_OIL\_SELLER\_SKILL

```ts
const SNAKE_OIL_SELLER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:206](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L206)

Snake Oil Seller grants deception and persuasion.

***

### PLATE\_SMITH\_SKILL

```ts
const PLATE_SMITH_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:226](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L226)

Plate Smith grants metalworking ability.

***

### BARREL\_MAKER\_SKILL

```ts
const BARREL_MAKER_SKILL: OccupationSkillGrant;
```

Defined in: [occupation/sample-skills.ts:242](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L242)

Barrel Maker grants woodworking ability.

***

### OCCUPATION\_SKILL\_MAP

```ts
const OCCUPATION_SKILL_MAP: Record<string, OccupationSkillGrant[]>;
```

Defined in: [occupation/sample-skills.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L263)

Map of occupation names to their granted skills.
This can be merged with occupation data to extend it.

***

### DEFAULT\_TRADE\_SKILL\_DIE

```ts
const DEFAULT_TRADE_SKILL_DIE: DieType = "d20";
```

Defined in: [occupation/skills.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L30)

Default die for trade skill checks.

***

### DEFAULT\_THIEF\_SKILL\_DIE

```ts
const DEFAULT_THIEF_SKILL_DIE: DieType = "d20";
```

Defined in: [occupation/skills.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L35)

Default die for limited thief skill checks.

***

### DEFAULT\_WEAPON\_TRAINING\_BONUS

```ts
const DEFAULT_WEAPON_TRAINING_BONUS: 0 = 0;
```

Defined in: [occupation/skills.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L40)

Default attack bonus for trained weapon proficiency.

***

### MIN\_EFFECTIVE\_LEVEL

```ts
const MIN_EFFECTIVE_LEVEL: 0 = 0;
```

Defined in: [occupation/skills.ts:45](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L45)

Minimum effective level for limited thief skills.

## Functions

### getSkillsForOccupation()

```ts
function getSkillsForOccupation(occupationName: string): OccupationSkillGrant[];
```

Defined in: [occupation/sample-skills.ts:286](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L286)

Get skills for an occupation by name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupationName` | `string` | The occupation name |

#### Returns

[`OccupationSkillGrant`](#occupationskillgrant)[]

Array of skills, or empty array if none defined

***

### occupationHasSkills()

```ts
function occupationHasSkills(occupationName: string): boolean;
```

Defined in: [occupation/sample-skills.ts:298](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/sample-skills.ts#L298)

Check if an occupation has any special skills.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupationName` | `string` | The occupation name |

#### Returns

`boolean`

True if the occupation grants skills

***

### parseWeaponTraining()

```ts
function parseWeaponTraining(trainedWeapon: string): OccupationWeaponTraining;
```

Defined in: [occupation/skills.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L57)

Parse weapon training from an occupation's trained weapon string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `trainedWeapon` | `string` | The trained weapon string (e.g., "Hammer (as club)") |

#### Returns

[`OccupationWeaponTraining`](#occupationweapontraining)

Parsed weapon training data

***

### isTrainedWeapon()

```ts
function isTrainedWeapon(weaponName: string, training: OccupationWeaponTraining): boolean;
```

Defined in: [occupation/skills.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L90)

Check if a weapon matches the character's trained weapon.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weaponName` | `string` | The weapon being used |
| `training` | [`OccupationWeaponTraining`](#occupationweapontraining) | The character's weapon training |

#### Returns

`boolean`

True if the weapon matches

***

### getTrainedWeaponBonus()

```ts
function getTrainedWeaponBonus(weaponName: string, training: OccupationWeaponTraining): number;
```

Defined in: [occupation/skills.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L108)

Get attack bonus for using trained weapon.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weaponName` | `string` | The weapon being used |
| `training` | [`OccupationWeaponTraining`](#occupationweapontraining) | The character's weapon training |

#### Returns

`number`

Attack bonus (0 if not trained weapon)

***

### calculateEffectiveLevel()

```ts
function calculateEffectiveLevel(characterLevel: number, levelAdjustment?: number): number;
```

Defined in: [occupation/skills.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L126)

Calculate effective level for a limited thief skill.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `characterLevel` | `number` | `undefined` | The character's actual level |
| `levelAdjustment?` | `number` | `0` | The skill's level adjustment (usually negative) |

#### Returns

`number`

Effective level (minimum 0)

***

### getOccupationThiefSkill()

```ts
function getOccupationThiefSkill(occupationSkills: OccupationSkillGrant[], thiefSkillId: ThiefSkillId): OccupationSkillGrant | undefined;
```

Defined in: [occupation/skills.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L140)

Check if a character has access to a limited thief skill from their occupation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupationSkills` | [`OccupationSkillGrant`](#occupationskillgrant)[] | Skills granted by the occupation |
| `thiefSkillId` | [`ThiefSkillId`](#thiefskillid) | The thief skill to check |

#### Returns

[`OccupationSkillGrant`](#occupationskillgrant) \| `undefined`

The skill grant if available, undefined otherwise

***

### hasOccupationThiefSkill()

```ts
function hasOccupationThiefSkill(occupationSkills: OccupationSkillGrant[], thiefSkillId: ThiefSkillId): boolean;
```

Defined in: [occupation/skills.ts:157](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L157)

Check if an occupation grants a specific thief skill.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupationSkills` | [`OccupationSkillGrant`](#occupationskillgrant)[] | Skills granted by the occupation |
| `thiefSkillId` | [`ThiefSkillId`](#thiefskillid) | The thief skill to check |

#### Returns

`boolean`

True if the occupation grants access to this skill

***

### buildOccupationSkillModifiers()

```ts
function buildOccupationSkillModifiers(input: OccupationSkillCheckInput): LegacyRollModifier[];
```

Defined in: [occupation/skills.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L174)

Build modifiers for an occupation skill check.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`OccupationSkillCheckInput`](#occupationskillcheckinput) | The skill check input |

#### Returns

[`LegacyRollModifier`](types.md#legacyrollmodifier)[]

Array of roll modifiers

***

### resolveOccupationSkillCheck()

```ts
function resolveOccupationSkillCheck(
   input: OccupationSkillCheckInput, 
   options?: RollOptions, 
   events?: OccupationSkillEvents
): OccupationSkillCheckResult;
```

Defined in: [occupation/skills.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L233)

Resolve an occupation skill check.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`OccupationSkillCheckInput`](#occupationskillcheckinput) | The skill check input |
| `options?` | [`RollOptions`](types.md#rolloptions) | Roll options |
| `events?` | [`OccupationSkillEvents`](#occupationskillevents) | Event callbacks |

#### Returns

[`OccupationSkillCheckResult`](#occupationskillcheckresult)

The skill check result

***

### getTradeSkills()

```ts
function getTradeSkills(occupationSkills: OccupationSkillGrant[]): OccupationSkillGrant[];
```

Defined in: [occupation/skills.ts:318](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L318)

Get all trade skills from occupation skills.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupationSkills` | [`OccupationSkillGrant`](#occupationskillgrant)[] | Skills granted by the occupation |

#### Returns

[`OccupationSkillGrant`](#occupationskillgrant)[]

Array of trade skills

***

### getKnowledgeSkills()

```ts
function getKnowledgeSkills(occupationSkills: OccupationSkillGrant[]): OccupationSkillGrant[];
```

Defined in: [occupation/skills.ts:332](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L332)

Get all knowledge skills from occupation skills.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupationSkills` | [`OccupationSkillGrant`](#occupationskillgrant)[] | Skills granted by the occupation |

#### Returns

[`OccupationSkillGrant`](#occupationskillgrant)[]

Array of knowledge skills

***

### getLimitedThiefSkills()

```ts
function getLimitedThiefSkills(occupationSkills: OccupationSkillGrant[]): OccupationSkillGrant[];
```

Defined in: [occupation/skills.ts:344](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L344)

Get all limited thief skills from occupation skills.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `occupationSkills` | [`OccupationSkillGrant`](#occupationskillgrant)[] | Skills granted by the occupation |

#### Returns

[`OccupationSkillGrant`](#occupationskillgrant)[]

Array of limited thief skills

***

### isOccupationSkillSuccess()

```ts
function isOccupationSkillSuccess(result: OccupationSkillCheckResult): boolean;
```

Defined in: [occupation/skills.ts:360](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L360)

Check if an occupation skill check result was successful.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`OccupationSkillCheckResult`](#occupationskillcheckresult) | The check result |

#### Returns

`boolean`

True if successful

***

### getOccupationSkillSummary()

```ts
function getOccupationSkillSummary(result: OccupationSkillCheckResult): string;
```

Defined in: [occupation/skills.ts:385](https://github.com/moonloch/dcc-core-lib/blob/main/src/occupation/skills.ts#L385)

Get a summary of the occupation skill check result.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`OccupationSkillCheckResult`](#occupationskillcheckresult) | The check result |

#### Returns

`string`

Summary string
