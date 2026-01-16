/**
 * DESIGN
 * ------
 * Particle represents visual effects that can be spawned in the world.
 * 
 * PARTICLE SYSTEM:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                      PARTICLE                               │
 *   │                                                             │
 *   │   World.spawnParticle(particle, location, count, ...)       │
 *   │   Player.spawnParticle(particle, location, count, ...)      │
 *   │                                                             │
 *   │   Some particles require DATA:                              │
 *   │   - DUST → DustOptions (color, size)                        │
 *   │   - BLOCK → BlockData                                       │
 *   │   - ITEM → ItemStack                                        │
 *   │   - etc.                                                    │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * PARTICLE CATEGORIES:
 * 
 *   AMBIENT (decorative, environmental)
 *   ├─ ASH, WHITE_ASH, CRIMSON_SPORE, WARPED_SPORE
 *   ├─ CHERRY_LEAVES, PALE_OAK_LEAVES, FALLING_SPORE_BLOSSOM
 *   └─ MYCELIUM, SNOWFLAKE, RAIN
 * 
 *   FIRE & SMOKE
 *   ├─ FLAME, SMALL_FLAME, SOUL_FIRE_FLAME, COPPER_FIRE_FLAME
 *   ├─ SMOKE, LARGE_SMOKE, WHITE_SMOKE
 *   ├─ CAMPFIRE_COSY_SMOKE, CAMPFIRE_SIGNAL_SMOKE
 *   └─ LAVA
 * 
 *   LIQUID (dripping, falling, landing)
 *   ├─ DRIPPING_WATER → FALLING_WATER
 *   ├─ DRIPPING_LAVA → FALLING_LAVA → LANDING_LAVA
 *   ├─ DRIPPING_HONEY → FALLING_HONEY → LANDING_HONEY
 *   └─ DRIPPING_OBSIDIAN_TEAR → FALLING_OBSIDIAN_TEAR → LANDING_OBSIDIAN_TEAR
 * 
 *   COMBAT
 *   ├─ CRIT, ENCHANTED_HIT, DAMAGE_INDICATOR
 *   ├─ SWEEP_ATTACK, ANGRY_VILLAGER
 *   └─ SONIC_BOOM
 * 
 *   MAGIC & EFFECTS
 *   ├─ ENCHANT, EFFECT, INSTANT_EFFECT, ENTITY_EFFECT
 *   ├─ PORTAL, REVERSE_PORTAL, END_ROD
 *   ├─ WITCH, TOTEM_OF_UNDYING
 *   └─ DUST (customizable color/size)
 * 
 *   EXPLOSION
 *   ├─ POOF, EXPLOSION, EXPLOSION_EMITTER
 *   ├─ FIREWORK, FLASH
 *   └─ CLOUD
 * 
 *   WATER
 *   ├─ BUBBLE, BUBBLE_POP, BUBBLE_COLUMN_UP
 *   ├─ SPLASH, FISHING, UNDERWATER
 *   ├─ CURRENT_DOWN, DOLPHIN, NAUTILUS
 *   └─ SQUID_INK, GLOW_SQUID_INK
 * 
 *   BLOCK-BASED (require BlockData)
 *   ├─ BLOCK, BLOCK_MARKER, BLOCK_CRUMBLE
 *   ├─ FALLING_DUST, DUST_PILLAR
 *   └─ DUST_PLUME
 * 
 * DATA TYPES:
 * Most particles need no data. Some require specific types:
 * 
 *   DataType         | Particles
 *   -----------------|------------------------------------------
 *   DustOptions      | DUST
 *   DustTransition   | DUST_COLOR_TRANSITION
 *   BlockData        | BLOCK, FALLING_DUST, DUST_PILLAR, etc.
 *   ItemStack        | ITEM
 *   Color            | ENTITY_EFFECT, FLASH, TINTED_LEAVES
 *   Float            | DRAGON_BREATH, SCULK_CHARGE
 *   Integer          | SHRIEK
 *   Spell            | EFFECT, INSTANT_EFFECT
 *   Trail            | TRAIL
 *   Vibration        | VIBRATION
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Particle.html
 */

