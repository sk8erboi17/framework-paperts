/**
 * DESIGN
 * ------
 * GameRule represents server-side rules that control game behavior.
 * 
 * GameRules are per-world settings that can be changed via:
 * - /gamerule <rule> [value]
 * - World.setGameRule(rule, value)
 * 
 * GAMERULE TYPES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                     GameRule<T>                             │
 *   │                                                             │
 *   │   T = Boolean  →  true/false toggle                         │
 *   │   T = Integer  →  numeric value                             │
 *   │                                                             │
 *   │   world.setGameRule(GameRule.KEEP_INVENTORY, true);         │
 *   │   world.setGameRule(GameRule.RANDOM_TICK_SPEED, 3);         │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * GAMERULE CATEGORIES:
 * 
 *   DAMAGE & DEATH
 *   ├─ KEEP_INVENTORY (keep items on death)
 *   ├─ FALL_DAMAGE, FIRE_DAMAGE, DROWNING_DAMAGE, FREEZE_DAMAGE
 *   ├─ IMMEDIATE_RESPAWN (skip death screen)
 *   └─ SHOW_DEATH_MESSAGES
 * 
 *   SPAWNING
 *   ├─ SPAWN_MOBS, SPAWN_MONSTERS
 *   ├─ SPAWN_PHANTOMS, SPAWN_PATROLS
 *   ├─ SPAWN_WANDERING_TRADERS, SPAWN_WARDENS
 *   └─ MOB_GRIEFING
 * 
 *   DROPS
 *   ├─ MOB_DROPS, BLOCK_DROPS, ENTITY_DROPS
 *   ├─ BLOCK_EXPLOSION_DROP_DECAY
 *   ├─ MOB_EXPLOSION_DROP_DECAY
 *   └─ TNT_EXPLOSION_DROP_DECAY
 * 
 *   WORLD PROGRESSION
 *   ├─ ADVANCE_TIME, ADVANCE_WEATHER
 *   ├─ RANDOM_TICK_SPEED (plant growth, etc.)
 *   └─ PLAYERS_SLEEPING_PERCENTAGE
 * 
 *   COMMANDS & ADMIN
 *   ├─ COMMAND_BLOCK_OUTPUT
 *   ├─ COMMAND_BLOCKS_WORK
 *   ├─ SEND_COMMAND_FEEDBACK
 *   └─ LOG_ADMIN_COMMANDS
 * 
 *   PLAYER MECHANICS
 *   ├─ PVP
 *   ├─ NATURAL_HEALTH_REGENERATION
 *   ├─ LIMITED_CRAFTING
 *   └─ RESPAWN_RADIUS
 * 
 * NOTE: GameRule is NOT a traditional Java enum.
 * It's a generic interface with static field constants.
 * We provide enum-like utilities for consistency.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/GameRule.html
 */

import { BukkitNamespacedKey } from "../../items/types/namespacedKey";


// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All boolean game rule names.
 */
export type BooleanGameRuleKey =
  /* Damage & Death */
  | "KEEP_INVENTORY"
  | "FALL_DAMAGE"
  | "FIRE_DAMAGE"
  | "DROWNING_DAMAGE"
  | "FREEZE_DAMAGE"
  | "IMMEDIATE_RESPAWN"
  | "SHOW_DEATH_MESSAGES"
  | "ENDER_PEARLS_VANISH_ON_DEATH"
  /* Spawning */
  | "SPAWN_MOBS"
  | "SPAWN_MONSTERS"
  | "SPAWN_PHANTOMS"
  | "SPAWN_PATROLS"
  | "SPAWN_WANDERING_TRADERS"
  | "SPAWN_WARDENS"
  | "MOB_GRIEFING"
  | "RAIDS"
  /* Drops */
  | "MOB_DROPS"
  | "BLOCK_DROPS"
  | "ENTITY_DROPS"
  | "BLOCK_EXPLOSION_DROP_DECAY"
  | "MOB_EXPLOSION_DROP_DECAY"
  | "TNT_EXPLOSION_DROP_DECAY"
  /* World Progression */
  | "ADVANCE_TIME"
  | "ADVANCE_WEATHER"
  | "WATER_SOURCE_CONVERSION"
  | "LAVA_SOURCE_CONVERSION"
  | "SPREAD_VINES"
  | "TNT_EXPLODES"
  /* Commands & Admin */
  | "COMMAND_BLOCK_OUTPUT"
  | "COMMAND_BLOCKS_WORK"
  | "SPAWNER_BLOCKS_WORK"
  | "SEND_COMMAND_FEEDBACK"
  | "LOG_ADMIN_COMMANDS"
  /* Player Mechanics */
  | "PVP"
  | "NATURAL_HEALTH_REGENERATION"
  | "LIMITED_CRAFTING"
  | "FORGIVE_DEAD_PLAYERS"
  | "UNIVERSAL_ANGER"
  | "SPECTATORS_GENERATE_CHUNKS"
  | "PLAYER_MOVEMENT_CHECK"
  | "ELYTRA_MOVEMENT_CHECK"
  /* Messages & UI */
  | "SHOW_ADVANCEMENT_MESSAGES"
  | "REDUCED_DEBUG_INFO"
  | "GLOBAL_SOUND_EVENTS"
  | "LOCATOR_BAR"
  /* Nether */
  | "ALLOW_ENTERING_NETHER_USING_PORTALS"
  /* Projectiles */
  | "PROJECTILES_CAN_BREAK_BLOCKS";

