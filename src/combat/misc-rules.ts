/**
 * Miscellaneous Combat Rules
 *
 * Implements various DCC combat rules including:
 * - Ability loss effects (when abilities reach 0)
 * - Catching fire
 * - Charge attacks
 * - Dropping torches
 * - Falling damage
 * - Firing into melee
 * - Grappling
 * - Recovering armor and missile weapons
 * - Subdual damage
 * - Unarmed combat
 */

import type { DiceRoller, LegacyRollModifier } from "../types/dice.js";
import type { DCCAbilityId } from "../types/system.js";
import { evaluateRoll } from "../dice/roll.js";
import { bumpDie } from "../dice/dice-chain.js";

// =============================================================================
// Types
// =============================================================================

/**
 * Effect of having an ability reduced to 0
 */
export type AbilityLossEffect =
  | "babbling-idiot" // PER or INT = 0
  | "immobile" // STR or AGL = 0
  | "unconscious" // STA = 0
  | "constant-mishaps"; // LCK = 0

/**
 * Result of checking ability loss effects
 */
export interface AbilityLossResult {
  /** Which ability is at 0 */
  ability: DCCAbilityId;

  /** The effect on the character */
  effect: AbilityLossEffect;

  /** Description of the effect */
  description: string;

  /** Whether the character is incapacitated */
  incapacitated: boolean;
}

/**
 * State of a character on fire
 */
export interface OnFireState {
  /** Damage die per round (default 1d6) */
  damageDie: string;

  /** DC to put out the fire (default 10) */
  extinguishDC: number;

  /** Rounds the character has been on fire */
  roundsOnFire: number;

  /** Source of the fire (for description) */
  source?: string | undefined;
}

/**
 * Result of fire damage for a round
 */
export interface FireDamageResult {
  /** Damage taken this round */
  damage: number;

  /** Whether the character attempted to extinguish */
  attemptedExtinguish: boolean;

  /** The Reflex save roll (if attempted) */
  reflexRoll?: number | undefined;

  /** Whether the fire was extinguished */
  extinguished: boolean;

  /** Updated fire state (undefined if extinguished) */
  newState?: OnFireState | undefined;
}

/**
 * Charge attack modifiers
 */
export interface ChargeModifiers {
  /** Attack bonus from charging (+2) */
  attackBonus: number;

  /** AC penalty from charging (-2) */
  acPenalty: number;

  /** Minimum distance required (half speed) */
  minDistance: number;
}

/**
 * Result of falling damage
 */
export interface FallingDamageResult {
  /** Total damage taken */
  damage: number;

  /** Individual die results */
  diceResults: number[];

  /** Number of broken bones (dice that rolled 6) */
  brokenBones: number;

  /** Distance fallen in feet */
  distanceFallen: number;

  /** Permanent ability loss from broken bones */
  permanentLoss: number;
}

/**
 * Result of firing into melee when missing
 */
export interface FiringIntoMeleeResult {
  /** Whether the shot went wild */
  hitAlly: boolean;

  /** The d100 roll for determining if ally is hit */
  chanceRoll: number;

  /** Index of ally hit (if any) - for random selection */
  allyIndex?: number | undefined;

  /** Re-roll attack result against ally's AC (if hit) */
  allyAttackRoll?: number | undefined;

  /** Whether the re-roll hit the ally */
  allyWasHit?: boolean | undefined;
}

/**
 * Grapple participant stats
 */
export interface GrappleParticipant {
  /** Attack bonus */
  attackBonus: number;

  /** Strength modifier */
  strengthMod: number;

  /** Agility modifier */
  agilityMod: number;

  /** Size category (1 = small, 2 = medium, 3 = large, etc.) */
  sizeCategory: number;

  /** For monsters: hit dice (used instead of ability mods) */
  hitDice?: number | undefined;
}

/**
 * Result of a grapple attempt
 */
export interface GrappleResult {
  /** Attacker's roll */
  attackerRoll: number;

  /** Attacker's total (roll + mods) */
  attackerTotal: number;

  /** Defender's roll */
  defenderRoll: number;

  /** Defender's total (roll + mods) */
  defenderTotal: number;

  /** Whether the attacker won */
  attackerWins: boolean;

  /** Whether target is now pinned */
  targetPinned: boolean;

  /** All modifiers applied */
  modifiers: LegacyRollModifier[];
}

/**
 * Result of armor recovery check
 */
export interface ArmorRecoveryResult {
  /** Whether the armor is usable */
  usable: boolean;

  /** The d100 roll */
  roll: number;

  /** Whether armor fits humans (if checking) */
  humanSized?: boolean | undefined;

  /** Estimated repair cost (fraction of original) */
  repairCostFraction?: number | undefined;
}

/**
 * Result of missile weapon recovery
 */
export interface MissileRecoveryResult {
  /** Number of missiles recovered */
  recovered: number;

  /** Number of missiles destroyed */
  destroyed: number;

  /** Individual roll results */
  rolls: { roll: number; destroyed: boolean }[];
}

/**
 * Subdual damage info
 */
export interface SubdualDamageResult {
  /** The stepped-down damage die */
  damageDie: string;

  /** Damage rolled */
  damage: number;

