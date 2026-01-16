/**
 * DESIGN
 * ------
 * Java Map interface - a collection of key-value pairs.
 * 
 * MAP vs SET vs LIST:
 * - Map: Key → Value associations, no duplicate keys
 * - Set: Unique values, no associations
 * - List: Ordered values, duplicates allowed
 * 
 * KEY CONCEPTS:
 * 
 *   ┌─────────────────────────────────────────┐
 *   │              MAP                        │
 *   │                                         │
 *   │   Key1 ──────→ Value1                   │
 *   │   Key2 ──────→ Value2                   │
 *   │   Key3 ──────→ Value3                   │
 *   │                                         │
 *   │   • Keys are UNIQUE                     │
 *   │   • Values can be DUPLICATED            │
 *   │   • Each key maps to exactly ONE value  │
 *   └─────────────────────────────────────────┘
 * 
 * THREE VIEWS:
 * - keySet(): Set of all keys
 * - values(): Collection of all values
 * - entrySet(): Set of key-value pairs
 * 
 * These views are LIVE - changes to map reflect in views and vice versa.
 * 
 * IMPLEMENTATIONS:
 * - HashMap: O(1) operations, no order guarantee
 * - LinkedHashMap: O(1) operations, insertion order preserved
 * - TreeMap: O(log n) operations, keys sorted
 * - ConcurrentHashMap: Thread-safe, high concurrency
 * 
 * NULL HANDLING:
 * - HashMap: Allows one null key, multiple null values
 * - TreeMap: No null keys (needs comparison), null values OK
 * - ConcurrentHashMap: No null keys or values
 * 
 * IMPORTANT:
 * Don't mutate keys while they're in a Map if mutation affects
 * equals()/hashCode(). The Map won't know and lookups will fail.
 * 
 * @see https://docs.oracle.com/javase/8/docs/api/java/util/Map.html
 */

import { JavaCollection } from "./collections";
import { JavaSet } from "./set";

// ============================================
// MAP ENTRY INTERFACE
// ============================================

/**
 * A single key-value pair in a Map.
 * 
 * WHY SEPARATE INTERFACE:
 * entrySet() returns Set<Entry>. Each Entry gives access to
 * both key and value, and allows modifying the value in place.
 */
export interface JavaMapEntry<K, V> {
  /**
   * Get the key.
   */
  getKey(): K;

  /**
   * Get the value.
   */
  getValue(): V;

  /**
   * Set the value.
   * 
   * Modifies the underlying Map.
   * 
   * @param value New value
   * @returns Previous value
   * @throws UnsupportedOperationException if map is immutable
   */
  setValue(value: V): V;

  /**
   * Equality check.
   * 
   * Two entries are equal if their keys and values are equal.
   */
  equals(o: any): boolean;

  /**
   * Hash code.
   * 
   * Defined as: key.hashCode() ^ value.hashCode()
   */
  hashCode(): number;
}

// ============================================
// MAP INTERFACE
// ============================================

export interface JavaMap<K, V> {

  // ==========================================
  // SIZE OPERATIONS
  // ==========================================

  /**
   * Get number of key-value mappings.
   * 
   * @returns Entry count, max Integer.MAX_VALUE
   */
  size(): number;

  /**
   * Check if map is empty.
   */
  isEmpty(): boolean;

  // ==========================================
  // LOOKUP
  // ==========================================

  /**
   * Check if key exists in map.
   * 
   * Uses equals() for comparison.
   * 
   * @param key Key to check
   * @returns true if key is mapped
   */
  containsKey(key: any): boolean;

  /**
   * Check if value exists in map.
   * 
   * WARNING: O(n) operation - must scan all values.
   * 
   * @param value Value to check
   * @returns true if one or more keys map to this value
   */
  containsValue(value: any): boolean;

  /**
   * Get value for key.
   * 
   * @param key Key to look up
   * @returns Associated value, or null if not found
   * 
   * NOTE: null return is ambiguous if map allows null values.
   * Use containsKey() to distinguish "not found" from "mapped to null".
   */
  get(key: any): V | null;

  /**
   * Get value for key, with default.
   * 
   * @param key Key to look up
   * @param defaultValue Value to return if key not found
   * @returns Associated value, or defaultValue if not found
   * 
   * @since Java 1.8
   */
  getOrDefault(key: any, defaultValue: V): V;

  // ==========================================
  // MODIFICATION
  // ==========================================

