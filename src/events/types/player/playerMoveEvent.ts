/**
 * Holds information for player movement events.
 * 
 * Fired when a player moves from one location to another.
 * This includes walking, jumping, swimming, etc.
 * 
 * WARNING: This event fires VERY frequently. Keep handlers lightweight!
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerMoveEvent.html
 */

import { BukkitLocation } from "../../../world/types/location";
import { BukkitCancellable } from "../cancellable";
import { BukkitHandlerList } from "../handlerList";
import { BukkitPlayerEvent } from "./playerEvent";



// ============================================
// INTERFACE
// ============================================

export interface BukkitPlayerMoveEvent extends BukkitPlayerEvent, BukkitCancellable {
  /**
   * Location the player moved from.
   */
  getFrom(): BukkitLocation;

  /**
   * Set the "from" location.
   */
  setFrom(from: BukkitLocation): void;

  /**
   * Location the player is moving to.
   * May be null in some edge cases.
   */
  getTo(): BukkitLocation | null;

  /**
   * Set the destination location.
   * Use this to redirect player movement.
   */
  setTo(to: BukkitLocation): void;

  /**
   * If cancelled, player is teleported back to getFrom().
   * This does NOT fire another event.
   */
  isCancelled(): boolean;

  /**
   * Cancel to prevent movement (teleports player back to from).
   */
  setCancelled(cancel: boolean): void;

  getHandlers(): BukkitHandlerList;
}

// ============================================
// STATIC
// ============================================

export const PlayerMoveEvent: {
  getHandlerList(): BukkitHandlerList;
} = {
  getHandlerList(): BukkitHandlerList {
    return org.bukkit.event.player.PlayerMoveEvent.getHandlerList();
  },
};