  /** Whether this damage is subdual (non-lethal) */
  isSubdual: true;

  /** Original weapon die (before step-down) */
  originalDie: string;
}

// =============================================================================
// Ability Loss
// =============================================================================

/**
 * Get the effect of an ability being reduced to 0
 *
 * @param ability - The ability at 0
 * @returns The effect on the character
 */
export function getAbilityLossEffect(ability: DCCAbilityId): AbilityLossResult {
  switch (ability) {
    case "per":
      return {
        ability,
        effect: "babbling-idiot",
        description: "Babbling idiot incapable of communication",
        incapacitated: true,
      };
    case "int":
      return {
        ability,
        effect: "babbling-idiot",
        description: "Babbling idiot incapable of feeding themselves",
        incapacitated: true,
      };
    case "str":
      return {
        ability,
        effect: "immobile",
        description: "Incapable of movement due to muscle failure",
        incapacitated: true,
      };
    case "agl":
      return {
        ability,
        effect: "immobile",
        description: "Incapable of movement due to loss of coordination",
        incapacitated: true,
      };
    case "sta":
      return {
        ability,
        effect: "unconscious",
        description: "Faints and remains unconscious",
        incapacitated: true,
      };
    case "lck":
      return {
        ability,
        effect: "constant-mishaps",
        description: "Suffers constant bizarre mishaps, effectively unable to accomplish anything",
        incapacitated: true,
      };
  }
}

/**
 * Check all abilities for zero values and return effects
 *
 * @param abilities - Record of ability scores
 * @returns Array of ability loss effects (empty if none at 0)
 */
export function checkAbilityLoss(
  abilities: Record<DCCAbilityId, number>
): AbilityLossResult[] {
  const results: AbilityLossResult[] = [];

  for (const [ability, score] of Object.entries(abilities)) {
    if (score <= 0) {
      results.push(getAbilityLossEffect(ability as DCCAbilityId));
    }
  }

  return results;
}

// =============================================================================
// Catching Fire
// =============================================================================

/**
 * Create initial on-fire state
 *
 * @param options - Optional configuration
 * @returns Fire state
 */
export function createOnFireState(options?: {
  damageDie?: string;
  extinguishDC?: number;
  source?: string;
}): OnFireState {
  return {
    damageDie: options?.damageDie ?? "1d6",
    extinguishDC: options?.extinguishDC ?? 10,
    roundsOnFire: 0,
    source: options?.source,
  };
}

/**
 * Process a round of being on fire
 *
 * @param state - Current fire state
 * @param attemptExtinguish - Whether character spends action to stop/drop/roll
 * @param reflexSave - Character's Reflex save bonus
 * @param roller - Dice roller
 * @returns Fire damage result
 */
export function processFireRound(
  state: OnFireState,
  attemptExtinguish: boolean,
  reflexSave: number,
  roller?: DiceRoller
): FireDamageResult {
  // Roll fire damage
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };
  const damageResult = evaluateRoll(state.damageDie, rollOptions);
  const damage = damageResult.total ?? 0;

  const result: FireDamageResult = {
    damage,
    attemptedExtinguish: attemptExtinguish,
    extinguished: false,
  };

  // If attempting to put out fire
  if (attemptExtinguish) {
    const saveResult = evaluateRoll("1d20", rollOptions);
    const reflexRoll = saveResult.total ?? 10;
    result.reflexRoll = reflexRoll;

    const total = reflexRoll + reflexSave;
    if (total >= state.extinguishDC) {
      result.extinguished = true;
      return result;
    }
  }

  // Fire continues
  result.newState = {
    ...state,
    roundsOnFire: state.roundsOnFire + 1,
  };

  return result;
}

// =============================================================================
// Charge
// =============================================================================

/**
 * Get charge attack modifiers
 *
 * @param speed - Character's movement speed
 * @returns Charge modifiers
 */
export function getChargeModifiers(speed: number): ChargeModifiers {
  return {
    attackBonus: 2,
    acPenalty: -2,
    minDistance: Math.floor(speed / 2),
  };
}

/**
 * Check if a charge is valid
 *
 * @param distanceMoved - Distance moved this turn
 * @param speed - Character's movement speed
 * @returns Whether the charge is valid
 */
export function isValidCharge(distanceMoved: number, speed: number): boolean {
  return distanceMoved >= Math.floor(speed / 2);
}

// =============================================================================
// Dropping Torch
// =============================================================================

/**
 * Check if a dropped torch is extinguished
 *
 * @param roller - Dice roller
 * @returns Whether the torch went out
 */
export function checkDroppedTorch(roller?: DiceRoller): { extinguished: boolean; roll: number } {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };
  const result = evaluateRoll("1d100", rollOptions);
  const roll = result.total ?? 50;

  return {
    extinguished: roll <= 50,
    roll,
  };
}

// =============================================================================
// Falling Damage
// =============================================================================

/**
 * Calculate falling damage
 *
 * @param distanceFeet - Distance fallen in feet
 * @param roller - Dice roller
 * @returns Falling damage result
 */
