/**
 * Represents a player related event.
 * 
 * Base class for all events involving players.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerEvent.html
 */

import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";
import { BukkitEvent } from "../event";



// ============================================
// INTERFACE
// ============================================

export interface BukkitPlayerEvent extends BukkitEvent {
  /**
   * The player involved in this event.
   */
  getPlayer(): BukkitPlayer;
}