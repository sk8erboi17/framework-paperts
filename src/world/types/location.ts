/**
 * DESIGN
 * ------
 * Location represents a 3D position in a Minecraft world.
 * 
 * COORDINATE SYSTEM:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    MINECRAFT AXES                           │
 *   │                                                             │
 *   │                        +Y (up)                              │
 *   │                         │                                   │
 *   │                         │                                   │
 *   │                         │                                   │
 *   │                         ┼──────── +X (east)                 │
 *   │                        /                                    │
 *   │                       /                                     │
 *   │                      +Z (south)                             │
 *   │                                                             │
 *   │   Y = 0 to 319 (build height in 1.18+)                      │
 *   │   Y = -64 (deepslate, bedrock)                              │
 *   │   Y = 64 (sea level)                                        │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * YAW AND PITCH (rotation):
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                      YAW (horizontal)                       │
 *   │                                                             │
 *   │                    -Z (north)                               │
 *   │                    yaw = 180                                │
 *   │                        │                                    │
 *   │    -X (west) ──────────┼────────── +X (east)                │
 *   │    yaw = 90            │           yaw = 270 (-90)          │
 *   │                        │                                    │
 *   │                    +Z (south)                               │
 *   │                    yaw = 0/360                              │
 *   │                                                             │
 *   │   Yaw increases clockwise when viewed from above            │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                     PITCH (vertical)                        │
 *   │                                                             │
 *   │   pitch = -90 ......... Looking straight UP                 │
 *   │                                                             │
 *   │   pitch = 0 ........... Looking straight AHEAD              │
 *   │                                                             │
 *   │   pitch = +90 ......... Looking straight DOWN               │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * LOCATION vs VECTOR:
 * - Location: World + position + rotation (where an entity IS)
 * - Vector: Direction + magnitude (where something is GOING)
 * 
 * PRECISION:
 * - getX(), getY(), getZ(): double precision (entity position)
 * - getBlockX(), getBlockY(), getBlockZ(): int (block position)
 * 
 * MUTABILITY:
 * Location is MUTABLE. Methods like add(), subtract() modify
 * the location in place AND return it (for chaining).
 * Use clone() if you need to preserve the original.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Location.html
 */

import { BukkitWorld } from "./world";
import { BukkitVector } from "./vector";
import { BukkitBlock } from "./block";
import { BukkitChunk } from "./chunk";

// ============================================
// INTERFACE
// ============================================

/**
 * A 3D position in a world with optional rotation.
 * 
 * Contains:
 * - World reference
 * - X, Y, Z coordinates (doubles)
 * - Yaw and Pitch rotation (floats)
 */
export interface BukkitLocation {

  // ==========================================
  // WORLD
  // ==========================================

  /**
   * Get the world this location is in.
   * 
   * @returns World, or null if not set
   * @throws IllegalArgumentException if world is unloaded
   * 
   * @example
   * const world = location.getWorld();
   * if (world !== null) {
   *   console.log(`In world: ${world.getName()}`);
   * }
   */
  getWorld(): BukkitWorld | null;

  /**
   * Set the world for this location.
   * 
   * @param world New world (can be null)
   */
  setWorld(world: BukkitWorld | null): void;

  /**
   * Check if the world is loaded.
   * 
   * @returns true if world is present and loaded
   */
  isWorldLoaded(): boolean;

  // ==========================================
  // COORDINATES (precise)
  // ==========================================

  /**
   * Get X coordinate (precise).
   * 
   * @returns X as double
   */
  getX(): number;

  /**
   * Set X coordinate.
   * 
   * @param x New X coordinate
   */
  setX(x: number): void;

  /**
   * Get Y coordinate (precise).
   * 
   * @returns Y as double
   */
  getY(): number;

  /**
   * Set Y coordinate.
   * 
   * @param y New Y coordinate
   */
  setY(y: number): void;

  /**
   * Get Z coordinate (precise).
   * 
   * @returns Z as double
   */
  getZ(): number;

  /**
   * Set Z coordinate.
   * 
   * @param z New Z coordinate
   */
  setZ(z: number): void;

