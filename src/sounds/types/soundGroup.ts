/**
 * DESIGN
 * ------
 * SoundCategory represents the audio categories in Minecraft's sound system.
 * 
 * Players can adjust volume for each category independently in:
 * Options → Music & Sounds
 * 
 * SOUND SYSTEM ARCHITECTURE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                      MASTER                                 │
 *   │                        │                                    │
 *   │    Controls ALL sound volume (multiplier for everything)    │
 *   │                        │                                    │
 *   │    ┌───────────────────┼───────────────────┐                │
 *   │    │                   │                   │                │
 *   │    ▼                   ▼                   ▼                │
 *   │  MUSIC              BLOCKS             HOSTILE              │
 *   │  RECORDS            WEATHER            NEUTRAL              │
 *   │  AMBIENT            PLAYERS            VOICE                │
 *   │                        UI                                   │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * CATEGORY DESCRIPTIONS:
 * 
 *   MASTER    │ Master volume - affects ALL sounds
 *   ──────────┼─────────────────────────────────────────
 *   MUSIC     │ Background music (C418, Lena Raine)
 *   RECORDS   │ Jukebox music discs
 *   ──────────┼─────────────────────────────────────────
 *   WEATHER   │ Rain, thunder, wind
 *   AMBIENT   │ Cave sounds, underwater ambience
 *   ──────────┼─────────────────────────────────────────
 *   BLOCKS    │ Breaking, placing, walking on blocks
 *   ──────────┼─────────────────────────────────────────
 *   HOSTILE   │ Zombie groans, skeleton rattles, etc.
 *   NEUTRAL   │ Cow moos, pig oinks, villager hmms
 *   ──────────┼─────────────────────────────────────────
 *   PLAYERS   │ Player hurt, eating, item pickup
 *   VOICE     │ Voice chat (if enabled)
 *   UI        │ Button clicks, inventory sounds
 * 
 * USAGE:
 * 
 *   // Play sound in specific category
 *   player.playSound(location, Sound.ENTITY_EXPERIENCE_ORB_PICKUP, 
 *                    SoundCategory.PLAYERS, 1.0f, 1.0f);
 *   
 *   // Players with PLAYERS volume at 0% won't hear it
 *   // Players with PLAYERS volume at 50% hear it at half volume
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/SoundCategory.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, enumNames, enumFromOrdinal, isEnumValue } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All sound category constant names.
 */
export type SoundCategoryKey =
  | "MASTER"
  | "MUSIC"
  | "RECORDS"
  | "WEATHER"
  | "BLOCKS"
  | "HOSTILE"
  | "NEUTRAL"
  | "PLAYERS"
  | "AMBIENT"
  | "VOICE"
  | "UI";

/**
 * Sound category interface.
 * 
 * Extends JavaEnum for full Java enum compatibility.
 */
export interface BukkitSoundCategory extends JavaEnum<SoundCategoryKey> {}

/**
 * SoundCategory enum class type (constants + static methods).
 */
export type SoundCategoryClass = Record<SoundCategoryKey, BukkitSoundCategory> & JavaEnumClass<BukkitSoundCategory>;

// ============================================
// ENUM EXPORT
// ============================================

/**
 * Sound categories for Minecraft's audio system.
 * 
 * MASTER: Master volume control - multiplier for all other categories.
 *   Setting this to 0 mutes everything.
 * 
 * MUSIC: Background game music.
 *   Composers: C418 (original), Lena Raine (Nether, Caves & Cliffs).
 * 
 * RECORDS: Jukebox music discs.
 *   "13", "cat", "blocks", "chirp", "far", "mall", "mellohi", etc.
 * 
 * WEATHER: Weather-related sounds.
 *   Rain falling, thunder, wind in certain biomes.
 * 
 * BLOCKS: Block interaction sounds.
 *   Breaking, placing, walking on, falling on blocks.
 * 
 * HOSTILE: Hostile mob sounds.
 *   Zombies, skeletons, creepers, spiders, etc.
 * 
 * NEUTRAL: Friendly/neutral mob sounds.
 *   Cows, pigs, sheep, villagers, wolves, etc.
 * 
 * PLAYERS: Player-related sounds.
 *   Hurt sounds, eating, drinking, item pickup, level up.
 * 
 * AMBIENT: Environmental ambient sounds.
 *   Cave ambience, underwater sounds, minecart riding.
 * 
 * VOICE: Voice chat (when enabled).
 *   Used by voice chat mods/features.
 * 
 * UI: User interface sounds.
 *   Button clicks, inventory open/close, book page turn.
 * 
 * @example
 * // Play sound to player in specific category
 * player.playSound(
 *   player.getLocation(),
 *   Sound.ENTITY_PLAYER_LEVELUP,
 *   SoundCategory.PLAYERS,
 *   1.0,  // volume
 *   1.0   // pitch
 * );
 * 
 * @example
 * // Play custom sound in MASTER category (always audible)
 * world.playSound(location, "custom:alert", SoundCategory.MASTER, 1.0, 1.0);
 */
