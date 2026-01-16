/**
 * DESIGN
 * ------
 * ThrowableProjectile represents projectiles that are physically thrown
 * and have a visible item representation.
 * 
 * INHERITANCE HIERARCHY:
 * 
 *   Entity
 *     └── Projectile
 *           └── ThrowableProjectile
 *                 ├── Egg
 *                 ├── Snowball
 *                 ├── EnderPearl
 *                 ├── ThrownExpBottle
 *                 ├── ThrownPotion
 *                 │     ├── SplashPotion
 *                 │     └── LingeringPotion
 *                 └── Trident
 * 
 * KEY CONCEPT - DISPLAY ITEM:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │   ThrowableProjectile has a DISPLAY ITEM                    │
 *   │                                                             │
 *   │   The item shown while the projectile is in flight.         │
 *   │                                                             │
 *   │   Example: Snowball shows a snowball item                   │
 *   │            Egg shows an egg item                            │
 *   │            Ender Pearl shows an ender pearl item            │
 *   │                                                             │
 *   │   You can CUSTOMIZE the display item:                       │
 *   │   - Change texture (via resource pack + custom model data)  │
 *   │   - The underlying behavior remains the same                │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * THROWABLE VS OTHER PROJECTILES:
 * 
 *   ThrowableProjectile           │ Other Projectiles
 *   ──────────────────────────────┼──────────────────────────────
 *   Has display ItemStack         │ No item representation
 *   Thrown by hand (usually)      │ Shot (arrows, fireballs)
 *   Short range                   │ Variable range
 *   Egg, Snowball, EnderPearl     │ Arrow, Fireball, ShulkerBullet
 * 
 * COMMON USE CASES:
 * 
 *   1. Custom throwable items (grenades, magic orbs)
 *   2. Visual customization of existing throwables
 *   3. Detecting what item was thrown
 *   4. Creating themed projectiles
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/ThrowableProjectile.html
 */

import { BukkitItemStack } from "../../items/types/itemstack";
import { BukkitProjectile } from "./projectile";

// ============================================
// INTERFACE
// ============================================

/**
 * A projectile that displays an item while in flight.
 * 
 * ThrowableProjectile extends Projectile with the ability to
 * have a visible item representation.
 * 
 * Implementations:
 * - Egg
 * - Snowball  
 * - EnderPearl
 * - ThrownExpBottle
 * - ThrownPotion (SplashPotion, LingeringPotion)
 * - Trident
 */
export interface BukkitThrowableProjectile extends BukkitProjectile {
    /**
     * Get the display item for this projectile.
     * 
     * This is the ItemStack shown while the projectile is in flight.
     * 
     * @returns The display ItemStack
     * 
     * @example
     * const item = snowball.getItem();
     * console.log(item.getType().name()); // "SNOWBALL"
     */
    getItem(): BukkitItemStack;

    /**
     * Set the display item for this projectile.
     * 
     * Changes the visual appearance while in flight.
     * Does NOT change the projectile's behavior.
     * 
     * @param item The ItemStack to display
     * 
     * @example
     * // Make snowball look like a diamond
     * const diamond = new ItemStack(Material.DIAMOND);
     * snowball.setItem(diamond);
     * 
     * @example
     * // Custom textured projectile
     * const customItem = new ItemStack(Material.SNOWBALL);
     * const meta = customItem.getItemMeta();
     * meta.setCustomModelData(1001);
     * customItem.setItemMeta(meta);
     * snowball.setItem(customItem);
     */
    setItem(item: BukkitItemStack): void;
}

// ============================================
// TYPE NAMES
// ============================================

/**
 * All throwable projectile entity type names.
 */
export type ThrowableProjectileTypeName =
    | "EGG"
    | "SNOWBALL"
    | "ENDER_PEARL"
    | "EXPERIENCE_BOTTLE"
    | "SPLASH_POTION"
    | "LINGERING_POTION"
    | "TRIDENT";

/**
 * Set of throwable projectile type names.
 */
export const THROWABLE_PROJECTILE_TYPES: Set<string> = new Set([
    "EGG",
    "SNOWBALL",
    "ENDER_PEARL",
    "EXPERIENCE_BOTTLE",
    "SPLASH_POTION",
    "LINGERING_POTION",
    "TRIDENT",
]);

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Check if projectile is a ThrowableProjectile.
 */
export function isThrowableProjectile(
    projectile: BukkitProjectile
): projectile is BukkitThrowableProjectile {
    return THROWABLE_PROJECTILE_TYPES.has(projectile.getType().name());
}

/**
 * Check if entity is an Egg.
 */
export function isEgg(projectile: BukkitProjectile): boolean {
    return projectile.getType().name() === "EGG";
}

/**
 * Check if entity is a Snowball.
 */
export function isSnowball(projectile: BukkitProjectile): boolean {
    return projectile.getType().name() === "SNOWBALL";
}

