/**
 * DESIGN
 * ------
 * FeatureFlag represents experimental features that can be enabled per-world.
 * 
 * Feature flags allow players to test upcoming features before they're
 * officially released. They can be enabled when creating a new world.
 * 
 * FEATURE FLAG LIFECYCLE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    FEATURE FLAG LIFECYCLE                   │
 *   │                                                             │
 *   │   1. EXPERIMENTAL  →  Flag added, opt-in testing           │
 *   │   2. ACTIVE        →  Flag available, features testable    │
 *   │   3. RELEASED      →  Features merged into vanilla         │
 *   │   4. DEPRECATED    →  Flag removed, returns null           │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * CURRENT FLAGS (as of 1.21.4+):
 * 
 *   VANILLA             │ Base game, always enabled
 *   ────────────────────┼────────────────────────────────────────
 *   TRADE_REBALANCE     │ Villager trade rebalancing experiments
 *   REDSTONE_EXPERIMENTS│ New redstone mechanics testing
 *   MINECART_IMPROVEMENTS│ New minecart movement algorithm
 * 
 * DEPRECATED FLAGS (removed):
 * 
 *   Flag          │ Available     │ Removed
 *   ──────────────┼───────────────┼─────────────
 *   UPDATE_1_20   │ 1.19 - 1.19.4 │ 1.20
 *   UPDATE_121    │ 1.20.5 - 1.20.6│ 1.21
 *   BUNDLE        │ 1.19.3 - 1.21.1│ 1.21.2
 *   WINTER_DROP   │ 1.21.2 - 1.21.3│ 1.21.4
 * 
 * HOW TO USE:
 * 
 *   // When creating a world
 *   WorldCreator creator = new WorldCreator("test_world");
 *   creator.featureFlags(FeatureFlag.TRADE_REBALANCE);
 *   World world = creator.createWorld();
 * 
 *   // Check if world has flag enabled
 *   boolean hasFlag = world.getFeatureFlags().contains(FeatureFlag.TRADE_REBALANCE);
 * 
 * NOTE: Deprecated flags may be null at runtime if not available
 * in the current server version. Always null-check deprecated flags.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/FeatureFlag.html
 */

import { BukkitNamespacedKey } from "../../items/types/namespacedKey";


// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Currently active feature flag names.
 */
export type ActiveFeatureFlagKey =
  | "VANILLA"
  | "TRADE_REBALANCE"
  | "REDSTONE_EXPERIMENTS"
  | "MINECART_IMPROVEMENTS";

/**
 * Deprecated feature flag names (may be null at runtime).
 */
export type DeprecatedFeatureFlagKey =
  | "BUNDLE"
  | "UPDATE_1_20"
  | "UPDATE_121"
  | "WINTER_DROP";

/**
 * All feature flag names.
 */
export type FeatureFlagKey = ActiveFeatureFlagKey | DeprecatedFeatureFlagKey;

/**
 * FeatureFlag interface.
 */
export interface BukkitFeatureFlag {
  /**
   * Get the namespaced key for this feature flag.
   * 
   * @example
   * FeatureFlag.VANILLA.getKey(); // minecraft:vanilla
   */
  getKey(): BukkitNamespacedKey;
}

/**
 * FeatureFlag static interface with all constants.
 */
export interface FeatureFlagStatic {
  /* ========== ACTIVE FLAGS ========== */

  /**
   * Base vanilla game features.
   * 
   * Always enabled, represents the standard game.
   */
  VANILLA: BukkitFeatureFlag;

  /**
   * Villager trade rebalancing experiments.
   * 
   * Changes to villager trades, pricing, and availability.
   * Part of ongoing game balance adjustments.
   */
  TRADE_REBALANCE: BukkitFeatureFlag;

  /**
   * Redstone experiment features.
   * 
   * New redstone mechanics and behavior changes.
   */
  REDSTONE_EXPERIMENTS: BukkitFeatureFlag;

  /**
   * Minecart movement improvements.
   * 
   * New movement algorithm for minecarts.
   * Includes MAX_MINECART_SPEED game rule.
   */
  MINECART_IMPROVEMENTS: BukkitFeatureFlag;

  /* ========== DEPRECATED FLAGS ========== */

  /**
   * Bundle item feature.
   * 
   * @deprecated Not available since 1.21.2. May be null.
   * Available between: 1.19.3 - 1.21.1
   * 
   * Bundles are now part of vanilla game.
   */
  BUNDLE: BukkitFeatureFlag | null;

