/**
 * Represents an entity that can tame animals.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/AnimalTamer.html
 */

import { JavaUUID } from "../../java/types/uuid";

// ============================================
// INTERFACE
// ============================================

export interface BukkitAnimalTamer {
  /**
   * Name of this tamer.
   * Used to reference on tamed animals.
   * @returns Name, or null if unavailable
   */
  getName(): string | null;

  /**
   * UUID of this tamer.
   * Used to reference on tamed animals.
   */
  getUniqueId(): JavaUUID;
}