/**
 * DESIGN
 * ------
 * BarColor defines the colors available for boss bars.
 * 
 * BOSS BAR COLORS:
 * 
 * 
 * VANILLA USAGE:
 * - PINK: Default for Wither
 * - PURPLE: Default for Ender Dragon
 * - Other colors: Custom boss bars
 * 
 * VISUAL APPEARANCE:
 * The bar color affects only the filled portion of the bar.
 * The background is always a darker shade.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/boss/BarColor.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, isEnumValue } from "../../java/types/enum"

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All valid BarColor constant names.
 */
export type BarColorName =
  | "PINK"
  | "BLUE"
  | "RED"
  | "GREEN"
  | "YELLOW"
  | "PURPLE"
  | "WHITE";

/**
 * BarColor enum instance.
 */
export interface BukkitBarColor extends JavaEnum<BarColorName> {}

/**
 * BarColor enum class (static side).
 */
export interface BukkitBarColorClass extends JavaEnumClass<BukkitBarColor> {
  /** Pink/magenta color (Wither default) */
  readonly PINK: BukkitBarColor;
  
  /** Blue color */
  readonly BLUE: BukkitBarColor;
  
  /** Red color */
  readonly RED: BukkitBarColor;
  
  /** Green color */
  readonly GREEN: BukkitBarColor;
  
  /** Yellow color */
  readonly YELLOW: BukkitBarColor;
  
  /** Purple color (Ender Dragon default) */
  readonly PURPLE: BukkitBarColor;
  
  /** White color */
  readonly WHITE: BukkitBarColor;
}

/**
 * Access to BarColor enum.
 */
export const BarColor: BukkitBarColorClass = org.bukkit.boss.BarColor;

// ============================================
// CONSTANTS
// ============================================

/**
 * All bar colors in declaration order.
 */
export const BAR_COLORS: readonly BarColorName[] = [
  "PINK",
  "BLUE",
  "RED",
  "GREEN",
  "YELLOW",
  "PURPLE",
  "WHITE",
] as const;

/**
 * Default color for Wither boss bar.
 */
export const WITHER_COLOR: BarColorName = "PINK";

/**
 * Default color for Ender Dragon boss bar.
 */
export const ENDER_DRAGON_COLOR: BarColorName = "PURPLE";

/**
 * Hex color approximations for each bar color.
 * Useful for UI consistency outside Minecraft.
 */
export const BAR_COLOR_HEX: Record<BarColorName, string> = {
  PINK: "#FF55FF",
  BLUE: "#5555FF",
  RED: "#FF5555",
  GREEN: "#55FF55",
  YELLOW: "#FFFF55",
  PURPLE: "#AA00AA",
  WHITE: "#FFFFFF",
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all BarColor values.
 */
export function getBarColors(): BukkitBarColor[] {
  return enumValues(BarColor);
}

/**
 * Get BarColor by name.
 * 
 * @param name Color name
 * @returns BarColor enum value
 * @throws IllegalArgumentException if name is invalid
 * 
 * @example
 * const red = getBarColor("RED");
 */
export function getBarColor(name: BarColorName): BukkitBarColor {
  return enumValueOf(BarColor, name);
}

/**
 * Safely get BarColor by name.
 * 
 * @param name Color name (case-insensitive)
 * @returns BarColor or null if invalid
 */
export function getBarColorSafe(name: string): BukkitBarColor | null {
  const upper = name.toUpperCase();
  if (isEnumValue(BarColor, upper)) {
    return enumValueOf(BarColor, upper);
  }
  return null;
}

/**
 * Check if a string is a valid BarColor name.
 */
export function isBarColorName(name: string): name is BarColorName {
  return isEnumValue(BarColor, name.toUpperCase());
}

// ============================================
// COLOR CHECKS
// ============================================

/**
 * Check if color is pink.
 */
export function isPink(color: BukkitBarColor): boolean {
  return color.name() === "PINK";
}

/**
 * Check if color is blue.
 */
export function isBlue(color: BukkitBarColor): boolean {
  return color.name() === "BLUE";
}

/**
 * Check if color is red.
 */
export function isRed(color: BukkitBarColor): boolean {
  return color.name() === "RED";
}

/**
 * Check if color is green.
 */
export function isGreen(color: BukkitBarColor): boolean {
  return color.name() === "GREEN";
}

/**
 * Check if color is yellow.
 */
export function isYellow(color: BukkitBarColor): boolean {
  return color.name() === "YELLOW";
}

/**
 * Check if color is purple.
 */
export function isPurple(color: BukkitBarColor): boolean {
  return color.name() === "PURPLE";
}

/**
 * Check if color is white.
 */
export function isWhite(color: BukkitBarColor): boolean {
  return color.name() === "WHITE";
}

// ============================================
// COLOR UTILITIES
// ============================================

/**
 * Get hex color for bar color.
 */
export function getHexColor(color: BukkitBarColor): string {
  return BAR_COLOR_HEX[color.name() as BarColorName];
}

/**
 * Get display name for bar color.
 * 
 * @example
 * getColorDisplayName(BarColor.PINK); // "Pink"
 */
export function getColorDisplayName(color: BukkitBarColor): string {
  const name = color.name();
  return name.charAt(0) + name.slice(1).toLowerCase();
}

/**
 * Get a random bar color.
 */
export function getRandomBarColor(): BukkitBarColor {
  const colors = getBarColors();
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

/**
 * Get next color in sequence (wraps around).
 */
export function getNextColor(color: BukkitBarColor): BukkitBarColor {
  const colors = getBarColors();
  const index = color.ordinal();
  const nextIndex = (index + 1) % colors.length;
  return colors[nextIndex];
}

/**
 * Get previous color in sequence (wraps around).
 */
export function getPreviousColor(color: BukkitBarColor): BukkitBarColor {
  const colors = getBarColors();
  const index = color.ordinal();
  const prevIndex = (index - 1 + colors.length) % colors.length;
  return colors[prevIndex];
}

// ============================================
// COLOR CATEGORIES
// ============================================

/**
 * "Warm" colors (red, yellow, pink).
 */
export const WARM_COLORS: readonly BarColorName[] = ["RED", "YELLOW", "PINK"];

/**
 * "Cool" colors (blue, green, purple).
 */
export const COOL_COLORS: readonly BarColorName[] = ["BLUE", "GREEN", "PURPLE"];

/**
 * Check if color is a warm color.
 */
export function isWarmColor(color: BukkitBarColor): boolean {
  return WARM_COLORS.includes(color.name() as BarColorName);
}

/**
 * Check if color is a cool color.
 */
export function isCoolColor(color: BukkitBarColor): boolean {
  return COOL_COLORS.includes(color.name() as BarColorName);
}

/**
 * Get all warm colors.
 */
export function getWarmColors(): BukkitBarColor[] {
  return WARM_COLORS.map(name => getBarColor(name));
}

/**
 * Get all cool colors.
 */
export function getCoolColors(): BukkitBarColor[] {
  return COOL_COLORS.map(name => getBarColor(name));
}