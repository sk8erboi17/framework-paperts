/**
 * DESIGN
 * ------
 * RegionAccessor provides unified access to blocks, biomes, and entities
 * within a region. It is the base interface for World and LimitedRegion.
 * 
 * REGION ACCESSOR HIERARCHY:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    RegionAccessor                           │
 *   │                                                             │
 *   │   Provides:                                                 │
 *   │   - Block access (get/set type, data, state)                │
 *   │   - Biome access (get/set)                                  │
 *   │   - Entity access (get, spawn, create)                      │
 *   │   - Tree generation                                         │
 *   │   - Height queries                                          │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 *                          │
 *            ┌─────────────┴─────────────┐
 *            │                           │
 *            ▼                           ▼
 *   ┌─────────────────┐         ┌─────────────────┐
 *   │      World      │         │  LimitedRegion  │
 *   │                 │         │                 │
 *   │ Full world      │         │ Chunk generation│
 *   │ access          │         │ context only    │
 *   └─────────────────┘         └─────────────────┘
 * 
 * BLOCK ACCESS METHODS:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                                                             │
 *   │   getType() ──────── Returns Material (simple type)         │
 *   │   setType() ──────── Sets Material                          │
 *   │                                                             │
 *   │   getBlockData() ─── Returns BlockData (detailed state)     │
 *   │   setBlockData() ─── Sets BlockData                         │
 *   │                                                             │
 *   │   getBlockState() ── Returns BlockState (tile entity data)  │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * HEIGHT MAP TYPES:
 * 
 *   MOTION_BLOCKING ────── Blocks that block motion (solid + fluids)
 *   MOTION_BLOCKING_NO_LEAVES ─ Same but ignores leaves
 *   OCEAN_FLOOR ────────── Ignores water
 *   WORLD_SURFACE ──────── Any non-air block
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/RegionAccessor.html
 */

import { BukkitEntityType } from "../../entities/enums/entityType";
import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitLivingEntity } from "../../entities/types/bukkitLivingEntity";
import { BukkitMaterial } from "../../items/enums/materialType";
import { JavaCollection } from "../../java/types/collections";
import { JavaList } from "../../java/types/list";
import { JavaRandom } from "../../java/types/random";
import { BukkitBiome } from "../enums/biomeType";
import { BukkitTreeType } from "../enums/treeType";
import { BukkitBlockData } from "./blockData";
import { BukkitBlockState } from "./blockState";
import { BukkitLocation } from "./location";


// ============================================
// HEIGHT MAP
// ============================================

/**
 * Height map types for height queries.
 * 
 * Different height maps return different "highest" blocks
 * based on what they consider as blocking.
 */
export type HeightMap =
  | "MOTION_BLOCKING"
  | "MOTION_BLOCKING_NO_LEAVES"
  | "OCEAN_FLOOR"
  | "OCEAN_FLOOR_WG"
  | "WORLD_SURFACE"
  | "WORLD_SURFACE_WG";

// ============================================
// REGION ACCESSOR INTERFACE
// ============================================

/**
 * Provides access to blocks, biomes, and entities within a region.
 * 
 * This is the base interface for World and LimitedRegion,
 * providing common functionality for accessing and modifying
 * the game world.
 */
export interface BukkitRegionAccessor {
  // ============================================
  // BIOME ACCESS
  // ============================================

  /**
   * Get biome at location.
   * 
   * @param location Location to check
   * @returns Biome at location
   */
  getBiome(location: BukkitLocation): BukkitBiome;

  /**
   * Get biome at coordinates.
   * 
   * @param x X-coordinate
   * @param y Y-coordinate
   * @param z Z-coordinate
   * @returns Biome at coordinates
   */
  getBiome(x: number, y: number, z: number): BukkitBiome;

  /**
   * Set biome at location.
   * 
   * @param location Location to modify
   * @param biome New biome
   */
  setBiome(location: BukkitLocation, biome: BukkitBiome): void;

  /**
   * Set biome at coordinates.
   * 
   * @param x X-coordinate
   * @param y Y-coordinate
   * @param z Z-coordinate
   * @param biome New biome
   */
  setBiome(x: number, y: number, z: number, biome: BukkitBiome): void;

  // ============================================
  // BLOCK STATE ACCESS
  // ============================================

  /**
   * Get block state at location.
   * 
   * BlockState contains tile entity data (chests, signs, etc).
   * 
   * @param location Location to check
   * @returns BlockState at location
   */
  getBlockState(location: BukkitLocation): BukkitBlockState;

  /**
   * Get block state at coordinates.
   * 
   * @param x X-coordinate
   * @param y Y-coordinate
   * @param z Z-coordinate
   * @returns BlockState at coordinates
   */
  getBlockState(x: number, y: number, z: number): BukkitBlockState;

