import { BukkitLivingEntity } from "./bukkitLivingEntity";

// https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/HumanEntity.html
export interface BukkitHumanEntity extends BukkitLivingEntity {
  closeInventory(): void;
  dropItem(dropAll: boolean): void;
  getAttackCooldown(): number;
}