  // ==========================================
  // COORDINATES (block)
  // ==========================================

  /**
   * Get block X coordinate (floored).
   * 
   * @returns X as int (block coordinate)
   * 
   * @example
   * // Entity at X=5.7 is in block X=5
   * // Entity at X=-2.3 is in block X=-3
   */
  getBlockX(): number;

  /**
   * Get block Y coordinate (floored).
   * 
   * @returns Y as int (block coordinate)
   */
  getBlockY(): number;

  /**
   * Get block Z coordinate (floored).
   * 
   * @returns Z as int (block coordinate)
   */
  getBlockZ(): number;

  // ==========================================
  // ROTATION
  // ==========================================

  /**
   * Get yaw (horizontal rotation) in degrees.
   * 
   * Yaw values:
   * - 0/360: +Z (south)
   * - 90: -X (west)
   * - 180: -Z (north)
   * - 270/-90: +X (east)
   * 
   * @returns Yaw in degrees
   */
  getYaw(): number;

  /**
   * Set yaw (horizontal rotation) in degrees.
   * 
   * @param yaw New yaw value
   */
  setYaw(yaw: number): void;

  /**
   * Get pitch (vertical rotation) in degrees.
   * 
   * Pitch values:
   * - -90: Looking straight up
   * - 0: Looking straight ahead
   * - +90: Looking straight down
   * 
   * @returns Pitch in degrees
   */
  getPitch(): number;

  /**
   * Set pitch (vertical rotation) in degrees.
   * 
   * @param pitch New pitch value
   */
  setPitch(pitch: number): void;

  /**
   * Get direction as unit vector.
   * 
   * Returns a vector pointing in the direction
   * this location is facing (based on yaw/pitch).
   * 
   * @returns Direction unit vector
   * 
   * @example
   * // Get where player is looking
   * const direction = player.getLocation().getDirection();
   * // Spawn particle 5 blocks in front
   * const target = location.add(direction.multiply(5));
   */
  getDirection(): BukkitVector;

  /**
   * Set yaw and pitch from direction vector.
   * 
   * @param vector Direction to face
   * @returns This location (for chaining)
   */
  setDirection(vector: BukkitVector): BukkitLocation;

  // ==========================================
  // BLOCK ACCESS
  // ==========================================

  /**
   * Get the block at this location.
   * 
   * @returns Block at this location
   * 
   * @example
   * const block = location.getBlock();
   * if (block.getType().name() === "DIAMOND_ORE") {
   *   console.log("Found diamonds!");
   * }
   */
  getBlock(): BukkitBlock;

  /**
   * Get the chunk containing this location.
   * 
   * @returns Chunk at this location
   */
  getChunk(): BukkitChunk;

  // ==========================================
  // ARITHMETIC (mutating)
  // ==========================================

  /**
   * Add coordinates to this location.
   * 
   * MUTATES this location and returns it.
   * 
   * @param x X to add
   * @param y Y to add
   * @param z Z to add
   * @returns This location (modified)
   * 
   * @example
   * // Move location 10 blocks up
   * location.add(0, 10, 0);
   */
  add(x: number, y: number, z: number): BukkitLocation;

  /**
   * Add another location's coordinates.
   * 
   * @param vec Location to add
   * @returns This location (modified)
   * @throws IllegalArgumentException if different worlds
   */
  add(vec: BukkitLocation): BukkitLocation;

  /**
   * Add a vector to this location.
   * 
   * @param vec Vector to add
   * @returns This location (modified)
   */
  add(vec: BukkitVector): BukkitLocation;

  /**
   * Subtract coordinates from this location.
   * 
   * @param x X to subtract
   * @param y Y to subtract
   * @param z Z to subtract
   * @returns This location (modified)
   */
  subtract(x: number, y: number, z: number): BukkitLocation;

  /**
   * Subtract another location's coordinates.
   * 
   * @param vec Location to subtract
   * @returns This location (modified)
   * @throws IllegalArgumentException if different worlds
   */
  subtract(vec: BukkitLocation): BukkitLocation;

