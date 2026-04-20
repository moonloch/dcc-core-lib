/**
 * Lay on Hands (RAW DCC p.31)
 *
 * Pure functions for the cleric's Lay on Hands ability. Implements the
 * rules-as-written mechanic:
 *
 *   1. Cleric declares alignment relationship (same/adjacent/opposed) and
 *      optionally a condition to heal instead of HP.
 *   2. Spell check = d20 + Personality mod + caster level + luck burn.
 *      Alignment does NOT modify the roll — it selects a column on the
 *      result table (see `LayOnHandsTable`).
 *   3. (check total, alignment) → dice count.
 *   4. If healing HP: roll `diceCount × target.hitDie`, but the dice count is
 *      capped at `min(diceCount, target.hitDice)`. Dice type matches the
 *      subject's hit die.
 *   5. If healing a condition: no cap; if dice count ≥ threshold, condition
 *      is cured (no "overflow" HP).
 *   6. Natural 1 triggers disapproval (handled by the caller via the
 *      spell-check pipeline).
 */

import type { DieType, RollModifier, RollOptions } from "../types/dice.js";
import type { SkillDefinition, SkillCheckResult, SkillCheckInput } from "../types/skills.js";
import type {
  LayOnHandsAlignment,
  LayOnHandsExtraEffects,
  LayOnHandsRow,
  LayOnHandsTable,
} from "../tables/types.js";
import { resolveSkillCheck } from "../skills/resolve.js";
import { getAbilityModifier } from "../data/ability-modifiers.js";
import { evaluateRoll } from "../dice/roll.js";

// =============================================================================
// Skill Definition
// =============================================================================

export const LAY_ON_HANDS_SKILL: SkillDefinition = {
  id: "lay-on-hands",
  name: "Lay on Hands",
  description: "Channel divine healing power to restore hit points and cure ailments",
  type: "check",
  roll: {
    die: "d20",
    ability: "per",
    levelModifier: "full",
    allowLuck: true,
    luckMultiplier: 1,
  },
  tags: ["cleric", "divine", "healing", "lay-on-hands"],
  classes: ["cleric"],
};

// =============================================================================
// Input / Result
// =============================================================================

export interface LayOnHandsTarget {
  /** Target's hit die (d4, d6, d8, d10, d12). Dice type for HP healing. */
  hitDie: DieType;
  /** Target's hit dice or class level. Caps the dice count when healing HP. */
  hitDice: number;
}

export interface LayOnHandsInput {
  /** Cleric level */
  level: number;
  /** Cleric Personality score */
  personality: number;
  /** Cleric–subject alignment relationship */
  alignment: LayOnHandsAlignment;
  /** Healing target (HD type + HD count for the cap) */
  target: LayOnHandsTarget;
  /**
   * If set, heal a condition instead of HP. The value is a condition id
   * matched against `LayOnHandsTable.conditions` thresholds. RAW examples:
   * "broken-limb", "organ-damage", "disease", "paralysis", "poison",
   * "blindness". Declared BEFORE rolling per RAW.
   */
  healingCondition?: string | undefined;
  /** Optional Luck score */
  luck?: number | undefined;
  /** Luck points burned on this check */
  luckBurn?: number | undefined;
  /** Judge-discretion self-healing penalty (common house rule: -4) */
  healingSelf?: boolean | undefined;
  /** Extra situational modifiers on the spell check (NOT alignment) */
  situationalModifiers?: RollModifier[] | undefined;
}

export interface LayOnHandsResult {
  /** The underlying spell-check roll */
  check: SkillCheckResult;
  /** True if at least 1 die was granted (check total met the minimum row) */
  success: boolean;
  /** Dice count from the (total, alignment) lookup, before HP cap */
  rawDiceCount: number;
  /** Dice actually rolled — min(rawDiceCount, target.hitDice) for HP; rawDiceCount for conditions */
  diceCount: number;
  /** HP restored (only when healing HP, not conditions) */
  hpHealed?: number | undefined;
  /** If condition healing was requested, the id, and whether it was cured */
  condition?: { id: string; cured: boolean; threshold: number } | undefined;
  /** Extra row-level effects (disease cure, limb restore, etc.) */
  extraEffects?: LayOnHandsExtraEffects | undefined;
  /** The matched row (for UI display / debugging) */
  row?: LayOnHandsRow | undefined;
  /** Human-readable description */
  description: string;
}

