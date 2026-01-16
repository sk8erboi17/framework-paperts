/**
 * DESIGN
 * ------
 * World represents a dimension containing entities, chunks, and blocks.
 * 
 * WORLD STRUCTURE:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                         WORLD                               │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                    CHUNKS                           │   │
 *   │   │                                                     │   │
 *   │   │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                   │   │
 *   │   │   │Chunk│ │Chunk│ │Chunk│ │Chunk│  16x16 blocks     │   │
 *   │   │   │ 0,0 │ │ 1,0 │ │ 2,0 │ │ 3,0 │  each             │   │
 *   │   │   └─────┘ └─────┘ └─────┘ └─────┘                   │   │
 *   │   │   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐                   │   │
 *   │   │   │Chunk│ │Chunk│ │Chunk│ │Chunk│                   │   │
 *   │   │   │ 0,1 │ │ 1,1 │ │ 2,1 │ │ 3,1 │                   │   │
 *   │   │   └─────┘ └─────┘ └─────┘ └─────┘                   │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   │   ENTITIES: Players, Mobs, Items, Projectiles               │
 *   │   STRUCTURES: Villages, Temples, Strongholds                │
 *   │   WEATHER: Rain, Thunder, Clear                             │
 *   │   TIME: Day/Night cycle (24000 ticks per day)               │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * TIME SYSTEM:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │   0        6000      12000     18000     24000              │
 *   │   |         |          |         |         |                │
 *   │   Dawn    Noon      Sunset    Midnight   Dawn               │
 *   │   ████████████████░░░░░░░░░░░░░░░░░░░░░████                 │
 *   │        Day                Night           Day               │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * ENVIRONMENTS:
 *   - NORMAL (Overworld): Day/night, weather, -64 to 320
 *   - NETHER: No day/night, no weather, 0 to 256
 *   - THE_END: No day/night, no weather, 0 to 256
 *   - CUSTOM: Plugin-defined dimensions
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/World.html
 */

import { BukkitSpawnCategory } from "../../entities/enums/spawnCategory";
import { BukkitEntity } from "../../entities/types/bukkitEntity";
import { BukkitLivingEntity } from "../../entities/types/bukkitLivingEntity";
import { BukkitPlayer } from "../../entities/types/bukkitPlayer";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { JavaCollection } from "../../java/types/collections";
import { JavaList } from "../../java/types/list";
import { JavaMap } from "../../java/types/map";
import { JavaRandom } from "../../java/types/random";
import { JavaSet } from "../../java/types/set";
import { JavaUUID } from "../../java/types/uuid";
import { BukkitEffect } from "../../particles/type/effect";
import { BukkitParticle } from "../../particles/type/particle";
import { BukkitSoundCategory } from "../../sounds/types/soundGroup";
import { BukkitSound } from "../../sounds/types/soundType";
import { BukkitBiome } from "../enums/biomeType";
import { BukkitDifficulty } from "../enums/difficulty";
import { BukkitStructureType } from "../enums/structureType";
import { BukkitTreeType } from "../enums/treeType";
import { BukkitEnvironment } from "../enums/worldEnv";
import { BukkitBiomeProvider } from "./biomeProvider";
import { BukkitBlock } from "./block";
import { BukkitBlockData } from "./blockData";
import { BukkitBlockState } from "./blockState";
import { BukkitBoundingBox } from "./boundingBox";
import { BukkitChunk } from "./chunk";
import { BukkitDragonBattle } from "./dragonBattle";
import { BukkitGameRule } from "./gamerule";
import { BukkitGeneratedStructure } from "./generatedStructure";
import { BukkitItem } from "./item";
import { BukkitLocation } from "./location";
import { BukkitPersistentDataContainer, BukkitPersistentDataHolder } from "./persistentData";
import { BukkitRegionAccessor } from "./regionAccesor";
import { BukkitStructure } from "./structure";
import { BukkitVector } from "./vector";
import { BukkitWorldInfo } from "./worldInfo";


// ============================================
// NESTED TYPES
// ============================================


/**
 * Fluid collision mode for ray tracing.
 */
export type FluidCollisionMode = "NEVER" | "SOURCE_ONLY" | "ALWAYS";

/**
 * Height map types.
 */
export type HeightMap =
    | "MOTION_BLOCKING"
    | "MOTION_BLOCKING_NO_LEAVES"
    | "OCEAN_FLOOR"
    | "OCEAN_FLOOR_WG"
    | "WORLD_SURFACE"
    | "WORLD_SURFACE_WG";

/**
 * Ray trace result.
 */
export interface BukkitRayTraceResult {
    getHitBlock(): BukkitBlock | null;
    getHitBlockFace(): any | null;
    getHitEntity(): BukkitEntity | null;
    getHitPosition(): BukkitVector;
}

/**
 * Structure search result.
 */
export interface BukkitStructureSearchResult {
    getLocation(): BukkitLocation;
    getStructure(): BukkitStructure;
}

/**
 * Biome search result.
 */
