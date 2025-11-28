/**
 * Spell System Module
 *
 * Core spell casting mechanics for DCC RPG.
 * Includes spell checks, spellbooks, spellburn, disapproval,
 * corruption, fumbles, and mercurial magic.
 */

// Core spell casting
export * from "./cast.js";

// Spellbook management
export * from "./spellbook.js";

// Wizard/Elf mechanics
export * from "./spellburn.js";
export * from "./corruption.js";
export * from "./fumble.js";
export * from "./mercurial.js";

// Cleric mechanics
export * from "./disapproval.js";
