// events/player/playerQuitEvent.ts

import { BukkitPlayerEvent } from "./playerEvent";
import { BukkitHandlerList } from "../handlerList";
import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";

/**
 * PlayerQuitEvent - Called when a player leaves a server.
 * 
 * This event is fired when a player disconnects from the server,
 * regardless of the reason (voluntary quit, kick, timeout, etc.)
 * 
 * TRIGGER CONDITIONS:
 * - Player clicks "Disconnect"
 * - Player closes the game
 * - Player is kicked (after PlayerKickEvent)
 * - Connection timeout
 * - Server shutdown
 * 
 * QUIT MESSAGE:
 * The quit message is broadcast to all online players.
 * Set to null to disable the message entirely.
 * 
 * Default format: "§e{player} left the game"
 * 
 * TIMING:
 * ┌────────────────────────────────────────────────────────────┐
 * │ 1. Player initiates disconnect                            │
 * │ 2. PlayerQuitEvent fires                                   │
 * │ 3. Quit message broadcast (if not null)                   │
 * │ 4. Player removed from online players list                │
 * │ 5. Player data saved                                       │
 * └────────────────────────────────────────────────────────────┘
 * 
 * IMPORTANT NOTES:
 * - Player is still "online" during this event
 * - Player.isOnline() returns true
 * - Can still send messages to the player (usually)
 * - Player's data is saved AFTER this event
 * 
 * COMMON USES:
 * - Custom quit messages
 * - Cleanup player data
 * - Log player sessions
 * - Notify other players
 * - Save plugin-specific data
 * 
 * NOT CANCELLABLE:
 * This event cannot be cancelled. The player will disconnect
 * regardless of what plugins do. Use PlayerKickEvent if you
 * need to prevent a kick.
 * 
 * @see PlayerJoinEvent
 * @see PlayerKickEvent
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerQuitEvent.html
 */
export interface EventPlayerQuitEvent extends BukkitPlayerEvent {

  /**
   * Gets the quit message to send to all online players.
   * 
   * @returns The quit message, or null if disabled
   */
  getQuitMessage(): string | null;

  /**
   * Sets the quit message to send to all online players.
   * 
   * Set to null to disable the quit message entirely.
   * 
   * @param quitMessage The new quit message, or null to disable
   * 
   * @example
   * // Custom quit message
   * event.setQuitMessage(`§c${player.getName()} has left the server!`);
   * 
   * @example
   * // Disable quit message
   * event.setQuitMessage(null);
   */
  setQuitMessage(quitMessage: string | null): void;

  getHandlers(): BukkitHandlerList;
}

/**
 * PlayerQuitEvent class with static methods.
 */
interface PlayerQuitEventClass {
  /**
   * Creates a new PlayerQuitEvent.
   * 
   * @param who The player who quit
   * @param quitMessage The quit message (can be null)
   */
  new(who: BukkitPlayer, quitMessage: string | null): EventPlayerQuitEvent;

  /**
   * Gets the handler list for this event type.
   */
  getHandlerList(): BukkitHandlerList;
}

export const PlayerQuitEvent: PlayerQuitEventClass = org.bukkit.event.player.PlayerQuitEvent as any;