// entities/types/player.ts

import { BukkitDyeColor } from "../../items/enums/dyeColorType";
import { BukkitPotionEffectType } from "../../items/enums/potionEffectType";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { BukkitPotionEffect } from "../../items/types/potionEffect";
import { JavaCollection } from "../../java/types/collections";
import { JavaMap } from "../../java/types/map";
import { JavaUUID } from "../../java/types/uuid";
import { BukkitEffect } from "../../particles/type/effect";
import { BukkitParticle } from "../../particles/type/particle";
import { BukkitSoundCategory } from "../../sounds/types/soundGroup";
import { BukkitSound } from "../../sounds/types/soundType";
import { BukkitBlock } from "../../world/types/block";
import { BukkitBlockData } from "../../world/types/blockData";
import { BukkitBlockState } from "../../world/types/blockState";
import { BukkitLocation } from "../../world/types/location";
import { BukkitEntityEffect } from "../enums/entityEffectType";
import { BukkitGameMode } from "../enums/gamemodeType";
import { BukkitInput } from "../enums/input";
import { BukkitWeatherType } from "../enums/weatherType";
import { BukkitEntity } from "./bukkitEntity";
import { BukkitHumanEntity } from "./bukkitHumanEntity";
import { BukkitLivingEntity } from "./bukkitLivingEntity";
import { BukkitCommandSender, BukkitCommandSenderSpigot } from "./commandSender";
import { BukkitEquipmentSlot } from "./entityEquipments";
import { BukkitInstrument } from "./instrument";
import { BukkitNote } from "./note";


/**
 * Player
 * 
 * Represents a player, connected or not.
 * 
 * HIERARCHY:
 * Entity
 * └── LivingEntity
 *     └── HumanEntity
 *         └── Player (this)
 * 
 * INTERFACES:
 * - Conversable: NPC conversations
 * - OfflinePlayer: Offline data access
 * - PluginMessageRecipient: Plugin messaging
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Player.html
 */
export interface BukkitPlayer extends BukkitHumanEntity, BukkitCommandSender {

  // ============================================
  // IDENTITY & NAMES
  // ============================================

  getName(): string;
  getDisplayName(): string;
  setDisplayName(name: string | null): void;
  getPlayerListName(): string;
  setPlayerListName(name: string | null): void;
  getPlayerListOrder(): number;
  setPlayerListOrder(order: number): void;
  getPlayerListHeader(): string | null;
  getPlayerListFooter(): string | null;
  setPlayerListHeader(header: string | null): void;
  setPlayerListFooter(footer: string | null): void;
  setPlayerListHeaderFooter(header: string | null, footer: string | null): void;

  // ============================================
  // CONNECTION & NETWORK
  // ============================================

  getAddress(): any /*JavaInetSocketAddress*/ | null;
  isTransferred(): boolean;
  getPing(): number;
  getLocale(): string;
  getClientViewDistance(): number;
  kickPlayer(message: string | null): void;
  transfer(host: string, port: number): void;
  storeCookie(key: BukkitNamespacedKey, value: number[]): void;
  retrieveCookie(key: BukkitNamespacedKey): /*JavaCompletableFuture<number[]>*/ any;

  // ============================================
  // CHAT & COMMUNICATION
  // ============================================

  chat(msg: string): void;
  sendRawMessage(message: string): void;
  performCommand(command: string): boolean;
  addCustomChatCompletions(completions: JavaCollection<string>): void;
  removeCustomChatCompletions(completions: JavaCollection<string>): void;
  setCustomChatCompletions(completions: JavaCollection<string>): void;

  // ============================================
  // TITLES & DISPLAY
  // ============================================

  /**
   * Sends a title and subtitle message.
   * 
   * @param title Title text (null = unchanged)
   * @param subtitle Subtitle text (null = unchanged)
   * @param fadeIn Ticks to fade in (default 10)
   * @param stay Ticks to stay (default 70)
   * @param fadeOut Ticks to fade out (default 20)
   */
  sendTitle(
    title: string | null,
    subtitle: string | null,
    fadeIn: number,
    stay: number,
    fadeOut: number
  ): void;

  resetTitle(): void;
  showDemoScreen(): void;

  // ============================================
  // SOUNDS
  // ============================================

