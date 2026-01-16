/**
 * DESIGN
 * ------
 * Java Iterator and TypeScript Iterator have fundamentally different APIs.
 * 
 * Java uses a two-step pattern: hasNext() checks, then next() retrieves.
 * TypeScript combines both into one: next() returns { value, done }.
 * 
 * This difference matters because Java iterators can check availability
 * without consuming elements, while TypeScript iterators cannot "peek".
 * 
 * We provide the raw Java interface plus helper functions that bridge
 * to TypeScript patterns. The helpers internally use Java's API but
 * expose idiomatic TypeScript interfaces (generators, for...of support).
 * 
 * WHY NOT JUST WRAP EVERYTHING?
 * We expose the raw Java interface because:
 * 1. Some operations (like remove() during iteration) require it
 * 2. Performance: no wrapper overhead for simple iterations
 * 3. Learning: users understand what's happening underneath
 * 
 * @see https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Iterator.html
 */

// ============================================
// JAVA ITERATOR
// ============================================

export interface JavaIterator<E> {
  /**
   * Check if more elements exist.
   * 
   * WHY THIS EXISTS (vs TypeScript's approach):
   * Java separates "check" from "get" because some data sources
   * are expensive to read. You might want to know IF there's data
   * before committing to process it. TypeScript's combined approach
   * forces you to handle the element even if you just wanted to peek.
   */
  hasNext(): boolean;

  /**
   * Get next element and advance cursor.
   * 
   * IMPORTANT: Always call hasNext() first!
   * Unlike TypeScript where next() safely returns { done: true },
   * Java throws NoSuchElementException if you call next() when empty.
   * 
   * @throws NoSuchElementException if no more elements
   */
  next(): E;

  /**
   * Remove last element returned by next().
   * 
   * WHY THIS IS POWERFUL:
   * This is the ONLY safe way to remove elements while iterating.
   * Modifying a collection during iteration normally causes
   * ConcurrentModificationException. But remove() is special:
   * it's designed to work mid-iteration.
   * 
   * RULES:
   * - Call only ONCE per next() call
   * - Must call next() before first remove()
   * - Not all iterators support this (some throw UnsupportedOperationException)
   * 
   * @throws UnsupportedOperationException if not supported
   * @throws IllegalStateException if next() not called or remove() already called
   */
  remove(): void;

  /**
   * Process all remaining elements.
   * 
   * WHY USE THIS vs manual loop:
   * Some iterators can optimize bulk processing internally.
   * Also cleaner when you just want to consume everything.
   */
  forEachRemaining(action: (element: E) => void): void;
}

// ============================================
// JAVA LIST ITERATOR
// ============================================

/**
 * Bidirectional iterator with modification support.
 * 
 * WHY THIS EXISTS:
 * Regular Iterator only goes forward. ListIterator adds:
 * - Backward traversal (useful for undo, reverse processing)
 * - Index access (know WHERE you are in the list)
 * - Modification (set/add elements at current position)
 * 
 * Think of it as a cursor in a text editor: you can move
 * forward/backward and insert/modify at cursor position.
 */
export interface JavaListIterator<E> extends JavaIterator<E> {
  /**
   * Check if previous element exists.
   */
  hasPrevious(): boolean;

  /**
   * Get previous element and move cursor backward.
   * 
   * @throws NoSuchElementException if at beginning
   */
  previous(): E;

  /**
   * Index that next() would return.
   * Returns list.size() if at end.
   */
  nextIndex(): number;

  /**
   * Index that previous() would return.
   * Returns -1 if at beginning.
   */
  previousIndex(): number;

  /**
   * Replace last element returned by next() or previous().
   * 
   * @throws IllegalStateException if neither next() nor previous() called
   */
  set(element: E): void;

  /**
   * Insert element BEFORE what next() would return.
   * 
   * After add():
   * - next() returns same element as before
   * - previous() returns the newly added element
   * - nextIndex() and previousIndex() both increase by 1
   */
  add(element: E): void;
}

