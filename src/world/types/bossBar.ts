/**
 * DESIGN
 * ------
 * BossBar is a UI element displayed at the top of the screen showing
 * a boss's name and health progress.
 * 
 * BOSS BAR ANATOMY:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                                                             │
 *   │                    "Ender Dragon"                           │
 *   │   ████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░   │
 *   │   ← filled (progress) →      ← empty →                      │
 *   │                                                             │
 *   │   Color: PURPLE                                             │
 *   │   Style: SOLID (or SEGMENTED_6/10/12/20)                    │
 *   │   Progress: 0.6 (60%)                                       │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * SEGMENTED STYLES:
 * 
 *   SOLID:
 *   ████████████████████████████████████████████████████████████
 * 
 *   SEGMENTED_6:
 *   ████████│████████│████████│████████│░░░░░░░░│░░░░░░░░
 * 
 *   SEGMENTED_10:
 *   █████│█████│█████│█████│█████│█████│░░░░░│░░░░░│░░░░░│░░░░░
 * 
 * PLAYER VISIBILITY:
 * - Boss bars are per-player (each player sees their own set)
 * - Players must be added to see the bar
 * - Bar can be hidden/shown without removing players
 * 
 * FLAGS (special effects):
 * - DARKEN_SKY: Darkens sky like Wither fight
 * - PLAY_BOSS_MUSIC: Plays Ender Dragon music
 * - CREATE_FOG: Creates atmospheric fog
 * 
 * COMMON USES:
 * - Boss fight health display
 * - Progress indicators (quests, events)
 * - Timers and countdowns
 * - Custom notifications
 * 
 * CREATING BOSS BARS:
 * Boss bars are created via Bukkit.createBossBar(), not directly.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/boss/BossBar.html
 */

import { BukkitPlayer } from "../../entities/types/bukkitPlayer";
import { JavaList } from "../../java/types/list";
import { BarColorName, BukkitBarColor } from "../enums/barColors";
import { BarFlagName, BukkitBarFlag } from "../enums/barflag";
import { BarStyleName, BukkitBarStyle } from "../enums/barStyles";


// ============================================
// INTERFACE
// ============================================

/**
 * A boss bar displayed at the top of players' screens.
 * 
 * Shows a title, progress bar, and optional special effects.
 * Must add players to make visible to them.
 */
export interface BukkitBossBar {

  // ==========================================
  // TITLE
  // ==========================================

  /**
   * Get the boss bar title.
   * 
   * @returns Current title text
   * 
   * @example
   * const title = bar.getTitle();
   * console.log(`Boss: ${title}`);
   */
  getTitle(): string;

  /**
   * Set the boss bar title.
   * 
   * Supports color codes (§ or &).
   * 
   * @param title New title (null for empty)
   * 
   * @example
   * bar.setTitle("§c§lDragon Boss");
   * bar.setTitle("Wave 3/5");
   */
  setTitle(title: string | null): void;

  // ==========================================
  // COLOR
  // ==========================================

  /**
   * Get the bar color.
   * 
   * @returns Current color
   */
  getColor(): BukkitBarColor;

  /**
   * Set the bar color.
   * 
   * @param color New color
   * 
   * @example
   * bar.setColor(BarColor.RED);
   */
  setColor(color: BukkitBarColor): void;

  // ==========================================
  // STYLE
  // ==========================================

  /**
   * Get the bar style (segmentation).
   * 
   * @returns Current style
   */
  getStyle(): BukkitBarStyle;

  /**
   * Set the bar style.
   * 
   * @param style New style
   * 
   * @example
   * bar.setStyle(BarStyle.SEGMENTED_10);
   */
  setStyle(style: BukkitBarStyle): void;

  // ==========================================
  // PROGRESS
  // ==========================================

  /**
   * Get current progress (0.0 to 1.0).
   * 
   * @returns Progress value (0.0 = empty, 1.0 = full)
   * 
   * @example
   * const percent = bar.getProgress() * 100;
   * console.log(`${percent}% health remaining`);
   */
  getProgress(): number;

