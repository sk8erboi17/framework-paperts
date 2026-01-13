/**
 * A class that represents an immutable universally unique identifier (UUID).
 * A UUID represents a 128-bit value.
 * 
 * @see https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/UUID.html
 */

export interface JavaUUID {
  /**
   * Returns the least significant 64 bits of this UUID's 128 bit value.
   * @returns The least significant 64 bits
   */
  getLeastSignificantBits(): number;

  /**
   * Returns the most significant 64 bits of this UUID's 128 bit value.
   * @returns The most significant 64 bits
   */
  getMostSignificantBits(): number;

  /**
   * The version number associated with this UUID.
   * 1 = Time-based, 2 = DCE security, 3 = Name-based, 4 = Random
   * @returns The version number
   */
  version(): number;

  /**
   * The variant number associated with this UUID.
   * @returns The variant number
   */
  variant(): number;

  /**
   * The timestamp value associated with this UUID.
   * Only meaningful for version 1 (time-based) UUIDs.
   * @returns The timestamp
   * @throws UnsupportedOperationException if not version 1
   */
  timestamp(): number;

  /**
   * The clock sequence value associated with this UUID.
   * Only meaningful for version 1 (time-based) UUIDs.
   * @returns The clock sequence
   * @throws UnsupportedOperationException if not version 1
   */
  clockSequence(): number;

  /**
   * The node value associated with this UUID.
   * Only meaningful for version 1 (time-based) UUIDs.
   * @returns The node value
   * @throws UnsupportedOperationException if not version 1
   */
  node(): number;

  /**
   * Returns a String object representing this UUID.
   * Format: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
   * @returns A string representation of this UUID
   */
  toString(): string;

  /**
   * Compares this UUID with the specified UUID.
   * @param val - UUID to compare to
   * @returns -1, 0 or 1 as this UUID is less than, equal to, or greater than val
   */
  compareTo(val: JavaUUID): number;

  /**
   * Compares this object to the specified object.
   * @param obj - The object to compare
   * @returns True if the objects are the same
   */
  equals(obj: any): boolean;

  /**
   * Returns a hash code for this UUID.
   * @returns A hash code value
   */
  hashCode(): number;
}


/**
 * Static factory to retrieve a type 4 (pseudo randomly generated) UUID.
 * The UUID is generated using a cryptographically strong pseudo random number generator.
 * 
 * @returns A randomly generated UUID
 * 
 * @example
 * const uuid = randomUUID();
 * console.log(uuid.toString());  // "550e8400-e29b-41d4-a716-446655440000"
 */
export function randomUUID(): JavaUUID {
  return java.util.UUID.randomUUID();
}

/**
 * Creates a UUID from the string standard representation.
 * 
 * @param name - A string in format "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
 * @returns A UUID with the specified value
 * @throws IllegalArgumentException if string format is invalid
 * 
 * @example
 * const uuid = fromUUIDString("550e8400-e29b-41d4-a716-446655440000");
 */
export function fromUUIDString(name: string): JavaUUID {
  return java.util.UUID.fromString(name);
}

/**
 * Constructs a new UUID using the specified data.
 * 
 * @param mostSigBits - The most significant 64 bits
 * @param leastSigBits - The least significant 64 bits
 * @returns A new UUID
 * 
 * @example
 * const uuid = createUUID(0x550e8400e29b41d4, 0xa716446655440000);
 */
export function createUUID(mostSigBits: number, leastSigBits: number): JavaUUID {
  return new java.util.UUID(mostSigBits, leastSigBits);
}

/**
 * Static factory to retrieve a type 3 (name based) UUID based on the specified byte array.
 * 
 * @param name - A byte array to be used to construct a UUID
 * @returns A UUID generated from the specified array
 */
export function nameUUIDFromBytes(name: number[]): JavaUUID {
  return java.util.UUID.nameUUIDFromBytes(name);
}

/**
 * Gets a player by their UUID.
 * 
 * @param uuid - The player's UUID (string or JavaUUID object)
 * @returns The player or null if not online
 * 
 * @example
 * const player = getPlayerByUUID("f24f95da-b97e-4f87-99e1-b03d2072eeb1");
 */
export function getPlayerByUUID(uuid: string | JavaUUID): any | null {
  const uuidObj = typeof uuid === "string" ? fromUUIDString(uuid) : uuid;
  return org.bukkit.Bukkit.getPlayer(uuidObj);
}

/**
 * Gets an offline player by their UUID.
 * 
 * @param uuid - The player's UUID (string or JavaUUID object)
 * @returns The offline player (never null, but may not have played before)
 * 
 * @example
 * const offlinePlayer = getOfflinePlayerByUUID("f24f95da-b97e-4f87-99e1-b03d2072eeb1");
 */
export function getOfflinePlayerByUUID(uuid: string | JavaUUID): any {
  const uuidObj = typeof uuid === "string" ? fromUUIDString(uuid) : uuid;
  return org.bukkit.Bukkit.getOfflinePlayer(uuidObj);
}