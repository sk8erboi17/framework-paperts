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
 * Storage for pending command registrations.
 * Commands are stored here until registerPlugin() is called.
 * 
 * WHY SO MANY FIELDS: PaperTS.registerCommand requires 6 arguments:
 *   - name:         The command name (e.g., "hello" for /hello)
 *   - description:  Shown in /help
 *   - usageMessage: Shown when command is used incorrectly
 *   - permission:   Required permission node (empty = no permission)
 *   - aliases:      Alternative names for the command
 *   - methodName:   Which method to call (stored, not passed to PaperTS)
 * 
 * We store all these at decoration time, then pass them to PaperTS
 * when registerPlugin() is called with the actual instance.
 */
const pendingCommands: {
  name: string;
  description: string;
  usageMessage: string;
  permission: string;
  aliases: string[];
  methodName: string;
}[] = [];

/**
 * Options for the @Command decorator.
 * Only `name` is required; others have sensible defaults.
 * 
 * WHY AN OPTIONS OBJECT INSTEAD OF POSITIONAL ARGUMENTS:
 * 
 *   // Positional - which argument is which?
 *   @Command("hello", "Says hello", "/hello", "myplugin.hello", ["hi"])
 *   
 *   // Options object - self-documenting
 *   @Command({ name: "hello", description: "Says hello", aliases: ["hi"] })
 * 
 * Additionally, optional parameters work naturally:
 * 
 *   @Command({ name: "spawn" })  // All defaults applied
 *   @Command({ name: "tp", permission: "admin.tp" })  // Only override what you need
 */
interface CommandOptions {
  name: string;
  description?: string;
  usageMessage?: string;
  permission?: string;
  aliases?: string[];
}

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
 * @Command decorator
 * 
 * Usage:
 *   @Command({
 *     name: "hello",
 *     description: "Says hello to the player",
 *     usageMessage: "/hello [name]",
 *     permission: "myplugin.hello",
 *     aliases: ["hi", "greet"]
 *   })
 *   helloCommand(sender: CommandSender, args: string[]) {
 *     sender.sendMessage("Hello!");
 *   }
 * 
 * Minimal usage (defaults applied):
 *   @Command({ name: "spawn" })
 *   spawnCommand(sender: CommandSender, args: string[]) { ... }
 * 
 * WHY NULLISH COALESCING (??): We use `??` instead of `||` because:
 * 
 *   options.description || ""     // Fails if description is "" (empty string)
 *   options.description ?? ""     // Only uses "" if description is undefined/null
 * 
 * This matters because an empty string is a valid (if unusual) description,
 * and we shouldn't silently replace it with our default.
 */
export function Command(options: CommandOptions) {
  return function (
    _target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    pendingCommands.push({
      name: options.name,
      description: options.description ?? "",
      usageMessage: options.usageMessage ?? `/${options.name}`,
      permission: options.permission ?? "",
      aliases: options.aliases ?? [],
      methodName,
    });

    return descriptor;
  };
}

/**
 * Registers all decorated events and commands with PaperTS.
 * Must be called after creating the plugin instance.
 * 
 * WHY CLEAR ARRAYS AFTER REGISTRATION: The pending arrays are module-level
 * singletons. If we don't clear them:
 * 
 *   1. Hot reload would re-register old handlers (duplicates)
 *   2. Memory would grow with each reload
 *   3. Multiple plugin instances would share registrations incorrectly
 * 
 * Setting `.length = 0` is the fastest way to clear an array in-place
 * while keeping the same reference (not that it matters here, but it's
 * a good habit and more explicit than `pendingEvents = []`).
 * 
 * @param plugin - The plugin instance with decorated methods
 * 
 * @example
 *   class MyPlugin {
 *     @EventHandler(PlayerJoinEvent)
 *     onJoin(event: PlayerJoinEvent) { ... }
 *     
 *     @Command({ name: "hello" })
 *     hello(sender: CommandSender, args: string[]) { ... }
 *   }
 *   
 *   const plugin = new MyPlugin();
 *   registerPlugin(plugin);  // Now events and commands are active
 */
export function registerPlugin(plugin: any): void {
  /* Register all pending events */
  for (const event of pendingEvents) {
    const method = plugin[event.methodName].bind(plugin);
    PaperTS.registerEvent(event.eventClass, method);
  }
  pendingEvents.length = 0;

  /* Register all pending commands */
  for (const cmd of pendingCommands) {
    const method = plugin[cmd.methodName].bind(plugin);
    PaperTS.registerCommand(
      cmd.name,
      cmd.description,
      cmd.usageMessage,
      cmd.permission,
      cmd.aliases,
      method
    );
  }
  pendingCommands.length = 0;
}