# Event System Documentation

The dcc-core-lib uses a **callback injection pattern** for events. Functions that produce events accept an optional `events` parameter containing callback functions. This approach:

- Keeps the library framework-agnostic (no EventEmitter dependency)
- Allows selective subscription (only provide callbacks you need)
- Makes testing easy (callbacks are just functions)
- Works in any JavaScript environment (browser, Node.js, Deno, etc.)

## Usage Pattern

```typescript
import { resolveSkillCheck } from "dcc-core-lib";

// Pass callbacks for events you care about
const result = resolveSkillCheck(input, options, {
  onSkillCheckStart: (input) => console.log("Starting:", input.skill.name),
  onCritical: (result) => playSound("critical.mp3"),
  onFumble: (result) => playSound("fumble.mp3"),
  onSkillCheckComplete: (result) => updateUI(result),
});
```

## Event Interfaces

### SkillEvents

Used by `resolveSkillCheck()` and skill-based functions.

```typescript
interface SkillEvents {
  onSkillCheckStart?: (input: SkillCheckInput) => void;
  onSkillCheckComplete?: (result: SkillCheckResult) => void;
  onCritical?: (result: SkillCheckResult) => void;
  onFumble?: (result: SkillCheckResult) => void;
  onResourceConsumed?: (resource: ResourceType, amount: number) => void;
  onTableLookup?: (result: TableLookupResult) => void;
}
```

| Event | When Fired | Payload |
|-------|------------|---------|
| `onSkillCheckStart` | Before rolling | `SkillCheckInput` - skill, abilities, level, modifiers |
| `onSkillCheckComplete` | After all processing | `SkillCheckResult` - full result with rolls, modifiers, effects |
| `onCritical` | Natural 20 rolled | `SkillCheckResult` - result with `critical: true` |
| `onFumble` | Natural 1 rolled | `SkillCheckResult` - result with `fumble: true` |
| `onResourceConsumed` | Luck burned or other cost paid | `ResourceType` ("luck", etc.), `amount` |
| `onTableLookup` | Table result determined | `TableLookupResult` - tableId, rollValue, text, data |

### CombatEvents

Used by combat functions (`makeAttackRoll()`, `rollCritical()`, `rollFumble()`, etc.)

```typescript
interface CombatEvents {
  onAttackRoll?: (result: AttackResult) => void;
  onCriticalThreat?: (result: AttackResult) => void;
  onFumbleRoll?: (result: AttackResult) => void;
  onDamageRoll?: (result: DamageResult) => void;
  onCriticalResult?: (result: CriticalResult) => void;
  onFumbleResult?: (result: FumbleResult) => void;
  onInitiativeRoll?: (result: InitiativeResult) => void;
  onDeedAttempt?: (deedRoll: RollResult, success: boolean) => void;
}
```

| Event | When Fired | Payload |
|-------|------------|---------|
| `onAttackRoll` | Attack roll completed | `AttackResult` - roll, bonus, total, hit status |
| `onCriticalThreat` | Roll meets/exceeds threat range | `AttackResult` with `isCriticalThreat: true` |
| `onFumbleRoll` | Natural 1 on attack | `AttackResult` with `isFumble: true` |
| `onDamageRoll` | Damage calculated | `DamageResult` - dice, modifiers, multiplier, total |
| `onCriticalResult` | Crit table lookup done | `CriticalResult` - table, roll, effect, extra damage |
| `onFumbleResult` | Fumble table lookup done | `FumbleResult` - fumbleDie, roll, effect |
| `onInitiativeRoll` | Initiative rolled | `InitiativeResult` - roll, total, modifiers |
| `onDeedAttempt` | Warrior/dwarf deed die rolled | `RollResult`, `success` (true if 3+) |

### SpellEvents

Used by `castSpell()`, `calculateSpellCheck()`, and spell-related functions.

```typescript
interface SpellEvents {
  onSpellCheckStart?: (input: SpellCastInput) => void;
  onSpellCheckComplete?: (result: SpellCastResult) => void;
  onCritical?: (result: SpellCastResult) => void;
  onFumble?: (result: SpellCastResult) => void;
  onSpellLost?: (result: SpellCastResult) => void;
  onCorruptionTriggered?: (result: SpellCastResult, corruption: CorruptionResult) => void;
  onDisapprovalIncreased?: (result: SpellCastResult, newRange: number) => void;
  onSpellburnApplied?: (burn: SpellburnCommitment) => void;
  onMercurialEffect?: (effect: MercurialEffect, result: SpellCastResult) => void;
  onPatronTaint?: (result: SpellCastResult, taint: PatronTaintResult) => void;
}
```

