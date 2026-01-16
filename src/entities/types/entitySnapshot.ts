/**
 * Represents an immutable copy of an entity's state.
 * 
 * Can be used at any time to create an instance of the stored entity.
 * Useful for cloning entities or saving entity state for later recreation.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntitySnapshot.html
 */

import { BukkitLocation } from "../../world/types/location";
import { BukkitWorld } from "../../world/types/world";
import { BukkitEntityType } from "../enums/entityType";
import { BukkitEntity } from "./bukkitEntity";

// ============================================
// INTERFACE
// ============================================

export interface BukkitEntitySnapshot {
  /**
   * Create entity from this template without spawning it.
   * @param world The world to create the entity in
   * @returns A new entity (not yet in world)
   */
  createEntity(world: BukkitWorld): BukkitEntity;

  /**
   * Create entity from this template and spawn it.
   * @param to Location to spawn the entity at
   * @returns The spawned entity
   */
  createEntity(to: BukkitLocation): BukkitEntity;

  /**
   * The type of entity this snapshot holds.
   */
  getEntityType(): BukkitEntityType;

  /**
   * NBT string representation of this snapshot.
   * 
   * WARNING: Experimental. Should not be relied upon for serialization.
   */
  getAsString(): string;
}