/**
 * All integer game rule names.
 */
export type IntegerGameRuleKey =
  | "RANDOM_TICK_SPEED"
  | "RESPAWN_RADIUS"
  | "MAX_ENTITY_CRAMMING"
  | "MAX_COMMAND_SEQUENCE_LENGTH"
  | "MAX_COMMAND_FORKS"
  | "MAX_BLOCK_MODIFICATIONS"
  | "PLAYERS_SLEEPING_PERCENTAGE"
  | "MAX_SNOW_ACCUMULATION_HEIGHT"
  | "PLAYERS_NETHER_PORTAL_DEFAULT_DELAY"
  | "PLAYERS_NETHER_PORTAL_CREATIVE_DELAY"
  | "MAX_MINECART_SPEED"
  | "FIRE_SPREAD_RADIUS_AROUND_PLAYER";

/**
 * All game rule names.
 */
export type GameRuleKey = BooleanGameRuleKey | IntegerGameRuleKey;

/**
 * GameRule interface.
 * 
 * Generic type T is either Boolean or Integer.
 */
export interface BukkitGameRule<T> {
  /**
   * Get the name of this game rule.
   * 
   * @deprecated Use getKey() instead.
   */
  getName(): string;

  /**
   * Get the namespaced key.
   * 
   * @deprecated Use getKeyOrThrow() instead.
   */
  getKey(): BukkitNamespacedKey;

  /**
   * Get namespaced key, or null if not registered.
   */
  getKeyOrNull(): BukkitNamespacedKey | null;

  /**
   * Get namespaced key, or throw if not registered.
   */
  getKeyOrThrow(): BukkitNamespacedKey;

  /**
   * Check if game rule is registered.
   */
  isRegistered(): boolean;

  /**
   * Get the type of this game rule.
   * 
   * @returns Boolean.class or Integer.class
   */
  getType(): any;
}

/**
 * Boolean game rule.
 */
export interface BukkitBooleanGameRule extends BukkitGameRule<boolean> {}

/**
 * Integer game rule.
 */
export interface BukkitIntegerGameRule extends BukkitGameRule<number> {}

/**
 * GameRule class type with all constants.
 */
export interface GameRuleStatic {
  /* ========== DAMAGE & DEATH ========== */
  
  /** Keep items in inventory after death. Default: false */
  KEEP_INVENTORY: BukkitBooleanGameRule;
  
  /** Whether fall damage is enabled. Default: true */
  FALL_DAMAGE: BukkitBooleanGameRule;
  
  /** Whether fire damage is enabled. Default: true */
  FIRE_DAMAGE: BukkitBooleanGameRule;
  
  /** Whether drowning damage is enabled. Default: true */
  DROWNING_DAMAGE: BukkitBooleanGameRule;
  
  /** Whether freeze damage is enabled. Default: true */
  FREEZE_DAMAGE: BukkitBooleanGameRule;
  
  /** Skip death screen and respawn immediately. Default: false */
  IMMEDIATE_RESPAWN: BukkitBooleanGameRule;
  
  /** Show death messages in chat. Default: true */
  SHOW_DEATH_MESSAGES: BukkitBooleanGameRule;
  
  /** Ender pearls vanish when player dies. Default: true */
  ENDER_PEARLS_VANISH_ON_DEATH: BukkitBooleanGameRule;

  /* ========== SPAWNING ========== */
  