export interface BukkitBiomeSearchResult {
    getLocation(): BukkitLocation;
    getBiome(): BukkitBiome;
}

/**
 * Chunk snapshot for async reading.
 */
export interface BukkitChunkSnapshot {
    getX(): number;
    getZ(): number;
    getWorldName(): string;
    getBlockType(x: number, y: number, z: number): any;
    getBlockData(x: number, y: number, z: number): BukkitBlockData;
    getBiome(x: number, y: number, z: number): BukkitBiome;
    getRawBiomeTemperature(x: number, y: number, z: number): number;
    isSectionEmpty(sy: number): boolean;
}

// ============================================
// WORLD INTERFACE
// ============================================

/**
 * Represents a world/dimension containing entities, chunks, and blocks.
 */
export interface BukkitWorld extends BukkitWorldInfo, BukkitPersistentDataHolder, BukkitRegionAccessor {
    // ============================================
    // WORLDINFO INHERITED (re-declared for clarity)
    // ============================================

    /** Get world name */
    getName(): string;

    /** Get world UUID */
    getUID(): JavaUUID;

    /** Get environment type */
    getEnvironment(): BukkitEnvironment;

    /** Get world seed */
    getSeed(): number;

    /** Get minimum height */
    getMinHeight(): number;

    /** Get maximum height */
    getMaxHeight(): number;

    // ============================================
    // KEYED
    // ============================================

    /** Get namespaced key */
    getKey(): BukkitNamespacedKey;

    // ============================================
    // PERSISTENT DATA
    // ============================================

    /** Get persistent data container */
    getPersistentDataContainer(): BukkitPersistentDataContainer;

    // ============================================
    // BLOCKS
    // ============================================

    /**
     * Get block at coordinates.
     */
    getBlockAt(x: number, y: number, z: number): BukkitBlock;

    /**
     * Get block at location.
     */
    getBlockAt(location: BukkitLocation): BukkitBlock;

    /**
     * Get highest non-empty block at coordinates.
     */
    getHighestBlockAt(x: number, z: number): BukkitBlock;

    /**
     * Get highest block at location.
     */
    getHighestBlockAt(location: BukkitLocation): BukkitBlock;

    /**
     * Get highest block using height map.
     */
    getHighestBlockAt(x: number, z: number, heightMap: HeightMap): BukkitBlock;

    /**
     * Get highest block at location using height map.
     */
    getHighestBlockAt(location: BukkitLocation, heightMap: HeightMap): BukkitBlock;

    // ============================================
    // CHUNKS
    // ============================================

    /**
     * Get chunk at coordinates.
     */
    getChunkAt(x: number, z: number): BukkitChunk;

    /**
     * Get chunk at coordinates, optionally generating.
     */
    getChunkAt(x: number, z: number, generate: boolean): BukkitChunk;

    /**
     * Get chunk at location.
     */
    getChunkAt(location: BukkitLocation): BukkitChunk;

    /**
     * Get chunk containing block.
     */
    getChunkAt(block: BukkitBlock): BukkitChunk;

    /**
     * Check if chunk is loaded.
     */
    isChunkLoaded(chunk: BukkitChunk): boolean;

    /**
     * Check if chunk at coordinates is loaded.
     */
    isChunkLoaded(x: number, z: number): boolean;

    /**
     * Check if chunk at coordinates is generated.
     */
    isChunkGenerated(x: number, z: number): boolean;

    /**
     * Get all loaded chunks.
     */
    getLoadedChunks(): BukkitChunk[];

    /**
     * Load chunk.
     */
    loadChunk(chunk: BukkitChunk): void;

    /**
     * Load chunk at coordinates.
     */
    loadChunk(x: number, z: number): void;

    /**
     * Load chunk at coordinates, optionally generating.
     */
    loadChunk(x: number, z: number, generate: boolean): boolean;

    /**
     * Unload chunk.
     */
    unloadChunk(chunk: BukkitChunk): boolean;

    /**
     * Unload chunk at coordinates.
     */
    unloadChunk(x: number, z: number): boolean;

    /**
     * Unload chunk at coordinates, optionally saving.
     */
    unloadChunk(x: number, z: number, save: boolean): boolean;

    /**
     * Queue chunk for unloading.
     */
    unloadChunkRequest(x: number, z: number): boolean;

    /**
     * Get players who can see a chunk.
     */
    getPlayersSeeingChunk(chunk: BukkitChunk): JavaCollection<BukkitPlayer>;

    /**
     * Get players who can see chunk at coordinates.
     */
    getPlayersSeeingChunk(x: number, z: number): JavaCollection<BukkitPlayer>;

    /**
     * Check if chunk is force loaded.
     */
    isChunkForceLoaded(x: number, z: number): boolean;

    /**
     * Set chunk force loaded state.
     */
    setChunkForceLoaded(x: number, z: number, forced: boolean): void;

    /**
     * Get all force loaded chunks.
     */
    getForceLoadedChunks(): JavaCollection<BukkitChunk>;