  /**
   * Set progress (0.0 to 1.0).
   * 
   * Values outside range are clamped.
   * 
   * @param progress New progress value
   * 
   * @example
   * // Set to 75%
   * bar.setProgress(0.75);
   * 
   * // Set from health
   * bar.setProgress(entity.getHealth() / entity.getMaxHealth());
   */
  setProgress(progress: number): void;

  // ==========================================
  // FLAGS
  // ==========================================

  /**
   * Add a flag (special effect).
   * 
   * @param flag Flag to add
   * 
   * @example
   * bar.addFlag(BarFlag.DARKEN_SKY);
   */
  addFlag(flag: BukkitBarFlag): void;

  /**
   * Remove a flag.
   * 
   * @param flag Flag to remove
   * 
   * @example
   * bar.removeFlag(BarFlag.CREATE_FOG);
   */
  removeFlag(flag: BukkitBarFlag): void;

  /**
   * Check if bar has a flag.
   * 
   * @param flag Flag to check
   * @returns true if flag is set
   * 
   * @example
   * if (bar.hasFlag(BarFlag.PLAY_BOSS_MUSIC)) {
   *   console.log("Boss music is playing");
   * }
   */
  hasFlag(flag: BukkitBarFlag): boolean;

  // ==========================================
  // PLAYERS
  // ==========================================

  /**
   * Add a player to see this bar.
   * 
   * Player will see bar immediately if visible.
   * 
   * @param player Player to add
   * 
   * @example
   * bar.addPlayer(player);
   */
  addPlayer(player: BukkitPlayer): void;

  /**
   * Remove a player from this bar.
   * 
   * Bar will disappear from player's screen.
   * 
   * @param player Player to remove
   */
  removePlayer(player: BukkitPlayer): void;

  /**
   * Remove all players from this bar.
   * 
   * Bar disappears for everyone.
   * 
   * @example
   * // Clean up when boss dies
   * bar.removeAll();
   */
  removeAll(): void;

  /**
   * Get all players viewing this bar.
   * 
   * @returns Immutable list of players
   * 
   * @example
   * const viewers = bar.getPlayers();
   * console.log(`${viewers.size()} players see this bar`);
   */
  getPlayers(): JavaList<BukkitPlayer>;

  // ==========================================
  // VISIBILITY
  // ==========================================

  /**
   * Check if bar is visible.
   * 
   * @returns true if visible to attached players
   */
  isVisible(): boolean;

  /**
   * Set bar visibility.
   * 
   * Hidden bars keep their players but don't display.
   * Useful for temporarily hiding without removing players.
   * 
   * @param visible true to show, false to hide
   * 
   * @example
   * // Hide between phases
   * bar.setVisible(false);
   * // ... phase transition ...
   * bar.setVisible(true);
   */
  setVisible(visible: boolean): void;

  /**
   * Show the boss bar.
   * 
   * @deprecated Use setVisible(true) instead
   */
  show(): void;

  /**
   * Hide the boss bar.
   * 
   * @deprecated Use setVisible(false) instead
   */
  hide(): void;
}

// ============================================
// FACTORY FUNCTION
// ============================================

/**
 * Create a new boss bar.
 * 
 * @param title Bar title
 * @param color Bar color
 * @param style Bar style
 * @param flags Optional flags
 * @returns New boss bar
 * 
 * @example
 * const bar = createBossBar(
 *   "§c§lBoss Fight",
 *   BarColor.RED,
 *   BarStyle.SEGMENTED_10
 * );
 * bar.addPlayer(player);
 */
export function createBossBar(
  title: string,
  color: BukkitBarColor,
  style: BukkitBarStyle,
  ...flags: BukkitBarFlag[]
): BukkitBossBar {
  return org.bukkit.Bukkit.createBossBar(title, color, style, ...flags);
}

/**
 * Create boss bar with default settings.
 * 
 * Default: PURPLE color, SOLID style, no flags.
 * 
 * @param title Bar title
 * @returns New boss bar
 */
export function createSimpleBossBar(title: string): BukkitBossBar {
  const BarColor = org.bukkit.boss.BarColor;
  const BarStyle = org.bukkit.boss.BarStyle;
  return org.bukkit.Bukkit.createBossBar(title, BarColor.PURPLE, BarStyle.SOLID);
}

// ============================================
// CONFIGURATION INTERFACE
// ============================================

