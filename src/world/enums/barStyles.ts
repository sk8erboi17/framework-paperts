/**
 * DESIGN
 * ------
 * BarStyle defines the segmentation style of boss bars.
 * 
 * BAR STYLES VISUALIZATION:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    BAR STYLES                               │
 *   │                                                             │
 *   │   SOLID:                                                    │
 *   │   ████████████████████████████████████████████████████████  │
 *   │                                                             │
 *   │   SEGMENTED_6:                                              │
 *   │   ████████│████████│████████│████████│████████│████████     │
 *   │                                                             │
 *   │   SEGMENTED_10:                                             │
 *   │   █████│█████│█████│█████│█████│█████│█████│█████│█████│█████│
 *   │                                                             │
 *   │   SEGMENTED_12:                                             │
 *   │   ████│████│████│████│████│████│████│████│████│████│████│████│
 *   │                                                             │
 *   │   SEGMENTED_20:                                             │
 *   │   ██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│██│
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * USAGE RECOMMENDATIONS:
 * - SOLID: Clean look, continuous progress
 * - SEGMENTED_6: Coarse phases (boss stages)
 * - SEGMENTED_10: Percentage-friendly (10% each)
 * - SEGMENTED_12: Hour-like divisions
 * - SEGMENTED_20: Fine granularity (5% each)
 * 
 * VANILLA USAGE:
 * - Wither: SOLID
 * - Ender Dragon: SOLID
 * - Custom bosses can use any style
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/boss/BarStyle.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, isEnumValue } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All valid BarStyle constant names.
 */
export type BarStyleName =
  | "SOLID"
  | "SEGMENTED_6"
  | "SEGMENTED_10"
  | "SEGMENTED_12"
  | "SEGMENTED_20";

/**
 * BarStyle enum instance.
 */
export interface BukkitBarStyle extends JavaEnum<BarStyleName> {}

/**
 * BarStyle enum class (static side).
 */
export interface BukkitBarStyleClass extends JavaEnumClass<BukkitBarStyle> {
  /** Solid bar with no segments */
  readonly SOLID: BukkitBarStyle;
  
  /** Bar split into 6 segments */
  readonly SEGMENTED_6: BukkitBarStyle;
  
  /** Bar split into 10 segments */
  readonly SEGMENTED_10: BukkitBarStyle;
  
  /** Bar split into 12 segments */
  readonly SEGMENTED_12: BukkitBarStyle;
  
  /** Bar split into 20 segments */
  readonly SEGMENTED_20: BukkitBarStyle;
}

/**
 * Access to BarStyle enum.
 */
export const BarStyle: BukkitBarStyleClass = org.bukkit.boss.BarStyle;

// ============================================
// CONSTANTS
// ============================================

/**
 * All bar styles in declaration order.
 */
export const BAR_STYLES: readonly BarStyleName[] = [
  "SOLID",
  "SEGMENTED_6",
  "SEGMENTED_10",
  "SEGMENTED_12",
  "SEGMENTED_20",
] as const;

/**
 * Default vanilla boss bar style.
 */
export const DEFAULT_STYLE: BarStyleName = "SOLID";

/**
 * Segment count for each style.
 * SOLID is represented as 0 segments.
 */
export const SEGMENT_COUNTS: Record<BarStyleName, number> = {
  SOLID: 0,
  SEGMENTED_6: 6,
  SEGMENTED_10: 10,
  SEGMENTED_12: 12,
  SEGMENTED_20: 20,
};

/**
 * Percentage per segment for each style.
 */