  /**
   * Associate key with value.
   * 
   * If key already exists, old value is replaced.
   * 
   * @param key Key
   * @param value Value to associate
   * @returns Previous value, or null if key was new
   * @throws UnsupportedOperationException if immutable
   */
  put(key: K, value: V): V | null;

  /**
   * Copy all mappings from another map.
   * 
   * @param m Map to copy from
   */
  putAll(m: JavaMap<K, V>): void;

  /**
   * Associate key with value only if key is absent (or mapped to null).
   * 
   * @param key Key
   * @param value Value to associate
   * @returns Previous value, or null if key was absent
   * 
   * @since Java 1.8
   */
  putIfAbsent(key: K, value: V): V | null;

  /**
   * Remove mapping for key.
   * 
   * @param key Key to remove
   * @returns Previous value, or null if key wasn't present
   */
  remove(key: any): V | null;

  /**
   * Remove mapping only if key is mapped to specific value.
   * 
   * @param key Key
   * @param value Expected value
   * @returns true if removed
   * 
   * @since Java 1.8
   */
  remove(key: any, value: any): boolean;

  /**
   * Replace value for key only if key is present.
   * 
   * @param key Key
   * @param value New value
   * @returns Previous value, or null if key wasn't present
   * 
   * @since Java 1.8
   */
  replace(key: K, value: V): V | null;

  /**
   * Replace value only if key is mapped to specific old value.
   * 
   * @param key Key
   * @param oldValue Expected current value
   * @param newValue New value
   * @returns true if replaced
   * 
   * @since Java 1.8
   */
  replace(key: K, oldValue: V, newValue: V): boolean;

  /**
   * Remove all mappings.
   */
  clear(): void;

  // ==========================================
  // VIEWS
  // ==========================================

  /**
   * Get set of all keys.
   * 
   * LIVE VIEW: Changes to map reflect in set.
   * Supports removal (removes mapping), not addition.
   */
  keySet(): JavaSet<K>;

  /**
   * Get collection of all values.
   * 
   * LIVE VIEW: Changes to map reflect in collection.
   * May contain duplicates if multiple keys map to same value.
   */
  values(): JavaCollection<V>;

  /**
   * Get set of all key-value pairs.
   * 
   * LIVE VIEW: Changes to map reflect in set.
   * Entry.setValue() modifies the map.
   */
  entrySet(): JavaSet<JavaMapEntry<K, V>>;

  // ==========================================
  // COMPARISON
  // ==========================================

  /**
   * Check equality.
   * 
   * Two maps are equal if they have same mappings.
   * Works across different Map implementations.
   */
  equals(o: any): boolean;

  /**
   * Get hash code.
   * 
   * Hash = sum of entry hash codes.
   */
  hashCode(): number;

  // ==========================================
  // FUNCTIONAL OPERATIONS (Java 8+)
  // ==========================================

  /**
   * Perform action for each entry.
   * 
   * @param action Function taking (key, value)
   * 
   * @since Java 1.8
   */
  forEach(action: (key: K, value: V) => void): void;

  /**
   * Replace all values using function.
   * 
   * @param fn Function taking (key, value) returning new value
   * 
   * @since Java 1.8
   */
  replaceAll(fn: (key: K, value: V) => V): void;

  /**
   * Compute value if key is absent.
   * 
   * If key not present (or mapped to null), compute value and store.
   * 
   * @param key Key
   * @param mappingFunction Function taking key, returning value
   * @returns Current value (existing or computed)
   * 
   * @example
   * // Get or create list for key
   * map.computeIfAbsent(key, k => []).push(item);
   * 
   * @since Java 1.8
   */
  computeIfAbsent(key: K, mappingFunction: (key: K) => V): V;

  /**
   * Compute new value if key is present.
   * 
   * If key present and non-null, compute new value.
   * If function returns null, remove the mapping.
   * 
   * @param key Key
   * @param remappingFunction Function taking (key, value) returning new value
   * @returns New value, or null if removed
   * 
   * @since Java 1.8
   */
  computeIfPresent(key: K, remappingFunction: (key: K, value: V) => V | null): V | null;

  /**
   * Compute value for key.
   * 
   * Always computes, regardless of whether key exists.
   * If function returns null, remove (or don't add) mapping.
   * 
   * @param key Key
   * @param remappingFunction Function taking (key, currentValue) returning new value
   * @returns New value, or null if removed
   * 
   * @since Java 1.8
   */
  compute(key: K, remappingFunction: (key: K, value: V | null) => V | null): V | null;

