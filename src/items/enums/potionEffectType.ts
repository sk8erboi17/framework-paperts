/**
 * Represents a type of potion and its effect on an entity.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffectType.html
 */


import { BukkitColor } from "./colorType";
import { BukkitNamespacedKey } from "../types/namespacedKey";
import { BukkitPotionEffectTypeCategory } from "./potionEffectTypeCategory";
import { BukkitPotionEffect } from "../types/potionEffect";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type PotionEffectTypeKey =
  | "SPEED" | "SLOWNESS" | "HASTE" | "MINING_FATIGUE"
  | "STRENGTH" | "INSTANT_HEALTH" | "INSTANT_DAMAGE" | "JUMP_BOOST"
  | "NAUSEA" | "REGENERATION" | "RESISTANCE" | "FIRE_RESISTANCE"
  | "WATER_BREATHING" | "INVISIBILITY" | "BLINDNESS" | "NIGHT_VISION"
  | "HUNGER" | "WEAKNESS" | "POISON" | "WITHER"
  | "HEALTH_BOOST" | "ABSORPTION" | "SATURATION" | "GLOWING"
  | "LEVITATION" | "LUCK" | "UNLUCK" | "SLOW_FALLING"
  | "CONDUIT_POWER" | "DOLPHINS_GRACE" | "BAD_OMEN" | "HERO_OF_THE_VILLAGE"
  | "DARKNESS" | "TRIAL_OMEN" | "RAID_OMEN" | "WIND_CHARGED"
  | "WEAVING" | "OOZING" | "INFESTED" | "BREATH_OF_THE_NAUTILUS";

// ============================================
// INTERFACE
// ============================================

export interface BukkitPotionEffectType {
  /**
   * Creates a PotionEffect from this PotionEffectType, applying duration modifiers and checks.
   * @param duration - Time in ticks
   * @param amplifier - The effect's amplifier
   * @returns A resulting potion effect
   */
  createEffect(duration: number, amplifier: number): BukkitPotionEffect;

  /**
   * Returns whether the effect of this type happens once, immediately.
   * @returns Whether this type is normally instant
   */
  isInstant(): boolean;

  /**
   * Returns the category of this effect type.
   * @returns The category
   */
  getCategory(): BukkitPotionEffectTypeCategory;

  /**
   * Returns the color of this effect type.
   * @returns The color
   */
  getColor(): BukkitColor;

  /**
   * Return the namespaced identifier for this object.
   * @returns This object's key
   * @deprecated A key might not always be present, use getKeyOrThrow() instead.
   */
  getKey(): BukkitNamespacedKey;

  /**
   * Returns the duration modifier applied to effects of this type.
   * @returns Duration modifier
   * @deprecated Unused, always 1.0
   */
  getDurationModifier(): number;

  /**
   * Returns the unique ID of this type.
   * @returns Unique ID
   * @deprecated Magic value
   */
  getId(): number;

  /**
   * Returns the name of this effect type.
   * @returns The name of this effect type
   * @deprecated Only for backwards compatibility, use getKey() instead.
   */
  getName(): string;
}

// ============================================
// POTION EFFECT TYPE CLASS INTERFACE
// ============================================

interface PotionEffectTypeClass extends Record<PotionEffectTypeKey, BukkitPotionEffectType> {
  /**
   * Gets the PotionEffectType at the specified key.
   * @param key - Key to fetch
   * @returns Resulting PotionEffectType, or null if not found
   * @deprecated Only for backwards compatibility, use Registry.get(NamespacedKey) instead.
   */
  getByKey(key: BukkitNamespacedKey | null): BukkitPotionEffectType | null;

  /**
   * Gets the effect type specified by the unique id.
   * @param id - Unique ID to fetch
   * @returns Resulting type, or null if not found
   * @deprecated Magic value
   */
  getById(id: number): BukkitPotionEffectType | null;

  /**
   * Gets the effect type specified by the given name.
   * @param name - Name of PotionEffectType to fetch
   * @returns Resulting PotionEffectType, or null if not found
   * @deprecated Only for backwards compatibility, use Registry.get(NamespacedKey) instead.
   */
  getByName(name: string): BukkitPotionEffectType | null;

  /**
   * Returns an array of all known PotionEffectTypes.
   * @returns An array of all known PotionEffectTypes
   * @deprecated Use Iterable.iterator() instead.
   */
  values(): BukkitPotionEffectType[];
}

// ============================================
// POTION EFFECT TYPES
// ============================================

