/**
 * DESIGN
 * ------
 * Random provides a TypeScript-compatible random number generator
 * that is compatible with Java's Random API through Javet.
 * 
 * COMPATIBILITY:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    RANDOM SOURCES                           │
 *   │                                                             │
 *   │   TypeScript Side          │         Java/Bukkit Side       │
 *   │                            │                                │
 *   │   ┌──────────────────┐     │     ┌──────────────────┐       │
 *   │   │  Math.random()   │     │     │  java.util.Random│       │
 *   │   └────────┬─────────┘     │     └────────┬─────────┘       │
 *   │            │               │              │                 │
 *   │            ▼               │              ▼                 │
 *   │   ┌──────────────────┐     │     ┌──────────────────┐       │
 *   │   │  BukkitRandom    │ ◄───┼───► │  JavaRandom      │       │
 *   │   │  (wrapper)       │     │     │  (native)        │       │
 *   │   └──────────────────┘     │     └──────────────────┘       │
 *   │            │               │              │                 │
 *   │            └───────────────┼──────────────┘                 │
 *   │                            │                                │
 *   │                    ┌───────┴───────┐                        │
 *   │                    │  LootTable    │                        │
 *   │                    │  populateLoot │                        │
 *   │                    └───────────────┘                        │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * WHY THIS WRAPPER:
 * - Bukkit methods expect java.util.Random
 * - We want to use TypeScript's Math.random() when possible
 * - This wrapper provides both interfaces
 * 
 * USAGE:
 * - Use createRandom() for TypeScript-based random
 * - Use createJavaRandom() for native Java random
 * - Use createSeededRandom(seed) for reproducible results
 * 
 * @see https://docs.oracle.com/javase/8/docs/api/java/util/Random.html
 */

// ============================================
// JAVA RANDOM INTERFACE
// ============================================

/**
 * Java's Random interface for Javet compatibility.
 * 
 * This matches java.util.Random API.
 */
export interface JavaRandom {
  /** Returns the next pseudorandom boolean */
  nextBoolean(): boolean;
  
  /** Returns random bytes into the array */
  nextBytes(bytes: number[]): void;
  
  /** Returns next pseudorandom double (0.0 to 1.0) */
  nextDouble(): number;
  
  /** Returns next pseudorandom float (0.0 to 1.0) */
  nextFloat(): number;
  
  /** Returns next pseudorandom Gaussian (mean 0, stddev 1) */
  nextGaussian(): number;
  
  /** Returns next pseudorandom int */
  nextInt(): number;
  
  /** Returns next pseudorandom int from 0 (inclusive) to bound (exclusive) */
  nextInt(bound: number): number;
  
  /** Returns next pseudorandom long */
  nextLong(): number;
  
  /** Sets the seed */
  setSeed(seed: number): void;
}

// ============================================
// TYPESCRIPT RANDOM IMPLEMENTATION
// ============================================

/**
 * TypeScript implementation of Random compatible with Java's API.
 * 
 * Uses Math.random() internally but provides Java-compatible interface.
 */
class TSRandom implements JavaRandom {
  private seed: number;
  private hasNextGaussian: boolean = false;
  private nextGaussianValue: number = 0;

  constructor(seed?: number) {
    this.seed = seed ?? Date.now();
  }

  nextBoolean(): boolean {
    return Math.random() < 0.5;
  }

  nextBytes(bytes: number[]): void {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256) - 128;
    }
  }

  nextDouble(): number {
    return Math.random();
  }

  nextFloat(): number {
    return Math.random();
  }

  nextGaussian(): number {
    /* Box-Muller transform for Gaussian distribution */
    if (this.hasNextGaussian) {
      this.hasNextGaussian = false;
      return this.nextGaussianValue;
    }

    let v1: number, v2: number, s: number;
    do {
      v1 = 2 * Math.random() - 1;
      v2 = 2 * Math.random() - 1;
      s = v1 * v1 + v2 * v2;
    } while (s >= 1 || s === 0);

    const multiplier = Math.sqrt(-2 * Math.log(s) / s);
    this.nextGaussianValue = v2 * multiplier;
    this.hasNextGaussian = true;
    return v1 * multiplier;
  }

  nextInt(bound?: number): number {
    if (bound === undefined) {
      /* Return any 32-bit integer */
      return Math.floor(Math.random() * 0xFFFFFFFF) - 0x7FFFFFFF;
    }
    
    if (bound <= 0) {
      throw new Error("bound must be positive");
    }
    
    return Math.floor(Math.random() * bound);
  }

  nextLong(): number {
    /* JavaScript doesn't have true 64-bit integers, approximate */
    const high = Math.floor(Math.random() * 0xFFFFFFFF);
    const low = Math.floor(Math.random() * 0xFFFFFFFF);
    return high * 0x100000000 + low - 0x7FFFFFFFFFFFFFFF;
  }

  setSeed(seed: number): void {
    this.seed = seed;
    this.hasNextGaussian = false;
  }
}

