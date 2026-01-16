/**
 * DESIGN
 * ------
 * World.Environment represents the different dimension types in Minecraft.
 * 
 * ... (mantieni la documentazione) ...
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All valid Environment constant names.
 */
export type EnvironmentKey =
  | "NORMAL"
  | "NETHER"
  | "THE_END"
  | "CUSTOM";

/**
 * Environment enum instance.
 */
export interface BukkitEnvironment extends JavaEnum<EnvironmentKey> {
  /**
   * Get the dimension ID.
   * 
   * @returns Dimension ID
   * @deprecated Magic value
   */
  getId(): number;
}

/**
 * Environment enum class (static side).
 */
export interface BukkitEnvironmentClass extends JavaEnumClass<BukkitEnvironment> {
  readonly NORMAL: BukkitEnvironment;
  readonly NETHER: BukkitEnvironment;
  readonly THE_END: BukkitEnvironment;
  readonly CUSTOM: BukkitEnvironment;
  
  /**
   * Get environment by ID.
   * @deprecated Magic value
   */
  getEnvironment(id: number): BukkitEnvironment | null;
}

// ============================================
// JAVA CLASS NAME
// ============================================

/**
 * Fully qualified Java class name for World.Environment.
 * Note: Inner classes use $ separator.
 */
const ENVIRONMENT_CLASS = "org.bukkit.World$Environment";

// ============================================
// ENUM ACCESS FUNCTIONS
// ============================================

/**
 * Get all Environment values.
 */
export function getEnvironments(): BukkitEnvironment[] {
  return Java.enumValues<BukkitEnvironment>(ENVIRONMENT_CLASS);
}

/**
 * Get Environment by name.
 * 
 * @throws Error if name is invalid
 */
export function getEnvironment(name: EnvironmentKey): BukkitEnvironment {
  return Java.enumValue<BukkitEnvironment>(ENVIRONMENT_CLASS, name);
}

/**
 * Safely get Environment by name.
 * 
 * @param name Environment name (case-insensitive)
 * @returns Environment or null if invalid
 */
export function getEnvironmentSafe(name: string): BukkitEnvironment | null {
  try {
    return Java.enumValue<BukkitEnvironment>(ENVIRONMENT_CLASS, name.toUpperCase());
  } catch {
    return null;
  }
}

/**
 * Check if a string is a valid Environment name.
 */
export function isEnvironmentName(name: string): name is EnvironmentKey {
  return ENVIRONMENTS.includes(name.toUpperCase() as EnvironmentKey);
}

/**
 * Get Environment by ID.
 * 
 * @deprecated Magic value
 */
export function getEnvironmentById(id: number): BukkitEnvironment | null {
  const idMap: Record<number, EnvironmentKey> = {
    0: "NORMAL",
    [-1]: "NETHER",
    1: "THE_END",
  };
  
  const name = idMap[id];
  return name ? getEnvironment(name) : null;
}

// ============================================
// CONSTANTS
// ============================================

/**
 * All environments in declaration order.
 */
export const ENVIRONMENTS: readonly EnvironmentKey[] = [
  "NORMAL",
  "NETHER",
  "THE_END",
  "CUSTOM",
] as const;

/**
 * Vanilla dimension environments (excludes CUSTOM).
 */
export const VANILLA_ENVIRONMENTS: readonly EnvironmentKey[] = [
  "NORMAL",
  "NETHER",
  "THE_END",
] as const;

/**
 * Environment dimension IDs.
 */
export const ENVIRONMENT_IDS: Record<EnvironmentKey, number> = {
  NORMAL: 0,
  NETHER: -1,
  THE_END: 1,
  CUSTOM: -999,
};

// ============================================
// ENVIRONMENT CHECKS
// ============================================

/**
 * Check if environment is the Overworld.
 */
export function isOverworld(env: BukkitEnvironment): boolean {
  return env.name() === "NORMAL";
}

/**
 * Check if environment is the Nether.
 */
export function isNether(env: BukkitEnvironment): boolean {
  return env.name() === "NETHER";
}

/**
 * Check if environment is The End.
 */
export function isTheEnd(env: BukkitEnvironment): boolean {
  return env.name() === "THE_END";
}

/**
 * Check if environment is custom.
 */
export function isCustom(env: BukkitEnvironment): boolean {
  return env.name() === "CUSTOM";
}

/**
 * Check if environment is a vanilla dimension.
 */
export function isVanillaDimension(env: BukkitEnvironment): boolean {
  return !isCustom(env);
}

// ============================================
// ENVIRONMENT PROPERTIES
// ============================================

/**
 * Check if environment has day/night cycle.
 */
