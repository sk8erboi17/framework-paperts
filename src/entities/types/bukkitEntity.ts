/**
 * Represents a base entity in the world.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Entity.html
 */

import { BukkitEntityDamageEvent } from "../../events/types/entity/entityDamageEvent";
import { BukkitPlayerTeleportEvent } from "../../events/types/playerTeleportEvent";
import { JavaUUID } from "../../java/types/uuid";
import { BukkitSound } from "../../sounds/types/soundType";
import { BukkitBlockFace } from "../../world/enums/blockFace";
import { BukkitPistonMoveReaction } from "../../world/enums/pistonMoveReactionType";
import { BukkitBoundingBox } from "../../world/types/boundingBox";
import { BukkitLocation } from "../../world/types/location";
import { BukkitVector } from "../../world/types/vector";
import { BukkitWorld } from "../../world/types/world";
import { BukkitEntityEffect } from "../enums/entityEffectType";
import { BukkitEntityType } from "../enums/entityType";
import { BukkitPose } from "../enums/pose";
import { BukkitSpawnCategory } from "../enums/spawnCategory";
import { BukkitPlayer } from "./bukkitPlayer";
import { BukkitEntitySnapshot } from "./entitySnapshot";


// ============================================
// INTERFACE
// ============================================

export interface BukkitEntity {
  // ---- Identity ----

  /**
   * Unique ID for this entity instance. Changes each server restart.
   */
  getEntityId(): number;

  /**
   * Persistent UUID. Survives restarts.
   */
  getUniqueId(): JavaUUID;

  /**
   * Entity type (ZOMBIE, PLAYER, ITEM, etc.).
   */
  getType(): BukkitEntityType;

  /**
   * NBT string representation.
   */
  getAsString(): string;

  // ---- Position & Movement ----

  getLocation(): BukkitLocation;

  /**
   * Store location in provided object (avoids allocation).
   */
  getLocation(loc: BukkitLocation | null): BukkitLocation | null;

  getWorld(): BukkitWorld;

  /**
   * Velocity in meters per tick.
   */
  getVelocity(): BukkitVector;

  setVelocity(velocity: BukkitVector): void;

  /**
   * Set yaw and pitch.
   */
  setRotation(yaw: number, pitch: number): void;

  /**
   * Cardinal direction entity is facing.
   */
  getFacing(): BukkitBlockFace;

  /**
   * Current pose (STANDING, SNEAKING, SWIMMING, etc.).
   */
  getPose(): BukkitPose;

  // ---- Dimensions ----

  getHeight(): number;
  getWidth(): number;
  getBoundingBox(): BukkitBoundingBox;

  // ---- Teleportation ----

  teleport(location: BukkitLocation): boolean;
  teleport(location: BukkitLocation, cause: BukkitPlayerTeleportEvent.TeleportCause): boolean;
  teleport(destination: BukkitEntity): boolean;
  teleport(destination: BukkitEntity, cause: BukkitPlayerTeleportEvent.TeleportCause): boolean;

  // ---- State Checks ----

  /** True if spawned in a world. */
  isInWorld(): boolean;

  /** True if entity is alive and in world. */
  isValid(): boolean;

  /** True if marked for removal. */
  isDead(): boolean;

  /** True if supported by a block. */
  isOnGround(): boolean;

  /** True if in water. */
  isInWater(): boolean;

  // ---- Fire & Freeze ----

  getFireTicks(): number;
  setFireTicks(ticks: number): void;
  getMaxFireTicks(): number;

  getFreezeTicks(): number;
  setFreezeTicks(ticks: number): void;
  getMaxFreezeTicks(): number;

  /** True if fully frozen (max freeze ticks in powdered snow). */
  isFrozen(): boolean;

  // ---- Fall Damage ----

  getFallDistance(): number;
  setFallDistance(distance: number): void;

  // ---- Passengers & Vehicles ----

  /** True if this entity has no passengers. */
  isEmpty(): boolean;

  getPassengers(): BukkitEntity[];
  addPassenger(passenger: BukkitEntity): boolean;
  removePassenger(passenger: BukkitEntity): boolean;

  /** Eject all passengers. */
  eject(): boolean;

  /** True if inside a vehicle. */
  isInsideVehicle(): boolean;

  getVehicle(): BukkitEntity | null;
  leaveVehicle(): boolean;

  /**
   * @deprecated Use getPassengers()
   */
  getPassenger(): BukkitEntity | null;

  /**
   * @deprecated Use addPassenger()
   */
  setPassenger(passenger: BukkitEntity): boolean;

  // ---- Gravity & Physics ----

  hasGravity(): boolean;
  setGravity(gravity: boolean): void;

  getPistonMoveReaction(): BukkitPistonMoveReaction;

  // ---- Visual Properties ----

  isGlowing(): boolean;
  setGlowing(flag: boolean): void;

  /** Visual fire (appears on fire even when not). */
  isVisualFire(): boolean;
  setVisualFire(fire: boolean): void;

  isCustomNameVisible(): boolean;
  setCustomNameVisible(flag: boolean): void;

  /** Whether visible by default to players. */
  isVisibleByDefault(): boolean;
  setVisibleByDefault(visible: boolean): void;

  // ---- Sound ----

  isSilent(): boolean;
  setSilent(flag: boolean): void;

  getSwimSound(): BukkitSound;
  getSwimSplashSound(): BukkitSound;
  getSwimHighSpeedSplashSound(): BukkitSound;

  // ---- Invulnerability & Persistence ----

  isInvulnerable(): boolean;
  setInvulnerable(flag: boolean): void;

  /** Whether entity persists across chunk unload/reload. */
  isPersistent(): boolean;
  setPersistent(persistent: boolean): void;

  // ---- Portal ----

  getPortalCooldown(): number;
  setPortalCooldown(cooldown: number): void;

  // ---- Ticks ----

  getTicksLived(): number;
  setTicksLived(value: number): void;

  // ---- Damage ----

  getLastDamageCause(): BukkitEntityDamageEvent | null;

  /**
   * @deprecated Internal use only, will be removed.
   */
  setLastDamageCause(event: BukkitEntityDamageEvent | null): void;

  // ---- Scoreboard Tags ----

  getScoreboardTags(): Set<string>;
  addScoreboardTag(tag: string): boolean;
  removeScoreboardTag(tag: string): boolean;

  // ---- Nearby Entities ----

  getNearbyEntities(x: number, y: number, z: number): BukkitEntity[];

  // ---- Tracking ----

  /** Players currently receiving updates about this entity. */
  getTrackedBy(): Set<BukkitPlayer>;

  // ---- Spawn Category ----

  getSpawnCategory(): BukkitSpawnCategory;

  // ---- Effects ----

  playEffect(type: BukkitEntityEffect): void;

  // ---- Copy & Snapshot ----

  /** Create a copy at same location. */
  copy(): BukkitEntity;

  /** Create a copy at specified location. */
  copy(to: BukkitLocation): BukkitEntity;

  /** Create immutable snapshot of current state. */
  createSnapshot(): BukkitEntitySnapshot;

  // ---- Removal ----

  /** Mark entity for removal. */
  remove(): void;

  // ---- Spigot ----

  spigot(): any /*BukkitEntity.Spigot*/ ;
}