// ============================================
// BRIDGE FUNCTIONS: Java -> TypeScript
// ============================================

/*
 * The functions below bridge Java's iteration style to TypeScript's.
 * They all use Java's hasNext()/next() internally but expose
 * patterns familiar to TypeScript developers.
 */

/**
 * Convert to TypeScript array.
 * 
 * WHY: Arrays have rich methods (map, filter, reduce) that
 * Java iterators lack. Convert once, then use TypeScript idioms.
 * 
 * TRADEOFF: Loads everything into memory. For huge collections,
 * use toGenerator() instead for lazy evaluation.
 * 
 * @example
 * const items = iteratorToArray(inventory.iterator());
 * const diamonds = items.filter(i => i?.getType() === Material.DIAMOND);
 */
export function iteratorToArray<E>(iterator: JavaIterator<E>): E[] {
  const result: E[] = [];
  
  /* Drain the iterator into our array */
  while (iterator.hasNext()) {
    result.push(iterator.next());
  }
  
  return result;
}

/**
 * Convert to TypeScript Generator for lazy iteration.
 * 
 * WHY GENERATORS:
 * Generators don't load everything into memory. They produce
 * values on-demand. Perfect for large collections or when
 * you might stop early (find first match, take N items).
 * 
 * @example
 * for (const item of iteratorToGenerator(inventory.iterator())) {
 *   if (item?.getType() === Material.DIAMOND) {
 *     console.log("Found diamond!");
 *     break; // Didn't need to iterate everything
 *   }
 * }
 */
export function* iteratorToGenerator<E>(iterator: JavaIterator<E>): Generator<E> {
  while (iterator.hasNext()) {
    yield iterator.next();
  }
}

/**
 * Create TypeScript-compatible iterator.
 * 
 * WHY: TypeScript's Iterator protocol uses { value, done } objects.
 * This wrapper translates Java's two-method style to TypeScript's
 * single-method style.
 * 
 * HOW IT WORKS:
 * Java:       if (hasNext()) { x = next(); }
 * TypeScript: { value: x, done: false } or { done: true }
 * 
 * We check hasNext() internally and package the result appropriately.
 */
export function toTSIterator<E>(javaIterator: JavaIterator<E>): Iterator<E> {
  return {
    next(): IteratorResult<E> {
      /* Check Java-style, return TypeScript-style */
      if (javaIterator.hasNext()) {
        return { value: javaIterator.next(), done: false };
      } else {
        return { value: undefined as any, done: true };
      }
    }
  };
}

/**
 * Make Java Iterator work with for...of loops.
 * 
 * WHY: for...of is the cleanest iteration syntax in TypeScript.
 * This wrapper makes Java iterators compatible with it.
 * 
 * HOW: TypeScript's for...of looks for Symbol.iterator.
 * We provide that symbol, returning our TS-compatible iterator.
 * 
 * @example
 * // Instead of:
 * const it = inventory.iterator();
 * while (it.hasNext()) {
 *   const item = it.next();
 *   // ...
 * }
 * 
 * // You can write:
 * for (const item of asIterable(inventory.iterator())) {
 *   // ...
 * }
 */
export function asIterable<E>(javaIterator: JavaIterator<E>): Iterable<E> {
  return {
    [Symbol.iterator](): Iterator<E> {
      return toTSIterator(javaIterator);
    }
  };
}

// ============================================
// SAFE MODIFICATION DURING ITERATION
// ============================================

