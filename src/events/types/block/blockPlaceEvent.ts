// events/block/BlockPlaceEvent.ts

import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";
import { BukkitEquipmentSlot } from "../../../entities/types/entityEquipments";
import { BukkitItemStack } from "../../../items/types/itemstack";
import { BukkitBlock } from "../../../world/types/block";
import { BukkitBlockState } from "../../../world/types/blockState";
import { BukkitBlockEvent } from "../blockEvent";
import { BukkitCancellable } from "../cancellable";


/**
 * BlockPlaceEvent
 * 
 * Called when a block is placed by a player.
 * 
 * HIERARCHY:
 * Event
 * └── BlockEvent
 *     └── BlockPlaceEvent (this)
 *         └── BlockMultiPlaceEvent
 * 
 * BLOCKS INVOLVED:
 * - getBlock() / getBlockPlaced(): The block that was placed
 * - getBlockAgainst(): The block the player clicked to place
 * - getBlockReplacedState(): What was there before (usually AIR)
 * 
 * CANCELLATION:
 * If cancelled, the block will NOT be placed.
 * 
 * canBuild vs isCancelled:
 * - canBuild(): Server permission (e.g., spawn protection)
 * - isCancelled(): Plugin cancellation
 * - Both must be true/false respectively for placement to succeed
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/block/BlockPlaceEvent.html
 */
export interface EventBlockPlaceEvent extends BukkitBlockEvent, BukkitCancellable {
  /**
   * Gets the player who placed the block involved in this event.
   * 
   * @returns The Player who placed the block
   */
  getPlayer(): BukkitPlayer;

  /**
   * Clarity method for getting the placed block.
   * Same as getBlock().
   * 
   * @returns The Block that was placed
   */
  getBlockPlaced(): BukkitBlock;

  /**
   * Gets the BlockState for the block which was replaced.
   * Usually AIR, but could be water, grass, etc.
   * 
   * @returns The BlockState for the replaced block
   */
  getBlockReplacedState(): BukkitBlockState;

  /**
   * Gets the block that this block was placed against.
   * This is the block the player clicked on to place.
   * 
   * @returns The block that was clicked
   */
  getBlockAgainst(): BukkitBlock;

  /**
   * Gets the item in the player's hand when they placed the block.
   * 
   * @returns The ItemStack used to place the block
   */
  getItemInHand(): BukkitItemStack;

  /**
   * Gets the hand which placed the block.
   * 
   * @returns HAND or OFF_HAND
   */
  getHand(): BukkitEquipmentSlot;

  /**
   * Gets the value whether the player would be allowed to build here.
   * 
   * This is the SERVER's permission check (e.g., spawn protection).
   * Different from plugin cancellation via setCancelled().
   * 
   * @returns true if server allows building here
   */
  canBuild(): boolean;

  /**
   * Sets the canBuild state of this event.
   * Set to true to allow the player to build even in protected areas.
   * 
   * @param canBuild true to allow building
   */
  setBuild(canBuild: boolean): void;

  /* Inherited from EventBlockEvent:
   * - getBlock(): BukkitBlock (same as getBlockPlaced())
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

// Export della classe Java
export const BlockPlaceEvent = org.bukkit.event.block.BlockPlaceEvent;