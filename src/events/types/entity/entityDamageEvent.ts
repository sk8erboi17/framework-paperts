/**
 * Stores data for damage events.
 * 
 * Fired when an entity takes damage from any source.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/EntityDamageEvent.html
 */

import { BukkitEntity } from "../../../entities/types/bukkitEntity";
import { JavaEnum, JavaEnumClass } from "../../../java/types/enum";
import { BukkitCancellable } from "../cancellable";
import { BukkitDamageSource } from "../damageSource";
import { BukkitEntityEvent } from "./entityEvent";
import { BukkitHandlerList } from "../handlerList";


// ============================================
// DAMAGE CAUSE ENUM
// ============================================

export type DamageCauseKey =
  | "CONTACT" | "ENTITY_ATTACK" | "ENTITY_SWEEP_ATTACK" | "PROJECTILE"
  | "SUFFOCATION" | "FALL" | "FIRE" | "FIRE_TICK"
  | "MELTING" | "LAVA" | "DROWNING" | "BLOCK_EXPLOSION"
  | "ENTITY_EXPLOSION" | "VOID" | "LIGHTNING" | "SUICIDE"
  | "STARVATION" | "POISON" | "MAGIC" | "WITHER"
  | "FALLING_BLOCK" | "THORNS" | "DRAGON_BREATH" | "CUSTOM"
  | "FLY_INTO_WALL" | "HOT_FLOOR" | "CRAMMING" | "DRYOUT"
  | "FREEZE" | "SONIC_BOOM" | "KILL" | "WORLD_BORDER"
  | "CAMPFIRE";

export interface BukkitDamageCause extends JavaEnum<DamageCauseKey> {
  // No additional methods.
}

interface DamageCauseClass extends
  Omit<Record<DamageCauseKey, BukkitDamageCause>, keyof JavaEnumClass<BukkitDamageCause>>,
  JavaEnumClass<BukkitDamageCause> {
}

export const DamageCause: DamageCauseClass = {
  /** Contact with cactus, dripstone, etc. */
  CONTACT: org.bukkit.event.entity.EntityDamageEvent.DamageCause.CONTACT,
  /** Direct attack from entity. */
  ENTITY_ATTACK: org.bukkit.event.entity.EntityDamageEvent.DamageCause.ENTITY_ATTACK,
  /** Sweep attack. */
  ENTITY_SWEEP_ATTACK: org.bukkit.event.entity.EntityDamageEvent.DamageCause.ENTITY_SWEEP_ATTACK,
  /** Hit by projectile. */
  PROJECTILE: org.bukkit.event.entity.EntityDamageEvent.DamageCause.PROJECTILE,
  /** Suffocating in a block. */
  SUFFOCATION: org.bukkit.event.entity.EntityDamageEvent.DamageCause.SUFFOCATION,
  /** Fall damage. */
  FALL: org.bukkit.event.entity.EntityDamageEvent.DamageCause.FALL,
  /** Direct fire damage. */
  FIRE: org.bukkit.event.entity.EntityDamageEvent.DamageCause.FIRE,
  /** Burning tick damage. */
  FIRE_TICK: org.bukkit.event.entity.EntityDamageEvent.DamageCause.FIRE_TICK,
  /** Snowman melting. */
  MELTING: org.bukkit.event.entity.EntityDamageEvent.DamageCause.MELTING,
  /** Lava damage. */
  LAVA: org.bukkit.event.entity.EntityDamageEvent.DamageCause.LAVA,
  /** Drowning. */
  DROWNING: org.bukkit.event.entity.EntityDamageEvent.DamageCause.DROWNING,
  /** TNT, bed, respawn anchor explosion. */
  BLOCK_EXPLOSION: org.bukkit.event.entity.EntityDamageEvent.DamageCause.BLOCK_EXPLOSION,
  /** Creeper, wither, etc. explosion. */
  ENTITY_EXPLOSION: org.bukkit.event.entity.EntityDamageEvent.DamageCause.ENTITY_EXPLOSION,
  /** Falling into void. */
  VOID: org.bukkit.event.entity.EntityDamageEvent.DamageCause.VOID,
  /** Lightning strike. */
  LIGHTNING: org.bukkit.event.entity.EntityDamageEvent.DamageCause.LIGHTNING,
  /** /kill command. */
  SUICIDE: org.bukkit.event.entity.EntityDamageEvent.DamageCause.SUICIDE,
  /** Starvation. */
  STARVATION: org.bukkit.event.entity.EntityDamageEvent.DamageCause.STARVATION,
  /** Poison effect. */
  POISON: org.bukkit.event.entity.EntityDamageEvent.DamageCause.POISON,
  /** Instant damage potion, evoker fangs, etc. */
  MAGIC: org.bukkit.event.entity.EntityDamageEvent.DamageCause.MAGIC,
  /** Wither effect. */
  WITHER: org.bukkit.event.entity.EntityDamageEvent.DamageCause.WITHER,
  /** Hit by falling block (anvil, etc.). */
  FALLING_BLOCK: org.bukkit.event.entity.EntityDamageEvent.DamageCause.FALLING_BLOCK,
  /** Thorns enchantment. */
  THORNS: org.bukkit.event.entity.EntityDamageEvent.DamageCause.THORNS,
  /** Ender dragon breath. */
  DRAGON_BREATH: org.bukkit.event.entity.EntityDamageEvent.DamageCause.DRAGON_BREATH,
  /** Plugin-caused damage. */
  CUSTOM: org.bukkit.event.entity.EntityDamageEvent.DamageCause.CUSTOM,
  /** Flying into wall with elytra. */
  FLY_INTO_WALL: org.bukkit.event.entity.EntityDamageEvent.DamageCause.FLY_INTO_WALL,
  /** Magma block. */
  HOT_FLOOR: org.bukkit.event.entity.EntityDamageEvent.DamageCause.HOT_FLOOR,
  /** Too many entities in same space. */
  CRAMMING: org.bukkit.event.entity.EntityDamageEvent.DamageCause.CRAMMING,
  /** Dolphin, axolotl out of water. */
  DRYOUT: org.bukkit.event.entity.EntityDamageEvent.DamageCause.DRYOUT,
  /** Powdered snow freeze damage. */
  FREEZE: org.bukkit.event.entity.EntityDamageEvent.DamageCause.FREEZE,
  /** Warden sonic boom. */
  SONIC_BOOM: org.bukkit.event.entity.EntityDamageEvent.DamageCause.SONIC_BOOM,
  /** /kill or similar. */
  KILL: org.bukkit.event.entity.EntityDamageEvent.DamageCause.KILL,
  /** Touching world border. */
  WORLD_BORDER: org.bukkit.event.entity.EntityDamageEvent.DamageCause.WORLD_BORDER,
  /** Standing in campfire. */
  CAMPFIRE: org.bukkit.event.entity.EntityDamageEvent.DamageCause.CAMPFIRE,

  values(): BukkitDamageCause[] {
    return org.bukkit.event.entity.EntityDamageEvent.DamageCause.values();
  },

  valueOf(name: string): BukkitDamageCause {
    return org.bukkit.event.entity.EntityDamageEvent.DamageCause.valueOf(name);
  },
};