    /**
     * Add plugin chunk ticket.
     */
    addPluginChunkTicket(x: number, z: number, plugin: any): boolean;

    /**
     * Remove plugin chunk ticket.
     */
    removePluginChunkTicket(x: number, z: number, plugin: any): boolean;

    /**
     * Remove all plugin chunk tickets.
     */
    removePluginChunkTickets(plugin: any): void;

    /**
     * Get plugins with tickets for chunk.
     */
    getPluginChunkTickets(x: number, z: number): JavaCollection<any>;

    /**
     * Get all plugin chunk tickets.
     */
    getPluginChunkTickets(): JavaMap<any, JavaCollection<BukkitChunk>>;

    /**
     * Get chunks intersecting bounding box.
     */
    getIntersectingChunks(box: BukkitBoundingBox): JavaCollection<BukkitChunk>;

    /**
     * Get empty chunk snapshot.
     */
    getEmptyChunkSnapshot(
        x: number,
        z: number,
        includeBiome: boolean,
        includeBiomeTemp: boolean
    ): BukkitChunkSnapshot;

    // ============================================
    // ENTITIES
    // ============================================

    /**
     * Get all entities in world.
     */
    getEntities(): JavaList<BukkitEntity>;

    /**
     * Get all living entities in world.
     */
    getLivingEntities(): JavaList<BukkitLivingEntity>;

    /**
     * Get entities by class.
     */
    getEntitiesByClass<T extends BukkitEntity>(cls: any): JavaCollection<T>;

    /**
     * Get entities by multiple classes.
     */
    getEntitiesByClasses(...classes: any[]): JavaCollection<BukkitEntity>;

    /**
     * Get all players in world.
     */
    getPlayers(): JavaList<BukkitPlayer>;

    /**
     * Get nearby entities around location.
     */
    getNearbyEntities(
        location: BukkitLocation,
        x: number,
        y: number,
        z: number
    ): JavaCollection<BukkitEntity>;

    /**
     * Get nearby entities with filter.
     */
    getNearbyEntities(
        location: BukkitLocation,
        x: number,
        y: number,
        z: number,
        filter: (entity: BukkitEntity) => boolean
    ): JavaCollection<BukkitEntity>;

    /**
     * Get entities in bounding box.
     */
    getNearbyEntities(boundingBox: BukkitBoundingBox): JavaCollection<BukkitEntity>;

    /**
     * Get entities in bounding box with filter.
     */
    getNearbyEntities(
        boundingBox: BukkitBoundingBox,
        filter: (entity: BukkitEntity) => boolean
    ): JavaCollection<BukkitEntity>;

    // ============================================
    // SPAWNING
    // ============================================

    /**
     * Drop item at location.
     */
    dropItem(location: BukkitLocation, item: BukkitItemStack): BukkitItem;

    /**
     * Drop item with callback.
     */
    dropItem(
        location: BukkitLocation,
        item: BukkitItemStack,
        callback: (item: BukkitItem) => void
    ): BukkitItem;

    /**
     * Drop item naturally (with random offset).
     */
    dropItemNaturally(location: BukkitLocation, item: BukkitItemStack): BukkitItem;

    /**
     * Drop item naturally with callback.
     */
    dropItemNaturally(
        location: BukkitLocation,
        item: BukkitItemStack,
        callback: (item: BukkitItem) => void
    ): BukkitItem;

    /**
     * Spawn arrow.
     */
    spawnArrow(
        location: BukkitLocation,
        direction: BukkitVector,
        speed: number,
        spread: number
    ): any;

    /**
     * Spawn arrow of specific class.
     */
    spawnArrow<T>(
        location: BukkitLocation,
        direction: BukkitVector,
        speed: number,
        spread: number,
        clazz: any
    ): T;

    /**
     * Spawn entity by class.
     */
    spawn<T extends BukkitEntity>(location: BukkitLocation, clazz: any): T;

    /**
     * Spawn entity with pre-spawn callback.
     */
    spawn<T extends BukkitEntity>(
        location: BukkitLocation,
        clazz: any,
        callback: ((entity: T) => void) | null
    ): T;

    /**
     * Spawn entity with randomization control.
     */
    spawn<T extends BukkitEntity>(
        location: BukkitLocation,
        clazz: any,
        randomizeData: boolean,
        callback: ((entity: T) => void) | null
    ): T;

    /**
     * Spawn living entity with spawn reason.
     * (World-specific overload)
     */
    spawn<T extends BukkitLivingEntity>(
        location: BukkitLocation,
        clazz: any,
        spawnReason: any,
        randomizeData: boolean,
        callback: ((entity: T) => void) | null
    ): T;

    /**
     * Spawn falling block.
     */
    spawnFallingBlock(location: BukkitLocation, data: BukkitBlockData): any;

    /**
     * Generate tree at location (simplified World method).
     */
    generateTree(location: BukkitLocation, type: BukkitTreeType): boolean;

