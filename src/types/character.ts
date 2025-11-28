/**
 * Character Types
 *
 * Normalized character data structures for DCC.
 * All values use consistent types (numbers are numbers, not strings).
 * Class-specific data is only present when relevant.
 */

import type { Alignment, DCCAbilityId } from "./system.js";
import type { DieType } from "./dice.js";

// =============================================================================
// Utility Types
// =============================================================================

/**
 * Deep readonly utility for immutable function inputs
 */
export type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

// =============================================================================
// Ability Scores
// =============================================================================

/**
 * A single ability score with current and max values.
 * Current can differ from max due to spellburn, poison, etc.
 */
export interface AbilityScore {
  /** Current value (may be reduced by spellburn, etc.) */
  current: number;

  /** Maximum/base value */
  max: number;
}

/**
 * All six DCC ability scores
 */
export type AbilityScores = Record<DCCAbilityId, AbilityScore>;

/**
 * Create default ability scores (all 10s)
 */
export function createDefaultAbilityScores(): AbilityScores {
  return {
    str: { current: 10, max: 10 },
    agl: { current: 10, max: 10 },
    sta: { current: 10, max: 10 },
    per: { current: 10, max: 10 },
    int: { current: 10, max: 10 },
    lck: { current: 10, max: 10 },
  };
}

// =============================================================================
// Saving Throws
// =============================================================================

/**
 * Saving throw values
 */
export interface SavingThrows {
  reflex: number;
  fortitude: number;
  will: number;
}

// =============================================================================
// Birth Augur / Lucky Sign
// =============================================================================

/**
 * Birth augur (lucky sign) that affects a specific roll type
 */
export interface BirthAugur {
  /** Unique identifier */
  id: string;

  /** Display name (e.g., "Harsh Winter") */
  name: string;

  /** What this augur affects (e.g., "All attack rolls") */
  effect: string;

  /** The roll or mechanic this modifies */
  modifies: string;

  /** Luck modifier multiplier (usually 1, sometimes 2) */
  multiplier: number;
}

// =============================================================================
// Character Identity (immutable after creation)
// =============================================================================

/**
 * Core character identity - things that don't change
 */
export interface CharacterIdentity {
  /** Unique identifier */
  id: string;

  /** Character name */
  name: string;

  /** 0-level occupation */
  occupation: string;

  /** Character alignment */
  alignment: Alignment;

  /** Birth augur / lucky sign */
  birthAugur: BirthAugur;

  /** Starting luck score (for reference, since luck can be burned) */
  startingLuck: number;

  /** Languages known */
  languages: string[];

  /** Player notes */
  notes?: string;
}

// =============================================================================
// Class Information
// =============================================================================

/**
 * Character's class and level information
 */
export interface CharacterClassInfo {
  /** Class identifier (e.g., "warrior", "wizard") */
  classId: string;

  /** Current level in this class */
  level: number;

  /** Class title at current level (e.g., "Squire", "Magician") */
  title?: string;
}

// =============================================================================
// Combat Statistics
// =============================================================================

/**
 * Combat-related statistics
 */
export interface CombatStats {
  /** Base attack bonus (from class/level) */
  attackBonus: number;

  /** Action dice available (e.g., ["1d20"] or ["1d20", "1d14"]) */
  actionDice: DieType[];

  /** Critical hit die */
  critDie: DieType;

  /** Critical hit table (I-V or custom ID) */
  critTable: string;

  /** Threat range (20 = only nat 20, 19 = 19-20, etc.) */
  threatRange: number;

  /** Armor class */
  ac: number;

  /** Speed in feet */
  speed: number;

  /** Initiative modifier */
  initiative: number;
}

// =============================================================================
// Hit Points
// =============================================================================

/**
 * Hit point tracking
 */
export interface HitPoints {
  /** Current HP */
  current: number;

  /** Maximum HP */
  max: number;

  /** Temporary HP (from spells, etc.) */
  temp: number;
}

// =============================================================================
// Class-Specific State
// =============================================================================

/**
 * Cleric-specific state
 */
export interface ClericState {
  /** Current disapproval range (starts at 1) */
  disapprovalRange: number;

  /** Deity name */
  deity?: string;

  /** Sins or other disapproval notes */
  sins?: string[];
}

/**
 * Wizard-specific state
 */
export interface WizardState {
  /** Known corruption effects */
  corruption: string[];

  /** Patron name */
  patron?: string;

  /** Familiar description */
  familiar?: string;

  /** Spellburn damage by ability (heals 1/day) */
  spellburnDamage?: Partial<Record<DCCAbilityId, number>>;
}

/**
 * Thief-specific state
 */
