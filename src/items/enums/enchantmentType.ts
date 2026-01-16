/**
 * DESIGN
 * ------
 * Enchantment represents magical enhancements that can be applied to items.
 * 
 * ENCHANTMENT SYSTEM:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    ENCHANTMENT                              │
 *   │                                                             │
 *   │   Key: minecraft:sharpness                                  │
 *   │   Levels: 1-5 (startLevel to maxLevel)                      │
 *   │   Applies to: Swords, Axes                                  │
 *   │   Conflicts with: Smite, Bane of Arthropods                 │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * HOW ENCHANTMENTS ARE OBTAINED:
 * - Enchanting table (random, level-based)
 * - Anvil (combine items or apply books)
 * - Enchanted books (loot, trading, fishing)
 * - Commands (/enchant, /give with NBT)
 * 
 * ENCHANTMENT CATEGORIES:
 * 
 *   PROTECTION (Armor)
 *   ├─ PROTECTION (general damage reduction)
 *   ├─ FIRE_PROTECTION (fire/lava)
 *   ├─ BLAST_PROTECTION (explosions)
 *   ├─ PROJECTILE_PROTECTION (arrows, etc.)
 *   └─ FEATHER_FALLING (fall damage, boots only)
 * 
 *   DAMAGE (Weapons)
 *   ├─ SHARPNESS (all mobs) ─┐
 *   ├─ SMITE (undead)        ├─ Mutually exclusive
 *   └─ BANE_OF_ARTHROPODS    ┘
 * 
 *   TOOL
 *   ├─ EFFICIENCY (mining speed)
 *   ├─ FORTUNE ──────────────┐
 *   │                        ├─ Mutually exclusive
 *   └─ SILK_TOUCH ───────────┘
 * 
 *   DURABILITY
 *   ├─ UNBREAKING (reduces durability loss)
 *   ├─ MENDING ──────────────┐
 *   │                        ├─ Mutually exclusive
 *   └─ INFINITY (bow) ───────┘
 * 
 * CURSE ENCHANTMENTS:
 * - BINDING_CURSE: Can't remove from armor slot
 * - VANISHING_CURSE: Item destroyed on death
 * 
 * NOTE: Enchantment is NOT a traditional enum in Bukkit.
 * It's a Registry-based class with static constants.
 * We still provide enum-like utilities for consistency.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/enchantments/Enchantment.html
 */

import { BukkitItemStack } from "../types/itemstack";
import { BukkitNamespacedKey } from "../types/namespacedKey";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All enchantment constant names.
 */
export type EnchantmentKey =
  /* Protection (Armor) */
  | "PROTECTION"
  | "FIRE_PROTECTION"
  | "BLAST_PROTECTION"
  | "PROJECTILE_PROTECTION"
  | "FEATHER_FALLING"
  /* Armor Utility */
  | "RESPIRATION"
  | "AQUA_AFFINITY"
  | "DEPTH_STRIDER"
  | "FROST_WALKER"
  | "SOUL_SPEED"
  | "SWIFT_SNEAK"
  /* Weapon Damage */
  | "SHARPNESS"
  | "SMITE"
  | "BANE_OF_ARTHROPODS"
  | "FIRE_ASPECT"
  | "KNOCKBACK"
  | "SWEEPING_EDGE"
  /* Tool */
  | "EFFICIENCY"
  | "SILK_TOUCH"
  | "FORTUNE"
  | "UNBREAKING"
  | "MENDING"
  /* Bow */
  | "POWER"
  | "PUNCH"
  | "FLAME"
  | "INFINITY"
  /* Crossbow */
  | "MULTISHOT"
  | "PIERCING"
  | "QUICK_CHARGE"
  /* Trident */
  | "LOYALTY"
  | "IMPALING"
  | "RIPTIDE"
  | "CHANNELING"
  /* Fishing Rod */
  | "LUCK_OF_THE_SEA"
  | "LURE"
  /* Mace (1.21+) */
  | "DENSITY"
  | "BREACH"
  | "WIND_BURST"
  /* Other */
  | "THORNS"
  | "BINDING_CURSE"
  | "VANISHING_CURSE"
  | "LUNGE";

