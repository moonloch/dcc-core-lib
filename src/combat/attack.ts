/**
 * Attack Roll System
 *
 * Handles attack roll calculations including:
 * - Melee and missile attacks
 * - Deed die for warriors/dwarves
 * - Critical threat detection
 * - Fumble detection
 * - Bonus aggregation from multiple sources
 */

import type { DieType, RollResult, RollModifier, DiceRoller } from "../types/dice.js";
import type {
  AttackInput,
  AttackResult,
  CombatEvents,
} from "../types/combat.js";
import type { RollBonus, ComputedBonuses } from "../types/bonuses.js";
import { computeBonuses } from "../types/bonuses.js";
import { evaluateRoll, meetsThreatRange, isNatural1 } from "../dice/roll.js";

// =============================================================================
// Attack Roll Functions
// =============================================================================

/**
 * Build modifiers list from attack input
 */
function buildAttackModifiers(
  input: AttackInput,
  computedBonuses: ComputedBonuses
): RollModifier[] {
  const modifiers: RollModifier[] = [];

  // Base attack bonus
  if (input.attackBonus !== 0) {
    modifiers.push({
      source: "attack bonus",
      value: input.attackBonus,
    });
  }

  // Ability modifier
  if (input.abilityModifier !== 0) {
    modifiers.push({
      source: input.attackType === "melee" ? "Strength" : "Agility",
      value: input.abilityModifier,
    });
  }

  // Two-weapon fighting penalty
  if (input.twoWeaponPenalty !== undefined && input.twoWeaponPenalty !== 0) {
    modifiers.push({
      source: "two-weapon fighting",
      value: input.twoWeaponPenalty,
    });
  }

  // Bonuses from equipment, spells, luck, etc.
  if (computedBonuses.totalModifier !== 0) {
    modifiers.push({
      source: "bonuses",
      value: computedBonuses.totalModifier,
    });
  }

  return modifiers;
}

/**
 * Calculate total attack modifier
 */
function calculateTotalBonus(
  input: AttackInput,
  computedBonuses: ComputedBonuses
): number {
  let total = input.attackBonus + input.abilityModifier;

  // Two-weapon penalty
  if (input.twoWeaponPenalty !== undefined) {
    total += input.twoWeaponPenalty;
  }

  // Computed bonuses
  total += computedBonuses.totalModifier;

  return total;
}

/**
 * Roll a deed die for warriors/dwarves
 */
function rollDeedDie(
  deedDie: DieType,
  roller?: DiceRoller
): RollResult {
  const formula = `1${deedDie}`;
  const options = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };
  return evaluateRoll(formula, options);
}

/**
 * Make an attack roll
 *
 * @param input - Attack input parameters
 * @param roller - Optional custom dice roller
 * @param events - Optional event callbacks
 * @returns Attack result
 *
 * @example
 * // Simple melee attack
 * const result = makeAttackRoll({
 *   attackType: "melee",
 *   attackBonus: 2,
 *   actionDie: "d20",
 *   threatRange: 20,
 *   abilityModifier: 2, // STR
 * });
 *
 * @example
 * // Warrior attack with deed die
 * const result = makeAttackRoll({
 *   attackType: "melee",
 *   attackBonus: 3,
 *   actionDie: "d20",
 *   threatRange: 19,
 *   abilityModifier: 3,
 *   deedDie: "d4",
 *   targetAC: 15,
 * });
 */
