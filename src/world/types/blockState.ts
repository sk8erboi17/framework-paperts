/**
 * Represents a captured state of a block, which will not change automatically.
 * 
 * Unlike Block (one object per coordinate), BlockState can exist multiple times
 * for any given Block. Another plugin may change the actual block without you
 * knowing, making your BlockState outdated or invalid.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/BlockState.html
 */

import { BukkitMaterial } from "../../items/enums/materialType";
import { BukkitMaterialData } from "../../items/types/materialData";
import { BukkitBlock } from "./block";
import { BukkitBlockData } from "./blockData";
import { BukkitChunk } from "./chunk";
import { BukkitLocation } from "./location";
import { BukkitWorld } from "./world";



// ============================================
// INTERFACE
// ============================================

export interface BukkitBlockState {
  /**
   * The actual block this state represents.
   * @throws IllegalStateException if not placed
   */
  getBlock(): BukkitBlock;

  /**
   * Block-specific data (facing, waterlogged, etc.).
   */
  getBlockData(): BukkitBlockData;

  /**
   * Set block-specific data.
   */
  setBlockData(data: BukkitBlockData): void;

  /**
   * The material type.
   */
  getType(): BukkitMaterial;

  /**
   * Change the material type.
   */
  setType(type: BukkitMaterial): void;

  /**
   * Light level at this block. 0-15.
   * @throws IllegalStateException if not placed
   */
  getLightLevel(): number;

  /**
   * World containing this block.
   * @throws IllegalStateException if not placed
   */
  getWorld(): BukkitWorld;

  /**
   * Block X coordinate.
   */
  getX(): number;

  /**
   * Block Y coordinate.
   */
  getY(): number;

  /**
   * Block Z coordinate.
   */
  getZ(): number;

  /**
   * Location of this block state.
   * If not placed, world will be null.
   */
  getLocation(): BukkitLocation;

  /**
   * Store location in the provided object (avoids allocation).
   * If not placed, world will be null.
   * @returns The same Location object, or null if loc was null
   */
  getLocation(loc: BukkitLocation | null): BukkitLocation | null;

  /**
   * Chunk containing this block.
   * @throws IllegalStateException if not placed
   */
  getChunk(): BukkitChunk;

  /**
   * Copy this state as unplaced.
   */
  copy(): BukkitBlockState;

  /**
   * Copy this state to another location as unplaced.
   */
  copy(location: BukkitLocation): BukkitBlockState;

  /**
   * True if this state is placed in the world.
   * Some methods fail if not placed (e.g. getWorld, getChunk).
   */
  isPlaced(): boolean;

  /**
   * Apply this state to the actual block.
   * Won't update if block type changed since state was captured.
   * @returns true if successful
   */
  update(): boolean;

  /**
   * Apply this state to the actual block.
   * @param force If true, set type even if it changed
   * @returns true if successful
   */
  update(force: boolean): boolean;

  /**
   * Apply this state to the actual block.
   * @param force If true, set type even if it changed
   * @param applyPhysics If true, trigger physics update on neighbors
   * @returns true if successful
   */
  update(force: boolean, applyPhysics: boolean): boolean;

  /**
   * Legacy metadata.
   */
  getData(): BukkitMaterialData;

  /**
   * Set legacy metadata.
   */
  setData(data: BukkitMaterialData): void;

  /**
   * @deprecated Magic value
   */
  getRawData(): number;

  /**
   * @deprecated Magic value
   */
  setRawData(data: number): void;
}