/**
 * Enchantment interface.
 * 
 * NOTE: Enchantment is not a Java enum, but a Keyed registry entry.
 * It has similar patterns but uses getKey() instead of name().
 */
export interface BukkitEnchantment {
  /**
   * Get namespaced key (e.g., minecraft:sharpness).
   */
  getKey(): BukkitNamespacedKey;

  /**
   * Get legacy name.
   * 
   * @deprecated Use getKey() instead. Names are inconsistent.
   */
  getName(): string;

  /**
   * Get maximum enchantment level.
   * 
   * @example
   * Enchantment.SHARPNESS.getMaxLevel(); // 5
   * Enchantment.SILK_TOUCH.getMaxLevel(); // 1
   */
  getMaxLevel(): number;

  /**
   * Get starting/minimum level.
   * 
   * Usually 1 for all enchantments.
   */
  getStartLevel(): number;

  /**
   * Check if enchantment can be applied to item.
   * 
   * Considers item type, not existing enchantments.
   * 
   * @example
   * Enchantment.SHARPNESS.canEnchantItem(sword); // true
   * Enchantment.SHARPNESS.canEnchantItem(pickaxe); // false
   */
  canEnchantItem(item: BukkitItemStack): boolean;

  /**
   * Check if this enchantment conflicts with another.
   * 
   * Conflicting enchantments cannot coexist on same item.
   * 
   * @example
   * Enchantment.SHARPNESS.conflictsWith(Enchantment.SMITE); // true
   * Enchantment.SHARPNESS.conflictsWith(Enchantment.UNBREAKING); // false
   */
  conflictsWith(other: BukkitEnchantment): boolean;

  /**
   * String representation.
   */
  toString(): string;
}

/**
 * Enchantment class type (constants + utility methods).
 * 
 * NOTE: Unlike true enums, Enchantment doesn't have values()/valueOf().
 * We provide similar utilities via helper functions.
 */
export type EnchantmentClass = Record<EnchantmentKey, BukkitEnchantment>;

// ============================================
// ENUM EXPORT
// ============================================

/**
 * All Minecraft enchantments.
 * 
 * PROTECTION ENCHANTMENTS:
 * - PROTECTION: General damage reduction (max 4)
 * - FIRE_PROTECTION: Fire/lava damage reduction (max 4)
 * - BLAST_PROTECTION: Explosion damage reduction (max 4)
 * - PROJECTILE_PROTECTION: Arrow damage reduction (max 4)
 * - FEATHER_FALLING: Fall damage reduction, boots only (max 4)
 * 
 * ARMOR UTILITY:
 * - RESPIRATION: Underwater breathing (max 3)
 * - AQUA_AFFINITY: Underwater mining speed (max 1)
 * - DEPTH_STRIDER: Underwater movement (max 3)
 * - FROST_WALKER: Walk on water creates ice (max 2)
 * - SOUL_SPEED: Speed on soul sand (max 3)
 * - SWIFT_SNEAK: Sneaking speed (max 3)
 * 
 * DAMAGE ENCHANTMENTS (mutually exclusive):
 * - SHARPNESS: Damage to all mobs (max 5)
 * - SMITE: Damage to undead (max 5)
 * - BANE_OF_ARTHROPODS: Damage to spiders/insects (max 5)
 * 
 * WEAPON UTILITY:
 * - FIRE_ASPECT: Sets target on fire (max 2)
 * - KNOCKBACK: Knockback on hit (max 2)
 * - SWEEPING_EDGE: Sweep attack damage (max 3)
 * 
 * TOOL ENCHANTMENTS:
 * - EFFICIENCY: Mining speed (max 5)
 * - SILK_TOUCH: Blocks drop themselves (max 1)
 * - FORTUNE: Increased drops (max 3) - conflicts with Silk Touch
 * - UNBREAKING: Durability (max 3)
 * - MENDING: XP repairs item (max 1)
 * 
 * BOW ENCHANTMENTS:
 * - POWER: Arrow damage (max 5)
 * - PUNCH: Arrow knockback (max 2)
 * - FLAME: Fire arrows (max 1)
 * - INFINITY: Infinite arrows (max 1) - conflicts with Mending
 * 
 * CROSSBOW ENCHANTMENTS:
 * - MULTISHOT: 3 arrows at once (max 1) - conflicts with Piercing
 * - PIERCING: Arrows pierce entities (max 4)
 * - QUICK_CHARGE: Faster reload (max 3)
 * 
 * TRIDENT ENCHANTMENTS:
 * - LOYALTY: Returns after throwing (max 3) - conflicts with Riptide
 * - IMPALING: Damage to aquatic mobs (max 5)
 * - RIPTIDE: Propels player in water/rain (max 3)
 * - CHANNELING: Lightning on hit during storms (max 1)
 * 
 * FISHING ENCHANTMENTS:
 * - LUCK_OF_THE_SEA: Better loot (max 3)
 * - LURE: Faster catches (max 3)
 * 
 * MACE ENCHANTMENTS (1.21+):
 * - DENSITY: Increased fall damage dealt (max 5)
 * - BREACH: Reduces armor effectiveness (max 4)
 * - WIND_BURST: Wind knockback on hit (max 3)
 * 
 * OTHER:
 * - THORNS: Damages attackers (max 3)
 * - BINDING_CURSE: Cannot remove from armor slot
 * - VANISHING_CURSE: Destroyed on death
 * - LUNGE: Lunges forward on attack (max 3)
 */
