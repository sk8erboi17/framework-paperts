/**
 * DESIGN
 * ------
 * Iterable is the foundation of Java's "for-each" loop capability.
 * Any object implementing Iterable can be used in: for (T item : collection)
 * 
 * In TypeScript, the equivalent is Symbol.iterator which enables for...of.
 * The concepts are nearly identical, but the syntax differs:
 * 
 *   Java:       for (ItemStack item : inventory) { ... }
 *   TypeScript: for (const item of inventory) { ... }
 * 
 * WHY WE NEED THIS INTERFACE:
 * Bukkit collections (Inventory, World entities, etc.) implement Java's
 * Iterable. To use them naturally in TypeScript, we need bridge functions
 * that translate Java's iteration protocol to TypeScript's.
 * 
 * ITERATOR vs ITERABLE:
 * - Iterator: single-use cursor that walks through elements once
 * - Iterable: factory that CAN CREATE iterators, reusable
 * 
 * An Iterable can be iterated multiple times (each call to iterator()
 * returns a fresh cursor). An Iterator is consumed after one pass.
 * 
 * @see https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Iterable.html
 */

import { JavaIterator } from "./iterator";

// ============================================
// JAVA ITERABLE INTERFACE
// ============================================

export interface JavaIterable<T> {
  /**
   * Create a new iterator over elements.
   * 
   * WHY "FACTORY" PATTERN:
   * Each call returns a FRESH iterator starting from the beginning.
   * This allows multiple independent iterations over the same data:
   * 
   *   const inv: JavaIterable<ItemStack> = player.getInventory();
   *   
   *   // First pass: count diamonds
   *   const it1 = inv.iterator();
   *   while (it1.hasNext()) { ... }
   *   
   *   // Second pass: count gold (starts fresh!)
   *   const it2 = inv.iterator();
   *   while (it2.hasNext()) { ... }
   * 
   * If Iterable only HAD an iterator (instead of creating one),
   * the second loop would see nothing — first loop consumed it.
   */
  iterator(): JavaIterator<T>;

  /**
   * Execute action for each element.
   * 
   * WHY THIS EXISTS:
   * Convenience method added in Java 8. Instead of:
   * 
   *   Iterator<T> it = collection.iterator();
   *   while (it.hasNext()) {
   *     action(it.next());
   *   }
   * 
   * You can write:
   * 
   *   collection.forEach(item -> action(item));
   * 
   * The Iterable handles iterator creation and consumption internally.
   * 
   * NOTE: If action throws an exception, iteration stops immediately
   * and the exception propagates to the caller.
   */
  forEach(action: (element: T) => void): void;

  /**
   * Create a Spliterator for parallel processing.
   * 
   * WHY THIS EXISTS:
   * Java 8 added parallel streams. Spliterator ("splittable iterator")
   * can divide data for multi-threaded processing:
   * 
   *   collection.parallelStream().filter(...).map(...).collect(...)
   * 
   * In Bukkit/TypeScript context, this is rarely useful because:
   * 1. Minecraft server is largely single-threaded
   * 2. JavaScript is single-threaded
   * 
   * We expose it for API completeness, but you'll rarely use it.
   */
  spliterator(): any; /* Spliterator<T> */
}

// ============================================
// BRIDGE: Java Iterable -> TypeScript Iterable
// ============================================

/*
 * TypeScript's iteration protocol uses Symbol.iterator.
 * These functions make Java Iterables work with TypeScript syntax.
 */

/**
 * Make Java Iterable work with for...of loops.
 * 
 * WHY:
 * This is the most important bridge function. It lets you write
 * clean TypeScript code against Java collections.
 * 
 * HOW IT WORKS:
 * TypeScript's for...of looks for [Symbol.iterator]() method.
 * We return an object with that symbol, which internally calls
 * the Java iterable's iterator() and wraps it for TypeScript.
 * 
 * @example
 * // Without bridge (ugly, error-prone):
 * const it = inventory.iterator();
 * while (it.hasNext()) {
 *   const item = it.next();
 *   if (item !== null) {
 *     console.log(item.getType());
 *   }
 * }
 * 
 * // With bridge (clean TypeScript):
 * for (const item of toTSIterable(inventory)) {
 *   if (item !== null) {
 *     console.log(item.getType());
 *   }
 * }
 */
export function toTSIterable<T>(javaIterable: JavaIterable<T>): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      /* Get fresh Java iterator and wrap it for TypeScript */
      const javaIterator = javaIterable.iterator();
      
      return {
        next(): IteratorResult<T> {
          if (javaIterator.hasNext()) {
            return { value: javaIterator.next(), done: false };
          }
          return { value: undefined as any, done: true };
        }
      };
    }
  };
}