  /**
   * Merge value with existing.
   * 
   * If key absent: put(key, value)
   * If key present: put(key, fn(oldValue, value))
   * If function returns null: remove(key)
   * 
   * @param key Key
   * @param value Value to merge
   * @param remappingFunction Function taking (oldValue, value) returning merged value
   * @returns New value, or null if removed
   * 
   * @example
   * // Concatenate strings
   * map.merge(key, newStr, (old, val) => old + val);
   * 
   * @since Java 1.8
   */
  merge(key: K, value: V, remappingFunction: (oldValue: V, value: V) => V | null): V | null;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert Java Map to JavaScript Map.
 * 
 * @example
 * const jsMap = toJsMap(player.getMetadata());
 */
export function toJsMap<K, V>(javaMap: JavaMap<K, V>): Map<K, V> {
  const result = new Map<K, V>();
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    result.set(entry.getKey(), entry.getValue());
  }
  
  return result;
}

/**
 * Convert Java Map to plain JavaScript object.
 * 
 * Only works well if keys are strings.
 */
export function toJsObject<V>(javaMap: JavaMap<string, V>): Record<string, V> {
  const result: Record<string, V> = {};
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    result[entry.getKey()] = entry.getValue();
  }
  
  return result;
}

/**
 * Convert Java Map to array of [key, value] tuples.
 */
export function mapToEntries<K, V>(javaMap: JavaMap<K, V>): [K, V][] {
  const result: [K, V][] = [];
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    result.push([entry.getKey(), entry.getValue()]);
  }
  
  return result;
}

/**
 * Get all keys as array.
 */
export function getKeys<K, V>(javaMap: JavaMap<K, V>): K[] {
  const result: K[] = [];
  
  const keys = javaMap.keySet();
  const iter = keys.iterator();
  
  while (iter.hasNext()) {
    result.push(iter.next());
  }
  
  return result;
}

/**
 * Get all values as array.
 */
export function getValues<K, V>(javaMap: JavaMap<K, V>): V[] {
  const result: V[] = [];
  
  const values = javaMap.values();
  const iter = values.iterator();
  
  while (iter.hasNext()) {
    result.push(iter.next());
  }
  
  return result;
}

/**
 * Check if two maps have same entries.
 */
export function mapsEqual<K, V>(a: JavaMap<K, V>, b: JavaMap<K, V>): boolean {
  if (a.size() !== b.size()) {
    return false;
  }
  
  const entries = a.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    const key = entry.getKey();
    const value = entry.getValue();
    
    if (!b.containsKey(key)) {
      return false;
    }
    
    const bValue = b.get(key);
    if (value !== bValue) {
      /* Simple equality, doesn't handle nested objects well */
      return false;
    }
  }
  
  return true;
}

/**
 * Get value or throw if not found.
 * 
 * @throws Error if key not in map
 */
export function getOrThrow<K, V>(javaMap: JavaMap<K, V>, key: K): V {
  if (!javaMap.containsKey(key)) {
    throw new Error(`Key not found: ${key}`);
  }
  return javaMap.get(key) as V;
}

/**
 * Get value or compute and store if absent.
 * 
 * Simpler version of computeIfAbsent for when you don't have Java 8.
 */
export function getOrCompute<K, V>(
  javaMap: JavaMap<K, V>,
  key: K,
  compute: () => V
): V {
  if (javaMap.containsKey(key)) {
    return javaMap.get(key) as V;
  }
  
  const value = compute();
  javaMap.put(key, value);
  return value;
}

/**
 * Find key by value.
 * 
 * WARNING: O(n) operation.
 * 
 * @returns First key mapping to value, or null if not found
 */
export function findKey<K, V>(javaMap: JavaMap<K, V>, value: V): K | null {
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    if (entry.getValue() === value) {
      return entry.getKey();
    }
  }
  
  return null;
}

/**
 * Find all keys mapping to value.
 * 
 * WARNING: O(n) operation.
 */
export function findAllKeys<K, V>(javaMap: JavaMap<K, V>, value: V): K[] {
  const result: K[] = [];
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    if (entry.getValue() === value) {
      result.push(entry.getKey());
    }
  }
  
  return result;
}

/**
 * Filter map entries.
 * 
 * @returns Array of [key, value] tuples matching predicate
 */
export function filterMap<K, V>(
  javaMap: JavaMap<K, V>,
  predicate: (key: K, value: V) => boolean
): [K, V][] {
  const result: [K, V][] = [];
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    const key = entry.getKey();
    const value = entry.getValue();
    
    if (predicate(key, value)) {
      result.push([key, value]);
    }
  }
  
  return result;
}

/**
 * Map values to new values.
 */
