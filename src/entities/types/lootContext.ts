/**
 * DESIGN
 * ------
 * LootContext provides additional information for LootTable generation.
 * 
 * LOOT GENERATION FLOW:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                  LOOT GENERATION                            │
 *   │                                                             │
 *   │   ┌──────────────┐     ┌─────────────┐     ┌────────────┐  │
 *   │   │  LootTable   │ ──► │ LootContext │ ──► │   Items    │  │
 *   │   │  (what can   │     │ (modifiers) │     │ (results)  │  │
 *   │   │   drop)      │     │             │     │            │  │
 *   │   └──────────────┘     └─────────────┘     └────────────┘  │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * LOOT CONTEXT COMPONENTS:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    LootContext                              │
 *   │                                                             │
 *   │   ┌─────────────┐                                           │
 *   │   │  Location   │  Required - where loot generates          │
 *   │   └─────────────┘                                           │
 *   │                                                             │
 *   │   ┌─────────────┐                                           │
 *   │   │    Luck     │  Optional - affects drop chances          │
 *   │   └─────────────┘  (from Luck potion effect)                │
 *   │                                                             │
 *   │   ┌─────────────┐                                           │
 *   │   │LootedEntity │  Optional - entity that was killed        │
 *   │   └─────────────┘                                           │
 *   │                                                             │
 *   │   ┌─────────────┐                                           │
 *   │   │   Killer    │  Optional - player who killed entity      │
 *   │   └─────────────┘  (used for looting enchantment)           │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * LUCK EFFECT:
 * - Higher luck = better drop chances
 * - Comes from Luck potion effect
 * - Affects "luck-based" loot table entries
 * 
 * USAGE EXAMPLE:
 * 
 *   // Create context for mob kill
 *   const context = new LootContext.Builder(location)
 *     .lootedEntity(zombie)
 *     .killer(player)
 *     .luck(1.0)
 *     .build();
 *   
 *   // Generate loot
 *   const items = lootTable.populateLoot(random, context);
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/loot/LootContext.html
 */

import { BukkitLocation } from "../../world/types/location";
import { BukkitEntity } from "./bukkitEntity";
import { BukkitHumanEntity } from "./bukkitHumanEntity";

// ============================================
// CONSTANTS
// ============================================

/**
 * Default loot modifier value.
 */
export const DEFAULT_LOOT_MODIFIER = 0;

// ============================================
// INTERFACE
// ============================================

/**
 * Context information for loot generation.
 * 
 * Provides modifiers that affect how a LootTable
 * generates its loot drops.
 * 
 * Created using LootContext.Builder.
 */
export interface BukkitLootContext {
  /**
   * Get the location where loot will generate.
   * 
   * @returns Loot generation location
   */
  getLocation(): BukkitLocation;

  /**
   * Get the luck modifier.
   * 
   * Higher luck means better drop chances.
   * Typically from Luck potion effect.
   * 
   * @returns Luck value
   */
  getLuck(): number;

  /**
   * Get the looting enchantment modifier.
   * 
   * @returns Looting level
   * @deprecated No longer functional as of 1.21
   */
  getLootingModifier(): number;

  /**
   * Get the entity that was killed/looted.
   * 
   * @returns Looted entity or null
   */
  getLootedEntity(): BukkitEntity | null;

  /**
   * Get the player who killed the entity.
   * 
   * Used to determine looting enchantment level
   * if not explicitly set.
   * 
   * @returns Killer or null
   */
  getKiller(): BukkitHumanEntity | null;
}

// ============================================
// BUILDER INTERFACE
// ============================================

/**
 * Builder for creating LootContext instances.
 * 
 * Only location (with valid world) is required.
 */
export interface BukkitLootContextBuilder {
  /**
   * Set the luck modifier.
   * 
   * @param luck Luck value
   * @returns This builder (for chaining)
   */
  luck(luck: number): BukkitLootContextBuilder;

  /**
   * Set the looting enchantment modifier.
   * 
   * @param modifier Looting level
   * @returns This builder (for chaining)
   * @deprecated No longer functional as of 1.21
   */
  lootingModifier(modifier: number): BukkitLootContextBuilder;

  /**
   * Set the entity that was killed.
   * 
   * @param lootedEntity Entity that was looted
   * @returns This builder (for chaining)
   */
  lootedEntity(lootedEntity: BukkitEntity | null): BukkitLootContextBuilder;

  /**
   * Set the killer entity.
   * 
   * Used to get looting level if not explicitly set.
   * 
   * @param killer Player who killed the entity
   * @returns This builder (for chaining)
   */
  killer(killer: BukkitHumanEntity | null): BukkitLootContextBuilder;

  /**
   * Build the LootContext.
   * 
   * @returns New LootContext instance
   */
  build(): BukkitLootContext;
}

// ============================================
// STATIC CLASS ACCESS
// ============================================

/**
 * LootContext class with Builder.
 */
export interface BukkitLootContextClass {
  /**
   * Default loot modifier constant.
   */
  readonly DEFAULT_LOOT_MODIFIER: number;

  /**
   * Builder class for creating LootContext.
   */
  Builder: new (location: BukkitLocation) => BukkitLootContextBuilder;
}

/**
 * Access to LootContext class.
 */
export const LootContext: BukkitLootContextClass = org.bukkit.loot.LootContext;

// ============================================
// CONFIGURATION INTERFACE
// ============================================

