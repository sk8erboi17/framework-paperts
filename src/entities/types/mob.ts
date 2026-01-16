/**
 * DESIGN
 * ------
 * Mob represents living entities with simple AI behavior.
 * 
 * MOB HIERARCHY:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                       MOB TYPES                             │
 *   │                                                             │
 *   │                      ┌───────┐                              │
 *   │                      │  Mob  │                              │
 *   │                      └───┬───┘                              │
 *   │                          │                                  │
 *   │          ┌───────────────┼───────────────┐                  │
 *   │          │               │               │                  │
 *   │     ┌────┴────┐    ┌─────┴─────┐   ┌─────┴─────┐            │
 *   │     │ Monster │    │  Animals  │   │    NPC    │            │
 *   │     │(hostile)│    │ (passive) │   │(villager) │            │
 *   │     └────┬────┘    └─────┬─────┘   └───────────┘            │
 *   │          │               │                                  │
 *   │   ┌──────┼──────┐   ┌────┼────┐                             │
 *   │   │      │      │   │    │    │                             │
 *   │ Zombie Skeleton │  Cow  Pig  Sheep                          │
 *   │        Creeper                                              │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * MOB AI SYSTEM:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                     MOB AWARENESS                           │
 *   │                                                             │
 *   │   AWARE (default):                                          │
 *   │   ┌─────────┐     ┌─────────┐     ┌─────────┐               │
 *   │   │ Detect  │ ──► │ Target  │ ──► │ Attack/ │               │
 *   │   │ Player  │     │ Player  │     │ Follow  │               │
 *   │   └─────────┘     └─────────┘     └─────────┘               │
 *   │                                                             │
 *   │   UNAWARE:                                                  │
 *   │   ┌─────────┐                                               │
 *   │   │  Idle   │  No autonomous actions                        │
 *   │   │  State  │  Still reacts to damage/push                  │
 *   │   └─────────┘                                               │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * TARGETING:
 * 
 *   Hostile mobs:
 *   ┌────────┐         ┌────────┐
 *   │ Zombie │ ──────► │ Player │  Attacks target
 *   └────────┘ target  └────────┘
 * 
 *   Friendly mobs:
 *   ┌────────┐         ┌────────┐
 *   │  Wolf  │ ──────► │ Owner  │  Follows target
 *   └────────┘ target  └────────┘
 * 
 * AMBIENT SOUNDS:
 * - Each mob has unique idle sounds
 * - Sound varies by state (e.g., villager trading vs idle)
 * - Some mobs are silent in certain states (sleeping)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Mob.html
 */

import { BukkitSound } from "../../sounds/types/soundType";
import { BukkitEntity } from "./bukkitEntity";
import { BukkitLivingEntity } from "./bukkitLivingEntity";
import { BukkitLootable } from "./loottable";


// ============================================
// INTERFACE
// ============================================

/**
 * A living entity with simple AI behavior.
 * 
 * Mobs can:
 * - Target other entities
 * - Be aware or unaware of surroundings
 * - Make ambient sounds
 * - Have loot tables for drops
 */
export interface BukkitMob extends BukkitLivingEntity, BukkitLootable {
  /**
   * Set this mob's target.
   * 
   * - Hostile mobs will attack their target
   * - Friendly mobs may follow their target
   * 
   * @param target Entity to target, or null to clear
   * 
   * @example
   * // Make zombie target a player
   * zombie.setTarget(player);
   * 
   * // Clear target
   * zombie.setTarget(null);
   */
  setTarget(target: BukkitLivingEntity | null): void;

  /**
   * Get this mob's current target.
   * 
   * @returns Current target or null if none
   * 
   * @example
   * const target = zombie.getTarget();
   * if (target !== null) {
   *   console.log(`Zombie is targeting: ${target.getName()}`);
   * }
   */
  getTarget(): BukkitLivingEntity | null;

