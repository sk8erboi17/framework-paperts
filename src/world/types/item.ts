/**
 * DESIGN
 * ------
 * Item represents a dropped item entity in the world.
 * 
 * ITEM ENTITY LIFECYCLE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    ITEM LIFECYCLE                           │
 *   │                                                             │
 *   │   ┌─────────┐     ┌─────────────┐     ┌─────────────┐       │
 *   │   │  Drop   │ ──► │ Pickup Delay│ ──► │  Available  │       │
 *   │   │ (spawn) │     │  (waiting)  │     │ (can pickup)│       │
 *   │   └─────────┘     └─────────────┘     └─────────────┘       │
 *   │                                              │              │
 *   │                         ┌────────────────────┼──────────┐   │
 *   │                         │                    │          │   │
 *   │                         ▼                    ▼          ▼   │
 *   │                   ┌──────────┐         ┌─────────┐ ┌──────┐ │
 *   │                   │ Picked Up│         │ Despawn │ │Merged│ │
 *   │                   │(removed) │         │(5 min)  │ │      │ │
 *   │                   └──────────┘         └─────────┘ └──────┘ │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * ITEM PROPERTIES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                                                             │
 *   │   ItemStack ─────── What item is dropped                    │
 *   │   PickupDelay ───── Ticks before can be picked up           │
 *   │   Owner ─────────── Only this player can pick up            │
 *   │   Thrower ───────── Who dropped the item (for advancements) │
 *   │   UnlimitedLife ─── If true, never despawns                 │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * DEFAULT BEHAVIOR:
 * - Pickup delay: 10 ticks (0.5 seconds) after drop
 * - Despawn: 6000 ticks (5 minutes) after spawn
 * - Merging: Items of same type within 0.5 blocks merge
 * - Max stack: 64 (or item's max stack size)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Item.html
 */

import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitItemStack } from "../../items/types/itemstack";
import { JavaUUID } from "../../java/types/uuid";



// ============================================
// INTERFACE
// ============================================

/**
 * A dropped item entity in the world.
 * 
 * Created when items are dropped by players, mobs die,
 * blocks break, or through World.dropItem().
 */
export interface BukkitItem extends BukkitEntity {
  /**
   * Get the ItemStack this entity represents.
   * 
   * @returns The item stack
   * 
   * @example
   * const stack = item.getItemStack();
   * console.log(`${stack.getAmount()}x ${stack.getType().name()}`);
   */
  getItemStack(): BukkitItemStack;

  /**
   * Set the ItemStack this entity represents.
   * 
   * @param stack New item stack
   * 
   * @example
   * // Change to diamond
   * item.setItemStack(new ItemStack(Material.DIAMOND, 1));
   */
  setItemStack(stack: BukkitItemStack): void;

  /**
   * Get pickup delay in ticks.
   * 
   * Players cannot pick up the item until this delay expires.
   * Default is 10 ticks (0.5 seconds).
   * 
   * @returns Remaining delay in ticks
   * 
   * @example
   * const delay = item.getPickupDelay();
   * console.log(`Can pickup in ${delay / 20} seconds`);
   */
  getPickupDelay(): number;

  /**
   * Set pickup delay in ticks.
   * 
   * @param delay New delay in ticks
   * 
   * @example
   * // 2 second delay
   * item.setPickupDelay(40);
   * 
   * // Instant pickup
   * item.setPickupDelay(0);
   * 
   * // Never pickup (use 32767)
   * item.setPickupDelay(32767);
   */
  setPickupDelay(delay: number): void;

  /**
   * Check if item has unlimited lifetime.
   * 
   * Items with unlimited lifetime never despawn.
   * 
   * @returns true if item never despawns
   */
  isUnlimitedLifetime(): boolean;

  /**
   * Set unlimited lifetime.
   * 
   * @param unlimited true to prevent despawning
   * 
   * @example
   * // Make item permanent
   * item.setUnlimitedLifetime(true);
   */
  setUnlimitedLifetime(unlimited: boolean): void;

  /**
   * Get the owner's UUID.
   * 
   * Only the owner can pick up this item.
   * 
   * @returns Owner UUID or null if no owner
   */
  getOwner(): JavaUUID | null;

