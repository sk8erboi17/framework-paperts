/**
 * DESIGN
 * ------
 * EnderDragon.Phase represents the behavior states of the Ender Dragon.
 * 
 * DRAGON BEHAVIOR CYCLE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                 ENDER DRAGON PHASES                         │
 *   │                                                             │
 *   │                    ┌──────────┐                             │
 *   │              ┌────►│ CIRCLING │◄────┐                       │
 *   │              │     └────┬─────┘     │                       │
 *   │              │          │           │                       │
 *   │              │          ▼           │                       │
 *   │              │    ┌──────────┐      │                       │
 *   │              │    │ STRAFING │──────┤  (shoot fireball)     │
 *   │              │    └──────────┘      │                       │
 *   │              │          │           │                       │
 *   │              │          ▼           │                       │
 *   │    ┌─────────┴───┐      │           │                       │
 *   │    │LEAVE_PORTAL │◄─────┘           │                       │
 *   │    └─────────────┘                  │                       │
 *   │              ▲                      │                       │
 *   │              │                      │                       │
 *   │    ┌─────────┴─────┐                │                       │
 *   │    │ BREATH_ATTACK │                │                       │
 *   │    └───────────────┘                │                       │
 *   │              ▲                      │                       │
 *   │              │                      │                       │
 *   │    ┌─────────┴──────────┐           │                       │
 *   │    │ROAR_BEFORE_ATTACK  │           │                       │
 *   │    └────────────────────┘           │                       │
 *   │              ▲                      │                       │
 *   │              │                      │                       │
 *   │    ┌─────────┴───────┐              │                       │
 *   │    │ LAND_ON_PORTAL  │              │                       │
 *   │    └─────────────────┘              │                       │
 *   │              ▲                      │                       │
 *   │              │                      │                       │
 *   │    ┌─────────┴───────┐              │                       │
 *   │    │  FLY_TO_PORTAL  │◄─────────────┘                       │
 *   │    └─────────────────┘                                      │
 *   │                                                             │
 *   │   Special phases:                                           │
 *   │   - CHARGE_PLAYER: Dragon charges at player                 │
 *   │   - SEARCH_FOR_BREATH_ATTACK_TARGET: Looking for target     │
 *   │   - HOVER: Stationary, no action                            │
 *   │   - DYING: Final death sequence                             │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * PHASE CATEGORIES:
 * 
 *   MOVEMENT PHASES:
 *   - CIRCLING: Flying around the arena
 *   - FLY_TO_PORTAL: Moving to portal
 *   - CHARGE_PLAYER: Rushing at player
 * 
 *   PORTAL PHASES:
 *   - LAND_ON_PORTAL: Landing on portal
 *   - LEAVE_PORTAL: Taking off from portal
 * 
 *   ATTACK PHASES:
 *   - STRAFING: Shooting fireballs
 *   - BREATH_ATTACK: Dragon breath attack
 *   - ROAR_BEFORE_ATTACK: Pre-attack roar
 *   - SEARCH_FOR_BREATH_ATTACK_TARGET: Finding target
 * 
 *   OTHER PHASES:
 *   - HOVER: Stationary
 *   - DYING: Death animation
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EnderDragon.Phase.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, isEnumValue } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All valid EnderDragon.Phase constant names.
 */
export type DragonPhaseName =
  | "CIRCLING"
  | "STRAFING"
  | "FLY_TO_PORTAL"
  | "LAND_ON_PORTAL"
  | "LEAVE_PORTAL"
  | "BREATH_ATTACK"
  | "SEARCH_FOR_BREATH_ATTACK_TARGET"
  | "ROAR_BEFORE_ATTACK"
  | "CHARGE_PLAYER"
  | "DYING"
  | "HOVER";

/**
 * DragonPhase enum instance.
 */
export interface BukkitDragonPhase extends JavaEnum<DragonPhaseName> {}

/**
 * DragonPhase enum class (static side).
 */
export interface BukkitDragonPhaseClass extends JavaEnumClass<BukkitDragonPhase> {
  /** Dragon circles the arena */
  readonly CIRCLING: BukkitDragonPhase;
  
  /** Dragon flies at player and shoots fireball within 64 blocks */
  readonly STRAFING: BukkitDragonPhase;
  
  /** Dragon flies towards the portal */
  readonly FLY_TO_PORTAL: BukkitDragonPhase;
  
  /** Dragon lands on the portal */
  readonly LAND_ON_PORTAL: BukkitDragonPhase;
  
  /** Dragon leaves the portal */
  readonly LEAVE_PORTAL: BukkitDragonPhase;
  
  /** Dragon performs breath attack at current location */
  readonly BREATH_ATTACK: BukkitDragonPhase;
  