export interface ThiefState {
  /** Luck die for spending luck */
  luckDie: DieType;

  /** Backstab damage multiplier */
  backstabMultiplier: number;
}

/**
 * Warrior-specific state
 */
export interface WarriorState {
  /** Lucky weapon name (if any) */
  luckyWeapon?: string;

  /** Deed die at current level */
  deedDie: DieType;
}

/**
 * Dwarf-specific state
 */
export interface DwarfState {
  /** Lucky weapon name (if any) */
  luckyWeapon?: string;

  /** Deed die at current level */
  deedDie: DieType;
}

/**
 * Elf-specific state
 */
export interface ElfState {
  /** Patron name */
  patron?: string;

  /** Known corruption effects */
  corruption: string[];
}

/**
 * Halfling-specific state
 */
export interface HalflingState {
  /** Two-weapon fighting capability */
  twoWeaponFighting: boolean;
}

/**
 * All possible class-specific states
 */
export interface ClassSpecificState {
  cleric?: ClericState;
  wizard?: WizardState;
  thief?: ThiefState;
  warrior?: WarriorState;
  dwarf?: DwarfState;
  elf?: ElfState;
  halfling?: HalflingState;
}

// =============================================================================
// Experience
// =============================================================================

/**
 * Experience point tracking
 */
export interface Experience {
  /** Current XP total */
  current: number;

  /** XP needed for next level */
  nextLevel: number;
}

// =============================================================================
// Equipment & Inventory
// =============================================================================

/**
 * Item category for organization
 */
export type ItemCategory = "weapon" | "armor" | "gear" | "trade-goods" | "treasure" | "other";

/**
 * An item in the character's inventory
 */
export interface InventoryItem {
  /** Unique identifier for this item instance */
  id: string;

  /** Item name */
  name: string;

  /** Item category */
  category: ItemCategory;

  /** Quantity (default 1) */
  quantity: number;

  /** Is this item currently equipped? */
  equipped?: boolean;

  /** Additional notes about the item */
  notes?: string;

  /** Value in copper pieces (if known) */
  value?: number;
}

/**
 * Character's inventory/equipment
 */
export interface Inventory {
  /** All items carried */
  items: InventoryItem[];
}

/**
 * Create an empty inventory
 */
export function createEmptyInventory(): Inventory {
  return { items: [] };
}

/**
 * Create an inventory item with defaults
 */
export function createInventoryItem(
  name: string,
  category: ItemCategory,
  options?: Partial<Omit<InventoryItem, "name" | "category">>
): InventoryItem {
  const item: InventoryItem = {
    id: options?.id ?? `item-${String(Date.now())}-${String(Math.floor(Math.random() * 10000))}`,
    name,
    category,
    quantity: options?.quantity ?? 1,
  };

  // Only add optional properties if they have values (exactOptionalPropertyTypes)
  if (options?.equipped !== undefined) {
    item.equipped = options.equipped;
  }
  if (options?.notes !== undefined) {
    item.notes = options.notes;
  }
  if (options?.value !== undefined) {
    item.value = options.value;
  }

  return item;
}

// =============================================================================
// Currency
// =============================================================================

/**
 * Currency holdings
 */
export interface Currency {
  /** Platinum pieces */
  pp: number;

  /** Electrum pieces */
  ep: number;

  /** Gold pieces */
  gp: number;

  /** Silver pieces */
  sp: number;

  /** Copper pieces */
  cp: number;
}

// =============================================================================
// Mutable Character State
// =============================================================================

/**
 * Mutable character state - things that change during play
 */
export interface CharacterState {
  /** Current hit points */
  hp: HitPoints;

  /** Current ability scores (may differ from max due to damage) */
  abilities: AbilityScores;

  /** Current experience */
  xp: Experience;

  /** Current saving throws (computed from class + ability mods) */
  saves: SavingThrows;

  /** Combat statistics */
  combat: CombatStats;

  /** Currency */
  currency: Currency;

  /** Inventory/equipment */
  inventory: Inventory;

  /** Active conditions/effects */
  conditions: string[];

  /** Class-specific state (only populated for relevant class) */
  classState?: ClassSpecificState;
}

// =============================================================================
// Complete Character
// =============================================================================

/**
 * Complete character record
 *
 * Combines identity (immutable) with class info and mutable state.
 * For 0-level characters, `classInfo` is undefined.
 */
export interface Character {
  /** Character identity (mostly immutable) */
  identity: CharacterIdentity;

  /** Class information (undefined for 0-level) */
  classInfo?: CharacterClassInfo | undefined;

  /** Mutable character state */
  state: CharacterState;
}