/**
 * Convert Java Iterable to TypeScript array.
 * 
 * WHY ARRAYS:
 * TypeScript arrays have powerful methods: map, filter, reduce,
 * find, some, every, slice, etc. Java iterables don't expose these
 * directly. Converting to array unlocks the full TypeScript toolkit.
 * 
 * TRADEOFF:
 * - Pro: Full array methods available, can iterate multiple times
 * - Con: Loads ALL elements into memory at once
 * 
 * For small collections (inventory = 41 slots), this is fine.
 * For huge collections (all entities in world), consider lazy
 * alternatives like toGenerator().
 * 
 * @example
 * const items = toArray(player.getInventory());
 * 
 * // Now use TypeScript array methods freely
 * const diamonds = items
 *   .filter(item => item !== null)
 *   .filter(item => item.getType() === Material.DIAMOND);
 * 
 * const totalDiamonds = diamonds
 *   .reduce((sum, item) => sum + item.getAmount(), 0);
 */
export function toArray<T>(iterable: JavaIterable<T>): T[] {
  const result: T[] = [];
  const iterator = iterable.iterator();
  
  /* Drain all elements into array */
  while (iterator.hasNext()) {
    result.push(iterator.next());
  }
  
  return result;
}

/**
 * Convert Java Iterable to TypeScript Generator.
 * 
 * WHY GENERATORS vs ARRAYS:
 * Generators are "lazy" — they produce values on-demand, not all at once.
 * 
 * Array approach:
 *   const items = toArray(world.getEntities()); // Loads ALL entities NOW
 *   const first = items[0]; // Already had everything in memory
 * 
 * Generator approach:
 *   const gen = toGenerator(world.getEntities());
 *   const first = gen.next().value; // Only fetched ONE entity
 * 
 * WHY THIS MATTERS:
 * - Memory: Don't load 10,000 entities if you only need 5
 * - Speed: Stop early without processing everything
 * - Composition: Chain operations without intermediate arrays
 * 
 * @example
 * // Find first zombie without loading all entities
 * for (const entity of toGenerator(world.getEntities())) {
 *   if (entity.getType() === EntityType.ZOMBIE) {
 *     console.log("Found zombie at", entity.getLocation());
 *     break; // Didn't iterate through remaining thousands
 *   }
 * }
 */
export function* toGenerator<T>(iterable: JavaIterable<T>): Generator<T> {
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    yield iterator.next();
  }
}

// ============================================
// FUNCTIONAL OPERATIONS ON ITERABLES
// ============================================

/*
 * These functions bring TypeScript's functional style to Java Iterables.
 * Each internally uses Java's iterator() but exposes familiar patterns.
 * 
 * WHY NOT JUST USE toArray() + array methods?
 * These functions are lazy where possible — they don't load everything
 * into memory. For large collections, this can be significant.
 */

/**
 * Filter elements matching predicate.
 * 
 * @example
 * // Get only non-null items from inventory
 * const actualItems = filter(inventory, item => item !== null);
 * 
 * // Get only hostile mobs
 * const hostiles = filter(world.getEntities(), e => e instanceof Monster);
 */
export function filter<T>(
  iterable: JavaIterable<T>,
  predicate: (element: T) => boolean
): T[] {
  const result: T[] = [];
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    const element = iterator.next();
    
    /* Only keep elements that pass the test */
    if (predicate(element)) {
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Transform each element.
 * 
 * @example
 * // Get all item types from inventory
 * const types = map(inventory, item => item?.getType() ?? null);
 * 
 * // Get all entity locations
 * const locations = map(world.getEntities(), e => e.getLocation());
 */
export function map<T, R>(
  iterable: JavaIterable<T>,
  mapper: (element: T) => R
): R[] {
  const result: R[] = [];
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    result.push(mapper(iterator.next()));
  }
  
  return result;
}

/**
 * Find first element matching predicate.
 * 
 * WHY RETURNS UNDEFINED (not null):
 * TypeScript convention uses undefined for "absence of value".
 * Java uses null. We follow TypeScript idiom here since this
 * is a TypeScript-facing function.
 * 
 * NOTE: Stops iteration as soon as match is found. Efficient
 * for large collections when you only need one result.
 * 
 * @example
 * // Find first diamond in inventory
 * const diamond = find(inventory, item => 
 *   item?.getType() === Material.DIAMOND
 * );
 * 
 * if (diamond !== undefined) {
 *   console.log(`Found ${diamond.getAmount()} diamonds`);
 * }
 */
export function find<T>(
  iterable: JavaIterable<T>,
  predicate: (element: T) => boolean
): T | undefined {
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    const element = iterator.next();
    
    if (predicate(element)) {
      return element; // Found! Stop iterating.
    }
  }
  
  return undefined; // Exhausted collection, no match
}

/**
 * Check if any element matches predicate.
 * 
 * WHY: Quick existence check without collecting results.
 * Stops at first match — O(1) best case, O(n) worst case.
 * 
 * @example
 * // Does player have any diamonds?
 * const hasDiamonds = some(inventory, item =>
 *   item?.getType() === Material.DIAMOND
 * );
 * 
 * if (hasDiamonds) {
 *   player.sendMessage("You have diamonds!");
 * }
 */
