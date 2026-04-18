/**
 * Morale System
 *
 * Implements DCC morale rules for monsters, retainers, and NPCs.
 *
 * Key rules:
 * - Roll 1d20 + Will save vs DC 11 (or higher for magical effects)
 * - 11+ = success (keeps fighting), 10 or less = flees
 * - Retainers add employer's Personality modifier
 * - Situational modifiers of +4 to -4
 * - Some creatures are immune (automatons, golems, mindless creatures)
 *
 * Morale check triggers:
 * - Group: when first creature slain, when half killed/incapacitated
 * - Single monster: when lost half HP
 * - Retainer: first combat/danger per adventure, end of adventure
 */

import type { DiceRoller, LegacyRollModifier } from "../types/dice.js";
import { evaluateRoll } from "../dice/roll.js";

// =============================================================================
// Types
// =============================================================================

/**
 * Type of entity making the morale check
 */
export type MoraleEntityType = "monster" | "retainer" | "npc";

/**
 * Trigger that caused the morale check
 */
export type MoraleTrigger =
  | "first-ally-slain"
  | "half-allies-down"
  | "half-hp-lost"
  | "first-combat"
  | "first-danger"
  | "end-of-adventure"
  | "magical-effect"
  | "other";

/**
 * Morale state for a group of creatures
 */
export interface GroupMoraleState {
  /** Total creatures in the group at start */
  totalCreatures: number;

  /** Currently alive/active creatures */
  activeCreatures: number;

  /** Whether first casualty check has been made */
  firstCasualtyChecked: boolean;

  /** Whether half-down check has been made */
  halfDownChecked: boolean;
}

/**
 * Morale state for a single creature
 */
export interface CreatureMoraleState {
  /** Maximum hit points */
  maxHP: number;

  /** Current hit points */
  currentHP: number;

  /** Whether half-HP check has been made */
  halfHPChecked: boolean;
}

/**
 * Morale state for a retainer
 */
export interface RetainerMoraleState {
  /** Whether first combat check has been made this adventure */
  firstCombatChecked: boolean;

  /** Whether first danger check has been made this adventure */
  firstDangerChecked: boolean;
}

/**
 * Input for making a morale check
 */
export interface MoraleCheckInput {
  /** Type of entity */
  entityType: MoraleEntityType;

  /** Creature's Will save bonus */
  willSave: number;

  /** What triggered the check */
  trigger: MoraleTrigger;

  /** DC to beat (default 11) */
  dc?: number | undefined;

  /** Situational modifier (-4 to +4) */
  situationalModifier?: number | undefined;

  /** For retainers: employer's Personality modifier */
  employerPersonalityMod?: number | undefined;

  /** Whether creature is immune to morale (automatons, golems, etc.) */
  isImmune?: boolean | undefined;

  /** Additional modifiers */
  additionalModifiers?: LegacyRollModifier[] | undefined;
}

/**
 * Result of a morale check
 */
export interface MoraleCheckResult {
  /** The d20 roll result */
  roll: number;

  /** Total after all modifiers */
  total: number;

  /** DC that needed to be met */
  dc: number;

  /** Whether the check passed (creature keeps fighting) */
  passed: boolean;

  /** Whether the check was skipped due to immunity */
  immune: boolean;

  /** All modifiers applied */
  modifiers: LegacyRollModifier[];

  /** What triggered this check */
  trigger: MoraleTrigger;

  /** Description of outcome */
  outcome: "fights" | "flees" | "immune";
}

// =============================================================================
// Constants
// =============================================================================

/** Default morale DC */
export const DEFAULT_MORALE_DC = 11;

/** Maximum situational modifier */
export const MAX_SITUATIONAL_MODIFIER = 4;

/** Minimum situational modifier */
export const MIN_SITUATIONAL_MODIFIER = -4;

// =============================================================================
// Morale Check Functions
// =============================================================================