export function mapValues<K, V, R>(
  javaMap: JavaMap<K, V>,
  mapper: (value: V, key: K) => R
): [K, R][] {
  const result: [K, R][] = [];
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    const key = entry.getKey();
    const value = entry.getValue();
    
    result.push([key, mapper(value, key)]);
  }
  
  return result;
}

/**
 * Execute callback for each entry.
 */
export function forEachEntry<K, V>(
  javaMap: JavaMap<K, V>,
  callback: (key: K, value: V) => void
): void {
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    callback(entry.getKey(), entry.getValue());
  }
}

/**
 * Check if any entry matches predicate.
 */
export function anyEntry<K, V>(
  javaMap: JavaMap<K, V>,
  predicate: (key: K, value: V) => boolean
): boolean {
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    if (predicate(entry.getKey(), entry.getValue())) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if all entries match predicate.
 */
export function allEntries<K, V>(
  javaMap: JavaMap<K, V>,
  predicate: (key: K, value: V) => boolean
): boolean {
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    if (!predicate(entry.getKey(), entry.getValue())) {
      return false;
    }
  }
  
  return true;
}

/**
 * Count entries matching predicate.
 */
export function countEntries<K, V>(
  javaMap: JavaMap<K, V>,
  predicate: (key: K, value: V) => boolean
): number {
  let count = 0;
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    if (predicate(entry.getKey(), entry.getValue())) {
      count++;
    }
  }
  
  return count;
}

/**
 * Remove entries matching predicate.
 * 
 * @returns Number of entries removed
 */
export function removeIf<K, V>(
  javaMap: JavaMap<K, V>,
  predicate: (key: K, value: V) => boolean
): number {
  const toRemove: K[] = [];
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    if (predicate(entry.getKey(), entry.getValue())) {
      toRemove.push(entry.getKey());
    }
  }
  
  for (const key of toRemove) {
    javaMap.remove(key);
  }
  
  return toRemove.length;
}

/**
 * Invert map (swap keys and values).
 * 
 * WARNING: Only works if values are unique.
 * If values are duplicated, later entries overwrite earlier ones.
 */
export function invertMap<K, V>(javaMap: JavaMap<K, V>): Map<V, K> {
  const result = new Map<V, K>();
  
  const entries = javaMap.entrySet();
  const iter = entries.iterator();
  
  while (iter.hasNext()) {
    const entry = iter.next();
    result.set(entry.getValue(), entry.getKey());
  }
  
  return result;
}

/**
 * Group values by key extracted from value.
 * 
 * @example
 * // Group players by world
 * const byWorld = groupBy(players, p => p.getWorld().getName());
 */
export function groupBy<K, V>(
  items: V[],
  keyExtractor: (item: V) => K
): Map<K, V[]> {
  const result = new Map<K, V[]>();
  
  for (const item of items) {
    const key = keyExtractor(item);
    
    if (!result.has(key)) {
      result.set(key, []);
    }
    
    result.get(key)!.push(item);
  }
  
  return result;
}

/**
 * Create frequency map (count occurrences).
 * 
 * @example
 * const freq = frequency(["a", "b", "a", "c", "a"]);
 * // Map { "a" => 3, "b" => 1, "c" => 1 }
 */
export function frequency<K>(items: K[]): Map<K, number> {
  const result = new Map<K, number>();
  
  for (const item of items) {
    result.set(item, (result.get(item) ?? 0) + 1);
  }
  
  return result;
}

// ============================================
// JAVA MAP UTILITIES
// ============================================

/**
 * Check if a Java HashMap or TypeScript Map is empty.
 */
export function isMapEmpty(map: any): boolean {
  if (typeof map.isEmpty === "function") {
    return map.isEmpty();
  }
  if (typeof map.size === "function") {
    return map.size() === 0;
  }
  if (typeof map.size === "number") {
    return map.size === 0;
  }
  return true;
}

/**
 * Get values from Java HashMap or TypeScript Map as array.
 */
export function getMapValues<T>(map: any): T[] {
  const result: T[] = [];
  
  /* Try Java HashMap.values().iterator() */
  if (typeof map.values === "function") {
    const values = map.values();
    
    if (typeof values.iterator === "function") {
      /* Java Collection */
      const iter = values.iterator();
      while (iter.hasNext()) {
        result.push(iter.next());
      }
      return result;
    }
    
    /* TypeScript Map.values() returns Iterator */
    if (typeof values[Symbol.iterator] === "function") {
      for (const value of values) {
        result.push(value);
      }
      return result;
    }
  }
  
  return result;
}