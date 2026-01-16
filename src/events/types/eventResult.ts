// events/types/eventResult.ts

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";



/**
 * Event.Result - Represents the result of an event
 * 
 * Used by events that need more than just cancelled/not-cancelled.
 * 
 * Values:
 * - ALLOW: Force allow the action, overriding vanilla
 * - DEFAULT: Let vanilla behavior decide
 * - DENY: Cancel/prevent the action
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/Event.Result.html
 */
export type EventResultKey =
  | "ALLOW"
  | "DEFAULT"
  | "DENY";

export interface BukkitEventResult extends JavaEnum<EventResultKey> {}

interface EventResultClass extends
  Omit<Record<EventResultKey, BukkitEventResult>, keyof JavaEnumClass<BukkitEventResult>>,
  JavaEnumClass<BukkitEventResult> {}

export const EventResult: EventResultClass = {
  /**
   * Force allow the action.
   * Overrides vanilla behavior that might otherwise prevent it.
   */
  ALLOW: org.bukkit.event.Event.Result.ALLOW,

  /**
   * Let vanilla behavior decide.
   * The server will handle it normally.
   */
  DEFAULT: org.bukkit.event.Event.Result.DEFAULT,

  /**
   * Deny/cancel the action.
   * The action will not occur.
   */
  DENY: org.bukkit.event.Event.Result.DENY,

  values(): BukkitEventResult[] {
    return org.bukkit.event.Event.Result.values();
  },
  valueOf(name: string): BukkitEventResult {
    return org.bukkit.event.Event.Result.valueOf(name);
  },
};