/**
 * Check if entity is an EnderPearl.
 */
export function isEnderPearl(projectile: BukkitProjectile): boolean {
    return projectile.getType().name() === "ENDER_PEARL";
}

/**
 * Check if entity is a ThrownExpBottle (experience bottle).
 */
export function isExpBottle(projectile: BukkitProjectile): boolean {
    return projectile.getType().name() === "EXPERIENCE_BOTTLE";
}

/**
 * Check if entity is any type of ThrownPotion.
 */
export function isThrownPotion(projectile: BukkitProjectile): boolean {
    const type = projectile.getType().name();
    return type === "SPLASH_POTION" || type === "LINGERING_POTION";
}

/**
 * Check if entity is a SplashPotion.
 */
export function isSplashPotion(projectile: BukkitProjectile): boolean {
    return projectile.getType().name() === "SPLASH_POTION";
}

/**
 * Check if entity is a LingeringPotion.
 */
export function isLingeringPotion(projectile: BukkitProjectile): boolean {
    return projectile.getType().name() === "LINGERING_POTION";
}

/**
 * Check if entity is a Trident.
 */
export function isTrident(projectile: BukkitProjectile): boolean {
    return projectile.getType().name() === "TRIDENT";
}

// ============================================
// ITEM UTILITIES
// ============================================

/**
 * Get the display item safely.
 * 
 * @returns ItemStack or null if not a throwable projectile
 */
export function getDisplayItem(projectile: BukkitProjectile): BukkitItemStack | null {
    if (!isThrowableProjectile(projectile)) {
        return null;
    }
    return projectile.getItem();
}

/**
 * Set the display item safely.
 * 
 * @returns true if successful, false if not a throwable projectile
 */
export function setDisplayItem(
    projectile: BukkitProjectile,
    item: BukkitItemStack
): boolean {
    if (!isThrowableProjectile(projectile)) {
        return false;
    }
    projectile.setItem(item);
    return true;
}

/**
 * Check if projectile has a custom display item.
 * 
 * Compares current item to expected default based on type.
 */
