/**
 * DESIGN
 * ------
 * InventoryView represents a player looking at an inventory GUI.
 * 
 * TWO-INVENTORY SYSTEM:
 * When you open a chest, you see TWO inventories:
 * 
 *   ┌─────────────────────────────────────┐
 *   │         TOP INVENTORY              │  ← Chest, furnace, etc.
 *   │  (the thing you're interacting with)│
 *   │                                     │
 *   │  [0] [1] [2] [3] [4] [5] [6] [7] [8]│
 *   │  [9] ...                            │
 *   ├─────────────────────────────────────┤
 *   │        BOTTOM INVENTORY             │  ← Your inventory
 *   │      (always player's inventory)    │
 *   │                                     │
 *   │  [27][28][29][30][31][32][33][34][35]│  Main
 *   │  [36][37][38][39][40][41][42][43][44]│
 *   │  [45][46][47][48][49][50][51][52][53]│
 *   │  ─────────────────────────────────  │
 *   │  [54][55][56][57][58][59][60][61][62]│  Hotbar
 *   └─────────────────────────────────────┘
 * 
 * RAW SLOTS vs LOCAL SLOTS:
 * - Raw slots: Continuous numbering across both inventories (0, 1, 2...)
 * - Local slots: Slot number within specific inventory
 * 
 * Use convertSlot() to convert raw → local.
 * 
 * OUTSIDE SLOT:
 * Special slot ID (-999) represents clicking outside the inventory window.
 * Used for dropping items on ground.
 * 
 * SPECIALIZED VIEWS:
 * InventoryView has subinterfaces for specific inventory types:
 * - AnvilView: Anvil with rename text
 * - BeaconView: Beacon with effects
 * - BrewingStandView: Brewing progress
 * - EnchantmentView: Enchanting options
 * - FurnaceView: Smelting progress
 * - LecternView: Book pages
 * - LoomView: Banner patterns
 * - MerchantView: Villager trades
 * - StonecutterView: Stonecutter recipes
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/InventoryView.html
 */

import { BukkitInventory, BukkitInventoryType } from "./inventory";
import { BukkitHumanEntity } from "../../entities/types/bukkitHumanEntity";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitSlotType } from "../enums/slotType";

// ============================================
// CONSTANTS
// ============================================

/**
 * Special slot ID for clicks outside the inventory window.
 * 
 * WHY -999:
 * Minecraft protocol uses this value to indicate "drop item".
 * When you click outside the window, items are dropped.
 */
export const OUTSIDE_SLOT = -999;

// ============================================
// INVENTORY VIEW PROPERTY (deprecated)
// ============================================

/**
 * Extra properties for inventory windows.
 * 
 * @deprecated Since 1.21, for removal. Use specialized InventoryView children.
 * 
 * WHY DEPRECATED:
 * This enum was a catch-all for various inventory-specific properties.
 * New API uses typed subinterfaces (FurnaceView, EnchantmentView, etc.)
 * with proper getter/setter methods instead of magic property IDs.
 */
export interface BukkitInventoryViewProperty {
  /**
   * Get enum constant name.
   */
  name(): string;

  /**
   * Get enum ordinal.
   */
  ordinal(): number;

  /**
   * Get inventory type this property applies to.
   * 
   * @deprecated For removal since 1.21.
   */
  getType(): BukkitInventoryType;

  /**
   * Get protocol ID.
   * 
   * @deprecated Since 1.6.2. Magic value.
   */
  getId(): number;
}

/**
 * All inventory view property names.
 */
export type InventoryViewPropertyKey =
  /* Brewing stand */
  | "BREW_TIME"
  | "FUEL_TIME"
  /* Furnace */
  | "BURN_TIME"
  | "TICKS_FOR_CURRENT_FUEL"
  | "COOK_TIME"
  | "TICKS_FOR_CURRENT_SMELTING"
  /* Enchanting table */
  | "ENCHANT_BUTTON1"
  | "ENCHANT_BUTTON2"
  | "ENCHANT_BUTTON3"
  | "ENCHANT_XP_SEED"
  | "ENCHANT_ID1"
  | "ENCHANT_ID2"
  | "ENCHANT_ID3"
  | "ENCHANT_LEVEL1"
  | "ENCHANT_LEVEL2"
  | "ENCHANT_LEVEL3"
  /* Beacon */
  | "LEVELS"
  | "PRIMARY_EFFECT"
  | "SECONDARY_EFFECT"
  /* Anvil */
  | "REPAIR_COST"
  /* Lectern */
  | "BOOK_PAGE";

