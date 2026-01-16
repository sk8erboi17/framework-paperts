// events/inventory/InventoryDragEvent.ts

import { BukkitItemStack } from "../../../items/types/itemstack";
import { JavaMap } from "../../../java/types/map";
import { JavaSet } from "../../../java/types/set";
import { BukkitDragType } from "./enum/dragType";
import { EventInventoryInteractEvent } from "./inventoryClickEvent";



/**
 * InventoryDragEvent
 * 
 * Called when the player drags an item across inventory slots.
 * The item is distributed across the slots the player dragged over.
 * 
 * HIERARCHY:
 * Event
 * └── InventoryEvent
 *     └── InventoryInteractEvent
 *         └── InventoryDragEvent (this)
 * 
 * DRAG TYPES:
 * - SINGLE (right-click drag): Places 1 item per slot
 * - EVEN (left-click drag): Distributes items evenly
 * 
 * CANCELLATION:
 * If cancelled, none of the changes in getNewItems() will be applied.
 * 
 * IMPORTANT WARNINGS:
 * ------------------
 * 
 * Do NOT call these methods directly from this event handler:
 * - player.closeInventory()
 * - player.openInventory(...)
 * - view.close()
 * 
 * Instead, schedule them for the next tick.
 * 
 * MODIFYING ITEMS:
 * Changes to affected slots will be OVERWRITTEN.
 * To change slots:
 * 1. Cancel the event
 * 2. Apply your changes
 * Or schedule changes for the next tick.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/InventoryDragEvent.html
 */
export interface EventInventoryDragEvent extends EventInventoryInteractEvent {
  /**
   * Gets all items to be added to the inventory in this drag.
   * 
   * Map from raw slot id to new ItemStack.
   * 
   * @returns Map of raw slot -> ItemStack
   */
  getNewItems(): JavaMap<number, BukkitItemStack>;

  /**
   * Gets the raw slot ids to be changed in this drag.
   * 
   * Raw slots are unique across the view, suitable for
   * InventoryView.getItem(rawSlot).
   * 
   * @returns Set of raw slot ids
   */
  getRawSlots(): JavaSet<number>;

  /**
   * Gets the slots to be changed in this drag.
   * 
   * These are converted slot ids, suitable for
   * Inventory.getItem(slot).
   * 
   * @returns Set of converted slot ids
   */
  getInventorySlots(): JavaSet<number>;

  /**
   * Gets the result cursor after the drag is done.
   * 
   * The returned value is MUTABLE.
   * 
   * @returns The result cursor, or null if empty
   */
  getCursor(): BukkitItemStack | null;

  /**
   * Sets the result cursor after the drag is done.
   * 
   * Note: Changing this does NOT affect the "dragged" slots,
   * nor does changing dragged slots affect this.
   * 
   * @param newCursor The new cursor ItemStack
   */
  setCursor(newCursor: BukkitItemStack | null): void;

  /**
   * Gets the cursor BEFORE any modifications from this drag.
   * 
   * @returns The original cursor ItemStack
   */
  getOldCursor(): BukkitItemStack;

  /**
   * Gets the DragType that describes how items are distributed.
   * 
   * - SINGLE: Right-click drag, 1 item per slot
   * - EVEN: Left-click drag, distributed evenly
   * 
   * @returns The DragType of this event
   */
  getType(): BukkitDragType;

  /* Inherited from EventInventoryInteractEvent:
   * - getWhoClicked(): BukkitHumanEntity
   * - getResult(): BukkitEventResult
   * - setResult(newResult: BukkitEventResult): void
   */

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

// Export della classe Java
export const InventoryDragEvent = org.bukkit.event.inventory.InventoryDragEvent;