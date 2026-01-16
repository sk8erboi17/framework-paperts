// events/player/playerJoinEvent.ts

import { BukkitPlayerEvent } from "./playerEvent";
import { BukkitHandlerList } from "../handlerList";
import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";

/**
 * PlayerJoinEvent - Called when a player joins a server.
 * 
 * This event is fired after a player has successfully logged in
 * and is about to spawn in the world.
 * 
 * LOGIN SEQUENCE:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. AsyncPlayerPreLoginEvent  (async, can deny)                 │
 * │ 2. PlayerLoginEvent          (can deny/kick)                   │
 * │ 3. PlayerJoinEvent           (this - player is joining)        │
 * │ 4. Player spawns in world                                      │
 * │ 5. Join message broadcast                                      │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * JOIN MESSAGE:
 * The join message is broadcast to all online players.
 * Set to null to disable the message entirely.
 * 
 * Default format: "§e{player} joined the game"
 * 
 * PLAYER STATE:
 * - Player.isOnline() = true
 * - Player is in the players list
 * - Player has NOT spawned yet (spawn happens after)
 * - Player's location is their spawn/last location
 * 
 * COMMON USES:
 * - Custom join messages
 * - Welcome messages to the player
 * - Give starter items
 * - Teleport to spawn/hub
 * - Load player data
 * - Update player count displays
 * - Play join sounds
 * - Show MOTD
 * 
 * NOT CANCELLABLE:
 * This event cannot be cancelled. Use PlayerLoginEvent
 * to deny a player from joining.
 * 
 * @see PlayerQuitEvent
 * @see PlayerLoginEvent
 * @see AsyncPlayerPreLoginEvent
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerJoinEvent.html
 */
export interface EventPlayerJoinEvent extends BukkitPlayerEvent {

  /**
   * Gets the join message to send to all online players.
   * 
   * @returns The join message, or null if disabled
   */
  getJoinMessage(): string | null;

  /**
   * Sets the join message to send to all online players.
   * 
   * Set to null to disable the join message entirely.
   * 
   * @param joinMessage The new join message, or null to disable
   * 
   * @example
   * // Custom join message
   * event.setJoinMessage(`§a+ §7${player.getName()} §ajoined the server!`);
   * 
   * @example
   * // Disable join message
   * event.setJoinMessage(null);
   */
  setJoinMessage(joinMessage: string | null): void;

  getHandlers(): BukkitHandlerList;
}

/**
 * PlayerJoinEvent class with static methods.
 */
interface PlayerJoinEventClass {
  /**
   * Creates a new PlayerJoinEvent.
   * 
   * @param playerJoined The player who joined
   * @param joinMessage The join message (can be null)
   */
  new(playerJoined: BukkitPlayer, joinMessage: string | null): EventPlayerJoinEvent;

  /**
   * Gets the handler list for this event type.
   */
  getHandlerList(): BukkitHandlerList;
}

export const PlayerJoinEvent: PlayerJoinEventClass = org.bukkit.event.player.PlayerJoinEvent as any;

