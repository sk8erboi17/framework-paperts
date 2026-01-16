/**
 * DESIGN
 * ------
 * StructureType represents the type/category of a Structure.
 * 
 * STRUCTURE TYPE vs STRUCTURE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │              STRUCTURE TYPE HIERARCHY                       │
 *   │                                                             │
 *   │   StructureType (category)     Structure (specific)         │
 *   │   ─────────────────────────    ──────────────────────       │
 *   │                                                             │
 *   │   JIGSAW ───────────────────── VILLAGE_PLAINS               │
 *   │                           ├─── VILLAGE_DESERT               │
 *   │                           ├─── VILLAGE_SAVANNA              │
 *   │                           ├─── VILLAGE_SNOWY                │
 *   │                           ├─── VILLAGE_TAIGA                │
 *   │                           ├─── PILLAGER_OUTPOST             │
 *   │                           ├─── BASTION_REMNANT              │
 *   │                           ├─── ANCIENT_CITY                 │
 *   │                           ├─── TRAIL_RUINS                  │
 *   │                           └─── TRIAL_CHAMBERS               │
 *   │                                                             │
 *   │   MINESHAFT ───────────────── MINESHAFT                     │
 *   │                           └─── MINESHAFT_MESA               │
 *   │                                                             │
 *   │   OCEAN_RUIN ─────────────── OCEAN_RUIN_COLD                │
 *   │                           └─── OCEAN_RUIN_WARM              │
 *   │                                                             │
 *   │   SHIPWRECK ──────────────── SHIPWRECK                      │
 *   │                           └─── SHIPWRECK_BEACHED            │
 *   │                                                             │
 *   │   RUINED_PORTAL ──────────── RUINED_PORTAL                  │
 *   │                           ├─── RUINED_PORTAL_DESERT         │
 *   │                           ├─── RUINED_PORTAL_JUNGLE         │
 *   │                           ├─── RUINED_PORTAL_SWAMP          │
 *   │                           ├─── RUINED_PORTAL_MOUNTAIN       │
 *   │                           ├─── RUINED_PORTAL_OCEAN          │
 *   │                           └─── RUINED_PORTAL_NETHER         │
 *   │                                                             │
 *   │   (1:1 mappings)                                            │
 *   │   DESERT_PYRAMID ─────────── DESERT_PYRAMID                 │
 *   │   JUNGLE_TEMPLE ──────────── JUNGLE_PYRAMID                 │
 *   │   IGLOO ──────────────────── IGLOO                          │
 *   │   SWAMP_HUT ──────────────── SWAMP_HUT                      │
 *   │   STRONGHOLD ─────────────── STRONGHOLD                     │
 *   │   FORTRESS ───────────────── FORTRESS                       │
 *   │   END_CITY ───────────────── END_CITY                       │
 *   │   WOODLAND_MANSION ───────── MANSION                        │
 *   │   OCEAN_MONUMENT ─────────── MONUMENT                       │
 *   │   BURIED_TREASURE ────────── BURIED_TREASURE                │
 *   │   NETHER_FOSSIL ──────────── NETHER_FOSSIL                  │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * JIGSAW STRUCTURE TYPE:
 * - Used for procedurally generated structures
 * - Villages, bastions, pillager outposts
 * - Composed of smaller structure pieces
 * - Most flexible and common type
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/generator/structure/StructureType.html
 */

import { BukkitNamespacedKey } from "../../items/types/namespacedKey";


// ============================================
// INTERFACE
// ============================================

/**
 * The type/category of a structure.
 * 
 * Multiple structures can share the same type.
 * For example, all villages use the JIGSAW type.
 */
export interface BukkitStructureType {
  /**
   * Get the namespaced key.
   * 
   * @returns NamespacedKey
   * @deprecated Use getKeyOrThrow() instead
   */
  getKey(): BukkitNamespacedKey;

  /**
   * Get the namespaced key or null.
   * 
   * @returns NamespacedKey or null if not registered
   */
  getKeyOrNull(): BukkitNamespacedKey | null;

  /**
   * Get the namespaced key or throw.
   * 
   * @returns NamespacedKey
   * @throws If not registered
   */
  getKeyOrThrow(): BukkitNamespacedKey;

  /**
   * Check if structure type is registered.
   * 
   * @returns true if registered in a registry
   */
  isRegistered(): boolean;
}

/**
 * StructureType class with static fields for all vanilla types.
 */
export interface BukkitStructureTypeClass {
  /** Buried treasure chests */
  readonly BURIED_TREASURE: BukkitStructureType;

