/**
 * Represents an entity body pose.
 * 
 * Determines the visual animation/position of an entity's body.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Pose.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type PoseKey =
  | "STANDING" | "FALL_FLYING" | "SLEEPING" | "SWIMMING"
  | "SPIN_ATTACK" | "SNEAKING" | "LONG_JUMPING" | "DYING"
  | "CROAKING" | "USING_TONGUE" | "SITTING" | "ROARING"
  | "SNIFFING" | "EMERGING" | "DIGGING" | "SLIDING"
  | "SHOOTING" | "INHALING";

// ============================================
// INTERFACE
// ============================================

export interface BukkitPose extends JavaEnum<PoseKey> {
  // No additional methods.
}

// ============================================
// POSE CLASS INTERFACE
// ============================================

interface PoseClass extends
  Omit<Record<PoseKey, BukkitPose>, keyof JavaEnumClass<BukkitPose>>,
  JavaEnumClass<BukkitPose> {
}

// ============================================
// POSES
// ============================================

export const Pose: PoseClass = {
  // Common poses
  /** Normal standing position. */
  STANDING: org.bukkit.entity.Pose.STANDING,

  /** Sneaking/crouching. */
  SNEAKING: org.bukkit.entity.Pose.SNEAKING,

  /** Sleeping in bed. */
  SLEEPING: org.bukkit.entity.Pose.SLEEPING,

  /** Swimming in water. */
  SWIMMING: org.bukkit.entity.Pose.SWIMMING,

  /** Sitting (cats, wolves, etc.). */
  SITTING: org.bukkit.entity.Pose.SITTING,

  /** Death animation. */
  DYING: org.bukkit.entity.Pose.DYING,

  // Movement poses
  /** Gliding with elytra. */
  FALL_FLYING: org.bukkit.entity.Pose.FALL_FLYING,

  /** Riptide trident attack. */
  SPIN_ATTACK: org.bukkit.entity.Pose.SPIN_ATTACK,

  /** Goat/frog long jump. */
  LONG_JUMPING: org.bukkit.entity.Pose.LONG_JUMPING,

  /** Sliding (e.g., on ice). */
  SLIDING: org.bukkit.entity.Pose.SLIDING,

  // Warden poses
  /** Warden roaring. */
  ROARING: org.bukkit.entity.Pose.ROARING,

  /** Warden sniffing. */
  SNIFFING: org.bukkit.entity.Pose.SNIFFING,

  /** Warden emerging from ground. */
  EMERGING: org.bukkit.entity.Pose.EMERGING,

  /** Warden digging into ground. */
  DIGGING: org.bukkit.entity.Pose.DIGGING,

  // Frog poses
  /** Frog croaking. */
  CROAKING: org.bukkit.entity.Pose.CROAKING,

  /** Frog using tongue to eat. */
  USING_TONGUE: org.bukkit.entity.Pose.USING_TONGUE,

  // Other mob poses
  /** Breeze/similar shooting projectile. */
  SHOOTING: org.bukkit.entity.Pose.SHOOTING,

  /** Inhaling (e.g., before attack). */
  INHALING: org.bukkit.entity.Pose.INHALING,

  values(): BukkitPose[] {
    return org.bukkit.entity.Pose.values();
  },

  valueOf(name: string): BukkitPose {
    return org.bukkit.entity.Pose.valueOf(name);
  },
};