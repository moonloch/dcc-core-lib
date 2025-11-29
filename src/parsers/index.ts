/**
 * Purple Sorcerer Parser Module
 *
 * Parses character data from Purple Sorcerer's generators.
 * Supports both text format (copy-paste) and JSON format (API/export).
 *
 * @example
 * ```typescript
 * import { parsePurpleSorcerer, convertPSCharacters } from "dcc-core-lib";
 *
 * // Parse text or JSON (auto-detected)
 * const result = parsePurpleSorcerer(inputData);
 *
 * if (result.success) {
 *   // Convert to library Character type
 *   const characters = convertPSCharacters(result.characters, {
 *     defaultName: "New Character",
 *   });
 * }
 * ```
 */

// Types
export type {
  PSCharacter,
  PSGeneratorSettings,
  PSAbilityScore,
  PSAbilityScores,
  PSWeapon,
  PSArmor,
  PSThiefSkill,
  PSSpell,
  PSLuckySign,
  PSClassType,
  PSParseResult,
  PSJsonZeroLevel,
  PSJsonCharacterList,
} from "./purple-sorcerer-types.js";

// Text parser
export { parsePurpleSorcererText } from "./parse-text.js";

// JSON parser
export { parsePurpleSorcererJson } from "./parse-json.js";

// Converter
export { convertPSCharacter, convertPSCharacters } from "./convert.js";
export type { ConvertOptions } from "./convert.js";

// =============================================================================
// Unified Parser (auto-detection)
// =============================================================================

import type { PSParseResult } from "./purple-sorcerer-types.js";
import { parsePurpleSorcererText } from "./parse-text.js";
import { parsePurpleSorcererJson } from "./parse-json.js";

/**
 * Detect if input is JSON format
 */
function isJsonFormat(input: string): boolean {
  const trimmed = input.trim();
  return trimmed.startsWith("{") || trimmed.startsWith("[");
}

/**
 * Parse Purple Sorcerer data (auto-detects format)
 *
 * Supports:
 * - Text format (copy-paste from Purple Sorcerer website)
 * - JSON format (export from Purple Sorcerer API)
 *
 * @param input - Text or JSON data from Purple Sorcerer
 * @returns Parse result with characters and any errors/warnings
 */
export function parsePurpleSorcerer(input: string): PSParseResult {
  if (!input.trim()) {
    return {
      success: false,
      characters: [],
      errors: ["Empty input"],
      warnings: [],
    };
  }

  if (isJsonFormat(input)) {
    return parsePurpleSorcererJson(input);
  }

  return parsePurpleSorcererText(input);
}
