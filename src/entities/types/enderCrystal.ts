/**
 * DESIGN
 * ------
 * EnderCrystal represents the healing crystals found in The End.
 * 
 * END CRYSTAL MECHANICS:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    ENDER CRYSTAL                            │
 *   │                                                             │
 *   │                      ◇ Crystal                              │
 *   │                      │                                      │
 *   │                      │ Healing Beam                         │
 *   │                      │ (when dragon nearby)                 │
 *   │                      ▼                                      │
 *   │                    🐉 Ender Dragon                          │
 *   │                                                             │
 *   │   ┌───┐                                                     │
 *   │   │███│ ← Bedrock base (optional)                           │
 *   │   └───┘                                                     │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * CRYSTAL FEATURES:
 * 
 *   HEALING BEAM
 *   ├─ Automatically targets nearby Ender Dragon
 *   ├─ Heals dragon 1 HP per tick
 *   ├─ Visual beam connects crystal to dragon
 *   └─ Can be manually set to any location
 * 
 *   BEDROCK BASE
 *   ├─ Decorative slate underneath crystal
 *   ├─ Can be shown or hidden
 *   └─ Purely visual, no collision
 * 
 *   EXPLOSION
 *   ├─ Explodes when damaged
 *   ├─ Power 6 explosion (same as charged creeper)
 *   └─ Destroys the crystal entity
 * 
 * LOCATIONS IN THE END:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    END FOUNTAIN                             │
 *   │                                                             │
 *   │              ◇       ◇       ◇                              │
 *   │                                                             │
 *   │           ◇     [FOUNTAIN]     ◇                            │
 *   │                                                             │
 *   │              ◇       ◇       ◇                              │
 *   │                                                             │
 *   │   10 crystals on obsidian pillars around the fountain       │
 *   │   Some have iron cage protection                            │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * CUSTOM USES:
 * - Decorative beams (set beam target to any location)
 * - Custom boss mechanics
 * - Laser pointer effects
 * - Healing stations (with custom logic)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EnderCrystal.html
 */

import { BukkitLocation } from "../../world/types/location";
import { BukkitWorld } from "../../world/types/world";
import { BukkitEntity } from "./bukkitEntity";



// ============================================
// INTERFACE
// ============================================

/**
 * An End Crystal entity that heals the Ender Dragon.
 * 
 * Found naturally on obsidian pillars in The End.
 * Can be placed by players using end crystal items.
 * 
 * Features:
 * - Healing beam that targets Ender Dragon
 * - Optional bedrock base decoration
 * - Explodes when damaged
 */
export interface BukkitEnderCrystal extends BukkitEntity {
  /**
   * Check if the bedrock base is visible.
   * 
   * The bedrock base is a small decorative slate
   * shown underneath the crystal.
   * 
   * @returns true if bedrock base is showing
   * 
   * @example
   * if (crystal.isShowingBottom()) {
   *   console.log("Crystal has bedrock base");
   * }
   */
  isShowingBottom(): boolean;

  /**
   * Set whether the bedrock base is visible.
   * 
   * @param showing true to show bedrock base, false to hide
   * 
   * @example
   * // Hide the bedrock base for floating effect
   * crystal.setShowingBottom(false);
   */
  setShowingBottom(showing: boolean): void;

  /**
   * Get the location the beam is pointing to.
   * 
   * The beam is the visual line from crystal to target.
   * Naturally points to Ender Dragon when healing.
   * 
   * @returns Beam target location, or null if no beam
   * 
   * @example
   * const target = crystal.getBeamTarget();
   * if (target !== null) {
   *   console.log(`Beam pointing to ${target.getX()}, ${target.getY()}, ${target.getZ()}`);
   * }
   */
  getBeamTarget(): BukkitLocation | null;