import { BukkitColor } from "../../items/enums/colorType";
import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { enumFromOrdinal, enumNames, enumValueOf, enumValues, isEnumValue, JavaEnum, JavaEnumClass } from "../../java/types/enum";
import { BukkitLocation } from "../../world/types/location";



// ============================================
// NESTED CLASSES
// ============================================

/**
 * Options for DUST particle - color and size.
 * 
 * @example
 * const dust = new DustOptions(Color.RED, 1.5);
 * world.spawnParticle(Particle.DUST, location, 10, dust);
 */
export interface BukkitDustOptions {
  /**
   * Get particle color.
   */
  getColor(): BukkitColor;

  /**
   * Get relative particle size.
   * 
   * Default is 1.0. Larger = bigger particles.
   */
  getSize(): number;
}

/**
 * DustOptions constructor type.
 */
export interface DustOptionsConstructor {
  new (color: BukkitColor, size: number): BukkitDustOptions;
}

/**
 * Options for DUST_COLOR_TRANSITION particle.
 * 
 * Particle transitions from one color to another.
 * 
 * @example
 * const transition = new DustTransition(Color.RED, Color.BLUE, 1.0);
 * world.spawnParticle(Particle.DUST_COLOR_TRANSITION, location, 10, transition);
 */
export interface BukkitDustTransition extends BukkitDustOptions {
  /**
   * Get the ending color (transitions TO this).
   * 
   * Use getColor() for starting color (inherited from DustOptions).
   */
  getToColor(): BukkitColor;
}

/**
 * DustTransition constructor type.
 */
export interface DustTransitionConstructor {
  new (fromColor: BukkitColor, toColor: BukkitColor, size: number): BukkitDustTransition;
}

/**
 * Options for EFFECT and INSTANT_EFFECT particles.
 * 
 * @example
 * const spell = new Spell(Color.PURPLE, 1.0);
 * world.spawnParticle(Particle.EFFECT, location, 10, spell);
 */
export interface BukkitSpell {
  /**
   * Get particle color.
   */
  getColor(): BukkitColor;

  /**
   * Get effect power/intensity.
   */
  getPower(): number;
}

/**
 * Spell constructor type.
 */
export interface SpellConstructor {
  new (color: BukkitColor, power: number): BukkitSpell;
}

/**
 * Options for TRAIL particle.
 * 
 * Creates a trail effect to a target location.
 * 
 * @example
 * const trail = new Trail(targetLocation, Color.GOLD, 20);
 * world.spawnParticle(Particle.TRAIL, location, 1, trail);
 */
export interface BukkitTrail {
  /**
   * Get trail target location.
   */
  getTarget(): BukkitLocation;

  /**
   * Get trail color.
   */
  getColor(): BukkitColor;

  /**
   * Get trail duration in ticks.
   */
  getDuration(): number;
}

/**
 * Trail constructor type.
 */
export interface TrailConstructor {
  new (target: BukkitLocation, color: BukkitColor, duration: number): BukkitTrail;
}

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All particle constant names.
 */
