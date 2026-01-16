/**
 * DESIGN
 * ------
 * EntityEquipment manages armor and held items for any LivingEntity.
 * 
 * DIFFERENCE FROM PlayerInventory:
 * - PlayerInventory: Full 41-slot inventory (hotbar, storage, armor, offhand)
 * - EntityEquipment: Just equipment slots (hands + armor + body)
 * 
 * WHY SEPARATE INTERFACE:
 * Mobs (zombies, skeletons, etc.) don't have full inventories.
 * They only have equipment slots. EntityEquipment provides access
 * to just those slots without the complexity of full inventory.
 * 
 * DROP CHANCES:
 * Unique to EntityEquipment. Controls probability of items dropping
 * when mob dies. Players don't have drop chances (always drop on death
 * unless keepInventory gamerule).
 * 
 * Values:
 * - 0.0: Never drops
 * - 1.0: Always drops
 * - Default for naturally spawned mobs: 0.085 (8.5%)
 * 
 * SILENT PARAMETER:
 * Many setters have optional `silent` parameter. When true, the
 * equip sound (armor clink) is not played. Useful for:
 * - Spawning pre-equipped mobs without sound spam
 * - Programmatic equipment changes that shouldn't alert players
 * 
 * BODY SLOT:
 * Added for entities like horses (horse armor), wolves (wolf armor),
 * and llamas (carpets). Not all entities use this slot.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/EntityEquipment.html
 */

import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitEntity } from "./bukkitEntity";

// ============================================
// EQUIPMENT SLOT ENUM
// ============================================

/**
 * Represents a slot where equipment can be worn or held.
 */
export interface BukkitEquipmentSlot {
  /**
   * Enum constant name.
   */
  name(): string;

  /**
   * Enum ordinal position.
   */
  ordinal(): number;
}

/**
 * All equipment slot names.
 */
export type EquipmentSlotKey =
  | "HAND"
  | "OFF_HAND"
  | "FEET"
  | "LEGS"
  | "CHEST"
  | "HEAD"
  | "BODY";

/**
 * Equipment slot enum values.
 * 
 * SLOT PURPOSES:
 * - HAND: Main hand (weapon, tool)
 * - OFF_HAND: Off hand (shield, torch, totem)
 * - FEET: Boots
 * - LEGS: Leggings
 * - CHEST: Chestplate / Elytra
 * - HEAD: Helmet / Carved pumpkin / Mob heads
 * - BODY: Horse armor, wolf armor, llama carpet
 */
export const EquipmentSlot: Record<EquipmentSlotKey, BukkitEquipmentSlot> = {
  /** Main hand (right hand for most players). */
  HAND: org.bukkit.inventory.EquipmentSlot.HAND,

  /** Off hand (left hand, shield slot). */
  OFF_HAND: org.bukkit.inventory.EquipmentSlot.OFF_HAND,

  /** Feet slot (boots). */
  FEET: org.bukkit.inventory.EquipmentSlot.FEET,

  /** Legs slot (leggings). */
  LEGS: org.bukkit.inventory.EquipmentSlot.LEGS,

  /** Chest slot (chestplate, elytra). */
  CHEST: org.bukkit.inventory.EquipmentSlot.CHEST,

  /** Head slot (helmet, carved pumpkin, mob heads). */
  HEAD: org.bukkit.inventory.EquipmentSlot.HEAD,

  /** 
   * Body slot for animals.
   * 
   * Used by:
   * - Horses: Horse armor
   * - Wolves: Wolf armor
   * - Llamas: Carpet
   */
  BODY: org.bukkit.inventory.EquipmentSlot.BODY,
};

// ============================================
// DEFAULT DROP CHANCES
// ============================================

/**
 * Default drop chance values used by Minecraft.
 * 
 * WHY CONSTANTS:
 * These magic numbers appear in Minecraft's code.
 * Having named constants makes intent clear.
 */