  /**
   * Set the location the beam points to.
   * 
   * Set to null to remove the beam.
   * Target must be in the same world.
   * 
   * @param location Target location, or null to remove beam
   * @throws IllegalArgumentException if location is in different world
   * 
   * @example
   * // Point beam at a specific location
   * crystal.setBeamTarget(targetLocation);
   * 
   * @example
   * // Remove the beam
   * crystal.setBeamTarget(null);
   * 
   * @example
   * // Point beam at a player
   * crystal.setBeamTarget(player.getLocation());
   */
  setBeamTarget(location: BukkitLocation | null): void;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if entity is an EnderCrystal.
 */
export function isEnderCrystal(entity: BukkitEntity): entity is BukkitEnderCrystal {
  return entity.getType().name() === "END_CRYSTAL";
}

// ============================================
// BEAM UTILITIES
// ============================================

/**
 * Check if crystal has an active beam.
 */
export function hasBeam(crystal: BukkitEnderCrystal): boolean {
  return crystal.getBeamTarget() !== null;
}

/**
 * Remove the crystal's beam.
 */
export function removeBeam(crystal: BukkitEnderCrystal): void {
  crystal.setBeamTarget(null);
}

/**
 * Point beam at an entity's location.
 * 
 * @param crystal The crystal
 * @param entity The entity to target
 * @throws Error if entity is in different world
 */
export function pointBeamAt(
  crystal: BukkitEnderCrystal,
  entity: BukkitEntity
): void {
  crystal.setBeamTarget(entity.getLocation());
}

/**
 * Point beam at coordinates in the same world.
 * 
 * @param crystal The crystal
 * @param x X coordinate
 * @param y Y coordinate
 * @param z Z coordinate
 */
export function pointBeamAtCoords(
  crystal: BukkitEnderCrystal,
  x: number,
  y: number,
  z: number
): void {
  const world = crystal.getWorld();
  const location = createLocation(world, x, y, z);
  crystal.setBeamTarget(location);
}

/**
 * Get the distance from crystal to beam target.
 * 
 * @returns Distance in blocks, or null if no beam
 */
export function getBeamLength(crystal: BukkitEnderCrystal): number | null {
  const target = crystal.getBeamTarget();
  if (target === null) return null;
  
  return crystal.getLocation().distance(target);
}

/**
 * Check if beam is pointing at a specific location (within tolerance).
 */
export function isBeamPointingAt(
  crystal: BukkitEnderCrystal,
  location: BukkitLocation,
  tolerance: number = 1.0
): boolean {
  const target = crystal.getBeamTarget();
  if (target === null) return false;
  
  return target.distance(location) <= tolerance;
}

/**
 * Check if beam is pointing at an entity (within tolerance).
 */
export function isBeamPointingAtEntity(
  crystal: BukkitEnderCrystal,
  entity: BukkitEntity,
  tolerance: number = 2.0
): boolean {
  return isBeamPointingAt(crystal, entity.getLocation(), tolerance);
}

// ============================================
// APPEARANCE UTILITIES
// ============================================

/**
 * Make crystal appear floating (no bedrock base).
 */
export function makeFloating(crystal: BukkitEnderCrystal): void {
  crystal.setShowingBottom(false);
}

/**
 * Make crystal appear grounded (with bedrock base).
 */
export function makeGrounded(crystal: BukkitEnderCrystal): void {
  crystal.setShowingBottom(true);
}

/**
 * Toggle bedrock base visibility.
 */
export function toggleBottom(crystal: BukkitEnderCrystal): void {
  crystal.setShowingBottom(!crystal.isShowingBottom());
}

// ============================================
// CRYSTAL CONFIGURATION
// ============================================

/**
 * Configuration options for an end crystal.
 */
export interface EnderCrystalConfig {
  /** Show bedrock base? */
  showBottom?: boolean;
  /** Beam target location (null for no beam) */
  beamTarget?: BukkitLocation | null;
}

/**
 * Apply configuration to a crystal.
 */
export function configureCrystal(
  crystal: BukkitEnderCrystal,
  config: EnderCrystalConfig
): void {
  if (config.showBottom !== undefined) {
    crystal.setShowingBottom(config.showBottom);
  }
  
  if (config.beamTarget !== undefined) {
    crystal.setBeamTarget(config.beamTarget);
  }
}

/**
 * Get current crystal configuration.
 */
export function getCrystalConfig(crystal: BukkitEnderCrystal): EnderCrystalConfig {
  return {
    showBottom: crystal.isShowingBottom(),
    beamTarget: crystal.getBeamTarget(),
  };
}

/**
 * Create a decorative crystal (no base, no beam).
 */
export function makeDecorative(crystal: BukkitEnderCrystal): void {
  configureCrystal(crystal, {
    showBottom: false,
    beamTarget: null,
  });
}

/**
 * Create a standard crystal (with base, no beam).
 */
export function makeStandard(crystal: BukkitEnderCrystal): void {
  configureCrystal(crystal, {
    showBottom: true,
    beamTarget: null,
  });
}

// ============================================
// LOCATION HELPER
// ============================================

/**
 * Create a new Location.
 * 
 * Uses the global `java` object to access Bukkit classes.
 */
function createLocation(
  world: BukkitWorld,
  x: number,
  y: number,
  z: number
): BukkitLocation {
  return new org.bukkit.Location(world, x, y, z);
}

// ============================================
// END PILLAR UTILITIES
// ============================================

/**
 * Standard pillar heights in The End (vanilla values).
 */
export const END_PILLAR_HEIGHTS: number[] = [
  76, 79, 82, 85, 88, 91, 94, 97, 100, 103
];

/**
 * Check if crystal is at a standard End pillar location.
 * 
 * End pillars are arranged in a circle around 0,0.
 */
export function isAtEndPillar(crystal: BukkitEnderCrystal): boolean {
  const loc = crystal.getLocation();
  const world = loc.getWorld();
  
  /* Must be in The End */
  if (world.getEnvironment().name() !== "THE_END") {
    return false;
  }
  
  /* Check if near circle of radius ~43 around origin */
  const distFromOrigin = Math.sqrt(loc.getX() ** 2 + loc.getZ() ** 2);
  if (distFromOrigin < 40 || distFromOrigin > 50) {
    return false;
  }
  
  /* Check if at pillar height */
  const y = loc.getBlockY();
  return END_PILLAR_HEIGHTS.some(h => Math.abs(y - h) <= 2);
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Get human-readable description of crystal.
 */
export function describeCrystal(crystal: BukkitEnderCrystal): string {
  const parts: string[] = ["End Crystal"];
  
  if (crystal.isShowingBottom()) {
    parts.push("with base");
  } else {
    parts.push("floating");
  }
  
  const target = crystal.getBeamTarget();
  if (target !== null) {
    parts.push(`beam to (${target.getBlockX()}, ${target.getBlockY()}, ${target.getBlockZ()})`);
  } else {
    parts.push("no beam");
  }
  
  return parts.join(", ");
}

/**
 * Get crystal state summary.
 */
export function getCrystalState(crystal: BukkitEnderCrystal): {
  hasBase: boolean;
  hasBeam: boolean;
  beamLength: number | null;
  isAtPillar: boolean;
} {
  return {
    hasBase: crystal.isShowingBottom(),
    hasBeam: hasBeam(crystal),
    beamLength: getBeamLength(crystal),
    isAtPillar: isAtEndPillar(crystal),
  };
}