  /** Dragon searches for player to breath attack */
  readonly SEARCH_FOR_BREATH_ATTACK_TARGET: BukkitDragonPhase;
  
  /** Dragon roars before breath attack */
  readonly ROAR_BEFORE_ATTACK: BukkitDragonPhase;
  
  /** Dragon charges at a player */
  readonly CHARGE_PLAYER: BukkitDragonPhase;
  
  /** Dragon is dying (death animation) */
  readonly DYING: BukkitDragonPhase;
  
  /** Dragon hovers in place, no actions */
  readonly HOVER: BukkitDragonPhase;
}

/**
 * Access to EnderDragon.Phase enum.
 */
export const DragonPhase: BukkitDragonPhaseClass = org.bukkit.entity.EnderDragon.Phase;

// ============================================
// CONSTANTS
// ============================================

/**
 * All dragon phases in declaration order.
 */
export const DRAGON_PHASES: readonly DragonPhaseName[] = [
  "CIRCLING",
  "STRAFING",
  "FLY_TO_PORTAL",
  "LAND_ON_PORTAL",
  "LEAVE_PORTAL",
  "BREATH_ATTACK",
  "SEARCH_FOR_BREATH_ATTACK_TARGET",
  "ROAR_BEFORE_ATTACK",
  "CHARGE_PLAYER",
  "DYING",
  "HOVER",
] as const;

/**
 * Movement-related phases.
 */
export const MOVEMENT_PHASES: readonly DragonPhaseName[] = [
  "CIRCLING",
  "FLY_TO_PORTAL",
  "CHARGE_PLAYER",
];

/**
 * Portal-related phases.
 */
export const PORTAL_PHASES: readonly DragonPhaseName[] = [
  "FLY_TO_PORTAL",
  "LAND_ON_PORTAL",
  "LEAVE_PORTAL",
];

/**
 * Attack-related phases.
 */
export const ATTACK_PHASES: readonly DragonPhaseName[] = [
  "STRAFING",
  "BREATH_ATTACK",
  "SEARCH_FOR_BREATH_ATTACK_TARGET",
  "ROAR_BEFORE_ATTACK",
  "CHARGE_PLAYER",
];

/**
 * Breath attack sequence phases.
 */
