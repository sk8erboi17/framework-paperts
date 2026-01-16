/**
 * Represents a source of damage.
 * 
 * Provides detailed information about damage including type, causing entity,
 * direct entity, and location. More detailed than DamageCause.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/damage/DamageSource.html
 */

import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitLocation } from "../../world/types/location";
import { BukkitDamageType } from "./damageType";


// ============================================
// BUILDER INTERFACE
// ============================================

/**
 * Utility class for building DamageSource instances.
 */
export interface BukkitDamageSourceBuilder {
  /**
   * Set the entity that caused the damage (e.g., the player who shot the arrow).
   */
  withCausingEntity(entity: BukkitEntity): BukkitDamageSourceBuilder;

  /**
   * Set the entity that directly inflicted the damage (e.g., the arrow itself).
   */
  withDirectEntity(entity: BukkitEntity): BukkitDamageSourceBuilder;

  /**
   * Set the location where the damage originated.
   */
  withDamageLocation(location: BukkitLocation): BukkitDamageSourceBuilder;

  /**
   * Build the DamageSource.
   */
  build(): BukkitDamageSource;
}

// ============================================
// INTERFACE
// ============================================

export interface BukkitDamageSource {
  /**
   * The type of damage (from registry, includes datapack custom types).
   */
  getDamageType(): BukkitDamageType;

  /**
   * Entity ultimately responsible for the damage.
   * 
   * If killed, this entity gets the kill credit.
   * For projectiles, returns the shooter, not the projectile.
   */
  getCausingEntity(): BukkitEntity | null;

  /**
   * Entity that directly inflicted the damage.
   * 
   * For projectiles, returns the projectile itself, not the shooter.
   */
  getDirectEntity(): BukkitEntity | null;

  /**
   * Location where damage originated.
   * Only present if no entity caused the damage.
   */
  getDamageLocation(): BukkitLocation | null;

  /**
   * Convenience method for damage origin location.
   * 
   * Returns (in order of priority):
   * 1. getDamageLocation() if not null
   * 2. getCausingEntity().getLocation() if not null
   * 3. null
   */
  getSourceLocation(): BukkitLocation | null;

  /**
   * True if damage is indirect.
   * 
   * Indirect means causingEntity != directEntity.
   * Examples: skeleton's arrow, player's thrown potion.
   */
  isIndirect(): boolean;

  /**
   * Hunger exhaustion caused by this damage.
   */
  getFoodExhaustion(): number;

  /**
   * True if damage scales with game difficulty.
   */
  scalesWithDifficulty(): boolean;
}

export namespace BukkitDamageSource {
  export type Builder = BukkitDamageSourceBuilder;
}

// ============================================
// DAMAGE SOURCE STATIC
// ============================================

interface DamageSourceStatic {
  /**
   * Create a new DamageSource builder.
   * @param damageType The type of damage
   */
  builder(damageType: BukkitDamageType): BukkitDamageSourceBuilder;
}

export const DamageSource: DamageSourceStatic = {
  builder(damageType: BukkitDamageType): BukkitDamageSourceBuilder {
    return org.bukkit.damage.DamageSource.builder(damageType);
  },
};