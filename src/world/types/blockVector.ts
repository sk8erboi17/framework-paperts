/**
 * A vector with a hash function that floors the X, Y, Z components,
 * a la BlockVector in WorldEdit.
 * 
 * BlockVectors can be used in hash sets and hash maps. Be aware that
 * BlockVectors are mutable, but it is important that BlockVectors are
 * never changed once put into a hash set or hash map.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/util/BlockVector.html
 */

import { BukkitVector } from "./vector";

// ============================================
// INTERFACE
// ============================================

/**
 * BlockVector extends Vector. All Vector methods are inherited.
 * The difference is in equals() and hashCode() which use floored components.
 */
export interface BukkitBlockVector extends BukkitVector {
  /**
   * Deep copy. Returns BlockVector, not Vector.
   */
  clone(): BukkitBlockVector;

  /**
   * Uses floored components for comparison.
   */
  equals(obj: object): boolean;

  /**
   * Uses floored components for hashing.
   */
  hashCode(): number;
}

// ============================================
// BLOCK VECTOR CLASS INTERFACE
// ============================================

interface BlockVectorClass {
  /**
   * Deserialize from map.
   */
  deserialize(args: Map<string, object>): BukkitBlockVector;

  /**
   * Create block vector with all components zero.
   */
  create(): BukkitBlockVector;

  /**
   * Create block vector with given components.
   */
  create(x: number, y: number, z: number): BukkitBlockVector;

  /**
   * Create block vector from another vector.
   */
  create(vec: BukkitVector): BukkitBlockVector;
}

// ============================================
// BLOCK VECTOR
// ============================================

export const BlockVector: BlockVectorClass = {
  deserialize(args: Map<string, object>): BukkitBlockVector {
    return org.bukkit.util.BlockVector.deserialize(args);
  },

  create(xOrVec?: number | BukkitVector, y?: number, z?: number): BukkitBlockVector {
    if (xOrVec === undefined) {
      return new org.bukkit.util.BlockVector();
    }
    if (typeof xOrVec === "object") {
      return new org.bukkit.util.BlockVector(xOrVec);
    }
    return new org.bukkit.util.BlockVector(xOrVec, y, z);
  },
};