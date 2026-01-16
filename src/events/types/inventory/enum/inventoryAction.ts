// inventory/enums/inventoryAction.ts

import { JavaEnum, JavaEnumClass } from "../../../../java/types/enum";


/**
 * InventoryAction - An estimation of what the result will be from an inventory click.
 * 
 * CATEGORIES:
 * 
 * PICKUP actions (items from slot to cursor):
 * - PICKUP_ALL: All items from slot to cursor
 * - PICKUP_SOME: Some items from slot to cursor
 * - PICKUP_HALF: Half items from slot to cursor
 * - PICKUP_ONE: One item from slot to cursor
 * 
 * PLACE actions (items from cursor to slot):
 * - PLACE_ALL: All cursor items to slot
 * - PLACE_SOME: Some cursor items to slot (up to max stack)
 * - PLACE_ONE: One cursor item to slot
 * 
 * DROP actions:
 * - DROP_ALL_CURSOR: Drop entire cursor stack
 * - DROP_ONE_CURSOR: Drop one item from cursor
 * - DROP_ALL_SLOT: Drop entire slot stack
 * - DROP_ONE_SLOT: Drop one item from slot
 * 
 * MOVE actions:
 * - MOVE_TO_OTHER_INVENTORY: Shift-click to other inventory
 * - HOTBAR_SWAP: Swap slot with hotbar key
 * - HOTBAR_MOVE_AND_READD: Move to hotbar, readd displaced item
 * - SWAP_WITH_CURSOR: Exchange slot and cursor
 * 
 * OTHER:
 * - CLONE_STACK: Creative middle-click (max stack to cursor)
 * - COLLECT_TO_CURSOR: Double-click collect same material
 * - NOTHING: No action will occur
 * - UNKNOWN: Unrecognized click type
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/InventoryAction.html
 */
export type InventoryActionKey =
  /* Pickup - slot to cursor */
  | "PICKUP_ALL"
  | "PICKUP_SOME"
  | "PICKUP_HALF"
  | "PICKUP_ONE"
  /* Place - cursor to slot */
  | "PLACE_ALL"
  | "PLACE_SOME"
  | "PLACE_ONE"
  /* Drop */
  | "DROP_ALL_CURSOR"
  | "DROP_ONE_CURSOR"
  | "DROP_ALL_SLOT"
  | "DROP_ONE_SLOT"
  /* Move/Swap */
  | "MOVE_TO_OTHER_INVENTORY"
  | "HOTBAR_SWAP"
  | "HOTBAR_MOVE_AND_READD"
  | "SWAP_WITH_CURSOR"
  /* Other */
  | "CLONE_STACK"
  | "COLLECT_TO_CURSOR"
  | "NOTHING"
  | "UNKNOWN";

export interface BukkitInventoryAction extends JavaEnum<InventoryActionKey> {}

interface InventoryActionClass extends
  Omit<Record<InventoryActionKey, BukkitInventoryAction>, keyof JavaEnumClass<BukkitInventoryAction>>,
  JavaEnumClass<BukkitInventoryAction> {}

export const InventoryAction: InventoryActionClass = {
  /* Pickup - slot to cursor */
  
  /** All items on clicked slot move to cursor */
  PICKUP_ALL: org.bukkit.event.inventory.InventoryAction.PICKUP_ALL,
  
  /** Some items on clicked slot move to cursor */
  PICKUP_SOME: org.bukkit.event.inventory.InventoryAction.PICKUP_SOME,
  
  /** Half of items on clicked slot move to cursor */
  PICKUP_HALF: org.bukkit.event.inventory.InventoryAction.PICKUP_HALF,
  
  /** One item from clicked slot moves to cursor */
  PICKUP_ONE: org.bukkit.event.inventory.InventoryAction.PICKUP_ONE,

  /* Place - cursor to slot */
  
  /** All cursor items move to clicked slot */
  PLACE_ALL: org.bukkit.event.inventory.InventoryAction.PLACE_ALL,
  
  /** Some cursor items move to clicked slot (up to max stack) */
  PLACE_SOME: org.bukkit.event.inventory.InventoryAction.PLACE_SOME,
  
  /** One cursor item moves to clicked slot */
  PLACE_ONE: org.bukkit.event.inventory.InventoryAction.PLACE_ONE,

  /* Drop */
  
  /** Entire cursor item is dropped */
  DROP_ALL_CURSOR: org.bukkit.event.inventory.InventoryAction.DROP_ALL_CURSOR,
  
  /** One item dropped from cursor */
  DROP_ONE_CURSOR: org.bukkit.event.inventory.InventoryAction.DROP_ONE_CURSOR,
  
  /** Entire clicked slot is dropped */
  DROP_ALL_SLOT: org.bukkit.event.inventory.InventoryAction.DROP_ALL_SLOT,
  
  /** One item dropped from clicked slot */
  DROP_ONE_SLOT: org.bukkit.event.inventory.InventoryAction.DROP_ONE_SLOT,

  /* Move/Swap */
  
  /** Item moved to opposite inventory (shift-click) */
  MOVE_TO_OTHER_INVENTORY: org.bukkit.event.inventory.InventoryAction.MOVE_TO_OTHER_INVENTORY,
  
  /** Clicked slot and hotbar slot are swapped */
  HOTBAR_SWAP: org.bukkit.event.inventory.InventoryAction.HOTBAR_SWAP,
  
  /** Clicked item moved to hotbar, displaced item re-added to inventory */
  HOTBAR_MOVE_AND_READD: org.bukkit.event.inventory.InventoryAction.HOTBAR_MOVE_AND_READD,
  
  /** Clicked item and cursor are exchanged */
  SWAP_WITH_CURSOR: org.bukkit.event.inventory.InventoryAction.SWAP_WITH_CURSOR,

  /* Other */
  
  /** Max-size stack of clicked item put on cursor (creative middle-click) */
  CLONE_STACK: org.bukkit.event.inventory.InventoryAction.CLONE_STACK,
  
  /** Inventory searched for same material, collected to cursor (double-click) */
  COLLECT_TO_CURSOR: org.bukkit.event.inventory.InventoryAction.COLLECT_TO_CURSOR,
  
  /** Nothing will happen from the click */
  NOTHING: org.bukkit.event.inventory.InventoryAction.NOTHING,
  
  /** Unrecognized click type */
  UNKNOWN: org.bukkit.event.inventory.InventoryAction.UNKNOWN,

  values(): BukkitInventoryAction[] {
    return org.bukkit.event.inventory.InventoryAction.values();
  },
  valueOf(name: string): BukkitInventoryAction {
    return org.bukkit.event.inventory.InventoryAction.valueOf(name);
  },
};

