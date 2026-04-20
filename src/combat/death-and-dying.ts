/**
 * Death and Dying System
 *
 * Handles character death, bleeding out, recovery, and healing according to DCC rules:
 *
 * - 0-level characters die immediately at 0 HP
 * - 1st+ level characters "bleed out" and can be saved if healed within (level) rounds
 * - Characters saved from bleeding out lose 1 Stamina permanently and gain a scar
 * - Dead characters can be recovered within 1 hour with a Luck check
 * - Natural healing: 1 HP/night with rest, 2 HP/night with bed rest
 * - Ability damage heals at same rate (except Luck, which doesn't heal naturally)
 */

import type { Character } from "../types/character.js";
import type { DCCAbilityId } from "../types/system.js";
import type { DiceRoller } from "../types/dice.js";

// =============================================================================
// Types
// =============================================================================

/**
 * Character's vital status
 */
export type VitalStatus =
  | "alive"
  | "unconscious"
  | "bleeding-out"
  | "dead"
  | "permanently-dead";

/**
 * Result of checking a character's vital status after taking damage
 */
export interface DamageApplicationResult {
  /** New current HP */
  newHP: number;

  /** New vital status */
  status: VitalStatus;

  /** Rounds remaining before permanent death (if bleeding out) */
  roundsUntilDeath?: number | undefined;

  /** Whether the character was instantly killed (0-level or massive damage) */
  instantDeath: boolean;

  /** Whether the character just started bleeding out */
  startedBleedingOut: boolean;
}

/**
 * State of a bleeding out character
 */
export interface BleedingOutState {
  /** Number of rounds remaining before permanent death */
  roundsRemaining: number;

  /** Maximum rounds (equal to level) */
  maxRounds: number;

  /** Round combat started (for tracking) */
  startRound: number;
}

/**
 * Result of attempting to stabilize/save a bleeding out character
 */
export interface StabilizeResult {
  /** Whether the character was saved */
  saved: boolean;

  /** New HP after healing (if saved) */
  newHP?: number | undefined;

  /** Whether character suffered permanent Stamina loss */
  staminaLoss: boolean;

  /** The permanent scar gained */
  scar?: string | undefined;

  /** Reason for failure (if not saved) */
  failureReason?: string | undefined;
}

/**
 * Result of recovering a dead body
 */
export interface BodyRecoveryResult {
  /** Whether the Luck check succeeded */
  success: boolean;

  /** The Luck roll made */
  luckRoll: number;

  /**
   * The character's Luck score — the roll-under target. Body recovery is
   * a roll-under-Luck check, not a meet-or-exceed DC.
   */
  luckTarget: number;

  /** If success, the character recovers to this HP */
  newHP?: number | undefined;

  /** Penalty duration (-4 to all rolls for 1 hour) */
  groggyDuration?: string | undefined;

  /** Permanent ability penalty */
  permanentPenalty?: {
    ability: DCCAbilityId;
    amount: number;
  } | undefined;
}

/**
 * Type of rest for healing
 */
export type RestType = "active-adventure" | "bed-rest";

/**
 * Result of natural healing from rest
 */
export interface HealingResult {
  /** HP healed */
  hpHealed: number;

  /** New current HP */
  newHP: number;

  /** Ability points healed (if any ability damage) */
  abilityHealed: Partial<Record<DCCAbilityId, number>>;
}

// =============================================================================
// Death and Damage Functions
// =============================================================================

/**
 * Get the number of rounds a character can bleed out before dying
 *
 * @param level - Character's level
 * @returns Rounds until permanent death, or 0 for instant death
 */
export function getBleedOutRounds(level: number): number {
  // 0-level characters die immediately
  if (level <= 0) {
    return 0;
  }
  // 1st+ level characters get (level) rounds
  return level;
}

/**
 * Determine a character's vital status based on current HP and level
 *
 * @param currentHP - Current hit points
 * @param level - Character level (0 for 0-level)
 * @returns Vital status
 */