export const BREATH_ATTACK_SEQUENCE: readonly DragonPhaseName[] = [
  "SEARCH_FOR_BREATH_ATTACK_TARGET",
  "ROAR_BEFORE_ATTACK",
  "BREATH_ATTACK",
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all DragonPhase values.
 */
export function getDragonPhases(): BukkitDragonPhase[] {
  return enumValues(DragonPhase);
}

/**
 * Get DragonPhase by name.
 * 
 * @throws IllegalArgumentException if name is invalid
 */
export function getDragonPhase(name: DragonPhaseName): BukkitDragonPhase {
  return enumValueOf(DragonPhase, name);
}

/**
 * Safely get DragonPhase by name.
 * 
 * @param name Phase name (case-insensitive)
 * @returns DragonPhase or null if invalid
 */
export function getDragonPhaseSafe(name: string): BukkitDragonPhase | null {
  const upper = name.toUpperCase();
  if (isEnumValue(DragonPhase, upper)) {
    return enumValueOf(DragonPhase, upper);
  }
  return null;
}

/**
 * Check if a string is a valid DragonPhase name.
 */
export function isDragonPhaseName(name: string): name is DragonPhaseName {
  return isEnumValue(DragonPhase, name.toUpperCase());
}

// ============================================
// PHASE CHECKS
// ============================================

/**
 * Check if dragon is circling.
 */
export function isCircling(phase: BukkitDragonPhase): boolean {
  return phase.name() === "CIRCLING";
}

/**
 * Check if dragon is strafing (shooting fireballs).
 */
export function isStrafing(phase: BukkitDragonPhase): boolean {
  return phase.name() === "STRAFING";
}

/**
 * Check if dragon is flying to portal.
 */
export function isFlyingToPortal(phase: BukkitDragonPhase): boolean {
  return phase.name() === "FLY_TO_PORTAL";
}

/**
 * Check if dragon is landing on portal.
 */
export function isLandingOnPortal(phase: BukkitDragonPhase): boolean {
  return phase.name() === "LAND_ON_PORTAL";
}

/**
 * Check if dragon is leaving portal.
 */
export function isLeavingPortal(phase: BukkitDragonPhase): boolean {
  return phase.name() === "LEAVE_PORTAL";
}

/**
 * Check if dragon is performing breath attack.
 */
export function isBreathAttacking(phase: BukkitDragonPhase): boolean {
  return phase.name() === "BREATH_ATTACK";
}

/**
 * Check if dragon is searching for breath target.
 */
export function isSearchingForTarget(phase: BukkitDragonPhase): boolean {
  return phase.name() === "SEARCH_FOR_BREATH_ATTACK_TARGET";
}

/**
 * Check if dragon is roaring.
 */
export function isRoaring(phase: BukkitDragonPhase): boolean {
  return phase.name() === "ROAR_BEFORE_ATTACK";
}

/**
 * Check if dragon is charging a player.
 */
export function isChargingPlayer(phase: BukkitDragonPhase): boolean {
  return phase.name() === "CHARGE_PLAYER";
}

/**
 * Check if dragon is dying.
 */
export function isDying(phase: BukkitDragonPhase): boolean {
  return phase.name() === "DYING";
}

/**
 * Check if dragon is hovering.
 */
export function isHovering(phase: BukkitDragonPhase): boolean {
  return phase.name() === "HOVER";
}

// ============================================
// PHASE CATEGORIES
// ============================================

/**
 * Check if phase is movement-related.
 */
export function isMovementPhase(phase: BukkitDragonPhase): boolean {
  return MOVEMENT_PHASES.includes(phase.name() as DragonPhaseName);
}

/**
 * Check if phase is portal-related.
 */
export function isPortalPhase(phase: BukkitDragonPhase): boolean {
  return PORTAL_PHASES.includes(phase.name() as DragonPhaseName);
}

/**
 * Check if phase is attack-related.
 */
export function isAttackPhase(phase: BukkitDragonPhase): boolean {
  return ATTACK_PHASES.includes(phase.name() as DragonPhaseName);
}

/**
 * Check if phase is part of breath attack sequence.
 */
export function isBreathAttackSequence(phase: BukkitDragonPhase): boolean {
  return BREATH_ATTACK_SEQUENCE.includes(phase.name() as DragonPhaseName);
}

/**
 * Check if dragon is grounded (on portal).
 */
export function isGrounded(phase: BukkitDragonPhase): boolean {
  const name = phase.name();
  return name === "LAND_ON_PORTAL" || 
         name === "BREATH_ATTACK" || 
         name === "ROAR_BEFORE_ATTACK" ||
         name === "SEARCH_FOR_BREATH_ATTACK_TARGET";
}

/**
 * Check if dragon is airborne.
 */
export function isAirborne(phase: BukkitDragonPhase): boolean {
  return !isGrounded(phase) && phase.name() !== "DYING";
}

/**
 * Check if dragon is aggressive (attacking).
 */
export function isAggressive(phase: BukkitDragonPhase): boolean {
  const name = phase.name();
  return name === "STRAFING" || 
         name === "BREATH_ATTACK" || 
         name === "CHARGE_PLAYER";
}

/**
 * Check if dragon is passive (not attacking).
 */
export function isPassive(phase: BukkitDragonPhase): boolean {
  const name = phase.name();
  return name === "CIRCLING" || 
         name === "HOVER" || 
         name === "FLY_TO_PORTAL" ||
         name === "LEAVE_PORTAL";
}

/**
 * Check if dragon is vulnerable (good time to attack).
 */
export function isVulnerable(phase: BukkitDragonPhase): boolean {
  /* Dragon is most vulnerable when grounded on portal */
  return isGrounded(phase);
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Phase descriptions.
 */
export const PHASE_DESCRIPTIONS: Record<DragonPhaseName, string> = {
  CIRCLING: "Circling the arena",
  STRAFING: "Flying at player, shooting fireballs",
  FLY_TO_PORTAL: "Flying towards the portal",
  LAND_ON_PORTAL: "Landing on the portal",
  LEAVE_PORTAL: "Taking off from the portal",
  BREATH_ATTACK: "Performing dragon breath attack",
  SEARCH_FOR_BREATH_ATTACK_TARGET: "Searching for breath attack target",
  ROAR_BEFORE_ATTACK: "Roaring before breath attack",
  CHARGE_PLAYER: "Charging at a player",
  DYING: "Death animation",
  HOVER: "Hovering in place",
};

/**
 * Get phase description.
 */
export function getPhaseDescription(phase: BukkitDragonPhase): string {
  return PHASE_DESCRIPTIONS[phase.name() as DragonPhaseName];
}

/**
 * Get display name for phase.
 */
export function getPhaseDisplayName(phase: BukkitDragonPhase): string {
  const name = phase.name();
  return name
    .split("_")
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get phase info.
 */
export function getPhaseInfo(phase: BukkitDragonPhase): {
  name: DragonPhaseName;
  displayName: string;
  description: string;
  isAttack: boolean;
  isGrounded: boolean;
  isVulnerable: boolean;
} {
  return {
    name: phase.name() as DragonPhaseName,
    displayName: getPhaseDisplayName(phase),
    description: getPhaseDescription(phase),
    isAttack: isAttackPhase(phase),
    isGrounded: isGrounded(phase),
    isVulnerable: isVulnerable(phase),
  };
}