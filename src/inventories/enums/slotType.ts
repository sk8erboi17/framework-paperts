/**
 * DESIGN
 * ------
 * SlotType categorizes slots in inventory GUIs by their function.
 * 
 * Used primarily in InventoryClickEvent to determine WHAT kind
 * of slot the player clicked on.
 * 
 * SLOT TYPES VISUALIZED:
 * 
 *   CRAFTING TABLE:
 *   ┌─────────────────────────────────────┐
 *   │  [C] [C] [C]          [R]           │  C = CRAFTING (input)
 *   │  [C] [C] [C]     →    Result        │  R = RESULT (output)
 *   │  [C] [C] [C]                        │
 *   ├─────────────────────────────────────┤
 *   │  [■] [■] [■] [■] [■] [■] [■] [■] [■]│
 *   │  [■] [■] [■] [■] [■] [■] [■] [■] [■]│  ■ = CONTAINER
 *   │  [■] [■] [■] [■] [■] [■] [■] [■] [■]│
 *   │  ─────────────────────────────────  │
 *   │  [Q] [Q] [Q] [Q] [Q] [Q] [Q] [Q] [Q]│  Q = QUICKBAR
 *   └─────────────────────────────────────┘
 * 
 *   FURNACE:
 *   ┌─────────────────────────────────────┐
 *   │        [C]  Input                   │  C = CRAFTING (input)
 *   │         ↓                           │
 *   │        [F]  Fuel      →    [R]      │  F = FUEL
 *   │                            Result   │  R = RESULT
 *   └─────────────────────────────────────┘
 * 
 *   PLAYER INVENTORY:
 *   ┌─────────────────────────────────────┐
 *   │  [C] [C]     [R]    [A] Helmet      │  C = CRAFTING (2x2)
 *   │  [C] [C]  →  Result [A] Chest       │  A = ARMOR
 *   │                     [A] Legs        │  R = RESULT
 *   │                     [A] Boots       │
 *   ├─────────────────────────────────────┤
 *   │  [■] [■] [■] [■] [■] [■] [■] [■] [■]│  ■ = CONTAINER
 *   │  [■] [■] [■] [■] [■] [■] [■] [■] [■]│
 *   │  [■] [■] [■] [■] [■] [■] [■] [■] [■]│
 *   │  ─────────────────────────────────  │
 *   │  [Q] [Q] [Q] [Q] [Q] [Q] [Q] [Q] [Q]│  Q = QUICKBAR
 *   └─────────────────────────────────────┘
 * 
 *   OUTSIDE:
 *   Click outside any inventory window = OUTSIDE
 *   Used for dropping items on ground.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/inventory/InventoryType.SlotType.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf, enumNames, enumFromOrdinal, isEnumValue } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * All slot type constant names.
 */
export type SlotTypeKey =
  | "RESULT"
  | "CRAFTING"
  | "ARMOR"
  | "CONTAINER"
  | "QUICKBAR"
  | "OUTSIDE"
  | "FUEL";

/**
 * Type of slot in an inventory GUI.
 * 
 * Extends JavaEnum for full Java enum compatibility.
 */
export interface BukkitSlotType extends JavaEnum<SlotTypeKey> {}

/**
 * SlotType enum class type (constants + static methods).
 */
export type SlotTypeClass = Record<SlotTypeKey, BukkitSlotType> & JavaEnumClass<BukkitSlotType>;

// ============================================
// ENUM EXPORT
// ============================================