// ============================================
// HELPER SETS FOR CATEGORIZATION
// ============================================

/**
 * All pickup actions (items from slot to cursor)
 */
export const PICKUP_ACTIONS: Set<InventoryActionKey> = new Set([
  "PICKUP_ALL",
  "PICKUP_SOME",
  "PICKUP_HALF",
  "PICKUP_ONE",
]);

/**
 * All place actions (items from cursor to slot)
 */
export const PLACE_ACTIONS: Set<InventoryActionKey> = new Set([
  "PLACE_ALL",
  "PLACE_SOME",
  "PLACE_ONE",
]);

/**
 * All drop actions
 */
export const DROP_ACTIONS: Set<InventoryActionKey> = new Set([
  "DROP_ALL_CURSOR",
  "DROP_ONE_CURSOR",
  "DROP_ALL_SLOT",
  "DROP_ONE_SLOT",
]);

/**
 * All move/swap actions
 */
export const MOVE_ACTIONS: Set<InventoryActionKey> = new Set([
  "MOVE_TO_OTHER_INVENTORY",
  "HOTBAR_SWAP",
  "HOTBAR_MOVE_AND_READD",
  "SWAP_WITH_CURSOR",
]);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if action is a pickup action
 */
export function isPickupAction(action: BukkitInventoryAction): boolean {
  return PICKUP_ACTIONS.has(action.name() as InventoryActionKey);
}

/**
 * Check if action is a place action
 */
export function isPlaceAction(action: BukkitInventoryAction): boolean {
  return PLACE_ACTIONS.has(action.name() as InventoryActionKey);
}

/**
 * Check if action is a drop action
 */
export function isDropAction(action: BukkitInventoryAction): boolean {
  return DROP_ACTIONS.has(action.name() as InventoryActionKey);
}

/**
 * Check if action is a move/swap action
 */
export function isMoveAction(action: BukkitInventoryAction): boolean {
  return MOVE_ACTIONS.has(action.name() as InventoryActionKey);
}

/**
 * Check if action removes items from a slot
 */
export function removesFromSlot(action: BukkitInventoryAction): boolean {
  const name = action.name() as InventoryActionKey;
  return PICKUP_ACTIONS.has(name) ||
         name === "DROP_ALL_SLOT" ||
         name === "DROP_ONE_SLOT" ||
         name === "MOVE_TO_OTHER_INVENTORY" ||
         name === "HOTBAR_SWAP" ||
         name === "HOTBAR_MOVE_AND_READD" ||
         name === "SWAP_WITH_CURSOR";
}

/**
 * Check if action adds items to a slot
 */
export function addsToSlot(action: BukkitInventoryAction): boolean {
  const name = action.name() as InventoryActionKey;
  return PLACE_ACTIONS.has(name) ||
         name === "HOTBAR_SWAP" ||
         name === "SWAP_WITH_CURSOR";
}

/**
 * Check if action involves the cursor
 */
export function involvesCursor(action: BukkitInventoryAction): boolean {
  const name = action.name() as InventoryActionKey;
  return PICKUP_ACTIONS.has(name) ||
         PLACE_ACTIONS.has(name) ||
         name === "DROP_ALL_CURSOR" ||
         name === "DROP_ONE_CURSOR" ||
         name === "SWAP_WITH_CURSOR" ||
         name === "CLONE_STACK" ||
         name === "COLLECT_TO_CURSOR";
}

/**
 * Check if action is a creative-only action
 */
export function isCreativeAction(action: BukkitInventoryAction): boolean {
  return action === InventoryAction.CLONE_STACK;
}

/**
 * Get action category
 */
export function getActionCategory(action: BukkitInventoryAction): 
  "pickup" | "place" | "drop" | "move" | "other" {
  
  const name = action.name() as InventoryActionKey;
  
  if (PICKUP_ACTIONS.has(name)) return "pickup";
  if (PLACE_ACTIONS.has(name)) return "place";
  if (DROP_ACTIONS.has(name)) return "drop";
  if (MOVE_ACTIONS.has(name)) return "move";
  return "other";
}