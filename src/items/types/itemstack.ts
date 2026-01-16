/**
 * Represents a stack of items.
 * 
 * IMPORTANT: An ItemStack is only designed to contain items. Do not use this class
 * to encapsulate Materials for which Material.isItem() returns false.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/ItemStack.html
 */

import { BukkitMaterial } from "../enums/materialType";
import { BukkitEnchantment } from "../enums/enchantmentType";
import { BukkitMaterialData } from "./materialData";

// ============================================
// INTERFACES
// ============================================

export interface BukkitItemMeta {
  /**
   * Gets the display name that is set.
   * @returns The display name
   */
  getDisplayName(): string;

  /**
   * Sets the display name.
   * @param name - The name to set
   */
  setDisplayName(name: string): void;

  /**
   * Checks for existence of a display name.
   * @returns True if this has a display name
   */
  hasDisplayName(): boolean;

  /**
   * Gets the lore that is set.
   * @returns A list of lore lines
   */
  getLore(): string[] | null;

  /**
   * Sets the lore for this item.
   * @param lore - The lore to set
   */
  setLore(lore: string[] | null): void;

  /**
   * Checks for existence of lore.
   * @returns True if this has lore
   */
  hasLore(): boolean;

  /**
   * Checks for existence of custom model data.
   * @returns True if this has custom model data
   */
  hasCustomModelData(): boolean;

  /**
   * Gets the custom model data that is set.
   * @returns The custom model data
   */
  getCustomModelData(): number;

  /**
   * Sets the custom model data.
   * @param data - The data to set
   */
  setCustomModelData(data: number | null): void;

  /**
   * Checks if the unbreakable tag is true.
   * @returns True if this is unbreakable
   */
  isUnbreakable(): boolean;

  /**
   * Sets the unbreakable tag.
   * @param unbreakable - True if set unbreakable
   */
  setUnbreakable(unbreakable: boolean): void;

  /**
   * Checks for the existence of any enchantments.
   * @returns True if an enchantment exists
   */
  hasEnchants(): boolean;

  /**
   * Checks for existence of the specified enchantment.
   * @param ench - Enchantment to check
   * @returns True if this enchantment exists
   */
  hasEnchant(ench: BukkitEnchantment): boolean;

  /**
   * Checks for the level of the specified enchantment.
   * @param ench - Enchantment to check
   * @returns The level that the specified enchantment has, or 0
   */
  getEnchantLevel(ench: BukkitEnchantment): number;

  /**
   * Returns a copy the enchantments in this ItemMeta.
   * @returns A map of enchantments
   */
  getEnchants(): Map<BukkitEnchantment, number>;

  /**
   * Adds the specified enchantment to this item meta.
   * @param ench - Enchantment to add
   * @param level - Level of the enchantment
   * @param ignoreLevelRestriction - Whether to ignore level restrictions
   * @returns True if the item meta changed
   */
  addEnchant(ench: BukkitEnchantment, level: number, ignoreLevelRestriction: boolean): boolean;

  /**
   * Removes the specified enchantment from this item meta.
   * @param ench - Enchantment to remove
   * @returns True if the item meta changed
   */
  removeEnchant(ench: BukkitEnchantment): boolean;

  /**
   * Checks if the specified enchantment conflicts with any in this ItemMeta.
   * @param ench - Enchantment to test
   * @returns True if there is a conflict
   */
  hasConflictingEnchant(ench: BukkitEnchantment): boolean;

  /**
   * Return a clone of this ItemMeta.
   * @returns A clone
   */
  clone(): BukkitItemMeta;
}

export interface BukkitItemStack {
  /**
   * Gets the type of this item.
   * @returns Type of the items in this stack
   */
  getType(): BukkitMaterial;

  /**
   * Sets the type of this item.
   * 
   * Note that in doing so you will reset the MaterialData for this stack.
   * 
   * IMPORTANT: An ItemStack is only designed to contain items. Do not use this
   * class to encapsulate Materials for which Material.isItem() returns false.
   * 
   * @param type - New type to set the items in this stack to
   */
  setType(type: BukkitMaterial): void;

