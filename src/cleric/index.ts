/**
 * Cleric Module
 *
 * Pure functions for cleric-specific abilities:
 * - Turn Unholy: Channel divine power to turn/destroy unholy creatures
 * - Lay on Hands: Channel divine healing to restore HP and cure ailments
 *
 * @example
 * ```typescript
 * import { turnUnholy, layOnHands } from "dcc-core-lib";
 *
 * // Turn Unholy
 * const turnResult = turnUnholy(
 *   { level: 3, personality: 16 },
 *   turnUnholyTable
 * );
 *
 * // Lay on Hands
 * const healResult = layOnHands(
 *   { level: 3, personality: 16, healingSelf: false },
 *   layOnHandsTable
 * );
 * ```
 */

// Turn Unholy
export {
  turnUnholy,
  getTurnUnholyModifier,
  getTurnUnholyDie,
  resolveHDExpression,
  calculateAverageHD,
  TURN_UNHOLY_SKILL,
} from "./turn-unholy.js";

export type {
  TurnUnholyInput,
  TurnUnholyResult,
  TurnEffect,
  TurnEffectType,
} from "./turn-unholy.js";

// Lay on Hands
export {
  layOnHands,
  getLayOnHandsModifier,
  getLayOnHandsDie,
  calculateHPHealed,
  getMaxHealing,
  LAY_ON_HANDS_SKILL,
} from "./lay-on-hands.js";

export type {
  LayOnHandsInput,
  LayOnHandsResult,
  LayOnHandsAlignmentMod,
  HealEffect,
  HealEffectType,
} from "./lay-on-hands.js";
