/**
 * DESIGN
 * ------
 * FireworkEffect represents a single explosion effect in a firework.
 * 
 * FIREWORK STRUCTURE:
 * A firework rocket can have multiple FireworkEffects.
 * Each effect defines ONE explosion with its own:
 * - Shape (type)
 * - Colors (primary + fade)
 * - Properties (flicker, trail)
 * 
 * EFFECT LIFECYCLE:
 * 
 *   Launch → Travel → EXPLODE → Fade → Disappear
 *                       │
 *                       ▼
 *            ┌─────────────────────┐
 *            │  Primary Colors     │  ← Initial explosion
 *            │  (getColors)        │
 *            └──────────┬──────────┘
 *                       │ time passes
 *                       ▼
 *            ┌─────────────────────┐
 *            │  Fade Colors        │  ← Particles change color
 *            │  (getFadeColors)    │
 *            └─────────────────────┘
 * 
 * EFFECT TYPES (shapes):
 * - BALL: Small sphere (default)
 * - BALL_LARGE: Larger sphere
 * - STAR: Star-shaped burst
 * - BURST: Outward lines (like dandelion)
 * - CREEPER: Creeper face shape
 * 
 * PROPERTIES:
 * - Flicker: Particles twinkle on/off
 * - Trail: Particles leave sparkle trails
 * 
 * BUILDER PATTERN:
 * FireworkEffect uses builder pattern because:
 * 1. Many optional parameters
 * 2. Immutable result
 * 3. Fluent API for readability
 * 
 * @example
 * const effect = FireworkEffect.builder()
 *   .with(FireworkEffectType.STAR)
 *   .withColor(Color.RED)
 *   .withColor(Color.ORANGE)
 *   .withFade(Color.YELLOW)
 *   .withFlicker()
 *   .withTrail()
 *   .build();
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/FireworkEffect.html
 */

import { BukkitColor } from "../../items/enums/colorType";
import { JavaList } from "../../java/types/list";
import { JavaMap } from "../../java/types/map";



// ============================================
// FIREWORK EFFECT TYPE ENUM
// ============================================

/**
 * Shape/type of firework explosion.
 */
export interface BukkitFireworkEffectType {
  /**
   * Get enum constant name.
   */
  name(): string;

  /**
   * Get enum ordinal.
   */
  ordinal(): number;
}

/**
 * All firework effect type names.
 */
export type FireworkEffectTypeKey =
  | "BALL"
  | "BALL_LARGE"
  | "STAR"
  | "BURST"
  | "CREEPER";

/**
 * Firework effect types (explosion shapes).
 * 
 * VISUAL GUIDE:
 * 
 *   BALL (default)     BALL_LARGE        STAR
 *        •                 •••            \|/
 *       •••               •••••          --•--
 *        •                 •••            /|\
 * 
 *   BURST              CREEPER
 *     \|/               ████
 *    ──•──              █  █
 *     /|\              ██████
 *    / | \              █  █
 */
export const FireworkEffectType: Record<FireworkEffectTypeKey, BukkitFireworkEffectType> = {
  /**
   * Small ball explosion.
   * 
   * Default shape. Simple spherical burst.
   */
  BALL: org.bukkit.FireworkEffect.Type.BALL,

  /**
   * Large ball explosion.
   * 
   * Same as BALL but bigger radius.
   */
  BALL_LARGE: org.bukkit.FireworkEffect.Type.BALL_LARGE,

  /**
   * Star-shaped explosion.
   * 
   * Points radiate outward in star pattern.
   * Created with gold nugget in crafting.
   */
  STAR: org.bukkit.FireworkEffect.Type.STAR,

  /**
   * Burst explosion (lines outward).
   * 
   * Looks like dandelion seeds or starburst.
   * Created with feather in crafting.
   */
  BURST: org.bukkit.FireworkEffect.Type.BURST,

  /**
   * Creeper face shape.
   * 
   * Particles form creeper face pattern.
   * Created with creeper head in crafting.
   */
  CREEPER: org.bukkit.FireworkEffect.Type.CREEPER,
};

/**
 * Array of all effect types for iteration.
 */
export const FireworkEffectTypeValues: BukkitFireworkEffectType[] = [
  FireworkEffectType.BALL,
  FireworkEffectType.BALL_LARGE,
  FireworkEffectType.STAR,
  FireworkEffectType.BURST,
  FireworkEffectType.CREEPER,
];

