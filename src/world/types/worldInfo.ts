/**
 * DESIGN
 * ------
 * WorldInfo holds basic information about a World.
 * 
 * WORLD INFORMATION:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                     WORLD INFO                              │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                   IDENTITY                          │   │
 *   │   │                                                     │   │
 *   │   │   Name: "world"          Unique identifier          │   │
 *   │   │   UID:  550e8400-...     UUID for this world        │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                  GENERATION                         │   │
 *   │   │                                                     │   │
 *   │   │   Seed: 123456789        World generation seed      │   │
 *   │   │   Environment: NORMAL    Dimension type             │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                   BOUNDS                            │   │
 *   │   │                                                     │   │
 *   │   │   ┌─────────────────────────────────┐               │   │
 *   │   │   │         maxHeight (320)         │ ← Sky limit   │   │
 *   │   │   │                                 │               │   │
 *   │   │   │           BUILDABLE             │               │   │
 *   │   │   │             AREA                │               │   │
 *   │   │   │                                 │               │   │
 *   │   │   │         minHeight (-64)         │ ← Void start  │   │
 *   │   │   └─────────────────────────────────┘               │   │
 *   │   │                                                     │   │
 *   │   │   Height examples by environment:                   │   │
 *   │   │   - Overworld: -64 to 320 (384 blocks)              │   │
 *   │   │   - Nether:      0 to 256 (256 blocks)              │   │
 *   │   │   - The End:     0 to 256 (256 blocks)              │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * USAGE:
 * - WorldInfo is a read-only subset of World
 * - Used by world generators to get world properties
 * - World extends WorldInfo with full functionality
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/generator/WorldInfo.html
 */

import { JavaUUID } from "../../java/types/uuid";
import { BukkitEnvironment } from "../enums/worldEnv";


// ============================================
// INTERFACE
// ============================================

/**
 * Read-only information about a World.
 * 
 * This interface is used by world generators and provides
 * basic world properties without full World functionality.
 */
export interface BukkitWorldInfo {
  /**
   * Get the unique name of this world.
   * 
   * @returns World name
   * 
   * @example
   * const name = worldInfo.getName();
   * console.log(`World: ${name}`); // "world", "world_nether", etc.
   */
  getName(): string;

  /**
   * Get the unique ID of this world.
   * 
   * @returns World UUID
   * 
   * @example
   * const uid = worldInfo.getUID();
   * console.log(`World UID: ${uid.toString()}`);
   */
  getUID(): JavaUUID;

  /**
   * Get the environment type of this world.
   * 
   * @returns World environment (NORMAL, NETHER, THE_END, CUSTOM)
   * 
   * @example
   * const env = worldInfo.getEnvironment();
   * if (env.name() === "NETHER") {
   *   console.log("This is the Nether!");
   * }
   */
  getEnvironment(): BukkitEnvironment;

  /**
   * Get the world seed.
   * 
   * The seed determines terrain generation.
   * Same seed = same terrain.
   * 
   * @returns World seed
   * 
   * @example
   * const seed = worldInfo.getSeed();
   * console.log(`Seed: ${seed}`);
   */
  getSeed(): number;

  /**
   * Get the minimum height of this world.
   * 
   * Blocks can exist from minHeight (inclusive).
   * For Overworld, this is typically -64.
   * 
   * @returns Minimum Y coordinate
   * 
   * @example
   * const minY = worldInfo.getMinHeight();
   * // minY = -64 for Overworld
   */
  getMinHeight(): number;

