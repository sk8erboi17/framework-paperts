// ============================================
// src/types/potionEffect.ts
// ============================================

import { BukkitLivingEntity } from "../../entities/types/bukkitLivingEntity";
import { BukkitPotionEffectType } from "../enums/potionEffectType";

/**
 * A constant denoting infinite potion duration.
 * Potion effects with infinite durations will display an infinite
 * symbol and never expire unless manually removed.
 */
export const INFINITE_DURATION = -1;

/**
 * Represents a potion effect that can be added to a LivingEntity.
 *
 * A potion effect has a duration that it will last for, an amplifier
 * that will enhance its effects, and a PotionEffectType that represents
 * its effect on an entity.
 *
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffect.html
 */
export interface BukkitPotionEffect {
  /**
   * Attempts to add the effect represented by this object to the given LivingEntity.
   * @param entity - The entity to add this effect to
   * @returns Whether the effect could be added
   */
  apply(entity: BukkitLivingEntity): boolean;

  /**
   * Returns the amplifier of this effect.
   * A higher amplifier means the potion effect happens more often
   * over its duration and in some cases has more effect on its target.
   * @returns The effect amplifier (0 = level I, 1 = level II, etc.)
   */
  getAmplifier(): number;

  /**
   * Returns the duration (in ticks) that this effect will run for
   * when applied to a LivingEntity.
   * @returns The duration of the effect, or -1 if this effect is infinite
   */
  getDuration(): number;

  /**
   * Returns the PotionEffectType of this effect.
   * @returns The potion type of this effect
   */
  getType(): BukkitPotionEffectType;

  /**
   * Returns whether or not this potion effect has an infinite duration.
   * Potion effects with infinite durations will display an infinite
   * symbol and never expire unless manually removed.
   * @returns Whether this duration is infinite or not
   */
  isInfinite(): boolean;

  /**
   * Returns whether or not this potion effect has a shorter duration
   * than the provided potion effect.
   *
   * An infinite duration is considered longer than non-infinite durations.
   * If both potion effects have infinite durations, then neither is shorter
   * than the other and this method will return false.
   *
   * @param other - The other effect to compare
   * @returns True if this effect is shorter than the other, false if longer or equal
   */
  isShorterThan(other: BukkitPotionEffect): boolean;

  /**
   * Makes potion effect produce more, translucent, particles.
   * @returns If this effect is ambient
   */
  isAmbient(): boolean;

  /**
   * @returns Whether this effect has particles or not
   */
  hasParticles(): boolean;

  /**
   * @returns Whether this effect has an icon or not
   */
  hasIcon(): boolean;

  /**
   * Creates a Map representation of this class.
   * @returns Map containing the current state of this class
   */
  serialize(): Map<string, any>;
}

// ============================================
// FACTORY FUNCTIONS
// ============================================

/**
 * Creates a potion effect.
 *
 * WHY OVERLOADED FACTORY: Java has multiple constructors but TypeScript
 * doesn't support constructor overloading. We use optional parameters
 * with defaults to simulate all Java constructors:
 *
 *   PotionEffect(type, duration, amplifier)
 *   PotionEffect(type, duration, amplifier, ambient)
 *   PotionEffect(type, duration, amplifier, ambient, particles)
 *   PotionEffect(type, duration, amplifier, ambient, particles, icon)
 *
 * @param type - Effect type (e.g., PotionEffectType.SPEED)
 * @param duration - Measured in ticks (20 ticks = 1 second), use INFINITE_DURATION for infinite
 * @param amplifier - The amplifier (0 = level I, 1 = level II, etc.)
 * @param ambient - The ambient status, makes particles more translucent (default: false)
 * @param particles - Whether to show particles (default: true)
 * @param icon - Whether to show the icon in HUD (default: true)
 * @returns A new PotionEffect instance
 *
 * @example
 * // Speed II for 10 seconds
 * createPotionEffect(PotionEffectType.SPEED, 200, 1)
 *
 * // Infinite invisibility with ambient particles
 * createPotionEffect(PotionEffectType.INVISIBILITY, INFINITE_DURATION, 0, true)
 *
 * // Hidden regeneration (no particles, no icon)
 * createPotionEffect(PotionEffectType.REGENERATION, 600, 2, false, false, false)
 */
export function createPotionEffect(
  type: BukkitPotionEffectType,
  duration: number,
  amplifier: number,
  ambient: boolean = false,
  particles: boolean = true,
  icon: boolean = true
): BukkitPotionEffect {
  return new org.bukkit.potion.PotionEffect(
    type,
    duration,
    amplifier,
    ambient,
    particles,
    icon
  );
}

/**
 * Creates a potion effect with infinite duration.
 *
 * Convenience function for creating effects that never expire.
 *
 * @param type - Effect type
 * @param amplifier - The amplifier (0 = level I)
 * @param ambient - The ambient status (default: false)
 * @param particles - Whether to show particles (default: true)
 * @param icon - Whether to show the icon (default: true)
 * @returns A new PotionEffect with infinite duration
 *
 * @example
 * // Permanent night vision
 * createInfinitePotionEffect(PotionEffectType.NIGHT_VISION, 0)
 */
export function createInfinitePotionEffect(
  type: BukkitPotionEffectType,
  amplifier: number,
  ambient: boolean = false,
  particles: boolean = true,
  icon: boolean = true
): BukkitPotionEffect {
  return createPotionEffect(
    type,
    INFINITE_DURATION,
    amplifier,
    ambient,
    particles,
    icon
  );
}