  // ============================================
  // BLOCK DATA ACCESS
  // ============================================

  /**
   * Get block data at location.
   * 
   * BlockData contains detailed block properties (orientation, etc).
   * 
   * @param location Location to check
   * @returns BlockData at location
   */
  getBlockData(location: BukkitLocation): BukkitBlockData;

  /**
   * Get block data at coordinates.
   * 
   * @param x X-coordinate
   * @param y Y-coordinate
   * @param z Z-coordinate
   * @returns BlockData at coordinates
   */
  getBlockData(x: number, y: number, z: number): BukkitBlockData;

  /**
   * Set block data at location.
   * 
   * @param location Location to modify
   * @param blockData New block data
   */
  setBlockData(location: BukkitLocation, blockData: BukkitBlockData): void;

  /**
   * Set block data at coordinates.
   * 
   * @param x X-coordinate
   * @param y Y-coordinate
   * @param z Z-coordinate
   * @param blockData New block data
   */
  setBlockData(x: number, y: number, z: number, blockData: BukkitBlockData): void;

  // ============================================
  // MATERIAL (TYPE) ACCESS
  // ============================================

  /**
   * Get block material at location.
   * 
   * @param location Location to check
   * @returns Material at location
   */
  getType(location: BukkitLocation): BukkitMaterial;

  /**
   * Get block material at coordinates.
   * 
   * @param x X-coordinate
   * @param y Y-coordinate
   * @param z Z-coordinate
   * @returns Material at coordinates
   */
  getType(x: number, y: number, z: number): BukkitMaterial;

  /**
   * Set block material at location.
   * 
   * @param location Location to modify
   * @param material New material
   */
  setType(location: BukkitLocation, material: BukkitMaterial): void;

  /**
   * Set block material at coordinates.
   * 
   * @param x X-coordinate
   * @param y Y-coordinate
   * @param z Z-coordinate
   * @param material New material
   */
  setType(x: number, y: number, z: number, material: BukkitMaterial): void;

  // ============================================
  // HEIGHT QUERIES
  // ============================================

  /**
   * Get highest non-empty block Y at coordinates.
   * 
   * @param x X-coordinate
   * @param z Z-coordinate
   * @returns Y-coordinate of highest non-empty block
   */
  getHighestBlockYAt(x: number, z: number): number;

  /**
   * Get highest non-empty block Y at location.
   * 
   * @param location Location to check
   * @returns Y-coordinate of highest non-empty block
   */
  getHighestBlockYAt(location: BukkitLocation): number;

  /**
   * Get highest block Y using HeightMap at coordinates.
   * 
   * @param x X-coordinate
   * @param z Z-coordinate
   * @param heightMap HeightMap to use
   * @returns Y-coordinate per heightmap
   */
  getHighestBlockYAt(x: number, z: number, heightMap: HeightMap): number;

  /**
   * Get highest block Y using HeightMap at location.
   * 
   * @param location Location to check
   * @param heightMap HeightMap to use
   * @returns Y-coordinate per heightmap
   */
  getHighestBlockYAt(location: BukkitLocation, heightMap: HeightMap): number;

  // ============================================
  // TREE GENERATION
  // ============================================

  /**
   * Generate tree at location.
   * 
   * @param location Location to generate tree
   * @param random Random for generation
   * @param type Tree type
   * @returns true if generated successfully
   */
  generateTree(
    location: BukkitLocation,
    random: JavaRandom,
    type: BukkitTreeType
  ): boolean;

  /**
   * Generate tree with state consumer.
   * 
   * Consumer is called for each block changed before world modification.
   * 
   * @param location Location to generate tree
   * @param random Random for generation
   * @param type Tree type
   * @param stateConsumer Consumer for each changed block
   * @returns true if generated successfully
   */
  generateTree(
    location: BukkitLocation,
    random: JavaRandom,
    type: BukkitTreeType,
    stateConsumer: ((state: BukkitBlockState) => void) | null
  ): boolean;

  /**
   * Generate tree with state predicate.
   * 
   * Predicate determines if each block should be placed.
   * 
   * @param location Location to generate tree
   * @param random Random for generation
   * @param type Tree type
   * @param statePredicate Predicate to test block placement
   * @returns true if generated successfully
   */
  generateTree(
    location: BukkitLocation,
    random: JavaRandom,
    type: BukkitTreeType,
    statePredicate: ((state: BukkitBlockState) => boolean) | null
  ): boolean;

  // ============================================
  // ENTITY SPAWNING
  // ============================================

  /**
   * Spawn entity by type at location.
   * 
   * @param location Location to spawn
   * @param type Entity type
   * @returns Spawned entity
   */
  spawnEntity(location: BukkitLocation, type: BukkitEntityType): BukkitEntity;