export function getVitalStatus(currentHP: number, level: number): VitalStatus {
  if (currentHP > 0) {
    return "alive";
  }

  // At 0 or below
  if (level <= 0) {
    // 0-level characters die immediately
    return "permanently-dead";
  }

  // 1st+ level characters bleed out
  return "bleeding-out";
}

/**
 * Apply damage to a character and determine the result
 *
 * @param character - The character taking damage
 * @param damage - Amount of damage taken
 * @returns Damage result with new status
 */
export function applyDamage(
  character: Character,
  damage: number
): DamageApplicationResult {
  const currentHP = character.state.hp.current;
  const level = character.classInfo?.level ?? 0;

  // Calculate new HP (can go negative in DCC for tracking)
  const newHP = currentHP - damage;

  // Determine status
  const wasAlive = currentHP > 0;
  const nowAtOrBelowZero = newHP <= 0;

  const status = getVitalStatus(newHP, level);
  const instantDeath = status === "permanently-dead" && wasAlive && nowAtOrBelowZero;
  const startedBleedingOut = status === "bleeding-out" && wasAlive && nowAtOrBelowZero;

  const result: DamageApplicationResult = {
    newHP: Math.max(0, newHP), // Don't track negative HP in result
    status,
    instantDeath,
    startedBleedingOut,
  };

  if (startedBleedingOut) {
    result.roundsUntilDeath = getBleedOutRounds(level);
  }

  return result;
}

/**
 * Check if a character can be saved from bleeding out
 *
 * @param level - Character level
 * @param roundsElapsed - Rounds since reaching 0 HP
 * @returns Whether the character can still be saved
 */
export function canBeSaved(level: number, roundsElapsed: number): boolean {
  if (level <= 0) {
    // 0-level characters cannot be saved via healing (only body recovery)
    return false;
  }

  const maxRounds = getBleedOutRounds(level);
  return roundsElapsed < maxRounds;
}

/**
 * Advance the bleeding out timer by one round
 *
 * @param state - Current bleeding out state
 * @returns Updated state, or undefined if character is now permanently dead
 */
export function advanceBleedOutRound(
  state: BleedingOutState
): BleedingOutState | undefined {
  const newRoundsRemaining = state.roundsRemaining - 1;

  if (newRoundsRemaining <= 0) {
    // Character is now permanently dead
    return undefined;
  }

  return {
    ...state,
    roundsRemaining: newRoundsRemaining,
  };
}

/**
 * Create initial bleeding out state for a character
 *
 * @param level - Character level
 * @param currentRound - Current combat round
 * @returns Bleeding out state
 */
export function createBleedingOutState(
  level: number,
  currentRound: number
): BleedingOutState {
  const rounds = getBleedOutRounds(level);
  return {
    roundsRemaining: rounds,
    maxRounds: rounds,
    startRound: currentRound,
  };
}

// =============================================================================
// Stabilization (Saving Bleeding Out Characters)
// =============================================================================

/**
 * Attempt to stabilize a bleeding out character
 *
 * This should be called when a character receives healing while bleeding out.
 * The character is saved if healing is applied before their rounds run out.
 *
 * @param bleedingState - Current bleeding out state
 * @param healingAmount - Amount of HP healed
 * @returns Stabilization result
 */
export function stabilizeCharacter(
  bleedingState: BleedingOutState,
  healingAmount: number
): StabilizeResult {
  if (bleedingState.roundsRemaining <= 0) {
    return {
      saved: false,
      staminaLoss: false,
      failureReason: "Character has already died from blood loss",
    };
  }

  if (healingAmount <= 0) {
    return {
      saved: false,
      staminaLoss: false,
      failureReason: "No healing applied",
    };
  }

  // Character is saved!
  // They start at 0 HP and gain the healing amount
  const newHP = healingAmount;

  return {
    saved: true,
    newHP,
    staminaLoss: true, // Always lose 1 Stamina when saved from bleeding out
    scar: generateScar(),
  };
}