export function makeAttackRoll(
  input: AttackInput,
  roller?: DiceRoller,
  events?: CombatEvents
): AttackResult {
  // Compute bonuses
  const bonusCondition = input.attackType === "melee" ? "melee-attack" : "missile-attack";
  const computedBonuses = computeBonuses(input.bonuses ?? [], bonusCondition);

  // Build modifiers for display
  const appliedModifiers = buildAttackModifiers(input, computedBonuses);

  // Calculate total bonus
  const totalBonus = calculateTotalBonus(input, computedBonuses);

  // Roll the attack
  const formula = `1${input.actionDie}`;
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };
  const roll = evaluateRoll(formula, rollOptions);

  // Roll deed die if applicable
  let deedRoll: RollResult | undefined;
  let deedSuccess: boolean | undefined;

  if (input.deedDie !== undefined) {
    deedRoll = rollDeedDie(input.deedDie, roller);
    // Deed is successful if roll is 3+
    deedSuccess = (deedRoll.natural ?? 0) >= 3;

    // Add deed die result to modifiers
    if (deedRoll.natural !== undefined) {
      appliedModifiers.push({
        source: "deed die",
        value: deedRoll.natural,
      });
    }
  }

  // Calculate total
  const deedValue = deedRoll?.natural ?? 0;
  const total = (roll.total ?? 0) + totalBonus + deedValue;

  // Check for critical threat
  const isCriticalThreat = meetsThreatRange(roll, input.threatRange);

  // Check for fumble
  const isFumble = isNatural1(roll);

  // Determine hit (if AC provided)
  let isHit: boolean | undefined;
  if (input.targetAC !== undefined) {
    // Natural 1 always misses, natural 20 (or crit threat) always hits
    if (isFumble) {
      isHit = false;
    } else if (isCriticalThreat) {
      isHit = true;
    } else {
      isHit = total >= input.targetAC;
    }
  }

  const result: AttackResult = {
    roll,
    deedRoll,
    totalBonus: totalBonus + deedValue,
    total,
    isCriticalThreat,
    isFumble,
    isHit,
    appliedModifiers,
    deedSuccess,
  };

  // Emit events
  events?.onAttackRoll?.(result);

  if (isCriticalThreat) {
    events?.onCriticalThreat?.(result);
  }

  if (isFumble) {
    events?.onFumbleRoll?.(result);
  }

  if (deedRoll !== undefined && deedSuccess !== undefined) {
    events?.onDeedAttempt?.(deedRoll, deedSuccess);
  }

  return result;
}

/**
 * Calculate attack bonus from character data
 *
 * @param baseAttackBonus - Class/level attack bonus
 * @param abilityModifier - Relevant ability modifier
 * @param bonuses - Additional bonuses
 * @returns Total attack bonus
 */
export function calculateAttackBonus(
  baseAttackBonus: number,
  abilityModifier: number,
  bonuses: RollBonus[] = []
): number {
  const computed = computeBonuses(bonuses);
  return baseAttackBonus + abilityModifier + computed.totalModifier;
}

/**
 * Check if an attack hits a target
 *
 * @param attackTotal - Total attack roll result
 * @param targetAC - Target's armor class
 * @param isNaturalOne - Whether the roll was a natural 1
 * @param isCriticalThreat - Whether the roll was a critical threat
 * @returns Whether the attack hits
 */
export function doesAttackHit(
  attackTotal: number,
  targetAC: number,
  isNaturalOne: boolean,
  isCriticalThreat: boolean
): boolean {
  // Natural 1 always misses
  if (isNaturalOne) {
    return false;
  }

  // Critical threat always hits
  if (isCriticalThreat) {
    return true;
  }

  // Otherwise compare to AC
  return attackTotal >= targetAC;
}

/**
 * Get the attack ability for an attack type
 *
 * @param attackType - Type of attack
 * @returns The ability ID to use
 */
export function getAttackAbility(attackType: "melee" | "missile" | "special"): "str" | "agl" {
  return attackType === "missile" ? "agl" : "str";
}

/**
 * Calculate two-weapon fighting penalty
 *
 * In DCC, two-weapon fighting typically has a -2 penalty to each attack,
 * except for halflings who have a reduced penalty.
 *
 * @param isHalfling - Whether the attacker is a halfling
 * @returns The attack penalty
 */
export function getTwoWeaponPenalty(isHalfling: boolean): number {
  return isHalfling ? -1 : -2;
}

/**
 * Check if a deed die roll is successful
 *
 * A deed is successful if the deed die shows 3 or higher.
 *
 * @param deedRoll - The deed die roll result
 * @returns Whether the deed succeeded
 */
export function isDeedSuccessful(deedRoll: number): boolean {
  return deedRoll >= 3;
}
