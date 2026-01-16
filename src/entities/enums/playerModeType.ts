/**
 * DESIGN
 * ------
 * PlayerModelPart represents toggleable layers of a player's skin.
 * 
 * PLAYER SKIN LAYERS:
 * Minecraft skins have two layers:
 * 1. Base layer: Always visible (body, head, arms, legs)
 * 2. Outer layer: Optional overlays that can be toggled
 * 
 * This enum represents the OUTER layer parts that players
 * can show/hide in their skin settings (Options → Skin Customization).
 * 
 * VISUAL REPRESENTATION:
 * 
 *        ┌───────┐
 *        │  HAT  │  ← Outer layer on head
 *        │ (head)│
 *        └───┬───┘
 *    ┌───────┼───────┐
 *    │ LEFT  │ RIGHT │  ← Sleeves on arms
 *    │SLEEVE │SLEEVE │
 *    └───┬───┴───┬───┘
 *        │JACKET │  ← Torso overlay
 *        │       │
 *        ├───┬───┤
 *        │ L │ R │  ← Pants legs overlay
 *        │LEG│LEG│
 *        └───┴───┘
 * 
 *    + CAPE (back of player)
 * 
 * WHY PLAYERS TOGGLE THESE:
 * - Performance (fewer layers = less rendering)
 * - Aesthetics (some skins look better without certain layers)
 * - Visibility (cape can obstruct view in certain situations)
 * - Skin design (some skins use layers for alternate looks)
 * 
 * CAPE SPECIAL CASE:
 * Cape is only visible if player has one (from Minecraft events,
 * capes.net, OptiFine, etc.). Toggling it off hides it even if owned.
 * 
 * @experimental This API is experimental and may change.
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/model/PlayerModelPart.html
 */

// ============================================
// INTERFACE
// ============================================

/**
 * A part of the player model that can be shown or hidden.
 */
export interface BukkitPlayerModelPart {
  /**
   * Get enum constant name.
   * 
   * @returns "CAPE", "JACKET", etc.
   */
  name(): string;

  /**
   * Get enum ordinal (declaration order).
   * 
   * @returns 0 for CAPE, 1 for JACKET, etc.
   */
  ordinal(): number;
}

// ============================================
// ENUM VALUES
// ============================================

/**
 * All player model part names.
 */
export type PlayerModelPartKey =
  | "CAPE"
  | "JACKET"
  | "LEFT_SLEEVE"
  | "RIGHT_SLEEVE"
  | "LEFT_PANTS_LEG"
  | "RIGHT_PANTS_LEG"
  | "HAT";

/**
 * Player model parts enum.
 * 
 * @example
 * // Check if player is showing their cape
 * if (player.isModelPartShown(PlayerModelPart.CAPE)) {
 *   console.log("Cape is visible!");
 * }
 * 
 * @example
 * // Check all visible parts
 * for (const part of PlayerModelPartValues) {
 *   if (player.isModelPartShown(part)) {
 *     console.log(`${part.name()} is shown`);
 *   }
 * }
 */
export const PlayerModelPart: Record<PlayerModelPartKey, BukkitPlayerModelPart> = {
  /**
   * Player cape.
   * 
   * Only visible if player actually owns a cape.
   * Can be toggled off even if owned.
   */
  CAPE: org.bukkit.entity.model.PlayerModelPart.CAPE,

  /**
   * Player torso covering (jacket/shirt overlay).
   * 
   * Outer layer on the body/chest area.
   */
  JACKET: org.bukkit.entity.model.PlayerModelPart.JACKET,

  /**
   * Player left arm covering (sleeve).
   * 
   * Outer layer on left arm.
   */
  LEFT_SLEEVE: org.bukkit.entity.model.PlayerModelPart.LEFT_SLEEVE,

  /**
   * Player right arm covering (sleeve).
   * 
   * Outer layer on right arm.
   */
  RIGHT_SLEEVE: org.bukkit.entity.model.PlayerModelPart.RIGHT_SLEEVE,

  /**
   * Player left leg covering (pants leg overlay).
   * 
   * Outer layer on left leg.
   */
  LEFT_PANTS_LEG: org.bukkit.entity.model.PlayerModelPart.LEFT_PANTS_LEG,

  /**
   * Player right leg covering (pants leg overlay).
   * 
   * Outer layer on right leg.
   */
  RIGHT_PANTS_LEG: org.bukkit.entity.model.PlayerModelPart.RIGHT_PANTS_LEG,

  /**
   * Player hat/helmet layer.
   * 
   * Outer layer on head. Often used for:
   * - Hats
   * - Hair details
   * - Glasses
   * - Face accessories
   */
  HAT: org.bukkit.entity.model.PlayerModelPart.HAT,
};

/**
 * Array of all PlayerModelPart values for iteration.
 * 
 * Order matches Java's values() method (declaration order).
 */
export const PlayerModelPartValues: BukkitPlayerModelPart[] = [
  PlayerModelPart.CAPE,
  PlayerModelPart.JACKET,
  PlayerModelPart.LEFT_SLEEVE,
  PlayerModelPart.RIGHT_SLEEVE,
  PlayerModelPart.LEFT_PANTS_LEG,
  PlayerModelPart.RIGHT_PANTS_LEG,
  PlayerModelPart.HAT,
];

// ============================================
// GROUPED CONSTANTS
// ============================================

/**
 * Arm-related model parts (both sleeves).
 */
export const ArmParts: BukkitPlayerModelPart[] = [
  PlayerModelPart.LEFT_SLEEVE,
  PlayerModelPart.RIGHT_SLEEVE,
];

