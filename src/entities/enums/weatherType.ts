// world/enums/weatherType.ts

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

/**
 * WeatherType - An enum of all current weather types.
 * 
 * Minecraft has two weather states:
 * 
 * CLEAR:
 * - Sunny sky (day) or starry sky (night)
 * - Clouds visible but no precipitation
 * - Normal light level
 * 
 * DOWNFALL:
 * - Rain in most biomes
 * - Snow in cold biomes (taiga, snowy plains, etc.)
 * - Thunder possible during storms
 * - Reduced light level
 * - Mobs can spawn during day (due to darkness)
 * - Fire extinguishes naturally
 * - Farmland hydrates without water nearby
 * 
 * BIOME EFFECTS ON DOWNFALL:
 * ┌─────────────────────────────────────────────────┐
 * │ Temperature >= 0.15  →  Rain                    │
 * │ Temperature < 0.15   →  Snow                    │
 * │ Desert/Badlands      →  Nothing (too dry)       │
 * └─────────────────────────────────────────────────┘
 * 
 * USAGE:
 * - World.setStorm(true) sets DOWNFALL
 * - Player.setPlayerWeather() sets per-player weather
 * - WeatherChangeEvent fires when weather changes
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/WeatherType.html
 */
export type WeatherTypeKey =
  | "CLEAR"
  | "DOWNFALL";

export interface BukkitWeatherType extends JavaEnum<WeatherTypeKey> {}

interface WeatherTypeClass extends
  Omit<Record<WeatherTypeKey, BukkitWeatherType>, keyof JavaEnumClass<BukkitWeatherType>>,
  JavaEnumClass<BukkitWeatherType> {}

export const WeatherType: WeatherTypeClass = {
  /**
   * Clear weather, clouds but no rain.
   * 
   * - Sun visible during day
   * - Stars visible at night
   * - Normal light levels
   * - Fire burns normally
   */
  CLEAR: org.bukkit.WeatherType.CLEAR,

  /**
   * Raining or snowing depending on biome.
   * 
   * - Rain in warm/temperate biomes
   * - Snow in cold biomes
   * - Nothing in dry biomes (desert)
   * - Reduced light level (~12 instead of 15)
   * - Can trigger thunderstorms
   */
  DOWNFALL: org.bukkit.WeatherType.DOWNFALL,

  values(): BukkitWeatherType[] {
    return org.bukkit.WeatherType.values();
  },
  valueOf(name: string): BukkitWeatherType {
    return org.bukkit.WeatherType.valueOf(name);
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if weather is clear
 */
export function isClear(weather: BukkitWeatherType): boolean {
  return weather === WeatherType.CLEAR;
}

/**
 * Check if weather is downfall (rain/snow)
 */
export function isDownfall(weather: BukkitWeatherType): boolean {
  return weather === WeatherType.DOWNFALL;
}

/**
 * Check if it's raining (alias for isDownfall)
 */
export function isRaining(weather: BukkitWeatherType): boolean {
  return weather === WeatherType.DOWNFALL;
}

/**
 * Get the opposite weather type
 */
export function getOpposite(weather: BukkitWeatherType): BukkitWeatherType {
  return weather === WeatherType.CLEAR 
    ? WeatherType.DOWNFALL 
    : WeatherType.CLEAR;
}

/**
 * Get human-readable description
 */
export function describeWeather(weather: BukkitWeatherType): string {
  switch (weather) {
    case WeatherType.CLEAR:
      return "Clear (sunny/starry)";
    case WeatherType.DOWNFALL:
      return "Downfall (rain/snow)";
    default:
      return weather.name();
  }
}

/**
 * Get weather icon (for display)
 */
export function getWeatherIcon(weather: BukkitWeatherType): string {
  return weather === WeatherType.CLEAR ? "☀" : "🌧";
}