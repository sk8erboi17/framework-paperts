/**
 * Bukkit EntityType enum values.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntityType.html
 */
export const EntityType = {
  // Passive mobs
  ALLAY: org.bukkit.entity.EntityType.ALLAY,
  ARMADILLO: org.bukkit.entity.EntityType.ARMADILLO,
  AXOLOTL: org.bukkit.entity.EntityType.AXOLOTL,
  BAT: org.bukkit.entity.EntityType.BAT,
  BEE: org.bukkit.entity.EntityType.BEE,
  CAMEL: org.bukkit.entity.EntityType.CAMEL,
  CAT: org.bukkit.entity.EntityType.CAT,
  CHICKEN: org.bukkit.entity.EntityType.CHICKEN,
  COD: org.bukkit.entity.EntityType.COD,
  COW: org.bukkit.entity.EntityType.COW,
  DOLPHIN: org.bukkit.entity.EntityType.DOLPHIN,
  DONKEY: org.bukkit.entity.EntityType.DONKEY,
  FOX: org.bukkit.entity.EntityType.FOX,
  FROG: org.bukkit.entity.EntityType.FROG,
  GLOW_SQUID: org.bukkit.entity.EntityType.GLOW_SQUID,
  GOAT: org.bukkit.entity.EntityType.GOAT,
  HORSE: org.bukkit.entity.EntityType.HORSE,
  LLAMA: org.bukkit.entity.EntityType.LLAMA,
  MOOSHROOM: org.bukkit.entity.EntityType.MOOSHROOM,
  MULE: org.bukkit.entity.EntityType.MULE,
  OCELOT: org.bukkit.entity.EntityType.OCELOT,
  PANDA: org.bukkit.entity.EntityType.PANDA,
  PARROT: org.bukkit.entity.EntityType.PARROT,
  PIG: org.bukkit.entity.EntityType.PIG,
  POLAR_BEAR: org.bukkit.entity.EntityType.POLAR_BEAR,
  PUFFERFISH: org.bukkit.entity.EntityType.PUFFERFISH,
  RABBIT: org.bukkit.entity.EntityType.RABBIT,
  SALMON: org.bukkit.entity.EntityType.SALMON,
  SHEEP: org.bukkit.entity.EntityType.SHEEP,
  SNIFFER: org.bukkit.entity.EntityType.SNIFFER,
  SNOW_GOLEM: org.bukkit.entity.EntityType.SNOW_GOLEM,
  SQUID: org.bukkit.entity.EntityType.SQUID,
  STRIDER: org.bukkit.entity.EntityType.STRIDER,
  TADPOLE: org.bukkit.entity.EntityType.TADPOLE,
  TRADER_LLAMA: org.bukkit.entity.EntityType.TRADER_LLAMA,
  TROPICAL_FISH: org.bukkit.entity.EntityType.TROPICAL_FISH,
  TURTLE: org.bukkit.entity.EntityType.TURTLE,
  VILLAGER: org.bukkit.entity.EntityType.VILLAGER,
  WANDERING_TRADER: org.bukkit.entity.EntityType.WANDERING_TRADER,
  WOLF: org.bukkit.entity.EntityType.WOLF,

  // Hostile mobs
  BLAZE: org.bukkit.entity.EntityType.BLAZE,
  BOGGED: org.bukkit.entity.EntityType.BOGGED,
  BREEZE: org.bukkit.entity.EntityType.BREEZE,
  CAVE_SPIDER: org.bukkit.entity.EntityType.CAVE_SPIDER,
  CREEPER: org.bukkit.entity.EntityType.CREEPER,
  DROWNED: org.bukkit.entity.EntityType.DROWNED,
  ELDER_GUARDIAN: org.bukkit.entity.EntityType.ELDER_GUARDIAN,
  ENDER_DRAGON: org.bukkit.entity.EntityType.ENDER_DRAGON,
  ENDERMAN: org.bukkit.entity.EntityType.ENDERMAN,
  ENDERMITE: org.bukkit.entity.EntityType.ENDERMITE,
  EVOKER: org.bukkit.entity.EntityType.EVOKER,
  GHAST: org.bukkit.entity.EntityType.GHAST,
  GIANT: org.bukkit.entity.EntityType.GIANT,
  GUARDIAN: org.bukkit.entity.EntityType.GUARDIAN,
  HOGLIN: org.bukkit.entity.EntityType.HOGLIN,
  HUSK: org.bukkit.entity.EntityType.HUSK,
  ILLUSIONER: org.bukkit.entity.EntityType.ILLUSIONER,
  IRON_GOLEM: org.bukkit.entity.EntityType.IRON_GOLEM,
  MAGMA_CUBE: org.bukkit.entity.EntityType.MAGMA_CUBE,
  PHANTOM: org.bukkit.entity.EntityType.PHANTOM,
  PIGLIN: org.bukkit.entity.EntityType.PIGLIN,
  PIGLIN_BRUTE: org.bukkit.entity.EntityType.PIGLIN_BRUTE,
  PILLAGER: org.bukkit.entity.EntityType.PILLAGER,
  RAVAGER: org.bukkit.entity.EntityType.RAVAGER,
  SHULKER: org.bukkit.entity.EntityType.SHULKER,
  SILVERFISH: org.bukkit.entity.EntityType.SILVERFISH,
  SKELETON: org.bukkit.entity.EntityType.SKELETON,
  SKELETON_HORSE: org.bukkit.entity.EntityType.SKELETON_HORSE,
  SLIME: org.bukkit.entity.EntityType.SLIME,
  SPIDER: org.bukkit.entity.EntityType.SPIDER,
  STRAY: org.bukkit.entity.EntityType.STRAY,
  VEX: org.bukkit.entity.EntityType.VEX,
  VINDICATOR: org.bukkit.entity.EntityType.VINDICATOR,
  WARDEN: org.bukkit.entity.EntityType.WARDEN,
  WITCH: org.bukkit.entity.EntityType.WITCH,
  WITHER: org.bukkit.entity.EntityType.WITHER,
  WITHER_SKELETON: org.bukkit.entity.EntityType.WITHER_SKELETON,
  ZOGLIN: org.bukkit.entity.EntityType.ZOGLIN,
  ZOMBIE: org.bukkit.entity.EntityType.ZOMBIE,
  ZOMBIE_HORSE: org.bukkit.entity.EntityType.ZOMBIE_HORSE,
  ZOMBIE_VILLAGER: org.bukkit.entity.EntityType.ZOMBIE_VILLAGER,
  ZOMBIFIED_PIGLIN: org.bukkit.entity.EntityType.ZOMBIFIED_PIGLIN,

  // Projectiles
  ARROW: org.bukkit.entity.EntityType.ARROW,
  DRAGON_FIREBALL: org.bukkit.entity.EntityType.DRAGON_FIREBALL,
  EGG: org.bukkit.entity.EntityType.EGG,
  ENDER_PEARL: org.bukkit.entity.EntityType.ENDER_PEARL,
  EXPERIENCE_BOTTLE: org.bukkit.entity.EntityType.EXPERIENCE_BOTTLE,
  FIREBALL: org.bukkit.entity.EntityType.FIREBALL,
  FIREWORK_ROCKET: org.bukkit.entity.EntityType.FIREWORK_ROCKET,
  LLAMA_SPIT: org.bukkit.entity.EntityType.LLAMA_SPIT,
  SHULKER_BULLET: org.bukkit.entity.EntityType.SHULKER_BULLET,
  SMALL_FIREBALL: org.bukkit.entity.EntityType.SMALL_FIREBALL,
  SNOWBALL: org.bukkit.entity.EntityType.SNOWBALL,
  SPECTRAL_ARROW: org.bukkit.entity.EntityType.SPECTRAL_ARROW,
  SPLASH_POTION: org.bukkit.entity.EntityType.SPLASH_POTION,
  LINGERING_POTION: org.bukkit.entity.EntityType.LINGERING_POTION,
  TRIDENT: org.bukkit.entity.EntityType.TRIDENT,
  WIND_CHARGE: org.bukkit.entity.EntityType.WIND_CHARGE,
  BREEZE_WIND_CHARGE: org.bukkit.entity.EntityType.BREEZE_WIND_CHARGE,
  WITHER_SKULL: org.bukkit.entity.EntityType.WITHER_SKULL,

  // Vehicles
  ACACIA_BOAT: org.bukkit.entity.EntityType.ACACIA_BOAT,
  ACACIA_CHEST_BOAT: org.bukkit.entity.EntityType.ACACIA_CHEST_BOAT,
  BAMBOO_RAFT: org.bukkit.entity.EntityType.BAMBOO_RAFT,
  BAMBOO_CHEST_RAFT: org.bukkit.entity.EntityType.BAMBOO_CHEST_RAFT,
  BIRCH_BOAT: org.bukkit.entity.EntityType.BIRCH_BOAT,
  BIRCH_CHEST_BOAT: org.bukkit.entity.EntityType.BIRCH_CHEST_BOAT,
  CHERRY_BOAT: org.bukkit.entity.EntityType.CHERRY_BOAT,
  CHERRY_CHEST_BOAT: org.bukkit.entity.EntityType.CHERRY_CHEST_BOAT,
  DARK_OAK_BOAT: org.bukkit.entity.EntityType.DARK_OAK_BOAT,
  DARK_OAK_CHEST_BOAT: org.bukkit.entity.EntityType.DARK_OAK_CHEST_BOAT,
  JUNGLE_BOAT: org.bukkit.entity.EntityType.JUNGLE_BOAT,
  JUNGLE_CHEST_BOAT: org.bukkit.entity.EntityType.JUNGLE_CHEST_BOAT,
  MANGROVE_BOAT: org.bukkit.entity.EntityType.MANGROVE_BOAT,
  MANGROVE_CHEST_BOAT: org.bukkit.entity.EntityType.MANGROVE_CHEST_BOAT,
  OAK_BOAT: org.bukkit.entity.EntityType.OAK_BOAT,
  OAK_CHEST_BOAT: org.bukkit.entity.EntityType.OAK_CHEST_BOAT,
  PALE_OAK_BOAT: org.bukkit.entity.EntityType.PALE_OAK_BOAT,
  PALE_OAK_CHEST_BOAT: org.bukkit.entity.EntityType.PALE_OAK_CHEST_BOAT,
  SPRUCE_BOAT: org.bukkit.entity.EntityType.SPRUCE_BOAT,
  SPRUCE_CHEST_BOAT: org.bukkit.entity.EntityType.SPRUCE_CHEST_BOAT,
  MINECART: org.bukkit.entity.EntityType.MINECART,
  CHEST_MINECART: org.bukkit.entity.EntityType.CHEST_MINECART,
  COMMAND_BLOCK_MINECART: org.bukkit.entity.EntityType.COMMAND_BLOCK_MINECART,
  FURNACE_MINECART: org.bukkit.entity.EntityType.FURNACE_MINECART,
  HOPPER_MINECART: org.bukkit.entity.EntityType.HOPPER_MINECART,
  SPAWNER_MINECART: org.bukkit.entity.EntityType.SPAWNER_MINECART,
  TNT_MINECART: org.bukkit.entity.EntityType.TNT_MINECART,

  // Other
  ARMOR_STAND: org.bukkit.entity.EntityType.ARMOR_STAND,
  END_CRYSTAL: org.bukkit.entity.EntityType.END_CRYSTAL,
  EVOKER_FANGS: org.bukkit.entity.EntityType.EVOKER_FANGS,
  EXPERIENCE_ORB: org.bukkit.entity.EntityType.EXPERIENCE_ORB,
  EYE_OF_ENDER: org.bukkit.entity.EntityType.EYE_OF_ENDER,
  FALLING_BLOCK: org.bukkit.entity.EntityType.FALLING_BLOCK,
  FISHING_BOBBER: org.bukkit.entity.EntityType.FISHING_BOBBER,
  GLOW_ITEM_FRAME: org.bukkit.entity.EntityType.GLOW_ITEM_FRAME,
  ITEM: org.bukkit.entity.EntityType.ITEM,
  ITEM_DISPLAY: org.bukkit.entity.EntityType.ITEM_DISPLAY,
  ITEM_FRAME: org.bukkit.entity.EntityType.ITEM_FRAME,
  BLOCK_DISPLAY: org.bukkit.entity.EntityType.BLOCK_DISPLAY,
  TEXT_DISPLAY: org.bukkit.entity.EntityType.TEXT_DISPLAY,
  INTERACTION: org.bukkit.entity.EntityType.INTERACTION,
  LEASH_KNOT: org.bukkit.entity.EntityType.LEASH_KNOT,
  LIGHTNING_BOLT: org.bukkit.entity.EntityType.LIGHTNING_BOLT,
  MARKER: org.bukkit.entity.EntityType.MARKER,
  PAINTING: org.bukkit.entity.EntityType.PAINTING,
  PLAYER: org.bukkit.entity.EntityType.PLAYER,
  TNT: org.bukkit.entity.EntityType.TNT,
  AREA_EFFECT_CLOUD: org.bukkit.entity.EntityType.AREA_EFFECT_CLOUD,
  UNKNOWN: org.bukkit.entity.EntityType.UNKNOWN,
} as const;

