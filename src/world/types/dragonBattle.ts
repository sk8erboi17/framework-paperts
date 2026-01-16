/**
 * DESIGN
 * ------
 * DragonBattle manages the Ender Dragon fight in The End dimension.
 * 
 * DRAGON BATTLE OVERVIEW:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    THE END                                  │
 *   │                                                             │
 *   │              ◇       ◇       ◇                              │
 *   │                 \    |    /                                 │
 *   │                  \   |   /                                  │
 *   │           ◇ ──────[🐉]────── ◇    Healing beams             │
 *   │                  /   |   \                                  │
 *   │                 /    |    \                                 │
 *   │              ◇       ◇       ◇                              │
 *   │                                                             │
 *   │           ┌─────────────────┐                               │
 *   │           │  EXIT PORTAL    │                               │
 *   │           │    (center)     │                               │
 *   │           └─────────────────┘                               │
 *   │                                                             │
 *   │   10 Obsidian pillars with End Crystals                     │
 *   │   Dragon is healed by crystals                              │
 *   │   Exit portal appears when dragon dies                      │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * RESPAWN SEQUENCE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                 DRAGON RESPAWN PHASES                       │
 *   │                                                             │
 *   │   NONE ──► START ──► PREPARING_TO_SUMMON_PILLARS            │
 *   │                              │                              │
 *   │                              ▼                              │
 *   │   NONE ◄── END ◄── SUMMONING_DRAGON ◄── SUMMONING_PILLARS   │
 *   │                                                             │
 *   │                                                             │
 *   │   START:                                                    │
 *   │   - Player places 4 End Crystals on portal                  │
 *   │   - Crystal beams point upward                              │
 *   │                                                             │
 *   │   PREPARING_TO_SUMMON_PILLARS:                              │
 *   │   - Beams remain upward                                     │
 *   │   - Preparing pillar regeneration                           │
 *   │                                                             │
 *   │   SUMMONING_PILLARS:                                        │
 *   │   - Beams go pillar to pillar                               │
 *   │   - Crystals regenerate on pillars                          │
 *   │                                                             │
 *   │   SUMMONING_DRAGON:                                         │
 *   │   - All beams point to sky                                  │
 *   │   - Portal crystals destroyed                               │
 *   │                                                             │
 *   │   END:                                                      │
 *   │   - Dragon spawns!                                          │
 *   │   - Phase returns to NONE                                   │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * BOSS BAR:
 * The dragon battle displays a purple boss bar at the top of the screen
 * showing the dragon's health. This bar is managed by the DragonBattle.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/boss/DragonBattle.html
 */


import { BukkitEnderCrystal } from "../../entities/types/enderCrystal";
import { JavaCollection } from "../../java/types/collections";
import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, isEnumValue } from "../../java/types/enum";
import { BukkitBossBar } from "./bossBar";
import { BukkitLocation } from "./location";

// ============================================
// RESPAWN PHASE ENUM
// ============================================

/**
 * All valid RespawnPhase constant names.
 */
export type RespawnPhaseName =
  | "START"
  | "PREPARING_TO_SUMMON_PILLARS"
  | "SUMMONING_PILLARS"
  | "SUMMONING_DRAGON"
  | "END"
  | "NONE";

/**
 * RespawnPhase enum instance.
 */
export interface BukkitRespawnPhase extends JavaEnum<RespawnPhaseName> {}

/**
 * RespawnPhase enum class (static side).
 */
export interface BukkitRespawnPhaseClass extends JavaEnumClass<BukkitRespawnPhase> {
  /** Crystal beams directed upwards into the sky */
  readonly START: BukkitRespawnPhase;
  
  /** Crystal beams remain directed upwards, preparing pillars */
  readonly PREPARING_TO_SUMMON_PILLARS: BukkitRespawnPhase;
  
  /** Beams go pillar to pillar, regenerating crystals */
  readonly SUMMONING_PILLARS: BukkitRespawnPhase;
  
  /** All beams aimed at sky, about to summon dragon */
  readonly SUMMONING_DRAGON: BukkitRespawnPhase;
  
  /** End of sequence, dragon is summoned */
  readonly END: BukkitRespawnPhase;
  
  /** No respawn in progress */
  readonly NONE: BukkitRespawnPhase;
}

/**
 * Access to RespawnPhase enum.
 */
export const RespawnPhase: BukkitRespawnPhaseClass = org.bukkit.boss.DragonBattle.RespawnPhase;

// ============================================
// DRAGON BATTLE INTERFACE
// ============================================

/**
 * Represents the Ender Dragon battle state for an End world.
 * 
 * Each End dimension has one DragonBattle that manages:
 * - The active Ender Dragon (if alive)
 * - The boss bar display
 * - The exit portal
 * - Dragon respawn sequences
 * - End Crystal management
 */
