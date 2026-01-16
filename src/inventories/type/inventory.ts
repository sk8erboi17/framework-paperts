/**
 * DESIGN
 * ------
 * Inventory is Bukkit's interface to all storage containers.
 * 
 * It extends JavaIterable<ItemStack>, meaning you can iterate over slots.
 * However, iteration behavior has important nuances:
 * 
 * - iterator() iterates over ALL slots (including armor, offhand, result slots)
 * - add/contains/remove operate only on STORAGE slots (getStorageContents)
 * 
 * This distinction matters for PlayerInventory:
 *   - getContents(): 41 slots (main + armor + offhand)
 *   - getStorageContents(): 36 slots (main inventory only)
 *   - addItem() won't put items in armor slots
 * 
 * SLOT INDICES:
 * Slot indices vary by inventory type. For PlayerInventory:
 *   0-8:   Hotbar
 *   9-35:  Main inventory
 *   36-39: Armor (boots, leggings, chestplate, helmet)
 *   40:    Offhand
 * 
 * NULL HANDLING:
 * Empty slots contain null, NOT air. This is a Bukkit convention.
 * Behavior with Material.AIR is unspecified and should be avoided.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/Inventory.html
 */

import { JavaIterable } from "../../java/types/iterable";
import { JavaListIterator } from "../../java/types/iterator";
import { BukkitHumanEntity } from "../../entities/types/bukkitHumanEntity";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitMaterial } from "../../items/enums/materialType";
import { BukkitInventoryHolder } from "./inventoryHolder";
import { BukkitLocation } from "../../world/types/location";

// ============================================
// INVENTORY TYPE INTERFACE
// ============================================

/**
 * Represents a Java InventoryType enum instance.
 * 
 * WHY INTERFACE:
 * Java enums have methods. This interface exposes them
 * so TypeScript knows what you can do with the value.
 */
export interface BukkitInventoryType {
  /**
   * Default slot count for this inventory type.
   * 
   * NOTE: Some types have variable sizes.
   * CHEST returns 27, but double chests have 54.
   */
  getDefaultSize(): number;

  /**
   * Default GUI title.
   * 
   * @deprecated Use Component-based titles instead.
   */
  getDefaultTitle(): string;

  /**
   * Whether you can create this inventory type programmatically.
   * 
   * WHY SOME ARE FALSE:
   * CRAFTING (player's 2x2) and CREATIVE are internal.
   * You can't do Bukkit.createInventory() with them.
   */
  isCreatable(): boolean;

  /**
   * Enum constant name (e.g., "CHEST", "FURNACE").
   */
  name(): string;

  /**
   * Enum ordinal (position in declaration).
   */
  ordinal(): number;
}

// ============================================
// INVENTORY TYPE KEY
// ============================================

/**
 * String literal union of all inventory type names.
 * 
 * WHY:
 * Enables TypeScript autocomplete when you type:
 *   if (inv.getType().name() === "CH...) // autocomplete shows CHEST
 */
export type InventoryTypeKey =
  // Storage
  | "CHEST" | "ENDER_CHEST" | "BARREL" | "SHULKER_BOX"
  // Redstone
  | "DISPENSER" | "DROPPER" | "HOPPER" | "CRAFTER"
  // Furnaces
  | "FURNACE" | "BLAST_FURNACE" | "SMOKER"
  // Crafting
  | "WORKBENCH" | "CRAFTING" | "ANVIL" | "SMITHING"
  | "GRINDSTONE" | "STONECUTTER" | "LOOM" | "CARTOGRAPHY"
  // Magic
  | "ENCHANTING" | "BREWING" | "BEACON"
  // Entity/Player
  | "PLAYER" | "CREATIVE" | "MERCHANT"
  // Single-slot
  | "LECTERN" | "JUKEBOX" | "DECORATED_POT"
  // Special
  | "CHISELED_BOOKSHELF" | "COMPOSTER";

// ============================================
// INVENTORY TYPE ENUM
// ============================================

