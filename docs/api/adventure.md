# adventure

## Interfaces

### ChooseOptionResult

Defined in: [adventure/narrative-engine.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L96)

Result of choosing an option

#### Properties

##### encounter

```ts
encounter: NarrativeEncounterState;
```

Defined in: [adventure/narrative-engine.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L98)

Updated encounter state

##### option

```ts
option: NarrativeOption;
```

Defined in: [adventure/narrative-engine.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L101)

The chosen option

##### requiredCheck

```ts
requiredCheck: boolean;
```

Defined in: [adventure/narrative-engine.ts:104](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L104)

Whether a skill check was required

##### checkResult?

```ts
optional checkResult?: NarrativeCheckResult;
```

Defined in: [adventure/narrative-engine.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L107)

Skill check result if applicable

##### success

```ts
success: boolean;
```

Defined in: [adventure/narrative-engine.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L110)

Whether the outcome was successful

##### outcomeText

```ts
outcomeText: string;
```

Defined in: [adventure/narrative-engine.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L113)

The outcome text

***

### MonsterBehaviorProfile

Defined in: [adventure/types.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L80)

Monster behavior profile for AI decisions

#### Properties

##### primary

```ts
primary: MonsterBehaviorType;
```

Defined in: [adventure/types.ts:82](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L82)

Primary behavior type

##### preferRanged

```ts
preferRanged: boolean;
```

Defined in: [adventure/types.ts:85](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L85)

Whether to prefer ranged attacks when available

##### fleeThreshold

```ts
fleeThreshold: number;
```

Defined in: [adventure/types.ts:88](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L88)

HP percentage (0-1) at which to flee, 0 = never flee

##### targetPriority

```ts
targetPriority: TargetPriority[];
```

Defined in: [adventure/types.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L91)

Target selection priorities in order

***

### BaseCombatant

Defined in: [adventure/types.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L101)

Base combatant properties shared by players and monsters

#### Extended by

