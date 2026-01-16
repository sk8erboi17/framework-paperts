/**
 * Represents an object which may contain attributes.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/attribute/Attributable.html
 */

import { AttributeKey } from "./attribute";

// ============================================
// INTERFACE
// ============================================

export interface BukkitAttributable {
  /**
   * Gets the specified attribute instance from the object.
   * 
   * The returned instance is backed directly to the object —
   * any changes are applied immediately.
   * 
   * @param attribute The attribute to get
   * @returns The attribute instance, or null if not applicable
   */
  getAttribute(attribute: AttributeKey | any /* BukkitAttribute */): any /* BukkitAttributeInstance */ | null;
}