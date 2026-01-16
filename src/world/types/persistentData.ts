/**
 * DESIGN
 * ------
 * PersistentData API allows storing custom data on entities, items, and other objects.
 * 
 * PERSISTENT DATA SYSTEM:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │              PERSISTENT DATA HIERARCHY                      │
 *   │                                                             │
 *   │   PersistentDataHolder (entity, item, chunk, world, etc.)   │
 *   │           │                                                 │
 *   │           ▼                                                 │
 *   │   PersistentDataContainer (key-value storage)               │
 *   │           │                                                 │
 *   │           ├── get(key, type)                                │
 *   │           ├── set(key, type, value)                         │
 *   │           ├── has(key)                                      │
 *   │           ├── remove(key)                                   │
 *   │           └── getKeys()                                     │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * DATA FLOW:
 * 
 *   ┌──────────────┐     ┌───────────────────┐     ┌─────────────┐
 *   │   Complex    │ ──► │ PersistentDataType│ ──► │  Primitive  │
 *   │    Value     │     │   (serializer)    │     │   Storage   │
 *   │ (UUID, etc.) │     │                   │     │ (byte[], etc)│
 *   └──────────────┘     └───────────────────┘     └─────────────┘
 *           ▲                                             │
 *           │                                             │
 *           └─────────────────────────────────────────────┘
 *                         (deserialization)
 * 
 * SUPPORTED TYPES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │   Primitive Types        │   Complex Types                  │
 *   │   ──────────────────     │   ──────────────────             │
 *   │   BYTE                   │   Custom via adapters            │
 *   │   SHORT                  │   UUID (as byte[])               │
 *   │   INTEGER                │   Location (as compound)         │
 *   │   LONG                   │   etc.                           │
 *   │   FLOAT                  │                                  │
 *   │   DOUBLE                 │                                  │
 *   │   STRING                 │                                  │
 *   │   BYTE_ARRAY             │                                  │
 *   │   INTEGER_ARRAY          │                                  │
 *   │   LONG_ARRAY             │                                  │
 *   │   TAG_CONTAINER          │                                  │
 *   │   TAG_CONTAINER_ARRAY    │                                  │
 *   │   BOOLEAN                │                                  │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * KEY POINTS:
 * - Data persists across server restarts
 * - Each plugin uses its own namespace (no conflicts)
 * - Cannot modify vanilla Minecraft data
 * - Stored in NBT format internally
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/persistence/PersistentDataHolder.html
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/persistence/PersistentDataContainer.html
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/persistence/PersistentDataAdapterContext.html
 */

import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { JavaSet } from "../../java/types/set";


// ============================================
// PERSISTENT DATA TYPE
// ============================================

/**
 * Type definition for persistent data serialization.
 * 
 * P = Primitive type (stored)
 * C = Complex type (used in code)
 */
export interface BukkitPersistentDataType<P, C> {
  /**
   * Get the primitive type class.
   */
  getPrimitiveType(): any;

  /**
   * Get the complex type class.
   */
  getComplexType(): any;

  /**
   * Convert complex type to primitive for storage.
   */
  toPrimitive(complex: C, context: BukkitPersistentDataAdapterContext): P;

  /**
   * Convert primitive back to complex type.
   */
  fromPrimitive(primitive: P, context: BukkitPersistentDataAdapterContext): C;
}

/**
 * Built-in persistent data types.
 */
export interface BukkitPersistentDataTypeClass {
  readonly BYTE: BukkitPersistentDataType<number, number>;
  readonly SHORT: BukkitPersistentDataType<number, number>;
  readonly INTEGER: BukkitPersistentDataType<number, number>;
  readonly LONG: BukkitPersistentDataType<number, number>;
  readonly FLOAT: BukkitPersistentDataType<number, number>;
  readonly DOUBLE: BukkitPersistentDataType<number, number>;
  readonly STRING: BukkitPersistentDataType<string, string>;
  readonly BYTE_ARRAY: BukkitPersistentDataType<number[], number[]>;
  readonly INTEGER_ARRAY: BukkitPersistentDataType<number[], number[]>;
  readonly LONG_ARRAY: BukkitPersistentDataType<number[], number[]>;
  readonly TAG_CONTAINER: BukkitPersistentDataType<BukkitPersistentDataContainer, BukkitPersistentDataContainer>;
  readonly TAG_CONTAINER_ARRAY: BukkitPersistentDataType<BukkitPersistentDataContainer[], BukkitPersistentDataContainer[]>;
  readonly BOOLEAN: BukkitPersistentDataType<number, boolean>;
}

