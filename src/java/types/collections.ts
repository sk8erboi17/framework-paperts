/**
 * DESIGN
 * ------
 * Collection is the root interface of Java's collection hierarchy.
 * It represents a group of objects called "elements".
 * 
 * KEY CHARACTERISTICS:
 * - Some collections allow duplicates (List), others don't (Set)
 * - Some are ordered (List, LinkedHashSet), others aren't (HashSet)
 * - Some allow null elements, others prohibit them
 * 
 * WHY THIS EXISTS:
 * Collection provides a unified API to pass groups of objects around
 * and manipulate them with maximum generality. Instead of writing
 * separate code for ArrayList, HashSet, LinkedList, etc., you can
 * write code that works with any Collection.
 * 
 * COLLECTION vs ARRAY:
 * - Arrays: fixed size, primitive-friendly, fast indexed access
 * - Collections: dynamic size, objects only, rich API
 * 
 * MUTABILITY:
 * Methods like add(), remove(), clear() are "optional operations".
 * Unmodifiable collections throw UnsupportedOperationException.
 * This interface doesn't distinguish - check docs of specific impl.
 * 
 * COMMON IMPLEMENTATIONS:
 * - ArrayList: dynamic array, fast random access
 * - LinkedList: doubly-linked, fast insert/remove at ends
 * - HashSet: unordered unique elements, O(1) contains
 * - TreeSet: sorted unique elements, O(log n) operations
 * - ArrayDeque: double-ended queue, stack/queue operations
 * 
 * @see https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collection.html
 */

import { JavaIterable } from "./iterable";
import { JavaIterator } from "./iterator";

// ============================================
// INTERFACE
// ============================================

export interface JavaCollection<E> extends JavaIterable<E> {

  // ==========================================
  // SIZE & EMPTINESS
  // ==========================================

  /**
   * Number of elements in this collection.
   * 
   * NOTE: If collection has more than Integer.MAX_VALUE (2^31 - 1)
   * elements, returns Integer.MAX_VALUE. In practice, this is rare.
   */
  size(): number;

  /**
   * True if collection has no elements.
   * 
   * WHY NOT JUST size() === 0:
   * Some collections can check emptiness faster than counting.
   * For example, a lazy collection might not know its size without
   * iterating, but can quickly check if first element exists.
   */
  isEmpty(): boolean;

  // ==========================================
  // ELEMENT QUERIES
  // ==========================================

  /**
   * Check if collection contains this element.
   * 
   * Uses equals() for comparison, not ===.
   * Returns true if at least one element e exists where:
   *   Objects.equals(o, e) is true
   * 
   * @throws ClassCastException if element type incompatible (optional)
   * @throws NullPointerException if element is null and collection
   *         doesn't permit null (optional)
   */
  contains(o: E | object): boolean;

  /**
   * Check if collection contains ALL elements from another collection.
   * 
   * Returns true only if every element in c is also in this collection.
   * 
   * @example
   * const required = Arrays.asList("a", "b", "c");
   * if (myCollection.containsAll(required)) {
   *   // Has all required elements
   * }
   */
  containsAll(c: JavaCollection<E>): boolean;

  // ==========================================
  // CONVERSION TO ARRAY
  // ==========================================

  /**
   * Convert to array.
   * 
   * WHY THREE OVERLOADS:
   * 1. toArray(): Returns Object[], safest but loses type info
   * 2. toArray(T[]): Reuses existing array if big enough
   * 3. toArray(generator): Creates array of exact type (Java 11+)
   * 
   * The returned array is "safe" - no references kept by collection.
   * You can modify it freely.
   * 
   * If collection is ordered (List), array has same order.
   */
  toArray(): E[];

  /**
   * Convert to array, reusing provided array if possible.
   * 
   * WHY REUSE:
   * Avoids allocation if you already have an array of right size.
   * Common pattern: toArray(new String[0]) to get String[].
   * 
   * BEHAVIOR:
   * - If array is big enough: fills it, sets next slot to null
   * - If array is too small: allocates new array of same type
   * 
   * @param a Array to fill (also determines return type)
   * @returns Filled array (might be same as a, might be new)
   */
  toArray<T>(a: T[]): T[];

