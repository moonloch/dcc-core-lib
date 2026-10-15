/**
 * Spell Duel System
 *
 * Implements DCC spell duel rules for wizard vs wizard (or cleric) magical combat.
 *
 * Key mechanics:
 * - Momentum tracking (starts at 10, winner increments by 1)
 * - Spell check comparison (Table 4-5)
 * - Counterspell power resolution (Table 4-6)
 * - Phlogiston disturbance on ties (Table 4-7)
 * - Same patron invocations cancel each other
 *
 * Initiative rules:
 * - Casters later in initiative can counterspell earlier casters
 * - Counterspelling uses their action for the round
 * - Combat pauses for spell duel resolution
 *
 * Table Data:
 * - Default fan-made tables are provided for basic functionality
 * - Official DCC tables can be injected by the caller
 */

import type { DiceRoller } from "../types/dice.js";
import { evaluateRoll } from "../dice/roll.js";
import {
  type SpellDuelTables,
  type CounterspellPowerTable,
  type PhlogistonDisturbanceTable,
  type ComparisonDieLookup,
  DEFAULT_SPELL_DUEL_TABLES,
  lookupCounterspellPowerEntry,
  lookupPhlogistonDisturbanceEntry,
  entryToCounterspellPowerResult,
  entryToPhlogistonDisturbanceResult,
} from "./spell-duel-tables.js";
import { getSpellCheckThreshold, didSpellCheckSucceed } from "./cast.js";

// The spell-check threshold lives in cast.ts (castSpell's default tiers use
// it); re-exported here for existing spell-duel importers.
export {
  SPELL_CHECK_THRESHOLDS,
  getSpellCheckThreshold,
  didSpellCheckSucceed,
} from "./cast.js";

// Re-export table types and defaults for external use
export type {
  SpellDuelTables,
  CounterspellPowerTable,
  PhlogistonDisturbanceTable,
  ComparisonDieLookup,
  CounterspellPowerEntry,
  PhlogistonDisturbanceEntry,
} from "./spell-duel-tables.js";
export {
  DEFAULT_SPELL_DUEL_TABLES,
  DEFAULT_COUNTERSPELL_POWER_TABLE,
  DEFAULT_PHLOGISTON_DISTURBANCE_TABLE,
  defaultGetComparisonDie,
  lookupCounterspellPowerEntry,
  lookupPhlogistonDisturbanceEntry,
  entryToCounterspellPowerResult,
  entryToPhlogistonDisturbanceResult,
} from "./spell-duel-tables.js";

// =============================================================================
// Types
// =============================================================================

/**
 * Types of casters that can participate in spell duels
 */
export type SpellDuelCasterType = "wizard" | "cleric" | "other";

/**
 * A participant in a spell duel
 */
export interface SpellDuelParticipant {
  /** Unique identifier for the participant */
  id: string;

  /** Display name */
  name: string;

  /** Type of caster */
  casterType: SpellDuelCasterType;

  /** Current momentum (starts at 10) */
  momentum: number;

  /** Initiative roll for ordering */
  initiative: number;

  /** Patron name if invoking patron (for same-patron cancellation) */
  patron?: string | undefined;
}

/**
 * Categories of spells that can counter each other
 */
export type CounterspellCategory =
  | "fire-resistance" // Counters fire spells
  | "magic-shield" // Counters attack spells
  | "dispel-magic" // Counters any spell
  | "invoke-patron" // Counters invoke patron
  | "same-spell"; // Same spell counters itself

/**
 * A spell being cast or used to counter
 */
export interface SpellDuelSpell {
  /** Name of the spell */
  name: string;

  /** Spell level (affects minimum spell check threshold) */
  level: number;

  /** Category for counterspell matching */
  category: CounterspellCategory;

  /** Specific spells this can counter (for defensive spells) */
  counters?: string[] | undefined;

  /** The patron being invoked (if invoke patron) */
  patron?: string | undefined;
}

/**
 * Result of a spell check in the duel
 */
export interface SpellDuelCheck {
  /** The caster making the check */
  casterId: string;

  /** The spell being cast */
  spell: SpellDuelSpell;

  /** Natural roll on the die */
  naturalRoll: number;

  /** Total spell check result */
  total: number;

  /** Whether the check succeeded (met minimum threshold) */
  succeeded: boolean;

  /** Whether the spell is lost for the day */
  spellLost: boolean;
}

/**
 * Comparison die from Table 4-5
 */