export function calculateFallingDamage(
  distanceFeet: number,
  roller?: DiceRoller
): FallingDamageResult {
  const numDice = Math.floor(distanceFeet / 10);

  if (numDice <= 0) {
    return {
      damage: 0,
      diceResults: [],
      brokenBones: 0,
      distanceFallen: distanceFeet,
      permanentLoss: 0,
    };
  }

  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  const diceResults: number[] = [];
  let brokenBones = 0;

  for (let i = 0; i < numDice; i++) {
    const dieResult = evaluateRoll("1d6", rollOptions);
    const value = dieResult.total ?? 1;
    diceResults.push(value);

    if (value === 6) {
      brokenBones++;
    }
  }

  const damage = diceResults.reduce((sum, d) => sum + d, 0);

  return {
    damage,
    diceResults,
    brokenBones,
    distanceFallen: distanceFeet,
    permanentLoss: brokenBones, // Each broken bone = -1 STR or AGL (player's choice)
  };
}

// =============================================================================
// Firing Into Melee
// =============================================================================

/**
 * To-hit penalty for making a missile attack at a target engaged in melee
 * (DCC core rulebook p. 96). A flat -1 regardless of how many combatants are
 * involved.
 *
 * This is the *attack-roll* penalty for shooting into a melee. It is distinct
 * from the *friendly-fire* check that happens when such a shot misses — see
 * {@link checkFiringIntoMelee}.
 */
export const FIRING_INTO_MELEE_PENALTY = -1;

/**
 * Get the to-hit penalty for a missile attack into melee.
 *
 * The lib owns the RAW penalty value; whether the target is actually engaged
 * in melee is a positional question the caller answers (Foundry-side, from
 * token adjacency and disposition).
 *
 * @param targetEngagedInMelee - Whether an ally/combatant is in melee with the target
 * @returns The attack-roll penalty (-1 when firing into melee, 0 otherwise)
 */
export function getFiringIntoMeleePenalty(targetEngagedInMelee: boolean): number {
  return targetEngagedInMelee ? FIRING_INTO_MELEE_PENALTY : 0;
}

/**
 * Check if a missed ranged attack hits an ally in melee
 *
 * @param numAlliesInMelee - Number of allies engaged with the target
 * @param allyACs - Array of ally armor classes
 * @param attackRoll - The original attack roll (to re-roll against ally)
 * @param attackBonus - Attacker's bonus
 * @param roller - Dice roller
 * @returns Result of firing into melee
 */
export function checkFiringIntoMelee(
  numAlliesInMelee: number,
  allyACs: number[],
  attackBonus: number,
  roller?: DiceRoller
): FiringIntoMeleeResult {
  if (numAlliesInMelee <= 0 || allyACs.length === 0) {
    return {
      hitAlly: false,
      chanceRoll: 0,
    };
  }

  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  // 50% chance to hit ally
  const chanceResult = evaluateRoll("1d100", rollOptions);
  const chanceRoll = chanceResult.total ?? 50;

  if (chanceRoll > 50) {
    return {
      hitAlly: false,
      chanceRoll,
    };
  }

  // Determine which ally (randomly)
  const allyIndexResult = evaluateRoll(`1d${String(numAlliesInMelee)}`, rollOptions);
  const allyIndex = (allyIndexResult.total ?? 1) - 1;

  // Re-roll attack against ally's AC
  const attackResult = evaluateRoll("1d20", rollOptions);
  const allyAttackRoll = (attackResult.total ?? 10) + attackBonus;
  const allyAC = allyACs[allyIndex] ?? 10;
  const allyWasHit = allyAttackRoll >= allyAC;

  return {
    hitAlly: true,
    chanceRoll,
    allyIndex,
    allyAttackRoll,
    allyWasHit,
  };
}

// =============================================================================
// Missile Fire Range
// =============================================================================

/**
 * The three DCC missile range bands, plus the beyond-maximum case.
 *
 * Per the DCC core rulebook (p. 96), a missile weapon lists three range
 * increments. A target within short range is attacked normally; medium range
 * imposes a -2 penalty to the attack roll; long range imposes a -1d penalty
 * (the action die steps down one rung on the dice chain). Beyond long range
 * the target cannot be attacked.
 */
export type MissileRangeBand = "short" | "medium" | "long" | "out-of-range";

/**
 * A missile weapon's three range increments, in the scene's distance unit
 * (typically feet). Each value is the maximum distance for that band.
 */
export interface MissileRangeBands {
  /** Maximum distance for short range (no penalty) */
  short: number;

  /** Maximum distance for medium range (-2 to attack) */
  medium: number;

  /** Maximum distance for long range (-1d to the action die) */
  long: number;
}

/**
 * The penalty owed for a missile attack at a given distance.
 */
export interface MissileRangePenalty {
  /** Which range band the target falls into */
  band: MissileRangeBand;

  /** Flat modifier to the attack roll (e.g. -2 at medium range, 0 otherwise) */
  attackModifier: number;

  /** Dice-chain steps applied to the action die (e.g. -1 at long range, 0 otherwise) */
  actionDieSteps: number;

  /** The action die after applying {@link actionDieSteps} (only when an action die was supplied) */
  actionDie?: string | undefined;

  /** Whether the target is beyond the weapon's maximum (long) range */
  outOfRange: boolean;
}