export const PotionEffectType: PotionEffectTypeClass = {
  /** Increases movement speed. */
  SPEED: org.bukkit.potion.PotionEffectType.SPEED,

  /** Decreases movement speed. */
  SLOWNESS: org.bukkit.potion.PotionEffectType.SLOWNESS,

  /** Increases dig speed. */
  HASTE: org.bukkit.potion.PotionEffectType.HASTE,

  /** Decreases dig speed. */
  MINING_FATIGUE: org.bukkit.potion.PotionEffectType.MINING_FATIGUE,

  /** Increases damage dealt. */
  STRENGTH: org.bukkit.potion.PotionEffectType.STRENGTH,

  /** Heals an entity. */
  INSTANT_HEALTH: org.bukkit.potion.PotionEffectType.INSTANT_HEALTH,

  /** Hurts an entity. */
  INSTANT_DAMAGE: org.bukkit.potion.PotionEffectType.INSTANT_DAMAGE,

  /** Increases jump height. */
  JUMP_BOOST: org.bukkit.potion.PotionEffectType.JUMP_BOOST,

  /** Warps vision on the client. */
  NAUSEA: org.bukkit.potion.PotionEffectType.NAUSEA,

  /** Regenerates health. */
  REGENERATION: org.bukkit.potion.PotionEffectType.REGENERATION,

  /** Decreases damage dealt to an entity. */
  RESISTANCE: org.bukkit.potion.PotionEffectType.RESISTANCE,

  /** Stops fire damage. */
  FIRE_RESISTANCE: org.bukkit.potion.PotionEffectType.FIRE_RESISTANCE,

  /** Allows breathing underwater. */
  WATER_BREATHING: org.bukkit.potion.PotionEffectType.WATER_BREATHING,

  /** Grants invisibility. */
  INVISIBILITY: org.bukkit.potion.PotionEffectType.INVISIBILITY,

  /** Blinds an entity. */
  BLINDNESS: org.bukkit.potion.PotionEffectType.BLINDNESS,

  /** Allows an entity to see in the dark. */
  NIGHT_VISION: org.bukkit.potion.PotionEffectType.NIGHT_VISION,

  /** Increases hunger. */
  HUNGER: org.bukkit.potion.PotionEffectType.HUNGER,

  /** Decreases damage dealt by an entity. */
  WEAKNESS: org.bukkit.potion.PotionEffectType.WEAKNESS,

  /** Deals damage to an entity over time. */
  POISON: org.bukkit.potion.PotionEffectType.POISON,

  /** Deals damage to an entity over time and gives the health to the shooter. */
  WITHER: org.bukkit.potion.PotionEffectType.WITHER,

  /** Increases the maximum health of an entity. */
  HEALTH_BOOST: org.bukkit.potion.PotionEffectType.HEALTH_BOOST,

  /** Increases the maximum health of an entity with health that cannot be regenerated, but is refilled every 30 seconds. */
  ABSORPTION: org.bukkit.potion.PotionEffectType.ABSORPTION,

  /** Increases the food level of an entity each tick. */
  SATURATION: org.bukkit.potion.PotionEffectType.SATURATION,

  /** Outlines the entity so that it can be seen from afar. */
  GLOWING: org.bukkit.potion.PotionEffectType.GLOWING,

  /** Causes the entity to float into the air. */
  LEVITATION: org.bukkit.potion.PotionEffectType.LEVITATION,

  /** Loot table luck. */
  LUCK: org.bukkit.potion.PotionEffectType.LUCK,

  /** Loot table unluck. */
  UNLUCK: org.bukkit.potion.PotionEffectType.UNLUCK,

  /** Slows entity fall rate. */
  SLOW_FALLING: org.bukkit.potion.PotionEffectType.SLOW_FALLING,

  /** Effects granted by a nearby conduit. Includes enhanced underwater abilities. */
  CONDUIT_POWER: org.bukkit.potion.PotionEffectType.CONDUIT_POWER,

  /** Increases underwater movement speed. */
  DOLPHINS_GRACE: org.bukkit.potion.PotionEffectType.DOLPHINS_GRACE,

  /** Triggers an ominous event when the player enters a village or trial chambers. */
  BAD_OMEN: org.bukkit.potion.PotionEffectType.BAD_OMEN,

  /** Reduces the cost of villager trades. */
  HERO_OF_THE_VILLAGE: org.bukkit.potion.PotionEffectType.HERO_OF_THE_VILLAGE,

  /** Causes the player's vision to dim occasionally. */
  DARKNESS: org.bukkit.potion.PotionEffectType.DARKNESS,

  /** Causes trial spawners to become ominous. */
  TRIAL_OMEN: org.bukkit.potion.PotionEffectType.TRIAL_OMEN,

  /** Triggers a raid when a player enters a village. */
  RAID_OMEN: org.bukkit.potion.PotionEffectType.RAID_OMEN,

  /** Emits a wind burst upon death. */
  WIND_CHARGED: org.bukkit.potion.PotionEffectType.WIND_CHARGED,

  /** Creates cobwebs upon death. */
  WEAVING: org.bukkit.potion.PotionEffectType.WEAVING,

  /** Causes slimes to spawn upon death. */
  OOZING: org.bukkit.potion.PotionEffectType.OOZING,

  /** Chance of spawning silverfish when hurt. */
  INFESTED: org.bukkit.potion.PotionEffectType.INFESTED,

  /** Allows breathing underwater. */
  BREATH_OF_THE_NAUTILUS: org.bukkit.potion.PotionEffectType.BREATH_OF_THE_NAUTILUS,

  // Static methods
  /** @deprecated Only for backwards compatibility, use Registry.get(NamespacedKey) instead. */
  getByKey(key: BukkitNamespacedKey): BukkitPotionEffectType | null {
    return org.bukkit.potion.PotionEffectType.getByKey(key);
  },

  /** @deprecated Magic value */
  getById(id: number): BukkitPotionEffectType | null {
    return org.bukkit.potion.PotionEffectType.getById(id);
  },

  /** @deprecated Only for backwards compatibility, use Registry.get(NamespacedKey) instead. */
  getByName(name: string): BukkitPotionEffectType | null {
    return org.bukkit.potion.PotionEffectType.getByName(name);
  },

  /** @deprecated Use Iterable.iterator() instead. */
  values(): BukkitPotionEffectType[] {
    return org.bukkit.potion.PotionEffectType.values();
  },
};