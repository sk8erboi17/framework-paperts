// events/entity/EntitySpawnEvent.ts

import { BukkitEntity } from "../../../entities/types/bukkitEntity";
import { BukkitEntityType } from "../../../entities/enums/entityType";
import { BukkitLocation } from "../../../world/types/location";
import { BukkitEntityEvent } from "./entityEvent";
import { BukkitCancellable } from "../cancellable";

/**
 * EntitySpawnEvent
 * 
 * Called when an entity is spawned into a world.
 * If cancelled, the entity will not spawn.
 * 
 * SUBCLASSES:
 * This is the base event for all spawn events:
 * - CreatureSpawnEvent (mobs with spawn reason)
 * - ItemSpawnEvent (dropped items)
 * - ProjectileLaunchEvent (arrows, snowballs, etc.)
 * - SpawnerSpawnEvent (from mob spawner)
 * - TrialSpawnerSpawnEvent (from trial spawner)
 * 
 * WHEN TO USE:
 * Use this event when you want to handle ALL entity spawns.
 * Use subclasses when you need specific information:
 * - CreatureSpawnEvent gives you SpawnReason
 * - ProjectileLaunchEvent gives you the shooter
 * 
 * CANCELLATION:
 * Cancelling prevents the entity from spawning entirely.
 * The entity object still exists but won't be added to the world.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/EntitySpawnEvent.html
 */
export interface EventEntitySpawnEvent extends BukkitEntityEvent,BukkitCancellable {
  /**
   * Returns the entity being spawned.
   * 
   * Note: The entity exists but hasn't been added to the world yet.
   * You can modify it before it spawns.
   */
  getEntity(): BukkitEntity;

  /**
   * Gets the type of entity being spawned.
   * 
   * Inherited from EntityEvent.
   */
  getEntityType(): BukkitEntityType;

  /**
   * Gets the location at which the entity is spawning.
   */
  getLocation(): BukkitLocation;

  /**
   * Gets the cancellation state of this event.
   */
  isCancelled(): boolean;

  /**
   * Sets the cancellation state of this event.
   * Cancelling prevents the entity from spawning.
   */
  setCancelled(cancel: boolean): void;
}

export const EntitySpawnEvent = org.bukkit.event.entity.EntitySpawnEvent;