/**
 * Parse a DCC missile range string into structured bands.
 *
 * Accepts the canonical "short/medium/long" form (e.g. "30/60/120") and the
 * single-value form some weapons use (e.g. "60"), where the lone value is the
 * maximum reach with no intermediate penalty bands. Each segment may carry a
 * trailing unit marker — feet (`30'`), inches (`30"`), smart quotes (`30’`,
 * `30”`), or a word unit (`30 ft`) — which is ignored; only the leading number
 * is read, so the bands come back in whatever unit the string used (no unit
 * conversion is performed). Surrounding whitespace is tolerated. Returns null
 * for unparseable or non-positive input.
 *
 * @param range - The weapon's range string
 * @returns Structured range bands, or null if the string can't be parsed
 */
export function parseMissileRange(range: string): MissileRangeBands | null {
  if (typeof range !== "string") {
    return null;
  }

  // parseFloat reads the leading number and ignores trailing unit decoration
  // (30' / 30" / 30’ / 30 ft), so feet/inches marks don't break parsing.
  const parts = range
    .split("/")
    .map(p => parseFloat(p.trim()))
    .filter(n => Number.isFinite(n) && n > 0);

  if (parts.length === 3) {
    const [short, medium, long] = parts as [number, number, number];
    return { short, medium, long };
  }

  // Single-value range: the whole distance is "short" with no penalty bands.
  if (parts.length === 1) {
    const [only] = parts as [number];
    return { short: only, medium: only, long: only };
  }

  return null;
}

/**
 * Classify a missile attack's distance into a range band and report the
 * penalty owed, per DCC core rulebook p. 96.
 *
 * - Short range (or point blank): no penalty.
 * - Medium range: -2 to the attack roll.
 * - Long range: -1d, i.e. the action die steps down one rung on the dice chain.
 * - Beyond long range: out of range (no penalty is computed; the caller decides
 *   whether to forbid or confirm the shot).
 *
 * When an `actionDie` is supplied, the resulting (possibly stepped-down) die is
 * returned in {@link MissileRangePenalty.actionDie}; the flat
 * {@link MissileRangePenalty.attackModifier} and {@link MissileRangePenalty.actionDieSteps}
 * are always returned so callers without a concrete die can still apply the rule.
 *
 * @param distance - Measured distance to the target, in the same unit as the bands
 * @param bands - The weapon's range bands (see {@link parseMissileRange})
 * @param actionDie - The attacker's action die (e.g. "1d20"), optional
 * @returns The range band and the penalty owed
 */
export function getMissileRangePenalty(
  distance: number,
  bands: MissileRangeBands,
  actionDie?: string
): MissileRangePenalty {
  // Point-blank / non-positive distance is treated as short range.
  if (distance <= bands.short) {
    return { band: "short", attackModifier: 0, actionDieSteps: 0, actionDie, outOfRange: false };
  }

  if (distance <= bands.medium) {
    return { band: "medium", attackModifier: -2, actionDieSteps: 0, actionDie, outOfRange: false };
  }

  if (distance <= bands.long) {
    const steppedDie = actionDie !== undefined ? bumpDie(actionDie, -1) : undefined;
    return { band: "long", attackModifier: 0, actionDieSteps: -1, actionDie: steppedDie, outOfRange: false };
  }

  return { band: "out-of-range", attackModifier: 0, actionDieSteps: 0, actionDie, outOfRange: true };
}

// =============================================================================
// Grappling
// =============================================================================

/**
 * Calculate size bonus for grappling
 *
 * @param attackerSize - Attacker's size category
 * @param defenderSize - Defender's size category
 * @returns Bonus to attacker's grapple check
 */
export function getGrappleSizeBonus(attackerSize: number, defenderSize: number): number {
  const sizeRatio = attackerSize / defenderSize;

  if (sizeRatio >= 4) return 16;
  if (sizeRatio >= 3) return 8;
  if (sizeRatio >= 2) return 4;
  return 0;
}

/**
 * Get the grapple modifier for a participant
 *
 * @param participant - Grapple participant
 * @returns The modifier to use (higher of STR/AGL, or HD for monsters)
 */
export function getGrappleModifier(participant: GrappleParticipant): number {
  if (participant.hitDice !== undefined) {
    return participant.hitDice;
  }
  return Math.max(participant.strengthMod, participant.agilityMod);
}

/**
 * Resolve a grapple attempt
 *
 * @param attacker - Attacker's stats
 * @param defender - Defender's stats
 * @param roller - Dice roller
 * @returns Grapple result
 */
