/**
 * DESIGN
 * ------
 * LootTable represents what items should drop from various sources.
 * 
 * LOOT TABLE SOURCES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    LOOT TABLES                              │
 *   │                                                             │
 *   │   ┌─────────────────┐                                       │
 *   │   │   MOB DROPS     │  What mobs drop when killed           │
 *   │   │   - Zombie      │  → Rotten flesh, iron ingot           │
 *   │   │   - Skeleton    │  → Bones, arrows, bow                 │
 *   │   │   - Creeper     │  → Gunpowder, music disc              │
 *   │   │   - EnderDragon │  → XP orbs, dragon egg                │
 *   │   └─────────────────┘                                       │
 *   │                                                             │
 *   │   ┌─────────────────┐                                       │
 *   │   │   CONTAINERS    │  Natural container contents           │
 *   │   │   - Chest       │  → Dungeon, mineshaft loot            │
 *   │   │   - Barrel      │  → Village loot                       │
 *   │   │   - Shulker     │  → End city loot                      │
 *   │   └─────────────────┘                                       │
 *   │                                                             │
 *   │   ┌─────────────────┐                                       │
 *   │   │    FISHING      │  What can be caught fishing           │
 *   │   │   - Fish        │  → Cod, salmon, tropical fish         │
 *   │   │   - Treasure    │  → Enchanted items, saddle            │
 *   │   │   - Junk        │  → Leather boots, stick               │
 *   │   └─────────────────┘                                       │
 *   │                                                             │
 *   │   ┌─────────────────┐                                       │
 *   │   │    BLOCKS       │  What blocks drop                     │
 *   │   │   - Leaves      │  → Saplings, sticks, apples           │
 *   │   │   - Ore         │  → Raw materials, gems                │
 *   │   │   - Grass       │  → Seeds                              │
 *   │   └─────────────────┘                                       │
 *   │                                                             │
 *   │   ┌─────────────────┐                                       │
 *   │   │  ARCHAEOLOGY    │  Suspicious blocks                    │
 *   │   │   - Sand        │  → Pottery sherds, artifacts          │
 *   │   │   - Gravel      │  → Ancient items                      │
 *   │   └─────────────────┘                                       │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * LOOT GENERATION FLOW:
 * 
 *   ┌──────────────┐     ┌─────────────┐     ┌────────────────┐
 *   │  LootTable   │ ──► │ LootContext │ ──► │ Collection<    │
 *   │  (defines    │     │ (modifiers) │     │   ItemStack>   │
 *   │   pools)     │     │             │     │                │
 *   └──────────────┘     └─────────────┘     └────────────────┘
 *         │                    │
 *         │                    ├── Location (required)
 *         │                    ├── Luck (affects chances)
 *         ├── Pools            ├── Killer (for looting)
 *         ├── Entries          └── LootedEntity
 *         ├── Conditions
 *         └── Functions
 * 
 * TWO METHODS:
 * 
 *   populateLoot():
 *   ┌──────────────┐     ┌─────────────────┐
 *   │  LootTable   │ ──► │ Collection<Item>│  Returns items
 *   └──────────────┘     └─────────────────┘  (you handle them)
 * 
 *   fillInventory():
 *   ┌──────────────┐     ┌─────────────────┐
 *   │  LootTable   │ ──► │   Inventory     │  Items placed
 *   └──────────────┘     └─────────────────┘  directly in slots
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/loot/LootTable.html
 * @see https://minecraft.wiki/w/Loot_table
 */

import { BukkitInventory } from "../../inventories/type/inventory";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { JavaCollection } from "../../java/types/collections";
import { getMapValues, isMapEmpty } from "../../java/types/map";
import { JavaRandom } from "../../java/types/random";
import { BukkitLootContext } from "./lootContext";



// ============================================
// INTERFACE
// ============================================

/**
 * A loot table that defines what items can be generated.
 * 
 * LootTables are used for:
 * - Mob drops (death loot)
 * - Container contents (chests, barrels)
 * - Fishing rewards
 * - Block drops
 * - Gift items (hero of the village)
 * - Archaeology (suspicious blocks)
 */