| Event | When Fired | Payload |
|-------|------------|---------|
| `onSpellCheckStart` | Before spell check roll | `SpellCastInput` - spell, caster info, modifiers |
| `onSpellCheckComplete` | After all processing | `SpellCastResult` - full result with tier, effects |
| `onCritical` | Natural 20 on spell check | `SpellCastResult` with `critical: true` |
| `onFumble` | Natural 1 on spell check | `SpellCastResult` with `fumble: true` |
| `onSpellLost` | Spell lost for the day | `SpellCastResult` with `spellLost: true` |
| `onCorruptionTriggered` | Wizard/elf gains corruption | `SpellCastResult`, `CorruptionResult` |
| `onDisapprovalIncreased` | Cleric disapproval range grows | `SpellCastResult`, new range (number) |
| `onSpellburnApplied` | Spellburn points committed | `SpellburnCommitment` (str, agl, sta) |
| `onMercurialEffect` | Mercurial magic triggers | `MercurialEffect`, `SpellCastResult` |
| `onPatronTaint` | Patron taint rolled | `SpellCastResult`, `PatronTaintResult` |

## Payload Types Reference

### SkillCheckInput

```typescript
interface SkillCheckInput {
  skill: SkillDefinition;      // The skill being used
  abilities: Record<string, number>;  // Character's ability scores
  level: number;               // Character's level
  classId?: string;            // Character's class
  situationalModifiers?: RollModifier[];
  luck?: number;               // Current luck score
  luckBurn?: number;           // Luck to burn on this roll
}
```

### SkillCheckResult

```typescript
interface SkillCheckResult {
  skillId: string;             // Skill that was used
  die: DieType;                // Die rolled (e.g., "d20")
  natural?: number;            // Natural roll result
  modifiers: RollModifier[];   // All modifiers applied
  total?: number;              // Final total
  formula: string;             // Roll formula (e.g., "1d20+3")
  tableResult?: TableLookupResult;  // Table lookup result
  success?: boolean;           // Whether check succeeded
  critical?: boolean;          // Was this a crit?
  fumble?: boolean;            // Was this a fumble?
  effects?: SkillEffect[];     // Effects produced
  resourcesConsumed?: { resource: ResourceType; amount: number }[];
}
```

### AttackResult

```typescript
interface AttackResult {
  roll: RollResult;            // The attack roll
  deedRoll?: RollResult;       // Deed die result (warrior/dwarf)
  totalBonus: number;          // Total attack bonus
  total: number;               // Final attack total
  isCriticalThreat: boolean;   // Roll meets threat range?
  isFumble: boolean;           // Natural 1?
  isHit?: boolean;             // Hit the target? (if AC provided)
  appliedModifiers: RollModifier[];
  deedSuccess?: boolean;       // Deed roll >= 3?
}
```

### DamageResult

```typescript
interface DamageResult {
  roll: RollResult;            // Damage roll
  baseDamage: number;          // Dice result
  modifierDamage: number;      // Str, deed, magic, etc.
  total: number;               // Final damage
  breakdown: DamageBreakdown[];  // Source breakdown
}
```

### CriticalResult

```typescript
interface CriticalResult {
  roll: RollResult;            // Crit table roll
  total: number;               // Total (die + modifiers)
  critTable: CritTableId;      // Table used (I-V)
  tableResult?: string;        // Table text result
  extraDamageDice?: string;    // Extra damage (e.g., "2d6")
  extraDamageModifier?: number;
  effect?: string;             // Special effect description
}
```

### FumbleResult

```typescript
interface FumbleResult {
  roll: RollResult;            // Fumble table roll
  total: number;               // Total (die - luck, min 0)
  fumbleDie: DieType;          // Die used (by armor type)
  tableResult?: string;        // Table text result
  effect?: string;             // Effect description
}
```

### SpellCastResult

```typescript
interface SpellCastResult {
  spellId: string;             // Spell cast
  die: DieType;                // Check die
  natural?: number;            // Natural roll
  total?: number;              // Total check result
  formula: string;             // Roll formula
  modifiers: RollModifier[];   // All modifiers
  critical: boolean;           // Natural 20?
  fumble: boolean;             // Natural 1?
  tier?: ResultTier;           // Result tier (lost/failure/success-X)
  resultText?: string;         // Table result text
  effect?: TableEffect;        // Structured effect
  spellLost: boolean;          // Spell lost for the day?
  corruptionTriggered: boolean;
  corruptionResult?: CorruptionResult;
  fumbleResult?: SpellFumbleResult;
  patronTaintResult?: PatronTaintResult;
  disapprovalIncrease: number;
  newDisapprovalRange?: number;
  mercurialEffect?: MercurialEffect;
  spellburnApplied?: SpellburnCommitment;
  luckBurned: number;
  manifestation?: string;
}
```

