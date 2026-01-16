/**
 * DESIGN
 * ------
 * MainHand represents the player's dominant hand preference.
 * 
 * WHERE THIS SETTING COMES FROM:
 * Players set this in Options → Skin Customization → Main Hand.
 * Default is RIGHT (most common).
 * 
 * WHAT IT AFFECTS:
 * 
 * 1. ITEM HOLDING:
 *    - Main hand: Primary actions (attack, use, place)
 *    - Off hand: Secondary items (shield, torch, map)
 * 
 * 2. VISUAL RENDERING:
 *    ┌─────────────────────────────────┐
 *    │   RIGHT-HANDED (default)        │
 *    │                                 │
 *    │   Off hand ←   → Main hand      │
 *    │   (left)          (right)       │
 *    │                                 │
 *    │   Shield         Sword          │
 *    └─────────────────────────────────┘
 * 
 *    ┌─────────────────────────────────┐
 *    │   LEFT-HANDED                   │
 *    │                                 │
 *    │   Main hand ←   → Off hand      │
 *    │   (left)          (right)       │
 *    │                                 │
 *    │   Sword          Shield         │
 *    └─────────────────────────────────┘
 * 
 * 3. ARM SWING ANIMATION:
 *    Attack/use animations play on main hand side.
 * 
 * 4. FIRST-PERSON VIEW:
 *    Main hand item appears on dominant side of screen.
 * 
 * NOTE ON EQUIPMENT SLOTS:
 * EquipmentSlot.HAND always refers to main hand.
 * EquipmentSlot.OFF_HAND always refers to off hand.
 * The MainHand setting just determines which physical
 * side of the player model those slots appear on.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/inventory/MainHand.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, enumNames, enumFromOrdinal, isEnumValue } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All main hand constant names.
 */
export type MainHandKey = "LEFT" | "RIGHT";

/**
 * Player's dominant hand preference.
 * 
 * Extends JavaEnum for full Java enum compatibility.
 */
export interface BukkitMainHand extends JavaEnum<MainHandKey> {}

/**
 * MainHand enum class type (constants + static methods).
 */
export type MainHandClass = Record<MainHandKey, BukkitMainHand> & JavaEnumClass<BukkitMainHand>;

// ============================================
// ENUM EXPORT
// ============================================

/**
 * Main hand enum.
 * 
 * LEFT: Left hand is dominant.
 *   - Main hand appears on LEFT side of screen
 *   - Attack animations on LEFT
 *   - Less common (~10% of real population)
 * 
 * RIGHT: Right hand is dominant (default).
 *   - Main hand appears on RIGHT side of screen
 *   - Attack animations on RIGHT
 *   - Most common (~90% of real population)
 * 
 * @example
 * // Check player's dominant hand
 * const hand = player.getMainHand();
 * if (hand === MainHand.LEFT) {
 *   console.log("Player is left-handed!");
 * }
 * 
 * @example
 * // Adjust UI based on handedness
 * const isLefty = player.getMainHand().name() === "LEFT";
 * const mainSide = isLefty ? "left" : "right";
 */
export const MainHand: MainHandClass = org.bukkit.inventory.MainHand;

/**
 * Default main hand (RIGHT).
 */
export const DEFAULT_MAIN_HAND: BukkitMainHand = MainHand.RIGHT;

// ============================================
// ENUM UTILITIES
// ============================================

/**
 * Get all MainHand values.
 * 
 * @example
 * for (const hand of getMainHandValues()) {
 *   console.log(hand.name());
 * }
 */
export function getMainHandValues(): BukkitMainHand[] {
  return enumValues(MainHand);
}

/**
 * Get MainHand by exact name.
 * 
 * @throws IllegalArgumentException if name doesn't match
 * 
 * @example
 * const left = getMainHandByName("LEFT");
 */
export function getMainHandByName(name: string): BukkitMainHand {
  return enumValueOf(MainHand, name);
}

/**
 * Get MainHand by name (safe version).
 * 
 * @returns MainHand or null if not found
 * 
 * @example
 * const hand = getMainHandSafe(userInput);
 * if (hand !== null) {
 *   // Valid hand
 * }
 */
export function getMainHandSafe(name: string): BukkitMainHand | null {
  const upper = name.toUpperCase();
  return isEnumValue(MainHand, upper) ? enumValueOf(MainHand, upper) : null;
}