export interface BukkitDragonBattle {
  /**
   * Get the active Ender Dragon.
   * 
   * @returns The dragon, or null if dead/not spawned
   * 
   * @example
   * const dragon = battle.getEnderDragon();
   * if (dragon !== null) {
   *   console.log(`Dragon health: ${dragon.getHealth()}`);
   * }
   */
  getEnderDragon(): BukkitEnderDragon | null;

  /**
   * Get the boss bar for this battle.
   * 
   * The boss bar displays at the top of the screen for players
   * in The End, showing the dragon's health.
   * 
   * @returns The dragon's boss bar
   * 
   * @example
   * const bar = battle.getBossBar();
   * bar.setTitle("Custom Dragon Name");
   */
  getBossBar(): BukkitBossBar;

  /**
   * Get the exit portal location.
   * 
   * Returns the center of the portal base (bottom).
   * 
   * @returns Portal location, or null if not generated
   * 
   * @example
   * const portal = battle.getEndPortalLocation();
   * if (portal !== null) {
   *   player.teleport(portal.add(0, 1, 0));
   * }
   */
  getEndPortalLocation(): BukkitLocation | null;

  /**
   * Generate the exit portal.
   * 
   * @param withPortals true to include portal blocks (allows teleport)
   * @returns true if generated, false if already exists
   * 
   * @example
   * // Generate portal structure without actual portal blocks
   * battle.generateEndPortal(false);
   * 
   * // Generate complete functional portal
   * battle.generateEndPortal(true);
   */
  generateEndPortal(withPortals: boolean): boolean;

  /**
   * Check if the first dragon has been killed.
   * 
   * The first kill triggers special behavior:
   * - Dragon egg spawns
   * - End gateway portal appears
   * - XP orbs spawn (12,000 XP)
   * 
   * @returns true if dragon was killed before
   */
  hasBeenPreviouslyKilled(): boolean;

  /**
   * Set whether the first dragon has been killed.
   * 
   * If set to false, the next dragon kill will be treated
   * as the first kill (dragon egg, gateway, extra XP).
   * 
   * @param previouslyKilled true if already killed
   */
  setPreviouslyKilled(previouslyKilled: boolean): void;

  /**
   * Start dragon respawn sequence.
   * 
   * Acts as if a player placed 4 End Crystals on the portal.
   * Will fail if dragon is already alive or respawn in progress.
   * 
   * @example
   * battle.initiateRespawn();
   */
  initiateRespawn(): void;

  /**
   * Start dragon respawn with specific crystals.
   * 
   * @param enderCrystals Crystals to use, or null/empty for uncancellable
   * @returns true if respawn started
   * 
   * @example
   * // Start respawn with specific crystals
   * const crystals = [crystal1, crystal2, crystal3, crystal4];
   * if (battle.initiateRespawn(crystals)) {
   *   console.log("Respawn started!");
   * }
   */
  initiateRespawn(enderCrystals: JavaCollection<BukkitEnderCrystal> | null): boolean;

  /**
   * Get current respawn phase.
   * 
   * @returns Current phase (NONE if no respawn in progress)
   * 
   * @example
   * const phase = battle.getRespawnPhase();
   * if (phase.name() !== "NONE") {
   *   console.log(`Respawn in progress: ${phase.name()}`);
   * }
   */
  getRespawnPhase(): BukkitRespawnPhase;

  /**
   * Set the respawn phase.
   * 
   * Only works if a respawn is in progress.
   * 
   * @param phase Phase to set
   * @returns true if successful
   * 
   * @example
   * // Skip to dragon summoning
   * battle.setRespawnPhase(RespawnPhase.SUMMONING_DRAGON);
   */
  setRespawnPhase(phase: BukkitRespawnPhase): boolean;

  /**
   * Reset all pillar crystals.
   * 
   * Removes beam targets and invulnerability from crystals
   * on the obsidian pillars.
   * 
   * @example
   * // Reset crystals after custom event
   * battle.resetCrystals();
   */
  resetCrystals(): void;
}

// ============================================
// RESPAWN PHASE HELPERS
// ============================================

/**
 * Respawn phases in sequence order.
 */
export const RESPAWN_PHASE_ORDER: readonly RespawnPhaseName[] = [
  "NONE",
  "START",
  "PREPARING_TO_SUMMON_PILLARS",
  "SUMMONING_PILLARS",
  "SUMMONING_DRAGON",
  "END",
] as const;

/**
 * Get all RespawnPhase values.
 */
export function getRespawnPhases(): BukkitRespawnPhase[] {
  return enumValues(RespawnPhase);
}

/**
 * Get RespawnPhase by name.
 */
