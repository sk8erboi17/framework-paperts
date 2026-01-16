/**
 * DESIGN
 * ------
 * BiomeProvider is an abstract class for providing custom biomes during world generation.
 * 
 * BIOME GENERATION FLOW:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                  BIOME GENERATION                           │
 *   │                                                             │
 *   │   ┌──────────────┐     ┌───────────────┐     ┌──────────┐  │
 *   │   │ World Loader │ ──► │ BiomeProvider │ ──► │  Biomes  │  │
 *   │   └──────────────┘     └───────────────┘     └──────────┘  │
 *   │          │                     │                           │
 *   │          │                     │                           │
 *   │          ▼                     ▼                           │
 *   │   ┌──────────────┐     ┌───────────────┐                   │
 *   │   │  WorldInfo   │     │  getBiomes()  │  Called ONCE      │
 *   │   │  (seed, env) │     │  (biome list) │  at world load    │
 *   │   └──────────────┘     └───────────────┘                   │
 *   │                                                             │
 *   │   For each chunk/block:                                     │
 *   │   ┌──────────────┐     ┌───────────────┐     ┌──────────┐  │
 *   │   │   x, y, z    │ ──► │  getBiome()   │ ──► │  Biome   │  │
 *   │   │ coordinates  │     │  (per block)  │     │ at (x,z) │  │
 *   │   └──────────────┘     └───────────────┘     └──────────┘  │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * BIOME PARAMETERS:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                BIOME PARAMETER POINT                        │
 *   │                                                             │
 *   │   ┌─────────────────┐  ┌─────────────────┐                  │
 *   │   │   Temperature   │  │    Humidity     │                  │
 *   │   │   (hot/cold)    │  │   (wet/dry)     │                  │
 *   │   └─────────────────┘  └─────────────────┘                  │
 *   │                                                             │
 *   │   ┌─────────────────┐  ┌─────────────────┐                  │
 *   │   │ Continentalness │  │    Erosion      │                  │
 *   │   │ (ocean/inland)  │  │  (flat/hilly)   │                  │
 *   │   └─────────────────┘  └─────────────────┘                  │
 *   │                                                             │
 *   │   ┌─────────────────┐  ┌─────────────────┐                  │
 *   │   │     Depth       │  │   Weirdness     │                  │
 *   │   │ (surface/cave)  │  │  (variation)    │                  │
 *   │   └─────────────────┘  └─────────────────┘                  │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * IMPORTANT NOTES:
 * - getBiome() must be thread-safe (called from multiple threads)
 * - getBiomes() is called only ONCE at world load
 * - Never return Biome.CUSTOM from any method
 * - Only return biomes that are in the getBiomes() list
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/generator/BiomeProvider.html
 */

import { JavaList } from "../../java/types/list";
import { BukkitBiome } from "../enums/biomeType";
import { BukkitWorldInfo } from "./worldInfo";



// ============================================
// BIOME PARAMETER POINT INTERFACE
// ============================================

/**
 * Contains biome generation parameters for a location.
 * 
 * These values are used by vanilla Minecraft to determine
 * which biome should generate at a location.
 */
export interface BukkitBiomeParameterPoint {
  /**
   * Get the temperature value.
   * 
   * Affects hot vs cold biomes.
   */
  getTemperature(): number;

  /**
   * Get the humidity value.
   * 
   * Affects wet vs dry biomes.
   */
  getHumidity(): number;

  /**
   * Get the continentalness value.
   * 
   * Affects ocean vs inland biomes.
   */
  getContinentalness(): number;

  /**
   * Get the erosion value.
   * 
   * Affects flat vs hilly terrain.
   */
  getErosion(): number;

  /**
   * Get the depth value.
   * 
   * Affects surface vs underground biomes.
   */
  getDepth(): number;

  /**
   * Get the weirdness value.
   * 
   * Affects biome variation.
   */
  getWeirdness(): number;
}

// ============================================
// BIOME PROVIDER INTERFACE
// ============================================

/**
 * Abstract class for providing biomes during world generation.
 * 
 * Extend this class to create custom biome distributions.
 * 
 * @example
 * class MyBiomeProvider extends BiomeProvider {
 *   getBiome(worldInfo, x, y, z) {
 *     // Return biome based on coordinates
 *     if (x > 0) return Biome.DESERT;
 *     return Biome.FOREST;
 *   }
 *   
 *   getBiomes(worldInfo) {
 *     return [Biome.DESERT, Biome.FOREST];
 *   }
 * }
 */
export interface BukkitBiomeProvider {
  /**
   * Get the biome at a location.
   * 
   * IMPORTANT:
   * - Must be thread-safe
   * - Only return biomes from getBiomes() list
   * - Never return Biome.CUSTOM
   * 
   * @param worldInfo World information
   * @param x X coordinate
   * @param y Y coordinate
   * @param z Z coordinate
   * @returns Biome for the location
   */
  getBiome(
    worldInfo: BukkitWorldInfo,
    x: number,
    y: number,
    z: number
  ): BukkitBiome;

