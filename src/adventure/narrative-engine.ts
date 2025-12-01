/**
 * Narrative Encounter Engine
 *
 * Pure functions for creating and resolving narrative encounters.
 */

import type {
  NarrativeEncounterState,
  NarrativeTemplate,
  NarrativeOption,
  NarrativeCheckResult,
  NarrativeCategory,
} from "./types.js";
import type { Character } from "../types/character.js";
import type { DCCAbilityId } from "../types/system.js";
import { getRandomTemplate, getTemplateById } from "./narrative-templates.js";

/**
 * Dice roller function type
 */
type DiceRoller = (sides: number) => number;

/**
 * Default dice roller using Math.random
 */
function defaultRoller(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Get ability modifier from ability score
 */
function getAbilityModifier(score: number): number {
  if (score <= 3) return -3;
  if (score <= 5) return -2;
  if (score <= 8) return -1;
  if (score <= 12) return 0;
  if (score <= 15) return 1;
  if (score <= 17) return 2;
  return 3;
}

/**
 * Get ability score from character
 */
function getAbilityScore(character: Character, ability: DCCAbilityId): number {
  const abilityObj = character.state.abilities[ability];
  return abilityObj.current;
}

/**
 * Create a new narrative encounter from a template.
 */
export function createNarrativeEncounter(
  template: NarrativeTemplate
): NarrativeEncounterState {
  return {
    encounterId: crypto.randomUUID(),
    type: "narrative",
    phase: "awaiting-choice",
    templateId: template.id,
    situation: template.situation,
    options: [...template.options],
  };
}

/**
 * Create a narrative encounter from a category (random template).
 */
export function createNarrativeEncounterFromCategory(
  category: NarrativeCategory
): NarrativeEncounterState | null {
  const template = getRandomTemplate(category);
  if (!template) {
    return null;
  }
  return createNarrativeEncounter(template);
}

/**
 * Create a narrative encounter from a template ID.
 */
export function createNarrativeEncounterFromId(
  templateId: string
): NarrativeEncounterState | null {
  const template = getTemplateById(templateId);
  if (!template) {
    return null;
  }
  return createNarrativeEncounter(template);
}

/**
 * Result of choosing an option
 */
export interface ChooseOptionResult {
  /** Updated encounter state */
  encounter: NarrativeEncounterState;

  /** The chosen option */
  option: NarrativeOption;

  /** Whether a skill check was required */
  requiredCheck: boolean;

  /** Skill check result if applicable */
  checkResult?: NarrativeCheckResult;

  /** Whether the outcome was successful */
  success: boolean;

  /** The outcome text */
  outcomeText: string;
}

/**
 * Choose an option in a narrative encounter.
 * If the option requires a skill check, it will be rolled.
 */
export function chooseOption(
  encounter: NarrativeEncounterState,
  optionId: string,
  character: Character,
  playerInfo: { playerId: string; playerName: string },
  roller: DiceRoller = defaultRoller
): ChooseOptionResult | null {
  // Validate encounter is in correct phase
  if (encounter.phase !== "awaiting-choice") {
    return null;
  }

  // Find the option
  const option = encounter.options.find((o) => o.id === optionId);
  if (!option) {
    return null;
  }

  let success = true;
  let outcomeText = option.successOutcome;
  let checkResult: NarrativeCheckResult | undefined;

  // Roll skill check if required
  if (option.skillCheck) {
    const { ability, dc } = option.skillCheck;
    const abilityScore = getAbilityScore(character, ability);
    const modifier = getAbilityModifier(abilityScore);
    const roll = roller(20);
    const total = roll + modifier;
    success = total >= dc;

    checkResult = {
      playerId: playerInfo.playerId,
      playerName: playerInfo.playerName,
      ability,
      dc,
      roll,
      modifier,
      total,
      passed: success,
    };

    if (!success && option.failureOutcome) {
      outcomeText = option.failureOutcome;
    }
  }

  // Update encounter state
  const updatedEncounter: NarrativeEncounterState = {
    ...encounter,
    phase: "resolved",
    chosenOptionId: optionId,
    outcome: outcomeText,
  };

  // Add check results if applicable
  if (checkResult) {
    updatedEncounter.checkResults = [checkResult];
  }

  // Build result - handle checkResult conditionally for exactOptionalPropertyTypes
  const result: ChooseOptionResult = {
    encounter: updatedEncounter,
    option,
    requiredCheck: !!option.skillCheck,
    success,
    outcomeText,
  };

  if (checkResult) {
    result.checkResult = checkResult;
  }

  return result;
}

/**
 * Get the available options for an encounter.
 */
export function getAvailableOptions(
  encounter: NarrativeEncounterState
): NarrativeOption[] {
  if (encounter.phase !== "awaiting-choice") {
    return [];
  }
  return encounter.options;
}

/**
 * Check if an encounter is resolved.
 */
export function isEncounterResolved(
  encounter: NarrativeEncounterState
): boolean {
  return encounter.phase === "resolved";
}

/**
 * Ability ID to display name mapping
 */
const ABILITY_SHORT_NAMES: Record<DCCAbilityId, string> = {
  str: "STR",
  agl: "AGL",
  sta: "STA",
  per: "PER",
  int: "INT",
  lck: "LCK",
};

/**
 * Ability ID to full name mapping
 */
const ABILITY_FULL_NAMES: Record<DCCAbilityId, string> = {
  str: "Strength",
  agl: "Agility",
  sta: "Stamina",
  per: "Personality",
  int: "Intelligence",
  lck: "Luck",
};

/**
 * Format an option for display, including skill check info.
 */
export function formatOptionDisplay(option: NarrativeOption): string {
  let display = option.text;

  if (option.skillCheck) {
    const abilityName = ABILITY_SHORT_NAMES[option.skillCheck.ability];
    display += ` [${abilityName} DC ${String(option.skillCheck.dc)}]`;
  }

  return display;
}

/**
 * Format a skill check result for display.
 */
export function formatCheckResult(result: NarrativeCheckResult): string {
  const modStr =
    result.modifier >= 0 ? `+${String(result.modifier)}` : String(result.modifier);
  const passedStr = result.passed ? "**Success!**" : "**Failure!**";

  return `${result.playerName} rolls ${ABILITY_FULL_NAMES[result.ability]}: ${String(result.roll)} ${modStr} = **${String(result.total)}** vs DC ${String(result.dc)} - ${passedStr}`;
}