    /**
     * Generate tree at location with random.
     */
    generateTree(
    location: BukkitLocation,
    random: JavaRandom,
    type: BukkitTreeType
    ): boolean;

    /**
     * Generate tree with state consumer.
     */
    generateTree(
    location: BukkitLocation,
    random: JavaRandom,
    type: BukkitTreeType,
    stateConsumer: ((state: BukkitBlockState) => void) | null
    ): boolean;

    /**
     * Generate tree with state predicate.
     */
    generateTree(
    location: BukkitLocation,
    random: JavaRandom,
    type: BukkitTreeType,
    statePredicate: ((state: BukkitBlockState) => boolean) | null
    ): boolean;

    /**
     * Strike lightning at location.
     */
    strikeLightning(location: BukkitLocation): any;

    /**
     * Strike visual lightning (no damage).
     */
    strikeLightningEffect(location: BukkitLocation): any;

    // ============================================
    // RAY TRACING
    // ============================================

    /**
     * Ray trace for entities.
     */
    rayTraceEntities(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number
    ): BukkitRayTraceResult | null;

    /**
     * Ray trace for entities with size.
     */
    rayTraceEntities(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number,
        raySize: number
    ): BukkitRayTraceResult | null;

    /**
     * Ray trace for entities with filter.
     */
    rayTraceEntities(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number,
        filter: (entity: BukkitEntity) => boolean
    ): BukkitRayTraceResult | null;

    /**
     * Ray trace for entities with size and filter.
     */
    rayTraceEntities(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number,
        raySize: number,
        filter: (entity: BukkitEntity) => boolean
    ): BukkitRayTraceResult | null;

    /**
     * Ray trace for blocks.
     */
    rayTraceBlocks(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number
    ): BukkitRayTraceResult | null;

    /**
     * Ray trace for blocks with fluid mode.
     */
    rayTraceBlocks(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number,
        fluidCollisionMode: FluidCollisionMode
    ): BukkitRayTraceResult | null;

    /**
     * Ray trace for blocks with options.
     */
    rayTraceBlocks(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number,
        fluidCollisionMode: FluidCollisionMode,
        ignorePassableBlocks: boolean
    ): BukkitRayTraceResult | null;

    /**
     * Ray trace for both blocks and entities.
     */
    rayTrace(
        start: BukkitLocation,
        direction: BukkitVector,
        maxDistance: number,
        fluidCollisionMode: FluidCollisionMode,
        ignorePassableBlocks: boolean,
        raySize: number,
        filter: ((entity: BukkitEntity) => boolean) | null
    ): BukkitRayTraceResult | null;

    // ============================================
    // SPAWN LOCATION
    // ============================================

    /**
     * Get spawn location.
     */
    getSpawnLocation(): BukkitLocation;

    /**
     * Set spawn location.
     */
    setSpawnLocation(location: BukkitLocation): boolean;

    /**
     * Set spawn location with angle.
     */
    setSpawnLocation(x: number, y: number, z: number, angle: number): boolean;

    /**
     * Set spawn location.
     */
    setSpawnLocation(x: number, y: number, z: number): boolean;

    // ============================================
    // TIME
    // ============================================

    /**
     * Get relative time (0-24000).
     */
    getTime(): number;

    /**
     * Set relative time.
     */
    setTime(time: number): void;

    /**
     * Get full/absolute time.
     */
    getFullTime(): number;

    /**
     * Set full time.
     */
    setFullTime(time: number): void;

    /**
     * Get game time since world generation.
     */
    getGameTime(): number;

    // ============================================
    // WEATHER
    // ============================================

    /**
     * Check if there's a storm.
     */
    hasStorm(): boolean;

    /**
     * Set storm state.
     */
    setStorm(hasStorm: boolean): void;

    /**
     * Get weather duration in ticks.
     */
    getWeatherDuration(): number;

    /**
     * Set weather duration.
     */
    setWeatherDuration(duration: number): void;

    /**
     * Check if thundering.
     */
    isThundering(): boolean;

    /**
     * Set thundering state.
     */
    setThundering(thundering: boolean): void;

    /**
     * Get thunder duration.
     */
    getThunderDuration(): number;

    /**
     * Set thunder duration.
     */
    setThunderDuration(duration: number): void;

    /**
     * Check if weather is clear.
     */
    isClearWeather(): boolean;

    /**
     * Get clear weather duration.
     */
    getClearWeatherDuration(): number;

    /**
     * Set clear weather duration.
     */
    setClearWeatherDuration(duration: number): void;

    // ============================================
    // EXPLOSIONS
    // ============================================

    /**
     * Create explosion.
     */
    createExplosion(x: number, y: number, z: number, power: number): boolean;

    /**
     * Create explosion with fire option.
     */
    createExplosion(
        x: number,
        y: number,
        z: number,
        power: number,
        setFire: boolean
    ): boolean;

    /**
     * Create explosion with options.
     */
    createExplosion(
        x: number,
        y: number,
        z: number,
        power: number,
        setFire: boolean,
        breakBlocks: boolean
    ): boolean;