  /**
   * Set whether this mob is aware of its surroundings.
   * 
   * Unaware mobs:
   * - Won't move or act on their own
   * - Still react to damage, pushing, etc.
   * - May have other behaviors disabled (like drowning)
   * 
   * @param aware Whether the mob should be aware
   * 
   * @example
   * // Freeze a mob in place
   * mob.setAware(false);
   * 
   * // Re-enable AI
   * mob.setAware(true);
   */
  setAware(aware: boolean): void;

  /**
   * Check if this mob is aware of its surroundings.
   * 
   * @returns true if aware, false if unaware
   * 
   * @example
   * if (!mob.isAware()) {
   *   console.log("Mob AI is disabled");
   * }
   */
  isAware(): boolean;

  /**
   * Get the ambient sound this mob makes.
   * 
   * The sound may vary depending on mob state.
   * Returns null if the mob is currently silent.
   * 
   * @returns Ambient sound or null if silent
   * 
   * @example
   * const sound = villager.getAmbientSound();
   * if (sound !== null) {
   *   // Play the sound elsewhere
   *   world.playSound(location, sound, 1.0, 1.0);
   * }
   */
  getAmbientSound(): BukkitSound | null;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if entity is a Mob.
 * 
 * @example
 * if (isMob(entity)) {
 *   entity.setTarget(player);
 * }
 */
export function isMob(entity: BukkitEntity): entity is BukkitMob {
  return typeof (entity as any).setTarget === "function" &&
         typeof (entity as any).getTarget === "function" &&
         typeof (entity as any).isAware === "function" &&
         typeof (entity as any).setAware === "function";
}

// ============================================
// TARGETING UTILITIES
// ============================================

/**
 * Check if mob has a target.
 */
export function hasTarget(mob: BukkitMob): boolean {
  return mob.getTarget() !== null;
}

/**
 * Check if mob is targeting a specific entity.
 */
export function isTargeting(mob: BukkitMob, entity: BukkitLivingEntity): boolean {
  const target = mob.getTarget();
  if (target === null) return false;
  return target.getUniqueId().toString() === entity.getUniqueId().toString();
}

/**
 * Clear mob's target.
 */
export function clearTarget(mob: BukkitMob): void {
  mob.setTarget(null);
}

/**
 * Transfer target from one mob to another.
 * 
 * @example
 * // Make zombie2 target whatever zombie1 is targeting
 * transferTarget(zombie1, zombie2);
 */
export function transferTarget(source: BukkitMob, destination: BukkitMob): void {
  destination.setTarget(source.getTarget());
}

/**
 * Set same target for multiple mobs.
 * 
 * @example
 * // Make all zombies target the player
 * setTargetBatch(zombies, player);
 */
export function setTargetBatch(
  mobs: BukkitMob[],
  target: BukkitLivingEntity | null
): void {
  for (const mob of mobs) {
    mob.setTarget(target);
  }
}

/**
 * Clear targets from multiple mobs.
 */
export function clearTargetBatch(mobs: BukkitMob[]): void {
  setTargetBatch(mobs, null);
}

/**
 * Get all mobs targeting a specific entity.
 */
export function getMobsTargeting(
  mobs: BukkitMob[],
  target: BukkitLivingEntity
): BukkitMob[] {
  return mobs.filter(mob => isTargeting(mob, target));
}

/**
 * Count mobs targeting a specific entity.
 */
export function countMobsTargeting(
  mobs: BukkitMob[],
  target: BukkitLivingEntity
): number {
  return getMobsTargeting(mobs, target).length;
}

// ============================================
// AWARENESS UTILITIES
// ============================================

/**
 * Disable mob AI (make unaware).
 * 
 * @example
 * // Freeze mob for display
 * disableAI(mob);
 */
export function disableAI(mob: BukkitMob): void {
  mob.setAware(false);
}

/**
 * Enable mob AI (make aware).
 */
export function enableAI(mob: BukkitMob): void {
  mob.setAware(true);
}

/**
 * Toggle mob awareness.
 * 
 * @returns New awareness state
 */
export function toggleAwareness(mob: BukkitMob): boolean {
  const newState = !mob.isAware();
  mob.setAware(newState);
  return newState;
}

/**
 * Set awareness for multiple mobs.
 */
export function setAwarenessBatch(mobs: BukkitMob[], aware: boolean): void {
  for (const mob of mobs) {
    mob.setAware(aware);
  }
}

/**
 * Disable AI for multiple mobs.
 */
export function disableAIBatch(mobs: BukkitMob[]): void {
  setAwarenessBatch(mobs, false);
}

/**
 * Enable AI for multiple mobs.
 */
export function enableAIBatch(mobs: BukkitMob[]): void {
  setAwarenessBatch(mobs, true);
}

/**
 * Filter mobs by awareness state.
 */
export function filterByAwareness(mobs: BukkitMob[], aware: boolean): BukkitMob[] {
  return mobs.filter(mob => mob.isAware() === aware);
}

/**
 * Get all aware mobs.
 */
export function getAwareMobs(mobs: BukkitMob[]): BukkitMob[] {
  return filterByAwareness(mobs, true);
}

/**
 * Get all unaware mobs.
 */
export function getUnawareMobs(mobs: BukkitMob[]): BukkitMob[] {
  return filterByAwareness(mobs, false);
}

// ============================================
// AMBIENT SOUND UTILITIES
// ============================================

/**
 * Check if mob has an ambient sound.
 */
export function hasAmbientSound(mob: BukkitMob): boolean {
  return mob.getAmbientSound() !== null;
}

/**
 * Check if mob is currently silent (no ambient sound).
 */
export function isSilent(mob: BukkitMob): boolean {
  return mob.getAmbientSound() === null;
}

/**
 * Play mob's ambient sound at its location.
 * 
 * @param mob Mob to play sound for
 * @param volume Sound volume (0.0 to 1.0)
 * @param pitch Sound pitch (0.5 to 2.0)
 * @returns true if sound was played, false if mob is silent
 */
export function playAmbientSound(
  mob: BukkitMob,
  volume: number = 1.0,
  pitch: number = 1.0
): boolean {
  const sound = mob.getAmbientSound();
  if (sound === null) return false;
  
  const location = mob.getLocation();
  const world = location.getWorld();
  
  if (world !== null) {
    world.playSound(location, sound, volume, pitch);
    return true;
  }
  
  return false;
}

/**
 * Play mob's ambient sound at a different location.
 */
export function playAmbientSoundAt(
  mob: BukkitMob,
  location: any,
  volume: number = 1.0,
  pitch: number = 1.0
): boolean {
  const sound = mob.getAmbientSound();
  if (sound === null) return false;
  
  const world = location.getWorld();
  
  if (world !== null) {
    world.playSound(location, sound, volume, pitch);
    return true;
  }
  
  return false;
}

// ============================================
// COMBINED STATE UTILITIES
// ============================================

/**
 * Freeze mob completely (disable AI and clear target).
 */
export function freezeMob(mob: BukkitMob): void {
  mob.setAware(false);
  mob.setTarget(null);
}

/**
 * Unfreeze mob (enable AI).
 */
export function unfreezeMob(mob: BukkitMob): void {
  mob.setAware(true);
}

/**
 * Freeze multiple mobs.
 */
export function freezeMobBatch(mobs: BukkitMob[]): void {
  for (const mob of mobs) {
    freezeMob(mob);
  }
}

/**
 * Unfreeze multiple mobs.
 */
export function unfreezeMobBatch(mobs: BukkitMob[]): void {
  for (const mob of mobs) {
    unfreezeMob(mob);
  }
}

/**
 * Make mob aggressive toward target.
 * 
 * Enables AI and sets target.
 */
export function makeAggressive(mob: BukkitMob, target: BukkitLivingEntity): void {
  mob.setAware(true);
  mob.setTarget(target);
}

/**
 * Make mob passive.
 * 
 * Clears target but keeps AI enabled.
 */
export function makePassive(mob: BukkitMob): void {
  mob.setTarget(null);
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe mob state.
 */
export function describeMob(mob: BukkitMob): string {
  const type = mob.getType().name();
  const aware = mob.isAware() ? "aware" : "unaware";
  const target = mob.getTarget();
  const targetStr = target !== null ? `targeting ${target.getType().name()}` : "no target";
  
  return `${type} (${aware}, ${targetStr})`;
}

/**
 * Get mob info as plain object.
 */
export function getMobInfo(mob: BukkitMob): {
  type: string;
  health: number;
  maxHealth: number;
  isAware: boolean;
  hasTarget: boolean;
  targetType: string | null;
  hasAmbientSound: boolean;
  hasLootTable: boolean;
} {
  const target = mob.getTarget();
  
  return {
    type: mob.getType().name(),
    health: mob.getHealth(),
    maxHealth: mob.getMaxHealth(),
    isAware: mob.isAware(),
    hasTarget: target !== null,
    targetType: target?.getType().name() ?? null,
    hasAmbientSound: mob.getAmbientSound() !== null,
    hasLootTable: mob.getLootTable() !== null,
  };
}

/**
 * Get summary of multiple mobs.
 */
export function getMobSummary(mobs: BukkitMob[]): {
  total: number;
  aware: number;
  unaware: number;
  withTarget: number;
  withLootTable: number;
  typeCount: Map<string, number>;
} {
  let aware = 0;
  let unaware = 0;
  let withTarget = 0;
  let withLootTable = 0;
  const typeCount = new Map<string, number>();
  
  for (const mob of mobs) {
    if (mob.isAware()) {
      aware++;
    } else {
      unaware++;
    }
    
    if (hasTarget(mob)) {
      withTarget++;
    }
    
    if (mob.getLootTable() !== null) {
      withLootTable++;
    }
    
    const type = mob.getType().name();
    typeCount.set(type, (typeCount.get(type) ?? 0) + 1);
  }
  
  return {
    total: mobs.length,
    aware,
    unaware,
    withTarget,
    withLootTable,
    typeCount,
  };
}

// ============================================
// FINDING UTILITIES
// ============================================

/**
 * Find mobs by type.
 */
export function findMobsByType(mobs: BukkitMob[], typeName: string): BukkitMob[] {
  return mobs.filter(mob => mob.getType().name() === typeName);
}

/**
 * Find nearest mob to a location.
 */
export function findNearestMob(
  mobs: BukkitMob[],
  location: { getX(): number; getY(): number; getZ(): number }
): BukkitMob | null {
  if (mobs.length === 0) return null;
  
  let nearest: BukkitMob = mobs[0];
  let nearestDistSq = Number.MAX_VALUE;
  
  for (const mob of mobs) {
    const mobLoc = mob.getLocation();
    const dx = mobLoc.getX() - location.getX();
    const dy = mobLoc.getY() - location.getY();
    const dz = mobLoc.getZ() - location.getZ();
    const distSq = dx * dx + dy * dy + dz * dz;
    
    if (distSq < nearestDistSq) {
      nearestDistSq = distSq;
      nearest = mob;
    }
  }
  
  return nearest;
}

/**
 * Find mobs within range of a location.
 */
export function findMobsInRange(
  mobs: BukkitMob[],
  location: { getX(): number; getY(): number; getZ(): number },
  range: number
): BukkitMob[] {
  const rangeSquared = range * range;
  
  return mobs.filter(mob => {
    const mobLoc = mob.getLocation();
    const dx = mobLoc.getX() - location.getX();
    const dy = mobLoc.getY() - location.getY();
    const dz = mobLoc.getZ() - location.getZ();
    return dx * dx + dy * dy + dz * dz <= rangeSquared;
  });
}