/**
 * DESIGN
 * ------
 * Structure represents a generated structure in the world.
 * 
 * STRUCTURE CATEGORIES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    OVERWORLD STRUCTURES                     │
 *   │                                                             │
 *   │   ┌─────────────────┐  ┌─────────────────┐                  │
 *   │   │    VILLAGES     │  │    TEMPLES      │                  │
 *   │   │                 │  │                 │                  │
 *   │   │     Plains      │  │     Desert      │                  │
 *   │   │     Desert      │  │     Jungle      │                  │
 *   │   │     Savanna     │  │     Swamp Hut   │                  │
 *   │   │     Snowy       │  │     Igloo       │                  │
 *   │   │     Taiga       │  │                 │                  │
 *   │   └─────────────────┘  └─────────────────┘                  │
 *   │                                                             │
 *   │   ┌─────────────────┐  ┌─────────────────┐                  │
 *   │   │   UNDERGROUND   │  │     OCEAN       │                  │
 *   │   │                 │  │                 │                  │
 *   │   │     Mineshaft   │  │     Shipwreck   │                  │
 *   │   │     Stronghold  │  │     Monument    │                  │
 *   │   │     Ancient City│  │     Ocean Ruin  │                  │
 *   │   │    Trial Chamber│  │     Buried Tre. │                  │
 *   │   │     Trail Ruins │  │                 │                  │
 *   │   └─────────────────┘  └─────────────────┘                  │
 *   │                                                             │
 *   │   ┌─────────────────┐  ┌─────────────────┐                  │
 *   │   │    SURFACE      │  │  RUINED PORTAL  │                  │
 *   │   │                 │  │                 │                  │
 *   │   │     Mansion     │  │     Standard    │                  │
 *   │   │     Outpost     │  │     Desert      │                  │
 *   │   │                 │  │     Jungle      │                  │
 *   │   │                 │  │     Mountain    │                  │
 *   │   │                 │  │     Ocean       │                  │
 *   │   │                 │  │     Swamp       │                  │
 *   │   └─────────────────┘  └─────────────────┘                  │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    NETHER STRUCTURES                        │
 *   │                                                             │
 *   │      Fortress       - Blaze spawners, wither skeletons      │
 *   │      Bastion        - Piglin loot, gold blocks              │
 *   │      Nether Fossil  - Bone block formations                 │
 *   │      Ruined Portal  - Nether variant                        │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                     END STRUCTURES                          │
 *   │                                                             │
 *   │      End City       - Shulkers, elytra, end ship            │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/generator/structure/Structure.html
 */

import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { BukkitStructureType } from "../enums/structureType";


// ============================================
// INTERFACE
// ============================================

/**
 * A world structure like villages, temples, or dungeons.
 * 
 * Structures are registered in Registry.STRUCTURE.
 * Custom structures can be added via data packs.
 */
export interface BukkitStructure {
  /**
   * Get the structure type.
   * 
   * @returns StructureType of this structure
   * 
   * @example
   * const type = structure.getStructureType();
   * console.log(`Type: ${type.getKey()}`);
   */
  getStructureType(): BukkitStructureType;

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
   * @throws If structure is not registered
   */
  getKeyOrThrow(): BukkitNamespacedKey;

  /**
   * Check if structure is registered.
   * 
   * @returns true if registered in a registry
   */
  isRegistered(): boolean;
}

/**
 * Structure class with static fields for all vanilla structures.
 */
export interface BukkitStructureClass {
  /* Villages */
  readonly VILLAGE_PLAINS: BukkitStructure;
  readonly VILLAGE_DESERT: BukkitStructure;
  readonly VILLAGE_SAVANNA: BukkitStructure;
  readonly VILLAGE_SNOWY: BukkitStructure;
  readonly VILLAGE_TAIGA: BukkitStructure;

  /* Temples & Huts */
  readonly DESERT_PYRAMID: BukkitStructure;
  readonly JUNGLE_PYRAMID: BukkitStructure;
  readonly SWAMP_HUT: BukkitStructure;
  readonly IGLOO: BukkitStructure;

