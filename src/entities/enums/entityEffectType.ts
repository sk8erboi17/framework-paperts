// entities/enums/entityEffectType.ts

/**
 * A list of all Effects that can happen to entities.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/EntityEffect.html
 */

import { JavaClass } from "../../java/types/class";
import { JavaEnum, JavaEnumClass } from "../../java/types/enum";
import { BukkitEntity } from "../types/bukkitEntity";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type EntityEffectKey =
  | "ARMOR_STAND_HIT" | "ARROW_PARTICLES" | "BREAK_EQUIPMENT_BOOTS" | "BREAK_EQUIPMENT_CHESTPLATE" | "BREAK_EQUIPMENT_HELMET"
  | "BREAK_EQUIPMENT_LEGGINGS" | "BREAK_EQUIPMENT_MAIN_HAND" | "BREAK_EQUIPMENT_OFF_HAND" | "CAT_TAME_FAIL" | "CAT_TAME_SUCCESS"
  | "DEATH" | "DOLPHIN_FED" | "EGG_BREAK" | "ENTITY_DEATH" | "ENTITY_POOF"
  | "FANG_ATTACK" | "FIREWORK_EXPLODE" | "FOX_CHEW" | "GOAT_LOWER_HEAD" | "GOAT_RAISE_HEAD"
  | "GUARDIAN_TARGET" | "HOGLIN_ATTACK" | "HONEY_BLOCK_FALL_PARTICLES" | "HONEY_BLOCK_SLIDE_PARTICLES" | "HURT"
  | "HURT_BERRY_BUSH" | "HURT_DROWN" | "HURT_EXPLOSION" | "IRON_GOLEM_ROSE" | "IRON_GOLEM_SHEATH"
  | "IRON_GOLEN_ATTACK" | "LOVE_HEARTS" | "PLAYER_BAD_OMEN_RAID" | "RABBIT_JUMP" | "RAVAGER_ATTACK"
  | "RAVAGER_STUNNED" | "RESET_SPAWNER_MINECART_DELAY" | "SHEEP_EAT" | "SHEEP_EAT_GRASS" | "SHIELD_BLOCK"
  | "SHIELD_BREAK" | "SNIFFER_DIG" | "SNOWBALL_BREAK" | "SPAWN_DEATH_SMOKE" | "SQUID_ROTATE"
  | "SWAP_HAND_ITEMS" | "TELEPORT_ENDER" | "THORNS_HURT" | "TNT_MINECART_IGNITE" | "TOTEM_RESURRECT"
  | "VILLAGER_ANGRY" | "VILLAGER_HAPPY" | "VILLAGER_HEART" | "VILLAGER_SPLASH" | "WARDEN_ATTACK"
  | "WARDEN_SONIC_ATTACK" | "WARDEN_TENDRIL_SHAKE" | "WITCH_MAGIC" | "WOLF_HEARTS" | "WOLF_SHAKE"
  | "WOLF_SHAKE_STOP" | "WOLF_SMOKE" | "ZOGLIN_ATTACK" | "ZOMBIE_TRANSFORM";

// ============================================
// INTERFACE
// ============================================

export interface BukkitEntityEffect extends JavaEnum<EntityEffectKey> {
  getApplicable(): JavaClass<BukkitEntity>;
  isApplicableTo(clazz: JavaClass<BukkitEntity>): boolean;
  isApplicableTo(entity: BukkitEntity): boolean;
  /** @deprecated Magic value */
  getData(): number;
}

// ============================================
// ENTITY EFFECTS
// ============================================

