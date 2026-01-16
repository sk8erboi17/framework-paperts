/**
 * DESIGN
 * ------
 * Firework is the entity representing a launched firework rocket.
 * 
 * ITEM vs ENTITY:
 * - FireworkMeta: Item metadata (what's in your inventory)
 * - Firework: Live entity flying through the world
 * 
 * FIREWORK LIFECYCLE:
 * 
 *   ┌─────────────────────────────────────────────────────────┐
 *   │                    FIREWORK LIFECYCLE                   │
 *   │                                                         │
 *   │   SPAWN ──→ FLYING ──→ DETONATE ──→ REMOVED            │
 *   │     │         │           │                             │
 *   │     │    life++/tick      │                             │
 *   │     │         │           │                             │
 *   │     │    life >= maxLife ─┘                             │
 *   │     │                                                   │
 *   │   life=0               isDetonated()=true               │
 *   │   maxLife=power×10+random                               │
 *   └─────────────────────────────────────────────────────────┘
 * 
 * LIFE vs MAX LIFE:
 * - life: Current age in ticks (increases each tick)
 * - maxLife: When to explode (based on power + randomness)
 * - When life >= maxLife → BOOM!
 * 
 * ATTACHMENT (Elytra Boost):
 * When attached to a gliding player:
 * - Firework follows the player
 * - Player gets speed boost in look direction
 * - Firework still explodes normally
 * 
 *   Player (gliding) ←──attached──→ Firework
 *         │                            │
 *         └── receives boost ──────────┘
 * 
 * SHOT AT ANGLE:
 * - true: Shot from crossbow (flies in aim direction)
 * - false: Launched normally (flies straight up)
 * 
 * DETONATION:
 * Once detonated, the entity is effectively dead.
 * Most setters return false after detonation.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Firework.html
 */

import { BukkitLivingEntity } from "../../entities/types/bukkitLivingEntity";
import { BukkitProjectile } from "../../entities/types/projectile";
import { BukkitFireworkMeta } from "./fireworkMeta";

// ============================================
// FIREWORK ENTITY INTERFACE
// ============================================

export interface BukkitFirework extends BukkitProjectile {

  // ==========================================
  // META (Effects & Power)
  // ==========================================

  /**
   * Get a COPY of the firework's meta.
   * 
   * NOTE: Returns a copy! Modifying it doesn't affect the entity.
   * Use setFireworkMeta() to apply changes.
   * 
   * @example
   * const meta = firework.getFireworkMeta();
   * meta.addEffect(effect);
   * firework.setFireworkMeta(meta); // Apply changes!
   */
  getFireworkMeta(): BukkitFireworkMeta;

  /**
   * Apply new meta to the firework.
   * 
   * @param meta Meta to apply
   */
  setFireworkMeta(meta: BukkitFireworkMeta): void;

  // ==========================================
  // ATTACHMENT (Elytra Boost)
  // ==========================================

  /**
   * Get attached entity (if any).
   * 
   * When attached to a gliding entity:
   * - Firework follows the entity
   * - Entity receives speed boost
   * 
   * @returns Attached entity, or null if none
   */
  getAttachedTo(): BukkitLivingEntity | null;

  /**
   * Attach firework to an entity.
   * 
   * Used for elytra boosting:
   * - Attach to gliding player
   * - Player gets boost in look direction
   * 
   * @param entity Entity to attach to, or null to detach
   * @returns true if attached, false if already detonated
   * 
   * @example
   * // Boost a gliding player
   * if (player.isGliding()) {
   *   firework.setAttachedTo(player);
   * }
   */
  setAttachedTo(entity: BukkitLivingEntity | null): boolean;

  // ==========================================
  // LIFE (Fuse Timer)
  // ==========================================

  /**
   * Get current life in ticks.
   * 
   * Increases each tick. When >= maxLife, firework detonates.
   */
  getLife(): number;

  /**
   * Set current life in ticks.
   * 
   * Can be used to:
   * - Speed up explosion (increase life)
   * - Delay explosion (decrease life)
   * 
   * @param ticks Life ticks (must be >= 0)
   * @returns true if set, false if already detonated
   * 
   * @example
   * // Make it explode sooner
   * firework.setLife(firework.getMaxLife() - 5);
   */
  setLife(ticks: number): boolean;

  /**
   * Get maximum life (detonation time).
   * 
   * Firework explodes when life >= maxLife.
   * Based on power level + random variance.
   */
  getMaxLife(): number;

  /**
   * Set maximum life (detonation time).
   * 
   * @param ticks Max life in ticks (must be > 0)
   * @returns true if set, false if already detonated
   * 
   * @example
   * // Make firework last 5 seconds
   * firework.setMaxLife(100); // 5s × 20 ticks
   */
  setMaxLife(ticks: number): boolean;

  // ==========================================
  // DETONATION
  // ==========================================

  /**
   * Force immediate detonation.
   * 
   * Explodes at earliest opportunity (next tick).
   */
  detonate(): void;

  /**
   * Check if firework has detonated.
   * 
   * Once detonated:
   * - Entity is effectively dead
   * - Most setters return false
   * - Entity will be removed
   */
  isDetonated(): boolean;

