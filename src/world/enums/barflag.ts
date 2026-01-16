/**
 * DESIGN
 * ------
 * BarFlag defines special visual effects for boss bars.
 * 
 * BAR FLAGS EFFECTS:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    BAR FLAGS                                │
 *   │                                                             │
 *   │   DARKEN_SKY:                                               │
 *   │   ┌─────────────────────────────────────────┐               │
 *   │   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │               │
 *   │   │  ░░░░░ Sky becomes darker ░░░░░░░░░░░░ │               │
 *   │   │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │               │
 *   │   └─────────────────────────────────────────┘               │
 *   │   Used by: Wither boss fight                                │
 *   │                                                             │
 *   │   PLAY_BOSS_MUSIC:                                          │
 *   │   ♪ ♫ ♪ ♫  Ender Dragon music plays  ♪ ♫ ♪ ♫               │
 *   │   Used by: Ender Dragon fight                               │
 *   │                                                             │
 *   │   CREATE_FOG:                                               │
 *   │   ┌─────────────────────────────────────────┐               │
 *   │   │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │               │
 *   │   │  ▓▓▓▓▓ Fog reduces visibility ▓▓▓▓▓▓▓▓ │               │
 *   │   │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │               │
 *   │   └─────────────────────────────────────────┘               │
 *   │   Used by: Custom atmospheric effects                       │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * FLAGS ARE ADDITIVE:
 * Multiple flags can be combined for dramatic effect.
 * Wither-like fight: DARKEN_SKY
 * Ender Dragon-like: PLAY_BOSS_MUSIC
 * Ultimate boss: All three flags!
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/boss/BarFlag.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, isEnumValue } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All valid BarFlag constant names.
 */
export type BarFlagName =
  | "DARKEN_SKY"
  | "PLAY_BOSS_MUSIC"
  | "CREATE_FOG";

/**
 * BarFlag enum instance.
 */
export interface BukkitBarFlag extends JavaEnum<BarFlagName> {}

/**
 * BarFlag enum class (static side).
 */
export interface BukkitBarFlagClass extends JavaEnumClass<BukkitBarFlag> {
  /** Darkens the sky like during Wither fight */
  readonly DARKEN_SKY: BukkitBarFlag;
  
  /** Plays Ender Dragon boss music */
  readonly PLAY_BOSS_MUSIC: BukkitBarFlag;
  
  /** Creates fog around the world */
  readonly CREATE_FOG: BukkitBarFlag;
}

/**
 * Access to BarFlag enum.
 */
export const BarFlag: BukkitBarFlagClass = org.bukkit.boss.BarFlag;

// ============================================
// CONSTANTS
// ============================================

/**
 * All bar flags in declaration order.
 */
export const BAR_FLAGS: readonly BarFlagName[] = [
  "DARKEN_SKY",
  "PLAY_BOSS_MUSIC",
  "CREATE_FOG",
] as const;

/**
 * Flags used by Wither boss.
 */
export const WITHER_FLAGS: readonly BarFlagName[] = ["DARKEN_SKY"];

/**
 * Flags used by Ender Dragon boss.
 */
export const ENDER_DRAGON_FLAGS: readonly BarFlagName[] = ["PLAY_BOSS_MUSIC"];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all BarFlag values.
 */
export function getBarFlags(): BukkitBarFlag[] {
  return enumValues(BarFlag);
}

/**
 * Get BarFlag by name.
 * 
 * @param name Flag name
 * @returns BarFlag enum value
 * @throws IllegalArgumentException if name is invalid
 * 
 * @example
 * const darken = getBarFlag("DARKEN_SKY");
 */
export function getBarFlag(name: BarFlagName): BukkitBarFlag {
  return enumValueOf(BarFlag, name);
}

/**
 * Safely get BarFlag by name.
 * 
 * @param name Flag name (case-insensitive)
 * @returns BarFlag or null if invalid
 */
export function getBarFlagSafe(name: string): BukkitBarFlag | null {
  const upper = name.toUpperCase();
  if (isEnumValue(BarFlag, upper)) {
    return enumValueOf(BarFlag, upper);
  }
  return null;
}

/**
 * Check if a string is a valid BarFlag name.
 */
export function isBarFlagName(name: string): name is BarFlagName {
  return isEnumValue(BarFlag, name.toUpperCase());
}

// ============================================
// FLAG CHECKS
// ============================================

/**
 * Check if flag darkens the sky.
 */
export function isDarkenSky(flag: BukkitBarFlag): boolean {
  return flag.name() === "DARKEN_SKY";
}

/**
 * Check if flag plays boss music.
 */
export function isPlayBossMusic(flag: BukkitBarFlag): boolean {
  return flag.name() === "PLAY_BOSS_MUSIC";
}

/**
 * Check if flag creates fog.
 */
export function isCreateFog(flag: BukkitBarFlag): boolean {
  return flag.name() === "CREATE_FOG";
}

// ============================================
// FLAG EFFECTS INFO
// ============================================

/**
 * Flag effect descriptions.
 */
