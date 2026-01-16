/**
 * Represents a chunk of blocks (16x16 column, full world height).
 * 
 * If the chunk is not fully generated and data is requested, it will
 * only generate as far as needed to provide the requested data.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Chunk.html
 */

import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitPlayer } from "../../entities/types/bukkitPlayer";
import { BukkitBiome } from "../enums/biomeType";
import { BukkitBlockData } from "./blockData";
import { BukkitBlockState } from "./blockState";
import { BukkitChunkSnapshot } from "./chunkSnapshot";
import { BukkitWorld } from "./world";



// ============================================
// LOAD LEVEL ENUM
// ============================================

/**
 * Determines what game logic is processed for this chunk.
 */
export type ChunkLoadLevelKey = "INACCESSIBLE" | "BORDER" | "TICKING" | "ENTITY_TICKING";

export interface BukkitChunkLoadLevel {
  name(): ChunkLoadLevelKey;
  ordinal(): number;
}

// ============================================
// INTERFACE
// ============================================

export interface BukkitChunk {
  /**
   * Chunk X coordinate (in chunk coords, not blocks).
   * Multiply by 16 to get block X of corner.
   */
  getX(): number;

  /**
   * Chunk Z coordinate (in chunk coords, not blocks).
   */
  getZ(): number;

  /**
   * The world this chunk belongs to.
   */
  getWorld(): BukkitWorld;

  /**
   * Get a block at local coordinates within this chunk.
   * @param x 0-15
   * @param y world minHeight to maxHeight
   * @param z 0-15
   */
  getBlock(x: number, y: number, z: number): BukkitBlock;

  /**
   * Thread-safe snapshot of chunk data. Use for async processing.
   */
  getChunkSnapshot(): BukkitChunkSnapshot;

  /**
   * Thread-safe snapshot with options.
   * @param includeMaxblocky Include per-coordinate max Y values
   * @param includeBiome Include per-coordinate biome data
   * @param includeBiomeTempRain Include per-coordinate temperature/rainfall
   */
  getChunkSnapshot(
    includeMaxblocky: boolean,
    includeBiome: boolean,
    includeBiomeTempRain: boolean
  ): BukkitChunkSnapshot;

  /**
   * True if entities in this chunk are loaded.
   */
  isEntitiesLoaded(): boolean;

  /**
   * All entities in this chunk. Forces entity load if not loaded.
   */
  getEntities(): BukkitEntity[];

  /**
   * All tile entities (chests, signs, etc.) in this chunk.
   */
  getTileEntities(): BukkitBlockState[];

  /**
   * True if chunk is fully generated.
   */
  isGenerated(): boolean;

  /**
   * True if chunk is currently loaded.
   */
  isLoaded(): boolean;

  /**
   * Load the chunk.
   * @returns true if loaded successfully
   */
  load(): boolean;

  /**
   * Load the chunk.
   * @param generate If true, generate chunk if it doesn't exist
   * @returns true if loaded successfully
   */
  load(generate: boolean): boolean;

  /**
   * Unload the chunk, saving it.
   * @returns true if unloaded successfully
   */
  unload(): boolean;

  /**
   * Unload the chunk.
   * @param save Whether to save before unloading
   * @returns true if unloaded successfully
   */
  unload(save: boolean): boolean;

  /**
   * True if slimes can spawn here (based on chunk seed, not biome).
   */
  isSlimeChunk(): boolean;

  /**
   * True if chunk is force-loaded (won't unload due to player inactivity).
   */
  isForceLoaded(): boolean;

  /**
   * Set whether chunk is force-loaded.
   */
  setForceLoaded(forced: boolean): void;

  /**
   * Time in ticks this chunk has been inhabited.
   * Increments once per tick per player within mob spawning distance.
   */
  getInhabitedTime(): number;

  /**
   * Set inhabited time.
   */
  setInhabitedTime(ticks: number): void;

  /**
   * True if chunk contains the specified block data.
   */
  contains(block: BukkitBlockData): boolean;

  /**
   * True if chunk contains the specified biome.
   */
  contains(biome: BukkitBiome): boolean;

  /**
   * Current load level. Determines what game logic runs.
   */
  getLoadLevel(): BukkitChunkLoadLevel;

  /**
   * All generated structures intersecting this chunk.
   */
  getStructures(): BukkitGeneratedStructure[];

  /**
   * Generated structures of a specific type intersecting this chunk.
   */
  getStructures(structure: BukkitStructure): BukkitGeneratedStructure[];

  /**
   * Players who can see this chunk from their client.
   * Empty if no players viewing or chunk unloaded.
   */
  getPlayersSeeingChunk(): BukkitPlayer[];
}