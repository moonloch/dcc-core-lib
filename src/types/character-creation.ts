/**
 * Character Creation Configuration Types
 *
 * Options for customizing character generation rules.
 * Supports standard DCC rules plus common house rules and variants.
 *
 * Uses hybrid approach: built-in methods as union types + "custom" option
 * that references data-defined methods for extensibility.
 */

import type { Alignment } from "./system.js";

// =============================================================================
// Custom Method Definitions (for extensibility)
// =============================================================================

/**
 * Definition for a custom dice rolling method.
 * Used when ability score method is "custom".
 */
export interface DiceMethodDefinition {
  /** Unique identifier */
  id: string;

  /** Display name */
  name: string;

  /** Description of the method */
  description?: string;

  /** Number of dice to roll */
  diceCount: number;

  /** Die size (e.g., 6 for d6) */
  dieSize: number;

  /**
   * How many dice to keep after rolling.
   * If undefined, keep all dice.
   */
  keep?: {
    count: number;
    which: "highest" | "lowest";
  };

  /**
   * Flat modifier to add after rolling.
   * e.g., +6 for "2d6+6"
   */
  modifier?: number;

  /**
   * Divisor to apply after rolling.
   * e.g., 2 for "6d6/2"
   */
  divisor?: number;

  /**
   * Minimum result (floor).
   * e.g., 3 for methods that can't go below 3
   */
  minimum?: number;

  /**
   * Maximum result (ceiling).
   * e.g., 18 for standard ability scores
   */
  maximum?: number;
}

/**
 * Definition for a custom hit point rolling method.
 */
export interface HPMethodDefinition {
  /** Unique identifier */
  id: string;

  /** Display name */
  name: string;

  /** Description of the method */
  description?: string;

  /**
   * Die size override.
   * If undefined, uses class hit die.
   */
  dieSize?: number;

  /**
   * Number of dice to roll.
   * Default: 1
   */
  diceCount?: number;

  /**
   * Re-roll dice that show this value or lower.
   * e.g., 1 for "re-roll 1s"
   */
  rerollBelow?: number;

  /**
   * Roll multiple dice and take highest/lowest.
   */
  takeMultiple?: {
    count: number;
    which: "highest" | "lowest";
  };

  /**
   * Flat modifier to add.
   */
  modifier?: number;

  /**
   * Use maximum possible value instead of rolling.
   */
  useMax?: boolean;

  /**
   * Use average (rounded up) instead of rolling.
   */
  useAverage?: boolean;

  /**
   * Use percentage of maximum possible.
   * e.g., 0.5 for 50%
   */
  percentageOfMax?: number;
}

/**
 * Definition for a custom lucky sign mode.
 */
export interface LuckySignModeDefinition {
  /** Unique identifier */
  id: string;

  /** Display name */
  name: string;

  /** Description of the mode */
  description?: string;

  /**
   * Hide the lucky sign if luck modifier meets this condition.
   * e.g., "zero" to hide when modifier is 0
   */
  hideWhen?: "zero" | "negative" | "non-positive";

  /**
   * Minimum bonus to apply (floor).
   * e.g., 1 for "always at least +1"
   */
  minimumBonus?: number;

  /**
   * Only apply if luck modifier is positive.
   */
  positiveOnly?: boolean;

  /**
   * Use the better of luck modifier or this value.
   * e.g., 1 for "luck mod OR +1, whichever higher"
   */
  minimumOrLuck?: number;
}

// =============================================================================
// Ability Score Generation
// =============================================================================

/**
 * Built-in methods for generating ability scores.
 * Use "custom" with a DiceMethodDefinition for other methods.
 */
export type AbilityScoreMethod =
  | "3d6"              // Standard: 3d6 in order
  | "4d6-drop-lowest"  // Roll 4d6, drop lowest
  | "2d6+6"            // 2d6+6 (heroic)
  | "2d10"             // 2d10 (flat distribution, 2-20 range)
  | "manual"           // Player provides scores
  | "custom";          // Use customMethod definition

/**
 * Configuration for ability score generation
 */