  /**
   * Spawn entity with randomization control.
   * 
   * @param location Location to spawn
   * @param type Entity type
   * @param randomizeData Whether to randomize entity data
   * @returns Spawned entity
   */
  spawnEntity(
    location: BukkitLocation,
    type: BukkitEntityType,
    randomizeData: boolean
  ): BukkitEntity;

  /**
   * Spawn entity by class.
   * 
   * @param location Location to spawn
   * @param clazz Entity class
   * @returns Spawned entity
   */
  spawn<T extends BukkitEntity>(location: BukkitLocation, clazz: any): T;

  /**
   * Spawn entity with pre-spawn callback.
   * 
   * Callback runs before entity is added to world.
   * 
   * @param location Location to spawn
   * @param clazz Entity class
   * @param callback Pre-spawn callback
   * @returns Spawned entity
   */
  spawn<T extends BukkitEntity>(
    location: BukkitLocation,
    clazz: any,
    callback: ((entity: T) => void) | null
  ): T;

  /**
   * Spawn entity with full options.
   * 
   * @param location Location to spawn
   * @param clazz Entity class
   * @param randomizeData Whether to randomize entity data
   * @param callback Pre-spawn callback
   * @returns Spawned entity
   */
  spawn<T extends BukkitEntity>(
    location: BukkitLocation,
    clazz: any,
    randomizeData: boolean,
    callback: ((entity: T) => void) | null
  ): T;

  /**
   * Create entity without spawning.
   * 
   * Entity is created but not added to world.
   * Use addEntity() to spawn it later.
   * 
   * @param location Location for entity
   * @param clazz Entity class
   * @returns Created entity (not in world)
   */
  createEntity<T extends BukkitEntity>(location: BukkitLocation, clazz: any): T;

  /**
   * Add previously created entity to world.
   * 
   * @param entity Entity to add
   * @returns Entity now in world
   */
  addEntity<T extends BukkitEntity>(entity: T): T;

  // ============================================
  // ENTITY QUERIES
  // ============================================

  /**
   * Get all entities in region.
   * 
   * @returns List of all entities
   */
  getEntities(): JavaList<BukkitEntity>;

  /**
   * Get all living entities in region.
   * 
   * @returns List of living entities
   */
  getLivingEntities(): JavaList<BukkitLivingEntity>;

  /**
   * Get entities by class.
   * 
   * @param clazz Entity class to match
   * @returns Collection of matching entities
   */
  getEntitiesByClass<T extends BukkitEntity>(clazz: any): JavaCollection<T>;

  /**
   * Get entities by multiple classes.
   * 
   * @param classes Entity classes to match
   * @returns Collection of matching entities
   */
  getEntitiesByClasses(...classes: any[]): JavaCollection<BukkitEntity>;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a RegionAccessor.
 */
export function isRegionAccessor(obj: any): obj is BukkitRegionAccessor {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.getBiome === "function" &&
    typeof obj.getBlockData === "function" &&
    typeof obj.getType === "function" &&
    typeof obj.getEntities === "function" &&
    typeof obj.spawn === "function"
  );
}

// ============================================
// HEIGHT MAP UTILITIES
// ============================================

/**
 * Get surface Y for building (motion blocking).
 */
export function getSurfaceY(
  region: BukkitRegionAccessor,
  x: number,
  z: number
): number {
  return region.getHighestBlockYAt(x, z, "MOTION_BLOCKING");
}

/**
 * Get surface Y ignoring leaves.
 */
export function getSurfaceYNoLeaves(
  region: BukkitRegionAccessor,
  x: number,
  z: number
): number {
  return region.getHighestBlockYAt(x, z, "MOTION_BLOCKING_NO_LEAVES");
}

/**
 * Get ocean floor Y.
 */
export function getOceanFloorY(
  region: BukkitRegionAccessor,
  x: number,
  z: number
): number {
  return region.getHighestBlockYAt(x, z, "OCEAN_FLOOR");
}

/**
 * Get world surface Y (any non-air).
 */
export function getWorldSurfaceY(
  region: BukkitRegionAccessor,
  x: number,
  z: number
): number {
  return region.getHighestBlockYAt(x, z, "WORLD_SURFACE");
}

// ============================================
// BLOCK UTILITIES
// ============================================

/**
 * Check if block at coordinates is air.
 */
export function isAir(
  region: BukkitRegionAccessor,
  x: number,
  y: number,
  z: number
): boolean {
  const type = region.getType(x, y, z);
  const name = type.name();
  return name === "AIR" || name === "CAVE_AIR" || name === "VOID_AIR";
}

/**
 * Check if block at location is air.
 */