/**
 * Apply the permanent trauma from being saved from bleeding out
 *
 * Returns a new character with:
 * - 1 Stamina lost permanently
 * - A scar added to conditions
 *
 * @param character - Character to update
 * @param newHP - HP to set (from healing)
 * @param scar - Description of the scar
 * @returns Updated character
 */
export function applyBleedOutTrauma(
  character: Character,
  newHP: number,
  scar: string
): Character {
  const currentStaMax = character.state.abilities.sta.max;
  const currentStaCurrent = character.state.abilities.sta.current;

  return {
    ...character,
    state: {
      ...character.state,
      hp: {
        ...character.state.hp,
        current: newHP,
      },
      abilities: {
        ...character.state.abilities,
        sta: {
          max: currentStaMax - 1,
          current: Math.min(currentStaCurrent, currentStaMax - 1),
        },
      },
      conditions: [...character.state.conditions, `Scar: ${scar}`],
    },
  };
}

// =============================================================================
// Body Recovery (Luck Check)
// =============================================================================

/**
 * Attempt to recover a dead character's body
 *
 * Per DCC rules: If body is recovered within 1 hour, character makes a Luck
 * check — roll d20 and succeed if the result is ≤ Luck score (roll-under
 * Luck check, not a meet-or-exceed DC). On success, they were just
 * unconscious and recover to 1 HP with -4 penalty for 1 hour and
 * permanent -1 to STR/AGL/STA.
 *
 * @param luckScore - Character's current Luck score
 * @param roller - Dice roller function
 * @returns Body recovery result
 */
export function attemptBodyRecovery(
  luckScore: number,
  roller: DiceRoller
): BodyRecoveryResult {
  const luckRoll = roller("1d20");
  const success = luckRoll <= luckScore;

  if (!success) {
    return {
      success: false,
      luckRoll,
      luckTarget: luckScore,
    };
  }

  // Randomly pick which ability takes the permanent penalty
  const abilityRoll = roller("1d3");
  const abilities: DCCAbilityId[] = ["str", "agl", "sta"];
  const penaltyAbility = abilities[(abilityRoll - 1) % 3] ?? "sta";

  return {
    success: true,
    luckRoll,
    luckTarget: luckScore,
    newHP: 1,
    groggyDuration: "1 hour (-4 to all rolls)",
    permanentPenalty: {
      ability: penaltyAbility,
      amount: 1,
    },
  };
}

/**
 * Apply body recovery result to a character
 *
 * @param character - The "dead" character
 * @param recovery - Recovery result
 * @returns Updated character, or undefined if recovery failed
 */
export function applyBodyRecovery(
  character: Character,
  recovery: BodyRecoveryResult
): Character | undefined {
  if (!recovery.success || recovery.newHP === undefined) {
    return undefined;
  }

  const penalty = recovery.permanentPenalty;
  let newAbilities = character.state.abilities;

  if (penalty) {
    const ability = penalty.ability;
    const currentMax = character.state.abilities[ability].max;
    const currentCurrent = character.state.abilities[ability].current;

    newAbilities = {
      ...character.state.abilities,
      [ability]: {
        max: currentMax - penalty.amount,
        current: Math.min(currentCurrent, currentMax - penalty.amount),
      },
    };
  }

  // Add groggy condition
  const newConditions = [...character.state.conditions];
  if (recovery.groggyDuration) {
    newConditions.push(`Groggy: ${recovery.groggyDuration}`);
  }
  if (penalty) {
    newConditions.push(
      `Permanent injury: -${String(penalty.amount)} ${penalty.ability.toUpperCase()}`
    );
  }

  return {
    ...character,
    state: {
      ...character.state,
      hp: {
        ...character.state.hp,
        current: recovery.newHP,
      },
      abilities: newAbilities,
      conditions: newConditions,
    },
  };
}