export const DropChance = {
  /** Never drops (0%). */
  NEVER: 0.0,
  
  /** Always drops (100%). */
  ALWAYS: 1.0,
  
  /** Default for naturally spawned mob equipment (8.5%). */
  DEFAULT_MOB: 0.085,
  
  /** 
   * Special value indicating equipment was picked up.
   * 
   * WHY 2.0:
   * Minecraft uses values > 1.0 internally to track
   * equipment that was picked up vs spawned with.
   * Picked up equipment always drops.
   */
  PICKED_UP: 2.0,
} as const;

// ============================================
// ENTITY EQUIPMENT INTERFACE
// ============================================

export interface BukkitEntityEquipment {

  // ==========================================
  // GENERIC SLOT ACCESS
  // ==========================================

  /**
   * Get item at equipment slot.
   * 
   * @param slot Equipment slot to query
   * @returns ItemStack or null if empty
   */
  getItem(slot: BukkitEquipmentSlot): BukkitItemStack | null;

  /**
   * Set item at equipment slot.
   * 
   * @param slot Equipment slot
   * @param item Item to equip, or null to clear
   */
  setItem(slot: BukkitEquipmentSlot, item: BukkitItemStack | null): void;

  /**
   * Set item at equipment slot with optional silence.
   * 
   * @param slot Equipment slot
   * @param item Item to equip, or null to clear
   * @param silent If true, don't play equip sound
   */
  setItem(slot: BukkitEquipmentSlot, item: BukkitItemStack | null, silent: boolean): void;

  // ==========================================
  // HAND SLOTS
  // ==========================================

  /**
   * Get item in main hand.
   * 
   * NOTE: Returns COPY. Modifications don't affect actual equipment.
   * 
   * @returns Currently held item (never null, returns air if empty)
   */
  getItemInMainHand(): BukkitItemStack;

  /**
   * Set item in main hand.
   */
  setItemInMainHand(item: BukkitItemStack | null): void;

  /**
   * Set item in main hand with optional silence.
   */
  setItemInMainHand(item: BukkitItemStack | null, silent: boolean): void;

  /**
   * Get item in off hand.
   * 
   * NOTE: Returns COPY.
   * 
   * @returns Item in off hand (never null, returns air if empty)
   */
  getItemInOffHand(): BukkitItemStack;

  /**
   * Set item in off hand.
   */
  setItemInOffHand(item: BukkitItemStack | null): void;

  /**
   * Set item in off hand with optional silence.
   */
  setItemInOffHand(item: BukkitItemStack | null, silent: boolean): void;

  /**
   * Get item in main hand.
   * 
   * @deprecated Since 1.9. Use getItemInMainHand() or getItemInOffHand().
   */
  getItemInHand(): BukkitItemStack;

  /**
   * Set item in main hand.
   * 
   * @deprecated Since 1.9. Use setItemInMainHand() or setItemInOffHand().
   */
  setItemInHand(stack: BukkitItemStack | null): void;

  // ==========================================
  // ARMOR SLOTS
  // ==========================================

  /**
   * Get helmet.
   * 
   * @returns Helmet or null if not wearing one
   */
  getHelmet(): BukkitItemStack | null;

  /**
   * Set helmet.
   * 
   * NOTE: Does NOT validate item type. You can put any item here.
   */
  setHelmet(helmet: BukkitItemStack | null): void;

  /**
   * Set helmet with optional silence.
   */
  setHelmet(helmet: BukkitItemStack | null, silent: boolean): void;

  /**
   * Get chestplate.
   */
  getChestplate(): BukkitItemStack | null;

  /**
   * Set chestplate.
   */
  setChestplate(chestplate: BukkitItemStack | null): void;

  /**
   * Set chestplate with optional silence.
   */
  setChestplate(chestplate: BukkitItemStack | null, silent: boolean): void;

  /**
   * Get leggings.
   */
  getLeggings(): BukkitItemStack | null;

  /**
   * Set leggings.
   */
  setLeggings(leggings: BukkitItemStack | null): void;

  /**
   * Set leggings with optional silence.
   */
  setLeggings(leggings: BukkitItemStack | null, silent: boolean): void;

  /**
   * Get boots.
   */
  getBoots(): BukkitItemStack | null;

  /**
   * Set boots.
   */
  setBoots(boots: BukkitItemStack | null): void;

