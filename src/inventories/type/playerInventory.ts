/**
 * DESIGN
 * ------
 * PlayerInventory extends Inventory with player-specific slots.
 * 
 * SLOT LAYOUT (41 slots total):
 * 
 *   ┌─────────────────────────────────────┐
 *   │  ARMOR SLOTS (36-39)                │
 *   │  39: Helmet                         │
 *   │  38: Chestplate                     │
 *   │  37: Leggings                       │
 *   │  36: Boots                          │
 *   ├─────────────────────────────────────┤
 *   │  MAIN INVENTORY (9-35)              │
 *   │  Reads like a book: left→right,     │
 *   │  top→bottom                         │
 *   │                                     │
 *   │  9  10 11 12 13 14 15 16 17         │
 *   │  18 19 20 21 22 23 24 25 26         │
 *   │  27 28 29 30 31 32 33 34 35         │
 *   ├─────────────────────────────────────┤
 *   │  HOTBAR (0-8)                       │
 *   │  0  1  2  3  4  5  6  7  8          │
 *   ├─────────────────────────────────────┤
 *   │  OFF HAND (40)                      │
 *   │  Shield slot, left of hotbar in GUI │
 *   └─────────────────────────────────────┘
 * 
 * WHY SEPARATE METHODS FOR ARMOR:
 * You CAN use setItem(36, boots) but setBoots(boots) is clearer.
 * Also, armor methods don't validate item type — you can put
 * a diamond block in the helmet slot if you want.
 * 
 * HELD ITEM vs MAIN HAND:
 * - getItemInMainHand(): Returns item in main hand (copy!)
 * - getHeldItemSlot(): Returns SLOT NUMBER (0-8) of selected hotbar slot
 * 
 * IMPORTANT - COPIES:
 * getItemInMainHand() and getItemInOffHand() return COPIES.
 * Modifying the returned ItemStack does NOT modify inventory.
 * You must call setItemInMainHand() to apply changes.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/PlayerInventory.html
 */

import { BukkitInventory } from "./inventory";
import { BukkitHumanEntity } from "../../entities/types/bukkitHumanEntity";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitEquipmentSlot } from "../../entities/types/entityEquipments";

// ============================================
// SLOT CONSTANTS
// ============================================

/**
 * Named constants for PlayerInventory slots.
 * 
 * WHY: Magic numbers like setItem(39, item) are confusing.
 * Use setItem(PlayerSlot.HELMET, item) instead.
 */
export const PlayerSlot = {
  /* Hotbar */
  HOTBAR_0: 0,
  HOTBAR_1: 1,
  HOTBAR_2: 2,
  HOTBAR_3: 3,
  HOTBAR_4: 4,
  HOTBAR_5: 5,
  HOTBAR_6: 6,
  HOTBAR_7: 7,
  HOTBAR_8: 8,
  
  /* Armor */
  BOOTS: 36,
  LEGGINGS: 37,
  CHESTPLATE: 38,
  HELMET: 39,
  
  /* Off hand */
  OFF_HAND: 40,
  
  /* Ranges (for iteration) */
  HOTBAR_START: 0,
  HOTBAR_END: 8,
  MAIN_START: 9,
  MAIN_END: 35,
  ARMOR_START: 36,
  ARMOR_END: 39,
} as const;

// ============================================
// INTERFACE
// ============================================

export interface BukkitPlayerInventory extends BukkitInventory {

  // ==========================================
  // ITEM ACCESS (overloads from parent)
  // ==========================================

  /*
   * WHY RE-DECLARE:
   * TypeScript requires all overloads to be declared together.
   * PlayerInventory adds EquipmentSlot overloads to the base
   * number-indexed methods.
   */

  /**
   * Get item at slot index.
   * 
   * @param index Slot number 0-40
   */
  getItem(index: number): BukkitItemStack | null;

  /**
   * Get item at equipment slot.
   * 
   * @param slot HAND, OFF_HAND, HEAD, CHEST, LEGS, or FEET
   */
  getItem(slot: BukkitEquipmentSlot): BukkitItemStack | null;

