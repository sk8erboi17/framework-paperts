// events/inventory/InventoryOpenEvent.ts

import { BukkitHumanEntity } from "../../../entities/types/bukkitHumanEntity";
import { BukkitCancellable } from "../cancellable";
import { EventInventoryEvent } from "./inventoryEvent";

/**
 * InventoryOpenEvent
 * 
 * Called when a player opens an inventory.
 * 
 * HIERARCHY:
 * Event
 * └── InventoryEvent
 *     └── InventoryOpenEvent (this)
 * 
 * CANCELLATION:
 * If cancelled, the inventory screen will NOT be shown to the player.
 * The inventory remains closed.
 * 
 * COMMON USE CASES:
 * - Prevent players from opening certain inventories
 * - Log inventory access
 * - Modify inventory contents before showing
 * - Permission checks for containers
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/InventoryOpenEvent.html
 */
export interface EventInventoryOpenEvent extends EventInventoryEvent, BukkitCancellable {
  /**
   * Returns the player involved in this event.
   * 
   * @returns The player opening the inventory
   */
  getPlayer(): BukkitHumanEntity;

  /* Inherited from EventInventoryEvent:
   * - getInventory(): BukkitInventory
   * - getView(): BukkitInventoryView
   * - getViewers(): JavaList<BukkitHumanEntity>
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

export const InventoryOpenEvent = org.bukkit.event.inventory.InventoryOpenEvent;