  /** Whether mobs spawn naturally. Default: true */
  SPAWN_MOBS: BukkitBooleanGameRule;
  
  /** Whether monsters spawn. Default: true */
  SPAWN_MONSTERS: BukkitBooleanGameRule;
  
  /** Whether phantoms spawn. Default: true */
  SPAWN_PHANTOMS: BukkitBooleanGameRule;
  
  /** Whether patrols spawn. Default: true */
  SPAWN_PATROLS: BukkitBooleanGameRule;
  
  /** Whether wandering traders spawn. Default: true */
  SPAWN_WANDERING_TRADERS: BukkitBooleanGameRule;
  
  /** Whether wardens spawn. Default: true */
  SPAWN_WARDENS: BukkitBooleanGameRule;
  
  /** Whether mobs can pick up items/change blocks. Default: true */
  MOB_GRIEFING: BukkitBooleanGameRule;
  
  /** Whether raids are enabled. Default: true */
  RAIDS: BukkitBooleanGameRule;

  /* ========== DROPS ========== */
  
  /** Whether mobs drop items. Default: true */
  MOB_DROPS: BukkitBooleanGameRule;
  
  /** Whether blocks drop items. Default: true */
  BLOCK_DROPS: BukkitBooleanGameRule;
  
  /** Whether non-mob entities drop items. Default: true */
  ENTITY_DROPS: BukkitBooleanGameRule;
  
  /** Block explosions destroy dropped items. Default: true */
  BLOCK_EXPLOSION_DROP_DECAY: BukkitBooleanGameRule;
  
  /** Mob explosions destroy dropped items. Default: true */
  MOB_EXPLOSION_DROP_DECAY: BukkitBooleanGameRule;
  
  /** TNT explosions destroy dropped items. Default: true */
  TNT_EXPLOSION_DROP_DECAY: BukkitBooleanGameRule;

  /* ========== WORLD PROGRESSION ========== */
  
  /** Whether time advances. Default: true */
  ADVANCE_TIME: BukkitBooleanGameRule;
  
  /** Whether weather changes. Default: true */
  ADVANCE_WEATHER: BukkitBooleanGameRule;
  
  /** Water can become source blocks. Default: true */
  WATER_SOURCE_CONVERSION: BukkitBooleanGameRule;
  
  /** Lava can become source blocks. Default: false */
  LAVA_SOURCE_CONVERSION: BukkitBooleanGameRule;
  
  /** Whether vines spread. Default: true */
  SPREAD_VINES: BukkitBooleanGameRule;
  
  /** Whether TNT explodes. Default: true */
  TNT_EXPLODES: BukkitBooleanGameRule;
  
  /** Random tick speed (plant growth, etc.). Default: 3 */
  RANDOM_TICK_SPEED: BukkitIntegerGameRule;
  
  /** Percentage of players needed sleeping. Default: 100 */
  PLAYERS_SLEEPING_PERCENTAGE: BukkitIntegerGameRule;

  /* ========== COMMANDS & ADMIN ========== */
  
  /** Command blocks notify admins. Default: true */
  COMMAND_BLOCK_OUTPUT: BukkitBooleanGameRule;
  
  /** Command blocks are enabled. Default: true */
  COMMAND_BLOCKS_WORK: BukkitBooleanGameRule;
  
  /** Spawner blocks are enabled. Default: true */
  SPAWNER_BLOCKS_WORK: BukkitBooleanGameRule;
  
  /** Show command feedback in chat. Default: true */
  SEND_COMMAND_FEEDBACK: BukkitBooleanGameRule;
  
  /** Log admin commands to console. Default: true */
  LOG_ADMIN_COMMANDS: BukkitBooleanGameRule;
  
  /** Max commands per chain. Default: 65536 */
  MAX_COMMAND_SEQUENCE_LENGTH: BukkitIntegerGameRule;
  
  /** Max command forks. Default: 65536 */
  MAX_COMMAND_FORKS: BukkitIntegerGameRule;
  
  /** Max blocks modified by command. Default: 32768 */
  MAX_BLOCK_MODIFICATIONS: BukkitIntegerGameRule;

  /* ========== PLAYER MECHANICS ========== */
  
  /** Whether PvP is enabled. Default: true */
  PVP: BukkitBooleanGameRule;
  
  /** Natural health regeneration. Default: true */
  NATURAL_HEALTH_REGENERATION: BukkitBooleanGameRule;
  