  /**
   * Set item at slot index.
   * 
   * SLOT INDICES:
   * - 0-8: Hotbar
   * - 9-35: Main inventory (reads like a book)
   * - 36: Boots
   * - 37: Leggings
   * - 38: Chestplate
   * - 39: Helmet
   * - 40: Off hand
   * 
   * @throws ArrayIndexOutOfBoundsException if index < 0 or > 40
   */
  setItem(index: number, item: BukkitItemStack | null): void;

  /**
   * Set item at equipment slot.
   * 
   * @param slot Equipment slot
   * @param item Item to place, or null to clear
   */
  setItem(slot: BukkitEquipmentSlot, item: BukkitItemStack | null): void;

  // ==========================================
  // ARMOR SLOTS
  // ==========================================

  /**
   * Get all armor as array.
   * 
   * ORDER: [boots, leggings, chestplate, helmet] (indices 0-3)
   * Individual items can be null.
   * 
   * WHY BOTTOM-UP ORDER:
   * Matches slot indices: boots=36, leggings=37, chest=38, helmet=39
   */
  getArmorContents(): (BukkitItemStack | null)[];

  /**
   * Set all armor at once.
   * 
   * @param items Array of [boots, leggings, chestplate, helmet]
   *              Can be shorter — missing slots won't be changed
   *              Individual items can be null to clear slot
   */
  setArmorContents(items: (BukkitItemStack | null)[]): void;

  /**
   * Get helmet (slot 39).
   * 
   * @returns ItemStack or null if empty
   */
  getHelmet(): BukkitItemStack | null;

  /**
   * Set helmet.
   * 
   * NOTE: Does NOT validate item type!
   * You can put any item in helmet slot.
   */
  setHelmet(helmet: BukkitItemStack | null): void;

  /**
   * Get chestplate (slot 38).
   */
  getChestplate(): BukkitItemStack | null;

  /**
   * Set chestplate.
   * 
   * NOTE: Does NOT validate item type!
   */
  setChestplate(chestplate: BukkitItemStack | null): void;

  /**
   * Get leggings (slot 37).
   */
  getLeggings(): BukkitItemStack | null;

  /**
   * Set leggings.
   * 
   * NOTE: Does NOT validate item type!
   */
  setLeggings(leggings: BukkitItemStack | null): void;

  /**
   * Get boots (slot 36).
   */
  getBoots(): BukkitItemStack | null;

  /**
   * Set boots.
   * 
   * NOTE: Does NOT validate item type!
   */
  setBoots(boots: BukkitItemStack | null): void;

  // ==========================================
  // EXTRA CONTENTS
  // ==========================================

  /**
   * Get additional slots beyond storage and armor.
   * 
   * Currently this is just the off-hand slot.
   * Future Minecraft versions might add more.
   * 
   * WHY SEPARATE FROM STORAGE:
   * getStorageContents() returns main 36 slots.
   * getArmorContents() returns armor 4 slots.
   * getExtraContents() returns everything else.
   */
  getExtraContents(): (BukkitItemStack | null)[];

  /**
   * Set extra slot contents.
   */
  setExtraContents(items: (BukkitItemStack | null)[]): void;

  // ==========================================
  // HELD ITEMS (Hands)
  // ==========================================

  /**
   * Get item in main hand (right hand for most players).
   * 
   * IMPORTANT: Returns a COPY!
   * Modifying it does NOT modify the actual inventory.
   * 
   * @example
   * // WRONG - doesn't work!
   * player.getInventory().getItemInMainHand().setAmount(5);
   * 
   * // RIGHT - get, modify, set back
   * const item = player.getInventory().getItemInMainHand();
   * item.setAmount(5);
   * player.getInventory().setItemInMainHand(item);
   * 
   * NOTE: Unlike armor getters, this is @NotNull in Bukkit.
   * Returns air ItemStack if hand is empty, not null.
   */
  getItemInMainHand(): BukkitItemStack;

  /**
   * Set item in main hand.
   * 
   * Pass null to clear (make hand empty).
   */
  setItemInMainHand(item: BukkitItemStack | null): void;

  /**
   * Get item in off hand (left hand, shield slot).
   * 
   * IMPORTANT: Returns a COPY! (same as main hand)
   * 
   * NOTE: @NotNull - returns air if empty, not null.
   */
  getItemInOffHand(): BukkitItemStack;

