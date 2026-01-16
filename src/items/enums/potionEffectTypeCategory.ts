/**
 * Represents a category of PotionEffectType and its effect on an entity.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffectTypeCategory.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type PotionEffectTypeCategoryKey = "BENEFICIAL" | "HARMFUL" | "NEUTRAL";

// ============================================
// INTERFACE
// ============================================

export interface BukkitPotionEffectTypeCategory extends JavaEnum<PotionEffectTypeCategoryKey> {
  // All methods inherited from JavaEnum
}

// ============================================
// POTION EFFECT TYPE CATEGORY CLASS INTERFACE
// ============================================

/*
 * What this type does, step by step:
 * 
 *   Record<PotionEffectTypeCategoryKey, BukkitPotionEffectTypeCategory>
 *   
 *   Expands to:
 *   {
 *     BENEFICIAL: BukkitPotionEffectTypeCategory;
 *     HARMFUL: BukkitPotionEffectTypeCategory;
 *     NEUTRAL: BukkitPotionEffectTypeCategory;
 *     valueOf(): Object;  // <-- inherited from Object, problem!
 *   }
 * 
 *   keyof JavaEnumClass<BukkitPotionEffectTypeCategory>
 *   
 *   Expands to: "values" | "valueOf"
 * 
 *   Omit<Record<...>, "values" | "valueOf">
 *   
 *   Expands to:
 *   {
 *     BENEFICIAL: BukkitPotionEffectTypeCategory;
 *     HARMFUL: BukkitPotionEffectTypeCategory;
 *     NEUTRAL: BukkitPotionEffectTypeCategory;
 *     // valueOf removed!
 *   }
 * 
 *   ... & JavaEnumClass<BukkitPotionEffectTypeCategory>
 *   
 *   Final result:
 *   {
 *     BENEFICIAL: BukkitPotionEffectTypeCategory;
 *     HARMFUL: BukkitPotionEffectTypeCategory;
 *     NEUTRAL: BukkitPotionEffectTypeCategory;
 *     values(): BukkitPotionEffectTypeCategory[];
 *     valueOf(name: string): BukkitPotionEffectTypeCategory;
 *   }
 * 
 * Now valueOf has the correct signature from JavaEnumClass, not from Object.
 */
interface PotionEffectTypeCategoryClass extends 
  Omit<Record<PotionEffectTypeCategoryKey, BukkitPotionEffectTypeCategory>, keyof JavaEnumClass<BukkitPotionEffectTypeCategory>>, 
  JavaEnumClass<BukkitPotionEffectTypeCategory> {
}

// ============================================
// POTION EFFECT TYPE CATEGORIES
// ============================================

export const PotionEffectTypeCategory: PotionEffectTypeCategoryClass = {
  /** Beneficial effects that positively impact an entity, such as Regeneration, Absorption, or Fire Resistance. */
  BENEFICIAL: org.bukkit.potion.PotionEffectTypeCategory.BENEFICIAL,

  /** Harmful effects that negatively impact an entity, such as Blindness, Wither, or Levitation. */
  HARMFUL: org.bukkit.potion.PotionEffectTypeCategory.HARMFUL,

  /** Neutral effects that have neither a positive nor negative effect on an entity, such as Glowing or Bad Omen. */
  NEUTRAL: org.bukkit.potion.PotionEffectTypeCategory.NEUTRAL,

  // Static enum methods
  values(): BukkitPotionEffectTypeCategory[] {
    return org.bukkit.potion.PotionEffectTypeCategory.values();
  },

  valueOf(name: string): BukkitPotionEffectTypeCategory {
    return org.bukkit.potion.PotionEffectTypeCategory.valueOf(name);
  },
};