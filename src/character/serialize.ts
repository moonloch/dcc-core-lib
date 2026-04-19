/**
 * Character Serialization
 *
 * Functions for exporting and importing characters as JSON.
 */

import type { Character } from "../types/character.js";

/**
 * Current export format version.
 * Increment when making breaking changes to the format.
 *
 * 1.1 — dropped `ThiefState.backstabMultiplier` (DCC backstab is
 *       auto-crit + Table 1-9 attack bonus, not a damage multiplier).
 *       Legacy imports are migrated automatically on read.
 */
export const CHARACTER_FORMAT_VERSION = "1.1";

/**
 * Exported character wrapper with metadata.
 */
export interface ExportedCharacter {
  /** Format version for compatibility checking */
  version: string;

  /** Format identifier */
  format: "dcc-core-lib";

  /** Export timestamp (ISO 8601) */
  exportedAt: string;

  /** The character data */
  character: Character;
}

/**
 * Options for character export.
 */
export interface ExportOptions {
  /** Pretty print with indentation (default: true) */
  pretty?: boolean;

  /** Indentation spaces when pretty printing (default: 2) */
  indent?: number;
}

/**
 * Export a character to JSON string.
 *
 * @param character - The character to export
 * @param options - Export options
 * @returns JSON string representation
 */
export function exportCharacter(
  character: Character,
  options?: ExportOptions
): string {
  const pretty = options?.pretty ?? true;
  const indent = options?.indent ?? 2;

  const exported: ExportedCharacter = {
    version: CHARACTER_FORMAT_VERSION,
    format: "dcc-core-lib",
    exportedAt: new Date().toISOString(),
    character,
  };

  return JSON.stringify(exported, null, pretty ? indent : undefined);
}

/**
 * Export just the character data without wrapper metadata.
 *
 * @param character - The character to export
 * @param options - Export options
 * @returns JSON string of character data only
 */
export function exportCharacterRaw(
  character: Character,
  options?: ExportOptions
): string {
  const pretty = options?.pretty ?? true;
  const indent = options?.indent ?? 2;

  return JSON.stringify(character, null, pretty ? indent : undefined);
}

/**
 * Result of importing a character.
 */
export interface ImportResult {
  /** Whether the import was successful */
  success: boolean;

  /** The imported character (if successful) */
  character?: Character | undefined;

  /** Error message (if failed) */
  error?: string | undefined;

  /** Warnings about the import (e.g., version mismatch) */
  warnings?: string[] | undefined;
}

/**
 * Import a character from JSON string.
 *
 * Accepts both wrapped format (with metadata) and raw character JSON.
 *
 * @param json - JSON string to import
 * @returns Import result with character or error
 */
export function importCharacter(json: string): ImportResult {
  const warnings: string[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return {
      success: false,
      error: "Invalid JSON",
    };
  }

  if (typeof parsed !== "object" || parsed === null) {
    return {
      success: false,
      error: "JSON must be an object",
    };
  }

  const obj = parsed as Record<string, unknown>;

  // Check if this is a wrapped export or raw character
  let character: unknown;

  if (obj["format"] === "dcc-core-lib") {
    // Wrapped format
    const version = obj["version"];
    if (typeof version === "string" && version !== CHARACTER_FORMAT_VERSION) {
      warnings.push(
        `Version mismatch: file is v${version}, current is v${CHARACTER_FORMAT_VERSION}`
      );
    }
    character = obj["character"];
  } else if (obj["identity"] && obj["state"]) {
    // Raw character format
    character = obj;
  } else {
    return {
      success: false,
      error: "Unrecognized format: missing 'format' field or character structure",
    };
  }

  // Validate character structure
  const validation = validateCharacterStructure(character);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  // Strip fields that were removed from the schema in later versions
  // so stale data from v1.0 exports doesn't leak into runtime state.
  const migrated = migrateLegacyCharacter(character as Character);

  return {
    success: true,
    character: migrated,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Apply in-place migrations for legacy character exports.
 *
 * v1.0 → v1.1: Drop `thief.backstabMultiplier` (removed when backstab
 * was rewritten to the RAW auto-crit + attack-bonus model).
 */
function migrateLegacyCharacter(character: Character): Character {
  const thief = character.state.classState?.thief as
    | Record<string, unknown>
    | undefined;
  if (thief && "backstabMultiplier" in thief) {
    delete thief["backstabMultiplier"];
  }
  return character;
}

/**
 * Validation result for character structure.
 */
interface ValidationResult {
  valid: boolean;
  error?: string | undefined;
}

/**
 * Validate that an object has the required character structure.
 */
function validateCharacterStructure(obj: unknown): ValidationResult {
  if (typeof obj !== "object" || obj === null) {
    return { valid: false, error: "Character must be an object" };
  }

  const char = obj as Record<string, unknown>;

  // Check identity
  if (!char["identity"] || typeof char["identity"] !== "object") {
    return { valid: false, error: "Missing or invalid 'identity' field" };
  }

  const identity = char["identity"] as Record<string, unknown>;
  if (typeof identity["id"] !== "string") {
    return { valid: false, error: "Missing or invalid 'identity.id'" };
  }
  if (typeof identity["occupation"] !== "string") {
    return { valid: false, error: "Missing or invalid 'identity.occupation'" };
  }
  if (!identity["birthAugur"] || typeof identity["birthAugur"] !== "object") {
    return { valid: false, error: "Missing or invalid 'identity.birthAugur'" };
  }

  // Check state
  if (!char["state"] || typeof char["state"] !== "object") {
    return { valid: false, error: "Missing or invalid 'state' field" };
  }

  const state = char["state"] as Record<string, unknown>;
  if (!state["hp"] || typeof state["hp"] !== "object") {
    return { valid: false, error: "Missing or invalid 'state.hp'" };
  }
  if (!state["abilities"] || typeof state["abilities"] !== "object") {
    return { valid: false, error: "Missing or invalid 'state.abilities'" };
  }
  if (!state["combat"] || typeof state["combat"] !== "object") {
    return { valid: false, error: "Missing or invalid 'state.combat'" };
  }

  return { valid: true };
}

/**
 * Result of peeking at exported character metadata.
 */
export interface PeekResult {
  valid: boolean;
  version?: string | undefined;
  format?: string | undefined;
  exportedAt?: string | undefined;
  characterName?: string | undefined;
  occupation?: string | undefined;
  error?: string | undefined;
}

/**
 * Parse exported character metadata without importing the full character.
 * Useful for previewing before import.
 */
export function peekExportedCharacter(json: string): PeekResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { valid: false, error: "Invalid JSON" };
  }

  if (typeof parsed !== "object" || parsed === null) {
    return { valid: false, error: "JSON must be an object" };
  }

  const obj = parsed as Record<string, unknown>;

  if (obj["format"] === "dcc-core-lib") {
    const character = obj["character"] as Record<string, unknown> | undefined;
    const identity = character?.["identity"] as Record<string, unknown> | undefined;

    return {
      valid: true,
      version: obj["version"] as string | undefined,
      format: obj["format"] as string,
      exportedAt: obj["exportedAt"] as string | undefined,
      characterName: identity?.["name"] as string | undefined,
      occupation: identity?.["occupation"] as string | undefined,
    };
  }

  // Raw format
  if (obj["identity"] && obj["state"]) {
    const identity = obj["identity"] as Record<string, unknown>;
    return {
      valid: true,
      format: "raw",
      characterName: identity["name"] as string | undefined,
      occupation: identity["occupation"] as string | undefined,
    };
  }

  return { valid: false, error: "Unrecognized format" };
}
