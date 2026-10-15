# combat

## Interfaces

### DamageApplicationResult

Defined in: [combat/death-and-dying.ts:35](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L35)

Result of checking a character's vital status after taking damage

#### Properties

##### newHP

```ts
newHP: number;
```

Defined in: [combat/death-and-dying.ts:37](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L37)

New current HP

##### status

```ts
status: VitalStatus;
```

Defined in: [combat/death-and-dying.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L40)

New vital status

##### roundsUntilDeath?

```ts
optional roundsUntilDeath?: number;
```

Defined in: [combat/death-and-dying.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L43)

Rounds remaining before permanent death (if bleeding out)

##### instantDeath

```ts
instantDeath: boolean;
```

Defined in: [combat/death-and-dying.ts:46](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L46)

Whether the character was instantly killed (0-level or massive damage)

##### startedBleedingOut

```ts
startedBleedingOut: boolean;
```

Defined in: [combat/death-and-dying.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L49)

Whether the character just started bleeding out

***

### BleedingOutState

Defined in: [combat/death-and-dying.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L55)

State of a bleeding out character

#### Properties

##### roundsRemaining

```ts
roundsRemaining: number;
```

Defined in: [combat/death-and-dying.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L57)

Number of rounds remaining before permanent death

##### maxRounds

```ts
maxRounds: number;
```

Defined in: [combat/death-and-dying.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L60)

Maximum rounds (equal to level)

##### startRound

```ts
startRound: number;
```

Defined in: [combat/death-and-dying.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L63)

Round combat started (for tracking)

***

### StabilizeResult

Defined in: [combat/death-and-dying.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L69)

Result of attempting to stabilize/save a bleeding out character

#### Properties

##### saved

```ts
saved: boolean;
```

Defined in: [combat/death-and-dying.ts:71](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L71)

Whether the character was saved

##### newHP?

```ts
optional newHP?: number;
```

Defined in: [combat/death-and-dying.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L74)

New HP after healing (if saved)

##### staminaLoss

```ts
staminaLoss: boolean;
```

Defined in: [combat/death-and-dying.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L77)

Whether character suffered permanent Stamina loss

##### scar?

```ts
optional scar?: string;
```

Defined in: [combat/death-and-dying.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L80)

The permanent scar gained

##### scarIndex?

```ts
optional scarIndex?: number;
```

Defined in: [combat/death-and-dying.ts:87](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L87)