  /** Only craft unlocked recipes. Default: false */
  LIMITED_CRAFTING: BukkitBooleanGameRule;
  
  /** Mobs stop being angry when player dies. Default: true */
  FORGIVE_DEAD_PLAYERS: BukkitBooleanGameRule;
  
  /** Angered mobs target all players. Default: false */
  UNIVERSAL_ANGER: BukkitBooleanGameRule;
  
  /** Spectators generate chunks. Default: true */
  SPECTATORS_GENERATE_CHUNKS: BukkitBooleanGameRule;
  
  /** Check player movement speed. Default: true */
  PLAYER_MOVEMENT_CHECK: BukkitBooleanGameRule;
  
  /** Check elytra movement speed. Default: true */
  ELYTRA_MOVEMENT_CHECK: BukkitBooleanGameRule;
  
  /** Spawn radius from world spawn. Default: 10 */
  RESPAWN_RADIUS: BukkitIntegerGameRule;
  
  /** Max entities before cramming damage. Default: 24 */
  MAX_ENTITY_CRAMMING: BukkitIntegerGameRule;

  /* ========== MESSAGES & UI ========== */
  
  /** Show advancement messages. Default: true */
  SHOW_ADVANCEMENT_MESSAGES: BukkitBooleanGameRule;
  
  /** Show reduced debug info. Default: false */
  REDUCED_DEBUG_INFO: BukkitBooleanGameRule;
  
  /** Global sounds propagate server-wide. Default: true */
  GLOBAL_SOUND_EVENTS: BukkitBooleanGameRule;
  
  /** Show locator bar. Default: true */
  LOCATOR_BAR: BukkitBooleanGameRule;

  /* ========== NETHER ========== */
  
  /** Allow nether portal use. Default: true */
  ALLOW_ENTERING_NETHER_USING_PORTALS: BukkitBooleanGameRule;
  
  /** Default nether portal delay (ticks). Default: 80 */
  PLAYERS_NETHER_PORTAL_DEFAULT_DELAY: BukkitIntegerGameRule;
  
  /** Creative mode nether portal delay (ticks). Default: 1 */
  PLAYERS_NETHER_PORTAL_CREATIVE_DELAY: BukkitIntegerGameRule;

  /* ========== OTHER ========== */
  
  /** Projectiles can break blocks. Default: true */
  PROJECTILES_CAN_BREAK_BLOCKS: BukkitBooleanGameRule;
  
  /** Max snow accumulation layers. Default: 1 */
  MAX_SNOW_ACCUMULATION_HEIGHT: BukkitIntegerGameRule;
  
  /** Max minecart speed (experimental). Default: 8 */
  MAX_MINECART_SPEED: BukkitIntegerGameRule;
  
  /** Fire spread radius around players. Default: -1 (no limit) */
  FIRE_SPREAD_RADIUS_AROUND_PLAYER: BukkitIntegerGameRule;

  /* ========== STATIC METHODS ========== */
  
  /**
   * Get game rule by name.
   * 
   * @deprecated Use Registry.get(NamespacedKey) instead.
   */
  getByName(rule: string): BukkitGameRule<any> | null;

  /**
   * Get all game rules.
   * 
   * @deprecated Use Iterable.iterator() instead.
   */
  values(): BukkitGameRule<any>[];
}

// ============================================
// ENUM EXPORT
// ============================================

/**
 * All Minecraft game rules.
 * 
 * Game rules control various server-side behaviors per world.
 * 
 * @example
 * // Get current value
 * const keepInv = world.getGameRuleValue(GameRule.KEEP_INVENTORY);
 * 
 * @example
 * // Set value
 * world.setGameRule(GameRule.KEEP_INVENTORY, true);
 * world.setGameRule(GameRule.RANDOM_TICK_SPEED, 10);
 * 
 * @example
 * // Check rule type
 * if (GameRule.KEEP_INVENTORY.getType() === Boolean) {
 *   // It's a boolean rule
 * }
 */
export const GameRule: GameRuleStatic = org.bukkit.GameRule;

// ============================================
// ALL KEYS ARRAYS
// ============================================

/**
 * All boolean game rule keys.
 */
