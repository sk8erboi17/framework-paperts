/**
 * Represents a type of effect that occurs when damage is inflicted.
 * 
 * Currently, effects only determine the sound that plays when
 * an entity takes damage.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/damage/DamageEffect.html
 */

import { BukkitSound } from "../../sounds/types/soundType";


// ============================================
// TYPE DEFINITIONS
// ============================================

export type DamageEffectKey = "HURT" | "THORNS" | "DROWNING" | "BURNING" | "POKING" | "FREEZING";

// ============================================
// INTERFACE
// ============================================

export interface BukkitDamageEffect {
  /**
   * The sound played when this damage effect occurs.
   */
  getSound(): BukkitSound;
}

// ============================================
// DAMAGE EFFECT CLASS INTERFACE
// ============================================

interface DamageEffectClass extends Record<DamageEffectKey, BukkitDamageEffect> {
}

// ============================================
// DAMAGE EFFECTS
// ============================================

export const DamageEffect: DamageEffectClass = {
  /** Default damage sound. Generic hurt sound. */
  HURT: org.bukkit.damage.DamageEffect.HURT,

  /** Thorns enchantment damage sound. */
  THORNS: org.bukkit.damage.DamageEffect.THORNS,

  /** Drowning damage sound. */
  DROWNING: org.bukkit.damage.DamageEffect.DROWNING,

  /** Fire/lava burn tick sound. */
  BURNING: org.bukkit.damage.DamageEffect.BURNING,

  /** Sweet berry bush poke sound. */
  POKING: org.bukkit.damage.DamageEffect.POKING,

  /** Powder snow freeze tick sound. */
  FREEZING: org.bukkit.damage.DamageEffect.FREEZING,
};