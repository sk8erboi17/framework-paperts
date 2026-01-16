/**
 * A shape made out of voxels.
 * 
 * Used to represent detailed collision shapes of blocks. A block might have
 * a complex shape (stairs, fences, etc.) that can't be described by a single
 * bounding box, so it's decomposed into multiple boxes.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/util/VoxelShape.html
 */

import { BukkitBoundingBox } from "./boundingBox";

// ============================================
// INTERFACE
// ============================================

export interface BukkitVoxelShape {
  /**
   * Converts this shape into bounding boxes.
   * 
   * A bounding box intersects with this shape if it intersects with
   * any of the returned boxes.
   */
  getBoundingBoxes(): BukkitBoundingBox[];

  /**
   * True if the given bounding box intersects this shape.
   */
  overlaps(other: BukkitBoundingBox): boolean;
}