export const Enchantment: EnchantmentClass = {
  /* ========== PROTECTION ========== */
  
  PROTECTION: org.bukkit.enchantments.Enchantment.PROTECTION,
  FIRE_PROTECTION: org.bukkit.enchantments.Enchantment.FIRE_PROTECTION,
  BLAST_PROTECTION: org.bukkit.enchantments.Enchantment.BLAST_PROTECTION,
  PROJECTILE_PROTECTION: org.bukkit.enchantments.Enchantment.PROJECTILE_PROTECTION,
  FEATHER_FALLING: org.bukkit.enchantments.Enchantment.FEATHER_FALLING,

  /* ========== ARMOR UTILITY ========== */

  RESPIRATION: org.bukkit.enchantments.Enchantment.RESPIRATION,
  AQUA_AFFINITY: org.bukkit.enchantments.Enchantment.AQUA_AFFINITY,
  DEPTH_STRIDER: org.bukkit.enchantments.Enchantment.DEPTH_STRIDER,
  FROST_WALKER: org.bukkit.enchantments.Enchantment.FROST_WALKER,
  SOUL_SPEED: org.bukkit.enchantments.Enchantment.SOUL_SPEED,
  SWIFT_SNEAK: org.bukkit.enchantments.Enchantment.SWIFT_SNEAK,

  /* ========== WEAPON DAMAGE ========== */

  SHARPNESS: org.bukkit.enchantments.Enchantment.SHARPNESS,
  SMITE: org.bukkit.enchantments.Enchantment.SMITE,
  BANE_OF_ARTHROPODS: org.bukkit.enchantments.Enchantment.BANE_OF_ARTHROPODS,
  FIRE_ASPECT: org.bukkit.enchantments.Enchantment.FIRE_ASPECT,
  KNOCKBACK: org.bukkit.enchantments.Enchantment.KNOCKBACK,
  SWEEPING_EDGE: org.bukkit.enchantments.Enchantment.SWEEPING_EDGE,

  /* ========== TOOL ========== */

  EFFICIENCY: org.bukkit.enchantments.Enchantment.EFFICIENCY,
  SILK_TOUCH: org.bukkit.enchantments.Enchantment.SILK_TOUCH,
  FORTUNE: org.bukkit.enchantments.Enchantment.FORTUNE,
  UNBREAKING: org.bukkit.enchantments.Enchantment.UNBREAKING,
  MENDING: org.bukkit.enchantments.Enchantment.MENDING,

  /* ========== BOW ========== */

  POWER: org.bukkit.enchantments.Enchantment.POWER,
  PUNCH: org.bukkit.enchantments.Enchantment.PUNCH,
  FLAME: org.bukkit.enchantments.Enchantment.FLAME,
  INFINITY: org.bukkit.enchantments.Enchantment.INFINITY,

  /* ========== CROSSBOW ========== */

  MULTISHOT: org.bukkit.enchantments.Enchantment.MULTISHOT,
  PIERCING: org.bukkit.enchantments.Enchantment.PIERCING,
  QUICK_CHARGE: org.bukkit.enchantments.Enchantment.QUICK_CHARGE,

  /* ========== TRIDENT ========== */

  LOYALTY: org.bukkit.enchantments.Enchantment.LOYALTY,
  IMPALING: org.bukkit.enchantments.Enchantment.IMPALING,
  RIPTIDE: org.bukkit.enchantments.Enchantment.RIPTIDE,
  CHANNELING: org.bukkit.enchantments.Enchantment.CHANNELING,

  /* ========== FISHING ========== */

  LUCK_OF_THE_SEA: org.bukkit.enchantments.Enchantment.LUCK_OF_THE_SEA,
  LURE: org.bukkit.enchantments.Enchantment.LURE,

  /* ========== MACE (1.21+) ========== */

  DENSITY: org.bukkit.enchantments.Enchantment.DENSITY,
  BREACH: org.bukkit.enchantments.Enchantment.BREACH,
  WIND_BURST: org.bukkit.enchantments.Enchantment.WIND_BURST,

  /* ========== OTHER ========== */

  THORNS: org.bukkit.enchantments.Enchantment.THORNS,
  BINDING_CURSE: org.bukkit.enchantments.Enchantment.BINDING_CURSE,
  VANISHING_CURSE: org.bukkit.enchantments.Enchantment.VANISHING_CURSE,
  LUNGE: org.bukkit.enchantments.Enchantment.LUNGE,
};