export const PERCENT_PER_SEGMENT: Record<BarStyleName, number> = {
  SOLID: 100,
  SEGMENTED_6: 100 / 6,      /* ~16.67% */
  SEGMENTED_10: 10,          /* 10% */
  SEGMENTED_12: 100 / 12,    /* ~8.33% */
  SEGMENTED_20: 5,           /* 5% */
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all BarStyle values.
 */
export function getBarStyles(): BukkitBarStyle[] {
  return enumValues(BarStyle);
}

/**
 * Get BarStyle by name.
 * 
 * @param name Style name
 * @returns BarStyle enum value
 * @throws IllegalArgumentException if name is invalid
 * 
 * @example
 * const solid = getBarStyle("SOLID");
 */
export function getBarStyle(name: BarStyleName): BukkitBarStyle {
  return enumValueOf(BarStyle, name);
}

/**
 * Safely get BarStyle by name.
 * 
 * @param name Style name (case-insensitive)
 * @returns BarStyle or null if invalid
 */
export function getBarStyleSafe(name: string): BukkitBarStyle | null {
  const upper = name.toUpperCase();
  if (isEnumValue(BarStyle, upper)) {
    return enumValueOf(BarStyle, upper);
  }
  return null;
}

/**
 * Check if a string is a valid BarStyle name.
 */
export function isBarStyleName(name: string): name is BarStyleName {
  return isEnumValue(BarStyle, name.toUpperCase());
}

// ============================================
// STYLE CHECKS
// ============================================

/**
 * Check if style is solid (no segments).
 */
export function isSolid(style: BukkitBarStyle): boolean {
  return style.name() === "SOLID";
}

/**
 * Check if style is segmented (any segment count).
 */
export function isSegmented(style: BukkitBarStyle): boolean {
  return style.name() !== "SOLID";
}

/**
 * Check if style has 6 segments.
 */
export function isSegmented6(style: BukkitBarStyle): boolean {
  return style.name() === "SEGMENTED_6";
}

/**
 * Check if style has 10 segments.
 */
export function isSegmented10(style: BukkitBarStyle): boolean {
  return style.name() === "SEGMENTED_10";
}

/**
 * Check if style has 12 segments.
 */
export function isSegmented12(style: BukkitBarStyle): boolean {
  return style.name() === "SEGMENTED_12";
}

/**
 * Check if style has 20 segments.
 */
export function isSegmented20(style: BukkitBarStyle): boolean {
  return style.name() === "SEGMENTED_20";
}

// ============================================
// SEGMENT UTILITIES
// ============================================

/**
 * Get number of segments for style.
 * 
 * @returns Segment count (0 for SOLID)
 */
export function getSegmentCount(style: BukkitBarStyle): number {
  return SEGMENT_COUNTS[style.name() as BarStyleName];
}

/**
 * Get percentage per segment.
 * 
 * @returns Percentage each segment represents
 */
export function getPercentPerSegment(style: BukkitBarStyle): number {
  return PERCENT_PER_SEGMENT[style.name() as BarStyleName];
}

/**
 * Calculate how many segments are filled at given progress.
 * 
 * @param style Bar style
 * @param progress Progress value (0.0 to 1.0)
 * @returns Number of filled segments
 * 
 * @example
 * // 50% progress on 10-segment bar = 5 segments filled
 * getFilledSegments(BarStyle.SEGMENTED_10, 0.5); // 5
 */
export function getFilledSegments(style: BukkitBarStyle, progress: number): number {
  const segments = getSegmentCount(style);
  
  if (segments === 0) {
    return 0; /* SOLID has no discrete segments */
  }
  
  const clamped = Math.max(0, Math.min(1, progress));
  return Math.floor(clamped * segments);
}

/**
 * Get progress value that fills exactly N segments.
 * 
 * @param style Bar style
 * @param filledSegments Number of segments to fill
 * @returns Progress value (0.0 to 1.0)
 */
export function getProgressForSegments(
  style: BukkitBarStyle,
  filledSegments: number
): number {
  const segments = getSegmentCount(style);
  
  if (segments === 0) {
    return filledSegments > 0 ? 1 : 0;
  }
  
  return Math.max(0, Math.min(1, filledSegments / segments));
}

// ============================================
// STYLE SELECTION
// ============================================

/**
 * Get style by segment count.
 * 
 * @param segments Desired segment count (0, 6, 10, 12, or 20)
 * @returns Matching style or null if no match
 */
export function getStyleBySegments(segments: number): BukkitBarStyle | null {
  switch (segments) {
    case 0:
      return BarStyle.SOLID;
    case 6:
      return BarStyle.SEGMENTED_6;
    case 10:
      return BarStyle.SEGMENTED_10;
    case 12:
      return BarStyle.SEGMENTED_12;
    case 20:
      return BarStyle.SEGMENTED_20;
    default:
      return null;
  }
}

/**
 * Get style that best fits a number of phases/stages.
 * 
 * @param phases Number of phases to display
 * @returns Best matching style
 * 
 * @example
 * // Boss with 5 phases -> SEGMENTED_10 (2 segments per phase)
 * getStyleForPhases(5); // SEGMENTED_10
 */
export function getStyleForPhases(phases: number): BukkitBarStyle {
  if (phases <= 1) {
    return BarStyle.SOLID;
  }
  
  /* Find style where segment count is divisible by phases */
  if (phases <= 6 && 6 % phases === 0) {
    return BarStyle.SEGMENTED_6;
  }
  if (phases <= 10 && 10 % phases === 0) {
    return BarStyle.SEGMENTED_10;
  }
  if (phases <= 12 && 12 % phases === 0) {
    return BarStyle.SEGMENTED_12;
  }
  if (phases <= 20 && 20 % phases === 0) {
    return BarStyle.SEGMENTED_20;
  }
  
  /* Default to style with most segments */
  return BarStyle.SEGMENTED_20;
}

/**
 * Get segmented styles only (excludes SOLID).
 */
export function getSegmentedStyles(): BukkitBarStyle[] {
  return getBarStyles().filter(s => isSegmented(s));
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Get display name for bar style.
 */
export function getStyleDisplayName(style: BukkitBarStyle): string {
  const name = style.name();
  
  if (name === "SOLID") {
    return "Solid";
  }
  
  /* SEGMENTED_10 -> "10 Segments" */
  const segments = getSegmentCount(style);
  return `${segments} Segments`;
}

/**
 * Get description for bar style.
 */
export function describeStyle(style: BukkitBarStyle): string {
  const name = style.name();
  
  if (name === "SOLID") {
    return "Solid bar with no segments";
  }
  
  const segments = getSegmentCount(style);
  const percent = getPercentPerSegment(style).toFixed(1);
  return `${segments} segments (${percent}% each)`;
}