/**
 * DESIGN
 * ------
 * Java List interface - an ordered Collection with index-based access.
 * 
 * LIST vs SET vs MAP:
 * - List: Ordered, index access, duplicates ALLOWED
 * - Set: No duplicates, no index access
 * - Map: Key-value pairs
 * 
 * KEY FEATURES:
 * 
 *   ┌─────────────────────────────────────────┐
 *   │              LIST                       │
 *   │                                         │
 *   │   [0]  [1]  [2]  [3]  [4]  [5]         │
 *   │    A    B    C    B    D    E          │
 *   │                   ↑                     │
 *   │           Duplicates OK!                │
 *   │                                         │
 *   │   • Zero-based indexing                 │
 *   │   • Maintains insertion order           │
 *   │   • Random access via get(index)        │
 *   └─────────────────────────────────────────┘
 * 
 * IMPLEMENTATIONS:
 * - ArrayList: O(1) random access, O(n) insert/remove in middle
 * - LinkedList: O(n) random access, O(1) insert/remove at ends
 * - Vector: Like ArrayList but synchronized (legacy)
 * - Stack: LIFO stack (legacy, use Deque instead)
 * - CopyOnWriteArrayList: Thread-safe, snapshot iteration
 * 
 * WHEN TO USE WHICH:
 * - ArrayList: Default choice, best for most cases
 * - LinkedList: Frequent insert/remove at both ends (but Deque is better)
 * - CopyOnWriteArrayList: Read-heavy concurrent access
 * 
 * LIST ITERATOR:
 * List provides ListIterator which extends Iterator with:
 * - Bidirectional traversal (previous/next)
 * - Add/set operations during iteration
 * - Index access (nextIndex/previousIndex)
 * 
 * SUBLIST:
 * subList() returns a VIEW, not a copy.
 * Changes to sublist affect original list and vice versa.
 * 
 * @see https://docs.oracle.com/javase/8/docs/api/java/util/List.html
 */

import { JavaCollection } from "./collections";
import { JavaIterator } from "./iterator";

// ============================================
// LIST ITERATOR INTERFACE
// ============================================

/**
 * Bidirectional iterator for Lists.
 * 
 * Extends Iterator with:
 * - Backward traversal
 * - Modification during iteration
 * - Position awareness
 * 
 * CURSOR POSITION:
 * ListIterator cursor sits BETWEEN elements:
 * 
 *   Element:    [A]  [B]  [C]  [D]
 *   Cursor:   ^    ^    ^    ^    ^
 *   Index:    0    1    2    3    4
 * 
 * - next() returns element AFTER cursor, advances cursor
 * - previous() returns element BEFORE cursor, moves cursor back
 */
export interface JavaListIterator<E> extends JavaIterator<E> {
  // ========== FORWARD TRAVERSAL ==========

  /**
   * Check if there are more elements forward.
   */
  hasNext(): boolean;

  /**
   * Get next element and advance cursor.
   * 
   * @throws NoSuchElementException if no next element
   */
  next(): E;

  /**
   * Get index of element that would be returned by next().
   * 
   * @returns Next index, or list.size() if at end
   */
  nextIndex(): number;

  // ========== BACKWARD TRAVERSAL ==========

  /**
   * Check if there are more elements backward.
   */
  hasPrevious(): boolean;

  /**
   * Get previous element and move cursor back.
   * 
   * @throws NoSuchElementException if no previous element
   */
  previous(): E;

  /**
   * Get index of element that would be returned by previous().
   * 
   * @returns Previous index, or -1 if at beginning
   */
  previousIndex(): number;

  // ========== MODIFICATION ==========

  /**
   * Remove last element returned by next() or previous().
   * 
   * Can only be called once per next/previous call.
   * Cannot be called after add().
   * 
   * @throws IllegalStateException if next/previous not called,
   *         or remove/add already called since last next/previous
   */
  remove(): void;

  /**
   * Replace last element returned by next() or previous().
   * 
   * @param e New element
   * @throws IllegalStateException if next/previous not called,
   *         or remove/add called since last next/previous
   */
  set(e: E): void;

  /**
   * Insert element before element that would be returned by next().
   * 
   * Cursor advances, so next() returns same element,
   * but previous() returns the new element.
   * 
   * @param e Element to add
   */
  add(e: E): void;
}