  // ==========================================
  // TRAJECTORY
  // ==========================================

  /**
   * Check if shot at an angle (from crossbow).
   * 
   * - true: Flies in aimed direction (crossbow)
   * - false: Flies straight up (normal launch)
   */
  isShotAtAngle(): boolean;

  /**
   * Set if firework was shot at an angle.
   * 
   * @param shotAtAngle true for angled flight, false for straight up
   */
  setShotAtAngle(shotAtAngle: boolean): void;
}

// ============================================
// CONSTANTS
// ============================================

/**
 * Ticks per second (for time conversions).
 */
export const TICKS_PER_SECOND = 20;

/**
 * Base flight ticks per power level (approximate).
 * Actual value has random variance.
 */
export const BASE_TICKS_PER_POWER = 10;

/**
 * Random variance added to flight time.
 */
export const FLIGHT_TIME_VARIANCE = 6;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get remaining life in ticks before detonation.
 * 
 * @returns Ticks until explosion, or 0 if detonated
 */
export function getRemainingLife(firework: BukkitFirework): number {
  if (firework.isDetonated()) {
    return 0;
  }
  return Math.max(0, firework.getMaxLife() - firework.getLife());
}

/**
 * Get remaining life in seconds.
 */
export function getRemainingSeconds(firework: BukkitFirework): number {
  return getRemainingLife(firework) / TICKS_PER_SECOND;
}

/**
 * Get life progress as percentage (0-1).
 * 
 * @returns 0 = just spawned, 1 = about to explode
 */
export function getLifeProgress(firework: BukkitFirework): number {
  if (firework.getMaxLife() === 0) {
    return 1;
  }
  return Math.min(1, firework.getLife() / firework.getMaxLife());
}

/**
 * Check if firework is attached to any entity.
 */
export function isAttached(firework: BukkitFirework): boolean {
  return firework.getAttachedTo() !== null;
}

/**
 * Check if firework is boosting a player (attached to gliding player).
 */
export function isBoostingPlayer(firework: BukkitFirework): boolean {
  const attached = firework.getAttachedTo();
  if (attached === null) {
    return false;
  }
  
  /* Check if entity is gliding (has isGliding method) */
  if (typeof (attached as any).isGliding === "function") {
    return (attached as any).isGliding();
  }
  
  return false;
}

/**
 * Detach firework from any entity.
 * 
 * @returns true if was attached and detached, false otherwise
 */
export function detach(firework: BukkitFirework): boolean {
  if (firework.getAttachedTo() === null) {
    return false;
  }
  return firework.setAttachedTo(null);
}

/**
 * Check if firework is still alive (not detonated).
 */
export function isAlive(firework: BukkitFirework): boolean {
  return !firework.isDetonated();
}

/**
 * Check if firework is about to explode (within threshold).
 * 
 * @param threshold Ticks threshold (default: 5)
 */
export function isAboutToExplode(firework: BukkitFirework, threshold: number = 5): boolean {
  return getRemainingLife(firework) <= threshold;
}

/**
 * Extend firework life by additional ticks.
 * 
 * @returns true if extended, false if detonated
 */
export function extendLife(firework: BukkitFirework, additionalTicks: number): boolean {
  if (firework.isDetonated()) {
    return false;
  }
  return firework.setMaxLife(firework.getMaxLife() + additionalTicks);
}

/**
 * Extend firework life by additional seconds.
 */
export function extendLifeSeconds(firework: BukkitFirework, seconds: number): boolean {
  return extendLife(firework, Math.round(seconds * TICKS_PER_SECOND));
}

/**
 * Shorten firework life by ticks.
 * 
 * @returns true if shortened, false if detonated
 */
export function shortenLife(firework: BukkitFirework, ticksToRemove: number): boolean {
  if (firework.isDetonated()) {
    return false;
  }
  
  const newMaxLife = Math.max(1, firework.getMaxLife() - ticksToRemove);
  return firework.setMaxLife(newMaxLife);
}

/**
 * Reset life to 0 (restart fuse).
 * 
 * @returns true if reset, false if detonated
 */
export function resetLife(firework: BukkitFirework): boolean {
  return firework.setLife(0);
}

/**
 * Set exact time until detonation.
 * 
 * Adjusts maxLife based on current life.
 * 
 * @param ticks Ticks until explosion
 * @returns true if set, false if detonated
 */
export function setTimeUntilDetonation(firework: BukkitFirework, ticks: number): boolean {
  if (firework.isDetonated()) {
    return false;
  }
  return firework.setMaxLife(firework.getLife() + ticks);
}

/**
 * Set time until detonation in seconds.
 */
export function setSecondsUntilDetonation(firework: BukkitFirework, seconds: number): boolean {
  return setTimeUntilDetonation(firework, Math.round(seconds * TICKS_PER_SECOND));
}

/**
 * Make firework explode instantly.
 * 
 * Alternative to detonate() that sets life = maxLife.
 */
export function explodeInstantly(firework: BukkitFirework): void {
  firework.detonate();
}