  /**
   * Subtract a vector from this location.
   * 
   * @param vec Vector to subtract
   * @returns This location (modified)
   */
  subtract(vec: BukkitVector): BukkitLocation;

  /**
   * Multiply all coordinates by scalar.
   * 
   * @param m Multiplier
   * @returns This location (modified)
   */
  multiply(m: number): BukkitLocation;

  /**
   * Set all coordinates to zero.
   * 
   * @returns This location (modified)
   */
  zero(): BukkitLocation;

  // ==========================================
  // DISTANCE
  // ==========================================

  /**
   * Get distance to another location.
   * 
   * Uses sqrt, so slightly expensive.
   * Use distanceSquared() for comparisons.
   * 
   * @param o Other location
   * @returns Distance in blocks
   * @throws IllegalArgumentException if different worlds
   * 
   * @example
   * const dist = player.getLocation().distance(spawn);
   * if (dist > 1000) {
   *   player.sendMessage("You're far from spawn!");
   * }
   */
  distance(o: BukkitLocation): number;

  /**
   * Get squared distance to another location.
   * 
   * Faster than distance() - use for comparisons.
   * 
   * @param o Other location
   * @returns Squared distance
   * @throws IllegalArgumentException if different worlds
   * 
   * @example
   * // Check if within 10 blocks (100 squared)
   * if (loc1.distanceSquared(loc2) < 100) {
   *   // Within range
   * }
   */
  distanceSquared(o: BukkitLocation): number;

  /**
   * Get magnitude (distance from origin).
   * 
   * @returns sqrt(x² + y² + z²)
   */
  length(): number;

  /**
   * Get squared magnitude.
   * 
   * @returns x² + y² + z²
   */
  lengthSquared(): number;

  // ==========================================
  // CONVERSION
  // ==========================================

  /**
   * Convert to Vector (loses world and rotation).
   * 
   * @returns New vector with x, y, z
   */
  toVector(): BukkitVector;

  /**
   * Clone this location.
   * 
   * @returns New location with same values
   * 
   * @example
   * // Preserve original when modifying
   * const offset = location.clone().add(5, 0, 0);
   */
  clone(): BukkitLocation;

  // ==========================================
  // VALIDATION
  // ==========================================

  /**
   * Check if all coordinates are finite.
   * 
   * @throws IllegalArgumentException if any coordinate is NaN or Infinite
   */
  checkFinite(): void;

  // ==========================================
  // OBJECT METHODS
  // ==========================================

  /**
   * Check equality.
   * 
   * Compares world, x, y, z, yaw, pitch.
   */
  equals(obj: any): boolean;

  /**
   * Get hash code.
   */
  hashCode(): number;

  /**
   * Get string representation.
   * 
   * @returns String like "Location{world=...,x=...,y=...,z=...,pitch=...,yaw=...}"
   */
  toString(): string;

  // ==========================================
  // SERIALIZATION
  // ==========================================

  /**
   * Serialize to map for config storage.
   * 
   * @returns Map with world, x, y, z, yaw, pitch
   */
  serialize(): { [key: string]: any };
}

// ============================================
// STATIC METHODS (via namespace)
// ============================================

/**
 * Static methods from Location class.
 */
export interface BukkitLocationStatic {
  /**
   * Deserialize from map.
   * 
   * @param args Serialized location map
   * @returns Deserialized location
   * @throws IllegalArgumentException if world doesn't exist
   */
  deserialize(args: { [key: string]: any }): BukkitLocation;

  /**
   * Convert double coordinate to block coordinate.
   * 
   * @param loc Precise coordinate
   * @returns Block coordinate (floored)
   */
  locToBlock(loc: number): number;

  /**
   * Normalize yaw to -180 to +180 range.
   * 
   * @param yaw Raw yaw value
   * @returns Normalized yaw
   */
  normalizeYaw(yaw: number): number;

  /**
   * Normalize pitch to -90 to +90 range.
   * 
   * @param pitch Raw pitch value
   * @returns Normalized pitch
   */
  normalizePitch(pitch: number): number;
}

