// events/entity/CreatureSpawnEvent.ts

import { BukkitEntityType } from "../../../../entities/enums/entityType";
import { BukkitLocation } from "../../../../world/types/location";
import { JavaEnum, JavaEnumClass } from "../../../../java/types/enum";
import { EventEntitySpawnEvent } from "../entitySpawnEvent";
import { BukkitLivingEntity } from "../../../../entities/types/bukkitLivingEntity";
import { BukkitCancellable } from "../../cancellable";

// ============================================
// SPAWN REASON ENUM
// ============================================

/**
 * SpawnReason - Why a creature is spawning
 */
export type SpawnReasonKey =
  /* Natural spawning */
  | "NATURAL"
  | "JOCKEY"
  | "MOUNT"
  | "PATROL"
  | "RAID"
  | "TRAP"
  | "VILLAGE_DEFENSE"
  | "VILLAGE_INVASION"
  | "REINFORCEMENTS"
  /* Player-caused */
  | "EGG"
  | "SPAWNER_EGG"
  | "DISPENSE_EGG"
  | "BUCKET"
  | "BREEDING"
  | "COMMAND"
  | "ENDER_PEARL"
  | "SHOULDER_ENTITY"
  | "SHEARED"
  /* World mechanics */
  | "SPAWNER"
  | "TRIAL_SPAWNER"
  | "LIGHTNING"
  | "NETHER_PORTAL"
  | "BEEHIVE"
  | "SILVERFISH_BLOCK"
  | "SLIME_SPLIT"
  | "EXPLOSION"
  | "SPELL"
  | "ENCHANTMENT"
  | "POTION_EFFECT"
  /* Building */
  | "BUILD_SNOWMAN"
  | "BUILD_IRONGOLEM"
  | "BUILD_COPPERGOLEM"
  | "BUILD_WITHER"
  /* Conversion */
  | "INFECTION"
  | "CURED"
  | "DROWNED"
  | "PIGLIN_ZOMBIFIED"
  | "FROZEN"
  | "METAMORPHOSIS"
  | "REANIMATE"
  /* Other */
  | "OCELOT_BABY"
  | "DUPLICATION"
  | "CUSTOM"
  | "DEFAULT"
  /* Deprecated */
  | "CHUNK_GEN";

export interface BukkitSpawnReason extends JavaEnum<SpawnReasonKey> {}

interface SpawnReasonClass extends
  Omit<Record<SpawnReasonKey, BukkitSpawnReason>, keyof JavaEnumClass<BukkitSpawnReason>>,
  JavaEnumClass<BukkitSpawnReason> {}

export const SpawnReason: SpawnReasonClass = {
  /* Natural spawning */
  NATURAL: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.NATURAL,
  JOCKEY: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.JOCKEY,
  MOUNT: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.MOUNT,
  PATROL: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.PATROL,
  RAID: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.RAID,
  TRAP: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.TRAP,
  VILLAGE_DEFENSE: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.VILLAGE_DEFENSE,
  VILLAGE_INVASION: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.VILLAGE_INVASION,
  REINFORCEMENTS: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.REINFORCEMENTS,
  
  /* Player-caused */
  EGG: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.EGG,
  SPAWNER_EGG: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.SPAWNER_EGG,
  DISPENSE_EGG: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.DISPENSE_EGG,
  BUCKET: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.BUCKET,
  BREEDING: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.BREEDING,
  COMMAND: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.COMMAND,
  ENDER_PEARL: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.ENDER_PEARL,
  SHOULDER_ENTITY: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.SHOULDER_ENTITY,
  SHEARED: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.SHEARED,
  
  /* World mechanics */
  SPAWNER: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.SPAWNER,
  TRIAL_SPAWNER: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.TRIAL_SPAWNER,
  LIGHTNING: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.LIGHTNING,
  NETHER_PORTAL: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.NETHER_PORTAL,
  BEEHIVE: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.BEEHIVE,
  SILVERFISH_BLOCK: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.SILVERFISH_BLOCK,
  SLIME_SPLIT: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.SLIME_SPLIT,
  EXPLOSION: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.EXPLOSION,
  SPELL: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.SPELL,
  ENCHANTMENT: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.ENCHANTMENT,
  POTION_EFFECT: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.POTION_EFFECT,
  
  /* Building */
  BUILD_SNOWMAN: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.BUILD_SNOWMAN,
  BUILD_IRONGOLEM: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.BUILD_IRONGOLEM,
  BUILD_COPPERGOLEM: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.BUILD_COPPERGOLEM,
  BUILD_WITHER: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.BUILD_WITHER,
  
  /* Conversion */
  INFECTION: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.INFECTION,
  CURED: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.CURED,
  DROWNED: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.DROWNED,
  PIGLIN_ZOMBIFIED: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.PIGLIN_ZOMBIFIED,
  FROZEN: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.FROZEN,
  METAMORPHOSIS: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.METAMORPHOSIS,
  REANIMATE: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.REANIMATE,
  
  /* Other */
  OCELOT_BABY: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.OCELOT_BABY,
  DUPLICATION: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.DUPLICATION,
  CUSTOM: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.CUSTOM,
  DEFAULT: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.DEFAULT,
  
  /* Deprecated */
  CHUNK_GEN: org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.CHUNK_GEN,

  values(): BukkitSpawnReason[] {
    return org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.values();
  },
  valueOf(name: string): BukkitSpawnReason {
    return org.bukkit.event.entity.CreatureSpawnEvent.SpawnReason.valueOf(name);
  },
};