export interface AbilityScoreConfig {
  /** Method for rolling ability scores */
  method: AbilityScoreMethod;

  /**
   * Custom method definition (required if method is "custom").
   * Can be inline definition or string ID referencing loaded data.
   */
  customMethod?: DiceMethodDefinition | string;

  /** For manual method: the scores to use [str, agl, sta, per, int, lck] */
  manualScores?: [number, number, number, number, number, number];

  /**
   * Minimum total ability modifier sum allowed.
   * Characters below this are re-rolled.
   * undefined = no minimum
   */
  minTotalModifier?: number;

  /**
   * Maximum total ability modifier sum allowed.
   * Characters above this are re-rolled.
   * undefined = no maximum
   */
  maxTotalModifier?: number;

  /**
   * Re-roll if primary class stats are below threshold.
   * When true, re-rolls if primary stat < 11 or secondary stat < 8.
   */
  rerollLowPrimaryStats?: boolean;
}

// =============================================================================
// Hit Point Generation
// =============================================================================

/**
 * Built-in methods for rolling 0-level hit points.
 * Use "custom" with an HPMethodDefinition for other methods.
 */
export type ZeroLevelHPMethod =
  | "1d4"              // Standard
  | "1d4-reroll-ones"  // Re-roll 1s
  | "2d4-take-high"    // Roll 2d4, take higher
  | "1d2+2"            // 1d2+2 (minimum 3)
  | "1d4+2"            // 1d4+2 (Snake's method)
  | "max"              // Always 4
  | "custom";          // Use customMethod definition

/**
 * Built-in methods for rolling leveled character hit points.
 * Use "custom" with an HPMethodDefinition for other methods.
 */
export type LeveledHPMethod =
  | "standard"         // Roll class die + STA mod per level
  | "reroll-ones"      // Re-roll 1s on hit die
  | "average"          // Take average (rounded up) + STA mod
  | "max"              // Maximum hit die + STA mod
  | "percentage"       // Percentage of maximum possible
  | "custom";          // Use customMethod definition

/**
 * Configuration for hit point generation
 */
export interface HitPointConfig {
  /** Method for 0-level HP */
  zeroLevelMethod: ZeroLevelHPMethod;

  /**
   * Custom 0-level HP method (required if zeroLevelMethod is "custom").
   * Can be inline definition or string ID referencing loaded data.
   */
  customZeroLevelMethod?: HPMethodDefinition | string;

  /** Method for leveled HP */
  leveledMethod: LeveledHPMethod;

  /**
   * Custom leveled HP method (required if leveledMethod is "custom").
   * Can be inline definition or string ID referencing loaded data.
   */
  customLeveledMethod?: HPMethodDefinition | string;

  /**
   * For percentage method: what % of max HP (0.25 to 1.0)
   * e.g., 0.5 = 50% of maximum possible HP
   */
  hpPercentage?: number;

  /**
   * Minimum HP per level (after STA mod).
   * Common house rule: minimum 1 HP per level.
   */
  minHPPerLevel?: number;
}

// =============================================================================
// Lucky Sign / Birth Augur
// =============================================================================

/**
 * Built-in modes for handling the birth augur / lucky sign.
 * Use "custom" with a LuckySignModeDefinition for other modes.
 */
export type LuckySignMode =
  | "standard"         // Show sign, apply luck mod (can be negative)
  | "hide-if-zero"     // Don't show/apply if luck mod is 0
  | "minimum-plus-one" // Always at least +1 bonus
  | "positive-only"    // Only apply if luck mod is positive (Kovacsian)
  | "best-of"          // Luck mod OR +1, whichever is higher
  | "custom";          // Use customMode definition

/**
 * Configuration for birth augur handling
 */
export interface BirthAugurConfig {
  /** How to handle the lucky sign bonus */
  mode: LuckySignMode;

  /**
   * Custom mode definition (required if mode is "custom").
   * Can be inline definition or string ID referencing loaded data.
   */
  customMode?: LuckySignModeDefinition | string;

  /**
   * Specific augur ID to assign (if not random).
   * If undefined, roll randomly.
   */
  specificAugurId?: string;
}

