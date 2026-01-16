/**
 * Represents how a Structure can be mirrored upon being loaded.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/structure/Mirror.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type MirrorKey = "NONE" | "LEFT_RIGHT" | "FRONT_BACK";

// ============================================
// INTERFACE
// ============================================

export interface BukkitMirror extends JavaEnum<MirrorKey> {
  // No additional methods. Standard enum stuff from JavaEnum.
}

// ============================================
// MIRROR CLASS INTERFACE
// ============================================

interface MirrorClass extends
  Omit<Record<MirrorKey, BukkitMirror>, keyof JavaEnumClass<BukkitMirror>>,
  JavaEnumClass<BukkitMirror> {
}

// ============================================
// MIRRORS
// ============================================

export const Mirror: MirrorClass = {
  /** No mirroring. Positive X to Positive Z. */
  NONE: org.bukkit.block.structure.Mirror.NONE,

  /** Mirrored left to right. Like looking in a mirror. Positive X to Negative Z. */
  LEFT_RIGHT: org.bukkit.block.structure.Mirror.LEFT_RIGHT,

  /** Mirrored front to back. Positive Z to Negative X. */
  FRONT_BACK: org.bukkit.block.structure.Mirror.FRONT_BACK,

  values(): BukkitMirror[] {
    return org.bukkit.block.structure.Mirror.values();
  },

  valueOf(name: string): BukkitMirror {
    return org.bukkit.block.structure.Mirror.valueOf(name);
  },
};