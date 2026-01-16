/**
 * Represents a potion effect, that can be added to a LivingEntity.
 * A potion effect has a duration that it will last for, an amplifier that will
 * enhance its effects, and a PotionEffectType, that represents its effect on an entity.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffect.html
 */

import { BukkitLivingEntity } from "../../entities/types/bukkitLivingEntity";
import { BukkitColor } from "../enums/colorType";
import { BukkitPotionEffectType } from "../enums/potionEffectType";


// ============================================
// INTERFACE
// ============================================

export interface BukkitPotionEffect {
  /**
   * Attempts to add the effect represented by this object to the given LivingEntity.
   * @param entity - The entity to add this effect to
   * @returns Whether the effect could be added
   */
  apply(entity: BukkitLivingEntity): boolean;

  /**
   * Returns the amplifier of this effect. A higher amplifier means the potion effect
   * happens more often over its duration and in some cases has more effect on its target.
   * @returns The effect amplifier
   */
  getAmplifier(): number;

  /**
   * Returns the duration (in ticks) that this effect will run for when applied to a LivingEntity.
   * @returns The duration of the effect, or -1 if this effect is infinite
   */
  getDuration(): number;

  /**
   * Returns the PotionEffectType of this effect.
   * @returns The potion type of this effect
   */
  getType(): BukkitPotionEffectType;

  /**
   * Makes potion effect produce more, translucent, particles.
   * @returns If this effect is ambient
   */
  isAmbient(): boolean;

  /**
   * Returns whether or not this potion effect has an infinite duration.
   * Potion effects with infinite durations will display an infinite symbol
   * and never expire unless manually removed.
   * @returns Whether this duration is infinite or not
   */
  isInfinite(): boolean;

  /**
   * Returns whether or not this potion effect has a shorter duration than the provided potion effect.
   * An infinite duration is considered longer than non-infinite durations.
   * If both potion effects have infinite durations, then neither is shorter than the other.
   * @param other - The other effect
   * @returns True if this effect is shorter than the other, false if longer or equal
   */
  isShorterThan(other: BukkitPotionEffect): boolean;

  /**
   * Returns whether this effect has particles or not.
   * @returns Whether this effect has particles or not
   */
  hasParticles(): boolean;

  /**
   * Returns whether this effect has an icon or not.
   * @returns Whether this effect has an icon or not
   */
  hasIcon(): boolean;

  /**
   * Returns the color of this potion's particles.
   * @returns Color of this potion's particles. May be null if the potion has no particles or defined color.
   * @deprecated Color is not part of potion effects
   */
  getColor(): BukkitColor | null;

  /**
   * Checks equality with another object.
   * @param obj - The object to compare
   * @returns True if equal
   */
  equals(obj: object): boolean;

  /**
   * Gets the hash code.
   * @returns The hash code
   */
  hashCode(): number;

  /**
   * Returns a string representation.
   * @returns String representation
   */
  toString(): string;
}

// ============================================
// POTION EFFECT CLASS INTERFACE
// ============================================

/*
 * PotionEffect is a regular class (not enum, not abstract with static fields).
 * It has constructors and one static constant (INFINITE_DURATION).
 * 
 * In TypeScript/JavaScript, we can't directly call Java constructors with `new`,
 * so we expose factory methods that delegate to the Java constructors.
 */
interface PotionEffectClass {
  /** A constant denoting infinite potion duration. */
  readonly INFINITE_DURATION: number;

  /**
   * Creates a potion effect.
   * @param type - Effect type
   * @param duration - Measured in ticks
   * @param amplifier - The amplifier for the effect
   * @returns A new PotionEffect
   */
  create(type: BukkitPotionEffectType, duration: number, amplifier: number): BukkitPotionEffect;

  /**
   * Creates a potion effect.
   * @param type - Effect type
   * @param duration - Measured in ticks
   * @param amplifier - The amplifier for the effect
   * @param ambient - The ambient status
   * @returns A new PotionEffect
   */
  create(type: BukkitPotionEffectType, duration: number, amplifier: number, ambient: boolean): BukkitPotionEffect;

  /**
   * Creates a potion effect with no defined color.
   * @param type - Effect type
   * @param duration - Measured in ticks
   * @param amplifier - The amplifier for the effect
   * @param ambient - The ambient status
   * @param particles - The particle status
   * @returns A new PotionEffect
   */
  create(type: BukkitPotionEffectType, duration: number, amplifier: number, ambient: boolean, particles: boolean): BukkitPotionEffect;

  /**
   * Creates a potion effect.
   * @param type - Effect type
   * @param duration - Measured in ticks
   * @param amplifier - The amplifier for the effect
   * @param ambient - The ambient status
   * @param particles - The particle status
   * @param icon - The icon status
   * @returns A new PotionEffect
   */
  create(type: BukkitPotionEffectType, duration: number, amplifier: number, ambient: boolean, particles: boolean, icon: boolean): BukkitPotionEffect;

  /**
   * Deserializes a PotionEffect from a map representation.
   * @param map - The map to deserialize from
   * @returns A new PotionEffect
   */
  deserialize(map: Map<string, object>): BukkitPotionEffect;
}

// ============================================
// POTION EFFECT
// ============================================

export const PotionEffect: PotionEffectClass = {
  INFINITE_DURATION: org.bukkit.potion.PotionEffect.INFINITE_DURATION,

  create(
    type: BukkitPotionEffectType,
    duration: number,
    amplifier: number,
    ambient?: boolean,
    particles?: boolean,
    icon?: boolean
  ): BukkitPotionEffect {
    if (icon !== undefined) {
      return new org.bukkit.potion.PotionEffect(type, duration, amplifier, ambient, particles, icon);
    }
    if (particles !== undefined) {
      return new org.bukkit.potion.PotionEffect(type, duration, amplifier, ambient, particles);
    }
    if (ambient !== undefined) {
      return new org.bukkit.potion.PotionEffect(type, duration, amplifier, ambient);
    }
    return new org.bukkit.potion.PotionEffect(type, duration, amplifier);
  },

  deserialize(map: Map<string, object>): BukkitPotionEffect {
    return new org.bukkit.potion.PotionEffect(map);
  },
};