  /**
   * Gets the amount of items in this stack.
   * @returns Amount of items in this stack
   */
  getAmount(): number;

  /**
   * Sets the amount of items in this stack.
   * @param amount - New amount of items in this stack
   */
  setAmount(amount: number): void;

  /**
   * Gets the MaterialData for this stack of items.
   * @returns MaterialData for this item
   */
  getData(): BukkitMaterialData | null;

  /**
   * Sets the MaterialData for this stack of items.
   * @param data - New MaterialData for this item
   */
  setData(data: BukkitMaterialData | null): void;

  /**
   * Sets the durability of this item.
   * @param durability - Durability of this item
   * @deprecated durability is now part of ItemMeta. Use getItemMeta(), setItemMeta() and Damageable.setDamage() instead.
   */
  setDurability(durability: number): void;

  /**
   * Gets the durability of this item.
   * @returns Durability of this item
   * @deprecated see setDurability()
   */
  getDurability(): number;

  /**
   * Get the maximum stack size for this item.
   * 
   * If this item has a max stack size component (ItemMeta.hasMaxStackSize()),
   * the value of that component will be returned. Otherwise, this item's
   * Material's default maximum stack size will be returned instead.
   * 
   * @returns The maximum you can stack this item to
   */
  getMaxStackSize(): number;

  /**
   * Checks if this ItemStack contains the given Enchantment.
   * @param ench - Enchantment to test
   * @returns True if this has the given enchantment
   */
  containsEnchantment(ench: BukkitEnchantment): boolean;

  /**
   * Gets the level of the specified enchantment on this item stack.
   * @param ench - Enchantment to check
   * @returns Level of the enchantment, or 0
   */
  getEnchantmentLevel(ench: BukkitEnchantment): number;

  /**
   * Gets a map containing all enchantments and their levels on this item.
   * @returns Map of enchantments
   */
  getEnchantments(): Map<BukkitEnchantment, number>;

  /**
   * Adds the specified enchantments to this item stack.
   * 
   * This method is the same as calling addEnchantment() for each element of the map.
   * 
   * @param enchantments - Enchantments to add
   * @throws IllegalArgumentException if the specified enchantments is null
   * @throws IllegalArgumentException if any specific enchantment or level is null
   */
  addEnchantments(enchantments: Map<BukkitEnchantment, number>): void;

  /**
   * Adds the specified Enchantment to this item stack.
   * 
   * If this item stack already contained the given enchantment (at any level),
   * it will be replaced.
   * 
   * @param ench - Enchantment to add
   * @param level - Level of the enchantment
   * @throws IllegalArgumentException if enchantment null, or enchantment is not applicable
   */
  addEnchantment(ench: BukkitEnchantment, level: number): void;

  /**
   * Adds the specified enchantments to this item stack in an unsafe manner.
   * 
   * This method is the same as calling addUnsafeEnchantment() for each element of the map.
   * 
   * @param enchantments - Enchantments to add
   */
  addUnsafeEnchantments(enchantments: Map<BukkitEnchantment, number>): void;

  /**
   * Adds the specified Enchantment to this item stack.
   * 
   * If this item stack already contained the given enchantment (at any level),
   * it will be replaced.
   * 
   * This method is unsafe and will ignore level restrictions or item type.
   * Use at your own discretion.
   * 
   * @param ench - Enchantment to add
   * @param level - Level of the enchantment
   */
  addUnsafeEnchantment(ench: BukkitEnchantment, level: number): void;

  /**
   * Removes the specified Enchantment if it exists on this ItemStack.
   * @param ench - Enchantment to remove
   * @returns Previous level, or 0
   */
  removeEnchantment(ench: BukkitEnchantment): number;

  /**
   * Removes all enchantments on this ItemStack.
   */
  removeEnchantments(): void;

  /**
   * Get a copy of this ItemStack's ItemMeta.
   * @returns A copy of the current ItemStack's ItemData
   */
  getItemMeta(): BukkitItemMeta | null;

  /**
   * Checks to see if any meta data has been defined.
   * @returns True if some meta data has been set for this item
   */
  hasItemMeta(): boolean;

