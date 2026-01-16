// events/inventory/InventoryEvent.ts

import { BukkitHumanEntity } from "../../../entities/types/bukkitHumanEntity";
import { BukkitInventory } from "../../../inventories/type/inventory";
import { BukkitInventoryView } from "../../../inventories/type/inventoryViews";
import { JavaList } from "../../../java/types/list";


/**
 * InventoryEvent
 * 
 * Base class for all inventory-related events.
 * 
 * HIERARCHY:
 * Event
 * └── InventoryEvent (this)
 *     ├── InventoryOpenEvent
 *     ├── InventoryCloseEvent
 *     ├── InventoryInteractEvent
 *     │   ├── InventoryClickEvent
 *     │   └── InventoryDragEvent
 *     ├── EnchantItemEvent
 *     ├── PrepareItemCraftEvent
 *     ├── PrepareItemEnchantEvent
 *     └── PrepareInventoryResultEvent
 * 
 * INVENTORY CONCEPTS:
 * - InventoryView: The "window" showing top and bottom inventories
 * - Top Inventory: The container (chest, furnace, etc.)
 * - Bottom Inventory: Usually the player's inventory
 * - getInventory(): Returns the TOP (primary) inventory
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/InventoryEvent.html
 */
export interface EventInventoryEvent {
  /**
   * Gets the primary Inventory involved in this transaction.
   * 
   * This is the TOP (upper) inventory, e.g., the chest contents,
   * not the player's inventory.
   * 
   * @returns The upper inventory
   */
  getInventory(): BukkitInventory;

  /**
   * Gets the view object itself.
   * 
   * The InventoryView represents the entire GUI window,
   * including both top and bottom inventories.
   * 
   * @returns The InventoryView
   */
  getView(): BukkitInventoryView;

  /**
   * Gets the list of players viewing the primary (upper) inventory.
   * 
   * @returns List of HumanEntity viewing the inventory
   */
  getViewers(): JavaList<BukkitHumanEntity>;
}

// Export della classe Java
export const InventoryEvent = org.bukkit.event.inventory.InventoryEvent;