### CorruptionResult

```typescript
interface CorruptionResult {
  roll: number;                // Table roll
  description: string;         // Corruption effect
  effect?: TableEffect;        // Structured effect
  permanent: boolean;          // Most corruptions are permanent
  tier?: "minor" | "major" | "greater";
}
```

### SpellburnCommitment

```typescript
interface SpellburnCommitment {
  str: number;   // Strength points burned
  agl: number;   // Agility points burned
  sta: number;   // Stamina points burned
}
```

### MercurialEffect

```typescript
interface MercurialEffect {
  rollValue: number;           // d100 + luck mod * 10
  summary: string;             // Short description
  description: string;         // Full description
  displayOnCast: boolean;      // Show in chat?
  effect?: MercurialEffectData;  // Structured data
}
```

### PatronTaintResult

```typescript
interface PatronTaintResult {
  roll: number;                // Table roll
  patronId: string;            // Patron that caused taint
  description: string;         // Taint effect
  effect?: TableEffect;        // Structured effect
}
```

## Example Adapters

### Node.js EventEmitter Adapter

```typescript
import { EventEmitter } from "events";
import type { SkillEvents, CombatEvents, SpellEvents } from "dcc-core-lib";

/**
 * Create SkillEvents that emit to an EventEmitter
 */
export function createSkillEventEmitter(emitter: EventEmitter): SkillEvents {
  return {
    onSkillCheckStart: (input) => emitter.emit("skill:start", input),
    onSkillCheckComplete: (result) => emitter.emit("skill:complete", result),
    onCritical: (result) => emitter.emit("skill:critical", result),
    onFumble: (result) => emitter.emit("skill:fumble", result),
    onResourceConsumed: (resource, amount) =>
      emitter.emit("skill:resourceConsumed", { resource, amount }),
    onTableLookup: (result) => emitter.emit("skill:tableLookup", result),
  };
}

/**
 * Create CombatEvents that emit to an EventEmitter
 */
export function createCombatEventEmitter(emitter: EventEmitter): CombatEvents {
  return {
    onAttackRoll: (result) => emitter.emit("combat:attack", result),
    onCriticalThreat: (result) => emitter.emit("combat:critThreat", result),
    onFumbleRoll: (result) => emitter.emit("combat:fumble", result),
    onDamageRoll: (result) => emitter.emit("combat:damage", result),
    onCriticalResult: (result) => emitter.emit("combat:critResult", result),
    onFumbleResult: (result) => emitter.emit("combat:fumbleResult", result),
    onInitiativeRoll: (result) => emitter.emit("combat:initiative", result),
    onDeedAttempt: (roll, success) =>
      emitter.emit("combat:deed", { roll, success }),
  };
}

/**
 * Create SpellEvents that emit to an EventEmitter
 */
export function createSpellEventEmitter(emitter: EventEmitter): SpellEvents {
  return {
    onSpellCheckStart: (input) => emitter.emit("spell:start", input),
    onSpellCheckComplete: (result) => emitter.emit("spell:complete", result),
    onCritical: (result) => emitter.emit("spell:critical", result),
    onFumble: (result) => emitter.emit("spell:fumble", result),
    onSpellLost: (result) => emitter.emit("spell:lost", result),
    onCorruptionTriggered: (result, corruption) =>
      emitter.emit("spell:corruption", { result, corruption }),
    onDisapprovalIncreased: (result, newRange) =>
      emitter.emit("spell:disapproval", { result, newRange }),
    onSpellburnApplied: (burn) => emitter.emit("spell:spellburn", burn),
    onMercurialEffect: (effect, result) =>
      emitter.emit("spell:mercurial", { effect, result }),
    onPatronTaint: (result, taint) =>
      emitter.emit("spell:patronTaint", { result, taint }),
  };
}

// Usage:
const emitter = new EventEmitter();
emitter.on("skill:critical", (result) => {
  console.log(`Critical success on ${result.skillId}!`);
});

const skillEvents = createSkillEventEmitter(emitter);
resolveSkillCheck(input, options, skillEvents);
```

### FoundryVTT Adapter Example