// =============================================================================
// Occupation
// =============================================================================

/**
 * Built-in sources for occupation tables.
 * Use "custom" with a table ID for other sources.
 */
export type OccupationSource =
  | "core"             // DCCRPG Rulebook (all)
  | "core-human"       // DCCRPG Rulebook (humans only)
  | "core-demihuman"   // DCCRPG Rulebook (demi-humans only)
  | "custom";          // Custom occupation table

/**
 * Configuration for occupation selection
 */
export interface OccupationConfig {
  /** Source for occupation table */
  source: OccupationSource;

  /**
   * Custom occupation table ID (required if source is "custom").
   */
  customTableId?: string;

  /**
   * Specific occupation to assign (if not random).
   * If undefined, roll randomly from source table.
   */
  specificOccupation?: string;
}

// =============================================================================
// Class Selection (for leveled characters)
// =============================================================================

/**
 * Configuration for class selection
 */
export interface ClassSelectionConfig {
  /**
   * Specific class to assign.
   * If undefined, either random or determined by other means.
   */
  classId?: string;

  /**
   * If true and classId is undefined, pick randomly.
   * If false and classId is undefined, error.
   */
  allowRandom?: boolean;

  /**
   * Classes to include in random selection.
   * If undefined, all classes from system config are available.
   */
  availableClasses?: string[];
}

// =============================================================================
// Equipment & Starting Funds
// =============================================================================

/**
 * Configuration for starting equipment and funds
 */
export interface EquipmentConfig {
  /** Include starting funds from occupation */
  includeFunds: boolean;

  /** Include trade goods from occupation */
  includeTradeGoods: boolean;

  /** Include occupation-based equipment */
  includeOccupationEquipment: boolean;

  /** Include occupation weapon */
  includeOccupationWeapon: boolean;
}

// =============================================================================
// Language Rules
// =============================================================================

/**
 * Configuration for language assignment
 */
export interface LanguageConfig {
  /** Determine bonus languages from INT */
  determineBonusLanguages: boolean;

  /**
   * Non-humans always get racial language regardless of INT.
   * Standard rule: need INT 8+ for racial language.
   */
  alwaysGrantRacialLanguage: boolean;
}

// =============================================================================
// Name Generation
// =============================================================================

/**
 * Configuration for automatic name generation
 */
export interface NameConfig {
  /** Generate a random name for the character */
  generateName: boolean;

  /**
   * Include epithet in generated name.
   * e.g., "the Bold", "Ironfoot"
   */
  includeEpithet?: boolean;

  /**
   * Chance of including epithet if enabled (0-1).
   * Default: 0.3 (30%)
   */
  epithetChance?: number;
}

/**
 * Default name configuration (no automatic generation)
 */
export const DEFAULT_NAME_CONFIG: NameConfig = {
  generateName: false,
};

// =============================================================================
// Race-Specific Options
// =============================================================================

/**
 * Configuration for dwarf-specific rules
 */
export interface DwarfRulesConfig {
  /**
   * Ignore armor speed penalty for dwarves.
   * House rule: dwarves are unaffected by heavy armor.
   */
  ignoreArmorSpeedPenalty: boolean;
}

// =============================================================================
// Complete Character Creation Configuration
// =============================================================================

/**
 * Complete configuration for character creation.
 *
 * All fields are optional - unspecified fields use defaults.
 */
export interface CharacterCreationConfig {
  /** Ability score generation options */
  abilityScores?: Partial<AbilityScoreConfig>;

  /** Hit point generation options */
  hitPoints?: Partial<HitPointConfig>;

  /** Birth augur / lucky sign options */
  birthAugur?: Partial<BirthAugurConfig>;

  /** Occupation selection options */
  occupation?: Partial<OccupationConfig>;

  /** Class selection options (for leveled characters) */
  classSelection?: Partial<ClassSelectionConfig>;

  /** Equipment and funds options */
  equipment?: Partial<EquipmentConfig>;

  /** Language options */
  languages?: Partial<LanguageConfig>;

  /** Dwarf-specific rules */
  dwarfRules?: Partial<DwarfRulesConfig>;

