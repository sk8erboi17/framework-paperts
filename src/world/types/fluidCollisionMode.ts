/**
 * Determines the collision behavior when fluids get hit during ray tracing.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/FluidCollisionMode.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";


// ============================================
// TYPE DEFINITIONS
// ============================================

export type FluidCollisionModeKey = "NEVER" | "SOURCE_ONLY" | "ALWAYS";

// ============================================
// INTERFACE
// ============================================

export interface BukkitFluidCollisionMode extends JavaEnum<FluidCollisionModeKey> {
  // No additional methods. Just the standard enum stuff from JavaEnum.
}

// ============================================
// FLUID COLLISION MODE CLASS INTERFACE
// ============================================

interface FluidCollisionModeClass extends
  Omit<Record<FluidCollisionModeKey, BukkitFluidCollisionMode>, keyof JavaEnumClass<BukkitFluidCollisionMode>>,
  JavaEnumClass<BukkitFluidCollisionMode> {
}

// ============================================
// FLUID COLLISION MODES
// ============================================

export const FluidCollisionMode: FluidCollisionModeClass = {
  /** Ignore fluids. Raycast passes through water and lava. */
  NEVER: org.bukkit.FluidCollisionMode.NEVER,

  /** Only collide with source fluid blocks. Flowing water/lava ignored. */
  SOURCE_ONLY: org.bukkit.FluidCollisionMode.SOURCE_ONLY,

  /** Collide with all fluids. Source and flowing. */
  ALWAYS: org.bukkit.FluidCollisionMode.ALWAYS,

  values(): BukkitFluidCollisionMode[] {
    return org.bukkit.FluidCollisionMode.values();
  },

  valueOf(name: string): BukkitFluidCollisionMode {
    return org.bukkit.FluidCollisionMode.valueOf(name);
  },
};