/**
 * Default effect type (BALL).
 */
export const DEFAULT_EFFECT_TYPE: BukkitFireworkEffectType = FireworkEffectType.BALL;

// ============================================
// FIREWORK EFFECT BUILDER
// ============================================

/**
 * Builder for constructing FireworkEffect instances.
 * 
 * FLUENT API:
 * All methods return `this` for chaining.
 * 
 * REQUIREMENTS:
 * - Must have at least one color to build()
 * - Type defaults to BALL if not specified
 * 
 * @example
 * const effect = FireworkEffect.builder()
 *   .with(FireworkEffectType.STAR)
 *   .withColor(Color.RED, Color.WHITE, Color.BLUE)
 *   .withFade(Color.WHITE)
 *   .withFlicker()
 *   .withTrail()
 *   .build();
 */
export interface BukkitFireworkEffectBuilder {
  /**
   * Set effect type (shape).
   * 
   * @param type Effect type
   * @returns This builder for chaining
   * @throws IllegalArgumentException if type is null
   */
  with(type: BukkitFireworkEffectType): BukkitFireworkEffectBuilder;

  /**
   * Enable flicker effect.
   * 
   * Particles will twinkle on/off.
   * 
   * @returns This builder for chaining
   */
  withFlicker(): BukkitFireworkEffectBuilder;

  /**
   * Set flicker state explicitly.
   * 
   * @param flicker true to enable, false to disable
   * @returns This builder for chaining
   */
  flicker(flicker: boolean): BukkitFireworkEffectBuilder;

  /**
   * Enable trail effect.
   * 
   * Particles will leave sparkle trails as they move.
   * 
   * @returns This builder for chaining
   */
  withTrail(): BukkitFireworkEffectBuilder;

  /**
   * Set trail state explicitly.
   * 
   * @param trail true to enable, false to disable
   * @returns This builder for chaining
   */
  trail(trail: boolean): BukkitFireworkEffectBuilder;

  /**
   * Add a primary color.
   * 
   * Primary colors are shown at initial explosion.
   * At least one color is REQUIRED to build.
   * 
   * @param color Color to add
   * @returns This builder for chaining
   * @throws IllegalArgumentException if color is null
   */
  withColor(color: BukkitColor): BukkitFireworkEffectBuilder;

  /**
   * Add multiple primary colors.
   * 
   * @param colors Colors to add
   * @returns This builder for chaining
   * @throws IllegalArgumentException if colors or any color is null
   */
  withColor(...colors: BukkitColor[]): BukkitFireworkEffectBuilder;

  /**
   * Add primary colors from iterable.
   * 
   * @param colors Iterable of colors
   * @returns This builder for chaining
   */
  withColor(colors: Iterable<BukkitColor>): BukkitFireworkEffectBuilder;

  /**
   * Add a fade color.
   * 
   * Fade colors are shown as explosion particles age.
   * Optional - if not set, particles just disappear.
   * 
   * @param color Color to add
   * @returns This builder for chaining
   * @throws IllegalArgumentException if color is null
   */
  withFade(color: BukkitColor): BukkitFireworkEffectBuilder;

  /**
   * Add multiple fade colors.
   * 
   * @param colors Colors to add
   * @returns This builder for chaining
   */
  withFade(...colors: BukkitColor[]): BukkitFireworkEffectBuilder;

  /**
   * Add fade colors from iterable.
   * 
   * @param colors Iterable of colors
   * @returns This builder for chaining
   */
  withFade(colors: Iterable<BukkitColor>): BukkitFireworkEffectBuilder;

  /**
   * Build the FireworkEffect.
   * 
   * REQUIREMENT: At least one color must be specified.
   * 
   * @returns The constructed FireworkEffect
   * @throws IllegalStateException if no colors were added
   */
  build(): BukkitFireworkEffect;
}

// ============================================
// FIREWORK EFFECT INTERFACE
// ============================================

/**
 * A single firework explosion effect.
 * 
 * Immutable once created. Use builder() to create.
 */
export interface BukkitFireworkEffect {
  /**
   * Check if effect has flicker.
   * 
   * Flicker makes particles twinkle on/off.
   */
  hasFlicker(): boolean;

  /**
   * Check if effect has trail.
   * 
   * Trail makes particles leave sparkle trails.
   */
  hasTrail(): boolean;

