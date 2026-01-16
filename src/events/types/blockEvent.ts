// events/block/BlockEvent.ts

import { BukkitBlock } from "../../world/types/block";

/**
 * BlockEvent
 * 
 * Base class for all block-related events.
 * 
 * HIERARCHY:
 * Event
 * └── BlockEvent (this)
 *     ├── BlockBreakEvent
 *     ├── BlockPlaceEvent
 *     ├── BlockBurnEvent
 *     ├── BlockDamageEvent
 *     ├── BlockExplodeEvent
 *     ├── BlockFadeEvent
 *     ├── BlockFromToEvent
 *     ├── BlockGrowEvent
 *     ├── BlockIgniteEvent
 *     ├── BlockPhysicsEvent
 *     ├── BlockPistonEvent
 *     ├── BlockRedstoneEvent
 *     ├── SignChangeEvent
 *     ├── NotePlayEvent
 *     ├── BrewEvent
 *     ├── FurnaceBurnEvent
 *     └── ... many more
 * 
 * DESIGN:
 * -------
 * 
 * All block events share one thing: they involve a Block.
 * This base interface provides getBlock() which returns
 * the block involved in the event.
 * 
 * SUBCLASS PATTERNS:
 * - Most subclasses add Cancellable
 * - Some add player info (BlockBreakEvent, BlockPlaceEvent)
 * - Some add specific data (BlockIgniteEvent has ignite cause)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/block/BlockEvent.html
 */
export interface BukkitBlockEvent {
  /**
   * Gets the block involved in this event.
   * 
   * @returns The Block which is involved in this event
   */
  getBlock(): BukkitBlock;
}