    /**
     * Create explosion with source entity.
     */
    createExplosion(
        x: number,
        y: number,
        z: number,
        power: number,
        setFire: boolean,
        breakBlocks: boolean,
        source: BukkitEntity | null
    ): boolean;

    /**
     * Create explosion at location.
     */
    createExplosion(location: BukkitLocation, power: number): boolean;

    /**
     * Create explosion at location with fire.
     */
    createExplosion(
        location: BukkitLocation,
        power: number,
        setFire: boolean
    ): boolean;

    /**
     * Create explosion at location with options.
     */
    createExplosion(
        location: BukkitLocation,
        power: number,
        setFire: boolean,
        breakBlocks: boolean
    ): boolean;

    /**
     * Create explosion at location with source.
     */
    createExplosion(
        location: BukkitLocation,
        power: number,
        setFire: boolean,
        breakBlocks: boolean,
        source: BukkitEntity | null
    ): boolean;

    // ============================================
    // PVP & DIFFICULTY
    // ============================================

    /**
     * Get PVP setting.
     */
    getPVP(): boolean;

    /**
     * Set PVP setting.
     */
    setPVP(pvp: boolean): void;

    /**
     * Get difficulty.
     */
    getDifficulty(): BukkitDifficulty;

    /**
     * Set difficulty.
     */
    setDifficulty(difficulty: BukkitDifficulty): void;

    /**
     * Check if hardcore.
     */
    isHardcore(): boolean;

    /**
     * Set hardcore.
     */
    setHardcore(hardcore: boolean): void;

    // ============================================
    // GENERATORS
    // ============================================

    /**
     * Get chunk generator.
     */
    getGenerator(): any /* BukkitChunkGenerator*/ | null;

    /**
     * Get biome provider.
     */
    getBiomeProvider(): BukkitBiomeProvider | null;

    /**
     * Check if structures can generate.
     */
    canGenerateStructures(): boolean;

    // ============================================
    // SAVING
    // ============================================

    /**
     * Save world to disk.
     */
    save(): void;

    /**
     * Check if auto-save is enabled.
     */
    isAutoSave(): boolean;

    /**
     * Set auto-save.
     */
    setAutoSave(value: boolean): void;

    /**
     * Get world folder.
     */
    getWorldFolder(): any /*JavaFile*/;

    // ============================================
    // SPAWN FLAGS
    // ============================================

    /**
     * Set spawn flags.
     */
    setSpawnFlags(allowMonsters: boolean, allowAnimals: boolean): void;

    /**
     * Check if animals can spawn.
     */
    getAllowAnimals(): boolean;

    /**
     * Check if monsters can spawn.
     */
    getAllowMonsters(): boolean;

    /**
     * Get spawn limit for category.
     */
    getSpawnLimit(spawnCategory: BukkitSpawnCategory): number;

    /**
     * Set spawn limit for category.
     */
    setSpawnLimit(spawnCategory: BukkitSpawnCategory, limit: number): void;

    /**
     * Get ticks per spawn for category.
     */
    getTicksPerSpawns(spawnCategory: BukkitSpawnCategory): number;

    /**
     * Set ticks per spawn for category.
     */
    setTicksPerSpawns(
        spawnCategory: BukkitSpawnCategory,
        ticksPerCategorySpawn: number
    ): void;

    // ============================================
    // BIOME
    // ============================================

    /**
     * Get biome at location.
     */
    getBiome(location: BukkitLocation): BukkitBiome;

    /**
     * Get biome at coordinates.
     */
    getBiome(x: number, y: number, z: number): BukkitBiome;

    /**
     * Set biome at location.
     */
    setBiome(location: BukkitLocation, biome: BukkitBiome): void;

    /**
     * Set biome at coordinates.
     */
    setBiome(x: number, y: number, z: number, biome: BukkitBiome): void;

    /**
     * Get temperature at coordinates.
     */
    getTemperature(x: number, y: number, z: number): number;

    /**
     * Get humidity at coordinates.
     */
    getHumidity(x: number, y: number, z: number): number;
    // ============================================
    // WORLD PROPERTIES
    // ============================================

    /**
     * Get logical height for portals/chorus.
     */
    getLogicalHeight(): number;

    /**
     * Check if natural world.
     */
    isNatural(): boolean;

    /**
     * Check if beds work.
     */
    isBedWorks(): boolean;

    /**
     * Check if has skylight.
     */
    hasSkyLight(): boolean;

    /**
     * Check if has ceiling.
     */
    hasCeiling(): boolean;

    /**
     * Check if piglin safe.
     */
    isPiglinSafe(): boolean;

    /**
     * Check if respawn anchors work.
     */
    isRespawnAnchorWorks(): boolean;

    /**
     * Check if has raids.
     */
    hasRaids(): boolean;

    /**
     * Check if ultra warm (water evaporates).
     */
    isUltraWarm(): boolean;

