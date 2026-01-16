/**
 * Handles specific metadata for certain items or blocks.
 * 
 * @deprecated All usage of MaterialData is deprecated and subject to removal.
 * Use BlockData instead.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/material/MaterialData.html
 */

import { BukkitMaterial } from "../enums/materialType";
import { BukkitItemStack } from "./itemstack";


// ============================================
// INTERFACE
// ============================================

/**
 * @deprecated Use BlockData instead.
 */
export interface BukkitMaterialData {
  /**
   * The material type.
   * @deprecated
   */
  getItemType(): BukkitMaterial;

  /**
   * Raw data value.
   * @deprecated Magic value
   */
  getData(): number;

  /**
   * Set raw data value.
   * @deprecated Magic value
   */
  setData(data: number): void;

  /**
   * Create ItemStack with amount 0.
   * @deprecated Use toItemStack(amount) instead.
   */
  toItemStack(): BukkitItemStack;

  /**
   * Create ItemStack with specified amount.
   * @deprecated
   */
  toItemStack(amount: number): BukkitItemStack;

  /**
   * @deprecated
   */
  clone(): BukkitMaterialData;

  /**
   * @deprecated
   */
  equals(obj: object): boolean;

  /**
   * @deprecated
   */
  hashCode(): number;

  /**
   * @deprecated
   */
  toString(): string;
}

// ============================================
// MATERIAL DATA CLASS INTERFACE
// ============================================

/**
 * @deprecated Use BlockData instead.
 */
interface MaterialDataClass {
  /**
   * @deprecated
   */
  create(type: BukkitMaterial): BukkitMaterialData;

  /**
   * @deprecated Magic value
   */
  create(type: BukkitMaterial, data: number): BukkitMaterialData;
}

// ============================================
// MATERIAL DATA
// ============================================

/**
 * @deprecated Use BlockData instead.
 */
export const MaterialData: MaterialDataClass = {
  create(type: BukkitMaterial, data?: number): BukkitMaterialData {
    if (data !== undefined) {
      return new org.bukkit.material.MaterialData(type, data);
    }
    return new org.bukkit.material.MaterialData(type);
  },
};