export const SoundCategory: SoundCategoryClass = org.bukkit.SoundCategory;

// ============================================
// ENUM UTILITIES
// ============================================

/**
 * Get all sound category values.
 */
export function getSoundCategoryValues(): BukkitSoundCategory[] {
  return enumValues(SoundCategory);
}

/**
 * Get sound category by exact name.
 * 
 * @throws IllegalArgumentException if name doesn't match
 */
export function getSoundCategoryByName(name: string): BukkitSoundCategory {
  return enumValueOf(SoundCategory, name);
}

/**
 * Get sound category by name (safe version).
 * 
 * @returns SoundCategory or null if not found
 */
export function getSoundCategorySafe(name: string): BukkitSoundCategory | null {
  const upper = name.toUpperCase();
  return isEnumValue(SoundCategory, upper) ? enumValueOf(SoundCategory, upper) : null;
}

/**
 * Get all sound category names.
 */
export function getSoundCategoryNames(): SoundCategoryKey[] {
  return enumNames(SoundCategory) as SoundCategoryKey[];
}

/**
 * Get sound category by ordinal.
 */
export function getSoundCategoryByOrdinal(ordinal: number): BukkitSoundCategory | null {
  return enumFromOrdinal(SoundCategory, ordinal);
}

/**
 * Check if string is valid sound category name.
 */
export function isValidSoundCategory(name: string): name is SoundCategoryKey {
  return isEnumValue(SoundCategory, name.toUpperCase());
}

// ============================================
// CATEGORY CHECKS
// ============================================

/**
 * Check if category is MASTER.
 */
export function isMaster(category: BukkitSoundCategory): boolean {
  return category.name() === "MASTER";
}

/**
 * Check if category is MUSIC.
 */
export function isMusic(category: BukkitSoundCategory): boolean {
  return category.name() === "MUSIC";
}

/**
 * Check if category is RECORDS.
 */
export function isRecords(category: BukkitSoundCategory): boolean {
  return category.name() === "RECORDS";
}

/**
 * Check if category is WEATHER.
 */
export function isWeather(category: BukkitSoundCategory): boolean {
  return category.name() === "WEATHER";
}

/**
 * Check if category is BLOCKS.
 */
export function isBlocks(category: BukkitSoundCategory): boolean {
  return category.name() === "BLOCKS";
}

/**
 * Check if category is HOSTILE.
 */
export function isHostile(category: BukkitSoundCategory): boolean {
  return category.name() === "HOSTILE";
}

/**
 * Check if category is NEUTRAL.
 */
export function isNeutral(category: BukkitSoundCategory): boolean {
  return category.name() === "NEUTRAL";
}

/**
 * Check if category is PLAYERS.
 */
export function isPlayers(category: BukkitSoundCategory): boolean {
  return category.name() === "PLAYERS";
}

/**
 * Check if category is AMBIENT.
 */
export function isAmbient(category: BukkitSoundCategory): boolean {
  return category.name() === "AMBIENT";
}

/**
 * Check if category is VOICE.
 */
export function isVoice(category: BukkitSoundCategory): boolean {
  return category.name() === "VOICE";
}

/**
 * Check if category is UI.
 */
