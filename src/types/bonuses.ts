/**
 * Bonus System Types
 *
 * Comprehensive system for representing all types of bonuses that can
 * apply to rolls in DCC. Bonuses can come from many sources:
 *
 * - Inherent: ability modifiers, class features, level
 * - Equipment: magic items, weapons, armor
 * - Circumstance: assist actions, terrain, judge rulings
 * - Luck: burning luck for bonuses
 * - Spell: active magical effects
 *
 * All bonuses stack in DCC (unlike D&D 3.5/Pathfinder).
 */

import type { DieType } from "./dice.js";

// =============================================================================
// Bonus Source Types
// =============================================================================

/**
 * High-level category of where a bonus comes from.
 * Used for organization and UI grouping.
 */
export type BonusSourceType =
  | "ability"     // From an ability score modifier
  | "class"       // From class features or level
  | "item"        // From equipped items
  | "spell"       // From active spell effects
  | "luck"        // From burning luck
  | "assist"      // From another character helping
  | "judge"       // Judge's situational ruling
  | "condition"   // From a condition (prone, flanked, etc.)
  | "other";      // Catch-all

/**
 * Category that determines when bonuses apply.
 * Inherent bonuses are always active; situational are per-roll.
 */
export type BonusCategory =
  | "inherent"      // Always applies when conditions met: ability mod, class features
  | "equipment"     // From currently equipped items
  | "circumstance"  // Situational: assist, terrain, cover
  | "luck"          // Luck burn (always situational)
  | "spell"         // From active spell effects (temporary)
  | "other";        // Catch-all

/**
 * Detailed source information for a bonus.
 * Allows both simple and detailed tracking.
 */
export interface BonusSource {
  /** High-level source type */
  type: BonusSourceType;

  /**
   * Specific identifier for the source (optional).
   * Examples: "str", "ring-of-protection", "enlarge-person"
   */
  id?: string;

  /**
   * Human-readable name for display.
   * If not provided, can be derived from type/id.
   */
  name?: string;
}

// =============================================================================
// Bonus Effect Types
// =============================================================================

/**
 * What kind of effect the bonus has on the roll.
 */
export type BonusEffectType =
  | "modifier"      // Adds a flat numeric modifier
  | "die"           // Adds a die roll to the result (e.g., +1d4 from Bless)
  | "dice-chain"    // Bumps the action die up/down the dice chain
  | "set-die"       // Sets the die to a specific value (rare)
  | "reroll";       // Allows a reroll (advantage-style)

/**
 * A flat numeric modifier bonus
 */
export interface BonusFlatModifier {
  type: "modifier";
  /** The numeric value to add (can be negative) */
  value: number;
}

/**
 * A die-based bonus (adds a die roll to the result)
 */
export interface BonusDieRoll {
  type: "die";
  /** The die to roll and add */
  die: DieType;
  /** Number of dice (default 1) */
  count?: number;
}

/**
 * A dice chain bump (changes the action die)
 */
export interface BonusDiceChain {
  type: "dice-chain";
  /** Steps to move on the dice chain (+1 = up one step, -2 = down two) */
  steps: number;
}

/**
 * Sets the die to a specific value (rare, for special abilities)
 */
export interface BonusSetDie {
  type: "set-die";
  /** The die to use instead */
  die: DieType;
}

/**
 * Allows a reroll (like advantage)
 */
export interface BonusReroll {
  type: "reroll";
  /** How the reroll works */
  mode: "take-higher" | "take-lower" | "choice";
}

/**
 * Union of all bonus effect types
 */
export type BonusEffect =
  | BonusFlatModifier
  | BonusDieRoll
  | BonusDiceChain
  | BonusSetDie
  | BonusReroll;

// =============================================================================
// Roll Bonus
// =============================================================================