/**
 * Make a morale check for a creature, retainer, or NPC
 *
 * @param input - Morale check input
 * @param roller - Optional dice roller
 * @returns Morale check result
 *
 * @example
 * // Monster morale check when half HP lost
 * const result = makeMoraleCheck({
 *   entityType: "monster",
 *   willSave: 2,
 *   trigger: "half-hp-lost",
 * });
 *
 * @example
 * // Retainer morale check with employer bonus
 * const result = makeMoraleCheck({
 *   entityType: "retainer",
 *   willSave: 1,
 *   trigger: "first-combat",
 *   employerPersonalityMod: 2,
 * });
 */
export function makeMoraleCheck(
  input: MoraleCheckInput,
  roller?: DiceRoller
): MoraleCheckResult {
  // Check for immunity
  if (input.isImmune) {
    return {
      roll: 0,
      total: 0,
      dc: input.dc ?? DEFAULT_MORALE_DC,
      passed: true,
      immune: true,
      modifiers: [],
      trigger: input.trigger,
      outcome: "immune",
    };
  }

  const dc = input.dc ?? DEFAULT_MORALE_DC;

  // Build modifiers
  const modifiers: LegacyRollModifier[] = [];

  // Will save
  if (input.willSave !== 0) {
    modifiers.push({
      source: "will",
      value: input.willSave,
      label: "Will save",
    });
  }

  // Employer's Personality modifier (retainers only)
  if (input.entityType === "retainer" && input.employerPersonalityMod !== undefined) {
    modifiers.push({
      source: "employer",
      value: input.employerPersonalityMod,
      label: "Employer's Personality",
    });
  }

  // Situational modifier (clamped to -4 to +4)
  if (input.situationalModifier !== undefined && input.situationalModifier !== 0) {
    const clamped = clampSituationalModifier(input.situationalModifier);
    modifiers.push({
      source: "situational",
      value: clamped,
      label: getSituationalLabel(clamped),
    });
  }

  // Additional modifiers
  if (input.additionalModifiers) {
    modifiers.push(...input.additionalModifiers);
  }

  // Roll the check
  const rollOptions = roller !== undefined
    ? { mode: "evaluate" as const, roller }
    : { mode: "evaluate" as const };
  const rollResult = evaluateRoll("1d20", rollOptions);
  const roll = rollResult.natural ?? rollResult.total ?? 10;

  // Calculate total
  const modifierTotal = modifiers.reduce((sum, m) => sum + m.value, 0);
  const total = roll + modifierTotal;

  // Determine result
  const passed = total >= dc;

  return {
    roll,
    total,
    dc,
    passed,
    immune: false,
    modifiers,
    trigger: input.trigger,
    outcome: passed ? "fights" : "flees",
  };
}

/**
 * Calculate the total morale modifier for display
 *
 * @param willSave - Creature's Will save
 * @param situationalModifier - Situational modifier
 * @param employerPersonalityMod - Employer's Personality mod (retainers only)
 * @returns Total modifier
 */
export function calculateMoraleModifier(
  willSave: number,
  situationalModifier = 0,
  employerPersonalityMod = 0
): number {
  const clampedSituational = clampSituationalModifier(situationalModifier);
  return willSave + clampedSituational + employerPersonalityMod;
}

// =============================================================================
// Morale Trigger Detection
// =============================================================================

/**
 * Check if a group morale check is triggered and update state
 *
 * @param state - Current group morale state
 * @param casualtyCount - Number of casualties just inflicted
 * @returns Trigger type if check is needed, undefined otherwise
 */
