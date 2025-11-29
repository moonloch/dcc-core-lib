/**
 * Patron Registry
 *
 * Registry for patron definitions loaded from external JSON.
 * Patrons are registered at application startup and looked up during play.
 */

import type {
  PatronDefinition,
  PatronLookupOptions,
} from "../types/patron.js";

// =============================================================================
// Registry State
// =============================================================================

/** Internal patron registry */
const patronRegistry = new Map<string, PatronDefinition>();

// =============================================================================
// Registration Functions
// =============================================================================

/**
 * Register a patron definition.
 *
 * @param patron - The patron definition to register
 * @throws Error if patron with same ID already exists
 */
export function registerPatron(patron: PatronDefinition): void {
  if (patronRegistry.has(patron.id)) {
    throw new Error(`Patron "${patron.id}" is already registered`);
  }
  patronRegistry.set(patron.id, patron);
}

/**
 * Register multiple patron definitions.
 *
 * @param patrons - Array of patron definitions to register
 */
export function registerPatrons(patrons: readonly PatronDefinition[]): void {
  for (const patron of patrons) {
    registerPatron(patron);
  }
}

/**
 * Clear all registered patrons.
 * Primarily for testing purposes.
 */
export function clearPatronRegistry(): void {
  patronRegistry.clear();
}

// =============================================================================
// Lookup Functions
// =============================================================================

/**
 * Get a patron by ID.
 *
 * @param patronId - The patron's unique identifier
 * @returns The patron definition, or undefined if not found
 */
export function getPatron(patronId: string): PatronDefinition | undefined {
  return patronRegistry.get(patronId);
}

/**
 * Get a patron by ID, throwing if not found.
 *
 * @param patronId - The patron's unique identifier
 * @returns The patron definition
 * @throws Error if patron is not registered
 */
export function requirePatron(patronId: string): PatronDefinition {
  const patron = patronRegistry.get(patronId);
  if (!patron) {
    throw new Error(`Patron "${patronId}" is not registered`);
  }
  return patron;
}

/**
 * Check if a patron is registered.
 *
 * @param patronId - The patron's unique identifier
 * @returns True if patron is registered
 */
export function hasPatron(patronId: string): boolean {
  return patronRegistry.has(patronId);
}

/**
 * Get all registered patron IDs.
 *
 * @returns Array of registered patron IDs
 */
export function getRegisteredPatronIds(): string[] {
  return Array.from(patronRegistry.keys());
}

/**
 * Get all registered patrons.
 *
 * @returns Array of all patron definitions
 */
export function getAllPatrons(): PatronDefinition[] {
  return Array.from(patronRegistry.values());
}

/**
 * Find patrons matching the given criteria.
 *
 * @param options - Lookup/filter options
 * @returns Array of matching patron definitions
 */
export function findPatrons(options: PatronLookupOptions): PatronDefinition[] {
  let results = getAllPatrons();

  if (options.alignment) {
    results = results.filter((p) => p.alignment === options.alignment);
  }

  if (options.domain) {
    results = results.filter((p) => p.domain === options.domain);
  }

  if (options.nameSearch) {
    const search = options.nameSearch.toLowerCase();
    results = results.filter((p) => p.name.toLowerCase().includes(search));
  }

  return results;
}

// =============================================================================
// Patron Data Accessors
// =============================================================================

/**
 * Get the invoke table ID for a patron.
 *
 * @param patronId - The patron's unique identifier
 * @returns The invoke table ID, or undefined if patron not found
 */
export function getPatronInvokeTableId(patronId: string): string | undefined {
  const patron = getPatron(patronId);
  return patron?.invokeTableId;
}

/**
 * Get the taint table ID for a patron.
 *
 * @param patronId - The patron's unique identifier
 * @returns The taint table ID, or undefined if patron not found
 */
export function getPatronTaintTableId(patronId: string): string | undefined {
  const patron = getPatron(patronId);
  return patron?.taintTableId;
}

/**
 * Get spells granted by a patron.
 *
 * @param patronId - The patron's unique identifier
 * @param casterLevel - Optional level filter (only return spells available at this level)
 * @returns Array of spell grant info
 */
export function getPatronSpells(
  patronId: string,
  casterLevel?: number
): PatronDefinition["grantedSpells"] {
  const patron = getPatron(patronId);
  if (!patron) return [];

  if (casterLevel === undefined) {
    return patron.grantedSpells;
  }

  return patron.grantedSpells.filter((spell) => spell.minLevel <= casterLevel);
}

/**
 * Get the number of registered patrons.
 *
 * @returns Number of registered patrons
 */
export function getPatronCount(): number {
  return patronRegistry.size;
}
