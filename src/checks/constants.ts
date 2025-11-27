/**
 * Check Constants
 *
 * Namespaced identifiers for ability checks, saving throws, and skills.
 * The namespace prefix makes the check type explicit:
 *
 * - `ability:str` - Ability check using STR
 * - `save:reflex` - Reflex saving throw
 * - `skill:backstab` - Thief backstab skill
 *
 * @example
 * import { Ability, Save } from 'dcc-core-lib';
 *
 * rollCheck(Ability.STR, character);  // "ability:str"
 * rollCheck(Save.REF, character);     // "save:reflex"
 */

// =============================================================================
// Namespace Constants
// =============================================================================

/**
 * Check type namespaces
 */
export const CheckNamespace = {
  ABILITY: "ability",
  SAVE: "save",
  SKILL: "skill",
} as const;

export type CheckNamespaceType = (typeof CheckNamespace)[keyof typeof CheckNamespace];

// =============================================================================
// Ability Constants
// =============================================================================

/**
 * Standard DCC ability check identifiers (namespaced)
 *
 * @example
 * rollCheck(Ability.STR, character);  // rolls "ability:str"
 */
export const Ability = {
  STR: "ability:str",
  AGL: "ability:agl",
  STA: "ability:sta",
  PER: "ability:per",
  INT: "ability:int",
  LCK: "ability:lck",
} as const;

/**
 * Namespaced ability ID type
 */
export type AbilityCheckId = (typeof Ability)[keyof typeof Ability];

/**
 * Raw ability ID (without namespace)
 */
export type AbilityId = "str" | "agl" | "sta" | "per" | "int" | "lck";

// =============================================================================
// Save Constants
// =============================================================================

/**
 * Standard DCC saving throw identifiers (namespaced)
 *
 * @example
 * rollCheck(Save.REF, character);  // rolls "save:reflex"
 */
export const Save = {
  REF: "save:reflex",
  FORT: "save:fortitude",
  WIL: "save:will",
} as const;

/**
 * Namespaced save ID type
 */
export type SaveCheckId = (typeof Save)[keyof typeof Save];

/**
 * Raw save ID (without namespace)
 */
export type SaveId = "reflex" | "fortitude" | "will";

/**
 * Map from save ID to the ability that modifies it
 */
export const SAVE_ABILITY_MAP: Record<SaveId, AbilityId> = {
  reflex: "agl",
  fortitude: "sta",
  will: "per",
} as const;

// =============================================================================
// Parsing Utilities
// =============================================================================

/**
 * Parsed check ID with namespace and value
 */
export interface ParsedCheckId {
  namespace: CheckNamespaceType | null;
  value: string;
  raw: string;
}

/**
 * Parse a namespaced check ID
 *
 * @example
 * parseCheckId("ability:str")  // { namespace: "ability", value: "str", raw: "ability:str" }
 * parseCheckId("str")          // { namespace: null, value: "str", raw: "str" }
 */
export function parseCheckId(id: string): ParsedCheckId {
  const colonIndex = id.indexOf(":");
  if (colonIndex === -1) {
    return { namespace: null, value: id, raw: id };
  }

  const namespace = id.slice(0, colonIndex);
  const value = id.slice(colonIndex + 1);

  // Validate namespace
  const validNamespaces = Object.values(CheckNamespace) as string[];
  if (validNamespaces.includes(namespace)) {
    return {
      namespace: namespace as CheckNamespaceType,
      value,
      raw: id,
    };
  }

  // Unknown namespace - treat as non-namespaced
  return { namespace: null, value: id, raw: id };
}

/**
 * Create a namespaced check ID
 */
export function createCheckId(namespace: CheckNamespaceType, value: string): string {
  return `${namespace}:${value}`;
}

/**
 * Check if a string is a namespaced ability check ID
 */
export function isAbilityCheckId(id: string): id is AbilityCheckId {
  const parsed = parseCheckId(id);
  if (parsed.namespace !== "ability") return false;

  const validAbilities: AbilityId[] = ["str", "agl", "sta", "per", "int", "lck"];
  return validAbilities.includes(parsed.value as AbilityId);
}

/**
 * Check if a string is a namespaced save check ID
 */
export function isSaveCheckId(id: string): id is SaveCheckId {
  const parsed = parseCheckId(id);
  if (parsed.namespace !== "save") return false;

  const validSaves: SaveId[] = ["reflex", "fortitude", "will"];
  return validSaves.includes(parsed.value as SaveId);
}

/**
 * Check if a raw string (no namespace) is a valid ability ID
 */
export function isAbilityId(id: string): id is AbilityId {
  const validAbilities: AbilityId[] = ["str", "agl", "sta", "per", "int", "lck"];
  return validAbilities.includes(id as AbilityId);
}

/**
 * Check if a raw string (no namespace) is a valid save ID
 */
export function isSaveId(id: string): id is SaveId {
  const validSaves: SaveId[] = ["reflex", "fortitude", "will"];
  return validSaves.includes(id as SaveId);
}
