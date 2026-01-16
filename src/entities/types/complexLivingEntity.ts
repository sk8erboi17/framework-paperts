/**
 * DESIGN
 * ------
 * ComplexLivingEntity represents living entities composed of multiple parts.
 * 
 * COMPLEX ENTITY STRUCTURE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                 ENDER DRAGON EXAMPLE                        │
 *   │                                                             │
 *   │                      ┌─────┐                                │
 *   │                      │HEAD │ ← Part 1                       │
 *   │                      └──┬──┘                                │
 *   │                         │                                   │
 *   │         ┌───────────────┼───────────────┐                   │
 *   │         │               │               │                   │
 *   │      ┌──┴──┐        ┌───┴───┐        ┌──┴──┐                │
 *   │      │WING │        │ BODY  │        │WING │                │
 *   │      │LEFT │        │       │        │RIGHT│                │
 *   │      └─────┘        └───┬───┘        └─────┘                │
 *   │      Part 2         Part 3          Part 4                  │
 *   │                         │                                   │
 *   │                  ┌──────┼──────┐                            │
 *   │                  │      │      │                            │
 *   │               ┌──┴─┐ ┌──┴─┐ ┌──┴─┐                          │
 *   │               │TAIL│ │TAIL│ │TAIL│                          │
 *   │               │ 1  │ │ 2  │ │ 3  │                          │
 *   │               └────┘ └────┘ └────┘                          │
 *   │               Part 5  Part 6  Part 7                        │
 *   │                                                             │
 *   │   Total: 8 parts (including body as part 8)                 │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * WHY COMPLEX ENTITIES:
 * 
 *   ┌─────────────────┐     ┌─────────────────────────────────┐
 *   │  SIMPLE ENTITY  │     │      COMPLEX ENTITY             │
 *   │                 │     │                                 │
 *   │   ┌─────────┐   │     │   ┌───┐ ┌───┐ ┌───┐ ┌───┐      │
 *   │   │ Single  │   │     │   │ 1 │ │ 2 │ │ 3 │ │ 4 │      │
 *   │   │ Hitbox  │   │     │   └───┘ └───┘ └───┘ └───┘      │
 *   │   └─────────┘   │     │   Multiple hitboxes             │
 *   │                 │     │   - More realistic collision    │
 *   │   One target    │     │   - Directional damage          │
 *   │                 │     │   - Complex animations          │
 *   └─────────────────┘     └─────────────────────────────────┘
 * 
 * DAMAGE SYSTEM:
 * - Hitting any part damages the parent
 * - Different parts may have damage multipliers
 * - Head shots typically deal bonus damage
 * 
 * CURRENT IMPLEMENTATIONS:
 * - EnderDragon (only one in vanilla Minecraft)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/ComplexLivingEntity.html
 */

import { JavaSet } from "../../java/types/set";
import { BukkitLocation } from "../../world/types/location";
import { BukkitEntity } from "./bukkitEntity";
import { BukkitLivingEntity } from "./bukkitLivingEntity";
import { BukkitComplexEntityPart } from "./complexEntityPart";



// ============================================
// INTERFACE
// ============================================

/**
 * A living entity made up of multiple parts.
 * 
 * Complex entities have separate hitboxes for different
 * body parts. Damage to any part affects the main entity.
 * 
 * Currently only EnderDragon implements this interface.
 */
