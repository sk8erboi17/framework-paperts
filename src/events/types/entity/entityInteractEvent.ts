// events/entity/EntityInteractEvent.ts

import { BukkitEntity } from "../../../entities/types/bukkitEntity";
import { BukkitEntityType } from "../../../entities/enums/entityType";
import { BukkitBlock } from "../../../world/types/block";
import { BukkitEntityEvent } from "./entityEvent";
import { BukkitCancellable } from "../cancellable";

// ============================================
// EVENT INTERFACE
// ============================================

/**
 * EntityInteractEvent
 * 
 * Called when an entity interacts with a block.
 * 
 * IMPORTANT:
 * This event is for NON-PLAYER entities interacting with blocks.
 * For player interactions, use PlayerInteractEvent instead.
 * 
 * COMMON TRIGGERS:
 * - Mob stepping on pressure plate
 * - Mob trampling farmland (crops)
 * - Mob stepping on tripwire
 * - Villager opening doors
 * - Ravager breaking blocks
 * - Projectile hitting buttons/plates
 * 
 * CANCELLATION:
 * Cancelling prevents the interaction from happening.
 * The block will not be affected.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/EntityInteractEvent.html
 */
export interface EventEntityInteractEvent extends BukkitEntityEvent,BukkitCancellable {
  /**
   * Returns the entity interacting with the block.
   */
  getEntity(): BukkitEntity;

  /**
   * Gets the type of entity interacting.
   * Inherited from EntityEvent.
   */
  getEntityType(): BukkitEntityType;

  /**
   * Returns the block being interacted with.
   */
  getBlock(): BukkitBlock;

  /**
   * Gets the cancellation state of this event.
   */
  isCancelled(): boolean;

  /**
   * Sets the cancellation state of this event.
   * Cancelling prevents the block interaction.
   */
  setCancelled(cancel: boolean): void;
}

export const EntityInteractEvent = org.bukkit.event.entity.EntityInteractEvent;