export interface BukkitLootTable {
  /**
   * Generate loot from this table.
   * 
   * Returns a mutable collection of items.
   * Does NOT place items anywhere - just generates them.
   * 
   * @param random Random instance for generation (null for default)
   * @param context Context with modifiers (location, luck, etc.)
   * @returns Collection of generated ItemStacks
   * 
   * @example
   * const items = lootTable.populateLoot(null, context);
   * const iter = items.iterator();
   * while (iter.hasNext()) {
   *   const item = iter.next();
   *   world.dropItemNaturally(location, item);
   * }
   */
  populateLoot(
    random: JavaRandom | null,
    context: BukkitLootContext
  ): JavaCollection<BukkitItemStack>;

  /**
   * Fill an inventory with loot from this table.
   * 
   * Items are distributed randomly across empty slots.
   * Convenient for filling chests, barrels, etc.
   * 
   * @param inventory Inventory to fill
   * @param random Random instance for generation (null for default)
   * @param context Context with modifiers
   * 
   * @example
   * // Fill a chest with dungeon loot
   * lootTable.fillInventory(chest.getInventory(), null, context);
   */
  fillInventory(
    inventory: BukkitInventory,
    random: JavaRandom | null,
    context: BukkitLootContext
  ): void;

    getKey(): BukkitNamespacedKey;

}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a LootTable.
 */
export function isLootTable(obj: any): obj is BukkitLootTable {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.populateLoot === "function" &&
         typeof obj.fillInventory === "function" &&
         typeof obj.getKey === "function";
}

// ============================================
// LOOT GENERATION UTILITIES
// ============================================

/**
 * Generate loot and return as array.
 * 
 * @param lootTable Loot table to use
 * @param context Loot context
 * @param random Optional random instance
 * @returns Array of ItemStacks
 * 
 * @example
 * const items = generateLootArray(zombieTable, context);
 * for (const item of items) {
 *   player.getInventory().addItem(item);
 * }
 */
export function generateLootArray(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): BukkitItemStack[] {
  const collection = lootTable.populateLoot(random ?? null, context);
  const result: BukkitItemStack[] = [];
  const iter = collection.iterator();
  
  while (iter.hasNext()) {
    result.push(iter.next());
  }
  
  return result;
}

/**
 * Generate loot and drop at location.
 * 
 * @param lootTable Loot table to use
 * @param context Loot context (location used for drops)
 * @param random Optional random instance
 * 
 * @example
 * dropLootAtLocation(zombieTable, context);
 */
export function dropLootAtLocation(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): void {
  const items = generateLootArray(lootTable, context, random);
  const location = context.getLocation();
  const world = location.getWorld();
  
  if (world === null) return;
  
  for (const item of items) {
    world.dropItemNaturally(location, item);
  }
}

/ ============================================
// UPDATED FUNCTION
// ============================================

/**
 * Generate loot and give to player.
 * 
 * Items that don't fit in inventory are dropped at player location.
 * 
 * @param lootTable Loot table to use
 * @param context Loot context
 * @param player Player to give items to
 * @param random Optional random instance
 * @returns Number of items that overflowed (were dropped)
 */
export function giveLootToPlayer(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  player: { getInventory(): BukkitInventory; getLocation(): any },
  random?: JavaRandom | null
): number {
  const items = generateLootArray(lootTable, context, random);
  const inventory = player.getInventory();
  let overflowCount = 0;
  
  for (const item of items) {
    const leftover = inventory.addItem(item);
    
    if (!isMapEmpty(leftover)) {
      const location = player.getLocation();
      const world = location.getWorld();
      
      if (world !== null) {
        const overflowItems = getMapValues<BukkitItemStack>(leftover);
        
        for (const overflowItem of overflowItems) {
          world.dropItemNaturally(location, overflowItem);
          overflowCount++;
        }
      }
    }
  }
  
  return overflowCount;
}

