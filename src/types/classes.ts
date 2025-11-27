/**
 * Character Class Types
 *
 * Classes are defined as collections of skills plus base statistics.
 * This enables data-driven class definitions for easy homebrew.
 */

import type { DieType } from "./dice.js";
import type { Alignment, SaveType } from "./system.js";

/**
 * Attack bonus progression type
 */
export type AttackProgression =
  | "warrior" // +1 per level, deed die
  | "cleric" // As cleric table
  | "wizard" // As wizard table
  | "thief" // As thief table
  | "dwarf" // As dwarf table
  | "elf" // As elf table
  | "halfling" // As halfling table
  | "custom"; // Uses custom progression

/**
 * Save progression type
 */
export type SaveProgression =
  | "warrior"
  | "cleric"
  | "wizard"
  | "thief"
  | "dwarf"
  | "elf"
  | "halfling"
  | "custom";

/**
 * Crit table to use
 */
export type CritTable =
  | "I" // Table I (lowest)
  | "II" // Table II
  | "III" // Table III
  | "IV" // Table IV
  | "V" // Table V (highest)
  | "custom"; // Custom table ID

/**
 * Level-specific class data
 */
export interface ClassLevelData {
  /** Attack bonus at this level */
  attackBonus?: number;

  /** Action dice at this level (e.g., "1d20", "1d20+1d14") */
  actionDice?: string;

  /** Crit die at this level */
  critDie?: DieType;

  /** Threat range at this level (e.g., 19 for 19-20) */
  threatRange?: number;

  /** Saves at this level */
  saves?: Partial<Record<SaveType, number>>;

  /** Titles at this level */
  title?: string;

  /** Skills unlocked at this level */
  skillsUnlocked?: string[];

  /** Any other level-specific data */
  data?: Record<string, unknown>;
}

/**
 * Requirements to take a class
 */
export interface ClassRequirements {
  /** Minimum ability scores */
  abilities?: Partial<Record<string, number>>;

  /** Allowed alignments */
  alignments?: Alignment[];

  /** Required race (for race-as-class) */
  race?: string;
}

/**
 * Complete class definition
 */
export interface ClassDefinition {
  /** Unique identifier (e.g., "warrior", "wizard") */
  id: string;

  /** Display name */
  name: string;

  /** Class description */
  description?: string;

  /** Hit die (e.g., "d12" for warrior) */
  hitDie: DieType;

  /** Attack bonus progression type */
  attackProgression: AttackProgression;

  /** Save progression type */
  saveProgression: SaveProgression;

  /** Which crit table to use */
  critTable: CritTable;

  /** Custom crit table ID (if critTable is "custom") */
  customCritTable?: string;

  /** Base threat range (20 = only on 20, 19 = 19-20) */
  baseThreatRange?: number;

  /** Skills this class grants */
  skills: string[];

  /** Level-by-level progression */
  levels: Record<number, ClassLevelData>;

  /** Requirements to take this class */
  requirements?: ClassRequirements;

  /** Whether this is a spellcasting class */
  isSpellcaster?: boolean;

  /** Spellcasting ability (if spellcaster) */
  spellcastingAbility?: string;

  /** Maximum spell level by class level */
  maxSpellLevel?: Record<number, number>;

  /** Tags for categorization */
  tags?: string[];
}

/**
 * A character's class instance (for multiclassing support)
 */
export interface CharacterClass {
  /** The class definition ID */
  classId: string;

  /** Level in this class */
  level: number;

  /** XP in this class (if tracking separately) */
  xp?: number;
}

/**
 * Standard DCC warrior class definition
 */
export const WARRIOR_CLASS: ClassDefinition = {
  id: "warrior",
  name: "Warrior",
  description: "Masters of combat who perform mighty deeds of arms",
  hitDie: "d12",
  attackProgression: "warrior",
  saveProgression: "warrior",
  critTable: "III",
  baseThreatRange: 19,
  skills: ["mighty-deed", "warrior-crit-progression", "weapon-training"],
  levels: {
    1: {
      attackBonus: 1,
      actionDice: "1d20",
      critDie: "d12",
      threatRange: 19,
      saves: { reflex: 1, fortitude: 1, will: 0 },
      title: "Squire",
    },
    2: {
      attackBonus: 2,
      actionDice: "1d20",
      critDie: "d14",
      threatRange: 19,
      saves: { reflex: 1, fortitude: 1, will: 0 },
      title: "Champion",
    },
    3: {
      attackBonus: 3,
      actionDice: "1d20",
      critDie: "d16",
      threatRange: 19,
      saves: { reflex: 1, fortitude: 2, will: 1 },
      title: "Warrior",
    },
    4: {
      attackBonus: 4,
      actionDice: "1d20",
      critDie: "d20",
      threatRange: 19,
      saves: { reflex: 2, fortitude: 2, will: 1 },
      title: "Hero",
    },
    5: {
      attackBonus: 5,
      actionDice: "1d20+1d14",
      critDie: "d20",
      threatRange: 18,
      saves: { reflex: 2, fortitude: 3, will: 1 },
      title: "Swashbuckler",
    },
  },
  tags: ["martial", "core"],
};

/**
 * Standard DCC thief class definition (partial - for example)
 */
export const THIEF_CLASS: ClassDefinition = {
  id: "thief",
  name: "Thief",
  description: "Cunning rogues who rely on skill and luck",
  hitDie: "d6",
  attackProgression: "thief",
  saveProgression: "thief",
  critTable: "II",
  baseThreatRange: 20,
  skills: [
    "backstab",
    "thief-skills",
    "luck-recovery",
    "thieves-cant",
  ],
  levels: {
    1: {
      attackBonus: 0,
      actionDice: "1d20",
      critDie: "d10",
      saves: { reflex: 1, fortitude: 0, will: 1 },
      title: "Beggar",
    },
    2: {
      attackBonus: 1,
      actionDice: "1d20",
      critDie: "d12",
      saves: { reflex: 1, fortitude: 0, will: 1 },
      title: "Cutpurse",
    },
  },
  tags: ["skill-based", "core"],
};

/**
 * Helper to get class level data
 */
export function getClassLevelData(
  classDef: ClassDefinition,
  level: number
): ClassLevelData | undefined {
  // Find the highest level data at or below the requested level
  let result: ClassLevelData | undefined;
  for (let l = level; l >= 1; l--) {
    if (classDef.levels[l]) {
      result = classDef.levels[l];
      break;
    }
  }
  return result;
}

/**
 * Get the attack bonus for a class at a level
 */
export function getAttackBonus(
  classDef: ClassDefinition,
  level: number
): number {
  const levelData = getClassLevelData(classDef, level);
  return levelData?.attackBonus ?? 0;
}

/**
 * Get the threat range for a class at a level
 */
export function getThreatRange(
  classDef: ClassDefinition,
  level: number
): number {
  const levelData = getClassLevelData(classDef, level);
  return levelData?.threatRange ?? classDef.baseThreatRange ?? 20;
}