export type ParticleKey =
  /* Explosion/Poof */
  | "POOF"
  | "EXPLOSION"
  | "EXPLOSION_EMITTER"
  | "FIREWORK"
  | "FLASH"
  | "CLOUD"
  /* Water/Bubble */
  | "BUBBLE"
  | "BUBBLE_POP"
  | "BUBBLE_COLUMN_UP"
  | "SPLASH"
  | "FISHING"
  | "UNDERWATER"
  | "CURRENT_DOWN"
  | "RAIN"
  /* Combat */
  | "CRIT"
  | "ENCHANTED_HIT"
  | "DAMAGE_INDICATOR"
  | "SWEEP_ATTACK"
  | "SONIC_BOOM"
  /* Smoke/Fire */
  | "SMOKE"
  | "LARGE_SMOKE"
  | "WHITE_SMOKE"
  | "FLAME"
  | "SMALL_FLAME"
  | "SOUL_FIRE_FLAME"
  | "COPPER_FIRE_FLAME"
  | "CAMPFIRE_COSY_SMOKE"
  | "CAMPFIRE_SIGNAL_SMOKE"
  | "LAVA"
  /* Magic/Effects */
  | "EFFECT"
  | "INSTANT_EFFECT"
  | "ENTITY_EFFECT"
  | "WITCH"
  | "ENCHANT"
  | "PORTAL"
  | "REVERSE_PORTAL"
  | "END_ROD"
  | "TOTEM_OF_UNDYING"
  | "NOTE"
  | "GLOW"
  /* Villager */
  | "ANGRY_VILLAGER"
  | "HAPPY_VILLAGER"
  /* Dripping (Water) */
  | "DRIPPING_WATER"
  | "FALLING_WATER"
  | "DRIPPING_DRIPSTONE_WATER"
  | "FALLING_DRIPSTONE_WATER"
  /* Dripping (Lava) */
  | "DRIPPING_LAVA"
  | "FALLING_LAVA"
  | "LANDING_LAVA"
  | "DRIPPING_DRIPSTONE_LAVA"
  | "FALLING_DRIPSTONE_LAVA"
  /* Dripping (Honey) */
  | "DRIPPING_HONEY"
  | "FALLING_HONEY"
  | "LANDING_HONEY"
  | "FALLING_NECTAR"
  /* Dripping (Obsidian Tear) */
  | "DRIPPING_OBSIDIAN_TEAR"
  | "FALLING_OBSIDIAN_TEAR"
  | "LANDING_OBSIDIAN_TEAR"
  /* Dust */
  | "DUST"
  | "DUST_COLOR_TRANSITION"
  | "DUST_PLUME"
  | "DUST_PILLAR"
  /* Block-based */
  | "BLOCK"
  | "BLOCK_MARKER"
  | "BLOCK_CRUMBLE"
  | "FALLING_DUST"
  /* Item-based */
  | "ITEM"
  | "ITEM_SNOWBALL"
  | "ITEM_SLIME"
  | "ITEM_COBWEB"
  /* Mob-related */
  | "HEART"
  | "ELDER_GUARDIAN"
  | "DRAGON_BREATH"
  | "SPIT"
  | "SQUID_INK"
  | "GLOW_SQUID_INK"
  | "DOLPHIN"
  | "NAUTILUS"
  | "SNEEZE"
  | "EGG_CRACK"
  /* Ambient/Environmental */
  | "MYCELIUM"
  | "ASH"
  | "WHITE_ASH"
  | "CRIMSON_SPORE"
  | "WARPED_SPORE"
  | "SOUL"
  | "SNOWFLAKE"
  | "COMPOSTER"
  /* Leaves */
  | "CHERRY_LEAVES"
  | "PALE_OAK_LEAVES"
  | "TINTED_LEAVES"
  /* Spore Blossom */
  | "FALLING_SPORE_BLOSSOM"
  | "SPORE_BLOSSOM_AIR"
  /* Sculk */
  | "SCULK_SOUL"
  | "SCULK_CHARGE"
  | "SCULK_CHARGE_POP"
  | "SHRIEK"
  /* Copper */
  | "WAX_ON"
  | "WAX_OFF"
  | "ELECTRIC_SPARK"
  | "SCRAPE"
  /* Wind/Gust */
  | "GUST"
  | "SMALL_GUST"
  | "GUST_EMITTER_LARGE"
  | "GUST_EMITTER_SMALL"
  /* Trial */
  | "TRIAL_SPAWNER_DETECTION"
  | "TRIAL_SPAWNER_DETECTION_OMINOUS"
  | "VAULT_CONNECTION"
  | "OMINOUS_SPAWNING"
  | "RAID_OMEN"
  | "TRIAL_OMEN"
  /* Special */
  | "INFESTED"
  | "VIBRATION"
  | "TRAIL"
  | "FIREFLY";

/**
 * Particle interface.
 * 
 * Extends JavaEnum for full Java enum compatibility.
 */
export interface BukkitParticle extends JavaEnum<ParticleKey> {
  /**
   * Get the required data type for this particle.
   * 
   * Most particles return Void.class (no data needed).
   * 
   * @example
   * Particle.DUST.getDataType(); // DustOptions.class
   * Particle.BLOCK.getDataType(); // BlockData.class
   * Particle.FLAME.getDataType(); // Void.class
   */
  getDataType(): any;

  /**
   * Get namespaced key.
   * 
   * @deprecated Use getKeyOrThrow() instead.
   */
  getKey(): BukkitNamespacedKey;

