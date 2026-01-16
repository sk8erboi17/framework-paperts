/**
 * Represents how a Structure can be rotated.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/structure/StructureRotation.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type StructureRotationKey = "NONE" | "CLOCKWISE_90" | "CLOCKWISE_180" | "COUNTERCLOCKWISE_90";

// ============================================
// INTERFACE
// ============================================

export interface BukkitStructureRotation extends JavaEnum<StructureRotationKey> {
  // No additional methods. Standard enum stuff from JavaEnum.
}

// ============================================
// STRUCTURE ROTATION CLASS INTERFACE
// ============================================

interface StructureRotationClass extends
  Omit<Record<StructureRotationKey, BukkitStructureRotation>, keyof JavaEnumClass<BukkitStructureRotation>>,
  JavaEnumClass<BukkitStructureRotation> {
}

// ============================================
// STRUCTURE ROTATIONS
// ============================================

export const StructureRotation: StructureRotationClass = {
  /** No rotation. 0 degrees. */
  NONE: org.bukkit.block.structure.StructureRotation.NONE,

  /** Clockwise 90 degrees. */
  CLOCKWISE_90: org.bukkit.block.structure.StructureRotation.CLOCKWISE_90,

  /** Clockwise 180 degrees. */
  CLOCKWISE_180: org.bukkit.block.structure.StructureRotation.CLOCKWISE_180,

  /** Counter-clockwise 90 degrees. Same as clockwise 270. */
  COUNTERCLOCKWISE_90: org.bukkit.block.structure.StructureRotation.COUNTERCLOCKWISE_90,

  values(): BukkitStructureRotation[] {
    return org.bukkit.block.structure.StructureRotation.values();
  },

  valueOf(name: string): BukkitStructureRotation {
    return org.bukkit.block.structure.StructureRotation.valueOf(name);
  },
};