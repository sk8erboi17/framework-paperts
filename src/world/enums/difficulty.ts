/**
 * DESIGN
 * ------
 * Difficulty represents the game difficulty levels in Minecraft.
 * 
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All valid Difficulty constant names.
 */
export type DifficultyKey = "PEACEFUL" | "EASY" | "NORMAL" | "HARD";

/**
 * Difficulty enum instance.
 */
export interface BukkitDifficulty extends JavaEnum<DifficultyKey> {
  /**
   * Get the numeric value of this difficulty.
   * 
   * @returns Difficulty value (0-3)
   * @deprecated Magic value
   */
  getValue(): number;
}

/**
 * Difficulty enum class (static side).
 */
export interface BukkitDifficultyClass extends JavaEnumClass<BukkitDifficulty> {
  readonly PEACEFUL: BukkitDifficulty;
  readonly EASY: BukkitDifficulty;
  readonly NORMAL: BukkitDifficulty;
  readonly HARD: BukkitDifficulty;

  /**
   * Get Difficulty by numeric value.
   * @deprecated Magic value
   */
  getByValue(value: number): BukkitDifficulty | null;
}

// ============================================
// JAVA CLASS NAME
// ============================================

const DIFFICULTY_CLASS = "org.bukkit.Difficulty";

// ============================================
// CONSTANTS
// ============================================

/**
 * Difficulty values in order.
 */
export const DIFFICULTY_VALUES: readonly DifficultyKey[] = [
  "PEACEFUL",
  "EASY",
  "NORMAL",
  "HARD"
] as const;

/**
 * Default difficulty (EASY in vanilla Minecraft).
 */
export const DEFAULT_DIFFICULTY: DifficultyKey = "EASY";

/**
 * Numeric value mapping.
 */
export const DIFFICULTY_VALUE_MAP: Record<DifficultyKey, number> = {
  PEACEFUL: 0,
  EASY: 1,
  NORMAL: 2,
  HARD: 3,
};

// ============================================
// ENUM ACCESS FUNCTIONS
// ============================================

/**
 * Get all Difficulty values.
 */
export function getDifficulties(): BukkitDifficulty[] {
  return Java.enumValues<BukkitDifficulty>(DIFFICULTY_CLASS);
}

/**
 * Get Difficulty by name.
 * 
 * @throws Error if name is invalid
 */
export function getDifficulty(name: DifficultyKey): BukkitDifficulty {
  return Java.enumValue<BukkitDifficulty>(DIFFICULTY_CLASS, name);
}

/**
 * Safely get Difficulty by name.
 * 
 * @param name Difficulty name (case-insensitive)
 * @returns Difficulty or null if invalid
 */
export function getDifficultySafe(name: string): BukkitDifficulty | null {
  try {
    return Java.enumValue<BukkitDifficulty>(DIFFICULTY_CLASS, name.toUpperCase());
  } catch {
    return null;
  }
}

/**
 * Get Difficulty by numeric value.
 * 
 * @param value Difficulty value (0-3)
 * @returns Difficulty or null if invalid
 */
export function getDifficultyByValue(value: number): BukkitDifficulty | null {
  const valueMap: Record<number, DifficultyKey> = {
    0: "PEACEFUL",
    1: "EASY",
    2: "NORMAL",
    3: "HARD",
  };

  const name = valueMap[value];
  if (!name) return null;

  try {
    return getDifficulty(name);
  } catch {
    return null;
  }
}

/**
 * Check if a string is a valid Difficulty name.
 */
export function isDifficultyKey(name: string): name is DifficultyKey {
  return DIFFICULTY_VALUES.includes(name.toUpperCase() as DifficultyKey);
}

// ============================================
// COMPARISON UTILITIES
// ============================================

/**
 * Check if difficulty is peaceful.
 */
export function isPeaceful(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() === "PEACEFUL";
}

/**
 * Check if difficulty is easy.
 */
export function isEasy(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() === "EASY";
}

/**
 * Check if difficulty is normal.
 */
export function isNormal(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() === "NORMAL";
}

/**
 * Check if difficulty is hard.
 */
export function isHard(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() === "HARD";
}

/**
 * Check if hostile mobs can spawn at this difficulty.
 */
export function canMobsSpawn(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() !== "PEACEFUL";
}

/**
 * Check if hunger depletes at this difficulty.
 */
export function doesHungerDeplete(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() !== "PEACEFUL";
}

/**
 * Check if starvation can kill at this difficulty.
 */
export function canStarvationKill(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() === "HARD";
}

/**
 * Check if zombies can break doors at this difficulty.
 */
export function canZombiesBreakDoors(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() === "HARD";
}

/**
 * Check if player has passive health regeneration.
 */
export function hasPassiveRegen(difficulty: BukkitDifficulty): boolean {
  return difficulty.name() === "PEACEFUL";
}

// ============================================
// DIFFICULTY ORDERING
// ============================================