```typescript
import type { SkillEvents, CombatEvents, SpellEvents } from "dcc-core-lib";

/**
 * Create events that integrate with FoundryVTT's chat and hooks
 */
export function createFoundrySkillEvents(actor: Actor): SkillEvents {
  return {
    onSkillCheckStart: (input) => {
      // Could show "rolling..." animation
      Hooks.call("dcc.skillCheckStart", actor, input);
    },

    onSkillCheckComplete: async (result) => {
      // Create chat message
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: await renderTemplate(
          "systems/dcc/templates/chat/skill-check.hbs",
          { result, actor }
        ),
        rolls: [new Roll(result.formula)],
      });
      Hooks.call("dcc.skillCheckComplete", actor, result);
    },

    onCritical: (result) => {
      // Play critical sound
      AudioHelper.play({ src: "systems/dcc/sounds/critical.mp3" });
      // Show special effect
      canvas.interface.createScrollingText(
        actor.token?.center ?? { x: 0, y: 0 },
        "CRITICAL!",
        { fill: "#00ff00", fontSize: 48 }
      );
      Hooks.call("dcc.critical", actor, result);
    },

    onFumble: (result) => {
      AudioHelper.play({ src: "systems/dcc/sounds/fumble.mp3" });
      canvas.interface.createScrollingText(
        actor.token?.center ?? { x: 0, y: 0 },
        "FUMBLE!",
        { fill: "#ff0000", fontSize: 48 }
      );
      Hooks.call("dcc.fumble", actor, result);
    },

    onResourceConsumed: (resource, amount) => {
      if (resource === "luck") {
        // Update actor's luck
        const currentLuck = actor.system.abilities.lck.value;
        actor.update({ "system.abilities.lck.value": currentLuck - amount });
      }
      Hooks.call("dcc.resourceConsumed", actor, resource, amount);
    },
  };
}

/**
 * Create spell events for FoundryVTT
 */
export function createFoundrySpellEvents(actor: Actor): SpellEvents {
  return {
    onSpellCheckComplete: async (result) => {
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: await renderTemplate(
          "systems/dcc/templates/chat/spell-result.hbs",
          { result, actor }
        ),
      });
    },

    onSpellLost: (result) => {
      // Mark spell as lost in actor's spellbook
      const spellbook = actor.system.spellbook;
      const spell = spellbook.find((s) => s.spellId === result.spellId);
      if (spell) {
        spell.lost = true;
        actor.update({ "system.spellbook": spellbook });
      }

      ui.notifications.warn(
        `${actor.name} lost ${result.spellId} for the day!`
      );
    },

    onCorruptionTriggered: (result, corruption) => {
      // Add corruption to actor
      const corruptions = actor.system.corruptions ?? [];
      corruptions.push({
        description: corruption.description,
        permanent: corruption.permanent,
        tier: corruption.tier,
      });
      actor.update({ "system.corruptions": corruptions });

      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `<h3>Corruption!</h3><p>${corruption.description}</p>`,
        whisper: [game.user.id], // Only show to GM and player
      });
    },

    onDisapprovalIncreased: (result, newRange) => {
      actor.update({ "system.disapprovalRange": newRange });

      ui.notifications.warn(
        `${actor.name}'s disapproval range increased to ${newRange}!`
      );
    },

    onSpellburnApplied: (burn) => {
      // Update ability scores
      const updates: Record<string, number> = {};
      if (burn.str > 0) {
        updates["system.abilities.str.value"] =
          actor.system.abilities.str.value - burn.str;
      }
      if (burn.agl > 0) {
        updates["system.abilities.agl.value"] =
          actor.system.abilities.agl.value - burn.agl;
      }
      if (burn.sta > 0) {
        updates["system.abilities.sta.value"] =
          actor.system.abilities.sta.value - burn.sta;
      }
      actor.update(updates);
    },
  };
}
```

### React/State Management Adapter

```typescript
import type { SpellEvents, SpellCastResult, CorruptionResult } from "dcc-core-lib";

// For use with Redux, Zustand, or similar
interface SpellState {
  lastResult: SpellCastResult | null;
  corruptions: CorruptionResult[];
  disapprovalRange: number;
}

type SpellAction =
  | { type: "SPELL_COMPLETE"; payload: SpellCastResult }
  | { type: "CORRUPTION_GAINED"; payload: CorruptionResult }
  | { type: "DISAPPROVAL_INCREASED"; payload: number };

export function createReduxSpellEvents(
  dispatch: (action: SpellAction) => void
): SpellEvents {
  return {
    onSpellCheckComplete: (result) => {
      dispatch({ type: "SPELL_COMPLETE", payload: result });
    },

    onCorruptionTriggered: (_result, corruption) => {
      dispatch({ type: "CORRUPTION_GAINED", payload: corruption });
    },

    onDisapprovalIncreased: (_result, newRange) => {
      dispatch({ type: "DISAPPROVAL_INCREASED", payload: newRange });
    },
  };
}

// Zustand store example
import { create } from "zustand";

