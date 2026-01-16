/**
 * DESIGN
 * ------
 * HumanEntity represents any human-like entity: Players and NPCs.
 * 
 * INHERITANCE CHAIN:
 * Entity → LivingEntity → HumanEntity → Player
 * 
 * IMPLEMENTS:
 * - InventoryHolder: Has an inventory (getInventory)
 * - AnimalTamer: Can tame animals (getUniqueId, getName)
 * - Permissible: Has permissions (hasPermission, isOp) [inherited]
 * - CommandSender: Can receive messages [inherited]
 * 
 * KEY FEATURES UNIQUE TO HumanEntity:
 * - Full PlayerInventory (not just EntityEquipment)
 * - EnderChest storage
 * - Can open/view other inventories
 * - Food/saturation/exhaustion system
 * - Item cooldowns
 * - Game mode
 * - Sleep mechanics
 * - Recipe book
 * - Attack cooldown (combat)
 * 
 * FOOD SYSTEM:
 * The food system has three components that work together:
 * 
 *   ┌─────────────────────────────────────────────────────┐
 *   │  EXHAUSTION (accumulates from actions)             │
 *   │  ↓ depletes                                        │
 *   │  SATURATION (buffer, depletes before food)         │
 *   │  ↓ depletes                                        │
 *   │  FOOD LEVEL (0-20, causes damage at 0)             │
 *   └─────────────────────────────────────────────────────┘
 * 
 * Actions like sprinting, jumping, attacking add exhaustion.
 * When exhaustion >= 4, it resets and depletes saturation (or food if sat=0).
 * 
 * REGENERATION RATES:
 * - Saturated (food=20, sat>0): 1 health per 10 ticks (fast)
 * - Unsaturated (food>=18, sat=0): 1 health per 80 ticks (slow)
 * - Starving (food=0): 1 damage per 80 ticks
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/HumanEntity.html
 */

import { BukkitLivingEntity } from "./bukkitLivingEntity";
import { BukkitLocation } from "../../world/types/location";
import { BukkitEntity } from "./bukkitEntity";
import { BukkitInventory } from "../../inventories/type/inventory";
import { BukkitItemStack } from "../../items/types/itemstack";
import { JavaCollection } from "../../java/types/collections";
import { BukkitInventoryHolder } from "../../inventories/type/inventoryHolder";
import { BukkitPlayerInventory } from "../../inventories/type/playerInventory";
import { JavaSet } from "../../java/types/set";
import { BukkitPlayerModelPart } from "../enums/playerModeType";
import { BukkitInventoryView, BukkitInventoryViewProperty } from "../../inventories/type/inventoryViews";
import { BukkitGameMode } from "../enums/gamemodeType";
import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { BukkitFirework } from "../../items/types/firework";
import { BukkitMainHand } from "../../inventories/type/mainHand";
import { BukkitMaterial } from "../../items/enums/materialType";


// ============================================
// HUMAN ENTITY INTERFACE
// ============================================

export interface BukkitHumanEntity extends BukkitLivingEntity, BukkitInventoryHolder {

  // ==========================================
  // IDENTITY
  // ==========================================

  /**
   * Get this human's name.
   * 
   * For players, this is their username.
   */
  getName(): string;

  // ==========================================
  // INVENTORY (from InventoryHolder)
  // ==========================================

  /**
   * Get player's inventory.
   * 
   * WHY PlayerInventory (not Inventory):
   * Humans have special inventory with armor slots, hotbar, etc.
   * PlayerInventory extends Inventory with these features.
   * 
   * @returns Full inventory including armor and offhand
   */
  getInventory(): BukkitPlayerInventory;

  /**
   * Get ender chest inventory.
   * 
   * ENDER CHEST PROPERTIES:
   * - 27 slots (like single chest)
   * - Per-player (each player has their own)
   * - Persists across death
   * - Accessible from any ender chest in any dimension
   */
  getEnderChest(): BukkitInventory;

  // ==========================================
  // MAIN HAND PREFERENCE
  // ==========================================