  /**
   * Set item in off hand.
   */
  setItemInOffHand(item: BukkitItemStack | null): void;

  /**
   * Get item in main hand.
   * 
   * @deprecated Since 1.9 (combat update). Players can dual wield now.
   *             Use getItemInMainHand() or getItemInOffHand() instead.
   */
  getItemInHand(): BukkitItemStack;

  /**
   * Set item in main hand.
   * 
   * @deprecated Since 1.9. Use setItemInMainHand() instead.
   */
  setItemInHand(item: BukkitItemStack | null): void;

  // ==========================================
  // HOTBAR SELECTION
  // ==========================================

  /**
   * Get currently selected hotbar slot (0-8).
   * 
   * WHY THIS vs getItemInMainHand():
   * - getHeldItemSlot(): Returns SLOT NUMBER (0-8)
   * - getItemInMainHand(): Returns the ITEM in that slot
   * 
   * @example
   * const slot = inventory.getHeldItemSlot(); // e.g., 3
   * const item = inventory.getItem(slot);     // Same as getItemInMainHand()
   */
  getHeldItemSlot(): number;

  /**
   * Set which hotbar slot is selected.
   * 
   * This changes which item the player is "holding" without
   * moving any items around.
   * 
   * @param slot Slot number 0-8
   * @throws IllegalArgumentException if slot not in range 0-8
   * 
   * @example
   * // Force player to select slot 0 (leftmost hotbar)
   * inventory.setHeldItemSlot(0);
   */
  setHeldItemSlot(slot: number): void;

  // ==========================================
  // HOLDER (override for stricter type)
  // ==========================================

