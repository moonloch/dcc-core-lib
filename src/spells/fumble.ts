/**
 * Spell Fumble Module
 *
 * Pure functions for handling spell fumbles (natural 1 on spell checks).
 * Spell fumbles can result in misfires, corruption, or patron taint.
 */

import type { RollOptions } from "../types/dice.js";
import type { SimpleTable } from "../tables/types.js";
import type { SpellFumbleResult, CasterProfile } from "../types/spells.js";
import { lookupSimple } from "../tables/lookup.js";

// =============================================================================
// Fumble Rolling
// =============================================================================

/**
 * Default random number generator
 */
function defaultRoller(faces: number): number {
  return Math.floor(Math.random() * faces) + 1;
}

/**
 * Roll on the spell fumble table.
 *
 * In DCC, spell fumbles are typically rolled on 1d4 modified by:
 * - Spell level (higher level = worse fumbles)
 *
 * @param spellLevel - Level of the spell that fumbled
 * @param fumbleTable - Table to look up the result
 * @param options - Roll options
 * @returns The fumble result
 */
export function rollSpellFumble(
  spellLevel: number,
  fumbleTable: SimpleTable,
  options: RollOptions = {}
): SpellFumbleResult {
  // Roll 1d4
  let baseRoll: number;
  if (options.roller) {
    baseRoll = options.roller("1d4");
  } else {
    baseRoll = defaultRoller(4);
  }

  // Add spell level to determine severity
  // Higher level spells have worse fumble effects
  const roll = baseRoll + (spellLevel - 1);

  // Look up result
  const tableResult = lookupSimple(fumbleTable, roll);

  // Parse effect flags from the table result
  const effect = tableResult?.effect;
  const misfire = effect?.type === "misfire" || effect?.data?.["misfire"] === true;
  const corruption = effect?.type === "corruption" || effect?.data?.["corruption"] === true;
  const patronTaint = effect?.type === "patron-taint" || effect?.data?.["patronTaint"] === true;

  const result: SpellFumbleResult = {
    roll,
    description: tableResult?.text ?? `Spell fumble (roll ${String(roll)})`,
    misfire,
    corruption,
    patronTaint,
  };

  if (tableResult?.effect) {
    result.effect = tableResult.effect;
  }

  return result;
}

/**
 * Roll spell fumble with a modifier (e.g., from luck or other sources).
 */
export function rollSpellFumbleWithModifier(
  spellLevel: number,
  modifier: number,
  fumbleTable: SimpleTable,
  options: RollOptions = {}
): SpellFumbleResult {
  // Roll 1d4
  let baseRoll: number;
  if (options.roller) {
    baseRoll = options.roller("1d4");
  } else {
    baseRoll = defaultRoller(4);
  }

  // Apply modifiers (luck can reduce fumble severity)
  const roll = Math.max(1, baseRoll + (spellLevel - 1) + modifier);

  // Look up result
  const tableResult = lookupSimple(fumbleTable, roll);

  // Parse effect flags
  const effect = tableResult?.effect;
  const misfire = effect?.type === "misfire" || effect?.data?.["misfire"] === true;
  const corruption = effect?.type === "corruption" || effect?.data?.["corruption"] === true;
  const patronTaint = effect?.type === "patron-taint" || effect?.data?.["patronTaint"] === true;

  const result: SpellFumbleResult = {
    roll,
    description: tableResult?.text ?? `Spell fumble (roll ${String(roll)})`,
    misfire,
    corruption,
    patronTaint,
  };

  if (tableResult?.effect) {
    result.effect = tableResult.effect;
  }

  return result;
}

// =============================================================================
// Fumble Severity
// =============================================================================

/**
 * Fumble severity level
 */
export type FumbleSeverity = "minor" | "moderate" | "major" | "catastrophic";

/**
 * Determine fumble severity from the roll.
 */
export function getFumbleSeverity(roll: number): FumbleSeverity {
  if (roll <= 2) return "minor";
  if (roll <= 4) return "moderate";
  if (roll <= 6) return "major";
  return "catastrophic";
}

/**
 * Calculate expected fumble range for a spell level.
 */
export function getExpectedFumbleRange(spellLevel: number): {
  min: number;
  max: number;
  averageSeverity: FumbleSeverity;
} {
  const min = 1 + (spellLevel - 1); // Roll of 1 + level modifier
  const max = 4 + (spellLevel - 1); // Roll of 4 + level modifier
  const avg = Math.floor((min + max) / 2);

  return {
    min,
    max,
    averageSeverity: getFumbleSeverity(avg),
  };
}

// =============================================================================
// Fumble Determination
// =============================================================================

/**
 * Check if a natural roll is a fumble.
 * Fumbles occur on natural 1 for spell checks.
 */
export function isSpellFumble(natural: number): boolean {
  return natural === 1;
}

/**
 * Check if a fumble result requires a corruption roll.
 */
export function fumbleRequiresCorruption(
  fumbleResult: SpellFumbleResult,
  profile: CasterProfile
): boolean {
  // Must use corruption (wizards/elves)
  if (!profile.usesCorruption) {
    return false;
  }

  return fumbleResult.corruption;
}

// =============================================================================
// Misfire Effects
// =============================================================================

/**
 * Misfire result - spell goes wrong in some way
 */
export interface MisfireResult {
  /** Description of the misfire */
  description: string;

  /** Type of misfire */
  type: "target-change" | "effect-reverse" | "random-effect" | "backfire" | "other";

  /** Additional data */
  data?: Record<string, unknown>;
}

/**
 * Determine misfire type from fumble result.
 * This is a helper for systems that want to parse misfire effects.
 */
export function parseMisfireType(fumbleResult: SpellFumbleResult): MisfireResult | undefined {
  if (!fumbleResult.misfire) {
    return undefined;
  }

  const effect = fumbleResult.effect;
  const misfireType = effect?.data?.["misfireType"] as string | undefined;

  // Determine the type, defaulting to "other" if not valid
  let type: MisfireResult["type"] = "other";
  if (
    misfireType === "target-change" ||
    misfireType === "effect-reverse" ||
    misfireType === "random-effect" ||
    misfireType === "backfire" ||
    misfireType === "other"
  ) {
    type = misfireType;
  }

  const result: MisfireResult = {
    description: fumbleResult.description,
    type,
  };

  if (effect?.data) {
    result.data = effect.data;
  }

  return result;
}

// =============================================================================
// Cleric Spell Failure (Different from Wizard Fumble)
// =============================================================================

/**
 * Cleric natural 1 handling is different - it's disapproval, not fumble.
 * This function documents the distinction.
 */
export function isClericSpellFailure(
  natural: number,
  profile: CasterProfile
): boolean {
  if (profile.type !== "cleric") {
    return false;
  }

  // Clerics don't "fumble" - they incur disapproval
  return natural === 1;
}

/**
 * Get the appropriate failure type for a caster.
 */
export function getFailureType(
  natural: number,
  profile: CasterProfile
): "fumble" | "disapproval" | "none" {
  if (natural !== 1) {
    return "none";
  }

  if (profile.type === "cleric") {
    return "disapproval";
  }

  return "fumble";
}