/**
 * Access to PersistentDataType class.
 */
export const PersistentDataType: BukkitPersistentDataTypeClass = org.bukkit.persistence.PersistentDataType;

// ============================================
// PERSISTENT DATA ADAPTER CONTEXT
// ============================================

/**
 * Context for serializing/deserializing persistent data.
 * 
 * Used by PersistentDataType implementations to create
 * new containers for nested data structures.
 */
export interface BukkitPersistentDataAdapterContext {
  /**
   * Create a new empty PersistentDataContainer.
   * 
   * Useful for storing complex nested data.
   * 
   * @returns New empty container
   * 
   * @example
   * const nested = context.newPersistentDataContainer();
   * nested.set(key, PersistentDataType.STRING, "value");
   */
  newPersistentDataContainer(): BukkitPersistentDataContainer;
}

// ============================================
// PERSISTENT DATA CONTAINER
// ============================================

/**
 * A map-like container for storing custom persistent data.
 * 
 * Data stored here persists across server restarts.
 * Each key is namespaced to prevent conflicts between plugins.
 */
export interface BukkitPersistentDataContainer {
  /**
   * Store a value in the container.
   * 
   * @param key Namespaced key
   * @param type Data type for serialization
   * @param value Value to store
   * 
   * @example
   * container.set(key, PersistentDataType.INTEGER, 42);
   * container.set(key, PersistentDataType.STRING, "hello");
   */
  set<P, C>(
    key: BukkitNamespacedKey,
    type: BukkitPersistentDataType<P, C>,
    value: C
  ): void;

  /**
   * Check if a key exists with a specific type.
   * 
   * @param key Key to check
   * @param type Expected type
   * @returns true if key exists with matching type
   */
  has<P, C>(
    key: BukkitNamespacedKey,
    type: BukkitPersistentDataType<P, C>
  ): boolean;

  /**
   * Check if a key exists (any type).
   * 
   * @param key Key to check
   * @returns true if key exists
   */
  has(key: BukkitNamespacedKey): boolean;

  /**
   * Get a value from the container.
   * 
   * @param key Key to look up
   * @param type Expected type
   * @returns Value or null if not found
   * 
   * @example
   * const value = container.get(key, PersistentDataType.INTEGER);
   * if (value !== null) {
   *   console.log(`Value: ${value}`);
   * }
   */
  get<P, C>(
    key: BukkitNamespacedKey,
    type: BukkitPersistentDataType<P, C>
  ): C | null;

  /**
   * Get a value with default fallback.
   * 
   * @param key Key to look up
   * @param type Expected type
   * @param defaultValue Value to return if not found
   * @returns Value or default
   * 
   * @example
   * const count = container.getOrDefault(key, PersistentDataType.INTEGER, 0);
   */
  getOrDefault<P, C>(
    key: BukkitNamespacedKey,
    type: BukkitPersistentDataType<P, C>,
    defaultValue: C
  ): C;

  /**
   * Remove a key from the container.
   * 
   * @param key Key to remove
   */
  remove(key: BukkitNamespacedKey): void;

  /**
   * Get all keys in the container.
   * 
   * @returns Set of keys
   */
  getKeys(): JavaSet<BukkitNamespacedKey>;

  /**
   * Check if the container is empty.
   * 
   * @returns true if no entries
   */
  isEmpty(): boolean;

  /**
   * Copy all values to another container.
   * 
   * @param other Target container
   * @param replace Whether to overwrite existing keys
   */
  copyTo(other: BukkitPersistentDataContainer, replace: boolean): void;

  /**
   * Get the adapter context for this container.
   * 
   * @returns Adapter context
   */
  getAdapterContext(): BukkitPersistentDataAdapterContext;
}

// ============================================
// PERSISTENT DATA HOLDER
// ============================================

/**
 * An object that can store custom persistent data.
 * 
 * Implemented by: Entity, ItemMeta, Chunk, World,
 * TileState (blocks), and many more.
 */
