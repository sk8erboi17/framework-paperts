// events/block/BlockBreakEvent.ts

import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";
import { BukkitCancellable } from "../cancellable";
import { EventBlockExpEvent } from "./blockExpEvent";


/**
 * BlockBreakEvent
 * 
 * Called when a block is broken by a player.
 * 
 * HIERARCHY:
 * Event
 * └── BlockEvent
 *     └── BlockExpEvent
 *         └── BlockBreakEvent (this)
 * 
 * EXPERIENCE DROPS:
 * By default, experience will be set if:
 * - Player is not in creative or adventure mode
 * - Player can loot the block (correct tool)
 * - Player does not have silk touch
 * - Block drops experience in vanilla Minecraft
 * 
 * ITEM DROPS:
 * - Use isDropItems()/setDropItems() to control item drops
 * - If setDropItems(false), BlockDropItemEvent will NOT fire
 * - For custom drops, set block to air and handle drops manually
 * 
 * CANCELLATION:
 * If cancelled:
 * - Block will NOT break
 * - Experience will NOT drop
 * - Items will NOT drop
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/block/BlockBreakEvent.html
 */
export interface EventBlockBreakEvent extends EventBlockExpEvent, BukkitCancellable { 
  /**
   * Gets the Player that is breaking the block involved in this event.
   * 
   * @returns The Player breaking the block
   */
  getPlayer(): BukkitPlayer;

  /**
   * Gets whether or not the block will attempt to drop items.
   * 
   * If false, BlockDropItemEvent will NOT be called after this event.
   * 
   * @returns Whether the block will attempt to drop items
   */
  isDropItems(): boolean;

  /**
   * Sets whether or not the block will attempt to drop items as it normally would.
   * 
   * If false, BlockDropItemEvent will NOT be called after this event.
   * 
   * @param dropItems Whether the block should drop items
   */
  setDropItems(dropItems: boolean): void;

  /* Inherited from EventBlockExpEvent:
   * - getExpToDrop(): number
   * - setExpToDrop(exp: number): void
   */

  /* Inherited from EventBlockEvent:
   * - getBlock(): BukkitBlock
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

// Export della classe Java
export const BlockBreakEvent = org.bukkit.event.block.BlockBreakEvent;