// ============================================
// DAMAGE MODIFIER ENUM (DEPRECATED)
// ============================================

/**
 * @deprecated Unsustainable API, causes implementation problems.
 */
export type DamageModifierKey =
  | "BASE" | "HARD_HAT" | "BLOCKING" | "ARMOR"
  | "RESISTANCE" | "MAGIC" | "ABSORPTION";

/**
 * @deprecated
 */
export interface BukkitDamageModifier extends JavaEnum<DamageModifierKey> {
}

// ============================================
// EVENT INTERFACE
// ============================================

export interface BukkitEntityDamageEvent extends BukkitEntityEvent, BukkitCancellable {
  /**
   * The damaged entity.
   */
  getEntity(): BukkitEntity;

  /**
   * Cause of the damage (FALL, FIRE, ENTITY_ATTACK, etc.).
   * For more detail, use getDamageSource().
   */
  getCause(): BukkitDamageCause;
 
  /**
   * Detailed damage source. Includes custom damage types from datapacks,
   * direct/indirect entities, locations, etc.
   */
  getDamageSource(): BukkitDamageSource;

  /**
   * Raw base damage before modifiers.
   */
  getDamage(): number;

  /**
   * Set raw base damage.
   */
  setDamage(damage: number): void;

  /**
   * Get damage for a specific modifier.
   * @deprecated DamageModifier API is deprecated.
   */
  getDamage(type: BukkitDamageModifier): number;

  /**
   * Set damage for a specific modifier.
   * @deprecated DamageModifier API is deprecated.
   */
  setDamage(type: BukkitDamageModifier, damage: number): void;

  /**
   * Original damage for modifier at event construction.
   * @deprecated DamageModifier API is deprecated.
   */
  getOriginalDamage(type: BukkitDamageModifier): number;

  /**
   * Final damage after all reductions (armor, resistance, etc.).
   */
  getFinalDamage(): number;

  /**
   * Check if modifier is applicable for this event.
   * @deprecated DamageModifier API is deprecated.
   */
  isApplicable(type: BukkitDamageModifier): boolean;

  // ---- Cancellable ----

  isCancelled(): boolean;
  setCancelled(cancel: boolean): void;

  // ---- Handlers ----

  getHandlers(): BukkitHandlerList;
}

export namespace BukkitEntityDamageEvent {
  export type DamageCause = BukkitDamageCause;
  export type DamageModifier = BukkitDamageModifier;
}

// ============================================
// STATIC
// ============================================

export const EntityDamageEvent: {
  getHandlerList(): BukkitHandlerList;
  DamageCause: typeof DamageCause;
} = {
  getHandlerList(): BukkitHandlerList {
    return org.bukkit.event.entity.EntityDamageEvent.getHandlerList();
  },
  DamageCause,
};