export interface BukkitPersistentDataHolder {
  /**
   * Get the persistent data container.
   * 
   * @returns Container for storing custom data
   * 
   * @example
   * const container = entity.getPersistentDataContainer();
   * container.set(key, PersistentDataType.STRING, "custom data");
   */
  getPersistentDataContainer(): BukkitPersistentDataContainer;
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Check if object is a PersistentDataHolder.
 */
export function isPersistentDataHolder(obj: any): obj is BukkitPersistentDataHolder {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getPersistentDataContainer === "function";
}

/**
 * Check if object is a PersistentDataContainer.
 */
export function isPersistentDataContainer(obj: any): obj is BukkitPersistentDataContainer {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.set === "function" &&
         typeof obj.get === "function" &&
         typeof obj.has === "function" &&
         typeof obj.remove === "function" &&
         typeof obj.getKeys === "function";
}

/**
 * Check if object is a PersistentDataAdapterContext.
 */
export function isPersistentDataAdapterContext(obj: any): obj is BukkitPersistentDataAdapterContext {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.newPersistentDataContainer === "function";
}

// ============================================
// CONTAINER UTILITIES
// ============================================

/**
 * Get container from holder safely.
 */
export function getContainer(holder: BukkitPersistentDataHolder): BukkitPersistentDataContainer {
  return holder.getPersistentDataContainer();
}

/**
 * Check if holder has any persistent data.
 */
export function hasPersistentData(holder: BukkitPersistentDataHolder): boolean {
  return !holder.getPersistentDataContainer().isEmpty();
}

/**
 * Get key count in container.
 */
export function getKeyCount(container: BukkitPersistentDataContainer): number {
  const keys = container.getKeys();
  return typeof keys.size === "function" ? keys.size() : 0;
}

/**
 * Get all keys as array.
 */
export function getKeysArray(container: BukkitPersistentDataContainer): BukkitNamespacedKey[] {
  const keys = container.getKeys();
  const result: BukkitNamespacedKey[] = [];
  
  if (typeof keys.iterator === "function") {
    const iter = keys.iterator();
    while (iter.hasNext()) {
      result.push(iter.next());
    }
  }
  
  return result;
}

/**
 * Get all key strings.
 */
export function getKeyStrings(container: BukkitPersistentDataContainer): string[] {
  return getKeysArray(container).map(key => key.toString());
}

/**
 * Clear all data from container.
 */
export function clearContainer(container: BukkitPersistentDataContainer): void {
  const keys = getKeysArray(container);
  for (const key of keys) {
    container.remove(key);
  }
}

// ============================================
// TYPED GETTERS/SETTERS
// ============================================

/**
 * Set a string value.
 */
export function setString(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  value: string
): void {
  container.set(key, PersistentDataType.STRING, value);
}

/**
 * Get a string value.
 */
export function getString(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey
): string | null {
  return container.get(key, PersistentDataType.STRING);
}

/**
 * Get a string value with default.
 */
export function getStringOrDefault(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  defaultValue: string
): string {
  return container.getOrDefault(key, PersistentDataType.STRING, defaultValue);
}

/**
 * Set an integer value.
 */
export function setInt(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  value: number
): void {
  container.set(key, PersistentDataType.INTEGER, value);
}

/**
 * Get an integer value.
 */
export function getInt(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey
): number | null {
  return container.get(key, PersistentDataType.INTEGER);
}

/**
 * Get an integer value with default.
 */
export function getIntOrDefault(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  defaultValue: number
): number {
  return container.getOrDefault(key, PersistentDataType.INTEGER, defaultValue);
}

/**
 * Set a long value.
 */
export function setLong(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  value: number
): void {
  container.set(key, PersistentDataType.LONG, value);
}

/**
 * Get a long value.
 */
export function getLong(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey
): number | null {
  return container.get(key, PersistentDataType.LONG);
}

/**
 * Get a long value with default.
 */
export function getLongOrDefault(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  defaultValue: number
): number {
  return container.getOrDefault(key, PersistentDataType.LONG, defaultValue);
}

/**
 * Set a double value.
 */
export function setDouble(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  value: number
): void {
  container.set(key, PersistentDataType.DOUBLE, value);
}

/**
 * Get a double value.
 */
export function getDouble(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey
): number | null {
  return container.get(key, PersistentDataType.DOUBLE);
}

/**
 * Get a double value with default.
 */
export function getDoubleOrDefault(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  defaultValue: number
): number {
  return container.getOrDefault(key, PersistentDataType.DOUBLE, defaultValue);
}

/**
 * Set a boolean value.
 */
export function setBoolean(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  value: boolean
): void {
  container.set(key, PersistentDataType.BOOLEAN, value);
}

/**
 * Get a boolean value.
 */
export function getBoolean(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey
): boolean | null {
  return container.get(key, PersistentDataType.BOOLEAN);
}

/**
 * Get a boolean value with default.
 */
export function getBooleanOrDefault(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  defaultValue: boolean
): boolean {
  return container.getOrDefault(key, PersistentDataType.BOOLEAN, defaultValue);
}

/**
 * Set a byte array value.
 */
export function setByteArray(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  value: number[]
): void {
  container.set(key, PersistentDataType.BYTE_ARRAY, value);
}

/**
 * Get a byte array value.
 */
export function getByteArray(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey
): number[] | null {
  return container.get(key, PersistentDataType.BYTE_ARRAY);
}

/**
 * Set an integer array value.
 */
export function setIntArray(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey,
  value: number[]
): void {
  container.set(key, PersistentDataType.INTEGER_ARRAY, value);
}

/**
 * Get an integer array value.
 */
export function getIntArray(
  container: BukkitPersistentDataContainer,
  key: BukkitNamespacedKey
): number[] | null {
  return container.get(key, PersistentDataType.INTEGER_ARRAY);
}

// ============================================
// HOLDER UTILITIES
// ============================================

/**
 * Set string on holder.
 */
export function setHolderString(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey,
  value: string
): void {
  setString(holder.getPersistentDataContainer(), key, value);
}

/**
 * Get string from holder.
 */
export function getHolderString(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey
): string | null {
  return getString(holder.getPersistentDataContainer(), key);
}

/**
 * Set int on holder.
 */
export function setHolderInt(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey,
  value: number
): void {
  setInt(holder.getPersistentDataContainer(), key, value);
}

/**
 * Get int from holder.
 */
export function getHolderInt(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey
): number | null {
  return getInt(holder.getPersistentDataContainer(), key);
}

/**
 * Set boolean on holder.
 */
export function setHolderBoolean(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey,
  value: boolean
): void {
  setBoolean(holder.getPersistentDataContainer(), key, value);
}

/**
 * Get boolean from holder.
 */
export function getHolderBoolean(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey
): boolean | null {
  return getBoolean(holder.getPersistentDataContainer(), key);
}

/**
 * Check if holder has key.
 */
export function holderHas(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey
): boolean {
  return holder.getPersistentDataContainer().has(key);
}

/**
 * Remove key from holder.
 */
export function holderRemove(
  holder: BukkitPersistentDataHolder,
  key: BukkitNamespacedKey
): void {
  holder.getPersistentDataContainer().remove(key);
}

// ============================================
// COPY UTILITIES
// ============================================

/**
 * Copy data from one holder to another.
 */
export function copyPersistentData(
  source: BukkitPersistentDataHolder,
  target: BukkitPersistentDataHolder,
  replace: boolean = true
): void {
  source.getPersistentDataContainer().copyTo(
    target.getPersistentDataContainer(),
    replace
  );
}

/**
 * Merge data from multiple holders into one.
 */
export function mergePersistentData(
  sources: BukkitPersistentDataHolder[],
  target: BukkitPersistentDataHolder,
  replace: boolean = false
): void {
  const targetContainer = target.getPersistentDataContainer();
  
  for (const source of sources) {
    source.getPersistentDataContainer().copyTo(targetContainer, replace);
  }
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a persistent data container.
 */
export function describeContainer(container: BukkitPersistentDataContainer): string {
  const count = getKeyCount(container);
  if (count === 0) {
    return "Empty container";
  }
  return `Container with ${count} key(s)`;
}

/**
 * Get container info as plain object.
 */
export function getContainerInfo(container: BukkitPersistentDataContainer): {
  isEmpty: boolean;
  keyCount: number;
  keys: string[];
} {
  return {
    isEmpty: container.isEmpty(),
    keyCount: getKeyCount(container),
    keys: getKeyStrings(container),
  };
}

/**
 * Describe a persistent data holder.
 */
export function describeHolder(holder: BukkitPersistentDataHolder): string {
  const container = holder.getPersistentDataContainer();
  const count = getKeyCount(container);
  
  if (count === 0) {
    return "No persistent data";
  }
  
  return `${count} persistent data key(s)`;
}

/**
 * Get holder info as plain object.
 */
export function getHolderInfo(holder: BukkitPersistentDataHolder): {
  hasPersistentData: boolean;
  keyCount: number;
  keys: string[];
} {
  const container = holder.getPersistentDataContainer();
  
  return {
    hasPersistentData: !container.isEmpty(),
    keyCount: getKeyCount(container),
    keys: getKeyStrings(container),
  };
}