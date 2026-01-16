/**
 * A static, thread-safe snapshot of a chunk.
 * 
 * Allows clean, efficient copy of chunk data for processing in another
 * thread (e.g. map rendering). Once captured, the snapshot won't change
 * even if the actual chunk is modified.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/ChunkSnapshot.html
 */

import { BukkitMaterial } from "../../items/enums/materialType";
import { BukkitBiome } from "../enums/biomeType";
import { BukkitBlockData } from "./blockData";

// ============================================
// INTERFACE
// ============================================

export interface BukkitChunkSnapshot {
  /**
   * Chunk X coordinate (in chunk coordinates, not blocks).
   */
  getX(): number;

  /**
   * Chunk Z coordinate (in chunk coordinates, not blocks).
   */
  getZ(): number;

  /**
   * Name of the world this chunk belongs to.
   */
  getWorldName(): string;

  /**
   * Block type at the given local coordinates.
   * @param x 0-15
   * @param y world minHeight to maxHeight
   * @param z 0-15
   */
  getBlockType(x: number, y: number, z: number): BukkitMaterial;

  /**
   * Block data at the given local coordinates.
   * @param x 0-15
   * @param y world minHeight to maxHeight
   * @param z 0-15
   */
  getBlockData(x: number, y: number, z: number): BukkitBlockData;

  /**
   * Sky light level at the given local coordinates.
   * @param x 0-15
   * @param y world minHeight to maxHeight
   * @param z 0-15
   * @returns 0-15
   */
  getBlockSkyLight(x: number, y: number, z: number): number;

  /**
   * Light emitted by the block at the given local coordinates.
   * @param x 0-15
   * @param y world minHeight to maxHeight
   * @param z 0-15
   * @returns 0-15
   */
  getBlockEmittedLight(x: number, y: number, z: number): number;

  /**
   * Highest non-air Y coordinate at given X/Z.
   * @param x 0-15
   * @param z 0-15
   */
  getHighestBlockYAt(x: number, z: number): number;

  /**
   * Biome at given 3D coordinates.
   * @param x 0-15
   * @param y world minHeight to maxHeight
   * @param z 0-15
   */
  getBiome(x: number, y: number, z: number): BukkitBiome;

  /**
   * Biome at given 2D coordinates.
   * @param x 0-15
   * @param z 0-15
   * @deprecated Biomes are now 3-dimensional. Use getBiome(x, y, z).
   */
  getBiome(x: number, z: number): BukkitBiome;

  /**
   * Raw biome temperature at given 3D coordinates.
   * @param x 0-15
   * @param y 0-15
   * @param z 0-15
   */
  getRawBiomeTemperature(x: number, y: number, z: number): number;

  /**
   * Raw biome temperature at given 2D coordinates.
   * @param x 0-15
   * @param z 0-15
   * @deprecated Biomes are now 3-dimensional.
   */
  getRawBiomeTemperature(x: number, z: number): number;

  /**
   * World time (in ticks) when this snapshot was captured.
   */
  getCaptureFullTime(): number;

  /**
   * True if the given section is empty (all air).
   * @param sy Section Y coordinate (block Y / 16)
   */
  isSectionEmpty(sy: number): boolean;

  /**
   * True if this snapshot contains the specified block data.
   */
  contains(block: BukkitBlockData): boolean;

  /**
   * True if this snapshot contains the specified biome.
   */
  contains(biome: BukkitBiome): boolean;

  /**
   * @deprecated Magic value
   */
  getData(x: number, y: number, z: number): number;
}