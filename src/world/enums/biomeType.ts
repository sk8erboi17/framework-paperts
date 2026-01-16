import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

export interface BukkitBiome extends JavaEnum<BiomeKey> {
  getKey(): BukkitNamespacedKey;
}

export type BiomeKey = 
  | "BADLANDS" | "BAMBOO_JUNGLE" | "BASALT_DELTAS" | "BEACH" | "BIRCH_FOREST"
  | "CHERRY_GROVE" | "COLD_OCEAN" | "CRIMSON_FOREST" | "CUSTOM" | "DARK_FOREST"
  | "DEEP_COLD_OCEAN" | "DEEP_DARK" | "DEEP_FROZEN_OCEAN" | "DEEP_LUKEWARM_OCEAN"
  | "DEEP_OCEAN" | "DESERT" | "DRIPSTONE_CAVES" | "END_BARRENS" | "END_HIGHLANDS"
  | "END_MIDLANDS" | "ERODED_BADLANDS" | "FLOWER_FOREST" | "FOREST" | "FROZEN_OCEAN"
  | "FROZEN_PEAKS" | "FROZEN_RIVER" | "GROVE" | "ICE_SPIKES" | "JAGGED_PEAKS"
  | "JUNGLE" | "LUKEWARM_OCEAN" | "LUSH_CAVES" | "MANGROVE_SWAMP" | "MEADOW"
  | "MUSHROOM_FIELDS" | "NETHER_WASTES" | "OCEAN" | "OLD_GROWTH_BIRCH_FOREST"
  | "OLD_GROWTH_PINE_TAIGA" | "OLD_GROWTH_SPRUCE_TAIGA" | "PALE_GARDEN" | "PLAINS"
  | "RIVER" | "SAVANNA" | "SAVANNA_PLATEAU" | "SMALL_END_ISLANDS" | "SNOWY_BEACH"
  | "SNOWY_PLAINS" | "SNOWY_SLOPES" | "SNOWY_TAIGA" | "SOUL_SAND_VALLEY"
  | "SPARSE_JUNGLE" | "STONY_PEAKS" | "STONY_SHORE" | "SUNFLOWER_PLAINS" | "SWAMP"
  | "TAIGA" | "THE_END" | "THE_VOID" | "WARM_OCEAN" | "WARPED_FOREST"
  | "WINDSWEPT_FOREST" | "WINDSWEPT_GRAVELLY_HILLS" | "WINDSWEPT_HILLS"
  | "WINDSWEPT_SAVANNA" | "WOODED_BADLANDS";

/**
 * WHY: Use Record<BiomeKey, BukkitBiome> instead of Record<string, BukkitBiome>?
 * ------------------------------------------------------------------------------
 * 
 * Record<string, BukkitBiome> means ALL string keys must map to BukkitBiome.
 * This conflicts with values() and valueOf() which are functions, not BukkitBiome.
 * 
 * Record<BiomeKey, BukkitBiome> only requires the specific BiomeKey strings
 * to be BukkitBiome, allowing other properties (like methods) to have different types.
 */
