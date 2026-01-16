/**
 * Represents a type of death message used by a DamageSource.
 * 
 * Determines how the death message is formatted when an entity dies.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/damage/DeathMessageType.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type DeathMessageTypeKey = "DEFAULT" | "FALL_VARIANTS" | "INTENTIONAL_GAME_DESIGN";

// ============================================
// INTERFACE
// ============================================

export interface BukkitDeathMessageType extends JavaEnum<DeathMessageTypeKey> {
  // No additional methods.
}

// ============================================
// DEATH MESSAGE TYPE CLASS INTERFACE
// ============================================

interface DeathMessageTypeClass extends
  Omit<Record<DeathMessageTypeKey, BukkitDeathMessageType>, keyof JavaEnumClass<BukkitDeathMessageType>>,
  JavaEnumClass<BukkitDeathMessageType> {
}

// ============================================
// DEATH MESSAGE TYPES
// ============================================

export const DeathMessageType: DeathMessageTypeClass = {
  /**
   * No special death message logic.
   * Uses the standard translation key from DamageType.
   */
  DEFAULT: org.bukkit.damage.DeathMessageType.DEFAULT,

  /**
   * Shows fall damage death variants.
   * Example: "Player was doomed to fall by Skeleton"
   * Uses keys like death.fell.assist.item
   */
  FALL_VARIANTS: org.bukkit.damage.DeathMessageType.FALL_VARIANTS,

  /**
   * Shows the "Intentional Game Design" message.
   * Used when sleeping in bed/respawn anchor in wrong dimension.
   * The message is a clickable link to MCPE-28723.
   */
  INTENTIONAL_GAME_DESIGN: org.bukkit.damage.DeathMessageType.INTENTIONAL_GAME_DESIGN,

  values(): BukkitDeathMessageType[] {
    return org.bukkit.damage.DeathMessageType.values();
  },

  valueOf(name: string): BukkitDeathMessageType {
    return org.bukkit.damage.DeathMessageType.valueOf(name);
  },
};