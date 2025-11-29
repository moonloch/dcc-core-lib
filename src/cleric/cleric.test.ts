/**
 * Tests for Cleric Abilities
 */

import { describe, it, expect, vi } from "vitest";
import {
  turnUnholy,
  getTurnUnholyModifier,
  getTurnUnholyDie,
  resolveHDExpression,
  calculateAverageHD,
  TURN_UNHOLY_SKILL,
} from "./turn-unholy.js";
import {
  layOnHands,
  getLayOnHandsModifier,
  getLayOnHandsDie,
  calculateHPHealed,
  getMaxHealing,
  LAY_ON_HANDS_SKILL,
} from "./lay-on-hands.js";
import { TEST_TURN_UNHOLY_TABLE } from "../data/tables/test-turn-unholy.js";
import { TEST_LAY_ON_HANDS_TABLE } from "../data/tables/test-lay-on-hands.js";

/** Create a mock roller that returns a fixed value */
function mockRoller(value: number) {
  return vi.fn().mockReturnValue(value);
}

// =============================================================================
// Turn Unholy Tests
// =============================================================================

describe("Turn Unholy", () => {
  describe("TURN_UNHOLY_SKILL definition", () => {
    it("has correct id and type", () => {
      expect(TURN_UNHOLY_SKILL.id).toBe("turn-unholy");
      expect(TURN_UNHOLY_SKILL.type).toBe("check");
    });

    it("uses d20 with Personality", () => {
      expect(TURN_UNHOLY_SKILL.roll?.die).toBe("d20");
      expect(TURN_UNHOLY_SKILL.roll?.ability).toBe("per");
    });

    it("adds full level to roll", () => {
      expect(TURN_UNHOLY_SKILL.roll?.levelModifier).toBe("full");
    });

    it("allows luck", () => {
      expect(TURN_UNHOLY_SKILL.roll?.allowLuck).toBe(true);
    });
  });

  describe("turnUnholy", () => {
    it("performs a skill check with level and personality", () => {
      const result = turnUnholy(
        { level: 3, personality: 16 },
        TEST_TURN_UNHOLY_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=3, PER 16 (+2), total = 15
      expect(result.check.total).toBe(15);
      expect(result.check.modifiers).toHaveLength(2);
    });

    it("returns failure for low rolls", () => {
      const result = turnUnholy(
        { level: 1, personality: 10 },
        TEST_TURN_UNHOLY_TABLE,
        { mode: "evaluate", roller: mockRoller(5) }
      );

      // With d20=5, level=1, PER 10 (+0), total = 6
      expect(result.check.total).toBe(6);
      expect(result.success).toBe(false);
      expect(result.effect.type).toBe("none");
    });

    it("returns success for moderate rolls", () => {
      const result = turnUnholy(
        { level: 3, personality: 14 },
        TEST_TURN_UNHOLY_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=3, PER 14 (+1), total = 14
      expect(result.check.total).toBe(14);
      expect(result.success).toBe(true);
      expect(result.effect.type).toBe("turn");
    });

    it("returns destroy effect for high rolls", () => {
      const result = turnUnholy(
        { level: 5, personality: 18 },
        TEST_TURN_UNHOLY_TABLE,
        { mode: "evaluate", roller: mockRoller(15) }
      );

      // With d20=15, level=5, PER 18 (+3), total = 23
      expect(result.check.total).toBe(23);
      expect(result.success).toBe(true);
      expect(result.effect.type).toBe("turn-destroy");
    });

    it("includes HD affected in effect", () => {
      const result = turnUnholy(
        { level: 3, personality: 16 },
        TEST_TURN_UNHOLY_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      expect(result.effect.hdAffected).toBeDefined();
    });

    it("applies luck burn", () => {
      const result = turnUnholy(
        { level: 1, personality: 10, luck: 14, luckBurn: 2 },
        TEST_TURN_UNHOLY_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=1, PER 10 (+0), luck burn 2, total = 13
      expect(result.check.total).toBe(13);
      expect(result.check.modifiers.some((m) => m.source === "luck")).toBe(true);
    });
  });

  describe("getTurnUnholyModifier", () => {
    it("returns level plus personality modifier", () => {
      expect(getTurnUnholyModifier(3, 16)).toBe(5); // 3 + 2
      expect(getTurnUnholyModifier(5, 10)).toBe(5); // 5 + 0
      expect(getTurnUnholyModifier(1, 8)).toBe(0); // 1 + (-1)
    });
  });

  describe("getTurnUnholyDie", () => {
    it("returns d20", () => {
      expect(getTurnUnholyDie()).toBe("d20");
    });
  });

  describe("resolveHDExpression", () => {
    it("replaces CL with level", () => {
      expect(resolveHDExpression("1d6+CL", 5)).toBe("1d6+5");
      expect(resolveHDExpression("1d8+CL", 3)).toBe("1d8+3");
      expect(resolveHDExpression("CL", 7)).toBe("7");
    });

    it("handles expressions without CL", () => {
      expect(resolveHDExpression("1d4", 5)).toBe("1d4");
      expect(resolveHDExpression("2d6", 3)).toBe("2d6");
    });
  });

  describe("calculateAverageHD", () => {
    it("calculates average for dice expressions", () => {
      expect(calculateAverageHD("1d6")).toBe(3.5);
      expect(calculateAverageHD("2d6")).toBe(7);
      expect(calculateAverageHD("1d8")).toBe(4.5);
    });

    it("handles modifiers", () => {
      expect(calculateAverageHD("1d6+3")).toBe(6.5);
      expect(calculateAverageHD("1d8+5")).toBe(9.5);
    });

    it("handles plain numbers", () => {
      expect(calculateAverageHD("5")).toBe(5);
      expect(calculateAverageHD("10")).toBe(10);
    });
  });
});

// =============================================================================
// Lay on Hands Tests
// =============================================================================

describe("Lay on Hands", () => {
  describe("LAY_ON_HANDS_SKILL definition", () => {
    it("has correct id and type", () => {
      expect(LAY_ON_HANDS_SKILL.id).toBe("lay-on-hands");
      expect(LAY_ON_HANDS_SKILL.type).toBe("check");
    });

    it("uses d20 with Personality", () => {
      expect(LAY_ON_HANDS_SKILL.roll?.die).toBe("d20");
      expect(LAY_ON_HANDS_SKILL.roll?.ability).toBe("per");
    });

    it("adds full level to roll", () => {
      expect(LAY_ON_HANDS_SKILL.roll?.levelModifier).toBe("full");
    });

    it("allows luck", () => {
      expect(LAY_ON_HANDS_SKILL.roll?.allowLuck).toBe(true);
    });
  });

  describe("layOnHands", () => {
    it("performs a skill check with level and personality", () => {
      const result = layOnHands(
        { level: 3, personality: 16 },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=3, PER 16 (+2), total = 15
      expect(result.check.total).toBe(15);
      expect(result.check.modifiers).toHaveLength(2);
    });

    it("returns failure for low rolls", () => {
      const result = layOnHands(
        { level: 1, personality: 10 },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(5) }
      );

      // With d20=5, level=1, PER 10 (+0), total = 6
      expect(result.check.total).toBe(6);
      expect(result.success).toBe(false);
      expect(result.effect.type).toBe("none");
    });

    it("returns healing for moderate rolls", () => {
      const result = layOnHands(
        { level: 3, personality: 14 },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=3, PER 14 (+1), total = 14
      expect(result.check.total).toBe(14);
      expect(result.success).toBe(true);
      expect(result.effect.type).toBe("heal");
    });

    it("returns cure effects for high rolls", () => {
      const result = layOnHands(
        { level: 5, personality: 18 },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(15) }
      );

      // With d20=15, level=5, PER 18 (+3), total = 23
      expect(result.check.total).toBe(23);
      expect(result.success).toBe(true);
      expect(result.effect.type).toBe("heal-cure");
    });

    it("includes HP healed in result", () => {
      const result = layOnHands(
        { level: 3, personality: 16 },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      expect(result.hpHealed).toBeDefined();
    });

    it("applies self-healing penalty", () => {
      const result = layOnHands(
        { level: 3, personality: 16, healingSelf: true },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=3, PER 16 (+2), self-heal -4, total = 11
      expect(result.check.total).toBe(11);
      expect(result.check.modifiers.some((m) => m.source === "self-healing")).toBe(true);
    });

    it("applies same alignment bonus", () => {
      const result = layOnHands(
        {
          level: 3,
          personality: 16,
          alignmentMod: { sameAlignment: true, oppositeAlignment: false },
        },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=3, PER 16 (+2), same alignment +2, total = 17
      expect(result.check.total).toBe(17);
      expect(result.check.modifiers.some((m) => m.source === "alignment")).toBe(true);
    });

    it("applies opposite alignment penalty", () => {
      const result = layOnHands(
        {
          level: 3,
          personality: 16,
          alignmentMod: { sameAlignment: false, oppositeAlignment: true },
        },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=3, PER 16 (+2), opposite alignment -2, total = 13
      expect(result.check.total).toBe(13);
    });

    it("applies luck burn", () => {
      const result = layOnHands(
        { level: 1, personality: 10, luck: 14, luckBurn: 2 },
        TEST_LAY_ON_HANDS_TABLE,
        { mode: "evaluate", roller: mockRoller(10) }
      );

      // With d20=10, level=1, PER 10 (+0), luck burn 2, total = 13
      expect(result.check.total).toBe(13);
    });
  });

  describe("getLayOnHandsModifier", () => {
    it("returns level plus personality modifier", () => {
      expect(getLayOnHandsModifier(3, 16)).toBe(5); // 3 + 2
      expect(getLayOnHandsModifier(5, 10)).toBe(5); // 5 + 0
      expect(getLayOnHandsModifier(1, 8)).toBe(0); // 1 + (-1)
    });

    it("includes self-healing penalty", () => {
      expect(getLayOnHandsModifier(3, 16, true)).toBe(1); // 3 + 2 - 4
      expect(getLayOnHandsModifier(5, 10, true)).toBe(1); // 5 + 0 - 4
    });
  });

  describe("getLayOnHandsDie", () => {
    it("returns d20", () => {
      expect(getLayOnHandsDie()).toBe("d20");
    });
  });

  describe("calculateHPHealed", () => {
    it("handles CL multiplier format", () => {
      expect(calculateHPHealed("1*CL", 5)).toBe(5);
      expect(calculateHPHealed("2*CL", 5)).toBe(10);
      expect(calculateHPHealed("3*CL", 5)).toBe(15);
    });

    it("handles dice expressions (returns average)", () => {
      expect(calculateHPHealed("1d6", 5)).toBe(3); // floor(3.5)
      expect(calculateHPHealed("2d6", 5)).toBe(7);
    });

    it("handles plain numbers", () => {
      expect(calculateHPHealed("5", 3)).toBe(5);
      expect(calculateHPHealed("10", 3)).toBe(10);
    });
  });

  describe("getMaxHealing", () => {
    it("returns level times max multiplier", () => {
      expect(getMaxHealing(5)).toBe(40); // 5 * 8
      expect(getMaxHealing(3)).toBe(24); // 3 * 8
      expect(getMaxHealing(10)).toBe(80); // 10 * 8
    });

    it("accepts custom max multiplier", () => {
      expect(getMaxHealing(5, 10)).toBe(50); // 5 * 10
    });
  });
});
