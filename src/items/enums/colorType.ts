/**
 * A container for a color palette. This class is immutable; the set methods return a new color.
 * The color names listed as fields are HTML4 standards, but subject to change.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Color.html
 */

import { BukkitDyeColor } from "./dyeColorType";


// ============================================
// TYPE DEFINITIONS
// ============================================

export type ColorKey =
  | "AQUA" | "BLACK" | "BLUE" | "FUCHSIA"
  | "GRAY" | "GREEN" | "LIME" | "MAROON"
  | "NAVY" | "OLIVE" | "ORANGE" | "PURPLE"
  | "RED" | "SILVER" | "TEAL" | "WHITE" | "YELLOW";

// ============================================
// INTERFACE
// ============================================

/**
 * Represents an immutable color with RGBA components.
 */
export interface BukkitColor {
  /**
   * Gets the alpha component.
   * @returns The alpha component (0-255)
   */
  getAlpha(): number;

  /**
   * Gets the red component.
   * @returns The red component (0-255)
   */
  getRed(): number;

  /**
   * Gets the green component.
   * @returns The green component (0-255)
   */
  getGreen(): number;

  /**
   * Gets the blue component.
   * @returns The blue component (0-255)
   */
  getBlue(): number;

  /**
   * Gets the color as an RGB integer.
   * @returns The RGB integer representation
   */
  asRGB(): number;

  /**
   * Gets the color as an ARGB integer.
   * @returns The ARGB integer representation
   */
  asARGB(): number;

  /**
   * Gets the color as a BGR integer.
   * @returns The BGR integer representation
   */
  asBGR(): number;

  /**
   * Creates a new Color object with specified alpha component.
   * @param alpha - The alpha component (0-255)
   * @returns A new Color with the specified alpha
   */
  setAlpha(alpha: number): BukkitColor;

  /**
   * Creates a new Color object with specified red component.
   * @param red - The red component (0-255)
   * @returns A new Color with the specified red
   */
  setRed(red: number): BukkitColor;

  /**
   * Creates a new Color object with specified green component.
   * @param green - The green component (0-255)
   * @returns A new Color with the specified green
   */
  setGreen(green: number): BukkitColor;

  /**
   * Creates a new Color object with specified blue component.
   * @param blue - The blue component (0-255)
   * @returns A new Color with the specified blue
   */
  setBlue(blue: number): BukkitColor;

  /**
   * Creates a new color with its RGB components changed as if it was dyed
   * with the colors passed in, replicating vanilla workbench dyeing.
   * @param colors - The colors to mix
   * @returns A new mixed Color
   */
  mixColors(...colors: BukkitColor[]): BukkitColor;

  /**
   * Creates a new color with its RGB components changed as if it was dyed
   * with the dye colors passed in, replicating vanilla workbench dyeing.
   * @param colors - The dye colors to mix
   * @returns A new mixed Color
   */
  mixDyes(...colors: BukkitDyeColor[]): BukkitColor;

  /**
   * Returns a string representation of this color.
   * @returns String representation
   */
  toString(): string;

  /**
   * Checks equality with another object.
   * @param o - The object to compare
   * @returns True if equal
   */
  equals(o: object): boolean;

  /**
   * Gets the hash code.
   * @returns The hash code
   */
  hashCode(): number;
}

// ============================================
// COLOR CLASS INTERFACE
// ============================================

/*
 * Color is NOT a Java enum, but a final class with static final fields.
 * This means it doesn't have values() or valueOf() methods.
 * Instead, it has factory methods like fromRGB(), fromARGB(), etc.
 * 
 * The structure is simpler than enums:
 * 
 *   Record<ColorKey, BukkitColor>
 *   
 *   Expands to:
 *   {
 *     AQUA: BukkitColor;
 *     BLACK: BukkitColor;
 *     BLUE: BukkitColor;
 *     ...
 *   }
 * 
 * Then we add the static factory methods via intersection (&).
 */
interface ColorClass extends Record<ColorKey, BukkitColor> {
  /**
   * Creates a new Color object from red, green, and blue components.
   * @param red - The red component (0-255)
   * @param green - The green component (0-255)
   * @param blue - The blue component (0-255)
   * @returns A new Color
   */
  fromRGB(red: number, green: number, blue: number): BukkitColor;

  /**
   * Creates a new color object from an integer that contains the red, green,
   * and blue bytes in the lowest order 24 bits.
   * @param rgb - The RGB integer
   * @returns A new Color
   */
  fromRGB(rgb: number): BukkitColor;

