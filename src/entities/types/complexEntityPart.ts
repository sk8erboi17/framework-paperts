/**
 * DESIGN
 * ------
 * ComplexEntityPart represents a single hitbox part of a larger entity.
 * 
 * PART CONCEPT:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │               COMPLEX ENTITY PART                           │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────┐       │
 *   │   │            PARENT ENTITY                        │       │
 *   │   │         (ComplexLivingEntity)                   │       │
 *   │   │                                                 │       │
 *   │   │    ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐          │       │
 *   │   │    │Part │  │Part │  │Part │  │Part │          │       │
 *   │   │    │  1  │  │  2  │  │  3  │  │  4  │          │       │
 *   │   │    └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘          │       │
 *   │   │       │        │        │        │             │       │
 *   │   │       └────────┴────────┴────────┘             │       │
 *   │   │                    │                           │       │
 *   │   │              getParent()                       │       │
 *   │   │                    ▼                           │       │
 *   │   │           Returns parent entity                │       │
 *   │   │                                                 │       │
 *   │   └─────────────────────────────────────────────────┘       │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * PART CHARACTERISTICS:
 * - Each part is a separate Entity
 * - Has its own hitbox and location
 * - Damage dealt to part affects parent
 * - Cannot exist without parent
 * - Moves with parent entity
 * 
 * KNOWN IMPLEMENTATIONS:
 * - EnderDragonPart: Parts of the Ender Dragon
 *   - Head, body, wings, tail segments
 * 
 * DAMAGE FLOW:
 * 
 *   Player attacks part
 *          │
 *          ▼
 *   ┌─────────────┐
 *   │    Part     │ ← Hit registered on part
 *   └──────┬──────┘
 *          │
 *          ▼
 *   ┌─────────────┐
 *   │   Parent    │ ← Damage applied to parent
 *   └─────────────┘
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/ComplexEntityPart.html
 */

import { BukkitEntity } from "./bukkitEntity";
import { BukkitComplexLivingEntity } from "./complexLivingEntity";


// ============================================
// INTERFACE
// ============================================

/**
 * A single part of a ComplexLivingEntity.
 * 
 * Parts are separate entities with their own hitboxes,
 * but damage is forwarded to the parent entity.
 * 
 * Currently only EnderDragonPart implements this.
 */
export interface BukkitComplexEntityPart extends BukkitEntity {
  /**
   * Get the parent complex entity.
   * 
   * The parent is the main entity that this part belongs to.
   * Damage dealt to this part affects the parent.
   * 
   * @returns The parent ComplexLivingEntity
   * 
   * @example
   * const parent = part.getParent();
   * console.log(`This part belongs to: ${parent.getType().name()}`);
   * console.log(`Parent health: ${parent.getHealth()}`);
   */
  getParent(): BukkitComplexLivingEntity;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if entity is a ComplexEntityPart.
 * 
 * Note: ComplexEntityPart (like EnderDragonPart) does not have
 * a corresponding EntityType constant. We use duck typing to
 * check for the getParent() method instead.
 */
export function isComplexEntityPart(
  entity: BukkitEntity
): entity is BukkitComplexEntityPart {
  return typeof (entity as any).getParent === "function";
}

// ============================================
// PARENT UTILITIES
// ============================================

/**
 * Safely get parent from any entity.
 * 
 * @returns Parent if entity is a part, null otherwise
 * 
 * @example
 * const parent = getParentSafe(entity);
 * if (parent !== null) {
 *   // Entity was a part, parent is the complex entity
 * }
 */
export function getParentSafe(
  entity: BukkitEntity
): BukkitComplexLivingEntity | null {
  if (isComplexEntityPart(entity)) {
    return entity.getParent();
  }
  return null;
}

/**
 * Get parent or return the entity itself if not a part.
 * 
 * Useful when you want to always get the "main" entity.
 * 
 * @example
 * // Whether player hit a part or the dragon directly,
 * // this returns the dragon
 * const mainEntity = getParentOrSelf(damagedEntity);
 */
export function getParentOrSelf(entity: BukkitEntity): BukkitEntity {
  if (isComplexEntityPart(entity)) {
    return entity.getParent();
  }
  return entity;
}

/**
 * Check if entity is a part of a specific parent.
 * 
 * @example
 * if (isPartOf(entity, dragon)) {
 *   console.log("Entity is part of this dragon");
 * }
 */
export function isPartOf(
  entity: BukkitEntity,
  parent: BukkitComplexLivingEntity
): boolean {
  if (!isComplexEntityPart(entity)) {
    return false;
  }
  return entity.getParent().getUniqueId().toString() === parent.getUniqueId().toString();
}
/**
 * Check if two parts belong to the same parent.
 * 
 * @example
 * if (haveSameParent(part1, part2)) {
 *   console.log("Both parts belong to the same entity");
 * }
 */
/**
 * Check if two parts belong to the same parent.
 */
export function haveSameParent(
  part1: BukkitComplexEntityPart,
  part2: BukkitComplexEntityPart
): boolean {
  return part1.getParent().getUniqueId().toString() === part2.getParent().getUniqueId().toString();
}

// ============================================
// PART INFORMATION
// ============================================

/**
 * Get distance from part to its parent's location.
 */
export function getDistanceToParent(part: BukkitComplexEntityPart): number {
  return part.getLocation().distance(part.getParent().getLocation());
}

/**
 * Get part information.
 */
export function getPartInfo(part: BukkitComplexEntityPart): {
  partType: string;
  parentType: string;
  parentHealth: number;
  parentMaxHealth: number;
  distanceToParent: number;
} {
  const parent = part.getParent();
  
  return {
    partType: part.getType().name(),
    parentType: parent.getType().name(),
    parentHealth: parent.getHealth(),
    parentMaxHealth: parent.getMaxHealth(),
    distanceToParent: getDistanceToParent(part),
  };
}

/**
 * Describe a complex entity part.
 */
export function describePart(part: BukkitComplexEntityPart): string {
  const parent = part.getParent();
  const parentHealth = parent.getHealth().toFixed(1);
  const parentMaxHealth = parent.getMaxHealth().toFixed(1);
  
  return `Part of ${parent.getType().name()} (${parentHealth}/${parentMaxHealth} HP)`;
}