export const BOOLEAN_GAME_RULE_KEYS: BooleanGameRuleKey[] = [
  /* Damage & Death */
  "KEEP_INVENTORY", "FALL_DAMAGE", "FIRE_DAMAGE", "DROWNING_DAMAGE",
  "FREEZE_DAMAGE", "IMMEDIATE_RESPAWN", "SHOW_DEATH_MESSAGES",
  "ENDER_PEARLS_VANISH_ON_DEATH",
  /* Spawning */
  "SPAWN_MOBS", "SPAWN_MONSTERS", "SPAWN_PHANTOMS", "SPAWN_PATROLS",
  "SPAWN_WANDERING_TRADERS", "SPAWN_WARDENS", "MOB_GRIEFING", "RAIDS",
  /* Drops */
  "MOB_DROPS", "BLOCK_DROPS", "ENTITY_DROPS",
  "BLOCK_EXPLOSION_DROP_DECAY", "MOB_EXPLOSION_DROP_DECAY", "TNT_EXPLOSION_DROP_DECAY",
  /* World Progression */
  "ADVANCE_TIME", "ADVANCE_WEATHER", "WATER_SOURCE_CONVERSION",
  "LAVA_SOURCE_CONVERSION", "SPREAD_VINES", "TNT_EXPLODES",
  /* Commands & Admin */
  "COMMAND_BLOCK_OUTPUT", "COMMAND_BLOCKS_WORK", "SPAWNER_BLOCKS_WORK",
  "SEND_COMMAND_FEEDBACK", "LOG_ADMIN_COMMANDS",
  /* Player Mechanics */
  "PVP", "NATURAL_HEALTH_REGENERATION", "LIMITED_CRAFTING",
  "FORGIVE_DEAD_PLAYERS", "UNIVERSAL_ANGER", "SPECTATORS_GENERATE_CHUNKS",
  "PLAYER_MOVEMENT_CHECK", "ELYTRA_MOVEMENT_CHECK",
  /* Messages & UI */
  "SHOW_ADVANCEMENT_MESSAGES", "REDUCED_DEBUG_INFO", "GLOBAL_SOUND_EVENTS", "LOCATOR_BAR",
  /* Nether */
  "ALLOW_ENTERING_NETHER_USING_PORTALS",
  /* Projectiles */
  "PROJECTILES_CAN_BREAK_BLOCKS",
];

/**
 * All integer game rule keys.
 */
export const INTEGER_GAME_RULE_KEYS: IntegerGameRuleKey[] = [
  "RANDOM_TICK_SPEED",
  "RESPAWN_RADIUS",
  "MAX_ENTITY_CRAMMING",
  "MAX_COMMAND_SEQUENCE_LENGTH",
  "MAX_COMMAND_FORKS",
  "MAX_BLOCK_MODIFICATIONS",
  "PLAYERS_SLEEPING_PERCENTAGE",
  "MAX_SNOW_ACCUMULATION_HEIGHT",
  "PLAYERS_NETHER_PORTAL_DEFAULT_DELAY",
  "PLAYERS_NETHER_PORTAL_CREATIVE_DELAY",
  "MAX_MINECART_SPEED",
  "FIRE_SPREAD_RADIUS_AROUND_PLAYER",
];

/**
 * All game rule keys.
 */
export const GAME_RULE_KEYS: GameRuleKey[] = [
  ...BOOLEAN_GAME_RULE_KEYS,
  ...INTEGER_GAME_RULE_KEYS,
];

// ============================================
// ENUM-LIKE UTILITIES
// ============================================

/**
 * Get all game rule values.
 */
export function getGameRuleValues(): BukkitGameRule<any>[] {
  return GameRule.values();
}

/**
 * Get game rule by name.
 * 
 * @returns GameRule or null if not found
 */
export function getGameRuleByName(name: string): BukkitGameRule<any> | null {
  return GameRule.getByName(name);
}

/**
 * Get game rule by name (safe, typed).
 */
export function getGameRuleSafe(name: string): BukkitGameRule<any> | null {
  const upper = name.toUpperCase();
  if (GAME_RULE_KEYS.includes(upper as GameRuleKey)) {
    return (GameRule as any)[upper] ?? null;
  }
  return null;
}

/**
 * Check if string is valid game rule name.
 */
export function isValidGameRule(name: string): name is GameRuleKey {
  return GAME_RULE_KEYS.includes(name.toUpperCase() as GameRuleKey);
}

/**
 * Check if game rule is boolean type.
 */
export function isBooleanGameRule(name: string): name is BooleanGameRuleKey {
  return BOOLEAN_GAME_RULE_KEYS.includes(name.toUpperCase() as BooleanGameRuleKey);
}

