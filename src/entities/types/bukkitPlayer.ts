import { BukkitHumanEntity } from "./bukkitHumanEntity";

// https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Player.html
export interface BukkitPlayer extends BukkitHumanEntity {
  sendMessage(msg: string): void;
  getName(): string;
  kickPlayer(message: string): void;
}