/**
 * Inventory slot types.
 * 
 * RESULT: Output slot for crafting/smelting results.
 *   Found in: Crafting table, player inventory, furnace, smithing table,
 *   stonecutter, loom, cartography table, grindstone.
 *   NOTE: Taking from result slot consumes ingredients.
 * 
 * CRAFTING: Input slot for crafting/processing.
 *   Found in: Crafting table (3x3), player inventory (2x2),
 *   furnace (top slot), anvil, enchanting table, brewing stand, smithing table.
 * 
 * ARMOR: Armor equipment slots.
 *   Found in: Player inventory (helmet, chestplate, leggings, boots, offhand).
 *   Only accepts appropriate armor/items.
 * 
 * CONTAINER: Generic storage slot.
 *   The "default" slot type for: chest, player main inventory,
 *   hopper, dispenser, dropper, shulker box, and any other generic storage.
 * 
 * QUICKBAR: Hotbar slots (bottom row of player inventory).
 *   Slots 0-8, accessible via number keys 1-9.
 * 
 * OUTSIDE: Click outside the inventory window.
 *   Not a real slot - represents clicking in the void.
 *   Used for dropping items. Raw slot ID is typically -999.
 * 
 * FUEL: Fuel slot for furnaces, or ingredient slot for brewing.
 *   Found in: Furnace, blast furnace, smoker (fuel like coal),
 *   brewing stand (blaze powder slot).
 * 
 * @example
 * // In InventoryClickEvent handler
 * const slotType = event.getSlotType();
 * 
 * if (slotType === SlotType.RESULT) {
 *   // Player clicked crafting/furnace result
 * } else if (slotType === SlotType.ARMOR) {
 *   // Player clicked armor slot
 * }
 */
export const SlotType: SlotTypeClass = org.bukkit.event.inventory.InventoryType.SlotType;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all slot type values.
 * 
 * @example
 * for (const type of getSlotTypeValues()) {
 *   console.log(type.name());
 * }
 */
export function getSlotTypeValues(): BukkitSlotType[] {
  return enumValues(SlotType);
}

/**
 * Get SlotType by exact name.
 * 
 * @throws IllegalArgumentException if name doesn't match
 * 
 * @example
 * const result = getSlotTypeByName("RESULT");
 */
export function getSlotTypeByName(name: string): BukkitSlotType {
  return enumValueOf(SlotType, name);
}

/**
 * Get SlotType by name (safe version).
 * 
 * @returns SlotType or null if not found
 * 
 * @example
 * const type = getSlotTypeSafe(userInput);
 * if (type !== null) {
 *   // Valid slot type
 * }
 */
export function getSlotTypeSafe(name: string): BukkitSlotType | null {
  return isEnumValue(SlotType, name) ? enumValueOf(SlotType, name) : null;
}

/**
 * Get all slot type names.
 * 
 * @example
 * const names = getSlotTypeNames();
 * // ["RESULT", "CRAFTING", "ARMOR", "CONTAINER", "QUICKBAR", "OUTSIDE", "FUEL"]
 */
export function getSlotTypeNames(): SlotTypeKey[] {
  return enumNames(SlotType) as SlotTypeKey[];
}

/**
 * Get SlotType by ordinal.
 * 
 * @returns SlotType or null if ordinal out of range
 */
export function getSlotTypeByOrdinal(ordinal: number): BukkitSlotType | null {
  return enumFromOrdinal(SlotType, ordinal);
}

/**
 * Check if string is a valid SlotType name.
 * 
 * @example
 * if (isValidSlotType("ARMOR")) {
 *   // It's valid
 * }
 */
export function isValidSlotType(name: string): name is SlotTypeKey {
  return isEnumValue(SlotType, name);
}

// ============================================
// SLOT TYPE CHECKS
// ============================================

/**
 * Check if slot type is RESULT.
 */
export function isResultSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "RESULT";
}

/**
 * Check if slot type is CRAFTING (input).
 */
export function isCraftingSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "CRAFTING";
}

/**
 * Check if slot type is ARMOR.
 */
export function isArmorSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "ARMOR";
}

/**
 * Check if slot type is CONTAINER.
 */
export function isContainerSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "CONTAINER";
}

/**
 * Check if slot type is QUICKBAR (hotbar).
 */
export function isQuickbarSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "QUICKBAR";
}

/**
 * Check if slot type is OUTSIDE.
 */
export function isOutsideSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "OUTSIDE";
}

/**
 * Check if slot type is FUEL.
 */
export function isFuelSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "FUEL";
}

// ============================================
// CATEGORIZATION
// ============================================

/**
 * Check if slot is a "real" slot (not OUTSIDE).
 */
export function isRealSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() !== "OUTSIDE";
}

/**
 * Check if slot is in player's personal inventory area.
 * 
 * Includes: CONTAINER, QUICKBAR, ARMOR (in player inventory view)
 */
export function isPlayerInventorySlot(slotType: BukkitSlotType): boolean {
  const name = slotType.name();
  return name === "CONTAINER" || name === "QUICKBAR" || name === "ARMOR";
}