export type ComparisonDie =
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d10"
  | "d12"
  | "d14"
  | "d16"
  | "PD"; // Phlogiston Disturbance

/**
 * Result of comparing spell checks (Table 4-5)
 */
export interface SpellCheckComparison {
  /** Attacker's spell check total */
  attackerCheck: number;

  /** Defender's spell check total */
  defenderCheck: number;

  /** Whether attacker had higher check */
  attackerHigh: boolean;

  /** Die to roll on Table 4-6, or "PD" for phlogiston disturbance */
  comparisonDie: ComparisonDie;

  /** Whether this triggers phlogiston disturbance */
  isPhlogistonDisturbance: boolean;
}

/**
 * Result from Table 4-6: Counterspell Power
 */
export interface CounterspellPowerResult {
  /** Roll on the comparison die */
  roll: number;

  /** Momentum modifier applied */
  momentumModifier: number;

  /** Final modified result */
  modifiedResult: number;

  /** Effect description */
  effect: string;

  /** Whether attacker's spell takes effect */
  attackerSpellEffective: boolean;

  /** Whether defender's spell takes effect */
  defenderSpellEffective: boolean;

  /** Modifier to attacker's effective spell check (can reduce it) */
  attackerCheckModifier: number;

  /** Modifier to defender's effective spell check (can reduce it) */
  defenderCheckModifier: number;

  /** Whether both spells go off simultaneously */
  simultaneousEffect: boolean;
}

/**
 * Result from Table 4-7: Phlogiston Disturbance
 */
export interface PhlogistonDisturbanceResult {
  /** Roll on the table */
  roll: number;

  /** Effect description */
  effect: string;

  /** Whether this affects the attacker */
  affectsAttacker: boolean;

  /** Whether this affects the defender */
  affectsDefender: boolean;

  /** Whether this affects bystanders */
  affectsBystanders: boolean;

  /** Damage dealt (if any) */
  damage?: string | undefined;

  /** Area of effect in feet (if any) */
  areaOfEffect?: number | undefined;

  /** Special effect type */
  specialEffect?:
    | "corruption"
    | "patron-taint"
    | "deity-displeasure"
    | "supernatural-entity"
    | "dimensional-rift"
    | "time-distortion"
    | "magical-chaos"
    | undefined;
}

/**
 * Result of a single counterspell exchange
 */
export interface CounterspellExchangeResult {
  /** The attacking caster's check */
  attackerCheck: SpellDuelCheck;

  /** The defending caster's check */
  defenderCheck: SpellDuelCheck;

  /** Comparison result */
  comparison: SpellCheckComparison;

  /** Counterspell power result (if not phlogiston disturbance) */
  counterspellPower?: CounterspellPowerResult | undefined;

  /** Phlogiston disturbance result (if checks were equal) */
  phlogistonDisturbance?: PhlogistonDisturbanceResult | undefined;

  /** Updated attacker momentum */
  newAttackerMomentum: number;

  /** Updated defender momentum */
  newDefenderMomentum: number;

  /** Whether same-patron cancellation occurred */
  samePatronCancellation: boolean;
}

/**
 * State of an ongoing spell duel
 */
export interface SpellDuelState {
  /** All participants in the duel */
  participants: SpellDuelParticipant[];

  /** History of exchanges */
  exchanges: CounterspellExchangeResult[];

  /** Whether the duel is still active */
  active: boolean;

  /** ID of the current attacker */
  currentAttackerId?: string | undefined;

  /** The spell being attacked with */
  currentAttackSpell?: SpellDuelSpell | undefined;
}

// =============================================================================
// Constants
// =============================================================================

/**
 * Starting momentum for all duel participants
 */
export const STARTING_MOMENTUM = 10;

/**
 * Default spells and what they can counter
 */
export const COUNTERSPELL_RELATIONSHIPS: Record<string, string[]> = {
  "fire-resistance": ["fireball", "scorching-ray"],
  "magic-shield": ["magic-missile", "fireball", "scorching-ray", "lightning-bolt"],
  "dispel-magic": ["*"], // Counters any spell
};

// =============================================================================
// Table 4-5: Spell Duel Check Comparison
// =============================================================================

/**
 * Table 4-5 lookup - returns the die to roll based on attacker and defender checks
 *
 * The table is symmetric around the diagonal (where checks are equal = PD)
 * Distance from diagonal determines the die size
 *
 * @param attackerCheck - Attacker's spell check total
 * @param defenderCheck - Defender's spell check total
 * @param lookupFn - Optional custom lookup function (for official tables)
 */
