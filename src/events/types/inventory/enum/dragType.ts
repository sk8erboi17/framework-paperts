// inventory/enums/dragType.ts

import { JavaEnum, JavaEnumClass } from "../../../../java/types/enum";


/**
 * DragType - Represents the effect of a drag applied to an Inventory.
 * 
 * When a player holds click and drags across inventory slots,
 * items are distributed according to the drag type:
 * 
 * SINGLE (Right-click drag):
 * - Places exactly 1 item in each slot
 * - Continues until cursor is empty or drag ends
 * - Example: 64 items dragged over 10 slots = 1 each, 54 remain on cursor
 * 
 * EVEN (Left-click drag):
 * - Splits cursor evenly across all dragged slots
 * - Respects Material.getMaxStackSize()
 * - Remainder stays on cursor
 * - Example: 64 items over 4 slots = 16 each, 0 remain
 * - Example: 10 items over 4 slots = 2 each, 2 remain
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/DragType.html
 */
export type DragTypeKey =
  | "SINGLE"
  | "EVEN";

export interface BukkitDragType extends JavaEnum<DragTypeKey> {}

interface DragTypeClass extends
  Omit<Record<DragTypeKey, BukkitDragType>, keyof JavaEnumClass<BukkitDragType>>,
  JavaEnumClass<BukkitDragType> {}

export const DragType: DragTypeClass = {
  /**
   * One item from the cursor is placed in each selected slot.
   * 
   * Triggered by: Right-click drag
   * 
   * Behavior:
   * - Each slot receives exactly 1 item
   * - Drag stops when cursor is empty
   * 
   * Example:
   * - 64 cobblestone dragged over 10 slots
   * - Result: 10 slots with 1 each, 54 remain on cursor
   */
  SINGLE: org.bukkit.event.inventory.DragType.SINGLE,

  /**
   * The cursor is split evenly across all selected slots.
   * 
   * Triggered by: Left-click drag
   * 
   * Behavior:
   * - Items distributed as evenly as possible
   * - Cannot exceed Material.getMaxStackSize()
   * - Remainder goes back to cursor
   * 
   * Examples:
   * - 64 items over 4 slots = 16 each, 0 remain
   * - 10 items over 4 slots = 2 each, 2 remain
   * - 64 items over 100 slots = 0 each (can't split 64 into 100)
   */
  EVEN: org.bukkit.event.inventory.DragType.EVEN,

  values(): BukkitDragType[] {
    return org.bukkit.event.inventory.DragType.values();
  },
  valueOf(name: string): BukkitDragType {
    return org.bukkit.event.inventory.DragType.valueOf(name);
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if drag type is SINGLE (right-click drag).
 */
export function isSingleDrag(type: BukkitDragType): boolean {
  return type === DragType.SINGLE;
}

/**
 * Check if drag type is EVEN (left-click drag).
 */
export function isEvenDrag(type: BukkitDragType): boolean {
  return type === DragType.EVEN;
}

/**
 * Get the mouse button used for this drag type.
 */
export function getDragButton(type: BukkitDragType): "left" | "right" {
  return type === DragType.EVEN ? "left" : "right";
}

/**
 * Get human-readable description of drag type.
 */
export function describeDragType(type: BukkitDragType): string {
  switch (type) {
    case DragType.SINGLE:
      return "Right-click drag (1 item per slot)";
    case DragType.EVEN:
      return "Left-click drag (even distribution)";
    default:
      return type.name();
  }
}

/**
 * Calculate how items would be distributed for a given drag type.
 * 
 * @param type The drag type
 * @param cursorAmount Number of items on cursor
 * @param slotCount Number of slots being dragged over
 * @param maxStackSize Maximum stack size for the item
 * @returns Object with itemsPerSlot and remainder
 */
export function calculateDistribution(
  type: BukkitDragType,
  cursorAmount: number,
  slotCount: number,
  maxStackSize: number = 64
): { itemsPerSlot: number; remainder: number; totalDistributed: number } {
  
  if (slotCount <= 0 || cursorAmount <= 0) {
    return { itemsPerSlot: 0, remainder: cursorAmount, totalDistributed: 0 };
  }
  
  if (type === DragType.SINGLE) {
    /* Right-click: 1 item per slot */
    const slotsToFill = Math.min(cursorAmount, slotCount);
    return {
      itemsPerSlot: 1,
      remainder: cursorAmount - slotsToFill,
      totalDistributed: slotsToFill
    };
  } else {
    /* Left-click: Even distribution */
    const itemsPerSlot = Math.min(
      Math.floor(cursorAmount / slotCount),
      maxStackSize
    );
    const totalDistributed = itemsPerSlot * slotCount;
    
    return {
      itemsPerSlot,
      remainder: cursorAmount - totalDistributed,
      totalDistributed
    };
  }
}