export function some<T>(
  iterable: JavaIterable<T>,
  predicate: (element: T) => boolean
): boolean {
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    if (predicate(iterator.next())) {
      return true; // Found one, that's enough
    }
  }
  
  return false;
}

/**
 * Check if all elements match predicate.
 * 
 * WHY: Validation in one pass. Stops at first failure.
 * 
 * @example
 * // Is inventory completely empty?
 * const isEmpty = every(inventory, item => item === null);
 * 
 * // Are all items in hotbar tools?
 * const allTools = every(hotbarItems, item =>
 *   item?.getType().name().endsWith("_PICKAXE") ||
 *   item?.getType().name().endsWith("_AXE")
 * );
 */
export function every<T>(
  iterable: JavaIterable<T>,
  predicate: (element: T) => boolean
): boolean {
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    if (!predicate(iterator.next())) {
      return false; // Found one that fails, stop checking
    }
  }
  
  return true; // All passed
}

/**
 * Reduce collection to single value.
 * 
 * WHY REDUCE:
 * Many operations are secretly reductions:
 * - Sum: reduce((sum, x) => sum + x, 0)
 * - Count: reduce((n, _) => n + 1, 0)
 * - Max: reduce((max, x) => x > max ? x : max, -Infinity)
 * - Grouping: reduce((map, x) => { map[x.type].push(x); return map }, {})
 * 
 * @example
 * // Total items in inventory
 * const totalItems = reduce(inventory, (sum, item) => {
 *   return sum + (item?.getAmount() ?? 0);
 * }, 0);
 * 
 * // Build type -> count map
 * const typeCounts = reduce(inventory, (counts, item) => {
 *   if (item !== null) {
 *     const type = item.getType().name();
 *     counts[type] = (counts[type] ?? 0) + item.getAmount();
 *   }
 *   return counts;
 * }, {} as Record<string, number>);
 */
export function reduce<T, R>(
  iterable: JavaIterable<T>,
  reducer: (accumulator: R, element: T) => R,
  initialValue: R
): R {
  let accumulator = initialValue;
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    accumulator = reducer(accumulator, iterator.next());
  }
  
  return accumulator;
}

/**
 * Count elements, optionally matching predicate.
 * 
 * @example
 * // Count non-empty slots
 * const itemCount = count(inventory, item => item !== null);
 * 
 * // Count all slots
 * const totalSlots = count(inventory);
 */
export function count<T>(
  iterable: JavaIterable<T>,
  predicate?: (element: T) => boolean
): number {
  let n = 0;
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    const element = iterator.next();
    
    /* Count all if no predicate, or only matching elements */
    if (predicate === undefined || predicate(element)) {
      n++;
    }
  }
  
  return n;
}

/**
 * Get first N elements.
 * 
 * WHY: Limit results without processing entire collection.
 * "Show first 5 items" scenarios.
 * 
 * @example
 * // Get first 9 non-null items for hotbar display
 * const hotbarItems = take(
 *   filter(inventory, item => item !== null),
 *   9
 * );
 */
export function take<T>(iterable: JavaIterable<T>, n: number): T[] {
  const result: T[] = [];
  const iterator = iterable.iterator();
  
  /* Stop after N elements OR when exhausted */
  for (let i = 0; i < n && iterator.hasNext(); i++) {
    result.push(iterator.next());
  }
  
  return result;
}

/**
 * Skip first N elements and return rest.
 * 
 * WHY: Pagination. "Skip first page, show second page."
 * 
 * @example
 * // Skip first 10 entities, get next 10
 * const page2 = take(skip(world.getEntities(), 10), 10);
 */
export function skip<T>(iterable: JavaIterable<T>, n: number): T[] {
  const result: T[] = [];
  const iterator = iterable.iterator();
  
  /* Skip N elements */
  for (let i = 0; i < n && iterator.hasNext(); i++) {
    iterator.next(); // Discard
  }
  
  /* Collect the rest */
  while (iterator.hasNext()) {
    result.push(iterator.next());
  }
  
  return result;
}

/**
 * Join elements into string.
 * 
 * @example
 * // List all item types
 * const itemList = joinToString(
 *   filter(inventory, item => item !== null),
 *   item => item.getType().name(),
 *   ", "
 * );
 * // "DIAMOND_SWORD, GOLDEN_APPLE, COBBLESTONE"
 */
export function joinToString<T>(
  iterable: JavaIterable<T>,
  toString: (element: T) => string,
  separator: string = ", "
): string {
  const parts: string[] = [];
  const iterator = iterable.iterator();
  
  while (iterator.hasNext()) {
    parts.push(toString(iterator.next()));
  }
  
  return parts.join(separator);
}