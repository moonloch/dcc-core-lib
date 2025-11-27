/**
 * Class Progression Data Loader
 *
 * Loads and parses class progression data from external JSON sources.
 * Supports loading from file paths, URLs, or raw JSON objects.
 */

import type {
  ClassProgression,
  ProgressionLevelData,
  AlignmentLevelData,
  ProgressionAlignment,
} from "../../types/class-progression.js";
import type { DieType } from "../../types/dice.js";

/**
 * Raw skill value from source data (e.g., "+3" or "d12")
 */
type RawSkillValue = string;

/**
 * Raw level data as it appears in source JSON
 */
export interface RawClassLevelData {
  class: string;
  level: string;
  levelData: string;
  levelDataLawful?: string;
  levelDataNeutral?: string;
  levelDataChaotic?: string;
}

/**
 * Parse a key=value string into a record
 */
function parseKeyValueString(data: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = data.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex);
    const value = trimmed.slice(eqIndex + 1);
    result[key] = value;
  }

  return result;
}

/**
 * Parse a skill value string to number or die type
 */
function parseSkillValue(value: RawSkillValue): number | DieType {
  // Check if it's a die (starts with 'd')
  if (value.startsWith("d") || value.startsWith("+d") || value.startsWith("-d")) {
    const dieMatch = /d\d+/.exec(value);
    if (dieMatch) {
      return dieMatch[0] as DieType;
    }
  }

  // Otherwise parse as number
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
}

/**
 * Parse alignment-specific level data
 */
function parseAlignmentData(data: string): AlignmentLevelData | undefined {
  if (!data) return undefined;

  const parsed = parseKeyValueString(data);
  const skills: Record<string, number | DieType> = {};
  let title = "";

  for (const [key, value] of Object.entries(parsed)) {
    if (key === "system.details.title.value") {
      title = value;
    } else if (key.startsWith("system.skills.")) {
      // Extract skill name: system.skills.sneakSilently.value -> sneakSilently
      const match = /system\.skills\.(\w+)\.(?:value|die)/.exec(key);
      if (match?.[1]) {
        const skillId = camelToKebab(match[1]);
        skills[skillId] = parseSkillValue(value);
      }
    } else if (key === "system.class.backstab") {
      skills["backstab"] = parseSkillValue(value);
    }
  }

  return { title, skills };
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Parse base level data
 */
function parseBaseLevelData(data: string): Partial<ProgressionLevelData> {
  const parsed = parseKeyValueString(data);
  const result: Partial<ProgressionLevelData> = {
    saves: { ref: 0, frt: 0, wil: 0 },
    actionDice: [],
  };

  for (const [key, value] of Object.entries(parsed)) {
    switch (key) {
      case "system.details.attackBonus":
        result.attackBonus = parseSkillValue(value);
        break;
      case "system.attributes.critical.die":
        result.criticalDie = value;
        break;
      case "system.attributes.critical.table":
        result.criticalTable = value;
        break;
      case "system.attributes.actionDice.value":
        result.actionDice = value.split(",").map((d) => d.trim());
        break;
      case "system.attributes.hitDice.value":
        result.hitDie = value as DieType;
        break;
      case "system.class.luckDie":
        result.luckDie = value as DieType;
        break;
      case "system.details.critRange":
        result.critRange = parseInt(value, 10);
        break;
      case "system.saves.ref.classBonus":
        if (result.saves) result.saves.ref = parseSkillValue(value) as number;
        break;
      case "system.saves.frt.classBonus":
        if (result.saves) result.saves.frt = parseSkillValue(value) as number;
        break;
      case "system.saves.wil.classBonus":
        if (result.saves) result.saves.wil = parseSkillValue(value) as number;
        break;
    }
  }

  return result;
}

/**
 * Parse a single level's raw data into ProgressionLevelData
 */
export function parseClassLevel(raw: RawClassLevelData): ProgressionLevelData {
  const base = parseBaseLevelData(raw.levelData);

  const levelData: ProgressionLevelData = {
    attackBonus: base.attackBonus ?? 0,
    criticalDie: base.criticalDie ?? "1d8",
    criticalTable: base.criticalTable ?? "I",
    actionDice: base.actionDice ?? ["1d20"],
    hitDie: base.hitDie ?? "d6",
    saves: base.saves ?? { ref: 0, frt: 0, wil: 0 },
  };

  if (base.luckDie) levelData.luckDie = base.luckDie;
  if (base.critRange) levelData.critRange = base.critRange;

  // Conditionally assign alignment data (exactOptionalPropertyTypes)
  const lawfulData = raw.levelDataLawful
    ? parseAlignmentData(raw.levelDataLawful)
    : undefined;
  const neutralData = raw.levelDataNeutral
    ? parseAlignmentData(raw.levelDataNeutral)
    : undefined;
  const chaoticData = raw.levelDataChaotic
    ? parseAlignmentData(raw.levelDataChaotic)
    : undefined;

  if (lawfulData) levelData.lawful = lawfulData;
  if (neutralData) levelData.neutral = neutralData;
  if (chaoticData) levelData.chaotic = chaoticData;

  return levelData;
}

/**
 * Load class progression from an array of raw level data
 */
export function loadClassProgression(
  classId: string,
  name: string,
  skills: string[],
  rawLevels: RawClassLevelData[]
): ClassProgression {
  const levels: Record<number, ProgressionLevelData> = {};

  for (const raw of rawLevels) {
    const level = parseInt(raw.level, 10);
    if (!isNaN(level)) {
      levels[level] = parseClassLevel(raw);
    }
  }

  return {
    classId,
    name,
    skills,
    levels,
  };
}

/**
 * Get skill bonus for a character from progression data
 */
export function getSkillBonusFromProgression(
  progression: ClassProgression,
  level: number,
  alignment: ProgressionAlignment,
  skillId: string
): number | DieType | undefined {
  const levelData = progression.levels[level];
  if (!levelData) return undefined;

  const alignmentData = levelData[alignment];
  if (!alignmentData) return undefined;

  return alignmentData.skills[skillId];
}