export const EntityEffect: Record<EntityEffectKey, BukkitEntityEffect> & JavaEnumClass<BukkitEntityEffect> = {
  ARMOR_STAND_HIT: org.bukkit.EntityEffect.ARMOR_STAND_HIT,
  ARROW_PARTICLES: org.bukkit.EntityEffect.ARROW_PARTICLES,
  BREAK_EQUIPMENT_BOOTS: org.bukkit.EntityEffect.BREAK_EQUIPMENT_BOOTS,
  BREAK_EQUIPMENT_CHESTPLATE: org.bukkit.EntityEffect.BREAK_EQUIPMENT_CHESTPLATE,
  BREAK_EQUIPMENT_HELMET: org.bukkit.EntityEffect.BREAK_EQUIPMENT_HELMET,
  BREAK_EQUIPMENT_LEGGINGS: org.bukkit.EntityEffect.BREAK_EQUIPMENT_LEGGINGS,
  BREAK_EQUIPMENT_MAIN_HAND: org.bukkit.EntityEffect.BREAK_EQUIPMENT_MAIN_HAND,
  BREAK_EQUIPMENT_OFF_HAND: org.bukkit.EntityEffect.BREAK_EQUIPMENT_OFF_HAND,
  CAT_TAME_FAIL: org.bukkit.EntityEffect.CAT_TAME_FAIL,
  CAT_TAME_SUCCESS: org.bukkit.EntityEffect.CAT_TAME_SUCCESS,
  DEATH: org.bukkit.EntityEffect.DEATH,
  DOLPHIN_FED: org.bukkit.EntityEffect.DOLPHIN_FED,
  EGG_BREAK: org.bukkit.EntityEffect.EGG_BREAK,
  ENTITY_DEATH: org.bukkit.EntityEffect.ENTITY_DEATH,
  ENTITY_POOF: org.bukkit.EntityEffect.ENTITY_POOF,
  FANG_ATTACK: org.bukkit.EntityEffect.FANG_ATTACK,
  FIREWORK_EXPLODE: org.bukkit.EntityEffect.FIREWORK_EXPLODE,
  FOX_CHEW: org.bukkit.EntityEffect.FOX_CHEW,
  GOAT_LOWER_HEAD: org.bukkit.EntityEffect.GOAT_LOWER_HEAD,
  GOAT_RAISE_HEAD: org.bukkit.EntityEffect.GOAT_RAISE_HEAD,
  GUARDIAN_TARGET: org.bukkit.EntityEffect.GUARDIAN_TARGET,
  HOGLIN_ATTACK: org.bukkit.EntityEffect.HOGLIN_ATTACK,
  HONEY_BLOCK_FALL_PARTICLES: org.bukkit.EntityEffect.HONEY_BLOCK_FALL_PARTICLES,
  HONEY_BLOCK_SLIDE_PARTICLES: org.bukkit.EntityEffect.HONEY_BLOCK_SLIDE_PARTICLES,
  HURT: org.bukkit.EntityEffect.HURT,
  HURT_BERRY_BUSH: org.bukkit.EntityEffect.HURT_BERRY_BUSH,
  HURT_DROWN: org.bukkit.EntityEffect.HURT_DROWN,
  HURT_EXPLOSION: org.bukkit.EntityEffect.HURT_EXPLOSION,
  IRON_GOLEM_ROSE: org.bukkit.EntityEffect.IRON_GOLEM_ROSE,
  IRON_GOLEM_SHEATH: org.bukkit.EntityEffect.IRON_GOLEM_SHEATH,
  IRON_GOLEN_ATTACK: org.bukkit.EntityEffect.IRON_GOLEN_ATTACK,
  LOVE_HEARTS: org.bukkit.EntityEffect.LOVE_HEARTS,
  PLAYER_BAD_OMEN_RAID: org.bukkit.EntityEffect.PLAYER_BAD_OMEN_RAID,
  RABBIT_JUMP: org.bukkit.EntityEffect.RABBIT_JUMP,
  RAVAGER_ATTACK: org.bukkit.EntityEffect.RAVAGER_ATTACK,
  RAVAGER_STUNNED: org.bukkit.EntityEffect.RAVAGER_STUNNED,
  RESET_SPAWNER_MINECART_DELAY: org.bukkit.EntityEffect.RESET_SPAWNER_MINECART_DELAY,
  SHEEP_EAT: org.bukkit.EntityEffect.SHEEP_EAT,
  SHEEP_EAT_GRASS: org.bukkit.EntityEffect.SHEEP_EAT_GRASS,
  SHIELD_BLOCK: org.bukkit.EntityEffect.SHIELD_BLOCK,
  SHIELD_BREAK: org.bukkit.EntityEffect.SHIELD_BREAK,
  SNIFFER_DIG: org.bukkit.EntityEffect.SNIFFER_DIG,
  SNOWBALL_BREAK: org.bukkit.EntityEffect.SNOWBALL_BREAK,
  SPAWN_DEATH_SMOKE: org.bukkit.EntityEffect.SPAWN_DEATH_SMOKE,
  SQUID_ROTATE: org.bukkit.EntityEffect.SQUID_ROTATE,
  SWAP_HAND_ITEMS: org.bukkit.EntityEffect.SWAP_HAND_ITEMS,
  TELEPORT_ENDER: org.bukkit.EntityEffect.TELEPORT_ENDER,
  THORNS_HURT: org.bukkit.EntityEffect.THORNS_HURT,
  TNT_MINECART_IGNITE: org.bukkit.EntityEffect.TNT_MINECART_IGNITE,
  TOTEM_RESURRECT: org.bukkit.EntityEffect.TOTEM_RESURRECT,
  VILLAGER_ANGRY: org.bukkit.EntityEffect.VILLAGER_ANGRY,
  VILLAGER_HAPPY: org.bukkit.EntityEffect.VILLAGER_HAPPY,
  VILLAGER_HEART: org.bukkit.EntityEffect.VILLAGER_HEART,
  VILLAGER_SPLASH: org.bukkit.EntityEffect.VILLAGER_SPLASH,
  WARDEN_ATTACK: org.bukkit.EntityEffect.WARDEN_ATTACK,
  WARDEN_SONIC_ATTACK: org.bukkit.EntityEffect.WARDEN_SONIC_ATTACK,
  WARDEN_TENDRIL_SHAKE: org.bukkit.EntityEffect.WARDEN_TENDRIL_SHAKE,
  WITCH_MAGIC: org.bukkit.EntityEffect.WITCH_MAGIC,
  WOLF_HEARTS: org.bukkit.EntityEffect.WOLF_HEARTS,
  WOLF_SHAKE: org.bukkit.EntityEffect.WOLF_SHAKE,
  WOLF_SHAKE_STOP: org.bukkit.EntityEffect.WOLF_SHAKE_STOP,
  WOLF_SMOKE: org.bukkit.EntityEffect.WOLF_SMOKE,
  ZOGLIN_ATTACK: org.bukkit.EntityEffect.ZOGLIN_ATTACK,
  ZOMBIE_TRANSFORM: org.bukkit.EntityEffect.ZOMBIE_TRANSFORM,

  values(): BukkitEntityEffect[] {
    return org.bukkit.EntityEffect.values();
  },

  valueOf(name: string): BukkitEntityEffect {
    return org.bukkit.EntityEffect.valueOf(name);
  },
};