export function getRespawnPhase(name: RespawnPhaseName): BukkitRespawnPhase {
  return enumValueOf(RespawnPhase, name);
}

/**
 * Safely get RespawnPhase by name.
 */
export function getRespawnPhaseSafe(name: string): BukkitRespawnPhase | null {
  const upper = name.toUpperCase();
  if (isEnumValue(RespawnPhase, upper)) {
    return enumValueOf(RespawnPhase, upper);
  }
  return null;
}

/**
 * Check if a string is a valid RespawnPhase name.
 */
export function isRespawnPhaseName(name: string): name is RespawnPhaseName {
  return isEnumValue(RespawnPhase, name.toUpperCase());
}

// ============================================
// RESPAWN PHASE CHECKS
// ============================================

/**
 * Check if no respawn is in progress.
 */
export function isNoRespawn(phase: BukkitResapwnPhase): boolean {
  return phase.name() === "NONE";
}

/**
 * Check if respawn is in progress (any phase except NONE).
 */
export function isRespawnInProgress(phase: BukkitRespawnPhase): boolean {
  return phase.name() !== "NONE";
}

/**
 * Check if respawn is starting.
 */
export function isRespawnStarting(phase: BukkitRespawnPhase): boolean {
  return phase.name() === "START";
}

/**
 * Check if pillars are being summoned.
 */
export function isSummoningPillars(phase: BukkitRespawnPhase): boolean {
  return phase.name() === "SUMMONING_PILLARS";
}

/**
 * Check if dragon is being summoned.
 */
export function isSummoningDragon(phase: BukkitRespawnPhase): boolean {
  return phase.name() === "SUMMONING_DRAGON";
}

/**
 * Check if respawn sequence just ended.
 */
export function isRespawnEnding(phase: BukkitRespawnPhase): boolean {
  return phase.name() === "END";
}

/**
 * Check if phase involves crystal beam activity.
 */
export function hasBeamActivity(phase: BukkitRespawnPhase): boolean {
  const name = phase.name();
  return name === "START" ||
         name === "PREPARING_TO_SUMMON_PILLARS" ||
         name === "SUMMONING_PILLARS" ||
         name === "SUMMONING_DRAGON";
}

// ============================================
// RESPAWN PHASE NAVIGATION
// ============================================

/**
 * Get the next phase in the respawn sequence.
 * 
 * @returns Next phase, or null if at END or NONE
 */
export function getNextPhase(phase: BukkitRespawnPhase): BukkitRespawnPhase | null {
  const name = phase.name();
  
  switch (name) {
    case "NONE":
      return null; /* No respawn in progress */
    case "START":
      return RespawnPhase.PREPARING_TO_SUMMON_PILLARS;
    case "PREPARING_TO_SUMMON_PILLARS":
      return RespawnPhase.SUMMONING_PILLARS;
    case "SUMMONING_PILLARS":
      return RespawnPhase.SUMMONING_DRAGON;
    case "SUMMONING_DRAGON":
      return RespawnPhase.END;
    case "END":
      return null; /* Sequence complete */
    default:
      return null;
  }
}

/**
 * Get the previous phase in the respawn sequence.
 * 
 * @returns Previous phase, or null if at START or NONE
 */
export function getPreviousPhase(phase: BukkitRespawnPhase): BukkitRespawnPhase | null {
  const name = phase.name();
  
  switch (name) {
    case "NONE":
      return null;
    case "START":
      return null; /* Beginning of sequence */
    case "PREPARING_TO_SUMMON_PILLARS":
      return RespawnPhase.START;
    case "SUMMONING_PILLARS":
      return RespawnPhase.PREPARING_TO_SUMMON_PILLARS;
    case "SUMMONING_DRAGON":
      return RespawnPhase.SUMMONING_PILLARS;
    case "END":
      return RespawnPhase.SUMMONING_DRAGON;
    default:
      return null;
  }
}

/**
 * Get phase index in sequence (0-5).
 * 
 * Order: NONE(0), START(1), PREPARING(2), PILLARS(3), DRAGON(4), END(5)
 */
export function getPhaseIndex(phase: BukkitRespawnPhase): number {
  return RESPAWN_PHASE_ORDER.indexOf(phase.name() as RespawnPhaseName);
}

/**
 * Compare two phases in sequence order.
 * 
 * @returns Negative if a before b, positive if after, 0 if equal
 */
export function comparePhases(
  a: BukkitRespawnPhase,
  b: BukkitRespawnPhase
): number {
  return getPhaseIndex(a) - getPhaseIndex(b);
}

// ============================================
// DRAGON BATTLE HELPERS
// ============================================

/**
 * Check if dragon is currently alive.
 */
export function isDragonAlive(battle: BukkitDragonBattle): boolean {
  return battle.getEnderDragon() !== null;
}

