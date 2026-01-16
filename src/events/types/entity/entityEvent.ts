/**
 * Represents an Entity-related event.
 * 
 * Base class for all events involving entities.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/EntityEvent.html
 */

import { BukkitEntityType } from "../../../entities/enums/entityType";
import { BukkitEntity } from "../../../entities/types/bukkitEntity";
import { BukkitEvent } from "../event";


// ============================================
// INTERFACE
// ============================================

export interface BukkitEntityEvent extends BukkitEvent {
  /**
   * The entity involved in this event.
   */
  getEntity(): BukkitEntity;

  /**
   * Type of the entity involved (ZOMBIE, PLAYER, etc.).
   */
  getEntityType(): BukkitEntityType;
}