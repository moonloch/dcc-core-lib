/**
 * Spell Check Orchestration
 *
 * High-level function that orchestrates the complete spell check process:
 * 1. Builds spell check input from character state
 * 2. Performs the spell check roll
 * 3. Handles follow-up rolls (corruption, fumble, disapproval)
 * 4. Returns comprehensive result
 *
 * This is the main entry point for spell casting in applications.
 */

import type { Character } from "../types/character.js";
import type { DieType, RollModifier, RollOptions } from "../types/dice.js";
import type { SimpleTable, TieredTable } from "../tables/types.js";
import type {
  SpellDefinition,
  SpellbookEntry,
  SpellCastInput,
  SpellCastResult,
  SpellCheckOptions,
  SpellEvents,
  CasterProfile,
  SpellburnCommitment,
  CorruptionResult,
  SpellFumbleResult,
} from "../types/spells.js";
import type { DisapprovalResult } from "./disapproval.js";
import { getAbilityModifier } from "../data/ability-modifiers.js";
import { castSpell, getCasterProfile } from "./cast.js";
import { findSpellEntry, markSpellLost } from "./spellbook.js";
import { rollSpellFumble, fumbleRequiresCorruption, fumbleRequiresPatronTaint } from "./fumble.js";
import { rollCorruption, determineCorruptionTier, rollPatronTaint } from "./corruption.js";
import { checkAndRollDisapproval, rollTriggersDisapproval, increaseDisapprovalRange } from "./disapproval.js";

// =============================================================================
// Spell Check Input (Simplified)
// =============================================================================

/**
 * Simplified input for spell checks.
 * The function will extract needed data from character state.
 */
export interface SpellCheckInput {
  /** The spell being cast (definition) */
  spell: SpellDefinition;

  /** Luck to burn on this check (optional) */
  luckBurn?: number;

  /** Spellburn commitment (wizard/elf only) */
  spellburn?: SpellburnCommitment;

  /** Situational modifiers to apply */
  situationalModifiers?: RollModifier[];

  /** Action die override (if not d20) */
  actionDie?: DieType;

  /** Result table for spell effects (pre-loaded) */
  resultTable?: TieredTable;

  /** Fumble table (pre-loaded) */
  fumbleTable?: SimpleTable;

  /** Corruption table (pre-loaded) */
  corruptionTable?: SimpleTable;

  /** Disapproval table (pre-loaded, for clerics) */
  disapprovalTable?: SimpleTable;

  /** Patron taint table (pre-loaded, if applicable) */
  patronTaintTable?: SimpleTable;
}

/**
 * Complete result of a spell check including all follow-up rolls
 */
export interface SpellCheckResult extends SpellCastResult {
  /** Disapproval result (if cleric triggered disapproval) */
  disapprovalResult?: DisapprovalResult;

  /** Updated spellbook entry (with lost status) */
  updatedSpellbookEntry?: SpellbookEntry;

  /** Error message if spell check could not be performed */
  error?: string;
}

// =============================================================================
// Character State Extraction
// =============================================================================

/**
 * Get the caster level from character
 */
export function getCasterLevel(character: Character): number {
  return character.classInfo?.level ?? 0;
}

/**
 * Get the caster profile from character class
 */
export function getCasterProfileFromCharacter(character: Character): CasterProfile | undefined {
  const classId = character.classInfo?.classId;
  if (!classId) return undefined;
  return getCasterProfile(classId);
}

/**
 * Get the spell check ability score and modifier from character
 */
export function getSpellCheckAbility(
  character: Character,
  profile: CasterProfile
): { score: number; modifier: number } {
  const abilityId = profile.spellCheckAbility;
  const score = character.state.abilities[abilityId].current;
  const modifier = getAbilityModifier(score);
  return { score, modifier };
}

/**
 * Get current luck from character
 */
export function getCurrentLuck(character: Character): number {
  return character.state.abilities.lck.current;
}

/**
 * Get starting luck from character identity
 */
export function getStartingLuck(character: Character): number {
  return character.identity.startingLuck;
}

