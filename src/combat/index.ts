/**
 * Combat System
 *
 * Exports all combat-related functions for:
 * - Attack rolls
 * - Damage calculations
 * - Critical hits
 * - Fumbles
 * - Initiative
 */

// Attack functions
export {
  makeAttackRoll,
  calculateAttackBonus,
  doesAttackHit,
  getAttackAbility,
  getTwoWeaponPenalty,
  isDeedSuccessful,
} from "./attack.js";

// Damage functions
export {
  rollDamage,
  calculateDamageModifier,
  getBackstabMultiplier,
  getTwoHandedDamageDie,
  buildDamageFormula,
  applyMinimumDamage,
} from "./damage.js";

// Critical hit functions
export {
  rollCritical,
  calculateCritModifier,
  determineCritTable,
  getCritTable,
  getCritDie,
  buildCritFormula,
  parseCritExtraDamage,
  WARRIOR_CRIT_DIE,
  THIEF_CRIT_DIE,
  DEFAULT_CRIT_DIE,
  CLASS_CRIT_TABLE,
} from "./crits.js";

// Fumble functions
export {
  rollFumble,
  calculateFumbleModifier,
  buildFumbleFormula,
  isFumble,
  getFumbleDie,
  getArmorType,
  getArmorCheckPenalty,
  getArmorSpeedPenalty,
  FUMBLE_DICE,
  ARMOR_CHECK_PENALTY,
  ARMOR_SPEED_PENALTY,
} from "./fumbles.js";

// Initiative functions
export {
  rollInitiative,
  calculateInitiativeModifier,
  buildInitiativeFormula,
  getInitiativeDie,
  sortByInitiative,
  isInitiativeTied,
  getTwoWeaponInitiativeBonus,
  WARRIOR_INITIATIVE_DIE,
  DEFAULT_INITIATIVE_DIE,
} from "./initiative.js";
