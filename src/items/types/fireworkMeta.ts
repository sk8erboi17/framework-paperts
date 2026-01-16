/**
 * DESIGN
 * ------
 * FireworkMeta is the ItemMeta for FIREWORK_ROCKET items.
 * 
 * FIREWORK ANATOMY:
 * 
 *   ┌─────────────────────────────────────────┐
 *   │           FIREWORK ROCKET               │
 *   │                                         │
 *   │   Power (0-255)                         │
 *   │   └─ Flight duration = power × 0.5s    │
 *   │                                         │
 *   │   Effects[] (multiple explosions)       │
 *   │   ├─ Effect 1: STAR, Red/Blue, Trail   │
 *   │   ├─ Effect 2: BURST, Gold, Flicker    │
 *   │   └─ Effect 3: CREEPER, Green          │
 *   │                                         │
 *   └─────────────────────────────────────────┘
 * 
 * POWER vs EFFECTS:
 * - Power: How HIGH the rocket flies (duration)
 * - Effects: What happens when it EXPLODES
 * 
 * POWER LEVELS:
 *   Power 0: ~0.5 seconds flight (low burst)
 *   Power 1: ~1.0 seconds flight (normal)
 *   Power 2: ~1.5 seconds flight (high)
 *   Power 3: ~2.0 seconds flight (very high)
 *   ...
 *   Power 255: Maximum possible
 * 
 * CRAFTING RELATIONSHIP:
 * - Gunpowder count = power level (1-3 in vanilla crafting)
 * - Firework stars = effects
 * 
 * MULTIPLE EFFECTS:
 * When a firework has multiple effects, they ALL explode
 * simultaneously when the rocket reaches its apex.
 * 
 * USAGE:
 * - Right-click to launch from ground
 * - Right-click while gliding (elytra) to boost
 * - Dispensers can launch them
 * - Crossbows can shoot them
 * 
 * NOTE: This is for FIREWORK_ROCKET items.
 * For the entity, see Firework.
 * For explosion effects, see FireworkEffect.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/meta/FireworkMeta.html
 */

import { JavaList } from "../../java/types/list";
import { BukkitFireworkEffect } from "../../particles/type/fireworkEffect";
import { BukkitItemMeta } from "./itemstack";


// ============================================
// FIREWORK META INTERFACE
// ============================================

export interface BukkitFireworkMeta extends BukkitItemMeta {

  // ==========================================
  // EFFECTS - ADD
  // ==========================================

  /**
   * Add a single effect.
   * 
   * @param effect Effect to add
   * @throws IllegalArgumentException if effect is null
   */
  addEffect(effect: BukkitFireworkEffect): void;

  /**
   * Add multiple effects (varargs).
   * 
   * @param effects Effects to add
   * @throws IllegalArgumentException if effects or any effect is null
   */
  addEffects(...effects: BukkitFireworkEffect[]): void;

  /**
   * Add multiple effects (iterable).
   * 
   * @param effects Iterable of effects
   * @throws IllegalArgumentException if effects or any effect is null
   */
  addEffects(effects: Iterable<BukkitFireworkEffect>): void;

  // ==========================================
  // EFFECTS - QUERY
  // ==========================================

  /**
   * Get all effects.
   * 
   * @returns Immutable list of effects
   */
  getEffects(): JavaList<BukkitFireworkEffect>;

  /**
   * Get number of effects.
   */
  getEffectsSize(): number;

  /**
   * Check if firework has any effects.
   */
  hasEffects(): boolean;

  // ==========================================
  // EFFECTS - REMOVE
  // ==========================================

  /**
   * Remove effect at index.
   * 
   * @param index Effect index to remove
   * @throws IndexOutOfBoundsException if index out of range
   */
  removeEffect(index: number): void;

  /**
   * Remove all effects.
   */
  clearEffects(): void;

  // ==========================================
  // POWER
  // ==========================================

  /**
   * Check if power has been set.
   * 
   * Call this before getPower() to ensure value is valid.
   */
  hasPower(): boolean;

  /**
   * Get flight power.
   * 
   * Each power level = ~0.5 seconds of flight time.
   * 
   * NOTE: Check hasPower() first.
   * 
   * @returns Power level (0-255)
   */
  getPower(): number;

  /**
   * Set flight power.
   * 
   * @param power Power level (0-255)
   * @throws IllegalArgumentException if power < 0 or > 255
   */
  setPower(power: number): void;

  // ==========================================
  // CLONE
  // ==========================================

  /**
   * Clone this meta.
   */
  clone(): BukkitFireworkMeta;
}

// ============================================
// CONSTANTS
// ============================================

/**
 * Minimum power value.
 */
export const MIN_POWER = 0;

/**
 * Maximum power value.
 */
export const MAX_POWER = 255;

/**
 * Default power for crafted fireworks with 1 gunpowder.
 */
export const DEFAULT_POWER = 1;