/**
 * Check if game rule is integer type.
 */
export function isIntegerGameRule(name: string): name is IntegerGameRuleKey {
  return INTEGER_GAME_RULE_KEYS.includes(name.toUpperCase() as IntegerGameRuleKey);
}

/**
 * Get all game rule names.
 */
export function getGameRuleNames(): GameRuleKey[] {
  return [...GAME_RULE_KEYS];
}

/**
 * Get all boolean game rules.
 */
export function getBooleanGameRules(): BukkitBooleanGameRule[] {
  return BOOLEAN_GAME_RULE_KEYS.map(key => (GameRule as any)[key]);
}

/**
 * Get all integer game rules.
 */
export function getIntegerGameRules(): BukkitIntegerGameRule[] {
  return INTEGER_GAME_RULE_KEYS.map(key => (GameRule as any)[key]);
}

// ============================================
// CATEGORY SETS
// ============================================

/**
 * Damage-related game rules.
 */
export const DAMAGE_GAME_RULES: Set<GameRuleKey> = new Set([
  "FALL_DAMAGE",
  "FIRE_DAMAGE",
  "DROWNING_DAMAGE",
  "FREEZE_DAMAGE",
]);

/**
 * Death-related game rules.
 */
export const DEATH_GAME_RULES: Set<GameRuleKey> = new Set([
  "KEEP_INVENTORY",
  "IMMEDIATE_RESPAWN",
  "SHOW_DEATH_MESSAGES",
  "ENDER_PEARLS_VANISH_ON_DEATH",
]);

/**
 * Spawning-related game rules.
 */
export const SPAWNING_GAME_RULES: Set<GameRuleKey> = new Set([
  "SPAWN_MOBS",
  "SPAWN_MONSTERS",
  "SPAWN_PHANTOMS",
  "SPAWN_PATROLS",
  "SPAWN_WANDERING_TRADERS",
  "SPAWN_WARDENS",
  "MOB_GRIEFING",
  "RAIDS",
]);

/**
 * Drop-related game rules.
 */
export const DROP_GAME_RULES: Set<GameRuleKey> = new Set([
  "MOB_DROPS",
  "BLOCK_DROPS",
  "ENTITY_DROPS",
  "BLOCK_EXPLOSION_DROP_DECAY",
  "MOB_EXPLOSION_DROP_DECAY",
  "TNT_EXPLOSION_DROP_DECAY",
]);

/**
 * Command/admin-related game rules.
 */
export const COMMAND_GAME_RULES: Set<GameRuleKey> = new Set([
  "COMMAND_BLOCK_OUTPUT",
  "COMMAND_BLOCKS_WORK",
  "SPAWNER_BLOCKS_WORK",
  "SEND_COMMAND_FEEDBACK",
  "LOG_ADMIN_COMMANDS",
  "MAX_COMMAND_SEQUENCE_LENGTH",
  "MAX_COMMAND_FORKS",
  "MAX_BLOCK_MODIFICATIONS",
]);

/**
 * World progression game rules.
 */
export const PROGRESSION_GAME_RULES: Set<GameRuleKey> = new Set([
  "ADVANCE_TIME",
  "ADVANCE_WEATHER",
  "RANDOM_TICK_SPEED",
  "PLAYERS_SLEEPING_PERCENTAGE",
  "WATER_SOURCE_CONVERSION",
  "LAVA_SOURCE_CONVERSION",
  "SPREAD_VINES",
]);

/**
 * Player mechanic game rules.
 */
export const PLAYER_GAME_RULES: Set<GameRuleKey> = new Set([
  "PVP",
  "NATURAL_HEALTH_REGENERATION",
  "LIMITED_CRAFTING",
  "FORGIVE_DEAD_PLAYERS",
  "UNIVERSAL_ANGER",
  "SPECTATORS_GENERATE_CHUNKS",
  "PLAYER_MOVEMENT_CHECK",
  "ELYTRA_MOVEMENT_CHECK",
  "RESPAWN_RADIUS",
  "MAX_ENTITY_CRAMMING",
]);

// ============================================
// CATEGORY CHECKS
// ============================================

/**
 * Check if game rule is damage-related.
 */
export function isDamageGameRule(rule: BukkitGameRule<any>): boolean {
  const name = rule.getName().toUpperCase() as GameRuleKey;
  return DAMAGE_GAME_RULES.has(name);
}

/**
 * Check if game rule is death-related.
 */
