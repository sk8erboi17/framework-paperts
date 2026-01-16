// command/types/commandSender.ts

import { JavaUUID } from "../../java/types/uuid";

/**
 * CommandSender - Represents anything that can send commands and receive messages.
 * 
 * This is a fundamental interface in Bukkit that represents any entity
 * capable of executing commands and receiving feedback.
 * 
 * IMPLEMENTORS:
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  CommandSender                                                  │
 * │  ├── ConsoleCommandSender      (Server console)                │
 * │  ├── RemoteConsoleCommandSender (RCON)                         │
 * │  ├── BlockCommandSender        (Command blocks)                │
 * │  ├── ProxiedCommandSender      (Proxied/forwarded commands)    │
 * │  └── Entity                    (All entities)                  │
 * │      └── LivingEntity                                          │
 * │          └── HumanEntity                                       │
 * │              └── Player        (Most common use case)          │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * KEY FEATURES:
 * - Send messages (text feedback)
 * - Get name (identifier)
 * - Access server instance
 * - Permission checking (inherited from Permissible)
 * - Operator status (inherited from ServerOperator)
 * 
 * COMMON USAGE:
 * Commands receive a CommandSender, allowing the same command
 * to work for players, console, command blocks, etc.
 * 
 * ```typescript
 * function onCommand(sender: CommandSender, args: string[]): boolean {
 *   if (sender instanceof Player) {
 *     // Player-specific logic
 *   }
 *   sender.sendMessage("Command executed!");
 *   return true;
 * }
 * ```
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/command/CommandSender.html
 */
export interface BukkitCommandSender {

  // ==========================================
  // MESSAGING
  // ==========================================

  /**
   * Sends this sender a message.
   * 
   * This is the primary way to provide feedback to command senders.
   * Supports color codes (§ or ChatColor).
   * 
   * @param message Message to be displayed
   * 
   * @example
   * sender.sendMessage("Hello!");
   * sender.sendMessage("§aGreen text!");
   * sender.sendMessage(ChatColor.RED + "Red text!");
   */
  sendMessage(message: string): void;

  /**
   * Sends this sender multiple messages.
   * 
   * Each message appears on a new line.
   * 
   * @param messages An array of messages to be displayed
   * 
   * @example
   * sender.sendMessage("Line 1", "Line 2", "Line 3");
   */
  sendMessage(...messages: string[]): void;

  /**
   * Sends this sender a message with a sender UUID.
   * 
   * The UUID can be used by clients to identify the source
   * of the message (useful for chat filtering, blocking, etc.)
   * 
   * @param sender The UUID of the message sender (null for system)
   * @param message Message to be displayed
   */
  sendMessage(sender: JavaUUID | null, message: string): void;

  /**
   * Sends this sender multiple messages with a sender UUID.
   * 
   * @param sender The UUID of the message sender (null for system)
   * @param messages An array of messages to be displayed
   */
  sendMessage(sender: JavaUUID | null, ...messages: string[]): void;

  // ==========================================
  // IDENTITY
  // ==========================================

  /**
   * Gets the name of this command sender.
   * 
   * Returns different values based on sender type:
   * - Player: Username (e.g., "Steve")
   * - Console: "CONSOLE"
   * - Command Block: "@" or custom name
   * - Entity: Entity name or type
   * 
   * @returns Name of the sender
   */
  getName(): string;

  // ==========================================
  // SERVER ACCESS
  // ==========================================

  /**
   * Returns the server instance that this command is running on.
   * 
   * Useful for accessing server functionality from within
   * command handlers without needing to import Bukkit directly.
   * 
   * @returns Server instance
   */
  // NOT IMPLEMENTED
  //getServer(): BukkitServer;

  // ==========================================
  // SPIGOT API
  // ==========================================

  /**
   * Gets the Spigot API helper for this command sender.
   * 
   * Provides access to Spigot-specific functionality like
   * sending JSON/component messages.
   * 
   * @returns Spigot helper object
   */
  spigot(): BukkitCommandSenderSpigot;
}

/**
 * Spigot-specific extensions for CommandSender.
 * 
 * Provides additional functionality not available in vanilla Bukkit.
 */
export interface BukkitCommandSenderSpigot {
  /**
   * Sends a BaseComponent message to this sender.
   * 
   * BaseComponents allow for rich text with:
   * - Hover events (tooltips)
   * - Click events (run command, open URL)
   * - Formatting (colors, bold, italic)
   * 
   * @param component The component to send
   */
  sendMessage(component: any /* BaseComponent */): void;

  /**
   * Sends multiple BaseComponent messages.
   * 
   * @param components The components to send
   */
  sendMessage(...components: any[] /* BaseComponent[] */): void;

  /**
   * Sends a BaseComponent message with a sender UUID.
   * 
   * @param sender The UUID of the message sender
   * @param component The component to send
   */
  sendMessage(sender: JavaUUID | null, component: any /* BaseComponent */): void;

  /**
   * Sends multiple BaseComponent messages with a sender UUID.
   * 
   * @param sender The UUID of the message sender
   * @param components The components to send
   */
  sendMessage(sender: JavaUUID | null, ...components: any[] /* BaseComponent[] */): void;
}