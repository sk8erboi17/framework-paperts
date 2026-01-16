/**
 * DESIGN
 * ------
 * Boss represents entities that display a BossBar at the top of the screen.
 * 
 * BOSS ENTITIES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                     BOSS ENTITIES                           │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                   ENDER DRAGON                      │   │
 *   │   │                                                     │   │
 *   │   │   🐉 Final boss of Minecraft                        │   │
 *   │   │   - Spawns in The End                               │   │
 *   │   │   - 200 HP                                          │   │
 *   │   │   - Pink/magenta boss bar                           │   │
 *   │   │   - Healed by End Crystals                          │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                     WITHER                          │   │
 *   │   │                                                     │   │
 *   │   │   💀 Player-summoned boss                           │   │
 *   │   │   - Created with soul sand + wither skulls          │   │
 *   │   │   - 300 HP (Java) / 600 HP (Bedrock)                │   │
 *   │   │   - Purple boss bar                                 │   │
 *   │   │   - Drops Nether Star                               │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * BOSS BAR:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                                                             │
 *   │   ████████████████████████████░░░░░░░░░░  Ender Dragon     │
 *   │   ▲                          ▲            ▲                 │
 *   │   │                          │            │                 │
 *   │   Color                   Progress       Title              │
 *   │   (PINK)                  (0.0-1.0)    (Boss name)          │
 *   │                                                             │
 *   │   Features:                                                 │
 *   │   - Shows at top of screen                                  │
 *   │   - Visible to nearby players                               │
 *   │   - Updates with boss health                                │
 *   │   - Can have different styles (solid, segmented)            │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * NOTE:
 * - Not all entities with BossBars implement Boss interface
 * - Custom boss bars can be created separately
 * - Only EnderDragon and Wither are vanilla Boss entities
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Boss.html
 */

import { BukkitBossBar } from "../../world/types/bossBar";
import { BukkitEntity } from "./bukkitEntity";


// ============================================
// INTERFACE
// ============================================

/**
 * An entity that displays a BossBar.
 * 
 * Currently only EnderDragon and Wither implement this.
 * The boss bar shows at the top of the screen for nearby players.
 */
