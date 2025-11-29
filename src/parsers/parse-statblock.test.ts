/**
 * Tests for NPC/Creature Stat Block Parser
 */

import { describe, it, expect } from "vitest";
import { parseStatBlock, parseStatBlocks } from "./parse-statblock.js";

/**
 * Test helper: asserts value is defined and returns it typed
 */
function defined<T>(value: T | undefined | null): T {
  expect(value).toBeDefined();
  return value as T;
}

describe("parseStatBlock", () => {
  describe("basic parsing", () => {
    it("parses a simple stat block", () => {
      const result = parseStatBlock(
        "Goblin: Init +1; Atk club +0 melee (1d4); AC 11; HD 1d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature).toBeDefined();
      expect(result.creature?.name).toBe("Goblin");
      expect(result.creature?.init).toBe(1);
      expect(result.creature?.ac).toBe(11);
      expect(result.creature?.hitDice).toBe("1d6");
      expect(result.creature?.speed.land).toBe("30'");
      expect(result.creature?.actionDice).toBe("1d20");
      expect(result.creature?.saves).toEqual({ fort: 3, ref: 4, will: -1 });
      expect(result.creature?.alignment).toBe("c");
      expect(result.creature?.attacks).toHaveLength(1);
      expect(result.creature?.attacks[0]).toEqual({
        name: "club",
        toHit: "+0",
        melee: true,
        damage: "1d4",
      });
    });

    it("parses multiple attacks joined with 'or'", () => {
      const result = parseStatBlock(
        "Road Reaver: Init +1; Atk hooked blade +3 melee (1d7+1) or throwing spear +2 missile fire (1d5); AC 14; HD 1d10; MV 25'; Act 1d20; SV Fort +2, Ref +4, Will -1; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.name).toBe("Road Reaver");
      expect(result.creature?.attacks).toHaveLength(2);
      expect(result.creature?.attacks[0]).toEqual({
        name: "hooked blade",
        toHit: "+3",
        melee: true,
        damage: "1d7+1",
      });
      expect(result.creature?.attacks[1]).toEqual({
        name: "throwing spear",
        toHit: "+2",
        melee: false,
        damage: "1d5",
      });
    });

    it("parses ranged weapon with range and special abilities", () => {
      const result = parseStatBlock(
        "Brass Sentinel: Init -3; Atk cudgel +3 melee (1d6) or spark rod +5 missile fire (range 50', 1d5+3); AC 17; HD 3d8+10; MV 25'; Act 1d20; SP darkvision 90', unaffected by sleep, mends 1 hp each turn; SV Fort +4, Ref -1, Will +5; AL N."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.name).toBe("Brass Sentinel");
      expect(result.creature?.init).toBe(-3);
      expect(result.creature?.hitDice).toBe("3d8+10");
      expect(result.creature?.hp).toBe(24); // Average of 3d8+10
      expect(result.creature?.special).toContain("darkvision 90'");
      expect(result.creature?.attacks).toHaveLength(2);
      expect(result.creature?.attacks[1]).toEqual({
        name: "spark rod",
        toHit: "+5",
        melee: false,
        damage: "1d5+3",
        range: "50'",
      });
    });
  });

  describe("movement parsing", () => {
    it("parses fly speed", () => {
      const result = parseStatBlock(
        "Wailing Shade: Init +3; Atk special (see below); AC 11; HD 2d10; MV fly 35'; Act 1d20; SV Fort +1, Ref +5, Will +4; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.speed.fly).toBe("35'");
      expect(result.creature?.speed.land).toBe("0'"); // No land speed
    });

    it("parses land or fly", () => {
      const result = parseStatBlock(
        "Rooftop Imp: Init +1; Atk talon +3 melee (1d5); AC 19; HD 2d6; MV 25' or fly 35'; Act 1d20; SV Fort +4, Ref +1, Will -1; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.speed.land).toBe("25'");
      expect(result.creature?.speed.fly).toBe("35'");
    });

    it("parses land, fly with comma", () => {
      const result = parseStatBlock(
        "Carrion Hag-bird: Init +1; Atk talons +2 melee (1d5); AC 12; HD 4d8; MV 25', fly 60'; Act 1d20; SV Fort +1, Ref +4, Will +5; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.speed.land).toBe("25'");
      expect(result.creature?.speed.fly).toBe("60'");
    });

    it("parses swim speed", () => {
      const result = parseStatBlock(
        "Marsh Lurker: Init -1; Atk trident +3 melee (1d7+2); AC 12; HD 2d8+1; MV 25' or swim 45'; Act 1d20; SV Fort -1, Ref +3, Will +2; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.speed.land).toBe("25'");
      expect(result.creature?.speed.swim).toBe("45'");
    });

    it("parses climb speed", () => {
      const result = parseStatBlock(
        "Cliff Spider (matriarch): Init -3; Atk fangs +1 melee (1d4); AC 13; HD 4d8+8; MV 15' or climb 20'; Act 1d20; SV Fort +5, Ref -3, Will +6; AL L."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.speed.land).toBe("15'");
      expect(result.creature?.speed.other).toContain("climb 20'");
    });

    it("parses jump and fly", () => {
      const result = parseStatBlock(
        "Bog Hopper: Init -2; Atk nip -1 melee (1d3); AC 12; HD 2d8; MV jump 60' or fly 20'; Act 1d20; SV Fort -1, Ref +3, Will -2; AL N."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.speed.fly).toBe("20'");
      expect(result.creature?.speed.other).toContain("jump 60'");
    });
  });

  describe("special abilities", () => {
    it("parses special abilities", () => {
      const result = parseStatBlock(
        "Temple Novice: Init -1; Atk staff +1 melee (1d5); AC 10; HD 1d6; MV 30'; Act 1d20; SP calm 1/day, minor blessing 3/day; SV Fort +0, Ref +1, Will +3; AL L."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.special).toBe("calm 1/day, minor blessing 3/day");
    });

    it("parses special attack as special ability", () => {
      const result = parseStatBlock(
        "Hedge Crone: Init -1; Atk knobbed stick -1 melee (1d3-1) or hex (see below) or spell; AC 10; HD 4d6; MV 25'; Act 1d20; SP raven companion, hex, spellcasting (+6 spell check); SV Fort +3, Ref +1, Will +7; AL C."
      );

      expect(result.success).toBe(true);
      // Special attacks should be converted to special abilities
      expect(result.creature?.special).toContain("hex");
      expect(result.creature?.special).toContain("spell");
      expect(result.creature?.special).toContain("raven companion");
    });
  });

  describe("action dice variations", () => {
    it("parses multiple action dice", () => {
      const result = parseStatBlock(
        "Twin-headed Mauler: Init +1; Atk wolf jaws +4 melee (2d5) or ram horns +3 melee (2d3); AC 17; HD 5d8+5; MV 35' or fly 25'; Act 2d20; SV Fort +4, Ref -2, Will +5; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.actionDice).toBe("3d20");
    });

    it("parses action dice with notes", () => {
      const result = parseStatBlock(
        "Serpent Knot: Init +3; Atk fangs +5 melee (1d8+3); AC 15; HD 1d12; MV 25', swim 35'; Act 1d20 per head; SV Fort +8, Ref +6, Will +4; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.actionDice).toBe("1d20 per head");
    });

    it("parses d24 action dice", () => {
      const result = parseStatBlock(
        "Titan, moss (11' tall, 1,050 lbs.): Init -1; Atk maul +13 melee (2d10+6); AC 15; HD 9d10; MV 35'; Act 1d24; SV Fort +9, Ref +4, Will +5; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.actionDice).toBe("1d24");
    });
  });

  describe("AC with notes", () => {
    it("parses AC with armor type", () => {
      const result = parseStatBlock(
        "Mercenary Captain: Init +1; Atk halberd +3 melee (1d10+1); AC 15 (banded mail); HD 2d8+2; MV 25'; Act 1d20; SV Fort +2, Ref +4, Will +1; AL L."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.ac).toBe(15);
    });
  });

  describe("alignment parsing", () => {
    it("parses lawful alignment", () => {
      const result = parseStatBlock(
        "Pack Mule: Init +0; Atk kick -1 melee (1d3); AC 10; HD 1d10+1; MV 35'; Act 1d20; SV Fort +2, Ref +4, Will -3; AL L."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.alignment).toBe("l");
    });

    it("parses neutral alignment", () => {
      const result = parseStatBlock(
        "Pack Mule: Init +0; Atk kick -1 melee (1d3); AC 10; HD 1d10+1; MV 35'; Act 1d20; SV Fort +2, Ref +4, Will -3; AL N."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.alignment).toBe("n");
    });

    it("parses chaotic alignment", () => {
      const result = parseStatBlock(
        "Goblin: Init +1; Atk club +0 melee (1d4); AC 11; HD 1d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.alignment).toBe("c");
    });

    it("parses 'varies' as neutral", () => {
      const result = parseStatBlock(
        "Baron: Init +0; Atk rapier +3 melee (1d6); AC 13; HD 2d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will +1; AL varies."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.alignment).toBe("n");
    });
  });

  describe("complex stat blocks", () => {
    it("parses 'then' damage chains with poison and DC text", () => {
      const result = parseStatBlock(
        "Shadow Cutthroat: Init +3; Atk venom stiletto +7 melee (1d10 then 1d5, plus venom) or venom needle +10 missile fire (1d6 then 1d4, plus venom); AC 13; HD 4d6; MV 30'; Act 2d20; SP venom (Fort DC 16 or paralysis for 1d6 hours, 1d4 Agl loss on successful save), stealth 60%; SV Fort +2, Ref +7, Will +3; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.name).toBe("Shadow Cutthroat");
      expect(result.creature?.actionDice).toBe("2d20");
      expect(result.creature?.attacks).toHaveLength(2);
      expect(result.creature?.attacks[0]?.damage).toContain("1d10");
    });

    it("parses size/weight prefix and missile attack with trailing range", () => {
      const result = parseStatBlock(
        "Titan, ash (15' tall, 2,400 lbs.): Init +2; Atk greataxe +19 melee (4d6+7) or flung boulder +11 missile fire (2d10+6, range 250'); AC 17; HD 13d10; MV 45'; Act 2d24; SV Fort +12, Ref +6, Will +10; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.name).toBe("Titan, ash (15' tall, 2,400 lbs.)");
      expect(result.creature?.attacks).toHaveLength(2);
      expect(result.creature?.attacks[1]?.range).toBe("250'");
    });

    it("parses multiple action dice with land and fly speeds", () => {
      const result = parseStatBlock(
        "Spined Wyvern: Init +4; Atk fangs +5 melee (1d10) or tail barb +3 melee (1d4); AC 15; HD 6d8+6; MV 35', fly 55'; Act 3d20; SV Fort +6, Ref +3, Will +5; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.actionDice).toBe("3d20");
      expect(result.creature?.speed.land).toBe("35'");
      expect(result.creature?.speed.fly).toBe("55'");
    });
  });

  describe("HP calculation", () => {
    it("calculates average HP for simple hit dice", () => {
      const result = parseStatBlock(
        "Goblin: Init +1; Atk club +0 melee (1d4); AC 11; HD 1d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.hp).toBe(4); // Average of 1d6 = 3.5, rounded to 4
    });

    it("calculates average HP with modifier", () => {
      const result = parseStatBlock(
        "Brass Sentinel: Init -3; Atk cudgel +3 melee (1d6); AC 17; HD 3d8+10; MV 25'; Act 1d20; SV Fort +4, Ref -1, Will +5; AL N."
      );

      expect(result.success).toBe(true);
      // 3d8 avg = 3 * 4.5 = 13.5, rounded = 14, + 10 = 24
      expect(result.creature?.hp).toBe(24);
    });
  });

  describe("edge cases", () => {
    it("handles negative initiative", () => {
      const result = parseStatBlock(
        "Field Hand: Init -3; Atk pitchfork -1 melee (1d4-1); AC 9; HD 1d5; MV 30'; Act 1d20; SV Fort +0, Ref -2, Will -1; AL N."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.init).toBe(-3);
      expect(result.creature?.attacks[0]?.toHit).toBe("-1");
    });

    it("handles missing semicolon before Atk", () => {
      // "Init -1 Atk" without a semicolon between the sections
      const result = parseStatBlock(
        "Marsh Lurker: Init -1 Atk trident +3 melee (1d7+2); AC 12; HD 2d8+1; MV 25' or swim 45'; Act 1d20; SV Fort -1, Ref +3, Will +2; AL C."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.init).toBe(-3);
      expect(result.creature?.attacks).toHaveLength(1);
    });

    it("handles dmg prefix in damage", () => {
      const result = parseStatBlock(
        "Cave Brute: Init +1; Atk fist +5 melee (dmg 1d6+2); AC 12; HD 3d8; MV 25'; Act 1d20; SV Fort +5, Ref +2, Will +0; AL L."
      );

      expect(result.success).toBe(true);
      expect(result.creature?.attacks[0]?.damage).toBe("1d6+2");
    });
  });

  describe("error handling", () => {
    it("returns error for empty string", () => {
      const result = parseStatBlock("");

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("returns error for string without creature name", () => {
      const result = parseStatBlock("Init +1; Atk club +0 melee (1d4); AC 11");

      expect(result.success).toBe(false);
      expect(result.error).toContain("name");
    });

    it("returns error for string without HD", () => {
      const result = parseStatBlock(
        "Goblin: Init +1; Atk club +0 melee (1d4); AC 11; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C."
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain("hit dice");
    });
  });

  describe("parseStatBlocks", () => {
    it("parses multiple stat blocks", () => {
      const text = `
Goblin: Init +1; Atk club +0 melee (1d4); AC 11; HD 1d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C.

Orc: Init +0; Atk sword +2 melee (1d8+1); AC 13; HD 1d8+2; MV 35'; Act 1d20; SV Fort +1, Ref +0, Will -1; AL C.
      `;

      const results = parseStatBlocks(text);

      expect(results).toHaveLength(2);
      expect(defined(results[0]).success).toBe(true);
      expect(defined(results[0]).creature?.name).toBe("Goblin");
      expect(defined(results[1]).success).toBe(true);
      expect(defined(results[1]).creature?.name).toBe("Orc");
    });
  });

  describe("options", () => {
    it("uses custom category", () => {
      const result = parseStatBlock(
        "Goblin: Init +1; Atk club +0 melee (1d4); AC 11; HD 1d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C.",
        { category: "Goblinoids" }
      );

      expect(result.success).toBe(true);
      expect(result.creature?.category).toBe("Goblinoids");
    });

    it("uses custom ID", () => {
      const result = parseStatBlock(
        "Goblin: Init +1; Atk club +0 melee (1d4); AC 11; HD 1d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C.",
        { id: "goblin-warrior" }
      );

      expect(result.success).toBe(true);
      expect(result.creature?.id).toBe("goblin-warrior");
    });

    it("uses default crit die and table", () => {
      const result = parseStatBlock(
        "Goblin: Init +1; Atk club +0 melee (1d4); AC 11; HD 1d6; MV 30'; Act 1d20; SV Fort +3, Ref +4, Will -1; AL C.",
        { defaultCritDie: "1d8", defaultCritTable: "III" }
      );

      expect(result.success).toBe(true);
      expect(result.creature?.critDie).toBe("1d8");
      expect(result.creature?.critTable).toBe("III");
    });
  });
});
