import { BukkitPotionEffect } from "../../items/types/potionEffect";
import { JavaUUID } from "../../java/types/uuid";
import { EntityCategoryKey } from "../enums/bukkitEntityCategory";
import { BukkitEntity } from "./bukkitEntity";

export interface BukkitLivingEntity extends BukkitEntity {
    addPotionEffect(effect: BukkitPotionEffect): boolean;
    addPotionEffect(effect: BukkitPotionEffect, force: boolean): boolean;
    addPotionEffects(effects: BukkitPotionEffect[]): boolean;
    getActivePotionEffects(): BukkitPotionEffect[];
    getArrowCooldown(): number;
    canBreatheUnderwater(): boolean;
    getArrowsInBody(): number;
    getCanPickupItems(): boolean;
    getCategory(): EntityCategoryKey;
    getCollidableExemptions(): JavaUUID;
}