  /**
   * Get the maximum height of this world.
   * 
   * Blocks can exist up to maxHeight (exclusive).
   * For Overworld, this is typically 320.
   * 
   * @returns Maximum Y coordinate (exclusive)
   * 
   * @example
   * const maxY = worldInfo.getMaxHeight();
   * // maxY = 320 for Overworld (blocks 0-319)
   */
  getMaxHeight(): number;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a WorldInfo.
 */
export function isWorldInfo(obj: any): obj is BukkitWorldInfo {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getName === "function" &&
         typeof obj.getUID === "function" &&
         typeof obj.getEnvironment === "function" &&
         typeof obj.getSeed === "function" &&
         typeof obj.getMinHeight === "function" &&
         typeof obj.getMaxHeight === "function";
}

// ============================================
// HEIGHT UTILITIES
// ============================================

/**
 * Get the total buildable height of a world.
 * 
 * @example
 * const height = getTotalHeight(worldInfo);
 * // Overworld: 384 (from -64 to 320)
 */
export function getTotalHeight(worldInfo: BukkitWorldInfo): number {
  return worldInfo.getMaxHeight() - worldInfo.getMinHeight();
}

/**
 * Check if a Y coordinate is within world bounds.
 */
export function isValidY(worldInfo: BukkitWorldInfo, y: number): boolean {
  return y >= worldInfo.getMinHeight() && y < worldInfo.getMaxHeight();
}

/**
 * Check if a Y coordinate is at or below minimum height.
 */
export function isAtVoid(worldInfo: BukkitWorldInfo, y: number): boolean {
  return y < worldInfo.getMinHeight();
}

/**
 * Check if a Y coordinate is at or above maximum height.
 */
export function isAtBuildLimit(worldInfo: BukkitWorldInfo, y: number): boolean {
  return y >= worldInfo.getMaxHeight();
}

/**
 * Clamp a Y coordinate to valid world bounds.
 */
export function clampY(worldInfo: BukkitWorldInfo, y: number): number {
  const min = worldInfo.getMinHeight();
  const max = worldInfo.getMaxHeight() - 1; /* Max is exclusive */
  return Math.max(min, Math.min(max, y));
}

/**
 * Get the middle Y coordinate of the world.
 */
export function getMiddleY(worldInfo: BukkitWorldInfo): number {
  return Math.floor((worldInfo.getMinHeight() + worldInfo.getMaxHeight()) / 2);
}

/**
 * Get the sea level Y coordinate (approximate).
 * 
 * Note: This is an approximation. Actual sea level
 * may vary by world configuration.
 */
export function getSeaLevel(worldInfo: BukkitWorldInfo): number {
  const env = worldInfo.getEnvironment().name();
  
  /* Overworld sea level is typically 63 */
  if (env === "NORMAL") {
    return 63;
  }
  
  /* Nether "sea level" is lava at 31 */
  if (env === "NETHER") {
    return 31;
  }
  
  /* End has no sea level, return middle */
  return getMiddleY(worldInfo);
}

// ============================================
// ENVIRONMENT SHORTCUTS
// ============================================

/**
 * Check if world is the Overworld.
 */
export function isOverworld(worldInfo: BukkitWorldInfo): boolean {
  return worldInfo.getEnvironment().name() === "NORMAL";
}

/**
 * Check if world is the Nether.
 */
export function isNether(worldInfo: BukkitWorldInfo): boolean {
  return worldInfo.getEnvironment().name() === "NETHER";
}

/**
 * Check if world is The End.
 */
export function isTheEnd(worldInfo: BukkitWorldInfo): boolean {
  return worldInfo.getEnvironment().name() === "THE_END";
}

/**
 * Check if world is a custom dimension.
 */
export function isCustomDimension(worldInfo: BukkitWorldInfo): boolean {
  return worldInfo.getEnvironment().name() === "CUSTOM";
}

/**
 * Check if world is a vanilla dimension.
 */
export function isVanillaDimension(worldInfo: BukkitWorldInfo): boolean {
  return !isCustomDimension(worldInfo);
}

// ============================================
// NAME UTILITIES
// ============================================

/**
 * Check if world is the main Overworld ("world").
 */
export function isMainWorld(worldInfo: BukkitWorldInfo): boolean {
  return worldInfo.getName() === "world";
}

/**
 * Check if world is a default Nether world.
 */
export function isDefaultNether(worldInfo: BukkitWorldInfo): boolean {
  return worldInfo.getName().endsWith("_nether");
}

/**
 * Check if world is a default End world.
 */
export function isDefaultEnd(worldInfo: BukkitWorldInfo): boolean {
  return worldInfo.getName().endsWith("_the_end");
}

/**
 * Get the base world name (without _nether or _the_end suffix).
 */
export function getBaseWorldName(worldInfo: BukkitWorldInfo): string {
  const name = worldInfo.getName();
  
  if (name.endsWith("_nether")) {
    return name.slice(0, -7);
  }
  
  if (name.endsWith("_the_end")) {
    return name.slice(0, -8);
  }
  
  return name;
}

// ============================================
// SEED UTILITIES
// ============================================

/**
 * Get seed as string (for display).
 */
export function getSeedString(worldInfo: BukkitWorldInfo): string {
  return worldInfo.getSeed().toString();
}

/**
 * Check if two worlds have the same seed.
 */
export function haveSameSeed(
  worldInfo1: BukkitWorldInfo,
  worldInfo2: BukkitWorldInfo
): boolean {
  return worldInfo1.getSeed() === worldInfo2.getSeed();
}

// ============================================
// COMPARISON
// ============================================

/**
 * Check if two WorldInfo refer to the same world.
 */
export function isSameWorld(
  worldInfo1: BukkitWorldInfo,
  worldInfo2: BukkitWorldInfo
): boolean {
  return worldInfo1.getUID().toString() === worldInfo2.getUID().toString();
}

/**
 * Check if two worlds have the same bounds.
 */
export function haveSameBounds(
  worldInfo1: BukkitWorldInfo,
  worldInfo2: BukkitWorldInfo
): boolean {
  return worldInfo1.getMinHeight() === worldInfo2.getMinHeight() &&
         worldInfo1.getMaxHeight() === worldInfo2.getMaxHeight();
}

/**
 * Check if two worlds have the same environment.
 */
export function haveSameEnvironment(
  worldInfo1: BukkitWorldInfo,
  worldInfo2: BukkitWorldInfo
): boolean {
  return worldInfo1.getEnvironment().name() === worldInfo2.getEnvironment().name();
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a world info.
 */
export function describeWorldInfo(worldInfo: BukkitWorldInfo): string {
  const name = worldInfo.getName();
  const env = worldInfo.getEnvironment().name();
  const height = getTotalHeight(worldInfo);
  
  return `${name} (${env}, ${height} blocks tall)`;
}

/**
 * Get world info as plain object.
 */
export function getWorldInfoData(worldInfo: BukkitWorldInfo): {
  name: string;
  uid: string;
  environment: string;
  seed: number;
  seedString: string;
  minHeight: number;
  maxHeight: number;
  totalHeight: number;
  isOverworld: boolean;
  isNether: boolean;
  isTheEnd: boolean;
  isCustom: boolean;
} {
  const env = worldInfo.getEnvironment();
  
  return {
    name: worldInfo.getName(),
    uid: worldInfo.getUID().toString(),
    environment: env.name(),
    seed: worldInfo.getSeed(),
    seedString: getSeedString(worldInfo),
    minHeight: worldInfo.getMinHeight(),
    maxHeight: worldInfo.getMaxHeight(),
    totalHeight: getTotalHeight(worldInfo),
    isOverworld: env.name() === "NORMAL",
    isNether: env.name() === "NETHER",
    isTheEnd: env.name() === "THE_END",
    isCustom: env.name() === "CUSTOM",
  };
}

/**
 * Get summary of multiple world infos.
 */
export function getWorldInfoSummary(worldInfos: BukkitWorldInfo[]): {
  total: number;
  overworldCount: number;
  netherCount: number;
  endCount: number;
  customCount: number;
  names: string[];
} {
  let overworldCount = 0;
  let netherCount = 0;
  let endCount = 0;
  let customCount = 0;
  const names: string[] = [];
  
  for (const info of worldInfos) {
    names.push(info.getName());
    
    const env = info.getEnvironment().name();
    switch (env) {
      case "NORMAL":
        overworldCount++;
        break;
      case "NETHER":
        netherCount++;
        break;
      case "THE_END":
        endCount++;
        break;
      case "CUSTOM":
        customCount++;
        break;
    }
  }
  
  return {
    total: worldInfos.length,
    overworldCount,
    netherCount,
    endCount,
    customCount,
    names,
  };
}

// ============================================
// HEIGHT BOUNDS INFO
// ============================================

/**
 * Standard height bounds by environment.
 */
export const STANDARD_HEIGHT_BOUNDS: Record<string, { min: number; max: number }> = {
  NORMAL: { min: -64, max: 320 },
  NETHER: { min: 0, max: 256 },
  THE_END: { min: 0, max: 256 },
};

/**
 * Check if world has standard height bounds for its environment.
 */
export function hasStandardBounds(worldInfo: BukkitWorldInfo): boolean {
  const env = worldInfo.getEnvironment().name();
  const standard = STANDARD_HEIGHT_BOUNDS[env];
  
  if (!standard) return true; /* Custom dimensions have no standard */
  
  return worldInfo.getMinHeight() === standard.min &&
         worldInfo.getMaxHeight() === standard.max;
}

/**
 * Get height bounds info.
 */
export function getHeightBoundsInfo(worldInfo: BukkitWorldInfo): {
  min: number;
  max: number;
  total: number;
  seaLevel: number;
  middle: number;
  isStandard: boolean;
} {
  return {
    min: worldInfo.getMinHeight(),
    max: worldInfo.getMaxHeight(),
    total: getTotalHeight(worldInfo),
    seaLevel: getSeaLevel(worldInfo),
    middle: getMiddleY(worldInfo),
    isStandard: hasStandardBounds(worldInfo),
  };
}