/**
 * Get luck modifier multiplier from birth augur
 */
export function getLuckMultiplier(character: Character): number {
  return character.identity.birthAugur.multiplier;
}

/**
 * Get disapproval range for cleric
 */
export function getDisapprovalRange(character: Character): number {
  return character.state.classState?.cleric?.disapprovalRange ?? 1;
}

/**
 * Get patron ID for wizard/elf
 */
export function getPatronId(character: Character): string | undefined {
  return character.state.classState?.wizard?.patron ?? character.state.classState?.elf?.patron;
}

/**
 * Get spellbook entry for a spell
 */
export function getSpellbookEntry(
  character: Character,
  spellId: string
): SpellbookEntry | undefined {
  const spellbook =
    character.state.classState?.wizard?.spellbook ??
    character.state.classState?.cleric?.spellbook ??
    character.state.classState?.elf?.spellbook;

  if (!spellbook) return undefined;
  return findSpellEntry(spellbook, spellId);
}

// =============================================================================
// Spell Check Input Builder
// =============================================================================

/**
 * Build the full SpellCastInput from character state and simplified input
 */
export function buildSpellCastInput(
  character: Character,
  input: SpellCheckInput,
  profile: CasterProfile
): SpellCastInput | { error: string } {
  // Get spellbook entry
  const spellbookEntry = getSpellbookEntry(character, input.spell.id);
  if (!spellbookEntry) {
    return { error: `Spell "${input.spell.name}" not found in spellbook` };
  }

  // Check if spell is lost
  if (spellbookEntry.lost) {
    return { error: `Spell "${input.spell.name}" is lost for the day` };
  }

  // Get ability score and modifier
  const { score, modifier } = getSpellCheckAbility(character, profile);

  // Build the full input - start with required fields
  const castInput: SpellCastInput = {
    spell: input.spell,
    spellbookEntry,
    casterProfile: profile,
    casterLevel: getCasterLevel(character),
    abilityScore: score,
    abilityModifier: modifier,
  };

  // Add optional fields (these are always defined from character)
  castInput.luck = getCurrentLuck(character);
  castInput.startingLuck = getStartingLuck(character);
  castInput.luckMultiplier = getLuckMultiplier(character);

  // Add optional fields only if they have values (exactOptionalPropertyTypes)
  if (input.luckBurn !== undefined) {
    castInput.luckBurn = input.luckBurn;
  }

  if (input.spellburn !== undefined) {
    castInput.spellburn = input.spellburn;
  }

  if (input.actionDie !== undefined) {
    castInput.actionDie = input.actionDie;
  }

  if (input.resultTable !== undefined) {
    castInput.resultTable = input.resultTable;
  }

  if (input.fumbleTable !== undefined) {
    castInput.fumbleTable = input.fumbleTable;
  }

  if (input.corruptionTable !== undefined) {
    castInput.corruptionTable = input.corruptionTable;
  }

  if (input.patronTaintTable !== undefined) {
    castInput.patronTaintTable = input.patronTaintTable;
  }

  if (input.situationalModifiers !== undefined) {
    castInput.situationalModifiers = input.situationalModifiers;
  }

  // Add cleric-specific fields
  if (profile.usesDisapproval) {
    castInput.disapprovalRange = getDisapprovalRange(character);
  }

  // Add patron for wizard/elf
  if (profile.usesCorruption) {
    const patron = getPatronId(character);
    if (patron !== undefined) {
      castInput.patron = patron;
    }
  }

  return castInput;
}

// =============================================================================
// Main Orchestration Function
// =============================================================================

/**
 * Calculate a complete spell check with all follow-up effects.
 *
 * This is the main entry point for spell casting. It:
 * 1. Validates the character can cast the spell
 * 2. Builds the full spell check input
 * 3. Performs the spell check roll
 * 4. Handles fumbles (for wizards/elves)
 * 5. Handles corruption (for wizards/elves)
 * 6. Handles disapproval (for clerics)
 * 7. Marks spell as lost if applicable
 * 8. Returns comprehensive result
 *
 * @param character - The character casting the spell
 * @param input - Simplified spell check input
 * @param options - Roll options
 * @param events - Event callbacks for UI integration
 * @returns Complete spell check result
 */