export function checkGroupMoraleTrigger(
  state: GroupMoraleState,
  casualtyCount: number
): { trigger: MoraleTrigger; newState: GroupMoraleState } | undefined {
  const newActiveCount = state.activeCreatures - casualtyCount;
  const wasFirstCasualty = state.activeCreatures === state.totalCreatures && newActiveCount < state.totalCreatures;
  const isHalfDown = newActiveCount <= Math.floor(state.totalCreatures / 2);

  // Check for first casualty trigger
  if (wasFirstCasualty && !state.firstCasualtyChecked) {
    return {
      trigger: "first-ally-slain",
      newState: {
        ...state,
        activeCreatures: newActiveCount,
        firstCasualtyChecked: true,
      },
    };
  }

  // Check for half-down trigger
  if (isHalfDown && !state.halfDownChecked) {
    return {
      trigger: "half-allies-down",
      newState: {
        ...state,
        activeCreatures: newActiveCount,
        halfDownChecked: true,
      },
    };
  }

  // No trigger, just update state
  return undefined;
}

/**
 * Check if a single creature morale check is triggered
 *
 * @param state - Current creature morale state
 * @param damageDealt - Damage just dealt
 * @returns Trigger type if check is needed, undefined otherwise
 */
export function checkCreatureMoraleTrigger(
  state: CreatureMoraleState,
  damageDealt: number
): { trigger: MoraleTrigger; newState: CreatureMoraleState } | undefined {
  const newHP = state.currentHP - damageDealt;
  const halfHP = Math.floor(state.maxHP / 2);
  const wasAboveHalf = state.currentHP > halfHP;
  const nowAtOrBelowHalf = newHP <= halfHP;

  // Check for half-HP trigger
  if (wasAboveHalf && nowAtOrBelowHalf && !state.halfHPChecked) {
    return {
      trigger: "half-hp-lost",
      newState: {
        ...state,
        currentHP: newHP,
        halfHPChecked: true,
      },
    };
  }

  return undefined;
}

/**
 * Check if a retainer morale check is triggered
 *
 * @param state - Current retainer morale state
 * @param situation - What situation occurred
 * @returns Trigger type if check is needed, undefined otherwise
 */
export function checkRetainerMoraleTrigger(
  state: RetainerMoraleState,
  situation: "combat" | "danger" | "end-of-adventure"
): { trigger: MoraleTrigger; newState: RetainerMoraleState } | undefined {
  if (situation === "combat" && !state.firstCombatChecked) {
    return {
      trigger: "first-combat",
      newState: {
        ...state,
        firstCombatChecked: true,
      },
    };
  }

  if (situation === "danger" && !state.firstDangerChecked) {
    return {
      trigger: "first-danger",
      newState: {
        ...state,
        firstDangerChecked: true,
      },
    };
  }

  if (situation === "end-of-adventure") {
    // End of adventure always triggers (state doesn't change)
    return {
      trigger: "end-of-adventure",
      newState: state,
    };
  }

  return undefined;
}

// =============================================================================
// State Creation Helpers
// =============================================================================

/**
 * Create initial morale state for a group of creatures
 *
 * @param totalCreatures - Number of creatures in the group
 * @returns Initial group morale state
 */
export function createGroupMoraleState(totalCreatures: number): GroupMoraleState {
  return {
    totalCreatures,
    activeCreatures: totalCreatures,
    firstCasualtyChecked: false,
    halfDownChecked: false,
  };
}

/**
 * Create initial morale state for a single creature
 *
 * @param maxHP - Creature's maximum hit points
 * @returns Initial creature morale state
 */
export function createCreatureMoraleState(maxHP: number): CreatureMoraleState {
  return {
    maxHP,
    currentHP: maxHP,
    halfHPChecked: false,
  };
}

/**
 * Create initial morale state for a retainer
 *
 * @returns Initial retainer morale state
 */
export function createRetainerMoraleState(): RetainerMoraleState {
  return {
    firstCombatChecked: false,
    firstDangerChecked: false,
  };
}

/**
 * Reset retainer morale state for a new adventure
 *
 * @param _state - Current state (unused, for API consistency)
 * @returns Fresh retainer morale state
 */
export function resetRetainerMoraleForNewAdventure(
  _state: RetainerMoraleState
): RetainerMoraleState {
  return createRetainerMoraleState();
}

