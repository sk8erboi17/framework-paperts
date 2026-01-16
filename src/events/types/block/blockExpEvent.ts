// events/block/BlockExpEvent.ts

import { BukkitBlockEvent } from "../blockEvent";


/**
 * BlockExpEvent
 * 
 * Called when a block yields experience.
 * 
 * HIERARCHY:
 * Event
 * └── BlockEvent
 *     └── BlockExpEvent (this)
 *         ├── BlockBreakEvent
 *         └── FurnaceExtractEvent
 * 
 * COMMON TRIGGERS:
 * - Mining ore blocks (coal, diamond, emerald, etc.)
 * - Breaking spawners
 * - Extracting items from furnace
 * 
 * NOT CANCELLABLE:
 * This event is not cancellable, but you can set exp to 0
 * to prevent experience from dropping.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/block/BlockExpEvent.html
 */
export interface EventBlockExpEvent extends BukkitBlockEvent {
  /**
   * Get the experience dropped by the block after the event has processed.
   * 
   * @returns The experience to drop
   */
  getExpToDrop(): number;

  /**
   * Set the amount of experience dropped by the block after the event has processed.
   * 
   * @param exp 1 or higher to drop experience, else nothing will drop
   */
  setExpToDrop(exp: number): void;

  /* Inherited from EventBlockEvent:
   * - getBlock(): BukkitBlock
   */
}

// Export della classe Java
export const BlockExpEvent = org.bukkit.event.block.BlockExpEvent;
