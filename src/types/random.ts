/**
 * Random Source Types
 *
 * Interfaces for random number generation.
 * Allows injection of deterministic sources for testing.
 */

/**
 * Source of randomness for dice rolls and selections.
 *
 * Implementations:
 * - `createDefaultRandomSource()` - Uses Math.random()
 * - `createSeededRandomSource(seed)` - Reproducible results
 * - `createMockRandomSource(values)` - Predetermined values for testing
 */
export interface RandomSource {
  /**
   * Roll a single die, returning a value from 1 to sides (inclusive).
   * @param sides - Number of sides on the die (e.g., 6 for d6)
   * @returns A value from 1 to sides
   */
  roll(sides: number): number;

  /**
   * Roll multiple dice of the same type.
   * @param count - Number of dice to roll
   * @param sides - Number of sides on each die
   * @returns Array of individual die results
   */
  rollMultiple(count: number, sides: number): number[];

  /**
   * Pick a random index from 0 to max-1.
   * Useful for selecting from arrays.
   * @param max - Exclusive upper bound
   * @returns A value from 0 to max-1
   */
  randomIndex(max: number): number;

  /**
   * Pick a random element from an array.
   * @param array - Array to pick from
   * @returns A random element, or undefined if array is empty
   */
  pick<T>(array: readonly T[]): T | undefined;
}

/**
 * Create a random source using Math.random().
 * This is the default for production use.
 */
export function createDefaultRandomSource(): RandomSource {
  return {
    roll(sides: number): number {
      return Math.floor(Math.random() * sides) + 1;
    },

    rollMultiple(count: number, sides: number): number[] {
      const results: number[] = [];
      for (let i = 0; i < count; i++) {
        results.push(this.roll(sides));
      }
      return results;
    },

    randomIndex(max: number): number {
      return Math.floor(Math.random() * max);
    },

    pick<T>(array: readonly T[]): T | undefined {
      if (array.length === 0) return undefined;
      return array[this.randomIndex(array.length)];
    },
  };
}

/**
 * Create a seeded random source for reproducible results.
 * Uses a simple LCG (Linear Congruential Generator).
 *
 * @param seed - Initial seed value
 */
export function createSeededRandomSource(seed: number): RandomSource {
  // LCG parameters (same as glibc)
  const a = 1103515245;
  const c = 12345;
  const m = 2 ** 31;

  let state = seed;

  function next(): number {
    state = (a * state + c) % m;
    return state / m; // Returns 0 to <1
  }

  return {
    roll(sides: number): number {
      return Math.floor(next() * sides) + 1;
    },

    rollMultiple(count: number, sides: number): number[] {
      const results: number[] = [];
      for (let i = 0; i < count; i++) {
        results.push(this.roll(sides));
      }
      return results;
    },

    randomIndex(max: number): number {
      return Math.floor(next() * max);
    },

    pick<T>(array: readonly T[]): T | undefined {
      if (array.length === 0) return undefined;
      return array[this.randomIndex(array.length)];
    },
  };
}

/**
 * Queue of predetermined values for mock random source.
 */
export interface MockRandomQueue {
  /** Predetermined die roll results (consumed in order) */
  rolls?: number[];

  /** Predetermined index selections (consumed in order) */
  indices?: number[];
}

/**
 * Create a mock random source with predetermined values.
 * Useful for testing specific scenarios.
 *
 * When the queue is exhausted, falls back to returning 1 for rolls
 * and 0 for indices.
 *
 * @param queue - Predetermined values to return
 */
export function createMockRandomSource(queue: MockRandomQueue): RandomSource {
  const rolls = [...(queue.rolls ?? [])];
  const indices = [...(queue.indices ?? [])];

  return {
    roll(_sides: number): number {
      return rolls.shift() ?? 1;
    },

    rollMultiple(count: number, sides: number): number[] {
      const results: number[] = [];
      for (let i = 0; i < count; i++) {
        results.push(this.roll(sides));
      }
      return results;
    },

    randomIndex(_max: number): number {
      return indices.shift() ?? 0;
    },

    pick<T>(array: readonly T[]): T | undefined {
      if (array.length === 0) return undefined;
      return array[this.randomIndex(array.length)];
    },
  };
}

/**
 * Default random source instance.
 * Use this when you don't need reproducibility or testing.
 */
export const defaultRandomSource: RandomSource = createDefaultRandomSource();
