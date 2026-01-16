/**
 * DESIGN
 * ------
 * TreeType enum represents all tree and organic structure types
 * that can be generated in the world.
 * 
 * TREE CATEGORIES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                      OVERWORLD TREES                        │
 *   │                                                             │
 *   │   OAK VARIANTS:                                             │
 *   │   ┌─────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
 *   │   │TREE │  │BIG_TREE │  │ SWAMP   │  │DARK_OAK │            │
 *   │   │  █  │  │   ███   │  │  ███≈   │  │ ██████  │            │
 *   │   │  █  │  │   █ █   │  │   █     │  │  ████   │            │
 *   │   │  █  │  │    █    │  │   █     │  │   ██    │            │
 *   │   └─────┘  └─────────┘  └─────────┘  └─────────┘            │
 *   │                                                             │
 *   │   BIRCH:           ACACIA:          CHERRY:                 │
 *   │   ┌─────┐          ┌─────┐          ┌─────┐                 │
 *   │   │ ███ │          │███  │          │ ░░░ │                 │
 *   │   │  █  │          │  \█ │          │  █  │                 │
 *   │   │  █  │          │   █ │          │  █  │                 │
 *   │   └─────┘          └─────┘          └─────┘                 │
 *   │                                                             │
 *   │   SPRUCE/REDWOOD:                                           │
 *   │   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐               │
 *   │   │REDWOOD │ │TALL_RW │ │MEGA_RW │ │MEGA_PN │               │
 *   │   │   █    │ │   █    │ │  ████  │ │  ████  │               │
 *   │   │  ███   │ │   █    │ │  ████  │ │ ██████ │               │
 *   │   │ █████  │ │  ███   │ │ ██████ │ │████████│               │
 *   │   │   █    │ │   █    │ │   ██   │ │   ██   │               │
 *   │   └────────┘ └────────┘ └────────┘ └────────┘               │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                      JUNGLE TREES                           │
 *   │                                                             │
 *   │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
 *   │   │  JUNGLE  │  │SM_JUNGLE │  │COCOA_TREE│  │JUNG_BUSH │    │
 *   │   │ ████████ │  │   ███    │  │   ███●   │  │   ██     │    │
 *   │   │ ████████ │  │    █     │  │    █     │  │   ██     │    │
 *   │   │   ████   │  │    █     │  │    █     │  └──────────┘    │
 *   │   │    ██    │  └──────────┘  └──────────┘                  │
 *   │   └──────────┘                                              │
 *   │   (4x4 trunk)   (1x1 trunk)   (with cocoa)   (small bush)   │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    SPECIAL STRUCTURES                       │
 *   │                                                             │
 *   │   MUSHROOMS:        NETHER:           END:                  │
 *   │   ┌─────┐ ┌─────┐   ┌─────┐ ┌─────┐   ┌─────┐               │
 *   │   │█████│ │ ███ │   │ ▓▓▓ │ │ ░░░ │   │  ○  │               │
 *   │   │█   █│ │█████│   │  █  │ │  █  │   │  │  │               │
 *   │   │  █  │ │  █  │   │  █  │ │  █  │   │ ─┼─ │               │
 *   │   └─────┘ └─────┘   └─────┘ └─────┘   └─────┘               │
 *   │    RED    BROWN     CRIMSON  WARPED   CHORUS                │
 *   │                                                             │
 *   │   MANGROVE:         AZALEA:           PALE OAK:             │
 *   │   ┌─────┐ ┌─────┐   ┌─────┐           ┌─────┐               │
 *   │   │ ███ │ │█████│   │ ▒▒▒ │           │ ░░░ │               │
 *   │   │ ╱█╲ │ │ ╱█╲ │   │  █  │           │  █  │               │
 *   │   │╱ █ ╲│ │╱ █ ╲│   │ ╱╲╱╲│           │  █  │               │
 *   │   └─────┘ └─────┘   └─────┘           └─────┘               │
 *   │   NORMAL   TALL     (roots)           (pale)                │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/TreeType.html
 */

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";


// ============================================
// ENUM KEY TYPE
// ============================================

/**
 * Valid TreeType enum constant names.
 */
