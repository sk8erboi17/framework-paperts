// events/entity/ProjectileLaunchEvent.ts

import { BukkitProjectile } from "../../entities/types/projectile";
import { BukkitProjectileSource } from "../../entities/types/projectileSource";
import { BukkitLocation } from "../../world/types/location";
import { BukkitPlayer } from "../../entities/types/bukkitPlayer";
import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitEntityType, EntityType } from "../../entities/enums/entityType";

/**
 * ProjectileLaunchEvent
 * 
 * Called when a projectile is launched.
 * 
 * PROJECTILE TYPES:
 * - Arrow, SpectralArrow, Trident
 * - Snowball, Egg, EnderPearl
 * - Fireball, SmallFireball, DragonFireball
 * - WitherSkull, WindCharge
 * - FishHook, ThrownPotion, Firework
 * 
 * SHOOTER:
 * The shooter is a ProjectileSource, which can be:
 * - LivingEntity (player, mob) -> has getType(), getUniqueId(), etc.
 * - BlockProjectileSource (dispenser) -> has getBlock() only
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/ProjectileLaunchEvent.html
 */
export interface EventProjectileLaunchEvent {
  /**
   * Returns the projectile involved in this event.
   */
  getEntity(): BukkitProjectile;

  /**
   * Gets the cancellation state of this event.
   */
  isCancelled(): boolean;

  /**
   * Sets the cancellation state of this event.
   * Cancelling prevents the projectile from being launched.
   */
  setCancelled(cancel: boolean): void;

  /**
   * Gets the location where the projectile was launched.
   * Inherited from EntitySpawnEvent.
   */
  getLocation(): BukkitLocation;

  /**
   * Gets the type of entity (will be a projectile type).
   * Inherited from EntityEvent.
   * 
   * @example
   * if (event.getEntityType() === EntityType.ARROW) { ... }
   */
  getEntityType(): BukkitEntityType;
}

/**
 * Helper functions for ProjectileLaunchEvent
 * 
 * WHY: Why use helper object instead of extending the interface?
 * --------------------------------------------------------------
 * 
 * The event interface maps directly to Java's event class.
 * Adding methods would break the 1:1 mapping and confuse
 * TypeScript about what's Java and what's TypeScript.
 * 
 * Helper functions are clearly "our code" that operates on
 * the Java object, not methods that exist in Java.
 */
export const ProjectileLaunchEventHelper = {
  /**
   * Get the shooter as ProjectileSource.
   */
  getShooter(event: EventProjectileLaunchEvent): BukkitProjectileSource | null {
    return event.getEntity().getShooter();
  },

  /**
   * Get shooter as Entity (if it's a LivingEntity).
   * 
   * Returns null if:
   * - No shooter
   * - Shooter is a BlockProjectileSource (dispenser)
   */
  getEntityShooter(event: EventProjectileLaunchEvent): BukkitEntity | null {
    const shooter = event.getEntity().getShooter();
    if (shooter === null) return null;
    
    /* 
     * LivingEntity has getType(), BlockProjectileSource doesn't.
     * This is how we distinguish between entity and block shooters.
     */
    if (typeof (shooter as any).getType === "function") {
      return shooter as unknown as BukkitEntity;
    }
    
    return null;
  },

  /**
   * Get shooter as Player (if shooter is a player).
   */
  getPlayerShooter(event: EventProjectileLaunchEvent): BukkitPlayer | null {
    const entity = this.getEntityShooter(event);
    if (entity === null) return null;
    
    if (entity.getType() === EntityType.PLAYER) {
      return entity as unknown as BukkitPlayer;
    }
    
    return null;
  },

  /**
   * Check if projectile was shot by a player.
   */
  isFromPlayer(event: EventProjectileLaunchEvent): boolean {
    return this.getPlayerShooter(event) !== null;
  },

  /**
   * Check if projectile was shot by a mob (non-player entity).
   */
  isFromMob(event: EventProjectileLaunchEvent): boolean {
    const entity = this.getEntityShooter(event);
    if (entity === null) return false;
    return entity.getType() !== EntityType.PLAYER;
  },

  /**
   * Check if projectile was shot by a dispenser.
   */
  isFromDispenser(event: EventProjectileLaunchEvent): boolean {
    const shooter = event.getEntity().getShooter();
    if (shooter === null) return false;
    
    /* Has getBlock but not getType = BlockProjectileSource */
    return typeof (shooter as any).getBlock === "function" &&
           typeof (shooter as any).getType !== "function";
  },

  /**
   * Check if projectile is an arrow type.
   */
  isArrow(event: EventProjectileLaunchEvent): boolean {
    const type = event.getEntityType();
    return type === EntityType.ARROW || type === EntityType.SPECTRAL_ARROW;
  },

  /**
   * Check if projectile is a trident.
   */
  isTrident(event: EventProjectileLaunchEvent): boolean {
    return event.getEntityType() === EntityType.TRIDENT;
  },

  /**
   * Check if projectile is throwable (snowball, egg, pearl).
   */
  isThrowable(event: EventProjectileLaunchEvent): boolean {
    const type = event.getEntityType();
    return type === EntityType.SNOWBALL || 
           type === EntityType.EGG || 
           type === EntityType.ENDER_PEARL ||
           type === EntityType.EXPERIENCE_BOTTLE;
  },

  /**
   * Check if projectile is a fireball type.
   */
  isFireball(event: EventProjectileLaunchEvent): boolean {
    const type = event.getEntityType();
    return type === EntityType.FIREBALL || 
           type === EntityType.SMALL_FIREBALL || 
           type === EntityType.DRAGON_FIREBALL ||
           type === EntityType.WITHER_SKULL;
  },

  /**
   * Check if projectile is a potion.
   */
  isPotion(event: EventProjectileLaunchEvent): boolean {
    const type = event.getEntityType();
    return type === EntityType.SPLASH_POTION || type === EntityType.LINGERING_POTION;
  },

  /**
   * Check if projectile is a wind charge.
   */
  isWindCharge(event: EventProjectileLaunchEvent): boolean {
    const type = event.getEntityType();
    return type === EntityType.WIND_CHARGE || type === EntityType.BREEZE_WIND_CHARGE;
  },

  /**
   * Multiply projectile velocity.
   */
  multiplyVelocity(event: EventProjectileLaunchEvent, multiplier: number): void {
    const projectile = event.getEntity();
    const velocity = projectile.getVelocity();
    projectile.setVelocity(velocity.multiply(multiplier));
  },

  /**
   * Set projectile on fire.
   * @param ticks Fire duration in ticks (20 ticks = 1 second)
   */
  setOnFire(event: EventProjectileLaunchEvent, ticks: number): void {
    event.getEntity().setFireTicks(ticks);
  },

  /**
   * Get shooter entity type (or null if no entity shooter).
   */
  getShooterType(event: EventProjectileLaunchEvent): BukkitEntityType | null {
    const entity = this.getEntityShooter(event);
    if (entity === null) return null;
    return entity.getType();
  },
} as const;

// Export della classe Java
export const ProjectileLaunchEvent = org.bukkit.event.entity.ProjectileLaunchEvent;