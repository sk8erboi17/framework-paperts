/**
 * JavaEnum - TypeScript abstraction for Java enum instances
 * 
 * DESIGN
 * ------
 * 
 * Java enums have a well-defined contract that every enum value must satisfy.
 * This interface mirrors that contract, allowing TypeScript code to interact
 * with Java enums in a type-safe manner through the Javet bridge.
 * 
 * Every Java enum constant has these methods available:
 *   - name(): Returns the exact name as declared in the enum
 *   - ordinal(): Returns the position (0-indexed) in the declaration order
 *   - toString(): Usually same as name(), but can be overridden in Java
 *   - compareTo(): Compares based on ordinal values
 *   - getDeclaringClass(): Returns the Class object of the enum type
 * 
 * WHY: Why use a generic parameter `T extends string`?
 * ----------------------------------------------------
 * 
 * The generic parameter allows for stricter typing when the enum keys are known.
 * 
 * Without generic:
 *   const biome: JavaEnum = Biome.DESERT;
 *   biome.name(); // Returns: string (too broad)
 * 
 * With generic:
 *   const biome: JavaEnum<BiomeKey> = Biome.DESERT;
 *   biome.name(); // Returns: BiomeKey (exact union of valid names)
 * 
 * The default `= string` ensures backward compatibility when the caller
 * doesn't need or know the specific enum key type.
 * 
 * @template T - Union type of valid enum constant names (defaults to string)
 */
export interface JavaEnum<T extends string = string> {
  name(): T;
  ordinal(): number;
  toString(): string;
  compareTo(other: JavaEnum<T>): number;
  getDeclaringClass(): any;
}

/**
 * JavaEnumClass - TypeScript abstraction for Java enum class (static side)
 * 
 * DESIGN
 * ------
 * 
 * In Java, enums have two "sides":
 *   1. Instance side: Methods available on each enum constant (JavaEnum)
 *   2. Static side: Methods available on the enum class itself (JavaEnumClass)
 * 
 * This interface represents the static side, providing:
 *   - values(): Returns array of all enum constants in declaration order
 *   - valueOf(name): Returns the enum constant with the exact name, or throws
 * 
 * WHY: Why separate JavaEnum and JavaEnumClass?
 * ---------------------------------------------
 * 
 * Java separates instance and static members. When we access:
 *   - Biome.DESERT.name() -> Instance method (JavaEnum)
 *   - Biome.values() -> Static method (JavaEnumClass)
 * 
 * TypeScript needs both interfaces to properly type the combined object:
 *   Record<string, BukkitBiome> & JavaEnumClass<BukkitBiome>
 *   ~~~~~~~~~~~~~~~~~~~~~~~~      ~~~~~~~~~~~~~~~~~~~~~~~~
 *   Instance values (DESERT)      Static methods (values())
 * 
 * Alternative considered: Single interface with both
 *   
 *   DOES NOT work cleanly because enum constants and static methods
 *   live in different "namespaces" in Java. Mixing them would create
 *   confusion about what's a constant vs what's a method.
 * 
 * @template E - The enum instance type that this class produces
 */
export interface JavaEnumClass<E extends JavaEnum<string>> {
  values(): E[];
  valueOf(name: string): E;
}

/**
 * Returns all enum constants in declaration order.
 * 
 * WHY: Why wrap enumClass.values() in a function?
 * -----------------------------------------------
 * 
 * 1. Consistency: Provides a functional API alongside OOP style
 * 2. Null-safety: Could add validation in the future
 * 3. Abstraction: Caller doesn't need to know about JavaEnumClass interface
 * 
 * @example
 * const allBiomes = enumValues(Biome);
 * // Equivalent to: Biome.values()
 */
export function enumValues<E extends JavaEnum>(enumClass: JavaEnumClass<E>): E[] {
  return enumClass.values();
}

/**
 * Returns the enum constant with the specified name.
 * 
 * WARNING: Throws an exception if the name doesn't match any constant.
 * Use isEnumValue() first if you need to check validity without exceptions.
 * 
 * @example
 * const desert = enumValueOf(Biome, "DESERT"); // Returns Biome.DESERT
 * const invalid = enumValueOf(Biome, "INVALID"); // Throws!
 */
export function enumValueOf<E extends JavaEnum>(enumClass: JavaEnumClass<E>, name: string): E {
  return enumClass.valueOf(name);
}

/**
 * Returns an array of all enum constant names.
 * 
 * WHY: Why not just use Object.keys(Biome)?
 * -----------------------------------------
 * 
 * Object.keys() would include the static methods (values, valueOf) as keys,
 * not just the enum constants. This function uses the Java enum's own
 * values() method to get only the actual constants, then extracts their names.
 * 
 * Object.keys(Biome) -> ["DESERT", "JUNGLE", ..., "values", "valueOf"]
 * enumNames(Biome)   -> ["DESERT", "JUNGLE", ...]
 * 
 * @example
 * const names = enumNames(Biome);
 * // ["BADLANDS", "BAMBOO_JUNGLE", "BASALT_DELTAS", ...]
 */
export function enumNames<E extends JavaEnum>(enumClass: JavaEnumClass<E>): string[] {
  return enumClass.values().map((e: E) => e.name());
}

/**
 * Returns the enum constant at the specified ordinal position.
 * 
 * WHY: Why return null instead of throwing?
 * -----------------------------------------
 * 
 * Unlike valueOf() which has a direct Java equivalent that throws,
 * there's no Java method to get an enum by ordinal. This is a convenience
 * function we're adding. Returning null for invalid ordinals is:
 *   1. Safer: No unexpected exceptions
 *   2. Idiomatic: TypeScript commonly uses null for "not found"
 *   3. Chainable: Works with nullish coalescing (??)
 * 
 * @example
 * const first = enumFromOrdinal(Biome, 0);   // First declared biome
 * const invalid = enumFromOrdinal(Biome, -1); // null
 * const fallback = enumFromOrdinal(Biome, 999) ?? Biome.PLAINS;
 */
export function enumFromOrdinal<E extends JavaEnum>(enumClass: JavaEnumClass<E>, ordinal: number): E | null {
  const values = enumClass.values();
  return ordinal >= 0 && ordinal < values.length ? values[ordinal] : null;
}

/**
 * Checks if a string is a valid enum constant name.
 * 
 * WHY: Why use try-catch instead of checking values()?
 * ----------------------------------------------------
 * 
 * Two approaches were considered:
 * 
 * 1. Array search: enumClass.values().some(e => e.name() === name)
 *    - Creates intermediate array every call
 *    - O(n) linear search through all constants
 *    - Works, but inefficient for large enums
 * 
 * 2. Try-catch valueOf(): Current implementation
 *    - Delegates to Java's optimized lookup (typically HashMap-based)
 *    - O(1) constant time in most JVM implementations
 *    - Exception handling has overhead, but only on invalid names
 * 
 * For valid names (common case), approach 2 is faster.
 * For invalid names (edge case), approach 1 might be slightly faster,
 * but the difference is negligible for typical usage patterns.
 * 
 * @example
 * if (isEnumValue(Biome, userInput)) {
 *   const biome = enumValueOf(Biome, userInput); // Safe, won't throw
 * }
 */
export function isEnumValue<E extends JavaEnum>(enumClass: JavaEnumClass<E>, name: string): boolean {
  try {
    enumClass.valueOf(name);
    return true;
  } catch {
    return false;
  }
}