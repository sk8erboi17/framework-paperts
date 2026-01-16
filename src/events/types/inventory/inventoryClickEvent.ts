// events/inventory/InventoryInteractEvent.ts

import { BukkitHumanEntity } from "../../../entities/types/bukkitHumanEntity";
import { BukkitCancellable } from "../cancellable";
import { BukkitEventResult } from "../event";
import { EventInventoryEvent } from "./inventoryEvent";



/**
 * InventoryInteractEvent
 * 
 * Abstract base class for events that describe an interaction
 * between a HumanEntity and the contents of an Inventory.
 * 
 * HIERARCHY:
 * Event
 * └── InventoryEvent
 *     └── InventoryInteractEvent (this)
 *         ├── InventoryClickEvent
 *         ├── InventoryDragEvent
 *         └── TradeSelectEvent
 * 
 * RESULT vs CANCELLED:
 * This event uses Event.Result for more fine-grained control:
 * - ALLOW: Force allow the action
 * - DEFAULT: Let vanilla behavior decide
 * - DENY: Cancel the action (equivalent to setCancelled(true))
 * 
 * isCancelled() returns:
 * - false for ALLOW and DEFAULT
 * - true for DENY
 * 
 * setCancelled(true) sets result to DENY
 * setCancelled(false) sets result to ALLOW
 * 
 * Using setResult() is preferred for more control.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/InventoryInteractEvent.html
 */
export interface EventInventoryInteractEvent extends EventInventoryEvent, BukkitCancellable {
  /**
   * Gets the player who performed the click.
   * 
   * @returns The clicking player
   */
  getWhoClicked(): BukkitHumanEntity;

  /**
   * Gets the Result of this event.
   * 
   * The Result describes the behavior that will be applied
   * to the inventory in relation to this event.
   * 
   * @returns The Result of this event
   */
  getResult(): BukkitEventResult;

  /**
   * Sets the result of this event.
   * 
   * This will change whether or not this event is considered cancelled.
   * - ALLOW: Force allow the action
   * - DEFAULT: Let vanilla behavior decide
   * - DENY: Cancel the action
   * 
   * Preferred over setCancelled() for more control.
   * 
   * @param newResult The new Result for this event
   */
  setResult(newResult: BukkitEventResult): void;

  /* Inherited from EventInventoryEvent:
   * - getInventory(): BukkitInventory
   * - getView(): BukkitInventoryView
   * - getViewers(): JavaList<BukkitHumanEntity>
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   *   Returns true if result is DENY, false for ALLOW/DEFAULT
   * 
   * - setCancelled(cancel: boolean): void
   *   Sets result to DENY if true, ALLOW if false
   */
}

export const InventoryInteractEvent = org.bukkit.event.inventory.InventoryInteractEvent;