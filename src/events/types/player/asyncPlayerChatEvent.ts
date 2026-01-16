// events/player/AsyncPlayerChatEvent.ts

import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";
import { JavaSet } from "../../../java/types/set";
import { BukkitPlayerEvent } from "./playerEvent";


/**
 * AsyncPlayerChatEvent
 * 
 * Called when a player sends a chat message.
 * 
 * HIERARCHY:
 * Event
 * └── PlayerEvent
 *     └── AsyncPlayerChatEvent (this)
 *         └── AsyncPlayerChatPreviewEvent
 * 
 * ⚠️ ASYNC WARNING:
 * This event can fire ASYNCHRONOUSLY (from any thread except main).
 * 
 * When is it async?
 * - Player sends chat via incoming packet → ASYNC
 * - Plugin forces player to chat → SYNC
 * 
 * Always check isAsynchronous() before accessing the API!
 * 
 * FORMAT STRING:
 * Default format: "<%1$s> %2$s"
 * - %1$s = Player.getDisplayName()
 * - %2$s = getMessage()
 * 
 * Example: "<Steve> Hello world!"
 * 
 * RECIPIENTS:
 * getRecipients() returns the set of players who will see the message.
 * - May be lazy-loaded (performance impact on access)
 * - May be unmodifiable (throws UnsupportedOperationException)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/AsyncPlayerChatEvent.html
 */
export interface EventAsyncPlayerChatEvent extends BukkitPlayerEvent {
  /**
   * Gets the message the player is attempting to send.
   * 
   * This message will be used with getFormat().
   * 
   * @returns The chat message
   */
  getMessage(): string;

  /**
   * Sets the message the player will send.
   * 
   * This message will be used with getFormat().
   * 
   * @param message New message to send
   */
  setMessage(message: string): void;

  /**
   * Gets the format used to display the chat message.
   * 
   * Format uses String.format() syntax:
   * - %1$s = Player display name
   * - %2$s = Message
   * 
   * Default: "<%1$s> %2$s"
   * 
   * @returns The format string
   */
  getFormat(): string;

  /**
   * Sets the format used to display the chat message.
   * 
   * Must be String.format() compatible.
   * 
   * Examples:
   * - "<%1$s> %2$s" → "<Steve> Hello"
   * - "[%1$s]: %2$s" → "[Steve]: Hello"
   * - "%1$s whispers: %2$s" → "Steve whispers: Hello"
   * 
   * @param format The new format string
   * @throws IllegalFormatException if format is invalid
   * @throws NullPointerException if format is null
   */
  setFormat(format: string): void;

  /**
   * Gets the set of players who will receive this message.
   * 
   * WARNINGS:
   * - Set may be LAZY (performance impact on access)
   * - Set may be UNMODIFIABLE (throws on modification)
   * 
   * @returns Set of recipient players
   */
  getRecipients(): JavaSet<BukkitPlayer>;

  /**
   * Check if this event is being called asynchronously.
   * 
   * If true, be careful with Bukkit API access!
   * 
   * @returns true if async, false if sync
   */
  isAsynchronous(): boolean;

  /* Inherited from EventPlayerEvent:
   * - getPlayer(): BukkitPlayer
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

// Export della classe Java
export const AsyncPlayerChatEvent = org.bukkit.event.player.AsyncPlayerChatEvent;