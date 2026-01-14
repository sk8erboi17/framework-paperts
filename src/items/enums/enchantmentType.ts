/**
 * The various types of enchantments that may be added to armor or weapons.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/enchantments/Enchantment.html
 */

// ============================================
// INTERFACE
// ============================================

export interface BukkitEnchantment {
  /**
   * Return the namespaced identifier for this enchantment.
   * @returns This enchantment's key
   */
  getKey(): any;

  /**
   * Returns the name of this enchantment.
   * @returns The name
   * @deprecated enchantments are badly named, use getKey()
   */
  getName(): string;

  /**
   * Gets the maximum level that this Enchantment may become.
   * @returns The maximum level
   */
  getMaxLevel(): number;

  /**
   * Gets the level that this Enchantment should start at.
   * @returns The start level
   */
  getStartLevel(): number;

  /**
   * Checks if this Enchantment may be applied to the given ItemStack.
   * @param item - Item to test
   * @returns True if the enchantment can be applied
   */
  canEnchantItem(item: any): boolean;

  /**
   * Check if this enchantment conflicts with another enchantment.
   * @param other - Enchantment to check against
   * @returns True if there is a conflict
   */
  conflictsWith(other: BukkitEnchantment): boolean;

  /**
   * Returns the string representation.
   * @returns String representation
   */
  toString(): string;
}

// ============================================
// ENCHANTMENTS
// ============================================

