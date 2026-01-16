/**
 * DESIGN
 * ------
 * Lootable represents containers or mobs that can have a loot table attached.
 * 
 * LOOTABLE CONCEPT:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    LOOTABLE ENTITIES                        │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                    CONTAINERS                       │   │
 *   │   │                                                     │   │
 *   │   │   📦 Chest      - Dungeon, mineshaft, temple        │   │
 *   │   │   🛢️ Barrel     - Village loot                      │   │
 *   │   │   📥 Hopper     - Structure loot                    │   │
 *   │   │   🎁 Shulker    - End city loot                     │   │
 *   │   │   ⛏️ Suspicious - Archaeology loot                  │   │
 *   │   │                                                     │   │
 *   │   │   Loot generates when FIRST OPENED                  │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                      MOBS                           │   │
 *   │   │                                                     │   │
 *   │   │   🧟 Zombie     - Rotten flesh, iron, carrots       │   │
 *   │   │   💀 Skeleton   - Bones, arrows, bow                │   │
 *   │   │   🐉 Dragon     - XP, dragon egg (first kill)       │   │
 *   │   │   🐷 Pig        - Raw porkchop                      │   │
 *   │   │   🐄 Cow        - Leather, raw beef                 │   │
 *   │   │                                                     │   │
 *   │   │   Loot generates upon DEATH                         │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * LOOT TABLE LIFECYCLE:
 * 
 *   Container:
 *   ┌──────────┐     ┌──────────┐     ┌──────────┐
 *   │ Placed/  │ ──► │  Player  │ ──► │  Loot    │
 *   │ Generated│     │  Opens   │     │ Generated│
 *   └──────────┘     └──────────┘     └──────────┘
 *                                           │
 *                                           ▼
 *                                     LootTable = null
 *                                     (won't regenerate)
 * 
 *   Mob:
 *   ┌──────────┐     ┌──────────┐     ┌──────────┐
 *   │  Mob     │ ──► │   Mob    │ ──► │  Loot    │
 *   │  Spawns  │     │   Dies   │     │  Drops   │
 *   └──────────┘     └──────────┘     └──────────┘
 * 
 * SEED:
 * - Seed affects random generation
 * - Same seed + same table = same loot
 * - Seed 0 = use random seed
 * - Useful for synchronized loot across instances
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/loot/Lootable.html
 */

import { BukkitLootTable } from "./lootTables";


// ============================================
// INTERFACE
// ============================================

/**
 * Represents a container or mob that can have a loot table.
 * 
 * - Containers: Loot generates when first opened
 * - Mobs: Loot generates upon death
 * 
 * Once loot is generated, the loot table is consumed (set to null).
 */
export interface BukkitLootable {
  /**
   * Get the attached loot table.
   * 
   * Returns null if:
   * - No loot table was ever set
   * - Loot has already been generated (consumed)
   * 
   * @returns LootTable or null
   * 
   * @example
   * const table = chest.getLootTable();
   * if (table !== null) {
   *   console.log(`Loot table: ${table.getKey()}`);
   *   console.log("Chest has unopened loot!");
   * }
   */
  getLootTable(): BukkitLootTable | null;

  /**
   * Set the loot table.
   * 
   * Pass null to remove the loot table.
   * 
   * @param table LootTable to set, or null to remove
   * 
   * @example
   * // Set custom loot table
   * const table = Bukkit.getLootTable(key);
   * chest.setLootTable(table);
   * 
   * // Remove loot table (chest will be empty)
   * chest.setLootTable(null);
   */
  setLootTable(table: BukkitLootTable | null): void;

  /**
   * Get the loot table seed.
   * 
   * The seed affects random loot generation.
   * Same seed + same table = same loot.
   * 
   * @returns Seed value (0 = random)
   * 
   * @example
   * const seed = chest.getSeed();
   * if (seed !== 0) {
   *   console.log(`Fixed seed: ${seed}`);
   * }
   */
  getSeed(): number;

  /**
   * Set the loot table seed.
   * 
   * Use 0 for random seed (default behavior).
   * Use a fixed seed for reproducible loot.
   * 
   * @param seed Seed value (0 = random)
   * 
   * @example
   * // Fixed seed for testing
   * chest.setSeed(12345);
   * 
   * // Random seed (default)
   * chest.setSeed(0);
   */
  setSeed(seed: number): void;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is Lootable.
 * 
 * @example
 * if (isLootable(entity)) {
 *   const table = entity.getLootTable();
 * }
 */
export function isLootable(obj: any): obj is BukkitLootable {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getLootTable === "function" &&
         typeof obj.setLootTable === "function" &&
         typeof obj.getSeed === "function" &&
         typeof obj.setSeed === "function";
}

// ============================================
// LOOT TABLE UTILITIES
// ============================================

/**
 * Check if lootable has a loot table set.
 * 
 * @example
 * if (hasLootTable(chest)) {
 *   console.log("Chest has unopened loot!");
 * }
 */
export function hasLootTable(lootable: BukkitLootable): boolean {
  return lootable.getLootTable() !== null;
}

/**
 * Check if lootable has already been looted (no table).
 */
export function isLooted(lootable: BukkitLootable): boolean {
  return lootable.getLootTable() === null;
}

/**
 * Remove loot table from lootable.
 * 
 * Useful to prevent loot generation.
 * 
 * @example
 * // Prevent chest from generating loot
 * clearLootTable(chest);
 */
export function clearLootTable(lootable: BukkitLootable): void {
  lootable.setLootTable(null);
}

/**
 * Copy loot table from one lootable to another.
 * 
 * @param source Source lootable
 * @param target Target lootable
 * @param copySeed Whether to copy the seed too
 * 
 * @example
 * // Copy loot table from one chest to another
 * copyLootTable(sourceChest, targetChest, true);
 */
export function copyLootTable(
  source: BukkitLootable,
  target: BukkitLootable,
  copySeed: boolean = true
): void {
  target.setLootTable(source.getLootTable());
  
  if (copySeed) {
    target.setSeed(source.getSeed());
  }
}

/**
 * Set loot table with seed in one call.
 * 
 * @param lootable Target lootable
 * @param table LootTable to set
 * @param seed Seed value
 * 
 * @example
 * setLootTableWithSeed(chest, dungeonTable, 12345);
 */
export function setLootTableWithSeed(
  lootable: BukkitLootable,
  table: BukkitLootTable | null,
  seed: number
): void {
  lootable.setLootTable(table);
  lootable.setSeed(seed);
}

// ============================================
// SEED UTILITIES
// ============================================

/**
 * Check if lootable has a fixed seed (non-zero).
 */
export function hasFixedSeed(lootable: BukkitLootable): boolean {
  return lootable.getSeed() !== 0;
}

/**
 * Check if lootable uses random seed (zero).
 */
export function usesRandomSeed(lootable: BukkitLootable): boolean {
  return lootable.getSeed() === 0;
}

/**
 * Reset seed to random (0).
 */
export function resetSeed(lootable: BukkitLootable): void {
  lootable.setSeed(0);
}

/**
 * Set seed from string hash.
 * 
 * Same string = same seed = same loot.
 * 
 * @example
 * // Seed from player name for consistent loot
 * setSeedFromString(chest, player.getName());
 */
export function setSeedFromString(lootable: BukkitLootable, str: string): void {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; /* Convert to 32-bit integer */
  }
  lootable.setSeed(hash);
}