  /**
   * Set boots with optional silence.
   */
  setBoots(boots: BukkitItemStack | null, silent: boolean): void;

  /**
   * Get all armor pieces as array.
   * 
   * ORDER: [boots, leggings, chestplate, helmet]
   * Individual items may be null.
   */
  getArmorContents(): (BukkitItemStack | null)[];

  /**
   * Set all armor at once.
   * 
   * @param items Array in order [boots, leggings, chestplate, helmet]
   */
  setArmorContents(items: (BukkitItemStack | null)[]): void;

  // ==========================================
  // CLEAR
  // ==========================================

  /**
   * Remove all equipment (armor + hands).
   * 
   * WHY: Quick way to strip a mob of everything.
   */
  clear(): void;

  // ==========================================
  // DROP CHANCES
  // ==========================================

  /*
   * Drop chances control probability of equipment dropping on death.
   * 
   * RANGE: 0.0 (never) to 1.0 (always)
   * 
   * SPECIAL VALUES:
   * - Values > 1.0 indicate picked-up equipment (always drops)
   * - Default for spawned mobs: 0.085 (8.5%)
   * 
   * NOTE: Only applies to mobs, not players.
   */

  /** Get main hand drop chance. */
  getItemInMainHandDropChance(): number;

  /** Set main hand drop chance. */
  setItemInMainHandDropChance(chance: number): void;

  /** Get off hand drop chance. */
  getItemInOffHandDropChance(): number;

  /** Set off hand drop chance. */
  setItemInOffHandDropChance(chance: number): void;

  /**
   * @deprecated Since 1.9. Use getItemInMainHandDropChance().
   */
  getItemInHandDropChance(): number;

  /**
   * @deprecated Since 1.9. Use setItemInMainHandDropChance().
   */
  setItemInHandDropChance(chance: number): void;

  /** Get helmet drop chance. */
  getHelmetDropChance(): number;

  /** Set helmet drop chance. */
  setHelmetDropChance(chance: number): void;

  /** Get chestplate drop chance. */
  getChestplateDropChance(): number;

  /** Set chestplate drop chance. */
  setChestplateDropChance(chance: number): void;

  /** Get leggings drop chance. */
  getLeggingsDropChance(): number;

  /** Set leggings drop chance. */
  setLeggingsDropChance(chance: number): void;

  /** Get boots drop chance. */
  getBootsDropChance(): number;

  /** Set boots drop chance. */
  setBootsDropChance(chance: number): void;

  // ==========================================
  // HOLDER
  // ==========================================

  /**
   * Get entity this equipment belongs to.
   * 
   * @returns The owning entity (never null)
   */
  getHolder(): BukkitEntity;
}

// ============================================
// ARMOR VALUE TABLE
// ============================================

/**
 * Armor protection values by material.
 * 
 * WHY CONSTANT TABLE:
 * These values are from Minecraft's code. Having them here
 * allows calculating total armor points without reflection.
 * 
 * TOTAL PROTECTION:
 * - Leather: 7
 * - Gold: 11
 * - Chainmail: 12
 * - Iron: 15
 * - Diamond: 20
 * - Netherite: 20
 */