/**
 * Check if slot is related to crafting/processing.
 * 
 * Includes: CRAFTING, RESULT, FUEL
 */
export function isProcessingSlot(slotType: BukkitSlotType): boolean {
  const name = slotType.name();
  return name === "CRAFTING" || name === "RESULT" || name === "FUEL";
}

/**
 * Check if slot is an input slot (CRAFTING or FUEL).
 */
export function isInputSlot(slotType: BukkitSlotType): boolean {
  const name = slotType.name();
  return name === "CRAFTING" || name === "FUEL";
}

/**
 * Check if slot is an output slot (RESULT only).
 */
export function isOutputSlot(slotType: BukkitSlotType): boolean {
  return slotType.name() === "RESULT";
}

/**
 * Check if slot type accepts any item (generic storage).
 */
export function acceptsAnyItem(slotType: BukkitSlotType): boolean {
  const name = slotType.name();
  return name === "CONTAINER" || name === "QUICKBAR";
}

/**
 * Check if slot has item restrictions.
 * 
 * ARMOR and FUEL slots only accept specific items.
 */
export function hasItemRestrictions(slotType: BukkitSlotType): boolean {
  const name = slotType.name();
  return name === "ARMOR" || name === "FUEL";
}

/**
 * Check if clicking this slot can trigger crafting.
 */
export function canTriggerCrafting(slotType: BukkitSlotType): boolean {
  return slotType.name() === "RESULT";
}

/**
 * Get slot category.
 */
export function getSlotCategory(slotType: BukkitSlotType): 
  "storage" | "equipment" | "crafting" | "output" | "fuel" | "outside" {
  
  switch (slotType.name()) {
    case "CONTAINER":
    case "QUICKBAR":
      return "storage";
    case "ARMOR":
      return "equipment";
    case "CRAFTING":
      return "crafting";
    case "RESULT":
      return "output";
    case "FUEL":
      return "fuel";
    case "OUTSIDE":
      return "outside";
    default:
      return "storage";
  }
}

// ============================================
// POSITION HINTS
// ============================================

/**
 * Check if slot type is typically in top inventory (crafting UI).
 */
export function isTypicallyInTopInventory(slotType: BukkitSlotType): boolean {
  const name = slotType.name();
  return name === "CRAFTING" || name === "RESULT" || name === "FUEL";
}

/**
 * Check if slot type is typically in bottom inventory (player inv).
 */
export function isTypicallyInBottomInventory(slotType: BukkitSlotType): boolean {
  const name = slotType.name();
  return name === "CONTAINER" || name === "QUICKBAR" || name === "ARMOR";
}

// ============================================
// UTILITIES
// ============================================

/**
 * Get human-readable description of slot type.
 */
export function describeSlotType(slotType: BukkitSlotType): string {
  switch (slotType.name()) {
    case "RESULT":
      return "result/output slot";
    case "CRAFTING":
      return "crafting/input slot";
    case "ARMOR":
      return "armor slot";
    case "CONTAINER":
      return "storage slot";
    case "QUICKBAR":
      return "hotbar slot";
    case "OUTSIDE":
      return "outside inventory";
    case "FUEL":
      return "fuel slot";
    default:
      return "unknown slot";
  }
}

/**
 * Get slot type priority for sorting.
 * 
 * Lower = more "special", higher = more "generic".
 */
export function getSlotPriority(slotType: BukkitSlotType): number {
  switch (slotType.name()) {
    case "OUTSIDE":
      return 0;
    case "RESULT":
      return 1;
    case "CRAFTING":
      return 2;
    case "FUEL":
      return 3;
    case "ARMOR":
      return 4;
    case "QUICKBAR":
      return 5;
    case "CONTAINER":
      return 6;
    default:
      return 99;
  }
}

/**
 * Compare two slot types by priority.
 */
export function compareSlotTypes(a: BukkitSlotType, b: BukkitSlotType): number {
  return getSlotPriority(a) - getSlotPriority(b);
}

/**
 * Check if two slot types are the same.
 */
export function sameSlotType(a: BukkitSlotType, b: BukkitSlotType): boolean {
  return a.name() === b.name();
}

/**
 * Compare slot types using Java's compareTo.
 */
export function compareSlotTypesNative(a: BukkitSlotType, b: BukkitSlotType): number {
  return a.compareTo(b);
}