// ============================================
// LIST INTERFACE
// ============================================

export interface JavaList<E> extends JavaCollection<E> {

  // ==========================================
  // SIZE OPERATIONS (from Collection)
  // ==========================================

  /**
   * Get number of elements.
   */
  size(): number;

  /**
   * Check if list is empty.
   */
  isEmpty(): boolean;

  // ==========================================
  // MEMBERSHIP (from Collection)
  // ==========================================

  /**
   * Check if list contains element.
   * 
   * Uses equals() for comparison.
   */
  contains(o: any): boolean;

  /**
   * Check if list contains all elements from collection.
   */
  containsAll(c: JavaCollection<any>): boolean;

  // ==========================================
  // POSITIONAL ACCESS (List-specific)
  // ==========================================

  /**
   * Get element at index.
   * 
   * @param index Position (0-based)
   * @returns Element at index
   * @throws IndexOutOfBoundsException if index < 0 or index >= size()
   */
  get(index: number): E;

  /**
   * Replace element at index.
   * 
   * @param index Position
   * @param element New element
   * @returns Previous element at index
   * @throws IndexOutOfBoundsException if index out of range
   */
  set(index: number, element: E): E;

  // ==========================================
  // SEARCH
  // ==========================================

  /**
   * Find first occurrence of element.
   * 
   * @param o Element to find
   * @returns Index of first occurrence, or -1 if not found
   */
  indexOf(o: any): number;

  /**
   * Find last occurrence of element.
   * 
   * @param o Element to find
   * @returns Index of last occurrence, or -1 if not found
   */
  lastIndexOf(o: any): number;

  // ==========================================
  // MODIFICATION
  // ==========================================

  /**
   * Append element to end.
   * 
   * @param e Element to add
   * @returns true (always, as per Collection contract)
   */
  add(e: E): boolean;

  /**
   * Insert element at index.
   * 
   * Shifts existing elements right.
   * 
   * @param index Position to insert at
   * @param element Element to insert
   * @throws IndexOutOfBoundsException if index < 0 or index > size()
   */
  add(index: number, element: E): void;

  /**
   * Append all elements from collection.
   * 
   * @param c Collection to add from
   * @returns true if list changed
   */
  addAll(c: JavaCollection<E>): boolean;

  /**
   * Insert all elements at index.
   * 
   * @param index Position to insert at
   * @param c Collection to add from
   * @returns true if list changed
   */
  addAll(index: number, c: JavaCollection<E>): boolean;

  /**
   * Remove first occurrence of element.
   * 
   * @param o Element to remove
   * @returns true if element was removed
   */
  remove(o: any): boolean;

  /**
   * Remove element at index.
   * 
   * @param index Position to remove
   * @returns Removed element
   * @throws IndexOutOfBoundsException if index out of range
   */
  remove(index: number): E;

  /**
   * Remove all elements in collection.
   * 
   * @param c Elements to remove
   * @returns true if list changed
   */
  removeAll(c: JavaCollection<any>): boolean;

  /**
   * Keep only elements in collection.
   * 
   * @param c Elements to retain
   * @returns true if list changed
   */
  retainAll(c: JavaCollection<any>): boolean;

  /**
   * Remove all elements.
   */
  clear(): void;

  // ==========================================
  // BULK OPERATIONS (Java 8+)
  // ==========================================

  /**
   * Replace each element with result of operator.
   * 
   * @param operator Function to apply to each element
   * 
   * @since Java 1.8
   */
  replaceAll(operator: (e: E) => E): void;

  /**
   * Sort list using comparator.
   * 
   * @param c Comparator, or null for natural ordering
   * 
   * @since Java 1.8
   */
  sort(c: ((a: E, b: E) => number) | null): void;

  // ==========================================
  // ITERATION
  // ==========================================

  /**
   * Get iterator (forward only).
   */
  iterator(): JavaIterator<E>;

  /**
   * Get list iterator starting at index 0.
   */
  listIterator(): JavaListIterator<E>;

  /**
   * Get list iterator starting at index.
   * 
   * @param index Starting position
   * @throws IndexOutOfBoundsException if index < 0 or index > size()
   */
  listIterator(index: number): JavaListIterator<E>;