  /**
   * 1.20 update preview features.
   * 
   * @deprecated Not available since 1.20. May be null.
   * Available between: 1.19 - 1.19.4
   * 
   * Features merged into 1.20 release.
   */
  UPDATE_1_20: BukkitFeatureFlag | null;

  /**
   * 1.21 update preview features.
   * 
   * @deprecated Not available since 1.21. May be null.
   * Available between: 1.20.5 - 1.20.6
   * 
   * Features merged into 1.21 release.
   */
  UPDATE_121: BukkitFeatureFlag | null;

  /**
   * Winter drop (1.21.4) preview features.
   * 
   * @deprecated Not available since 1.21.4. May be null.
   * Available between: 1.21.2 - 1.21.3
   * 
   * Features merged into 1.21.4 release.
   */
  WINTER_DROP: BukkitFeatureFlag | null;
}

// ============================================
// ENUM EXPORT
// ============================================

/**
 * All Minecraft feature flags.
 * 
 * Feature flags enable experimental features per-world.
 * 
 * ACTIVE FLAGS:
 * - VANILLA: Base game (always enabled)
 * - TRADE_REBALANCE: Villager trade experiments
 * - REDSTONE_EXPERIMENTS: Redstone mechanics testing
 * - MINECART_IMPROVEMENTS: New minecart movement
 * 
 * DEPRECATED FLAGS (may be null):
 * - BUNDLE: Removed in 1.21.2 (bundles now in vanilla)
 * - UPDATE_1_20: Removed in 1.20
 * - UPDATE_121: Removed in 1.21
 * - WINTER_DROP: Removed in 1.21.4
 * 
 * @example
 * // Create world with experimental features
 * const creator = new WorldCreator("test");
 * creator.featureFlags(FeatureFlag.TRADE_REBALANCE);
 * const world = creator.createWorld();
 * 
 * @example
 * // Check if world has feature enabled
 * if (world.getFeatureFlags().contains(FeatureFlag.MINECART_IMPROVEMENTS)) {
 *   // Minecart improvements are enabled
 * }
 */
export const FeatureFlag: FeatureFlagStatic = org.bukkit.FeatureFlag;

// ============================================
// KEY ARRAYS
// ============================================

/**
 * All active (non-deprecated) feature flag keys.
 */
export const ACTIVE_FEATURE_FLAG_KEYS: ActiveFeatureFlagKey[] = [
  "VANILLA",
  "TRADE_REBALANCE",
  "REDSTONE_EXPERIMENTS",
  "MINECART_IMPROVEMENTS",
];

/**
 * All deprecated feature flag keys.
 * 
 * These may be null at runtime.
 */
export const DEPRECATED_FEATURE_FLAG_KEYS: DeprecatedFeatureFlagKey[] = [
  "BUNDLE",
  "UPDATE_1_20",
  "UPDATE_121",
  "WINTER_DROP",
];

/**
 * All feature flag keys.
 */
export const FEATURE_FLAG_KEYS: FeatureFlagKey[] = [
  ...ACTIVE_FEATURE_FLAG_KEYS,
  ...DEPRECATED_FEATURE_FLAG_KEYS,
];

// ============================================
// DEPRECATION INFO
// ============================================

/**
 * Information about deprecated feature flags.
 */
export interface DeprecationInfo {
  /** Version when flag was removed */
  removedIn: string;
  /** First version flag was available */
  availableFrom: string;
  /** Last version flag was available */
  availableUntil: string;
  /** Reason for deprecation */
  reason: string;
}

/**
 * Deprecation details for removed feature flags.
 */
export const DEPRECATION_INFO: Record<DeprecatedFeatureFlagKey, DeprecationInfo> = {
  BUNDLE: {
    removedIn: "1.21.2",
    availableFrom: "1.19.3",
    availableUntil: "1.21.1",
    reason: "Bundles are now part of vanilla game",
  },
  UPDATE_1_20: {
    removedIn: "1.20",
    availableFrom: "1.19",
    availableUntil: "1.19.4",
    reason: "Features merged into 1.20 release",
  },
  UPDATE_121: {
    removedIn: "1.21",
    availableFrom: "1.20.5",
    availableUntil: "1.20.6",
    reason: "Features merged into 1.21 release",
  },
  WINTER_DROP: {
    removedIn: "1.21.4",
    availableFrom: "1.21.2",
    availableUntil: "1.21.3",
    reason: "Features merged into 1.21.4 release",
  },
};