// =============================================================================
// Immunity Helpers
// =============================================================================

/**
 * Common creature types that are immune to morale
 */
export const MORALE_IMMUNE_TYPES = [
  "automaton",
  "construct",
  "golem",
  "animated",
  "mindless",
  "undead-mindless",
  "ooze",
  "elemental",
] as const;

export type MoraleImmuneType = (typeof MORALE_IMMUNE_TYPES)[number];

/**
 * Check if a creature type is immune to morale
 *
 * @param creatureType - Creature type string
 * @returns Whether the creature is immune
 */
export function isImmuneToMorale(creatureType: string): boolean {
  const normalized = creatureType.toLowerCase();
  return MORALE_IMMUNE_TYPES.some(immuneType =>
    normalized.includes(immuneType)
  );
}

/**
 * Check if a creature is immune based on traits/keywords
 *
 * @param traits - Array of trait strings
 * @returns Whether the creature is immune
 */
export function hasImmuneTraits(traits: string[]): boolean {
  const immuneKeywords = [
    "mindless",
    "fearless",
    "immune to fear",
    "immune to morale",
    "no morale",
    "automaton",
    "construct",
  ];

  return traits.some(trait => {
    const normalized = trait.toLowerCase();
    return immuneKeywords.some(keyword => normalized.includes(keyword));
  });
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Clamp situational modifier to valid range
 */
function clampSituationalModifier(modifier: number): number {
  return Math.max(MIN_SITUATIONAL_MODIFIER, Math.min(MAX_SITUATIONAL_MODIFIER, modifier));
}

/**
 * Get a descriptive label for situational modifier
 */
function getSituationalLabel(modifier: number): string {
  if (modifier >= 3) return "Strong motivation to fight";
  if (modifier >= 1) return "Motivated to fight";
  if (modifier <= -3) return "Strong motivation to flee";
  if (modifier <= -1) return "Motivated to flee";
  return "Situational";
}

/**
 * Get suggested situational modifier based on common scenarios
 */
export function getSuggestedModifier(scenario: string): number {
  const normalized = scenario.toLowerCase();

  // Strong motivation to fight (+4)
  if (normalized.includes("defending young") ||
      normalized.includes("defending cubs") ||
      normalized.includes("defending children") ||
      normalized.includes("sacred shrine") ||
      normalized.includes("holy ground") ||
      normalized.includes("protecting hoard") ||
      normalized.includes("cornered") ||
      normalized.includes("no escape")) {
    return 4;
  }

  // Moderate motivation to fight (+2)
  if (normalized.includes("defending home") ||
      normalized.includes("defending lair") ||
      normalized.includes("outnumber") ||
      normalized.includes("winning")) {
    return 2;
  }

  // Moderate motivation to flee (-2)
  if (normalized.includes("outmatched") ||
      normalized.includes("losing") ||
      normalized.includes("wounded leader") ||
      normalized.includes("no treasure")) {
    return -2;
  }

  // Strong motivation to flee (-4)
  if (normalized.includes("slave") ||
      normalized.includes("unwilling") ||
      normalized.includes("coerced") ||
      normalized.includes("just hungry") ||
      normalized.includes("leader slain") ||
      normalized.includes("hates master")) {
    return -4;
  }

  return 0;
}

/**
 * Format morale check result for display
 */
export function formatMoraleResult(result: MoraleCheckResult): string {
  if (result.immune) {
    return "Immune to morale (mindless/fearless)";
  }

  const modifierStr = result.modifiers.length > 0
    ? ` (${result.modifiers.map(m => `${m.value >= 0 ? "+" : ""}${String(m.value)} ${m.label ?? m.source}`).join(", ")})`
    : "";

  const outcomeStr = result.passed
    ? "PASSES - continues fighting"
    : "FAILS - attempts to flee";

  return `Morale check: ${String(result.roll)}${modifierStr} = ${String(result.total)} vs DC ${String(result.dc)} - ${outcomeStr}`;
}