/**
 * Inventory view properties enum.
 * 
 * @deprecated Since 1.21, for removal. Use InventoryView subinterfaces.
 */
export const InventoryViewProperty: Record<InventoryViewPropertyKey, BukkitInventoryViewProperty> = {
  /* ========== BREWING STAND ========== */
  
  /**
   * Brewing progress (down arrow).
   * 
   * @deprecated Use BrewingStandView.getBrewingTicks()
   */
  BREW_TIME: org.bukkit.inventory.InventoryView.Property.BREW_TIME,

  /**
   * Fuel progress (blaze powder bar).
   * 
   * Value 0-20. 0 = empty, 20 = full.
   * 
   * @deprecated Use BrewingStandView.getFuelLevel()
   */
  FUEL_TIME: org.bukkit.inventory.InventoryView.Property.FUEL_TIME,

  /* ========== FURNACE ========== */

  /**
   * Fire/flame progress.
   * 
   * @deprecated Use FurnaceView.getBurnTime()
   */
  BURN_TIME: org.bukkit.inventory.InventoryView.Property.BURN_TIME,

  /**
   * Total ticks current fuel should last.
   * 
   * @deprecated Use FurnaceView.getBurnDuration()
   */
  TICKS_FOR_CURRENT_FUEL: org.bukkit.inventory.InventoryView.Property.TICKS_FOR_CURRENT_FUEL,

  /**
   * Smelting progress (right arrow).
   * 
   * @deprecated Use FurnaceView.getCookTime()
   */
  COOK_TIME: org.bukkit.inventory.InventoryView.Property.COOK_TIME,

  /**
   * Total ticks current smelting should take.
   * 
   * @deprecated Use FurnaceView.getCookDuration()
   */
  TICKS_FOR_CURRENT_SMELTING: org.bukkit.inventory.InventoryView.Property.TICKS_FOR_CURRENT_SMELTING,

  /* ========== ENCHANTING TABLE ========== */

  /**
   * Top enchant button - required XP level.
   * 
   * @deprecated Use EnchantmentView.getCosts()
   */
  ENCHANT_BUTTON1: org.bukkit.inventory.InventoryView.Property.ENCHANT_BUTTON1,

  /**
   * Middle enchant button - required XP level.
   */
  ENCHANT_BUTTON2: org.bukkit.inventory.InventoryView.Property.ENCHANT_BUTTON2,

  /**
   * Bottom enchant button - required XP level.
   */
  ENCHANT_BUTTON3: org.bukkit.inventory.InventoryView.Property.ENCHANT_BUTTON3,

  /**
   * Player's XP seed (first 4 bits).
   * 
   * Determines which enchantments appear.
   */
  ENCHANT_XP_SEED: org.bukkit.inventory.InventoryView.Property.ENCHANT_XP_SEED,

  /**
   * Top enchant - enchantment ID.
   * 
   * @deprecated Use EnchantmentView.getEnchantmentHints()
   */
  ENCHANT_ID1: org.bukkit.inventory.InventoryView.Property.ENCHANT_ID1,

  /**
   * Middle enchant - enchantment ID.
   */
  ENCHANT_ID2: org.bukkit.inventory.InventoryView.Property.ENCHANT_ID2,

  /**
   * Bottom enchant - enchantment ID.
   */
  ENCHANT_ID3: org.bukkit.inventory.InventoryView.Property.ENCHANT_ID3,

  /**
   * Top enchant - enchantment level.
   * 
   * @deprecated Use EnchantmentView.getLevelHints()
   */
  ENCHANT_LEVEL1: org.bukkit.inventory.InventoryView.Property.ENCHANT_LEVEL1,

  /**
   * Middle enchant - enchantment level.
   */
  ENCHANT_LEVEL2: org.bukkit.inventory.InventoryView.Property.ENCHANT_LEVEL2,

  /**
   * Bottom enchant - enchantment level.
   */
  ENCHANT_LEVEL3: org.bukkit.inventory.InventoryView.Property.ENCHANT_LEVEL3,

  /* ========== BEACON ========== */

  /**
   * Beacon pyramid levels (0-4).
   * 
   * @deprecated Use BeaconView.getTier()
   */
  LEVELS: org.bukkit.inventory.InventoryView.Property.LEVELS,

  /**
   * Primary potion effect ID.
   * 
   * @deprecated Use BeaconView.getPrimaryEffect()
   */
  PRIMARY_EFFECT: org.bukkit.inventory.InventoryView.Property.PRIMARY_EFFECT,

  /**
   * Secondary potion effect ID.
   * 
   * @deprecated Use BeaconView.getSecondaryEffect()
   */
  SECONDARY_EFFECT: org.bukkit.inventory.InventoryView.Property.SECONDARY_EFFECT,

  /* ========== ANVIL ========== */

  /**
   * XP level cost for repair/rename.
   * 
   * @deprecated Use AnvilView.getRepairCost()
   */
  REPAIR_COST: org.bukkit.inventory.InventoryView.Property.REPAIR_COST,

  /* ========== LECTERN ========== */

  /**
   * Current book page number.
   * 
   * @deprecated Use LecternView.getPage()
   */
  BOOK_PAGE: org.bukkit.inventory.InventoryView.Property.BOOK_PAGE,
};