/**
 * Configuration options for LootContext.
 */
export interface LootContextConfig {
  /** Location (required) - must have valid world */
  location: BukkitLocation;
  /** Luck modifier */
  luck?: number;
  /** Entity that was killed */
  lootedEntity?: BukkitEntity | null;
  /** Player who killed */
  killer?: BukkitHumanEntity | null;
}

// ============================================
// FACTORY FUNCTIONS
// ============================================

/**
 * Create a new LootContext builder.
 * 
 * @param location Location where loot generates (must have valid world)
 * @returns New builder instance
 */
export function createLootContextBuilder(
  location: BukkitLocation
): BukkitLootContextBuilder {
  return new LootContext.Builder(location);
}

/**
 * Create a simple LootContext with just location.
 * 
 * @param location Location where loot generates
 * @returns New LootContext
 */
export function createSimpleLootContext(
  location: BukkitLocation
): BukkitLootContext {
  return new LootContext.Builder(location).build();
}

/**
 * Create a LootContext for a mob kill.
 * 
 * @param location Kill location
 * @param lootedEntity Entity that was killed
 * @param killer Player who killed (optional)
 * @param luck Luck modifier (optional)
 * @returns New LootContext
 */
export function createMobKillContext(
  location: BukkitLocation,
  lootedEntity: BukkitEntity,
  killer?: BukkitHumanEntity | null,
  luck?: number
): BukkitLootContext {
  let builder = new LootContext.Builder(location)
    .lootedEntity(lootedEntity);
  
  if (killer !== undefined && killer !== null) {
    builder = builder.killer(killer);
  }
  
  if (luck !== undefined) {
    builder = builder.luck(luck);
  }
  
  return builder.build();
}

/**
 * Create a LootContext with luck bonus.
 * 
 * @param location Location where loot generates
 * @param luck Luck value
 * @returns New LootContext
 */
export function createLuckyLootContext(
  location: BukkitLocation,
  luck: number
): BukkitLootContext {
  return new LootContext.Builder(location)
    .luck(luck)
    .build();
}

/**
 * Create LootContext from configuration object.
 * 
 * @param config Configuration options
 * @returns New LootContext
 */
export function createLootContext(config: LootContextConfig): BukkitLootContext {
  let builder = new LootContext.Builder(config.location);
  
  if (config.luck !== undefined) {
    builder = builder.luck(config.luck);
  }
  
  if (config.lootedEntity !== undefined) {
    builder = builder.lootedEntity(config.lootedEntity);
  }
  
  if (config.killer !== undefined) {
    builder = builder.killer(config.killer);
  }
  
  return builder.build();
}

// ============================================
// CONTEXT UTILITIES
// ============================================

/**
 * Check if context has a looted entity.
 */
export function hasLootedEntity(context: BukkitLootContext): boolean {
  return context.getLootedEntity() !== null;
}

/**
 * Check if context has a killer.
 */
export function hasKiller(context: BukkitLootContext): boolean {
  return context.getKiller() !== null;
}

/**
 * Check if context has luck bonus.
 */
export function hasLuckBonus(context: BukkitLootContext): boolean {
  return context.getLuck() > 0;
}

/**
 * Check if context has luck penalty.
 */
export function hasLuckPenalty(context: BukkitLootContext): boolean {
  return context.getLuck() < 0;
}

/**
 * Get the world from context location.
 */
export function getContextWorld(context: BukkitLootContext) {
  return context.getLocation().getWorld();
}

// ============================================
// INFO FUNCTIONS
// ============================================

/**
 * Get loot context references (keeps Bukkit objects).
 */
export function getLootContextRefs(context: BukkitLootContext): {
  location: BukkitLocation;
  luck: number;
  lootedEntity: BukkitEntity | null;
  killer: BukkitHumanEntity | null;
} {
  return {
    location: context.getLocation(),
    luck: context.getLuck(),
    lootedEntity: context.getLootedEntity(),
    killer: context.getKiller(),
  };
}

/**
 * Get loot context info as plain object (serializable).
 */
export function getLootContextInfo(context: BukkitLootContext): {
  location: { x: number; y: number; z: number; world: string };
  luck: number;
  lootedEntityType: string | null;
  killerName: string | null;
} {
  const loc = context.getLocation();
  const entity = context.getLootedEntity();
  const killer = context.getKiller();
  
  return {
    location: {
      x: loc.getX(),
      y: loc.getY(),
      z: loc.getZ(),
      world: loc.getWorld()?.getName() ?? "unknown",
    },
    luck: context.getLuck(),
    lootedEntityType: entity?.getType().name() ?? null,
    killerName: killer?.getName() ?? null,
  };
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a loot context.
 */
export function describeLootContext(context: BukkitLootContext): string {
  const parts: string[] = [];
  
  const loc = context.getLocation();
  parts.push(`Location: ${loc.getBlockX()}, ${loc.getBlockY()}, ${loc.getBlockZ()}`);
  
  const luck = context.getLuck();
  if (luck !== 0) {
    parts.push(`Luck: ${luck > 0 ? "+" : ""}${luck}`);
  }
  
  const entity = context.getLootedEntity();
  if (entity !== null) {
    parts.push(`Looted: ${entity.getType().name()}`);
  }
  
  const killer = context.getKiller();
  if (killer !== null) {
    parts.push(`Killer: ${killer.getName()}`);
  }
  
  return parts.join(", ");
}