import { BukkitPotionEffect } from "../types/potionEffect";

/**
 * Represents a type of potion and its effect on an entity.
 * 
 * WHY THIS INTERFACE: In Java, PotionEffectType is an abstract class with
 * static fields (SPEED, REGENERATION, etc.). Each field is itself a
 * PotionEffectType instance. This interface describes the shape of those
 * instances so TypeScript can provide autocomplete on their methods.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffectType.html
 */
export interface BukkitPotionEffectType {
  /**
   * Creates a PotionEffect from this PotionEffectType.
   * @param duration - Time in ticks (20 ticks = 1 second)
   * @param amplifier - The effect's amplifier (0 = level I)
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
  getCategory(): any;

  /**
   * Returns the color of this effect type.
   * @returns The color
   */
  getColor(): any;

  /**
   * Returns the name of this effect type.
   * @deprecated Use getKey() instead
   * @returns The name of this effect type
   */
  getName(): string;

  /**
   * Return the namespaced identifier for this object.
   * @deprecated Use getKeyOrThrow() instead
   * @returns This object's key
   */
  getKey(): any;
}

/**
 * Bukkit PotionEffectType static fields.
 * 
 * WHY OBJECT INSTEAD OF ENUM: TypeScript enums compile to plain objects
 * with string/number values. We need the actual Java objects that Bukkit
 * understands at runtime. This object maps names to Java class references.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffectType.html
 */
export const PotionEffectType: Record<string, BukkitPotionEffectType> = {

  /** Increases movement speed */
  SPEED: org.bukkit.potion.PotionEffectType.SPEED,

  /** Increases dig speed */
  HASTE: org.bukkit.potion.PotionEffectType.HASTE,

  /** Increases damage dealt */
  STRENGTH: org.bukkit.potion.PotionEffectType.STRENGTH,

  /** Heals an entity instantly */
  INSTANT_HEALTH: org.bukkit.potion.PotionEffectType.INSTANT_HEALTH,

  /** Increases jump height */
  JUMP_BOOST: org.bukkit.potion.PotionEffectType.JUMP_BOOST,

  /** Regenerates health over time */
  REGENERATION: org.bukkit.potion.PotionEffectType.REGENERATION,

  /** Decreases damage dealt to an entity */
  RESISTANCE: org.bukkit.potion.PotionEffectType.RESISTANCE,

  /** Stops fire damage */
  FIRE_RESISTANCE: org.bukkit.potion.PotionEffectType.FIRE_RESISTANCE,

  /** Allows breathing underwater */
  WATER_BREATHING: org.bukkit.potion.PotionEffectType.WATER_BREATHING,

  /** Grants invisibility */
  INVISIBILITY: org.bukkit.potion.PotionEffectType.INVISIBILITY,

  /** Allows an entity to see in the dark */
  NIGHT_VISION: org.bukkit.potion.PotionEffectType.NIGHT_VISION,

  /** Increases the maximum health of an entity */
  HEALTH_BOOST: org.bukkit.potion.PotionEffectType.HEALTH_BOOST,

  /** Increases max health with non-regenerating health, refilled every 30 seconds */
  ABSORPTION: org.bukkit.potion.PotionEffectType.ABSORPTION,

  /** Increases the food level of an entity each tick */
  SATURATION: org.bukkit.potion.PotionEffectType.SATURATION,

  /** Outlines the entity so it can be seen from afar */
  GLOWING: org.bukkit.potion.PotionEffectType.GLOWING,

  /** Slows entity fall rate */
  SLOW_FALLING: org.bukkit.potion.PotionEffectType.SLOW_FALLING,

  /** Effects granted by a nearby conduit */
  CONDUIT_POWER: org.bukkit.potion.PotionEffectType.CONDUIT_POWER,

  /** Increases underwater movement speed */
  DOLPHINS_GRACE: org.bukkit.potion.PotionEffectType.DOLPHINS_GRACE,

  /** Reduces the cost of villager trades */
  HERO_OF_THE_VILLAGE: org.bukkit.potion.PotionEffectType.HERO_OF_THE_VILLAGE,

  /** Loot table luck */
  LUCK: org.bukkit.potion.PotionEffectType.LUCK,

  /** Allows breathing underwater (from nautilus) */
  BREATH_OF_THE_NAUTILUS: org.bukkit.potion.PotionEffectType.BREATH_OF_THE_NAUTILUS,

  /** Decreases movement speed */
  SLOWNESS: org.bukkit.potion.PotionEffectType.SLOWNESS,

  /** Decreases dig speed */
  MINING_FATIGUE: org.bukkit.potion.PotionEffectType.MINING_FATIGUE,

  /** Hurts an entity instantly */
  INSTANT_DAMAGE: org.bukkit.potion.PotionEffectType.INSTANT_DAMAGE,

  /** Warps vision on the client */
  NAUSEA: org.bukkit.potion.PotionEffectType.NAUSEA,

  /** Blinds an entity */
  BLINDNESS: org.bukkit.potion.PotionEffectType.BLINDNESS,

  /** Increases hunger depletion */
  HUNGER: org.bukkit.potion.PotionEffectType.HUNGER,

  /** Decreases damage dealt by an entity */
  WEAKNESS: org.bukkit.potion.PotionEffectType.WEAKNESS,

  /** Deals damage to an entity over time */
  POISON: org.bukkit.potion.PotionEffectType.POISON,

  /** Deals damage over time and gives health to the attacker */
  WITHER: org.bukkit.potion.PotionEffectType.WITHER,

  /** Causes the entity to float into the air */
  LEVITATION: org.bukkit.potion.PotionEffectType.LEVITATION,

  /** Loot table unluck */
  UNLUCK: org.bukkit.potion.PotionEffectType.UNLUCK,

  /** Causes the player's vision to dim occasionally */
  DARKNESS: org.bukkit.potion.PotionEffectType.DARKNESS,

  /** Chance of spawning silverfish when hurt */
  INFESTED: org.bukkit.potion.PotionEffectType.INFESTED,

  /** Triggers an ominous event when entering a village or trial chambers */
  BAD_OMEN: org.bukkit.potion.PotionEffectType.BAD_OMEN,

  /** Triggers a raid when a player enters a village */
  RAID_OMEN: org.bukkit.potion.PotionEffectType.RAID_OMEN,

  /** Causes trial spawners to become ominous */
  TRIAL_OMEN: org.bukkit.potion.PotionEffectType.TRIAL_OMEN,

  /** Causes slimes to spawn upon death */
  OOZING: org.bukkit.potion.PotionEffectType.OOZING,

  /** Creates cobwebs upon death */
  WEAVING: org.bukkit.potion.PotionEffectType.WEAVING,

  /** Emits a wind burst upon death */
  WIND_CHARGED: org.bukkit.potion.PotionEffectType.WIND_CHARGED,
};

/**
 * Type for PotionEffectType keys - enables autocomplete for string keys.
 *
 * WHY KEYOF TYPEOF: See explanation in entityType.ts. This creates a union
 * type of all valid key names: "SPEED" | "REGENERATION" | "POISON" | ...
 *
 * @example
 * function applyEffect(type: PotionEffectTypeKey) { ... }
 * applyEffect("SPEED")    // OK, autocomplete works
 * applyEffect("SPEEED")   // Compile error - typo caught
 */
export type PotionEffectTypeKey = keyof typeof PotionEffectType;