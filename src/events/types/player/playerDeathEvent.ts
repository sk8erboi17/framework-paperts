// events/entity/EntityDeathEvent.ts

import { BukkitEntity } from "../../../entities/types/bukkitEntity";
import { BukkitLivingEntity } from "../../../entities/types/bukkitLivingEntity";
import { BukkitItemStack } from "../../../items/types/itemstack";
import { JavaList } from "../../../java/types/list";
import { BukkitDamageSource } from "../damageSource";



// ============================================
// EVENT INTERFACE
// ============================================

/**
 * EntityDeathEvent
 * 
 * Called whenever a LivingEntity dies.
 * 
 * HIERARCHY:
 * EntityEvent
 * └── EntityDeathEvent
 *     └── PlayerDeathEvent (subclass)
 * 
 * MODIFIABLE:
 * Unlike EntityRemoveEvent, this event allows modifications:
 * - Change dropped items (add, remove, clear)
 * - Change dropped XP amount
 * 
 * NOT CANCELLABLE:
 * The death itself cannot be cancelled. The entity is already dead.
 * To prevent death, use EntityDamageEvent and cancel lethal damage.
 * 
 * DROPS LIST:
 * The drops list is MUTABLE. Changes affect what actually drops.
 * - getDrops().clear() = no items drop
 * - getDrops().add(item) = add custom drop
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/EntityDeathEvent.html
 */
export interface EventEntityDeathEvent extends BukkitEntity {
  /**
   * Returns the LivingEntity that died.
   * 
   * OVERRIDE: More specific than parent's getEntity().
   * Parent returns Entity, this returns LivingEntity.
   */
  getEntity(): BukkitLivingEntity;

  /**
   * Gets the source of damage which caused the death.
   * 
   * Provides information about:
   * - Damage type (ATTACK, FALL, FIRE, etc.)
   * - Causing entity (killer)
   * - Direct entity (projectile)
   */
  getDamageSource(): BukkitDamageSource;

  /**
   * Gets all the items which will drop when the entity dies.
   * 
   * This list is MUTABLE. Modify it to change drops.
   * 
   * @example
   * // Clear all drops
   * event.getDrops().clear();
   * 
   * // Add custom drop
   * event.getDrops().add(customItem);
   */
  getDrops(): JavaList<BukkitItemStack>;

  /**
   * Gets how much XP should be dropped from this death.
   * 
   * This is the XP that will spawn, not XP taken from entity.
   */
  getDroppedExp(): number;

  /**
   * Sets how much XP should be dropped from this death.
   * 
   * @param exp Amount of XP to drop (0 or positive)
   */
  setDroppedExp(exp: number): void;

  /* Inherited from EventEntityEvent:
   * - getEntityType(): BukkitEntityType
   */
}

export const EntityDeathEvent = org.bukkit.event.entity.EntityDeathEvent;