  /**
   * Get the biome at a location with parameter point.
   * 
   * This overload provides additional biome parameters
   * that vanilla Minecraft uses for biome selection.
   * 
   * If both getBiome methods are overridden, only this one is called.
   * 
   * @param worldInfo World information
   * @param x X coordinate
   * @param y Y coordinate
   * @param z Z coordinate
   * @param biomeParameterPoint Default parameters for this location
   * @returns Biome for the location
   */
  getBiomeWithParams?(
    worldInfo: BukkitWorldInfo,
    x: number,
    y: number,
    z: number,
    biomeParameterPoint: BukkitBiomeParameterPoint
  ): BukkitBiome;

  /**
   * Get all biomes this provider can return.
   * 
   * IMPORTANT:
   * - Called only ONCE at world load
   * - List cannot be modified after initial call
   * - Never include Biome.CUSTOM
   * 
   * @param worldInfo World information
   * @returns List of all biomes used by this provider
   */
  getBiomes(worldInfo: BukkitWorldInfo): JavaList<BukkitBiome>;
}

/**
 * Access to BiomeProvider class for extension.
 */
export const BiomeProvider = org.bukkit.generator.BiomeProvider;

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Check if object is a BiomeProvider.
 */
export function isBiomeProvider(obj: any): obj is BukkitBiomeProvider {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getBiome === "function" &&
         typeof obj.getBiomes === "function";
}

/**
 * Check if object is a BiomeParameterPoint.
 */
export function isBiomeParameterPoint(obj: any): obj is BukkitBiomeParameterPoint {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getTemperature === "function" &&
         typeof obj.getHumidity === "function" &&
         typeof obj.getContinentalness === "function" &&
         typeof obj.getErosion === "function" &&
         typeof obj.getDepth === "function" &&
         typeof obj.getWeirdness === "function";
}

// ============================================
// BIOME PARAMETER POINT UTILITIES
// ============================================

/**
 * Get biome parameter point as plain object.
 */
export function getBiomeParameterPointInfo(point: BukkitBiomeParameterPoint): {
  temperature: number;
  humidity: number;
  continentalness: number;
  erosion: number;
  depth: number;
  weirdness: number;
} {
  return {
    temperature: point.getTemperature(),
    humidity: point.getHumidity(),
    continentalness: point.getContinentalness(),
    erosion: point.getErosion(),
    depth: point.getDepth(),
    weirdness: point.getWeirdness(),
  };
}

/**
 * Describe a biome parameter point.
 */
export function describeBiomeParameterPoint(point: BukkitBiomeParameterPoint): string {
  const temp = point.getTemperature().toFixed(2);
  const humid = point.getHumidity().toFixed(2);
  const cont = point.getContinentalness().toFixed(2);
  const eros = point.getErosion().toFixed(2);
  
  return `temp=${temp}, humid=${humid}, cont=${cont}, eros=${eros}`;
}

/**
 * Check if parameter point indicates hot climate.
 */
export function isHotClimate(point: BukkitBiomeParameterPoint): boolean {
  return point.getTemperature() > 0.5;
}

/**
 * Check if parameter point indicates cold climate.
 */
export function isColdClimate(point: BukkitBiomeParameterPoint): boolean {
  return point.getTemperature() < -0.5;
}

/**
 * Check if parameter point indicates wet climate.
 */
export function isWetClimate(point: BukkitBiomeParameterPoint): boolean {
  return point.getHumidity() > 0.5;
}

/**
 * Check if parameter point indicates dry climate.
 */
export function isDryClimate(point: BukkitBiomeParameterPoint): boolean {
  return point.getHumidity() < -0.5;
}

/**
 * Check if parameter point indicates ocean area.
 */
export function isOceanArea(point: BukkitBiomeParameterPoint): boolean {
  return point.getContinentalness() < -0.5;
}

/**
 * Check if parameter point indicates inland area.
 */
export function isInlandArea(point: BukkitBiomeParameterPoint): boolean {
  return point.getContinentalness() > 0.5;
}

/**
 * Check if parameter point indicates underground.
 */
export function isUnderground(point: BukkitBiomeParameterPoint): boolean {
  return point.getDepth() > 0;
}

/**
 * Check if parameter point indicates surface.
 */
export function isSurface(point: BukkitBiomeParameterPoint): boolean {
  return point.getDepth() <= 0;
}

// ============================================
// BIOME PROVIDER HELPERS
// ============================================

/**
 * Get biomes from provider as array.
 */
export function getBiomesArray(
  provider: BukkitBiomeProvider,
  worldInfo: BukkitWorldInfo
): BukkitBiome[] {
  const list = provider.getBiomes(worldInfo);
  const result: BukkitBiome[] = [];
  
  /* Handle Java List */
  if (typeof list.iterator === "function") {
    const iter = list.iterator();
    while (iter.hasNext()) {
      result.push(iter.next());
    }
  } else if (typeof list.size === "function") {
    for (let i = 0; i < list.size(); i++) {
      result.push(list.get(i));
    }
  }
  
  return result;
}