/**
 * Get all MainHand names.
 * 
 * @example
 * const names = getMainHandNames(); // ["LEFT", "RIGHT"]
 */
export function getMainHandNames(): MainHandKey[] {
  return enumNames(MainHand) as MainHandKey[];
}

/**
 * Get MainHand by ordinal.
 * 
 * @returns MainHand or null if ordinal out of range
 */
export function getMainHandByOrdinal(ordinal: number): BukkitMainHand | null {
  return enumFromOrdinal(MainHand, ordinal);
}

/**
 * Check if string is a valid MainHand name.
 * 
 * @example
 * if (isValidMainHand("LEFT")) {
 *   // It's valid
 * }
 */
export function isValidMainHand(name: string): name is MainHandKey {
  return isEnumValue(MainHand, name.toUpperCase());
}

// ============================================
// HAND CHECKS
// ============================================

/**
 * Check if hand is LEFT.
 */
export function isLeft(hand: BukkitMainHand): boolean {
  return hand.name() === "LEFT";
}

/**
 * Check if hand is RIGHT.
 */
export function isRight(hand: BukkitMainHand): boolean {
  return hand.name() === "RIGHT";
}

/**
 * Check if entity is left-handed.
 * 
 * @example
 * if (isLeftHanded(player)) {
 *   // Adjust for left-handed player
 * }
 */
export function isLeftHanded(entity: { getMainHand(): BukkitMainHand }): boolean {
  return entity.getMainHand().name() === "LEFT";
}

/**
 * Check if entity is right-handed.
 */
export function isRightHanded(entity: { getMainHand(): BukkitMainHand }): boolean {
  return entity.getMainHand().name() === "RIGHT";
}

// ============================================
// HAND OPERATIONS
// ============================================

/**
 * Get the opposite hand.
 * 
 * @example
 * const offHandSide = getOppositeHand(player.getMainHand());
 */
export function getOppositeHand(hand: BukkitMainHand): BukkitMainHand {
  return hand.name() === "LEFT" ? MainHand.RIGHT : MainHand.LEFT;
}

/**
 * Get main hand as a side string.
 * 
 * @returns "left" or "right" (lowercase)
 */
export function getHandSide(hand: BukkitMainHand): "left" | "right" {
  return hand.name() === "LEFT" ? "left" : "right";
}

/**
 * Get off-hand side based on main hand.
 * 
 * @returns "left" or "right" (lowercase)
 */
export function getOffHandSide(mainHand: BukkitMainHand): "left" | "right" {
  return mainHand.name() === "LEFT" ? "right" : "left";
}

// ============================================
// EQUIPMENT SLOT HELPERS
// ============================================

/**
 * Convert MainHand to EquipmentSlot-compatible string.
 * 
 * WHY THIS EXISTS:
 * MainHand tells us which SIDE is dominant.
 * EquipmentSlot.HAND is always the main hand regardless of side.
 * This helper clarifies the relationship.
 * 
 * @returns "HAND" (main hand is always HAND slot)
 */
export function mainHandToSlot(): "HAND" {
  return "HAND";
}

/**
 * Get off-hand slot name.
 * 
 * @returns "OFF_HAND"
 */
export function offHandToSlot(): "OFF_HAND" {
  return "OFF_HAND";
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Get descriptive text for player's handedness.
 * 
 * @example
 * describeHandedness(player.getMainHand()); // "right-handed"
 */
export function describeHandedness(hand: BukkitMainHand): string {
  return hand.name() === "LEFT" ? "left-handed" : "right-handed";
}

// ============================================
// COMPARISON
// ============================================

/**
 * Check if two entities have same handedness.
 */
export function sameHandedness(
  a: { getMainHand(): BukkitMainHand },
  b: { getMainHand(): BukkitMainHand }
): boolean {
  return a.getMainHand().name() === b.getMainHand().name();
}

/**
 * Compare two MainHand values using Java's compareTo.
 */
export function compareMainHands(a: BukkitMainHand, b: BukkitMainHand): number {
  return a.compareTo(b);
}

/**
 * Check if two MainHand values are equal.
 */
export function sameMainHand(a: BukkitMainHand, b: BukkitMainHand): boolean {
  return a.name() === b.name();
}