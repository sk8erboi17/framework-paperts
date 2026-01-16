/**
 * DESIGN
 * ------
 * Java Set interface - a Collection with no duplicate elements.
 * 
 * SET vs LIST vs MAP:
 * - Set: No duplicates, no index access, unordered (usually)
 * - List: Duplicates allowed, index access, ordered
 * - Map: Key-value pairs, no duplicate keys
 * 
 * WHEN TO USE SET:
 * - Checking membership: "Is X in the collection?"
 * - Removing duplicates from a list
 * - Mathematical set operations (union, intersection, difference)
 * 
 * IMPLEMENTATIONS:
 * - HashSet: O(1) operations, no order guarantee
 * - LinkedHashSet: O(1) operations, maintains insertion order
 * - TreeSet: O(log n) operations, sorted order
 * - EnumSet: Optimized for enum values
 * 
 * EQUALITY:
 * Two sets are equal if they contain the same elements,
 * regardless of implementation type.
 * 
 * IMPORTANT:
 * Don't mutate objects while they're in a Set if mutation
 * affects equals()/hashCode(). The Set won't know and
 * you'll get undefined behavior.
 * 
 * @see https://docs.oracle.com/javase/8/docs/api/java/util/Set.html
 */

import { JavaCollection } from "./collections";
import { JavaIterator } from "./iterator";

// ============================================
// SET INTERFACE
// ============================================

export interface JavaSet<E> extends JavaCollection<E> {

  // ==========================================
  // SIZE OPERATIONS
  // ==========================================

  /**
   * Get number of elements (cardinality).
   * 
   * @returns Element count, max Integer.MAX_VALUE
   */
  size(): number;

  /**
   * Check if set is empty.
   */
  isEmpty(): boolean;

  // ==========================================
  // MEMBERSHIP
  // ==========================================

  /**
   * Check if element is in set.
   * 
   * Uses equals() for comparison.
   * 
   * @param o Element to check
   * @returns true if set contains element
   * @throws ClassCastException if type incompatible (optional)
   * @throws NullPointerException if null and set doesn't allow nulls (optional)
   */
  contains(o: any): boolean;

  /**
   * Check if set contains all elements from collection.
   * 
   * If c is also a Set, this tests if c is a subset of this.
   * 
   * @param c Collection to check
   * @returns true if all elements are contained
   */
  containsAll(c: JavaCollection<any>): boolean;

  // ==========================================
  // ITERATION
  // ==========================================

  /**
   * Get iterator over elements.
   * 
   * Order is NOT guaranteed unless using ordered implementation
   * (LinkedHashSet, TreeSet).
   */
  iterator(): JavaIterator<E>;

  // ==========================================
  // CONVERSION
  // ==========================================

  /**
   * Convert to array.
   * 
   * Returns new array (safe to modify).
   * Order matches iterator order.
   */
  toArray(): E[];

  /**
   * Convert to typed array.
   * 
   * If provided array is large enough, elements are placed in it.
   * Otherwise, new array is allocated.
   * 
   * @param a Array to fill (or template for type)
   */
  toArray<T>(a: T[]): T[];

  // ==========================================
  // MODIFICATION
  // ==========================================

  /**
   * Add element if not already present.
   * 
   * WHY RETURNS BOOLEAN:
   * Returns true if set changed (element was new).
   * Returns false if element already existed.
   * 
   * @param e Element to add
   * @returns true if set changed
   * @throws UnsupportedOperationException if immutable
   * @throws ClassCastException if type prevents adding
   * @throws NullPointerException if null and set doesn't allow nulls
   * @throws IllegalArgumentException if element property prevents adding
   */
  add(e: E): boolean;

  /**
   * Add all elements from collection.
   * 
   * If c is also a Set, this computes union.
   * 
   * @param c Collection to add from
   * @returns true if set changed
   */
  addAll(c: JavaCollection<E>): boolean;

  /**
   * Remove element if present.
   * 
   * @param o Element to remove
   * @returns true if element was removed
   * @throws UnsupportedOperationException if immutable
   */
  remove(o: any): boolean;

  /**
   * Remove all elements in collection.
   * 
   * If c is also a Set, this computes set difference (this - c).
   * 
   * @param c Collection of elements to remove
   * @returns true if set changed
   */
  removeAll(c: JavaCollection<any>): boolean;

  /**
   * Keep only elements in collection.
   * 
   * If c is also a Set, this computes intersection.
   * 
   * @param c Collection of elements to keep
   * @returns true if set changed
   */
  retainAll(c: JavaCollection<any>): boolean;

  /**
   * Remove all elements.
   * 
   * @throws UnsupportedOperationException if immutable
   */
  clear(): void;

  // ==========================================
  // COMPARISON
  // ==========================================

  /**
   * Check equality with another object.
   * 
   * Two sets are equal if:
   * - Other object is also a Set
   * - Same size
   * - Every element in other set is in this set
   * 
   * Works across different Set implementations.
   */
  equals(o: any): boolean;