/**
 * Configuration options for a boss bar.
 */
export interface BossBarConfig {
  /** Bar title */
  title: string;
  /** Bar color */
  color?: BarColorName;
  /** Bar style */
  style?: BarStyleName;
  /** Initial progress (0.0 to 1.0) */
  progress?: number;
  /** Flags to enable */
  flags?: BarFlagName[];
  /** Initial visibility */
  visible?: boolean;
}

/**
 * Create and configure a boss bar.
 * 
 * @param config Configuration options
 * @returns Configured boss bar
 * 
 * @example
 * const bar = createConfiguredBossBar({
 *   title: "§6§lEvent Timer",
 *   color: "YELLOW",
 *   style: "SEGMENTED_20",
 *   progress: 1.0,
 *   flags: ["DARKEN_SKY"],
 * });
 */
export function createConfiguredBossBar(config: BossBarConfig): BukkitBossBar {
  const BarColor = org.bukkit.boss.BarColor;
  const BarStyle = org.bukkit.boss.BarStyle;
  const BarFlag = org.bukkit.boss.BarFlag;
  
  const color = config.color ? BarColor[config.color] : BarColor.PURPLE;
  const style = config.style ? BarStyle[config.style] : BarStyle.SOLID;
  
  const bar = org.bukkit.Bukkit.createBossBar(config.title, color, style);
  
  if (config.progress !== undefined) {
    bar.setProgress(Math.max(0, Math.min(1, config.progress)));
  }
  
  if (config.flags) {
    for (const flagName of config.flags) {
      bar.addFlag(BarFlag[flagName]);
    }
  }
  
  if (config.visible !== undefined) {
    bar.setVisible(config.visible);
  }
  
  return bar;
}

// ============================================
// PROGRESS UTILITIES
// ============================================

/**
 * Set progress as percentage (0-100).
 */
export function setProgressPercent(bar: BukkitBossBar, percent: number): void {
  bar.setProgress(Math.max(0, Math.min(100, percent)) / 100);
}

/**
 * Get progress as percentage (0-100).
 */
export function getProgressPercent(bar: BukkitBossBar): number {
  return bar.getProgress() * 100;
}

/**
 * Set progress from current/max values.
 * 
 * @example
 * // Update from entity health
 * setProgressFromValues(bar, entity.getHealth(), entity.getMaxHealth());
 * 
 * // Update from timer
 * setProgressFromValues(bar, timeRemaining, totalTime);
 */
export function setProgressFromValues(
  bar: BukkitBossBar,
  current: number,
  max: number
): void {
  if (max <= 0) {
    bar.setProgress(0);
    return;
  }
  bar.setProgress(Math.max(0, Math.min(1, current / max)));
}

/**
 * Increment progress by amount.
 * 
 * @param bar Boss bar
 * @param amount Amount to add (can be negative)
 * @returns New progress value
 */
export function incrementProgress(bar: BukkitBossBar, amount: number): number {
  const newProgress = Math.max(0, Math.min(1, bar.getProgress() + amount));
  bar.setProgress(newProgress);
  return newProgress;
}

/**
 * Check if progress is full (1.0).
 */
export function isProgressFull(bar: BukkitBossBar): boolean {
  return bar.getProgress() >= 1.0;
}

/**
 * Check if progress is empty (0.0).
 */
export function isProgressEmpty(bar: BukkitBossBar): boolean {
  return bar.getProgress() <= 0.0;
}

// ============================================
// PLAYER UTILITIES
// ============================================

/**
 * Add multiple players to boss bar.
 */
export function addPlayers(bar: BukkitBossBar, players: BukkitPlayer[]): void {
  for (const player of players) {
    bar.addPlayer(player);
  }
}

/**
 * Remove multiple players from boss bar.
 */
export function removePlayers(bar: BukkitBossBar, players: BukkitPlayer[]): void {
  for (const player of players) {
    bar.removePlayer(player);
  }
}

/**
 * Get number of players viewing the bar.
 */
export function getPlayerCount(bar: BukkitBossBar): number {
  return bar.getPlayers().size();
}

/**
 * Check if player is viewing the bar.
 */
export function hasPlayer(bar: BukkitBossBar, player: BukkitPlayer): boolean {
  return bar.getPlayers().contains(player);
}

