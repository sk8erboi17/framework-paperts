// events/player/PlayerInteractEvent.ts

import { BukkitPlayer } from "../../../entities/types/bukkitPlayer";
import { BukkitMaterial } from "../../../items/enums/materialType";
import { BukkitItemStack } from "../../../items/types/itemstack";
import { JavaEnum } from "../../../java/types/enum";
import { BukkitBlockFace } from "../../../world/enums/blockFace";
import { BukkitBlock } from "../../../world/types/block";
import { BukkitVector } from "../../../world/types/vector";
import { BukkitCancellable } from "../cancellable";



/**
 * Action - Player interaction action types
 * 
 * WHY: Why use JavaEnum<ActionType> instead of plain string union?
 * ----------------------------------------------------------------
 * 
 * Java's event.getAction() returns an actual Java enum instance,
 * not a string. The enum instance has methods like:
 *   - name()    -> "RIGHT_CLICK_BLOCK"
 *   - ordinal() -> 1
 * 
 * So we need to type getAction() as JavaEnum<ActionType>, and the
 * caller uses .name() to get the string for comparison:
 * 
 *   event.getAction().name() === "RIGHT_CLICK_BLOCK"  // correct
 *   event.getAction() === "RIGHT_CLICK_BLOCK"         // wrong! comparing object to string
 */
export type ActionType =
  | "LEFT_CLICK_BLOCK"
  | "RIGHT_CLICK_BLOCK"
  | "LEFT_CLICK_AIR"
  | "RIGHT_CLICK_AIR"
  | "PHYSICAL";

export type EquipmentSlotType =
  | "HAND"
  | "OFF_HAND"
  | "FEET"
  | "LEGS"
  | "CHEST"
  | "HEAD"
  | "BODY";

export type EventResultType = "ALLOW" | "DENY" | "DEFAULT";

/**
 * PlayerInteractEvent interface
 */
export interface EventPlayerInteractEvent extends BukkitCancellable {
  getAction(): JavaEnum<ActionType>;
  
  /** @deprecated Use useInteractedBlock() and useItemInHand() instead */
  isCancelled(): boolean;
  setCancelled(cancel: boolean): void;
  
  getItem(): BukkitItemStack | null;
  getMaterial(): BukkitMaterial;
  hasBlock(): boolean;
  hasItem(): boolean;
  isBlockInHand(): boolean;
  getClickedBlock(): BukkitBlock | null;
  getBlockFace(): BukkitBlockFace;
  
  useInteractedBlock(): JavaEnum<EventResultType>;
  setUseInteractedBlock(useInteractedBlock: EventResultType): void;
  useItemInHand(): JavaEnum<EventResultType>;
  setUseItemInHand(useItemInHand: EventResultType): void;
  
  getHand(): JavaEnum<EquipmentSlotType> | null;
  getClickedPosition(): BukkitVector | null;
  getPlayer(): BukkitPlayer;
}

/**
 * Helper functions for PlayerInteractEvent
 */
export const PlayerInteractEventHelper = {
  isLeftClick(event: EventPlayerInteractEvent): boolean {
    const action = event.getAction().name();
    return action === "LEFT_CLICK_BLOCK" || action === "LEFT_CLICK_AIR";
  },

  isRightClick(event: EventPlayerInteractEvent): boolean {
    const action = event.getAction().name();
    return action === "RIGHT_CLICK_BLOCK" || action === "RIGHT_CLICK_AIR";
  },

  isBlockAction(event: EventPlayerInteractEvent): boolean {
    const action = event.getAction().name();
    return action === "LEFT_CLICK_BLOCK" || action === "RIGHT_CLICK_BLOCK";
  },

  isAirAction(event: EventPlayerInteractEvent): boolean {
    const action = event.getAction().name();
    return action === "LEFT_CLICK_AIR" || action === "RIGHT_CLICK_AIR";
  },

  isPhysical(event: EventPlayerInteractEvent): boolean {
    return event.getAction().name() === "PHYSICAL";
  },

  isMainHand(event: EventPlayerInteractEvent): boolean {
    return event.getHand()?.name() === "HAND";
  },

  isOffHand(event: EventPlayerInteractEvent): boolean {
    return event.getHand()?.name() === "OFF_HAND";
  },

  denyAll(event: EventPlayerInteractEvent): void {
    event.setUseInteractedBlock("DENY");
    event.setUseItemInHand("DENY");
  },

  allowAll(event: EventPlayerInteractEvent): void {
    event.setUseInteractedBlock("ALLOW");
    event.setUseItemInHand("ALLOW");
  },
} as const;

export const PlayerInteractEvent = org.bukkit.event.player.PlayerInteractEvent;