/**
 * Count biomes in a provider.
 */
export function countBiomes(
  provider: BukkitBiomeProvider,
  worldInfo: BukkitWorldInfo
): number {
  const list = provider.getBiomes(worldInfo);
  return typeof list.size === "function" ? list.size() : 0;
}

/**
 * Check if provider includes a specific biome.
 */
export function providerIncludesBiome(
  provider: BukkitBiomeProvider,
  worldInfo: BukkitWorldInfo,
  biomeName: string
): boolean {
  const biomes = getBiomesArray(provider, worldInfo);
  return biomes.some(biome => biome.name() === biomeName);
}

/**
 * Get biome names from provider.
 */
export function getBiomeNames(
  provider: BukkitBiomeProvider,
  worldInfo: BukkitWorldInfo
): string[] {
  const biomes = getBiomesArray(provider, worldInfo);
  return biomes.map(biome => biome.name());
}

// ============================================
// SIMPLE BIOME PROVIDER IMPLEMENTATIONS
// ============================================

/**
 * Configuration for a single-biome provider.
 */
export interface SingleBiomeProviderConfig {
  /** The only biome this provider returns */
  biome: BukkitBiome;
}

/**
 * Create a simple single-biome provider.
 * 
 * Returns the same biome for all locations.
 * 
 * @example
 * const provider = createSingleBiomeProvider({ biome: Biome.PLAINS });
 */
export function createSingleBiomeProvider(
  config: SingleBiomeProviderConfig
): BukkitBiomeProvider {
  return {
    getBiome(_worldInfo, _x, _y, _z) {
      return config.biome;
    },
    getBiomes(_worldInfo) {
      return Java.singletonList(config.biome);
    },
  };
}

/**
 * Configuration for a checkerboard biome provider.
 */
export interface CheckerboardBiomeProviderConfig {
  /** First biome */
  biome1: BukkitBiome;
  /** Second biome */
  biome2: BukkitBiome;
  /** Size of each square (default: 16) */
  size?: number;
}

/**
 * Create a checkerboard biome provider.
 * 
 * Alternates between two biomes in a checkerboard pattern.
 * 
 * @example
 * const provider = createCheckerboardBiomeProvider({
 *   biome1: Biome.DESERT,
 *   biome2: Biome.FOREST,
 *   size: 64
 * });
 */
export function createCheckerboardBiomeProvider(
  config: CheckerboardBiomeProviderConfig
): BukkitBiomeProvider {
  const size = config.size ?? 16;
  
  return {
    getBiome(_worldInfo, x, _y, z) {
      const xCheck = Math.floor(x / size) % 2 === 0;
      const zCheck = Math.floor(z / size) % 2 === 0;
      
      return (xCheck === zCheck) ? config.biome1 : config.biome2;
    },
    getBiomes(_worldInfo) {
      return Java.asList(config.biome1, config.biome2);
    },
  };
}

/**
 * Configuration for a stripe biome provider.
 */
export interface StripeBiomeProviderConfig {
  /** Biomes to cycle through */
  biomes: BukkitBiome[];
  /** Width of each stripe (default: 64) */
  stripeWidth?: number;
  /** Direction: "x" or "z" (default: "x") */
  direction?: "x" | "z";
}

/**
 * Create a stripe biome provider.
 * 
 * Creates parallel stripes of biomes.
 * 
 * @example
 * const provider = createStripeBiomeProvider({
 *   biomes: [Biome.DESERT, Biome.PLAINS, Biome.FOREST],
 *   stripeWidth: 128,
 *   direction: "z"
 * });
 */
export function createStripeBiomeProvider(
  config: StripeBiomeProviderConfig
): BukkitBiomeProvider {
  const stripeWidth = config.stripeWidth ?? 64;
  const direction = config.direction ?? "x";
  
  return {
    getBiome(_worldInfo, x, _y, z) {
      const coord = direction === "x" ? x : z;
      const index = Math.floor(Math.abs(coord) / stripeWidth) % config.biomes.length;
      return config.biomes[index];
    },
    getBiomes(_worldInfo) {
      return Java.asList(...config.biomes);
    },
  };
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a biome provider.
 */
export function describeBiomeProvider(
  provider: BukkitBiomeProvider,
  worldInfo: BukkitWorldInfo
): string {
  const biomeCount = countBiomes(provider, worldInfo);
  return `BiomeProvider with ${biomeCount} biomes`;
}

/**
 * Get biome provider info as plain object.
 */
export function getBiomeProviderInfo(
  provider: BukkitBiomeProvider,
  worldInfo: BukkitWorldInfo
): {
  biomeCount: number;
  biomeNames: string[];
} {
  return {
    biomeCount: countBiomes(provider, worldInfo),
    biomeNames: getBiomeNames(provider, worldInfo),
  };
}