/**
 * All inventory types mapped from Java.
 * 
 * WHY Record<Key, Interface>:
 * - Key gives autocomplete for property access: InventoryType.CHEST
 * - Interface tells TypeScript what methods are available
 */
export const InventoryType: Record<InventoryTypeKey, BukkitInventoryType> = {
  
  // ---- Storage (27-54 slots) ----
  
  /** Single: 27 slots. Double: 54 slots. */
  CHEST: org.bukkit.event.inventory.InventoryType.CHEST,
  
  /** Per-player cross-dimensional. 27 slots. */
  ENDER_CHEST: org.bukkit.event.inventory.InventoryType.ENDER_CHEST,
  
  /** Alternative to chest. 27 slots. */
  BARREL: org.bukkit.event.inventory.InventoryType.BARREL,
  
  /** Portable, keeps contents when mined. 27 slots. */
  SHULKER_BOX: org.bukkit.event.inventory.InventoryType.SHULKER_BOX,

  // ---- Redstone (5-9 slots) ----
  
  /** Shoots items/projectiles. 9 slots (3x3). */
  DISPENSER: org.bukkit.event.inventory.InventoryType.DISPENSER,
  
  /** Drops items (doesn't shoot). 9 slots (3x3). */
  DROPPER: org.bukkit.event.inventory.InventoryType.DROPPER,
  
  /** Auto-transfers items. 5 slots horizontal. */
  HOPPER: org.bukkit.event.inventory.InventoryType.HOPPER,
  
  /** Automated crafting. 9 slots (3x3). */
  CRAFTER: org.bukkit.event.inventory.InventoryType.CRAFTER,

  // ---- Furnaces (3 slots: input + fuel + output) ----
  
  /** Smelts ores, cooks food. */
  FURNACE: org.bukkit.event.inventory.InventoryType.FURNACE,
  
  /** 2x faster for ores. */
  BLAST_FURNACE: org.bukkit.event.inventory.InventoryType.BLAST_FURNACE,
  
  /** 2x faster for food. */
  SMOKER: org.bukkit.event.inventory.InventoryType.SMOKER,

  // ---- Crafting Stations ----
  
  /** 3x3 grid + output. 10 slots. */
  WORKBENCH: org.bukkit.event.inventory.InventoryType.WORKBENCH,
  
  /** Player's 2x2 grid. 5 slots. NOT creatable. */
  CRAFTING: org.bukkit.event.inventory.InventoryType.CRAFTING,
  
  /** Repair/rename items. 3 slots. */
  ANVIL: org.bukkit.event.inventory.InventoryType.ANVIL,
  
  /** Upgrade to netherite. 4 slots. */
  SMITHING: org.bukkit.event.inventory.InventoryType.SMITHING,
  
  /** Remove enchants, repair. 3 slots. */
  GRINDSTONE: org.bukkit.event.inventory.InventoryType.GRINDSTONE,
  
  /** Cut stone variants. 2 slots. */
  STONECUTTER: org.bukkit.event.inventory.InventoryType.STONECUTTER,
  
  /** Create banners. 4 slots. */
  LOOM: org.bukkit.event.inventory.InventoryType.LOOM,
  
  /** Create/copy maps. 3 slots. */
  CARTOGRAPHY: org.bukkit.event.inventory.InventoryType.CARTOGRAPHY,

  // ---- Magic & Brewing ----
  
  /** Enchant items. 2 slots (item + lapis). */
  ENCHANTING: org.bukkit.event.inventory.InventoryType.ENCHANTING,
  
  /** Brew potions. 5 slots. */
  BREWING: org.bukkit.event.inventory.InventoryType.BREWING,
  
  /** Activate effects. 1 slot (payment). */
  BEACON: org.bukkit.event.inventory.InventoryType.BEACON,

  // ---- Entity/Player ----
  
  /** 
   * Full player inventory. 41 slots.
   * 0-8: hotbar, 9-35: main, 36-39: armor, 40: offhand.
   */
  PLAYER: org.bukkit.event.inventory.InventoryType.PLAYER,
  
  /** Creative mode selection. NOT creatable. */
  CREATIVE: org.bukkit.event.inventory.InventoryType.CREATIVE,
  
  /** Villager trading. 3 slots. */
  MERCHANT: org.bukkit.event.inventory.InventoryType.MERCHANT,

  // ---- Single-Slot ----
  
  /** Hold book for reading. 1 slot. */
  LECTERN: org.bukkit.event.inventory.InventoryType.LECTERN,
  
  /** Play music discs. 1 slot. */
  JUKEBOX: org.bukkit.event.inventory.InventoryType.JUKEBOX,
  
  /** Store items decoratively. 1 slot. */
  DECORATED_POT: org.bukkit.event.inventory.InventoryType.DECORATED_POT,

  // ---- Special ----
  
  /** Store 6 books. */
  CHISELED_BOOKSHELF: org.bukkit.event.inventory.InventoryType.CHISELED_BOOKSHELF,
  
  /** Not a real inventory. Converts to bone meal. */
  COMPOSTER: org.bukkit.event.inventory.InventoryType.COMPOSTER,
};