  /* Underground */
  readonly MINESHAFT: BukkitStructure;
  readonly MINESHAFT_MESA: BukkitStructure;
  readonly STRONGHOLD: BukkitStructure;
  readonly ANCIENT_CITY: BukkitStructure;
  readonly TRAIL_RUINS: BukkitStructure;
  readonly TRIAL_CHAMBERS: BukkitStructure;

  /* Ocean */
  readonly SHIPWRECK: BukkitStructure;
  readonly SHIPWRECK_BEACHED: BukkitStructure;
  readonly MONUMENT: BukkitStructure;
  readonly OCEAN_RUIN_COLD: BukkitStructure;
  readonly OCEAN_RUIN_WARM: BukkitStructure;
  readonly BURIED_TREASURE: BukkitStructure;

  /* Surface */
  readonly MANSION: BukkitStructure;
  readonly PILLAGER_OUTPOST: BukkitStructure;

  /* Ruined Portals */
  readonly RUINED_PORTAL: BukkitStructure;
  readonly RUINED_PORTAL_DESERT: BukkitStructure;
  readonly RUINED_PORTAL_JUNGLE: BukkitStructure;
  readonly RUINED_PORTAL_SWAMP: BukkitStructure;
  readonly RUINED_PORTAL_MOUNTAIN: BukkitStructure;
  readonly RUINED_PORTAL_OCEAN: BukkitStructure;
  readonly RUINED_PORTAL_NETHER: BukkitStructure;

  /* Nether */
  readonly FORTRESS: BukkitStructure;
  readonly BASTION_REMNANT: BukkitStructure;
  readonly NETHER_FOSSIL: BukkitStructure;

  /* End */
  readonly END_CITY: BukkitStructure;
}

/**
 * Access to Structure class.
 */
export const Structure: BukkitStructureClass = org.bukkit.generator.structure.Structure;

// ============================================
// STRUCTURE NAMES
// ============================================

/**
 * All vanilla structure names.
 */
export type StructureName =
  /* Villages */
  | "VILLAGE_PLAINS"
  | "VILLAGE_DESERT"
  | "VILLAGE_SAVANNA"
  | "VILLAGE_SNOWY"
  | "VILLAGE_TAIGA"
  /* Temples */
  | "DESERT_PYRAMID"
  | "JUNGLE_PYRAMID"
  | "SWAMP_HUT"
  | "IGLOO"
  /* Underground */
  | "MINESHAFT"
  | "MINESHAFT_MESA"
  | "STRONGHOLD"
  | "ANCIENT_CITY"
  | "TRAIL_RUINS"
  | "TRIAL_CHAMBERS"
  /* Ocean */
  | "SHIPWRECK"
  | "SHIPWRECK_BEACHED"
  | "MONUMENT"
  | "OCEAN_RUIN_COLD"
  | "OCEAN_RUIN_WARM"
  | "BURIED_TREASURE"
  /* Surface */
  | "MANSION"
  | "PILLAGER_OUTPOST"
  /* Ruined Portals */
  | "RUINED_PORTAL"
  | "RUINED_PORTAL_DESERT"
  | "RUINED_PORTAL_JUNGLE"
  | "RUINED_PORTAL_SWAMP"
  | "RUINED_PORTAL_MOUNTAIN"
  | "RUINED_PORTAL_OCEAN"
  | "RUINED_PORTAL_NETHER"
  /* Nether */
  | "FORTRESS"
  | "BASTION_REMNANT"
  | "NETHER_FOSSIL"
  /* End */
  | "END_CITY";

/**
 * All structure names as array.
 */
export const STRUCTURE_NAMES: readonly StructureName[] = [
  "VILLAGE_PLAINS",
  "VILLAGE_DESERT",
  "VILLAGE_SAVANNA",
  "VILLAGE_SNOWY",
  "VILLAGE_TAIGA",
  "DESERT_PYRAMID",
  "JUNGLE_PYRAMID",
  "SWAMP_HUT",
  "IGLOO",
  "MINESHAFT",
  "MINESHAFT_MESA",
  "STRONGHOLD",
  "ANCIENT_CITY",
  "TRAIL_RUINS",
  "TRIAL_CHAMBERS",
  "SHIPWRECK",
  "SHIPWRECK_BEACHED",
  "MONUMENT",
  "OCEAN_RUIN_COLD",
  "OCEAN_RUIN_WARM",
  "BURIED_TREASURE",
  "MANSION",
  "PILLAGER_OUTPOST",
  "RUINED_PORTAL",
  "RUINED_PORTAL_DESERT",
  "RUINED_PORTAL_JUNGLE",
  "RUINED_PORTAL_SWAMP",
  "RUINED_PORTAL_MOUNTAIN",
  "RUINED_PORTAL_OCEAN",
  "RUINED_PORTAL_NETHER",
  "FORTRESS",
  "BASTION_REMNANT",
  "NETHER_FOSSIL",
  "END_CITY",
] as const;