/**
 * Array of all properties for iteration.
 */
export const InventoryViewPropertyValues: BukkitInventoryViewProperty[] = [
  InventoryViewProperty.BREW_TIME,
  InventoryViewProperty.FUEL_TIME,
  InventoryViewProperty.BURN_TIME,
  InventoryViewProperty.TICKS_FOR_CURRENT_FUEL,
  InventoryViewProperty.COOK_TIME,
  InventoryViewProperty.TICKS_FOR_CURRENT_SMELTING,
  InventoryViewProperty.ENCHANT_BUTTON1,
  InventoryViewProperty.ENCHANT_BUTTON2,
  InventoryViewProperty.ENCHANT_BUTTON3,
  InventoryViewProperty.ENCHANT_XP_SEED,
  InventoryViewProperty.ENCHANT_ID1,
  InventoryViewProperty.ENCHANT_ID2,
  InventoryViewProperty.ENCHANT_ID3,
  InventoryViewProperty.ENCHANT_LEVEL1,
  InventoryViewProperty.ENCHANT_LEVEL2,
  InventoryViewProperty.ENCHANT_LEVEL3,
  InventoryViewProperty.LEVELS,
  InventoryViewProperty.PRIMARY_EFFECT,
  InventoryViewProperty.SECONDARY_EFFECT,
  InventoryViewProperty.REPAIR_COST,
  InventoryViewProperty.BOOK_PAGE,
];

// ============================================
// INVENTORY VIEW INTERFACE
// ============================================

export interface BukkitInventoryView {

  // ==========================================
  // INVENTORIES
  // ==========================================

  /**
   * Get upper/top inventory.
   * 
   * This is the "external" inventory:
   * - Chest contents
   * - Furnace slots
   * - Crafting grid
   * - etc.
   */
  getTopInventory(): BukkitInventory;

  /**
   * Get lower/bottom inventory.
   * 
   * This is always the player's inventory
   * (main inventory + hotbar).
   */
  getBottomInventory(): BukkitInventory;

  /**
   * Get inventory for a raw slot.
   * 
   * @param rawSlot Raw slot ID
   * @returns Top or bottom inventory, or null if OUTSIDE
   */
  getInventory(rawSlot: number): BukkitInventory | null;

  // ==========================================
  // PLAYER
  // ==========================================

  /**
   * Get the player viewing this inventory.
   */
  getPlayer(): BukkitHumanEntity;

  // ==========================================
  // TYPE
  // ==========================================

  /**
   * Get inventory type.
   * 
   * Determines the GUI layout/style.
   * Never returns PLAYER (that's implicit in bottom inventory).
   */
  getType(): BukkitInventoryType;

  // ==========================================
  // ITEMS
  // ==========================================

  /**
   * Get item at raw slot.
   * 
   * @param slot Raw slot ID (spans both inventories)
   * @returns Item at slot, or null if empty
   */
  getItem(slot: number): BukkitItemStack | null;

  /**
   * Set item at raw slot.
   * 
   * NOTE: Slot -999 (OUTSIDE) may drop item on ground,
   * but this behavior is not guaranteed.
   * 
   * @param slot Raw slot ID
   * @param item Item to set, or null to clear
   */
  setItem(slot: number, item: BukkitItemStack | null): void;

  // ==========================================
  // CURSOR (item being dragged)
  // ==========================================

  /**
   * Get item on player's cursor.
   * 
   * The "cursor" is the item you're dragging when you click and hold.
   * 
   * @returns Item being dragged, or null if none
   */
  getCursor(): BukkitItemStack | null;

  /**
   * Set item on player's cursor.
   * 
   * @param item Item to put on cursor, or null to clear
   */
  setCursor(item: BukkitItemStack | null): void;

  // ==========================================
  // SLOT CONVERSION
  // ==========================================