export function resolveGrapple(
  attacker: GrappleParticipant,
  defender: GrappleParticipant,
  roller?: DiceRoller
): GrappleResult {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  const modifiers: LegacyRollModifier[] = [];

  // Roll attacks
  const attackerRollResult = evaluateRoll("1d20", rollOptions);
  const defenderRollResult = evaluateRoll("1d20", rollOptions);

  const attackerRoll = attackerRollResult.total ?? 10;
  const defenderRoll = defenderRollResult.total ?? 10;

  // Calculate modifiers
  const attackerMod = getGrappleModifier(attacker);
  const defenderMod = getGrappleModifier(defender);

  modifiers.push({
    source: "ability",
    value: attackerMod,
    label: attacker.hitDice !== undefined ? "Hit Dice" : "STR/AGL",
  });

  // Attack bonus
  let attackerBonus = attacker.attackBonus + attackerMod;

  // Size bonus
  const sizeBonus = getGrappleSizeBonus(attacker.sizeCategory, defender.sizeCategory);
  if (sizeBonus > 0) {
    attackerBonus += sizeBonus;
    modifiers.push({
      source: "size",
      value: sizeBonus,
      label: "Size advantage",
    });
  }

  const attackerTotal = attackerRoll + attackerBonus;
  const defenderTotal = defenderRoll + defender.attackBonus + defenderMod;

  const attackerWins = attackerTotal > defenderTotal;

  return {
    attackerRoll,
    attackerTotal,
    defenderRoll,
    defenderTotal,
    attackerWins,
    targetPinned: attackerWins,
    modifiers,
  };
}

// =============================================================================
// Recovering Equipment
// =============================================================================

/**
 * Check whether armor salvaged from a defeated enemy is usable
 *
 * @param checkHumanSized - Whether to also check if armor is human-sized
 * @param roller - Dice roller
 * @returns Armor recovery result
 */
export function checkArmorRecovery(
  checkHumanSized = false,
  roller?: DiceRoller
): ArmorRecoveryResult {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  // 25% chance armor is useless
  const usableResult = evaluateRoll("1d100", rollOptions);
  const roll = usableResult.total ?? 50;
  const usable = roll > 25;

  const result: ArmorRecoveryResult = {
    usable,
    roll,
  };

  if (!usable) {
    result.repairCostFraction = 0.25 + Math.random() * 0.25; // 25-50% of original cost
  }

  // Check if human-sized
  if (checkHumanSized) {
    const sizeResult = evaluateRoll("1d100", rollOptions);
    const sizeRoll = sizeResult.total ?? 50;
    result.humanSized = sizeRoll <= 75; // 75% chance human-sized
  }

  return result;
}

/**
 * Check recovery of missile weapons
 *
 * @param numMissiles - Number of missiles to recover
 * @param roller - Dice roller
 * @returns Missile recovery result
 */
export function checkMissileRecovery(
  numMissiles: number,
  roller?: DiceRoller
): MissileRecoveryResult {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  const rolls: { roll: number; destroyed: boolean }[] = [];
  let recovered = 0;
  let destroyed = 0;

  for (let i = 0; i < numMissiles; i++) {
    const result = evaluateRoll("1d100", rollOptions);
    const roll = result.total ?? 50;
    const isDestroyed = roll <= 50;

    rolls.push({ roll, destroyed: isDestroyed });

    if (isDestroyed) {
      destroyed++;
    } else {
      recovered++;
    }
  }

  return {
    recovered,
    destroyed,
    rolls,
  };
}

// =============================================================================
// Subdual Damage
// =============================================================================

/**
 * Weapons that can deal subdual damage when the user is proficient
 */
export const SUBDUAL_CAPABLE_WEAPONS = [
  "sword",
  "longsword",
  "short sword",
  "two-handed sword",
  "axe",
  "battle axe",
  "hand axe",
  "club",
  "spear",
  "staff",
  "quarterstaff",
] as const;

/**
 * Check if a weapon can deal subdual damage
 *
 * @param weaponName - Name of the weapon
 * @returns Whether the weapon can deal subdual damage
 */
export function canDealSubdualDamage(weaponName: string): boolean {
  const normalized = weaponName.toLowerCase();
  return SUBDUAL_CAPABLE_WEAPONS.some(w => normalized.includes(w));
}

/**
 * Calculate subdual damage (one die step lower)
 *
 * @param weaponDie - Normal weapon damage die
 * @param strengthMod - Strength modifier
 * @param roller - Dice roller
 * @returns Subdual damage result
 */
export function rollSubdualDamage(
  weaponDie: string,
  strengthMod: number,
  roller?: DiceRoller
): SubdualDamageResult {
  // Step down the die by one on the dice chain
  const subdualDie = bumpDie(weaponDie, -1);

  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  const result = evaluateRoll(subdualDie, rollOptions);
  const baseDamage = result.total ?? 1;
  const damage = Math.max(1, baseDamage + strengthMod);

  return {
    damageDie: subdualDie,
    damage,
    isSubdual: true,
    originalDie: weaponDie,
  };
}

/**
 * Roll unarmed combat damage (always subdual)
 *
 * @param strengthMod - Strength modifier
 * @param roller - Dice roller
 * @returns Subdual damage result
 */
export function rollUnarmedDamage(
  strengthMod: number,
  roller?: DiceRoller
): SubdualDamageResult {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  const result = evaluateRoll("1d3", rollOptions);
  const baseDamage = result.total ?? 1;
  const damage = Math.max(1, baseDamage + strengthMod);

  return {
    damageDie: "1d3",
    damage,
    isSubdual: true,
    originalDie: "1d3",
  };
}

// =============================================================================
// Melee Against Grappled
// =============================================================================

/**
 * Check if a missed melee attack against a grappled creature hits the grappler
 *
 * @param grapplerAC - AC of the ally maintaining the pin
 * @param attackBonus - Attacker's bonus
 * @param roller - Dice roller
 * @returns Result similar to firing into melee
 */
