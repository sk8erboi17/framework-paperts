/**
 * DESIGN
 * ------
 * Projectile is the base interface for all shootable entities.
 * 
 * WHAT IS A PROJECTILE:
 * Any entity that is "shot" or "thrown" by something else.
 * 
 * PROJECTILE FAMILY TREE:
 * 
 *   Projectile
 *   │
 *   ├── AbstractArrow
 *   │   ├── Arrow (regular arrow)
 *   │   ├── SpectralArrow (glowing effect)
 *   │   ├── TippedArrow (potion effects)
 *   │   └── Trident
 *   │
 *   ├── ThrowableProjectile
 *   │   ├── Egg
 *   │   ├── Snowball
 *   │   ├── EnderPearl
 *   │   └── ThrownExpBottle
 *   │
 *   ├── ThrownPotion
 *   │   ├── SplashPotion
 *   │   └── LingeringPotion
 *   │
 *   ├── Fireball (abstract)
 *   │   ├── SmallFireball (blaze)
 *   │   ├── LargeFireball (ghast)
 *   │   ├── DragonFireball
 *   │   └── WitherSkull
 *   │
 *   ├── WindCharge
 *   │   ├── AbstractWindCharge
 *   │   └── BreezeWindCharge
 *   │
 *   ├── Firework
 *   ├── FishHook
 *   ├── LlamaSpit
 *   └── ShulkerBullet
 * 
 * SHOOTER CONCEPT:
 * Every projectile knows WHO shot it (the "shooter").
 * - Used for damage attribution
 * - Used for XP drops
 * - Used for kill statistics
 * 
 * PROJECTILE SOURCE:
 * The shooter is a ProjectileSource, which can be:
 * - LivingEntity (player, mob)
 * - BlockProjectileSource (dispenser)
 * 
 * BOUNCE (Deprecated):
 * The bounce methods don't do anything anymore.
 * They were removed in 1.20.2.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Projectile.html
 */

import { BukkitEntity } from "./bukkitEntity";
import { BukkitProjectileSource } from "./projectileSource";


// ============================================
// PROJECTILE INTERFACE
// ============================================

export interface BukkitProjectile extends BukkitEntity {

  // ==========================================
  // SHOOTER
  // ==========================================

  /**
   * Get the entity/block that shot this projectile.
   * 
   * Used for:
   * - Damage attribution (who gets the kill)
   * - XP drops (who receives XP)
   * - Statistics tracking
   * 
   * @returns The shooter, or null if unknown/none
   * 
   * @example
   * const shooter = arrow.getShooter();
   * if (shooter instanceof Player) {
   *   shooter.sendMessage("Nice shot!");
   * }
   */
  getShooter(): BukkitProjectileSource | null;

  /**
   * Set the shooter of this projectile.
   * 
   * @param source The new shooter, or null to clear
   * 
   * @example
   * // Make arrow appear to be shot by different player
   * arrow.setShooter(otherPlayer);
   * 
   * // Clear shooter (damage won't be attributed)
   * arrow.setShooter(null);
   */
  setShooter(source: BukkitProjectileSource | null): void;

  // ==========================================
  // BOUNCE (Deprecated)
  // ==========================================

  /**
   * Check if projectile bounces on hit.
   * 
   * @deprecated Since 1.20.2. Does not do anything.
   */
  doesBounce(): boolean;

  /**
   * Set if projectile should bounce on hit.
   * 
   * @deprecated Since 1.20.2. Does not do anything.
   * @param doesBounce Whether to bounce
   */
  setBounce(doesBounce: boolean): void;
}

// ============================================
// PROJECTILE TYPE NAMES
// ============================================

/**
 * All projectile entity type names.
 * 
 * Useful for type checking.
 */
export type ProjectileTypeName =
  /* Arrows */
  | "ARROW"
  | "SPECTRAL_ARROW"
  | "TRIDENT"
  /* Throwables */
  | "EGG"
  | "SNOWBALL"
  | "ENDER_PEARL"
  | "EXPERIENCE_BOTTLE"
  /* Potions */
  | "SPLASH_POTION"
  | "LINGERING_POTION"
  /* Fireballs */
  | "SMALL_FIREBALL"
  | "FIREBALL"
  | "DRAGON_FIREBALL"
  | "WITHER_SKULL"
  /* Other */
  | "FIREWORK_ROCKET"
  | "FISHING_BOBBER"
  | "LLAMA_SPIT"
  | "SHULKER_BULLET"
  | "WIND_CHARGE"
  | "BREEZE_WIND_CHARGE";

