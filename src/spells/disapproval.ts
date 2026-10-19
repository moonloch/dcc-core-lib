/**
 * Disapproval Module
 *
 * Pure functions for cleric disapproval mechanics.
 * Disapproval occurs when clerics roll within their disapproval range,
 * potentially requiring them to appease their deity.
 */

import type { RollOptions } from "../types/dice.js";
import type { SimpleTable, TableEffect } from "../tables/types.js";
import { lookupSimple } from "../tables/lookup.js";

// =============================================================================
// Disapproval Range
// =============================================================================

/**
 * Default starting disapproval range for clerics
 */
export const DEFAULT_DISAPPROVAL_RANGE = 1;

/**
 * Maximum disapproval range (at which point casting becomes very difficult)
 */
export const MAX_DISAPPROVAL_RANGE = 20;

/**
 * Check if a natural roll triggers disapproval.
 *
 * @param natural - The natural die roll
 * @param disapprovalRange - Current disapproval range (e.g., 1 means only nat 1)
 * @returns True if the roll is within the disapproval range
 */
export function rollTriggersDisapproval(
  natural: number,
  disapprovalRange: number
): boolean {
  return natural <= disapprovalRange;
}

/**
 * Increase the disapproval range.
 * Range increases by 1 on natural 1 (by default).
 *
 * @param currentRange - Current disapproval range
 * @param increase - Amount to increase (default 1)
 * @returns New disapproval range (capped at MAX_DISAPPROVAL_RANGE)
 */
export function increaseDisapprovalRange(
  currentRange: number,
  increase = 1
): number {
  return Math.min(MAX_DISAPPROVAL_RANGE, currentRange + increase);
}

/**
 * Reduce the disapproval range (after appropriate penance/atonement).
 *
 * @param currentRange - Current disapproval range
 * @param reduction - Amount to reduce by (default 1)
 * @param minimum - Floor for the result (default DEFAULT_DISAPPROVAL_RANGE)
 * @returns New disapproval range
 */
export function reduceDisapprovalRange(
  currentRange: number,
  reduction = 1,
  minimum = DEFAULT_DISAPPROVAL_RANGE
): number {
  return Math.max(minimum, currentRange - reduction);
}

/**
 * Fully reset disapproval range to default.
 */
export function resetDisapprovalRange(): number {
  return DEFAULT_DISAPPROVAL_RANGE;
}

// =============================================================================
// Disapproval Rolling
// =============================================================================

/**
 * Result of rolling on the disapproval table
 */
export interface DisapprovalResult {
  /**
   * The disapproval roll: (natural)d4 minus the cleric's Luck modifier
   * (another die when `dieFaces` is passed).
   * Not clamped — may be below 1 when Luck is high. The table lookup
   * clamps to row 1 (see `rollDisapproval`).
   */
  roll: number;

  /** The dice expression rolled, e.g. "3d4" */
  formula: string;

  /** Number of dice rolled (equals the triggering natural roll) */
  diceCount: number;

  /** The natural spell-check roll that triggered disapproval */
  naturalRoll: number;

  /** The cleric's Luck modifier (subtracted from the dice total) */
  luckModifier: number;

  /**
   * Whether the table had a row for the roll. False when the roll is above
   * the table's last row (a high natural can roll up to 80).
   */
  matched: boolean;

  /**
   * Description of the disapproval effect: the matched row's text, or ""
   * when no row matched (consumers render their own localized fallback).
   */
  description: string;

  /** Duration of the effect (if applicable) */
  duration?: string;

  /** Structured effect data */
  effect?: TableEffect;

  /** The disapproval range that was used */
  disapprovalRange: number;
}

/**
 * Roll options for disapproval rolls.
 */
export interface DisapprovalRollOptions extends RollOptions {
  /**
   * Faces of the die rolled per point of the natural roll. Defaults to 4,
   * the core rule; anything other than a positive integer also falls back
   * to 4. Homebrew classes that roll another die pass it here (see
   * `CasterProfile.disapprovalDieFaces`).
   */
  dieFaces?: number;
}

/**
 * The die faces to roll: `dieFaces` when it is a positive integer, else 4.
 */
function resolveDieFaces(dieFaces: number | undefined): number {
  return dieFaces !== undefined && Number.isInteger(dieFaces) && dieFaces > 0 ? dieFaces : 4;
}

/**
 * Default random number generator for disapproval rolls
 */
function defaultRoller(count: number, faces: number): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * faces) + 1;
  }
  return total;
}

/**
 * Roll for disapproval effect.
 *
 * DCC RAW (core rulebook, Table 5-7): the cleric rolls 1d4 for every point
 * of the natural spell-check roll (a natural 1 rolls 1d4, a natural 4 inside
 * the range rolls 4d4), and the roll is reduced by the cleric's Luck
 * modifier. The disapproval range itself only decides *whether* disapproval
 * happens; it does not scale the roll.
 *
 * A Luck modifier can push the roll below 1. The table starts at 1, so the
 * lookup clamps to 1 (the mildest result); `roll` keeps the unclamped value
 * so callers can show the arithmetic.
 *
 * @param naturalRoll - The natural d20 roll that triggered disapproval
 * @param disapprovalRange - Current disapproval range (reported only)
 * @param disapprovalTable - Table to look up the result
 * @param luckModifier - The cleric's Luck modifier (default 0)
 * @param options - Roll options. A custom roller receives "Nd4" (or
 *   "Nd{dieFaces}" when `dieFaces` is set).
 * @returns The disapproval result
 */
