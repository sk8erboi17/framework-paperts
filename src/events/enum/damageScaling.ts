/**
 * A means of damage scaling with respect to the server's difficulty.
 * 
 * Determines whether damage from a DamageType scales based on
 * game difficulty (Peaceful, Easy, Normal, Hard).
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/damage/DamageScaling.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type DamageScalingKey = "NEVER" | "WHEN_CAUSED_BY_LIVING_NON_PLAYER" | "ALWAYS";

// ============================================
// INTERFACE
// ============================================

export interface BukkitDamageScaling extends JavaEnum<DamageScalingKey> {
  // No additional methods.
}

// ============================================
// DAMAGE SCALING CLASS INTERFACE
// ============================================

interface DamageScalingClass extends
  Omit<Record<DamageScalingKey, BukkitDamageScaling>, keyof JavaEnumClass<BukkitDamageScaling>>,
  JavaEnumClass<BukkitDamageScaling> {
}

// ============================================
// DAMAGE SCALINGS
// ============================================

export const DamageScaling: DamageScalingClass = {
  /**
   * Damage is never scaled by difficulty.
   * Same damage on Easy, Normal, and Hard.
   * Examples: fall damage, drowning, void
   */
  NEVER: org.bukkit.damage.DamageScaling.NEVER,

  /**
   * Damage scales only when caused by non-player living entity.
   * Mob attacks scale with difficulty, player attacks don't.
   * Most mob-related damage uses this.
   */
  WHEN_CAUSED_BY_LIVING_NON_PLAYER: org.bukkit.damage.DamageScaling.WHEN_CAUSED_BY_LIVING_NON_PLAYER,

  /**
   * Damage is always scaled by difficulty.
   * Rare, used for specific damage types.
   */
  ALWAYS: org.bukkit.damage.DamageScaling.ALWAYS,

  values(): BukkitDamageScaling[] {
    return org.bukkit.damage.DamageScaling.values();
  },

  valueOf(name: string): BukkitDamageScaling {
    return org.bukkit.damage.DamageScaling.valueOf(name);
  },
};