/**
 * Approximate flight time per power level (in seconds).
 */
export const FLIGHT_TIME_PER_POWER = 0.5;

/**
 * Maximum gunpowder in vanilla crafting (limits power to 3).
 */
export const MAX_VANILLA_POWER = 3;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate approximate flight time in seconds.
 * 
 * @example
 * const time = getFlightTime(meta); // e.g., 1.5 seconds
 */
export function getFlightTime(meta: BukkitFireworkMeta): number {
  if (!meta.hasPower()) {
    return FLIGHT_TIME_PER_POWER; // Default ~0.5s
  }
  return meta.getPower() * FLIGHT_TIME_PER_POWER;
}

/**
 * Calculate approximate flight time in ticks.
 * 
 * @example
 * const ticks = getFlightTicks(meta); // e.g., 30 ticks
 */
export function getFlightTicks(meta: BukkitFireworkMeta): number {
  return Math.round(getFlightTime(meta) * 20); // 20 ticks per second
}

/**
 * Set power from desired flight time.
 * 
 * @param meta Meta to modify
 * @param seconds Desired flight time in seconds
 */
export function setPowerFromFlightTime(meta: BukkitFireworkMeta, seconds: number): void {
  const power = Math.round(seconds / FLIGHT_TIME_PER_POWER);
  const clampedPower = Math.max(MIN_POWER, Math.min(MAX_POWER, power));
  meta.setPower(clampedPower);
}

/**
 * Check if power is within vanilla crafting limits.
 */
export function isVanillaPower(meta: BukkitFireworkMeta): boolean {
  if (!meta.hasPower()) {
    return true;
  }
  return meta.getPower() <= MAX_VANILLA_POWER;
}

/**
 * Get all effects as array.
 */
export function getEffectsArray(meta: BukkitFireworkMeta): BukkitFireworkEffect[] {
  const effects = meta.getEffects();
  const result: BukkitFireworkEffect[] = [];
  
  for (let i = 0; i < effects.size(); i++) {
    result.push(effects.get(i));
  }
  
  return result;
}

/**
 * Get first effect or null.
 */
export function getFirstEffect(meta: BukkitFireworkMeta): BukkitFireworkEffect | null {
  if (!meta.hasEffects()) {
    return null;
  }
  return meta.getEffects().get(0);
}

/**
 * Get last effect or null.
 */
export function getLastEffect(meta: BukkitFireworkMeta): BukkitFireworkEffect | null {
  if (!meta.hasEffects()) {
    return null;
  }
  const effects = meta.getEffects();
  return effects.get(effects.size() - 1);
}

/**
 * Get effect at index or null if out of bounds.
 */
export function getEffectAt(meta: BukkitFireworkMeta, index: number): BukkitFireworkEffect | null {
  if (index < 0 || index >= meta.getEffectsSize()) {
    return null;
  }
  return meta.getEffects().get(index);
}

/**
 * Check if firework is "empty" (no effects).
 */
export function isEmpty(meta: BukkitFireworkMeta): boolean {
  return !meta.hasEffects();
}

/**
 * Check if firework is "complete" (has effects and power).
 */
export function isComplete(meta: BukkitFireworkMeta): boolean {
  return meta.hasEffects() && meta.hasPower();
}

/**
 * Replace all effects with new ones.
 */
export function setEffects(meta: BukkitFireworkMeta, effects: BukkitFireworkEffect[]): void {
  meta.clearEffects();
  for (const effect of effects) {
    meta.addEffect(effect);
  }
}

/**
 * Add effect at specific index by rebuilding.
 * 
 * NOTE: FireworkMeta doesn't have insertEffect, so we rebuild.
 */
export function insertEffect(
  meta: BukkitFireworkMeta,
  index: number,
  effect: BukkitFireworkEffect
): void {
  const effects = getEffectsArray(meta);
  effects.splice(index, 0, effect);
  setEffects(meta, effects);
}

/**
 * Replace effect at index.
 */
export function replaceEffect(
  meta: BukkitFireworkMeta,
  index: number,
  effect: BukkitFireworkEffect
): void {
  const effects = getEffectsArray(meta);
  if (index >= 0 && index < effects.length) {
    effects[index] = effect;
    setEffects(meta, effects);
  }
}

/**
 * Remove last effect.
 */
export function removeLastEffect(meta: BukkitFireworkMeta): void {
  if (meta.hasEffects()) {
    meta.removeEffect(meta.getEffectsSize() - 1);
  }
}

/**
 * Remove first effect.
 */
export function removeFirstEffect(meta: BukkitFireworkMeta): void {
  if (meta.hasEffects()) {
    meta.removeEffect(0);
  }
}

/**
 * Count effects of specific type.
 */
export function countEffectsByType(
  meta: BukkitFireworkMeta,
  typeName: string
): number {
  let count = 0;
  const effects = meta.getEffects();
  
  for (let i = 0; i < effects.size(); i++) {
    if (effects.get(i).getType().name() === typeName) {
      count++;
    }
  }
  
  return count;
}

