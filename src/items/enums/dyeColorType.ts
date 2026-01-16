/**
 * All supported color values for dyes and cloth.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/DyeColor.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";
import { BukkitColor } from "./colorType";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type DyeColorKey =
  | "WHITE" | "ORANGE" | "MAGENTA" | "LIGHT_BLUE"
  | "YELLOW" | "LIME" | "PINK" | "GRAY"
  | "LIGHT_GRAY" | "CYAN" | "PURPLE" | "BLUE"
  | "BROWN" | "GREEN" | "RED" | "BLACK";

// ============================================
// INTERFACE
// ============================================

export interface BukkitDyeColor extends JavaEnum<DyeColorKey> {
  /**
   * Gets the color that this dye represents.
   * @returns The Color that this dye represents
   */
  getColor(): BukkitColor;

  /**
   * Gets the firework color that this dye represents.
   * @returns The Color that this dye represents
   */
  getFireworkColor(): BukkitColor;

  /**
   * Gets the associated wool data value representing this color.
   * @returns A byte containing the wool data value of this color
   * @deprecated Magic value
   */
  getWoolData(): number;

  /**
   * Gets the associated dye data value representing this color.
   * @returns A byte containing the dye data value of this color
   * @deprecated Magic value
   */
  getDyeData(): number;
}

// ============================================
// DYE COLOR CLASS INTERFACE
// ============================================

/*
 * DyeColor is a Java enum with extra static methods.
 * 
 * The Omit pattern removes BOTH:
 *   1. "values" | "valueOf" from JavaEnumClass (to re-add with correct signatures)
 *   2. "valueOf" inherited from Object (which has signature () => Object)
 * 
 * keyof JavaEnumClass<T> = "values" | "valueOf"
 * 
 * This ensures no conflict between Object.valueOf() and our valueOf(name: string).
 */
interface DyeColorClass extends
  Omit<Record<DyeColorKey, BukkitDyeColor>, keyof JavaEnumClass<BukkitDyeColor>>,
  JavaEnumClass<BukkitDyeColor> {

  /**
   * Gets the DyeColor with the given color value.
   * @param color - Color value to get the dye by
   * @returns The DyeColor representing the given value, or null if it doesn't exist
   */
  getByColor(color: BukkitColor): BukkitDyeColor | null;

  /**
   * Gets the DyeColor with the given firework color value.
   * @param color - Color value to get dye by
   * @returns The DyeColor representing the given value, or null if it doesn't exist
   */
  getByFireworkColor(color: BukkitColor): BukkitDyeColor | null;

  /**
   * Gets the DyeColor with the given wool data value.
   * @param data - Wool data value to fetch
   * @returns The DyeColor representing the given value, or null if it doesn't exist
   * @deprecated Magic value
   */
  getByWoolData(data: number): BukkitDyeColor | null;

  /**
   * Gets the DyeColor with the given dye data value.
   * @param data - Dye data value to fetch
   * @returns The DyeColor representing the given value, or null if it doesn't exist
   * @deprecated Magic value
   */
  getByDyeData(data: number): BukkitDyeColor | null;

  /**
   * Gets the DyeColor for the given name, possibly doing legacy transformations.
   * @param name - Dye name
   * @returns Dye color
   * @deprecated Legacy use only
   */
  legacyValueOf(name: string | null): BukkitDyeColor;
}

// ============================================
// DYE COLORS
// ============================================

export const DyeColor: DyeColorClass = {
  /** Represents white dye. */
  WHITE: org.bukkit.DyeColor.WHITE,

  /** Represents orange dye. */
  ORANGE: org.bukkit.DyeColor.ORANGE,

  /** Represents magenta dye. */
  MAGENTA: org.bukkit.DyeColor.MAGENTA,

  /** Represents light blue dye. */
  LIGHT_BLUE: org.bukkit.DyeColor.LIGHT_BLUE,

  /** Represents yellow dye. */
  YELLOW: org.bukkit.DyeColor.YELLOW,

  /** Represents lime dye. */
  LIME: org.bukkit.DyeColor.LIME,

  /** Represents pink dye. */
  PINK: org.bukkit.DyeColor.PINK,

  /** Represents gray dye. */
  GRAY: org.bukkit.DyeColor.GRAY,

  /** Represents light gray dye. */
  LIGHT_GRAY: org.bukkit.DyeColor.LIGHT_GRAY,

  /** Represents cyan dye. */
  CYAN: org.bukkit.DyeColor.CYAN,

  /** Represents purple dye. */
  PURPLE: org.bukkit.DyeColor.PURPLE,

  /** Represents blue dye. */
  BLUE: org.bukkit.DyeColor.BLUE,

  /** Represents brown dye. */
  BROWN: org.bukkit.DyeColor.BROWN,

  /** Represents green dye. */
  GREEN: org.bukkit.DyeColor.GREEN,

  /** Represents red dye. */
  RED: org.bukkit.DyeColor.RED,

  /** Represents black dye. */
  BLACK: org.bukkit.DyeColor.BLACK,

  // Standard enum methods
  values(): BukkitDyeColor[] {
    return org.bukkit.DyeColor.values();
  },

  valueOf(name: string): BukkitDyeColor {
    return org.bukkit.DyeColor.valueOf(name);
  },

  // Additional static methods
  getByColor(color: BukkitColor): BukkitDyeColor | null {
    return org.bukkit.DyeColor.getByColor(color);
  },

  getByFireworkColor(color: BukkitColor): BukkitDyeColor | null {
    return org.bukkit.DyeColor.getByFireworkColor(color);
  },

  /** @deprecated Magic value */
  getByWoolData(data: number): BukkitDyeColor | null {
    return org.bukkit.DyeColor.getByWoolData(data);
  },

  /** @deprecated Magic value */
  getByDyeData(data: number): BukkitDyeColor | null {
    return org.bukkit.DyeColor.getByDyeData(data);
  },

  /** @deprecated Legacy use only */
  legacyValueOf(name: string | null): BukkitDyeColor {
    return org.bukkit.DyeColor.legacyValueOf(name);
  },
};