// =============================================================================
// Natural Healing
// =============================================================================

/**
 * Calculate natural healing from rest
 *
 * @param restType - Type of rest taken
 * @returns HP healed per night
 */
export function getHealingFromRest(restType: RestType): number {
  switch (restType) {
    case "active-adventure":
      return 1;
    case "bed-rest":
      return 2;
    default:
      return 1;
  }
}

/**
 * Apply natural healing to a character
 *
 * @param character - Character to heal
 * @param restType - Type of rest taken
 * @returns Healing result
 */
export function applyNaturalHealing(
  character: Character,
  restType: RestType
): HealingResult {
  const healingAmount = getHealingFromRest(restType);
  const maxHP = character.state.hp.max;
  const currentHP = character.state.hp.current;

  const hpHealed = Math.min(healingAmount, maxHP - currentHP);
  const newHP = currentHP + hpHealed;

  // Also heal ability damage (except Luck)
  const abilityHealed: Partial<Record<DCCAbilityId, number>> = {};
  const healableAbilities: DCCAbilityId[] = ["str", "agl", "sta", "per", "int"];

  for (const ability of healableAbilities) {
    const current = character.state.abilities[ability].current;
    const max = character.state.abilities[ability].max;

    if (current < max) {
      const healed = Math.min(healingAmount, max - current);
      if (healed > 0) {
        abilityHealed[ability] = healed;
      }
    }
  }

  return {
    hpHealed,
    newHP,
    abilityHealed,
  };
}

/**
 * Apply healing result to a character
 *
 * @param character - Character to update
 * @param healing - Healing result
 * @returns Updated character
 */
export function applyHealingResult(
  character: Character,
  healing: HealingResult
): Character {
  let newAbilities = { ...character.state.abilities };

  for (const [ability, amount] of Object.entries(healing.abilityHealed)) {
    const abilityId = ability as DCCAbilityId;
    const current = character.state.abilities[abilityId].current;

    newAbilities = {
      ...newAbilities,
      [abilityId]: {
        ...character.state.abilities[abilityId],
        current: current + amount,
      },
    };
  }

  return {
    ...character,
    state: {
      ...character.state,
      hp: {
        ...character.state.hp,
        current: healing.newHP,
      },
      abilities: newAbilities,
    },
  };
}

/**
 * Apply magical healing to a character
 *
 * @param character - Character to heal
 * @param amount - HP to restore
 * @returns Updated character
 */
export function applyMagicalHealing(
  character: Character,
  amount: number
): Character {
  const maxHP = character.state.hp.max;
  const currentHP = character.state.hp.current;
  const newHP = Math.min(maxHP, currentHP + amount);

  return {
    ...character,
    state: {
      ...character.state,
      hp: {
        ...character.state.hp,
        current: newHP,
      },
    },
  };
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Generate a random scar description
 */
function generateScar(): string {
  const scars = [
    "Jagged scar across the face",
    "Deep wound on the chest",
    "Missing finger",
    "Burn scar on the arm",
    "Twisted scar on the back",
    "Maimed ear",
    "Scarred throat",
    "Puckered scar on the abdomen",
    "Mangled hand",
    "Gnarled scar on the leg",
  ];
  const index = Math.floor(Math.random() * scars.length);
  return scars[index] ?? "Terrible scar";
}

/**
 * Check if a character is at death's door (1 HP or less)
 *
 * @param currentHP - Current hit points
 * @returns Whether character is at death's door
 */
export function isAtDeathsDoor(currentHP: number): boolean {
  return currentHP <= 1;
}

/**
 * Check if a character can receive healing
 *
 * @param status - Character's vital status
 * @returns Whether healing can be applied
 */
export function canReceiveHealing(status: VitalStatus): boolean {
  return status === "alive" || status === "unconscious" || status === "bleeding-out";
}