/**
 * Set of all projectile type names for quick lookup.
 */
export const PROJECTILE_TYPES: Set<string> = new Set([
  "ARROW",
  "SPECTRAL_ARROW",
  "TRIDENT",
  "EGG",
  "SNOWBALL",
  "ENDER_PEARL",
  "EXPERIENCE_BOTTLE",
  "SPLASH_POTION",
  "LINGERING_POTION",
  "SMALL_FIREBALL",
  "FIREBALL",
  "DRAGON_FIREBALL",
  "WITHER_SKULL",
  "FIREWORK_ROCKET",
  "FISHING_BOBBER",
  "LLAMA_SPIT",
  "SHULKER_BULLET",
  "WIND_CHARGE",
  "BREEZE_WIND_CHARGE",
]);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if entity is a projectile.
 */
export function isProjectile(entity: BukkitEntity): entity is BukkitProjectile {
  return PROJECTILE_TYPES.has(entity.getType().name());
}

/**
 * Check if projectile has a shooter.
 */
export function hasShooter(projectile: BukkitProjectile): boolean {
  return projectile.getShooter() !== null;
}

/**
 * Get shooter if it's a LivingEntity.
 * 
 * @returns The living entity shooter, or null if not a living entity
 */
export function getLivingShooter(projectile: BukkitProjectile): BukkitEntity | null {
  const shooter = projectile.getShooter();
  
  if (shooter === null) {
    return null;
  }
  
  /* Check if shooter is an entity (has getType method) */
  if (typeof (shooter as any).getType === "function") {
    return shooter as unknown as BukkitEntity;
  }
  
  return null;
}

/**
 * Check if projectile was shot by a player.
 */
export function wasShotByPlayer(projectile: BukkitProjectile): boolean {
  const shooter = getLivingShooter(projectile);
  if (shooter === null) {
    return false;
  }
  return shooter.getType().name() === "PLAYER";
}

/**
 * Check if projectile was shot by a mob (non-player living entity).
 */
export function wasShotByMob(projectile: BukkitProjectile): boolean {
  const shooter = getLivingShooter(projectile);
  if (shooter === null) {
    return false;
  }
  return shooter.getType().name() !== "PLAYER";
}

/**
 * Check if projectile was shot by a dispenser.
 */
export function wasShotByDispenser(projectile: BukkitProjectile): boolean {
  const shooter = projectile.getShooter();
  
  if (shooter === null) {
    return false;
  }
  
  /* BlockProjectileSource has getBlock method but not getType */
  if (typeof (shooter as any).getBlock === "function" &&
      typeof (shooter as any).getType !== "function") {
    return true;
  }
  
  return false;
}

/**
 * Get shooter entity type name.
 * 
 * @returns Type name, or null if no entity shooter
 */
export function getShooterTypeName(projectile: BukkitProjectile): string | null {
  const shooter = getLivingShooter(projectile);
  if (shooter === null) {
    return null;
  }
  return shooter.getType().name();
}

/**
 * Clear the shooter (damage won't be attributed).
 */
export function clearShooter(projectile: BukkitProjectile): void {
  projectile.setShooter(null);
}

/**
 * Transfer shooter from one projectile to another.
 */
export function transferShooter(
  source: BukkitProjectile,
  target: BukkitProjectile
): void {
  target.setShooter(source.getShooter());
}

/**
 * Check if two projectiles have the same shooter.
 */
export function haveSameShooter(a: BukkitProjectile, b: BukkitProjectile): boolean {
  const shooterA = a.getShooter();
  const shooterB = b.getShooter();
  
  if (shooterA === null && shooterB === null) {
    return true;
  }
  
  if (shooterA === null || shooterB === null) {
    return false;
  }
  
  /* Compare by UUID if both are entities */
  const entityA = getLivingShooter(a);
  const entityB = getLivingShooter(b);
  
  if (entityA !== null && entityB !== null) {
    return entityA.getUniqueId().equals(entityB.getUniqueId());
  }
  
  /* Fallback to reference equality */
  return shooterA === shooterB;
}

/**
 * Check if projectile is an arrow type.
 */