    /**
     * Get sea level.
     */
    getSeaLevel(): number;

    /**
     * Get view distance.
     */
    getViewDistance(): number;

    /**
     * Get simulation distance.
     */
    getSimulationDistance(): number;

    // ============================================
    // GAME RULES
    // ============================================

    /**
     * Get game rule value.
     */
    getGameRuleValue<T>(rule: BukkitGameRule<T>): T | null;

    /**
     * Get game rule default.
     */
    getGameRuleDefault<T>(rule: BukkitGameRule<T>): T | null;

    /**
     * Set game rule value.
     */
    setGameRule<T>(rule: BukkitGameRule<T>, newValue: T): boolean;

    // ============================================
    // WORLD BORDER
    // ============================================

    /**
     * Get world border.
     */
    getWorldBorder(): any /* BukkitWorldBorder  */;

    // ============================================
    // SOUNDS & EFFECTS
    // ============================================

    /**
     * Play sound at location.
     */
    playSound(
        location: BukkitLocation,
        sound: BukkitSound,
        volume: number,
        pitch: number
    ): void;

    /**
     * Play sound by name at location.
     */
    playSound(
        location: BukkitLocation,
        sound: string,
        volume: number,
        pitch: number
    ): void;

    /**
     * Play sound with category at location.
     */
    playSound(
        location: BukkitLocation,
        sound: BukkitSound,
        category: BukkitSoundCategory,
        volume: number,
        pitch: number
    ): void;

    /**
     * Play sound by name with category.
     */
    playSound(
        location: BukkitLocation,
        sound: string,
        category: BukkitSoundCategory,
        volume: number,
        pitch: number
    ): void;

    /**
     * Play sound with seed.
     */
    playSound(
        location: BukkitLocation,
        sound: BukkitSound,
        category: BukkitSoundCategory,
        volume: number,
        pitch: number,
        seed: number
    ): void;

    /**
     * Play sound at entity location.
     */
    playSound(
        entity: BukkitEntity,
        sound: BukkitSound,
        volume: number,
        pitch: number
    ): void;

    /**
     * Play sound at entity with category.
     */
    playSound(
        entity: BukkitEntity,
        sound: BukkitSound,
        category: BukkitSoundCategory,
        volume: number,
        pitch: number
    ): void;

    /**
     * Play note.
     */
    playNote(location: BukkitLocation, instrument: any, note: any): void;

    /**
     * Play effect at location.
     */
    playEffect(location: BukkitLocation, effect: BukkitEffect, data: number): void;

    /**
     * Play effect with radius.
     */
    playEffect(
        location: BukkitLocation,
        effect: BukkitEffect,
        data: number,
        radius: number
    ): void;

    /**
     * Play effect with typed data.
     */
    playEffect<T>(
        location: BukkitLocation,
        effect: BukkitEffect,
        data: T | null
    ): void;

    /**
     * Play effect with typed data and radius.
     */
    playEffect<T>(
        location: BukkitLocation,
        effect: BukkitEffect,
        data: T | null,
        radius: number
    ): void;

    // ============================================
    // PARTICLES
    // ============================================

    /**
     * Spawn particle.
     */
    spawnParticle(
        particle: BukkitParticle,
        location: BukkitLocation,
        count: number
    ): void;

    /**
     * Spawn particle at coordinates.
     */
    spawnParticle(
        particle: BukkitParticle,
        x: number,
        y: number,
        z: number,
        count: number
    ): void;

    /**
     * Spawn particle with data.
     */
    spawnParticle<T>(
        particle: BukkitParticle,
        location: BukkitLocation,
        count: number,
        data: T | null
    ): void;

    /**
     * Spawn particle with offset.
     */
    spawnParticle(
        particle: BukkitParticle,
        location: BukkitLocation,
        count: number,
        offsetX: number,
        offsetY: number,
        offsetZ: number
    ): void;

    /**
     * Spawn particle with offset and extra.
     */
    spawnParticle(
        particle: BukkitParticle,
        location: BukkitLocation,
        count: number,
        offsetX: number,
        offsetY: number,
        offsetZ: number,
        extra: number
    ): void;

    /**
     * Spawn particle with all options.
     */
    spawnParticle<T>(
        particle: BukkitParticle,
        location: BukkitLocation,
        count: number,
        offsetX: number,
        offsetY: number,
        offsetZ: number,
        extra: number,
        data: T | null,
        force: boolean
    ): void;

    // ============================================
    // STRUCTURES
    // ============================================

    /**
     * Get structures in chunk.
     */
    getStructures(x: number, z: number): JavaCollection<BukkitGeneratedStructure>;

    /**
     * Get specific structures in chunk.
     */
    getStructures(
        x: number,
        z: number,
        structure: BukkitStructure
    ): JavaCollection<BukkitGeneratedStructure>;

    /**
     * Locate nearest structure.
     */
    locateNearestStructure(
        origin: BukkitLocation,
        structure: BukkitStructure,
        radius: number,
        findUnexplored: boolean
    ): BukkitStructureSearchResult | null;