  /**
   * Set the owner.
   * 
   * Only the owner can pick up this item.
   * Set to null to allow anyone.
   * 
   * @param owner UUID of new owner, or null
   * 
   * @example
   * // Only specific player can pickup
   * item.setOwner(player.getUniqueId());
   * 
   * // Allow anyone
   * item.setOwner(null);
   */
  setOwner(owner: JavaUUID | null): void;

  /**
   * Get the thrower's UUID.
   * 
   * The thrower is who dropped the item.
   * Used for advancement triggers.
   * 
   * @returns Thrower UUID or null
   */
  getThrower(): JavaUUID | null;

  /**
   * Set the thrower.
   * 
   * @param uuid UUID of thrower, or null
   * 
   * @example
   * // Set player as thrower for advancements
   * item.setThrower(player.getUniqueId());
   */
  setThrower(uuid: JavaUUID | null): void;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if entity is an Item.
 */
export function isItem(entity: BukkitEntity): entity is BukkitItem {
  return entity.getType().name() === "ITEM" ||
         (typeof (entity as any).getItemStack === "function" &&
          typeof (entity as any).getPickupDelay === "function");
}

// ============================================
// CONSTANTS
// ============================================

/**
 * Default pickup delay in ticks.
 */
export const DEFAULT_PICKUP_DELAY = 10;

/**
 * Pickup delay value that prevents pickup entirely.
 */
export const NO_PICKUP_DELAY = 32767;

/**
 * Default despawn time in ticks (5 minutes).
 */
export const DEFAULT_DESPAWN_TIME = 6000;

/**
 * Ticks per second.
 */
export const TICKS_PER_SECOND = 20;

// ============================================
// PICKUP DELAY UTILITIES
// ============================================

/**
 * Check if item can be picked up.
 */
export function canBePickedUp(item: BukkitItem): boolean {
  return item.getPickupDelay() <= 0;
}

/**
 * Check if item pickup is disabled.
 */
export function isPickupDisabled(item: BukkitItem): boolean {
  return item.getPickupDelay() >= NO_PICKUP_DELAY;
}

/**
 * Get pickup delay in seconds.
 */
export function getPickupDelaySeconds(item: BukkitItem): number {
  return item.getPickupDelay() / TICKS_PER_SECOND;
}

/**
 * Set pickup delay in seconds.
 */
export function setPickupDelaySeconds(item: BukkitItem, seconds: number): void {
  item.setPickupDelay(Math.floor(seconds * TICKS_PER_SECOND));
}

/**
 * Make item instantly pickable.
 */
export function makeInstantPickup(item: BukkitItem): void {
  item.setPickupDelay(0);
}

/**
 * Disable pickup entirely.
 */
export function disablePickup(item: BukkitItem): void {
  item.setPickupDelay(NO_PICKUP_DELAY);
}

/**
 * Reset to default pickup delay.
 */
export function resetPickupDelay(item: BukkitItem): void {
  item.setPickupDelay(DEFAULT_PICKUP_DELAY);
}

// ============================================
// LIFETIME UTILITIES
// ============================================

/**
 * Make item permanent (never despawns).
 */
export function makePermanent(item: BukkitItem): void {
  item.setUnlimitedLifetime(true);
}

/**
 * Make item despawn normally.
 */
export function makeTemporary(item: BukkitItem): void {
  item.setUnlimitedLifetime(false);
}

/**
 * Get remaining lifetime in ticks (approximate).
 * 
 * Note: This is based on ticksLived and default despawn time.
 */
export function getRemainingLifetime(item: BukkitItem): number {
  if (item.isUnlimitedLifetime()) {
    return Number.MAX_SAFE_INTEGER;
  }
  
  const lived = item.getTicksLived();
  const remaining = DEFAULT_DESPAWN_TIME - lived;
  return Math.max(0, remaining);
}

/**
 * Get remaining lifetime in seconds.
 */
export function getRemainingLifetimeSeconds(item: BukkitItem): number {
  return getRemainingLifetime(item) / TICKS_PER_SECOND;
}

/**
 * Check if item is about to despawn (less than 30 seconds).
 */
export function isAboutToDespawn(item: BukkitItem, thresholdSeconds: number = 30): boolean {
  if (item.isUnlimitedLifetime()) return false;
  return getRemainingLifetimeSeconds(item) < thresholdSeconds;
}

// ============================================
// OWNER UTILITIES
// ============================================

/**
 * Check if item has an owner.
 */
export function hasOwner(item: BukkitItem): boolean {
  return item.getOwner() !== null;
}

/**
 * Check if entity is the owner.
 */
export function isOwner(item: BukkitItem, entity: BukkitEntity): boolean {
  const owner = item.getOwner();
  if (owner === null) return false;
  return owner.toString() === entity.getUniqueId().toString();
}

/**
 * Clear owner (allow anyone to pickup).
 */
export function clearOwner(item: BukkitItem): void {
  item.setOwner(null);
}

/**
 * Set owner from entity.
 */
export function setOwnerEntity(item: BukkitItem, entity: BukkitEntity): void {
  item.setOwner(entity.getUniqueId());
}

// ============================================
// THROWER UTILITIES
// ============================================

/**
 * Check if item has a thrower.
 */
export function hasThrower(item: BukkitItem): boolean {
  return item.getThrower() !== null;
}

/**
 * Check if entity is the thrower.
 */
export function isThrower(item: BukkitItem, entity: BukkitEntity): boolean {
  const thrower = item.getThrower();
  if (thrower === null) return false;
  return thrower.toString() === entity.getUniqueId().toString();
}

/**
 * Clear thrower.
 */
export function clearThrower(item: BukkitItem): void {
  item.setThrower(null);
}

/**
 * Set thrower from entity.
 */
export function setThrowerEntity(item: BukkitItem, entity: BukkitEntity): void {
  item.setThrower(entity.getUniqueId());
}

// ============================================
// ITEM STACK UTILITIES
// ============================================

/**
 * Get item type name.
 */
export function getItemTypeName(item: BukkitItem): string {
  return item.getItemStack().getType().name();
}

/**
 * Get item amount.
 */
export function getItemAmount(item: BukkitItem): number {
  return item.getItemStack().getAmount();
}

/**
 * Set item amount.
 */
export function setItemAmount(item: BukkitItem, amount: number): void {
  const stack = item.getItemStack();
  stack.setAmount(amount);
  item.setItemStack(stack);
}

/**
 * Add to item amount.
 */
export function addItemAmount(item: BukkitItem, amount: number): void {
  const stack = item.getItemStack();
  stack.setAmount(stack.getAmount() + amount);
  item.setItemStack(stack);
}

/**
 * Check if item stack is full.
 */
export function isStackFull(item: BukkitItem): boolean {
  const stack = item.getItemStack();
  return stack.getAmount() >= stack.getMaxStackSize();
}

/**
 * Check if item is a specific type.
 */
export function isItemType(item: BukkitItem, typeName: string): boolean {
  return item.getItemStack().getType().name() === typeName.toUpperCase();
}

// ============================================
// COMBINED UTILITIES
// ============================================

/**
 * Configure item as player drop.
 * 
 * Sets appropriate owner, thrower, and pickup delay.
 */
export function configureAsPlayerDrop(
  item: BukkitItem,
  player: BukkitEntity,
  pickupDelay: number = DEFAULT_PICKUP_DELAY
): void {
  item.setOwner(player.getUniqueId());
  item.setThrower(player.getUniqueId());
  item.setPickupDelay(pickupDelay);
}

/**
 * Configure item as mob drop.
 * 
 * No owner (anyone can pickup), instant pickup.
 */
export function configureAsMobDrop(item: BukkitItem): void {
  item.setOwner(null);
  item.setThrower(null);
  item.setPickupDelay(DEFAULT_PICKUP_DELAY);
}

/**
 * Configure item as display only.
 * 
 * Cannot be picked up, never despawns.
 */
export function configureAsDisplay(item: BukkitItem): void {
  disablePickup(item);
  makePermanent(item);
  item.setGravity(false);
}

/**
 * Configure item as reward.
 * 
 * Instant pickup, no owner restriction.
 */
export function configureAsReward(item: BukkitItem): void {
  item.setOwner(null);
  item.setThrower(null);
  makeInstantPickup(item);
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Get all item entities from entity list.
 */
export function filterItems(entities: BukkitEntity[]): BukkitItem[] {
  return entities.filter(isItem) as BukkitItem[];
}

/**
 * Find items by type.
 */
export function findItemsByType(items: BukkitItem[], typeName: string): BukkitItem[] {
  return items.filter(item => isItemType(item, typeName));
}

/**
 * Find items owned by entity.
 */
export function findItemsOwnedBy(items: BukkitItem[], entity: BukkitEntity): BukkitItem[] {
  const uuid = entity.getUniqueId().toString();
  return items.filter(item => {
    const owner = item.getOwner();
    return owner !== null && owner.toString() === uuid;
  });
}

/**
 * Find pickable items.
 */
export function findPickableItems(items: BukkitItem[]): BukkitItem[] {
  return items.filter(canBePickedUp);
}

/**
 * Calculate total item count.
 */
export function getTotalItemCount(items: BukkitItem[]): number {
  let total = 0;
  for (const item of items) {
    total += getItemAmount(item);
  }
  return total;
}

/**
 * Remove all items of a type.
 */
export function removeItemsByType(items: BukkitItem[], typeName: string): number {
  let removed = 0;
  for (const item of items) {
    if (isItemType(item, typeName)) {
      item.remove();
      removed++;
    }
  }
  return removed;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe an item entity.
 */
export function describeItem(item: BukkitItem): string {
  const stack = item.getItemStack();
  const type = stack.getType().name();
  const amount = stack.getAmount();
  const delay = item.getPickupDelay();
  const permanent = item.isUnlimitedLifetime() ? ", permanent" : "";
  const owned = hasOwner(item) ? ", owned" : "";
  
  let delayStr = "";
  if (delay > 0) {
    if (delay >= NO_PICKUP_DELAY) {
      delayStr = ", no pickup";
    } else {
      delayStr = `, ${(delay / 20).toFixed(1)}s delay`;
    }
  }
  
  return `${amount}x ${type}${delayStr}${permanent}${owned}`;
}

/**
 * Get item entity info as plain object.
 */
export function getItemInfo(item: BukkitItem): {
  type: string;
  amount: number;
  maxStackSize: number;
  pickupDelay: number;
  pickupDelaySeconds: number;
  canPickup: boolean;
  isUnlimited: boolean;
  hasOwner: boolean;
  ownerUUID: string | null;
  hasThrower: boolean;
  throwerUUID: string | null;
  ticksLived: number;
  remainingLifetimeSeconds: number;
  location: { x: number; y: number; z: number };
} {
  const stack = item.getItemStack();
  const owner = item.getOwner();
  const thrower = item.getThrower();
  const loc = item.getLocation();
  
  return {
    type: stack.getType().name(),
    amount: stack.getAmount(),
    maxStackSize: stack.getMaxStackSize(),
    pickupDelay: item.getPickupDelay(),
    pickupDelaySeconds: getPickupDelaySeconds(item),
    canPickup: canBePickedUp(item),
    isUnlimited: item.isUnlimitedLifetime(),
    hasOwner: owner !== null,
    ownerUUID: owner?.toString() ?? null,
    hasThrower: thrower !== null,
    throwerUUID: thrower?.toString() ?? null,
    ticksLived: item.getTicksLived(),
    remainingLifetimeSeconds: getRemainingLifetimeSeconds(item),
    location: {
      x: loc.getX(),
      y: loc.getY(),
      z: loc.getZ(),
    },
  };
}

/**
 * Get summary of item entities.
 */
export function getItemsSummary(items: BukkitItem[]): {
  total: number;
  totalItems: number;
  pickable: number;
  owned: number;
  permanent: number;
  aboutToDespawn: number;
  typeCount: Map<string, number>;
} {
  let pickable = 0;
  let owned = 0;
  let permanent = 0;
  let aboutToDespawn = 0;
  let totalItems = 0;
  const typeCount = new Map<string, number>();
  
  for (const item of items) {
    const type = getItemTypeName(item);
    const amount = getItemAmount(item);
    
    totalItems += amount;
    typeCount.set(type, (typeCount.get(type) ?? 0) + amount);
    
    if (canBePickedUp(item)) pickable++;
    if (hasOwner(item)) owned++;
    if (item.isUnlimitedLifetime()) permanent++;
    if (isAboutToDespawn(item)) aboutToDespawn++;
  }
  
  return {
    total: items.length,
    totalItems,
    pickable,
    owned,
    permanent,
    aboutToDespawn,
    typeCount,
  };
}