export function checkMeleeAgainstGrappled(
  grapplerAC: number,
  attackBonus: number,
  roller?: DiceRoller
): FiringIntoMeleeResult {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  // 50% chance to hit the grappler
  const chanceResult = evaluateRoll("1d100", rollOptions);
  const chanceRoll = chanceResult.total ?? 50;

  if (chanceRoll > 50) {
    return {
      hitAlly: false,
      chanceRoll,
    };
  }

  // Re-roll attack against grappler's AC
  const attackResult = evaluateRoll("1d20", rollOptions);
  const allyAttackRoll = (attackResult.total ?? 10) + attackBonus;
  const allyWasHit = allyAttackRoll >= grapplerAC;

  return {
    hitAlly: true,
    chanceRoll,
    allyIndex: 0, // Only one grappler
    allyAttackRoll,
    allyWasHit,
  };
}

// =============================================================================
// Withdrawal
// =============================================================================

/**
 * Opponent info for withdrawal attacks of opportunity
 */
export interface WithdrawalOpponent {
  /** Opponent's name/identifier */
  name: string;

  /** Opponent's attack bonus */
  attackBonus: number;

  /** Opponent's damage die */
  damageDie: string;

  /** Opponent's strength modifier for damage */
  strengthMod: number;
}

/**
 * Result of a single attack of opportunity
 */
export interface AttackOfOpportunityResult {
  /** Opponent making the attack */
  opponentName: string;

  /** Attack roll */
  attackRoll: number;

  /** Total attack (roll + bonus) */
  attackTotal: number;

  /** Whether the attack hit */
  hit: boolean;

  /** Damage dealt (if hit) */
  damage?: number | undefined;
}

/**
 * Result of withdrawing from melee
 */
export interface WithdrawalResult {
  /** Number of opponents who got free attacks */
  numOpponents: number;

  /** Results of each attack of opportunity */
  attacks: AttackOfOpportunityResult[];

  /** Total damage taken */
  totalDamage: number;
}

/**
 * Process a withdrawal from melee combat
 *
 * When a character withdraws from an active melee, all engaged opponents
 * receive a single free attack against them.
 *
 * @param withdrawingAC - AC of the withdrawing character
 * @param opponents - Array of opponents engaged in melee
 * @param roller - Dice roller
 * @returns Withdrawal result with all attack of opportunity results
 */
export function processWithdrawal(
  withdrawingAC: number,
  opponents: WithdrawalOpponent[],
  roller?: DiceRoller
): WithdrawalResult {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  const attacks: AttackOfOpportunityResult[] = [];
  let totalDamage = 0;

  for (const opponent of opponents) {
    // Roll attack
    const attackResult = evaluateRoll("1d20", rollOptions);
    const attackRoll = attackResult.total ?? 10;
    const attackTotal = attackRoll + opponent.attackBonus;
    const hit = attackTotal >= withdrawingAC;

    const attack: AttackOfOpportunityResult = {
      opponentName: opponent.name,
      attackRoll,
      attackTotal,
      hit,
    };

    // Roll damage if hit
    if (hit) {
      const damageResult = evaluateRoll(opponent.damageDie, rollOptions);
      const baseDamage = damageResult.total ?? 1;
      const damage = Math.max(1, baseDamage + opponent.strengthMod);
      attack.damage = damage;
      totalDamage += damage;
    }

    attacks.push(attack);
  }

  return {
    numOpponents: opponents.length,
    attacks,
    totalDamage,
  };
}

/**
 * Check if a character is engaged in melee (for UI purposes)
 *
 * @param numAdjacentEnemies - Number of enemies in melee range
 * @returns Whether the character is engaged
 */
export function isEngagedInMelee(numAdjacentEnemies: number): boolean {
  return numAdjacentEnemies > 0;
}

/**
 * Format withdrawal result for display
 */
export function formatWithdrawalResult(result: WithdrawalResult): string {
  if (result.numOpponents === 0) {
    return "Withdraws safely (not engaged in melee)";
  }

  const attackDescriptions = result.attacks.map(a => {
    if (a.hit) {
      return `${a.opponentName}: ${String(a.attackTotal)} - HIT for ${String(a.damage)} damage`;
    }
    return `${a.opponentName}: ${String(a.attackTotal)} - miss`;
  });

  const header = result.numOpponents === 1
    ? "Withdrawal triggers 1 attack of opportunity:"
    : `Withdrawal triggers ${String(result.numOpponents)} attacks of opportunity:`;

  return `${header}\n${attackDescriptions.join("\n")}\nTotal damage: ${String(result.totalDamage)}`;
}

// =============================================================================
// Mounted Combat
// =============================================================================

/**
 * Type of horse for combat purposes
 */
export type HorseType = "warhorse" | "riding-horse" | "draft-horse" | "pony";

/**
 * State of a mount in combat
 */
export interface MountState {
  /** Type of horse */
  horseType: HorseType;

  /** Whether the horse is trained for combat (warhorses always are) */
  combatTrained: boolean;

  /** Horse's current HP */
  currentHP: number;

  /** Horse's max HP */
  maxHP: number;

  /** Whether first-wounded check has been triggered (for warhorses) */
  halfHPChecked: boolean;