// ============================================
// LOOT ANALYSIS
// ============================================

/**
 * Count total item stacks that would be generated.
 * 
 * Note: This generates loot just to count it.
 */
export function countLootStacks(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): number {
  const collection = lootTable.populateLoot(random ?? null, context);
  return collection.size();
}

/**
 * Count total item amount (sum of stack sizes).
 */
export function countLootAmount(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): number {
  const items = generateLootArray(lootTable, context, random);
  let total = 0;
  
  for (const item of items) {
    total += item.getAmount();
  }
  
  return total;
}

/**
 * Check if loot table would generate any items.
 */
export function hasLoot(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): boolean {
  const collection = lootTable.populateLoot(random ?? null, context);
  return !collection.isEmpty();
}

/**
 * Check if loot table would generate no items.
 */
export function isEmptyLoot(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): boolean {
  return !hasLoot(lootTable, context, random);
}

// ============================================
// LOOT FILTERING
// ============================================

/**
 * Generate loot and filter by predicate.
 * 
 * @param lootTable Loot table to use
 * @param context Loot context
 * @param predicate Filter function
 * @param random Optional random instance
 * @returns Filtered items
 * 
 * @example
 * // Get only diamond items from loot
 * const diamonds = filterLoot(table, context, item => 
 *   item.getType().name().includes("DIAMOND")
 * );
 */
export function filterLoot(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  predicate: (item: BukkitItemStack) => boolean,
  random?: JavaRandom | null
): BukkitItemStack[] {
  const items = generateLootArray(lootTable, context, random);
  return items.filter(predicate);
}

/**
 * Generate loot and find first matching item.
 */
export function findLootItem(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  predicate: (item: BukkitItemStack) => boolean,
  random?: JavaRandom | null
): BukkitItemStack | null {
  const items = generateLootArray(lootTable, context, random);
  
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }
  }
  
  return null;
}

/**
 * Check if loot contains specific item type.
 */
export function lootContainsType(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  typeName: string,
  random?: JavaRandom | null
): boolean {
  return findLootItem(
    lootTable,
    context,
    item => item.getType().name() === typeName,
    random
  ) !== null;
}

/**
 * Group loot by item type.
 */
export function groupLootByType(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): Map<string, BukkitItemStack[]> {
  const items = generateLootArray(lootTable, context, random);
  const groups = new Map<string, BukkitItemStack[]>();
  
  for (const item of items) {
    const typeName = item.getType().name();
    
    if (!groups.has(typeName)) {
      groups.set(typeName, []);
    }
    
    groups.get(typeName)!.push(item);
  }
  
  return groups;
}

// ============================================
// INVENTORY FILLING
// ============================================

/**
 * Fill inventory and return list of added items.
 */
export function fillInventoryAndTrack(
  lootTable: BukkitLootTable,
  inventory: BukkitInventory,
  context: BukkitLootContext,
  random?: JavaRandom | null
): BukkitItemStack[] {
  /* Generate items first to track what was added */
  const items = generateLootArray(lootTable, context, random);
  
  /* Fill inventory with same random/context */
  lootTable.fillInventory(inventory, random ?? null, context);
  
  return items;
}

/**
 * Clear inventory and fill with loot.
 */
export function replaceInventoryWithLoot(
  lootTable: BukkitLootTable,
  inventory: BukkitInventory,
  context: BukkitLootContext,
  random?: JavaRandom | null
): void {
  inventory.clear();
  lootTable.fillInventory(inventory, random ?? null, context);
}

/**
 * Add loot to inventory without clearing.
 */
export function addLootToInventory(
  lootTable: BukkitLootTable,
  inventory: BukkitInventory,
  context: BukkitLootContext,
  random?: JavaRandom | null
): BukkitItemStack[] {
  const items = generateLootArray(lootTable, context, random);
  const overflow: BukkitItemStack[] = [];
  
  for (const item of items) {
    const leftover = inventory.addItem(item);
    
    /* Get overflow items from Java HashMap */
    const overflowItems = getMapValues<BukkitItemStack>(leftover);
    overflow.push(...overflowItems);
  }
  
  return overflow;
}