export function isAirAt(
  region: BukkitRegionAccessor,
  location: BukkitLocation
): boolean {
  const type = region.getType(location);
  const name = type.name();
  return name === "AIR" || name === "CAVE_AIR" || name === "VOID_AIR";
}

/**
 * Check if block is solid (not air, water, lava).
 */
export function isSolid(
  region: BukkitRegionAccessor,
  x: number,
  y: number,
  z: number
): boolean {
  const type = region.getType(x, y, z);
  return type.isSolid();
}

/**
 * Set block to air.
 */
export function clearBlock(
  region: BukkitRegionAccessor,
  x: number,
  y: number,
  z: number,
  airMaterial: BukkitMaterial
): void {
  region.setType(x, y, z, airMaterial);
}

// ============================================
// BIOME UTILITIES
// ============================================

/**
 * Get biome name at coordinates.
 */
export function getBiomeName(
  region: BukkitRegionAccessor,
  x: number,
  y: number,
  z: number
): string {
  return region.getBiome(x, y, z).name();
}

/**
 * Check if biome matches name.
 */
export function isBiome(
  region: BukkitRegionAccessor,
  x: number,
  y: number,
  z: number,
  biomeName: string
): boolean {
  return region.getBiome(x, y, z).name() === biomeName.toUpperCase();
}

/**
 * Fill area with biome.
 */
export function fillBiome(
  region: BukkitRegionAccessor,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  biome: BukkitBiome
): number {
  let count = 0;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        region.setBiome(x, y, z, biome);
        count++;
      }
    }
  }

  return count;
}

// ============================================
// ENTITY UTILITIES
// ============================================

/**
 * Get entity count in region.
 */
export function getEntityCount(region: BukkitRegionAccessor): number {
  const entities = region.getEntities();
  return typeof entities.size === "function" ? entities.size() : 0;
}

/**
 * Get living entity count in region.
 */
export function getLivingEntityCount(region: BukkitRegionAccessor): number {
  const entities = region.getLivingEntities();
  return typeof entities.size === "function" ? entities.size() : 0;
}

/**
 * Spawn entity at surface.
 */
export function spawnAtSurface<T extends BukkitEntity>(
  region: BukkitRegionAccessor,
  x: number,
  z: number,
  clazz: any,
  locationFactory: (x: number, y: number, z: number) => BukkitLocation
): T {
  const y = getSurfaceY(region, x, z) + 1;
  const location = locationFactory(x, y, z);
  return region.spawn<T>(location, clazz);
}

// ============================================
// AREA OPERATIONS
// ============================================

/**
 * Fill area with material.
 */
export function fillArea(
  region: BukkitRegionAccessor,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  material: BukkitMaterial
): number {
  let count = 0;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        region.setType(x, y, z, material);
        count++;
      }
    }
  }

  return count;
}

/**
 * Replace material in area.
 */
export function replaceInArea(
  region: BukkitRegionAccessor,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  from: BukkitMaterial,
  to: BukkitMaterial
): number {
  let count = 0;
  const fromName = from.name();
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (region.getType(x, y, z).name() === fromName) {
          region.setType(x, y, z, to);
          count++;
        }
      }
    }
  }

  return count;
}

/**
 * Count material in area.
 */
export function countInArea(
  region: BukkitRegionAccessor,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  material: BukkitMaterial
): number {
  let count = 0;
  const targetName = material.name();
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  const minZ = Math.min(z1, z2);
  const maxZ = Math.max(z1, z2);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (region.getType(x, y, z).name() === targetName) {
          count++;
        }
      }
    }
  }

  return count;
}

// ============================================
// COLUMN OPERATIONS
// ============================================

/**
 * Fill column from bottom to surface.
 */
export function fillColumn(
  region: BukkitRegionAccessor,
  x: number,
  z: number,
  minY: number,
  material: BukkitMaterial
): number {
  const surfaceY = getSurfaceY(region, x, z);
  let count = 0;

  for (let y = minY; y <= surfaceY; y++) {
    region.setType(x, y, z, material);
    count++;
  }

  return count;
}

/**
 * Get all materials in column.
 */
export function getColumnMaterials(
  region: BukkitRegionAccessor,
  x: number,
  z: number,
  minY: number,
  maxY: number
): Map<number, string> {
  const materials = new Map<number, string>();

  for (let y = minY; y <= maxY; y++) {
    materials.set(y, region.getType(x, y, z).name());
  }

  return materials;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Get region info as plain object.
 */
export function getRegionInfo(region: BukkitRegionAccessor): {
  entityCount: number;
  livingEntityCount: number;
} {
  return {
    entityCount: getEntityCount(region),
    livingEntityCount: getLivingEntityCount(region),
  };
}