  /**
   * Get player's main hand setting.
   * 
   * WHY THIS MATTERS:
   * Affects which hand is used for primary actions.
   * Most players use RIGHT, but lefties can set LEFT.
   * 
   * @returns LEFT or RIGHT
   */
  getMainHand(): BukkitMainHand;

  // ==========================================
  // PLAYER MODEL
  // ==========================================

  /**
   * Check if a skin part is visible.
   * 
   * Players can toggle skin layers in their settings.
   * 
   * @param part Which part to check (CAPE, JACKET, etc.)
   * @returns true if that part is shown
   */
  isModelPartShown(part: BukkitPlayerModelPart): boolean;

  // ==========================================
  // OPEN INVENTORY
  // ==========================================

  /**
   * Get currently open inventory view.
   * 
   * If no external inventory is open, returns the player's
   * internal crafting view (2x2 grid always available).
   */
  getOpenInventory(): BukkitInventoryView;

  /**
   * Open an inventory for this player.
   * 
   * Shows specified inventory on top, player's inventory on bottom.
   * 
   * @param inventory Inventory to open
   * @returns Opened view, or null if cancelled by event
   */
  openInventory(inventory: BukkitInventory): BukkitInventoryView | null;

  /**
   * Open a specific inventory view.
   * 
   * The view's player must be this HumanEntity.
   */
  openInventory(view: BukkitInventoryView): void;

  /**
   * Open a crafting table GUI.
   * 
   * @deprecated Since 1.21.4. Use MenuType.CRAFTING builder.
   * 
   * @param location Where to attach (null = player's location)
   * @param force If false, requires actual crafting table at location
   */
  openWorkbench(location: BukkitLocation | null, force: boolean): BukkitInventoryView | null;

  /**
   * Open an enchanting table GUI.
   * 
   * @deprecated Since 1.21.4. Use MenuType.ENCHANTMENT builder.
   */
  openEnchanting(location: BukkitLocation | null, force: boolean): BukkitInventoryView | null;

  /**
   * Open villager trading GUI.
   * 
   * @deprecated Since 1.21.4. Use MenuType.MERCHANT.
   * 
   * @param trader Villager to trade with
   * @param force Force even if villager is trading with someone else
   */
  openMerchant(trader: any /* Villager */, force: boolean): BukkitInventoryView | null;

  /**
   * Open merchant trading GUI.
   * 
   * @deprecated Since 1.21.4. Use MenuType.MERCHANT.
   */
  openMerchant(merchant: any /* Merchant */, force: boolean): BukkitInventoryView | null;

  /**
   * Close any open inventory.
   */
  closeInventory(): void;

  /**
   * Set a property of the open inventory window.
   * 
   * @deprecated For removal since 1.21. Use InventoryView children.
   * 
   * Used for things like furnace progress bars.
   */
  setWindowProperty(prop: BukkitInventoryViewProperty, value: number): boolean;

  // ==========================================
  // ITEM ON CURSOR
  // ==========================================

  /**
   * Get item currently being dragged.
   * 
   * When you click and drag an item in inventory, it's "on cursor".
   * Empty if no inventory is open or nothing being dragged.
   * 
   * @returns Item on cursor (air if empty, never null)
   */
  getItemOnCursor(): BukkitItemStack;

  /**
   * Set item on cursor.
   * 
   * Replaces whatever player was dragging.
   * 
   * @param item Item to put on cursor, or null to clear
   */
  setItemOnCursor(item: BukkitItemStack | null): void;

  // ==========================================
  // HELD ITEM (deprecated)
  // ==========================================

  /**
   * Get item in main hand.
   * 
   * @deprecated Since 1.9. Use PlayerInventory.getItemInMainHand().
   */
  getItemInHand(): BukkitItemStack;

  /**
   * Set item in main hand.
   * 
   * @deprecated Since 1.9. Use PlayerInventory.setItemInMainHand().
   */
  setItemInHand(item: BukkitItemStack | null): void;

  // ==========================================
  // ITEM COOLDOWNS
  // ==========================================

