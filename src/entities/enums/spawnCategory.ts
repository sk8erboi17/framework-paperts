/**
 * Represents groups of entities with shared spawn behaviors and mob caps.
 * 
 * Each category has its own mob cap that limits how many entities
 * of that type can spawn in a given area.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/SpawnCategory.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type SpawnCategoryKey =
  | "MONSTER" | "ANIMAL" | "WATER_ANIMAL" | "WATER_AMBIENT"
  | "WATER_UNDERGROUND_CREATURE" | "AMBIENT" | "AXOLOTL" | "MISC";

// ============================================
// INTERFACE
// ============================================

export interface BukkitSpawnCategory extends JavaEnum<SpawnCategoryKey> {
  // No additional methods.
}

// ============================================
// SPAWN CATEGORY CLASS INTERFACE
// ============================================

interface SpawnCategoryClass extends
  Omit<Record<SpawnCategoryKey, BukkitSpawnCategory>, keyof JavaEnumClass<BukkitSpawnCategory>>,
  JavaEnumClass<BukkitSpawnCategory> {
}

// ============================================
// SPAWN CATEGORIES
// ============================================

export const SpawnCategory: SpawnCategoryClass = {
  /**
   * Hostile mobs: Zombie, Creeper, Skeleton, Witch, etc.
   * Default mob cap: 70
   */
  MONSTER: org.bukkit.entity.SpawnCategory.MONSTER,

  /**
   * Passive land animals: Cow, Pig, Sheep, Chicken, Strider, Turtle, etc.
   * Default mob cap: 10
   */
  ANIMAL: org.bukkit.entity.SpawnCategory.ANIMAL,

  /**
   * Water animals: Squid, Dolphin.
   * Default mob cap: 5
   */
  WATER_ANIMAL: org.bukkit.entity.SpawnCategory.WATER_ANIMAL,

  /**
   * Ambient water creatures: Cod, Salmon, Tropical Fish, Pufferfish.
   * Default mob cap: 20
   */
  WATER_AMBIENT: org.bukkit.entity.SpawnCategory.WATER_AMBIENT,

  /**
   * Underground water creatures: Glow Squid.
   * Default mob cap: 5
   */
  WATER_UNDERGROUND_CREATURE: org.bukkit.entity.SpawnCategory.WATER_UNDERGROUND_CREATURE,

  /**
   * Ambient mobs: Bat.
   * Default mob cap: 15
   */
  AMBIENT: org.bukkit.entity.SpawnCategory.AMBIENT,

  /**
   * Axolotls only. Separate category due to unique spawn rules.
   * Default mob cap: 5
   */
  AXOLOTL: org.bukkit.entity.SpawnCategory.AXOLOTL,

  /**
   * Non-mob entities: Player, ArmorStand, Boat, ItemFrame, etc.
   * No mob cap (not naturally spawning).
   */
  MISC: org.bukkit.entity.SpawnCategory.MISC,

  values(): BukkitSpawnCategory[] {
    return org.bukkit.entity.SpawnCategory.values();
  },

  valueOf(name: string): BukkitSpawnCategory {
    return org.bukkit.entity.SpawnCategory.valueOf(name);
  },
};