/**
 * Leg-related model parts (both pants legs).
 */
export const LegParts: BukkitPlayerModelPart[] = [
  PlayerModelPart.LEFT_PANTS_LEG,
  PlayerModelPart.RIGHT_PANTS_LEG,
];

/**
 * Left-side model parts.
 */
export const LeftSideParts: BukkitPlayerModelPart[] = [
  PlayerModelPart.LEFT_SLEEVE,
  PlayerModelPart.LEFT_PANTS_LEG,
];

/**
 * Right-side model parts.
 */
export const RightSideParts: BukkitPlayerModelPart[] = [
  PlayerModelPart.RIGHT_SLEEVE,
  PlayerModelPart.RIGHT_PANTS_LEG,
];

/**
 * Body covering parts (excludes cape and hat).
 */
export const BodyParts: BukkitPlayerModelPart[] = [
  PlayerModelPart.JACKET,
  PlayerModelPart.LEFT_SLEEVE,
  PlayerModelPart.RIGHT_SLEEVE,
  PlayerModelPart.LEFT_PANTS_LEG,
  PlayerModelPart.RIGHT_PANTS_LEG,
];

/**
 * All outer layer parts (excludes cape).
 */
export const OuterLayerParts: BukkitPlayerModelPart[] = [
  PlayerModelPart.HAT,
  PlayerModelPart.JACKET,
  PlayerModelPart.LEFT_SLEEVE,
  PlayerModelPart.RIGHT_SLEEVE,
  PlayerModelPart.LEFT_PANTS_LEG,
  PlayerModelPart.RIGHT_PANTS_LEG,
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get PlayerModelPart by name.
 * 
 * @param name Part name (case-insensitive)
 * @returns The part, or null if not found
 * 
 * @example
 * const part = getPlayerModelPart("cape"); // Returns CAPE
 */
export function getPlayerModelPart(name: string): BukkitPlayerModelPart | null {
  const upper = name.toUpperCase() as PlayerModelPartKey;
  return PlayerModelPart[upper] ?? null;
}

/**
 * Check if a player is showing all parts.
 * 
 * @param player The human entity to check
 * @returns true if all model parts are visible
 */
export function isShowingAllParts(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): boolean {
  for (const part of PlayerModelPartValues) {
    if (!player.isModelPartShown(part)) {
      return false;
    }
  }
  return true;
}

/**
 * Check if a player is hiding all parts.
 * 
 * @param player The human entity to check
 * @returns true if all model parts are hidden
 */
export function isHidingAllParts(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): boolean {
  for (const part of PlayerModelPartValues) {
    if (player.isModelPartShown(part)) {
      return false;
    }
  }
  return true;
}

/**
 * Get all visible model parts for a player.
 * 
 * @param player The human entity to check
 * @returns Array of visible parts
 * 
 * @example
 * const visible = getVisibleParts(player);
 * console.log(`Showing ${visible.length} parts`);
 */
export function getVisibleParts(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): BukkitPlayerModelPart[] {
  return PlayerModelPartValues.filter(part => player.isModelPartShown(part));
}

/**
 * Get all hidden model parts for a player.
 * 
 * @param player The human entity to check
 * @returns Array of hidden parts
 */
export function getHiddenParts(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): BukkitPlayerModelPart[] {
  return PlayerModelPartValues.filter(part => !player.isModelPartShown(part));
}

/**
 * Count visible model parts.
 * 
 * @param player The human entity to check
 * @returns Number of visible parts (0-7)
 */
export function countVisibleParts(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): number {
  let count = 0;
  for (const part of PlayerModelPartValues) {
    if (player.isModelPartShown(part)) {
      count++;
    }
  }
  return count;
}

/**
 * Check if player has symmetric arm visibility.
 * 
 * @returns true if both sleeves have same visibility
 */
export function hasSymmetricArms(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): boolean {
  return player.isModelPartShown(PlayerModelPart.LEFT_SLEEVE) === 
         player.isModelPartShown(PlayerModelPart.RIGHT_SLEEVE);
}

/**
 * Check if player has symmetric leg visibility.
 * 
 * @returns true if both pants legs have same visibility
 */
export function hasSymmetricLegs(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): boolean {
  return player.isModelPartShown(PlayerModelPart.LEFT_PANTS_LEG) === 
         player.isModelPartShown(PlayerModelPart.RIGHT_PANTS_LEG);
}

/**
 * Check if player's outer layers are fully symmetric.
 * 
 * @returns true if left and right sides match
 */
export function isSymmetric(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): boolean {
  return hasSymmetricArms(player) && hasSymmetricLegs(player);
}

/**
 * Check if player is showing only specific parts.
 * 
 * @param player The human entity to check
 * @param parts Parts that should be visible
 * @returns true if exactly those parts are visible
 */
export function isShowingOnly(
  player: { isModelPartShown(part: BukkitPlayerModelPart): boolean },
  parts: BukkitPlayerModelPart[]
): boolean {
  for (const part of PlayerModelPartValues) {
    const shouldShow = parts.includes(part);
    if (player.isModelPartShown(part) !== shouldShow) {
      return false;
    }
  }
  return true;
}

/**
 * Create a visibility description string.
 * 
 * @example
 * describeVisibility(player); // "CAPE, HAT, JACKET"
 */
export function describeVisibility(player: { isModelPartShown(part: BukkitPlayerModelPart): boolean }): string {
  const visible = getVisibleParts(player);
  
  if (visible.length === 0) {
    return "none";
  }
  
  if (visible.length === PlayerModelPartValues.length) {
    return "all";
  }
  
  return visible.map(p => p.name()).join(", ");
}