// events/inventory/InventoryClickEvent.ts

import { BukkitSlotType } from "../../../inventories/enums/slotType";
import { BukkitInventory } from "../../../inventories/type/inventory";
import { BukkitItemStack } from "../../../items/types/itemstack";
import { BukkitClickType } from "./enum/clickType";
import { BukkitInventoryAction } from "./enum/inventoryAction";
import { EventInventoryInteractEvent } from "./inventoryClickEvent";



/**
 * InventoryClickEvent
 * 
 * Called when a player clicks in an inventory.
 * 
 * HIERARCHY:
 * Event
 * └── InventoryEvent
 *     └── InventoryInteractEvent
 *         └── InventoryClickEvent (this)
 *             ├── CraftItemEvent
 *             ├── InventoryCreativeEvent
 *             └── SmithItemEvent
 * 
 * IMPORTANT WARNINGS:
 * ------------------
 * 
 * Do NOT call these methods directly from this event handler:
 * - player.closeInventory()
 * - player.openInventory(...)
 * - view.close()
 * 
 * Instead, schedule them for the next tick:
 *   Bukkit.getScheduler().runTask(plugin, () => player.closeInventory())
 * 
 * SLOT NUMBERS:
 * - getSlot(): Relative to the clicked inventory (may not be unique)
 * - getRawSlot(): Unique across the entire view
 * - getClickedInventory(): The actual inventory that was clicked
 * 
 * MODIFYING ITEMS:
 * Changes to slots affected by this event may be overwritten.
 * To reliably change items:
 * 1. Cancel the event
 * 2. Apply your changes
 * Or schedule changes for the next tick.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/InventoryClickEvent.html
 */
export interface EventInventoryClickEvent extends EventInventoryInteractEvent {
  /**
   * Gets the inventory corresponding to the clicked slot.
   * 
   * @returns The clicked inventory, or null if clicked outside
   */
  getClickedInventory(): BukkitInventory | null;

  /**
   * Gets the type of slot that was clicked.
   * 
   * @returns The slot type (CONTAINER, QUICKBAR, ARMOR, etc.)
   */
  getSlotType(): BukkitSlotType;

  /**
   * The slot number that was clicked, relative to the clicked inventory.
   * 
   * Note: Two different inventories may have the same slot number.
   * Use getRawSlot() for a unique identifier.
   * 
   * @returns The slot number within the inventory
   */
  getSlot(): number;

  /**
   * The raw slot number clicked, unique for the entire view.
   * 
   * Use this for InventoryView.getItem(rawSlot).
   * 
   * @returns The unique raw slot number
   */
  getRawSlot(): number;

  /**
   * Gets the ItemStack currently in the clicked slot.
   * 
   * @returns The item in the clicked slot, or null if empty
   */
  getCurrentItem(): BukkitItemStack | null;

  /**
   * Sets the ItemStack currently in the clicked slot.
   * 
   * @param stack The item to place in the clicked slot
   */
  setCurrentItem(stack: BukkitItemStack | null): void;

  /**
   * Gets the current ItemStack on the cursor.
   * 
   * @returns The cursor item, or null if empty
   */
  getCursor(): BukkitItemStack | null;

  /**
   * Sets the item on the cursor.
   * 
   * @deprecated This can create inconsistencies. 
   * Prefer cancelling the event and applying changes manually.
   * 
   * @param stack The new cursor item
   */
  setCursor(stack: BukkitItemStack | null): void;

  /**
   * Gets the ClickType for this event.
   * 
   * @returns The type of click (LEFT, RIGHT, SHIFT_LEFT, etc.)
   */
  getClick(): BukkitClickType;

  /**
   * Gets the InventoryAction that triggered this event.
   * 
   * This represents the expected outcome. Cannot be changed.
   * To modify behavior, cancel the event and apply changes manually.
   * 
   * @returns The inventory action
   */
  getAction(): BukkitInventoryAction;

  /**
   * If the ClickType is NUMBER_KEY, returns the pressed key index (0-8).
   * 
   * @returns The hotbar key (0-8), or -1 if not a NUMBER_KEY action
   */
  getHotbarButton(): number;

  /**
   * Check if this is a left click.
   * 
   * @returns true if left mouse button was used
   */
  isLeftClick(): boolean;

  /**
   * Check if this is a right click.
   * 
   * @returns true if right mouse button was used
   */
  isRightClick(): boolean;

  /**
   * Check if Shift or Ctrl was held during the click.
   * 
   * @returns true if shift-click or ctrl-click
   */
  isShiftClick(): boolean;

  /* Inherited from EventInventoryInteractEvent:
   * - getWhoClicked(): BukkitHumanEntity
   * - getResult(): BukkitEventResult
   * - setResult(newResult: BukkitEventResult): void
   */

  /* Inherited from EventInventoryEvent:
   * - getInventory(): BukkitInventory  (top inventory)
   * - getView(): BukkitInventoryView
   * - getViewers(): JavaList<BukkitHumanEntity>
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

export const InventoryClickEvent = org.bukkit.event.inventory.InventoryClickEvent;