// ============================================
// FACTORY FUNCTIONS
// ============================================

/**
 * Create a new Location.
 * 
 * @param world World (can be null)
 * @param x X coordinate
 * @param y Y coordinate
 * @param z Z coordinate
 * @returns New location
 * 
 * @example
 * const spawn = createLocation(world, 0, 64, 0);
 */
export function createLocation(
  world: BukkitWorld | null,
  x: number,
  y: number,
  z: number
): BukkitLocation {
  return new org.bukkit.Location(world, x, y, z);
}

/**
 * Create a new Location with rotation.
 * 
 * @param world World (can be null)
 * @param x X coordinate
 * @param y Y coordinate
 * @param z Z coordinate
 * @param yaw Yaw (horizontal rotation)
 * @param pitch Pitch (vertical rotation)
 * @returns New location
 * 
 * @example
 * // Spawn point facing north
 * const spawn = createLocationWithRotation(world, 0, 64, 0, 180, 0);
 */
export function createLocationWithRotation(
  world: BukkitWorld | null,
  x: number,
  y: number,
  z: number,
  yaw: number,
  pitch: number
): BukkitLocation {
  return new org.bukkit.Location(world, x, y, z, yaw, pitch);
}

/**
 * Create location from block coordinates.
 * 
 * Places location at center of block (x+0.5, y, z+0.5).
 * 
 * @param world World
 * @param blockX Block X
 * @param blockY Block Y
 * @param blockZ Block Z
 * @returns Location at block center
 */
export function createBlockLocation(
  world: BukkitWorld,
  blockX: number,
  blockY: number,
  blockZ: number
): BukkitLocation {
  return new org.bukkit.Location(world, blockX + 0.5, blockY, blockZ + 0.5);
}

/**
 * Create location from a vector.
 * 
 * @param world World
 * @param vector Vector with coordinates
 * @returns New location
 */
export function locationFromVector(
  world: BukkitWorld,
  vector: BukkitVector
): BukkitLocation {
  return new org.bukkit.Location(world, vector.getX(), vector.getY(), vector.getZ());
}

// ============================================
// STATIC METHOD ACCESS
// ============================================

/**
 * Convert coordinate to block coordinate.
 */
export function locToBlock(loc: number): number {
  return org.bukkit.Location.locToBlock(loc);
}

/**
 * Normalize yaw to -180 to +180.
 */
export function normalizeYaw(yaw: number): number {
  return org.bukkit.Location.normalizeYaw(yaw);
}

/**
 * Normalize pitch to -90 to +90.
 */
export function normalizePitch(pitch: number): number {
  return org.bukkit.Location.normalizePitch(pitch);
}

/**
 * Deserialize location from map.
 */