// ============================================
// ALL ENCHANTMENTS ARRAY
// ============================================

/**
 * Array of all enchantment keys.
 */
export const ENCHANTMENT_KEYS: EnchantmentKey[] = [
  /* Protection */
  "PROTECTION", "FIRE_PROTECTION", "BLAST_PROTECTION", "PROJECTILE_PROTECTION", "FEATHER_FALLING",
  /* Armor Utility */
  "RESPIRATION", "AQUA_AFFINITY", "DEPTH_STRIDER", "FROST_WALKER", "SOUL_SPEED", "SWIFT_SNEAK",
  /* Weapon Damage */
  "SHARPNESS", "SMITE", "BANE_OF_ARTHROPODS", "FIRE_ASPECT", "KNOCKBACK", "SWEEPING_EDGE",
  /* Tool */
  "EFFICIENCY", "SILK_TOUCH", "FORTUNE", "UNBREAKING", "MENDING",
  /* Bow */
  "POWER", "PUNCH", "FLAME", "INFINITY",
  /* Crossbow */
  "MULTISHOT", "PIERCING", "QUICK_CHARGE",
  /* Trident */
  "LOYALTY", "IMPALING", "RIPTIDE", "CHANNELING",
  /* Fishing */
  "LUCK_OF_THE_SEA", "LURE",
  /* Mace */
  "DENSITY", "BREACH", "WIND_BURST",
  /* Other */
  "THORNS", "BINDING_CURSE", "VANISHING_CURSE", "LUNGE",
];

// ============================================
// ENUM-LIKE UTILITIES
// ============================================

/**
 * Get all enchantment values.
 * 
 * NOTE: Unlike true enums, this builds the array from our constants.
 */
export function getEnchantmentValues(): BukkitEnchantment[] {
  return ENCHANTMENT_KEYS.map(key => Enchantment[key]);
}

/**
 * Get enchantment by key name.
 * 
 * @returns Enchantment or null if not found
 */
export function getEnchantmentByName(name: string): BukkitEnchantment | null {
  const upper = name.toUpperCase() as EnchantmentKey;
  return Enchantment[upper] ?? null;
}

/**
 * Get all enchantment key names.
 */
export function getEnchantmentNames(): EnchantmentKey[] {
  return [...ENCHANTMENT_KEYS];
}

/**
 * Check if string is valid enchantment key.
 */
export function isValidEnchantment(name: string): name is EnchantmentKey {
  return ENCHANTMENT_KEYS.includes(name.toUpperCase() as EnchantmentKey);
}

/**
 * Get enchantment by namespaced key.
 * 
 * @param key Key like "minecraft:sharpness" or "sharpness"
 */
export function getEnchantmentByKey(key: string): BukkitEnchantment | null {
  /* Remove namespace if present */
  const name = key.includes(":") ? key.split(":")[1] : key;
  return getEnchantmentByName(name.toUpperCase());
}