// ============================================
// UTILITIES
// ============================================

/**
 * Get all available (non-null) feature flags.
 * 
 * Filters out deprecated flags that are null.
 */
export function getAvailableFeatureFlags(): BukkitFeatureFlag[] {
  const flags: BukkitFeatureFlag[] = [];
  
  for (const key of FEATURE_FLAG_KEYS) {
    const flag = (FeatureFlag as any)[key];
    if (flag !== null && flag !== undefined) {
      flags.push(flag);
    }
  }
  
  return flags;
}

/**
 * Get all active (non-deprecated) feature flags.
 */
export function getActiveFeatureFlags(): BukkitFeatureFlag[] {
  return ACTIVE_FEATURE_FLAG_KEYS.map(key => (FeatureFlag as any)[key]);
}

/**
 * Get feature flag by name (safe).
 * 
 * @returns FeatureFlag or null if not found/available
 */
export function getFeatureFlagByName(name: string): BukkitFeatureFlag | null {
  const upper = name.toUpperCase() as FeatureFlagKey;
  
  if (!FEATURE_FLAG_KEYS.includes(upper)) {
    return null;
  }
  
  const flag = (FeatureFlag as any)[upper];
  return flag ?? null;
}

/**
 * Check if string is valid feature flag name.
 */
export function isValidFeatureFlag(name: string): name is FeatureFlagKey {
  return FEATURE_FLAG_KEYS.includes(name.toUpperCase() as FeatureFlagKey);
}

/**
 * Check if feature flag is active (non-deprecated).
 */
export function isActiveFeatureFlag(name: string): name is ActiveFeatureFlagKey {
  return ACTIVE_FEATURE_FLAG_KEYS.includes(name.toUpperCase() as ActiveFeatureFlagKey);
}

/**
 * Check if feature flag is deprecated.
 */
export function isDeprecatedFeatureFlag(name: string): name is DeprecatedFeatureFlagKey {
  return DEPRECATED_FEATURE_FLAG_KEYS.includes(name.toUpperCase() as DeprecatedFeatureFlagKey);
}

/**
 * Check if feature flag is available at runtime.
 * 
 * Deprecated flags may be null if not supported by current version.
 */
export function isFeatureFlagAvailable(name: string): boolean {
  const flag = getFeatureFlagByName(name);
  return flag !== null;
}

/**
 * Get deprecation info for a feature flag.
 * 
 * @returns DeprecationInfo or null if flag is not deprecated
 */
export function getDeprecationInfo(name: string): DeprecationInfo | null {
  const upper = name.toUpperCase() as DeprecatedFeatureFlagKey;
  return DEPRECATION_INFO[upper] ?? null;
}

// ============================================
// FLAG CHECKS
// ============================================

/**
 * Check if flag is VANILLA.
 */
export function isVanilla(flag: BukkitFeatureFlag): boolean {
  return flag.getKey().getKey() === "vanilla";
}

/**
 * Check if flag is TRADE_REBALANCE.
 */
export function isTradeRebalance(flag: BukkitFeatureFlag): boolean {
  return flag.getKey().getKey() === "trade_rebalance";
}

/**
 * Check if flag is REDSTONE_EXPERIMENTS.
 */
export function isRedstoneExperiments(flag: BukkitFeatureFlag): boolean {
  return flag.getKey().getKey() === "redstone_experiments";
}

/**
 * Check if flag is MINECART_IMPROVEMENTS.
 */
export function isMinecartImprovements(flag: BukkitFeatureFlag): boolean {
  return flag.getKey().getKey() === "minecart_improvements";
}

// ============================================
// CATEGORIES
// ============================================

/**
 * Experimental feature flags (non-vanilla active flags).
 */
export const EXPERIMENTAL_FLAGS: Set<ActiveFeatureFlagKey> = new Set([
  "TRADE_REBALANCE",
  "REDSTONE_EXPERIMENTS",
  "MINECART_IMPROVEMENTS",
]);

/**
 * Check if flag is experimental (not vanilla).
 */
export function isExperimental(flag: BukkitFeatureFlag): boolean {
  return !isVanilla(flag);
}

/**
 * Get all experimental (non-vanilla) feature flags.
 */