  /**
   * Get hash code.
   * 
   * Hash = sum of element hash codes.
   * Null elements contribute 0.
   * 
   * Guarantees: s1.equals(s2) implies s1.hashCode() == s2.hashCode()
   */
  hashCode(): number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert Java Set to JavaScript Set.
 * 
 * @example
 * const jsSet = toJsSet(player.getDiscoveredRecipes());
 */
export function toJsSet<E>(javaSet: JavaSet<E>): Set<E> {
  const result = new Set<E>();
  const iter = javaSet.iterator();
  
  while (iter.hasNext()) {
    result.add(iter.next());
  }
  
  return result;
}

/**
 * Convert Java Set to array.
 */
export function setToArray<E>(javaSet: JavaSet<E>): E[] {
  const result: E[] = [];
  const iter = javaSet.iterator();
  
  while (iter.hasNext()) {
    result.push(iter.next());
  }
  
  return result;
}

/**
 * Check if two Java Sets have same elements.
 */
export function setsEqual<E>(a: JavaSet<E>, b: JavaSet<E>): boolean {
  if (a.size() !== b.size()) {
    return false;
  }
  
  const iter = a.iterator();
  while (iter.hasNext()) {
    if (!b.contains(iter.next())) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get elements in A but not in B (set difference).
 */
export function setDifference<E>(a: JavaSet<E>, b: JavaSet<E>): E[] {
  const result: E[] = [];
  const iter = a.iterator();
  
  while (iter.hasNext()) {
    const element = iter.next();
    if (!b.contains(element)) {
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Get elements in both A and B (intersection).
 */
export function setIntersection<E>(a: JavaSet<E>, b: JavaSet<E>): E[] {
  const result: E[] = [];
  
  /* Iterate over smaller set for efficiency */
  const [smaller, larger] = a.size() <= b.size() ? [a, b] : [b, a];
  const iter = smaller.iterator();
  
  while (iter.hasNext()) {
    const element = iter.next();
    if (larger.contains(element)) {
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Get elements in A or B or both (union).
 */
export function setUnion<E>(a: JavaSet<E>, b: JavaSet<E>): E[] {
  const seen = new Set<E>();
  const result: E[] = [];
  
  const iterA = a.iterator();
  while (iterA.hasNext()) {
    const element = iterA.next();
    if (!seen.has(element)) {
      seen.add(element);
      result.push(element);
    }
  }
  
  const iterB = b.iterator();
  while (iterB.hasNext()) {
    const element = iterB.next();
    if (!seen.has(element)) {
      seen.add(element);
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Check if A is subset of B (all elements of A are in B).
 */
export function isSubset<E>(a: JavaSet<E>, b: JavaSet<E>): boolean {
  if (a.size() > b.size()) {
    return false;
  }
  
  const iter = a.iterator();
  while (iter.hasNext()) {
    if (!b.contains(iter.next())) {
      return false;
    }
  }
  
  return true;
}

/**
 * Check if A is proper subset of B (subset but not equal).
 */
export function isProperSubset<E>(a: JavaSet<E>, b: JavaSet<E>): boolean {
  return a.size() < b.size() && isSubset(a, b);
}

/**
 * Check if A is superset of B (A contains all of B).
 */
export function isSuperset<E>(a: JavaSet<E>, b: JavaSet<E>): boolean {
  return isSubset(b, a);
}

/**
 * Check if sets are disjoint (no common elements).
 */
export function areDisjoint<E>(a: JavaSet<E>, b: JavaSet<E>): boolean {
  /* Check smaller set for efficiency */
  const [smaller, larger] = a.size() <= b.size() ? [a, b] : [b, a];
  const iter = smaller.iterator();
  
  while (iter.hasNext()) {
    if (larger.contains(iter.next())) {
      return false;
    }
  }
  
  return true;
}

/**
 * Find first element matching predicate.
 */
export function findInSet<E>(set: JavaSet<E>, predicate: (e: E) => boolean): E | null {
  const iter = set.iterator();
  
  while (iter.hasNext()) {
    const element = iter.next();
    if (predicate(element)) {
      return element;
    }
  }
  
  return null;
}

/**
 * Filter set elements.
 */
export function filterSet<E>(set: JavaSet<E>, predicate: (e: E) => boolean): E[] {
  const result: E[] = [];
  const iter = set.iterator();
  
  while (iter.hasNext()) {
    const element = iter.next();
    if (predicate(element)) {
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Map set elements to new values.
 */
export function mapSet<E, R>(set: JavaSet<E>, mapper: (e: E) => R): R[] {
  const result: R[] = [];
  const iter = set.iterator();
  
  while (iter.hasNext()) {
    result.push(mapper(iter.next()));
  }
  
  return result;
}

/**
 * Check if any element matches predicate.
 */
export function anyInSet<E>(set: JavaSet<E>, predicate: (e: E) => boolean): boolean {
  const iter = set.iterator();
  
  while (iter.hasNext()) {
    if (predicate(iter.next())) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if all elements match predicate.
 */
export function allInSet<E>(set: JavaSet<E>, predicate: (e: E) => boolean): boolean {
  const iter = set.iterator();
  
  while (iter.hasNext()) {
    if (!predicate(iter.next())) {
      return false;
    }
  }
  
  return true;
}

/**
 * Count elements matching predicate.
 */
export function countInSet<E>(set: JavaSet<E>, predicate: (e: E) => boolean): number {
  let count = 0;
  const iter = set.iterator();
  
  while (iter.hasNext()) {
    if (predicate(iter.next())) {
      count++;
    }
  }
  
  return count;
}

/**
 * Execute callback for each element.
 */
export function forEachInSet<E>(set: JavaSet<E>, callback: (e: E) => void): void {
  const iter = set.iterator();
  
  while (iter.hasNext()) {
    callback(iter.next());
  }
}