  /**
   * Get namespaced key, or null if not registered.
   */
  getKeyOrNull(): BukkitNamespacedKey | null;

  /**
   * Get namespaced key, or throw if not registered.
   */
  getKeyOrThrow(): BukkitNamespacedKey;

  /**
   * Check if particle is registered in registry.
   */
  isRegistered(): boolean;
}

/**
 * Particle enum class type (constants + static methods).
 */
export type ParticleClass = 
  Record<ParticleKey, BukkitParticle> & 
  JavaEnumClass<BukkitParticle> & {
    DustOptions: DustOptionsConstructor;
    DustTransition: DustTransitionConstructor;
    Spell: SpellConstructor;
    Trail: TrailConstructor;
  };

// ============================================
// ENUM EXPORT
// ============================================

/**
 * All Minecraft particles.
 * 
 * Particles are visual effects spawned via:
 * - World.spawnParticle()
 * - Player.spawnParticle()
 * 
 * PARTICLES WITH DATA:
 * Some particles require additional data when spawning:
 * 
 * - DUST → DustOptions (color, size)
 * - DUST_COLOR_TRANSITION → DustTransition (fromColor, toColor, size)
 * - BLOCK, FALLING_DUST, etc. → BlockData
 * - ITEM → ItemStack
 * - ENTITY_EFFECT, FLASH, TINTED_LEAVES → Color
 * - EFFECT, INSTANT_EFFECT → Spell (color, power)
 * - TRAIL → Trail (target, color, duration)
 * - DRAGON_BREATH, SCULK_CHARGE → Float
 * - SHRIEK → Integer
 * - VIBRATION → Vibration
 * 
 * @example
 * // Simple particle (no data)
 * world.spawnParticle(Particle.FLAME, location, 10);
 * 
 * @example
 * // Particle with data
 * const dust = new Particle.DustOptions(Color.RED, 1.5);
 * world.spawnParticle(Particle.DUST, location, 10, dust);
 * 
 * @example
 * // Block particle
 * const blockData = Material.STONE.createBlockData();
 * world.spawnParticle(Particle.BLOCK, location, 20, blockData);
 */
export const Particle: ParticleClass = org.bukkit.Particle;

// ============================================
// NESTED CLASS EXPORTS
// ============================================

/**
 * DustOptions for DUST particle.
 */
export const DustOptions: DustOptionsConstructor = Particle.DustOptions;

/**
 * DustTransition for DUST_COLOR_TRANSITION particle.
 */
export const DustTransition: DustTransitionConstructor = Particle.DustTransition;

/**
 * Spell for EFFECT and INSTANT_EFFECT particles.
 */
export const Spell: SpellConstructor = Particle.Spell;

/**
 * Trail for TRAIL particle.
 */
export const Trail: TrailConstructor = Particle.Trail;

// ============================================
// ENUM UTILITIES
// ============================================

/**
 * Get all particle values.
 */
export function getParticleValues(): BukkitParticle[] {
  return enumValues(Particle);
}

/**
 * Get particle by exact name.
 * 
 * @throws IllegalArgumentException if name doesn't match
 */
export function getParticleByName(name: string): BukkitParticle {
  return enumValueOf(Particle, name);
}

/**
 * Get particle by name (safe version).
 * 
 * @returns Particle or null if not found
 */
export function getParticleSafe(name: string): BukkitParticle | null {
  const upper = name.toUpperCase();
  return isEnumValue(Particle, upper) ? enumValueOf(Particle, upper) : null;
}

/**
 * Get all particle names.
 */
export function getParticleNames(): ParticleKey[] {
  return enumNames(Particle) as ParticleKey[];
}

/**
 * Get particle by ordinal.
 */
export function getParticleByOrdinal(ordinal: number): BukkitParticle | null {
  return enumFromOrdinal(Particle, ordinal);
}

/**
 * Check if string is valid particle name.
 */
export function isValidParticle(name: string): name is ParticleKey {
  return isEnumValue(Particle, name.toUpperCase());
}

// ============================================
// DATA TYPE HELPERS
// ============================================

/**
 * Particles that require DustOptions data.
 */
export const DUST_PARTICLES: Set<ParticleKey> = new Set([
  "DUST",
]);