/**
 * Check if exit portal exists.
 */
export function hasExitPortal(battle: BukkitDragonBattle): boolean {
  return battle.getEndPortalLocation() !== null;
}

/**
 * Check if this is the first dragon fight.
 * 
 * Returns true if dragon has never been killed.
 */
export function isFirstFight(battle: BukkitDragonBattle): boolean {
  return !battle.hasBeenPreviouslyKilled();
}

/**
 * Check if respawn can be initiated.
 * 
 * Respawn requires:
 * - No dragon alive
 * - No respawn in progress
 */
export function canInitiateRespawn(battle: BukkitDragonBattle): boolean {
  return !isDragonAlive(battle) && isNoRespawn(battle.getRespawnPhase());
}

/**
 * Try to initiate respawn safely.
 * 
 * @returns true if respawn was initiated
 */
export function tryInitiateRespawn(battle: BukkitDragonBattle): boolean {
  if (!canInitiateRespawn(battle)) {
    return false;
  }
  
  battle.initiateRespawn();
  return isRespawnInProgress(battle.getRespawnPhase());
}

/**
 * Get current dragon health percentage.
 * 
 * @returns Health percentage (0-100), or null if no dragon
 */
export function getDragonHealthPercent(battle: BukkitDragonBattle): number | null {
  const dragon = battle.getEnderDragon();
  if (dragon === null) {
    return null;
  }
  
  const health = dragon.getHealth();
  const maxHealth = dragon.getMaxHealth();
  
  return (health / maxHealth) * 100;
}

// ============================================
// RESPAWN PHASE DESCRIPTIONS
// ============================================

/**
 * Get human-readable phase description.
 */
export function describePhase(phase: BukkitRespawnPhase): string {
  switch (phase.name()) {
    case "NONE":
      return "No respawn in progress";
    case "START":
      return "Crystal beams directed upward";
    case "PREPARING_TO_SUMMON_PILLARS":
      return "Preparing to regenerate pillars";
    case "SUMMONING_PILLARS":
      return "Regenerating pillar crystals";
    case "SUMMONING_DRAGON":
      return "Summoning the dragon";
    case "END":
      return "Dragon has been summoned";
    default:
      return phase.name();
  }
}

/**
 * Get phase display name.
 */
export function getPhaseDisplayName(phase: BukkitRespawnPhase): string {
  const name = phase.name();
  
  /* Convert PREPARING_TO_SUMMON_PILLARS to "Preparing To Summon Pillars" */
  return name
    .split("_")
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

// ============================================
// BATTLE STATE INFO
// ============================================

/**
 * Get complete battle state summary.
 */
export function getBattleState(battle: BukkitDragonBattle): {
  dragonAlive: boolean;
  dragonHealth: number | null;
  dragonHealthPercent: number | null;
  hasPortal: boolean;
  portalLocation: BukkitLocation | null;
  firstKillPending: boolean;
  respawnPhase: RespawnPhaseName;
  respawnInProgress: boolean;
} {
  const dragon = battle.getEnderDragon();
  const portalLoc = battle.getEndPortalLocation();
  const phase = battle.getRespawnPhase();
  
  return {
    dragonAlive: dragon !== null,
    dragonHealth: dragon?.getHealth() ?? null,
    dragonHealthPercent: getDragonHealthPercent(battle),
    hasPortal: portalLoc !== null,
    portalLocation: portalLoc,
    firstKillPending: !battle.hasBeenPreviouslyKilled(),
    respawnPhase: phase.name() as RespawnPhaseName,
    respawnInProgress: isRespawnInProgress(phase),
  };
}

/**
 * Get respawn progress (0-100%).
 * 
 * @returns Progress percentage, or null if not respawning
 */
export function getRespawnProgress(battle: BukkitDragonBattle): number | null {
  const phase = battle.getRespawnPhase();
  
  if (isNoRespawn(phase)) {
    return null;
  }
  
  const index = getPhaseIndex(phase);
  /* START=1 to END=5, so progress = (index-1)/4 * 100 */
  return ((index - 1) / 4) * 100;
}

/**
 * Describe current battle state.
 */
export function describeBattleState(battle: BukkitDragonBattle): string {
  const dragon = battle.getEnderDragon();
  const phase = battle.getRespawnPhase();
  
  if (dragon !== null) {
    const healthPercent = getDragonHealthPercent(battle)?.toFixed(1);
    return `Dragon alive (${healthPercent}% health)`;
  }
  
  if (isRespawnInProgress(phase)) {
    return `Respawning: ${describePhase(phase)}`;
  }
  
  if (battle.hasBeenPreviouslyKilled()) {
    return "Dragon defeated, awaiting respawn";
  }
  
  return "First dragon not yet spawned";
}