  /** Desert pyramid/temple */
  readonly DESERT_PYRAMID: BukkitStructureType;

  /** End city with shulkers */
  readonly END_CITY: BukkitStructureType;

  /** Nether fortress */
  readonly FORTRESS: BukkitStructureType;

  /** Snowy igloo */
  readonly IGLOO: BukkitStructureType;

  /** Jigsaw-based structures (villages, bastions, etc.) */
  readonly JIGSAW: BukkitStructureType;

  /** Jungle temple/pyramid */
  readonly JUNGLE_TEMPLE: BukkitStructureType;

  /** Abandoned mineshaft */
  readonly MINESHAFT: BukkitStructureType;

  /** Nether bone fossil */
  readonly NETHER_FOSSIL: BukkitStructureType;

  /** Ocean monument (guardian temple) */
  readonly OCEAN_MONUMENT: BukkitStructureType;

  /** Underwater ocean ruins */
  readonly OCEAN_RUIN: BukkitStructureType;

  /** Ruined nether portal */
  readonly RUINED_PORTAL: BukkitStructureType;

  /** Sunken/beached shipwreck */
  readonly SHIPWRECK: BukkitStructureType;

  /** End portal stronghold */
  readonly STRONGHOLD: BukkitStructureType;

  /** Witch hut in swamp */
  readonly SWAMP_HUT: BukkitStructureType;

  /** Woodland mansion */
  readonly WOODLAND_MANSION: BukkitStructureType;
}

/**
 * Access to StructureType class.
 */
export const StructureType: BukkitStructureTypeClass = org.bukkit.generator.structure.StructureType;

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All vanilla structure type names.
 */
export type StructureTypeName =
  | "BURIED_TREASURE"
  | "DESERT_PYRAMID"
  | "END_CITY"
  | "FORTRESS"
  | "IGLOO"
  | "JIGSAW"
  | "JUNGLE_TEMPLE"
  | "MINESHAFT"
  | "NETHER_FOSSIL"
  | "OCEAN_MONUMENT"
  | "OCEAN_RUIN"
  | "RUINED_PORTAL"
  | "SHIPWRECK"
  | "STRONGHOLD"
  | "SWAMP_HUT"
  | "WOODLAND_MANSION";

/**
 * All structure type names as array.
 */
export const STRUCTURE_TYPE_NAMES: readonly StructureTypeName[] = [
  "BURIED_TREASURE",
  "DESERT_PYRAMID",
  "END_CITY",
  "FORTRESS",
  "IGLOO",
  "JIGSAW",
  "JUNGLE_TEMPLE",
  "MINESHAFT",
  "NETHER_FOSSIL",
  "OCEAN_MONUMENT",
  "OCEAN_RUIN",
  "RUINED_PORTAL",
  "SHIPWRECK",
  "STRONGHOLD",
  "SWAMP_HUT",
  "WOODLAND_MANSION",
] as const;

// ============================================
// CATEGORIZATION
// ============================================

/**
 * Overworld structure types.
 */
export const OVERWORLD_STRUCTURE_TYPES: readonly StructureTypeName[] = [
  "BURIED_TREASURE",
  "DESERT_PYRAMID",
  "IGLOO",
  "JIGSAW",
  "JUNGLE_TEMPLE",
  "MINESHAFT",
  "OCEAN_MONUMENT",
  "OCEAN_RUIN",
  "RUINED_PORTAL",
  "SHIPWRECK",
  "STRONGHOLD",
  "SWAMP_HUT",
  "WOODLAND_MANSION",
] as const;

/**
 * Nether structure types.
 */
export const NETHER_STRUCTURE_TYPES: readonly StructureTypeName[] = [
  "FORTRESS",
  "NETHER_FOSSIL",
  "RUINED_PORTAL",
  "JIGSAW", /* Bastions use JIGSAW */
] as const;

/**
 * End structure types.
 */
export const END_STRUCTURE_TYPES: readonly StructureTypeName[] = [
  "END_CITY",
] as const;

/**
 * Structure types that use jigsaw generation.
 */
export const JIGSAW_BASED_TYPES: readonly StructureTypeName[] = [
  "JIGSAW",
] as const;

/**
 * Structure types with multiple variants.
 */
export const MULTI_VARIANT_TYPES: readonly StructureTypeName[] = [
  "JIGSAW",
  "MINESHAFT",
  "OCEAN_RUIN",
  "SHIPWRECK",
  "RUINED_PORTAL",
] as const;

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a StructureType.
 */
