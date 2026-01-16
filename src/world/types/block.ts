/**
 * Represents a block. This is a live object, and only one Block may exist
 * for any given location in a world.
 * 
 * The state of the block may change concurrently; use getState() to get
 * a snapshot that won't be modified.
 * 
 * WARNING: Methods requiring world access (lighting, power) may not be safe
 * during world generation (e.g. in BlockPhysicsEvent).
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/Block.html
 */

import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitPlayer } from "../../entities/types/bukkitPlayer";
import { BukkitMaterial } from "../../items/enums/materialType";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitBiome } from "../enums/biomeType";
import { BukkitBlockFace } from "../enums/blockFace";
import { BukkitPistonMoveReaction } from "../enums/pistonMoveReactionType";
import { BukkitBlockData } from "./blockData";
import { BukkitBlockState } from "./blockState";
import { BukkitBoundingBox } from "./boundingBox";
import { BukkitChunk } from "./chunk";
import { BukkitFluidCollisionMode } from "./fluidCollisionMode";
import { BukkitLocation } from "./location";
import { BukkitRayTraceResult } from "./rayTraceResult";
import { BukkitVector } from "./vector";
import { BukkitVoxelShape } from "./voxelShape";
import { BukkitWorld } from "./world";



// ============================================
// INTERFACE
// ============================================

export interface BukkitBlock {
  // ---- Position ----

  getX(): number;
  getY(): number;
  getZ(): number;

  getLocation(): BukkitLocation;

  /**
   * Store location in provided object (avoids allocation).
   * @returns Same object, or null if loc was null
   */
  getLocation(loc: BukkitLocation | null): BukkitLocation | null;

  getWorld(): BukkitWorld;
  getChunk(): BukkitChunk;

  // ---- Type & Data ----

  getType(): BukkitMaterial;
  setType(type: BukkitMaterial): void;

  /**
   * Set type.
   * @param applyPhysics false to skip physics update. Use with caution!
   */
  setType(type: BukkitMaterial, applyPhysics: boolean): void;

  getBlockData(): BukkitBlockData;
  setBlockData(data: BukkitBlockData): void;

  /**
   * Set block data.
   * @param applyPhysics false to skip physics update. Use with caution!
   */
  setBlockData(data: BukkitBlockData, applyPhysics: boolean): void;

  /**
   * Capture current state as snapshot. Won't auto-update.
   * Cast to specific types (Furnace, Sign, etc.) as needed.
   */
  getState(): BukkitBlockState;

  // ---- Relative Blocks ----

  getRelative(modX: number, modY: number, modZ: number): BukkitBlock;
  getRelative(face: BukkitBlockFace): BukkitBlock;
  getRelative(face: BukkitBlockFace, distance: number): BukkitBlock;

  /**
   * Get face relation to another block.
   * @returns BlockFace pointing to block, or null if not adjacent
   */
  getFace(block: BukkitBlock): BukkitBlockFace | null;

  // ---- Light ----

  /** Total light level 0-15. */
  getLightLevel(): number;

  /** Light from sky only. */
  getLightFromSky(): number;

  /** Light from blocks only (torches, etc.). */
  getLightFromBlocks(): number;

  // ---- Biome & Climate ----

  getBiome(): BukkitBiome;
  setBiome(bio: BukkitBiome): void;

  /** Temperature adjusted for height. */
  getTemperature(): number;

  getHumidity(): number;

  // ---- Redstone ----

  /** True if receiving redstone power. */
  isBlockPowered(): boolean;

  /** True if receiving indirect redstone power. */
  isBlockIndirectlyPowered(): boolean;

  isBlockFacePowered(face: BukkitBlockFace): boolean;
  isBlockFaceIndirectlyPowered(face: BukkitBlockFace): boolean;

  /** Redstone power level on specific face, or SELF for block itself. */
  getBlockPower(face: BukkitBlockFace): number;

  /** Redstone power level. */
  getBlockPower(): number;

  // ---- Block Properties ----

  /** True if AIR. */
  isEmpty(): boolean;

  /** True if WATER or LAVA. */
  isLiquid(): boolean;

  /** True if no collision (tall grass, flowers, signs, etc.). */
  isPassable(): boolean;

  /** How block reacts to pistons. */
  getPistonMoveReaction(): BukkitPistonMoveReaction;

  // ---- Breaking & Drops ----

  /**
   * Break block and spawn drops as if mined by player.
   * @returns true if destroyed
   */
  breakNaturally(): boolean;

  /**
   * Break block with specific tool.
   */
  breakNaturally(tool: BukkitItemStack | null): boolean;

  /** Items that would drop if destroyed. */
  getDrops(): BukkitItemStack[];

  /** Items that would drop with specific tool. */
  getDrops(tool: BukkitItemStack | null): BukkitItemStack[];

  /** Items that would drop with tool by entity. */
  getDrops(tool: BukkitItemStack, entity: BukkitEntity | null): BukkitItemStack[];

  /** True if tool is preferred for breaking (affects drops). */
  isPreferredTool(tool: BukkitItemStack): boolean;

  /**
   * Breaking speed for player. Progress per tick.
   * Block breaks when total progress reaches 1.0.
   */
  getBreakSpeed(player: BukkitPlayer): number;

  // ---- Bone Meal ----

  /**
   * Simulate bone meal on this block.
   * @returns true if successfully bonemealed
   */
  applyBoneMeal(face: BukkitBlockFace): boolean;

  // ---- Collision & Shape ----

  /**
   * Approximate bounding box. Not exact for complex shapes (stairs).
   * Empty for air blocks.
   */
  getBoundingBox(): BukkitBoundingBox;

  /** Precise collision shape. */
  getCollisionShape(): BukkitVoxelShape;

  /**
   * Ray trace against this block's collision shape.
   */
  rayTrace(
    start: BukkitLocation,
    direction: BukkitVector,
    maxDistance: number,
    fluidCollisionMode: BukkitFluidCollisionMode
  ): BukkitRayTraceResult | null;

  /** True if block data can be placed here. */
  canPlace(data: BukkitBlockData): boolean;

  // ---- Deprecated ----

  /**
   * @deprecated Magic value
   */
  getData(): number;
}