  // ==========================================
  // VIEW
  // ==========================================

  /**
   * Get view of portion of list.
   * 
   * IMPORTANT: Returns a VIEW, not a copy!
   * Changes to sublist affect original and vice versa.
   * 
   * @param fromIndex Start index (inclusive)
   * @param toIndex End index (exclusive)
   * @returns View of [fromIndex, toIndex)
   * @throws IndexOutOfBoundsException if indices invalid
   * 
   * @example
   * // Remove range
   * list.subList(5, 10).clear();
   * 
   * // Get middle portion
   * const middle = list.subList(2, 5);
   */
  subList(fromIndex: number, toIndex: number): JavaList<E>;

  // ==========================================
  // CONVERSION
  // ==========================================

  /**
   * Convert to array.
   */
  toArray(): E[];

  /**
   * Convert to typed array.
   */
  toArray<T>(a: T[]): T[];

  // ==========================================
  // COMPARISON
  // ==========================================

  /**
   * Check equality.
   * 
   * Two lists are equal if same size and all corresponding
   * elements are equal (using equals()).
   */
  equals(o: any): boolean;

  /**
   * Get hash code.
   * 
   * Computed as: 31^n * e0 + 31^(n-1) * e1 + ... + en
   */
  hashCode(): number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert Java List to JavaScript array.
 */
export function toArray<E>(javaList: JavaList<E>): E[] {
  const result: E[] = [];
  
  for (let i = 0; i < javaList.size(); i++) {
    result.push(javaList.get(i));
  }
  
  return result;
}

/**
 * Convert Java List to JavaScript array using iterator.
 * 
 * More efficient for LinkedList.
 */
export function toArrayViaIterator<E>(javaList: JavaList<E>): E[] {
  const result: E[] = [];
  const iter = javaList.iterator();
  
  while (iter.hasNext()) {
    result.push(iter.next());
  }
  
  return result;
}

/**
 * Get first element or null if empty.
 */
export function getFirst<E>(list: JavaList<E>): E | null {
  if (list.isEmpty()) {
    return null;
  }
  return list.get(0);
}

/**
 * Get first element or throw if empty.
 */
export function getFirstOrThrow<E>(list: JavaList<E>): E {
  if (list.isEmpty()) {
    throw new Error("List is empty");
  }
  return list.get(0);
}

/**
 * Get last element or null if empty.
 */
export function getLast<E>(list: JavaList<E>): E | null {
  if (list.isEmpty()) {
    return null;
  }
  return list.get(list.size() - 1);
}

/**
 * Get last element or throw if empty.
 */
export function getLastOrThrow<E>(list: JavaList<E>): E {
  if (list.isEmpty()) {
    throw new Error("List is empty");
  }
  return list.get(list.size() - 1);
}

/**
 * Get element at index or null if out of bounds.
 */
export function getOrNull<E>(list: JavaList<E>, index: number): E | null {
  if (index < 0 || index >= list.size()) {
    return null;
  }
  return list.get(index);
}

/**
 * Get element at index or default if out of bounds.
 */
export function getOrDefault<E>(list: JavaList<E>, index: number, defaultValue: E): E {
  if (index < 0 || index >= list.size()) {
    return defaultValue;
  }
  return list.get(index);
}

/**
 * Check if index is valid for list.
 */
export function isValidIndex<E>(list: JavaList<E>, index: number): boolean {
  return index >= 0 && index < list.size();
}

/**
 * Find first element matching predicate.
 */
export function find<E>(list: JavaList<E>, predicate: (e: E) => boolean): E | null {
  for (let i = 0; i < list.size(); i++) {
    const element = list.get(i);
    if (predicate(element)) {
      return element;
    }
  }
  return null;
}

/**
 * Find index of first element matching predicate.
 */
export function findIndex<E>(list: JavaList<E>, predicate: (e: E) => boolean): number {
  for (let i = 0; i < list.size(); i++) {
    if (predicate(list.get(i))) {
      return i;
    }
  }
  return -1;
}

/**
 * Find index of last element matching predicate.
 */
export function findLastIndex<E>(list: JavaList<E>, predicate: (e: E) => boolean): number {
  for (let i = list.size() - 1; i >= 0; i--) {
    if (predicate(list.get(i))) {
      return i;
    }
  }
  return -1;
}

/**
 * Filter list elements.
 */
export function filter<E>(list: JavaList<E>, predicate: (e: E) => boolean): E[] {
  const result: E[] = [];
  
  for (let i = 0; i < list.size(); i++) {
    const element = list.get(i);
    if (predicate(element)) {
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Map list elements to new values.
 */
export function map<E, R>(list: JavaList<E>, mapper: (e: E, index: number) => R): R[] {
  const result: R[] = [];
  
  for (let i = 0; i < list.size(); i++) {
    result.push(mapper(list.get(i), i));
  }
  
  return result;
}

/**
 * Execute callback for each element.
 */
export function forEach<E>(list: JavaList<E>, callback: (e: E, index: number) => void): void {
  for (let i = 0; i < list.size(); i++) {
    callback(list.get(i), i);
  }
}

/**
 * Execute callback for each element in reverse.
 */
export function forEachReverse<E>(list: JavaList<E>, callback: (e: E, index: number) => void): void {
  for (let i = list.size() - 1; i >= 0; i--) {
    callback(list.get(i), i);
  }
}

/**
 * Check if any element matches predicate.
 */
export function any<E>(list: JavaList<E>, predicate: (e: E) => boolean): boolean {
  for (let i = 0; i < list.size(); i++) {
    if (predicate(list.get(i))) {
      return true;
    }
  }
  return false;
}

/**
 * Check if all elements match predicate.
 */
export function all<E>(list: JavaList<E>, predicate: (e: E) => boolean): boolean {
  for (let i = 0; i < list.size(); i++) {
    if (!predicate(list.get(i))) {
      return false;
    }
  }
  return true;
}

/**
 * Check if no elements match predicate.
 */
export function none<E>(list: JavaList<E>, predicate: (e: E) => boolean): boolean {
  return !any(list, predicate);
}

/**
 * Count elements matching predicate.
 */
export function count<E>(list: JavaList<E>, predicate: (e: E) => boolean): number {
  let count = 0;
  
  for (let i = 0; i < list.size(); i++) {
    if (predicate(list.get(i))) {
      count++;
    }
  }
  
  return count;
}

/**
 * Reduce list to single value.
 */
export function reduce<E, R>(
  list: JavaList<E>,
  initial: R,
  reducer: (acc: R, e: E, index: number) => R
): R {
  let result = initial;
  
  for (let i = 0; i < list.size(); i++) {
    result = reducer(result, list.get(i), i);
  }
  
  return result;
}

/**
 * Get slice of list (copy, not view).
 */
export function slice<E>(list: JavaList<E>, start: number, end?: number): E[] {
  const actualEnd = end ?? list.size();
  const result: E[] = [];
  
  for (let i = start; i < actualEnd && i < list.size(); i++) {
    if (i >= 0) {
      result.push(list.get(i));
    }
  }
  
  return result;
}

/**
 * Reverse list to new array (doesn't modify original).
 */
export function reversed<E>(list: JavaList<E>): E[] {
  const result: E[] = [];
  
  for (let i = list.size() - 1; i >= 0; i--) {
    result.push(list.get(i));
  }
  
  return result;
}

/**
 * Check if two lists have same elements in same order.
 */
export function listsEqual<E>(a: JavaList<E>, b: JavaList<E>): boolean {
  if (a.size() !== b.size()) {
    return false;
  }
  
  for (let i = 0; i < a.size(); i++) {
    /* Simple equality - doesn't handle nested objects */
    if (a.get(i) !== b.get(i)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Join list elements to string.
 */
export function join<E>(list: JavaList<E>, separator: string = ","): string {
  if (list.isEmpty()) {
    return "";
  }
  
  const parts: string[] = [];
  
  for (let i = 0; i < list.size(); i++) {
    parts.push(String(list.get(i)));
  }
  
  return parts.join(separator);
}

/**
 * Partition list into two arrays based on predicate.
 * 
 * @returns [matching, notMatching]
 */
export function partition<E>(
  list: JavaList<E>,
  predicate: (e: E) => boolean
): [E[], E[]] {
  const matching: E[] = [];
  const notMatching: E[] = [];
  
  for (let i = 0; i < list.size(); i++) {
    const element = list.get(i);
    if (predicate(element)) {
      matching.push(element);
    } else {
      notMatching.push(element);
    }
  }
  
  return [matching, notMatching];
}

/**
 * Group list elements by key.
 */
export function groupBy<E, K>(
  list: JavaList<E>,
  keyExtractor: (e: E) => K
): Map<K, E[]> {
  const result = new Map<K, E[]>();
  
  for (let i = 0; i < list.size(); i++) {
    const element = list.get(i);
    const key = keyExtractor(element);
    
    if (!result.has(key)) {
      result.set(key, []);
    }
    
    result.get(key)!.push(element);
  }
  
  return result;
}

/**
 * Get unique elements (preserves first occurrence order).
 */
export function distinct<E>(list: JavaList<E>): E[] {
  const seen = new Set<E>();
  const result: E[] = [];
  
  for (let i = 0; i < list.size(); i++) {
    const element = list.get(i);
    if (!seen.has(element)) {
      seen.add(element);
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Zip two lists into array of pairs.
 */
export function zip<A, B>(listA: JavaList<A>, listB: JavaList<B>): [A, B][] {
  const result: [A, B][] = [];
  const minSize = Math.min(listA.size(), listB.size());
  
  for (let i = 0; i < minSize; i++) {
    result.push([listA.get(i), listB.get(i)]);
  }
  
  return result;
}

/**
 * Take first n elements.
 */
export function take<E>(list: JavaList<E>, n: number): E[] {
  const result: E[] = [];
  const count = Math.min(n, list.size());
  
  for (let i = 0; i < count; i++) {
    result.push(list.get(i));
  }
  
  return result;
}

/**
 * Take last n elements.
 */
export function takeLast<E>(list: JavaList<E>, n: number): E[] {
  const result: E[] = [];
  const start = Math.max(0, list.size() - n);
  
  for (let i = start; i < list.size(); i++) {
    result.push(list.get(i));
  }
  
  return result;
}

/**
 * Skip first n elements.
 */
export function skip<E>(list: JavaList<E>, n: number): E[] {
  const result: E[] = [];
  
  for (let i = n; i < list.size(); i++) {
    result.push(list.get(i));
  }
  
  return result;
}

/**
 * Take elements while predicate is true.
 */
export function takeWhile<E>(list: JavaList<E>, predicate: (e: E) => boolean): E[] {
  const result: E[] = [];
  
  for (let i = 0; i < list.size(); i++) {
    const element = list.get(i);
    if (!predicate(element)) {
      break;
    }
    result.push(element);
  }
  
  return result;
}

/**
 * Skip elements while predicate is true.
 */
export function skipWhile<E>(list: JavaList<E>, predicate: (e: E) => boolean): E[] {
  const result: E[] = [];
  let skipping = true;
  
  for (let i = 0; i < list.size(); i++) {
    const element = list.get(i);
    if (skipping && !predicate(element)) {
      skipping = false;
    }
    if (!skipping) {
      result.push(element);
    }
  }
  
  return result;
}

/**
 * Chunk list into arrays of specified size.
 */
export function chunk<E>(list: JavaList<E>, chunkSize: number): E[][] {
  if (chunkSize <= 0) {
    throw new Error("Chunk size must be positive");
  }
  
  const result: E[][] = [];
  let currentChunk: E[] = [];
  
  for (let i = 0; i < list.size(); i++) {
    currentChunk.push(list.get(i));
    
    if (currentChunk.length === chunkSize) {
      result.push(currentChunk);
      currentChunk = [];
    }
  }
  
  if (currentChunk.length > 0) {
    result.push(currentChunk);
  }
  
  return result;
}

/**
 * Flatten nested lists.
 */
export function flatten<E>(listOfLists: JavaList<JavaList<E>>): E[] {
  const result: E[] = [];
  
  for (let i = 0; i < listOfLists.size(); i++) {
    const innerList = listOfLists.get(i);
    for (let j = 0; j < innerList.size(); j++) {
      result.push(innerList.get(j));
    }
  }
  
  return result;

  
}