// ============================================
// STRUCTURE CATEGORIES
// ============================================

/**
 * Village structures.
 */
export const VILLAGE_STRUCTURES: readonly StructureName[] = [
  "VILLAGE_PLAINS",
  "VILLAGE_DESERT",
  "VILLAGE_SAVANNA",
  "VILLAGE_SNOWY",
  "VILLAGE_TAIGA",
] as const;

/**
 * Temple/pyramid structures.
 */
export const TEMPLE_STRUCTURES: readonly StructureName[] = [
  "DESERT_PYRAMID",
  "JUNGLE_PYRAMID",
  "SWAMP_HUT",
  "IGLOO",
] as const;

/**
 * Underground structures.
 */
export const UNDERGROUND_STRUCTURES: readonly StructureName[] = [
  "MINESHAFT",
  "MINESHAFT_MESA",
  "STRONGHOLD",
  "ANCIENT_CITY",
  "TRAIL_RUINS",
  "TRIAL_CHAMBERS",
] as const;

/**
 * Ocean structures.
 */
export const OCEAN_STRUCTURES: readonly StructureName[] = [
  "SHIPWRECK",
  "SHIPWRECK_BEACHED",
  "MONUMENT",
  "OCEAN_RUIN_COLD",
  "OCEAN_RUIN_WARM",
  "BURIED_TREASURE",
] as const;

/**
 * Ruined portal variants.
 */
export const RUINED_PORTAL_STRUCTURES: readonly StructureName[] = [
  "RUINED_PORTAL",
  "RUINED_PORTAL_DESERT",
  "RUINED_PORTAL_JUNGLE",
  "RUINED_PORTAL_SWAMP",
  "RUINED_PORTAL_MOUNTAIN",
  "RUINED_PORTAL_OCEAN",
  "RUINED_PORTAL_NETHER",
] as const;

/**
 * Nether structures.
 */
export const NETHER_STRUCTURES: readonly StructureName[] = [
  "FORTRESS",
  "BASTION_REMNANT",
  "NETHER_FOSSIL",
  "RUINED_PORTAL_NETHER",
] as const;

/**
 * End structures.
 */
export const END_STRUCTURES: readonly StructureName[] = [
  "END_CITY",
] as const;

/**
 * Overworld structures.
 */
export const OVERWORLD_STRUCTURES: readonly StructureName[] = [
  ...VILLAGE_STRUCTURES,
  ...TEMPLE_STRUCTURES,
  ...UNDERGROUND_STRUCTURES,
  ...OCEAN_STRUCTURES,
  "MANSION",
  "PILLAGER_OUTPOST",
  "RUINED_PORTAL",
  "RUINED_PORTAL_DESERT",
  "RUINED_PORTAL_JUNGLE",
  "RUINED_PORTAL_SWAMP",
  "RUINED_PORTAL_MOUNTAIN",
  "RUINED_PORTAL_OCEAN",
] as const;

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a Structure.
 */
