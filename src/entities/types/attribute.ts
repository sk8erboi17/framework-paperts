/**
 * Types of attributes which may be present on an Attributable entity.
 * 
 * Attributes are modifiable stats like health, speed, damage, etc.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/attribute/Attribute.html
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export type AttributeKey =
  // Health & Defense
  | "MAX_HEALTH" | "MAX_ABSORPTION" | "ARMOR" | "ARMOR_TOUGHNESS"
  | "KNOCKBACK_RESISTANCE" | "EXPLOSION_KNOCKBACK_RESISTANCE"
  // Movement
  | "MOVEMENT_SPEED" | "FLYING_SPEED" | "SNEAKING_SPEED"
  | "MOVEMENT_EFFICIENCY" | "WATER_MOVEMENT_EFFICIENCY"
  // Combat
  | "ATTACK_DAMAGE" | "ATTACK_SPEED" | "ATTACK_KNOCKBACK" | "SWEEPING_DAMAGE_RATIO"
  // Fall & Jump
  | "FALL_DAMAGE_MULTIPLIER" | "SAFE_FALL_DISTANCE" | "JUMP_STRENGTH" | "GRAVITY"
  // Scale & Step
  | "SCALE" | "STEP_HEIGHT"
  // Mining
  | "BLOCK_BREAK_SPEED" | "MINING_EFFICIENCY" | "SUBMERGED_MINING_SPEED"
  // Reach
  | "BLOCK_INTERACTION_RANGE" | "ENTITY_INTERACTION_RANGE"
  // Misc
  | "FOLLOW_RANGE" | "LUCK" | "BURNING_TIME" | "OXYGEN_BONUS"
  | "SPAWN_REINFORCEMENTS" | "TEMPT_RANGE" | "CAMERA_DISTANCE"
  // Waypoint (Allays)
  | "WAYPOINT_TRANSMIT_RANGE" | "WAYPOINT_RECEIVE_RANGE";

// ============================================
// ATTRIBUTES
// ============================================

export const Attribute: Record<AttributeKey, any> = {
  // ---- Health & Defense ----

  /** Maximum health. Default: 20 (10 hearts). */
  MAX_HEALTH: org.bukkit.attribute.Attribute.MAX_HEALTH,

  /** Maximum absorption (golden hearts). Default: 0. */
  MAX_ABSORPTION: org.bukkit.attribute.Attribute.MAX_ABSORPTION,

  /** Armor points. Default: 0. */
  ARMOR: org.bukkit.attribute.Attribute.ARMOR,

  /** Armor toughness (reduces high damage). Default: 0. */
  ARMOR_TOUGHNESS: org.bukkit.attribute.Attribute.ARMOR_TOUGHNESS,

  /** Knockback resistance. 0 = none, 1 = immune. Default: 0. */
  KNOCKBACK_RESISTANCE: org.bukkit.attribute.Attribute.KNOCKBACK_RESISTANCE,

  /** Explosion knockback resistance. Default: 0. */
  EXPLOSION_KNOCKBACK_RESISTANCE: org.bukkit.attribute.Attribute.EXPLOSION_KNOCKBACK_RESISTANCE,

  // ---- Movement ----

  /** Movement speed. Default: 0.7 (player). */
  MOVEMENT_SPEED: org.bukkit.attribute.Attribute.MOVEMENT_SPEED,

  /** Flying speed. Default: 0.4. */
  FLYING_SPEED: org.bukkit.attribute.Attribute.FLYING_SPEED,

  /** Sneaking speed. Default: 0.3. */
  SNEAKING_SPEED: org.bukkit.attribute.Attribute.SNEAKING_SPEED,

  /** Speed through difficult terrain (soul sand, etc.). */
  MOVEMENT_EFFICIENCY: org.bukkit.attribute.Attribute.MOVEMENT_EFFICIENCY,

  /** Speed through water. */
  WATER_MOVEMENT_EFFICIENCY: org.bukkit.attribute.Attribute.WATER_MOVEMENT_EFFICIENCY,

  // ---- Combat ----

  /** Base attack damage. Default: 1. */
  ATTACK_DAMAGE: org.bukkit.attribute.Attribute.ATTACK_DAMAGE,

  /** Attack speed (attacks per second). Default: 4. */
  ATTACK_SPEED: org.bukkit.attribute.Attribute.ATTACK_SPEED,

  /** Knockback dealt to targets. Default: 0. */
  ATTACK_KNOCKBACK: org.bukkit.attribute.Attribute.ATTACK_KNOCKBACK,

  /** Sweep attack damage ratio. Default: 0. */
  SWEEPING_DAMAGE_RATIO: org.bukkit.attribute.Attribute.SWEEPING_DAMAGE_RATIO,

  // ---- Fall & Jump ----

  /** Fall damage multiplier. Default: 1. */
  FALL_DAMAGE_MULTIPLIER: org.bukkit.attribute.Attribute.FALL_DAMAGE_MULTIPLIER,

  /** Blocks can fall without damage. Default: 3. */
  SAFE_FALL_DISTANCE: org.bukkit.attribute.Attribute.SAFE_FALL_DISTANCE,

  /** Jump strength. Default: 0.42. */
  JUMP_STRENGTH: org.bukkit.attribute.Attribute.JUMP_STRENGTH,

  /** Gravity strength. Default: 0.08. */
  GRAVITY: org.bukkit.attribute.Attribute.GRAVITY,

  // ---- Scale & Step ----

  /** Entity scale. Default: 1. */
  SCALE: org.bukkit.attribute.Attribute.SCALE,

  /** Max block height can step over. Default: 0.6. */
  STEP_HEIGHT: org.bukkit.attribute.Attribute.STEP_HEIGHT,

  // ---- Mining ----

  /** Block break speed. Default: 1. */
  BLOCK_BREAK_SPEED: org.bukkit.attribute.Attribute.BLOCK_BREAK_SPEED,

  /** Mining efficiency with correct tool. */
  MINING_EFFICIENCY: org.bukkit.attribute.Attribute.MINING_EFFICIENCY,

  /** Mining speed underwater. */
  SUBMERGED_MINING_SPEED: org.bukkit.attribute.Attribute.SUBMERGED_MINING_SPEED,

  // ---- Reach ----

  /** Block interaction range. Default: 4.5. */
  BLOCK_INTERACTION_RANGE: org.bukkit.attribute.Attribute.BLOCK_INTERACTION_RANGE,

  /** Entity interaction range. Default: 3. */
  ENTITY_INTERACTION_RANGE: org.bukkit.attribute.Attribute.ENTITY_INTERACTION_RANGE,

  // ---- Misc ----

  /** Range mob will follow/target. Default: varies by mob. */
  FOLLOW_RANGE: org.bukkit.attribute.Attribute.FOLLOW_RANGE,

  /** Luck (affects loot tables). Default: 0. */
  LUCK: org.bukkit.attribute.Attribute.LUCK,

  /** Time entity burns after ignition. */
  BURNING_TIME: org.bukkit.attribute.Attribute.BURNING_TIME,

  /** Underwater breathing bonus. */
  OXYGEN_BONUS: org.bukkit.attribute.Attribute.OXYGEN_BONUS,

  /** Zombie reinforcement spawn chance. Default: 0. */
  SPAWN_REINFORCEMENTS: org.bukkit.attribute.Attribute.SPAWN_REINFORCEMENTS,

  /** Range mobs are tempted by items. */
  TEMPT_RANGE: org.bukkit.attribute.Attribute.TEMPT_RANGE,

  /** Third-person camera distance. */
  CAMERA_DISTANCE: org.bukkit.attribute.Attribute.CAMERA_DISTANCE,

  // ---- Waypoint (Allays) ----

  /** Allay waypoint transmit range. */
  WAYPOINT_TRANSMIT_RANGE: org.bukkit.attribute.Attribute.WAYPOINT_TRANSMIT_RANGE,

  /** Allay waypoint receive range. */
  WAYPOINT_RECEIVE_RANGE: org.bukkit.attribute.Attribute.WAYPOINT_RECEIVE_RANGE,
};