  playSound(location: BukkitLocation, sound: BukkitSound, volume: number, pitch: number): void;
  playSound(location: BukkitLocation, sound: BukkitSound, category: BukkitSoundCategory, volume: number, pitch: number): void;
  playSound(location: BukkitLocation, sound: BukkitSound, category: BukkitSoundCategory, volume: number, pitch: number, seed: number): void;
  playSound(location: BukkitLocation, sound: string, volume: number, pitch: number): void;
  playSound(location: BukkitLocation, sound: string, category: BukkitSoundCategory, volume: number, pitch: number): void;
  playSound(entity: BukkitEntity, sound: BukkitSound, volume: number, pitch: number): void;
  playSound(entity: BukkitEntity, sound: BukkitSound, category: BukkitSoundCategory, volume: number, pitch: number): void;
  playNote(loc: BukkitLocation, instrument: BukkitInstrument, note: BukkitNote): void;
  stopSound(sound: BukkitSound): void;
  stopSound(sound: string): void;
  stopSound(sound: BukkitSound, category: BukkitSoundCategory | null): void;
  stopSound(category: BukkitSoundCategory): void;
  stopAllSounds(): void;

  // ============================================
  // PARTICLES
  // ============================================

  spawnParticle(particle: BukkitParticle, location: BukkitLocation, count: number): void;
  spawnParticle(particle: BukkitParticle, x: number, y: number, z: number, count: number): void;
  spawnParticle<T>(particle: BukkitParticle, location: BukkitLocation, count: number, data: T | null): void;
  spawnParticle(particle: BukkitParticle, location: BukkitLocation, count: number, offsetX: number, offsetY: number, offsetZ: number): void;
  spawnParticle(particle: BukkitParticle, location: BukkitLocation, count: number, offsetX: number, offsetY: number, offsetZ: number, extra: number): void;
  spawnParticle<T>(particle: BukkitParticle, location: BukkitLocation, count: number, offsetX: number, offsetY: number, offsetZ: number, extra: number, data: T | null, force: boolean): void;

  // ============================================
  // EFFECTS (OVERLOADED - extends Entity.playEffect)
  // ============================================

  /**
   * Play an EntityEffect on this entity (inherited from Entity).
   */
  playEffect(type: BukkitEntityEffect): void;

  /**
   * Play an Effect at a location (Player-specific).
   * 
   * This overload is only available on Player.
   */
  playEffect<T>(loc: BukkitLocation, effect: BukkitEffect, data: T | null): void;

  /**
   * Send a hurt animation.
   * @param yaw Direction: 0=front, 90=right, 180=back, 270=left
   */
  sendHurtAnimation(yaw: number): void;

  // ============================================
  // EXPERIENCE & LEVELS
  // ============================================

  getExp(): number;
  setExp(exp: number): void;
  getLevel(): number;
  setLevel(level: number): void;
  getTotalExperience(): number;
  setTotalExperience(exp: number): void;
  giveExp(amount: number): void;
  giveExpLevels(amount: number): void;
  getExpCooldown(): number;
  setExpCooldown(ticks: number): void;
  sendExperienceChange(progress: number): void;
  sendExperienceChange(progress: number, level: number): void;

  // ============================================
  // MOVEMENT & FLIGHT
  // ============================================

  /** @deprecated Unreliable - controlled by client */
  isOnGround(): boolean;
  isSneaking(): boolean;
  setSneaking(sneak: boolean): void;
  isSprinting(): boolean;
  setSprinting(sprinting: boolean): void;
  isFlying(): boolean;
  setFlying(value: boolean): void;
  getAllowFlight(): boolean;
  setAllowFlight(flight: boolean): void;
  getFlySpeed(): number;
  setFlySpeed(value: number): void;
  getWalkSpeed(): number;
  setWalkSpeed(value: number): void;
  
  /** @experimental */
  getCurrentInput(): BukkitInput;

  // ============================================
  // TIME & WEATHER (Client-side)
  // ============================================

  setPlayerTime(time: number, relative: boolean): void;
  getPlayerTime(): number;
  getPlayerTimeOffset(): number;
  isPlayerTimeRelative(): boolean;
  resetPlayerTime(): void;
  setPlayerWeather(type: BukkitWeatherType): void;
  getPlayerWeather(): BukkitWeatherType | null;
  resetPlayerWeather(): void;

  // ============================================
  // COMPASS & SPAWN
  // ============================================

  setCompassTarget(loc: BukkitLocation): void;
  getCompassTarget(): BukkitLocation;
  getRespawnLocation(): BukkitLocation | null;
  setRespawnLocation(location: BukkitLocation | null): void;
  setRespawnLocation(location: BukkitLocation | null, force: boolean): void;
  
  /** @deprecated Use getRespawnLocation() */
  getBedSpawnLocation(): BukkitLocation | null;
  /** @deprecated Use setRespawnLocation() */
  setBedSpawnLocation(location: BukkitLocation | null): void;