export function isStructureType(obj: any): obj is BukkitStructureType {
  return obj !== null &&
         typeof obj === "object" &&
         (typeof obj.getKey === "function" || typeof obj.getKeyOrThrow === "function");
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get structure type by name.
 */
export function getStructureType(name: StructureTypeName): BukkitStructureType {
  return StructureType[name];
}

/**
 * Get structure type by name safely.
 * 
 * @returns StructureType or null if not found
 */
export function getStructureTypeSafe(name: string): BukkitStructureType | null {
  const upper = name.toUpperCase() as StructureTypeName;
  return StructureType[upper] ?? null;
}

/**
 * Check if a name is a valid structure type name.
 */
export function isStructureTypeName(name: string): name is StructureTypeName {
  return STRUCTURE_TYPE_NAMES.includes(name.toUpperCase() as StructureTypeName);
}

/**
 * Get all vanilla structure types.
 */
export function getAllStructureTypes(): BukkitStructureType[] {
  return STRUCTURE_TYPE_NAMES.map(name => StructureType[name]);
}

// ============================================
// KEY UTILITIES
// ============================================

/**
 * Get structure type key name.
 */
export function getStructureTypeKeyName(type: BukkitStructureType): string | null {
  try {
    const key = type.getKeyOrNull();
    if (key === null) return null;
    return key.getKey().toUpperCase();
  } catch {
    return null;
  }
}

/**
 * Get structure type key as string.
 */
export function getStructureTypeKeyString(type: BukkitStructureType): string | null {
  try {
    return type.getKeyOrThrow().toString();
  } catch {
    return null;
  }
}

/**
 * Check if structure type is vanilla.
 */
export function isVanillaStructureType(type: BukkitStructureType): boolean {
  try {
    const key = type.getKeyOrNull();
    return key !== null && key.getNamespace() === "minecraft";
  } catch {
    return false;
  }
}

/**
 * Check if structure type is custom.
 */
export function isCustomStructureType(type: BukkitStructureType): boolean {
  return !isVanillaStructureType(type);
}

// ============================================
// TYPE CHECKS
// ============================================

/**
 * Check if structure type is jigsaw-based.
 */
export function isJigsawType(type: BukkitStructureType): boolean {
  const key = getStructureTypeKeyName(type);
  return key === "JIGSAW";
}

/**
 * Check if structure type has multiple variants.
 */
export function hasMultipleVariants(type: BukkitStructureType): boolean {
  const key = getStructureTypeKeyName(type);
  return key !== null && MULTI_VARIANT_TYPES.includes(key as StructureTypeName);
}

/**
 * Check if structure type is Nether-specific.
 */
export function isNetherType(type: BukkitStructureType): boolean {
  const key = getStructureTypeKeyName(type);
  return key === "FORTRESS" || key === "NETHER_FOSSIL";
}

/**
 * Check if structure type is End-specific.
 */
export function isEndType(type: BukkitStructureType): boolean {
  const key = getStructureTypeKeyName(type);
  return key === "END_CITY";
}

/**
 * Check if structure type is underground.
 */
export function isUndergroundType(type: BukkitStructureType): boolean {
  const key = getStructureTypeKeyName(type);
  return key === "MINESHAFT" || key === "STRONGHOLD" || key === "BURIED_TREASURE";
}

/**
 * Check if structure type is ocean-related.
 */
export function isOceanType(type: BukkitStructureType): boolean {
  const key = getStructureTypeKeyName(type);
  return key === "OCEAN_MONUMENT" || key === "OCEAN_RUIN" || key === "SHIPWRECK";
}

// ============================================
// DISPLAY NAMES
// ============================================

/**
 * Display names for structure types.
 */
export const STRUCTURE_TYPE_DISPLAY_NAMES: Record<StructureTypeName, string> = {
  BURIED_TREASURE: "Buried Treasure",
  DESERT_PYRAMID: "Desert Pyramid",
  END_CITY: "End City",
  FORTRESS: "Nether Fortress",
  IGLOO: "Igloo",
  JIGSAW: "Jigsaw Structure",
  JUNGLE_TEMPLE: "Jungle Temple",
  MINESHAFT: "Mineshaft",
  NETHER_FOSSIL: "Nether Fossil",
  OCEAN_MONUMENT: "Ocean Monument",
  OCEAN_RUIN: "Ocean Ruins",
  RUINED_PORTAL: "Ruined Portal",
  SHIPWRECK: "Shipwreck",
  STRONGHOLD: "Stronghold",
  SWAMP_HUT: "Swamp Hut",
  WOODLAND_MANSION: "Woodland Mansion",
};

/**
 * Get display name for structure type.
 */
export function getStructureTypeDisplayName(type: BukkitStructureType): string {
  const key = getStructureTypeKeyName(type);
  if (key === null) return "Unknown Type";
  return STRUCTURE_TYPE_DISPLAY_NAMES[key as StructureTypeName] ?? key;
}

/**
 * Descriptions for structure types.
 */
export const STRUCTURE_TYPE_DESCRIPTIONS: Record<StructureTypeName, string> = {
  BURIED_TREASURE: "Chest buried on beaches, found with treasure maps",
  DESERT_PYRAMID: "Sandstone pyramid with loot and TNT trap",
  END_CITY: "Tall purpur towers with shulkers and elytra",
  FORTRESS: "Nether brick structure with blaze spawners",
  IGLOO: "Snow structure with secret basement",
  JIGSAW: "Procedurally assembled from smaller pieces",
  JUNGLE_TEMPLE: "Cobblestone temple with lever puzzles",
  MINESHAFT: "Underground wooden tunnels with rails",
  NETHER_FOSSIL: "Bone block formations in soul sand valleys",
  OCEAN_MONUMENT: "Prismarine structure guarded by guardians",
  OCEAN_RUIN: "Underwater stone ruins with drowned",
  RUINED_PORTAL: "Damaged nether portal with loot chest",
  SHIPWRECK: "Sunken or beached ship with treasure",
  STRONGHOLD: "Underground fortress with end portal",
  SWAMP_HUT: "Small hut where witches spawn",
  WOODLAND_MANSION: "Large dark oak mansion with illagers",
};

/**
 * Get description for structure type.
 */
export function getStructureTypeDescription(type: BukkitStructureType): string {
  const key = getStructureTypeKeyName(type);
  if (key === null) return "Unknown structure type";
  return STRUCTURE_TYPE_DESCRIPTIONS[key as StructureTypeName] ?? "No description available";
}

// ============================================
// COMPARISON
// ============================================

/**
 * Check if two structure types are the same.
 */
export function isSameStructureType(
  type1: BukkitStructureType,
  type2: BukkitStructureType
): boolean {
  const key1 = getStructureTypeKeyString(type1);
  const key2 = getStructureTypeKeyString(type2);
  return key1 !== null && key1 === key2;
}

/**
 * Compare structure types by key.
 */
export function compareStructureTypes(
  type1: BukkitStructureType,
  type2: BukkitStructureType
): number {
  const key1 = getStructureTypeKeyName(type1) ?? "";
  const key2 = getStructureTypeKeyName(type2) ?? "";
  return key1.localeCompare(key2);
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a structure type.
 */
export function describeStructureType(type: BukkitStructureType): string {
  const displayName = getStructureTypeDisplayName(type);
  const isVanilla = isVanillaStructureType(type);
  return `${displayName}${isVanilla ? "" : " (custom)"}`;
}

/**
 * Get structure type info as plain object.
 */
export function getStructureTypeInfo(type: BukkitStructureType): {
  key: string | null;
  displayName: string;
  description: string;
  isVanilla: boolean;
  isJigsaw: boolean;
  hasVariants: boolean;
  isUnderground: boolean;
  isOcean: boolean;
  isNether: boolean;
  isEnd: boolean;
} {
  return {
    key: getStructureTypeKeyString(type),
    displayName: getStructureTypeDisplayName(type),
    description: getStructureTypeDescription(type),
    isVanilla: isVanillaStructureType(type),
    isJigsaw: isJigsawType(type),
    hasVariants: hasMultipleVariants(type),
    isUnderground: isUndergroundType(type),
    isOcean: isOceanType(type),
    isNether: isNetherType(type),
    isEnd: isEndType(type),
  };
}

/**
 * Get summary of structure type list.
 */
export function getStructureTypeSummary(types: BukkitStructureType[]): {
  total: number;
  vanilla: number;
  custom: number;
  jigsaw: number;
  underground: number;
  ocean: number;
  nether: number;
  end: number;
} {
  let vanilla = 0;
  let custom = 0;
  let jigsaw = 0;
  let underground = 0;
  let ocean = 0;
  let nether = 0;
  let end = 0;

  for (const type of types) {
    if (isVanillaStructureType(type)) {
      vanilla++;
    } else {
      custom++;
    }

    if (isJigsawType(type)) jigsaw++;
    if (isUndergroundType(type)) underground++;
    if (isOceanType(type)) ocean++;
    if (isNetherType(type)) nether++;
    if (isEndType(type)) end++;
  }

  return {
    total: types.length,
    vanilla,
    custom,
    jigsaw,
    underground,
    ocean,
    nether,
    end,
  };
}