- [`PlayerCombatant`](#playercombatant)
- [`MonsterCombatant`](#monstercombatant)

#### Properties

##### combatantId

```ts
combatantId: string;
```

Defined in: [adventure/types.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L103)

Unique ID for this combatant in the encounter

##### name

```ts
name: string;
```

Defined in: [adventure/types.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L106)

Display name

##### initiative

```ts
initiative: number;
```

Defined in: [adventure/types.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L109)

Rolled initiative total

##### hasActedThisRound

```ts
hasActedThisRound: boolean;
```

Defined in: [adventure/types.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L112)

Whether this combatant has acted in the current round

##### vitalStatus

```ts
vitalStatus: VitalStatus;
```

Defined in: [adventure/types.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L115)

Current vital status

##### conditions

```ts
conditions: string[];
```

Defined in: [adventure/types.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L118)

Active conditions (poisoned, prone, etc.)

***

### PlayerCombatant

Defined in: [adventure/types.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L124)

A player character in combat

#### Extends

- [`BaseCombatant`](#basecombatant)

#### Properties

##### combatantId

```ts
combatantId: string;
```

Defined in: [adventure/types.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L103)

Unique ID for this combatant in the encounter

###### Inherited from

[`BaseCombatant`](#basecombatant).[`combatantId`](#combatantid)

##### name

```ts
name: string;
```

Defined in: [adventure/types.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L106)

Display name

###### Inherited from

[`BaseCombatant`](#basecombatant).[`name`](#name)

##### initiative

```ts
initiative: number;
```

Defined in: [adventure/types.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L109)

Rolled initiative total

###### Inherited from

[`BaseCombatant`](#basecombatant).[`initiative`](#initiative)

##### hasActedThisRound

```ts
hasActedThisRound: boolean;
```

Defined in: [adventure/types.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L112)

Whether this combatant has acted in the current round

###### Inherited from

[`BaseCombatant`](#basecombatant).[`hasActedThisRound`](#hasactedthisround)

##### vitalStatus

```ts
vitalStatus: VitalStatus;
```

Defined in: [adventure/types.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L115)

Current vital status

###### Inherited from

[`BaseCombatant`](#basecombatant).[`vitalStatus`](#vitalstatus)

##### conditions

```ts
conditions: string[];
```

Defined in: [adventure/types.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L118)

Active conditions (poisoned, prone, etc.)

###### Inherited from

[`BaseCombatant`](#basecombatant).[`conditions`](#conditions)

##### type

```ts
type: "player";
```

Defined in: [adventure/types.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L125)

##### discordUserId

```ts
discordUserId: string;
```

Defined in: [adventure/types.ts:128](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L128)

Discord user ID

##### characterId

```ts
characterId: string;
```

Defined in: [adventure/types.ts:131](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L131)

Character ID from storage

##### characterSnapshot

```ts
characterSnapshot: Character;
```

Defined in: [adventure/types.ts:134](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L134)

Snapshot of character at encounter start

##### currentHP

```ts
currentHP: number;
```

Defined in: [adventure/types.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L137)

Current HP (may differ from snapshot after damage)

##### bleedingOut?

```ts
optional bleedingOut?: BleedingOutState;
```

Defined in: [adventure/types.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L140)

Bleeding out state if applicable

***

### MonsterCombatant

Defined in: [adventure/types.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L146)

A monster/NPC in combat

#### Extends

- [`BaseCombatant`](#basecombatant)

#### Properties

##### combatantId

```ts
combatantId: string;
```

Defined in: [adventure/types.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L103)

Unique ID for this combatant in the encounter

###### Inherited from

[`BaseCombatant`](#basecombatant).[`combatantId`](#combatantid)

##### name

```ts
name: string;
```

Defined in: [adventure/types.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L106)

Display name

###### Inherited from

[`BaseCombatant`](#basecombatant).[`name`](#name)

##### initiative

```ts
initiative: number;
```

Defined in: [adventure/types.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L109)

Rolled initiative total

###### Inherited from

[`BaseCombatant`](#basecombatant).[`initiative`](#initiative)

##### hasActedThisRound

```ts
hasActedThisRound: boolean;
```

Defined in: [adventure/types.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L112)

Whether this combatant has acted in the current round

###### Inherited from

[`BaseCombatant`](#basecombatant).[`hasActedThisRound`](#hasactedthisround)

##### vitalStatus

```ts
vitalStatus: VitalStatus;
```

Defined in: [adventure/types.ts:115](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L115)

Current vital status

###### Inherited from

[`BaseCombatant`](#basecombatant).[`vitalStatus`](#vitalstatus)

##### conditions

```ts
conditions: string[];
```

Defined in: [adventure/types.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L118)

Active conditions (poisoned, prone, etc.)

###### Inherited from

[`BaseCombatant`](#basecombatant).[`conditions`](#conditions)

##### type

```ts
type: "monster";
```

Defined in: [adventure/types.ts:147](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L147)

##### creatureTemplateId

```ts
creatureTemplateId: string;
```

Defined in: [adventure/types.ts:150](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L150)

Creature template ID (e.g., "goblin")

##### instanceNumber

```ts
instanceNumber: number;
```

Defined in: [adventure/types.ts:153](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L153)

Instance number for multiples (1, 2, 3...)

##### currentHP

```ts
currentHP: number;
```

Defined in: [adventure/types.ts:156](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L156)

Current HP

##### maxHP

```ts
maxHP: number;
```

Defined in: [adventure/types.ts:159](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L159)

Maximum HP (rolled or default)

##### creature

```ts
creature: Creature;
```

Defined in: [adventure/types.ts:162](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L162)

Full creature template data

##### moraleState

```ts
moraleState: CreatureMoraleState;
```

Defined in: [adventure/types.ts:165](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L165)

Individual morale state

##### behaviorProfile

```ts
behaviorProfile: MonsterBehaviorProfile;
```

Defined in: [adventure/types.ts:168](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L168)

AI behavior profile

***

### CombatLogEntry

Defined in: [adventure/types.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L199)

An entry in the combat log

#### Properties

##### type

```ts
type: CombatLogEntryType;
```

Defined in: [adventure/types.ts:201](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L201)

Type of entry

##### round

```ts
round: number;
```

Defined in: [adventure/types.ts:204](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L204)

Round number

##### actorId?

```ts
optional actorId?: string;
```

Defined in: [adventure/types.ts:207](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L207)

Acting combatant ID

##### targetId?

```ts
optional targetId?: string;
```

Defined in: [adventure/types.ts:210](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L210)

Target combatant ID

##### description

```ts
description: string;
```

Defined in: [adventure/types.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L213)

Human-readable description

##### timestamp

```ts
timestamp: string;
```

Defined in: [adventure/types.ts:216](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L216)

Timestamp

##### rolls?

```ts
optional rolls?: {
  natural?: number;
  total?: number;
  dc?: number;
};
```

Defined in: [adventure/types.ts:219](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L219)

Roll details if applicable

###### natural?

```ts
optional natural?: number;
```

###### total?

```ts
optional total?: number;
```

###### dc?

```ts
optional dc?: number;
```

***

### CombatEncounterState

Defined in: [adventure/types.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L233)

Full state of a combat encounter

#### Properties

##### encounterId

```ts
encounterId: string;
```

Defined in: [adventure/types.ts:235](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L235)

Unique encounter ID

##### type

```ts
type: "combat";
```

Defined in: [adventure/types.ts:238](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L238)

Discriminator

##### phase

```ts
phase: CombatPhase;
```

Defined in: [adventure/types.ts:241](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L241)

Current phase

##### combatants

```ts
combatants: Combatant[];
```

Defined in: [adventure/types.ts:244](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L244)

All combatants

##### round

```ts
round: number;
```

Defined in: [adventure/types.ts:247](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L247)

Current round number (starts at 1)

##### currentTurnCombatantId

```ts
currentTurnCombatantId: string | null;
```

Defined in: [adventure/types.ts:250](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L250)

ID of combatant whose turn it is

##### turnOrder

```ts
turnOrder: string[];
```

Defined in: [adventure/types.ts:253](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L253)

Ordered list of combatant IDs by initiative

##### turnIndex

```ts
turnIndex: number;
```

Defined in: [adventure/types.ts:256](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L256)

Index into turnOrder for current turn

##### monsterGroupMorale

```ts
monsterGroupMorale: GroupMoraleState;
```

Defined in: [adventure/types.ts:259](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L259)

Group morale state for monsters

##### monstersFleeing

```ts
monstersFleeing: boolean;
```

Defined in: [adventure/types.ts:262](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L262)

Whether monsters are fleeing

##### combatLog

```ts
combatLog: CombatLogEntry[];
```

Defined in: [adventure/types.ts:265](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L265)

Combat log

***

### NarrativeOption

Defined in: [adventure/types.ts:285](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L285)

An option in a narrative encounter

#### Properties

##### id

```ts
id: string;
```

Defined in: [adventure/types.ts:287](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L287)

Option ID

##### text

```ts
text: string;
```

Defined in: [adventure/types.ts:290](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L290)

Display text for the option

##### skillCheck?

```ts
optional skillCheck?: {
  ability: DCCAbilityId;
  dc: number;
};
```

Defined in: [adventure/types.ts:293](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L293)

Required skill check if any

###### ability

```ts
ability: DCCAbilityId;
```

###### dc

```ts
dc: number;
```

##### successOutcome

```ts
successOutcome: string;
```

Defined in: [adventure/types.ts:299](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L299)

Outcome text on success (or if no check required)

##### failureOutcome?

```ts
optional failureOutcome?: string;
```

Defined in: [adventure/types.ts:302](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L302)

Outcome text on failure

***

### NarrativeTemplate

Defined in: [adventure/types.ts:308](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L308)

A narrative encounter template

#### Properties

##### id

```ts
id: string;
```

Defined in: [adventure/types.ts:310](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L310)

Template ID

##### category

```ts
category: NarrativeCategory;
```

Defined in: [adventure/types.ts:313](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L313)

Category

##### situation

```ts
situation: string;
```

Defined in: [adventure/types.ts:316](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L316)

Situation description with {variable} placeholders

##### options

```ts
options: NarrativeOption[];
```

Defined in: [adventure/types.ts:319](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L319)

Available options

***

### NarrativeCheckResult

Defined in: [adventure/types.ts:325](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L325)

A skill check result for a player

#### Properties

##### playerId

```ts
playerId: string;
```

Defined in: [adventure/types.ts:326](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L326)

##### playerName

```ts
playerName: string;
```

Defined in: [adventure/types.ts:327](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L327)

##### ability

```ts
ability: DCCAbilityId;
```

Defined in: [adventure/types.ts:328](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L328)

##### dc

```ts
dc: number;
```

Defined in: [adventure/types.ts:329](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L329)

##### roll

```ts
roll: number;
```

Defined in: [adventure/types.ts:330](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L330)

##### modifier

```ts
modifier: number;
```

Defined in: [adventure/types.ts:331](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L331)

##### total

```ts
total: number;
```

Defined in: [adventure/types.ts:332](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L332)

##### passed

```ts
passed: boolean;
```

Defined in: [adventure/types.ts:333](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L333)

***

### NarrativeEncounterState

Defined in: [adventure/types.ts:339](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L339)

Full state of a narrative encounter

#### Properties

##### encounterId

```ts
encounterId: string;
```

Defined in: [adventure/types.ts:341](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L341)

Unique encounter ID

##### type

```ts
type: "narrative";
```

Defined in: [adventure/types.ts:344](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L344)

Discriminator

##### phase

```ts
phase: NarrativePhase;
```

Defined in: [adventure/types.ts:347](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L347)

Current phase

##### templateId

```ts
templateId: string;
```

Defined in: [adventure/types.ts:350](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L350)

Template ID used

##### situation

```ts
situation: string;
```

Defined in: [adventure/types.ts:353](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L353)

Filled-in situation text

##### options

```ts
options: NarrativeOption[];
```

Defined in: [adventure/types.ts:356](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L356)

Available options

##### chosenOptionId?

```ts
optional chosenOptionId?: string;
```

Defined in: [adventure/types.ts:359](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L359)

Chosen option ID

##### checkResults?

```ts
optional checkResults?: NarrativeCheckResult[];
```

Defined in: [adventure/types.ts:362](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L362)

Skill check results if applicable

##### outcome?

```ts
optional outcome?: string;
```

Defined in: [adventure/types.ts:365](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L365)

Final outcome text

***

### AdventurePlayer

Defined in: [adventure/types.ts:390](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L390)

A player in an adventure

#### Properties

##### discordUserId

```ts
discordUserId: string;
```

Defined in: [adventure/types.ts:392](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L392)

Discord user ID

##### discordUsername

```ts
discordUsername: string;
```

Defined in: [adventure/types.ts:395](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L395)

Discord username for display

##### characterId

```ts
characterId: string;
```

Defined in: [adventure/types.ts:398](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L398)

Character ID from storage

##### characterName

```ts
characterName: string;
```

Defined in: [adventure/types.ts:401](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L401)

Character name for display

##### joinedAt

```ts
joinedAt: string;
```

Defined in: [adventure/types.ts:404](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L404)

When the player joined

***

### EncounterSummary

Defined in: [adventure/types.ts:410](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L410)

Summary of a completed encounter

#### Properties

##### encounterId

```ts
encounterId: string;
```

Defined in: [adventure/types.ts:412](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L412)

Encounter ID

##### type

```ts
type: EncounterType;
```

Defined in: [adventure/types.ts:415](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L415)

Type of encounter

##### outcome

```ts
outcome: string;
```

Defined in: [adventure/types.ts:418](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L418)

How it ended

##### completedAt

```ts
completedAt: string;
```

Defined in: [adventure/types.ts:421](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L421)

When it completed

***

### AdventureState

Defined in: [adventure/types.ts:427](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L427)

Full adventure state

#### Properties

##### adventureId

```ts
adventureId: string;
```

Defined in: [adventure/types.ts:429](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L429)

Unique adventure ID

##### name

```ts
name: string;
```

Defined in: [adventure/types.ts:432](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L432)

Adventure name

##### threadId

```ts
threadId: string;
```

Defined in: [adventure/types.ts:435](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L435)

Discord thread ID

##### guildId

```ts
guildId: string;
```

Defined in: [adventure/types.ts:438](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L438)

Discord guild ID

##### creatorId

```ts
creatorId: string;
```

Defined in: [adventure/types.ts:441](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L441)

Discord user ID of creator

##### status

```ts
status: AdventureStatus;
```

Defined in: [adventure/types.ts:444](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L444)

Current status

##### createdAt

```ts
createdAt: string;
```

Defined in: [adventure/types.ts:447](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L447)

When created

##### lastActivityAt

```ts
lastActivityAt: string;
```

Defined in: [adventure/types.ts:450](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L450)

Last activity timestamp

##### players

```ts
players: AdventurePlayer[];
```

Defined in: [adventure/types.ts:453](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L453)

Players in the adventure

##### currentEncounter

```ts
currentEncounter: EncounterState | null;
```

Defined in: [adventure/types.ts:456](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L456)

Current active encounter if any

##### encounterHistory

```ts
encounterHistory: EncounterSummary[];
```

Defined in: [adventure/types.ts:459](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L459)

History of completed encounters

##### customMonsters

```ts
customMonsters: Creature[];
```

Defined in: [adventure/types.ts:462](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L462)

Custom monsters added for this adventure

***

### PlayerCombatAction

Defined in: [adventure/types.ts:483](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L483)

A player combat action

#### Properties

##### type

```ts
type: PlayerActionType;
```

Defined in: [adventure/types.ts:485](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L485)

Action type

##### targetId?

```ts
optional targetId?: string;
```

Defined in: [adventure/types.ts:488](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L488)

Target combatant ID (for attacks)

##### weaponId?

```ts
optional weaponId?: string;
```

Defined in: [adventure/types.ts:491](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L491)

Weapon or item being used

##### spellId?

```ts
optional spellId?: string;
```

Defined in: [adventure/types.ts:494](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L494)

Spell being cast

***

### MonsterDecision

Defined in: [adventure/types.ts:500](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L500)

Monster AI decision

#### Properties

##### actionType

```ts
actionType: "attack" | "special" | "flee" | "pass";
```

Defined in: [adventure/types.ts:502](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L502)

Chosen action type

##### targetId?

```ts
optional targetId?: string;
```

Defined in: [adventure/types.ts:505](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L505)

Target combatant ID

##### attackIndex?

```ts
optional attackIndex?: number;
```

Defined in: [adventure/types.ts:508](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L508)

Which attack to use

##### reasoning

```ts
reasoning: string;
```

Defined in: [adventure/types.ts:511](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L511)

Reasoning for the decision (for logging)

***

### AttackActionResult

Defined in: [adventure/types.ts:521](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L521)

Result of a combat attack action

#### Properties

##### hit

```ts
hit: boolean;
```

Defined in: [adventure/types.ts:523](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L523)

Whether the attack hit

##### naturalRoll

```ts
naturalRoll: number;
```

Defined in: [adventure/types.ts:526](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L526)

Natural roll

##### attackTotal

```ts
attackTotal: number;
```

Defined in: [adventure/types.ts:529](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L529)

Total attack roll

##### targetAC

```ts
targetAC: number;
```

Defined in: [adventure/types.ts:532](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L532)

Target AC

##### damage

```ts
damage: number;
```

Defined in: [adventure/types.ts:535](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L535)

Damage dealt (0 if miss)

##### critical

```ts
critical: boolean;
```

Defined in: [adventure/types.ts:538](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L538)

Whether it was a critical hit

##### fumble

```ts
fumble: boolean;
```

Defined in: [adventure/types.ts:541](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L541)

Whether it was a fumble

##### criticalEffect?

```ts
optional criticalEffect?: string;
```

Defined in: [adventure/types.ts:544](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L544)

Critical hit description if applicable

##### fumbleEffect?

```ts
optional fumbleEffect?: string;
```

Defined in: [adventure/types.ts:547](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L547)

Fumble description if applicable

##### targetKilled

```ts
targetKilled: boolean;
```

Defined in: [adventure/types.ts:550](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L550)

Whether the target was killed

##### targetNewHP

```ts
targetNewHP: number;
```

Defined in: [adventure/types.ts:553](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L553)

Target's new HP

##### targetVitalStatus

```ts
targetVitalStatus: VitalStatus;
```

Defined in: [adventure/types.ts:556](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L556)

Target's new vital status

***

### MonsterTurnResult

Defined in: [adventure/types.ts:562](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L562)

Result of a monster's turn

#### Properties

##### monsterId

```ts
monsterId: string;
```

Defined in: [adventure/types.ts:564](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L564)

Monster combatant ID

##### monsterName

```ts
monsterName: string;
```

Defined in: [adventure/types.ts:567](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L567)

Monster name

##### decision

```ts
decision: MonsterDecision;
```

Defined in: [adventure/types.ts:570](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L570)

The decision made

##### attackResult?

```ts
optional attackResult?: AttackActionResult;
```

Defined in: [adventure/types.ts:573](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L573)

Attack result if attacked

##### fled

```ts
fled: boolean;
```

Defined in: [adventure/types.ts:576](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L576)

Whether the monster fled

## Type Aliases

### EncounterType

```ts
type EncounterType = "combat" | "exploration" | "trap" | "skill-challenge" | "narrative";
```

Defined in: [adventure/types.ts:21](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L21)

Type of encounter

***

### CombatPhase

```ts
type CombatPhase = "pending" | "initiative" | "active" | "resolved" | "fled" | "tpk";
```

Defined in: [adventure/types.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L31)

Phase of a combat encounter

***

### NarrativePhase

```ts
type NarrativePhase = "presenting" | "awaiting-choice" | "resolving" | "resolved";
```

Defined in: [adventure/types.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L42)

Phase of a narrative encounter

***

### MonsterBehaviorType

```ts
type MonsterBehaviorType = 
  | "aggressive"
  | "opportunistic"
  | "pack"
  | "cowardly"
  | "berserker"
  | "intelligent"
  | "territorial";
```

Defined in: [adventure/types.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L55)

Primary behavior type for monster AI

***

### TargetPriority

```ts
type TargetPriority = 
  | "nearest"
  | "lowest-hp"
  | "highest-hp"
  | "lowest-ac"
  | "wounded"
  | "spellcaster"
  | "last-attacker"
  | "random";
```

Defined in: [adventure/types.ts:67](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L67)

Target selection priority

***

### Combatant

```ts
type Combatant = 
  | PlayerCombatant
  | MonsterCombatant;
```

Defined in: [adventure/types.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L174)

Union of combatant types

***

### CombatLogEntryType

```ts
type CombatLogEntryType = 
  | "initiative"
  | "attack"
  | "damage"
  | "critical"
  | "fumble"
  | "miss"
  | "death"
  | "morale"
  | "flee"
  | "round-start"
  | "combat-end";
```

Defined in: [adventure/types.ts:183](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L183)

Types of combat log entries

***

### NarrativeCategory

```ts
type NarrativeCategory = "exploration" | "trap" | "puzzle" | "social" | "environmental";
```

Defined in: [adventure/types.ts:275](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L275)

Category of narrative template

***

### EncounterState

```ts
type EncounterState = 
  | CombatEncounterState
  | NarrativeEncounterState;
```

Defined in: [adventure/types.ts:371](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L371)

Union of encounter state types

***

### AdventureStatus

```ts
type AdventureStatus = "gathering" | "active" | "paused" | "completed" | "abandoned";
```

Defined in: [adventure/types.ts:380](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L380)

Adventure status

***

### PlayerActionType

```ts
type PlayerActionType = "attack" | "defend" | "flee" | "pass" | "use-item" | "cast-spell";
```

Defined in: [adventure/types.ts:472](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/types.ts#L472)

Types of player combat actions

## Variables

### NARRATIVE\_TEMPLATES

```ts
const NARRATIVE_TEMPLATES: Record<string, NarrativeTemplate>;
```

Defined in: [adventure/narrative-templates.ts:13](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-templates.ts#L13)

All available narrative templates, keyed by ID.

## Functions

### createPlayerCombatants()

```ts
function createPlayerCombatants(players: {
  discordUserId: string;
  character: Character;
}[]): PlayerCombatant[];
```

Defined in: [adventure/encounter-engine.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L100)

Create player combatants from characters

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `players` | \{ `discordUserId`: `string`; `character`: [`Character`](types.md#character); \}[] |

#### Returns

[`PlayerCombatant`](#playercombatant)[]

***

### createMonsterCombatants()

```ts
function createMonsterCombatants(monsters: {
  creature: Creature;
  count: number;
}[], roller?: DiceRoller): MonsterCombatant[];
```

Defined in: [adventure/encounter-engine.ts:124](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L124)

Create monster combatants from creatures

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `monsters` | \{ `creature`: [`Creature`](types.md#creature); `count`: `number`; \}[] |
| `roller?` | [`DiceRoller`](types.md#diceroller) |

#### Returns

[`MonsterCombatant`](#monstercombatant)[]

***

### createCombatEncounter()

```ts
function createCombatEncounter(
   encounterId: string, 
   players: {
  discordUserId: string;
  character: Character;
}[], 
   monsters: {
  creature: Creature;
  count: number;
}[], 
   roller?: DiceRoller
): CombatEncounterState;
```

Defined in: [adventure/encounter-engine.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L160)

Create a new combat encounter

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounterId` | `string` |
| `players` | \{ `discordUserId`: `string`; `character`: [`Character`](types.md#character); \}[] |
| `monsters` | \{ `creature`: [`Creature`](types.md#creature); `count`: `number`; \}[] |
| `roller?` | [`DiceRoller`](types.md#diceroller) |

#### Returns

[`CombatEncounterState`](#combatencounterstate)

***

### rollAllInitiative()

```ts
function rollAllInitiative(encounter: CombatEncounterState, roller?: DiceRoller): CombatEncounterState;
```

Defined in: [adventure/encounter-engine.ts:232](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L232)

Roll initiative for all combatants and set up turn order

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `roller?` | [`DiceRoller`](types.md#diceroller) |

#### Returns

[`CombatEncounterState`](#combatencounterstate)

***

### getCurrentTurnCombatant()

```ts
function getCurrentTurnCombatant(encounter: CombatEncounterState): Combatant | undefined;
```

Defined in: [adventure/encounter-engine.ts:280](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L280)

Get the current turn's combatant

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |

#### Returns

[`Combatant`](#combatant) \| `undefined`

***

### isPlayersTurn()

```ts
function isPlayersTurn(encounter: CombatEncounterState, discordUserId: string): boolean;
```

Defined in: [adventure/encounter-engine.ts:292](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L292)

Check if it's a specific player's turn

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `discordUserId` | `string` |

#### Returns

`boolean`

***

### getCombatantById()

```ts
function getCombatantById(encounter: CombatEncounterState, combatantId: string): Combatant | undefined;
```

Defined in: [adventure/encounter-engine.ts:304](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L304)

Get a combatant by ID

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `combatantId` | `string` |

#### Returns

[`Combatant`](#combatant) \| `undefined`

***

### getCombatantByName()

```ts
function getCombatantByName(encounter: CombatEncounterState, name: string): Combatant | undefined;
```

Defined in: [adventure/encounter-engine.ts:314](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L314)

Get a combatant by name (partial match, case-insensitive)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `name` | `string` |

#### Returns

[`Combatant`](#combatant) \| `undefined`

***

### getLivingCombatants()

```ts
function getLivingCombatants(encounter: CombatEncounterState): Combatant[];
```

Defined in: [adventure/encounter-engine.ts:327](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L327)

Get all living combatants

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |

#### Returns

[`Combatant`](#combatant)[]

***

### getLivingPlayers()

```ts
function getLivingPlayers(encounter: CombatEncounterState): PlayerCombatant[];
```

Defined in: [adventure/encounter-engine.ts:336](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L336)

Get all living players

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |

#### Returns

[`PlayerCombatant`](#playercombatant)[]

***

### getLivingMonsters()

```ts
function getLivingMonsters(encounter: CombatEncounterState): MonsterCombatant[];
```

Defined in: [adventure/encounter-engine.ts:347](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L347)

Get all living monsters

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |

#### Returns

[`MonsterCombatant`](#monstercombatant)[]

***

### advanceTurn()

```ts
function advanceTurn(encounter: CombatEncounterState): CombatEncounterState;
```

Defined in: [adventure/encounter-engine.ts:359](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L359)

Advance to the next turn

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |

#### Returns

[`CombatEncounterState`](#combatencounterstate)

***

### applyCombatDamage()

```ts
function applyCombatDamage(
   encounter: CombatEncounterState, 
   targetId: string, 
   damage: number
): CombatEncounterState;
```

Defined in: [adventure/encounter-engine.ts:424](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L424)

Apply damage to a combatant

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `targetId` | `string` |
| `damage` | `number` |

#### Returns

[`CombatEncounterState`](#combatencounterstate)

***

### processPlayerAttack()

```ts
function processPlayerAttack(
   encounter: CombatEncounterState, 
   attackerId: string, 
   targetId: string, 
   roller?: DiceRoller
): {
  encounter: CombatEncounterState;
  result: AttackActionResult;
};
```

Defined in: [adventure/encounter-engine.ts:473](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L473)

Process a player attack action

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `attackerId` | `string` |
| `targetId` | `string` |
| `roller?` | [`DiceRoller`](types.md#diceroller) |

#### Returns

```ts
{
  encounter: CombatEncounterState;
  result: AttackActionResult;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) | [adventure/encounter-engine.ts:478](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L478) |
| `result` | [`AttackActionResult`](#attackactionresult) | [adventure/encounter-engine.ts:478](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L478) |

***

### checkCombatEnd()

```ts
function checkCombatEnd(encounter: CombatEncounterState): {
  ended: boolean;
  reason?: "fled" | "victory" | "defeat";
};
```

Defined in: [adventure/encounter-engine.ts:600](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L600)

Check if combat has ended

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |

#### Returns

```ts
{
  ended: boolean;
  reason?: "fled" | "victory" | "defeat";
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `ended` | `boolean` | [adventure/encounter-engine.ts:602](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L602) |
| `reason?` | `"fled"` \| `"victory"` \| `"defeat"` | [adventure/encounter-engine.ts:602](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L602) |

***

### endCombat()

```ts
function endCombat(encounter: CombatEncounterState, reason: "fled" | "victory" | "defeat"): CombatEncounterState;
```

Defined in: [adventure/encounter-engine.ts:627](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L627)

End the combat encounter

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `reason` | `"fled"` \| `"victory"` \| `"defeat"` |

#### Returns

[`CombatEncounterState`](#combatencounterstate)

***

### processMonsterTurn()

```ts
function processMonsterTurn(
   encounter: CombatEncounterState, 
   monsterId: string, 
   roller?: DiceRoller
): {
  encounter: CombatEncounterState;
  result: MonsterTurnResult;
};
```

Defined in: [adventure/encounter-engine.ts:861](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L861)

Process a single monster's turn

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `monsterId` | `string` |
| `roller?` | [`DiceRoller`](types.md#diceroller) |

#### Returns

```ts
{
  encounter: CombatEncounterState;
  result: MonsterTurnResult;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) | [adventure/encounter-engine.ts:865](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L865) |
| `result` | [`MonsterTurnResult`](#monsterturnresult) | [adventure/encounter-engine.ts:865](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L865) |

***

### processAllMonsterTurns()

```ts
function processAllMonsterTurns(encounter: CombatEncounterState, roller?: DiceRoller): {
  encounter: CombatEncounterState;
  results: MonsterTurnResult[];
};
```

Defined in: [adventure/encounter-engine.ts:943](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L943)

Process all pending monster turns until it's a player's turn or combat ends

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) |
| `roller?` | [`DiceRoller`](types.md#diceroller) |

#### Returns

```ts
{
  encounter: CombatEncounterState;
  results: MonsterTurnResult[];
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `encounter` | [`CombatEncounterState`](#combatencounterstate) | [adventure/encounter-engine.ts:946](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L946) |
| `results` | [`MonsterTurnResult`](#monsterturnresult)[] | [adventure/encounter-engine.ts:946](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/encounter-engine.ts#L946) |

***

### createNarrativeEncounter()

```ts
function createNarrativeEncounter(template: NarrativeTemplate): NarrativeEncounterState;
```

Defined in: [adventure/narrative-engine.ts:54](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L54)

Create a new narrative encounter from a template.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `template` | [`NarrativeTemplate`](#narrativetemplate) |

#### Returns

[`NarrativeEncounterState`](#narrativeencounterstate)

***

### createNarrativeEncounterFromCategory()

```ts
function createNarrativeEncounterFromCategory(category: NarrativeCategory): NarrativeEncounterState | null;
```

Defined in: [adventure/narrative-engine.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L70)

Create a narrative encounter from a category (random template).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `category` | [`NarrativeCategory`](#narrativecategory) |

#### Returns

[`NarrativeEncounterState`](#narrativeencounterstate) \| `null`

***

### createNarrativeEncounterFromId()

```ts
function createNarrativeEncounterFromId(templateId: string): NarrativeEncounterState | null;
```

Defined in: [adventure/narrative-engine.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L83)

Create a narrative encounter from a template ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `templateId` | `string` |

#### Returns

[`NarrativeEncounterState`](#narrativeencounterstate) \| `null`

***

### chooseOption()

```ts
function chooseOption(
   encounter: NarrativeEncounterState, 
   optionId: string, 
   character: Character, 
   playerInfo: {
  playerId: string;
  playerName: string;
}, 
   roller?: DiceRoller
): ChooseOptionResult | null;
```

Defined in: [adventure/narrative-engine.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L120)

Choose an option in a narrative encounter.
If the option requires a skill check, it will be rolled.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `encounter` | [`NarrativeEncounterState`](#narrativeencounterstate) | `undefined` |
| `optionId` | `string` | `undefined` |
| `character` | [`Character`](types.md#character) | `undefined` |
| `playerInfo` | \{ `playerId`: `string`; `playerName`: `string`; \} | `undefined` |
| `playerInfo.playerId` | `string` | `undefined` |
| `playerInfo.playerName` | `string` | `undefined` |
| `roller?` | `DiceRoller` | `defaultRoller` |

#### Returns

[`ChooseOptionResult`](#chooseoptionresult) \| `null`

***

### getAvailableOptions()

```ts
function getAvailableOptions(encounter: NarrativeEncounterState): NarrativeOption[];
```

Defined in: [adventure/narrative-engine.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L199)

Get the available options for an encounter.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`NarrativeEncounterState`](#narrativeencounterstate) |

#### Returns

[`NarrativeOption`](#narrativeoption)[]

***

### isEncounterResolved()

```ts
function isEncounterResolved(encounter: NarrativeEncounterState): boolean;
```

Defined in: [adventure/narrative-engine.ts:211](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L211)

Check if an encounter is resolved.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `encounter` | [`NarrativeEncounterState`](#narrativeencounterstate) |

#### Returns

`boolean`

***

### formatOptionDisplay()

```ts
function formatOptionDisplay(option: NarrativeOption): string;
```

Defined in: [adventure/narrative-engine.ts:244](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L244)

Format an option for display, including skill check info.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `option` | [`NarrativeOption`](#narrativeoption) |

#### Returns

`string`

***

### formatCheckResult()

```ts
function formatCheckResult(result: NarrativeCheckResult): string;
```

Defined in: [adventure/narrative-engine.ts:258](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-engine.ts#L258)

Format a skill check result for display.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`NarrativeCheckResult`](#narrativecheckresult) |

#### Returns

`string`

***

### getRandomTemplate()

```ts
function getRandomTemplate(category: NarrativeCategory): NarrativeTemplate | undefined;
```

Defined in: [adventure/narrative-templates.ts:395](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-templates.ts#L395)

Get a random template from a specific category.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `category` | [`NarrativeCategory`](#narrativecategory) |

#### Returns

[`NarrativeTemplate`](#narrativetemplate) \| `undefined`

***

### getTemplateById()

```ts
function getTemplateById(id: string): NarrativeTemplate | undefined;
```

Defined in: [adventure/narrative-templates.ts:413](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-templates.ts#L413)

Get a template by ID.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

[`NarrativeTemplate`](#narrativetemplate) \| `undefined`

***

### getTemplatesByCategory()

```ts
function getTemplatesByCategory(category: NarrativeCategory): NarrativeTemplate[];
```

Defined in: [adventure/narrative-templates.ts:420](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-templates.ts#L420)

Get all templates in a category.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `category` | [`NarrativeCategory`](#narrativecategory) |

#### Returns

[`NarrativeTemplate`](#narrativetemplate)[]

***

### getAvailableCategories()

```ts
function getAvailableCategories(): NarrativeCategory[];
```

Defined in: [adventure/narrative-templates.ts:431](https://github.com/moonloch/dcc-core-lib/blob/main/src/adventure/narrative-templates.ts#L431)

Get all available categories.

#### Returns

[`NarrativeCategory`](#narrativecategory)[]
