/**
 * Initiative System
 *
 * RAW (Core Book Ch. 4 — Initiative), paraphrased:
 *   - Initiative is a d20 roll plus the character's Agility modifier;
 *     warriors also add their class level.
 *   - A character fighting with a two-handed weapon rolls a d16 for
 *     initiative in place of the d20.
 *
 * There is no per-class initiative die scaling; warriors get a flat
 * class-level modifier instead. Halflings have no special initiative
 * rule (their two-weapon advantages are die-chain reductions only).
 */

import type { DieType, DiceRoller, LegacyRollModifier } from "../types/dice.js";
import type {
  InitiativeInput,
  InitiativeResult,
  CombatEvents,
} from "../types/combat.js";
import type { RollBonus } from "../types/bonuses.js";
import { computeBonuses } from "../types/bonuses.js";
import { evaluateRoll } from "../dice/roll.js";

// =============================================================================
// Initiative Dice
// =============================================================================

/** Standard initiative die for all classes (RAW). */
export const DEFAULT_INITIATIVE_DIE: DieType = "d20";

/** Initiative die when wielding a two-handed weapon (RAW). */
export const TWO_HANDED_INITIATIVE_DIE: DieType = "d16";

/**
 * Get the initiative die a character should roll.
 *
 * @param isWieldingTwoHanded - True if the character is wielding a
 *   two-handed weapon. Defaults to false.
 * @returns `d16` when two-handing, `d20` otherwise.
 */
export function getInitiativeDie(isWieldingTwoHanded = false): DieType {
  return isWieldingTwoHanded ? TWO_HANDED_INITIATIVE_DIE : DEFAULT_INITIATIVE_DIE;
}

// =============================================================================
// Initiative Roll Functions
// =============================================================================

/**
 * Roll initiative.
 *
 * Callers are responsible for selecting the right die (use
 * `getInitiativeDie`) and supplying any class-level modifier
 * (warriors add their class level via `classModifier`).
 *
 * @example
 * // Standard PC
 * rollInitiative({ initiativeDie: "d20", agilityModifier: 2 });
 *
 * @example
 * // Warrior level 3 with Agl +1
 * rollInitiative({
 *   initiativeDie: "d20",
 *   agilityModifier: 1,
 *   classModifier: 3, // class level
 * });
 *
 * @example
 * // Two-handing fighter (warrior level 3 still adds level)
 * rollInitiative({
 *   initiativeDie: "d16",
 *   agilityModifier: 1,
 *   classModifier: 3,
 * });
 */
export function rollInitiative(
  input: InitiativeInput,
  roller?: DiceRoller,
  events?: CombatEvents
): InitiativeResult {
  const formula = `1${input.initiativeDie}`;
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };
  const roll = evaluateRoll(formula, rollOptions);

  const modifiers: LegacyRollModifier[] = [];
  let total = roll.natural ?? 0;

  if (input.agilityModifier !== 0) {
    modifiers.push({ source: "Agility", value: input.agilityModifier });
    total += input.agilityModifier;
  }

  if (input.classModifier !== undefined && input.classModifier !== 0) {
    modifiers.push({ source: "class", value: input.classModifier });
    total += input.classModifier;
  }

  if (input.bonuses !== undefined && input.bonuses.length > 0) {
    const computed = computeBonuses(input.bonuses);
    if (computed.totalModifier !== 0) {
      modifiers.push({ source: "bonuses", value: computed.totalModifier });
      total += computed.totalModifier;
    }
  }

  const result: InitiativeResult = {
    roll: {
      ...roll,
      modifiers,
    },
    total,
    modifiers,
  };

  events?.onInitiativeRoll?.(result);

  return result;
}

/**
 * Calculate total initiative modifier (no die roll).
 *
 * @param agilityModifier - Agility modifier
 * @param classModifier - Class-based modifier (warrior level)
 * @param bonuses - Additional bonuses
 */
export function calculateInitiativeModifier(
  agilityModifier: number,
  classModifier?: number,
  bonuses: RollBonus[] = []
): number {
  let total = agilityModifier;

  if (classModifier !== undefined) {
    total += classModifier;
  }

  const computed = computeBonuses(bonuses);
  total += computed.totalModifier;

  return total;
}

/**
 * Build initiative formula string for display.
 */
export function buildInitiativeFormula(
  initiativeDie: DieType,
  agilityModifier: number,
  otherModifiers = 0
): string {
  let formula = `1${initiativeDie}`;

  const totalMod = agilityModifier + otherModifiers;
  if (totalMod > 0) {
    formula += `+${String(totalMod)}`;
  } else if (totalMod < 0) {
    formula += String(totalMod);
  }

  return formula;
}

/**
 * Sort combatants by initiative (highest first).
 */
export function sortByInitiative<T extends { initiative: number }>(
  combatants: readonly T[]
): T[] {
  return [...combatants].sort((a, b) => b.initiative - a.initiative);
}

/**
 * Check for tied initiatives.
 */
export function isInitiativeTied(a: InitiativeResult, b: InitiativeResult): boolean {
  return a.total === b.total;
}