// ============================================
// CATEGORY SETS
// ============================================

/**
 * Protection enchantments (armor).
 */
export const PROTECTION_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "PROTECTION",
  "FIRE_PROTECTION",
  "BLAST_PROTECTION",
  "PROJECTILE_PROTECTION",
  "FEATHER_FALLING",
]);

/**
 * Damage enchantments (weapons) - mutually exclusive.
 */
export const DAMAGE_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "SHARPNESS",
  "SMITE",
  "BANE_OF_ARTHROPODS",
]);

/**
 * Tool enchantments.
 */
export const TOOL_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "EFFICIENCY",
  "SILK_TOUCH",
  "FORTUNE",
  "UNBREAKING",
  "MENDING",
]);

/**
 * Bow enchantments.
 */
export const BOW_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "POWER",
  "PUNCH",
  "FLAME",
  "INFINITY",
]);

/**
 * Crossbow enchantments.
 */
export const CROSSBOW_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "MULTISHOT",
  "PIERCING",
  "QUICK_CHARGE",
]);

/**
 * Trident enchantments.
 */
export const TRIDENT_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "LOYALTY",
  "IMPALING",
  "RIPTIDE",
  "CHANNELING",
]);

/**
 * Fishing rod enchantments.
 */
export const FISHING_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "LUCK_OF_THE_SEA",
  "LURE",
]);

/**
 * Mace enchantments (1.21+).
 */
export const MACE_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "DENSITY",
  "BREACH",
  "WIND_BURST",
]);

/**
 * Curse enchantments.
 */
export const CURSE_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "BINDING_CURSE",
  "VANISHING_CURSE",
]);

/**
 * Treasure enchantments (not from enchanting table).
 */
export const TREASURE_ENCHANTMENTS: Set<EnchantmentKey> = new Set([
  "FROST_WALKER",
  "SOUL_SPEED",
  "SWIFT_SNEAK",
  "MENDING",
  "BINDING_CURSE",
  "VANISHING_CURSE",
]);

// ============================================
// CATEGORY CHECKS
// ============================================

/**
 * Check if enchantment is a protection type.
 */
export function isProtectionEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && PROTECTION_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is a damage type.
 */
export function isDamageEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && DAMAGE_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is a tool type.
 */
export function isToolEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && TOOL_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is a curse.
 */
export function isCurse(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && CURSE_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is treasure-only (not from enchanting table).
 */
export function isTreasureEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && TREASURE_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is for bows.
 */
export function isBowEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && BOW_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is for crossbows.
 */
export function isCrossbowEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && CROSSBOW_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is for tridents.
 */
export function isTridentEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && TRIDENT_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is for fishing rods.
 */
export function isFishingEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && FISHING_ENCHANTMENTS.has(key);
}

/**
 * Check if enchantment is for mace.
 */
