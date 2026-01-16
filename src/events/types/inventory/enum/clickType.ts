// inventory/enums/clickType.ts

import { JavaEnum, JavaEnumClass } from "../../../../java/types/enum";


/**
 * ClickType - What the client did to trigger an inventory action.
 * 
 * This represents the INPUT (what the player did), not the RESULT.
 * For the result, see InventoryAction.
 * 
 * CATEGORIES:
 * 
 * Mouse clicks:
 * - LEFT, RIGHT, MIDDLE
 * - SHIFT_LEFT, SHIFT_RIGHT
 * - DOUBLE_CLICK
 * - WINDOW_BORDER_LEFT, WINDOW_BORDER_RIGHT
 * 
 * Keyboard:
 * - NUMBER_KEY (1-9 hotbar keys)
 * - DROP (Q key)
 * - CONTROL_DROP (Ctrl+Q)
 * - SWAP_OFFHAND (F key)
 * 
 * Special:
 * - CREATIVE (creative inventory action)
 * - UNKNOWN (unrecognized)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/ClickType.html
 */
export type ClickTypeKey =
  /* Mouse - basic */
  | "LEFT"
  | "RIGHT"
  | "MIDDLE"
  /* Mouse - with shift */
  | "SHIFT_LEFT"
  | "SHIFT_RIGHT"
  /* Mouse - special */
  | "DOUBLE_CLICK"
  | "WINDOW_BORDER_LEFT"
  | "WINDOW_BORDER_RIGHT"
  /* Keyboard */
  | "NUMBER_KEY"
  | "DROP"
  | "CONTROL_DROP"
  | "SWAP_OFFHAND"
  /* Special */
  | "CREATIVE"
  | "UNKNOWN";

export interface BukkitClickType extends JavaEnum<ClickTypeKey> {
  /**
   * Check if this represents a left click.
   */
  isLeftClick(): boolean;

  /**
   * Check if this represents a right click.
   */
  isRightClick(): boolean;

  /**
   * Check if shift was held during the click.
   */
  isShiftClick(): boolean;

  /**
   * Check if this is a keyboard action (not mouse).
   */
  isKeyboardClick(): boolean;

  /**
   * Check if this is a mouse action.
   */
  isMouseClick(): boolean;

  /**
   * Check if this requires creative mode.
   */
  isCreativeAction(): boolean;
}

interface ClickTypeClass extends
  Omit<Record<ClickTypeKey, BukkitClickType>, keyof JavaEnumClass<BukkitClickType>>,
  JavaEnumClass<BukkitClickType> {}

export const ClickType: ClickTypeClass = {
  /* Mouse - basic */
  
  /** Left (primary) mouse button */
  LEFT: org.bukkit.event.inventory.ClickType.LEFT,
  
  /** Right mouse button */
  RIGHT: org.bukkit.event.inventory.ClickType.RIGHT,
  
  /** Middle mouse button (scrollwheel click) */
  MIDDLE: org.bukkit.event.inventory.ClickType.MIDDLE,

  /* Mouse - with shift */
  
  /** Shift + left click */
  SHIFT_LEFT: org.bukkit.event.inventory.ClickType.SHIFT_LEFT,
  
  /** Shift + right click */
  SHIFT_RIGHT: org.bukkit.event.inventory.ClickType.SHIFT_RIGHT,

  /* Mouse - special */
  
  /** Left click twice quickly (double-click) */
  DOUBLE_CLICK: org.bukkit.event.inventory.ClickType.DOUBLE_CLICK,
  
  /** Left click on grey area outside inventory */
  WINDOW_BORDER_LEFT: org.bukkit.event.inventory.ClickType.WINDOW_BORDER_LEFT,
  
  /** Right click on grey area outside inventory */
  WINDOW_BORDER_RIGHT: org.bukkit.event.inventory.ClickType.WINDOW_BORDER_RIGHT,

  /* Keyboard */
  
  /** Number keys 1-9 (hotbar slots) */
  NUMBER_KEY: org.bukkit.event.inventory.ClickType.NUMBER_KEY,
  
  /** Drop key (default: Q) */
  DROP: org.bukkit.event.inventory.ClickType.DROP,
  
  /** Ctrl + Drop key (drop entire stack) */
  CONTROL_DROP: org.bukkit.event.inventory.ClickType.CONTROL_DROP,
  
  /** Swap offhand key (default: F) */
  SWAP_OFFHAND: org.bukkit.event.inventory.ClickType.SWAP_OFFHAND,

  /* Special */
  
  /** Any action in creative inventory */
  CREATIVE: org.bukkit.event.inventory.ClickType.CREATIVE,
  
  /** Unrecognized click type (transitional, don't rely on this) */
  UNKNOWN: org.bukkit.event.inventory.ClickType.UNKNOWN,

  values(): BukkitClickType[] {
    return org.bukkit.event.inventory.ClickType.values();
  },
  valueOf(name: string): BukkitClickType {
    return org.bukkit.event.inventory.ClickType.valueOf(name);
  },
};

