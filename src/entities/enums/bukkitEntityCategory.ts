/**
 * A classification of entities which may behave differently than others
 * or be affected uniquely by enchantments and potion effects among other things.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntityCategory.html
 */

export interface BukkitEntityCategory {
  /**
   * Returns the name of this enum constant.
   * @returns The name
   */
  name(): string;

  /**
   * Returns the string representation.
   * @returns String representation
   */
  toString(): string;
}

/**
 * Entity category enum values.
 * 
 * WHY OBJECT INSTEAD OF ENUM: TypeScript enums compile to plain objects
 * with string/number values. We need the actual Java enum values that
 * Bukkit understands at runtime for comparisons and method calls.
 */
export const EntityCategory: Record<string, BukkitEntityCategory> = {
  /** Entities of the arthropod family (spiders, silverfish, etc.) */
  ARTHROPOD: org.bukkit.entity.EntityCategory.ARTHROPOD,

  /** Entities that participate in raids (pillagers, ravagers, etc.) */
  ILLAGER: org.bukkit.entity.EntityCategory.ILLAGER,

  /** Any uncategorized entity */
  NONE: org.bukkit.entity.EntityCategory.NONE,

  /** Undead creatures (zombies, skeletons, phantoms, etc.) */
  UNDEAD: org.bukkit.entity.EntityCategory.UNDEAD,

  /** Entities that reside primarily underwater (excluding Drowned) */
  WATER: org.bukkit.entity.EntityCategory.WATER,
};

/**
 * Type for EntityCategory keys - enables autocomplete.
 * 
 * @example
 * function checkCategory(category: EntityCategoryKey) { ... }
 * checkCategory("UNDEAD")    // OK
 * checkCategory("ZOMBIE")    // Error - not a valid key
 */
export type EntityCategoryKey = keyof typeof EntityCategory;