  /**
   * Set the ItemMeta of this ItemStack.
   * @param itemMeta - New ItemMeta, or null to indicate meta data be cleared
   * @returns True if successfully applied ItemMeta
   * @throws IllegalArgumentException if the item meta was not created by the ItemFactory
   */
  setItemMeta(itemMeta: BukkitItemMeta | null): boolean;

  /**
   * This method is the same as equals, but does not consider stack size (amount).
   * @param stack - The item stack to compare to
   * @returns True if the two stacks are equal, ignoring the amount
   */
  isSimilar(stack: BukkitItemStack | null): boolean;

  /**
   * Creates a Map representation of this class.
   * @returns Map containing the current state of this class
   */
  serialize(): Map<string, any>;

  /**
   * Get the translation key, suitable for use in a translation component.
   * @returns The translation key
   */
  getTranslationKey(): string;

  /**
   * Returns a clone of this ItemStack.
   * @returns A clone
   */
  clone(): BukkitItemStack;

  /**
   * Returns a string representation of this ItemStack.
   * @returns String representation
   */
  toString(): string;
}

// ============================================
// CLASS REFERENCE
// ============================================

/** Reference to the Java ItemStack class */
export const ItemStackClass = org.bukkit.inventory.ItemStack;

// ============================================
// FACTORY FUNCTIONS
// ============================================

/**
 * Creates a new ItemStack with the specified material.
 * Defaults stack size to 1, with no extra data.
 * 
 * IMPORTANT: An ItemStack is only designed to contain items. Do not use this
 * function to encapsulate Materials for which Material.isItem() returns false.
 * 
 * @param type - Item material
 * @returns A new ItemStack
 * 
 * @example
 * const diamond = createItemStack(Material.DIAMOND);
 */
export function createItemStack(type: BukkitMaterial): BukkitItemStack {
  return new org.bukkit.inventory.ItemStack(type);
}

/**
 * Creates a new ItemStack with the specified material and amount.
 * 
 * IMPORTANT: An ItemStack is only designed to contain items. Do not use this
 * function to encapsulate Materials for which Material.isItem() returns false.
 * 
 * @param type - Item material
 * @param amount - Stack size
 * @returns A new ItemStack
 * 
 * @example
 * const diamonds = createItemStackWithAmount(Material.DIAMOND, 64);
 */
export function createItemStackWithAmount(type: BukkitMaterial, amount: number): BukkitItemStack {
  return new org.bukkit.inventory.ItemStack(type, amount);
}

/**
 * Creates a new ItemStack derived from the specified stack.
 * 
 * @param stack - The stack to copy
 * @returns A new ItemStack
 * @throws IllegalArgumentException if the specified stack is null
 * 
 * @example
 * const copy = cloneItemStack(originalStack);
 */
export function cloneItemStack(stack: BukkitItemStack): BukkitItemStack {
  return new org.bukkit.inventory.ItemStack(stack);
}

/**
 * Required method for configuration serialization.
 * 
 * @param args - Map to deserialize
 * @returns Deserialized item stack
 */