/**
 * Particles that require DustTransition data.
 */
export const DUST_TRANSITION_PARTICLES: Set<ParticleKey> = new Set([
  "DUST_COLOR_TRANSITION",
]);

/**
 * Particles that require BlockData.
 */
export const BLOCK_DATA_PARTICLES: Set<ParticleKey> = new Set([
  "BLOCK",
  "BLOCK_MARKER",
  "BLOCK_CRUMBLE",
  "FALLING_DUST",
  "DUST_PILLAR",
]);

/**
 * Particles that require ItemStack data.
 */
export const ITEM_PARTICLES: Set<ParticleKey> = new Set([
  "ITEM",
]);

/**
 * Particles that require Color data.
 */
export const COLOR_PARTICLES: Set<ParticleKey> = new Set([
  "ENTITY_EFFECT",
  "FLASH",
  "TINTED_LEAVES",
]);

/**
 * Particles that require Spell data.
 */
export const SPELL_PARTICLES: Set<ParticleKey> = new Set([
  "EFFECT",
  "INSTANT_EFFECT",
]);

/**
 * Particles that require Float data.
 */
export const FLOAT_PARTICLES: Set<ParticleKey> = new Set([
  "DRAGON_BREATH",
  "SCULK_CHARGE",
]);

/**
 * Particles that require Integer data.
 */
export const INTEGER_PARTICLES: Set<ParticleKey> = new Set([
  "SHRIEK",
]);

/**
 * Particles that require Trail data.
 */
export const TRAIL_PARTICLES: Set<ParticleKey> = new Set([
  "TRAIL",
]);

/**
 * Particles that require Vibration data.
 */
export const VIBRATION_PARTICLES: Set<ParticleKey> = new Set([
  "VIBRATION",
]);

// ============================================
// DATA TYPE CHECKS
// ============================================

/**
 * Check if particle requires data.
 */
export function requiresData(particle: BukkitParticle): boolean {
  const dataType = particle.getDataType();
  /* Void.class means no data required */
  return dataType.getName() !== "void";
}

/**
 * Check if particle requires DustOptions.
 */