/**
 * A complete bonus that can apply to a roll.
 *
 * This is the core type for the bonus system. Every bonus - whether from
 * strength, a magic ring, burning luck, or a spell - is represented as
 * a RollBonus.
 *
 * @example
 * // Strength modifier
 * const strBonus: RollBonus = {
 *   id: "ability:str",
 *   label: "Strength",
 *   source: { type: "ability", id: "str" },
 *   category: "inherent",
 *   effect: { type: "modifier", value: 2 },
 * };
 *
 * @example
 * // Luck burn
 * const luckBonus: RollBonus = {
 *   id: "luck-burn",
 *   label: "Luck burn (3 points)",
 *   source: { type: "luck" },
 *   category: "luck",
 *   effect: { type: "modifier", value: 3 },
 * };
 *
 * @example
 * // Judge's dice chain bump
 * const judgeBump: RollBonus = {
 *   id: "judge:favorable-terrain",
 *   label: "High ground",
 *   source: { type: "judge", name: "Favorable terrain" },
 *   category: "circumstance",
 *   effect: { type: "dice-chain", steps: 1 },
 * };
 */
export interface RollBonus {
  /**
   * Unique identifier for this bonus instance.
   * Format: "{source-type}:{specific-id}" recommended.
   * Examples: "ability:str", "item:ring-of-protection", "spell:enlarge"
   */
  id: string;

  /**
   * Human-readable label for display.
   * Should be concise but descriptive.
   */
  label: string;

  /**
   * Where this bonus comes from.
   */
  source: BonusSource;

  /**
   * Category for grouping and application timing.
   */
  category: BonusCategory;

  /**
   * What effect this bonus has on the roll.
   */
  effect: BonusEffect;

  /**
   * Optional condition for when this bonus applies.
   * If not specified, bonus always applies when present.
   *
   * Examples:
   * - "melee-attack" - only on melee attacks
   * - "vs-undead" - only against undead
   * - "in-darkness" - only in dark conditions
   */
  condition?: string;

  /**
   * Priority for ordering when multiple bonuses modify the same thing.
   * Higher priority bonuses are applied first.
   * Default is 0. Dice chain effects should typically be high priority.
   */
  priority?: number;
}

// =============================================================================
// Bonus Collection
// =============================================================================

/**
 * A collection of bonuses organized by category.
 * Useful for separating "always on" vs "per-roll" bonuses.
 */
export interface BonusList {
  /** Bonuses that always apply (ability, class, equipment) */
  inherent: RollBonus[];

  /** Bonuses added for this specific roll */
  situational: RollBonus[];
}

/**
 * Create an empty bonus list
 */
export function createEmptyBonusList(): BonusList {
  return {
    inherent: [],
    situational: [],
  };
}

// =============================================================================
// Bonus Builders (convenience functions)
// =============================================================================

/**
 * Create an ability modifier bonus
 */
export function createAbilityBonus(
  abilityId: string,
  abilityName: string,
  modifier: number
): RollBonus {
  return {
    id: `ability:${abilityId}`,
    label: abilityName,
    source: { type: "ability", id: abilityId, name: abilityName },
    category: "inherent",
    effect: { type: "modifier", value: modifier },
  };
}

/**
 * Create a level/class bonus
 */
export function createLevelBonus(
  classId: string,
  level: number,
  modifier: number,
  label?: string
): RollBonus {
  return {
    id: `class:${classId}:level`,
    label: label ?? `Level ${String(level)}`,
    source: { type: "class", id: classId },
    category: "inherent",
    effect: { type: "modifier", value: modifier },
  };
}

/**
 * Create a luck burn bonus
 */
export function createLuckBonus(
  pointsBurned: number,
  multiplier = 1
): RollBonus {
  const value = pointsBurned * multiplier;
  return {
    id: "luck:burn",
    label: multiplier === 1
      ? `Luck (${String(pointsBurned)} burned)`
      : `Luck (${String(pointsBurned)} × ${String(multiplier)})`,
    source: { type: "luck" },
    category: "luck",
    effect: { type: "modifier", value },
  };
}

/**
 * Create an equipment bonus
 */
export function createEquipmentBonus(
  itemId: string,
  itemName: string,
  modifier: number
): RollBonus {
  return {
    id: `item:${itemId}`,
    label: itemName,
    source: { type: "item", id: itemId, name: itemName },
    category: "equipment",
    effect: { type: "modifier", value: modifier },
  };
}

/**
 * Create a spell effect bonus
 */
export function createSpellBonus(
  spellId: string,
  spellName: string,
  effect: BonusEffect
): RollBonus {
  return {
    id: `spell:${spellId}`,
    label: spellName,
    source: { type: "spell", id: spellId, name: spellName },
    category: "spell",
    effect,
  };
}

