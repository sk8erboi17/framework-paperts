/**
 * A type characterizing events that may be cancelled by a plugin or the server.
 * 
 * When cancelled, the event action won't be executed by the server,
 * but the event will still pass to other plugins' listeners.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/Cancellable.html
 */

// ============================================
// INTERFACE
// ============================================

export interface BukkitCancellable {
  /**
   * True if this event is cancelled.
   * Cancelled events won't be executed by the server but still pass to other plugins.
   */
  isCancelled(): boolean;

  /**
   * Set cancellation state.
   * @param cancel true to cancel, false to un-cancel
   */
  setCancelled(cancel: boolean): void;
}