/**
 * Remove elements matching predicate while iterating.
 * 
 * WHY THIS FUNCTION EXISTS:
 * In Java, you CANNOT do this:
 * 
 *   for (item of collection) {
 *     if (shouldRemove(item)) {
 *       collection.remove(item); // THROWS ConcurrentModificationException!
 *     }
 *   }
 * 
 * The collection detects it's being modified during iteration and fails.
 * The ONLY safe way is to use iterator.remove() after iterator.next().
 * This function encapsulates that pattern.
 * 
 * @returns Number of elements removed
 * 
 * @example
 * // Remove all null items from inventory
 * const removed = removeIf(inventory.iterator(), item => item === null);
 * console.log(`Removed ${removed} empty slots`);
 */
export function removeIf<E>(iterator: JavaIterator<E>, predicate: (element: E) => boolean): number {
  let removed = 0;
  
  while (iterator.hasNext()) {
    const element = iterator.next();
    
    /* Check if this element should be removed */
    if (predicate(element)) {
      /* 
       * iterator.remove() removes the element we just got from next().
       * This is safe because the iterator knows its internal state.
       */
      iterator.remove();
      removed++;
    }
  }
  
  return removed;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Process all elements with given action.
 * 
 * Same as iterator.forEachRemaining() but works with any function.
 */
export function consumeIterator<E>(iterator: JavaIterator<E>, action: (element: E) => void): void {
  while (iterator.hasNext()) {
    action(iterator.next());
  }
}

/**
 * Skip n elements.
 * 
 * WHY: Sometimes you want to start iteration partway through.
 * Database pagination, skipping headers, etc.
 * 
 * NOTE: Skipped elements are gone. Iterator only goes forward.
 */
export function skip<E>(iterator: JavaIterator<E>, n: number): void {
  for (let i = 0; i < n && iterator.hasNext(); i++) {
    iterator.next(); // Discard
  }
}

/**
 * Take at most n elements.
 * 
 * WHY: Limit results without loading everything.
 * "Show first 10 items" type scenarios.
 */
export function take<E>(iterator: JavaIterator<E>, n: number): E[] {
  const result: E[] = [];
  
  for (let i = 0; i < n && iterator.hasNext(); i++) {
    result.push(iterator.next());
  }
  
  return result;
}

/**
 * Find first element matching predicate.
 * 
 * WHY: Stops as soon as match is found. Efficient for large collections.
 * Returns undefined if no match (TypeScript idiom, not null).
 */
export function find<E>(iterator: JavaIterator<E>, predicate: (element: E) => boolean): E | undefined {
  while (iterator.hasNext()) {
    const element = iterator.next();
    if (predicate(element)) {
      return element; // Found it, stop iterating
    }
  }
  return undefined; // Exhausted iterator, no match
}

/**
 * Check if any element matches predicate.
 * 
 * WHY: Stops at first match. Don't need to check everything.
 */
export function some<E>(iterator: JavaIterator<E>, predicate: (element: E) => boolean): boolean {
  while (iterator.hasNext()) {
    if (predicate(iterator.next())) {
      return true; // Found one, that's enough
    }
  }
  return false; // Checked everything, none matched
}

/**
 * Check if all elements match predicate.
 * 
 * WHY: Stops at first non-match. Efficient for validation.
 */
export function every<E>(iterator: JavaIterator<E>, predicate: (element: E) => boolean): boolean {
  while (iterator.hasNext()) {
    if (!predicate(iterator.next())) {
      return false; // Found one that doesn't match, fail fast
    }
  }
  return true; // Everything matched
}

/**
 * Reduce elements to single value.
 * 
 * WHY: Aggregation (sum, count, build object, etc.) in one pass.
 * 
 * @example
 * // Count total items in inventory
 * const total = reduce(inventory.iterator(), (sum, item) => {
 *   return sum + (item?.getAmount() ?? 0);
 * }, 0);
 */
export function reduce<E, R>(
  iterator: JavaIterator<E>,
  reducer: (accumulator: R, element: E) => R,
  initialValue: R
): R {
  let accumulator = initialValue;
  
  while (iterator.hasNext()) {
    accumulator = reducer(accumulator, iterator.next());
  }
  
  return accumulator;
}