/**
 * A mutable axis aligned bounding box (AABB).
 * 
 * Basically a rectangular box defined by min and max corners. Useful for
 * collision detection, entity bounds, region selection, etc.
 * 
 * Edges and faces are parallel to the cartesian axes. The box may be
 * degenerate (one or more sides with length 0).
 * 
 * Mutable, so clone() if you need to keep a copy around.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/util/BoundingBox.html
 */

import { BukkitBlockFace } from "../enums/blockFace";
import { BukkitBlock } from "./block";
import { BukkitLocation } from "./location";
import { BukkitRayTraceResult } from "./rayTraceResult";
import { BukkitVector } from "./vector";



// ============================================
// INTERFACE
// ============================================

export interface BukkitBoundingBox {
  // ---- Dimensions ----

  getMinX(): number;
  getMinY(): number;
  getMinZ(): number;
  getMin(): BukkitVector;

  getMaxX(): number;
  getMaxY(): number;
  getMaxZ(): number;
  getMax(): BukkitVector;

  getWidthX(): number;
  getWidthZ(): number;
  getHeight(): number;
  getVolume(): number;

  getCenterX(): number;
  getCenterY(): number;
  getCenterZ(): number;
  getCenter(): BukkitVector;

  // ---- Mutation ----

  /**
   * Resizes this box. Mutates.
   */
  resize(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): BukkitBoundingBox;

  /**
   * Copies another box into this one. Mutates.
   */
  copy(other: BukkitBoundingBox): BukkitBoundingBox;

  /**
   * Expand uniformly in all directions. Mutates.
   */
  expand(expansion: number): BukkitBoundingBox;

  /**
   * Expand by different amounts per axis. Mutates.
   */
  expand(x: number, y: number, z: number): BukkitBoundingBox;

  /**
   * Expand by vector amounts per axis. Mutates.
   */
  expand(expansion: BukkitVector): BukkitBoundingBox;

  /**
   * Expand in a direction. Mutates.
   */
  expand(direction: BukkitVector, expansion: number): BukkitBoundingBox;

  /**
   * Expand in a block face direction. Mutates.
   */
  expand(blockFace: BukkitBlockFace, expansion: number): BukkitBoundingBox;

  /**
   * Expand with separate values for each direction. Mutates.
   */
  expand(negX: number, negY: number, negZ: number, posX: number, posY: number, posZ: number): BukkitBoundingBox;

  /**
   * Expand in direction. Sign determines which way. Mutates.
   */
  expandDirectional(dirX: number, dirY: number, dirZ: number): BukkitBoundingBox;

  /**
   * Expand in direction. Sign determines which way. Mutates.
   */
  expandDirectional(direction: BukkitVector): BukkitBoundingBox;

  /**
   * Expand to contain the given position. Mutates.
   */
  union(posX: number, posY: number, posZ: number): BukkitBoundingBox;

  /**
   * Expand to contain the given position. Mutates.
   */
  union(position: BukkitVector): BukkitBoundingBox;

  /**
   * Expand to contain the given position. Mutates.
   */
  union(position: BukkitLocation): BukkitBoundingBox;

  /**
   * Expand to contain another box. Mutates.
   */
  union(other: BukkitBoundingBox): BukkitBoundingBox;

  /**
   * Shrink to the intersection with another box. Mutates.
   * Throws if boxes don't overlap.
   */
  intersection(other: BukkitBoundingBox): BukkitBoundingBox;

  /**
   * Move the box. Mutates.
   */
  shift(shiftX: number, shiftY: number, shiftZ: number): BukkitBoundingBox;

  /**
   * Move the box. Mutates.
   */
  shift(shift: BukkitVector): BukkitBoundingBox;

  /**
   * Move the box. Mutates.
   */
  shift(shift: BukkitLocation): BukkitBoundingBox;

  // ---- Queries ----

  /**
   * True if boxes overlap (not just touching at borders).
   */
  overlaps(other: BukkitBoundingBox): boolean;

  /**
   * True if boxes overlap (not just touching at borders).
   */
  overlaps(min: BukkitVector, max: BukkitVector): boolean;

  /**
   * True if position is inside. Min border = inside, max border = outside.
   */
  contains(x: number, y: number, z: number): boolean;

  /**
   * True if position is inside.
   */
  contains(position: BukkitVector): boolean;

  /**
   * True if this fully contains another box.
   */
  contains(other: BukkitBoundingBox): boolean;

  /**
   * True if this fully contains the box defined by min/max.
   */
  contains(min: BukkitVector, max: BukkitVector): boolean;

  /**
   * Ray trace against this box.
   * Returns null if no hit within maxDistance.
   */
  rayTrace(start: BukkitVector, direction: BukkitVector, maxDistance: number): BukkitRayTraceResult | null;

  // ---- Standard ----

  clone(): BukkitBoundingBox;
  equals(obj: object): boolean;
  hashCode(): number;
  toString(): string;
}

// ============================================
// BOUNDING BOX CLASS INTERFACE
// ============================================

interface BoundingBoxClass {
  /**
   * Create box from two corner vectors.
   */
  of(corner1: BukkitVector, corner2: BukkitVector): BukkitBoundingBox;

  /**
   * Create box from two corner locations.
   */
  of(corner1: BukkitLocation, corner2: BukkitLocation): BukkitBoundingBox;

  /**
   * Create box from two corner blocks. Sized to fully contain both.
   */
  of(corner1: BukkitBlock, corner2: BukkitBlock): BukkitBoundingBox;

  /**
   * Create 1x1x1 box containing the given block.
   */
  of(block: BukkitBlock): BukkitBoundingBox;

  /**
   * Create box from center and half-extents.
   */
  of(center: BukkitVector, x: number, y: number, z: number): BukkitBoundingBox;

  /**
   * Create box from center and half-extents.
   */
  of(center: BukkitLocation, x: number, y: number, z: number): BukkitBoundingBox;

  /**
   * Deserialize from map.
   */
  deserialize(args: Map<string, object>): BukkitBoundingBox;

  /**
   * Create degenerate box at origin.
   */
  create(): BukkitBoundingBox;

  /**
   * Create box from two corners.
   */
  create(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): BukkitBoundingBox;
}

// ============================================
// BOUNDING BOX
// ============================================

export const BoundingBox: BoundingBoxClass = {
  of(
    arg1: BukkitVector | BukkitLocation | BukkitBlock,
    arg2?: BukkitVector | BukkitLocation | BukkitBlock | number,
    arg3?: number,
    arg4?: number
  ): BukkitBoundingBox {
    if (arg2 === undefined) {
      // of(block)
      return org.bukkit.util.BoundingBox.of(arg1);
    }
    if (typeof arg2 === "number") {
      // of(center, x, y, z)
      return org.bukkit.util.BoundingBox.of(arg1, arg2, arg3, arg4);
    }
    // of(corner1, corner2)
    return org.bukkit.util.BoundingBox.of(arg1, arg2);
  },

  deserialize(args: Map<string, object>): BukkitBoundingBox {
    return org.bukkit.util.BoundingBox.deserialize(args);
  },

  create(
    x1?: number,
    y1?: number,
    z1?: number,
    x2?: number,
    y2?: number,
    z2?: number
  ): BukkitBoundingBox {
    if (x1 !== undefined) {
      return new org.bukkit.util.BoundingBox(x1, y1, z1, x2, y2, z2);
    }
    return new org.bukkit.util.BoundingBox();
  },
};