// ============================================
// SEEDED RANDOM IMPLEMENTATION
// ============================================

/**
 * Seeded random number generator for reproducible results.
 * 
 * Uses a simple Linear Congruential Generator (LCG).
 * Same seed = same sequence of numbers.
 */
class SeededRandom implements JavaRandom {
  private seed: number;
  private hasNextGaussian: boolean = false;
  private nextGaussianValue: number = 0;

  /* LCG constants (same as java.util.Random) */
  private static readonly MULTIPLIER = 0x5DEECE66D;
  private static readonly ADDEND = 0xB;
  private static readonly MASK = (1 << 48) - 1;

  constructor(seed: number) {
    this.seed = (seed ^ SeededRandom.MULTIPLIER) & SeededRandom.MASK;
  }

  private next(bits: number): number {
    this.seed = (this.seed * SeededRandom.MULTIPLIER + SeededRandom.ADDEND) & SeededRandom.MASK;
    return this.seed >>> (48 - bits);
  }

  nextBoolean(): boolean {
    return this.next(1) !== 0;
  }

  nextBytes(bytes: number[]): void {
    for (let i = 0; i < bytes.length; ) {
      let rnd = this.nextInt();
      for (let n = Math.min(bytes.length - i, 4); n > 0; n--) {
        bytes[i++] = rnd & 0xFF;
        rnd >>= 8;
      }
    }
  }

  nextDouble(): number {
    return ((this.next(26) * (1 << 27)) + this.next(27)) / (1 << 53);
  }

  nextFloat(): number {
    return this.next(24) / (1 << 24);
  }

  nextGaussian(): number {
    if (this.hasNextGaussian) {
      this.hasNextGaussian = false;
      return this.nextGaussianValue;
    }

    let v1: number, v2: number, s: number;
    do {
      v1 = 2 * this.nextDouble() - 1;
      v2 = 2 * this.nextDouble() - 1;
      s = v1 * v1 + v2 * v2;
    } while (s >= 1 || s === 0);

    const multiplier = Math.sqrt(-2 * Math.log(s) / s);
    this.nextGaussianValue = v2 * multiplier;
    this.hasNextGaussian = true;
    return v1 * multiplier;
  }

  nextInt(bound?: number): number {
    if (bound === undefined) {
      return this.next(32);
    }

    if (bound <= 0) {
      throw new Error("bound must be positive");
    }

    /* Power of 2 optimization */
    if ((bound & -bound) === bound) {
      return (bound * this.next(31)) >> 31;
    }

    let bits: number, val: number;
    do {
      bits = this.next(31);
      val = bits % bound;
    } while (bits - val + (bound - 1) < 0);

    return val;
  }

  nextLong(): number {
    return (this.next(32) << 32) + this.next(32);
  }

  setSeed(seed: number): void {
    this.seed = (seed ^ SeededRandom.MULTIPLIER) & SeededRandom.MASK;
    this.hasNextGaussian = false;
  }
}

// ============================================
// FACTORY FUNCTIONS
// ============================================

/**
 * Create a TypeScript-based random generator.
 * 
 * Uses Math.random() internally.
 * Compatible with Java's Random API.
 * 
 * @returns New random instance
 * 
 * @example
 * const random = createRandom();
 * const value = random.nextInt(100); // 0-99
 */
export function createRandom(): JavaRandom {
  return new TSRandom();
}

/**
 * Create a seeded random generator for reproducible results.
 * 
 * Same seed always produces same sequence.
 * 
 * @param seed Seed value
 * @returns New seeded random instance
 * 
 * @example
 * const random1 = createSeededRandom(12345);
 * const random2 = createSeededRandom(12345);
 * // random1.nextInt() === random2.nextInt() // true!
 */
export function createSeededRandom(seed: number): JavaRandom {
  return new SeededRandom(seed);
}

/**
 * Create a native Java random generator.
 * 
 * Uses java.util.Random directly through Javet.
 * Best for when you need true Java compatibility.
 * 
 * @param seed Optional seed
 * @returns Native Java Random instance
 * 
 * @example
 * const random = createJavaRandom();
 * lootTable.populateLoot(random, context);
 */
export function createJavaRandom(seed?: number): JavaRandom {
  if (seed !== undefined) {
    return new java.util.Random(seed);
  }
  return new java.util.Random();
}

/**
 * Create random from current time as seed.
 * 
 * @returns New seeded random with time-based seed
 */
export function createTimedRandom(): JavaRandom {
  return createSeededRandom(Date.now());
}

/**
 * Create random from string hash as seed.
 * 
 * Same string = same random sequence.
 * Useful for world generation, etc.
 * 
 * @param str String to hash
 * @returns New seeded random
 * 
 * @example
 * const random = createStringSeededRandom("my_world_seed");
 */
