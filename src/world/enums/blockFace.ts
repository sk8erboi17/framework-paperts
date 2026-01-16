/**
 * Represents the face of a block.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/BlockFace.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";
import { BukkitVector } from "../types/vector";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type BlockFaceKey =
  | "NORTH" | "EAST" | "SOUTH" | "WEST" | "UP" | "DOWN"
  | "NORTH_EAST" | "NORTH_WEST" | "SOUTH_EAST" | "SOUTH_WEST"
  | "WEST_NORTH_WEST" | "NORTH_NORTH_WEST" | "NORTH_NORTH_EAST" | "EAST_NORTH_EAST"
  | "EAST_SOUTH_EAST" | "SOUTH_SOUTH_EAST" | "SOUTH_SOUTH_WEST" | "WEST_SOUTH_WEST"
  | "SELF";

// ============================================
// INTERFACE
// ============================================

export interface BukkitBlockFace extends JavaEnum<BlockFaceKey> {
  /**
   * X offset to get the adjacent block in this direction.
   * NORTH = 0, EAST = 1, SOUTH = 0, WEST = -1, etc.
   */
  getModX(): number;

  /**
   * Y offset. UP = 1, DOWN = -1, others = 0.
   */
  getModY(): number;

  /**
   * Z offset. NORTH = -1, SOUTH = 1, etc.
   */
  getModZ(): number;

  /**
   * Unit vector pointing in this direction.
   */
  getDirection(): BukkitVector;

  /**
   * True if this is one of the 6 cardinal directions:
   * NORTH, SOUTH, EAST, WEST, UP, DOWN.
   */
  isCartesian(): boolean;

  /**
   * The opposite face. NORTH -> SOUTH, UP -> DOWN, etc.
   */
  getOppositeFace(): BukkitBlockFace;
}

// ============================================
// BLOCK FACE CLASS INTERFACE
// ============================================

interface BlockFaceClass extends
  Omit<Record<BlockFaceKey, BukkitBlockFace>, keyof JavaEnumClass<BukkitBlockFace>>,
  JavaEnumClass<BukkitBlockFace> {
}

// ============================================
// BLOCK FACES
// ============================================

export const BlockFace: BlockFaceClass = {
  // Cardinal directions
  NORTH: org.bukkit.block.BlockFace.NORTH,
  EAST: org.bukkit.block.BlockFace.EAST,
  SOUTH: org.bukkit.block.BlockFace.SOUTH,
  WEST: org.bukkit.block.BlockFace.WEST,
  UP: org.bukkit.block.BlockFace.UP,
  DOWN: org.bukkit.block.BlockFace.DOWN,

  // Diagonal (45°)
  NORTH_EAST: org.bukkit.block.BlockFace.NORTH_EAST,
  NORTH_WEST: org.bukkit.block.BlockFace.NORTH_WEST,
  SOUTH_EAST: org.bukkit.block.BlockFace.SOUTH_EAST,
  SOUTH_WEST: org.bukkit.block.BlockFace.SOUTH_WEST,

  // Fine-grained directions (22.5°)
  WEST_NORTH_WEST: org.bukkit.block.BlockFace.WEST_NORTH_WEST,
  NORTH_NORTH_WEST: org.bukkit.block.BlockFace.NORTH_NORTH_WEST,
  NORTH_NORTH_EAST: org.bukkit.block.BlockFace.NORTH_NORTH_EAST,
  EAST_NORTH_EAST: org.bukkit.block.BlockFace.EAST_NORTH_EAST,
  EAST_SOUTH_EAST: org.bukkit.block.BlockFace.EAST_SOUTH_EAST,
  SOUTH_SOUTH_EAST: org.bukkit.block.BlockFace.SOUTH_SOUTH_EAST,
  SOUTH_SOUTH_WEST: org.bukkit.block.BlockFace.SOUTH_SOUTH_WEST,
  WEST_SOUTH_WEST: org.bukkit.block.BlockFace.WEST_SOUTH_WEST,

  // Special
  SELF: org.bukkit.block.BlockFace.SELF,

  values(): BukkitBlockFace[] {
    return org.bukkit.block.BlockFace.values();
  },

  valueOf(name: string): BukkitBlockFace {
    return org.bukkit.block.BlockFace.valueOf(name);
  },
};