export function getComparisonDie(
  attackerCheck: number,
  defenderCheck: number,
  lookupFn?: ComparisonDieLookup
): ComparisonDie {
  const lookup = lookupFn ?? DEFAULT_SPELL_DUEL_TABLES.getComparisonDie;
  return lookup(attackerCheck, defenderCheck);
}

/**
 * Compare spell checks and determine the die to roll
 *
 * @param attackerCheck - Attacker's spell check total
 * @param defenderCheck - Defender's spell check total
 * @param lookupFn - Optional custom lookup function (for official tables)
 */
export function compareSpellChecks(
  attackerCheck: number,
  defenderCheck: number,
  lookupFn?: ComparisonDieLookup
): SpellCheckComparison {
  const comparisonDie = getComparisonDie(attackerCheck, defenderCheck, lookupFn);

  return {
    attackerCheck,
    defenderCheck,
    attackerHigh: attackerCheck > defenderCheck,
    comparisonDie,
    isPhlogistonDisturbance: comparisonDie === "PD",
  };
}

// =============================================================================
// Table 4-6: Counterspell Power
// =============================================================================

/**
 * Table 4-6: Counterspell Power results
 *
 * The roll is modified by the winner's momentum minus the loser's (Table 4-6
 * and the spell duel rules, core book p. 98), so it is negative when the
 * winner of this exchange trails on momentum.
 * If attacker high, use "Attacker High" column
 * If defender high, use "Defender High" column
 *
 * @param comparisonDie - The die to roll (from Table 4-5)
 * @param attackerHigh - Whether the attacker had the higher spell check
 * @param momentumModifier - The winner's momentum minus the loser's
 * @param roller - Optional dice roller
 * @param table - Optional custom table data (for official tables)
 */
export function rollCounterspellPower(
  comparisonDie: ComparisonDie,
  attackerHigh: boolean,
  momentumModifier: number,
  roller?: DiceRoller,
  table?: CounterspellPowerTable
): CounterspellPowerResult {
  if (comparisonDie === "PD") {
    throw new Error("Cannot roll counterspell power on Phlogiston Disturbance");
  }

  const tableData = table ?? DEFAULT_SPELL_DUEL_TABLES.counterspellPower;

  // Roll the comparison die
  const dieFormula = `1${comparisonDie}`;
  const rollResult = roller
    ? evaluateRoll(dieFormula, { mode: "evaluate", roller })
    : evaluateRoll(dieFormula, { mode: "evaluate" });

  const roll = rollResult.total ?? 1;
  const modifiedResult = Math.max(1, roll + momentumModifier);

  // Look up the entry from the appropriate column
  const column = attackerHigh ? tableData.attackerHigh : tableData.defenderHigh;
  const entry = lookupCounterspellPowerEntry(column, modifiedResult);

  return entryToCounterspellPowerResult(entry, roll, momentumModifier, modifiedResult);
}

// =============================================================================
// Table 4-7: Phlogiston Disturbance
// =============================================================================

/**
 * Roll on Table 4-7: Phlogiston Disturbance
 *
 * This occurs when both spell checks are identical
 * Dangerous magical effects can occur
 *
 * The die matches the table: its size is the highest `max` in the table, so
 * the core book's Table 4-7 (p. 98) rolls a d10 and the default placeholder
 * table rolls a d20. Rows must therefore cover 1 to the die size exactly, with
 * no catch-all row (such as `max: 100`) at the end.
 *
 * @param roller - Optional dice roller
 * @param table - Optional custom table data (for official tables)
 */
export function rollPhlogistonDisturbance(
  roller?: DiceRoller,
  table?: PhlogistonDisturbanceTable
): PhlogistonDisturbanceResult {
  const tableData = table ?? DEFAULT_SPELL_DUEL_TABLES.phlogistonDisturbance;
  if (tableData.length === 0) {
    throw new Error("Phlogiston disturbance table is empty");
  }

  const dieFormula = `1d${String(Math.max(...tableData.map((entry) => entry.max)))}`;
  const rollResult = roller
    ? evaluateRoll(dieFormula, { mode: "evaluate", roller })
    : evaluateRoll(dieFormula, { mode: "evaluate" });

  const roll = rollResult.total ?? 10;

  const entry = lookupPhlogistonDisturbanceEntry(tableData, roll);
  return entryToPhlogistonDisturbanceResult(entry, roll);
}

