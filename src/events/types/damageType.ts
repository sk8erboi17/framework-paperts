/**
 * Represents a type of damage that an entity can receive.
 * 
 * Constants include base types from vanilla. Datapacks can register
 * additional types obtainable through Registry.DAMAGE_TYPE.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/damage/DamageType.html
 */

import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { BukkitDamageEffect } from "../enum/damageEffect";
import { BukkitDamageScaling } from "../enum/damageScaling";
import { BukkitDeathMessageType } from "../enum/deathMessageType";



// ============================================
// TYPE DEFINITIONS
// ============================================

export type DamageTypeKey =
  // Fire & Heat
  | "IN_FIRE" | "CAMPFIRE" | "ON_FIRE" | "LAVA" | "HOT_FLOOR"
  // Environment
  | "LIGHTNING_BOLT" | "IN_WALL" | "CRAMMING" | "DROWN" | "STARVE"
  | "CACTUS" | "SWEET_BERRY_BUSH" | "FREEZE" | "DRY_OUT"
  // Fall & Impact
  | "FALL" | "ENDER_PEARL" | "FLY_INTO_WALL" | "STALAGMITE"
  | "FALLING_BLOCK" | "FALLING_ANVIL" | "FALLING_STALACTITE"
  // Void & Border
  | "OUT_OF_WORLD" | "OUTSIDE_BORDER"
  // Magic & Effects
  | "GENERIC" | "MAGIC" | "INDIRECT_MAGIC" | "WITHER" | "DRAGON_BREATH"
  // Melee
  | "STING" | "MOB_ATTACK" | "MOB_ATTACK_NO_AGGRO" | "PLAYER_ATTACK" | "THORNS"
  // Projectiles
  | "SPEAR" | "ARROW" | "TRIDENT" | "MOB_PROJECTILE" | "SPIT" | "THROWN"
  // Explosives & Special
  | "FIREWORKS" | "FIREBALL" | "UNATTRIBUTED_FIREBALL" | "WITHER_SKULL"
  | "EXPLOSION" | "PLAYER_EXPLOSION" | "SONIC_BOOM" | "BAD_RESPAWN_POINT"
  // Other
  | "GENERIC_KILL" | "WIND_CHARGE" | "MACE_SMASH";

// ============================================
// INTERFACE
// ============================================

export interface BukkitDamageType {
  /**
   * Translation key for death message.
   * Only used if getDeathMessageType() is DEFAULT.
   */
  getTranslationKey(): string;

  /**
   * How damage scales with difficulty.
   */
  getDamageScaling(): BukkitDamageScaling;

  /**
   * Visual/audio effect when damage is applied.
   */
  getDamageEffect(): BukkitDamageEffect;

  /**
   * Type of death message shown when this damage kills.
   */
  getDeathMessageType(): BukkitDeathMessageType;

  /**
   * Hunger exhaustion caused by this damage type.
   */
  getExhaustion(): number;

  /**
   * @deprecated Use getKeyOrThrow() instead.
   */
  getKey(): BukkitNamespacedKey;
}

// ============================================
// DAMAGE TYPE CLASS INTERFACE
// ============================================

interface DamageTypeClass extends Record<DamageTypeKey, BukkitDamageType> {
}

// ============================================
// DAMAGE TYPES
// ============================================

