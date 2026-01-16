// events/block/BlockDropItemEvent.ts

import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";
import { JavaList } from "../../../java/types/list";
import { BukkitBlockState } from "../../../world/types/blockState";
import { BukkitItem } from "../../../world/types/item";
import { BukkitBlockEvent } from "../blockEvent";
import { BukkitCancellable } from "../cancellable";


/**
 * BlockDropItemEvent
 * 
 * Called if a block broken by a player drops an item.
 * 
 * HIERARCHY:
 * Event
 * └── BlockEvent
 *     └── BlockDropItemEvent (this)
 * 
 * WHEN IT FIRES:
 * - After BlockBreakEvent (if not cancelled)
 * - Only if BlockBreakEvent.isDropItems() is true
 * - Also fires for multi-block structures (torch on stone = 2 events)
 * 
 * IMPORTANT:
 * The block is ALREADY BROKEN when this event fires.
 * - getBlock() will return AIR in most cases
 * - Use getBlockState() for info about the original block
 * 
 * ITEMS LIST:
 * The items list is MUTABLE but with restrictions:
 * - You CAN remove items (prevents them from dropping)
 * - You CANNOT add new items (not legal)
 * - Items are actual Item entities that will spawn
 * 
 * CANCELLATION:
 * If cancelled, no items will drop from this block.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/block/BlockDropItemEvent.html
 */
export interface EventBlockDropItemEvent extends BukkitBlockEvent, BukkitCancellable {
  /**
   * Gets the Player that is breaking the block involved in this event.
   * 
   * @returns The Player breaking the block
   */
  getPlayer(): BukkitPlayer;

  /**
   * Gets the BlockState of the block involved in this event BEFORE it was broken.
   * 
   * Use this instead of getBlock() to get information about the original block,
   * since getBlock() will return AIR after the block is broken.
   * 
   * @returns The BlockState of the block before it was broken
   */
  getBlockState(): BukkitBlockState;

  /**
   * Gets list of the Item drops caused by the block break.
   * 
   * This list is MUTABLE with restrictions:
   * - Removing an item will prevent it from dropping
   * - Adding new items is NOT allowed
   * 
   * Items in this list are Item entities that will spawn in the world.
   * 
   * @returns The list of Item entities to drop
   */
  getItems(): JavaList<BukkitItem>;

  /* Inherited from EventBlockEvent:
   * - getBlock(): BukkitBlock  (will be AIR!)
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

// Export della classe Java
export const BlockDropItemEvent = org.bukkit.event.block.BlockDropItemEvent;