export function isDeathGameRule(rule: BukkitGameRule<any>): boolean {
  const name = rule.getName().toUpperCase() as GameRuleKey;
  return DEATH_GAME_RULES.has(name);
}

/**
 * Check if game rule is spawning-related.
 */
export function isSpawningGameRule(rule: BukkitGameRule<any>): boolean {
  const name = rule.getName().toUpperCase() as GameRuleKey;
  return SPAWNING_GAME_RULES.has(name);
}

/**
 * Check if game rule is drop-related.
 */
export function isDropGameRule(rule: BukkitGameRule<any>): boolean {
  const name = rule.getName().toUpperCase() as GameRuleKey;
  return DROP_GAME_RULES.has(name);
}

/**
 * Check if game rule is command-related.
 */
export function isCommandGameRule(rule: BukkitGameRule<any>): boolean {
  const name = rule.getName().toUpperCase() as GameRuleKey;
  return COMMAND_GAME_RULES.has(name);
}

/**
 * Check if game rule is progression-related.
 */
export function isProgressionGameRule(rule: BukkitGameRule<any>): boolean {
  const name = rule.getName().toUpperCase() as GameRuleKey;
  return PROGRESSION_GAME_RULES.has(name);
}

/**
 * Check if game rule is player-related.
 */
export function isPlayerGameRule(rule: BukkitGameRule<any>): boolean {
  const name = rule.getName().toUpperCase() as GameRuleKey;
  return PLAYER_GAME_RULES.has(name);
}

/**
 * Get game rule category.
 */
export function getGameRuleCategory(rule: BukkitGameRule<any>):
  "damage" | "death" | "spawning" | "drops" | "commands" | "progression" | "player" | "other" {
  
  const name = rule.getName().toUpperCase() as GameRuleKey;
  
  if (DAMAGE_GAME_RULES.has(name)) return "damage";
  if (DEATH_GAME_RULES.has(name)) return "death";
  if (SPAWNING_GAME_RULES.has(name)) return "spawning";
  if (DROP_GAME_RULES.has(name)) return "drops";
  if (COMMAND_GAME_RULES.has(name)) return "commands";
  if (PROGRESSION_GAME_RULES.has(name)) return "progression";
  if (PLAYER_GAME_RULES.has(name)) return "player";
  
  return "other";
}

// ============================================
// DEFAULT VALUES
// ============================================

/**
 * Default values for boolean game rules.
 * 
 * These are vanilla Minecraft defaults.
 */
export const BOOLEAN_GAME_RULE_DEFAULTS: Record<BooleanGameRuleKey, boolean> = {
  /* Damage & Death */
  KEEP_INVENTORY: false,
  FALL_DAMAGE: true,
  FIRE_DAMAGE: true,
  DROWNING_DAMAGE: true,
  FREEZE_DAMAGE: true,
  IMMEDIATE_RESPAWN: false,
  SHOW_DEATH_MESSAGES: true,
  ENDER_PEARLS_VANISH_ON_DEATH: true,
  /* Spawning */
  SPAWN_MOBS: true,
  SPAWN_MONSTERS: true,
  SPAWN_PHANTOMS: true,
  SPAWN_PATROLS: true,
  SPAWN_WANDERING_TRADERS: true,
  SPAWN_WARDENS: true,
  MOB_GRIEFING: true,
  RAIDS: true,
  /* Drops */
  MOB_DROPS: true,
  BLOCK_DROPS: true,
  ENTITY_DROPS: true,
  BLOCK_EXPLOSION_DROP_DECAY: true,
  MOB_EXPLOSION_DROP_DECAY: true,
  TNT_EXPLOSION_DROP_DECAY: true,
  /* World Progression */
  ADVANCE_TIME: true,
  ADVANCE_WEATHER: true,
  WATER_SOURCE_CONVERSION: true,
  LAVA_SOURCE_CONVERSION: false,
  SPREAD_VINES: true,
  TNT_EXPLODES: true,
  /* Commands & Admin */
  COMMAND_BLOCK_OUTPUT: true,
  COMMAND_BLOCKS_WORK: true,
  SPAWNER_BLOCKS_WORK: true,
  SEND_COMMAND_FEEDBACK: true,
  LOG_ADMIN_COMMANDS: true,
  /* Player Mechanics */
  PVP: true,
  NATURAL_HEALTH_REGENERATION: true,
  LIMITED_CRAFTING: false,
  FORGIVE_DEAD_PLAYERS: true,
  UNIVERSAL_ANGER: false,
  SPECTATORS_GENERATE_CHUNKS: true,
  PLAYER_MOVEMENT_CHECK: true,
  ELYTRA_MOVEMENT_CHECK: true,
  /* Messages & UI */
  SHOW_ADVANCEMENT_MESSAGES: true,
  REDUCED_DEBUG_INFO: false,
  GLOBAL_SOUND_EVENTS: true,
  LOCATOR_BAR: true,
  /* Nether */
  ALLOW_ENTERING_NETHER_USING_PORTALS: true,
  /* Projectiles */
  PROJECTILES_CAN_BREAK_BLOCKS: true,
};