export function hasCustomDisplayItem(projectile: BukkitThrowableProjectile): boolean {
    const item = projectile.getItem();
    const type = projectile.getType().name();
    const itemType = item.getType().name();

    /* Check if item type matches expected default */
    const expectedItems: Record<string, string> = {
        "EGG": "EGG",
        "SNOWBALL": "SNOWBALL",
        "ENDER_PEARL": "ENDER_PEARL",
        "EXPERIENCE_BOTTLE": "EXPERIENCE_BOTTLE",
        "SPLASH_POTION": "SPLASH_POTION",
        "LINGERING_POTION": "LINGERING_POTION",
        "TRIDENT": "TRIDENT",
    };

    const expected = expectedItems[type];
    if (!expected) return false;

    /* If item type differs, it's custom */
    if (itemType !== expected) return true;

    /* Check for custom model data */
    if (item.hasItemMeta()) {
        const meta = item.getItemMeta();
        if (meta != null) {
            if (meta.hasCustomModelData()) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Get the item type name that would normally be displayed.
 */
export function getExpectedItemType(projectile: BukkitProjectile): string | null {
    const type = projectile.getType().name();

    const expectedItems: Record<string, string> = {
        "EGG": "EGG",
        "SNOWBALL": "SNOWBALL",
        "ENDER_PEARL": "ENDER_PEARL",
        "EXPERIENCE_BOTTLE": "EXPERIENCE_BOTTLE",
        "SPLASH_POTION": "SPLASH_POTION",
        "LINGERING_POTION": "LINGERING_POTION",
        "TRIDENT": "TRIDENT",
    };

    return expectedItems[type] ?? null;
}

// ============================================
// CATEGORIZATION
// ============================================

/**
 * Throwable projectiles that deal damage on impact.
 */
export const DAMAGING_THROWABLES: Set<ThrowableProjectileTypeName> = new Set([
    "EGG",
    "SNOWBALL",
    "TRIDENT",
]);

/**
 * Throwable projectiles with special effects.
 */
export const EFFECT_THROWABLES: Set<ThrowableProjectileTypeName> = new Set([
    "ENDER_PEARL",
    "EXPERIENCE_BOTTLE",
    "SPLASH_POTION",
    "LINGERING_POTION",
]);

/**
 * Potion-type throwables.
 */
export const POTION_THROWABLES: Set<ThrowableProjectileTypeName> = new Set([
    "SPLASH_POTION",
    "LINGERING_POTION",
]);

/**
 * Check if throwable deals damage.
 */
export function isDamagingThrowable(projectile: BukkitProjectile): boolean {
    return DAMAGING_THROWABLES.has(projectile.getType().name() as ThrowableProjectileTypeName);
}

/**
 * Check if throwable has special effect.
 */
export function isEffectThrowable(projectile: BukkitProjectile): boolean {
    return EFFECT_THROWABLES.has(projectile.getType().name() as ThrowableProjectileTypeName);
}

/**
 * Check if throwable is a potion type.
 */
export function isPotionThrowable(projectile: BukkitProjectile): boolean {
    return POTION_THROWABLES.has(projectile.getType().name() as ThrowableProjectileTypeName);
}

/**
 * Get throwable category.
 */
export function getThrowableCategory(projectile: BukkitProjectile):
    "damaging" | "effect" | "potion" | "other" | null {

    if (!isThrowableProjectile(projectile)) {
        return null;
    }

    const type = projectile.getType().name() as ThrowableProjectileTypeName;

    if (POTION_THROWABLES.has(type)) return "potion";
    if (EFFECT_THROWABLES.has(type)) return "effect";
    if (DAMAGING_THROWABLES.has(type)) return "damaging";

    return "other";
}

// ============================================
// BEHAVIOR INFO
// ============================================

/**
 * Information about throwable projectile behavior.
 */
export interface ThrowableBehavior {
    /** Does it deal damage on hit? */
    dealsDamage: boolean;
    /** Does it have a special effect? */
    hasEffect: boolean;
    /** Brief description of on-hit behavior */
    onHitBehavior: string;
    /** Can it be picked up after landing? */
    canPickUp: boolean;
}

/**
 * Behavior info for each throwable type.
 */
export const THROWABLE_BEHAVIORS: Record<ThrowableProjectileTypeName, ThrowableBehavior> = {
    EGG: {
        dealsDamage: true,
        hasEffect: true,
        onHitBehavior: "Small knockback, 1/8 chance to spawn chicken",
        canPickUp: false,
    },
    SNOWBALL: {
        dealsDamage: true,
        hasEffect: false,
        onHitBehavior: "Small knockback, extra damage to blazes",
        canPickUp: false,
    },
    ENDER_PEARL: {
        dealsDamage: false,
        hasEffect: true,
        onHitBehavior: "Teleports thrower to impact location, deals 5 damage to thrower",
        canPickUp: false,
    },
    EXPERIENCE_BOTTLE: {
        dealsDamage: false,
        hasEffect: true,
        onHitBehavior: "Releases 3-11 experience orbs",
        canPickUp: false,
    },
    SPLASH_POTION: {
        dealsDamage: false,
        hasEffect: true,
        onHitBehavior: "Applies potion effect to nearby entities",
        canPickUp: false,
    },
    LINGERING_POTION: {
        dealsDamage: false,
        hasEffect: true,
        onHitBehavior: "Creates area effect cloud with potion effect",
        canPickUp: false,
    },
    TRIDENT: {
        dealsDamage: true,
        hasEffect: true,
        onHitBehavior: "Deals 8 damage, may trigger Channeling/Riptide/Loyalty",
        canPickUp: true,
    },
};

/**
 * Get behavior info for a throwable projectile.
 */
export function getThrowableBehavior(projectile: BukkitProjectile): ThrowableBehavior | null {
    const type = projectile.getType().name() as ThrowableProjectileTypeName;
    return THROWABLE_BEHAVIORS[type] ?? null;
}

/**
 * Check if throwable can be picked up after landing.
 */
export function canPickUp(projectile: BukkitProjectile): boolean {
    const behavior = getThrowableBehavior(projectile);
    return behavior?.canPickUp ?? false;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Get human-readable description of throwable projectile.
 */
export function describeThrowableProjectile(projectile: BukkitThrowableProjectile): string {
    const type = projectile.getType().name();
    const item = projectile.getItem();
    const itemType = item.getType().name();
    const hasCustom = hasCustomDisplayItem(projectile);
    const shooter = projectile.getShooter();

    let desc = type.toLowerCase().replace(/_/g, " ");

    if (hasCustom) {
        desc += ` (displaying ${itemType.toLowerCase().replace(/_/g, " ")})`;
    }

    if (shooter !== null) {
        /* Try to get shooter type if it's an entity */
        if (typeof (shooter as any).getType === "function") {
            const shooterType = (shooter as any).getType().name().toLowerCase();
            desc += ` thrown by ${shooterType}`;
        } else {
            desc += " thrown by dispenser";
        }
    }

    return desc;
}

/**
 * Format throwable type name for display.
 */
export function formatThrowableTypeName(type: ThrowableProjectileTypeName): string {
    const names: Record<ThrowableProjectileTypeName, string> = {
        EGG: "Egg",
        SNOWBALL: "Snowball",
        ENDER_PEARL: "Ender Pearl",
        EXPERIENCE_BOTTLE: "Experience Bottle",
        SPLASH_POTION: "Splash Potion",
        LINGERING_POTION: "Lingering Potion",
        TRIDENT: "Trident",
    };

    return names[type] ?? type;
}