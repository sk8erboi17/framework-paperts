import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type PistonMoveReactionKey = "BLOCK" | "BREAK" | "IGNORE" | "MOVE" | "PUSH_ONLY";

// ============================================
// INTERFACE
// ============================================

export interface BukkitPistonMoveReaction extends JavaEnum<PistonMoveReactionKey> {
  /**
   * @returns The protocol ID
   * @deprecated Magic value
   */
  getId(): number;
}

// ============================================
// PISTON MOVE REACTION CLASS INTERFACE
// ============================================

interface PistonMoveReactionClass extends
  Omit<Record<PistonMoveReactionKey, BukkitPistonMoveReaction>, keyof JavaEnumClass<BukkitPistonMoveReaction>>,
  JavaEnumClass<BukkitPistonMoveReaction> {
}

// ============================================
// PISTON MOVE REACTIONS
// ============================================

/**
 * How a block or entity reacts to pistons.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/block/PistonMoveReaction.html
 */
export const PistonMoveReaction: PistonMoveReactionClass = {
  /** Resists push/pull. Obsidian, bedrock, that kind of stuff. */
  BLOCK: org.bukkit.block.PistonMoveReaction.BLOCK,

  /** Breaks when pushed. Torches, flowers, fragile things. */
  BREAK: org.bukkit.block.PistonMoveReaction.BREAK,

  /** Ignores pistons entirely. */
  IGNORE: org.bukkit.block.PistonMoveReaction.IGNORE,

  /** Normal behavior. Push and pull work fine. */
  MOVE: org.bukkit.block.PistonMoveReaction.MOVE,

  /** Push ok, pull no. Glazed terracotta does this. */
  PUSH_ONLY: org.bukkit.block.PistonMoveReaction.PUSH_ONLY,

  values(): BukkitPistonMoveReaction[] {
    return org.bukkit.block.PistonMoveReaction.values();
  },

  valueOf(name: string): BukkitPistonMoveReaction {
    return org.bukkit.block.PistonMoveReaction.valueOf(name);
  },
};