export function isStructure(obj: any): obj is BukkitStructure {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getStructureType === "function" &&
         (typeof obj.getKey === "function" || typeof obj.getKeyOrThrow === "function");
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get structure by name.
 * 
 * @example
 * const village = getStructure("VILLAGE_PLAINS");
 */
export function getStructure(name: StructureName): BukkitStructure {
  return Structure[name];
}

/**
 * Get structure by name safely.
 * 
 * @returns Structure or null if not found
 */
export function getStructureSafe(name: string): BukkitStructure | null {
  const upper = name.toUpperCase() as StructureName;
  return Structure[upper] ?? null;
}

/**
 * Check if a name is a valid structure name.
 */
export function isStructureName(name: string): name is StructureName {
  return STRUCTURE_NAMES.includes(name.toUpperCase() as StructureName);
}

/**
 * Get all vanilla structures.
 */
export function getAllStructures(): BukkitStructure[] {
  return STRUCTURE_NAMES.map(name => Structure[name]);
}

// ============================================
// STRUCTURE TYPE CHECKS
// ============================================

/**
 * Check if structure is a village.
 */
export function isVillage(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && key.startsWith("VILLAGE_");
}

/**
 * Check if structure is a temple/pyramid.
 */
export function isTemple(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && TEMPLE_STRUCTURES.includes(key as StructureName);
}

/**
 * Check if structure is underground.
 */
export function isUnderground(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && UNDERGROUND_STRUCTURES.includes(key as StructureName);
}

/**
 * Check if structure is an ocean structure.
 */
export function isOceanStructure(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && OCEAN_STRUCTURES.includes(key as StructureName);
}

/**
 * Check if structure is a ruined portal.
 */
export function isRuinedPortal(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && key.startsWith("RUINED_PORTAL");
}

/**
 * Check if structure is a Nether structure.
 */
export function isNetherStructure(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && NETHER_STRUCTURES.includes(key as StructureName);
}

/**
 * Check if structure is an End structure.
 */
export function isEndStructure(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && END_STRUCTURES.includes(key as StructureName);
}

/**
 * Check if structure is an Overworld structure.
 */
export function isOverworldStructure(structure: BukkitStructure): boolean {
  const key = getStructureKeyName(structure);
  return key !== null && OVERWORLD_STRUCTURES.includes(key as StructureName);
}

// ============================================
// KEY UTILITIES
// ============================================

/**
 * Get structure key name (uppercase).
 */
export function getStructureKeyName(structure: BukkitStructure): string | null {
  try {
    const key = structure.getKeyOrNull();
    if (key === null) return null;
    return key.getKey().toUpperCase().replace(/\//g, "_");
  } catch {
    return null;
  }
}

/**
 * Get structure key as string.
 */
export function getStructureKeyString(structure: BukkitStructure): string | null {
  try {
    return structure.getKeyOrThrow().toString();
  } catch {
    return null;
  }
}

/**
 * Check if structure is vanilla (minecraft namespace).
 */
export function isVanillaStructure(structure: BukkitStructure): boolean {
  try {
    const key = structure.getKeyOrNull();
    return key !== null && key.getNamespace() === "minecraft";
  } catch {
    return false;
  }
}

/**
 * Check if structure is custom (non-minecraft namespace).
 */
export function isCustomStructure(structure: BukkitStructure): boolean {
  return !isVanillaStructure(structure);
}

// ============================================
// DISPLAY NAMES
// ============================================

/**
 * Display names for structures.
 */
export const STRUCTURE_DISPLAY_NAMES: Record<StructureName, string> = {
  VILLAGE_PLAINS: "Plains Village",
  VILLAGE_DESERT: "Desert Village",
  VILLAGE_SAVANNA: "Savanna Village",
  VILLAGE_SNOWY: "Snowy Village",
  VILLAGE_TAIGA: "Taiga Village",
  DESERT_PYRAMID: "Desert Pyramid",
  JUNGLE_PYRAMID: "Jungle Temple",
  SWAMP_HUT: "Witch Hut",
  IGLOO: "Igloo",
  MINESHAFT: "Mineshaft",
  MINESHAFT_MESA: "Mesa Mineshaft",
  STRONGHOLD: "Stronghold",
  ANCIENT_CITY: "Ancient City",
  TRAIL_RUINS: "Trail Ruins",
  TRIAL_CHAMBERS: "Trial Chambers",
  SHIPWRECK: "Shipwreck",
  SHIPWRECK_BEACHED: "Beached Shipwreck",
  MONUMENT: "Ocean Monument",
  OCEAN_RUIN_COLD: "Cold Ocean Ruins",
  OCEAN_RUIN_WARM: "Warm Ocean Ruins",
  BURIED_TREASURE: "Buried Treasure",
  MANSION: "Woodland Mansion",
  PILLAGER_OUTPOST: "Pillager Outpost",
  RUINED_PORTAL: "Ruined Portal",
  RUINED_PORTAL_DESERT: "Desert Ruined Portal",
  RUINED_PORTAL_JUNGLE: "Jungle Ruined Portal",
  RUINED_PORTAL_SWAMP: "Swamp Ruined Portal",
  RUINED_PORTAL_MOUNTAIN: "Mountain Ruined Portal",
  RUINED_PORTAL_OCEAN: "Ocean Ruined Portal",
  RUINED_PORTAL_NETHER: "Nether Ruined Portal",
  FORTRESS: "Nether Fortress",
  BASTION_REMNANT: "Bastion Remnant",
  NETHER_FOSSIL: "Nether Fossil",
  END_CITY: "End City",
};

/**
 * Get display name for structure.
 */
export function getStructureDisplayName(structure: BukkitStructure): string {
  const key = getStructureKeyName(structure);
  if (key === null) return "Unknown Structure";
  return STRUCTURE_DISPLAY_NAMES[key as StructureName] ?? key;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a structure.
 */
export function describeStructure(structure: BukkitStructure): string {
  const displayName = getStructureDisplayName(structure);
  const typeName = structure.getStructureType().getKey().getKey();
  return `${displayName} (${typeName})`;
}

/**
 * Get structure info as plain object.
 */
export function getStructureInfo(structure: BukkitStructure): {
  key: string | null;
  displayName: string;
  structureType: string;
  isVanilla: boolean;
  isVillage: boolean;
  isTemple: boolean;
  isUnderground: boolean;
  isOcean: boolean;
  isNether: boolean;
  isEnd: boolean;
  dimension: "overworld" | "nether" | "end" | "unknown";
} {
  const keyName = getStructureKeyName(structure);
  
  let dimension: "overworld" | "nether" | "end" | "unknown" = "unknown";
  if (isNetherStructure(structure)) {
    dimension = "nether";
  } else if (isEndStructure(structure)) {
    dimension = "end";
  } else if (isOverworldStructure(structure)) {
    dimension = "overworld";
  }
  
  return {
    key: getStructureKeyString(structure),
    displayName: getStructureDisplayName(structure),
    structureType: structure.getStructureType().getKey().getKey(),
    isVanilla: isVanillaStructure(structure),
    isVillage: isVillage(structure),
    isTemple: isTemple(structure),
    isUnderground: isUnderground(structure),
    isOcean: isOceanStructure(structure),
    isNether: isNetherStructure(structure),
    isEnd: isEndStructure(structure),
    dimension,
  };
}

/**
 * Get summary of structure list.
 */
export function getStructureSummary(structures: BukkitStructure[]): {
  total: number;
  vanilla: number;
  custom: number;
  byDimension: {
    overworld: number;
    nether: number;
    end: number;
    unknown: number;
  };
  byCategory: {
    villages: number;
    temples: number;
    underground: number;
    ocean: number;
    ruinedPortals: number;
    other: number;
  };
} {
  let vanilla = 0;
  let custom = 0;
  const byDimension = { overworld: 0, nether: 0, end: 0, unknown: 0 };
  const byCategory = { villages: 0, temples: 0, underground: 0, ocean: 0, ruinedPortals: 0, other: 0 };
  
  for (const structure of structures) {
    if (isVanillaStructure(structure)) {
      vanilla++;
    } else {
      custom++;
    }
    
    if (isNetherStructure(structure)) {
      byDimension.nether++;
    } else if (isEndStructure(structure)) {
      byDimension.end++;
    } else if (isOverworldStructure(structure)) {
      byDimension.overworld++;
    } else {
      byDimension.unknown++;
    }
    
    if (isVillage(structure)) {
      byCategory.villages++;
    } else if (isTemple(structure)) {
      byCategory.temples++;
    } else if (isUnderground(structure)) {
      byCategory.underground++;
    } else if (isOceanStructure(structure)) {
      byCategory.ocean++;
    } else if (isRuinedPortal(structure)) {
      byCategory.ruinedPortals++;
    } else {
      byCategory.other++;
    }
  }
  
  return {
    total: structures.length,
    vanilla,
    custom,
    byDimension,
    byCategory,
  };
}