// ============================================
// INVENTORY INTERFACE
// ============================================

export interface BukkitInventory extends JavaIterable<BukkitItemStack> {

  // ==========================================
  // SIZE & TYPE
  // ==========================================

  /**
   * Total number of slots in this inventory.
   * 
   * COMMON SIZES:
   * - Chest: 27 (single) or 54 (double)
   * - Player: 41 (36 storage + 4 armor + 1 offhand)
   * - Furnace: 3 (input + fuel + output)
   * - Hopper: 5
   * - Dispenser/Dropper: 9
   */
  getSize(): number;

  /**
   * Maximum items per stack in this inventory.
   * 
   * WHY THIS EXISTS:
   * Most items stack to 64, but inventories can override this.
   * For example, you could create a custom inventory where
   * items stack to 1 (like a museum display).
   * 
   * DEFAULT: Usually 64.
   */
  getMaxStackSize(): number;

  /**
   * Set maximum stack size.
   * 
   * CAVEATS (from Bukkit docs):
   * - Not all inventories respect this value
   * - Stacks > 127 may be clipped when world saves
   * - Not guaranteed to persist; set before each use
   * - Client may not display correctly if over item's natural max
   * 
   * WHY USE THIS:
   * Custom inventories for special mechanics (slot machines,
   * vending machines, voting systems with limited choices).
   */
  setMaxStackSize(size: number): void;

  /**
   * What kind of inventory is this.
   * 
   * WHY USEFUL:
   * Different inventory types need different handling.
   * A furnace GUI needs fuel/progress display.
   * A merchant GUI needs trade buttons.
   * A chest is just a grid.
   * 
   * @example
   * const type = inventory.getType();
   * if (type.name() === "FURNACE") {
   *   // Handle furnace-specific logic
   * }
   * 
   * // Or check if creatable
   * if (!type.isCreatable()) {
   *   console.log("Can't create this inventory type");
   * }
   */
  getType(): BukkitInventoryType;

  // ==========================================
  // GET / SET ITEMS
  // ==========================================

  /**
   * Get item at specific slot.
   * 
   * RETURNS NULL for empty slots (not air!).
   * 
   * @param index Slot number (0 to getSize()-1)
   */
  getItem(index: number): BukkitItemStack | null;

  /**
   * Put item in specific slot.
   * 
   * Pass null to clear the slot.
   * Overwrites whatever was there before.
   * 
   * @param index Slot number
   * @param item Item to place, or null to clear
   */
  setItem(index: number, item: BukkitItemStack | null): void;

  /**
   * Get ALL items as array.
   * 
   * IMPORTANT: Includes special slots!
   * For PlayerInventory, this includes armor and offhand.
   * Array indices match slot indices.
   * 
   * NULL entries = empty slots.
   */
  getContents(): (BukkitItemStack | null)[];

  /**
   * Replace entire inventory contents.
   * 
   * Array can be smaller than inventory size.
   * Excess slots are cleared.
   * 
   * @throws IllegalArgumentException if array larger than getSize()
   */
  setContents(items: (BukkitItemStack | null)[]): void;