  /**
   * Convert raw slot to local slot.
   * 
   * RAW vs LOCAL SLOTS:
   * Raw slots are numbered continuously across both inventories.
   * Local slots are the index within a specific inventory.
   * 
   * @example
   * // If top inventory has 27 slots (chest):
   * // Raw slot 0 → Local slot 0 in top inventory
   * // Raw slot 27 → Local slot 0 in bottom inventory
   * 
   * const rawSlot = event.getRawSlot(); // 30
   * const localSlot = view.convertSlot(rawSlot); // 3
   * const inv = view.getInventory(rawSlot); // bottom inventory
   * const item = inv.getItem(localSlot); // Same as getItem(30)
   * 
   * @param rawSlot Raw slot ID
   * @returns Local slot ID for the appropriate inventory
   */
  convertSlot(rawSlot: number): number;

  /**
   * Get slot type by raw slot ID.
   * 
   * @param slot Raw slot ID
   * @returns Slot type (CONTAINER, QUICKBAR, ARMOR, etc.)
   */
  getSlotType(slot: number): BukkitSlotType;

  // ==========================================
  // SIZE
  // ==========================================

  /**
   * Count total slots in view.
   * 
   * NOTE: May be greater than top.size() + bottom.size()
   * if some slots are virtual/unused.
   */
  countSlots(): number;

  // ==========================================
  // PROPERTIES (deprecated)
  // ==========================================

  /**
   * Set inventory-specific property.
   * 
   * @deprecated Since 1.21, for removal. Use typed view subinterfaces.
   * 
   * Used for progress bars, effects, etc.
   * 
   * @param prop Property to set
   * @param value New value
   * @returns true if property was set
   */
  setProperty(prop: BukkitInventoryViewProperty, value: number): boolean;

  // ==========================================
  // TITLE
  // ==========================================

  /**
   * Get inventory title.
   * 
   * Shown at top of GUI window.
   */
  getTitle(): string;

  /**
   * Get original title (before any setTitle calls).
   */
  getOriginalTitle(): string;

  /**
   * Set inventory title.
   * 
   * NOTE: Only works for inventories that support dynamic titles.
   * Will throw if inventory doesn't support title changes.
   * 
   * @param title New title
   */
  setTitle(title: string): void;

  // ==========================================
  // CLOSE
  // ==========================================

