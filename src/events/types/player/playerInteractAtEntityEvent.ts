// events/player/PlayerInteractAtEntityEvent.ts

import { BukkitVector } from "../../../world/types/vector";
import { EventPlayerInteractEntityEvent } from "./playerInteractEntityEvent";


/**
 * PlayerInteractAtEntityEvent
 * 
 * Called when a player RIGHT-CLICKS an entity.
 * Includes the exact position on the entity where the click occurred.
 * 
 * HIERARCHY:
 * Event
 * └── PlayerEvent
 *     └── PlayerInteractEntityEvent
 *         └── PlayerInteractAtEntityEvent (this)
 * 
 * ⚠️ IMPORTANT:
 * The client may SPURIOUSLY send this packet in addition to 
 * PlayerInteractEntityEvent. Unless you specifically need the 
 * click position, listen to PlayerInteractEntityEvent instead!
 * 
 * CLICK POSITION:
 * The Vector returned by getClickedPosition() is RELATIVE to the
 * entity's location (entity origin is 0,0,0).
 * 
 * For a player entity (height ~1.8 blocks):
 * - y = 0.0 → feet
 * - y = 0.9 → torso
 * - y = 1.6 → head
 * 
 * USE CASES:
 * - Clicking specific parts of armor stands
 * - Head/body shot detection
 * - Precise NPC interaction zones
 * - Custom hitbox systems
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerInteractAtEntityEvent.html
 */
export interface EventPlayerInteractAtEntityEvent extends EventPlayerInteractEntityEvent {
  /**
   * Gets the position on the entity where the click occurred.
   * 
   * The Vector is RELATIVE to the entity's location:
   * - (0, 0, 0) is at the entity's feet/origin
   * - Y increases upward
   * - X/Z are horizontal offsets
   * 
   * @returns Click position relative to entity
   */
  getClickedPosition(): BukkitVector;

  /* Inherited from EventPlayerInteractEntityEvent:
   * - getRightClicked(): BukkitEntity
   * - getHand(): BukkitEquipmentSlot
   */

  /* Inherited from EventPlayerEvent:
   * - getPlayer(): BukkitPlayer
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

export const PlayerInteractAtEntityEvent = org.bukkit.event.player.PlayerInteractAtEntityEvent;