// =============================================================================
// Spell Duel State Management
// =============================================================================

/**
 * Create initial spell duel state
 */
export function createSpellDuelState(
  participants: {
    id: string;
    name: string;
    casterType: SpellDuelCasterType;
    initiative: number;
    patron?: string | undefined;
  }[]
): SpellDuelState {
  return {
    participants: participants.map((p) => ({
      ...p,
      momentum: STARTING_MOMENTUM,
    })),
    exchanges: [],
    active: true,
  };
}

/**
 * Create a spell duel participant
 */
export function createSpellDuelParticipant(
  id: string,
  name: string,
  casterType: SpellDuelCasterType,
  initiative: number,
  patron?: string
): SpellDuelParticipant {
  return {
    id,
    name,
    casterType,
    momentum: STARTING_MOMENTUM,
    initiative,
    patron,
  };
}

/**
 * Determine if a spell is lost based on the initial check (spell duel context)
 */
export function checkSpellLostInDuel(
  _naturalRoll: number,
  total: number,
  spellLevel: number
): boolean {
  // Spell is only lost if initial, unmodified check is below threshold
  // If the check summoned enough power to start the duel, spell is not lost
  const threshold = getSpellCheckThreshold(spellLevel);
  return total < threshold;
}

// =============================================================================
// Counterspell Validation
// =============================================================================

/**
 * Check if a defending spell can counter an attacking spell
 */
export function canCounter(
  attackSpell: SpellDuelSpell,
  counterSpell: SpellDuelSpell
): boolean {
  // Dispel magic can counter anything
  if (counterSpell.category === "dispel-magic") {
    return true;
  }

  // Same spell can always counter itself
  if (counterSpell.category === "same-spell") {
    return attackSpell.name.toLowerCase() === counterSpell.name.toLowerCase();
  }

  // Invoke patron vs invoke patron
  if (attackSpell.category === "invoke-patron" && counterSpell.category === "invoke-patron") {
    return true;
  }

  // Check specific counter relationships
  if (counterSpell.counters) {
    const attackName = attackSpell.name.toLowerCase();
    return counterSpell.counters.some(
      (c) => c === "*" || c.toLowerCase() === attackName
    );
  }

  // Check default relationships
  const counterKey = counterSpell.name.toLowerCase().replace(/\s+/g, "-");
  const defaults = COUNTERSPELL_RELATIONSHIPS[counterKey];
  if (defaults) {
    if (defaults.includes("*")) return true;
    const attackName = attackSpell.name.toLowerCase().replace(/\s+/g, "-");
    return defaults.includes(attackName);
  }

  return false;
}

/**
 * Check if two invoke patron spells are for the same patron (auto-cancel)
 */
export function isSamePatronInvocation(
  attackSpell: SpellDuelSpell,
  counterSpell: SpellDuelSpell
): boolean {
  if (attackSpell.category !== "invoke-patron" || counterSpell.category !== "invoke-patron") {
    return false;
  }

  if (!attackSpell.patron || !counterSpell.patron) {
    return false;
  }

  return attackSpell.patron.toLowerCase() === counterSpell.patron.toLowerCase();
}

// =============================================================================
// Spell Duel Resolution
// =============================================================================

/**
 * Make a spell check for a duel participant
 */
export function makeSpellDuelCheck(
  spell: SpellDuelSpell,
  casterId: string,
  spellCheckBonus: number,
  roller?: DiceRoller
): SpellDuelCheck {
  const rollResult = roller
    ? evaluateRoll("1d20", { mode: "evaluate", roller })
    : evaluateRoll("1d20", { mode: "evaluate" });

  const naturalRoll = rollResult.natural ?? rollResult.total ?? 10;
  const total = naturalRoll + spellCheckBonus;
  const succeeded = didSpellCheckSucceed(total, spell.level);
  const spellLost = checkSpellLostInDuel(naturalRoll, total, spell.level);

  return {
    casterId,
    spell,
    naturalRoll,
    total,
    succeeded,
    spellLost,
  };
}

/**
 * Options for resolving a counterspell exchange
 */
export interface ResolveExchangeOptions {
  /** Optional dice roller */
  roller?: DiceRoller;
  /** Optional custom tables (for official tables) */
  tables?: SpellDuelTables;
}

