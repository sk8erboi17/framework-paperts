/**
 * The hit result of a ray trace.
 * 
 * Only hitPosition is guaranteed. Other fields depend on what got hit
 * and the context of the ray trace.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/util/RayTraceResult.html
 */

import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitBlockFace } from "../enums/blockFace";
import { BukkitBlock } from "./block";
import { BukkitVector } from "./vector";


// ============================================
// INTERFACE
// ============================================

export interface BukkitRayTraceResult {
  /**
   * Exact position where the ray hit something.
   * Always available. Returns a copy.
   */
  getHitPosition(): BukkitVector;

  /**
   * The block that was hit, if any.
   */
  getHitBlock(): BukkitBlock | null;

  /**
   * The face of the block that was hit, if any.
   */
  getHitBlockFace(): BukkitBlockFace | null;

  /**
   * The entity that was hit, if any.
   */
  getHitEntity(): BukkitEntity | null;

  equals(obj: object): boolean;
  hashCode(): number;
  toString(): string;
}

// ============================================
// RAY TRACE RESULT CLASS INTERFACE
// ============================================

interface RayTraceResultClass {
  /**
   * Create result with just a hit position.
   */
  create(hitPosition: BukkitVector): BukkitRayTraceResult;

  /**
   * Create result with hit position and block face.
   */
  create(hitPosition: BukkitVector, hitBlockFace: BukkitBlockFace | null): BukkitRayTraceResult;

  /**
   * Create result for a block hit.
   */
  create(
    hitPosition: BukkitVector,
    hitBlock: BukkitBlock | null,
    hitBlockFace: BukkitBlockFace | null
  ): BukkitRayTraceResult;

  /**
   * Create result for an entity hit.
   */
  createEntity(hitPosition: BukkitVector, hitEntity: BukkitEntity | null): BukkitRayTraceResult;

  /**
   * Create result for an entity hit with block face.
   */
  createEntity(
    hitPosition: BukkitVector,
    hitEntity: BukkitEntity | null,
    hitBlockFace: BukkitBlockFace | null
  ): BukkitRayTraceResult;
}

// ============================================
// RAY TRACE RESULT
// ============================================

export const RayTraceResult: RayTraceResultClass = {
  create(
    hitPosition: BukkitVector,
    hitBlockOrFace?: BukkitBlock | BukkitBlockFace | null,
    hitBlockFace?: BukkitBlockFace | null
  ): BukkitRayTraceResult {
    if (hitBlockOrFace === undefined) {
      // create(hitPosition)
      return new org.bukkit.util.RayTraceResult(hitPosition);
    }
    if (hitBlockFace !== undefined) {
      // create(hitPosition, hitBlock, hitBlockFace)
      return new org.bukkit.util.RayTraceResult(hitPosition, hitBlockOrFace, hitBlockFace);
    }
    // create(hitPosition, hitBlockFace)
    return new org.bukkit.util.RayTraceResult(hitPosition, hitBlockOrFace);
  },

  createEntity(
    hitPosition: BukkitVector,
    hitEntity: BukkitEntity | null,
    hitBlockFace?: BukkitBlockFace | null
  ): BukkitRayTraceResult {
    if (hitBlockFace !== undefined) {
      return new org.bukkit.util.RayTraceResult(hitPosition, hitEntity, hitBlockFace);
    }
    return new org.bukkit.util.RayTraceResult(hitPosition, hitEntity);
  },
};