  /**
   * Get primary colors.
   * 
   * These colors appear at initial explosion.
   * 
   * @returns Immutable list of primary colors (at least one)
   */
  getColors(): JavaList<BukkitColor>;

  /**
   * Get fade colors.
   * 
   * These colors appear as particles age.
   * 
   * @returns Immutable list of fade colors (may be empty)
   */
  getFadeColors(): JavaList<BukkitColor>;

  /**
   * Get effect type (shape).
   */
  getType(): BukkitFireworkEffectType;

  /**
   * Serialize to map for configuration storage.
   */
  serialize(): JavaMap<string, any>;

  /**
   * String representation.
   */
  toString(): string;

  /**
   * Hash code.
   */
  hashCode(): number;

  /**
   * Equality check.
   */
  equals(obj: any): boolean;
}

// ============================================
// STATIC METHODS NAMESPACE
// ============================================

/**
 * Static methods for FireworkEffect.
 */
export const FireworkEffect = {
  /**
   * Create a new FireworkEffect builder.
   * 
   * @example
   * const effect = FireworkEffect.builder()
   *   .with(FireworkEffectType.STAR)
   *   .withColor(Color.RED)
   *   .build();
   */
  builder(): BukkitFireworkEffectBuilder {
    return org.bukkit.FireworkEffect.builder();
  },

  /**
   * Deserialize from configuration map.
   * 
   * @param map Serialized data
   * @returns Reconstructed FireworkEffect
   */
  deserialize(map: JavaMap<string, any>): BukkitFireworkEffect {
    return org.bukkit.FireworkEffect.deserialize(map);
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create a simple single-color effect.
 * 
 * @example
 * const effect = createSimpleEffect(Color.RED);
 */
export function createSimpleEffect(color: BukkitColor): BukkitFireworkEffect {
  return FireworkEffect.builder()
    .withColor(color)
    .build();
}

/**
 * Create effect with type and color.
 * 
 * @example
 * const star = createEffect(FireworkEffectType.STAR, Color.YELLOW);
 */
export function createEffect(
  type: BukkitFireworkEffectType,
  color: BukkitColor
): BukkitFireworkEffect {
  return FireworkEffect.builder()
    .with(type)
    .withColor(color)
    .build();
}

/**
 * Create effect with all options.
 * 
 * @example
 * const fancy = createFullEffect(
 *   FireworkEffectType.STAR,
 *   [Color.RED, Color.WHITE],
 *   [Color.YELLOW],
 *   true,  // flicker
 *   true   // trail
 * );
 */
export function createFullEffect(
  type: BukkitFireworkEffectType,
  colors: BukkitColor[],
  fadeColors: BukkitColor[] = [],
  flicker: boolean = false,
  trail: boolean = false
): BukkitFireworkEffect {
  const builder = FireworkEffect.builder().with(type);

  for (const color of colors) {
    builder.withColor(color);
  }

  for (const color of fadeColors) {
    builder.withFade(color);
  }

  if (flicker) {
    builder.withFlicker();
  }

  if (trail) {
    builder.withTrail();
  }

  return builder.build();
}

/**
 * Create a rainbow effect with all basic colors.
 * 
 * @param type Effect type (default: BALL_LARGE)
 */
export function createRainbowEffect(
  type: BukkitFireworkEffectType = FireworkEffectType.BALL_LARGE
): BukkitFireworkEffect {
  return FireworkEffect.builder()
    .with(type)
    .withColor(org.bukkit.Color.RED)
    .withColor(org.bukkit.Color.ORANGE)
    .withColor(org.bukkit.Color.YELLOW)
    .withColor(org.bukkit.Color.GREEN)
    .withColor(org.bukkit.Color.BLUE)
    .withColor(org.bukkit.Color.PURPLE)
    .withTrail()
    .build();
}

/**
 * Create a patriotic effect (red, white, blue).
 */
export function createPatrioticEffect(
  type: BukkitFireworkEffectType = FireworkEffectType.STAR
): BukkitFireworkEffect {
  return FireworkEffect.builder()
    .with(type)
    .withColor(org.bukkit.Color.RED)
    .withColor(org.bukkit.Color.WHITE)
    .withColor(org.bukkit.Color.BLUE)
    .withFlicker()
    .withTrail()
    .build();
}

/**
 * Create a gold sparkle effect.
 */
export function createGoldSparkleEffect(): BukkitFireworkEffect {
  return FireworkEffect.builder()
    .with(FireworkEffectType.BURST)
    .withColor(org.bukkit.Color.YELLOW)
    .withColor(org.bukkit.Color.ORANGE)
    .withFade(org.bukkit.Color.YELLOW)
    .withFlicker()
    .withTrail()
    .build();
}

/**
 * Create a creeper face effect.
 */
export function createCreeperEffect(
  color: BukkitColor = org.bukkit.Color.GREEN
): BukkitFireworkEffect {
  return FireworkEffect.builder()
    .with(FireworkEffectType.CREEPER)
    .withColor(color)
    .withFade(org.bukkit.Color.LIME)
    .build();
}

/**
 * Check if effect has any fade colors.
 */
export function hasFadeColors(effect: BukkitFireworkEffect): boolean {
  return effect.getFadeColors().size() > 0;
}

/**
 * Get number of primary colors in effect.
 */
export function getColorCount(effect: BukkitFireworkEffect): number {
  return effect.getColors().size();
}

/**
 * Get number of fade colors in effect.
 */
export function getFadeColorCount(effect: BukkitFireworkEffect): number {
  return effect.getFadeColors().size();
}

/**
 * Check if effect is "fancy" (has flicker or trail).
 */
export function isFancyEffect(effect: BukkitFireworkEffect): boolean {
  return effect.hasFlicker() || effect.hasTrail();
}

/**
 * Check if effect is "full featured" (has everything).
 */
export function isFullFeaturedEffect(effect: BukkitFireworkEffect): boolean {
  return effect.hasFlicker() && 
         effect.hasTrail() && 
         hasFadeColors(effect);
}

/**
 * Get effect type by name.
 * 
 * @param name Type name (case-insensitive)
 * @returns Effect type or null if not found
 */
export function getFireworkEffectType(name: string): BukkitFireworkEffectType | null {
  const upper = name.toUpperCase() as FireworkEffectTypeKey;
  return FireworkEffectType[upper] ?? null;
}

/**
 * Clone an effect with different type.
 */
export function withDifferentType(
  effect: BukkitFireworkEffect,
  newType: BukkitFireworkEffectType
): BukkitFireworkEffect {
  const builder = FireworkEffect.builder().with(newType);

  /* Copy colors */
  const colors = effect.getColors();
  for (let i = 0; i < colors.size(); i++) {
    builder.withColor(colors.get(i));
  }

  /* Copy fade colors */
  const fadeColors = effect.getFadeColors();
  for (let i = 0; i < fadeColors.size(); i++) {
    builder.withFade(fadeColors.get(i));
  }

  /* Copy properties */
  builder.flicker(effect.hasFlicker());
  builder.trail(effect.hasTrail());

  return builder.build();
}

/**
 * Clone an effect with added properties.
 */
export function enhanceEffect(
  effect: BukkitFireworkEffect,
  addFlicker: boolean = false,
  addTrail: boolean = false,
  additionalFadeColors: BukkitColor[] = []
): BukkitFireworkEffect {
  const builder = FireworkEffect.builder().with(effect.getType());

  /* Copy colors */
  const colors = effect.getColors();
  for (let i = 0; i < colors.size(); i++) {
    builder.withColor(colors.get(i));
  }

  /* Copy existing fade colors + add new ones */
  const fadeColors = effect.getFadeColors();
  for (let i = 0; i < fadeColors.size(); i++) {
    builder.withFade(fadeColors.get(i));
  }
  for (const color of additionalFadeColors) {
    builder.withFade(color);
  }

  /* Set properties (OR with existing) */
  builder.flicker(effect.hasFlicker() || addFlicker);
  builder.trail(effect.hasTrail() || addTrail);

  return builder.build();
}

/**
 * Describe effect in human-readable format.
 * 
 * @example
 * describeEffect(effect);
 * // "STAR with 3 colors, 1 fade color, flicker, trail"
 */
export function describeEffect(effect: BukkitFireworkEffect): string {
  const parts: string[] = [effect.getType().name()];

  const colorCount = effect.getColors().size();
  parts.push(`with ${colorCount} color${colorCount !== 1 ? "s" : ""}`);

  const fadeCount = effect.getFadeColors().size();
  if (fadeCount > 0) {
    parts.push(`${fadeCount} fade color${fadeCount !== 1 ? "s" : ""}`);
  }

  if (effect.hasFlicker()) {
    parts.push("flicker");
  }

  if (effect.hasTrail()) {
    parts.push("trail");
  }

  return parts.join(", ");
}