/**
 * Resolve a counterspell exchange between attacker and defender
 *
 * @param state - Current spell duel state
 * @param attackerId - ID of the attacking caster
 * @param defenderId - ID of the defending caster
 * @param attackerCheck - Attacker's spell check result
 * @param defenderCheck - Defender's spell check result
 * @param rollerOrOptions - Either a dice roller or options object
 */
export function resolveCounterspellExchange(
  state: SpellDuelState,
  attackerId: string,
  defenderId: string,
  attackerCheck: SpellDuelCheck,
  defenderCheck: SpellDuelCheck,
  rollerOrOptions?: DiceRoller | ResolveExchangeOptions
): CounterspellExchangeResult {
  // Handle both old signature (roller) and new signature (options)
  const options: ResolveExchangeOptions =
    typeof rollerOrOptions === "function"
      ? { roller: rollerOrOptions }
      : rollerOrOptions ?? {};

  const { roller, tables } = options;

  const attacker = state.participants.find((p) => p.id === attackerId);
  const defender = state.participants.find((p) => p.id === defenderId);

  if (!attacker || !defender) {
    throw new Error("Attacker or defender not found in spell duel state");
  }

  // Both checks must succeed
  if (!attackerCheck.succeeded || !defenderCheck.succeeded) {
    // Failed checks don't progress the duel meaningfully
    return {
      attackerCheck,
      defenderCheck,
      comparison: {
        attackerCheck: attackerCheck.total,
        defenderCheck: defenderCheck.total,
        attackerHigh: attackerCheck.total > defenderCheck.total,
        comparisonDie: "d3",
        isPhlogistonDisturbance: false,
      },
      newAttackerMomentum: attacker.momentum,
      newDefenderMomentum: defender.momentum,
      samePatronCancellation: false,
    };
  }

  // Same-patron cancellation applies only when both checks succeed (core
  // book p. 98, spell duel special notes)
  if (isSamePatronInvocation(attackerCheck.spell, defenderCheck.spell)) {
    return {
      attackerCheck,
      defenderCheck,
      comparison: {
        attackerCheck: attackerCheck.total,
        defenderCheck: defenderCheck.total,
        attackerHigh: false,
        comparisonDie: "PD",
        isPhlogistonDisturbance: false,
      },
      newAttackerMomentum: attacker.momentum,
      newDefenderMomentum: defender.momentum,
      samePatronCancellation: true,
    };
  }

  // Compare spell checks
  const comparison = compareSpellChecks(
    attackerCheck.total,
    defenderCheck.total,
    tables?.getComparisonDie
  );

  // Update momentum - winner increments by 1
  let newAttackerMomentum = attacker.momentum;
  let newDefenderMomentum = defender.momentum;

  if (comparison.attackerHigh) {
    newAttackerMomentum += 1;
  } else if (!comparison.isPhlogistonDisturbance) {
    newDefenderMomentum += 1;
  }

  // Resolve based on comparison result
  if (comparison.isPhlogistonDisturbance) {
    const phlogistonDisturbance = rollPhlogistonDisturbance(roller, tables?.phlogistonDisturbance);
    return {
      attackerCheck,
      defenderCheck,
      comparison,
      phlogistonDisturbance,
      newAttackerMomentum,
      newDefenderMomentum,
      samePatronCancellation: false,
    };
  } else {
    // Table 4-6 modifier: the winner's momentum minus the loser's
    const momentumModifier = comparison.attackerHigh
      ? newAttackerMomentum - newDefenderMomentum
      : newDefenderMomentum - newAttackerMomentum;
    const counterspellPower = rollCounterspellPower(
      comparison.comparisonDie,
      comparison.attackerHigh,
      momentumModifier,
      roller,
      tables?.counterspellPower
    );
    return {
      attackerCheck,
      defenderCheck,
      comparison,
      counterspellPower,
      newAttackerMomentum,
      newDefenderMomentum,
      samePatronCancellation: false,
    };
  }
}

/**
 * Apply a counterspell exchange result to update the duel state
 */
export function applyExchangeResult(
  state: SpellDuelState,
  result: CounterspellExchangeResult
): SpellDuelState {
  const newParticipants = state.participants.map((p) => {
    if (p.id === result.attackerCheck.casterId) {
      return { ...p, momentum: result.newAttackerMomentum };
    }
    if (p.id === result.defenderCheck.casterId) {
      return { ...p, momentum: result.newDefenderMomentum };
    }
    return p;
  });

  return {
    ...state,
    participants: newParticipants,
    exchanges: [...state.exchanges, result],
  };
}

