/**
 * Holds information for player teleport events.
 * 
 * Fired when a player teleports from one location to another.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerTeleportEvent.html
 */


import { JavaEnum, JavaEnumClass } from "../../../java/types/enum";
import { BukkitHandlerList } from "../handlerList";
import { BukkitPlayerMoveEvent } from "./playerMoveEvent";


// ============================================
// TELEPORT CAUSE ENUM
// ============================================

export type TeleportCauseKey =
  | "ENDER_PEARL" | "COMMAND" | "PLUGIN" | "NETHER_PORTAL"
  | "END_PORTAL" | "SPECTATE" | "END_GATEWAY" | "CHORUS_FRUIT"
  | "DISMOUNT" | "EXIT_BED" | "UNKNOWN";

export interface BukkitTeleportCause extends JavaEnum<TeleportCauseKey> {
  // No additional methods.
}

interface TeleportCauseClass extends
  Omit<Record<TeleportCauseKey, BukkitTeleportCause>, keyof JavaEnumClass<BukkitTeleportCause>>,
  JavaEnumClass<BukkitTeleportCause> {
}

export const TeleportCause: TeleportCauseClass = {
  /** Thrown ender pearl. */
  ENDER_PEARL: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.ENDER_PEARL,

  /** Command like /tp, /teleport. */
  COMMAND: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.COMMAND,

  /** Plugin called teleport. */
  PLUGIN: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.PLUGIN,

  /** Entering a nether portal. */
  NETHER_PORTAL: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.NETHER_PORTAL,

  /** Entering the end portal. */
  END_PORTAL: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.END_PORTAL,

  /** Spectator teleport to entity. */
  SPECTATE: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.SPECTATE,

  /** End gateway (small end portals). */
  END_GATEWAY: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.END_GATEWAY,

  /** Eating chorus fruit. */
  CHORUS_FRUIT: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.CHORUS_FRUIT,

  /** Dismounting a vehicle. */
  DISMOUNT: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.DISMOUNT,

  /** Exiting a bed. */
  EXIT_BED: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.EXIT_BED,

  /** Unknown/other cause. */
  UNKNOWN: org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.UNKNOWN,

  values(): BukkitTeleportCause[] {
    return org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.values();
  },

  valueOf(name: string): BukkitTeleportCause {
    return org.bukkit.event.player.PlayerTeleportEvent.TeleportCause.valueOf(name);
  },
};

// ============================================
// INTERFACE
// ============================================

export interface BukkitPlayerTeleportEvent extends BukkitPlayerMoveEvent {
  /**
   * The cause of this teleportation.
   */
  getCause(): BukkitTeleportCause;

  // Inherited from PlayerMoveEvent:
  // getFrom(): BukkitLocation;
  // getTo(): BukkitLocation | null;
  // setFrom(from: BukkitLocation): void;
  // setTo(to: BukkitLocation): void;
  // isCancelled(): boolean;
  // setCancelled(cancel: boolean): void;

  // Inherited from PlayerEvent:
  // getPlayer(): BukkitPlayer;

  getHandlers(): BukkitHandlerList;
}

export namespace BukkitPlayerTeleportEvent {
  export type TeleportCause = BukkitTeleportCause;
}

// ============================================
// STATIC
// ============================================

export const PlayerTeleportEvent: {
  getHandlerList(): BukkitHandlerList;
  TeleportCause: typeof TeleportCause;
} = {
  getHandlerList(): BukkitHandlerList {
    return org.bukkit.event.player.PlayerTeleportEvent.getHandlerList();
  },
  TeleportCause,
};