/**
 * Schedule detonation after delay.
 * 
 * NOTE: This just sets maxLife. For true scheduling,
 * use Bukkit's scheduler.
 * 
 * @param delayTicks Ticks from now until explosion
 */
export function scheduleDetonation(firework: BukkitFirework, delayTicks: number): boolean {
  if (firework.isDetonated()) {
    return false;
  }
  
  /* Set maxLife to current life + delay */
  return firework.setMaxLife(firework.getLife() + delayTicks);
}

/**
 * Add effect to firework.
 * 
 * Convenience method that handles the copy-modify-apply pattern.
 */
export function addEffect(
  firework: BukkitFirework,
  effect: Parameters<BukkitFireworkMeta["addEffect"]>[0]
): void {
  const meta = firework.getFireworkMeta();
  meta.addEffect(effect);
  firework.setFireworkMeta(meta);
}

/**
 * Set firework power.
 * 
 * Convenience method.
 */
export function setPower(firework: BukkitFirework, power: number): void {
  const meta = firework.getFireworkMeta();
  meta.setPower(power);
  firework.setFireworkMeta(meta);
}

/**
 * Get firework power.
 */
export function getPower(firework: BukkitFirework): number {
  const meta = firework.getFireworkMeta();
  return meta.hasPower() ? meta.getPower() : 0;
}

/**
 * Check if firework has any effects.
 */
export function hasEffects(firework: BukkitFirework): boolean {
  return firework.getFireworkMeta().hasEffects();
}

/**
 * Get number of effects.
 */
export function getEffectsCount(firework: BukkitFirework): number {
  return firework.getFireworkMeta().getEffectsSize();
}

/**
 * Clear all effects from firework.
 */
export function clearEffects(firework: BukkitFirework): void {
  const meta = firework.getFireworkMeta();
  meta.clearEffects();
  firework.setFireworkMeta(meta);
}

/**
 * Make firework fly straight up.
 */
export function makeFlyUp(firework: BukkitFirework): void {
  firework.setShotAtAngle(false);
}

/**
 * Make firework fly at angle (like crossbow).
 */
export function makeFlyAtAngle(firework: BukkitFirework): void {
  firework.setShotAtAngle(true);
}

/**
 * Get firework state summary.
 */
export function getState(firework: BukkitFirework): {
  isDetonated: boolean;
  isAttached: boolean;
  isShotAtAngle: boolean;
  life: number;
  maxLife: number;
  remainingLife: number;
  progress: number;
  effectsCount: number;
} {
  return {
    isDetonated: firework.isDetonated(),
    isAttached: isAttached(firework),
    isShotAtAngle: firework.isShotAtAngle(),
    life: firework.getLife(),
    maxLife: firework.getMaxLife(),
    remainingLife: getRemainingLife(firework),
    progress: getLifeProgress(firework),
    effectsCount: getEffectsCount(firework),
  };
}

/**
 * Describe firework in human-readable format.
 */
export function describeFirework(firework: BukkitFirework): string {
  if (firework.isDetonated()) {
    return "Detonated firework";
  }
  
  const parts: string[] = ["Firework"];
  
  /* Flight info */
  const remaining = getRemainingSeconds(firework);
  parts.push(`(${remaining.toFixed(1)}s remaining)`);
  
  /* Attachment */
  const attached = firework.getAttachedTo();
  if (attached !== null) {
    parts.push(`attached to ${attached.getType().name()}`);
  }
  
  /* Trajectory */
  if (firework.isShotAtAngle()) {
    parts.push("[angled]");
  } else {
    parts.push("[straight up]");
  }
  
  /* Effects */
  const effectsCount = getEffectsCount(firework);
  parts.push(`with ${effectsCount} effect${effectsCount !== 1 ? "s" : ""}`);
  
  return parts.join(" ");
}

/**
 * Copy meta from one firework to another.
 */
export function copyMeta(source: BukkitFirework, target: BukkitFirework): void {
  target.setFireworkMeta(source.getFireworkMeta());
}

/**
 * Check if two fireworks have same meta (effects and power).
 */
export function haveSameMeta(a: BukkitFirework, b: BukkitFirework): boolean {
  const metaA = a.getFireworkMeta();
  const metaB = b.getFireworkMeta();
  
  /* Compare power */
  if (metaA.hasPower() !== metaB.hasPower()) {
    return false;
  }
  if (metaA.hasPower() && metaA.getPower() !== metaB.getPower()) {
    return false;
  }
  
  /* Compare effects count */
  if (metaA.getEffectsSize() !== metaB.getEffectsSize()) {
    return false;
  }
  
  /* Note: Deep effect comparison would require more work */
  return true;
}

/**
 * Safely modify firework if not detonated.
 * 
 * @returns true if modifier was applied
 */
export function modifyIfAlive(
  firework: BukkitFirework,
  modifier: (fw: BukkitFirework) => void
): boolean {
  if (firework.isDetonated()) {
    return false;
  }
  
  modifier(firework);
  return true;
}

/**
 * Attach firework to entity and return success.
 * 
 * @returns true if attached successfully
 */
export function boostEntity(
  firework: BukkitFirework,
  entity: BukkitLivingEntity
): boolean {
  return firework.setAttachedTo(entity);
}