// ============================================
// LOOT TABLE INFO
// ============================================

/**
 * Get loot table key as string.
 */
export function getLootTableKeyString(lootTable: BukkitLootTable): string {
  return lootTable.getKey().toString();
}

/**
 * Get loot table namespace.
 */
export function getLootTableNamespace(lootTable: BukkitLootTable): string {
  return lootTable.getKey().getNamespace();
}

/**
 * Get loot table key name (without namespace).
 */
export function getLootTableName(lootTable: BukkitLootTable): string {
  return lootTable.getKey().getKey();
}

/**
 * Check if loot table is from vanilla Minecraft.
 */
export function isVanillaLootTable(lootTable: BukkitLootTable): boolean {
  return lootTable.getKey().getNamespace() === "minecraft";
}

/**
 * Check if loot table is custom (from plugin/datapack).
 */
export function isCustomLootTable(lootTable: BukkitLootTable): boolean {
  return !isVanillaLootTable(lootTable);
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a loot table.
 */
export function describeLootTable(lootTable: BukkitLootTable): string {
  const key = lootTable.getKey();
  const source = isVanillaLootTable(lootTable) ? "vanilla" : "custom";
  return `LootTable[${key.toString()}] (${source})`;
}

/**
 * Get loot table info as plain object.
 */
export function getLootTableInfo(lootTable: BukkitLootTable): {
  key: string;
  namespace: string;
  name: string;
  isVanilla: boolean;
} {
  const key = lootTable.getKey();
  
  return {
    key: key.toString(),
    namespace: key.getNamespace(),
    name: key.getKey(),
    isVanilla: key.getNamespace() === "minecraft",
  };
}

/**
 * Preview loot generation (for debugging).
 * 
 * @returns Summary of what would be generated
 */
export function previewLoot(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  random?: JavaRandom | null
): {
  stackCount: number;
  totalAmount: number;
  items: Array<{ type: string; amount: number }>;
  uniqueTypes: string[];
} {
  const items = generateLootArray(lootTable, context, random);
  const typeSet = new Set<string>();
  
  const itemList = items.map(item => {
    const type = item.getType().name();
    typeSet.add(type);
    return {
      type,
      amount: item.getAmount(),
    };
  });
  
  return {
    stackCount: items.length,
    totalAmount: items.reduce((sum, item) => sum + item.getAmount(), 0),
    items: itemList,
    uniqueTypes: Array.from(typeSet),
  };
}

/**
 * Compare loot from multiple generations.
 * 
 * Useful for testing loot table variance.
 * 
 * @param lootTable Loot table to test
 * @param context Loot context
 * @param iterations Number of times to generate
 * @returns Statistics about the loot
 */
export function analyzeLootDistribution(
  lootTable: BukkitLootTable,
  context: BukkitLootContext,
  iterations: number = 100
): {
  iterations: number;
  averageStacks: number;
  averageAmount: number;
  minStacks: number;
  maxStacks: number;
  typeCounts: Map<string, number>;
} {
  let totalStacks = 0;
  let totalAmount = 0;
  let minStacks = Number.MAX_VALUE;
  let maxStacks = 0;
  const typeCounts = new Map<string, number>();
  
  for (let i = 0; i < iterations; i++) {
    const items = generateLootArray(lootTable, context, null);
    
    totalStacks += items.length;
    
    if (items.length < minStacks) minStacks = items.length;
    if (items.length > maxStacks) maxStacks = items.length;
    
    for (const item of items) {
      totalAmount += item.getAmount();
      
      const type = item.getType().name();
      typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);
    }
  }
  
  return {
    iterations,
    averageStacks: totalStacks / iterations,
    averageAmount: totalAmount / iterations,
    minStacks: minStacks === Number.MAX_VALUE ? 0 : minStacks,
    maxStacks,
    typeCounts,
  };
}