export function isUi(category: BukkitSoundCategory): boolean {
  return category.name() === "UI";
}

// ============================================
// GROUPINGS
// ============================================

/**
 * Music-related categories.
 */
export const MUSIC_CATEGORIES: Set<SoundCategoryKey> = new Set([
  "MUSIC",
  "RECORDS",
]);

/**
 * Entity-related categories (mobs and players).
 */
export const ENTITY_CATEGORIES: Set<SoundCategoryKey> = new Set([
  "HOSTILE",
  "NEUTRAL",
  "PLAYERS",
]);

/**
 * Environment-related categories.
 */
export const ENVIRONMENT_CATEGORIES: Set<SoundCategoryKey> = new Set([
  "WEATHER",
  "AMBIENT",
  "BLOCKS",
]);

/**
 * Interface-related categories.
 */
export const INTERFACE_CATEGORIES: Set<SoundCategoryKey> = new Set([
  "UI",
  "VOICE",
]);

/**
 * Mob-related categories (hostile + neutral).
 */
export const MOB_CATEGORIES: Set<SoundCategoryKey> = new Set([
  "HOSTILE",
  "NEUTRAL",
]);

// ============================================
// GROUPING CHECKS
// ============================================

/**
 * Check if category is music-related.
 */
export function isMusicCategory(category: BukkitSoundCategory): boolean {
  return MUSIC_CATEGORIES.has(category.name() as SoundCategoryKey);
}

/**
 * Check if category is entity-related.
 */
export function isEntityCategory(category: BukkitSoundCategory): boolean {
  return ENTITY_CATEGORIES.has(category.name() as SoundCategoryKey);
}

/**
 * Check if category is environment-related.
 */
export function isEnvironmentCategory(category: BukkitSoundCategory): boolean {
  return ENVIRONMENT_CATEGORIES.has(category.name() as SoundCategoryKey);
}

/**
 * Check if category is interface-related.
 */
export function isInterfaceCategory(category: BukkitSoundCategory): boolean {
  return INTERFACE_CATEGORIES.has(category.name() as SoundCategoryKey);
}

/**
 * Check if category is mob-related.
 */
export function isMobCategory(category: BukkitSoundCategory): boolean {
  return MOB_CATEGORIES.has(category.name() as SoundCategoryKey);
}

/**
 * Get category group.
 */
export function getCategoryGroup(category: BukkitSoundCategory):
  "master" | "music" | "entity" | "environment" | "interface" {
  
  const name = category.name() as SoundCategoryKey;
  
  if (name === "MASTER") return "master";
  if (MUSIC_CATEGORIES.has(name)) return "music";
  if (ENTITY_CATEGORIES.has(name)) return "entity";
  if (ENVIRONMENT_CATEGORIES.has(name)) return "environment";
  if (INTERFACE_CATEGORIES.has(name)) return "interface";
  
  return "master"; /* Fallback */
}

// ============================================
// RECOMMENDATIONS
// ============================================

/**
 * Get recommended category for a sound type.
 * 
 * @param soundType Description of the sound
 * @returns Recommended SoundCategory
 * 
 * @example
 * getRecommendedCategory("player_hurt"); // PLAYERS
 * getRecommendedCategory("zombie_growl"); // HOSTILE
 */