export function isMaceEnchantment(enchantment: BukkitEnchantment): boolean {
  const key = getEnchantmentKeyFromValue(enchantment);
  return key !== null && MACE_ENCHANTMENTS.has(key);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get EnchantmentKey from enchantment value.
 * 
 * @returns Key or null if not found
 */
export function getEnchantmentKeyFromValue(enchantment: BukkitEnchantment): EnchantmentKey | null {
  const keyName = enchantment.getKey().getKey().toUpperCase();
  
  if (ENCHANTMENT_KEYS.includes(keyName as EnchantmentKey)) {
    return keyName as EnchantmentKey;
  }
  
  return null;
}

/**
 * Get enchantment category.
 */
export function getEnchantmentCategory(enchantment: BukkitEnchantment):
  "protection" | "damage" | "tool" | "bow" | "crossbow" | "trident" | "fishing" | "mace" | "armor_utility" | "curse" | "other" {
  
  const key = getEnchantmentKeyFromValue(enchantment);
  if (key === null) return "other";
  
  if (PROTECTION_ENCHANTMENTS.has(key)) return "protection";
  if (DAMAGE_ENCHANTMENTS.has(key)) return "damage";
  if (TOOL_ENCHANTMENTS.has(key)) return "tool";
  if (BOW_ENCHANTMENTS.has(key)) return "bow";
  if (CROSSBOW_ENCHANTMENTS.has(key)) return "crossbow";
  if (TRIDENT_ENCHANTMENTS.has(key)) return "trident";
  if (FISHING_ENCHANTMENTS.has(key)) return "fishing";
  if (MACE_ENCHANTMENTS.has(key)) return "mace";
  if (CURSE_ENCHANTMENTS.has(key)) return "curse";
  
  /* Armor utility enchantments */
  const armorUtility: EnchantmentKey[] = [
    "RESPIRATION", "AQUA_AFFINITY", "DEPTH_STRIDER", 
    "FROST_WALKER", "SOUL_SPEED", "SWIFT_SNEAK"
  ];
  if (armorUtility.includes(key)) return "armor_utility";
  
  return "other";
}

/**
 * Check if two enchantments conflict.
 * 
 * Convenience wrapper around enchantment.conflictsWith().
 */
export function enchantmentsConflict(a: BukkitEnchantment, b: BukkitEnchantment): boolean {
  return a.conflictsWith(b);
}

/**
 * Check if enchantment can be applied at given level.
 */
export function isValidLevel(enchantment: BukkitEnchantment, level: number): boolean {
  return level >= enchantment.getStartLevel() && level <= enchantment.getMaxLevel();
}

/**
 * Get level range as string.
 * 
 * @example
 * getLevelRange(Enchantment.SHARPNESS); // "1-5"
 * getLevelRange(Enchantment.SILK_TOUCH); // "1"
 */
export function getLevelRange(enchantment: BukkitEnchantment): string {
  const start = enchantment.getStartLevel();
  const max = enchantment.getMaxLevel();
  
  return start === max ? `${start}` : `${start}-${max}`;
}

/**
 * Check if enchantment has only one level.
 */
export function isSingleLevel(enchantment: BukkitEnchantment): boolean {
  return enchantment.getStartLevel() === enchantment.getMaxLevel();
}

/**
 * Get all enchantments that can be applied to item.
 */
export function getApplicableEnchantments(item: BukkitItemStack): BukkitEnchantment[] {
  return getEnchantmentValues().filter(ench => ench.canEnchantItem(item));
}

/**
 * Get all enchantments that don't conflict with given enchantment.
 */
export function getNonConflicting(enchantment: BukkitEnchantment): BukkitEnchantment[] {
  return getEnchantmentValues().filter(ench => !ench.conflictsWith(enchantment));
}

/**
 * Get all enchantments that conflict with given enchantment.
 */
export function getConflicting(enchantment: BukkitEnchantment): BukkitEnchantment[] {
  return getEnchantmentValues().filter(ench => ench.conflictsWith(enchantment));
}

/**
 * Get human-readable enchantment name.
 * 
 * @example
 * formatEnchantmentName(Enchantment.BANE_OF_ARTHROPODS);
 * // "Bane of Arthropods"
 */
export function formatEnchantmentName(enchantment: BukkitEnchantment): string {
  const key = enchantment.getKey().getKey();
  return key
    .split("_")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get enchantment display string with level.
 * 
 * @example
 * formatEnchantmentWithLevel(Enchantment.SHARPNESS, 5);
 * // "Sharpness V"
 */
export function formatEnchantmentWithLevel(enchantment: BukkitEnchantment, level: number): string {
  const name = formatEnchantmentName(enchantment);
  const roman = toRomanNumeral(level);
  return `${name} ${roman}`;
}

/**
 * Convert number to Roman numeral (1-10).
 */
function toRomanNumeral(num: number): string {
  const numerals: Record<number, string> = {
    1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
    6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X"
  };
  return numerals[num] ?? String(num);
}

/**
 * Describe enchantment in detail.
 */
export function describeEnchantment(enchantment: BukkitEnchantment): string {
  const name = formatEnchantmentName(enchantment);
  const levels = getLevelRange(enchantment);
  const category = getEnchantmentCategory(enchantment);
  const isCurseEnch = isCurse(enchantment);
  const isTreasure = isTreasureEnchantment(enchantment);
  
  let desc = `${name} (${category}, level ${levels})`;
  
  if (isCurseEnch) desc += " [CURSE]";
  if (isTreasure) desc += " [TREASURE]";
  
  return desc;
}