/**
 * Represents a level of support a block can give on one of its faces.
 * 
 * Any face may support none, some, or all of these values. For example:
 * - Grass block top: supports FULL, CENTER, and RIGID
 * - Campfire sides: support nothing
 * - Campfire bottom: supports FULL and CENTER
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/BlockSupport.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type BlockSupportKey = "FULL" | "CENTER" | "RIGID";

// ============================================
// INTERFACE
// ============================================

export interface BukkitBlockSupport extends JavaEnum<BlockSupportKey> {
  // No additional methods. Standard enum stuff from JavaEnum.
}

// ============================================
// BLOCK SUPPORT CLASS INTERFACE
// ============================================

interface BlockSupportClass extends
  Omit<Record<BlockSupportKey, BukkitBlockSupport>, keyof JavaEnumClass<BukkitBlockSupport>>,
  JavaEnumClass<BukkitBlockSupport> {
}

// ============================================
// BLOCK SUPPORTS
// ============================================

export const BlockSupport: BlockSupportClass = {
  /**
   * Face is treated as full block.
   * Stair sides are NOT full (can't support wall torch).
   * Stair back and bottom ARE full.
   */
  FULL: org.bukkit.block.BlockSupport.FULL,

  /**
   * Face can support blocks towards center.
   * Walls and fence posts can support standing torches
   * because there's solid material in the middle.
   */
  CENTER: org.bukkit.block.BlockSupport.CENTER,

  /**
   * Face can support fragile blocks like rails.
   * Most full-supportable top faces are rigid.
   * Walls, posts, and stone block sides are NOT rigid.
   */
  RIGID: org.bukkit.block.BlockSupport.RIGID,

  values(): BukkitBlockSupport[] {
    return org.bukkit.block.BlockSupport.values();
  },

  valueOf(name: string): BukkitBlockSupport {
    return org.bukkit.block.BlockSupport.valueOf(name);
  },
};