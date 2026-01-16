/**
 * A classification of entities which may behave differently than others
 * or be affected uniquely by enchantments and potion effects among other things.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntityCategory.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type EntityCategoryKey =
    "ARTHROPOD" | "ILLAGER" | "NONE" | "UNDEAD" | "WATER";

// ============================================
// INTERFACE
// ============================================

export interface BukkitEntityCategory extends JavaEnum<EntityCategoryKey> {
  // All methods inherited from JavaEnum
}

// ============================================
// ENTITY CATEGORIES
// ============================================

export const EntityCategory: Record<EntityCategoryKey, BukkitEntityCategory> & JavaEnumClass<BukkitEntityCategory> = {
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

  // Enum methods
  values(): BukkitEntityCategory[] {
    return org.bukkit.entity.EntityCategory.values();
  },

  valueOf(name: string): BukkitEntityCategory {
    return org.bukkit.entity.EntityCategory.valueOf(name);
  },
};