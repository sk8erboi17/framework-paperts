/**
 * Represents an object that can hold an inventory.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/InventoryHolder.html
 */

import { BukkitInventory } from "./inventory";


// ============================================
// INTERFACE
// ============================================

export interface BukkitInventoryHolder {
  /**
   * Get this object's inventory.
   */
  getInventory(): BukkitInventory;
}