export const Biome: Record<BiomeKey, BukkitBiome> & JavaEnumClass<BukkitBiome> = {
  BADLANDS: org.bukkit.block.Biome.BADLANDS,
  BAMBOO_JUNGLE: org.bukkit.block.Biome.BAMBOO_JUNGLE,
  BASALT_DELTAS: org.bukkit.block.Biome.BASALT_DELTAS,
  BEACH: org.bukkit.block.Biome.BEACH,
  BIRCH_FOREST: org.bukkit.block.Biome.BIRCH_FOREST,
  CHERRY_GROVE: org.bukkit.block.Biome.CHERRY_GROVE,
  COLD_OCEAN: org.bukkit.block.Biome.COLD_OCEAN,
  CRIMSON_FOREST: org.bukkit.block.Biome.CRIMSON_FOREST,
  CUSTOM: org.bukkit.block.Biome.CUSTOM,
  DARK_FOREST: org.bukkit.block.Biome.DARK_FOREST,
  DEEP_COLD_OCEAN: org.bukkit.block.Biome.DEEP_COLD_OCEAN,
  DEEP_DARK: org.bukkit.block.Biome.DEEP_DARK,
  DEEP_FROZEN_OCEAN: org.bukkit.block.Biome.DEEP_FROZEN_OCEAN,
  DEEP_LUKEWARM_OCEAN: org.bukkit.block.Biome.DEEP_LUKEWARM_OCEAN,
  DEEP_OCEAN: org.bukkit.block.Biome.DEEP_OCEAN,
  DESERT: org.bukkit.block.Biome.DESERT,
  DRIPSTONE_CAVES: org.bukkit.block.Biome.DRIPSTONE_CAVES,
  END_BARRENS: org.bukkit.block.Biome.END_BARRENS,
  END_HIGHLANDS: org.bukkit.block.Biome.END_HIGHLANDS,
  END_MIDLANDS: org.bukkit.block.Biome.END_MIDLANDS,
  ERODED_BADLANDS: org.bukkit.block.Biome.ERODED_BADLANDS,
  FLOWER_FOREST: org.bukkit.block.Biome.FLOWER_FOREST,
  FOREST: org.bukkit.block.Biome.FOREST,
  FROZEN_OCEAN: org.bukkit.block.Biome.FROZEN_OCEAN,
  FROZEN_PEAKS: org.bukkit.block.Biome.FROZEN_PEAKS,
  FROZEN_RIVER: org.bukkit.block.Biome.FROZEN_RIVER,
  GROVE: org.bukkit.block.Biome.GROVE,
  ICE_SPIKES: org.bukkit.block.Biome.ICE_SPIKES,
  JAGGED_PEAKS: org.bukkit.block.Biome.JAGGED_PEAKS,
  JUNGLE: org.bukkit.block.Biome.JUNGLE,
  LUKEWARM_OCEAN: org.bukkit.block.Biome.LUKEWARM_OCEAN,
  LUSH_CAVES: org.bukkit.block.Biome.LUSH_CAVES,
  MANGROVE_SWAMP: org.bukkit.block.Biome.MANGROVE_SWAMP,
  MEADOW: org.bukkit.block.Biome.MEADOW,
  MUSHROOM_FIELDS: org.bukkit.block.Biome.MUSHROOM_FIELDS,
  NETHER_WASTES: org.bukkit.block.Biome.NETHER_WASTES,
  OCEAN: org.bukkit.block.Biome.OCEAN,
  OLD_GROWTH_BIRCH_FOREST: org.bukkit.block.Biome.OLD_GROWTH_BIRCH_FOREST,
  OLD_GROWTH_PINE_TAIGA: org.bukkit.block.Biome.OLD_GROWTH_PINE_TAIGA,
  OLD_GROWTH_SPRUCE_TAIGA: org.bukkit.block.Biome.OLD_GROWTH_SPRUCE_TAIGA,
  PALE_GARDEN: org.bukkit.block.Biome.PALE_GARDEN,
  PLAINS: org.bukkit.block.Biome.PLAINS,
  RIVER: org.bukkit.block.Biome.RIVER,
  SAVANNA: org.bukkit.block.Biome.SAVANNA,
  SAVANNA_PLATEAU: org.bukkit.block.Biome.SAVANNA_PLATEAU,
  SMALL_END_ISLANDS: org.bukkit.block.Biome.SMALL_END_ISLANDS,
  SNOWY_BEACH: org.bukkit.block.Biome.SNOWY_BEACH,
  SNOWY_PLAINS: org.bukkit.block.Biome.SNOWY_PLAINS,
  SNOWY_SLOPES: org.bukkit.block.Biome.SNOWY_SLOPES,
  SNOWY_TAIGA: org.bukkit.block.Biome.SNOWY_TAIGA,
  SOUL_SAND_VALLEY: org.bukkit.block.Biome.SOUL_SAND_VALLEY,
  SPARSE_JUNGLE: org.bukkit.block.Biome.SPARSE_JUNGLE,
  STONY_PEAKS: org.bukkit.block.Biome.STONY_PEAKS,
  STONY_SHORE: org.bukkit.block.Biome.STONY_SHORE,
  SUNFLOWER_PLAINS: org.bukkit.block.Biome.SUNFLOWER_PLAINS,
  SWAMP: org.bukkit.block.Biome.SWAMP,
  TAIGA: org.bukkit.block.Biome.TAIGA,
  THE_END: org.bukkit.block.Biome.THE_END,
  THE_VOID: org.bukkit.block.Biome.THE_VOID,
  WARM_OCEAN: org.bukkit.block.Biome.WARM_OCEAN,
  WARPED_FOREST: org.bukkit.block.Biome.WARPED_FOREST,
  WINDSWEPT_FOREST: org.bukkit.block.Biome.WINDSWEPT_FOREST,
  WINDSWEPT_GRAVELLY_HILLS: org.bukkit.block.Biome.WINDSWEPT_GRAVELLY_HILLS,
  WINDSWEPT_HILLS: org.bukkit.block.Biome.WINDSWEPT_HILLS,
  WINDSWEPT_SAVANNA: org.bukkit.block.Biome.WINDSWEPT_SAVANNA,
  WOODED_BADLANDS: org.bukkit.block.Biome.WOODED_BADLANDS,

  values(): BukkitBiome[] {
    return org.bukkit.block.Biome.values();
  },

  valueOf(name: string): BukkitBiome {
    return org.bukkit.block.Biome.valueOf(name);
  }
};