/**
 * Check if bar has any players.
 */
export function hasAnyPlayers(bar: BukkitBossBar): boolean {
  return !bar.getPlayers().isEmpty();
}

/**
 * Show bar to all online players.
 */
export function showToAllPlayers(bar: BukkitBossBar): void {
  const players = org.bukkit.Bukkit.getOnlinePlayers();
  const iter = players.iterator();
  
  while (iter.hasNext()) {
    bar.addPlayer(iter.next());
  }
  
  bar.setVisible(true);
}

/**
 * Set players to exactly the given list.
 * 
 * Removes players not in list, adds players in list.
 */
export function setPlayers(bar: BukkitBossBar, players: BukkitPlayer[]): void {
  bar.removeAll();
  addPlayers(bar, players);
}

// ============================================
// FLAG UTILITIES
// ============================================

/**
 * Get all active flags on bar.
 */
export function getActiveFlags(bar: BukkitBossBar): BukkitBarFlag[] {
  const BarFlag = org.bukkit.boss.BarFlag;
  const allFlags = BarFlag.values();
  const active: BukkitBarFlag[] = [];
  
  for (let i = 0; i < allFlags.length; i++) {
    const flag = allFlags[i];
    if (bar.hasFlag(flag)) {
      active.push(flag);
    }
  }
  
  return active;
}

/**
 * Set flags to exactly the given list.
 * 
 * Removes flags not in list, adds flags in list.
 */
export function setFlags(bar: BukkitBossBar, flags: BukkitBarFlag[]): void {
  const BarFlag = org.bukkit.boss.BarFlag;
  const allFlags = BarFlag.values();
  
  /* Remove all flags first */
  for (let i = 0; i < allFlags.length; i++) {
    bar.removeFlag(allFlags[i]);
  }
  
  /* Add specified flags */
  for (const flag of flags) {
    bar.addFlag(flag);
  }
}

/**
 * Clear all flags from bar.
 */
export function clearFlags(bar: BukkitBossBar): void {
  const BarFlag = org.bukkit.boss.BarFlag;
  const allFlags = BarFlag.values();
  
  for (let i = 0; i < allFlags.length; i++) {
    bar.removeFlag(allFlags[i]);
  }
}

/**
 * Toggle a flag on/off.
 */
export function toggleFlag(bar: BukkitBossBar, flag: BukkitBarFlag): boolean {
  if (bar.hasFlag(flag)) {
    bar.removeFlag(flag);
    return false;
  } else {
    bar.addFlag(flag);
    return true;
  }
}

/**
 * Count active flags.
 */
export function countFlags(bar: BukkitBossBar): number {
  return getActiveFlags(bar).length;
}

// ============================================
// VISIBILITY UTILITIES
// ============================================

/**
 * Toggle visibility.
 */
export function toggleVisibility(bar: BukkitBossBar): boolean {
  const newState = !bar.isVisible();
  bar.setVisible(newState);
  return newState;
}

/**
 * Show bar.
 */
export function show(bar: BukkitBossBar): void {
  bar.setVisible(true);
}

/**
 * Hide bar.
 */
export function hide(bar: BukkitBossBar): void {
  bar.setVisible(false);
}

// ============================================
// BATCH CONFIGURATION
// ============================================

/**
 * Apply multiple settings at once.
 */
export function configureBossBar(
  bar: BukkitBossBar,
  config: Partial<BossBarConfig>
): void {
  const BarColor = org.bukkit.boss.BarColor;
  const BarStyle = org.bukkit.boss.BarStyle;
  const BarFlag = org.bukkit.boss.BarFlag;
  
  if (config.title !== undefined) {
    bar.setTitle(config.title);
  }
  
  if (config.color !== undefined) {
    bar.setColor(BarColor[config.color]);
  }
  
  if (config.style !== undefined) {
    bar.setStyle(BarStyle[config.style]);
  }
  
  if (config.progress !== undefined) {
    bar.setProgress(Math.max(0, Math.min(1, config.progress)));
  }
  
  if (config.flags !== undefined) {
    clearFlags(bar);
    for (const flagName of config.flags) {
      bar.addFlag(BarFlag[flagName]);
    }
  }
  
  if (config.visible !== undefined) {
    bar.setVisible(config.visible);
  }
}

