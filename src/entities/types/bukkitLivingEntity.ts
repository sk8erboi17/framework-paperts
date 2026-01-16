/**
 * Represents a living entity, such as a monster or player.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/LivingEntity.html
 */

import { BukkitColor } from "../../items/enums/colorType";
import { BukkitMaterial } from "../../items/enums/materialType";
import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitNamespacedKey } from "../../items/types/namespacedKey";
import { JavaUUID } from "../../java/types/uuid";
import { BukkitSound } from "../../sounds/types/soundType";
import { BukkitBlock } from "../../world/types/block";
import { BukkitLocation } from "../../world/types/location";
import { BukkitAttributable } from "./attributable";
import { BukkitEntity } from "./bukkitEntity";
import { BukkitPlayer } from "./bukkitPlayer";
import { BukkitDamageable } from "./damageble";
import { BukkitLeashable } from "./leashable";
import { BukkitProjectileSource } from "./projectileSource";


// ============================================
// INTERFACE
// ============================================

export interface BukkitLivingEntity extends BukkitEntity, BukkitDamageable, BukkitAttributable, BukkitLeashable, BukkitProjectileSource {

  // ---- Eye & Line of Sight ----

  /**
   * Height of entity's eyes above its location.
   */
  getEyeHeight(): number;

  /**
   * Height of entity's eyes, optionally ignoring pose effects.
   * @param ignorePose If true, ignore sneaking/gliding effects
   */
  getEyeHeight(ignorePose: boolean): number;

  /**
   * Location at the entity's eyes.
   */
  getEyeLocation(): BukkitLocation;

  /**
   * Get all blocks along the entity's line of sight.
   * @param transparent Set of transparent materials (null for only air)
   * @param maxDistance Maximum scan distance (server may limit to 100+)
   */
  getLineOfSight(transparent: Set<BukkitMaterial> | null, maxDistance: number): BukkitBlock[];

  /**
   * Get the block the entity is looking at.
   * Considers blocks as 1x1x1.
   */
  getTargetBlock(transparent: Set<BukkitMaterial> | null, maxDistance: number): BukkitBlock;

  /**
   * Get last two blocks along line of sight.
   * Target block is last in list.
   */
  getLastTwoTargetBlocks(transparent: Set<BukkitMaterial> | null, maxDistance: number): BukkitBlock[];

  /**
   * Get targeted block using precise collision shapes.
   * Ignores fluids.
   */
  getTargetBlockExact(maxDistance: number): BukkitBlock | null;

  /**
   * Get targeted block with fluid collision mode.
   */
  getTargetBlockExact(maxDistance: number, fluidCollisionMode: any /* FluidCollisionMode */): BukkitBlock | null;

  /**
   * Ray trace for targeted block info.
   * Uses precise collision shapes, ignores fluids.
   */
  rayTraceBlocks(maxDistance: number): any /* RayTraceResult */ | null;

  /**
   * Ray trace with fluid collision mode.
   */
  rayTraceBlocks(maxDistance: number, fluidCollisionMode: any /* FluidCollisionMode */): any /* RayTraceResult */ | null;

  /**
   * Check if entity has line of sight to another.
   * Uses hostile mob targeting algorithm.
   */
  hasLineOfSight(other: BukkitEntity): boolean;

  // ---- Air / Breathing ----

  /**
   * Remaining air in ticks.
   */
  getRemainingAir(): number;

  /**
   * Set remaining air.
   */
  setRemainingAir(ticks: number): void;

  /**
   * Maximum air capacity in ticks.
   */
  getMaximumAir(): number;

  /**
   * Set maximum air capacity.
   */
  setMaximumAir(ticks: number): void;

  /**
   * True if entity can breathe underwater.
   */
  canBreatheUnderwater(): boolean;

  // ---- Item Usage ----

  /**
   * Item currently being used (eating, drawing bow, etc.).
   */
  getItemInUse(): BukkitItemStack | null;

  /**
   * Ticks remaining for current item usage.
   */
  getItemInUseTicks(): number;

  /**
   * Set remaining ticks for item usage.
   */
  setItemInUseTicks(ticks: number): void;

  // ---- Arrows ----

  /**
   * Ticks until next arrow leaves body.
   */
  getArrowCooldown(): number;

  /**
   * Set arrow removal cooldown.
   */
  setArrowCooldown(ticks: number): void;

  /**
   * Number of arrows stuck in body.
   */
  getArrowsInBody(): number;

  /**
   * Set number of arrows in body.
   */
  setArrowsInBody(count: number): void;

  // ---- Damage Ticks ----

  /**
   * Maximum invulnerability ticks after damage.
   */
  getMaximumNoDamageTicks(): number;

  /**
   * Set maximum no-damage ticks.
   */
  setMaximumNoDamageTicks(ticks: number): void;

  /**
   * Last damage taken during current no-damage period.
   * Only higher damage will hurt.
   */
  getLastDamage(): number;

  /**
   * Set last damage for no-damage calculation.
   */
  setLastDamage(damage: number): void;

  /**
   * Current remaining no-damage ticks.
   */
  getNoDamageTicks(): number;

  /**
   * Set current no-damage ticks.
   */
  setNoDamageTicks(ticks: number): void;

  /**
   * Ticks of no action (varies by entity type).
   */
  getNoActionTicks(): number;

  /**
   * Set no-action ticks.
   */
  setNoActionTicks(ticks: number): void;

  // ---- Combat ----

  /**
   * Player who killed this entity (for drops/XP).
   */
  getKiller(): BukkitPlayer | null;

