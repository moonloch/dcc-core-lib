/**
 * Purple Sorcerer Parser Types
 *
 * Types for parsing character data from Purple Sorcerer's generators.
 * Supports both text format (copy-paste) and JSON format (API/export).
 */

import type { Alignment } from "../types/system.js";
import type { DieType } from "../types/dice.js";

// =============================================================================
// Raw Parsed Data (intermediate format before conversion to Character)
// =============================================================================

/**
 * Generator settings from the output header
 */
export interface PSGeneratorSettings {
  source: string; // "Rulebook" or other
  rollMode: string; // "3d6", "4d6 drop lowest", etc.
  hpMode: string; // "normal", "max", etc.
  hpUpMode?: string; // Level-up HP mode (only for leveled characters)
  augurMode: string; // "normal" or other
}

/**
 * Parsed ability score
 */
export interface PSAbilityScore {
  score: number;
  modifier: number;
}

/**
 * Parsed ability scores (all six)
 */
export interface PSAbilityScores {
  strength: PSAbilityScore;
  agility: PSAbilityScore;
  stamina: PSAbilityScore;
  personality: PSAbilityScore;
  intelligence: PSAbilityScore;
  luck: PSAbilityScore;
}

/**
 * Parsed weapon data
 */
export interface PSWeapon {
  name: string;
  type: "melee" | "ranged";
  attackMod: string; // Can be number or deed die like "d3"
  damage: string; // e.g., "1d8+1" or "1d6+deed"
  magicBonus?: number | undefined; // +1, +2, etc. parsed from weapon name
}

/**
 * Parsed armor data
 */
export interface PSArmor {
  name: string;
  acBonus: number;
  checkPenalty: number;
  fumbleDie: DieType;
  speedPenalty?: number | undefined;
}

/**
 * Parsed thief skill
 */
export interface PSThiefSkill {
  name: string;
  bonus: number;
  checkPenalty: number; // Usually armor check penalty
}

/**
 * Parsed spell entry
 */
export interface PSSpell {
  level: number;
  name: string;
}

/**
 * Lucky sign / birth augur
 */
export interface PSLuckySign {
  name: string;
  effect: string; // What it modifies
  modifier: number; // The actual modifier value
}

/**
 * Class type (lowercase, matches classId in the library)
 */
export type PSClassType =
  | "warrior"
  | "wizard"
  | "cleric"
  | "thief"
  | "dwarf"
  | "elf"
  | "halfling";

/**
 * Complete parsed character from Purple Sorcerer
 */
export interface PSCharacter {
  // Generator metadata
  settings?: PSGeneratorSettings;

  // Identity
  occupation: string;
  alignment?: Alignment; // undefined for 0-level
  classType?: PSClassType; // undefined for 0-level
  level: number; // 0 for 0-level

  // Ability scores
  abilities: PSAbilityScores;

  // Combat stats
  ac: number;
  hp: number;
  speed: number;
  initiative: number;

  // Saves
  reflex: number;
  fortitude: number;
  will: number;

  // Attack info (for leveled characters)
  baseAttackMod?: string; // Number or deed die like "d3"
  attackDice?: string; // "1d20" or "1d20+1d14"
  critDie?: DieType;
  critTable?: string; // "I", "II", "III", "IV", "V"

  // Weapons
  occupationWeapon?: PSWeapon;
  mainWeapon?: PSWeapon;
  secondaryWeapon?: PSWeapon;
  // 0-level has just "weapon"
  weapon?: PSWeapon;

  // Armor (for leveled characters)
  armor?: PSArmor;

  // Equipment
  equipment: string[];
  tradeGood?: string;
  startingFunds: string; // Keep as string, can be "26 cp" or "37 cp + 33 gp"

  // Lucky sign
  luckySign?: PSLuckySign;

  // Languages
  languages: string[];

  // Racial traits
  racialTraits?: string[];

  // Class trait description (e.g., "Lucky weapon - choose one weapon...")
  classTrait?: string;

  // Thief skills (for thief and halfling)
  thiefSkills?: PSThiefSkill[];

  // Spells (for wizard, cleric, elf)
  spells?: PSSpell[];
  spellCheck?: string; // e.g., "d20+5"

  // Class-specific
  luckDie?: DieType; // Thief luck die
  castSpellFromScrollDie?: DieType; // Thief scroll casting
}

// =============================================================================
// JSON Format Types (Purple Sorcerer API/export format)
// =============================================================================

/**
 * Raw character from Purple Sorcerer JSON format (0-level)
 */
export interface PSJsonZeroLevel {
  occTitle: string;
  strengthScore: string;
  strengthMod: string;
  agilityScore: string;
  agilityMod: string;
  staminaScore: string;
  staminaMod: string;
  personalityScore: string;
  personalityMod: string;
  intelligenceScore: string;
  intelligenceMod: string;
  luckScore: string;
  luckMod: string;
  armorClass: string;
  hitPoints: string;
  weapon: string;
  attackMod: string;
  attackDamageMod: string;
  attackDamage: string;
  attackModMelee: string;
  attackDamageMelee: string;
  attackModRanged: string;
  attackDamageRanged: string;
  speed: string;
  initiative: string;
  saveReflex: string;
  saveFort: string;
  saveWill: string;
  equipment: string;
  equipment2?: string;
  equipment3?: string;
  tradeGood: string;
  startingFunds: string;
  luckySign: string;
  languages: string;
  racialTraits: string;
}

/**
 * Container for multiple JSON characters
 */
export interface PSJsonCharacterList {
  characters: PSJsonZeroLevel[];
}

// =============================================================================
// Parser Result Types
// =============================================================================

/**
 * Result of parsing Purple Sorcerer data
 */
export interface PSParseResult {
  success: boolean;
  characters: PSCharacter[];
  errors: string[];
  warnings: string[];
}