// =============================================================================
// Core function
// =============================================================================

export function layOnHands(
  input: LayOnHandsInput,
  table: LayOnHandsTable,
  options: RollOptions = {}
): LayOnHandsResult {
  // Build situational modifiers — NO alignment modifier here (RAW).
  const modifiers: RollModifier[] = [...(input.situationalModifiers ?? [])];
  if (input.healingSelf) {
    modifiers.push({
      kind: "add",
      value: -4,
      origin: { category: "situational", id: "self-healing", label: "Healing self" },
    });
  }

  const checkInput: SkillCheckInput = {
    skill: LAY_ON_HANDS_SKILL,
    abilities: { per: input.personality },
    level: input.level,
    classId: "cleric",
    situationalModifiers: modifiers,
  };
  if (input.luck !== undefined) checkInput.luck = input.luck;
  if (input.luckBurn !== undefined) checkInput.luckBurn = input.luckBurn;

  const check = resolveSkillCheck(checkInput, options);
  const total = check.total ?? 0;

  const row = findRow(table, total);
  const rawDiceCount = row?.dice[input.alignment] ?? 0;
  const success = rawDiceCount > 0;

  const result: LayOnHandsResult = {
    check,
    success,
    rawDiceCount,
    diceCount: 0,
    row,
    description: describe(success, input, rawDiceCount, row),
  };
  if (row?.extra !== undefined) result.extraEffects = row.extra;

  if (!success) return result;

  if (input.healingCondition !== undefined) {
    // Condition healing: no HP cap; dice must meet threshold.
    const threshold = table.conditions?.[input.healingCondition];
    if (threshold === undefined) {
      // Condition not defined in this table — treat as non-curable here.
      result.condition = { id: input.healingCondition, cured: false, threshold: Infinity };
      result.diceCount = rawDiceCount;
      return result;
    }
    result.diceCount = rawDiceCount;
    result.condition = {
      id: input.healingCondition,
      cured: rawDiceCount >= threshold,
      threshold,
    };
    return result;
  }

  // HP healing: cap dice at target HD/level, then roll `diceCount × target.hitDie`.
  const capped = Math.min(rawDiceCount, input.target.hitDice);
  result.diceCount = capped;
  if (capped > 0) {
    const formula = `${String(capped)}${input.target.hitDie}`;
    const rollOpt: RollOptions = { mode: "evaluate" };
    if (options.roller !== undefined) rollOpt.roller = options.roller;
    const heal = evaluateRoll(formula, rollOpt);
    result.hpHealed = heal.total ?? 0;
  } else {
    result.hpHealed = 0;
  }
  return result;
}

// =============================================================================
// Utilities
// =============================================================================

/**
 * Lay on Hands check-only modifier, useful for showing players before rolling.
 * Note: alignment is NOT a roll modifier (RAW); it only affects the result
 * lookup.
 */
export function getLayOnHandsModifier(
  level: number,
  personality: number,
  healingSelf = false
): number {
  let mod = level + getAbilityModifier(personality);
  if (healingSelf) mod -= 4;
  return mod;
}

export function getLayOnHandsDie(): DieType {
  return "d20";
}

function findRow(table: LayOnHandsTable, total: number): LayOnHandsRow | undefined {
  for (const row of table.rows) {
    if (total >= row.min && total <= row.max) return row;
  }
  return undefined;
}

function describe(
  success: boolean,
  input: LayOnHandsInput,
  dice: number,
  row: LayOnHandsRow | undefined
): string {
  if (!success) return row?.text ?? "Divine healing does not flow through you.";
  if (input.healingCondition !== undefined) {
    return row?.text ?? `Channelled ${String(dice)} healing dice toward the subject's condition.`;
  }
  return row?.text ?? `Channelled ${String(dice)} healing dice into the subject.`;
}