  /**
   * Creates a new Color object from alpha, red, green, and blue components.
   * @param alpha - The alpha component (0-255)
   * @param red - The red component (0-255)
   * @param green - The green component (0-255)
   * @param blue - The blue component (0-255)
   * @returns A new Color
   */
  fromARGB(alpha: number, red: number, green: number, blue: number): BukkitColor;

  /**
   * Creates a new color object from an integer that contains the alpha, red,
   * green, and blue bytes.
   * @param argb - The ARGB integer
   * @returns A new Color
   */
  fromARGB(argb: number): BukkitColor;

  /**
   * Creates a new Color object from blue, green, and red components.
   * @param blue - The blue component (0-255)
   * @param green - The green component (0-255)
   * @param red - The red component (0-255)
   * @returns A new Color
   */
  fromBGR(blue: number, green: number, red: number): BukkitColor;

  /**
   * Creates a new color object from an integer that contains the blue, green,
   * and red bytes in the lowest order 24 bits.
   * @param bgr - The BGR integer
   * @returns A new Color
   */
  fromBGR(bgr: number): BukkitColor;

  /**
   * Deserializes a Color from a map representation.
   * @param map - The map to deserialize
   * @returns The deserialized Color
   */
  deserialize(map: Map<string, object>): BukkitColor;
}

// ============================================
// COLOR CONSTANTS
// ============================================

export const Color: ColorClass = {
  /** Aqua, or (0x00,0xFF,0xFF) in (R,G,B) */
  AQUA: org.bukkit.Color.AQUA,

  /** Black, or (0x00,0x00,0x00) in (R,G,B) */
  BLACK: org.bukkit.Color.BLACK,

  /** Blue, or (0x00,0x00,0xFF) in (R,G,B) */
  BLUE: org.bukkit.Color.BLUE,

  /** Fuchsia, or (0xFF,0x00,0xFF) in (R,G,B) */
  FUCHSIA: org.bukkit.Color.FUCHSIA,

  /** Gray, or (0x80,0x80,0x80) in (R,G,B) */
  GRAY: org.bukkit.Color.GRAY,

  /** Green, or (0x00,0x80,0x00) in (R,G,B) */
  GREEN: org.bukkit.Color.GREEN,

  /** Lime, or (0x00,0xFF,0x00) in (R,G,B) */
  LIME: org.bukkit.Color.LIME,

  /** Maroon, or (0x80,0x00,0x00) in (R,G,B) */
  MAROON: org.bukkit.Color.MAROON,

  /** Navy, or (0x00,0x00,0x80) in (R,G,B) */
  NAVY: org.bukkit.Color.NAVY,

  /** Olive, or (0x80,0x80,0x00) in (R,G,B) */
  OLIVE: org.bukkit.Color.OLIVE,

  /** Orange, or (0xFF,0xA5,0x00) in (R,G,B) */
  ORANGE: org.bukkit.Color.ORANGE,

  /** Purple, or (0x80,0x00,0x80) in (R,G,B) */
  PURPLE: org.bukkit.Color.PURPLE,

  /** Red, or (0xFF,0x00,0x00) in (R,G,B) */
  RED: org.bukkit.Color.RED,

  /** Silver, or (0xC0,0xC0,0xC0) in (R,G,B) */
  SILVER: org.bukkit.Color.SILVER,

  /** Teal, or (0x00,0x80,0x80) in (R,G,B) */
  TEAL: org.bukkit.Color.TEAL,

  /** White, or (0xFF,0xFF,0xFF) in (R,G,B) */
  WHITE: org.bukkit.Color.WHITE,

  /** Yellow, or (0xFF,0xFF,0x00) in (R,G,B) */
  YELLOW: org.bukkit.Color.YELLOW,

  // Static factory methods
  fromRGB(redOrRgb: number, green?: number, blue?: number): BukkitColor {
    if (green !== undefined && blue !== undefined) {
      return org.bukkit.Color.fromRGB(redOrRgb, green, blue);
    }
    return org.bukkit.Color.fromRGB(redOrRgb);
  },

  fromARGB(alphaOrArgb: number, red?: number, green?: number, blue?: number): BukkitColor {
    if (red !== undefined && green !== undefined && blue !== undefined) {
      return org.bukkit.Color.fromARGB(alphaOrArgb, red, green, blue);
    }
    return org.bukkit.Color.fromARGB(alphaOrArgb);
  },

  fromBGR(blueOrBgr: number, green?: number, red?: number): BukkitColor {
    if (green !== undefined && red !== undefined) {
      return org.bukkit.Color.fromBGR(blueOrBgr, green, red);
    }
    return org.bukkit.Color.fromBGR(blueOrBgr);
  },

  deserialize(map: Map<string, object>): BukkitColor {
    return org.bukkit.Color.deserialize(map);
  },
};