export const DamageType: DamageTypeClass = {
  // Fire & Heat
  /** Standing in fire block. */
  IN_FIRE: org.bukkit.damage.DamageType.IN_FIRE,
  /** Standing in campfire. */
  CAMPFIRE: org.bukkit.damage.DamageType.CAMPFIRE,
  /** Burning (fire tick). */
  ON_FIRE: org.bukkit.damage.DamageType.ON_FIRE,
  /** In lava. */
  LAVA: org.bukkit.damage.DamageType.LAVA,
  /** Standing on magma block. */
  HOT_FLOOR: org.bukkit.damage.DamageType.HOT_FLOOR,

  // Environment
  /** Struck by lightning. */
  LIGHTNING_BOLT: org.bukkit.damage.DamageType.LIGHTNING_BOLT,
  /** Suffocating in block. */
  IN_WALL: org.bukkit.damage.DamageType.IN_WALL,
  /** Too many entities in same space. */
  CRAMMING: org.bukkit.damage.DamageType.CRAMMING,
  /** Drowning. */
  DROWN: org.bukkit.damage.DamageType.DROWN,
  /** Starvation. */
  STARVE: org.bukkit.damage.DamageType.STARVE,
  /** Cactus contact. */
  CACTUS: org.bukkit.damage.DamageType.CACTUS,
  /** Sweet berry bush. */
  SWEET_BERRY_BUSH: org.bukkit.damage.DamageType.SWEET_BERRY_BUSH,
  /** Powdered snow freeze. */
  FREEZE: org.bukkit.damage.DamageType.FREEZE,
  /** Aquatic mob out of water. */
  DRY_OUT: org.bukkit.damage.DamageType.DRY_OUT,

  // Fall & Impact
  /** Fall damage. */
  FALL: org.bukkit.damage.DamageType.FALL,
  /** Ender pearl landing. */
  ENDER_PEARL: org.bukkit.damage.DamageType.ENDER_PEARL,
  /** Elytra into wall. */
  FLY_INTO_WALL: org.bukkit.damage.DamageType.FLY_INTO_WALL,
  /** Landing on stalagmite. */
  STALAGMITE: org.bukkit.damage.DamageType.STALAGMITE,
  /** Hit by falling block. */
  FALLING_BLOCK: org.bukkit.damage.DamageType.FALLING_BLOCK,
  /** Hit by falling anvil. */
  FALLING_ANVIL: org.bukkit.damage.DamageType.FALLING_ANVIL,
  /** Hit by falling stalactite. */
  FALLING_STALACTITE: org.bukkit.damage.DamageType.FALLING_STALACTITE,

  // Void & Border
  /** Falling into void. */
  OUT_OF_WORLD: org.bukkit.damage.DamageType.OUT_OF_WORLD,
  /** Outside world border. */
  OUTSIDE_BORDER: org.bukkit.damage.DamageType.OUTSIDE_BORDER,

  // Magic & Effects
  /** Generic damage. */
  GENERIC: org.bukkit.damage.DamageType.GENERIC,
  /** Direct magic (instant damage potion). */
  MAGIC: org.bukkit.damage.DamageType.MAGIC,
  /** Indirect magic (evoker fangs, guardian beam). */
  INDIRECT_MAGIC: org.bukkit.damage.DamageType.INDIRECT_MAGIC,
  /** Wither effect. */
  WITHER: org.bukkit.damage.DamageType.WITHER,
  /** Ender dragon breath. */
  DRAGON_BREATH: org.bukkit.damage.DamageType.DRAGON_BREATH,

  // Melee
  /** Bee sting. */
  STING: org.bukkit.damage.DamageType.STING,
  /** Mob melee attack. */
  MOB_ATTACK: org.bukkit.damage.DamageType.MOB_ATTACK,
  /** Mob melee without aggro (goat ram). */
  MOB_ATTACK_NO_AGGRO: org.bukkit.damage.DamageType.MOB_ATTACK_NO_AGGRO,
  /** Player melee attack. */
  PLAYER_ATTACK: org.bukkit.damage.DamageType.PLAYER_ATTACK,
  /** Thorns enchantment. */
  THORNS: org.bukkit.damage.DamageType.THORNS,

  // Projectiles
  /** Trident melee. */
  SPEAR: org.bukkit.damage.DamageType.SPEAR,
  /** Arrow hit. */
  ARROW: org.bukkit.damage.DamageType.ARROW,
  /** Thrown trident. */
  TRIDENT: org.bukkit.damage.DamageType.TRIDENT,
  /** Mob projectile (blaze fireball, shulker bullet). */
  MOB_PROJECTILE: org.bukkit.damage.DamageType.MOB_PROJECTILE,
  /** Llama spit. */
  SPIT: org.bukkit.damage.DamageType.SPIT,
  /** Thrown item (egg, snowball, potion). */
  THROWN: org.bukkit.damage.DamageType.THROWN,

  // Explosives & Special
  /** Firework explosion. */
  FIREWORKS: org.bukkit.damage.DamageType.FIREWORKS,
  /** Ghast fireball. */
  FIREBALL: org.bukkit.damage.DamageType.FIREBALL,
  /** Fireball without known source. */
  UNATTRIBUTED_FIREBALL: org.bukkit.damage.DamageType.UNATTRIBUTED_FIREBALL,
  /** Wither skull projectile. */
  WITHER_SKULL: org.bukkit.damage.DamageType.WITHER_SKULL,
  /** Generic explosion. */
  EXPLOSION: org.bukkit.damage.DamageType.EXPLOSION,
  /** Player-caused explosion (TNT, bed, respawn anchor). */
  PLAYER_EXPLOSION: org.bukkit.damage.DamageType.PLAYER_EXPLOSION,
  /** Warden sonic boom. */
  SONIC_BOOM: org.bukkit.damage.DamageType.SONIC_BOOM,
  /** Bed/respawn anchor explosion in wrong dimension. */
  BAD_RESPAWN_POINT: org.bukkit.damage.DamageType.BAD_RESPAWN_POINT,

  // Other
  /** /kill command. */
  GENERIC_KILL: org.bukkit.damage.DamageType.GENERIC_KILL,
  /** Wind charge from breeze. */
  WIND_CHARGE: org.bukkit.damage.DamageType.WIND_CHARGE,
  /** Mace smash attack. */
  MACE_SMASH: org.bukkit.damage.DamageType.MACE_SMASH,
};