export function requiresDustOptions(particle: BukkitParticle): boolean {
  return DUST_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle requires DustTransition.
 */
export function requiresDustTransition(particle: BukkitParticle): boolean {
  return DUST_TRANSITION_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle requires BlockData.
 */
export function requiresBlockData(particle: BukkitParticle): boolean {
  return BLOCK_DATA_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle requires ItemStack.
 */
export function requiresItemStack(particle: BukkitParticle): boolean {
  return ITEM_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle requires Color.
 */
export function requiresColor(particle: BukkitParticle): boolean {
  return COLOR_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle requires Spell.
 */
export function requiresSpell(particle: BukkitParticle): boolean {
  return SPELL_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle requires Trail.
 */
export function requiresTrail(particle: BukkitParticle): boolean {
  return TRAIL_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Get required data type name for particle.
 */
export function getRequiredDataTypeName(particle: BukkitParticle): string {
  const name = particle.name() as ParticleKey;
  
  if (DUST_PARTICLES.has(name)) return "DustOptions";
  if (DUST_TRANSITION_PARTICLES.has(name)) return "DustTransition";
  if (BLOCK_DATA_PARTICLES.has(name)) return "BlockData";
  if (ITEM_PARTICLES.has(name)) return "ItemStack";
  if (COLOR_PARTICLES.has(name)) return "Color";
  if (SPELL_PARTICLES.has(name)) return "Spell";
  if (TRAIL_PARTICLES.has(name)) return "Trail";
  if (FLOAT_PARTICLES.has(name)) return "Float";
  if (INTEGER_PARTICLES.has(name)) return "Integer";
  if (VIBRATION_PARTICLES.has(name)) return "Vibration";
  
  return "None";
}

// ============================================
// CATEGORY SETS
// ============================================

/**
 * Explosion-related particles.
 */
export const EXPLOSION_PARTICLES: Set<ParticleKey> = new Set([
  "POOF",
  "EXPLOSION",
  "EXPLOSION_EMITTER",
  "FIREWORK",
  "FLASH",
  "CLOUD",
]);

/**
 * Fire and smoke particles.
 */
export const FIRE_SMOKE_PARTICLES: Set<ParticleKey> = new Set([
  "FLAME",
  "SMALL_FLAME",
  "SOUL_FIRE_FLAME",
  "COPPER_FIRE_FLAME",
  "SMOKE",
  "LARGE_SMOKE",
  "WHITE_SMOKE",
  "CAMPFIRE_COSY_SMOKE",
  "CAMPFIRE_SIGNAL_SMOKE",
  "LAVA",
]);

/**
 * Water-related particles.
 */
export const WATER_PARTICLES: Set<ParticleKey> = new Set([
  "BUBBLE",
  "BUBBLE_POP",
  "BUBBLE_COLUMN_UP",
  "SPLASH",
  "FISHING",
  "UNDERWATER",
  "CURRENT_DOWN",
  "RAIN",
  "DRIPPING_WATER",
  "FALLING_WATER",
  "DRIPPING_DRIPSTONE_WATER",
  "FALLING_DRIPSTONE_WATER",
]);

/**
 * Combat-related particles.
 */
export const COMBAT_PARTICLES: Set<ParticleKey> = new Set([
  "CRIT",
  "ENCHANTED_HIT",
  "DAMAGE_INDICATOR",
  "SWEEP_ATTACK",
  "SONIC_BOOM",
  "ANGRY_VILLAGER",
]);

/**
 * Magic/enchantment particles.
 */
export const MAGIC_PARTICLES: Set<ParticleKey> = new Set([
  "ENCHANT",
  "EFFECT",
  "INSTANT_EFFECT",
  "ENTITY_EFFECT",
  "WITCH",
  "PORTAL",
  "REVERSE_PORTAL",
  "END_ROD",
  "TOTEM_OF_UNDYING",
  "NOTE",
  "GLOW",
]);

/**
 * Ambient/environmental particles.
 */
export const AMBIENT_PARTICLES: Set<ParticleKey> = new Set([
  "MYCELIUM",
  "ASH",
  "WHITE_ASH",
  "CRIMSON_SPORE",
  "WARPED_SPORE",
  "SOUL",
  "SNOWFLAKE",
  "CHERRY_LEAVES",
  "PALE_OAK_LEAVES",
  "FALLING_SPORE_BLOSSOM",
  "SPORE_BLOSSOM_AIR",
  "FIREFLY",
]);

/**
 * Dripping liquid particles (all types).
 */
export const DRIPPING_PARTICLES: Set<ParticleKey> = new Set([
  "DRIPPING_WATER",
  "FALLING_WATER",
  "DRIPPING_LAVA",
  "FALLING_LAVA",
  "LANDING_LAVA",
  "DRIPPING_HONEY",
  "FALLING_HONEY",
  "LANDING_HONEY",
  "FALLING_NECTAR",
  "DRIPPING_OBSIDIAN_TEAR",
  "FALLING_OBSIDIAN_TEAR",
  "LANDING_OBSIDIAN_TEAR",
  "DRIPPING_DRIPSTONE_WATER",
  "FALLING_DRIPSTONE_WATER",
  "DRIPPING_DRIPSTONE_LAVA",
  "FALLING_DRIPSTONE_LAVA",
]);

// ============================================
// CATEGORY CHECKS
// ============================================

/**
 * Check if particle is explosion-related.
 */
export function isExplosionParticle(particle: BukkitParticle): boolean {
  return EXPLOSION_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle is fire/smoke-related.
 */
export function isFireSmokeParticle(particle: BukkitParticle): boolean {
  return FIRE_SMOKE_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle is water-related.
 */
export function isWaterParticle(particle: BukkitParticle): boolean {
  return WATER_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle is combat-related.
 */
export function isCombatParticle(particle: BukkitParticle): boolean {
  return COMBAT_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle is magic-related.
 */
export function isMagicParticle(particle: BukkitParticle): boolean {
  return MAGIC_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle is ambient/environmental.
 */
export function isAmbientParticle(particle: BukkitParticle): boolean {
  return AMBIENT_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Check if particle is dripping-related.
 */
export function isDrippingParticle(particle: BukkitParticle): boolean {
  return DRIPPING_PARTICLES.has(particle.name() as ParticleKey);
}

/**
 * Get particle category.
 */
export function getParticleCategory(particle: BukkitParticle):
  "explosion" | "fire_smoke" | "water" | "combat" | "magic" | "ambient" | "dripping" | "dust" | "block" | "item" | "other" {
  
  const name = particle.name() as ParticleKey;
  
  if (EXPLOSION_PARTICLES.has(name)) return "explosion";
  if (FIRE_SMOKE_PARTICLES.has(name)) return "fire_smoke";
  if (WATER_PARTICLES.has(name)) return "water";
  if (COMBAT_PARTICLES.has(name)) return "combat";
  if (MAGIC_PARTICLES.has(name)) return "magic";
  if (AMBIENT_PARTICLES.has(name)) return "ambient";
  if (DRIPPING_PARTICLES.has(name)) return "dripping";
  if (DUST_PARTICLES.has(name) || DUST_TRANSITION_PARTICLES.has(name)) return "dust";
  if (BLOCK_DATA_PARTICLES.has(name)) return "block";
  if (ITEM_PARTICLES.has(name)) return "item";
  
  return "other";
}

// ============================================
// FACTORY HELPERS
// ============================================

/**
 * Create DustOptions.
 * 
 * @param color Particle color
 * @param size Particle size (default 1.0)
 */
export function createDustOptions(color: BukkitColor, size: number = 1.0): BukkitDustOptions {
  return new DustOptions(color, size);
}

/**
 * Create DustTransition.
 * 
 * @param fromColor Starting color
 * @param toColor Ending color
 * @param size Particle size (default 1.0)
 */
export function createDustTransition(
  fromColor: BukkitColor, 
  toColor: BukkitColor, 
  size: number = 1.0
): BukkitDustTransition {
  return new DustTransition(fromColor, toColor, size);
}

/**
 * Create Spell options.
 * 
 * @param color Effect color
 * @param power Effect power/intensity
 */
export function createSpell(color: BukkitColor, power: number): BukkitSpell {
  return new Spell(color, power);
}

/**
 * Create Trail options.
 * 
 * @param target Target location
 * @param color Trail color
 * @param duration Duration in ticks
 */
export function createTrail(
  target: BukkitLocation, 
  color: BukkitColor, 
  duration: number
): BukkitTrail {
  return new Trail(target, color, duration);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get human-readable particle name.
 */
export function formatParticleName(particle: BukkitParticle): string {
  return particle.name()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Describe particle with data type info.
 */
export function describeParticle(particle: BukkitParticle): string {
  const name = formatParticleName(particle);
  const dataType = getRequiredDataTypeName(particle);
  const category = getParticleCategory(particle);
  
  if (dataType === "None") {
    return `${name} (${category})`;
  }
  
  return `${name} (${category}, requires ${dataType})`;
}

/**
 * Compare two particles using Java's compareTo.
 */
export function compareParticles(a: BukkitParticle, b: BukkitParticle): number {
  return a.compareTo(b);
}

/**
 * Check if two particles are the same.
 */
export function sameParticle(a: BukkitParticle, b: BukkitParticle): boolean {
  return a.name() === b.name();
}

/**
 * Get all particles that don't require data.
 */
export function getSimpleParticles(): BukkitParticle[] {
  return getParticleValues().filter(p => !requiresData(p));
}

/**
 * Get all particles that require data.
 */
export function getDataParticles(): BukkitParticle[] {
  return getParticleValues().filter(p => requiresData(p));
}

/**
 * Group particles by category.
 */
export function groupParticlesByCategory(): Map<string, BukkitParticle[]> {
  const groups = new Map<string, BukkitParticle[]>();
  
  for (const particle of getParticleValues()) {
    const category = getParticleCategory(particle);
    
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    
    groups.get(category)!.push(particle);
  }
  
  return groups;
}

/**
 * Group particles by required data type.
 */
export function groupParticlesByDataType(): Map<string, BukkitParticle[]> {
  const groups = new Map<string, BukkitParticle[]>();
  
  for (const particle of getParticleValues()) {
    const dataType = getRequiredDataTypeName(particle);
    
    if (!groups.has(dataType)) {
      groups.set(dataType, []);
    }
    
    groups.get(dataType)!.push(particle);
  }
  
  return groups;
}