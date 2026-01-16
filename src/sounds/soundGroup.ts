/**
 * Represents a group of sounds for blocks.
 * 
 * Played when various actions happen: stepping, breaking, placing,
 * hitting, falling onto a block, etc.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/SoundGroup.html
 */

import { BukkitSound } from "./types/soundType";


// ============================================
// INTERFACE
// ============================================

export interface BukkitSoundGroup {
  /**
   * Volume these sounds are played at.
   * Note: not always the actual volume received by client.
   */
  getVolume(): number;

  /**
   * Pitch these sounds are played at.
   * Note: not always the actual pitch received by client.
   */
  getPitch(): number;

  /**
   * Sound played when block is broken.
   */
  getBreakSound(): BukkitSound;

  /**
   * Sound played when walking on the block.
   */
  getStepSound(): BukkitSound;

  /**
   * Sound played when block is placed.
   */
  getPlaceSound(): BukkitSound;

  /**
   * Sound played when block is hit (punched).
   */
  getHitSound(): BukkitSound;

  /**
   * Sound played when entity falls onto the block.
   */
  getFallSound(): BukkitSound;
}