export type TreeTypeKey =
  /* Oak variants */
  | "TREE"
  | "BIG_TREE"
  | "SWAMP"
  | "DARK_OAK"
  | "PALE_OAK"
  | "PALE_OAK_CREAKING"
  /* Birch */
  | "BIRCH"
  | "TALL_BIRCH"
  /* Spruce/Redwood */
  | "REDWOOD"
  | "TALL_REDWOOD"
  | "MEGA_REDWOOD"
  | "MEGA_PINE"
  /* Jungle */
  | "JUNGLE"
  | "SMALL_JUNGLE"
  | "COCOA_TREE"
  | "JUNGLE_BUSH"
  /* Acacia */
  | "ACACIA"
  /* Cherry */
  | "CHERRY"
  /* Mangrove */
  | "MANGROVE"
  | "TALL_MANGROVE"
  /* Azalea */
  | "AZALEA"
  /* Mushrooms */
  | "RED_MUSHROOM"
  | "BROWN_MUSHROOM"
  /* Nether */
  | "CRIMSON_FUNGUS"
  | "WARPED_FUNGUS"
  /* End */
  | "CHORUS_PLANT";

// ============================================
// ENUM INSTANCE INTERFACE
// ============================================

/**
 * TreeType Java enum instance.
 * 
 * Represents a tree or organic structure type
 * that can be generated in the world.
 */
export interface BukkitTreeType extends JavaEnum<TreeTypeKey> {
  // TreeType has no additional methods beyond JavaEnum
}

// ============================================
// ENUM CLASS TYPE
// ============================================

/**
 * TreeType enum class (static side).
 * 
 * Provides access to all TreeType constants and lookup methods.
 */
export type BukkitTreeTypeClass = 
  JavaEnumClass<BukkitTreeType> & 
  Record<TreeTypeKey, BukkitTreeType>;

// ============================================
// ALL KEYS
// ============================================

/**
 * All tree type keys in declaration order.
 */
export const TREE_TYPE_KEYS: readonly TreeTypeKey[] = [
  "TREE",
  "BIG_TREE",
  "REDWOOD",
  "TALL_REDWOOD",
  "BIRCH",
  "JUNGLE",
  "SMALL_JUNGLE",
  "COCOA_TREE",
  "JUNGLE_BUSH",
  "RED_MUSHROOM",
  "BROWN_MUSHROOM",
  "SWAMP",
  "ACACIA",
  "DARK_OAK",
  "MEGA_REDWOOD",
  "MEGA_PINE",
  "TALL_BIRCH",
  "CHORUS_PLANT",
  "CRIMSON_FUNGUS",
  "WARPED_FUNGUS",
  "AZALEA",
  "MANGROVE",
  "TALL_MANGROVE",
  "CHERRY",
  "PALE_OAK",
  "PALE_OAK_CREAKING",
] as const;

// ============================================
// CATEGORIES
// ============================================

/**
 * Oak tree variant keys.
 */
export const OAK_TREE_KEYS: readonly TreeTypeKey[] = [
  "TREE",
  "BIG_TREE",
  "SWAMP",
  "DARK_OAK",
  "PALE_OAK",
  "PALE_OAK_CREAKING",
] as const;

/**
 * Birch tree variant keys.
 */
export const BIRCH_TREE_KEYS: readonly TreeTypeKey[] = [
  "BIRCH",
  "TALL_BIRCH",
] as const;

/**
 * Spruce/Redwood tree variant keys.
 */
export const SPRUCE_TREE_KEYS: readonly TreeTypeKey[] = [
  "REDWOOD",
  "TALL_REDWOOD",
  "MEGA_REDWOOD",
  "MEGA_PINE",
] as const;

/**
 * Jungle tree variant keys.
 */
export const JUNGLE_TREE_KEYS: readonly TreeTypeKey[] = [
  "JUNGLE",
  "SMALL_JUNGLE",
  "COCOA_TREE",
  "JUNGLE_BUSH",
] as const;

/**
 * Mangrove tree variant keys.
 */
export const MANGROVE_TREE_KEYS: readonly TreeTypeKey[] = [
  "MANGROVE",
  "TALL_MANGROVE",
] as const;

/**
 * Mushroom type keys.
 */
export const MUSHROOM_KEYS: readonly TreeTypeKey[] = [
  "RED_MUSHROOM",
  "BROWN_MUSHROOM",
] as const;

/**
 * Nether fungi keys.
 */