  /** Name generation options */
  name?: Partial<NameConfig>;

  /** Alignment (if not random) */
  alignment?: Alignment;

  /** Allow random alignment if not specified */
  allowRandomAlignment?: boolean;
}

// =============================================================================
// Defaults
// =============================================================================

/**
 * Default ability score configuration (standard DCC rules)
 */
export const DEFAULT_ABILITY_SCORE_CONFIG: AbilityScoreConfig = {
  method: "3d6",
  rerollLowPrimaryStats: false,
};

/**
 * Default hit point configuration (standard DCC rules)
 */
export const DEFAULT_HIT_POINT_CONFIG: HitPointConfig = {
  zeroLevelMethod: "1d4",
  leveledMethod: "standard",
};

/**
 * Default birth augur configuration (standard DCC rules)
 */
export const DEFAULT_BIRTH_AUGUR_CONFIG: BirthAugurConfig = {
  mode: "standard",
};

/**
 * Default occupation configuration (standard DCC rules)
 */
export const DEFAULT_OCCUPATION_CONFIG: OccupationConfig = {
  source: "core",
};

/**
 * Default class selection configuration
 */
export const DEFAULT_CLASS_SELECTION_CONFIG: ClassSelectionConfig = {
  allowRandom: true,
};

/**
 * Default equipment configuration (standard DCC rules)
 */
export const DEFAULT_EQUIPMENT_CONFIG: EquipmentConfig = {
  includeFunds: true,
  includeTradeGoods: true,
  includeOccupationEquipment: true,
  includeOccupationWeapon: true,
};

/**
 * Default language configuration (standard DCC rules)
 */
export const DEFAULT_LANGUAGE_CONFIG: LanguageConfig = {
  determineBonusLanguages: true,
  alwaysGrantRacialLanguage: false,
};

/**
 * Default dwarf rules configuration (standard DCC rules)
 */
export const DEFAULT_DWARF_RULES_CONFIG: DwarfRulesConfig = {
  ignoreArmorSpeedPenalty: false,
};

/**
 * Complete default configuration (standard DCC rules)
 */
export const DEFAULT_CHARACTER_CREATION_CONFIG: Required<CharacterCreationConfig> = {
  abilityScores: DEFAULT_ABILITY_SCORE_CONFIG,
  hitPoints: DEFAULT_HIT_POINT_CONFIG,
  birthAugur: DEFAULT_BIRTH_AUGUR_CONFIG,
  occupation: DEFAULT_OCCUPATION_CONFIG,
  classSelection: DEFAULT_CLASS_SELECTION_CONFIG,
  equipment: DEFAULT_EQUIPMENT_CONFIG,
  languages: DEFAULT_LANGUAGE_CONFIG,
  dwarfRules: DEFAULT_DWARF_RULES_CONFIG,
  name: DEFAULT_NAME_CONFIG,
  alignment: "n",
  allowRandomAlignment: true,
};

// =============================================================================
// Built-in Method Definitions
// =============================================================================

/**
 * Built-in dice method definitions.
 * These correspond to the AbilityScoreMethod union values.
 */
export const BUILT_IN_DICE_METHODS: Record<
  Exclude<AbilityScoreMethod, "manual" | "custom">,
  DiceMethodDefinition
> = {
  "3d6": {
    id: "3d6",
    name: "3d6 (Standard)",
    description: "Roll 3d6 in order, as Crom intended",
    diceCount: 3,
    dieSize: 6,
  },
  "4d6-drop-lowest": {
    id: "4d6-drop-lowest",
    name: "4d6 Drop Lowest",
    description: "Roll 4d6, drop the lowest die",
    diceCount: 4,
    dieSize: 6,
    keep: { count: 3, which: "highest" },
  },
  "2d6+6": {
    id: "2d6+6",
    name: "2d6+6 (Heroic)",
    description: "Roll 2d6 and add 6 for heroic characters",
    diceCount: 2,
    dieSize: 6,
    modifier: 6,
  },
  "2d10": {
    id: "2d10",
    name: "2d10 (Flat Distribution)",
    description: "Roll 2d10 for a flatter distribution (2-20 range)",
    diceCount: 2,
    dieSize: 10,
  },
};