// ============================================
// STATE SNAPSHOT
// ============================================

/**
 * Complete bar state snapshot.
 */
export interface BossBarState {
  title: string;
  color: BarColorName;
  style: BarStyleName;
  progress: number;
  progressPercent: number;
  flags: BarFlagName[];
  visible: boolean;
  playerCount: number;
}

/**
 * Get complete bar state.
 */
export function getBossBarState(bar: BukkitBossBar): BossBarState {
  return {
    title: bar.getTitle(),
    color: bar.getColor().name() as BarColorName,
    style: bar.getStyle().name() as BarStyleName,
    progress: bar.getProgress(),
    progressPercent: bar.getProgress() * 100,
    flags: getActiveFlags(bar).map(f => f.name() as BarFlagName),
    visible: bar.isVisible(),
    playerCount: bar.getPlayers().size(),
  };
}

/**
 * Restore bar state from snapshot.
 */
export function restoreBossBarState(bar: BukkitBossBar, state: BossBarState): void {
  configureBossBar(bar, {
    title: state.title,
    color: state.color,
    style: state.style,
    progress: state.progress,
    flags: state.flags,
    visible: state.visible,
  });
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Get human-readable bar description.
 */
export function describeBossBar(bar: BukkitBossBar): string {
  const title = bar.getTitle();
  const color = bar.getColor().name();
  const progress = (bar.getProgress() * 100).toFixed(1);
  const players = bar.getPlayers().size();
  const visible = bar.isVisible() ? "visible" : "hidden";
  
  return `"${title}" [${color}] ${progress}% (${players} players, ${visible})`;
}

/**
 * Get short bar summary.
 */
export function summarizeBossBar(bar: BukkitBossBar): string {
  const title = bar.getTitle();
  const progress = Math.round(bar.getProgress() * 100);
  return `${title}: ${progress}%`;
}

// ============================================
// PRESETS
// ============================================

/**
 * Create a health bar for entity.
 */
export function createHealthBar(
  title: string,
  initialHealth: number,
  maxHealth: number
): BukkitBossBar {
  const bar = createConfiguredBossBar({
    title,
    color: "RED",
    style: "SOLID",
    progress: initialHealth / maxHealth,
  });
  return bar;
}

/**
 * Create a timer bar.
 */
export function createTimerBar(title: string): BukkitBossBar {
  const bar = createConfiguredBossBar({
    title,
    color: "GREEN",
    style: "SEGMENTED_20",
    progress: 1.0,
  });
  return bar;
}

/**
 * Create a progress/quest bar.
 */
export function createProgressBar(title: string): BukkitBossBar {
  const bar = createConfiguredBossBar({
    title,
    color: "BLUE",
    style: "SEGMENTED_10",
    progress: 0.0,
  });
  return bar;
}

/**
 * Create a Wither-style boss bar.
 */
export function createWitherStyleBar(title: string): BukkitBossBar {
  const bar = createConfiguredBossBar({
    title,
    color: "PURPLE",
    style: "SOLID",
    progress: 1.0,
    flags: ["DARKEN_SKY"],
  });
  return bar;
}

/**
 * Create an Ender Dragon-style boss bar.
 */
export function createDragonStyleBar(title: string): BukkitBossBar {
  const bar = createConfiguredBossBar({
    title,
    color: "PINK",
    style: "SOLID",
    progress: 1.0,
    flags: ["PLAY_BOSS_MUSIC", "CREATE_FOG"],
  });
  return bar;
}

// ============================================
// CLEANUP
// ============================================

/**
 * Remove bar from all players and hide.
 * 
 * Call this when done with a boss bar.
 */
export function cleanupBossBar(bar: BukkitBossBar): void {
  bar.setVisible(false);
  bar.removeAll();
}

/**
 * Reset bar to default state.
 */
export function resetBossBar(bar: BukkitBossBar): void {
  bar.setTitle("");
  bar.setProgress(1.0);
  bar.setColor(org.bukkit.boss.BarColor.PURPLE);
  bar.setStyle(org.bukkit.boss.BarStyle.SOLID);
  clearFlags(bar);
  bar.setVisible(true);
}