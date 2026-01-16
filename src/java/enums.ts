
// World enums
import type { BukkitTreeType, TreeTypeKey } from "../world/enums/treeType";
import type { BukkitBiome, BiomeKey } from "../world/enums/biomeType";
import type { BukkitBlockFace, BlockFaceKey } from "../world/enums/blockFace";

// Entity enums
import type { BukkitEntityType, EntityTypeKey } from "../entities/enums/entityType";
import type { BukkitGameMode, GameModeKey } from "../entities/enums/gamemodeType";
import type { BukkitPose, PoseKey } from "../entities/enums/pose";

// Item enums
import type { BukkitDyeColor, DyeColorKey } from "../items/enums/dyeColorType";

// Sound enums
import type { BukkitSound, SoundKey } from "../sounds/types/soundType";
import { createEnum } from "./utils/enumHelper";
import { BukkitEnvironment, EnvironmentKey } from "../world/enums/worldEnv";
import { BukkitDifficulty, DifficultyKey } from "../world/enums/difficulty";

// ============= WORLD =============

export const TreeType = createEnum<TreeTypeKey, BukkitTreeType>(
  "org.bukkit.TreeType"
);

export const Difficulty = createEnum<DifficultyKey, BukkitDifficulty>(
  "org.bukkit.Difficulty"
);

export const Biome = createEnum<BiomeKey, BukkitBiome>(
  "org.bukkit.block.Biome"
);

export const BlockFace = createEnum<BlockFaceKey, BukkitBlockFace>(
  "org.bukkit.block.BlockFace"
);

export const Environment = createEnum<EnvironmentKey, BukkitEnvironment>(
  "org.bukkit.World$Environment"
);

// ============= ENTITY =============

export const EntityType = createEnum<EntityTypeKey, BukkitEntityType>(
  "org.bukkit.entity.EntityType"
);

export const GameMode = createEnum<GameModeKey, BukkitGameMode>(
  "org.bukkit.GameMode"
);

export const Pose = createEnum<PoseKey, BukkitPose>(
  "org.bukkit.entity.Pose"
);

export const DyeColor = createEnum<DyeColorKey, BukkitDyeColor>(
  "org.bukkit.DyeColor"
);

// ============= SOUND =============

export const Sound = createEnum<SoundKey, BukkitSound>(
  "org.bukkit.Sound"
);