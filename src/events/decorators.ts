/**
 * Storage for pending event registrations.
 * Events are stored here until registerPlugin() is called.
 * 
 * WHY OBJECT DESTRUCTURING INSTEAD OF ARRAY: Consider the alternatives.
 * 
 * OPTION 1 - Simple array (bad):
 * 
 *   const pendingEvents: any[][] = [];
 *   pendingEvents.push([eventClass, methodName]);
 *   
 *   // Later, when reading:
 *   const eventClass = pendingEvents[0][0];  // What is index 0? 
 *   const methodName = pendingEvents[0][1];  // What is index 1?
 *   
 *   // Or even worse:
 *   for (const event of pendingEvents) {
 *     PaperTS.registerEvent(event[0], plugin[event[1]].bind(plugin));
 *     //                    ^^^^^^^^        ^^^^^^^^
 *     //                    Magic numbers - meaning unclear
 *   }
 * 
 * OPTION 2 - Tuple with types (better but still unclear):
 * 
 *   const pendingEvents: [any, string][] = [];
 *   pendingEvents.push([eventClass, methodName]);
 *   
 *   // Reading is still index-based:
 *   const [eventClass, methodName] = pendingEvents[0];
 *   // At least we can destructure, but the storage itself is opaque
 * 
 * OPTION 3 - Object with named properties (what we use):
 * 
 *   const pendingEvents: { eventClass: any; methodName: string }[] = [];
 *   pendingEvents.push({ eventClass, methodName });
 *   
 *   // Reading is self-documenting:
 *   for (const event of pendingEvents) {
 *     PaperTS.registerEvent(event.eventClass, plugin[event.methodName].bind(plugin));
 *     //                    ^^^^^^^^^^^^^^^         ^^^^^^^^^^^^^^^^
 *     //                    Clear meaning           Clear meaning
 *   }
 * 
 * The key insight is that code is read far more often than it is written.
 * Six months from now, `event[0]` means nothing, but `event.eventClass`
 * is immediately clear. The few extra characters cost nothing compared
 * to the cognitive load saved when reading or debugging.
 * 
 * Additionally, objects are extensible. If tomorrow we need to add a
 * priority field for event ordering:
 * 
 *   { eventClass: any; methodName: string; priority: number }
 * 
 * All existing code continues to work. With arrays, we'd need to update
 * every index access: event[2] for priority, and hope we don't miss one.
 */
const pendingEvents: { eventClass: any; methodName: string }[] = [];

/**
 * @EventHandler decorator
 * 
 * WHY THIS SIGNATURE: TypeScript decorators must follow a specific signature
 * to be recognized by the compiler. When you write:
 * 
 *   @EventHandler(PlayerJoinEvent)
 *   onJoin(event) { ... }
 * 
 * TypeScript transforms this into:
 * 
 *   EventHandler(PlayerJoinEvent)(MyClass.prototype, "onJoin", descriptor)
 * 
 * So we need a function that returns a function - this is called a
 * "decorator factory". The outer function receives our custom argument
 * (eventClass), and the inner function receives what TypeScript passes.
 * 
 * WHY TARGET IS UNUSED: TypeScript always passes three arguments to
 * method decorators:
 * 
 *   1. target      - The class prototype (MyClass.prototype)
 *   2. methodName  - The method name as string ("onJoin")  
 *   3. descriptor  - The property descriptor (contains the actual function)
 * 
 * We only need methodName to store which method to register later.
 * We don't need target because we receive the actual instance when
 * registerPlugin() is called. The underscore prefix (_target) tells
 * TypeScript: "I know this parameter exists, I'm ignoring it intentionally."
 * 
 * WHY WE STORE AND NOT REGISTER IMMEDIATELY: At decoration time, no class
 * instance exists yet - we're decorating the prototype. We must wait until
 * someone calls `new MyPlugin()` and then `registerPlugin(plugin)` to have
 * an actual instance with bound methods.
 */
export function EventHandler(eventClass: any) {
  return function (
    _target: any,           /* Class prototype - unused, see above */
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    /* Store for later registration */
    pendingEvents.push({ eventClass, methodName });
    
    /* Return descriptor unchanged - we're not modifying the method */
    return descriptor;
  };
}

/**
 * Registers all decorated methods with PaperTS.
 * Must be called after creating the plugin instance.
 * 
 * @param plugin - The plugin instance
 */
export function registerPlugin(plugin: any): void {
  for (const event of pendingEvents) {
    const method = plugin[event.methodName].bind(plugin);
    PaperTS.registerEvent(event.eventClass, method);
  }
  pendingEvents.length = 0;
}