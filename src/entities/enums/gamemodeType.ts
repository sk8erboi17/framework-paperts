/**
 * Represents the various type of game modes that HumanEntities may have.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/GameMode.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type GameModeKey = "ADVENTURE" | "CREATIVE" | "SPECTATOR" | "SURVIVAL";

// ============================================
// INTERFACE
// ============================================

export interface BukkitGameMode extends JavaEnum<GameModeKey> {
  /**
   * Gets the mode value associated with this GameMode.
   * @returns An integer value of this gamemode
   * @deprecated Magic value
   * @since Deprecated since 1.6.2
   */
  getValue(): number;
}

// ============================================
// GAME MODE CLASS INTERFACE
// ============================================

/*
 * Why Omit<Record<...>, keyof JavaEnumClass<...>>?
 * 
 * TypeScript's Record<K, V> inherits from Object, which defines:
 * 
 *   interface Object {
 *     valueOf(): Object;
 *   }
 * 
 * Our JavaEnumClass interface defines:
 * 
 *   interface JavaEnumClass<E> {
 *     valueOf(name: string): E;
 *   }
 * 
 * When we extend both, TypeScript sees two incompatible valueOf() signatures
 * and throws: "Target signature provides too few arguments."
 * 
 * Alternatives considered:
 * 
 * 1. Using a type intersection instead of interface extends:
 *      type GameModeClass = Record<...> & JavaEnumClass<...>
 *    Same problem - the conflict still exists.
 * 
 * 2. Redeclaring valueOf() in GameModeClass to override both:
 *      interface GameModeClass extends Record<...>, JavaEnumClass<...> {
 *        valueOf(name: string): BukkitGameMode;
 *      }
 *    Doesn't work - extends must be compatible with all parents first.
 * 
 * 3. Not extending Record at all, listing keys manually:
 *      interface GameModeClass extends JavaEnumClass<...> {
 *        ADVENTURE: BukkitGameMode;
 *        CREATIVE: BukkitGameMode;
 *        ...
 *      }
 *    Works but verbose and duplicates the GameModeKey union.
 * 
 * The Omit solution removes valueOf (and values, for consistency) from
 * Record before extending, letting JavaEnumClass provide the correct
 * signatures. This is the cleanest approach that preserves type safety
 * while keeping the code DRY.
 */
interface GameModeClass extends 
  Omit<Record<GameModeKey, BukkitGameMode>, keyof JavaEnumClass<BukkitGameMode>>, 
  JavaEnumClass<BukkitGameMode> {
  /**
   * Gets the GameMode represented by the specified value.
   * @param value - Value to check
   * @returns Associative GameMode with the given value, or null if it doesn't exist
   * @deprecated Magic value
   * @since Deprecated since 1.6.2
   */
  getByValue(value: number): BukkitGameMode | null;
}

// ============================================
// GAME MODES
// ============================================

export const GameMode: GameModeClass = {
  /** Adventure mode cannot break blocks without the correct tools. */
  ADVENTURE: org.bukkit.GameMode.ADVENTURE,

  /** Creative mode may fly, build instantly, become invulnerable and create free items. */
  CREATIVE: org.bukkit.GameMode.CREATIVE,

  /** Spectator mode cannot interact with the world in anyway and is invisible to normal players. This grants the player the ability to no-clip through the world. */
  SPECTATOR: org.bukkit.GameMode.SPECTATOR,

  /** Survival mode is the "normal" gameplay type, with no special features. */
  SURVIVAL: org.bukkit.GameMode.SURVIVAL,

  // Static enum methods
  values(): BukkitGameMode[] {
    return org.bukkit.GameMode.values();
  },

  valueOf(name: string): BukkitGameMode {
    return org.bukkit.GameMode.valueOf(name);
  },

  getByValue(value: number): BukkitGameMode | null {
    return org.bukkit.GameMode.getByValue(value);
  },
};