export const Enchantment: Record<string, BukkitEnchantment> = {
  /** Increases the speed at which a player may mine underwater */
  AQUA_AFFINITY: org.bukkit.enchantments.Enchantment.AQUA_AFFINITY,

  /** Increases damage against arthropod targets */
  BANE_OF_ARTHROPODS: org.bukkit.enchantments.Enchantment.BANE_OF_ARTHROPODS,

  /** Item cannot be removed */
  BINDING_CURSE: org.bukkit.enchantments.Enchantment.BINDING_CURSE,

  /** Provides protection against explosive damage */
  BLAST_PROTECTION: org.bukkit.enchantments.Enchantment.BLAST_PROTECTION,

  /** Reduces armor effectiveness against maces */
  BREACH: org.bukkit.enchantments.Enchantment.BREACH,

  /** Strikes lightning when a mob is hit with a trident if conditions are stormy */
  CHANNELING: org.bukkit.enchantments.Enchantment.CHANNELING,

  /** Increases fall damage of maces */
  DENSITY: org.bukkit.enchantments.Enchantment.DENSITY,

  /** Increases walking speed while in water */
  DEPTH_STRIDER: org.bukkit.enchantments.Enchantment.DEPTH_STRIDER,

  /** Increases the rate at which you mine/dig */
  EFFICIENCY: org.bukkit.enchantments.Enchantment.EFFICIENCY,

  /** Provides protection against fall damage */
  FEATHER_FALLING: org.bukkit.enchantments.Enchantment.FEATHER_FALLING,

  /** When attacking a target, has a chance to set them on fire */
  FIRE_ASPECT: org.bukkit.enchantments.Enchantment.FIRE_ASPECT,

  /** Provides protection against fire damage */
  FIRE_PROTECTION: org.bukkit.enchantments.Enchantment.FIRE_PROTECTION,

  /** Sets entities on fire when hit by arrows shot from a bow */
  FLAME: org.bukkit.enchantments.Enchantment.FLAME,

  /** Provides a chance of gaining extra loot when destroying blocks */
  FORTUNE: org.bukkit.enchantments.Enchantment.FORTUNE,

  /** Freezes any still water adjacent to ice / frost which player is walking on */
  FROST_WALKER: org.bukkit.enchantments.Enchantment.FROST_WALKER,

  /** Deals more damage to mobs that live in the ocean */
  IMPALING: org.bukkit.enchantments.Enchantment.IMPALING,

  /** Provides infinite arrows when shooting a bow */
  INFINITY: org.bukkit.enchantments.Enchantment.INFINITY,

  /** All damage to other targets will knock them back when hit */
  KNOCKBACK: org.bukkit.enchantments.Enchantment.KNOCKBACK,

  /** Provides a chance of gaining extra loot when killing monsters */
  LOOTING: org.bukkit.enchantments.Enchantment.LOOTING,

  /** Causes a thrown trident to return to the player who threw it */
  LOYALTY: org.bukkit.enchantments.Enchantment.LOYALTY,

  /** Decreases odds of catching worthless junk */
  LUCK_OF_THE_SEA: org.bukkit.enchantments.Enchantment.LUCK_OF_THE_SEA,

  /** Lunges further forward when attacking */
  LUNGE: org.bukkit.enchantments.Enchantment.LUNGE,

  /** Increases rate of fish biting your hook */
  LURE: org.bukkit.enchantments.Enchantment.LURE,

  /** Allows mending the item using experience orbs */
  MENDING: org.bukkit.enchantments.Enchantment.MENDING,

  /** Shoot multiple arrows from crossbows */
  MULTISHOT: org.bukkit.enchantments.Enchantment.MULTISHOT,

  /** Crossbow projectiles pierce entities */
  PIERCING: org.bukkit.enchantments.Enchantment.PIERCING,

  /** Provides extra damage when shooting arrows from bows */
  POWER: org.bukkit.enchantments.Enchantment.POWER,

  /** Provides protection against projectile damage */
  PROJECTILE_PROTECTION: org.bukkit.enchantments.Enchantment.PROJECTILE_PROTECTION,

  /** Provides protection against environmental damage */
  PROTECTION: org.bukkit.enchantments.Enchantment.PROTECTION,

  /** Provides a knockback when an entity is hit by an arrow from a bow */
  PUNCH: org.bukkit.enchantments.Enchantment.PUNCH,

  /** Charges crossbows quickly */
  QUICK_CHARGE: org.bukkit.enchantments.Enchantment.QUICK_CHARGE,

  /** Decreases the rate of air loss whilst underwater */
  RESPIRATION: org.bukkit.enchantments.Enchantment.RESPIRATION,

  /** When it is rainy, launches the player in the direction their trident is thrown */
  RIPTIDE: org.bukkit.enchantments.Enchantment.RIPTIDE,

  /** Increases damage against all targets */
  SHARPNESS: org.bukkit.enchantments.Enchantment.SHARPNESS,

  /** Allows blocks to drop themselves instead of fragments (for example, stone instead of cobblestone) */
  SILK_TOUCH: org.bukkit.enchantments.Enchantment.SILK_TOUCH,

  /** Increases damage against undead targets */
  SMITE: org.bukkit.enchantments.Enchantment.SMITE,

  /** Walk quicker on soul blocks */
  SOUL_SPEED: org.bukkit.enchantments.Enchantment.SOUL_SPEED,

  /** Increases damage against targets when using a sweep attack */
  SWEEPING_EDGE: org.bukkit.enchantments.Enchantment.SWEEPING_EDGE,

  /** Walk quicker while sneaking */
  SWIFT_SNEAK: org.bukkit.enchantments.Enchantment.SWIFT_SNEAK,

  /** Damages the attacker */
  THORNS: org.bukkit.enchantments.Enchantment.THORNS,

  /** Decreases the rate at which a tool looses durability */
  UNBREAKING: org.bukkit.enchantments.Enchantment.UNBREAKING,

  /** Item disappears instead of dropping */
  VANISHING_CURSE: org.bukkit.enchantments.Enchantment.VANISHING_CURSE,

  /** Emits wind burst upon hitting enemy */
  WIND_BURST: org.bukkit.enchantments.Enchantment.WIND_BURST,

}

/**
 * Type for Enchantment keys - enables autocomplete.
 */
export type EnchantmentKey = keyof typeof Enchantment;