  /*
   * COOLDOWN SYSTEM:
   * Some items have use cooldowns (ender pearls, chorus fruit, shields).
   * You can also set custom cooldowns on any item.
   * 
   * During cooldown, item shows sweep animation and can't be used.
   * Cooldowns are visual AND functional.
   */

  /**
   * Check if material has active cooldown.
   * 
   * @throws IllegalArgumentException if material is not an item
   */
  hasCooldown(material: BukkitMaterial): boolean;

  /**
   * Check if item has active cooldown.
   */
  hasCooldown(item: BukkitItemStack): boolean;

  /**
   * Get remaining cooldown ticks for material.
   * 
   * @returns Ticks remaining, or 0 if no cooldown
   * @throws IllegalArgumentException if material is not an item
   */
  getCooldown(material: BukkitMaterial): number;

  /**
   * Get remaining cooldown ticks for item.
   */
  getCooldown(item: BukkitItemStack): number;

  /**
   * Set cooldown on material.
   * 
   * @param material Material to set cooldown for
   * @param ticks Duration in ticks (20 = 1 second), 0 to remove
   * @throws IllegalArgumentException if material is not an item
   */
  setCooldown(material: BukkitMaterial, ticks: number): void;

  /**
   * Set cooldown on item.
   * 
   * If item has UseCooldownComponent, applies to all items
   * in same cooldown group.
   */
  setCooldown(item: BukkitItemStack, ticks: number): void;

  // ==========================================
  // SLEEP
  // ==========================================

  /**
   * Get how long player has been sleeping.
   * 
   * Value may be capped by server.
   * 
   * @returns Sleep ticks (0 if not sleeping)
   */
  getSleepTicks(): number;

  /**
   * Attempt to make player sleep.
   * 
   * REQUIREMENTS (unless force=true):
   * - Location must have bed block
   * - Must be night or thunderstorm
   * - No hostile mobs nearby
   * - Must be in Overworld
   * 
   * @param location Bed location
   * @param force Bypass normal sleep requirements
   * @returns true if sleep started
   */
  sleep(location: BukkitLocation, force: boolean): boolean;

  /**
   * Wake player up.
   * 
   * @param setSpawnLocation If true, set spawn to current bed
   * @throws IllegalStateException if not sleeping
   */
  wakeup(setSpawnLocation: boolean): void;

  /**
   * Get bed location (where player is sleeping).
   * 
   * @returns Bed location
   * @throws IllegalStateException if not sleeping
   */
  getBedLocation(): BukkitLocation;

  // ==========================================
  // GAME MODE
  // ==========================================

  /**
   * Get current game mode.
   */
  getGameMode(): BukkitGameMode;

  /**
   * Set game mode.
   */
  setGameMode(mode: BukkitGameMode): void;

  // ==========================================
  // COMBAT
  // ==========================================

  /**
   * Check if player is blocking with shield.
   */
  isBlocking(): boolean;

  /**
   * Check if player has hand raised (about to block).
   * 
   * Hand raises before blocking actually starts.
   */
  isHandRaised(): boolean;

  /**
   * Get attack cooldown progress.
   * 
   * WHY THIS EXISTS:
   * Since 1.9, attacks have cooldown for full damage.
   * 
   * @returns 0.0 (just attacked) to 1.0 (fully charged)
   */
  getAttackCooldown(): number;

  /**
   * Start a riptide spin attack.
   * 
   * @param duration Attack duration in ticks
   * @param attackStrength Damage dealt to hit entities
   * @param attackItem Item used (usually trident)
   */
  startRiptideAttack(duration: number, attackStrength: number, attackItem: BukkitItemStack | null): void;

  // ==========================================
  // EXPERIENCE
  // ==========================================

  /**
   * Get experience needed to reach next level.
   * 
   * @returns XP points required
   */
  getExpToLevel(): number;

  // ==========================================
  // ENCHANTMENT
  // ==========================================

  /**
   * Get enchantment seed.
   * 
   * WHY SEED:
   * Determines which enchantments appear in enchanting table.
   * Changes when you enchant something.
   */
  getEnchantmentSeed(): number;