export function calculateSpellCheck(
  character: Character,
  input: SpellCheckInput,
  options: SpellCheckOptions = {},
  events?: SpellEvents
): SpellCheckResult {
  // Get caster profile
  const profile = getCasterProfileFromCharacter(character);
  if (!profile) {
    return createErrorResult(input.spell.id, "Character is not a spellcaster");
  }

  // Check if character can cast this spell type
  if (!input.spell.casterTypes.includes(profile.type)) {
    return createErrorResult(
      input.spell.id,
      `${profile.type} cannot cast ${input.spell.name}`
    );
  }

  // Build full spell cast input
  const castInputOrError = buildSpellCastInput(character, input, profile);
  if ("error" in castInputOrError) {
    return createErrorResult(input.spell.id, castInputOrError.error);
  }

  const castInput = castInputOrError;

  // Perform the spell check
  const baseResult = castSpell(castInput, options, events);

  // Build the complete result
  const result: SpellCheckResult = { ...baseResult };

  // Handle fumble for wizard/elf
  if (baseResult.fumble && profile.usesCorruption && !options.skipFumble) {
    const fumbleResult = handleWizardFumble(
      input.spell.level,
      profile,
      castInput.patron,
      input.fumbleTable,
      input.corruptionTable,
      input.patronTaintTable,
      options,
      events,
      result
    );
    if (fumbleResult !== undefined) {
      result.fumbleResult = fumbleResult;
    }
  }

  // Handle corruption trigger (separate from fumble)
  if (
    baseResult.corruptionTriggered &&
    !baseResult.fumble && // Don't double-roll corruption from fumble
    !options.skipCorruption &&
    input.corruptionTable
  ) {
    result.corruptionResult = handleCorruption(
      input.spell.level,
      input.corruptionTable,
      options,
      events,
      result
    );
  }

  // Handle disapproval for cleric
  if (
    profile.usesDisapproval &&
    baseResult.natural !== undefined &&
    castInput.disapprovalRange !== undefined
  ) {
    const disapproval = handleClericDisapproval(
      baseResult.natural,
      castInput.disapprovalRange,
      input.disapprovalTable,
      options,
      events,
      result
    );
    if (disapproval) {
      result.disapprovalResult = disapproval;
    }
  }

  // Mark spell as lost if applicable
  if (baseResult.spellLost) {
    const spellbook =
      character.state.classState?.wizard?.spellbook ??
      character.state.classState?.cleric?.spellbook ??
      character.state.classState?.elf?.spellbook;

    if (spellbook) {
      const updatedSpellbook = markSpellLost(spellbook, input.spell.id);
      const updatedEntry = findSpellEntry(updatedSpellbook, input.spell.id);
      if (updatedEntry) {
        result.updatedSpellbookEntry = updatedEntry;
      }
    }
  }

  return result;
}

// =============================================================================
// Follow-up Roll Handlers
// =============================================================================

/**
 * Handle fumble for wizard/elf
 */
function handleWizardFumble(
  spellLevel: number,
  profile: CasterProfile,
  patron: string | undefined,
  fumbleTable: SimpleTable | undefined,
  corruptionTable: SimpleTable | undefined,
  patronTaintTable: SimpleTable | undefined,
  options: RollOptions,
  events: SpellEvents | undefined,
  result: SpellCheckResult
): SpellFumbleResult | undefined {
  if (!fumbleTable) return undefined;

  const fumbleResult = rollSpellFumble(spellLevel, fumbleTable, options);

  // Check if fumble triggers corruption
  if (fumbleRequiresCorruption(fumbleResult, profile) && corruptionTable) {
    const corruptionTier = determineCorruptionTier(spellLevel);
    const corruptionResult = rollCorruption(corruptionTable, corruptionTier, options);
    result.corruptionResult = corruptionResult;
    events?.onCorruptionTriggered?.(result, corruptionResult);
  }

  // Check if fumble triggers patron taint
  if (fumbleRequiresPatronTaint(fumbleResult, !!patron) && patron && patronTaintTable) {
    const taintResult = rollPatronTaint(patron, patronTaintTable, options);
    result.patronTaintResult = taintResult;
    events?.onPatronTaint?.(result, taintResult);
  }

  return fumbleResult;
}