export const NETHER_FUNGI_KEYS: readonly TreeTypeKey[] = [
  "CRIMSON_FUNGUS",
  "WARPED_FUNGUS",
] as const;

/**
 * End structure keys.
 */
export const END_PLANT_KEYS: readonly TreeTypeKey[] = [
  "CHORUS_PLANT",
] as const;

/**
 * All actual tree keys (excludes mushrooms, fungi, chorus).
 */
export const ACTUAL_TREE_KEYS: readonly TreeTypeKey[] = [
  "TREE",
  "BIG_TREE",
  "SWAMP",
  "DARK_OAK",
  "PALE_OAK",
  "PALE_OAK_CREAKING",
  "BIRCH",
  "TALL_BIRCH",
  "REDWOOD",
  "TALL_REDWOOD",
  "MEGA_REDWOOD",
  "MEGA_PINE",
  "JUNGLE",
  "SMALL_JUNGLE",
  "COCOA_TREE",
  "JUNGLE_BUSH",
  "ACACIA",
  "CHERRY",
  "MANGROVE",
  "TALL_MANGROVE",
  "AZALEA",
] as const;

/**
 * Large/mega tree keys (2x2 trunk).
 */
export const MEGA_TREE_KEYS: readonly TreeTypeKey[] = [
  "JUNGLE",
  "MEGA_REDWOOD",
  "MEGA_PINE",
  "DARK_OAK",
] as const;

/**
 * Small tree keys (1x1 trunk, short).
 */
export const SMALL_TREE_KEYS: readonly TreeTypeKey[] = [
  "TREE",
  "BIRCH",
  "REDWOOD",
  "SMALL_JUNGLE",
  "JUNGLE_BUSH",
] as const;

/**
 * Tall tree variant keys.
 */
export const TALL_TREE_KEYS: readonly TreeTypeKey[] = [
  "BIG_TREE",
  "TALL_REDWOOD",
  "TALL_BIRCH",
  "TALL_MANGROVE",
] as const;

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Check if value is a valid TreeTypeKey.
 */
export function isTreeTypeKey(value: string): value is TreeTypeKey {
  return TREE_TYPE_KEYS.includes(value as TreeTypeKey);
}

/**
 * Check if tree type is an oak variant.
 */