export interface BukkitComplexLivingEntity extends BukkitLivingEntity {
  /**
   * Get all parts of this complex entity.
   * 
   * Each part is a separate entity with its own hitbox.
   * The set is a live view - changes may reflect entity state.
   * 
   * @returns Set of all entity parts
   * 
   * @example
   * const parts = dragon.getParts();
   * console.log(`Dragon has ${parts.size()} hitbox parts`);
   * 
   * // Process each part
   * const iter = parts.iterator();
   * while (iter.hasNext()) {
   *   const part = iter.next();
   *   console.log(`Part location: ${part.getLocation()}`);
   * }
   */
  getParts(): JavaSet<BukkitComplexEntityPart>;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if entity is a ComplexLivingEntity.
 * 
 * @example
 * if (isComplexLivingEntity(entity)) {
 *   const parts = entity.getParts();
 *   console.log(`Entity has ${parts.size()} parts`);
 * }
 */
export function isComplexLivingEntity(
  entity: BukkitEntity
): entity is BukkitComplexLivingEntity {
  /* Currently only EnderDragon implements ComplexLivingEntity */
  return entity.getType().name() === "ENDER_DRAGON";
}

// ============================================
// PART ACCESS UTILITIES
// ============================================

/**
 * Get all parts as array.
 * 
 * @example
 * const parts = getPartsArray(dragon);
 * for (const part of parts) {
 *   console.log(part.getLocation());
 * }
 */
export function getPartsArray(
  entity: BukkitComplexLivingEntity
): BukkitComplexEntityPart[] {
  const parts = entity.getParts();
  const result: BukkitComplexEntityPart[] = [];
  const iter = parts.iterator();
  
  while (iter.hasNext()) {
    result.push(iter.next());
  }
  
  return result;
}

/**
 * Get number of parts.
 */
export function getPartCount(entity: BukkitComplexLivingEntity): number {
  return entity.getParts().size();
}

/**
 * Check if entity has any parts.
 */
export function hasParts(entity: BukkitComplexLivingEntity): boolean {
  return !entity.getParts().isEmpty();
}

// ============================================
// PART ITERATION
// ============================================

/**
 * Execute callback for each part.
 * 
 * @example
 * forEachPart(dragon, part => {
 *   console.log(`Part at ${part.getLocation()}`);
 * });
 */
export function forEachPart(
  entity: BukkitComplexLivingEntity,
  callback: (part: BukkitComplexEntityPart) => void
): void {
  const parts = entity.getParts();
  const iter = parts.iterator();
  
  while (iter.hasNext()) {
    callback(iter.next());
  }
}

/**
 * Map parts to values.
 * 
 * @example
 * const locations = mapParts(dragon, part => part.getLocation());
 */
export function mapParts<T>(
  entity: BukkitComplexLivingEntity,
  mapper: (part: BukkitComplexEntityPart) => T
): T[] {
  const parts = getPartsArray(entity);
  return parts.map(mapper);
}

// ============================================
// PART SEARCH
// ============================================

/**
 * Find first part matching predicate.
 * 
 * @returns Matching part or null if none found
 */
export function findPart(
  entity: BukkitComplexLivingEntity,
  predicate: (part: BukkitComplexEntityPart) => boolean
): BukkitComplexEntityPart | null {
  const parts = entity.getParts();
  const iter = parts.iterator();
  
  while (iter.hasNext()) {
    const part = iter.next();
    if (predicate(part)) {
      return part;
    }
  }
  
  return null;
}

/**
 * Filter parts matching predicate.
 * 
 * @returns Array of matching parts
 */
export function filterParts(
  entity: BukkitComplexLivingEntity,
  predicate: (part: BukkitComplexEntityPart) => boolean
): BukkitComplexEntityPart[] {
  const result: BukkitComplexEntityPart[] = [];
  const parts = entity.getParts();
  const iter = parts.iterator();
  
  while (iter.hasNext()) {
    const part = iter.next();
    if (predicate(part)) {
      result.push(part);
    }
  }
  
  return result;
}

/**
 * Check if any part matches predicate.
 */
export function anyPart(
  entity: BukkitComplexLivingEntity,
  predicate: (part: BukkitComplexEntityPart) => boolean
): boolean {
  return findPart(entity, predicate) !== null;
}

/**
 * Check if all parts match predicate.
 */
export function allParts(
  entity: BukkitComplexLivingEntity,
  predicate: (part: BukkitComplexEntityPart) => boolean
): boolean {
  const parts = entity.getParts();
  const iter = parts.iterator();
  
  while (iter.hasNext()) {
    if (!predicate(iter.next())) {
      return false;
    }
  }
  
  return true;
}

// ============================================
// SPATIAL QUERIES
// ============================================

/**
 * Get part closest to a location.
 * 
 * @param entity Complex entity
 * @param location Target location
 * @returns Closest part or null if no parts
 * 
 * @example
 * const closest = getClosestPart(dragon, player.getLocation());
 * if (closest !== null) {
 *   console.log(`Closest part is ${closest.getLocation().distance(player.getLocation())} blocks away`);
 * }
 */
export function getClosestPart(
  entity: BukkitComplexLivingEntity,
  location: BukkitLocation
): BukkitComplexEntityPart | null {
  const parts = getPartsArray(entity);
  
  if (parts.length === 0) {
    return null;
  }
  
  let closest: BukkitComplexEntityPart = parts[0];
  let closestDistSq = Number.MAX_VALUE;
  
  for (const part of parts) {
    const distSq = part.getLocation().distanceSquared(location);
    
    if (distSq < closestDistSq) {
      closestDistSq = distSq;
      closest = part;
    }
  }
  
  return closest;
}

/**
 * Get part farthest from a location.
 */
export function getFarthestPart(
  entity: BukkitComplexLivingEntity,
  location: BukkitLocation
): BukkitComplexEntityPart | null {
  const parts = getPartsArray(entity);
  
  if (parts.length === 0) {
    return null;
  }
  
  let farthest: BukkitComplexEntityPart = parts[0];
  let farthestDistSq = -1;
  
  for (const part of parts) {
    const distSq = part.getLocation().distanceSquared(location);
    
    if (distSq > farthestDistSq) {
      farthestDistSq = distSq;
      farthest = part;
    }
  }
  
  return farthest;
}

/**
 * Get parts within distance of a location.
 * 
 * @param entity Complex entity
 * @param location Center point
 * @param range Maximum distance
 * @returns Parts within range
 */
export function getPartsInRange(
  entity: BukkitComplexLivingEntity,
  location: BukkitLocation,
  range: number
): BukkitComplexEntityPart[] {
  const rangeSquared = range * range;
  
  return filterParts(entity, part => 
    part.getLocation().distanceSquared(location) <= rangeSquared
  );
}

/**
 * Get parts outside distance of a location.
 */
export function getPartsOutsideRange(
  entity: BukkitComplexLivingEntity,
  location: BukkitLocation,
  range: number
): BukkitComplexEntityPart[] {
  const rangeSquared = range * range;
  
  return filterParts(entity, part => 
    part.getLocation().distanceSquared(location) > rangeSquared
  );
}

// ============================================
// GEOMETRIC CALCULATIONS
// ============================================

/**
 * Calculate center point of all parts.
 * 
 * @returns Center coordinates or null if no parts
 */
export function getPartsCenter(
  entity: BukkitComplexLivingEntity
): { x: number; y: number; z: number } | null {
  const parts = getPartsArray(entity);
  
  if (parts.length === 0) {
    return null;
  }
  
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  
  for (const part of parts) {
    const loc = part.getLocation();
    sumX += loc.getX();
    sumY += loc.getY();
    sumZ += loc.getZ();
  }
  
  return {
    x: sumX / parts.length,
    y: sumY / parts.length,
    z: sumZ / parts.length,
  };
}

/**
 * Calculate bounding box encompassing all parts.
 * 
 * @returns Bounding box or null if no parts
 */
export function getPartsBounds(entity: BukkitComplexLivingEntity): {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
} | null {
  const parts = getPartsArray(entity);
  
  if (parts.length === 0) {
    return null;
  }
  
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let minZ = Number.MAX_VALUE;
  let maxX = -Number.MAX_VALUE;
  let maxY = -Number.MAX_VALUE;
  let maxZ = -Number.MAX_VALUE;
  
  for (const part of parts) {
    const loc = part.getLocation();
    const x = loc.getX();
    const y = loc.getY();
    const z = loc.getZ();
    
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (z < minZ) minZ = z;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    if (z > maxZ) maxZ = z;
  }
  
  return { minX, minY, minZ, maxX, maxY, maxZ };
}

/**
 * Calculate total span of entity parts.
 * 
 * @returns Width, height, depth of bounding box
 */
export function getPartsSpan(entity: BukkitComplexLivingEntity): {
  width: number;
  height: number;
  depth: number;
} | null {
  const bounds = getPartsBounds(entity);
  
  if (bounds === null) {
    return null;
  }
  
  return {
    width: bounds.maxX - bounds.minX,
    height: bounds.maxY - bounds.minY,
    depth: bounds.maxZ - bounds.minZ,
  };
}

/**
 * Get average distance of parts from entity center.
 */
export function getAveragePartDistance(
  entity: BukkitComplexLivingEntity
): number | null {
  const parts = getPartsArray(entity);
  
  if (parts.length === 0) {
    return null;
  }
  
  const center = entity.getLocation();
  let totalDistance = 0;
  
  for (const part of parts) {
    totalDistance += part.getLocation().distance(center);
  }
  
  return totalDistance / parts.length;
}

// ============================================
// PART LOCATIONS
// ============================================

/**
 * Get all part locations as array.
 */
export function getPartLocations(
  entity: BukkitComplexLivingEntity
): BukkitLocation[] {
  return mapParts(entity, part => part.getLocation());
}

/**
 * Get highest part (max Y).
 */
export function getHighestPart(
  entity: BukkitComplexLivingEntity
): BukkitComplexEntityPart | null {
  const parts = getPartsArray(entity);
  
  if (parts.length === 0) {
    return null;
  }
  
  let highest: BukkitComplexEntityPart = parts[0];
  let highestY = highest.getLocation().getY();
  
  for (const part of parts) {
    const y = part.getLocation().getY();
    if (y > highestY) {
      highestY = y;
      highest = part;
    }
  }
  
  return highest;
}

/**
 * Get lowest part (min Y).
 */
export function getLowestPart(
  entity: BukkitComplexLivingEntity
): BukkitComplexEntityPart | null {
  const parts = getPartsArray(entity);
  
  if (parts.length === 0) {
    return null;
  }
  
  let lowest: BukkitComplexEntityPart = parts[0];
  let lowestY = lowest.getLocation().getY();
  
  for (const part of parts) {
    const y = part.getLocation().getY();
    if (y < lowestY) {
      lowestY = y;
      lowest = part;
    }
  }
  
  return lowest;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe complex entity.
 */
export function describeComplexEntity(
  entity: BukkitComplexLivingEntity
): string {
  const type = entity.getType().name();
  const parts = getPartCount(entity);
  const health = entity.getHealth().toFixed(1);
  const maxHealth = entity.getMaxHealth().toFixed(1);
  
  return `${type} with ${parts} parts (${health}/${maxHealth} HP)`;
}

/**
 * Get complete entity info.
 */
export function getComplexEntityInfo(entity: BukkitComplexLivingEntity): {
  type: string;
  partCount: number;
  health: number;
  maxHealth: number;
  healthPercent: number;
  center: { x: number; y: number; z: number } | null;
  bounds: {
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
  } | null;
  span: { width: number; height: number; depth: number } | null;
} {
  return {
    type: entity.getType().name(),
    partCount: getPartCount(entity),
    health: entity.getHealth(),
    maxHealth: entity.getMaxHealth(),
    healthPercent: (entity.getHealth() / entity.getMaxHealth()) * 100,
    center: getPartsCenter(entity),
    bounds: getPartsBounds(entity),
    span: getPartsSpan(entity),
  };
}

/**
 * Get summary of part positions.
 */
export function summarizePartPositions(
  entity: BukkitComplexLivingEntity
): string {
  const parts = getPartCount(entity);
  const bounds = getPartsBounds(entity);
  const span = getPartsSpan(entity);
  
  if (bounds === null || span === null) {
    return `${parts} parts (no position data)`;
  }
  
  return `${parts} parts spanning ${span.width.toFixed(1)}x${span.height.toFixed(1)}x${span.depth.toFixed(1)} blocks`;
}