/**
 * Check if any effect has flicker.
 */
export function hasAnyFlicker(meta: BukkitFireworkMeta): boolean {
  const effects = meta.getEffects();
  
  for (let i = 0; i < effects.size(); i++) {
    if (effects.get(i).hasFlicker()) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if any effect has trail.
 */
export function hasAnyTrail(meta: BukkitFireworkMeta): boolean {
  const effects = meta.getEffects();
  
  for (let i = 0; i < effects.size(); i++) {
    if (effects.get(i).hasTrail()) {
      return true;
    }
  }
  
  return false;
}

/**
 * Get all unique effect types used.
 */
export function getEffectTypes(meta: BukkitFireworkMeta): Set<string> {
  const types = new Set<string>();
  const effects = meta.getEffects();
  
  for (let i = 0; i < effects.size(); i++) {
    types.add(effects.get(i).getType().name());
  }
  
  return types;
}

/**
 * Describe firework in human-readable format.
 * 
 * @example
 * describeFirework(meta);
 * // "Power 2 firework with 3 effects (STAR, BURST, CREEPER)"
 */
export function describeFirework(meta: BukkitFireworkMeta): string {
  const parts: string[] = [];
  
  if (meta.hasPower()) {
    parts.push(`Power ${meta.getPower()}`);
  } else {
    parts.push("Default power");
  }
  
  parts.push("firework");
  
  if (meta.hasEffects()) {
    const count = meta.getEffectsSize();
    const types = Array.from(getEffectTypes(meta)).join(", ");
    parts.push(`with ${count} effect${count !== 1 ? "s" : ""} (${types})`);
  } else {
    parts.push("with no effects");
  }
  
  return parts.join(" ");
}

/**
 * Calculate "complexity" score for a firework.
 * 
 * Higher score = more elaborate firework.
 * Useful for pricing or limiting.
 */
export function calculateComplexity(meta: BukkitFireworkMeta): number {
  let score = 0;
  
  /* Power contributes to complexity */
  if (meta.hasPower()) {
    score += meta.getPower();
  }
  
  /* Each effect adds complexity */
  const effects = meta.getEffects();
  for (let i = 0; i < effects.size(); i++) {
    const effect = effects.get(i);
    
    /* Base score per effect */
    score += 1;
    
    /* Colors add complexity */
    score += effect.getColors().size() * 0.5;
    score += effect.getFadeColors().size() * 0.5;
    
    /* Properties add complexity */
    if (effect.hasFlicker()) score += 1;
    if (effect.hasTrail()) score += 1;
    
    /* Special types add complexity */
    const type = effect.getType().name();
    if (type === "STAR") score += 1;
    if (type === "CREEPER") score += 2;
    if (type === "BURST") score += 1;
    if (type === "BALL_LARGE") score += 0.5;
  }
  
  return score;
}

/**
 * Check if firework exceeds vanilla limits.
 * 
 * Vanilla crafting limits:
 * - Max 3 power (3 gunpowder)
 * - Max 7 effects (7 firework stars)
 */
export function exceedsVanillaLimits(meta: BukkitFireworkMeta): boolean {
  if (meta.hasPower() && meta.getPower() > 3) {
    return true;
  }
  if (meta.getEffectsSize() > 7) {
    return true;
  }
  return false;
}

/**
 * Clone firework meta with modified power.
 */
export function cloneWithPower(meta: BukkitFireworkMeta, power: number): BukkitFireworkMeta {
  const clone = meta.clone();
  clone.setPower(power);
  return clone;
}

/**
 * Clone firework meta with additional effect.
 */
export function cloneWithEffect(
  meta: BukkitFireworkMeta,
  effect: BukkitFireworkEffect
): BukkitFireworkMeta {
  const clone = meta.clone();
  clone.addEffect(effect);
  return clone;
}

/**
 * Merge effects from multiple firework metas.
 * 
 * @param target Meta to add effects to
 * @param sources Metas to copy effects from
 */
export function mergeEffects(
  target: BukkitFireworkMeta,
  ...sources: BukkitFireworkMeta[]
): void {
  for (const source of sources) {
    const effects = source.getEffects();
    for (let i = 0; i < effects.size(); i++) {
      target.addEffect(effects.get(i));
    }
  }
}

/**
 * Create firework config object for serialization.
 */
export function toConfig(meta: BukkitFireworkMeta): {
  power: number | null;
  effectCount: number;
  effectTypes: string[];
  hasFlicker: boolean;
  hasTrail: boolean;
} {
  return {
    power: meta.hasPower() ? meta.getPower() : null,
    effectCount: meta.getEffectsSize(),
    effectTypes: Array.from(getEffectTypes(meta)),
    hasFlicker: hasAnyFlicker(meta),
    hasTrail: hasAnyTrail(meta),
  };
}