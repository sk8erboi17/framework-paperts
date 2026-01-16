/**
 * Represents an Entity that has health and can take damage.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Damageable.html
 */

import { BukkitDamageSource } from "../../events/types/damageSource";
import { BukkitEntity } from "./bukkitEntity";


// ============================================
// INTERFACE
// ============================================

export interface BukkitDamageable extends BukkitEntity {
  /**
   * Deal damage to this entity.
   * @param amount Amount of damage (in half-hearts)
   */
  damage(amount: number): void;

  /**
   * Deal damage to this entity from another entity.
   * @param amount Amount of damage
   * @param source Entity that caused the damage (gets kill credit)
   */
  damage(amount: number, source: BukkitEntity | null): void;

  /**
   * Deal damage to this entity from a DamageSource.
   * @param amount Amount of damage
   * @param damageSource Detailed damage source
   */
  damage(amount: number, damageSource: BukkitDamageSource): void;

  /**
   * Current health. 0 = dead, max = getMaxHealth().
   */
  getHealth(): number;

  /**
   * Set health.
   * @param health 0 to maxHealth
   * @throws IllegalArgumentException if health < 0 or > maxHealth
   */
  setHealth(health: number): void;

  /**
   * Absorption amount (golden hearts).
   * Absorbs damage before health.
   */
  getAbsorptionAmount(): number;

  /**
   * Set absorption amount.
   * Capped to Attribute.MAX_ABSORPTION.
   * @throws IllegalArgumentException if amount < 0 or non-finite
   */
  setAbsorptionAmount(amount: number): void;

  /**
   * Maximum health.
   * @deprecated Use Attribute.MAX_HEALTH instead.
   */
  getMaxHealth(): number;

  /**
   * Set maximum health.
   * If current health > new max, it's reduced to new max.
   * Entities with health bars (Player, Wither, etc.) will have bars scaled.
   * @deprecated Use Attribute.MAX_HEALTH instead.
   */
  setMaxHealth(health: number): void;

  /**
   * Reset max health to default value.
   * @deprecated Use Attribute.MAX_HEALTH instead.
   */
  resetMaxHealth(): void;
}