// ============================================
// EVENT INTERFACE
// ============================================

/**
 * CreatureSpawnEvent
 * 
 * Called when a creature (LivingEntity) is spawned into a world.
 * Extends EntitySpawnEvent with spawn reason information.
 * 
 * WHY EXTENDS EventEntitySpawnEvent:
 * ----------------------------------
 * 
 * Java hierarchy: CreatureSpawnEvent extends EntitySpawnEvent
 * 
 * This means CreatureSpawnEvent inherits:
 * - getLocation() from EntitySpawnEvent
 * - isCancelled() from EntitySpawnEvent
 * - setCancelled() from EntitySpawnEvent
 * - getEntityType() from EntityEvent
 * 
 * And adds:
 * - getEntity() returns LivingEntity (more specific than Entity)
 * - getSpawnReason() unique to CreatureSpawnEvent
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/entity/CreatureSpawnEvent.html
 */
export interface EventCreatureSpawnEvent extends EventEntitySpawnEvent, BukkitCancellable {
  /**
   * Returns the LivingEntity being spawned.
   * 
   * OVERRIDE: More specific than parent's getEntity().
   * Parent returns Entity, this returns LivingEntity.
   */
  getEntity(): BukkitLivingEntity;

  /**
   * Gets the reason for why the creature is being spawned.
   * 
   * UNIQUE to CreatureSpawnEvent.
   */
  getSpawnReason(): BukkitSpawnReason;

  /* Inherited from EventEntitySpawnEvent:
   * - getEntityType(): BukkitEntityType
   * - getLocation(): BukkitLocation
   * - isCancelled(): boolean
   * - setCancelled(cancel: boolean): void
   */
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Helper functions for CreatureSpawnEvent
 */
export const CreatureSpawnEventHelper = {
  /**
   * Check if spawn is natural (not player or plugin caused).
   */
  isNatural(event: EventCreatureSpawnEvent): boolean {
    const reason = event.getSpawnReason();
    return reason === SpawnReason.NATURAL ||
           reason === SpawnReason.JOCKEY ||
           reason === SpawnReason.MOUNT ||
           reason === SpawnReason.PATROL ||
           reason === SpawnReason.RAID ||
           reason === SpawnReason.TRAP ||
           reason === SpawnReason.VILLAGE_DEFENSE ||
           reason === SpawnReason.VILLAGE_INVASION ||
           reason === SpawnReason.REINFORCEMENTS;
  },

  /**
   * Check if spawn was caused by a player action.
   */
  isPlayerCaused(event: EventCreatureSpawnEvent): boolean {
    const reason = event.getSpawnReason();
    return reason === SpawnReason.EGG ||
           reason === SpawnReason.SPAWNER_EGG ||
           reason === SpawnReason.DISPENSE_EGG ||
           reason === SpawnReason.BUCKET ||
           reason === SpawnReason.BREEDING ||
           reason === SpawnReason.COMMAND ||
           reason === SpawnReason.ENDER_PEARL ||
           reason === SpawnReason.SHEARED;
  },

  /**
   * Check if spawn is from a spawner (regular or trial).
   */
  isFromSpawner(event: EventCreatureSpawnEvent): boolean {
    const reason = event.getSpawnReason();
    return reason === SpawnReason.SPAWNER ||
           reason === SpawnReason.TRIAL_SPAWNER;
  },

  /**
   * Check if spawn is from building something (golem, wither).
   */
  isFromBuilding(event: EventCreatureSpawnEvent): boolean {
    const reason = event.getSpawnReason();
    return reason === SpawnReason.BUILD_SNOWMAN ||
           reason === SpawnReason.BUILD_IRONGOLEM ||
           reason === SpawnReason.BUILD_COPPERGOLEM ||
           reason === SpawnReason.BUILD_WITHER;
  },

  /**
   * Check if spawn is from entity conversion.
   */
  isConversion(event: EventCreatureSpawnEvent): boolean {
    const reason = event.getSpawnReason();
    return reason === SpawnReason.INFECTION ||
           reason === SpawnReason.CURED ||
           reason === SpawnReason.DROWNED ||
           reason === SpawnReason.PIGLIN_ZOMBIFIED ||
           reason === SpawnReason.FROZEN ||
           reason === SpawnReason.METAMORPHOSIS;
  },

  /**
   * Check if spawn is from a plugin.
   */
  isFromPlugin(event: EventCreatureSpawnEvent): boolean {
    return event.getSpawnReason() === SpawnReason.CUSTOM;
  },

  /**
   * Check if spawn is from spawn egg (player or dispenser).
   */
  isFromSpawnEgg(event: EventCreatureSpawnEvent): boolean {
    const reason = event.getSpawnReason();
    return reason === SpawnReason.SPAWNER_EGG ||
           reason === SpawnReason.DISPENSE_EGG;
  },

  /**
   * Get the world where creature is spawning.
   */
  getWorld(event: EventCreatureSpawnEvent) {
    return event.getLocation().getWorld();
  },

  /**
   * Check if spawning in a specific world.
   */
  isInWorld(event: EventCreatureSpawnEvent, worldName: string): boolean {
    const world = event.getLocation().getWorld();
    return world !== null && world.getName() === worldName;
  },
} as const;

// Export della classe Java
export const CreatureSpawnEvent = org.bukkit.event.entity.CreatureSpawnEvent;