export function deserializeItemStack(args: Map<string, any>): BukkitItemStack {
  return org.bukkit.inventory.ItemStack.deserialize(args);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates an ItemStack with a custom display name.
 * 
 * @param type - Item material
 * @param amount - Stack size
 * @param displayName - Custom display name
 * @returns A new ItemStack with the display name set
 * 
 * @example
 * const namedSword = createNamedItem(Material.DIAMOND_SWORD, 1, "§6Excalibur");
 */
export function createNamedItem(type: BukkitMaterial, amount: number, displayName: string): BukkitItemStack {
  const item = new org.bukkit.inventory.ItemStack(type, amount);
  const meta = item.getItemMeta();
  if (meta) {
    meta.setDisplayName(displayName);
    item.setItemMeta(meta);
  }
  return item;
}

/**
 * Creates an ItemStack with a custom display name and lore.
 * 
 * @param type - Item material
 * @param amount - Stack size
 * @param displayName - Custom display name
 * @param lore - Array of lore lines
 * @returns A new ItemStack with the display name and lore set
 * 
 * @example
 * const loreItem = createLoreItem(
 *   Material.DIAMOND_SWORD,
 *   1,
 *   "§6Excalibur",
 *   ["§7A legendary sword", "§7Forged by the gods"]
 * );
 */
export function createLoreItem(
  type: BukkitMaterial,
  amount: number,
  displayName: string,
  lore: string[]
): BukkitItemStack {
  const item = new org.bukkit.inventory.ItemStack(type, amount);
  const meta = item.getItemMeta();
  if (meta) {
    meta.setDisplayName(displayName);
    meta.setLore(lore);
    item.setItemMeta(meta);
  }
  return item;
}

/**
 * Creates an ItemStack with enchantments.
 * 
 * @param type - Item material
 * @param amount - Stack size
 * @param enchantments - Array of [Enchantment, level] tuples
 * @returns A new ItemStack with enchantments
 * 
 * @example
 * const enchantedSword = createEnchantedItem(
 *   Material.DIAMOND_SWORD,
 *   1,
 *   [
 *     [Enchantment.SHARPNESS, 5],
 *     [Enchantment.UNBREAKING, 3],
 *     [Enchantment.FIRE_ASPECT, 2]
 *   ]
 * );
 */
export function createEnchantedItem(
  type: BukkitMaterial,
  amount: number,
  enchantments: [BukkitEnchantment, number][]
): BukkitItemStack {
  const item = new org.bukkit.inventory.ItemStack(type, amount);
  for (const [ench, level] of enchantments) {
    item.addUnsafeEnchantment(ench, level);
  }
  return item;
}

/**
 * Creates a fully customized ItemStack.
 * 
 * @param options - Item options
 * @returns A new customized ItemStack
 * 
 * @example
 * const customItem = createCustomItem({
 *   type: Material.DIAMOND_SWORD,
 *   amount: 1,
 *   displayName: "§6Excalibur",
 *   lore: ["§7A legendary sword"],
 *   enchantments: [[Enchantment.SHARPNESS, 5]],
 *   unbreakable: true,
 *   customModelData: 12345
 * });
 */
export function createCustomItem(options: {
  type: BukkitMaterial;
  amount?: number;
  displayName?: string;
  lore?: string[];
  enchantments?: [BukkitEnchantment, number][];
  unbreakable?: boolean;
  customModelData?: number;
}): BukkitItemStack {
  const item = new org.bukkit.inventory.ItemStack(options.type, options.amount ?? 1);
  const meta = item.getItemMeta();

  if (meta) {
    if (options.displayName) {
      meta.setDisplayName(options.displayName);
    }
    if (options.lore) {
      meta.setLore(options.lore);
    }
    if (options.unbreakable !== undefined) {
      meta.setUnbreakable(options.unbreakable);
    }
    if (options.customModelData !== undefined) {
      meta.setCustomModelData(options.customModelData);
    }
    item.setItemMeta(meta);
  }

  if (options.enchantments) {
    for (const [ench, level] of options.enchantments) {
      item.addUnsafeEnchantment(ench, level);
    }
  }

  return item;
}

/**
 * Checks if two ItemStacks are similar (same type and meta, ignoring amount).
 * 
 * @param a - First ItemStack
 * @param b - Second ItemStack
 * @returns True if the stacks are similar
 * 
 * @example
 * if (areItemsSimilar(item1, item2)) {
 *   console.log("Items are the same type!");
 * }
 */
export function areItemsSimilar(a: BukkitItemStack | null, b: BukkitItemStack | null): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.isSimilar(b);
}

/**
 * Checks if an ItemStack is empty (null, air, or amount <= 0).
 * 
 * @param item - ItemStack to check
 * @returns True if the item is empty
 * 
 * @example
 * if (isItemEmpty(player.getInventory().getItemInMainHand())) {
 *   player.sendMessage("You're not holding anything!");
 * }
 */
export function isItemEmpty(item: BukkitItemStack | null): boolean {
  if (item === null) return true;
  if (item.getType().isAir()) return true;
  if (item.getAmount() <= 0) return true;
  return false;
}