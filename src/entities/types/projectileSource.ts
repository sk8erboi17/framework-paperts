/**
 * Represents a valid source of a projectile.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/projectiles/ProjectileSource.html
 */

import { BukkitVector } from "../../world/types/vector";

// ============================================
// INTERFACE
// ============================================

export interface BukkitProjectileSource {
  /**
   * Launch a projectile from this source.
   * 
   * @param projectile Class of projectile to launch (e.g., Arrow.class)
   * @returns The launched projectile
   */
  launchProjectile<T extends any /* BukkitProjectile */>(projectile: any /* Class<T> */): T;

  /**
   * Launch a projectile with custom velocity.
   * 
   * @param projectile Class of projectile to launch
   * @param velocity Initial velocity vector
   * @returns The launched projectile
   */
  launchProjectile<T extends any /* BukkitProjectile */>(projectile: any /* Class<T> */, velocity: BukkitVector | null): T;
}