  // ==========================================
  // ADDING ELEMENTS
  // ==========================================

  /**
   * Add element to collection.
   * 
   * RETURN VALUE:
   * - true: collection changed (element was added)
   * - false: collection unchanged (e.g., Set already had element)
   * 
   * WHY BOOLEAN:
   * Sets don't allow duplicates. add() returns false if element
   * already exists rather than throwing. Lists always return true.
   * 
   * OPTIONAL OPERATION:
   * Unmodifiable collections throw UnsupportedOperationException.
   * 
   * @throws UnsupportedOperationException if add not supported
   * @throws ClassCastException if element type prevents adding
   * @throws NullPointerException if null and collection forbids null
   * @throws IllegalArgumentException if element property prevents adding
   */
  add(e: E): boolean;

  /**
   * Add all elements from another collection.
   * 
   * RETURN VALUE:
   * - true: at least one element was added
   * - false: nothing changed (all elements already present, or c empty)
   * 
   * UNDEFINED BEHAVIOR:
   * If you modify c while addAll is running, behavior is undefined.
   * Especially: addAll(this) on non-empty collection is undefined!
   * 
   * @throws UnsupportedOperationException if addAll not supported
   */
  addAll(c: JavaCollection<E>): boolean;

  // ==========================================
  // REMOVING ELEMENTS
  // ==========================================

  /**
   * Remove single instance of element.
   * 
   * If collection has multiple copies (List can), removes just one.
   * Uses equals() to find element.
   * 
   * RETURN VALUE:
   * - true: element was found and removed
   * - false: element wasn't present
   * 
   * @throws UnsupportedOperationException if remove not supported
   */
  remove(o: E | object): boolean;

  /**
   * Remove all elements that are in the specified collection.
   * 
   * After this call, this collection will have no elements in common
   * with c. (Set difference operation.)
   * 
   * @returns true if this collection changed
   * @throws UnsupportedOperationException if removeAll not supported
   */
  removeAll(c: JavaCollection<E>): boolean;

  /**
   * Remove all elements matching predicate.
   * 
   * WHY THIS EXISTS (Java 8+):
   * More efficient and readable than manual iteration + remove.
   * 
   * @example
   * // Remove all null elements
   * collection.removeIf(e => e === null);
   * 
   * // Remove all strings shorter than 3 chars
   * collection.removeIf(s => s.length() < 3);
   * 
   * @returns true if any elements were removed
   * @throws UnsupportedOperationException if removal not supported
   */
  removeIf(filter: (element: E) => boolean): boolean;

  /**
   * Keep only elements that are in the specified collection.
   * 
   * Removes everything NOT in c. (Set intersection operation.)
   * 
   * @example
   * // Keep only elements that are also in allowedSet
   * myList.retainAll(allowedSet);
   * 
   * @returns true if this collection changed
   * @throws UnsupportedOperationException if retainAll not supported
   */
  retainAll(c: JavaCollection<E>): boolean;

  /**
   * Remove ALL elements.
   * 
   * After this call, isEmpty() returns true.
   * 
   * @throws UnsupportedOperationException if clear not supported
   */
  clear(): void;

  // ==========================================
  // ITERATION
  // ==========================================

  /**
   * Get iterator over elements.
   * 
   * ORDER GUARANTEE:
   * - List: iteration order matches index order
   * - LinkedHashSet: insertion order
   * - TreeSet: sorted order
   * - HashSet: NO guarantee (may vary between runs!)
   */
  iterator(): JavaIterator<E>;

  // ==========================================
  // OBJECT METHODS
  // ==========================================

  /**
   * Check equality with another object.
   * 
   * IMPORTANT NUANCES:
   * - List.equals(): true only if other is List with same elements in order
   * - Set.equals(): true only if other is Set with same elements
   * - Raw Collection: typically uses reference equality (Object.equals)
   * 
   * This means a List and Set with same elements are NOT equal!
   */
  equals(o: object): boolean;

