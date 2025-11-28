/**
 * Table Registry
 *
 * Functions for registering, loading, and retrieving tables.
 * Tables can be loaded from JSON or registered programmatically.
 */

import type {
  LookupTable,
  SimpleTable,
  MultiColumnTable,
  TieredTable,
  TableType,
} from "./types.js";
import { validateTable } from "./lookup.js";

// =============================================================================
// Table Registry State
// =============================================================================

/**
 * In-memory table storage.
 * In a real application, this might be loaded from files or a database.
 */
const tableRegistry = new Map<string, LookupTable>();

// =============================================================================
// Registration Functions
// =============================================================================

/**
 * Register a table in the registry.
 *
 * @param table - The table to register
 * @param options - Registration options
 * @throws If table ID already exists and overwrite is false
 */
export function registerTable(
  table: LookupTable,
  options: { overwrite?: boolean; validate?: boolean } = {}
): void {
  const { overwrite = false, validate = true } = options;

  if (!overwrite && tableRegistry.has(table.id)) {
    throw new Error(`Table with ID "${table.id}" already registered`);
  }

  if (validate) {
    const validation = validateTable(table);
    if (!validation.valid) {
      throw new Error(
        `Invalid table "${table.id}": ${validation.errors.join(", ")}`
      );
    }
  }

  tableRegistry.set(table.id, table);
}

/**
 * Register multiple tables at once.
 */
export function registerTables(
  tables: LookupTable[],
  options: { overwrite?: boolean; validate?: boolean } = {}
): void {
  for (const table of tables) {
    registerTable(table, options);
  }
}

/**
 * Unregister a table from the registry.
 */
export function unregisterTable(tableId: string): boolean {
  return tableRegistry.delete(tableId);
}

/**
 * Clear all registered tables.
 */
export function clearRegistry(): void {
  tableRegistry.clear();
}

// =============================================================================
// Retrieval Functions
// =============================================================================

/**
 * Get a table by ID.
 */
export function getTable(tableId: string): LookupTable | undefined {
  return tableRegistry.get(tableId);
}

/**
 * Get a table by ID, throwing if not found.
 */
export function requireTable(tableId: string): LookupTable {
  const table = tableRegistry.get(tableId);
  if (!table) {
    throw new Error(`Table "${tableId}" not found in registry`);
  }
  return table;
}

/**
 * Get a simple table by ID.
 */
export function getSimpleTable(tableId: string): SimpleTable | undefined {
  const table = tableRegistry.get(tableId);
  if (table?.type === "simple") {
    return table;
  }
  return undefined;
}

/**
 * Get a multi-column table by ID.
 */
export function getMultiColumnTable(
  tableId: string
): MultiColumnTable | undefined {
  const table = tableRegistry.get(tableId);
  if (table?.type === "multi-column") {
    return table;
  }
  return undefined;
}

/**
 * Get a tiered table by ID.
 */
export function getTieredTable(tableId: string): TieredTable | undefined {
  const table = tableRegistry.get(tableId);
  if (table?.type === "tiered") {
    return table;
  }
  return undefined;
}

/**
 * Check if a table exists in the registry.
 */
export function hasTable(tableId: string): boolean {
  return tableRegistry.has(tableId);
}

/**
 * Get all registered table IDs.
 */
export function getTableIds(): string[] {
  return Array.from(tableRegistry.keys());
}

/**
 * Get all tables of a specific type.
 */
export function getTablesByType(type: TableType): LookupTable[] {
  return Array.from(tableRegistry.values()).filter((t) => t.type === type);
}

/**
 * Get all tables with a specific tag.
 */
export function getTablesByTag(tag: string): LookupTable[] {
  return Array.from(tableRegistry.values()).filter((t) =>
    t.tags?.includes(tag)
  );
}

// =============================================================================
// JSON Loading
// =============================================================================

/**
 * Type guard for SimpleTable
 */
function isSimpleTable(data: unknown): data is SimpleTable {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as { type: unknown }).type === "simple" &&
    "entries" in data &&
    Array.isArray((data as { entries: unknown }).entries)
  );
}

/**
 * Type guard for MultiColumnTable
 */
function isMultiColumnTable(data: unknown): data is MultiColumnTable {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as { type: unknown }).type === "multi-column" &&
    "rows" in data &&
    Array.isArray((data as { rows: unknown }).rows)
  );
}

/**
 * Type guard for TieredTable
 */
function isTieredTable(data: unknown): data is TieredTable {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as { type: unknown }).type === "tiered" &&
    "entries" in data &&
    Array.isArray((data as { entries: unknown }).entries)
  );
}

/**
 * Parse a table from JSON data.
 *
 * @param data - Raw JSON data
 * @returns Parsed table or error
 */
export function parseTable(
  data: unknown
): { success: true; table: LookupTable } | { success: false; error: string } {
  if (typeof data !== "object" || data === null) {
    return { success: false, error: "Table data must be an object" };
  }

  const obj = data as Record<string, unknown>;

  if (!obj["id"] || typeof obj["id"] !== "string") {
    return { success: false, error: "Table must have a string 'id' field" };
  }

  if (!obj["name"] || typeof obj["name"] !== "string") {
    return { success: false, error: "Table must have a string 'name' field" };
  }

  if (!obj["type"] || typeof obj["type"] !== "string") {
    return { success: false, error: "Table must have a string 'type' field" };
  }

  if (isSimpleTable(data)) {
    return { success: true, table: data };
  }

  if (isMultiColumnTable(data)) {
    return { success: true, table: data };
  }

  if (isTieredTable(data)) {
    return { success: true, table: data };
  }

  return {
    success: false,
    error: `Unknown table type: ${obj["type"]}`,
  };
}

/**
 * Load a table from a JSON string.
 */
export function loadTableFromJson(
  json: string
): { success: true; table: LookupTable } | { success: false; error: string } {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { success: false, error: "Invalid JSON" };
  }

  return parseTable(data);
}

/**
 * Load and register a table from JSON.
 */
export function loadAndRegisterTable(
  json: string,
  options: { overwrite?: boolean; validate?: boolean } = {}
): { success: true; tableId: string } | { success: false; error: string } {
  const result = loadTableFromJson(json);
  if (!result.success) {
    return result;
  }

  try {
    registerTable(result.table, options);
    return { success: true, tableId: result.table.id };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

/**
 * Load multiple tables from a JSON array.
 */
export function loadTablesFromJson(
  json: string
): { success: true; tables: LookupTable[] } | { success: false; error: string } {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { success: false, error: "Invalid JSON" };
  }

  if (!Array.isArray(data)) {
    return { success: false, error: "Expected an array of tables" };
  }

  const tables: LookupTable[] = [];
  for (let i = 0; i < data.length; i++) {
    const result = parseTable(data[i]);
    if (!result.success) {
      return {
        success: false,
        error: `Table at index ${String(i)}: ${result.error}`,
      };
    }
    tables.push(result.table);
  }

  return { success: true, tables };
}