/**
 * Set seed from current time.
 * 
 * Creates a unique but reproducible seed.
 */
export function setSeedFromTime(lootable: BukkitLootable): void {
  lootable.setSeed(Date.now());
}

/**
 * Set seed from location coordinates.
 * 
 * Same location = same seed.
 * Useful for world-based consistent loot.
 * 
 * @example
 * setSeedFromLocation(chest, chest.getLocation());
 */
export function setSeedFromLocation(
  lootable: BukkitLootable,
  location: { getBlockX(): number; getBlockY(): number; getBlockZ(): number }
): void {
  const x = location.getBlockX();
  const y = location.getBlockY();
  const z = location.getBlockZ();
  
  /* Simple hash from coordinates */
  const seed = x * 73856093 ^ y * 19349663 ^ z * 83492791;
  lootable.setSeed(seed);
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Set same loot table on multiple lootables.
 * 
 * @param lootables Array of lootables
 * @param table LootTable to set
 * 
 * @example
 * const chests = [chest1, chest2, chest3];
 * setLootTableBatch(chests, dungeonTable);
 */
export function setLootTableBatch(
  lootables: BukkitLootable[],
  table: BukkitLootTable | null
): void {
  for (const lootable of lootables) {
    lootable.setLootTable(table);
  }
}

/**
 * Clear loot tables from multiple lootables.
 */
export function clearLootTableBatch(lootables: BukkitLootable[]): void {
  setLootTableBatch(lootables, null);
}

/**
 * Set loot table with unique seed per lootable.
 * 
 * Each lootable gets a different seed based on index.
 * 
 * @param lootables Array of lootables
 * @param table LootTable to set
 * @param baseSeed Base seed (each lootable gets baseSeed + index)
 */
export function setLootTableWithUniqueSeed(
  lootables: BukkitLootable[],
  table: BukkitLootTable | null,
  baseSeed: number = Date.now()
): void {
  for (let i = 0; i < lootables.length; i++) {
    lootables[i].setLootTable(table);
    lootables[i].setSeed(baseSeed + i);
  }
}

/**
 * Filter lootables that have loot tables.
 */
export function filterWithLootTable(lootables: BukkitLootable[]): BukkitLootable[] {
  return lootables.filter(l => hasLootTable(l));
}

/**
 * Filter lootables that have been looted.
 */
export function filterLooted(lootables: BukkitLootable[]): BukkitLootable[] {
  return lootables.filter(l => isLooted(l));
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a lootable's loot table status.
 */
export function describeLootable(lootable: BukkitLootable): string {
  const table = lootable.getLootTable();
  
  if (table === null) {
    return "No loot table (empty or already looted)";
  }
  
  const seed = lootable.getSeed();
  const seedStr = seed === 0 ? "random" : seed.toString();
  
  return `LootTable: ${table.getKey().toString()}, Seed: ${seedStr}`;
}

/**
 * Get lootable info as plain object.
 */
export function getLootableInfo(lootable: BukkitLootable): {
  hasLootTable: boolean;
  lootTableKey: string | null;
  seed: number;
  hasFixedSeed: boolean;
} {
  const table = lootable.getLootTable();
  const seed = lootable.getSeed();
  
  return {
    hasLootTable: table !== null,
    lootTableKey: table?.getKey().toString() ?? null,
    seed: seed,
    hasFixedSeed: seed !== 0,
  };
}

/**
 * Get summary of multiple lootables.
 */
export function getLootableSummary(lootables: BukkitLootable[]): {
  total: number;
  withLootTable: number;
  looted: number;
  withFixedSeed: number;
} {
  let withLootTable = 0;
  let looted = 0;
  let withFixedSeed = 0;
  
  for (const lootable of lootables) {
    if (hasLootTable(lootable)) {
      withLootTable++;
    } else {
      looted++;
    }
    
    if (hasFixedSeed(lootable)) {
      withFixedSeed++;
    }
  }
  
  return {
    total: lootables.length,
    withLootTable,
    looted,
    withFixedSeed,
  };
}