  /**
   * Get only the "normal storage" slots.
   * 
   * WHY THIS EXISTS:
   * PlayerInventory has armor and offhand slots that you usually
   * don't want to include in "add item" or "search" operations.
   * 
   * getStorageContents() gives you just the main inventory slots.
   * This is what addItem(), contains(), remove() operate on.
   * 
   * For most inventories (Chest, Furnace), this equals getContents().
   * For PlayerInventory: main 36 slots only (excludes armor/offhand).
   */
  getStorageContents(): (BukkitItemStack | null)[];

  /**
   * Replace storage contents.
   * 
   * Only affects the "normal" slots, not armor/offhand.
   */
  setStorageContents(items: (BukkitItemStack | null)[]): void;

  // ==========================================
  // ADD / REMOVE ITEMS
  // ==========================================

  /**
   * Add items to inventory, auto-filling stacks and empty slots.
   * 
   * HOW IT WORKS:
   * 1. Try to add to existing partial stacks of same item
   * 2. Then fill empty slots
   * 3. Return whatever didn't fit
   * 
   * RETURN VALUE:
   * HashMap where key = parameter index, value = leftover items.
   * Empty map means everything fit!
   * 
   * WHY RETURN LEFTOVERS:
   * So you can drop them on the ground, send error message, etc.
   * 
   * @example
   * const diamonds = ItemStack.create(Material.DIAMOND, 100);
   * const leftover = inventory.addItem(diamonds);
   * 
   * if (leftover.size > 0) {
   *   // Some didn't fit
   *   const remaining = leftover.get(0);
   *   player.sendMessage(`Inventory full! ${remaining.getAmount()} dropped.`);
   *   world.dropItem(player.getLocation(), remaining);
   * }
   */
  addItem(...items: BukkitItemStack[]): Map<number, BukkitItemStack>;

  /**
   * Remove items from inventory.
   * 
   * Removes "as much as possible" of each requested item.
   * Returns what couldn't be removed (not found or not enough).
   * 
   * @example
   * // Take 10 diamonds from player
   * const toTake = ItemStack.create(Material.DIAMOND, 10);
   * const notRemoved = inventory.removeItem(toTake);
   * 
   * if (notRemoved.size > 0) {
   *   player.sendMessage("You don't have enough diamonds!");
   * }
   */
  removeItem(...items: BukkitItemStack[]): Map<number, BukkitItemStack>;

  // ==========================================
  // SEARCH: contains / all / first
  // ==========================================

  /*
   * IMPORTANT: These methods search STORAGE contents only!
   * For PlayerInventory, this means armor/offhand are NOT searched.
   */

  /**
   * Check if inventory has ANY of this material.
   * 
   * Ignores stack size and item meta.
   * Just "is there at least one diamond somewhere?"
   */
  contains(material: BukkitMaterial): boolean;

  /**
   * Check if inventory has item matching EXACTLY.
   * 
   * Matches type AND amount AND meta.
   * "Is there a stack of exactly 5 diamonds with these enchants?"
   */
  contains(item: BukkitItemStack): boolean;

  /**
   * Check if inventory has at least N of this material.
   * 
   * Sums across all stacks.
   * "Does player have at least 64 diamonds total?"
   */
  contains(material: BukkitMaterial, amount: number): boolean;

  /**
   * Check if inventory has N STACKS matching exactly.
   * 
   * Not total amount — number of identical stacks.
   * Rarely used.
   */
  contains(item: BukkitItemStack, amount: number): boolean;

  /**
   * Check if inventory has at least N total of matching items.
   * 
   * Like contains(material, amount) but for specific ItemStack.
   * Matches item type and meta, sums amounts across stacks.
   * 
   * @example
   * // Check if player has 10 diamonds total
   * const diamond = ItemStack.create(Material.DIAMOND);
   * if (inventory.containsAtLeast(diamond, 10)) {
   *   // Has enough
   * }
   */
  containsAtLeast(item: BukkitItemStack, amount: number): boolean;