/**
 * Built-in 0-level HP method definitions.
 */
export const BUILT_IN_ZERO_LEVEL_HP_METHODS: Record<
  Exclude<ZeroLevelHPMethod, "custom">,
  HPMethodDefinition
> = {
  "1d4": {
    id: "1d4",
    name: "1d4 (Standard)",
    description: "Roll 1d4 for starting HP",
    dieSize: 4,
  },
  "1d4-reroll-ones": {
    id: "1d4-reroll-ones",
    name: "1d4 (Re-roll 1s)",
    description: "Roll 1d4, re-roll any 1s",
    dieSize: 4,
    rerollBelow: 1,
  },
  "2d4-take-high": {
    id: "2d4-take-high",
    name: "2d4 Take High",
    description: "Roll 2d4 and take the higher result",
    dieSize: 4,
    takeMultiple: { count: 2, which: "highest" },
  },
  "1d2+2": {
    id: "1d2+2",
    name: "1d2+2",
    description: "Roll 1d2 and add 2 (3-4 HP)",
    dieSize: 2,
    modifier: 2,
  },
  "1d4+2": {
    id: "1d4+2",
    name: "1d4+2 (Snake's Method)",
    description: "Roll 1d4 and add 2 (3-6 HP)",
    dieSize: 4,
    modifier: 2,
  },
  max: {
    id: "max",
    name: "Maximum",
    description: "Always start with maximum HP (4)",
    dieSize: 4,
    useMax: true,
  },
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Merge user config with defaults
 */
export function resolveCharacterCreationConfig(
  userConfig?: CharacterCreationConfig
): Required<CharacterCreationConfig> {
  if (!userConfig) {
    return { ...DEFAULT_CHARACTER_CREATION_CONFIG };
  }

  return {
    abilityScores: {
      ...DEFAULT_ABILITY_SCORE_CONFIG,
      ...userConfig.abilityScores,
    },
    hitPoints: {
      ...DEFAULT_HIT_POINT_CONFIG,
      ...userConfig.hitPoints,
    },
    birthAugur: {
      ...DEFAULT_BIRTH_AUGUR_CONFIG,
      ...userConfig.birthAugur,
    },
    occupation: {
      ...DEFAULT_OCCUPATION_CONFIG,
      ...userConfig.occupation,
    },
    classSelection: {
      ...DEFAULT_CLASS_SELECTION_CONFIG,
      ...userConfig.classSelection,
    },
    equipment: {
      ...DEFAULT_EQUIPMENT_CONFIG,
      ...userConfig.equipment,
    },
    languages: {
      ...DEFAULT_LANGUAGE_CONFIG,
      ...userConfig.languages,
    },
    dwarfRules: {
      ...DEFAULT_DWARF_RULES_CONFIG,
      ...userConfig.dwarfRules,
    },
    name: {
      ...DEFAULT_NAME_CONFIG,
      ...userConfig.name,
    },
    alignment: userConfig.alignment ?? DEFAULT_CHARACTER_CREATION_CONFIG.alignment,
    allowRandomAlignment:
      userConfig.allowRandomAlignment ??
      DEFAULT_CHARACTER_CREATION_CONFIG.allowRandomAlignment,
  };
}

/**
 * Get dice method definition by ID or built-in name.
 * Returns undefined if not found.
 */
export function getDiceMethodDefinition(
  method: AbilityScoreMethod,
  customMethod?: DiceMethodDefinition | string,
  customMethodsRegistry?: Record<string, DiceMethodDefinition>
): DiceMethodDefinition | undefined {
  // Built-in methods
  if (method !== "custom" && method !== "manual") {
    return BUILT_IN_DICE_METHODS[method];
  }

  // Custom method - inline definition
  if (method === "custom" && typeof customMethod === "object") {
    return customMethod;
  }

  // Custom method - lookup by ID
  if (method === "custom" && typeof customMethod === "string" && customMethodsRegistry) {
    return customMethodsRegistry[customMethod];
  }

  return undefined;
}