export const FLAG_DESCRIPTIONS: Record<BarFlagName, string> = {
  DARKEN_SKY: "Darkens the sky like during a Wither fight",
  PLAY_BOSS_MUSIC: "Plays the Ender Dragon boss music",
  CREATE_FOG: "Creates fog that reduces visibility",
};

/**
 * Get description for flag effect.
 */
export function getFlagDescription(flag: BukkitBarFlag): string {
  return FLAG_DESCRIPTIONS[flag.name() as BarFlagName];
}

/**
 * Get display name for flag.
 */
export function getFlagDisplayName(flag: BukkitBarFlag): string {
  switch (flag.name()) {
    case "DARKEN_SKY":
      return "Darken Sky";
    case "PLAY_BOSS_MUSIC":
      return "Boss Music";
    case "CREATE_FOG":
      return "Create Fog";
    default:
      return flag.name();
  }
}

// ============================================
// FLAG CATEGORIES
// ============================================

/**
 * Visual effect flags (affect rendering).
 */
export const VISUAL_FLAGS: readonly BarFlagName[] = ["DARKEN_SKY", "CREATE_FOG"];

/**
 * Audio effect flags.
 */
export const AUDIO_FLAGS: readonly BarFlagName[] = ["PLAY_BOSS_MUSIC"];

/**
 * Check if flag is a visual effect.
 */
export function isVisualFlag(flag: BukkitBarFlag): boolean {
  return VISUAL_FLAGS.includes(flag.name() as BarFlagName);
}

/**
 * Check if flag is an audio effect.
 */
export function isAudioFlag(flag: BukkitBarFlag): boolean {
  return AUDIO_FLAGS.includes(flag.name() as BarFlagName);
}

/**
 * Get visual effect flags.
 */
export function getVisualFlags(): BukkitBarFlag[] {
  return VISUAL_FLAGS.map(name => getBarFlag(name));
}

/**
 * Get audio effect flags.
 */
export function getAudioFlags(): BukkitBarFlag[] {
  return AUDIO_FLAGS.map(name => getBarFlag(name));
}

// ============================================
// FLAG PRESETS
// ============================================

/**
 * Get flags for Wither-like boss fight.
 */
export function getWitherFlags(): BukkitBarFlag[] {
  return WITHER_FLAGS.map(name => getBarFlag(name));
}

/**
 * Get flags for Ender Dragon-like boss fight.
 */
export function getEnderDragonFlags(): BukkitBarFlag[] {
  return ENDER_DRAGON_FLAGS.map(name => getBarFlag(name));
}

/**
 * Get all flags for maximum dramatic effect.
 */
export function getAllFlags(): BukkitBarFlag[] {
  return getBarFlags();
}

/**
 * Get no flags (clean boss bar).
 */
export function getNoFlags(): BukkitBarFlag[] {
  return [];
}

// ============================================
// FLAG SET UTILITIES
// ============================================

/**
 * Create flag set from names.
 * 
 * @param names Flag names to include
 * @returns Array of flags
 * 
 * @example
 * const flags = createFlagSet("DARKEN_SKY", "CREATE_FOG");
 */
export function createFlagSet(...names: BarFlagName[]): BukkitBarFlag[] {
  return names.map(name => getBarFlag(name));
}

/**
 * Check if flag array contains specific flag.
 */
export function hasFlag(flags: BukkitBarFlag[], flag: BukkitBarFlag): boolean {
  return flags.some(f => f.name() === flag.name());
}

/**
 * Check if flag array contains flag by name.
 */
export function hasFlagNamed(flags: BukkitBarFlag[], name: BarFlagName): boolean {
  return flags.some(f => f.name() === name);
}

/**
 * Add flag to array if not present.
 * 
 * @returns New array with flag added
 */
export function addFlag(flags: BukkitBarFlag[], flag: BukkitBarFlag): BukkitBarFlag[] {
  if (hasFlag(flags, flag)) {
    return flags;
  }
  return [...flags, flag];
}

/**
 * Remove flag from array.
 * 
 * @returns New array without flag
 */
export function removeFlag(flags: BukkitBarFlag[], flag: BukkitBarFlag): BukkitBarFlag[] {
  return flags.filter(f => f.name() !== flag.name());
}

/**
 * Toggle flag in array.
 * 
 * @returns New array with flag added or removed
 */
export function toggleFlag(flags: BukkitBarFlag[], flag: BukkitBarFlag): BukkitBarFlag[] {
  if (hasFlag(flags, flag)) {
    return removeFlag(flags, flag);
  }
  return addFlag(flags, flag);
}

/**
 * Get flag names from flag array.
 */
export function getFlagNames(flags: BukkitBarFlag[]): BarFlagName[] {
  return flags.map(f => f.name() as BarFlagName);
}

/**
 * Describe flag set.
 */
export function describeFlagSet(flags: BukkitBarFlag[]): string {
  if (flags.length === 0) {
    return "No special effects";
  }
  
  return flags.map(f => getFlagDisplayName(f)).join(", ");
}