export function isOakTree(type: BukkitTreeType): boolean {
  return (OAK_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a birch variant.
 */
export function isBirchTree(type: BukkitTreeType): boolean {
  return (BIRCH_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a spruce/redwood variant.
 */
export function isSpruceTree(type: BukkitTreeType): boolean {
  return (SPRUCE_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a jungle variant.
 */
export function isJungleTree(type: BukkitTreeType): boolean {
  return (JUNGLE_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a mangrove variant.
 */
export function isMangroveTree(type: BukkitTreeType): boolean {
  return (MANGROVE_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a mushroom.
 */
export function isMushroom(type: BukkitTreeType): boolean {
  return (MUSHROOM_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a nether fungus.
 */
export function isNetherFungus(type: BukkitTreeType): boolean {
  return (NETHER_FUNGI_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is an end structure.
 */
export function isEndPlant(type: BukkitTreeType): boolean {
  return (END_PLANT_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is an actual tree.
 */
export function isActualTree(type: BukkitTreeType): boolean {
  return (ACTUAL_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a mega/large tree.
 */
export function isMegaTree(type: BukkitTreeType): boolean {
  return (MEGA_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a small tree.
 */
export function isSmallTree(type: BukkitTreeType): boolean {
  return (SMALL_TREE_KEYS as readonly string[]).includes(type.name());
}

/**
 * Check if tree type is a tall variant.
 */
export function isTallTree(type: BukkitTreeType): boolean {
  return (TALL_TREE_KEYS as readonly string[]).includes(type.name());
}

// ============================================
// PROPERTIES
// ============================================

/**
 * Tree type properties.
 */
export interface TreeTypeProperties {
  /** Display name */
  displayName: string;
  /** Trunk width (1 = 1x1, 2 = 2x2) */
  trunkWidth: number;
  /** Approximate height range */
  heightRange: [number, number];
  /** Wood type produced */
  woodType: string;
  /** Dimension where it generates naturally */
  dimension: "OVERWORLD" | "NETHER" | "END";
  /** Biomes where it generates (empty = special) */
  naturalBiomes: string[];
  /** Whether it's a true tree or other structure */
  isTree: boolean;
}

/**
 * Get properties for a tree type key.
 */
export function getTreeTypeProperties(key: TreeTypeKey): TreeTypeProperties {
  switch (key) {
    case "TREE":
      return {
        displayName: "Oak Tree",
        trunkWidth: 1,
        heightRange: [4, 7],
        woodType: "OAK",
        dimension: "OVERWORLD",
        naturalBiomes: ["FOREST", "PLAINS", "RIVER"],
        isTree: true,
      };

    case "BIG_TREE":
      return {
        displayName: "Big Oak Tree",
        trunkWidth: 1,
        heightRange: [7, 12],
        woodType: "OAK",
        dimension: "OVERWORLD",
        naturalBiomes: ["FOREST"],
        isTree: true,
      };

    case "SWAMP":
      return {
        displayName: "Swamp Tree",
        trunkWidth: 1,
        heightRange: [5, 9],
        woodType: "OAK",
        dimension: "OVERWORLD",
        naturalBiomes: ["SWAMP"],
        isTree: true,
      };

    case "DARK_OAK":
      return {
        displayName: "Dark Oak Tree",
        trunkWidth: 2,
        heightRange: [6, 10],
        woodType: "DARK_OAK",
        dimension: "OVERWORLD",
        naturalBiomes: ["DARK_FOREST"],
        isTree: true,
      };

    case "PALE_OAK":
      return {
        displayName: "Pale Oak Tree",
        trunkWidth: 1,
        heightRange: [5, 8],
        woodType: "PALE_OAK",
        dimension: "OVERWORLD",
        naturalBiomes: ["PALE_GARDEN"],
        isTree: true,
      };

    case "PALE_OAK_CREAKING":
      return {
        displayName: "Pale Oak with Creaking Heart",
        trunkWidth: 1,
        heightRange: [5, 8],
        woodType: "PALE_OAK",
        dimension: "OVERWORLD",
        naturalBiomes: ["PALE_GARDEN"],
        isTree: true,
      };

    case "BIRCH":
      return {
        displayName: "Birch Tree",
        trunkWidth: 1,
        heightRange: [5, 7],
        woodType: "BIRCH",
        dimension: "OVERWORLD",
        naturalBiomes: ["BIRCH_FOREST", "FOREST"],
        isTree: true,
      };

    case "TALL_BIRCH":
      return {
        displayName: "Tall Birch Tree",
        trunkWidth: 1,
        heightRange: [8, 14],
        woodType: "BIRCH",
        dimension: "OVERWORLD",
        naturalBiomes: ["OLD_GROWTH_BIRCH_FOREST"],
        isTree: true,
      };

    case "REDWOOD":
      return {
        displayName: "Spruce Tree",
        trunkWidth: 1,
        heightRange: [5, 9],
        woodType: "SPRUCE",
        dimension: "OVERWORLD",
        naturalBiomes: ["TAIGA", "SNOWY_TAIGA"],
        isTree: true,
      };

    case "TALL_REDWOOD":
      return {
        displayName: "Tall Spruce Tree",
        trunkWidth: 1,
        heightRange: [8, 14],
        woodType: "SPRUCE",
        dimension: "OVERWORLD",
        naturalBiomes: ["TAIGA"],
        isTree: true,
      };

    case "MEGA_REDWOOD":
      return {
        displayName: "Mega Spruce Tree",
        trunkWidth: 2,
        heightRange: [15, 30],
        woodType: "SPRUCE",
        dimension: "OVERWORLD",
        naturalBiomes: ["OLD_GROWTH_SPRUCE_TAIGA"],
        isTree: true,
      };

    case "MEGA_PINE":
      return {
        displayName: "Mega Pine Tree",
        trunkWidth: 2,
        heightRange: [15, 30],
        woodType: "SPRUCE",
        dimension: "OVERWORLD",
        naturalBiomes: ["OLD_GROWTH_PINE_TAIGA"],
        isTree: true,
      };

    case "JUNGLE":
      return {
        displayName: "Large Jungle Tree",
        trunkWidth: 2,
        heightRange: [20, 32],
        woodType: "JUNGLE",
        dimension: "OVERWORLD",
        naturalBiomes: ["JUNGLE"],
        isTree: true,
      };

    case "SMALL_JUNGLE":
      return {
        displayName: "Small Jungle Tree",
        trunkWidth: 1,
        heightRange: [4, 8],
        woodType: "JUNGLE",
        dimension: "OVERWORLD",
        naturalBiomes: ["JUNGLE", "SPARSE_JUNGLE"],
        isTree: true,
      };

    case "COCOA_TREE":
      return {
        displayName: "Jungle Tree with Cocoa",
        trunkWidth: 1,
        heightRange: [4, 8],
        woodType: "JUNGLE",
        dimension: "OVERWORLD",
        naturalBiomes: ["JUNGLE"],
        isTree: true,
      };

    case "JUNGLE_BUSH":
      return {
        displayName: "Jungle Bush",
        trunkWidth: 1,
        heightRange: [1, 3],
        woodType: "JUNGLE",
        dimension: "OVERWORLD",
        naturalBiomes: ["JUNGLE", "SPARSE_JUNGLE"],
        isTree: true,
      };

    case "ACACIA":
      return {
        displayName: "Acacia Tree",
        trunkWidth: 1,
        heightRange: [5, 8],
        woodType: "ACACIA",
        dimension: "OVERWORLD",
        naturalBiomes: ["SAVANNA", "SAVANNA_PLATEAU"],
        isTree: true,
      };

    case "CHERRY":
      return {
        displayName: "Cherry Tree",
        trunkWidth: 1,
        heightRange: [4, 7],
        woodType: "CHERRY",
        dimension: "OVERWORLD",
        naturalBiomes: ["CHERRY_GROVE"],
        isTree: true,
      };

    case "MANGROVE":
      return {
        displayName: "Mangrove Tree",
        trunkWidth: 1,
        heightRange: [5, 10],
        woodType: "MANGROVE",
        dimension: "OVERWORLD",
        naturalBiomes: ["MANGROVE_SWAMP"],
        isTree: true,
      };

    case "TALL_MANGROVE":
      return {
        displayName: "Tall Mangrove Tree",
        trunkWidth: 1,
        heightRange: [10, 15],
        woodType: "MANGROVE",
        dimension: "OVERWORLD",
        naturalBiomes: ["MANGROVE_SWAMP"],
        isTree: true,
      };

    case "AZALEA":
      return {
        displayName: "Azalea Tree",
        trunkWidth: 1,
        heightRange: [4, 7],
        woodType: "OAK",
        dimension: "OVERWORLD",
        naturalBiomes: ["LUSH_CAVES"],
        isTree: true,
      };

    case "RED_MUSHROOM":
      return {
        displayName: "Huge Red Mushroom",
        trunkWidth: 1,
        heightRange: [5, 9],
        woodType: "MUSHROOM_STEM",
        dimension: "OVERWORLD",
        naturalBiomes: ["MUSHROOM_FIELDS", "DARK_FOREST"],
        isTree: false,
      };

    case "BROWN_MUSHROOM":
      return {
        displayName: "Huge Brown Mushroom",
        trunkWidth: 1,
        heightRange: [4, 8],
        woodType: "MUSHROOM_STEM",
        dimension: "OVERWORLD",
        naturalBiomes: ["MUSHROOM_FIELDS", "DARK_FOREST"],
        isTree: false,
      };

    case "CRIMSON_FUNGUS":
      return {
        displayName: "Huge Crimson Fungus",
        trunkWidth: 1,
        heightRange: [5, 12],
        woodType: "CRIMSON_STEM",
        dimension: "NETHER",
        naturalBiomes: ["CRIMSON_FOREST"],
        isTree: false,
      };

    case "WARPED_FUNGUS":
      return {
        displayName: "Huge Warped Fungus",
        trunkWidth: 1,
        heightRange: [5, 12],
        woodType: "WARPED_STEM",
        dimension: "NETHER",
        naturalBiomes: ["WARPED_FOREST"],
        isTree: false,
      };

    case "CHORUS_PLANT":
      return {
        displayName: "Chorus Plant",
        trunkWidth: 1,
        heightRange: [5, 22],
        woodType: "CHORUS_PLANT",
        dimension: "END",
        naturalBiomes: ["END_HIGHLANDS"],
        isTree: false,
      };

    default:
      return {
        displayName: key,
        trunkWidth: 1,
        heightRange: [4, 8],
        woodType: "OAK",
        dimension: "OVERWORLD",
        naturalBiomes: [],
        isTree: true,
      };
  }
}

// ============================================
// UTILITIES
// ============================================

/**
 * Get properties for a tree type instance.
 */
export function getTreeProperties(type: BukkitTreeType): TreeTypeProperties {
  return getTreeTypeProperties(type.name());
}

/**
 * Get display name for tree type.
 */
export function getTreeDisplayName(type: BukkitTreeType): string {
  return getTreeTypeProperties(type.name()).displayName;
}

/**
 * Get wood type for tree type.
 */
export function getTreeWoodType(type: BukkitTreeType): string {
  return getTreeTypeProperties(type.name()).woodType;
}

/**
 * Get dimension for tree type.
 */
export function getTreeDimension(type: BukkitTreeType): string {
  return getTreeTypeProperties(type.name()).dimension;
}

/**
 * Get trees for a specific biome.
 */
export function getTreeKeysForBiome(biome: string): TreeTypeKey[] {
  const result: TreeTypeKey[] = [];
  const upperBiome = biome.toUpperCase();

  for (const key of TREE_TYPE_KEYS) {
    const props = getTreeTypeProperties(key);
    if (props.naturalBiomes.includes(upperBiome)) {
      result.push(key);
    }
  }

  return result;
}

/**
 * Get tree keys for a specific dimension.
 */
export function getTreeKeysForDimension(
  dimension: "OVERWORLD" | "NETHER" | "END"
): TreeTypeKey[] {
  return TREE_TYPE_KEYS.filter(
    (key) => getTreeTypeProperties(key).dimension === dimension
  );
}

/**
 * Get appropriate sapling material for tree type key.
 */
export function getSaplingMaterial(key: TreeTypeKey): string {
  const props = getTreeTypeProperties(key);

  switch (props.woodType) {
    case "OAK":
      return key === "AZALEA" ? "AZALEA" : "OAK_SAPLING";
    case "BIRCH":
      return "BIRCH_SAPLING";
    case "SPRUCE":
      return "SPRUCE_SAPLING";
    case "JUNGLE":
      return "JUNGLE_SAPLING";
    case "ACACIA":
      return "ACACIA_SAPLING";
    case "DARK_OAK":
      return "DARK_OAK_SAPLING";
    case "CHERRY":
      return "CHERRY_SAPLING";
    case "MANGROVE":
      return "MANGROVE_PROPAGULE";
    case "PALE_OAK":
      return "PALE_OAK_SAPLING";
    case "CRIMSON_STEM":
      return "CRIMSON_FUNGUS";
    case "WARPED_STEM":
      return "WARPED_FUNGUS";
    default:
      return "OAK_SAPLING";
  }
}

/**
 * Get sapling material for tree type instance.
 */
export function getTreeSaplingMaterial(type: BukkitTreeType): string {
  return getSaplingMaterial(type.name());
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a tree type.
 */
export function describeTreeType(type: BukkitTreeType): string {
  const props = getTreeTypeProperties(type.name());
  const heightStr = `${props.heightRange[0]}-${props.heightRange[1]} blocks`;
  const sizeStr = props.trunkWidth > 1 ? ` (${props.trunkWidth}x${props.trunkWidth} trunk)` : "";

  return `${props.displayName}: ${heightStr}${sizeStr}, ${props.woodType} wood`;
}

/**
 * Get tree type info as plain object.
 */
export function getTreeTypeInfo(type: BukkitTreeType): {
  name: TreeTypeKey;
  ordinal: number;
  displayName: string;
  trunkWidth: number;
  minHeight: number;
  maxHeight: number;
  woodType: string;
  dimension: string;
  isTree: boolean;
  isMega: boolean;
  saplingMaterial: string;
} {
  const key = type.name();
  const props = getTreeTypeProperties(key);

  return {
    name: key,
    ordinal: type.ordinal(),
    displayName: props.displayName,
    trunkWidth: props.trunkWidth,
    minHeight: props.heightRange[0],
    maxHeight: props.heightRange[1],
    woodType: props.woodType,
    dimension: props.dimension,
    isTree: props.isTree,
    isMega: isMegaTree(type),
    saplingMaterial: getSaplingMaterial(key),
  };
}