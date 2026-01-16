/**
 * Represents a metadata value that can be attached to Metadatable objects.
 * 
 * Values can be retrieved in various types via the as*() methods.
 * Each value is owned by a specific plugin.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/metadata/MetadataValue.html
 */

// ============================================
// INTERFACE
// ============================================

export interface BukkitMetadataValue {
  /**
   * The raw value. Can be any type.
   */
  value(): object | null;

  /**
   * Convert to int.
   */
  asInt(): number;

  /**
   * Convert to float.
   */
  asFloat(): number;

  /**
   * Convert to double.
   */
  asDouble(): number;

  /**
   * Convert to long.
   */
  asLong(): number;

  /**
   * Convert to short.
   */
  asShort(): number;

  /**
   * Convert to byte.
   */
  asByte(): number;

  /**
   * Convert to boolean.
   */
  asBoolean(): boolean;

  /**
   * Convert to string.
   */
  asString(): string;

  /**
   * Invalidate cached value, forcing recompute on next access.
   * Only meaningful for LazyMetadataValue.
   */
  invalidate(): void;
}