export function deserializeLocation(args: { [key: string]: any }): BukkitLocation {
  return org.bukkit.Location.deserialize(args);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if two locations are in the same world.
 */
export function sameWorld(a: BukkitLocation, b: BukkitLocation): boolean {
  const worldA = a.getWorld();
  const worldB = b.getWorld();
  
  if (worldA === null || worldB === null) {
    return false;
  }
  
  return worldA.getUID().equals(worldB.getUID());
}

/**
 * Check if two locations are at the same block.
 */
export function sameBlock(a: BukkitLocation, b: BukkitLocation): boolean {
  return sameWorld(a, b) &&
         a.getBlockX() === b.getBlockX() &&
         a.getBlockY() === b.getBlockY() &&
         a.getBlockZ() === b.getBlockZ();
}

/**
 * Check if two locations are within distance.
 * 
 * Uses squared distance for efficiency.
 */
export function isWithinDistance(
  a: BukkitLocation,
  b: BukkitLocation,
  distance: number
): boolean {
  if (!sameWorld(a, b)) {
    return false;
  }
  
  return a.distanceSquared(b) <= distance * distance;
}

/**
 * Check if location is within a cuboid region.
 */
export function isInRegion(
  location: BukkitLocation,
  min: BukkitLocation,
  max: BukkitLocation
): boolean {
  if (!sameWorld(location, min) || !sameWorld(location, max)) {
    return false;
  }
  
  const x = location.getX();
  const y = location.getY();
  const z = location.getZ();
  
  return x >= min.getX() && x <= max.getX() &&
         y >= min.getY() && y <= max.getY() &&
         z >= min.getZ() && z <= max.getZ();
}

/**
 * Get midpoint between two locations.
 * 
 * @returns New location at midpoint (uses first location's world)
 */
export function midpoint(a: BukkitLocation, b: BukkitLocation): BukkitLocation {
  return createLocation(
    a.getWorld(),
    (a.getX() + b.getX()) / 2,
    (a.getY() + b.getY()) / 2,
    (a.getZ() + b.getZ()) / 2
  );
}

/**
 * Get highest block Y at location (surface level).
 */
export function getHighestY(location: BukkitLocation): number {
  const world = location.getWorld();
  if (world === null) {
    throw new Error("Location has no world");
  }
  
  return world.getHighestBlockYAt(location);
}

/**
 * Create a copy of location at surface level.
 */
export function toSurface(location: BukkitLocation): BukkitLocation {
  const clone = location.clone();
  clone.setY(getHighestY(location) + 1);
  return clone;
}

/**
 * Center location on block (x.5, y, z.5).
 * 
 * Useful for teleporting entities to block center.
 */
export function centerOnBlock(location: BukkitLocation): BukkitLocation {
  return createLocation(
    location.getWorld(),
    location.getBlockX() + 0.5,
    location.getY(),
    location.getBlockZ() + 0.5
  );
}

/**
 * Get location offset in direction entity is facing.
 * 
 * @param location Base location
 * @param distance Blocks forward
 * @returns New location
 */
export function getLocationInFront(
  location: BukkitLocation,
  distance: number
): BukkitLocation {
  const direction = location.getDirection();
  return location.clone().add(
    direction.getX() * distance,
    direction.getY() * distance,
    direction.getZ() * distance
  );
}

/**
 * Get location offset behind entity.
 */
export function getLocationBehind(
  location: BukkitLocation,
  distance: number
): BukkitLocation {
  return getLocationInFront(location, -distance);
}

// ============================================
// YAW UTILITIES
// ============================================

/**
 * Cardinal directions as yaw values.
 */
export const DIRECTION_YAW = {
  SOUTH: 0,
  WEST: 90,
  NORTH: 180,
  EAST: 270,
} as const;

/**
 * Get cardinal direction name from yaw.
 */
export function getCardinalDirection(yaw: number): string {
  const normalized = normalizeYaw(yaw);
  
  if (normalized >= -45 && normalized < 45) {
    return "SOUTH";
  } else if (normalized >= 45 && normalized < 135) {
    return "WEST";
  } else if (normalized >= 135 || normalized < -135) {
    return "NORTH";
  } else {
    return "EAST";
  }
}

/**
 * Get yaw to face from one location to another.
 */
export function getYawToFace(from: BukkitLocation, to: BukkitLocation): number {
  const dx = to.getX() - from.getX();
  const dz = to.getZ() - from.getZ();
  
  /* atan2 returns radians, convert to degrees */
  /* Minecraft yaw: 0 = +Z, 90 = -X, 180 = -Z, 270 = +X */
  const yaw = -Math.atan2(dx, dz) * (180 / Math.PI);
  
  return yaw;
}

/**
 * Get pitch to face from one location to another.
 */
export function getPitchToFace(from: BukkitLocation, to: BukkitLocation): number {
  const dx = to.getX() - from.getX();
  const dy = to.getY() - from.getY();
  const dz = to.getZ() - from.getZ();
  
  const horizontalDistance = Math.sqrt(dx * dx + dz * dz);
  const pitch = -Math.atan2(dy, horizontalDistance) * (180 / Math.PI);
  
  return pitch;
}

/**
 * Make location face another location.
 * 
 * Sets yaw and pitch to look at target.
 * 
 * @returns The modified location
 */
export function faceLocation(
  location: BukkitLocation,
  target: BukkitLocation
): BukkitLocation {
  location.setYaw(getYawToFace(location, target));
  location.setPitch(getPitchToFace(location, target));
  return location;
}

// ============================================
// LOCATION FORMATTING
// ============================================

/**
 * Format location as readable string.
 * 
 * @param location Location to format
 * @param precision Decimal places (default 2)
 */
export function formatLocation(
  location: BukkitLocation,
  precision: number = 2
): string {
  const world = location.getWorld();
  const worldName = world ? world.getName() : "null";
  
  const x = location.getX().toFixed(precision);
  const y = location.getY().toFixed(precision);
  const z = location.getZ().toFixed(precision);
  
  return `${worldName} (${x}, ${y}, ${z})`;
}

/**
 * Format location as block coordinates.
 */
export function formatBlockLocation(location: BukkitLocation): string {
  const world = location.getWorld();
  const worldName = world ? world.getName() : "null";
  
  return `${worldName} (${location.getBlockX()}, ${location.getBlockY()}, ${location.getBlockZ()})`;
}

/**
 * Format location with rotation.
 */
export function formatLocationFull(
  location: BukkitLocation,
  precision: number = 2
): string {
  const base = formatLocation(location, precision);
  const yaw = location.getYaw().toFixed(1);
  const pitch = location.getPitch().toFixed(1);
  
  return `${base} yaw=${yaw} pitch=${pitch}`;
}

// ============================================
// LOCATION PARSING
// ============================================

/**
 * Parse location from string "world x y z" or "x y z".
 * 
 * @param str String to parse
 * @param defaultWorld World to use if not specified
 * @returns Parsed location or null if invalid
 */
export function parseLocation(
  str: string,
  defaultWorld?: BukkitWorld
): BukkitLocation | null {
  const parts = str.trim().split(/\s+/);
  
  if (parts.length === 3) {
    /* "x y z" format */
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    const z = parseFloat(parts[2]);
    
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      return null;
    }
    
    if (!defaultWorld) {
      return null;
    }
    
    return createLocation(defaultWorld, x, y, z);
  }
  
  if (parts.length >= 4) {
    /* "world x y z" format */
    const worldName = parts[0];
    const x = parseFloat(parts[1]);
    const y = parseFloat(parts[2]);
    const z = parseFloat(parts[3]);
    
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      return null;
    }
    
    const world = org.bukkit.Bukkit.getWorld(worldName);
    if (world === null) {
      return null;
    }
    
    return createLocation(world, x, y, z);
  }
  
  return null;
}