  // ============================================
  // SLEEPING
  // ============================================

  setSleepingIgnored(isSleeping: boolean): void;
  isSleepingIgnored(): boolean;

  // ============================================
  // GAME MODE
  // ============================================

  getPreviousGameMode(): BukkitGameMode | null;

  // ============================================
  // SPECTATOR
  // ============================================

  getSpectatorTarget(): BukkitEntity | null;
  setSpectatorTarget(entity: BukkitEntity | null): void;

  // ============================================
  // BLOCK INTERACTIONS
  // ============================================

  breakBlock(block: BukkitBlock): boolean;
  sendBlockChange(loc: BukkitLocation, block: BukkitBlockData): void;
  sendBlockChanges(blocks: JavaCollection<BukkitBlockState>): void;
  sendBlockDamage(loc: BukkitLocation, progress: number): void;
  sendBlockDamage(loc: BukkitLocation, progress: number, source: BukkitEntity): void;
  sendBlockDamage(loc: BukkitLocation, progress: number, sourceId: number): void;
  
  /** @experimental */
  sendBlockUpdate(loc: BukkitLocation, tileState: any /* BukkitTileState*/): void;

  // ============================================
  // SIGN CHANGES
  // ============================================

  sendSignChange(loc: BukkitLocation, lines: string[] | null): void;
  sendSignChange(loc: BukkitLocation, lines: string[] | null, dyeColor: BukkitDyeColor): void;
  sendSignChange(loc: BukkitLocation, lines: string[] | null, dyeColor: BukkitDyeColor, hasGlowingText: boolean): void;
  openSign(sign: any /*BukkitSign*/): void;
  openSign(sign: any /*BukkitSign*/, side: any /*BukkitSide*/): void;

  // ============================================
  // EQUIPMENT & POTION CHANGES (Fake)
  // ============================================

  sendEquipmentChange(entity: BukkitLivingEntity, slot: BukkitEquipmentSlot, item: BukkitItemStack | null): void;
  sendEquipmentChange(entity: BukkitLivingEntity, items: JavaMap<BukkitEquipmentSlot, BukkitItemStack>): void;
  sendPotionEffectChange(entity: BukkitLivingEntity, effect: BukkitPotionEffect): void;
  sendPotionEffectChangeRemove(entity: BukkitLivingEntity, type: BukkitPotionEffectType): void;

  // ============================================
  // HEALTH DISPLAY
  // ============================================

  sendHealthUpdate(health: number, foodLevel: number, saturation: number): void;
  sendHealthUpdate(): void;
  isHealthScaled(): boolean;
  setHealthScaled(scale: boolean): void;
  getHealthScale(): number;
  setHealthScale(scale: number): void;

  // ============================================
  // PLAYER VISIBILITY
  // ============================================
/* Not supported
  hidePlayer(plugin: BukkitPlugin, player: BukkitPlayer): void;
  showPlayer(plugin: BukkitPlugin, player: BukkitPlayer): void;
  canSee(player: BukkitPlayer): boolean;
  hideEntity(plugin: BukkitPlugin, entity: BukkitEntity): void;
  showEntity(plugin: BukkitPlugin, entity: BukkitEntity): void;
  canSee(entity: BukkitEntity): boolean;
  */
  // ============================================
  // RESOURCE PACKS
  // ============================================

  setResourcePack(url: string): void;
  setResourcePack(url: string, hash: number[] | null): void;
  setResourcePack(url: string, hash: number[] | null, prompt: string | null): void;
  setResourcePack(url: string, hash: number[] | null, prompt: string | null, force: boolean): void;
  setResourcePack(id: JavaUUID, url: string, hash: number[] | null, prompt: string | null, force: boolean): void;
  addResourcePack(id: JavaUUID, url: string, hash: number[] | null, prompt: string | null, force: boolean): void;
  removeResourcePack(id: JavaUUID): void;
  removeResourcePacks(): void;

  // ============================================
  // SCOREBOARD
  // ============================================

  getScoreboard(): any /*BukkitScoreboard*/;
  setScoreboard(scoreboard: any /*BukkitScoreboard*/): void;

  // ============================================
  // WORLD BORDER (Per-player)
  // ============================================

  getWorldBorder(): /*BukkitWorldBorder*/ any | null;
  setWorldBorder(border: /*BukkitWorldBorder*/ any | null): void;

  // ============================================
  // ADVANCEMENTS
  // ============================================