/**
 * Type for EntityType values - enables autocomplete.
 * 
 * WHY TYPEOF: In TypeScript, there's a fundamental distinction between
 * values and types. EntityType is a value (a const object), but we need
 * a type to use in function signatures and type annotations.
 * 
 *   const EntityType = { PIG: ..., COW: ... };  // This is a VALUE
 *   type WhatWeNeed = ???                        // We need a TYPE
 * 
 * `typeof EntityType` bridges this gap - it extracts the type from a value:
 * 
 *   typeof EntityType = {
 *     PIG: any;
 *     COW: any;
 *     ZOMBIE: any;
 *     // ... all the keys with their types
 *   }
 * 
 * WHY KEYOF: Once we have the object type, `keyof` extracts all property
 * names as a union type:
 * 
 *   keyof typeof EntityType = "PIG" | "COW" | "ZOMBIE" | "SHEEP" | ...
 * 
 * This union type enables autocomplete. When you type:
 * 
 *   function spawnMob(type: EntityTypeKey) { ... }
 *   spawnMob("P|")  // IDE suggests: "PIG", "PLAYER", "PHANTOM", etc.
 * 
 * THE ANY PROBLEM: Notice that our EntityType values are typed as `any`:
 * 
 *   PIG: org.bukkit.entity.EntityType.PIG  // org is any, so this is any
 * 
 * This means TypeScript can't verify at compile time that you're passing
 * a valid EntityType to a function expecting one. The Java enum value is
 * opaque to TypeScript - it's just "some object from Java land".
 * 
 * However, we still get benefits:
 * 
 *   1. Autocomplete for the KEYS ("PIG", "COW", etc.)
 *   2. Typo prevention - EntityType.PIGG won't compile
 *   3. Centralized mapping - one place to maintain Java references
 * 
 * The alternative would be to define strict types for every Java class,
 * which is impractical. We accept `any` for Java interop values while
 * maintaining type safety for our own TypeScript code.
 * 
 * PRACTICAL EXAMPLE:
 * 
 *   // Without EntityTypeKey - accepts any string, no autocomplete
 *   function spawn(type: string) { ... }
 *   spawn("PIGG")  // No error, fails at runtime
 * 
 *   // With EntityTypeKey - autocomplete works, typos caught
 *   function spawn(type: EntityTypeKey) { ... }
 *   spawn("PIGG")  // Compile error: "PIGG" is not assignable to EntityTypeKey
 *   spawn("PIG")   // OK
 */
export type EntityTypeKey = keyof typeof EntityType;