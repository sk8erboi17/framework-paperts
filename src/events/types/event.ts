/**
 * Represents an event.
 * 
 * Base class for all Bukkit events. All events require a static method
 * named getHandlerList() which returns the same HandlerList as getHandlers().
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/Event.html
 */

import { BukkitHandlerList } from "./handlerList";
import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// EVENT RESULT ENUM
// ============================================

/**
 * Represents the result of an event action.
 */
export type EventResultKey = "DENY" | "DEFAULT" | "ALLOW";

export interface BukkitEventResult extends JavaEnum<EventResultKey> {
  // No additional methods.
}

interface EventResultClass extends
  Omit<Record<EventResultKey, BukkitEventResult>, keyof JavaEnumClass<BukkitEventResult>>,
  JavaEnumClass<BukkitEventResult> {
}

export const EventResult: EventResultClass = {
  /** Deny the action. Opposite of ALLOW. */
  DENY: org.bukkit.event.Event.Result.DENY,

  /** Use server default behavior. Neither explicitly allowed nor denied. */
  DEFAULT: org.bukkit.event.Event.Result.DEFAULT,

  /** Allow the action. Opposite of DENY. */
  ALLOW: org.bukkit.event.Event.Result.ALLOW,

  values(): BukkitEventResult[] {
    return org.bukkit.event.Event.Result.values();
  },

  valueOf(name: string): BukkitEventResult {
    return org.bukkit.event.Event.Result.valueOf(name);
  },
};

// ============================================
// INTERFACE
// ============================================

export interface BukkitEvent {
  /**
   * User-friendly event name. Default: class simple name.
   */
  getEventName(): string;

  /**
   * List of handlers for this event type.
   */
  getHandlers(): BukkitHandlerList;

  /**
   * True if this event fires asynchronously.
   * 
   * Async event caveats:
   * - Cannot be fired from inside sync event code (throws IllegalStateException)
   * - Async handlers CAN fire sync or async events
   * - May fire multiple times simultaneously, in any order
   * - Handler registration changes ignored during execution
   * - Handlers may block indefinitely
   * - Not included in plugin timing system
   */
  isAsynchronous(): boolean;
}

export namespace BukkitEvent {
  export type Result = BukkitEventResult;
}