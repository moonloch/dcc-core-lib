/**
 * System configuration types
 *
 * These types define a game system (DCC, MCC, XCrawl, etc.)
 * allowing the core library to work with different rule variants.
 */

/**
 * Definition of an ability score
 */
export interface AbilityDefinition {
  /** Unique identifier (e.g., "str", "agl") */
  id: string;

  /** Full name (e.g., "Strength", "Agility") */
  name: string;

  /** Abbreviation for display (e.g., "STR", "AGL") */
  abbrev: string;

  /** Optional description */
  description?: string;
}

/**
 * Standard DCC ability IDs
 */
export type DCCAbilityId = "str" | "agl" | "sta" | "per" | "int" | "lck";

/**
 * Alignment options
 */
export type Alignment = "l" | "n" | "c";

/**
 * Alignment definition with display info
 */
export interface AlignmentDefinition {
  id: Alignment;
  name: string;
  abbrev: string;
}

/**
 * Mapping of abilities to their common uses
 */
export interface AbilityMappings {
  /** Ability used for melee attack rolls */
  meleeAttack: string;

  /** Ability used for melee damage */
  meleeDamage: string;

  /** Ability used for missile attack rolls */
  missileAttack: string;

  /** Ability used for missile damage (if any) */
  missileDamage?: string;

  /** Ability used for armor class */
  armorClass: string;

  /** Ability used for hit points */
  hitPoints: string;

  /** Ability used for Reflex saves */
  reflexSave: string;

  /** Ability used for Fortitude saves */
  fortSave: string;

  /** Ability used for Will saves */
  willSave: string;

  /** Ability used for initiative */
  initiative: string;

  /** Ability used for spell checks (wizards) */
  wizardSpellCheck?: string;

  /** Ability used for spell checks (clerics) */
  clericSpellCheck?: string;
}

/**
 * Save type identifiers
 */
export type SaveType = "reflex" | "fortitude" | "will";

/**
 * Save definition
 */
export interface SaveDefinition {
  id: SaveType;
  name: string;
  abbrev: string;
  ability: string;
}

/**
 * System-specific mechanics flags
 */
export interface SystemMechanics {
  /** Does this system use cleric disapproval? */
  hasDisapproval?: boolean;

  /** Does this system use wizard mercurial magic? */
  hasMercurial?: boolean;

  /** Does this system have mutations (MCC)? */
  hasMutations?: boolean;

  /** Does this system have wetware/cyberware (MCC)? */
  hasWetware?: boolean;

  /** Does this system have AI artifacts (MCC)? */
  hasArtifacts?: boolean;

  /** Does this system use luck for specific rolls? */
  hasLuckDie?: boolean;

  /** Does this system use fleeting luck? */
  hasFleetingLuck?: boolean;
}

/**
 * Complete system configuration
 *
 * This defines everything needed to run a DCC-family game system.
 */
export interface SystemConfig {
  /** Unique system identifier (e.g., "dcc", "mcc", "xcrawl") */
  id: string;

  /** Display name (e.g., "Dungeon Crawl Classics") */
  name: string;

  /** System version */
  version?: string;

  /** Ability scores used in this system */
  abilities: AbilityDefinition[];

  /** How abilities map to common game uses */
  abilityMappings: AbilityMappings;

  /** Alignments available in this system */
  alignments: AlignmentDefinition[];

  /** Saving throws in this system */
  saves: SaveDefinition[];

  /** Character classes available (IDs reference class data) */
  classes: string[];

  /** Custom dice chain (if different from standard DCC) */
  diceChain?: number[];

  /** System-specific mechanics */
  mechanics: SystemMechanics;
}

/**
 * Standard DCC abilities
 */
export const DCC_ABILITIES: readonly AbilityDefinition[] = [
  { id: "str", name: "Strength", abbrev: "STR" },
  { id: "agl", name: "Agility", abbrev: "AGL" },
  { id: "sta", name: "Stamina", abbrev: "STA" },
  { id: "per", name: "Personality", abbrev: "PER" },
  { id: "int", name: "Intelligence", abbrev: "INT" },
  { id: "lck", name: "Luck", abbrev: "LCK" },
] as const;

/**
 * Standard DCC alignments
 */
export const DCC_ALIGNMENTS: readonly AlignmentDefinition[] = [
  { id: "l", name: "Lawful", abbrev: "L" },
  { id: "n", name: "Neutral", abbrev: "N" },
  { id: "c", name: "Chaotic", abbrev: "C" },
] as const;

/**
 * Standard DCC saves
 */
export const DCC_SAVES: readonly SaveDefinition[] = [
  { id: "reflex", name: "Reflex", abbrev: "Ref", ability: "agl" },
  { id: "fortitude", name: "Fortitude", abbrev: "Fort", ability: "sta" },
  { id: "will", name: "Will", abbrev: "Will", ability: "per" },
] as const;

/**
 * Standard DCC ability mappings
 */
export const DCC_ABILITY_MAPPINGS: AbilityMappings = {
  meleeAttack: "str",
  meleeDamage: "str",
  missileAttack: "agl",
  armorClass: "agl",
  hitPoints: "sta",
  reflexSave: "agl",
  fortSave: "sta",
  willSave: "per",
  initiative: "agl",
  wizardSpellCheck: "int",
  clericSpellCheck: "per",
};

/**
 * Standard DCC system configuration
 */
export const DCC_SYSTEM: SystemConfig = {
  id: "dcc",
  name: "Dungeon Crawl Classics",
  abilities: [...DCC_ABILITIES],
  abilityMappings: DCC_ABILITY_MAPPINGS,
  alignments: [...DCC_ALIGNMENTS],
  saves: [...DCC_SAVES],
  classes: [
    "warrior",
    "wizard",
    "cleric",
    "thief",
    "dwarf",
    "elf",
    "halfling",
  ],
  mechanics: {
    hasDisapproval: true,
    hasMercurial: true,
    hasLuckDie: true,
    hasFleetingLuck: true,
  },
};

/**
 * Helper to find an ability by ID
 */
export function findAbility(
  abilities: readonly AbilityDefinition[],
  id: string
): AbilityDefinition | undefined {
  return abilities.find((a) => a.id === id);
}

/**
 * Helper to find a save by ID
 */
export function findSave(
  saves: readonly SaveDefinition[],
  id: SaveType
): SaveDefinition | undefined {
  return saves.find((s) => s.id === id);
}