export function rollDisapproval(
  naturalRoll: number,
  disapprovalRange: number,
  disapprovalTable: SimpleTable,
  luckModifier = 0,
  options: DisapprovalRollOptions = {}
): DisapprovalResult {
  const diceCount = Math.max(1, Math.floor(naturalRoll));
  const dieFaces = resolveDieFaces(options.dieFaces);
  const formula = `${String(diceCount)}d${String(dieFaces)}`;

  const diceTotal = options.roller
    ? options.roller(formula)
    : defaultRoller(diceCount, dieFaces);

  const roll = diceTotal - luckModifier;

  const tableResult = lookupSimple(disapprovalTable, Math.max(1, roll));

  const result: DisapprovalResult = {
    roll,
    formula,
    diceCount,
    naturalRoll,
    luckModifier,
    matched: tableResult !== undefined,
    description: tableResult?.text ?? "",
    disapprovalRange,
  };

  if (tableResult?.effect) {
    result.effect = tableResult.effect;

    // Extract duration if present
    if (tableResult.effect.duration) {
      result.duration = tableResult.effect.duration;
    }
  }

  return result;
}

// =============================================================================
// Disapproval with Natural Roll Check
// =============================================================================

/**
 * Combined check and roll for disapproval.
 * Returns undefined if disapproval was not triggered.
 *
 * @param natural - The natural die roll from the spell check
 * @param disapprovalRange - Current disapproval range
 * @param disapprovalTable - Table to look up the result
 * @param luckModifier - The cleric's Luck modifier (default 0)
 * @param options - Roll options, including an optional `dieFaces`
 * @returns DisapprovalResult if triggered, undefined otherwise
 */
export function checkAndRollDisapproval(
  natural: number,
  disapprovalRange: number,
  disapprovalTable: SimpleTable,
  luckModifier = 0,
  options: DisapprovalRollOptions = {}
): DisapprovalResult | undefined {
  if (!rollTriggersDisapproval(natural, disapprovalRange)) {
    return undefined;
  }

  return rollDisapproval(natural, disapprovalRange, disapprovalTable, luckModifier, options);
}

// =============================================================================
// Disapproval Severity
// =============================================================================

/**
 * Disapproval severity level
 */
export type DisapprovalSeverity = "minor" | "moderate" | "major" | "severe" | "catastrophic";

/**
 * Get the severity level of a disapproval roll.
 * Based on typical DCC disapproval table structure. The table is read by the
 * roll total, so this holds whatever die was rolled.
 */
export function getDisapprovalSeverity(roll: number): DisapprovalSeverity {
  if (roll <= 4) return "minor";
  if (roll <= 8) return "moderate";
  if (roll <= 12) return "major";
  if (roll <= 16) return "severe";
  return "catastrophic";
}

/**
 * Calculate the expected disapproval severity for a given range.
 * Useful for warning players about high disapproval ranges.
 *
 * Any natural roll from 1 to the range triggers disapproval, and the roll is
 * (natural)d4 − Luck modifier, so the best case is a natural 1 rolling a 1
 * and the worst case is a natural equal to the range rolling all 4s.
 * The average assumes each triggering natural is equally likely.
 *
 * @param disapprovalRange - Current disapproval range
 * @param luckModifier - The cleric's Luck modifier (default 0)
 * @param dieFaces - Faces of the die rolled per point of the natural roll
 *   (default 4; see `CasterProfile.disapprovalDieFaces`)
 */
export function getExpectedSeverity(
  disapprovalRange: number,
  luckModifier = 0,
  dieFaces = 4
): {
  minimum: DisapprovalSeverity;
  maximum: DisapprovalSeverity;
  average: DisapprovalSeverity;
} {
  const range = Math.max(1, Math.floor(disapprovalRange));
  const minRoll = Math.max(1, 1 - luckModifier);
  const faces = resolveDieFaces(dieFaces);
  const maxRoll = Math.max(1, range * faces - luckModifier);
  // Mean natural over 1..range is (range + 1) / 2; each die averages (faces + 1) / 2.
  const avgRoll = Math.max(1, Math.floor(((range + 1) / 2) * ((faces + 1) / 2) - luckModifier));

  return {
    minimum: getDisapprovalSeverity(minRoll),
    maximum: getDisapprovalSeverity(maxRoll),
    average: getDisapprovalSeverity(avgRoll),
  };
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Calculate the probability of triggering disapproval on a d20.
 */
export function getDisapprovalProbability(disapprovalRange: number): number {
  return Math.min(1, disapprovalRange / 20);
}

/**
 * Get a description of how risky the current disapproval range is.
 */
export function getDisapprovalRiskDescription(disapprovalRange: number): string {
  const probability = getDisapprovalProbability(disapprovalRange);
  const percent = Math.round(probability * 100);

  if (disapprovalRange <= 1) {
    return `Low risk (${String(percent)}% - natural 1 only)`;
  }
  if (disapprovalRange <= 3) {
    return `Moderate risk (${String(percent)}% - natural 1-${String(disapprovalRange)})`;
  }
  if (disapprovalRange <= 5) {
    return `High risk (${String(percent)}% - natural 1-${String(disapprovalRange)})`;
  }
  return `Extreme risk (${String(percent)}% - natural 1-${String(disapprovalRange)})`;
}
