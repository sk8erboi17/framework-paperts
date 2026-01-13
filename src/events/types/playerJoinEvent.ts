import { BukkitPlayer } from "../../entities/types/bukkitPlayer";

export interface EventPlayerJoinEvent {
  getPlayer(): BukkitPlayer;
}

export const PlayerJoinEvent = org.bukkit.event.player.PlayerJoinEvent;