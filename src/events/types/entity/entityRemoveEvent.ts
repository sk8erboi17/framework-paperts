// events/entity/EntityRemoveEvent.ts

import { BukkitEntity } from "../../../entities/types/bukkitEntity";
import { BukkitEntityType } from "../../../entities/enums/entityType";
import { JavaEnum, JavaEnumClass } from "../../../java/types/enum";
import { BukkitEntityEvent } from "./entityEvent";

// ============================================
// REMOVE CAUSE ENUM
// ============================================

/**
 * RemoveCause - Why an entity is being removed
 * 
 * CATEGORIES:
 * - Destruction: DEATH, EXPLODE, HIT, OUT_OF_WORLD
 * - Game mechanics: DESPAWN, MERGE, PICKUP, DROP, ENTER_BLOCK
 * - Transformation: TRANSFORMATION
 * - Technical: UNLOAD, PLAYER_QUIT, PLUGIN
 */
export type RemoveCauseKey =
  /* Destruction */
  | "DEATH"
  | "EXPLODE"
  | "HIT"
  | "OUT_OF_WORLD"
  /* Game mechanics */
  | "DESPAWN"
  | "MERGE"
  | "PICKUP"
  | "DROP"
  | "ENTER_BLOCK"
  /* Transformation */
  | "TRANSFORMATION"
  /* Technical */
  | "UNLOAD"
  | "PLAYER_QUIT"
  | "PLUGIN";

export interface BukkitRemoveCause extends JavaEnum<RemoveCauseKey> {}

interface RemoveCauseClass extends
  Omit<Record<RemoveCauseKey, BukkitRemoveCause>, keyof JavaEnumClass<BukkitRemoveCause>>,
  JavaEnumClass<BukkitRemoveCause> {}

/**
 * RemoveCause enum - Why an entity was removed
 * 
 * DEATH: Entity died (health reached 0)
 * DESPAWN: Entity despawned (too far, too old, etc.)
 * DROP: Entity dropped as item (trident, falling sand)
 * ENTER_BLOCK: Entity entered a block (bee, silverfish)
 * EXPLODE: Entity exploded (creeper, tnt, firework)
 * HIT: Projectile hit something
 * MERGE: Entity merged with another (items, xp)
 * OUT_OF_WORLD: Fell into void
 * PICKUP: Entity was picked up (items, arrows, xp)
 * PLAYER_QUIT: Removed with player on quit (boat)
 * PLUGIN: Plugin removed it manually
 * TRANSFORMATION: Transformed into another entity
 * UNLOAD: Chunk unloaded
 */
export const RemoveCause: RemoveCauseClass = {
  /* Destruction */
  DEATH: org.bukkit.event.entity.EntityRemoveEvent.Cause.DEATH,
  EXPLODE: org.bukkit.event.entity.EntityRemoveEvent.Cause.EXPLODE,
  HIT: org.bukkit.event.entity.EntityRemoveEvent.Cause.HIT,
  OUT_OF_WORLD: org.bukkit.event.entity.EntityRemoveEvent.Cause.OUT_OF_WORLD,
  
  /* Game mechanics */
  DESPAWN: org.bukkit.event.entity.EntityRemoveEvent.Cause.DESPAWN,
  MERGE: org.bukkit.event.entity.EntityRemoveEvent.Cause.MERGE,
  PICKUP: org.bukkit.event.entity.EntityRemoveEvent.Cause.PICKUP,
  DROP: org.bukkit.event.entity.EntityRemoveEvent.Cause.DROP,
  ENTER_BLOCK: org.bukkit.event.entity.EntityRemoveEvent.Cause.ENTER_BLOCK,
  
  /* Transformation */
  TRANSFORMATION: org.bukkit.event.entity.EntityRemoveEvent.Cause.TRANSFORMATION,
  
  /* Technical */
  UNLOAD: org.bukkit.event.entity.EntityRemoveEvent.Cause.UNLOAD,
  PLAYER_QUIT: org.bukkit.event.entity.EntityRemoveEvent.Cause.PLAYER_QUIT,
  PLUGIN: org.bukkit.event.entity.EntityRemoveEvent.Cause.PLUGIN,

  /* Static enum methods */
  values(): BukkitRemoveCause[] {
    return org.bukkit.event.entity.EntityRemoveEvent.Cause.values();
  },
  valueOf(name: string): BukkitRemoveCause {
    return org.bukkit.event.entity.EntityRemoveEvent.Cause.valueOf(name);
  },
};

// ============================================
// EVENT INTERFACE
// ============================================

/**
 * EntityRemoveEvent
 * 
 * Called when an entity is removed from the world.
 * 
 * WARNING:
 * This event should only be used for MONITORING.
 * Modifying the entity during or after this event is unspecified behavior.
 * This event is NOT called for Players.
 * 
 * NOT CANCELLABLE:
 * Unlike spawn events, you cannot prevent entity removal.
 * The entity is already being removed when this fires.
 * 
 * COMMON USE CASES:
 * - Track entity deaths for statistics
 * - Clean up associated data when entity is removed
 * - Log entity lifecycle for debugging
 * - Trigger effects when entities are destroyed
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/EntityRemoveEvent.html
 */
export interface EventEntityRemoveEvent extends BukkitEntityEvent {
  /**
   * Returns the entity being removed.
   * 
   * WARNING: Do not modify this entity.
   * The result is unspecified behavior.
   */
  getEntity(): BukkitEntity;

  /**
   * Gets the type of entity being removed.
   * Inherited from EntityEvent.
   */
  getEntityType(): BukkitEntityType;

  /**
   * Gets the cause why the entity got removed.
   */
  getCause(): BukkitRemoveCause;
}

export const EntityRemoveEvent = org.bukkit.event.entity.EntityRemoveEvent;