/**
 * Default values for integer game rules.
 */
export const INTEGER_GAME_RULE_DEFAULTS: Record<IntegerGameRuleKey, number> = {
  RANDOM_TICK_SPEED: 3,
  RESPAWN_RADIUS: 10,
  MAX_ENTITY_CRAMMING: 24,
  MAX_COMMAND_SEQUENCE_LENGTH: 65536,
  MAX_COMMAND_FORKS: 65536,
  MAX_BLOCK_MODIFICATIONS: 32768,
  PLAYERS_SLEEPING_PERCENTAGE: 100,
  MAX_SNOW_ACCUMULATION_HEIGHT: 1,
  PLAYERS_NETHER_PORTAL_DEFAULT_DELAY: 80,
  PLAYERS_NETHER_PORTAL_CREATIVE_DELAY: 1,
  MAX_MINECART_SPEED: 8,
  FIRE_SPREAD_RADIUS_AROUND_PLAYER: -1,
};

/**
 * Get default value for a game rule.
 */
export function getDefaultValue(rule: BukkitGameRule<any>): boolean | number {
  const name = rule.getName().toUpperCase();
  
  if (name in BOOLEAN_GAME_RULE_DEFAULTS) {
    return BOOLEAN_GAME_RULE_DEFAULTS[name as BooleanGameRuleKey];
  }
  
  if (name in INTEGER_GAME_RULE_DEFAULTS) {
    return INTEGER_GAME_RULE_DEFAULTS[name as IntegerGameRuleKey];
  }
  
  /* Unknown rule, return sensible defaults */
  const typeName = rule.getType().getSimpleName();
  return typeName === "Boolean" ? true : 0;
}

/**
 * Check if value is the default for this game rule.
 */
export function isDefaultValue(rule: BukkitGameRule<any>, value: boolean | number): boolean {
  return getDefaultValue(rule) === value;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get human-readable game rule name.
 */
export function formatGameRuleName(rule: BukkitGameRule<any>): string {
  return rule.getName()
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Get game rule type name.
 */
export function getGameRuleTypeName(rule: BukkitGameRule<any>): "boolean" | "integer" {
  const typeName = rule.getType().getSimpleName();
  return typeName === "Boolean" ? "boolean" : "integer";
}

/**
 * Describe game rule.
 */
export function describeGameRule(rule: BukkitGameRule<any>): string {
  const name = formatGameRuleName(rule);
  const type = getGameRuleTypeName(rule);
  const category = getGameRuleCategory(rule);
  const defaultVal = getDefaultValue(rule);
  
  return `${name} (${type}, ${category}, default: ${defaultVal})`;
}

/**
 * Get common game rules for different server types.
 */
export function getSurvivalFriendlyRules(): Record<string, boolean | number> {
  return {
    KEEP_INVENTORY: false,
    MOB_GRIEFING: true,
    PVP: true,
    NATURAL_HEALTH_REGENERATION: true,
  };
}

/**
 * Get creative-mode friendly rules.
 */
export function getCreativeFriendlyRules(): Record<string, boolean | number> {
  return {
    KEEP_INVENTORY: true,
    MOB_GRIEFING: false,
    FALL_DAMAGE: false,
    FIRE_DAMAGE: false,
    DROWNING_DAMAGE: false,
  };
}

/**
 * Get minigame-friendly rules (clean, competitive).
 */
export function getMinigameFriendlyRules(): Record<string, boolean | number> {
  return {
    KEEP_INVENTORY: false,
    MOB_GRIEFING: false,
    SPAWN_MONSTERS: false,
    ADVANCE_TIME: false,
    ADVANCE_WEATHER: false,
    SHOW_DEATH_MESSAGES: true,
    IMMEDIATE_RESPAWN: true,
  };
}