    /**
     * Locate nearest structure by type.
     */
    locateNearestStructure(
        origin: BukkitLocation,
        structureType: BukkitStructureType,
        radius: number,
        findUnexplored: boolean
    ): BukkitStructureSearchResult | null;

    /**
     * Locate nearest biome.
     */
    locateNearestBiome(
        origin: BukkitLocation,
        radius: number,
        ...biomes: BukkitBiome[]
    ): BukkitBiomeSearchResult | null;

    /**
     * Locate nearest biome with intervals.
     */
    locateNearestBiome(
        origin: BukkitLocation,
        radius: number,
        horizontalInterval: number,
        verticalInterval: number,
        ...biomes: BukkitBiome[]
    ): BukkitBiomeSearchResult | null;

    // ============================================
    // RAIDS
    // ============================================

    /**
     * Locate nearest raid.
     */
    locateNearestRaid(location: BukkitLocation, radius: number): any /*JavaList<BukkitRaid>*/ | null;

    /**
     * Get all active raids.
     */
    getRaids(): any /*JavaList<BukkitRaid>*/;

    // ============================================
    // DRAGON BATTLE
    // ============================================

    /**
     * Get ender dragon battle (End only).
     */
    getEnderDragonBattle(): BukkitDragonBattle | null;

    // ============================================
    // FEATURE FLAGS
    // ============================================

    /**
     * Get enabled feature flags.
     */
    getFeatureFlags(): JavaSet<any>;

    // ============================================
    // SPIGOT
    // ============================================