interface GameStore {
  lastSpellResult: SpellCastResult | null;
  setLastSpellResult: (result: SpellCastResult) => void;
  corruptions: CorruptionResult[];
  addCorruption: (corruption: CorruptionResult) => void;
}

const useGameStore = create<GameStore>((set) => ({
  lastSpellResult: null,
  setLastSpellResult: (result) => set({ lastSpellResult: result }),
  corruptions: [],
  addCorruption: (corruption) =>
    set((state) => ({ corruptions: [...state.corruptions, corruption] })),
}));

export function createZustandSpellEvents(): SpellEvents {
  const store = useGameStore.getState();
  return {
    onSpellCheckComplete: store.setLastSpellResult,
    onCorruptionTriggered: (_result, corruption) => store.addCorruption(corruption),
  };
}
```

### Logging/Analytics Adapter

```typescript
import type { SkillEvents, CombatEvents, SpellEvents } from "dcc-core-lib";

interface GameEvent {
  type: string;
  timestamp: Date;
  data: unknown;
}

/**
 * Create events that log all game actions for replay/analytics
 */
export function createLoggingEvents(
  log: (event: GameEvent) => void
): SkillEvents & CombatEvents & SpellEvents {
  const emit = (type: string, data: unknown) => {
    log({ type, timestamp: new Date(), data });
  };

  return {
    // Skill events
    onSkillCheckStart: (input) => emit("skill.start", { skillId: input.skill.id }),
    onSkillCheckComplete: (result) => emit("skill.complete", result),
    onCritical: (result) => emit("skill.critical", { skillId: result.skillId }),
    onFumble: (result) => emit("skill.fumble", { skillId: result.skillId }),
    onResourceConsumed: (resource, amount) =>
      emit("resource.consumed", { resource, amount }),

    // Combat events
    onAttackRoll: (result) => emit("combat.attack", {
      total: result.total,
      hit: result.isHit,
      crit: result.isCriticalThreat,
      fumble: result.isFumble,
    }),
    onCriticalResult: (result) => emit("combat.crit", {
      table: result.critTable,
      total: result.total,
    }),
    onFumbleResult: (result) => emit("combat.fumble", { total: result.total }),
    onDamageRoll: (result) => emit("combat.damage", { total: result.total }),
    onInitiativeRoll: (result) => emit("combat.initiative", { total: result.total }),

    // Spell events
    onSpellCheckComplete: (result) => emit("spell.complete", {
      spellId: result.spellId,
      total: result.total,
      tier: result.tier,
      lost: result.spellLost,
    }),
    onSpellLost: (result) => emit("spell.lost", { spellId: result.spellId }),
    onCorruptionTriggered: (_, corruption) => emit("spell.corruption", {
      tier: corruption.tier,
      permanent: corruption.permanent,
    }),
    onDisapprovalIncreased: (_, newRange) => emit("spell.disapproval", { newRange }),
  };
}
```

## Combining Multiple Adapters

You can combine multiple event handlers by creating a merged events object:

```typescript
import type { SpellEvents } from "dcc-core-lib";

function mergeSpellEvents(...handlers: SpellEvents[]): SpellEvents {
  return {
    onSpellCheckStart: (input) =>
      handlers.forEach((h) => h.onSpellCheckStart?.(input)),
    onSpellCheckComplete: (result) =>
      handlers.forEach((h) => h.onSpellCheckComplete?.(result)),
    onCritical: (result) =>
      handlers.forEach((h) => h.onCritical?.(result)),
    onFumble: (result) =>
      handlers.forEach((h) => h.onFumble?.(result)),
    onSpellLost: (result) =>
      handlers.forEach((h) => h.onSpellLost?.(result)),
    onCorruptionTriggered: (result, corruption) =>
      handlers.forEach((h) => h.onCorruptionTriggered?.(result, corruption)),
    onDisapprovalIncreased: (result, newRange) =>
      handlers.forEach((h) => h.onDisapprovalIncreased?.(result, newRange)),
    onSpellburnApplied: (burn) =>
      handlers.forEach((h) => h.onSpellburnApplied?.(burn)),
    onMercurialEffect: (effect, result) =>
      handlers.forEach((h) => h.onMercurialEffect?.(effect, result)),
    onPatronTaint: (result, taint) =>
      handlers.forEach((h) => h.onPatronTaint?.(result, taint)),
  };
}

// Usage: combine UI updates, logging, and analytics
const combinedEvents = mergeSpellEvents(
  createFoundrySpellEvents(actor),
  createLoggingEvents(analyticsLog),
);

calculateSpellCheck(character, input, options, combinedEvents);
```
