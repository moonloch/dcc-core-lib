/**
 * Disapproval Tests
 *
 * RAW (core rulebook, Table 5-7): the disapproval roll is 1d4 per point of
 * the natural spell-check roll, reduced by the cleric's Luck modifier.
 */

import { describe, it, expect, vi } from "vitest";
import type { SimpleTable } from "../tables/types.js";
import { CASTER_PROFILES } from "../types/spells.js";
import { calculateDisapprovalIncrease } from "./cast.js";
import {
  rollDisapproval,
  checkAndRollDisapproval,
  getExpectedSeverity,
} from "./disapproval.js";

// One row per value so every lookup is visible in the assertions.
const table: SimpleTable = {
  id: "disapproval",
  name: "Disapproval",
  type: "simple",
  entries: Array.from({ length: 20 }, (_, i) => ({
    min: i + 1,
    max: i + 1,
    text: `Row ${String(i + 1)}`,
  })),
};

describe("rollDisapproval", () => {
  it("reports a miss with an empty description when the roll is past the last row", () => {
    const result = rollDisapproval(10, 10, table, 0, { roller: () => 31 });

    expect(result.roll).toBe(31);
    expect(result.matched).toBe(false);
    expect(result.description).toBe("");
  });

  it("reports a match for a roll inside the table", () => {
    const result = rollDisapproval(2, 2, table, 0, { roller: () => 5 });

    expect(result.matched).toBe(true);
  });

  it("rolls one d4 per point of the natural roll", () => {
    const expressions: string[] = [];
    const result = rollDisapproval(3, 5, table, 0, {
      roller: (expression) => {
        expressions.push(expression);
        return 7;
      },
    });

    expect(expressions).toEqual(["3d4"]);
    expect(result.formula).toBe("3d4");
    expect(result.diceCount).toBe(3);
    expect(result.naturalRoll).toBe(3);
    expect(result.roll).toBe(7);
    expect(result.description).toBe("Row 7");
  });

  it("does not scale the roll by the disapproval range", () => {
    // Regression: the roll used to be 1d4 × range.
    const result = rollDisapproval(2, 6, table, 0, { roller: () => 4 });

    expect(result.formula).toBe("2d4");
    expect(result.roll).toBe(4);
    expect(result.disapprovalRange).toBe(6);
  });

  it("subtracts a positive Luck modifier", () => {
    const result = rollDisapproval(4, 4, table, 2, { roller: () => 10 });

    expect(result.roll).toBe(8);
    expect(result.luckModifier).toBe(2);
    expect(result.description).toBe("Row 8");
  });

  it("adds a negative Luck modifier", () => {
    const result = rollDisapproval(2, 2, table, -1, { roller: () => 5 });

    expect(result.roll).toBe(6);
    expect(result.description).toBe("Row 6");
  });

  it("looks up row 1 when Luck pushes the roll below 1, but reports the raw roll", () => {
    const result = rollDisapproval(1, 1, table, 2, { roller: () => 1 });

    expect(result.roll).toBe(-1);
    expect(result.description).toBe("Row 1");
  });

  it("rolls the die given by dieFaces", () => {
    const expressions: string[] = [];
    const result = rollDisapproval(3, 5, table, 1, {
      dieFaces: 10,
      roller: (expression) => {
        expressions.push(expression);
        return 21;
      },
    });

    expect(expressions).toEqual(["3d10"]);
    expect(result.formula).toBe("3d10");
    expect(result.roll).toBe(20);

    const random = vi.spyOn(Math, "random").mockReturnValue(0.999);
    expect(rollDisapproval(3, 3, table, 0, { dieFaces: 10 }).roll).toBe(30);
    random.mockRestore();
  });

  it("falls back to d4 when dieFaces is not a positive integer", () => {
    for (const dieFaces of [0, -2, 2.5, Number.NaN]) {
      expect(rollDisapproval(2, 2, table, 0, { dieFaces, roller: () => 3 }).formula).toBe("2d4");
    }
  });

  it("stays within Nd4 bounds with the built-in roller", () => {
    for (let i = 0; i < 200; i++) {
      const result = rollDisapproval(3, 3, table);
      expect(result.roll).toBeGreaterThanOrEqual(3);
      expect(result.roll).toBeLessThanOrEqual(12);
    }
  });
});

describe("checkAndRollDisapproval", () => {
  it("returns undefined when the natural roll is outside the range", () => {
    expect(checkAndRollDisapproval(4, 3, table, 0, { roller: () => 1 })).toBeUndefined();
  });

  it("rolls (natural)d4 minus Luck when inside the range", () => {
    const expressions: string[] = [];
    const result = checkAndRollDisapproval(3, 3, table, 1, {
      roller: (expression) => {
        expressions.push(expression);
        return 9;
      },
    });

    expect(expressions).toEqual(["3d4"]);
    expect(result?.roll).toBe(8);
  });
});

describe("getExpectedSeverity", () => {
  it("spans a natural 1 rolling 1 up to the range rolling all 4s", () => {
    // Range 5: best 1 (minor), worst 5d4 = 20 (catastrophic).
    expect(getExpectedSeverity(5)).toEqual({
      minimum: "minor",
      maximum: "catastrophic",
      average: "moderate", // mean natural 3 × 2.5 = 7.5 → 7
    });
  });

  it("is minor only at range 1", () => {
    expect(getExpectedSeverity(1)).toEqual({
      minimum: "minor",
      maximum: "minor",
      average: "minor",
    });
  });

  it("is reduced by the Luck modifier", () => {
    // Range 3, Luck +2: worst 12 − 2 = 10 (major) instead of 12.
    expect(getExpectedSeverity(3, 2).maximum).toBe("major");
  });

  it("uses the given die", () => {
    // Range 3 on d10s: worst 3d10 = 30, mean natural 2 × 5.5 = 11.
    expect(getExpectedSeverity(3, 0, 10)).toEqual({
      minimum: "minor",
      maximum: "catastrophic",
      average: "major",
    });
  });
});

describe("calculateDisapprovalIncrease", () => {
  const cleric = CASTER_PROFILES.cleric;

  it("counts any natural inside the range as one failed check", () => {
    expect(calculateDisapprovalIncrease(1, cleric, 4)).toBe(1);
    expect(calculateDisapprovalIncrease(3, cleric, 4)).toBe(1);
    expect(calculateDisapprovalIncrease(4, cleric, 4)).toBe(1);
  });

  it("does not count a natural outside the range", () => {
    expect(calculateDisapprovalIncrease(5, cleric, 4)).toBe(0);
  });

  it("only counts a natural 1 when no range is given", () => {
    expect(calculateDisapprovalIncrease(1, cleric)).toBe(1);
    expect(calculateDisapprovalIncrease(2, cleric)).toBe(0);
  });

  it("never counts for casters without disapproval", () => {
    expect(calculateDisapprovalIncrease(1, CASTER_PROFILES.wizard, 4)).toBe(0);
  });

  it("does not count when the profile turns off the increase on failure", () => {
    const profile = { ...cleric, disapprovalIncreasesOnFailure: false };
    expect(calculateDisapprovalIncrease(1, profile, 4)).toBe(0);
    expect(calculateDisapprovalIncrease(3, profile, 4)).toBe(0);
  });
});