  getAdvancementProgress(advancement: /*BukkitAdvancement*/ any): any /*BukkitAdvancementProgress*/;

  // ============================================
  // MAP
  // ============================================

  sendMap(map: /*BukkitMapView*/ any): void;

  // ============================================
  // BOOK & INVENTORY
  // ============================================

  openBook(book: BukkitItemStack): void;
  
  /** @internal Generally not needed by plugins. */
  updateInventory(): void;
  updateCommands(): void;

  // ============================================
  // DATA PERSISTENCE
  // ============================================

  saveData(): void;
  loadData(): void;

  // ============================================
  // BANNING
  // ============================================
/* NOT SUPPORTED
  ban(reason: string | null, expires: JavaDate | null, source: string | null, kickPlayer: boolean): BukkitBanEntry<BukkitPlayerProfile> | null;
  ban(reason: string | null, expires: JavaInstant | null, source: string | null, kickPlayer: boolean): BukkitBanEntry<BukkitPlayerProfile> | null;
  ban(reason: string | null, duration: JavaDuration | null, source: string | null, kickPlayer: boolean): BukkitBanEntry<BukkitPlayerProfile> | null;
  banIp(reason: string | null, expires: JavaDate | null, source: string | null, kickPlayer: boolean): BukkitBanEntry<JavaInetAddress> | null;
  banIp(reason: string | null, expires: JavaInstant | null, source: string | null, kickPlayer: boolean): BukkitBanEntry<JavaInetAddress> | null;
  banIp(reason: string | null, duration: JavaDuration | null, source: string | null, kickPlayer: boolean): BukkitBanEntry<JavaInetAddress> | null;
*/
  // ============================================
  // ENDER PEARLS
  // ============================================

  /** @experimental */
  getEnderPearls(): JavaCollection<BukkitEntity>;

  // ============================================
  // DIALOGS
  // ============================================

  /** @experimental */
  clearDialog(): void;
  /** @experimental */
  showDialog(dialog: BukkitNamespacedKey): void;

  // ============================================
  // SERVER LINKS
  // ============================================

  sendLinks(links: any /*BukkitServerLinks*/): void;

  // ============================================
  // SETTINGS
  // ============================================

  isAllowingServerListings(): boolean;

   // ============================================
  // COMMAND SENDER (inherited, some overridden)
  // ============================================

  /**
   * Gets the name of this player.
   * 
   * This is the player's username (e.g., "Steve").
   * Inherited from CommandSender but more specific for Player.
   */
  getName(): string;

  /**
   * Sends this player a message.
   * 
   * Supports color codes with § or ChatColor.
   */
  sendMessage(message: string): void;

  /**
   * Sends this player multiple messages.
   */
  sendMessage(...messages: string[]): void;

  /**
   * Sends this player a message with sender UUID.
   * 
   * The UUID helps clients identify the source for
   * chat filtering and social interactions.
   */
  sendMessage(sender: JavaUUID | null, message: string): void;

  /**
   * Sends this player multiple messages with sender UUID.
   */
  sendMessage(sender: JavaUUID | null, ...messages: string[]): void;

  /**
   * Returns the server instance.
   */
  getServer(): /*BukkitServer*/ any;

  /**
   * Gets the Spigot API helper for this player.
   * 
   * Provides access to advanced messaging features like
   * BaseComponent messages with hover/click events.
   */ 
   spigot(): BukkitPlayerSpigot;
}

/**
 * Spigot-specific extensions for Player.
 * 
 * Extends CommandSender.Spigot with Player-specific methods.
 */
export interface BukkitPlayerSpigot extends BukkitCommandSenderSpigot {
  /**
   * Gets the player's connection address.
   * 
   * @returns The raw address
   */
  getRawAddress(): any /* InetSocketAddress */;

  /**
   * Respawns the player if dead.
   */
  respawn(): void;

  /**
   * Gets the player's locale.
   * 
   * @returns The locale string
   * @deprecated Use Player.getLocale()
   */
  getLocale(): string;

  /**
   * Sends a BaseComponent message to this player.
   */
  sendMessage(component: any /* BaseComponent */): void;

  /**
   * Sends multiple BaseComponent messages.
   */
  sendMessage(...components: any[] /* BaseComponent[] */): void;

  /**
   * Sends a BaseComponent message with sender UUID.
   */
  sendMessage(sender: JavaUUID | null, component: any /* BaseComponent */): void;

  /**
   * Sends multiple BaseComponent messages with sender UUID.
   */
  sendMessage(sender: JavaUUID | null, ...components: any[] /* BaseComponent[] */): void;
}