/**
 * Get participants sorted by initiative (highest first)
 */
export function getInitiativeOrder(state: SpellDuelState): SpellDuelParticipant[] {
  return [...state.participants].sort((a, b) => b.initiative - a.initiative);
}

/**
 * Check if a participant can counterspell based on initiative
 * A caster can only counterspell someone with higher initiative
 */
export function canCounterspellByInitiative(
  state: SpellDuelState,
  attackerId: string,
  defenderId: string
): boolean {
  const attacker = state.participants.find((p) => p.id === attackerId);
  const defender = state.participants.find((p) => p.id === defenderId);

  if (!attacker || !defender) {
    return false;
  }

  // Defender must have lower initiative to counterspell
  return defender.initiative < attacker.initiative;
}

// =============================================================================
// Formatting
// =============================================================================

/**
 * Format a spell duel check result for display
 */
export function formatSpellDuelCheck(check: SpellDuelCheck): string {
  const successStr = check.succeeded ? "SUCCESS" : "FAILED";
  const lostStr = check.spellLost ? " (spell lost)" : "";
  return `${check.spell.name}: rolled ${String(check.naturalRoll)}, total ${String(check.total)} - ${successStr}${lostStr}`;
}

/**
 * Format a counterspell exchange result for display
 */
export function formatExchangeResult(
  result: CounterspellExchangeResult,
  attackerName: string,
  defenderName: string
): string {
  const lines: string[] = [];

  lines.push(`=== Spell Duel Exchange ===`);
  lines.push(`${attackerName}: ${formatSpellDuelCheck(result.attackerCheck)}`);
  lines.push(`${defenderName}: ${formatSpellDuelCheck(result.defenderCheck)}`);

  if (result.samePatronCancellation) {
    lines.push(`SAME PATRON - Both spells automatically cancelled!`);
    return lines.join("\n");
  }

  const winner = result.comparison.attackerHigh ? attackerName : defenderName;
  lines.push(`${winner} wins the exchange!`);
  lines.push(`Momentum: ${attackerName} ${String(result.newAttackerMomentum)}, ${defenderName} ${String(result.newDefenderMomentum)}`);

  if (result.phlogistonDisturbance) {
    lines.push(`PHLOGISTON DISTURBANCE!`);
    lines.push(`Roll: ${String(result.phlogistonDisturbance.roll)}`);
    lines.push(`Effect: ${result.phlogistonDisturbance.effect}`);
  } else if (result.counterspellPower) {
    const cp = result.counterspellPower;
    lines.push(`Comparison die: ${result.comparison.comparisonDie}`);
    lines.push(`Roll: ${String(cp.roll)} + ${String(cp.momentumModifier)} momentum = ${String(cp.modifiedResult)}`);
    lines.push(`Effect: ${cp.effect}`);

    if (cp.attackerSpellEffective) {
      const mod = cp.attackerCheckModifier !== 0
        ? ` (${cp.attackerCheckModifier >= 0 ? "+" : ""}${String(cp.attackerCheckModifier)} to check)`
        : "";
      lines.push(`${attackerName}'s spell takes effect${mod}`);
    } else {
      lines.push(`${attackerName}'s spell is negated`);
    }

    if (cp.defenderSpellEffective) {
      const mod = cp.defenderCheckModifier !== 0
        ? ` (${cp.defenderCheckModifier >= 0 ? "+" : ""}${String(cp.defenderCheckModifier)} to check)`
        : "";
      lines.push(`${defenderName}'s spell takes effect${mod}`);
    } else {
      lines.push(`${defenderName}'s spell is negated`);
    }
  }

  return lines.join("\n");
}

/**
 * Format the current state of a spell duel
 */
export function formatSpellDuelState(state: SpellDuelState): string {
  const lines: string[] = [];

  lines.push(`=== Spell Duel Status ===`);
  lines.push(`Active: ${state.active ? "Yes" : "No"}`);
  lines.push(`Exchanges: ${String(state.exchanges.length)}`);
  lines.push(``);
  lines.push(`Participants (by initiative):`);

  const ordered = getInitiativeOrder(state);
  for (const p of ordered) {
    lines.push(`  ${p.name} (${p.casterType}) - Init: ${String(p.initiative)}, Momentum: ${String(p.momentum)}`);
  }

  return lines.join("\n");
}