  /**
   * Set enchantment seed.
   * 
   * Can force specific enchantment options to appear.
   */
  setEnchantmentSeed(seed: number): void;

  // ==========================================
  // FOOD SYSTEM
  // ==========================================

  /**
   * Get current food level (0-20).
   * 
   * EFFECTS:
   * - 20: Can regenerate health (if saturation > 0, fast regen)
   * - 18+: Can regenerate health (slow)
   * - 7-17: Can sprint
   * - 0: Takes starvation damage
   */
  getFoodLevel(): number;

  /**
   * Set food level.
   * 
   * @param value 0-20
   */
  setFoodLevel(value: number): void;

  /**
   * Get current saturation level.
   * 
   * SATURATION:
   * Buffer that depletes before food level.
   * While saturation > 0, food level won't decrease.
   * Also enables fast health regeneration when food = 20.
   * 
   * @returns Saturation (0 to foodLevel, can't exceed food)
   */
  getSaturation(): number;

  /**
   * Set saturation level.
   */
  setSaturation(value: number): void;

  /**
   * Get current exhaustion level.
   * 
   * EXHAUSTION:
   * Accumulates from actions (sprinting, jumping, attacking).
   * When exhaustion >= 4, it resets and depletes saturation by 1
   * (or food by 1 if saturation is 0).
   */
  getExhaustion(): number;

  /**
   * Set exhaustion level.
   */
  setExhaustion(value: number): void;

  // ==========================================
  // REGENERATION RATES
  // ==========================================

  /*
   * These control how fast health regenerates or depletes.
   * Values are "1 health per X ticks".
   * Lower = faster regeneration/starvation.
   */

  /**
   * Get fast regen rate (saturated, food=20).
   * 
   * Default: 10 (1 health per 0.5 seconds)
   */
  getSaturatedRegenRate(): number;

  /**
   * Set fast regen rate.
   * 
   * Not affected by peaceful difficulty.
   */
  setSaturatedRegenRate(ticks: number): void;

  /**
   * Get slow regen rate (unsaturated, food>=18).
   * 
   * Default: 80 (1 health per 4 seconds)
   */
  getUnsaturatedRegenRate(): number;

  /**
   * Set slow regen rate.
   */
  setUnsaturatedRegenRate(ticks: number): void;

  /**
   * Get starvation damage rate (food=0).
   * 
   * Default: 80 (1 damage per 4 seconds)
   */
  getStarvationRate(): number;

  /**
   * Set starvation damage rate.
   */
  setStarvationRate(ticks: number): void;

  // ==========================================
  // RECIPES
  // ==========================================

  /**
   * Discover a recipe (add to recipe book).
   * 
   * @param recipe Recipe key (e.g., "minecraft:diamond_sword")
   * @returns true if newly discovered, false if already known
   */
  discoverRecipe(recipe: BukkitNamespacedKey): boolean;

  /**
   * Discover multiple recipes.
   * 
   * @returns Number of newly discovered recipes
   */
  discoverRecipes(recipes: JavaCollection<BukkitNamespacedKey>): number;

  /**
   * Undiscover a recipe (remove from recipe book).
   * 
   * @returns true if was discovered and now removed
   */
  undiscoverRecipe(recipe: BukkitNamespacedKey): boolean;

  /**
   * Undiscover multiple recipes.
   * 
   * @returns Number of removed recipes
   */
  undiscoverRecipes(recipes: JavaCollection<BukkitNamespacedKey>): number;

  /**
   * Check if recipe is discovered.
   */
  hasDiscoveredRecipe(recipe: BukkitNamespacedKey): boolean;

  /**
   * Get all discovered recipes.
   * 
   * @returns Immutable set of recipe keys
   */
  getDiscoveredRecipes(): JavaSet<BukkitNamespacedKey>;

  // ==========================================
  // SHOULDER ENTITIES (parrots)
  // ==========================================

  /**
   * Get entity on left shoulder.
   * 
   * @deprecated Since 1.12. Serialized entity semantics unclear.
   * 
   * Currently only renders parrots.
   * Returned entity is NOT spawned in world.
   */
  getShoulderEntityLeft(): BukkitEntity | null;