export interface BukkitBoss extends BukkitEntity {
  /**
   * Get the BossBar for this boss entity.
   * 
   * The boss bar displays health and name at the top of the screen.
   * May return null in some cases (e.g., summoned dragons without battles).
   * 
   * @returns BossBar or null
   * 
   * @example
   * const bar = boss.getBossBar();
   * if (bar !== null) {
   *   console.log(`Boss: ${bar.getTitle()}`);
   *   console.log(`Health: ${bar.getProgress() * 100}%`);
   * }
   */
  getBossBar(): BukkitBossBar | null;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if entity is a Boss.
 * 
 * @example
 * if (isBoss(entity)) {
 *   const bar = entity.getBossBar();
 * }
 */
export function isBoss(entity: BukkitEntity): entity is BukkitBoss {
  return typeof (entity as any).getBossBar === "function";
}

/**
 * Check if entity is a Boss by type name.
 * 
 * More reliable than duck typing for known boss types.
 */
export function isBossType(entity: BukkitEntity): boolean {
  const type = entity.getType().name();
  return type === "ENDER_DRAGON" || type === "WITHER";
}

// ============================================
// BOSS BAR UTILITIES
// ============================================

/**
 * Check if boss has a boss bar.
 */
export function hasBossBar(boss: BukkitBoss): boolean {
  return boss.getBossBar() !== null;
}

/**
 * Get boss bar safely.
 * 
 * @returns BossBar or null
 */
export function getBossBarSafe(entity: BukkitEntity): BukkitBossBar | null {
  if (isBoss(entity)) {
    return entity.getBossBar();
  }
  return null;
}

/**
 * Get boss bar title.
 * 
 * @returns Title or null if no boss bar
 */
export function getBossTitle(boss: BukkitBoss): string | null {
  const bar = boss.getBossBar();
  return bar?.getTitle() ?? null;
}

/**
 * Get boss bar progress (0.0 to 1.0).
 * 
 * @returns Progress or null if no boss bar
 */
export function getBossProgress(boss: BukkitBoss): number | null {
  const bar = boss.getBossBar();
  return bar?.getProgress() ?? null;
}

/**
 * Get boss bar progress as percentage.
 * 
 * @returns Percentage (0-100) or null if no boss bar
 */
export function getBossProgressPercent(boss: BukkitBoss): number | null {
  const progress = getBossProgress(boss);
  return progress !== null ? progress * 100 : null;
}

// ============================================
// BOSS BAR MODIFICATION
// ============================================

/**
 * Set boss bar title.
 * 
 * @returns true if successful, false if no boss bar
 */
export function setBossTitle(boss: BukkitBoss, title: string): boolean {
  const bar = boss.getBossBar();
  if (bar === null) return false;
  
  bar.setTitle(title);
  return true;
}

/**
 * Set boss bar progress.
 * 
 * @param boss Boss entity
 * @param progress Progress value (0.0 to 1.0)
 * @returns true if successful, false if no boss bar
 */
export function setBossProgress(boss: BukkitBoss, progress: number): boolean {
  const bar = boss.getBossBar();
  if (bar === null) return false;
  
  /* Clamp progress to valid range */
  const clampedProgress = Math.max(0, Math.min(1, progress));
  bar.setProgress(clampedProgress);
  return true;
}

/**
 * Set boss bar visibility.
 * 
 * @returns true if successful, false if no boss bar
 */
export function setBossBarVisible(boss: BukkitBoss, visible: boolean): boolean {
  const bar = boss.getBossBar();
  if (bar === null) return false;
  
  bar.setVisible(visible);
  return true;
}

/**
 * Hide boss bar.
 */
export function hideBossBar(boss: BukkitBoss): boolean {
  return setBossBarVisible(boss, false);
}

/**
 * Show boss bar.
 */
export function showBossBar(boss: BukkitBoss): boolean {
  return setBossBarVisible(boss, true);
}

// ============================================
// BOSS BAR PLAYERS
// ============================================

/**
 * Get players who can see the boss bar.
 */
export function getBossBarPlayers(boss: BukkitBoss): any[] {
  const bar = boss.getBossBar();
  if (bar === null) return [];
  
  const players: any[] = [];
  const list = bar.getPlayers();
  
  /* Handle Java List */
  if (typeof list.iterator === "function") {
    const iter = list.iterator();
    while (iter.hasNext()) {
      players.push(iter.next());
    }
  } else if (Array.isArray(list)) {
    return list;
  }
  
  return players;
}

/**
 * Count players who can see the boss bar.
 */
export function countBossBarPlayers(boss: BukkitBoss): number {
  const bar = boss.getBossBar();
  if (bar === null) return 0;
  
  const players = bar.getPlayers();
  return typeof players.size === "function" ? players.size() : players.length ?? 0;
}

/**
 * Add player to boss bar.
 */
export function addPlayerToBossBar(boss: BukkitBoss, player: any): boolean {
  const bar = boss.getBossBar();
  if (bar === null) return false;
  
  bar.addPlayer(player);
  return true;
}

/**
 * Remove player from boss bar.
 */
export function removePlayerFromBossBar(boss: BukkitBoss, player: any): boolean {
  const bar = boss.getBossBar();
  if (bar === null) return false;
  
  bar.removePlayer(player);
  return true;
}

/**
 * Remove all players from boss bar.
 */
export function clearBossBarPlayers(boss: BukkitBoss): boolean {
  const bar = boss.getBossBar();
  if (bar === null) return false;
  
  bar.removeAll();
  return true;
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Get all bosses from entity list.
 */
export function filterBosses(entities: BukkitEntity[]): BukkitBoss[] {
  return entities.filter(isBoss) as BukkitBoss[];
}

/**
 * Get all bosses with active boss bars.
 */
export function filterBossesWithBar(entities: BukkitEntity[]): BukkitBoss[] {
  return filterBosses(entities).filter(hasBossBar);
}

/**
 * Hide all boss bars.
 */
export function hideAllBossBars(bosses: BukkitBoss[]): number {
  let count = 0;
  for (const boss of bosses) {
    if (hideBossBar(boss)) count++;
  }
  return count;
}

/**
 * Show all boss bars.
 */
export function showAllBossBars(bosses: BukkitBoss[]): number {
  let count = 0;
  for (const boss of bosses) {
    if (showBossBar(boss)) count++;
  }
  return count;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a boss entity.
 */
export function describeBoss(boss: BukkitBoss): string {
  const type = boss.getType().name();
  const bar = boss.getBossBar();
  
  if (bar === null) {
    return `${type} (no boss bar)`;
  }
  
  const title = bar.getTitle();
  const progress = (bar.getProgress() * 100).toFixed(1);
  
  return `${type} "${title}" (${progress}%)`;
}

/**
 * Get boss info as plain object.
 */
export function getBossInfo(boss: BukkitBoss): {
  type: string;
  hasBossBar: boolean;
  title: string | null;
  progress: number | null;
  progressPercent: number | null;
  isVisible: boolean | null;
  playerCount: number;
} {
  const bar = boss.getBossBar();
  
  return {
    type: boss.getType().name(),
    hasBossBar: bar !== null,
    title: bar?.getTitle() ?? null,
    progress: bar?.getProgress() ?? null,
    progressPercent: bar !== null ? bar.getProgress() * 100 : null,
    isVisible: bar?.isVisible() ?? null,
    playerCount: bar !== null ? countBossBarPlayers(boss) : 0,
  };
}

/**
 * Get summary of multiple bosses.
 */
export function getBossSummary(bosses: BukkitBoss[]): {
  total: number;
  withBossBar: number;
  withoutBossBar: number;
  visible: number;
  hidden: number;
  typeCount: Map<string, number>;
} {
  let withBossBar = 0;
  let withoutBossBar = 0;
  let visible = 0;
  let hidden = 0;
  const typeCount = new Map<string, number>();
  
  for (const boss of bosses) {
    const bar = boss.getBossBar();
    
    if (bar !== null) {
      withBossBar++;
      
      if (bar.isVisible()) {
        visible++;
      } else {
        hidden++;
      }
    } else {
      withoutBossBar++;
    }
    
    const type = boss.getType().name();
    typeCount.set(type, (typeCount.get(type) ?? 0) + 1);
  }
  
  return {
    total: bosses.length,
    withBossBar,
    withoutBossBar,
    visible,
    hidden,
    typeCount,
  };
}

// ============================================
// BOSS TYPE CHECKS
// ============================================

/**
 * Check if boss is an Ender Dragon.
 */
export function isEnderDragon(boss: BukkitBoss): boolean {
  return boss.getType().name() === "ENDER_DRAGON";
}

/**
 * Check if boss is a Wither.
 */
export function isWither(boss: BukkitBoss): boolean {
  return boss.getType().name() === "WITHER";
}

/**
 * Get boss type name.
 */
export function getBossTypeName(boss: BukkitBoss): "EnderDragon" | "Wither" | "Unknown" {
  const type = boss.getType().name();
  
  if (type === "ENDER_DRAGON") return "EnderDragon";
  if (type === "WITHER") return "Wither";
  return "Unknown";
}