  /**
   * Hash code for this collection.
   * 
   * CONTRACT:
   * If c1.equals(c2), then c1.hashCode() === c2.hashCode().
   * (But equal hash codes don't imply equality.)
   */
  hashCode(): number;

  // ==========================================
  // STREAMS (Java 8+)
  // ==========================================

  /**
   * Get sequential Stream over elements.
   * 
   * WHY STREAMS:
   * Enables functional-style operations: filter, map, reduce, etc.
   * More composable than imperative loops.
   * 
   * @example
   * collection.stream()
   *   .filter(e => e !== null)
   *   .map(e => e.toString())
   *   .forEach(s => console.log(s));
   * 
   * NOTE: In TypeScript/Bukkit context, you might prefer our
   * helper functions (filter, map, reduce) over Java streams.
   */
  stream(): JavaStream<E>;

  /**
   * Get possibly-parallel Stream.
   * 
   * WHY "POSSIBLY":
   * Implementation decides if parallelism helps. Small collections
   * may return sequential stream since parallel overhead isn't worth it.
   * 
   * WHEN TO USE:
   * CPU-bound operations on large collections. NOT for Bukkit main
   * thread operations (Bukkit API isn't thread-safe!).
   */
  parallelStream(): JavaStream<E>;
}

// ============================================
// STREAM INTERFACE (simplified)
// ============================================

/**
 * Simplified Java Stream interface.
 * 
 * WHY SIMPLIFIED:
 * Full Stream API is huge. We expose the most useful operations.
 * For complex stream pipelines, use our TypeScript helpers instead.
 */
export interface JavaStream<T> {
  /**
   * Filter elements matching predicate.
   */
  filter(predicate: (element: T) => boolean): JavaStream<T>;

  /**
   * Transform each element.
   */
  map<R>(mapper: (element: T) => R): JavaStream<R>;

  /**
   * Flatten nested streams.
   */
  flatMap<R>(mapper: (element: T) => JavaStream<R>): JavaStream<R>;

  /**
   * Perform action on each element.
   */
  forEach(action: (element: T) => void): void;

  /**
   * Collect into array.
   */
  toArray(): T[];

  /**
   * Count elements.
   */
  count(): number;

  /**
   * Find first element.
   */
  findFirst(): JavaOptional<T>;

  /**
   * Find any element (may be faster for parallel streams).
   */
  findAny(): JavaOptional<T>;

  /**
   * Check if any element matches.
   */
  anyMatch(predicate: (element: T) => boolean): boolean;

  /**
   * Check if all elements match.
   */
  allMatch(predicate: (element: T) => boolean): boolean;

  /**
   * Check if no elements match.
   */
  noneMatch(predicate: (element: T) => boolean): boolean;

  /**
   * Reduce to single value.
   */
  reduce(identity: T, accumulator: (a: T, b: T) => T): T;

  /**
   * Get min element.
   */
  min(comparator: (a: T, b: T) => number): JavaOptional<T>;

  /**
   * Get max element.
   */
  max(comparator: (a: T, b: T) => number): JavaOptional<T>;

  /**
   * Limit to first N elements.
   */
  limit(maxSize: number): JavaStream<T>;

  /**
   * Skip first N elements.
   */
  skip(n: number): JavaStream<T>;

  /**
   * Get distinct elements (removes duplicates).
   */
  distinct(): JavaStream<T>;

  /**
   * Sort elements.
   */
  sorted(): JavaStream<T>;
  sorted(comparator: (a: T, b: T) => number): JavaStream<T>;
}

// ============================================
// OPTIONAL INTERFACE (simplified)
// ============================================

/**
 * Container that may or may not contain a value.
 * 
 * WHY OPTIONAL:
 * Java's way to handle "might be null" explicitly.
 * Forces you to check before using value.
 */
export interface JavaOptional<T> {
  /**
   * True if value is present.
   */
  isPresent(): boolean;

  /**
   * True if no value (Java 11+).
   */
  isEmpty(): boolean;