/**
 * Compare two difficulties.
 * 
 * @returns Negative if a < b, positive if a > b, 0 if equal
 */
export function compareDifficulty(
  a: BukkitDifficulty,
  b: BukkitDifficulty
): number {
  return a.getValue() - b.getValue();
}

/**
 * Check if difficulty a is harder than b.
 */
export function isHarderThan(
  a: BukkitDifficulty,
  b: BukkitDifficulty
): boolean {
  return a.getValue() > b.getValue();
}

/**
 * Check if difficulty a is easier than b.
 */
export function isEasierThan(
  a: BukkitDifficulty,
  b: BukkitDifficulty
): boolean {
  return a.getValue() < b.getValue();
}

/**
 * Check if difficulty is at least the specified level.
 */
export function isAtLeast(
  difficulty: BukkitDifficulty,
  minimum: BukkitDifficulty
): boolean {
  return difficulty.getValue() >= minimum.getValue();
}

/**
 * Check if difficulty is at most the specified level.
 */
export function isAtMost(
  difficulty: BukkitDifficulty,
  maximum: BukkitDifficulty
): boolean {
  return difficulty.getValue() <= maximum.getValue();
}

/**
 * Get the next harder difficulty.
 * 
 * @returns Next difficulty or null if already HARD
 */
export function getHarder(difficulty: BukkitDifficulty): BukkitDifficulty | null {
  const value = difficulty.getValue();
  if (value >= 3) return null;
  return getDifficultyByValue(value + 1);
}

/**
 * Get the next easier difficulty.
 * 
 * @returns Next difficulty or null if already PEACEFUL
 */
export function getEasier(difficulty: BukkitDifficulty): BukkitDifficulty | null {
  const value = difficulty.getValue();
  if (value <= 0) return null;
  return getDifficultyByValue(value - 1);
}

// ============================================
// STARVATION INFO
// ============================================

/**
 * Starvation damage limits by difficulty.
 */
export const STARVATION_LIMITS: Record<DifficultyKey, number> = {
  PEACEFUL: -1,
  EASY: 10,
  NORMAL: 1,
  HARD: 0,
};

/**
 * Get minimum health from starvation.
 */
export function getStarvationLimit(difficulty: BukkitDifficulty): number {
  return STARVATION_LIMITS[difficulty.name() as DifficultyKey];
}

/**
 * Get starvation damage description.
 */
export function getStarvationDescription(difficulty: BukkitDifficulty): string {
  switch (difficulty.name()) {
    case "PEACEFUL":
      return "No starvation";
    case "EASY":
      return "Starvation stops at 5 hearts";
    case "NORMAL":
      return "Starvation stops at 0.5 hearts";
    case "HARD":
      return "Starvation can kill";
    default:
      return "Unknown";
  }
}

// ============================================
// MOB DAMAGE MULTIPLIERS
// ============================================

/**
 * Approximate mob damage multipliers by difficulty.
 */
export const MOB_DAMAGE_MULTIPLIERS: Record<DifficultyKey, number> = {
  PEACEFUL: 0,
  EASY: 0.5,
  NORMAL: 1.0,
  HARD: 1.5,
};

/**
 * Get mob damage multiplier for difficulty.
 */
export function getMobDamageMultiplier(difficulty: BukkitDifficulty): number {
  return MOB_DAMAGE_MULTIPLIERS[difficulty.name() as DifficultyKey];
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Get human-readable difficulty description.
 */
export function describeDifficulty(difficulty: BukkitDifficulty): string {
  switch (difficulty.name()) {
    case "PEACEFUL":
      return "Peaceful - No hostile mobs, passive health regen, no hunger";
    case "EASY":
      return "Easy - Hostile mobs deal less damage, starvation caps at 5 hearts";
    case "NORMAL":
      return "Normal - Standard difficulty, starvation caps at 0.5 hearts";
    case "HARD":
      return "Hard - Increased damage, starvation kills, extra mob abilities";
    default:
      return difficulty.name();
  }
}

/**
 * Get short difficulty name for display.
 */
export function getDifficultyDisplayName(difficulty: BukkitDifficulty): string {
  const name = difficulty.name();
  return name.charAt(0) + name.slice(1).toLowerCase();
}

/**
 * Get difficulty summary as object.
 */
export function getDifficultyInfo(difficulty: BukkitDifficulty): {
  name: DifficultyKey;
  value: number;
  mobsSpawn: boolean;
  hungerDepletes: boolean;
  starvationKills: boolean;
  passiveRegen: boolean;
  damageMultiplier: number;
} {
  const name = difficulty.name() as DifficultyKey;

  return {
    name,
    value: difficulty.getValue(),
    mobsSpawn: canMobsSpawn(difficulty),
    hungerDepletes: doesHungerDeplete(difficulty),
    starvationKills: canStarvationKill(difficulty),
    passiveRegen: hasPassiveRegen(difficulty),
    damageMultiplier: getMobDamageMultiplier(difficulty),
  };
}