Stable index of the scar in [SCAR\_DESCRIPTIONS](#scar_descriptions) (0-based).
Consumers with localization use this to translate the scar rather
than displaying the English `scar` string.

##### failureReason?

```ts
optional failureReason?: string;
```

Defined in: [combat/death-and-dying.ts:90](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L90)

Reason for failure (if not saved)

***

### BodyRecoveryResult

Defined in: [combat/death-and-dying.ts:96](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L96)

Result of recovering a dead body

#### Properties

##### success

```ts
success: boolean;
```

Defined in: [combat/death-and-dying.ts:98](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L98)

Whether the Luck check succeeded

##### luckRoll

```ts
luckRoll: number;
```

Defined in: [combat/death-and-dying.ts:101](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L101)

The Luck roll made

##### luckTarget

```ts
luckTarget: number;
```

Defined in: [combat/death-and-dying.ts:107](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L107)

The character's Luck score — the roll-under target. Body recovery is
a roll-under-Luck check, not a meet-or-exceed DC.

##### newHP?

```ts
optional newHP?: number;
```

Defined in: [combat/death-and-dying.ts:110](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L110)

If success, the character recovers to this HP

##### groggyDuration?

```ts
optional groggyDuration?: string;
```

Defined in: [combat/death-and-dying.ts:113](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L113)

Penalty duration (-4 to all rolls for 1 hour)

##### permanentPenalty?

```ts
optional permanentPenalty?: {
  ability: DCCAbilityId;
  amount: number;
};
```

Defined in: [combat/death-and-dying.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L116)

Permanent ability penalty

###### ability

```ts
ability: DCCAbilityId;
```

###### amount

```ts
amount: number;
```

***

### HealingResult

Defined in: [combat/death-and-dying.ts:130](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L130)

Result of natural healing from rest

#### Properties

##### hpHealed

```ts
hpHealed: number;
```

Defined in: [combat/death-and-dying.ts:132](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L132)

HP healed

##### newHP

```ts
newHP: number;
```

Defined in: [combat/death-and-dying.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L135)

New current HP

##### abilityHealed

```ts
abilityHealed: Partial<Record<DCCAbilityId, number>>;
```

Defined in: [combat/death-and-dying.ts:138](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L138)

Ability points healed (if any ability damage)

***

### AbilityLossResult

Defined in: [combat/misc-rules.ts:38](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L38)

Result of checking ability loss effects

#### Properties

##### ability

```ts
ability: DCCAbilityId;
```

Defined in: [combat/misc-rules.ts:40](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L40)

Which ability is at 0

##### effect

```ts
effect: AbilityLossEffect;
```

Defined in: [combat/misc-rules.ts:43](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L43)

The effect on the character

##### description

```ts
description: string;
```

Defined in: [combat/misc-rules.ts:46](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L46)

Description of the effect

##### incapacitated

```ts
incapacitated: boolean;
```

Defined in: [combat/misc-rules.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L49)

Whether the character is incapacitated

***

### OnFireState

Defined in: [combat/misc-rules.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L55)

State of a character on fire

#### Properties

##### damageDie

```ts
damageDie: string;
```

Defined in: [combat/misc-rules.ts:57](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L57)

Damage die per round (default 1d6)

##### extinguishDC

```ts
extinguishDC: number;
```

Defined in: [combat/misc-rules.ts:60](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L60)

DC to put out the fire (default 10)

##### roundsOnFire

```ts
roundsOnFire: number;
```

Defined in: [combat/misc-rules.ts:63](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L63)

Rounds the character has been on fire

##### source?

```ts
optional source?: string;
```

Defined in: [combat/misc-rules.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L66)

Source of the fire (for description)

***

### FireDamageResult

Defined in: [combat/misc-rules.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L72)

Result of fire damage for a round

#### Properties

##### damage

```ts
damage: number;
```

Defined in: [combat/misc-rules.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L74)

Damage taken this round

##### attemptedExtinguish

```ts
attemptedExtinguish: boolean;
```

Defined in: [combat/misc-rules.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L77)

Whether the character attempted to extinguish

##### reflexRoll?

```ts
optional reflexRoll?: number;
```

Defined in: [combat/misc-rules.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L80)

The Reflex save roll (if attempted)

##### extinguished

```ts
extinguished: boolean;
```

Defined in: [combat/misc-rules.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L83)

Whether the fire was extinguished

##### newState?

```ts
optional newState?: OnFireState;
```

Defined in: [combat/misc-rules.ts:86](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L86)

Updated fire state (undefined if extinguished)

***

### ChargeModifiers

Defined in: [combat/misc-rules.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L92)

Charge attack modifiers

#### Properties

##### attackBonus

```ts
attackBonus: number;
```

Defined in: [combat/misc-rules.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L94)

Attack bonus from charging (+2)

##### acPenalty

```ts
acPenalty: number;
```

Defined in: [combat/misc-rules.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L97)

AC penalty from charging (-2)

##### minDistance

```ts
minDistance: number;
```

Defined in: [combat/misc-rules.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L100)

Minimum distance required (half speed)

***

### FallingDamageResult

Defined in: [combat/misc-rules.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L106)

Result of falling damage

#### Properties

##### damage

```ts
damage: number;
```

Defined in: [combat/misc-rules.ts:108](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L108)

Total damage taken

##### diceResults

```ts
diceResults: number[];
```

Defined in: [combat/misc-rules.ts:111](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L111)

Individual die results

##### brokenBones

```ts
brokenBones: number;
```

Defined in: [combat/misc-rules.ts:114](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L114)

Number of broken bones (dice that rolled 6)

##### distanceFallen

```ts
distanceFallen: number;
```

Defined in: [combat/misc-rules.ts:117](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L117)

Distance fallen in feet

##### permanentLoss

```ts
permanentLoss: number;
```

Defined in: [combat/misc-rules.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L120)

Permanent ability loss from broken bones

***

### FiringIntoMeleeResult

Defined in: [combat/misc-rules.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L126)

Result of firing into melee when missing

#### Properties

##### hitAlly

```ts
hitAlly: boolean;
```

Defined in: [combat/misc-rules.ts:128](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L128)

Whether the shot went wild

##### chanceRoll

```ts
chanceRoll: number;
```

Defined in: [combat/misc-rules.ts:131](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L131)

The d100 roll for determining if ally is hit

##### allyIndex?

```ts
optional allyIndex?: number;
```

Defined in: [combat/misc-rules.ts:134](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L134)

Index of ally hit (if any) - for random selection

##### allyAttackRoll?

```ts
optional allyAttackRoll?: number;
```

Defined in: [combat/misc-rules.ts:137](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L137)

Re-roll attack result against ally's AC (if hit)

##### allyWasHit?

```ts
optional allyWasHit?: boolean;
```

Defined in: [combat/misc-rules.ts:140](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L140)

Whether the re-roll hit the ally

***

### GrappleParticipant

Defined in: [combat/misc-rules.ts:146](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L146)

Grapple participant stats

#### Properties

##### attackBonus

```ts
attackBonus: number;
```

Defined in: [combat/misc-rules.ts:148](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L148)

Attack bonus

##### strengthMod

```ts
strengthMod: number;
```

Defined in: [combat/misc-rules.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L151)

Strength modifier

##### agilityMod

```ts
agilityMod: number;
```

Defined in: [combat/misc-rules.ts:154](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L154)

Agility modifier

##### sizeCategory

```ts
sizeCategory: number;
```

Defined in: [combat/misc-rules.ts:157](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L157)

Size category (1 = small, 2 = medium, 3 = large, etc.)

##### hitDice?

```ts
optional hitDice?: number;
```

Defined in: [combat/misc-rules.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L160)

For monsters: hit dice (used instead of ability mods)

***

### GrappleResult

Defined in: [combat/misc-rules.ts:166](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L166)

Result of a grapple attempt

#### Properties

##### attackerRoll

```ts
attackerRoll: number;
```

Defined in: [combat/misc-rules.ts:168](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L168)

Attacker's roll

##### attackerTotal

```ts
attackerTotal: number;
```

Defined in: [combat/misc-rules.ts:171](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L171)

Attacker's total (roll + mods)

##### defenderRoll

```ts
defenderRoll: number;
```

Defined in: [combat/misc-rules.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L174)

Defender's roll

##### defenderTotal

```ts
defenderTotal: number;
```

Defined in: [combat/misc-rules.ts:177](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L177)

Defender's total (roll + mods)

##### attackerWins

```ts
attackerWins: boolean;
```

Defined in: [combat/misc-rules.ts:180](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L180)

Whether the attacker won

##### targetPinned

```ts
targetPinned: boolean;
```

Defined in: [combat/misc-rules.ts:183](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L183)

Whether target is now pinned

##### modifiers

```ts
modifiers: LegacyRollModifier[];
```

Defined in: [combat/misc-rules.ts:186](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L186)

All modifiers applied

***

### ArmorRecoveryResult

Defined in: [combat/misc-rules.ts:192](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L192)

Result of armor recovery check

#### Properties

##### usable

```ts
usable: boolean;
```

Defined in: [combat/misc-rules.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L194)

Whether the armor is usable

##### roll

```ts
roll: number;
```

Defined in: [combat/misc-rules.ts:197](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L197)

The d100 roll

##### humanSized?

```ts
optional humanSized?: boolean;
```

Defined in: [combat/misc-rules.ts:200](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L200)

Whether armor fits humans (if checking)

##### repairCostFraction?

```ts
optional repairCostFraction?: number;
```

Defined in: [combat/misc-rules.ts:203](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L203)

Estimated repair cost (fraction of original)

***

### MissileRecoveryResult

Defined in: [combat/misc-rules.ts:209](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L209)

Result of missile weapon recovery

#### Properties

##### recovered

```ts
recovered: number;
```

Defined in: [combat/misc-rules.ts:211](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L211)

Number of missiles recovered

##### destroyed

```ts
destroyed: number;
```

Defined in: [combat/misc-rules.ts:214](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L214)

Number of missiles destroyed

##### rolls

```ts
rolls: {
  roll: number;
  destroyed: boolean;
}[];
```

Defined in: [combat/misc-rules.ts:217](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L217)

Individual roll results

###### roll

```ts
roll: number;
```

###### destroyed

```ts
destroyed: boolean;
```

***

### SubdualDamageResult

Defined in: [combat/misc-rules.ts:223](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L223)

Subdual damage info

#### Properties

##### damageDie

```ts
damageDie: string;
```

Defined in: [combat/misc-rules.ts:225](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L225)

The stepped-down damage die

##### damage

```ts
damage: number;
```

Defined in: [combat/misc-rules.ts:228](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L228)

Damage rolled

##### isSubdual

```ts
isSubdual: true;
```

Defined in: [combat/misc-rules.ts:231](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L231)

Whether this damage is subdual (non-lethal)

##### originalDie

```ts
originalDie: string;
```

Defined in: [combat/misc-rules.ts:234](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L234)

Original weapon die (before step-down)

***

### MissileRangeBands

Defined in: [combat/misc-rules.ts:598](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L598)

A missile weapon's three range increments, in the scene's distance unit
(typically feet). Each value is the maximum distance for that band.

#### Properties

##### short

```ts
short: number;
```

Defined in: [combat/misc-rules.ts:600](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L600)

Maximum distance for short range (no penalty)

##### medium

```ts
medium: number;
```

Defined in: [combat/misc-rules.ts:603](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L603)

Maximum distance for medium range (-2 to attack)

##### long

```ts
long: number;
```

Defined in: [combat/misc-rules.ts:606](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L606)

Maximum distance for long range (-1d to the action die)

***

### MissileRangePenalty

Defined in: [combat/misc-rules.ts:612](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L612)

The penalty owed for a missile attack at a given distance.

#### Properties

##### band

```ts
band: MissileRangeBand;
```

Defined in: [combat/misc-rules.ts:614](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L614)

Which range band the target falls into

##### attackModifier

```ts
attackModifier: number;
```

Defined in: [combat/misc-rules.ts:617](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L617)

Flat modifier to the attack roll (e.g. -2 at medium range, 0 otherwise)

##### actionDieSteps

```ts
actionDieSteps: number;
```

Defined in: [combat/misc-rules.ts:620](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L620)

Dice-chain steps applied to the action die (e.g. -1 at long range, 0 otherwise)

##### actionDie?

```ts
optional actionDie?: string;
```

Defined in: [combat/misc-rules.ts:623](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L623)

The action die after applying [actionDieSteps](#actiondiesteps) (only when an action die was supplied)

##### outOfRange

```ts
outOfRange: boolean;
```

Defined in: [combat/misc-rules.ts:626](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L626)

Whether the target is beyond the weapon's maximum (long) range

***

### WithdrawalOpponent

Defined in: [combat/misc-rules.ts:1038](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1038)

Opponent info for withdrawal attacks of opportunity

#### Properties

##### name

```ts
name: string;
```

Defined in: [combat/misc-rules.ts:1040](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1040)

Opponent's name/identifier

##### attackBonus

```ts
attackBonus: number;
```

Defined in: [combat/misc-rules.ts:1043](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1043)

Opponent's attack bonus

##### damageDie

```ts
damageDie: string;
```

Defined in: [combat/misc-rules.ts:1046](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1046)

Opponent's damage die

##### strengthMod

```ts
strengthMod: number;
```

Defined in: [combat/misc-rules.ts:1049](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1049)

Opponent's strength modifier for damage

***

### AttackOfOpportunityResult

Defined in: [combat/misc-rules.ts:1055](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1055)

Result of a single attack of opportunity

#### Properties

##### opponentName

```ts
opponentName: string;
```

Defined in: [combat/misc-rules.ts:1057](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1057)

Opponent making the attack

##### attackRoll

```ts
attackRoll: number;
```

Defined in: [combat/misc-rules.ts:1060](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1060)

Attack roll

##### attackTotal

```ts
attackTotal: number;
```

Defined in: [combat/misc-rules.ts:1063](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1063)

Total attack (roll + bonus)

##### hit

```ts
hit: boolean;
```

Defined in: [combat/misc-rules.ts:1066](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1066)

Whether the attack hit

##### damage?

```ts
optional damage?: number;
```

Defined in: [combat/misc-rules.ts:1069](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1069)

Damage dealt (if hit)

***

### WithdrawalResult

Defined in: [combat/misc-rules.ts:1075](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1075)

Result of withdrawing from melee

#### Properties

##### numOpponents

```ts
numOpponents: number;
```

Defined in: [combat/misc-rules.ts:1077](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1077)

Number of opponents who got free attacks

##### attacks

```ts
attacks: AttackOfOpportunityResult[];
```

Defined in: [combat/misc-rules.ts:1080](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1080)

Results of each attack of opportunity

##### totalDamage

```ts
totalDamage: number;
```

Defined in: [combat/misc-rules.ts:1083](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1083)

Total damage taken

***

### MountState

Defined in: [combat/misc-rules.ts:1186](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1186)

State of a mount in combat

#### Properties

##### horseType

```ts
horseType: HorseType;
```

Defined in: [combat/misc-rules.ts:1188](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1188)

Type of horse

##### combatTrained

```ts
combatTrained: boolean;
```

Defined in: [combat/misc-rules.ts:1191](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1191)

Whether the horse is trained for combat (warhorses always are)

##### currentHP

```ts
currentHP: number;
```

Defined in: [combat/misc-rules.ts:1194](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1194)

Horse's current HP

##### maxHP

```ts
maxHP: number;
```

Defined in: [combat/misc-rules.ts:1197](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1197)

Horse's max HP

##### halfHPChecked

```ts
halfHPChecked: boolean;
```

Defined in: [combat/misc-rules.ts:1200](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1200)

Whether first-wounded check has been triggered (for warhorses)

##### initiativeMod

```ts
initiativeMod: number;
```

Defined in: [combat/misc-rules.ts:1203](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1203)

Horse's initiative modifier

##### speed

```ts
speed: number;
```

Defined in: [combat/misc-rules.ts:1206](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1206)

Horse's movement speed

##### ac

```ts
ac: number;
```

Defined in: [combat/misc-rules.ts:1209](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1209)

Horse's AC

##### attackBonus?

```ts
optional attackBonus?: number;
```

Defined in: [combat/misc-rules.ts:1212](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1212)

Horse's attack bonus (if combat trained)

##### damageDie?

```ts
optional damageDie?: string;
```

Defined in: [combat/misc-rules.ts:1215](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1215)

Horse's damage die (if combat trained)

***

### MountedCombatBonuses

Defined in: [combat/misc-rules.ts:1221](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1221)

Mounted combat bonuses

#### Properties

##### acBonus

```ts
acBonus: number;
```

Defined in: [combat/misc-rules.ts:1223](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1223)

AC bonus while mounted (+1)

##### attackBonusVsUnmounted

```ts
attackBonusVsUnmounted: number;
```

Defined in: [combat/misc-rules.ts:1226](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1226)

Attack bonus vs unmounted opponents (+1 higher ground)

##### lanceDamageDoubled

```ts
lanceDamageDoubled: boolean;
```

Defined in: [combat/misc-rules.ts:1229](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1229)

Whether lance/spear damage dice are doubled (charging)

***

### StayMountedResult

Defined in: [combat/misc-rules.ts:1235](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1235)

Result of a stay mounted check

#### Properties

##### dieUsed

```ts
dieUsed: string;
```

Defined in: [combat/misc-rules.ts:1237](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1237)

The die used (d20 trained, d10 untrained)

##### roll

```ts
roll: number;
```

Defined in: [combat/misc-rules.ts:1240](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1240)

The roll result

##### dc

```ts
dc: number;
```

Defined in: [combat/misc-rules.ts:1243](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1243)

The DC to beat

##### stayedMounted

```ts
stayedMounted: boolean;
```

Defined in: [combat/misc-rules.ts:1246](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1246)

Whether the check passed

##### isProne

```ts
isProne: boolean;
```

Defined in: [combat/misc-rules.ts:1249](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1249)

If failed, character is now prone

##### reason

```ts
reason: string;
```

Defined in: [combat/misc-rules.ts:1252](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1252)

Reason for the check

***

### HorseSpookedResult

Defined in: [combat/misc-rules.ts:1258](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1258)

Result of checking if a horse is spooked

#### Properties

##### spooked

```ts
spooked: boolean;
```

Defined in: [combat/misc-rules.ts:1260](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1260)

Whether the horse is spooked

##### reason

```ts
reason: string;
```

Defined in: [combat/misc-rules.ts:1263](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1263)

Reason for spook (or why not spooked)

##### requiresStayMountedCheck

```ts
requiresStayMountedCheck: boolean;
```

Defined in: [combat/misc-rules.ts:1266](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1266)

Whether a stay mounted check is required

***

### GroupMoraleState

Defined in: [combat/morale.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L47)

Morale state for a group of creatures

#### Properties

##### totalCreatures

```ts
totalCreatures: number;
```

Defined in: [combat/morale.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L49)

Total creatures in the group at start

##### activeCreatures

```ts
activeCreatures: number;
```

Defined in: [combat/morale.ts:52](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L52)

Currently alive/active creatures

##### firstCasualtyChecked

```ts
firstCasualtyChecked: boolean;
```

Defined in: [combat/morale.ts:55](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L55)

Whether first casualty check has been made

##### halfDownChecked

```ts
halfDownChecked: boolean;
```

Defined in: [combat/morale.ts:58](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L58)

Whether half-down check has been made

***

### CreatureMoraleState

Defined in: [combat/morale.ts:64](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L64)

Morale state for a single creature

#### Properties

##### maxHP

```ts
maxHP: number;
```

Defined in: [combat/morale.ts:66](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L66)

Maximum hit points

##### currentHP

```ts
currentHP: number;
```

Defined in: [combat/morale.ts:69](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L69)

Current hit points

##### halfHPChecked

```ts
halfHPChecked: boolean;
```

Defined in: [combat/morale.ts:72](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L72)

Whether half-HP check has been made

***

### RetainerMoraleState

Defined in: [combat/morale.ts:78](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L78)

Morale state for a retainer

#### Properties

##### firstCombatChecked

```ts
firstCombatChecked: boolean;
```

Defined in: [combat/morale.ts:80](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L80)

Whether first combat check has been made this adventure

##### firstDangerChecked

```ts
firstDangerChecked: boolean;
```

Defined in: [combat/morale.ts:83](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L83)

Whether first danger check has been made this adventure

***

### MoraleCheckInput

Defined in: [combat/morale.ts:89](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L89)

Input for making a morale check

#### Properties

##### entityType

```ts
entityType: MoraleEntityType;
```

Defined in: [combat/morale.ts:91](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L91)

Type of entity

##### willSave

```ts
willSave: number;
```

Defined in: [combat/morale.ts:94](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L94)

Creature's Will save bonus

##### trigger

```ts
trigger: MoraleTrigger;
```

Defined in: [combat/morale.ts:97](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L97)

What triggered the check

##### dc?

```ts
optional dc?: number;
```

Defined in: [combat/morale.ts:100](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L100)

DC to beat (default 11)

##### situationalModifier?

```ts
optional situationalModifier?: number;
```

Defined in: [combat/morale.ts:103](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L103)

Situational modifier (-4 to +4)

##### employerPersonalityMod?

```ts
optional employerPersonalityMod?: number;
```

Defined in: [combat/morale.ts:106](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L106)

For retainers: employer's Personality modifier

##### isImmune?

```ts
optional isImmune?: boolean;
```

Defined in: [combat/morale.ts:109](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L109)

Whether creature is immune to morale (automatons, golems, etc.)

##### additionalModifiers?

```ts
optional additionalModifiers?: LegacyRollModifier[];
```

Defined in: [combat/morale.ts:112](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L112)

Additional modifiers

***

### MoraleCheckResult

Defined in: [combat/morale.ts:118](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L118)

Result of a morale check

#### Properties

##### roll

```ts
roll: number;
```

Defined in: [combat/morale.ts:120](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L120)

The d20 roll result

##### total

```ts
total: number;
```

Defined in: [combat/morale.ts:123](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L123)

Total after all modifiers

##### dc

```ts
dc: number;
```

Defined in: [combat/morale.ts:126](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L126)

DC that needed to be met

##### passed

```ts
passed: boolean;
```

Defined in: [combat/morale.ts:129](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L129)

Whether the check passed (creature keeps fighting)

##### immune

```ts
immune: boolean;
```

Defined in: [combat/morale.ts:132](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L132)

Whether the check was skipped due to immunity

##### modifiers

```ts
modifiers: LegacyRollModifier[];
```

Defined in: [combat/morale.ts:135](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L135)

All modifiers applied

##### trigger

```ts
trigger: MoraleTrigger;
```

Defined in: [combat/morale.ts:138](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L138)

What triggered this check

##### outcome

```ts
outcome: "fights" | "flees" | "immune";
```

Defined in: [combat/morale.ts:141](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L141)

Description of outcome

## Type Aliases

### VitalStatus

```ts
type VitalStatus = "alive" | "unconscious" | "bleeding-out" | "dead" | "permanently-dead";
```

Defined in: [combat/death-and-dying.ts:25](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L25)

Character's vital status

***

### RestType

```ts
type RestType = "active-adventure" | "bed-rest";
```

Defined in: [combat/death-and-dying.ts:125](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L125)

Type of rest for healing

***

### AbilityLossEffect

```ts
type AbilityLossEffect = "babbling-idiot" | "immobile" | "unconscious" | "constant-mishaps";
```

Defined in: [combat/misc-rules.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L29)

Effect of having an ability reduced to 0

***

### MissileRangeBand

```ts
type MissileRangeBand = "short" | "medium" | "long" | "out-of-range";
```

Defined in: [combat/misc-rules.ts:592](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L592)

The three DCC missile range bands, plus the beyond-maximum case.

Per the DCC core rulebook (p. 96), a missile weapon lists three range
increments. A target within short range is attacked normally; medium range
imposes a -2 penalty to the attack roll; long range imposes a -1d penalty
(the action die steps down one rung on the dice chain). Beyond long range
the target cannot be attacked.

***

### HorseType

```ts
type HorseType = "warhorse" | "riding-horse" | "draft-horse" | "pony";
```

Defined in: [combat/misc-rules.ts:1181](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1181)

Type of horse for combat purposes

***

### MoraleEntityType

```ts
type MoraleEntityType = "monster" | "retainer" | "npc";
```

Defined in: [combat/morale.ts:29](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L29)

Type of entity making the morale check

***

### MoraleTrigger

```ts
type MoraleTrigger = 
  | "first-ally-slain"
  | "half-allies-down"
  | "half-hp-lost"
  | "first-combat"
  | "first-danger"
  | "end-of-adventure"
  | "magical-effect"
  | "other";
```

Defined in: [combat/morale.ts:34](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L34)

Trigger that caused the morale check

***

### MoraleImmuneType

```ts
type MoraleImmuneType = typeof MORALE_IMMUNE_TYPES[number];
```

Defined in: [combat/morale.ts:479](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L479)

## Variables

### DEFAULT\_CRIT\_DIE

```ts
const DEFAULT_CRIT_DIE: DieType = "d8";
```

Defined in: [combat/crits.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L42)

Default crit die when no class progression is registered

***

### SCAR\_DESCRIPTIONS

```ts
const SCAR_DESCRIPTIONS: readonly string[];
```

Defined in: [combat/death-and-dying.ts:622](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L622)

The scar table for characters saved from bleeding out. Order is part of
the public contract: `StabilizeResult.scarIndex` indexes this array, and
localizing consumers key their translations off it.

***

### ARMOR\_CHECK\_PENALTY

```ts
const ARMOR_CHECK_PENALTY: Record<ArmorType, number>;
```

Defined in: [combat/fumbles.ts:31](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L31)

Armor check penalty by armor type (DCC core rules Table 3-3)
This penalty applies to certain skill checks.

***

### ARMOR\_SPEED\_PENALTY

```ts
const ARMOR_SPEED_PENALTY: Record<ArmorType, number>;
```

Defined in: [combat/fumbles.ts:47](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L47)

Speed reduction by armor type, in feet (DCC core rules Table 3-3).

***

### MONSTER\_FUMBLE\_BASE\_DIE

```ts
const MONSTER_FUMBLE_BASE_DIE: "1d10" = "1d10";
```

Defined in: [combat/fumbles.ts:136](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L136)

Base monster fumble die under the optional Monster Fumbles rule, at a +0
targeted-PC Luck modifier (DCC Yearbook #8). The die steps along the dice
chain from here as the PC's Luck rises or falls.

***

### DEFAULT\_INITIATIVE\_DIE

```ts
const DEFAULT_INITIATIVE_DIE: DieType = "d20";
```

Defined in: [combat/initiative.ts:30](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L30)

Standard initiative die for all classes (RAW).

***

### TWO\_HANDED\_INITIATIVE\_DIE

```ts
const TWO_HANDED_INITIATIVE_DIE: DieType = "d16";
```

Defined in: [combat/initiative.ts:33](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L33)

Initiative die when wielding a two-handed weapon (RAW).

***

### FIRING\_INTO\_MELEE\_PENALTY

```ts
const FIRING_INTO_MELEE_PENALTY: -1 = -1;
```

Defined in: [combat/misc-rules.ts:507](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L507)

To-hit penalty for making a missile attack at a target engaged in melee
(DCC core rulebook p. 96). A flat -1 regardless of how many combatants are
involved.

This is the *attack-roll* penalty for shooting into a melee. It is distinct
from the *friendly-fire* check that happens when such a shot misses — see
[checkFiringIntoMelee](#checkfiringintomelee).

***

### SUBDUAL\_CAPABLE\_WEAPONS

```ts
const SUBDUAL_CAPABLE_WEAPONS: readonly ["sword", "longsword", "short sword", "two-handed sword", "axe", "battle axe", "hand axe", "club", "spear", "staff", "quarterstaff"];
```

Defined in: [combat/misc-rules.ts:901](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L901)

Weapons that can deal subdual damage when the user is proficient

***

### DEFAULT\_MORALE\_DC

```ts
const DEFAULT_MORALE_DC: 11 = 11;
```

Defined in: [combat/morale.ts:149](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L149)

Default morale DC

***

### MAX\_SITUATIONAL\_MODIFIER

```ts
const MAX_SITUATIONAL_MODIFIER: 4 = 4;
```

Defined in: [combat/morale.ts:152](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L152)

Maximum situational modifier

***

### MIN\_SITUATIONAL\_MODIFIER

```ts
const MIN_SITUATIONAL_MODIFIER: -4 = -4;
```

Defined in: [combat/morale.ts:155](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L155)

Minimum situational modifier

***

### MORALE\_IMMUNE\_TYPES

```ts
const MORALE_IMMUNE_TYPES: readonly ["automaton", "construct", "golem", "animated", "mindless", "undead-mindless", "ooze", "elemental"];
```

Defined in: [combat/morale.ts:468](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L468)

Common creature types that are immune to morale

## Functions

### classExtraActionDieUse()

```ts
function classExtraActionDieUse(className: string | undefined): ActionDieUse;
```

Defined in: [combat/action-dice.ts:49](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L49)

The `use` of a class's *extra* (slot ≥ 1) action dice.

Verified against the DCC core-book class descriptions: the **wizard** is
the only core class that restricts an extra action die (the wizard's
second die is reserved for spell checks). The elf and cleric are
casters too, but their extra dice are explicitly unrestricted, as are the
warrior, dwarf, thief, and halfling. The primary die (slot 0) is always
`"any"` regardless of class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `className` | `string` \| `undefined` | The actor's class identifier (case-insensitive). |

#### Returns

[`ActionDieUse`](types.md#actiondieuse)

`"spell"` for a wizard, `"any"` for every other class.

***

### parseActionDice()

```ts
function parseActionDice(input: string | string[], opts?: {
  className?: string;
}): ActionDieSlot[];
```

Defined in: [combat/action-dice.ts:74](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L74)

Parse an action-dice authoring value into structured slots.

Accepts the comma string used throughout the system (`"1d20,1d16"`), a
pre-split array, NPC stat-block forms (`"2d20"`, `"1d24+1d20"`), per-die
riders (`"1d20+4"`), and an optional `*use` tag per token
(`"1d16*spell"`). Within a token, `+`-separated segments that are dice
become their own slots while a bare `+N` number is a rider on the
preceding slot; a leading count (`"2d20"`) expands to that many slots.

The `use` of each slot is resolved as: an explicit `*tag` wins; otherwise
slot 0 is `"any"` and extra slots take [classExtraActionDieUse](#classextraactiondieuse) for
`opts.className` (so an unchanged `"1d20,1d16"` yields a spells-only
second die for a wizard and two `"any"` dice for everyone else).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` \| `string`[] | Comma string or array of tokens. |
| `opts?` | \{ `className?`: `string`; \} | - |
| `opts.className?` | `string` | Class identifier used to infer extra-die `use`. |

#### Returns

[`ActionDieSlot`](types.md#actiondieslot)[]

Slots in authoring order, each with a single die (count 1).

***

### actionMatchesUse()

```ts
function actionMatchesUse(use: ActionDieUse, action: ActionType): boolean;
```

Defined in: [combat/action-dice.ts:142](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L142)

Whether a slot's `use` tag permits a given action.

`"any"` permits everything; a specific tag permits only the matching
action (so a spells-only die rejects both attacks and skill checks, and
an attack-only die rejects spells and checks). Unknown homebrew tags
permit only an action whose name equals the tag.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `use` | [`ActionDieUse`](types.md#actiondieuse) |
| `action` | [`ActionType`](types.md#actiontype) |

#### Returns

`boolean`

***

### nextActionDie()

```ts
function nextActionDie(
   slots: ActionDieSlot[], 
   state: ActionDiceState, 
   action: ActionType
): 
  | {
  slot: ActionDieSlot;
  index: number;
}
  | null;
```

Defined in: [combat/action-dice.ts:160](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L160)

The next unspent slot eligible for `action`, in budget order.

Use this both to default a roll dialog's action-die preset and to pick
the slot to spend when a roll resolves. Returns `null` when the actor is
out of eligible dice (over budget, or no remaining die permits the
action — e.g. a wizard whose only unspent die is spells-only attempting
a weapon attack).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `slots` | [`ActionDieSlot`](types.md#actiondieslot)[] | The actor's action-die budget. |
| `state` | [`ActionDiceState`](types.md#actiondicestate) | Live per-round spend state (`spent` may be shorter than `slots`; missing entries count as unspent). |
| `action` | [`ActionType`](types.md#actiontype) | The action being attempted. |

#### Returns

  \| \{
  `slot`: [`ActionDieSlot`](types.md#actiondieslot);
  `index`: `number`;
\}
  \| `null`

***

### spendActionDie()

```ts
function spendActionDie(state: ActionDiceState, index: number): ActionDiceState;
```

Defined in: [combat/action-dice.ts:180](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L180)

Mark a slot spent, returning a new state (the input is not mutated).
Out-of-range indices extend `spent` with unspent entries as needed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`ActionDiceState`](types.md#actiondicestate) |
| `index` | `number` |

#### Returns

[`ActionDiceState`](types.md#actiondicestate)

***

### resetActionDice()

```ts
function resetActionDice(slots: ActionDieSlot[], round: number): ActionDiceState;
```

Defined in: [combat/action-dice.ts:194](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L194)

A fresh all-unspent state for the given round, sized to `slots`.
Call this on a combatant's turn to reset its budget.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `slots` | [`ActionDieSlot`](types.md#actiondieslot)[] |
| `round` | `number` |

#### Returns

[`ActionDiceState`](types.md#actiondicestate)

***

### isActionDiceStateCurrent()

```ts
function isActionDiceStateCurrent(state: ActionDiceState, round: number): boolean;
```

Defined in: [combat/action-dice.ts:205](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L205)

Whether `state` belongs to `round`. The caller resets when this is false
at the start of a combatant's turn (the lib does not watch the clock).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `state` | [`ActionDiceState`](types.md#actiondicestate) |
| `round` | `number` |

#### Returns

`boolean`

***

### actionDieRollTerms()

```ts
function actionDieRollTerms(slot: ActionDieSlot): ActionDieRollTerms;
```

Defined in: [combat/action-dice.ts:222](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/action-dice.ts#L222)

Resolve the roll terms for a chosen slot, reconciling its own modifier
against the generic attack bonus.

When a slot carries a non-zero modifier (a `"1d20+4"` rider), that
modifier is the authoritative per-die adjustment and the caller must
suppress the generic attack-bonus term for this action — otherwise the
bonus is counted twice. Slots without a rider fall through to the
caller's normal attack-bonus / ability-modifier logic.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `slot` | [`ActionDieSlot`](types.md#actiondieslot) |

#### Returns

[`ActionDieRollTerms`](types.md#actiondierollterms)

***

### makeAttackRoll()

```ts
function makeAttackRoll(
   input: AttackInput, 
   roller?: DiceRoller, 
   events?: CombatEvents
): AttackResult;
```

Defined in: [combat/attack.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L143)

Make an attack roll

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`AttackInput`](types.md#attackinput) | Attack input parameters |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Optional custom dice roller |
| `events?` | [`CombatEvents`](types.md#combatevents) | Optional event callbacks |

#### Returns

[`AttackResult`](types.md#attackresult)

Attack result

#### Examples

```ts
// Simple melee attack
const result = makeAttackRoll({
  attackType: "melee",
  attackBonus: 2,
  actionDie: "d20",
  threatRange: 20,
  abilityModifier: 2, // STR
});
```

```ts
// Warrior attack with deed die
const result = makeAttackRoll({
  attackType: "melee",
  attackBonus: 3,
  actionDie: "d20",
  threatRange: 19,
  abilityModifier: 3,
  deedDie: "d4",
  targetAC: 15,
});
```

```ts
// Thief backstab: caller precomputes the Table 1-9 bonus and passes
// it via `bonuses` (a full `RollBonus`, not the legacy shape);
// `isBackstab: true` only drives the auto-crit.
const backstabBonus = getBackstabAttackBonus(progression, 3, "chaotic"); // +7
const result = makeAttackRoll({
  attackType: "melee",
  attackBonus: 2,
  actionDie: "d20",
  threatRange: 20,
  abilityModifier: 1,
  targetAC: 13,
  isBackstab: true,
  bonuses: [{
    id: "class:backstab",
    label: "Backstab (Table 1-9)",
    source: { type: "class", id: "thief" },
    category: "inherent",
    effect: { type: "modifier", value: backstabBonus },
  }],
});
```

***

### calculateAttackBonus()

```ts
function calculateAttackBonus(
   baseAttackBonus: number, 
   abilityModifier: number, 
   bonuses?: RollBonus[]
): number;
```

Defined in: [combat/attack.ts:298](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L298)

Calculate attack bonus from character data

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `baseAttackBonus` | `number` | `undefined` | Class/level attack bonus |
| `abilityModifier` | `number` | `undefined` | Relevant ability modifier |
| `bonuses?` | [`RollBonus`](types.md#rollbonus)[] | `[]` | Additional bonuses |

#### Returns

`number`

Total attack bonus

***

### doesAttackHit()

```ts
function doesAttackHit(
   attackTotal: number, 
   targetAC: number, 
   isNaturalOne: boolean, 
   isNaturalMax: boolean
): boolean;
```

Defined in: [combat/attack.ts:319](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L319)

Check if an attack hits a target

Note: Only natural max (20 on d20, 24 on d24) is an automatic hit.
Rolls in the threat range that don't beat AC do NOT hit.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attackTotal` | `number` | Total attack roll result |
| `targetAC` | `number` | Target's armor class |
| `isNaturalOne` | `boolean` | Whether the roll was a natural 1 (auto-miss) |
| `isNaturalMax` | `boolean` | Whether the roll was the die's maximum value (auto-hit) |

#### Returns

`boolean`

Whether the attack hits

***

### getAttackAbility()

```ts
function getAttackAbility(attackType: "melee" | "missile" | "special"): "str" | "agl";
```

Defined in: [combat/attack.ts:345](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L345)

Get the attack ability for an attack type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attackType` | `"melee"` \| `"missile"` \| `"special"` | Type of attack |

#### Returns

`"str"` \| `"agl"`

The ability ID to use

***

### getTwoWeaponDice()

```ts
function getTwoWeaponDice(agility: number, options?: {
  isHalfling?: boolean;
}): TwoWeaponDiceConfig;
```

Defined in: [combat/attack.ts:359](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L359)

Compute the two-weapon-fighting dice configuration for a given Agility
(Table 4-3, with halfling class overrides applied when `isHalfling`).

Halflings use an effective Agility of `max(agility, 16)` for row
lookup; if their natural Agility is ≥18, the normal 18+ row applies.
Halflings also gain auto-crit/auto-hit on a natural max of the
reduced die (replacing the 16-17 "no auto-hit" rule), and only fumble
when both hands roll a natural 1.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `agility` | `number` |
| `options?` | \{ `isHalfling?`: `boolean`; \} |
| `options.isHalfling?` | `boolean` |

#### Returns

[`TwoWeaponDiceConfig`](types.md#twoweapondiceconfig)

***

### rollTwoWeaponAttack()

```ts
function rollTwoWeaponAttack(
   input: TwoWeaponAttackInput, 
   roller?: DiceRoller, 
   events?: CombatEvents
): TwoWeaponAttackResult;
```

Defined in: [combat/attack.ts:450](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L450)

Roll a full two-weapon attack round (both hands).

Computes each hand's reduced action die from `baseActionDie` per
Table 4-3, rolls each hand, applies [applyTwoWeaponHandRules](#applytwoweaponhandrules)
to each, then the halfling fumble rule (clears `isFumble` unless both
hands rolled a natural 1). An improved threat range is kept: the 18+
row's primary hand crits normally.

Combat events (`onAttackRoll`, `onCriticalThreat`, `onFumbleRoll`,
`onDeedAttempt`) are emitted for each hand AFTER overrides are
applied, so listeners observe the post-RAW state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`TwoWeaponAttackInput`](types.md#twoweaponattackinput) |
| `roller?` | [`DiceRoller`](types.md#diceroller) |
| `events?` | [`CombatEvents`](types.md#combatevents) |

#### Returns

[`TwoWeaponAttackResult`](types.md#twoweaponattackresult)

***

### applyTwoWeaponHandRules()

```ts
function applyTwoWeaponHandRules(
   result: AttackResult, 
   config: TwoWeaponDiceConfig, 
   hand: "primary" | "offHand", 
   targetAC?: number
): void;
```

Defined in: [combat/attack.ts:494](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L494)

Apply one hand's Table 4-3 critical-hit rules to an attack roll made
with that hand's reduced die (mutates `result`). Use this when each
hand is rolled separately; [rollTwoWeaponAttack](#rolltwoweaponattack) calls it for
both hands.

 - a hand that cannot crit has any crit threat stripped;
 - on the Agl-16-17 row only the reduced die's natural max can crit,
   so an improved threat range below the max is stripped;
 - non-halfling 16-17 primary: the natural max is not an auto-hit and
   crits only if it beats `targetAC` (left unresolved without one);
 - halfling 16-17 row: a natural max auto-hits and auto-crits with
   either hand.

The halfling both-1s fumble rule spans both hands and is not applied
here.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`AttackResult`](types.md#attackresult) |
| `config` | [`TwoWeaponDiceConfig`](types.md#twoweapondiceconfig) |
| `hand` | `"primary"` \| `"offHand"` |
| `targetAC?` | `number` |

#### Returns

`void`

***

### isDeedSuccessful()

```ts
function isDeedSuccessful(deedRoll: number): boolean;
```

Defined in: [combat/attack.ts:600](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/attack.ts#L600)

Check if a deed die roll is successful

A deed die roll is successful if it shows 3 or higher. This judges the
die only: the deed itself also needs the attack to hit, which
[AttackResult.deedSuccess](types.md#deedsuccess) accounts for.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deedRoll` | `number` | The deed die roll result |

#### Returns

`boolean`

Whether the deed die shows 3+

***

### getCritTable()

```ts
function getCritTable(classId: string, level?: number): CritTableId;
```

Defined in: [combat/crits.ts:62](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L62)

Get the crit table for a class at a level. Crit tables can vary by level
(e.g., warriors use III at L1-2, IV at L3-4, V at L5+), so prefer passing
the character's current level. If omitted, defaults to level 1.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `classId` | `string` | `undefined` | Class identifier |
| `level?` | `number` | `1` | Character level (default 1) |

#### Returns

[`CritTableId`](types.md#crittableid)

Crit table ID

***

### getCritDie()

```ts
function getCritDie(classId: string, level: number): string;
```

Defined in: [combat/crits.ts:76](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L76)

Get crit die for a class at a level. Reads from the registered class
progression data (see `registerClassProgression`). Returns the `DEFAULT_CRIT_DIE`
when no progression is registered for the class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | Class identifier |
| `level` | `number` | Character level |

#### Returns

`string`

Crit die formula (e.g., "d12", "2d20", "d30+2")

***

### rollCritical()

```ts
function rollCritical(
   input: CriticalInput, 
   roller?: DiceRoller, 
   events?: CombatEvents
): CriticalResult;
```

Defined in: [combat/crits.ts:116](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L116)

Roll a critical hit

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`CriticalInput`](types.md#criticalinput) | Critical hit input parameters |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Optional custom dice roller |
| `events?` | [`CombatEvents`](types.md#combatevents) | Optional event callbacks |

#### Returns

[`CriticalResult`](types.md#criticalresult)

Critical hit result

#### Examples

```ts
// Warrior critical hit
const result = rollCritical({
  critTable: "III",
  critDie: "d14",
  luckModifier: 2,
  level: 3,
});
```

```ts
// Thief critical hit
const result = rollCritical({
  critTable: "II",
  critDie: "d12",
  luckModifier: -1,
});
```

***

### calculateCritModifier()

```ts
function calculateCritModifier(
   luckModifier: number, 
   level?: number, 
   bonuses?: RollBonus[]
): number;
```

Defined in: [combat/crits.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L189)

Calculate total crit modifier

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `luckModifier` | `number` | `undefined` | Luck modifier |
| `level?` | `number` | `undefined` | Character level (if applicable) |
| `bonuses?` | [`RollBonus`](types.md#rollbonus)[] | `[]` | Additional bonuses |

#### Returns

`number`

Total crit roll modifier

***

### determineCritTable()

```ts
function determineCritTable(classId: string, weaponCritTable?: CritTableId): CritTableId;
```

Defined in: [combat/crits.ts:213](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L213)

Determine which crit table to use based on class and weapon

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `classId` | `string` | Character's class |
| `weaponCritTable?` | [`CritTableId`](types.md#crittableid) | Optional weapon-specific crit table override |

#### Returns

[`CritTableId`](types.md#crittableid)

Crit table ID

***

### buildCritFormula()

```ts
function buildCritFormula(
   critDie: string, 
   luckModifier: number, 
   level?: number
): string;
```

Defined in: [combat/crits.ts:233](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L233)

Build crit formula string for display

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `critDie` | `string` | Crit die type |
| `luckModifier` | `number` | Luck modifier |
| `level?` | `number` | Optional level modifier |

#### Returns

`string`

Formatted crit formula

***

### parseCritExtraDamage()

```ts
function parseCritExtraDamage(tableResultText: string): 
  | {
  dice?: string;
  modifier?: number;
}
  | undefined;
```

Defined in: [combat/crits.ts:263](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/crits.ts#L263)

Parse crit table result into extra damage

This is a utility function for parsing crit table entries.
In practice, crit tables vary widely, so this just handles
common patterns like "+1d6 damage" or "+2 damage".

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `tableResultText` | `string` | Text from crit table lookup |

#### Returns

  \| \{
  `dice?`: `string`;
  `modifier?`: `number`;
\}
  \| `undefined`

Parsed extra damage info, or undefined if not applicable

***

### rollDamage()

```ts
function rollDamage(
   input: DamageInput, 
   roller?: DiceRoller, 
   events?: CombatEvents
): DamageResult;
```

Defined in: [combat/damage.ts:51](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L51)

Roll weapon damage

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`DamageInput`](types.md#damageinput) | Damage input parameters |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Optional custom dice roller |
| `events?` | [`CombatEvents`](types.md#combatevents) | Optional event callbacks |

#### Returns

[`DamageResult`](types.md#damageresult)

Damage result

#### Examples

```ts
// Simple damage roll
const result = rollDamage({
  damageDie: "d8",
  strengthModifier: 2,
});
```

```ts
// Warrior damage with deed die
const result = rollDamage({
  damageDie: "d8",
  strengthModifier: 3,
  deedDieResult: 4,
  magicBonus: 1,
});
```

***

### calculateDamageModifier()

```ts
function calculateDamageModifier(
   strengthModifier: number, 
   deedDieResult?: number, 
   magicBonus?: number, 
   bonuses?: RollBonus[]
): number;
```

Defined in: [combat/damage.ts:143](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L143)

Calculate damage modifier from all sources

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `strengthModifier` | `number` | `undefined` | Strength modifier |
| `deedDieResult?` | `number` | `undefined` | Deed die result (if applicable) |
| `magicBonus?` | `number` | `undefined` | Magic weapon bonus |
| `bonuses?` | [`RollBonus`](types.md#rollbonus)[] | `[]` | Additional bonuses |

#### Returns

`number`

Total damage modifier

***

### getWeaponDamage()

```ts
function getWeaponDamage(weapon: WeaponStats, isBackstab: boolean): {
  damageDie: `d${number}`;
  diceCount: number;
};
```

Defined in: [combat/damage.ts:171](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L171)

Select the damage die and dice count to roll for a weapon attack,
substituting `weapon.backstabDamage` when `isBackstab` is true
(DCC Table 3-1 footnote). The caller is responsible for gating the
thief-class requirement via `canBackstab(...)` before setting the flag.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `weapon` | [`WeaponStats`](types.md#weaponstats) |
| `isBackstab` | `boolean` |

#### Returns

```ts
{
  damageDie: `d${number}`;
  diceCount: number;
}
```

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `damageDie` | `` `d${number}` `` | [combat/damage.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L174) |
| `diceCount` | `number` | [combat/damage.ts:174](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L174) |

***

### getTwoHandedDamageDie()

```ts
function getTwoHandedDamageDie(
   baseDamageDie: `d${number}`, 
   twoHandedDamageDie: `d${number}` | undefined, 
   isTwoHanding: boolean
): `d${number}`;
```

Defined in: [combat/damage.ts:199](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L199)

Calculate two-handed weapon damage bonus

Some weapons deal extra damage when wielded two-handed.
In DCC, this is typically built into the weapon's damage die
(e.g., two-handed sword is d10 vs longsword d8).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `baseDamageDie` | `` `d${number}` `` | Normal damage die |
| `twoHandedDamageDie` | `` `d${number}` `` \| `undefined` | Two-handed damage die (if different) |
| `isTwoHanding` | `boolean` | Whether wielding two-handed |

#### Returns

`` `d${number}` ``

Damage die to use

***

### buildDamageFormula()

```ts
function buildDamageFormula(
   damageDie: `d${number}`, 
   diceCount: number, 
   modifiers: LegacyRollModifier[]
): string;
```

Defined in: [combat/damage.ts:218](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L218)

Build damage formula string for display

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `damageDie` | `` `d${number}` `` | Base damage die |
| `diceCount` | `number` | Number of dice |
| `modifiers` | [`LegacyRollModifier`](types.md#legacyrollmodifier)[] | Modifiers to include |

#### Returns

`string`

Formatted damage string

***

### applyMinimumDamage()

```ts
function applyMinimumDamage(damageTotal: number): number;
```

Defined in: [combat/damage.ts:243](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/damage.ts#L243)

Calculate minimum damage

In DCC, damage is typically minimum 1 (you can't heal by attacking).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `damageTotal` | `number` | Calculated damage total |

#### Returns

`number`

Damage, minimum 1

***

### getBleedOutRounds()

```ts
function getBleedOutRounds(level: number): number;
```

Defined in: [combat/death-and-dying.ts:151](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L151)

Get the number of rounds a character can bleed out before dying

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `number` | Character's level |

#### Returns

`number`

Rounds until permanent death, or 0 for instant death

***

### getVitalStatus()

```ts
function getVitalStatus(currentHP: number, level: number): VitalStatus;
```

Defined in: [combat/death-and-dying.ts:167](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L167)

Determine a character's vital status based on current HP and level

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currentHP` | `number` | Current hit points |
| `level` | `number` | Character level (0 for 0-level) |

#### Returns

[`VitalStatus`](#vitalstatus)

Vital status

***

### applyDamage()

```ts
function applyDamage(character: Character, damage: number): DamageApplicationResult;
```

Defined in: [combat/death-and-dying.ts:189](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L189)

Apply damage to a character and determine the result

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The character taking damage |
| `damage` | `number` | Amount of damage taken |

#### Returns

[`DamageApplicationResult`](#damageapplicationresult)

Damage result with new status

***

### canBeSaved()

```ts
function canBeSaved(level: number, roundsElapsed: number): boolean;
```

Defined in: [combat/death-and-dying.ts:228](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L228)

Check if a character can be saved from bleeding out

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `number` | Character level |
| `roundsElapsed` | `number` | Rounds since reaching 0 HP |

#### Returns

`boolean`

Whether the character can still be saved

***

### advanceBleedOutRound()

```ts
function advanceBleedOutRound(state: BleedingOutState): BleedingOutState | undefined;
```

Defined in: [combat/death-and-dying.ts:255](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L255)

Advance the bleeding out timer by one round

The rules give a level-1 character the round they dropped *or the next
round* to be healed — the drop round itself is not one of the bleeding
rounds. So `roundsRemaining` counts the healable rounds left after the
current one: it reaches 0 on the character's final-chance round, and the
character only dies when a further round begins with 0 remaining.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | [`BleedingOutState`](#bleedingoutstate) | Current bleeding out state |

#### Returns

[`BleedingOutState`](#bleedingoutstate) \| `undefined`

Updated state, or undefined if character is now permanently dead

***

### createBleedingOutState()

```ts
function createBleedingOutState(level: number, currentRound: number): BleedingOutState;
```

Defined in: [combat/death-and-dying.ts:276](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L276)

Create initial bleeding out state for a character

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `number` | Character level |
| `currentRound` | `number` | Current combat round |

#### Returns

[`BleedingOutState`](#bleedingoutstate)

Bleeding out state

***

### stabilizeCharacter()

```ts
function stabilizeCharacter(bleedingState: BleedingOutState, healingAmount: number): StabilizeResult;
```

Defined in: [combat/death-and-dying.ts:302](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L302)

Attempt to stabilize a bleeding out character

This should be called when a character receives healing while bleeding out.
The character is saved if healing is applied before their rounds run out.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `bleedingState` | [`BleedingOutState`](#bleedingoutstate) | Current bleeding out state |
| `healingAmount` | `number` | Amount of HP healed |

#### Returns

[`StabilizeResult`](#stabilizeresult)

Stabilization result

***

### applyBleedOutTrauma()

```ts
function applyBleedOutTrauma(
   character: Character, 
   newHP: number, 
   scar: string
): Character;
```

Defined in: [combat/death-and-dying.ts:350](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L350)

Apply the permanent trauma from being saved from bleeding out

Returns a new character with:
- 1 Stamina lost permanently
- A scar added to conditions

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to update |
| `newHP` | `number` | HP to set (from healing) |
| `scar` | `string` | Description of the scar |

#### Returns

[`Character`](types.md#character)

Updated character

***

### attemptBodyRecovery()

```ts
function attemptBodyRecovery(luckScore: number, roller: DiceRoller): BodyRecoveryResult;
```

Defined in: [combat/death-and-dying.ts:395](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L395)

Attempt to recover a dead character's body

Per DCC rules: If body is recovered within 1 hour, character makes a Luck
check — roll d20 and succeed if the result is ≤ Luck score (roll-under
Luck check, not a meet-or-exceed DC). On success, they were just
unconscious and recover to 1 HP with -4 penalty for 1 hour and
permanent -1 to STR/AGL/STA.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `luckScore` | `number` | Character's current Luck score |
| `roller` | [`DiceRoller`](types.md#diceroller) | Dice roller function |

#### Returns

[`BodyRecoveryResult`](#bodyrecoveryresult)

Body recovery result

***

### applyBodyRecovery()

```ts
function applyBodyRecovery(character: Character, recovery: BodyRecoveryResult): Character | undefined;
```

Defined in: [combat/death-and-dying.ts:435](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L435)

Apply body recovery result to a character

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | The "dead" character |
| `recovery` | [`BodyRecoveryResult`](#bodyrecoveryresult) | Recovery result |

#### Returns

[`Character`](types.md#character) \| `undefined`

Updated character, or undefined if recovery failed

***

### getHealingFromRest()

```ts
function getHealingFromRest(restType: RestType): number;
```

Defined in: [combat/death-and-dying.ts:495](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L495)

Calculate natural healing from rest

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `restType` | [`RestType`](#resttype) | Type of rest taken |

#### Returns

`number`

HP healed per night

***

### applyNaturalHealing()

```ts
function applyNaturalHealing(character: Character, restType: RestType): HealingResult;
```

Defined in: [combat/death-and-dying.ts:513](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L513)

Apply natural healing to a character

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to heal |
| `restType` | [`RestType`](#resttype) | Type of rest taken |

#### Returns

[`HealingResult`](#healingresult)

Healing result

***

### applyHealingResult()

```ts
function applyHealingResult(character: Character, healing: HealingResult): Character;
```

Defined in: [combat/death-and-dying.ts:554](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L554)

Apply healing result to a character

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to update |
| `healing` | [`HealingResult`](#healingresult) | Healing result |

#### Returns

[`Character`](types.md#character)

Updated character

***

### applyMagicalHealing()

```ts
function applyMagicalHealing(character: Character, amount: number): Character;
```

Defined in: [combat/death-and-dying.ts:593](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L593)

Apply magical healing to a character

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `character` | [`Character`](types.md#character) | Character to heal |
| `amount` | `number` | HP to restore |

#### Returns

[`Character`](types.md#character)

Updated character

***

### getScarDescription()

```ts
function getScarDescription(index: number): string;
```

Defined in: [combat/death-and-dying.ts:647](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L647)

Look up the English description for a scar index

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Index into [SCAR\_DESCRIPTIONS](#scar_descriptions) |

#### Returns

`string`

***

### isAtDeathsDoor()

```ts
function isAtDeathsDoor(currentHP: number): boolean;
```

Defined in: [combat/death-and-dying.ts:657](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L657)

Check if a character is at death's door (1 HP or less)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `currentHP` | `number` | Current hit points |

#### Returns

`boolean`

Whether character is at death's door

***

### canReceiveHealing()

```ts
function canReceiveHealing(status: VitalStatus): boolean;
```

Defined in: [combat/death-and-dying.ts:667](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/death-and-dying.ts#L667)

Check if a character can receive healing

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `status` | [`VitalStatus`](#vitalstatus) | Character's vital status |

#### Returns

`boolean`

Whether healing can be applied

***

### getFumbleDie()

```ts
function getFumbleDie(armorType: ArmorType): `d${number}`;
```

Defined in: [combat/fumbles.ts:70](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L70)

Get the fumble die for an armor type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `armorType` | [`ArmorType`](types.md#armortype) | Type of armor worn |

#### Returns

`` `d${number}` ``

Fumble die type

***

### getArmorType()

```ts
function getArmorType(armorName: string): ArmorType;
```

Defined in: [combat/fumbles.ts:92](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L92)

Get armor type from armor name

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `armorName` | `string` | Name of the armor |

#### Returns

[`ArmorType`](types.md#armortype)

Armor type, defaulting to unarmored

***

### getMonsterFumbleDie()

```ts
function getMonsterFumbleDie(targetLuckModifier: number): string;
```

Defined in: [combat/fumbles.ts:162](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L162)

Optional "Monster Fumbles" rule (DCC Yearbook #8). When a monster fumbles
(natural 1 on its attack die) against a PC, the targeted PC's Luck modifier
always alters the monster's fumble die: starting from 1d10 at +0, each +1
steps the die one rung UP the dice chain (d10 → d12 → d14 → d16) and each -1
steps it one rung DOWN (d10 → d8 → d7 → d6). When several PCs are targeted,
the caller passes the highest Luck modifier among them.

This is distinct from the core fumble rule (`rollFumble`), where the
*fumbler's own* Luck is a flat modifier on the roll. Here a *defending* PC's
Luck resizes the *die*, so the result is meant to be rolled directly (or fed
to `rollFumble` via `fumbleDieOverride` with `luckModifier: 0`). Modifiers
are applied one chain-step per point and extrapolate past the printed ±3
table; a modifier that would run off either end of the dice chain leaves the
die unchanged (the dice-chain helper's clamp behaviour).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetLuckModifier` | `number` | The (highest) targeted PC's Luck modifier |

#### Returns

`string`

The monster's fumble die formula (e.g. "1d14")

#### Example

```ts
getMonsterFumbleDie(2)   // "1d14" — creature attacking a +2 Luck PC
getMonsterFumbleDie(-3)  // "1d6"
getMonsterFumbleDie(0)   // "1d10"
```

***

### rollFumble()

```ts
function rollFumble(
   input: FumbleInput, 
   roller?: DiceRoller, 
   events?: CombatEvents
): FumbleResult;
```

Defined in: [combat/fumbles.ts:200](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L200)

Roll a fumble

In DCC, fumbles use a die based on armor worn. Heavier armor
means a larger fumble die, which means worse fumble results.
Luck modifier is SUBTRACTED from the roll (lower is better for
the fumbler, but the roll itself - lower luck = worse fumbles).

Actually, in DCC, luck modifier is subtracted from the fumble roll,
meaning HIGHER luck results in LOWER fumble results (which are better).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`FumbleInput`](types.md#fumbleinput) | Fumble input parameters |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Optional custom dice roller |
| `events?` | [`CombatEvents`](types.md#combatevents) | Optional event callbacks |

#### Returns

[`FumbleResult`](types.md#fumbleresult)

Fumble result

#### Examples

```ts
// Fumble in chainmail with good luck
const result = rollFumble({
  armorType: "chainmail",
  luckModifier: 2, // Subtracts from roll, so lower result
});
```

```ts
// Fumble unarmored with bad luck
const result = rollFumble({
  armorType: "unarmored",
  luckModifier: -1, // Adds to roll (since subtracted), so higher result
});
```

***

### calculateFumbleModifier()

```ts
function calculateFumbleModifier(luckModifier: number): number;
```

Defined in: [combat/fumbles.ts:249](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L249)

Calculate fumble modifier (for preview)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `luckModifier` | `number` | Luck modifier |

#### Returns

`number`

Net modifier to fumble roll (negative luck = positive modifier)

***

### buildFumbleFormula()

```ts
function buildFumbleFormula(fumbleDie: `d${number}`, luckModifier: number): string;
```

Defined in: [combat/fumbles.ts:261](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L261)

Build fumble formula string for display

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `fumbleDie` | `` `d${number}` `` | Fumble die type |
| `luckModifier` | `number` | Luck modifier |

#### Returns

`string`

Formatted fumble formula

***

### isFumble()

```ts
function isFumble(naturalRoll: number): boolean;
```

Defined in: [combat/fumbles.ts:283](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L283)

Check if a natural roll is a fumble

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `naturalRoll` | `number` | The natural die result |

#### Returns

`boolean`

True if the roll is a fumble (natural 1)

***

### getArmorCheckPenalty()

```ts
function getArmorCheckPenalty(armorType: ArmorType): number;
```

Defined in: [combat/fumbles.ts:293](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L293)

Get armor check penalty for an armor type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `armorType` | [`ArmorType`](types.md#armortype) | Type of armor |

#### Returns

`number`

Check penalty (negative number)

***

### getArmorSpeedPenalty()

```ts
function getArmorSpeedPenalty(armorType: ArmorType): number;
```

Defined in: [combat/fumbles.ts:303](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/fumbles.ts#L303)

Get speed penalty for an armor type

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `armorType` | [`ArmorType`](types.md#armortype) | Type of armor |

#### Returns

`number`

Speed reduction in feet

***

### getInitiativeDie()

```ts
function getInitiativeDie(isWieldingTwoHanded?: boolean): `d${number}`;
```

Defined in: [combat/initiative.ts:42](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L42)

Get the initiative die a character should roll.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `isWieldingTwoHanded?` | `boolean` | `false` | True if the character is wielding a two-handed weapon. Defaults to false. |

#### Returns

`` `d${number}` ``

`d16` when two-handing, `d20` otherwise.

***

### rollInitiative()

```ts
function rollInitiative(
   input: InitiativeInput, 
   roller?: DiceRoller, 
   events?: CombatEvents
): InitiativeResult;
```

Defined in: [combat/initiative.ts:77](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L77)

Roll initiative.

Callers are responsible for selecting the right die (use
`getInitiativeDie`) and supplying any class-level modifier
(warriors add their class level via `classModifier`).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | [`InitiativeInput`](types.md#initiativeinput) |
| `roller?` | [`DiceRoller`](types.md#diceroller) |
| `events?` | [`CombatEvents`](types.md#combatevents) |

#### Returns

[`InitiativeResult`](types.md#initiativeresult)

#### Examples

```ts
// Standard PC
rollInitiative({ initiativeDie: "d20", agilityModifier: 2 });
```

```ts
// Warrior level 3 with Agl +1
rollInitiative({
  initiativeDie: "d20",
  agilityModifier: 1,
  classModifier: 3, // class level
});
```

```ts
// Two-handing fighter (warrior level 3 still adds level)
rollInitiative({
  initiativeDie: "d16",
  agilityModifier: 1,
  classModifier: 3,
});
```

***

### calculateInitiativeModifier()

```ts
function calculateInitiativeModifier(
   agilityModifier: number, 
   classModifier?: number, 
   bonuses?: RollBonus[]
): number;
```

Defined in: [combat/initiative.ts:130](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L130)

Calculate total initiative modifier (no die roll).

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `agilityModifier` | `number` | `undefined` | Agility modifier |
| `classModifier?` | `number` | `undefined` | Class-based modifier (warrior level) |
| `bonuses?` | [`RollBonus`](types.md#rollbonus)[] | `[]` | Additional bonuses |

#### Returns

`number`

***

### buildInitiativeFormula()

```ts
function buildInitiativeFormula(
   initiativeDie: `d${number}`, 
   agilityModifier: number, 
   otherModifiers?: number
): string;
```

Defined in: [combat/initiative.ts:150](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L150)

Build initiative formula string for display.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `initiativeDie` | `` `d${number}` `` | `undefined` |
| `agilityModifier` | `number` | `undefined` |
| `otherModifiers?` | `number` | `0` |

#### Returns

`string`

***

### sortByInitiative()

```ts
function sortByInitiative<T extends {
  initiative: number;
}>(combatants: readonly T[]): T[];
```

Defined in: [combat/initiative.ts:170](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L170)

Sort combatants by initiative (highest first).

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` *extends* \{ `initiative`: `number`; \} |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `combatants` | readonly `T`[] |

#### Returns

`T`[]

***

### isInitiativeTied()

```ts
function isInitiativeTied(a: InitiativeResult, b: InitiativeResult): boolean;
```

Defined in: [combat/initiative.ts:179](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/initiative.ts#L179)

Check for tied initiatives.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | [`InitiativeResult`](types.md#initiativeresult) |
| `b` | [`InitiativeResult`](types.md#initiativeresult) |

#### Returns

`boolean`

***

### getAbilityLossEffect()

```ts
function getAbilityLossEffect(ability: DCCAbilityId): AbilityLossResult;
```

Defined in: [combat/misc-rules.ts:247](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L247)

Get the effect of an ability being reduced to 0

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ability` | [`DCCAbilityId`](types.md#dccabilityid) | The ability at 0 |

#### Returns

[`AbilityLossResult`](#abilitylossresult)

The effect on the character

***

### checkAbilityLoss()

```ts
function checkAbilityLoss(abilities: Record<DCCAbilityId, number>): AbilityLossResult[];
```

Defined in: [combat/misc-rules.ts:300](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L300)

Check all abilities for zero values and return effects

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `abilities` | `Record`\<[`DCCAbilityId`](types.md#dccabilityid), `number`\> | Record of ability scores |

#### Returns

[`AbilityLossResult`](#abilitylossresult)[]

Array of ability loss effects (empty if none at 0)

***

### createOnFireState()

```ts
function createOnFireState(options?: {
  damageDie?: string;
  extinguishDC?: number;
  source?: string;
}): OnFireState;
```

Defined in: [combat/misc-rules.ts:324](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L324)

Create initial on-fire state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `damageDie?`: `string`; `extinguishDC?`: `number`; `source?`: `string`; \} | Optional configuration |
| `options.damageDie?` | `string` | - |
| `options.extinguishDC?` | `number` | - |
| `options.source?` | `string` | - |

#### Returns

[`OnFireState`](#onfirestate)

Fire state

***

### processFireRound()

```ts
function processFireRound(
   state: OnFireState, 
   attemptExtinguish: boolean, 
   reflexSave: number, 
   roller?: DiceRoller
): FireDamageResult;
```

Defined in: [combat/misc-rules.ts:346](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L346)

Process a round of being on fire

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | [`OnFireState`](#onfirestate) | Current fire state |
| `attemptExtinguish` | `boolean` | Whether character spends action to stop/drop/roll |
| `reflexSave` | `number` | Character's Reflex save bonus |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`FireDamageResult`](#firedamageresult)

Fire damage result

***

### getChargeModifiers()

```ts
function getChargeModifiers(speed: number): ChargeModifiers;
```

Defined in: [combat/misc-rules.ts:397](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L397)

Get charge attack modifiers

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `speed` | `number` | Character's movement speed |

#### Returns

[`ChargeModifiers`](#chargemodifiers)

Charge modifiers

***

### isValidCharge()

```ts
function isValidCharge(distanceMoved: number, speed: number): boolean;
```

Defined in: [combat/misc-rules.ts:412](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L412)

Check if a charge is valid

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `distanceMoved` | `number` | Distance moved this turn |
| `speed` | `number` | Character's movement speed |

#### Returns

`boolean`

Whether the charge is valid

***

### checkDroppedTorch()

```ts
function checkDroppedTorch(roller?: DiceRoller): {
  extinguished: boolean;
  roll: number;
};
```

Defined in: [combat/misc-rules.ts:426](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L426)

Check if a dropped torch is extinguished

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

```ts
{
  extinguished: boolean;
  roll: number;
}
```

Whether the torch went out

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `extinguished` | `boolean` | [combat/misc-rules.ts:426](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L426) |
| `roll` | `number` | [combat/misc-rules.ts:426](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L426) |

***

### calculateFallingDamage()

```ts
function calculateFallingDamage(distanceFeet: number, roller?: DiceRoller): FallingDamageResult;
```

Defined in: [combat/misc-rules.ts:450](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L450)

Calculate falling damage

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `distanceFeet` | `number` | Distance fallen in feet |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`FallingDamageResult`](#fallingdamageresult)

Falling damage result

***

### getFiringIntoMeleePenalty()

```ts
function getFiringIntoMeleePenalty(targetEngagedInMelee: boolean): number;
```

Defined in: [combat/misc-rules.ts:519](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L519)

Get the to-hit penalty for a missile attack into melee.

The lib owns the RAW penalty value; whether the target is actually engaged
in melee is a positional question the caller answers (Foundry-side, from
token adjacency and disposition).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `targetEngagedInMelee` | `boolean` | Whether an ally/combatant is in melee with the target |

#### Returns

`number`

The attack-roll penalty (-1 when firing into melee, 0 otherwise)

***

### checkFiringIntoMelee()

```ts
function checkFiringIntoMelee(
   numAlliesInMelee: number, 
   allyACs: number[], 
   attackBonus: number, 
   roller?: DiceRoller
): FiringIntoMeleeResult;
```

Defined in: [combat/misc-rules.ts:532](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L532)

Check if a missed ranged attack hits an ally in melee

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `numAlliesInMelee` | `number` | Number of allies engaged with the target |
| `allyACs` | `number`[] | Array of ally armor classes |
| `attackBonus` | `number` | Attacker's bonus, applied to the re-roll against the ally |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`FiringIntoMeleeResult`](#firingintomeleeresult)

Result of firing into melee

***

### parseMissileRange()

```ts
function parseMissileRange(range: string): MissileRangeBands | null;
```

Defined in: [combat/misc-rules.ts:644](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L644)

Parse a DCC missile range string into structured bands.

Accepts the canonical "short/medium/long" form (e.g. "30/60/120") and the
single-value form some weapons use (e.g. "60"), where the lone value is the
maximum reach with no intermediate penalty bands. Each segment may carry a
trailing unit marker — feet (`30'`), inches (`30"`), smart quotes (`30’`,
`30”`), or a word unit (`30 ft`) — which is ignored; only the leading number
is read, so the bands come back in whatever unit the string used (no unit
conversion is performed). Surrounding whitespace is tolerated. Returns null
for unparseable or non-positive input.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `range` | `string` | The weapon's range string |

#### Returns

[`MissileRangeBands`](#missilerangebands) \| `null`

Structured range bands, or null if the string can't be parsed

***

### getMissileRangePenalty()

```ts
function getMissileRangePenalty(
   distance: number, 
   bands: MissileRangeBands, 
   actionDie?: string
): MissileRangePenalty;
```

Defined in: [combat/misc-rules.ts:690](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L690)

Classify a missile attack's distance into a range band and report the
penalty owed, per DCC core rulebook p. 96.

- Short range (or point blank): no penalty.
- Medium range: -2 to the attack roll.
- Long range: -1d, i.e. the action die steps down one rung on the dice chain.
- Beyond long range: out of range (no penalty is computed; the caller decides
  whether to forbid or confirm the shot).

When an `actionDie` is supplied, the resulting (possibly stepped-down) die is
returned in [MissileRangePenalty.actionDie](#actiondie); the flat
[MissileRangePenalty.attackModifier](#attackmodifier) and [MissileRangePenalty.actionDieSteps](#actiondiesteps)
are always returned so callers without a concrete die can still apply the rule.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `distance` | `number` | Measured distance to the target, in the same unit as the bands |
| `bands` | [`MissileRangeBands`](#missilerangebands) | The weapon's range bands (see [parseMissileRange](#parsemissilerange)) |
| `actionDie?` | `string` | The attacker's action die (e.g. "1d20"), optional |

#### Returns

[`MissileRangePenalty`](#missilerangepenalty)

The range band and the penalty owed

***

### getGrappleSizeBonus()

```ts
function getGrappleSizeBonus(attackerSize: number, defenderSize: number): number;
```

Defined in: [combat/misc-rules.ts:723](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L723)

Calculate size bonus for grappling

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attackerSize` | `number` | Attacker's size category |
| `defenderSize` | `number` | Defender's size category |

#### Returns

`number`

Bonus to attacker's grapple check

***

### getGrappleModifier()

```ts
function getGrappleModifier(participant: GrappleParticipant): number;
```

Defined in: [combat/misc-rules.ts:738](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L738)

Get the grapple modifier for a participant

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `participant` | [`GrappleParticipant`](#grappleparticipant) | Grapple participant |

#### Returns

`number`

The modifier to use (higher of STR/AGL, or HD for monsters)

***

### resolveGrapple()

```ts
function resolveGrapple(
   attacker: GrappleParticipant, 
   defender: GrappleParticipant, 
   roller?: DiceRoller
): GrappleResult;
```

Defined in: [combat/misc-rules.ts:753](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L753)

Resolve a grapple attempt

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `attacker` | [`GrappleParticipant`](#grappleparticipant) | Attacker's stats |
| `defender` | [`GrappleParticipant`](#grappleparticipant) | Defender's stats |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`GrappleResult`](#grappleresult)

Grapple result

***

### checkArmorRecovery()

```ts
function checkArmorRecovery(checkHumanSized?: boolean, roller?: DiceRoller): ArmorRecoveryResult;
```

Defined in: [combat/misc-rules.ts:822](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L822)

Check whether armor salvaged from a defeated enemy is usable

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `checkHumanSized?` | `boolean` | `false` | Whether to also check if armor is human-sized |
| `roller?` | [`DiceRoller`](types.md#diceroller) | `undefined` | Dice roller |

#### Returns

[`ArmorRecoveryResult`](#armorrecoveryresult)

Armor recovery result

***

### checkMissileRecovery()

```ts
function checkMissileRecovery(numMissiles: number, roller?: DiceRoller): MissileRecoveryResult;
```

Defined in: [combat/misc-rules.ts:861](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L861)

Check recovery of missile weapons

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `numMissiles` | `number` | Number of missiles to recover |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`MissileRecoveryResult`](#missilerecoveryresult)

Missile recovery result

***

### canDealSubdualDamage()

```ts
function canDealSubdualDamage(weaponName: string): boolean;
```

Defined in: [combat/misc-rules.ts:921](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L921)

Check if a weapon can deal subdual damage

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weaponName` | `string` | Name of the weapon |

#### Returns

`boolean`

Whether the weapon can deal subdual damage

***

### rollSubdualDamage()

```ts
function rollSubdualDamage(
   weaponDie: string, 
   strengthMod: number, 
   roller?: DiceRoller
): SubdualDamageResult;
```

Defined in: [combat/misc-rules.ts:934](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L934)

Calculate subdual damage (one die step lower)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weaponDie` | `string` | Normal weapon damage die |
| `strengthMod` | `number` | Strength modifier |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`SubdualDamageResult`](#subdualdamageresult)

Subdual damage result

***

### rollUnarmedDamage()

```ts
function rollUnarmedDamage(strengthMod: number, roller?: DiceRoller): SubdualDamageResult;
```

Defined in: [combat/misc-rules.ts:965](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L965)

Roll unarmed combat damage (always subdual)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `strengthMod` | `number` | Strength modifier |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`SubdualDamageResult`](#subdualdamageresult)

Subdual damage result

***

### checkMeleeAgainstGrappled()

```ts
function checkMeleeAgainstGrappled(
   grapplerAC: number, 
   attackBonus: number, 
   roller?: DiceRoller
): FiringIntoMeleeResult;
```

Defined in: [combat/misc-rules.ts:997](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L997)

Check if a missed melee attack against a grappled creature hits the grappler

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `grapplerAC` | `number` | AC of the ally maintaining the pin |
| `attackBonus` | `number` | Attacker's bonus |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`FiringIntoMeleeResult`](#firingintomeleeresult)

Result similar to firing into melee

***

### processWithdrawal()

```ts
function processWithdrawal(
   withdrawingAC: number, 
   opponents: WithdrawalOpponent[], 
   roller?: DiceRoller
): WithdrawalResult;
```

Defined in: [combat/misc-rules.ts:1097](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1097)

Process a withdrawal from melee combat

When a character withdraws from an active melee, all engaged opponents
receive a single free attack against them.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `withdrawingAC` | `number` | AC of the withdrawing character |
| `opponents` | [`WithdrawalOpponent`](#withdrawalopponent)[] | Array of opponents engaged in melee |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Dice roller |

#### Returns

[`WithdrawalResult`](#withdrawalresult)

Withdrawal result with all attack of opportunity results

***

### isEngagedInMelee()

```ts
function isEngagedInMelee(numAdjacentEnemies: number): boolean;
```

Defined in: [combat/misc-rules.ts:1148](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1148)

Check if a character is engaged in melee (for UI purposes)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `numAdjacentEnemies` | `number` | Number of enemies in melee range |

#### Returns

`boolean`

Whether the character is engaged

***

### formatWithdrawalResult()

```ts
function formatWithdrawalResult(result: WithdrawalResult): string;
```

Defined in: [combat/misc-rules.ts:1155](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1155)

Format withdrawal result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`WithdrawalResult`](#withdrawalresult) |

#### Returns

`string`

***

### createMountState()

```ts
function createMountState(
   horseType: HorseType, 
   maxHP: number, 
   options?: {
  speed?: number;
  ac?: number;
  initiativeMod?: number;
  attackBonus?: number;
  damageDie?: string;
}
): MountState;
```

Defined in: [combat/misc-rules.ts:1277](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1277)

Create initial mount state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `horseType` | [`HorseType`](#horsetype) | Type of horse |
| `maxHP` | `number` | Horse's max HP |
| `options?` | \{ `speed?`: `number`; `ac?`: `number`; `initiativeMod?`: `number`; `attackBonus?`: `number`; `damageDie?`: `string`; \} | Optional overrides |
| `options.speed?` | `number` | - |
| `options.ac?` | `number` | - |
| `options.initiativeMod?` | `number` | - |
| `options.attackBonus?` | `number` | - |
| `options.damageDie?` | `string` | - |

#### Returns

[`MountState`](#mountstate)

Mount state

***

### getMountedCombatBonuses()

```ts
function getMountedCombatBonuses(isCharging?: boolean, hasLanceOrSpear?: boolean): MountedCombatBonuses;
```

Defined in: [combat/misc-rules.ts:1321](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1321)

Get mounted combat bonuses

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `isCharging?` | `boolean` | `false` | Whether the rider is charging |
| `hasLanceOrSpear?` | `boolean` | `false` | Whether wielding a lance or spear |

#### Returns

[`MountedCombatBonuses`](#mountedcombatbonuses)

Combat bonuses

***

### getMountedInitiativeModifier()

```ts
function getMountedInitiativeModifier(riderInitMod: number, mountInitMod: number): number;
```

Defined in: [combat/misc-rules.ts:1341](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1341)

Calculate mounted initiative modifier

Uses the worse (lower) of rider and mount initiative modifiers

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `riderInitMod` | `number` | Rider's initiative modifier |
| `mountInitMod` | `number` | Mount's initiative modifier |

#### Returns

`number`

The worse of the two modifiers

***

### checkHorseSpooked()

```ts
function checkHorseSpooked(mount: MountState, damageDealt: number): {
  result: HorseSpookedResult;
  newState: MountState;
};
```

Defined in: [combat/misc-rules.ts:1358](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1358)

Check if a horse is spooked by damage

- Warhorses: only spooked when first dropping below half HP
- Other horses: spooked whenever they take damage

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mount` | [`MountState`](#mountstate) | Current mount state |
| `damageDealt` | `number` | Damage just dealt to the horse |

#### Returns

```ts
{
  result: HorseSpookedResult;
  newState: MountState;
}
```

Spook check result and updated mount state

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `result` | [`HorseSpookedResult`](#horsespookedresult) | [combat/misc-rules.ts:1361](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1361) |
| `newState` | [`MountState`](#mountstate) | [combat/misc-rules.ts:1361](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1361) |

***

### checkHorseAttackSpook()

```ts
function checkHorseAttackSpook(mount: MountState): HorseSpookedResult;
```

Defined in: [combat/misc-rules.ts:1429](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1429)

Check if a horse is spooked by an untrained horse attacking

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mount` | [`MountState`](#mountstate) | Mount state |

#### Returns

[`HorseSpookedResult`](#horsespookedresult)

Whether a stay mounted check is required

***

### makeStayMountedCheck()

```ts
function makeStayMountedCheck(
   agilityScore: number, 
   isTrained: boolean, 
   reason: string, 
   dc?: number, 
   roller?: DiceRoller
): StayMountedResult;
```

Defined in: [combat/misc-rules.ts:1455](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1455)

Make a stay mounted check

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `agilityScore` | `number` | `undefined` | Rider's Agility score |
| `isTrained` | `boolean` | `undefined` | Whether rider is trained in horsemanship |
| `reason` | `string` | `undefined` | Why the check is being made |
| `dc?` | `number` | `10` | DC to beat (default 10) |
| `roller?` | [`DiceRoller`](types.md#diceroller) | `undefined` | Dice roller |

#### Returns

[`StayMountedResult`](#staymountedresult)

Stay mounted result

***

### isLanceOrSpear()

```ts
function isLanceOrSpear(weaponName: string): boolean;
```

Defined in: [combat/misc-rules.ts:1493](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1493)

Check if a weapon is a lance or spear (for mounted charge damage)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `weaponName` | `string` | Name of the weapon |

#### Returns

`boolean`

Whether it's a lance or spear

***

### getMountedChargeDamageMultiplier()

```ts
function getMountedChargeDamageMultiplier(isCharging: boolean, weaponName: string): number;
```

Defined in: [combat/misc-rules.ts:1505](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1505)

Calculate mounted charge damage multiplier

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isCharging` | `boolean` | Whether mounted and charging |
| `weaponName` | `string` | Name of weapon being used |

#### Returns

`number`

Damage multiplier (2 for lance/spear charge, 1 otherwise)

***

### formatStayMountedResult()

```ts
function formatStayMountedResult(result: StayMountedResult): string;
```

Defined in: [combat/misc-rules.ts:1518](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1518)

Format stay mounted result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`StayMountedResult`](#staymountedresult) |

#### Returns

`string`

***

### formatMountedBonuses()

```ts
function formatMountedBonuses(bonuses: MountedCombatBonuses): string;
```

Defined in: [combat/misc-rules.ts:1530](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1530)

Format mounted combat bonuses for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `bonuses` | [`MountedCombatBonuses`](#mountedcombatbonuses) |

#### Returns

`string`

***

### formatFallingDamage()

```ts
function formatFallingDamage(result: FallingDamageResult): string;
```

Defined in: [combat/misc-rules.ts:1550](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1550)

Format falling damage result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`FallingDamageResult`](#fallingdamageresult) |

#### Returns

`string`

***

### formatGrappleResult()

```ts
function formatGrappleResult(
   result: GrappleResult, 
   attackerName: string, 
   defenderName: string
): string;
```

Defined in: [combat/misc-rules.ts:1568](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/misc-rules.ts#L1568)

Format grapple result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`GrappleResult`](#grappleresult) |
| `attackerName` | `string` |
| `defenderName` | `string` |

#### Returns

`string`

***

### makeMoraleCheck()

```ts
function makeMoraleCheck(input: MoraleCheckInput, roller?: DiceRoller): MoraleCheckResult;
```

Defined in: [combat/morale.ts:185](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L185)

Make a morale check for a creature, retainer, or NPC

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`MoraleCheckInput`](#moralecheckinput) | Morale check input |
| `roller?` | [`DiceRoller`](types.md#diceroller) | Optional dice roller |

#### Returns

[`MoraleCheckResult`](#moralecheckresult)

Morale check result

#### Examples

```ts
// Monster morale check when half HP lost
const result = makeMoraleCheck({
  entityType: "monster",
  willSave: 2,
  trigger: "half-hp-lost",
});
```

```ts
// Retainer morale check with employer bonus
const result = makeMoraleCheck({
  entityType: "retainer",
  willSave: 1,
  trigger: "first-combat",
  employerPersonalityMod: 2,
});
```

***

### calculateMoraleModifier()

```ts
function calculateMoraleModifier(
   willSave: number, 
   situationalModifier?: number, 
   employerPersonalityMod?: number
): number;
```

Defined in: [combat/morale.ts:275](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L275)

Calculate the total morale modifier for display

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `willSave` | `number` | `undefined` | Creature's Will save |
| `situationalModifier?` | `number` | `0` | Situational modifier |
| `employerPersonalityMod?` | `number` | `0` | Employer's Personality mod (retainers only) |

#### Returns

`number`

Total modifier

***

### checkGroupMoraleTrigger()

```ts
function checkGroupMoraleTrigger(state: GroupMoraleState, casualtyCount: number): 
  | {
  trigger: MoraleTrigger;
  newState: GroupMoraleState;
}
  | undefined;
```

Defined in: [combat/morale.ts:295](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L295)

Check if a group morale check is triggered and update state

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | [`GroupMoraleState`](#groupmoralestate) | Current group morale state |
| `casualtyCount` | `number` | Number of casualties just inflicted |

#### Returns

  \| \{
  `trigger`: [`MoraleTrigger`](#moraletrigger);
  `newState`: [`GroupMoraleState`](#groupmoralestate);
\}
  \| `undefined`

Trigger type if check is needed, undefined otherwise

***

### checkCreatureMoraleTrigger()

```ts
function checkCreatureMoraleTrigger(state: CreatureMoraleState, damageDealt: number): 
  | {
  trigger: MoraleTrigger;
  newState: CreatureMoraleState;
}
  | undefined;
```

Defined in: [combat/morale.ts:338](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L338)

Check if a single creature morale check is triggered

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | [`CreatureMoraleState`](#creaturemoralestate) | Current creature morale state |
| `damageDealt` | `number` | Damage just dealt |

#### Returns

  \| \{
  `trigger`: [`MoraleTrigger`](#moraletrigger);
  `newState`: [`CreatureMoraleState`](#creaturemoralestate);
\}
  \| `undefined`

Trigger type if check is needed, undefined otherwise

***

### checkRetainerMoraleTrigger()

```ts
function checkRetainerMoraleTrigger(state: RetainerMoraleState, situation: "combat" | "end-of-adventure" | "danger"): 
  | {
  trigger: MoraleTrigger;
  newState: RetainerMoraleState;
}
  | undefined;
```

Defined in: [combat/morale.ts:369](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L369)

Check if a retainer morale check is triggered

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `state` | [`RetainerMoraleState`](#retainermoralestate) | Current retainer morale state |
| `situation` | `"combat"` \| `"end-of-adventure"` \| `"danger"` | What situation occurred |

#### Returns

  \| \{
  `trigger`: [`MoraleTrigger`](#moraletrigger);
  `newState`: [`RetainerMoraleState`](#retainermoralestate);
\}
  \| `undefined`

Trigger type if check is needed, undefined otherwise

***

### createGroupMoraleState()

```ts
function createGroupMoraleState(totalCreatures: number): GroupMoraleState;
```

Defined in: [combat/morale.ts:414](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L414)

Create initial morale state for a group of creatures

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `totalCreatures` | `number` | Number of creatures in the group |

#### Returns

[`GroupMoraleState`](#groupmoralestate)

Initial group morale state

***

### createCreatureMoraleState()

```ts
function createCreatureMoraleState(maxHP: number): CreatureMoraleState;
```

Defined in: [combat/morale.ts:429](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L429)

Create initial morale state for a single creature

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `maxHP` | `number` | Creature's maximum hit points |

#### Returns

[`CreatureMoraleState`](#creaturemoralestate)

Initial creature morale state

***

### createRetainerMoraleState()

```ts
function createRetainerMoraleState(): RetainerMoraleState;
```

Defined in: [combat/morale.ts:442](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L442)

Create initial morale state for a retainer

#### Returns

[`RetainerMoraleState`](#retainermoralestate)

Initial retainer morale state

***

### resetRetainerMoraleForNewAdventure()

```ts
function resetRetainerMoraleForNewAdventure(_state: RetainerMoraleState): RetainerMoraleState;
```

Defined in: [combat/morale.ts:455](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L455)

Reset retainer morale state for a new adventure

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_state` | [`RetainerMoraleState`](#retainermoralestate) | Current state (unused, for API consistency) |

#### Returns

[`RetainerMoraleState`](#retainermoralestate)

Fresh retainer morale state

***

### isImmuneToMorale()

```ts
function isImmuneToMorale(creatureType: string): boolean;
```

Defined in: [combat/morale.ts:487](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L487)

Check if a creature type is immune to morale

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `creatureType` | `string` | Creature type string |

#### Returns

`boolean`

Whether the creature is immune

***

### hasImmuneTraits()

```ts
function hasImmuneTraits(traits: string[]): boolean;
```

Defined in: [combat/morale.ts:500](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L500)

Check if a creature is immune based on traits/keywords

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `traits` | `string`[] | Array of trait strings |

#### Returns

`boolean`

Whether the creature is immune

***

### getSuggestedModifier()

```ts
function getSuggestedModifier(scenario: string): number;
```

Defined in: [combat/morale.ts:542](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L542)

Get suggested situational modifier based on common scenarios

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `scenario` | `string` |

#### Returns

`number`

***

### formatMoraleResult()

```ts
function formatMoraleResult(result: MoraleCheckResult): string;
```

Defined in: [combat/morale.ts:589](https://github.com/moonloch/dcc-core-lib/blob/main/src/combat/morale.ts#L589)

Format morale check result for display

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | [`MoraleCheckResult`](#moralecheckresult) |

#### Returns

`string`

## References

### FUMBLE\_DICE

Re-exports [FUMBLE_DICE](types.md#fumble_dice)