export function hasDayNightCycle(env: BukkitEnvironment): boolean {
  return env.name() === "NORMAL";
}

/**
 * Check if environment has weather.
 */
export function hasWeather(env: BukkitEnvironment): boolean {
  return env.name() === "NORMAL";
}

/**
 * Check if environment has a ceiling (like Nether).
 */
export function hasCeiling(env: BukkitEnvironment): boolean {
  return env.name() === "NETHER";
}

/**
 * Check if environment has natural skylight.
 */
export function hasSkylight(env: BukkitEnvironment): boolean {
  return env.name() === "NORMAL" || env.name() === "THE_END";
}

/**
 * Check if beds explode in this environment.
 */
export function doBedsExplode(env: BukkitEnvironment): boolean {
  return env.name() === "NETHER" || env.name() === "THE_END";
}

/**
 * Check if respawn anchors work in this environment.
 */
export function doRespawnAnchorsWork(env: BukkitEnvironment): boolean {
  return env.name() === "NETHER";
}

/**
 * Check if water evaporates in this environment.
 */
export function doesWaterEvaporate(env: BukkitEnvironment): boolean {
  return env.name() === "NETHER";
}

/**
 * Check if compasses work in this environment.
 */
export function doCompassesWork(env: BukkitEnvironment): boolean {
  return env.name() === "NORMAL";
}

/**
 * Check if clocks work in this environment.
 */
export function doClocksWork(env: BukkitEnvironment): boolean {
  return env.name() === "NORMAL";
}

/**
 * Get the coordinate scale for this environment.
 */
export function getCoordinateScale(env: BukkitEnvironment): number {
  return env.name() === "NETHER" ? 8 : 1;
}

// ============================================
// DISPLAY NAMES
// ============================================

export const ENVIRONMENT_DISPLAY_NAMES: Record<EnvironmentKey, string> = {
  NORMAL: "Overworld",
  NETHER: "The Nether",
  THE_END: "The End",
  CUSTOM: "Custom",
};

export function getEnvironmentDisplayName(env: BukkitEnvironment): string {
  return ENVIRONMENT_DISPLAY_NAMES[env.name() as EnvironmentKey];
}

export const ENVIRONMENT_DESCRIPTIONS: Record<EnvironmentKey, string> = {
  NORMAL: "The normal surface world with day/night cycle",
  NETHER: "The fiery underworld dimension",
  THE_END: "The void dimension with floating islands",
  CUSTOM: "A custom plugin or datapack dimension",
};

export function getEnvironmentDescription(env: BukkitEnvironment): string {
  return ENVIRONMENT_DESCRIPTIONS[env.name() as EnvironmentKey];
}

// ============================================
// CONVERSION
// ============================================

export function overworldToNether(x: number, z: number): { x: number; z: number } {
  return {
    x: Math.floor(x / 8),
    z: Math.floor(z / 8),
  };
}

export function netherToOverworld(x: number, z: number): { x: number; z: number } {
  return {
    x: x * 8,
    z: z * 8,
  };
}

export function convertCoordinates(
  x: number,
  z: number,
  from: BukkitEnvironment,
  to: BukkitEnvironment
): { x: number; z: number } {
  const fromScale = getCoordinateScale(from);
  const toScale = getCoordinateScale(to);
  
  const baseX = x * fromScale;
  const baseZ = z * fromScale;
  
  return {
    x: Math.floor(baseX / toScale),
    z: Math.floor(baseZ / toScale),
  };
}

// ============================================
// INFO
// ============================================

export function getEnvironmentInfo(env: BukkitEnvironment): {
  name: EnvironmentKey;
  displayName: string;
  description: string;
  id: number;
  isVanilla: boolean;
  hasDayNight: boolean;
  hasWeather: boolean;
  hasCeiling: boolean;
  coordinateScale: number;
  bedsExplode: boolean;
} {
  return {
    name: env.name() as EnvironmentKey,
    displayName: getEnvironmentDisplayName(env),
    description: getEnvironmentDescription(env),
    id: env.getId(),
    isVanilla: isVanillaDimension(env),
    hasDayNight: hasDayNightCycle(env),
    hasWeather: hasWeather(env),
    hasCeiling: hasCeiling(env),
    coordinateScale: getCoordinateScale(env),
    bedsExplode: doBedsExplode(env),
  };
}

export function describeEnvironment(env: BukkitEnvironment): string {
  const name = getEnvironmentDisplayName(env);
  const scale = getCoordinateScale(env);
  
  if (scale !== 1) {
    return `${name} (${scale}:1 coordinate scale)`;
  }
  
  return name;
}