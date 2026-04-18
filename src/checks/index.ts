/**
 * Character-Level Check API
 *
 * High-level API for rolling ability checks, saving throws,
 * and skills against a character using namespaced IDs.
 *
 * ## Namespaced IDs
 *
 * All check IDs are namespaced to make the check type explicit:
 * - `ability:str` - Ability check
 * - `save:reflex` - Saving throw
 * - `skill:backstab` - Skill check
 *
 * @example
 * import { Ability, Save, rollCheck } from 'dcc-core-lib';
 *
 * // Roll a strength check (Ability.STR = "ability:str")
 * const result = rollCheck(Ability.STR, character);
 *
 * // Roll a reflex save (Save.REF = "save:reflex")
 * const result = rollCheck(Save.REF, character);
 *
 * // Roll with custom modifier
 * const result = rollCheck(Ability.AGL, character, {
 *   modifiers: [{ source: 'bless', value: 1, label: 'Bless' }]
 * });
 *
 * // Custom accessors for different character structures
 * const result = rollCheck(Ability.STR, character, {
 *   accessors: myCustomAccessors
 * });
 */

// Constants and namespace utilities
export {
  // Namespace constants
  CheckNamespace,
  type CheckNamespaceType,

  // Ability constants
  Ability,
  type AbilityCheckId,
  type AbilityId,

  // Save constants
  Save,
  type SaveCheckId,
  type SaveId,
  SAVE_ABILITY_MAP,

  // Parsing utilities
  type ParsedCheckId,
  parseCheckId,
  createCheckId,
  isAbilityCheckId,
  isSaveCheckId,
  isAbilityId,
  isSaveId,
} from "./constants.js";

// Accessors - how IDs map to character data
export {
  type CharacterAccessors,
  DEFAULT_ACCESSORS,
  extractAbilityScores,
} from "./accessors.js";

// Definitions
export {
  ABILITY_CHECK_DEFINITIONS,
  SAVE_DEFINITIONS,
  getCheckDefinition,
  getCheckDefinitionByParts,
  registerCheckDefinition,
  hasCheckDefinition,
  getRegisteredCheckIds,
  getCheckIdsByNamespace,
} from "./definitions.js";

// Roll API (sync)
export {
  rollCheck,
  rollAbilityCheck,
  rollSavingThrow,
  type CheckInput,
  type InlineCheckConfig,
  type RollCheckOptions,
} from "./roll.js";

// Roll API (async siblings — for Promise-based roll machinery)
export {
  rollCheckAsync,
  rollAbilityCheckAsync,
  rollSavingThrowAsync,
  type RollCheckOptionsAsync,
} from "./roll.js";

// Luck Check (roll-under)
export {
  rollLuckCheck,
  rollLuckCheckSimple,
  type LuckCheckResult,
  type RollLuckCheckOptions,
} from "./luck-check.js";