export function isArrow(projectile: BukkitProjectile): boolean {
  const type = projectile.getType().name();
  return type === "ARROW" || 
         type === "SPECTRAL_ARROW" || 
         type === "TRIDENT";
}

/**
 * Check if projectile is a throwable type.
 */
export function isThrowable(projectile: BukkitProjectile): boolean {
  const type = projectile.getType().name();
  return type === "EGG" || 
         type === "SNOWBALL" || 
         type === "ENDER_PEARL" || 
         type === "EXPERIENCE_BOTTLE";
}

/**
 * Check if projectile is a potion.
 */
export function isPotion(projectile: BukkitProjectile): boolean {
  const type = projectile.getType().name();
  return type === "SPLASH_POTION" || type === "LINGERING_POTION";
}

/**
 * Check if projectile is a fireball type.
 */
export function isFireball(projectile: BukkitProjectile): boolean {
  const type = projectile.getType().name();
  return type === "SMALL_FIREBALL" || 
         type === "FIREBALL" || 
         type === "DRAGON_FIREBALL" || 
         type === "WITHER_SKULL";
}

/**
 * Check if projectile is a wind charge type.
 */
export function isWindCharge(projectile: BukkitProjectile): boolean {
  const type = projectile.getType().name();
  return type === "WIND_CHARGE" || type === "BREEZE_WIND_CHARGE";
}

/**
 * Get projectile category.
 */
export function getProjectileCategory(projectile: BukkitProjectile): 
  "arrow" | "throwable" | "potion" | "fireball" | "wind_charge" | "other" {
  
  if (isArrow(projectile)) return "arrow";
  if (isThrowable(projectile)) return "throwable";
  if (isPotion(projectile)) return "potion";
  if (isFireball(projectile)) return "fireball";
  if (isWindCharge(projectile)) return "wind_charge";
  return "other";
}

/**
 * Check if projectile deals damage on hit.
 * 
 * Most projectiles deal damage, but some don't.
 */
export function dealsDamage(projectile: BukkitProjectile): boolean {
  const type = projectile.getType().name();
  
  /* These don't deal direct damage */
  const noDamageTypes = [
    "ENDER_PEARL",
    "EXPERIENCE_BOTTLE",
    "FISHING_BOBBER",
  ];
  
  return !noDamageTypes.includes(type);
}

/**
 * Check if projectile can be picked up (arrows, tridents).
 */
export function canBePickedUp(projectile: BukkitProjectile): boolean {
  const type = projectile.getType().name();
  return type === "ARROW" || 
         type === "SPECTRAL_ARROW" || 
         type === "TRIDENT";
}

/**
 * Get human-readable description of projectile.
 */
export function describeProjectile(projectile: BukkitProjectile): string {
  const type = projectile.getType().name();
  const shooter = projectile.getShooter();
  
  let description = type.toLowerCase().replace(/_/g, " ");
  
  if (shooter !== null) {
    const shooterEntity = getLivingShooter(projectile);
    if (shooterEntity !== null) {
      const shooterType = shooterEntity.getType().name().toLowerCase();
      description += ` shot by ${shooterType}`;
    } else {
      description += " shot by dispenser";
    }
  } else {
    description += " (no shooter)";
  }
  
  return description;
}

/**
 * Check if projectile is still in flight (not on ground, not dead).
 */
export function isInFlight(projectile: BukkitProjectile): boolean {
  return !projectile.isDead() && !projectile.isOnGround();
}

/**
 * Get projectile speed (velocity magnitude).
 */
export function getSpeed(projectile: BukkitProjectile): number {
  const velocity = projectile.getVelocity();
  return Math.sqrt(
    velocity.getX() ** 2 +
    velocity.getY() ** 2 +
    velocity.getZ() ** 2
  );
}

/**
 * Scale projectile velocity (change speed).
 */
export function scaleVelocity(projectile: BukkitProjectile, scale: number): void {
  const velocity = projectile.getVelocity();
  velocity.setX(velocity.getX() * scale);
  velocity.setY(velocity.getY() * scale);
  velocity.setZ(velocity.getZ() * scale);
  projectile.setVelocity(velocity);
}

/**
 * Reverse projectile direction.
 */
export function reverseDirection(projectile: BukkitProjectile): void {
  scaleVelocity(projectile, -1);
}