  /** Horse's initiative modifier */
  initiativeMod: number;

  /** Horse's movement speed */
  speed: number;

  /** Horse's AC */
  ac: number;

  /** Horse's attack bonus (if combat trained) */
  attackBonus?: number | undefined;

  /** Horse's damage die (if combat trained) */
  damageDie?: string | undefined;
}

/**
 * Mounted combat bonuses
 */
export interface MountedCombatBonuses {
  /** AC bonus while mounted (+1) */
  acBonus: number;

  /** Attack bonus vs unmounted opponents (+1 higher ground) */
  attackBonusVsUnmounted: number;

  /** Whether lance/spear damage dice are doubled (charging) */
  lanceDamageDoubled: boolean;
}

/**
 * Result of a stay mounted check
 */
export interface StayMountedResult {
  /** The die used (d20 trained, d10 untrained) */
  dieUsed: string;

  /** The roll result */
  roll: number;

  /** The DC to beat */
  dc: number;

  /** Whether the check passed */
  stayedMounted: boolean;

  /** If failed, character is now prone */
  isProne: boolean;

  /** Reason for the check */
  reason: string;
}

/**
 * Result of checking if a horse is spooked
 */
export interface HorseSpookedResult {
  /** Whether the horse is spooked */
  spooked: boolean;

  /** Reason for spook (or why not spooked) */
  reason: string;

  /** Whether a stay mounted check is required */
  requiresStayMountedCheck: boolean;
}

/**
 * Create initial mount state
 *
 * @param horseType - Type of horse
 * @param maxHP - Horse's max HP
 * @param options - Optional overrides
 * @returns Mount state
 */
export function createMountState(
  horseType: HorseType,
  maxHP: number,
  options?: {
    speed?: number;
    ac?: number;
    initiativeMod?: number;
    attackBonus?: number;
    damageDie?: string;
  }
): MountState {
  const isWarhorse = horseType === "warhorse";

  // Default stats by horse type
  const defaults: Record<HorseType, { speed: number; ac: number; initMod: number }> = {
    "warhorse": { speed: 50, ac: 13, initMod: 0 },
    "riding-horse": { speed: 60, ac: 12, initMod: 1 },
    "draft-horse": { speed: 40, ac: 11, initMod: -1 },
    "pony": { speed: 40, ac: 12, initMod: 0 },
  };

  const typeDefaults = defaults[horseType];

  return {
    horseType,
    combatTrained: isWarhorse,
    currentHP: maxHP,
    maxHP,
    halfHPChecked: false,
    initiativeMod: options?.initiativeMod ?? typeDefaults.initMod,
    speed: options?.speed ?? typeDefaults.speed,
    ac: options?.ac ?? typeDefaults.ac,
    attackBonus: isWarhorse ? (options?.attackBonus ?? 2) : undefined,
    damageDie: isWarhorse ? (options?.damageDie ?? "1d6") : undefined,
  };
}

/**
 * Get mounted combat bonuses
 *
 * @param isCharging - Whether the rider is charging
 * @param hasLanceOrSpear - Whether wielding a lance or spear
 * @returns Combat bonuses
 */
export function getMountedCombatBonuses(
  isCharging = false,
  hasLanceOrSpear = false
): MountedCombatBonuses {
  return {
    acBonus: 1,
    attackBonusVsUnmounted: 1,
    lanceDamageDoubled: isCharging && hasLanceOrSpear,
  };
}

/**
 * Calculate mounted initiative modifier
 *
 * Uses the worse (lower) of rider and mount initiative modifiers
 *
 * @param riderInitMod - Rider's initiative modifier
 * @param mountInitMod - Mount's initiative modifier
 * @returns The worse of the two modifiers
 */
export function getMountedInitiativeModifier(
  riderInitMod: number,
  mountInitMod: number
): number {
  return Math.min(riderInitMod, mountInitMod);
}

/**
 * Check if a horse is spooked by damage
 *
 * - Warhorses: only spooked when first dropping below half HP
 * - Other horses: spooked whenever they take damage
 *
 * @param mount - Current mount state
 * @param damageDealt - Damage just dealt to the horse
 * @returns Spook check result and updated mount state
 */
export function checkHorseSpooked(
  mount: MountState,
  damageDealt: number
): { result: HorseSpookedResult; newState: MountState } {
  const newHP = mount.currentHP - damageDealt;
  const halfHP = Math.floor(mount.maxHP / 2);
  const isWarhorse = mount.horseType === "warhorse";

  // Update mount state
  const newState: MountState = {
    ...mount,
    currentHP: Math.max(0, newHP),
  };

  // Warhorse: only spooked when first dropping below half HP
  if (isWarhorse) {
    const wasAboveHalf = mount.currentHP > halfHP;
    const nowAtOrBelowHalf = newHP <= halfHP;

    if (wasAboveHalf && nowAtOrBelowHalf && !mount.halfHPChecked) {
      newState.halfHPChecked = true;
      return {
        result: {
          spooked: true,
          reason: "Warhorse dropped below half HP for the first time",
          requiresStayMountedCheck: true,
        },
        newState,
      };
    }

    return {
      result: {
        spooked: false,
        reason: mount.halfHPChecked
          ? "Warhorse already checked for half HP"
          : "Warhorse not yet at half HP",
        requiresStayMountedCheck: false,
      },
      newState,
    };
  }

  // Normal horses: spooked any time they take damage
  if (damageDealt > 0) {
    return {
      result: {
        spooked: true,
        reason: "Horse wounded (non-warhorse spooked by any wound)",
        requiresStayMountedCheck: true,
      },
      newState,
    };
  }

  return {
    result: {
      spooked: false,
      reason: "No damage dealt",
      requiresStayMountedCheck: false,
    },
    newState,
  };
}

