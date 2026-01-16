/**
 * Represents an entity which can be leashed.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Leashable.html
 */

import { BukkitEntity } from "./bukkitEntity";


// ============================================
// INTERFACE
// ============================================

export interface BukkitLeashable {
  /**
   * Check if this entity is currently leashed.
   */
  isLeashed(): boolean;

  /**
   * Get the entity holding this entity's leash.
   * @throws IllegalStateException if not currently leashed
   */
  getLeashHolder(): BukkitEntity;

  /**
   * Set the leash holder for this entity.
   * 
   * Pass null to unleash.
   * 
   * NOTE: Has no effect on EnderDragons, Players, or ArmorStands.
   * Non-living entities (except leash hitches) won't persist as holders.
   * 
   * @param holder Entity to leash to, or null to unleash
   * @returns true if successful
   */
  setLeashHolder(holder: BukkitEntity | null): boolean;
}