  /**
   * Close this inventory view.
   * 
   * Player's inventory screen will close.
   */
  close(): void;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if raw slot is in top inventory.
 * 
 * @example
 * if (isInTopInventory(view, event.getRawSlot())) {
 *   // Clicked the chest, not player inventory
 * }
 */
export function isInTopInventory(view: BukkitInventoryView, rawSlot: number): boolean {
  if (rawSlot === OUTSIDE_SLOT || rawSlot < 0) {
    return false;
  }
  return rawSlot < view.getTopInventory().getSize();
}

/**
 * Check if raw slot is in bottom inventory.
 */
export function isInBottomInventory(view: BukkitInventoryView, rawSlot: number): boolean {
  if (rawSlot === OUTSIDE_SLOT || rawSlot < 0) {
    return false;
  }
  return rawSlot >= view.getTopInventory().getSize();
}

/**
 * Check if raw slot is outside the window.
 */
export function isOutsideWindow(rawSlot: number): boolean {
  return rawSlot === OUTSIDE_SLOT;
}

/**
 * Get the inventory containing a raw slot.
 * 
 * @returns "top", "bottom", or "outside"
 */
export function getSlotInventory(view: BukkitInventoryView, rawSlot: number): "top" | "bottom" | "outside" {
  if (rawSlot === OUTSIDE_SLOT || rawSlot < 0) {
    return "outside";
  }
  return rawSlot < view.getTopInventory().getSize() ? "top" : "bottom";
}

/**
 * Check if player has item on cursor.
 */
export function hasCursor(view: BukkitInventoryView): boolean {
  const cursor = view.getCursor();
  if (cursor === null) return false;
  return cursor.getType().name() !== "AIR";
}

/**
 * Clear item on cursor (drop or return to inventory).
 */
export function clearCursor(view: BukkitInventoryView): void {
  view.setCursor(null);
}

/**
 * Get all items in top inventory.
 */
export function getTopItems(view: BukkitInventoryView): (BukkitItemStack | null)[] {
  return view.getTopInventory().getContents();
}

/**
 * Get all items in bottom inventory.
 */
export function getBottomItems(view: BukkitInventoryView): (BukkitItemStack | null)[] {
  return view.getBottomInventory().getContents();
}

/**
 * Count non-empty slots in top inventory.
 */
export function countTopItems(view: BukkitInventoryView): number {
  let count = 0;
  const contents = view.getTopInventory().getContents();
  
  for (const item of contents) {
    if (item !== null && item.getType().name() !== "AIR") {
      count++;
    }
  }
  
  return count;
}

/**
 * Check if top inventory is empty.
 */
export function isTopEmpty(view: BukkitInventoryView): boolean {
  return view.getTopInventory().isEmpty();
}

/**
 * Check if top inventory is full.
 */
export function isTopFull(view: BukkitInventoryView): boolean {
  return view.getTopInventory().firstEmpty() === -1;
}

/**
 * Get inventory type name as string.
 */
export function getViewTypeName(view: BukkitInventoryView): string {
  return view.getType().name();
}

/**
 * Check if view is of specific inventory type.
 * 
 * @example
 * if (isViewType(view, "CHEST")) {
 *   // Handle chest
 * }
 */
export function isViewType(view: BukkitInventoryView, typeName: string): boolean {
  return view.getType().name() === typeName;
}

/**
 * Check if view is a crafting-type inventory.
 */
export function isCraftingView(view: BukkitInventoryView): boolean {
  const type = view.getType().name();
  return type === "CRAFTING" || type === "WORKBENCH";
}

/**
 * Check if view is a furnace-type inventory.
 */
export function isFurnaceView(view: BukkitInventoryView): boolean {
  const type = view.getType().name();
  return type === "FURNACE" || type === "BLAST_FURNACE" || type === "SMOKER";
}

/**
 * Check if view is a storage inventory (chest, barrel, shulker, etc).
 */
export function isStorageView(view: BukkitInventoryView): boolean {
  const type = view.getType().name();
  return type === "CHEST" || 
         type === "ENDER_CHEST" || 
         type === "BARREL" || 
         type === "SHULKER_BOX" ||
         type === "HOPPER" ||
         type === "DROPPER" ||
         type === "DISPENSER";
}

/**
 * Safely close view with delay (useful in event handlers).
 * 
 * WHY DELAY:
 * Closing inventory in same tick as click event can cause issues.
 * Scheduling for next tick is safer.
 * 
 * @param view View to close
 * @param server Server for scheduling
 * @param plugin Plugin for scheduling
 */
export function closeViewLater(
  view: BukkitInventoryView,
  server: { getScheduler(): any },
  plugin: any
): void {
  server.getScheduler().runTask(plugin, () => {
    view.close();
  });
}

/**
 * Transfer item from cursor to slot.
 * 
 * @returns Previous item at slot (or null)
 */
export function cursorToSlot(view: BukkitInventoryView, slot: number): BukkitItemStack | null {
  const cursor = view.getCursor();
  const previous = view.getItem(slot);
  
  view.setItem(slot, cursor);
  view.setCursor(null);
  
  return previous;
}

/**
 * Transfer item from slot to cursor.
 * 
 * @returns true if item was picked up
 */
export function slotToCursor(view: BukkitInventoryView, slot: number): boolean {
  const item = view.getItem(slot);
  
  if (item === null || item.getType().name() === "AIR") {
    return false;
  }
  
  view.setCursor(item);
  view.setItem(slot, null);
  
  return true;
}

/**
 * Swap cursor with slot.
 */
export function swapCursorAndSlot(view: BukkitInventoryView, slot: number): void {
  const cursor = view.getCursor();
  const slotItem = view.getItem(slot);
  
  view.setCursor(slotItem);
  view.setItem(slot, cursor);
}

/**
 * Find first slot in top inventory containing specific material.
 * 
 * @param materialName Material name to find
 * @returns Raw slot ID, or -1 if not found
 */
export function findInTop(view: BukkitInventoryView, materialName: string): number {
  const top = view.getTopInventory();
  const size = top.getSize();
  
  for (let i = 0; i < size; i++) {
    const item = top.getItem(i);
    if (item !== null && item.getType().name() === materialName) {
      return i; // Raw slot = local slot for top inventory
    }
  }
  
  return -1;
}

/**
 * Find first empty slot in top inventory.
 * 
 * @returns Raw slot ID, or -1 if full
 */
export function findEmptyInTop(view: BukkitInventoryView): number {
  const localSlot = view.getTopInventory().firstEmpty();
  return localSlot; // Raw slot = local slot for top inventory
}

/**
 * Find first empty slot in bottom inventory.
 * 
 * @returns Raw slot ID, or -1 if full
 */
export function findEmptyInBottom(view: BukkitInventoryView): number {
  const localSlot = view.getBottomInventory().firstEmpty();
  if (localSlot === -1) return -1;
  
  // Convert local to raw by adding top inventory size
  return view.getTopInventory().getSize() + localSlot;
}