  /**
   * Get the player who owns this inventory.
   * 
   * WHY OVERRIDE:
   * Base Inventory.getHolder() returns InventoryHolder | null.
   * PlayerInventory always belongs to a HumanEntity (Player).
   * 
   * NOTE: Can still be null in edge cases (disconnected player).
   */
  getHolder(): BukkitHumanEntity | null;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if item is air or null.
 * 
 * WHY HELPER:
 * getItemInMainHand() returns air instead of null when empty.
 * Regular getItem() returns null. This handles both.
 */
function isAirOrNull(item: BukkitItemStack | null): boolean {
  if (item === null) return true;
  
  const typeName = item.getType().name();
  return typeName === "AIR" || typeName === "CAVE_AIR" || typeName === "VOID_AIR";
}

/**
 * Check if player's main hand is empty.
 */
export function isMainHandEmpty(inventory: BukkitPlayerInventory): boolean {
  return isAirOrNull(inventory.getItemInMainHand());
}

/**
 * Check if player's off hand is empty.
 */
export function isOffHandEmpty(inventory: BukkitPlayerInventory): boolean {
  return isAirOrNull(inventory.getItemInOffHand());
}

/**
 * Check if all armor slots are empty.
 */
export function hasNoArmor(inventory: BukkitPlayerInventory): boolean {
  return isAirOrNull(inventory.getHelmet())
      && isAirOrNull(inventory.getChestplate())
      && isAirOrNull(inventory.getLeggings())
      && isAirOrNull(inventory.getBoots());
}

/**
 * Check if all armor slots are filled.
 */
export function hasFullArmor(inventory: BukkitPlayerInventory): boolean {
  return !isAirOrNull(inventory.getHelmet())
      && !isAirOrNull(inventory.getChestplate())
      && !isAirOrNull(inventory.getLeggings())
      && !isAirOrNull(inventory.getBoots());
}

/**
 * Count equipped armor pieces.
 * 
 * @returns Number 0-4
 */
export function countArmorPieces(inventory: BukkitPlayerInventory): number {
  let count = 0;
  
  if (!isAirOrNull(inventory.getHelmet())) count++;
  if (!isAirOrNull(inventory.getChestplate())) count++;
  if (!isAirOrNull(inventory.getLeggings())) count++;
  if (!isAirOrNull(inventory.getBoots())) count++;
  
  return count;
}

/**
 * Get all non-null armor pieces.
 */
export function getEquippedArmor(inventory: BukkitPlayerInventory): BukkitItemStack[] {
  const armor: BukkitItemStack[] = [];
  
  const helmet = inventory.getHelmet();
  const chest = inventory.getChestplate();
  const legs = inventory.getLeggings();
  const boots = inventory.getBoots();
  
  if (!isAirOrNull(helmet)) armor.push(helmet!);
  if (!isAirOrNull(chest)) armor.push(chest!);
  if (!isAirOrNull(legs)) armor.push(legs!);
  if (!isAirOrNull(boots)) armor.push(boots!);
  
  return armor;
}

/**
 * Clear all armor slots.
 */
export function clearArmor(inventory: BukkitPlayerInventory): void {
  inventory.setHelmet(null);
  inventory.setChestplate(null);
  inventory.setLeggings(null);
  inventory.setBoots(null);
}

/**
 * Get hotbar items (slots 0-8).
 */
export function getHotbar(inventory: BukkitPlayerInventory): (BukkitItemStack | null)[] {
  const hotbar: (BukkitItemStack | null)[] = [];
  
  for (let i = PlayerSlot.HOTBAR_START; i <= PlayerSlot.HOTBAR_END; i++) {
    hotbar.push(inventory.getItem(i));
  }
  
  return hotbar;
}

/**
 * Count empty slots in main inventory (excludes armor/offhand).
 */
export function countEmptySlots(inventory: BukkitPlayerInventory): number {
  let count = 0;
  const storage = inventory.getStorageContents();
  
  for (const item of storage) {
    if (isAirOrNull(item)) {
      count++;
    }
  }
  
  return count;
}

/**
 * Count occupied slots in main inventory (excludes armor/offhand).
 */
export function countOccupiedSlots(inventory: BukkitPlayerInventory): number {
  const storage = inventory.getStorageContents();
  return storage.length - countEmptySlots(inventory);
}

/**
 * Check if inventory has room for more items.
 */
export function hasSpace(inventory: BukkitPlayerInventory): boolean {
  return inventory.firstEmpty() !== -1;
}

/**
 * Check if inventory is completely full (no empty slots).
 */
export function isFull(inventory: BukkitPlayerInventory): boolean {
  return inventory.firstEmpty() === -1;
}

/**
 * Swap main hand and off hand items.
 */
export function swapHands(inventory: BukkitPlayerInventory): void {
  const mainHand = inventory.getItemInMainHand();
  const offHand = inventory.getItemInOffHand();
  
  inventory.setItemInMainHand(offHand);
  inventory.setItemInOffHand(mainHand);
}

/**
 * Move item from main hand to first available slot.
 * 
 * @returns true if item was moved, false if no space
 */
export function storeMainHandItem(inventory: BukkitPlayerInventory): boolean {
  if (isMainHandEmpty(inventory)) {
    return true; // Nothing to store
  }
  
  const emptySlot = inventory.firstEmpty();
  if (emptySlot === -1) {
    return false; // No space
  }
  
  inventory.setItem(emptySlot, inventory.getItemInMainHand());
  inventory.setItemInMainHand(null);
  return true;
}

/**
 * Get items from specific slot range.
 * 
 * @example
 * // Get all main inventory items (excluding hotbar)
 * const mainItems = getSlotRange(inventory, PlayerSlot.MAIN_START, PlayerSlot.MAIN_END);
 */
export function getSlotRange(
  inventory: BukkitPlayerInventory,
  startSlot: number,
  endSlot: number
): (BukkitItemStack | null)[] {
  const items: (BukkitItemStack | null)[] = [];
  
  for (let i = startSlot; i <= endSlot; i++) {
    items.push(inventory.getItem(i));
  }
  
  return items;
}

/**
 * Clear specific slot range.
 * 
 * @example
 * // Clear entire hotbar
 * clearSlotRange(inventory, PlayerSlot.HOTBAR_START, PlayerSlot.HOTBAR_END);
 */
export function clearSlotRange(
  inventory: BukkitPlayerInventory,
  startSlot: number,
  endSlot: number
): void {
  for (let i = startSlot; i <= endSlot; i++) {
    inventory.setItem(i, null);
  }
}