export function getExperimentalFlags(): BukkitFeatureFlag[] {
  return getActiveFeatureFlags().filter(flag => !isVanilla(flag));
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Feature flag descriptions.
 */
export const FEATURE_FLAG_DESCRIPTIONS: Record<FeatureFlagKey, string> = {
  VANILLA: "Base vanilla game features, always enabled",
  TRADE_REBALANCE: "Villager trade rebalancing experiments",
  REDSTONE_EXPERIMENTS: "New redstone mechanics and behavior testing",
  MINECART_IMPROVEMENTS: "New minecart movement algorithm with speed control",
  BUNDLE: "Bundle item (now in vanilla since 1.21.2)",
  UPDATE_1_20: "1.20 update preview features (merged into 1.20)",
  UPDATE_121: "1.21 update preview features (merged into 1.21)",
  WINTER_DROP: "Winter drop preview features (merged into 1.21.4)",
};

/**
 * Get human-readable feature flag name.
 */
export function formatFeatureFlagName(flag: BukkitFeatureFlag): string {
  const key = flag.getKey().getKey();
  return key
    .split("_")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get feature flag description.
 */
export function getFeatureFlagDescription(flag: BukkitFeatureFlag): string {
  const key = flag.getKey().getKey().toUpperCase() as FeatureFlagKey;
  return FEATURE_FLAG_DESCRIPTIONS[key] ?? "Unknown feature flag";
}

/**
 * Describe feature flag with all info.
 */
export function describeFeatureFlag(flag: BukkitFeatureFlag): string {
  const name = formatFeatureFlagName(flag);
  const key = flag.getKey().toString();
  const description = getFeatureFlagDescription(flag);
  const experimental = isExperimental(flag) ? " [EXPERIMENTAL]" : "";
  
  return `${name} (${key})${experimental}: ${description}`;
}

// ============================================
// COMPARISON
// ============================================

/**
 * Check if two feature flags are the same.
 */
export function sameFeatureFlag(a: BukkitFeatureFlag, b: BukkitFeatureFlag): boolean {
  return a.getKey().toString() === b.getKey().toString();
}

/**
 * Check if a collection contains a specific feature flag.
 */
export function containsFeatureFlag(
  flags: Iterable<BukkitFeatureFlag>,
  target: BukkitFeatureFlag
): boolean {
  for (const flag of flags) {
    if (sameFeatureFlag(flag, target)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a world has all specified feature flags.
 * 
 * @param worldFlags The flags enabled on the world
 * @param required The flags to check for
 */
export function hasAllFeatureFlags(
  worldFlags: Iterable<BukkitFeatureFlag>,
  required: BukkitFeatureFlag[]
): boolean {
  for (const req of required) {
    if (!containsFeatureFlag(worldFlags, req)) {
      return false;
    }
  }
  return true;
}

/**
 * Check if a world has any of the specified feature flags.
 */
export function hasAnyFeatureFlag(
  worldFlags: Iterable<BukkitFeatureFlag>,
  flags: BukkitFeatureFlag[]
): boolean {
  for (const flag of flags) {
    if (containsFeatureFlag(worldFlags, flag)) {
      return true;
    }
  }
  return false;
}

// ============================================
// SAFE ACCESS HELPERS
// ============================================

/**
 * Safely get VANILLA flag (always available).
 */
export function getVanillaFlag(): BukkitFeatureFlag {
  return FeatureFlag.VANILLA;
}

/**
 * Safely get TRADE_REBALANCE flag.
 */
export function getTradeRebalanceFlag(): BukkitFeatureFlag {
  return FeatureFlag.TRADE_REBALANCE;
}

/**
 * Safely get REDSTONE_EXPERIMENTS flag.
 */
export function getRedstoneExperimentsFlag(): BukkitFeatureFlag {
  return FeatureFlag.REDSTONE_EXPERIMENTS;
}

/**
 * Safely get MINECART_IMPROVEMENTS flag.
 */
export function getMinecartImprovementsFlag(): BukkitFeatureFlag {
  return FeatureFlag.MINECART_IMPROVEMENTS;
}

/**
 * Try to get BUNDLE flag (may be null on newer versions).
 * 
 * @deprecated Bundle flag removed in 1.21.2
 */
export function getBundleFlagIfAvailable(): BukkitFeatureFlag | null {
  return FeatureFlag.BUNDLE;
}

/**
 * Get all flags needed for full experimental experience.
 */
export function getAllExperimentalFlags(): BukkitFeatureFlag[] {
  return [
    FeatureFlag.TRADE_REBALANCE,
    FeatureFlag.REDSTONE_EXPERIMENTS,
    FeatureFlag.MINECART_IMPROVEMENTS,
  ];
}