// ============================================
// LOCATION INTERPOLATION
// ============================================

/**
 * Linearly interpolate between two locations.
 * 
 * @param a Start location
 * @param b End location
 * @param t Interpolation factor (0-1)
 * @returns New location between a and b
 */
export function lerp(
  a: BukkitLocation,
  b: BukkitLocation,
  t: number
): BukkitLocation {
  return createLocation(
    a.getWorld(),
    a.getX() + (b.getX() - a.getX()) * t,
    a.getY() + (b.getY() - a.getY()) * t,
    a.getZ() + (b.getZ() - a.getZ()) * t
  );
}

/**
 * Get array of locations along a line.
 * 
 * @param from Start location
 * @param to End location
 * @param points Number of points
 * @returns Array of locations along the line
 */
export function getLine(
  from: BukkitLocation,
  to: BukkitLocation,
  points: number
): BukkitLocation[] {
  const result: BukkitLocation[] = [];
  
  for (let i = 0; i < points; i++) {
    const t = points === 1 ? 0.5 : i / (points - 1);
    result.push(lerp(from, to, t));
  }
  
  return result;
}

/**
 * Get locations in a circle around a center point.
 * 
 * @param center Center location
 * @param radius Radius in blocks
 * @param points Number of points
 * @returns Array of locations forming a circle
 */