  /**
   * Get value.
   * @throws NoSuchElementException if empty
   */
  get(): T;

  /**
   * Get value or default if empty.
   */
  orElse(other: T): T;

  /**
   * Get value or compute default if empty.
   */
  orElseGet(supplier: () => T): T;

  /**
   * Get value or throw custom exception if empty.
   */
  orElseThrow<X extends Error>(exceptionSupplier: () => X): T;

  /**
   * Execute action if value present.
   */
  ifPresent(action: (value: T) => void): void;

  /**
   * Execute action if present, else execute empty action (Java 9+).
   */
  ifPresentOrElse(action: (value: T) => void, emptyAction: () => void): void;

  /**
   * Transform value if present.
   */
  map<U>(mapper: (value: T) => U): JavaOptional<U>;

  /**
   * Transform value if present, flatten result.
   */
  flatMap<U>(mapper: (value: T) => JavaOptional<U>): JavaOptional<U>;

  /**
   * Filter value.
   */
  filter(predicate: (value: T) => boolean): JavaOptional<T>;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert Java Collection to TypeScript array.
 * 
 * WHY: TypeScript arrays have rich methods. Convert once, use freely.
 * 
 * @example
 * const players = collectionToArray(server.getOnlinePlayers());
 * const ops = players.filter(p => p.isOp());
 */
export function collectionToArray<E>(collection: JavaCollection<E>): E[] {
  const result: E[] = [];
  const iterator = collection.iterator();
  
  while (iterator.hasNext()) {
    result.push(iterator.next());
  }
  
  return result;
}

/**
 * Convert TypeScript array to Java ArrayList.
 * 
 * WHY: When Bukkit API expects Collection, you can pass this.
 * 
 * NOTE: Returns actual Java ArrayList, not a wrapper.
 */
export function arrayToList<E>(array: E[]): JavaCollection<E> {
  const list = new java.util.ArrayList<E>();
  
  for (const element of array) {
    list.add(element);
  }
  
  return list;
}

/**
 * Convert TypeScript array to Java HashSet.
 * 
 * WHY: When you need unique elements.
 */
export function arrayToSet<E>(array: E[]): JavaCollection<E> {
  const set = new java.util.HashSet<E>();
  
  for (const element of array) {
    set.add(element);
  }
  
  return set;
}

/**
 * Check if two collections have same elements (regardless of order).
 * 
 * WHY: Collection.equals() considers order for Lists.
 * This function checks only element presence.
 */
export function haveSameElements<E>(
  a: JavaCollection<E>,
  b: JavaCollection<E>
): boolean {
  if (a.size() !== b.size()) {
    return false;
  }
  
  return a.containsAll(b) && b.containsAll(a);
}

/**
 * Get intersection of two collections.
 * 
 * @returns New collection with elements in both a AND b
 */
export function intersection<E>(
  a: JavaCollection<E>,
  b: JavaCollection<E>
): E[] {
  const result: E[] = [];
  const iterator = a.iterator();
  
  while (iterator.hasNext()) {
    const element = iterator.next();
    if (b.contains(element)) {
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Get union of two collections.
 * 
 * @returns New array with elements in a OR b (no duplicates)
 */
export function union<E>(
  a: JavaCollection<E>,
  b: JavaCollection<E>
): E[] {
  const set = new java.util.HashSet<E>();
  
  /* Add all from a */
  let iterator = a.iterator();
  while (iterator.hasNext()) {
    set.add(iterator.next());
  }
  
  /* Add all from b */
  iterator = b.iterator();
  while (iterator.hasNext()) {
    set.add(iterator.next());
  }
  
  return collectionToArray(set);
}

/**
 * Get difference of two collections.
 * 
 * @returns Elements in a but NOT in b
 */
export function difference<E>(
  a: JavaCollection<E>,
  b: JavaCollection<E>
): E[] {
  const result: E[] = [];
  const iterator = a.iterator();
  
  while (iterator.hasNext()) {
    const element = iterator.next();
    if (!b.contains(element)) {
      result.push(element);
    }
  }
  
  return result;
}