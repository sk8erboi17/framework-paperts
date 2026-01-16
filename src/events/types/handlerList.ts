/**
 * A list of event handlers, stored per-event.
 * 
 * Each event type has its own HandlerList containing all registered
 * listeners for that event. Based on lahwran's fevents.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/HandlerList.html
 */

// ============================================
// INTERFACE
// ============================================

export interface BukkitHandlerList {
  /**
   * Register a listener in this handler list.
   */
  register(listener: any /* BukkitRegisteredListener */): void;

  /**
   * Register multiple listeners.
   */
  registerAll(listeners: any[] /* BukkitRegisteredListener[] */): void;

  /**
   * Remove a specific registered listener.
   */
  unregister(listener: any /* BukkitRegisteredListener */): void;

  /**
   * Remove all listeners from a plugin.
   */
  unregister(plugin: any /* BukkitPlugin */): void;

  /**
   * Remove a listener object from this handler.
   */
  unregister(listener: any /* BukkitListener */): void;

  /**
   * Bake internal data structures to optimized array.
   * Does nothing if already baked.
   */
  bake(): void;

  /**
   * Get all registered listeners for this event type.
   * Returns baked (optimized) array.
   */
  getRegisteredListeners(): any[] /* BukkitRegisteredListener[] */;
}

// ============================================
// HANDLER LIST CLASS INTERFACE
// ============================================

interface HandlerListClass {
  /**
   * Create a new handler list.
   * Automatically added to meta-list for bakeAll().
   */
  create(): BukkitHandlerList;

  /**
   * Bake all handler lists.
   * Best called after all plugins are loaded.
   */
  bakeAll(): void;

  /**
   * Unregister all listeners from all handler lists.
   */
  unregisterAll(): void;

  /**
   * Unregister all listeners from a specific plugin.
   */
  unregisterAll(plugin: any /* BukkitPlugin */): void;

  /**
   * Unregister a specific listener from all handler lists.
   */
  unregisterAll(listener: any /* BukkitListener */): void;

  /**
   * Get all registered listeners for a specific plugin across all events.
   */
  getRegisteredListeners(plugin: any /* BukkitPlugin */): any[] /* BukkitRegisteredListener[] */;

  /**
   * Get all handler lists for every event type.
   */
  getHandlerLists(): BukkitHandlerList[];
}

// ============================================
// HANDLER LIST
// ============================================

export const HandlerList: HandlerListClass = {
  create(): BukkitHandlerList {
    return new org.bukkit.event.HandlerList();
  },

  bakeAll(): void {
    org.bukkit.event.HandlerList.bakeAll();
  },

  unregisterAll(target?: any /* BukkitPlugin | BukkitListener */): void {
    if (target === undefined) {
      org.bukkit.event.HandlerList.unregisterAll();
    } else {
      org.bukkit.event.HandlerList.unregisterAll(target);
    }
  },

  getRegisteredListeners(plugin: any /* BukkitPlugin */): any[] /* BukkitRegisteredListener[] */ {
    return org.bukkit.event.HandlerList.getRegisteredListeners(plugin);
  },

  getHandlerLists(): BukkitHandlerList[] {
    return org.bukkit.event.HandlerList.getHandlerLists();
  },
};