export function getRecommendedCategory(soundType: string): BukkitSoundCategory {
  const lower = soundType.toLowerCase();
  
  /* Player sounds */
  if (lower.includes("player") || lower.includes("eat") || lower.includes("drink") ||
      lower.includes("hurt") || lower.includes("death") || lower.includes("levelup") ||
      lower.includes("experience") || lower.includes("pickup")) {
    return SoundCategory.PLAYERS;
  }
  
  /* Hostile mob sounds */
  if (lower.includes("zombie") || lower.includes("skeleton") || lower.includes("creeper") ||
      lower.includes("spider") || lower.includes("witch") || lower.includes("hostile") ||
      lower.includes("warden") || lower.includes("phantom") || lower.includes("blaze") ||
      lower.includes("ghast") || lower.includes("enderman")) {
    return SoundCategory.HOSTILE;
  }
  
  /* Neutral mob sounds */
  if (lower.includes("cow") || lower.includes("pig") || lower.includes("sheep") ||
      lower.includes("chicken") || lower.includes("villager") || lower.includes("wolf") ||
      lower.includes("cat") || lower.includes("horse") || lower.includes("neutral")) {
    return SoundCategory.NEUTRAL;
  }
  
  /* Block sounds */
  if (lower.includes("block") || lower.includes("break") || lower.includes("place") ||
      lower.includes("step") || lower.includes("dig") || lower.includes("door") ||
      lower.includes("chest") || lower.includes("anvil")) {
    return SoundCategory.BLOCKS;
  }
  
  /* Weather sounds */
  if (lower.includes("rain") || lower.includes("thunder") || lower.includes("lightning") ||
      lower.includes("weather") || lower.includes("wind")) {
    return SoundCategory.WEATHER;
  }
  
  /* Ambient sounds */
  if (lower.includes("ambient") || lower.includes("cave") || lower.includes("underwater") ||
      lower.includes("environment")) {
    return SoundCategory.AMBIENT;
  }
  
  /* Music */
  if (lower.includes("music") || lower.includes("song")) {
    return SoundCategory.MUSIC;
  }
  
  /* Records */
  if (lower.includes("record") || lower.includes("disc") || lower.includes("jukebox")) {
    return SoundCategory.RECORDS;
  }
  
  /* UI sounds */
  if (lower.includes("ui") || lower.includes("click") || lower.includes("button") ||
      lower.includes("menu") || lower.includes("inventory") || lower.includes("book")) {
    return SoundCategory.UI;
  }
  
  /* Voice */
  if (lower.includes("voice") || lower.includes("chat") || lower.includes("speak")) {
    return SoundCategory.VOICE;
  }
  
  /* Default to MASTER for unknown */
  return SoundCategory.MASTER;
}

/**
 * Get default volume recommendation for category.
 * 
 * These are typical defaults, not enforced values.
 */
export function getDefaultVolume(category: BukkitSoundCategory): number {
  switch (category.name()) {
    case "MASTER":
      return 1.0;
    case "MUSIC":
      return 0.5; /* Music is often quieter by default */
    case "UI":
      return 1.0;
    default:
      return 1.0;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get human-readable category name.
 */
export function formatCategoryName(category: BukkitSoundCategory): string {
  const name = category.name();
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/**
 * Get category description.
 */
export function describeSoundCategory(category: BukkitSoundCategory): string {
  switch (category.name()) {
    case "MASTER":
      return "Master volume - controls all sounds";
    case "MUSIC":
      return "Background game music";
    case "RECORDS":
      return "Jukebox music discs";
    case "WEATHER":
      return "Rain, thunder, and wind";
    case "BLOCKS":
      return "Block breaking, placing, and footsteps";
    case "HOSTILE":
      return "Hostile mob sounds";
    case "NEUTRAL":
      return "Friendly and neutral mob sounds";
    case "PLAYERS":
      return "Player-related sounds";
    case "AMBIENT":
      return "Environmental ambience";
    case "VOICE":
      return "Voice chat";
    case "UI":
      return "User interface sounds";
    default:
      return "Unknown category";
  }
}

/**
 * Compare two sound categories using Java's compareTo.
 */
export function compareSoundCategories(a: BukkitSoundCategory, b: BukkitSoundCategory): number {
  return a.compareTo(b);
}

/**
 * Check if two sound categories are the same.
 */
export function sameSoundCategory(a: BukkitSoundCategory, b: BukkitSoundCategory): boolean {
  return a.name() === b.name();
}

/**
 * Get all categories except MASTER.
 * 
 * Useful when you want to list adjustable categories.
 */
export function getAdjustableCategories(): BukkitSoundCategory[] {
  return getSoundCategoryValues().filter(c => c.name() !== "MASTER");
}

/**
 * Get categories by group.
 */
export function getCategoriesByGroup(group: "master" | "music" | "entity" | "environment" | "interface"): BukkitSoundCategory[] {
  return getSoundCategoryValues().filter(c => getCategoryGroup(c) === group);
}