export function getCircle(
  center: BukkitLocation,
  radius: number,
  points: number
): BukkitLocation[] {
  const result: BukkitLocation[] = [];
  
  for (let i = 0; i < points; i++) {
    const angle = (2 * Math.PI * i) / points;
    const x = center.getX() + Math.cos(angle) * radius;
    const z = center.getZ() + Math.sin(angle) * radius;
    
    result.push(createLocation(center.getWorld(), x, center.getY(), z));
  }
  
  return result;
}

/**
 * Get locations in a sphere around a center point.
 * 
 * @param center Center location
 * @param radius Radius in blocks
 * @param density Points per unit area (higher = more points)
 * @returns Array of locations on sphere surface
 */
export function getSphere(
  center: BukkitLocation,
  radius: number,
  density: number = 1
): BukkitLocation[] {
  const result: BukkitLocation[] = [];
  const points = Math.floor(4 * Math.PI * radius * radius * density);
  
  /* Fibonacci sphere algorithm for even distribution */
  const phi = Math.PI * (3 - Math.sqrt(5)); /* golden angle */
  
  for (let i = 0; i < points; i++) {
    const y = 1 - (i / (points - 1)) * 2; /* y goes from 1 to -1 */
    const radiusAtY = Math.sqrt(1 - y * y);
    
    const theta = phi * i;
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    result.push(createLocation(
      center.getWorld(),
      center.getX() + x * radius,
      center.getY() + y * radius,
      center.getZ() + z * radius
    ));
  }
  
  return result;
}

// ============================================
// RANDOM LOCATION
// ============================================

/**
 * Get random location within radius of center.
 * 
 * @param center Center location
 * @param radius Maximum distance from center
 * @returns Random location within radius
 */
export function randomLocationInRadius(
  center: BukkitLocation,
  radius: number
): BukkitLocation {
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radius;
  
  const x = center.getX() + Math.cos(angle) * distance;
  const z = center.getZ() + Math.sin(angle) * distance;
  
  return createLocation(center.getWorld(), x, center.getY(), z);
}

/**
 * Get random location within cuboid region.
 */
export function randomLocationInRegion(
  min: BukkitLocation,
  max: BukkitLocation
): BukkitLocation {
  const x = min.getX() + Math.random() * (max.getX() - min.getX());
  const y = min.getY() + Math.random() * (max.getY() - min.getY());
  const z = min.getZ() + Math.random() * (max.getZ() - min.getZ());
  
  return createLocation(min.getWorld(), x, y, z);
}

// ============================================
// NEARBY BLOCKS
// ============================================

/**
 * Get all block locations in radius.
 * 
 * @param center Center location
 * @param radius Radius in blocks
 * @returns Array of block locations
 */
export function getBlocksInRadius(
  center: BukkitLocation,
  radius: number
): BukkitLocation[] {
  const result: BukkitLocation[] = [];
  const world = center.getWorld();
  const radiusSquared = radius * radius;
  
  const cx = center.getBlockX();
  const cy = center.getBlockY();
  const cz = center.getBlockZ();
  
  const r = Math.ceil(radius);
  
  for (let x = -r; x <= r; x++) {
    for (let y = -r; y <= r; y++) {
      for (let z = -r; z <= r; z++) {
        if (x * x + y * y + z * z <= radiusSquared) {
          result.push(createLocation(world, cx + x, cy + y, cz + z));
        }
      }
    }
  }
  
  return result;
}

/**
 * Get all block locations in cuboid.
 */
export function getBlocksInCuboid(
  min: BukkitLocation,
  max: BukkitLocation
): BukkitLocation[] {
  const result: BukkitLocation[] = [];
  const world = min.getWorld();
  
  const minX = Math.min(min.getBlockX(), max.getBlockX());
  const minY = Math.min(min.getBlockY(), max.getBlockY());
  const minZ = Math.min(min.getBlockZ(), max.getBlockZ());
  
  const maxX = Math.max(min.getBlockX(), max.getBlockX());
  const maxY = Math.max(min.getBlockY(), max.getBlockY());
  const maxZ = Math.max(min.getBlockZ(), max.getBlockZ());
  
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        result.push(createLocation(world, x, y, z));
      }
    }
  }
  
  return result;
}