// ============================================
// HELPER SETS FOR CATEGORIZATION
// ============================================

/**
 * All left click types
 */
export const LEFT_CLICKS: Set<ClickTypeKey> = new Set([
  "LEFT",
  "SHIFT_LEFT",
  "DOUBLE_CLICK",
  "WINDOW_BORDER_LEFT",
]);

/**
 * All right click types
 */
export const RIGHT_CLICKS: Set<ClickTypeKey> = new Set([
  "RIGHT",
  "SHIFT_RIGHT",
  "WINDOW_BORDER_RIGHT",
]);

/**
 * All shift click types
 */
export const SHIFT_CLICKS: Set<ClickTypeKey> = new Set([
  "SHIFT_LEFT",
  "SHIFT_RIGHT",
]);

/**
 * All keyboard click types
 */
export const KEYBOARD_CLICKS: Set<ClickTypeKey> = new Set([
  "NUMBER_KEY",
  "DROP",
  "CONTROL_DROP",
  "SWAP_OFFHAND",
]);

/**
 * All mouse click types
 */
export const MOUSE_CLICKS: Set<ClickTypeKey> = new Set([
  "LEFT",
  "RIGHT",
  "MIDDLE",
  "SHIFT_LEFT",
  "SHIFT_RIGHT",
  "DOUBLE_CLICK",
  "WINDOW_BORDER_LEFT",
  "WINDOW_BORDER_RIGHT",
]);

/**
 * All drop-related click types
 */
export const DROP_CLICKS: Set<ClickTypeKey> = new Set([
  "DROP",
  "CONTROL_DROP",
  "WINDOW_BORDER_LEFT",
  "WINDOW_BORDER_RIGHT",
]);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if click type is a left click
 */
export function isLeftClick(click: BukkitClickType): boolean {
  return click.isLeftClick();
}

/**
 * Check if click type is a right click
 */
export function isRightClick(click: BukkitClickType): boolean {
  return click.isRightClick();
}

/**
 * Check if click type involves shift
 */
export function isShiftClick(click: BukkitClickType): boolean {
  return click.isShiftClick();
}

/**
 * Check if click type is a keyboard action
 */
export function isKeyboardClick(click: BukkitClickType): boolean {
  return click.isKeyboardClick();
}

/**
 * Check if click type is a mouse action
 */
export function isMouseClick(click: BukkitClickType): boolean {
  return click.isMouseClick();
}

/**
 * Check if click type requires creative mode
 */
export function isCreativeAction(click: BukkitClickType): boolean {
  return click.isCreativeAction();
}

/**
 * Check if click type is a drop action
 */
export function isDropClick(click: BukkitClickType): boolean {
  return DROP_CLICKS.has(click.name() as ClickTypeKey);
}

/**
 * Check if click type is outside the inventory window
 */
export function isWindowBorderClick(click: BukkitClickType): boolean {
  return click === ClickType.WINDOW_BORDER_LEFT ||
         click === ClickType.WINDOW_BORDER_RIGHT;
}

/**
 * Check if click type is a hotbar key
 */
export function isHotbarClick(click: BukkitClickType): boolean {
  return click === ClickType.NUMBER_KEY;
}

/**
 * Check if click type is offhand swap
 */
export function isOffhandSwap(click: BukkitClickType): boolean {
  return click === ClickType.SWAP_OFFHAND;
}

/**
 * Get click category
 */
export function getClickCategory(click: BukkitClickType): 
  "left" | "right" | "middle" | "keyboard" | "special" {
  
  if (click.isLeftClick()) return "left";
  if (click.isRightClick()) return "right";
  if (click === ClickType.MIDDLE) return "middle";
  if (click.isKeyboardClick()) return "keyboard";
  return "special";
}

/**
 * Get human-readable description of click type
 */
export function describeClick(click: BukkitClickType): string {
  switch (click) {
    case ClickType.LEFT: return "Left click";
    case ClickType.RIGHT: return "Right click";
    case ClickType.MIDDLE: return "Middle click";
    case ClickType.SHIFT_LEFT: return "Shift + Left click";
    case ClickType.SHIFT_RIGHT: return "Shift + Right click";
    case ClickType.DOUBLE_CLICK: return "Double click";
    case ClickType.WINDOW_BORDER_LEFT: return "Left click outside";
    case ClickType.WINDOW_BORDER_RIGHT: return "Right click outside";
    case ClickType.NUMBER_KEY: return "Number key (1-9)";
    case ClickType.DROP: return "Drop key (Q)";
    case ClickType.CONTROL_DROP: return "Ctrl + Drop (Ctrl+Q)";
    case ClickType.SWAP_OFFHAND: return "Offhand swap (F)";
    case ClickType.CREATIVE: return "Creative action";
    case ClickType.UNKNOWN: return "Unknown";
    default: return click.name();
  }
}