/**
 * Check if a horse is spooked by an untrained horse attacking
 *
 * @param mount - Mount state
 * @returns Whether a stay mounted check is required
 */
export function checkHorseAttackSpook(mount: MountState): HorseSpookedResult {
  if (mount.combatTrained) {
    return {
      spooked: false,
      reason: "Combat-trained horse can attack without spooking",
      requiresStayMountedCheck: false,
    };
  }

  return {
    spooked: true,
    reason: "Untrained horse attacking causes rider check",
    requiresStayMountedCheck: true,
  };
}

/**
 * Make a stay mounted check
 *
 * @param agilityScore - Rider's Agility score
 * @param isTrained - Whether rider is trained in horsemanship
 * @param reason - Why the check is being made
 * @param dc - DC to beat (default 10)
 * @param roller - Dice roller
 * @returns Stay mounted result
 */
export function makeStayMountedCheck(
  agilityScore: number,
  isTrained: boolean,
  reason: string,
  dc = 10,
  roller?: DiceRoller
): StayMountedResult {
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };

  // Trained riders roll d20, untrained roll d10
  const dieUsed = isTrained ? "1d20" : "1d10";
  const rollResult = evaluateRoll(dieUsed, rollOptions);
  const roll = rollResult.total ?? (isTrained ? 10 : 5);

  // Add Agility modifier (calculated from score)
  const agilityMod = Math.floor((agilityScore - 10) / 2);
  const total = roll + agilityMod;

  const stayedMounted = total >= dc;

  return {
    dieUsed,
    roll: total, // Total including modifier
    dc,
    stayedMounted,
    isProne: !stayedMounted,
    reason,
  };
}

/**
 * Check if a weapon is a lance or spear (for mounted charge damage)
 *
 * @param weaponName - Name of the weapon
 * @returns Whether it's a lance or spear
 */
export function isLanceOrSpear(weaponName: string): boolean {
  const normalized = weaponName.toLowerCase();
  return normalized.includes("lance") || normalized.includes("spear") || normalized.includes("javelin");
}

/**
 * Calculate mounted charge damage multiplier
 *
 * @param isCharging - Whether mounted and charging
 * @param weaponName - Name of weapon being used
 * @returns Damage multiplier (2 for lance/spear charge, 1 otherwise)
 */
export function getMountedChargeDamageMultiplier(
  isCharging: boolean,
  weaponName: string
): number {
  if (isCharging && isLanceOrSpear(weaponName)) {
    return 2;
  }
  return 1;
}

/**
 * Format stay mounted result for display
 */
export function formatStayMountedResult(result: StayMountedResult): string {
  const dieType = result.dieUsed === "1d20" ? "trained" : "untrained";
  const outcome = result.stayedMounted
    ? "STAYS MOUNTED"
    : "THROWN FROM HORSE - prone, must spend next round standing";

  return `Stay Mounted (${dieType}, ${result.dieUsed}): ${String(result.roll)} vs DC ${String(result.dc)} - ${outcome}`;
}

/**
 * Format mounted combat bonuses for display
 */
export function formatMountedBonuses(bonuses: MountedCombatBonuses): string {
  const parts: string[] = [];

  parts.push(`+${String(bonuses.acBonus)} AC`);
  parts.push(`+${String(bonuses.attackBonusVsUnmounted)} attack vs unmounted`);

  if (bonuses.lanceDamageDoubled) {
    parts.push("lance/spear damage doubled (charging)");
  }

  return `Mounted bonuses: ${parts.join(", ")}`;
}

// =============================================================================
// Formatting Helpers
// =============================================================================

/**
 * Format falling damage result for display
 */
export function formatFallingDamage(result: FallingDamageResult): string {
  if (result.damage === 0) {
    return "No falling damage (less than 10' fall)";
  }

  let text = `Falling ${String(result.distanceFallen)}': ${String(result.damage)} damage`;

  if (result.brokenBones > 0) {
    const boneText = result.brokenBones === 1 ? "1 broken bone" : `${String(result.brokenBones)} broken bones`;
    text += ` - ${boneText}! Permanent -${String(result.brokenBones)} STR or AGL (player's choice)`;
  }

  return text;
}

/**
 * Format grapple result for display
 */
export function formatGrappleResult(result: GrappleResult, attackerName: string, defenderName: string): string {
  const outcome = result.targetPinned
    ? `${attackerName} pins ${defenderName}!`
    : `${defenderName} resists the grapple!`;

  return `Grapple: ${attackerName} (${String(result.attackerTotal)}) vs ${defenderName} (${String(result.defenderTotal)}) - ${outcome}`;
}