    /**
     * Get Spigot API.
     */
    spigot(): any;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a World.
 */
export function isWorld(obj: any): obj is BukkitWorld {
    return obj !== null &&
        typeof obj === "object" &&
        typeof obj.getName === "function" &&
        typeof obj.getUID === "function" &&
        typeof obj.getEnvironment === "function" &&
        typeof obj.getBlockAt === "function" &&
        typeof obj.getChunkAt === "function" &&
        typeof obj.getEntities === "function" &&
        typeof obj.getPlayers === "function";
}

// ============================================
// TIME UTILITIES
// ============================================

/**
 * Time constants (in ticks).
 */
export const TIME = {
    DAWN: 0,
    NOON: 6000,
    SUNSET: 12000,
    MIDNIGHT: 18000,
    DAY_LENGTH: 24000,
} as const;

/**
 * Check if it's daytime.
 */
export function isDaytime(world: BukkitWorld): boolean {
    const time = world.getTime();
    return time < 12000 || time > 23000;
}

/**
 * Check if it's nighttime.
 */
export function isNighttime(world: BukkitWorld): boolean {
    return !isDaytime(world);
}

/**
 * Set time to day.
 */
export function setDay(world: BukkitWorld): void {
    world.setTime(TIME.DAWN);
}

/**
 * Set time to noon.
 */
export function setNoon(world: BukkitWorld): void {
    world.setTime(TIME.NOON);
}

/**
 * Set time to night.
 */
export function setNight(world: BukkitWorld): void {
    world.setTime(TIME.MIDNIGHT);
}

/**
 * Get time as string.
 */
export function getTimeString(world: BukkitWorld): string {
    const time = world.getTime();
    const hours = Math.floor(time / 1000) + 6;
    const normalizedHours = hours % 24;
    const minutes = Math.floor((time % 1000) / 16.67);

    return `${normalizedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

// ============================================
// WEATHER UTILITIES
// ============================================

/**
 * Clear weather.
 */
export function clearWeather(world: BukkitWorld): void {
    world.setStorm(false);
    world.setThundering(false);
}

/**
 * Start rain.
 */
export function startRain(world: BukkitWorld, duration?: number): void {
    world.setStorm(true);
    world.setThundering(false);
    if (duration !== undefined) {
        world.setWeatherDuration(duration);
    }
}

/**
 * Start thunder storm.
 */
export function startThunderStorm(world: BukkitWorld, duration?: number): void {
    world.setStorm(true);
    world.setThundering(true);
    if (duration !== undefined) {
        world.setWeatherDuration(duration);
        world.setThunderDuration(duration);
    }
}

/**
 * Get weather description.
 */
export function getWeatherDescription(world: BukkitWorld): string {
    if (world.isThundering()) return "Thunderstorm";
    if (world.hasStorm()) return "Rain";
    return "Clear";
}

// ============================================
// CHUNK UTILITIES
// ============================================

/**
 * Get loaded chunk count.
 */
export function getLoadedChunkCount(world: BukkitWorld): number {
    return world.getLoadedChunks().length;
}

/**
 * Unload all chunks except spawn area.
 */
export function unloadUnusedChunks(world: BukkitWorld): number {
    const chunks = world.getLoadedChunks();
    let unloaded = 0;

    for (const chunk of chunks) {
        if (world.unloadChunk(chunk)) {
            unloaded++;
        }
    }

    return unloaded;
}

/**
 * Check if chunk is within spawn.
 */
export function isChunkNearSpawn(
    world: BukkitWorld,
    chunkX: number,
    chunkZ: number,
    radius: number = 10
): boolean {
    const spawn = world.getSpawnLocation();
    const spawnChunkX = spawn.getBlockX() >> 4;
    const spawnChunkZ = spawn.getBlockZ() >> 4;

    return Math.abs(chunkX - spawnChunkX) <= radius &&
        Math.abs(chunkZ - spawnChunkZ) <= radius;
}

// ============================================
// ENTITY UTILITIES
// ============================================

/**
 * Get entity count.
 */
export function getEntityCount(world: BukkitWorld): number {
    const entities = world.getEntities();
    return typeof entities.size === "function" ? entities.size() : 0;
}

/**
 * Get player count.
 */
export function getPlayerCount(world: BukkitWorld): number {
    const players = world.getPlayers();
    return typeof players.size === "function" ? players.size() : 0;
}

/**
 * Get living entity count.
 */
export function getLivingEntityCount(world: BukkitWorld): number {
    const entities = world.getLivingEntities();
    return typeof entities.size === "function" ? entities.size() : 0;
}

/**
 * Remove all entities of a type.
 */
export function removeEntitiesByType(world: BukkitWorld, typeName: string): number {
    const entities = world.getEntities();
    let removed = 0;

    const iter = entities.iterator();
    while (iter.hasNext()) {
        const entity = iter.next();
        if (entity.getType().name() === typeName) {
            entity.remove();
            removed++;
        }
    }

    return removed;
}

// ============================================
// ENVIRONMENT SHORTCUTS
// ============================================

/**
 * Check if world is overworld.
 */
export function isOverworld(world: BukkitWorld): boolean {
    return world.getEnvironment().name() === "NORMAL";
}

/**
 * Check if world is nether.
 */
export function isNether(world: BukkitWorld): boolean {
    return world.getEnvironment().name() === "NETHER";
}

/**
 * Check if world is the end.
 */
export function isTheEnd(world: BukkitWorld): boolean {
    return world.getEnvironment().name() === "THE_END";
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a world.
 */
export function describeWorld(world: BukkitWorld): string {
    const name = world.getName();
    const env = world.getEnvironment().name();
    const players = getPlayerCount(world);
    const entities = getEntityCount(world);

    return `${name} (${env}) - ${players} players, ${entities} entities`;
}

/**
 * Get world info as plain object.
 */
export function getWorldInfo(world: BukkitWorld): {
    name: string;
    uid: string;
    environment: string;
    seed: number;
    minHeight: number;
    maxHeight: number;
    seaLevel: number;
    time: number;
    timeString: string;
    fullTime: number;
    weather: string;
    difficulty: string;
    isHardcore: boolean;
    pvp: boolean;
    playerCount: number;
    entityCount: number;
    loadedChunks: number;
    spawnLocation: { x: number; y: number; z: number };
} {
    const spawn = world.getSpawnLocation();

    return {
        name: world.getName(),
        uid: world.getUID().toString(),
        environment: world.getEnvironment().name(),
        seed: world.getSeed(),
        minHeight: world.getMinHeight(),
        maxHeight: world.getMaxHeight(),
        seaLevel: world.getSeaLevel(),
        time: world.getTime(),
        timeString: getTimeString(world),
        fullTime: world.getFullTime(),
        weather: getWeatherDescription(world),
        difficulty: world.getDifficulty().name(),
        isHardcore: world.isHardcore(),
        pvp: world.getPVP(),
        playerCount: getPlayerCount(world),
        entityCount: getEntityCount(world),
        loadedChunks: getLoadedChunkCount(world),
        spawnLocation: {
            x: spawn.getBlockX(),
            y: spawn.getBlockY(),
            z: spawn.getBlockZ(),
        },
    };
}

/**
 * Get world summary for multiple worlds.
 */
export function getWorldsSummary(worlds: BukkitWorld[]): {
    total: number;
    overworld: number;
    nether: number;
    end: number;
    custom: number;
    totalPlayers: number;
    totalEntities: number;
    totalLoadedChunks: number;
} {
    let overworld = 0;
    let nether = 0;
    let end = 0;
    let custom = 0;
    let totalPlayers = 0;
    let totalEntities = 0;
    let totalLoadedChunks = 0;

    for (const world of worlds) {
        const env = world.getEnvironment().name();

        switch (env) {
            case "NORMAL":
                overworld++;
                break;
            case "NETHER":
                nether++;
                break;
            case "THE_END":
                end++;
                break;
            default:
                custom++;
        }

        totalPlayers += getPlayerCount(world);
        totalEntities += getEntityCount(world);
        totalLoadedChunks += getLoadedChunkCount(world);
    }

    return {
        total: worlds.length,
        overworld,
        nether,
        end,
        custom,
        totalPlayers,
        totalEntities,
        totalLoadedChunks,
    };
}