/**
 * Handle corruption (non-fumble trigger)
 */
function handleCorruption(
  spellLevel: number,
  corruptionTable: SimpleTable,
  options: RollOptions,
  events: SpellEvents | undefined,
  result: SpellCheckResult
): CorruptionResult {
  const tier = determineCorruptionTier(spellLevel);
  const corruptionResult = rollCorruption(corruptionTable, tier, options);
  events?.onCorruptionTriggered?.(result, corruptionResult);
  return corruptionResult;
}

/**
 * Handle disapproval for cleric
 */
function handleClericDisapproval(
  natural: number,
  disapprovalRange: number,
  disapprovalTable: SimpleTable | undefined,
  options: RollOptions,
  events: SpellEvents | undefined,
  result: SpellCheckResult
): DisapprovalResult | undefined {
  // Check if natural roll triggers disapproval
  if (!rollTriggersDisapproval(natural, disapprovalRange)) {
    return undefined;
  }

  // Roll disapproval if table is provided
  if (disapprovalTable) {
    const disapprovalResult = checkAndRollDisapproval(
      natural,
      disapprovalRange,
      disapprovalTable,
      options
    );

    if (disapprovalResult) {
      // Update the new disapproval range in result
      result.newDisapprovalRange = increaseDisapprovalRange(disapprovalRange);
      events?.onDisapprovalIncreased?.(result, result.newDisapprovalRange);
      return disapprovalResult;
    }
  }

  return undefined;
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Create an error result
 */
function createErrorResult(spellId: string, error: string): SpellCheckResult {
  return {
    spellId,
    die: "d20",
    formula: "",
    modifiers: [],
    critical: false,
    fumble: false,
    spellLost: false,
    corruptionTriggered: false,
    disapprovalIncrease: 0,
    luckBurned: 0,
    error,
  };
}

/**
 * Check if a spell check result is successful
 */
export function isSpellCheckSuccess(result: SpellCheckResult): boolean {
  if (result.error) return false;
  if (!result.tier) return false;
  return result.tier.startsWith("success");
}

/**
 * Check if a spell check result is a failure
 */
export function isSpellCheckFailure(result: SpellCheckResult): boolean {
  if (result.error) return true;
  if (!result.tier) return true;
  return result.tier === "failure" || result.tier === "lost";
}

/**
 * Get a summary of the spell check result for display
 */
export function getSpellCheckSummary(result: SpellCheckResult): string {
  if (result.error) {
    return `Error: ${result.error}`;
  }

  const parts: string[] = [];

  // Roll info
  if (result.natural !== undefined && result.total !== undefined) {
    parts.push(`Roll: ${String(result.natural)} → ${String(result.total)}`);
  }

  // Result tier
  if (result.tier) {
    const tierDisplay = result.tier.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    parts.push(`Result: ${tierDisplay}`);
  }

  // Critical/Fumble
  if (result.critical) {
    parts.push("CRITICAL!");
  }
  if (result.fumble) {
    parts.push("FUMBLE!");
  }

  // Spell lost
  if (result.spellLost) {
    parts.push("Spell Lost");
  }

  // Corruption
  if (result.corruptionResult) {
    parts.push(`Corruption: ${result.corruptionResult.description}`);
  }

  // Disapproval
  if (result.disapprovalResult) {
    parts.push(`Disapproval: ${result.disapprovalResult.description}`);
  }

  // Fumble effect
  if (result.fumbleResult) {
    parts.push(`Fumble: ${result.fumbleResult.description}`);
  }

  return parts.join(" | ");
}