export const ArmorValues: Record<string, number> = {
  /* Leather (total: 7) */
  LEATHER_HELMET: 1,
  LEATHER_CHESTPLATE: 3,
  LEATHER_LEGGINGS: 2,
  LEATHER_BOOTS: 1,

  /* Gold (total: 11) */
  GOLDEN_HELMET: 2,
  GOLDEN_CHESTPLATE: 5,
  GOLDEN_LEGGINGS: 3,
  GOLDEN_BOOTS: 1,

  /* Chainmail (total: 12) */
  CHAINMAIL_HELMET: 2,
  CHAINMAIL_CHESTPLATE: 5,
  CHAINMAIL_LEGGINGS: 4,
  CHAINMAIL_BOOTS: 1,

  /* Iron (total: 15) */
  IRON_HELMET: 2,
  IRON_CHESTPLATE: 6,
  IRON_LEGGINGS: 5,
  IRON_BOOTS: 2,

  /* Diamond (total: 20) */
  DIAMOND_HELMET: 3,
  DIAMOND_CHESTPLATE: 8,
  DIAMOND_LEGGINGS: 6,
  DIAMOND_BOOTS: 3,

  /* Netherite (total: 20, same as diamond but with knockback resistance) */
  NETHERITE_HELMET: 3,
  NETHERITE_CHESTPLATE: 8,
  NETHERITE_LEGGINGS: 6,
  NETHERITE_BOOTS: 3,

  /* Special */
  TURTLE_HELMET: 2,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Equip full armor set silently.
 * 
 * WHY: Common operation when spawning equipped mobs.
 * Silent prevents sound spam when equipping many mobs.
 * 
 * @example
 * const zombie = world.spawnEntity(loc, EntityType.ZOMBIE) as BukkitLivingEntity;
 * equipFullArmor(
 *   zombie.getEquipment()!,
 *   diamondHelmet,
 *   diamondChestplate,
 *   diamondLeggings,
 *   diamondBoots,
 *   true // silent
 * );
 */
export function equipFullArmor(
  equipment: BukkitEntityEquipment,
  helmet: BukkitItemStack | null,
  chestplate: BukkitItemStack | null,
  leggings: BukkitItemStack | null,
  boots: BukkitItemStack | null,
  silent: boolean = false
): void {
  equipment.setHelmet(helmet, silent);
  equipment.setChestplate(chestplate, silent);
  equipment.setLeggings(leggings, silent);
  equipment.setBoots(boots, silent);
}

/**
 * Set all armor drop chances to same value.
 * 
 * @example
 * // Armor never drops
 * setAllArmorDropChances(zombie.getEquipment()!, DropChance.NEVER);
 * 
 * // Armor always drops (good for custom mobs with guaranteed loot)
 * setAllArmorDropChances(zombie.getEquipment()!, DropChance.ALWAYS);
 */
export function setAllArmorDropChances(
  equipment: BukkitEntityEquipment,
  chance: number
): void {
  equipment.setHelmetDropChance(chance);
  equipment.setChestplateDropChance(chance);
  equipment.setLeggingsDropChance(chance);
  equipment.setBootsDropChance(chance);
}

/**
 * Set ALL equipment drop chances (armor + hands).
 * 
 * @example
 * // Nothing drops from this mob
 * setAllDropChances(zombie.getEquipment()!, DropChance.NEVER);
 */
export function setAllDropChances(
  equipment: BukkitEntityEquipment,
  chance: number
): void {
  setAllArmorDropChances(equipment, chance);
  equipment.setItemInMainHandDropChance(chance);
  equipment.setItemInOffHandDropChance(chance);
}

/**
 * Check if item is air (empty slot).
 * 
 * WHY HELPER:
 * getItemInMainHand() returns air instead of null.
 * This helper handles both cases.
 */
function isAirOrNull(item: BukkitItemStack | null): boolean {
  if (item === null) return true;
  
  const typeName = item.getType().name();
  return typeName === "AIR" || typeName === "CAVE_AIR" || typeName === "VOID_AIR";
}

/**
 * Check if entity has any equipment.
 * 
 * @example
 * if (hasAnyEquipment(zombie.getEquipment()!)) {
 *   console.log("This zombie is geared up!");
 * }
 */
export function hasAnyEquipment(equipment: BukkitEntityEquipment): boolean {
  /* Check hands */
  if (!isAirOrNull(equipment.getItemInMainHand())) return true;
  if (!isAirOrNull(equipment.getItemInOffHand())) return true;
  
  /* Check armor */
  if (!isAirOrNull(equipment.getHelmet())) return true;
  if (!isAirOrNull(equipment.getChestplate())) return true;
  if (!isAirOrNull(equipment.getLeggings())) return true;
  if (!isAirOrNull(equipment.getBoots())) return true;
  
  return false;
}

/**
 * Check if entity has full armor set.
 * 
 * @example
 * if (hasFullArmor(player.getEquipment()!)) {
 *   player.sendMessage("You're fully protected!");
 * }
 */
export function hasFullArmor(equipment: BukkitEntityEquipment): boolean {
  return !isAirOrNull(equipment.getHelmet())
      && !isAirOrNull(equipment.getChestplate())
      && !isAirOrNull(equipment.getLeggings())
      && !isAirOrNull(equipment.getBoots());
}

/**
 * Check if entity has no armor.
 */
export function hasNoArmor(equipment: BukkitEntityEquipment): boolean {
  return isAirOrNull(equipment.getHelmet())
      && isAirOrNull(equipment.getChestplate())
      && isAirOrNull(equipment.getLeggings())
      && isAirOrNull(equipment.getBoots());
}

/**
 * Get total armor points from equipped armor.
 * 
 * NOTE: Simplified calculation. Does NOT account for:
 * - Protection enchantment
 * - Armor toughness (diamond/netherite bonus)
 * - Custom armor attributes
 * 
 * @returns Armor points (0-20 for vanilla armor)
 * 
 * @example
 * const points = getTotalArmorPoints(player.getEquipment()!);
 * player.sendMessage(`Armor: ${points}/20`);
 */
export function getTotalArmorPoints(equipment: BukkitEntityEquipment): number {
  let total = 0;

  const pieces = [
    equipment.getHelmet(),
    equipment.getChestplate(),
    equipment.getLeggings(),
    equipment.getBoots(),
  ];

  for (const piece of pieces) {
    if (piece !== null) {
      const typeName = piece.getType().name();
      const value = ArmorValues[typeName];
      if (value !== undefined) {
        total += value;
      }
    }
  }

  return total;
}

/**
 * Get equipped armor pieces (non-null only).
 * 
 * @returns Array of equipped armor (0-4 items)
 */
export function getEquippedArmor(equipment: BukkitEntityEquipment): BukkitItemStack[] {
  const result: BukkitItemStack[] = [];
  
  const helmet = equipment.getHelmet();
  const chest = equipment.getChestplate();
  const legs = equipment.getLeggings();
  const boots = equipment.getBoots();
  
  if (!isAirOrNull(helmet)) result.push(helmet!);
  if (!isAirOrNull(chest)) result.push(chest!);
  if (!isAirOrNull(legs)) result.push(legs!);
  if (!isAirOrNull(boots)) result.push(boots!);
  
  return result;
}

/**
 * Count equipped armor pieces.
 * 
 * @returns Number 0-4
 */
export function countArmorPieces(equipment: BukkitEntityEquipment): number {
  let count = 0;
  
  if (!isAirOrNull(equipment.getHelmet())) count++;
  if (!isAirOrNull(equipment.getChestplate())) count++;
  if (!isAirOrNull(equipment.getLeggings())) count++;
  if (!isAirOrNull(equipment.getBoots())) count++;
  
  return count;
}

/**
 * Copy equipment from one entity to another.
 * 
 * WHY: Useful for mob duplication, templates, etc.
 * 
 * @param copyDropChances If true, also copy drop chances
 * @param silent If true, don't play equip sounds
 */
export function copyEquipment(
  from: BukkitEntityEquipment,
  to: BukkitEntityEquipment,
  copyDropChances: boolean = false,
  silent: boolean = true
): void {
  /* Copy armor */
  to.setHelmet(from.getHelmet(), silent);
  to.setChestplate(from.getChestplate(), silent);
  to.setLeggings(from.getLeggings(), silent);
  to.setBoots(from.getBoots(), silent);
  
  /* Copy hands */
  to.setItemInMainHand(from.getItemInMainHand(), silent);
  to.setItemInOffHand(from.getItemInOffHand(), silent);
  
  /* Optionally copy drop chances */
  if (copyDropChances) {
    to.setHelmetDropChance(from.getHelmetDropChance());
    to.setChestplateDropChance(from.getChestplateDropChance());
    to.setLeggingsDropChance(from.getLeggingsDropChance());
    to.setBootsDropChance(from.getBootsDropChance());
    to.setItemInMainHandDropChance(from.getItemInMainHandDropChance());
    to.setItemInOffHandDropChance(from.getItemInOffHandDropChance());
  }
}