/**
 * Create an assist bonus (another character helping)
 */
export function createAssistBonus(
  helperName: string,
  modifier = 2
): RollBonus {
  return {
    id: `assist:${helperName.toLowerCase().replace(/\s+/g, "-")}`,
    label: `Assist (${helperName})`,
    source: { type: "assist", name: helperName },
    category: "circumstance",
    effect: { type: "modifier", value: modifier },
  };
}

/**
 * Create a judge's situational bonus
 */
export function createJudgeBonus(
  reason: string,
  effect: BonusEffect
): RollBonus {
  return {
    id: `judge:${reason.toLowerCase().replace(/\s+/g, "-")}`,
    label: reason,
    source: { type: "judge", name: reason },
    category: "circumstance",
    effect,
  };
}

/**
 * Create a dice chain bump bonus
 */
export function createDiceChainBonus(
  source: BonusSource,
  steps: number,
  label: string
): RollBonus {
  return {
    id: `chain:${source.type}:${source.id ?? "default"}`,
    label,
    source,
    category: source.type === "spell" ? "spell" : "circumstance",
    effect: { type: "dice-chain", steps },
    priority: 10, // Dice chain changes should apply early
  };
}

// =============================================================================
// Bonus Computation
// =============================================================================

/**
 * Result of computing bonuses for a roll
 */
export interface ComputedBonuses {
  /** Total flat modifier to add to the roll */
  totalModifier: number;

  /** Net dice chain steps (positive = up, negative = down) */
  diceChainSteps: number;

  /** Additional dice to roll and add to the result */
  additionalDice: { die: DieType; count: number }[];

  /** Whether a reroll is available */
  hasReroll: boolean;
  rerollMode?: "take-higher" | "take-lower" | "choice";

  /** If a specific die is forced */
  forcedDie?: DieType;

  /** All bonuses that were applied, for display */
  appliedBonuses: RollBonus[];
}

/**
 * Compute the total effect of all bonuses.
 * All bonuses stack in DCC.
 *
 * @param bonuses - Array of bonuses to apply
 * @param condition - Optional condition to filter bonuses (e.g., "melee-attack")
 * @returns Computed totals for modifiers, dice chain, etc.
 */
export function computeBonuses(
  bonuses: RollBonus[],
  condition?: string
): ComputedBonuses {
  // Sort by priority (higher first)
  const sorted = [...bonuses].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

  // Filter by condition
  const applicable = sorted.filter((bonus) => {
    if (!bonus.condition) return true;
    if (!condition) return false;
    return bonus.condition === condition;
  });

  const result: ComputedBonuses = {
    totalModifier: 0,
    diceChainSteps: 0,
    additionalDice: [],
    hasReroll: false,
    appliedBonuses: applicable,
  };

  for (const bonus of applicable) {
    switch (bonus.effect.type) {
      case "modifier":
        result.totalModifier += bonus.effect.value;
        break;

      case "die":
        result.additionalDice.push({
          die: bonus.effect.die,
          count: bonus.effect.count ?? 1,
        });
        break;

      case "dice-chain":
        result.diceChainSteps += bonus.effect.steps;
        break;

      case "set-die":
        result.forcedDie = bonus.effect.die;
        break;

      case "reroll":
        result.hasReroll = true;
        result.rerollMode = bonus.effect.mode;
        break;
    }
  }

  return result;
}

/**
 * Merge inherent and situational bonuses into a single list
 */
export function mergeBonuses(list: BonusList): RollBonus[] {
  return [...list.inherent, ...list.situational];
}

/**
 * Get the total modifier from a list of bonuses (quick helper)
 */
export function getTotalModifier(bonuses: RollBonus[]): number {
  return bonuses.reduce((sum, bonus) => {
    if (bonus.effect.type === "modifier") {
      return sum + bonus.effect.value;
    }
    return sum;
  }, 0);
}

/**
 * Get net dice chain steps from a list of bonuses
 */
export function getDiceChainSteps(bonuses: RollBonus[]): number {
  return bonuses.reduce((sum, bonus) => {
    if (bonus.effect.type === "dice-chain") {
      return sum + bonus.effect.steps;
    }
    return sum;
  }, 0);
}