  /**
   * Make entity attack another with melee attack.
   * Damage calculated from attributes/equipment.
   */
  attack(target: BukkitEntity): void;

  // ---- Potion Effects ----

  /**
   * Add a potion effect.
   * @returns true if added successfully
   */
  addPotionEffect(effect: any /* BukkitPotionEffect */): boolean;

  /**
   * @deprecated Force parameter no longer needed.
   */
  addPotionEffect(effect: any /* BukkitPotionEffect */, force: boolean): boolean;

  /**
   * Add multiple potion effects.
   * @returns true if all added successfully
   */
  addPotionEffects(effects: any[] /* BukkitPotionEffect[] */): boolean;

  /**
   * Check if entity has this potion effect type.
   */
  hasPotionEffect(type: any /* PotionEffectType */): boolean;

  /**
   * Get active potion effect of type, or null.
   */
  getPotionEffect(type: any /* PotionEffectType */): any /* BukkitPotionEffect */ | null;

  /**
   * Remove potion effect of type.
   */
  removePotionEffect(type: any /* PotionEffectType */): void;

  /**
   * Get all active potion effects.
   */
  getActivePotionEffects(): any[] /* BukkitPotionEffect[] */;

  // ---- Equipment ----

  /**
   * Get equipment inventory (armor, held items).
   */
  getEquipment(): any /* BukkitEntityEquipment */ | null;

  /**
   * Whether entity can pick up items.
   */
  getCanPickupItems(): boolean;

  /**
   * Set whether entity can pick up items.
   */
  setCanPickupItems(pickup: boolean): void;

  // ---- Movement States ----

  /**
   * Is entity gliding (elytra).
   */
  isGliding(): boolean;

  /**
   * Start/stop gliding.
   * Reverted by server if no elytra unless cancelled.
   */
  setGliding(gliding: boolean): void;

  /**
   * Is entity swimming.
   */
  isSwimming(): boolean;

  /**
   * Start/stop swimming.
   */
  setSwimming(swimming: boolean): void;

  /**
   * Is entity riptiding (trident).
   */
  isRiptiding(): boolean;

  /**
   * Start/stop riptiding.
   * Note: Does not damage entities.
   */
  setRiptiding(riptiding: boolean): void;

  /**
   * Is entity sleeping.
   */
  isSleeping(): boolean;

  /**
   * Is entity climbing (ladder, vine).
   */
  isClimbing(): boolean;

  // ---- AI ----

  /**
   * Whether entity has AI enabled.
   */
  hasAI(): boolean;

  /**
   * Enable/disable AI.
   * Entity cannot move without AI.
   */
  setAI(ai: boolean): void;

  // ---- Collision ----

  /**
   * Whether entity collides with others.
   */
  isCollidable(): boolean;

  /**
   * Set collision state.
   * Note: May not work reliably for players (use Teams).
   */
  setCollidable(collidable: boolean): void;

  /**
   * UUIDs exempt from collision rule (inverted behavior).
   * Mutable set.
   */
  getCollidableExemptions(): Set<JavaUUID>;

  // ---- Despawn ----

  /**
   * Whether entity despawns when far from players.
   */
  getRemoveWhenFarAway(): boolean;

  /**
   * Set despawn behavior.
   */
  setRemoveWhenFarAway(remove: boolean): void;

  // ---- Animations ----

  /**
   * Play main hand swing animation.
   */
  swingMainHand(): void;

  /**
   * Play off hand swing animation.
   */
  swingOffHand(): void;

  /**
   * Flash red as if damaged.
   * @param yaw Direction of damage (0=front, 90=right, 180=back, 270=left)
   */
  playHurtAnimation(yaw: number): void;

  // ---- Visibility ----

  /**
   * Whether entity is invisible.
   */
  isInvisible(): boolean;

  /**
   * Set invisibility.
   */
  setInvisible(invisible: boolean): void;

  // ---- Memory (AI Brain) ----

  /**
   * Get AI memory value.
   */
  getMemory<T>(memoryKey: any /* MemoryKey<T> */): T | null;

  /**
   * Set AI memory value.
   */
  setMemory<T>(memoryKey: any /* MemoryKey<T> */, memoryValue: T | null): void;

  // ---- Sounds ----

  /**
   * Sound when hurt.
   */
  getHurtSound(): BukkitSound | null;

  /**
   * Sound on death.
   */
  getDeathSound(): BukkitSound | null;

  /**
   * Fall damage sound for given height.
   */
  getFallDamageSound(fallHeight: number): BukkitSound;

  /**
   * Small fall damage sound.
   */
  getFallDamageSoundSmall(): BukkitSound;

  /**
   * Big fall damage sound.
   */
  getFallDamageSoundBig(): BukkitSound;

  /**
   * Sound when drinking item.
   */
  getDrinkingSound(itemStack: BukkitItemStack): BukkitSound;

  /**
   * Sound when eating item.
   */
  getEatingSound(itemStack: BukkitItemStack): BukkitSound;

  // ---- Category ----

  /**
   * @deprecated Use tags instead of categories.
   */
  getCategory(): any /* EntityCategory */;

  // ---- Waypoints (Allays) ----

  /**
   * Waypoint color, or null if default.
   */
  getWaypointColor(): BukkitColor | null;

  /**
   * Set waypoint color.
   */
  setWaypointColor(color: BukkitColor | null): void;

  /**
   * Waypoint style key.
   */
  getWaypointStyle(): BukkitNamespacedKey;

  /**
   * Set waypoint style.
   */
  setWaypointStyle(key: BukkitNamespacedKey | null): void;
}