  /**
   * Find ALL slots containing this material.
   * 
   * @returns Map of slotIndex → itemStack
   */
  all(material: BukkitMaterial): Map<number, BukkitItemStack>;

  /**
   * Find ALL slots containing exactly matching item.
   * 
   * @returns Map of slotIndex → itemStack
   */
  all(item: BukkitItemStack): Map<number, BukkitItemStack>;

  /**
   * Find FIRST slot containing this material.
   * 
   * @returns Slot index, or -1 if not found
   */
  first(material: BukkitMaterial): number;

  /**
   * Find FIRST slot containing exactly matching item.
   * 
   * @returns Slot index, or -1 if not found
   */
  first(item: BukkitItemStack): number;

  /**
   * Find first EMPTY slot.
   * 
   * @returns Slot index, or -1 if inventory is full
   */
  firstEmpty(): number;

  /**
   * Check if inventory has no items at all.
   * 
   * True if every slot is null/empty.
   */
  isEmpty(): boolean;

  // ==========================================
  // REMOVE / CLEAR
  // ==========================================

  /**
   * Remove ALL items of this material.
   * 
   * Every stack of diamonds? Gone.
   */
  remove(material: BukkitMaterial): void;

  /**
   * Remove all exactly matching items.
   * 
   * Only removes stacks that match type AND amount AND meta.
   */
  remove(item: BukkitItemStack): void;

  /**
   * Clear specific slot.
   * 
   * @param index Slot to clear
   */
  clear(index: number): void;

  /**
   * Clear ALL slots.
   * 
   * Empty the entire inventory.
   */
  clear(): void;

  // ==========================================
  // VIEWERS & HOLDER
  // ==========================================

  /**
   * Get all players currently viewing this inventory.
   * 
   * NOTE: Players are always considered to be viewing their own
   * inventory, even when they have another GUI open. This list
   * may not be empty even when no GUI is visible.
   * 
   * WHY USEFUL:
   * - Update viewers when inventory changes
   * - Prevent modifications while someone is looking
   * - Anti-cheat: detect impossible access
   */
  getViewers(): BukkitHumanEntity[];

  /**
   * Get the block or entity that owns this inventory.
   * 
   * RETURNS:
   * - Chest block → Chest
   * - Player → Player
   * - Villager → Villager
   * - Custom/virtual inventory → null
   * 
   * WHY USEFUL:
   * In InventoryClickEvent, you get the inventory.
   * Use getHolder() to find out WHAT was clicked.
   */
  getHolder(): BukkitInventoryHolder | null;

  /**
   * Location of the inventory's holder.
   * 
   * RETURNS:
   * - Block inventory → block location
   * - Entity inventory → entity location
   * - Custom inventory → null
   */
  getLocation(): BukkitLocation | null;

  // ==========================================
  // ITERATION
  // ==========================================

  /**
   * Get iterator over all slots.
   * 
   * WHY JAVA'S ListIterator:
   * Bukkit returns ListIterator which supports:
   * - Forward AND backward traversal
   * - Index access (nextIndex, previousIndex)
   * - Modification during iteration (set, add, remove)
   * 
   * INCLUDES ALL SLOTS:
   * Unlike contains/add/remove which use storage contents only,
   * iterator() goes through EVERYTHING including armor/offhand.
   */
  iterator(): JavaListIterator<BukkitItemStack>;

  /**
   * Get iterator starting at specific index.
   * 
   * POSITIVE INDEX:
   * First next() returns item at that index.
   * 
   * NEGATIVE INDEX:
   * First previous() returns item at (size + index).
   * Useful for iterating backwards from end.
   * 
   * @example
   * // Start at slot 10
   * const it = inventory.iterator(10);
   * 
   * // Start from end (last slot)
   * const itBack = inventory.iterator(-1);
   * while (itBack.hasPrevious()) {
   *   const item = itBack.previous();
   *   // Processing in reverse...
   * }
   */
  iterator(index: number): JavaListIterator<BukkitItemStack>;
}