  /**
   * Set entity on left shoulder.
   * 
   * @deprecated Since 1.12. Use with care.
   * 
   * Removes entity from world. Only parrots render visually.
   */
  setShoulderEntityLeft(entity: BukkitEntity | null): void;

  /**
   * Get entity on right shoulder.
   * 
   * @deprecated Since 1.12.
   */
  getShoulderEntityRight(): BukkitEntity | null;

  /**
   * Set entity on right shoulder.
   * 
   * @deprecated Since 1.12.
   */
  setShoulderEntityRight(entity: BukkitEntity | null): void;

  // ==========================================
  // DROP ITEM
  // ==========================================

  /**
   * Make player drop held item.
   * 
   * @param dropAll true = drop entire stack, false = drop 1
   * @returns true if item was dropped
   */
  dropItem(dropAll: boolean): boolean;

  // ==========================================
  // DEATH LOCATION
  // ==========================================

  /**
   * Get last death location.
   * 
   * WHY USEFUL:
   * Recovery compass points here.
   * Good for death waypoints, corpse runs.
   * 
   * @returns Death location, or null if never died
   */
  getLastDeathLocation(): BukkitLocation | null;

  /**
   * Set last death location.
   * 
   * NOTE: Only updates in client when player respawns.
   */
  setLastDeathLocation(location: BukkitLocation | null): void;

  // ==========================================
  // ELYTRA BOOST
  // ==========================================

  /**
   * Boost with firework while gliding.
   * 
   * REQUIREMENTS:
   * - Must be gliding (isGliding() = true)
   * - Item must be firework rocket
   * 
   * Boost power = firework power.
   * 
   * @param fireworkItemStack Firework to use
   * @returns Spawned firework entity, or null if can't boost
   * @throws IllegalArgumentException if item is not firework
   */
  fireworkBoost(fireworkItemStack: BukkitItemStack): BukkitFirework | null;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if player is starving (food = 0).
 */
export function isStarving(human: BukkitHumanEntity): boolean {
  return human.getFoodLevel() === 0;
}

/**
 * Check if player can sprint (food > 6).
 */
export function canSprint(human: BukkitHumanEntity): boolean {
  return human.getFoodLevel() > 6;
}

/**
 * Check if player can regenerate health (food >= 18).
 */
export function canRegenerate(human: BukkitHumanEntity): boolean {
  return human.getFoodLevel() >= 18;
}

/**
 * Check if player has fast regeneration (food = 20, saturation > 0).
 */
export function hasFastRegen(human: BukkitHumanEntity): boolean {
  return human.getFoodLevel() >= 20 && human.getSaturation() > 0;
}

/**
 * Fill food and saturation to max.
 */
export function feed(human: BukkitHumanEntity): void {
  human.setFoodLevel(20);
  human.setSaturation(20);
  human.setExhaustion(0);
}

/**
 * Remove all food (for hunger games, etc).
 */
export function starve(human: BukkitHumanEntity): void {
  human.setFoodLevel(0);
  human.setSaturation(0);
}

/**
 * Check if player is in survival-like mode (takes damage, hunger).
 */
export function isSurvivalLike(human: BukkitHumanEntity): boolean {
  const mode = human.getGameMode().name();
  return mode === "SURVIVAL" || mode === "ADVENTURE";
}

/**
 * Check if player can fly (creative or spectator).
 */
export function canFly(human: BukkitHumanEntity): boolean {
  const mode = human.getGameMode().name();
  return mode === "CREATIVE" || mode === "SPECTATOR";
}

/**
 * Clear all item cooldowns.
 * 
 * NOTE: This only clears cooldowns for items currently in inventory.
 * There's no way to clear ALL cooldowns without knowing which items have them.
 */
export function clearInventoryCooldowns(human: BukkitHumanEntity): void {
  const inventory = human.getInventory();
  const contents = inventory.getContents();
  
  for (const item of contents) {
    if (item !== null && human.hasCooldown(item)) {
      human.setCooldown(item, 0);
    }
  }
}