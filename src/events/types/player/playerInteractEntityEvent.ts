// events/player/PlayerInteractEntityEvent.ts

import { BukkitEntity } from "../../../entities/types/bukkitEntity";
import { BukkitEquipmentSlot } from "../../../entities/types/entityEquipments";
import { BukkitPlayerEvent } from "./playerEvent";


/**
 * PlayerInteractEntityEvent
 * 
 * Called when a player RIGHT-CLICKS an entity.
 * 
 * HIERARCHY:
 * Event
 * └── PlayerEvent
 *     └── PlayerInteractEntityEvent (this)
 *         ├── PlayerArmorStandManipulateEvent
 *         └── PlayerInteractAtEntityEvent
 * 
 * IMPORTANT:
 * - This event is for RIGHT-CLICK only
 * - For left-click (attack), use EntityDamageByEntityEvent
 * - May fire twice (once per hand) - check getHand()
 * 
 * COMMON USE CASES:
 * - Custom NPC interactions
 * - Pet systems
 * - Shop villagers
 * - Vehicle mounting
 * - Item frame interactions
 * 
 * RELATED EVENTS:
 * - PlayerInteractAtEntityEvent: Same but with click position
 * - PlayerArmorStandManipulateEvent: Armor stand specific
 * - EntityDamageByEntityEvent: For attacks (left-click)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerInteractEntityEvent.html
 */
export interface EventPlayerInteractEntityEvent extends BukkitPlayerEvent {
  /**
   * Gets the entity that was right-clicked by the player.
   * 
   * @returns The clicked entity
   */
  getRightClicked(): BukkitEntity;

  /**
   * Gets the hand used to perform this interaction.
   * 
   * Note: This event may fire TWICE (once for each hand).
   * Check this to avoid duplicate actions!
   * 
   * @returns HAND (main hand) or OFF_HAND
   */
  getHand(): BukkitEquipmentSlot;

  /* Inherited from EventPlayerEvent:
   * - getPlayer(): BukkitPlayer
   */

  /* Inherited from Cancellable:
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

export const PlayerInteractEntityEvent = org.bukkit.event.player.PlayerInteractEntityEvent;