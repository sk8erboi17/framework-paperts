/**
 * Represents the data associated with a block.
 * 
 * Contains the material and any additional state (waterlogged, facing,
 * open/closed, etc.). Immutable-ish: modification methods return new
 * instances or mutate in place depending on the method.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/data/BlockData.html
 */

import { BukkitColor } from "../../items/enums/colorType";
import { BukkitMaterial } from "../../items/enums/materialType";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitSoundGroup } from "../../sounds/soundGroup";
import { BukkitBlockFace } from "../enums/blockFace";
import { BukkitBlockSupport } from "../enums/blockSupport";
import { BukkitMirror } from "../enums/mirror";
import { BukkitPistonMoveReaction } from "../enums/pistonMoveReactionType";
import { BukkitStructureRotation } from "../enums/structureRotation";
import { BukkitBlock } from "./block";
import { BukkitLocation } from "./location";



// ============================================
// INTERFACE
// ============================================

export interface BukkitBlockData {
  /**
   * The material of this block.
   */
  getMaterial(): BukkitMaterial;

  /**
   * Serialize to string. Can be passed to Server.createBlockData() to recreate.
   * Includes all states explicitly.
   */
  getAsString(): string;

  /**
   * Serialize to string.
   * @param hideUnspecified If true, omit states that weren't explicitly set.
   */
  getAsString(hideUnspecified: boolean): string;

  /**
   * Merge explicitly set states from another BlockData.
   * The other data must be from a string parse method and same block type.
   * Returns a new instance.
   */
  merge(data: BukkitBlockData): BukkitBlockData;

  /**
   * Check if another BlockData matches this one.
   * For parsed data, matches if type and explicitly set states match.
   * Note: a.matches(b) may differ from b.matches(a).
   */
  matches(data: BukkitBlockData | null): boolean;

  /**
   * Deep copy.
   */
  clone(): BukkitBlockData;

  /**
   * Sound group for this block (step, break, place sounds, etc.).
   */
  getSoundGroup(): BukkitSoundGroup;

  /**
   * Light level emitted by this block. 0-15.
   */
  getLightEmission(): number;

  /**
   * True if this block occludes other blocks.
   * Affects visuals (dripping particles) and light propagation.
   */
  isOccluding(): boolean;

  /**
   * True if this block requires a specific tool to drop items.
   * E.g., diamond ore needs iron+ pickaxe.
   */
  requiresCorrectToolForDrops(): boolean;

  /**
   * True if the given tool is preferred for breaking this block.
   * May affect drops or mining speed.
   */
  isPreferredTool(tool: BukkitItemStack): boolean;

  /**
   * How this block reacts to pistons.
   */
  getPistonMoveReaction(): BukkitPistonMoveReaction;

  /**
   * True if this block state would be supported at the given block position.
   * E.g., would a wall torch survive here?
   */
  isSupported(block: BukkitBlock): boolean;

  /**
   * True if this block state would be supported at the given location.
   */
  isSupported(location: BukkitLocation): boolean;

  /**
   * True if the given face can provide the specified support level.
   * E.g., can this face support a torch?
   */
  isFaceSturdy(face: BukkitBlockFace, support: BukkitBlockSupport): boolean;

  /**
   * Color this block appears as on maps.
   */
  getMapColor(): BukkitColor;

  /**
   * The item material used to place this block.
   * Usually same as getMaterial(), but not always:
   * REDSTONE_WIRE -> REDSTONE, CARROTS -> CARROT
   */
  getPlacementMaterial(): BukkitMaterial;

  /**
   * Rotate this block data. Mutates in place.
   * No effect on blocks without rotatable states.
   */
  rotate(rotation: BukkitStructureRotation): void;

  /**
   * Mirror this block data. Mutates in place.
   * No effect on blocks without mirrorable states.
   */
  mirror(mirror: BukkitMirror): void;

  /**
   * Copy applicable properties to another BlockData. Mutates other.
   * Only copies properties both blocks share.
   */
  copyTo(other: BukkitBlockData): void;

  /**
   * Create a new unbound BlockState for this block type.
   */
  createBlockState(): BukkitBlockFace;
}