export function createStringSeededRandom(str: string): JavaRandom {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; /* Convert to 32-bit integer */
  }
  return createSeededRandom(hash);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get a random integer in range [min, max] (inclusive).
 * 
 * @param random Random instance
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns Random integer in range
 * 
 * @example
 * const damage = randomInt(random, 5, 10); // 5, 6, 7, 8, 9, or 10
 */
export function randomInt(random: JavaRandom, min: number, max: number): number {
  return min + random.nextInt(max - min + 1);
}

/**
 * Get a random double in range [min, max).
 * 
 * @param random Random instance
 * @param min Minimum value (inclusive)
 * @param max Maximum value (exclusive)
 * @returns Random double in range
 */
export function randomDouble(random: JavaRandom, min: number, max: number): number {
  return min + random.nextDouble() * (max - min);
}

/**
 * Get a random float in range [min, max).
 */
export function randomFloat(random: JavaRandom, min: number, max: number): number {
  return min + random.nextFloat() * (max - min);
}

/**
 * Random chance check.
 * 
 * @param random Random instance
 * @param chance Probability (0.0 to 1.0)
 * @returns true if chance succeeded
 * 
 * @example
 * if (randomChance(random, 0.1)) {
 *   // 10% chance to reach here
 *   dropRareItem();
 * }
 */
export function randomChance(random: JavaRandom, chance: number): boolean {
  return random.nextDouble() < chance;
}

/**
 * Random chance check with percentage.
 * 
 * @param random Random instance
 * @param percent Probability (0 to 100)
 * @returns true if chance succeeded
 * 
 * @example
 * if (randomPercentChance(random, 25)) {
 *   // 25% chance
 * }
 */
export function randomPercentChance(random: JavaRandom, percent: number): boolean {
  return random.nextDouble() * 100 < percent;
}

/**
 * Pick a random element from array.
 * 
 * @param random Random instance
 * @param array Array to pick from
 * @returns Random element or undefined if empty
 * 
 * @example
 * const colors = ["red", "green", "blue"];
 * const color = randomElement(random, colors);
 */
export function randomElement<T>(random: JavaRandom, array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[random.nextInt(array.length)];
}

/**
 * Pick N random elements from array (no duplicates).
 * 
 * @param random Random instance
 * @param array Array to pick from
 * @param count Number of elements to pick
 * @returns Array of picked elements
 */
export function randomElements<T>(random: JavaRandom, array: T[], count: number): T[] {
  if (count >= array.length) {
    return [...array];
  }

  const result: T[] = [];
  const available = [...array];

  for (let i = 0; i < count && available.length > 0; i++) {
    const index = random.nextInt(available.length);
    result.push(available[index]);
    available.splice(index, 1);
  }

  return result;
}

/**
 * Shuffle array in place using Fisher-Yates algorithm.
 * 
 * @param random Random instance
 * @param array Array to shuffle
 * @returns Same array (shuffled)
 * 
 * @example
 * const deck = [1, 2, 3, 4, 5];
 * shuffle(random, deck);
 */
export function shuffle<T>(random: JavaRandom, array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = random.nextInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Pick random element with weights.
 * 
 * @param random Random instance
 * @param items Array of [item, weight] pairs
 * @returns Randomly selected item
 * 
 * @example
 * const loot = randomWeighted(random, [
 *   ["common", 70],
 *   ["uncommon", 25],
 *   ["rare", 5],
 * ]);
 */
export function randomWeighted<T>(
  random: JavaRandom,
  items: Array<[T, number]>
): T | undefined {
  if (items.length === 0) return undefined;

  const totalWeight = items.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = random.nextDouble() * totalWeight;

  for (const [item, weight] of items) {
    roll -= weight;
    if (roll <= 0) {
      return item;
    }
  }

  /* Fallback to last item */
  return items[items.length - 1][0];
}

// ============================================
// GLOBAL DEFAULT RANDOM
// ============================================

/**
 * Global shared random instance.
 * 
 * Use for convenience when you don't need seeded random.
 */
let globalRandom: JavaRandom | null = null;

/**
 * Get the global random instance.
 * 
 * Creates one if it doesn't exist.
 */
export function getGlobalRandom(): JavaRandom {
  if (globalRandom === null) {
    globalRandom = createRandom();
  }
  return globalRandom;
}

/**
 * Set the global random instance.
 * 
 * Useful for seeding all random operations.
 */
export function setGlobalRandom(random: JavaRandom): void {
  globalRandom = random;
}

/**
 * Reset global random with new seed.
 */
export function resetGlobalRandom(seed?: number): void {
  globalRandom = seed !== undefined 
    ? createSeededRandom(seed) 
    : createRandom();
}