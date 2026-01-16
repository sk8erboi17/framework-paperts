/**
 * DESIGN
 * ------
 * Effect represents visual and sound effects that can be sent to players.
 * 
 * EFFECT TYPES:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    EFFECT CATEGORIES                        │
 *   │                                                             │
 *   │   SOUND EFFECTS                                             │
 *   │   ──────────────                                            │
 *   │   - Entity sounds (ghast, blaze, zombie, etc.)              │
 *   │   - Block sounds (door, anvil, brewing stand)               │
 *   │   - Action sounds (bow fire, book page turn)                │
 *   │   - Conversion sounds (zombie to drowned, etc.)             │
 *   │                                                             │
 *   │   VISUAL EFFECTS                                            │
 *   │   ──────────────                                            │
 *   │   - Particles (smoke, dragon breath, bone meal)             │
 *   │   - Block effects (mobspawner flames, ender signal)         │
 *   │   - Copper effects (wax on/off, oxidation scrape)           │
 *   │   - Dripstone effects (dripping lava/water)                 │
 *   │                                                             │
 *   │   COMBINED (SOUND + VISUAL)                                 │
 *   │   ────────────────────────                                  │
 *   │   - Potion break                                            │
 *   │   - End gateway spawn                                       │
 *   │   - Portal travel                                           │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * EFFECT DATA:
 * 
 *   Some effects require additional data:
 * 
 *   ┌──────────────────────┬─────────────────────────────────────┐
 *   │ Effect               │ Data Required                       │
 *   ├──────────────────────┼─────────────────────────────────────┤
 *   │ SMOKE                │ Direction (BlockFace)               │
 *   │ STEP_SOUND           │ Block type (Material)               │
 *   │ POTION_BREAK         │ Potion data value                   │
 *   │ RECORD_PLAY          │ Record item type (Material)         │
 *   │ BONE_MEAL_USE        │ Number of particles (Integer)       │
 *   │ VILLAGER_PLANT_GROW  │ Number of particles (Integer)       │
 *   │ ELECTRIC_SPARK       │ Axis (Axis)                         │
 *   │ COMPOSTER_FILL       │ Success (Boolean)                   │
 *   └──────────────────────┴─────────────────────────────────────┘
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Effect.html
 */

import { JavaEnum, JavaEnumClass, enumValues, enumValueOf } from "../../java/types/enum";

// ============================================
// EFFECT TYPE ENUM
// ============================================

/**
 * Type of effect (sound or visual).
 */
export type EffectTypeName = "SOUND" | "VISUAL";

/**
 * Effect.Type enum interface.
 */
export interface BukkitEffectType extends JavaEnum<EffectTypeName> {}

// ============================================
// EFFECT ENUM
// ============================================

/**
 * All effect constant names.
 */
export type EffectName =
  /* Click sounds */
  | "CLICK1"
  | "CLICK2"
  /* Weapon sounds */
  | "BOW_FIRE"
  /* Door sounds (deprecated) */
  | "DOOR_TOGGLE"
  | "IRON_DOOR_TOGGLE"
  | "TRAPDOOR_TOGGLE"
  | "IRON_TRAPDOOR_TOGGLE"
  | "FENCE_GATE_TOGGLE"
  | "DOOR_CLOSE"
  | "IRON_DOOR_CLOSE"
  | "TRAPDOOR_CLOSE"
  | "IRON_TRAPDOOR_CLOSE"
  | "FENCE_GATE_CLOSE"
  /* Fire */
  | "EXTINGUISH"
  /* Music */
  | "RECORD_PLAY"
  /* Mob sounds */
  | "GHAST_SHRIEK"
  | "GHAST_SHOOT"
  | "BLAZE_SHOOT"
  | "ZOMBIE_CHEW_WOODEN_DOOR"
  | "ZOMBIE_CHEW_IRON_DOOR"
  | "ZOMBIE_DESTROY_DOOR"
  | "BAT_TAKEOFF"
  | "PHANTOM_BITE"
  | "ENDERDRAGON_SHOOT"
  | "ENDERDRAGON_GROWL"
  | "WITHER_SHOOT"
  | "WITHER_BREAK_BLOCK"
  /* Visual effects */
  | "SMOKE"
  | "STEP_SOUND"
  | "POTION_BREAK"
  | "INSTANT_POTION_BREAK"
  | "ENDER_SIGNAL"
  | "MOBSPAWNER_FLAMES"
  | "DRAGON_BREATH"
  | "ENDER_DRAGON_DESTROY_BLOCK"
  /* Block sounds */
  | "BREWING_STAND_BREW"
  | "CHORUS_FLOWER_GROW"
  | "CHORUS_FLOWER_DEATH"
  | "ANVIL_BREAK"
  | "ANVIL_USE"
  | "ANVIL_LAND"
  | "GRINDSTONE_USE"
  | "SMITHING_TABLE_USE"
  | "BOOK_PAGE_TURN"
  /* Portal */
  | "PORTAL_TRAVEL"
  | "END_GATEWAY_SPAWN"
  | "END_PORTAL_FRAME_FILL"
  /* Projectiles */
  | "ENDEREYE_LAUNCH"
  | "FIREWORK_SHOOT"
  /* Plant effects */
  | "VILLAGER_PLANT_GROW"
  | "BONE_MEAL_USE"
  /* Zombie conversion */
  | "ZOMBIE_INFECT"
  | "ZOMBIE_CONVERTED_VILLAGER"
  | "ZOMBIE_CONVERTED_TO_DROWNED"
  | "HUSK_CONVERTED_TO_ZOMBIE"
  | "SKELETON_CONVERTED_TO_STRAY"
  /* Dripstone */
  | "POINTED_DRIPSTONE_LAND"
  | "POINTED_DRIPSTONE_DRIP_LAVA_INTO_CAULDRON"
  | "POINTED_DRIPSTONE_DRIP_WATER_INTO_CAULDRON"
  | "DRIPPING_DRIPSTONE"
  /* Composter */
  | "COMPOSTER_FILL_ATTEMPT"
  /* Lava/Redstone */
  | "LAVA_INTERACT"
  | "REDSTONE_TORCH_BURNOUT"
  /* Copper */
  | "COPPER_WAX_ON"
  | "COPPER_WAX_OFF"
  | "OXIDISED_COPPER_SCRAPE"
  | "ELECTRIC_SPARK"
  /* Misc */
  | "SPONGE_DRY";

/**
 * Effect enum instance.
 */
export interface BukkitEffect extends JavaEnum<EffectName> {
  /**
   * Get the ID for this effect.
   * 
   * @returns Effect ID
   * @deprecated Magic value
   */
  getId(): number;

  /**
   * Get the type of this effect.
   * 
   * @returns SOUND or VISUAL
   */
  getType(): BukkitEffectType;

  /**
   * Get the data class for this effect.
   * 
   * @returns Data class or null if none required
   */
  getData(): any | null;
}

/**
 * Effect enum class (static side).
 */
export interface BukkitEffectClass extends JavaEnumClass<BukkitEffect> {
  /* Click sounds */
  readonly CLICK1: BukkitEffect;
  readonly CLICK2: BukkitEffect;

  /* Weapon sounds */
  readonly BOW_FIRE: BukkitEffect;

  /* Door sounds (deprecated) */
  readonly DOOR_TOGGLE: BukkitEffect;
  readonly IRON_DOOR_TOGGLE: BukkitEffect;
  readonly TRAPDOOR_TOGGLE: BukkitEffect;
  readonly IRON_TRAPDOOR_TOGGLE: BukkitEffect;
  readonly FENCE_GATE_TOGGLE: BukkitEffect;
  readonly DOOR_CLOSE: BukkitEffect;
  readonly IRON_DOOR_CLOSE: BukkitEffect;
  readonly TRAPDOOR_CLOSE: BukkitEffect;
  readonly IRON_TRAPDOOR_CLOSE: BukkitEffect;
  readonly FENCE_GATE_CLOSE: BukkitEffect;

  /* Fire */
  readonly EXTINGUISH: BukkitEffect;

  /* Music */
  readonly RECORD_PLAY: BukkitEffect;

  /* Mob sounds */
  readonly GHAST_SHRIEK: BukkitEffect;
  readonly GHAST_SHOOT: BukkitEffect;
  readonly BLAZE_SHOOT: BukkitEffect;
  readonly ZOMBIE_CHEW_WOODEN_DOOR: BukkitEffect;
  readonly ZOMBIE_CHEW_IRON_DOOR: BukkitEffect;
  readonly ZOMBIE_DESTROY_DOOR: BukkitEffect;
  readonly BAT_TAKEOFF: BukkitEffect;
  readonly PHANTOM_BITE: BukkitEffect;
  readonly ENDERDRAGON_SHOOT: BukkitEffect;
  readonly ENDERDRAGON_GROWL: BukkitEffect;
  readonly WITHER_SHOOT: BukkitEffect;
  readonly WITHER_BREAK_BLOCK: BukkitEffect;

  /* Visual effects */
  readonly SMOKE: BukkitEffect;
  readonly STEP_SOUND: BukkitEffect;
  readonly POTION_BREAK: BukkitEffect;
  readonly INSTANT_POTION_BREAK: BukkitEffect;
  readonly ENDER_SIGNAL: BukkitEffect;
  readonly MOBSPAWNER_FLAMES: BukkitEffect;
  readonly DRAGON_BREATH: BukkitEffect;
  readonly ENDER_DRAGON_DESTROY_BLOCK: BukkitEffect;

  /* Block sounds */
  readonly BREWING_STAND_BREW: BukkitEffect;
  readonly CHORUS_FLOWER_GROW: BukkitEffect;
  readonly CHORUS_FLOWER_DEATH: BukkitEffect;
  readonly ANVIL_BREAK: BukkitEffect;
  readonly ANVIL_USE: BukkitEffect;
  readonly ANVIL_LAND: BukkitEffect;
  readonly GRINDSTONE_USE: BukkitEffect;
  readonly SMITHING_TABLE_USE: BukkitEffect;
  readonly BOOK_PAGE_TURN: BukkitEffect;

  /* Portal */
  readonly PORTAL_TRAVEL: BukkitEffect;
  readonly END_GATEWAY_SPAWN: BukkitEffect;
  readonly END_PORTAL_FRAME_FILL: BukkitEffect;

  /* Projectiles */
  readonly ENDEREYE_LAUNCH: BukkitEffect;
  readonly FIREWORK_SHOOT: BukkitEffect;

  /* Plant effects */
  readonly VILLAGER_PLANT_GROW: BukkitEffect;
  readonly BONE_MEAL_USE: BukkitEffect;

  /* Zombie conversion */
  readonly ZOMBIE_INFECT: BukkitEffect;
  readonly ZOMBIE_CONVERTED_VILLAGER: BukkitEffect;
  readonly ZOMBIE_CONVERTED_TO_DROWNED: BukkitEffect;
  readonly HUSK_CONVERTED_TO_ZOMBIE: BukkitEffect;
  readonly SKELETON_CONVERTED_TO_STRAY: BukkitEffect;

  /* Dripstone */
  readonly POINTED_DRIPSTONE_LAND: BukkitEffect;
  readonly POINTED_DRIPSTONE_DRIP_LAVA_INTO_CAULDRON: BukkitEffect;
  readonly POINTED_DRIPSTONE_DRIP_WATER_INTO_CAULDRON: BukkitEffect;
  readonly DRIPPING_DRIPSTONE: BukkitEffect;

  /* Composter */
  readonly COMPOSTER_FILL_ATTEMPT: BukkitEffect;

  /* Lava/Redstone */
  readonly LAVA_INTERACT: BukkitEffect;
  readonly REDSTONE_TORCH_BURNOUT: BukkitEffect;

  /* Copper */
  readonly COPPER_WAX_ON: BukkitEffect;
  readonly COPPER_WAX_OFF: BukkitEffect;
  readonly OXIDISED_COPPER_SCRAPE: BukkitEffect;
  readonly ELECTRIC_SPARK: BukkitEffect;

  /* Misc */
  readonly SPONGE_DRY: BukkitEffect;

  /**
   * Get effect by ID.
   * 
   * @deprecated Magic value
   */
  getById(id: number): BukkitEffect | null;
}

/**
 * Access to Effect enum.
 */
export const Effect: BukkitEffectClass = org.bukkit.Effect;

// ============================================
// CONSTANTS
// ============================================

/**
 * All effect names.
 */
export const EFFECT_NAMES: readonly EffectName[] = [
  "CLICK1",
  "CLICK2",
  "BOW_FIRE",
  "DOOR_TOGGLE",
  "IRON_DOOR_TOGGLE",
  "TRAPDOOR_TOGGLE",
  "IRON_TRAPDOOR_TOGGLE",
  "FENCE_GATE_TOGGLE",
  "DOOR_CLOSE",
  "IRON_DOOR_CLOSE",
  "TRAPDOOR_CLOSE",
  "IRON_TRAPDOOR_CLOSE",
  "FENCE_GATE_CLOSE",
  "EXTINGUISH",
  "RECORD_PLAY",
  "GHAST_SHRIEK",
  "GHAST_SHOOT",
  "BLAZE_SHOOT",
  "ZOMBIE_CHEW_WOODEN_DOOR",
  "ZOMBIE_CHEW_IRON_DOOR",
  "ZOMBIE_DESTROY_DOOR",
  "SMOKE",
  "STEP_SOUND",
  "POTION_BREAK",
  "INSTANT_POTION_BREAK",
  "ENDER_SIGNAL",
  "MOBSPAWNER_FLAMES",
  "BREWING_STAND_BREW",
  "CHORUS_FLOWER_GROW",
  "CHORUS_FLOWER_DEATH",
  "PORTAL_TRAVEL",
  "ENDEREYE_LAUNCH",
  "FIREWORK_SHOOT",
  "VILLAGER_PLANT_GROW",
  "DRAGON_BREATH",
  "ANVIL_BREAK",
  "ANVIL_USE",
  "ANVIL_LAND",
  "ENDERDRAGON_SHOOT",
  "WITHER_BREAK_BLOCK",
  "WITHER_SHOOT",
  "ZOMBIE_INFECT",
  "ZOMBIE_CONVERTED_VILLAGER",
  "BAT_TAKEOFF",
  "END_GATEWAY_SPAWN",
  "ENDERDRAGON_GROWL",
  "PHANTOM_BITE",
  "ZOMBIE_CONVERTED_TO_DROWNED",
  "HUSK_CONVERTED_TO_ZOMBIE",
  "GRINDSTONE_USE",
  "BOOK_PAGE_TURN",
  "SMITHING_TABLE_USE",
  "POINTED_DRIPSTONE_LAND",
  "POINTED_DRIPSTONE_DRIP_LAVA_INTO_CAULDRON",
  "POINTED_DRIPSTONE_DRIP_WATER_INTO_CAULDRON",
  "SKELETON_CONVERTED_TO_STRAY",
  "COMPOSTER_FILL_ATTEMPT",
  "LAVA_INTERACT",
  "REDSTONE_TORCH_BURNOUT",
  "END_PORTAL_FRAME_FILL",
  "DRIPPING_DRIPSTONE",
  "BONE_MEAL_USE",
  "ENDER_DRAGON_DESTROY_BLOCK",
  "SPONGE_DRY",
  "ELECTRIC_SPARK",
  "COPPER_WAX_ON",
  "COPPER_WAX_OFF",
  "OXIDISED_COPPER_SCRAPE",
] as const;

/**
 * Deprecated door effects.
 */
export const DEPRECATED_DOOR_EFFECTS: readonly EffectName[] = [
  "DOOR_TOGGLE",
  "IRON_DOOR_TOGGLE",
  "TRAPDOOR_TOGGLE",
  "IRON_TRAPDOOR_TOGGLE",
  "FENCE_GATE_TOGGLE",
  "DOOR_CLOSE",
  "IRON_DOOR_CLOSE",
  "TRAPDOOR_CLOSE",
  "IRON_TRAPDOOR_CLOSE",
  "FENCE_GATE_CLOSE",
] as const;

// ============================================
// CATEGORIZATION
// ============================================

/**
 * Mob-related sound effects.
 */
export const MOB_SOUND_EFFECTS: readonly EffectName[] = [
  "GHAST_SHRIEK",
  "GHAST_SHOOT",
  "BLAZE_SHOOT",
  "ZOMBIE_CHEW_WOODEN_DOOR",
  "ZOMBIE_CHEW_IRON_DOOR",
  "ZOMBIE_DESTROY_DOOR",
  "BAT_TAKEOFF",
  "PHANTOM_BITE",
  "ENDERDRAGON_SHOOT",
  "ENDERDRAGON_GROWL",
  "WITHER_SHOOT",
  "WITHER_BREAK_BLOCK",
] as const;

/**
 * Conversion sound effects.
 */
export const CONVERSION_EFFECTS: readonly EffectName[] = [
  "ZOMBIE_INFECT",
  "ZOMBIE_CONVERTED_VILLAGER",
  "ZOMBIE_CONVERTED_TO_DROWNED",
  "HUSK_CONVERTED_TO_ZOMBIE",
  "SKELETON_CONVERTED_TO_STRAY",
] as const;

/**
 * Block-related effects.
 */
export const BLOCK_EFFECTS: readonly EffectName[] = [
  "BREWING_STAND_BREW",
  "CHORUS_FLOWER_GROW",
  "CHORUS_FLOWER_DEATH",
  "ANVIL_BREAK",
  "ANVIL_USE",
  "ANVIL_LAND",
  "GRINDSTONE_USE",
  "SMITHING_TABLE_USE",
  "STEP_SOUND",
] as const;

/**
 * Portal-related effects.
 */
export const PORTAL_EFFECTS: readonly EffectName[] = [
  "PORTAL_TRAVEL",
  "END_GATEWAY_SPAWN",
  "END_PORTAL_FRAME_FILL",
  "ENDER_SIGNAL",
  "ENDEREYE_LAUNCH",
] as const;

/**
 * Dripstone-related effects.
 */
export const DRIPSTONE_EFFECTS: readonly EffectName[] = [
  "POINTED_DRIPSTONE_LAND",
  "POINTED_DRIPSTONE_DRIP_LAVA_INTO_CAULDRON",
  "POINTED_DRIPSTONE_DRIP_WATER_INTO_CAULDRON",
  "DRIPPING_DRIPSTONE",
] as const;

/**
 * Copper-related effects.
 */
export const COPPER_EFFECTS: readonly EffectName[] = [
  "COPPER_WAX_ON",
  "COPPER_WAX_OFF",
  "OXIDISED_COPPER_SCRAPE",
  "ELECTRIC_SPARK",
] as const;

/**
 * Plant growth effects.
 */
export const PLANT_EFFECTS: readonly EffectName[] = [
  "VILLAGER_PLANT_GROW",
  "BONE_MEAL_USE",
] as const;

/**
 * Visual-only effects.
 */
export const VISUAL_EFFECTS: readonly EffectName[] = [
  "SMOKE",
  "POTION_BREAK",
  "INSTANT_POTION_BREAK",
  "ENDER_SIGNAL",
  "MOBSPAWNER_FLAMES",
  "DRAGON_BREATH",
  "ENDER_DRAGON_DESTROY_BLOCK",
  "SPONGE_DRY",
  "DRIPPING_DRIPSTONE",
  "COPPER_WAX_OFF",
  "OXIDISED_COPPER_SCRAPE",
  "ELECTRIC_SPARK",
] as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all Effect values.
 */
export function getEffects(): BukkitEffect[] {
  return enumValues(Effect);
}

/**
 * Get Effect by name.
 * 
 * @throws IllegalArgumentException if name is invalid
 */
export function getEffect(name: EffectName): BukkitEffect {
  return enumValueOf(Effect, name);
}

/**
 * Get Effect by name safely.
 * 
 * @returns Effect or null if invalid
 */
export function getEffectSafe(name: string): BukkitEffect | null {
  try {
    return enumValueOf(Effect, name.toUpperCase());
  } catch {
    return null;
  }
}

/**
 * Check if a name is a valid Effect name.
 */
export function isEffectName(name: string): name is EffectName {
  return EFFECT_NAMES.includes(name.toUpperCase() as EffectName);
}

// ============================================
// TYPE CHECKS
// ============================================

/**
 * Check if effect is a sound effect.
 */
export function isSoundEffect(effect: BukkitEffect): boolean {
  return effect.getType().name() === "SOUND";
}

/**
 * Check if effect is a visual effect.
 */
export function isVisualEffect(effect: BukkitEffect): boolean {
  return effect.getType().name() === "VISUAL";
}

/**
 * Check if effect requires data.
 */
export function requiresData(effect: BukkitEffect): boolean {
  return effect.getData() !== null;
}

/**
 * Check if effect is deprecated.
 */
export function isDeprecatedEffect(effect: BukkitEffect): boolean {
  return DEPRECATED_DOOR_EFFECTS.includes(effect.name() as EffectName);
}

/**
 * Check if effect is mob-related.
 */
export function isMobEffect(effect: BukkitEffect): boolean {
  return MOB_SOUND_EFFECTS.includes(effect.name() as EffectName);
}

/**
 * Check if effect is conversion-related.
 */
export function isConversionEffect(effect: BukkitEffect): boolean {
  return CONVERSION_EFFECTS.includes(effect.name() as EffectName);
}

/**
 * Check if effect is block-related.
 */
export function isBlockEffect(effect: BukkitEffect): boolean {
  return BLOCK_EFFECTS.includes(effect.name() as EffectName);
}

/**
 * Check if effect is portal-related.
 */
export function isPortalEffect(effect: BukkitEffect): boolean {
  return PORTAL_EFFECTS.includes(effect.name() as EffectName);
}

/**
 * Check if effect is dripstone-related.
 */
export function isDripstoneEffect(effect: BukkitEffect): boolean {
  return DRIPSTONE_EFFECTS.includes(effect.name() as EffectName);
}

/**
 * Check if effect is copper-related.
 */
export function isCopperEffect(effect: BukkitEffect): boolean {
  return COPPER_EFFECTS.includes(effect.name() as EffectName);
}

/**
 * Check if effect is plant-related.
 */
export function isPlantEffect(effect: BukkitEffect): boolean {
  return PLANT_EFFECTS.includes(effect.name() as EffectName);
}

// ============================================
// FILTER FUNCTIONS
// ============================================

/**
 * Get all sound effects.
 */
export function getSoundEffects(): BukkitEffect[] {
  return getEffects().filter(isSoundEffect);
}

/**
 * Get all visual effects.
 */
export function getVisualEffects(): BukkitEffect[] {
  return getEffects().filter(isVisualEffect);
}

/**
 * Get all effects that require data.
 */
export function getEffectsRequiringData(): BukkitEffect[] {
  return getEffects().filter(requiresData);
}

/**
 * Get all non-deprecated effects.
 */
export function getActiveEffects(): BukkitEffect[] {
  return getEffects().filter(e => !isDeprecatedEffect(e));
}

// ============================================
// DISPLAY NAMES
// ============================================

/**
 * Display names for common effects.
 */
export const EFFECT_DISPLAY_NAMES: Partial<Record<EffectName, string>> = {
  CLICK1: "Click",
  CLICK2: "Alternate Click",
  BOW_FIRE: "Bow Fire",
  EXTINGUISH: "Fire Extinguish",
  RECORD_PLAY: "Record Play",
  GHAST_SHRIEK: "Ghast Shriek",
  GHAST_SHOOT: "Ghast Shoot",
  BLAZE_SHOOT: "Blaze Shoot",
  SMOKE: "Smoke",
  STEP_SOUND: "Block Break",
  POTION_BREAK: "Potion Break",
  ENDER_SIGNAL: "Ender Signal",
  MOBSPAWNER_FLAMES: "Spawner Flames",
  BREWING_STAND_BREW: "Brewing",
  PORTAL_TRAVEL: "Portal Travel",
  DRAGON_BREATH: "Dragon Breath",
  ANVIL_BREAK: "Anvil Break",
  ANVIL_USE: "Anvil Use",
  ANVIL_LAND: "Anvil Land",
  BONE_MEAL_USE: "Bone Meal",
  ZOMBIE_INFECT: "Zombie Infect",
  END_GATEWAY_SPAWN: "End Gateway Spawn",
  COPPER_WAX_ON: "Wax Applied",
  COPPER_WAX_OFF: "Wax Removed",
};

/**
 * Get display name for effect.
 */
export function getEffectDisplayName(effect: BukkitEffect): string {
  const name = effect.name() as EffectName;
  return EFFECT_DISPLAY_NAMES[name] ?? name.replace(/_/g, " ").toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe an effect.
 */
export function describeEffect(effect: BukkitEffect): string {
  const displayName = getEffectDisplayName(effect);
  const type = effect.getType().name().toLowerCase();
  const requiresDataStr = requiresData(effect) ? ", requires data" : "";
  const deprecated = isDeprecatedEffect(effect) ? " (deprecated)" : "";
  
  return `${displayName} (${type}${requiresDataStr})${deprecated}`;
}

/**
 * Get effect info as plain object.
 */
export function getEffectInfo(effect: BukkitEffect): {
  name: EffectName;
  displayName: string;
  id: number;
  type: string;
  requiresData: boolean;
  dataType: string | null;
  isDeprecated: boolean;
  category: string;
} {
  const name = effect.name() as EffectName;
  const dataClass = effect.getData();
  
  let category = "other";
  if (isMobEffect(effect)) category = "mob";
  else if (isConversionEffect(effect)) category = "conversion";
  else if (isBlockEffect(effect)) category = "block";
  else if (isPortalEffect(effect)) category = "portal";
  else if (isDripstoneEffect(effect)) category = "dripstone";
  else if (isCopperEffect(effect)) category = "copper";
  else if (isPlantEffect(effect)) category = "plant";
  
  return {
    name,
    displayName: getEffectDisplayName(effect),
    id: effect.getId(),
    type: effect.getType().name(),
    requiresData: dataClass !== null,
    dataType: dataClass?.getSimpleName?.() ?? null,
    isDeprecated: isDeprecatedEffect(effect),
    category,
  };
}

/**
 * Get summary of effects.
 */
export function getEffectSummary(): {
  total: number;
  sound: number;
  visual: number;
  deprecated: number;
  requiresData: number;
  byCategory: Record<string, number>;
} {
  const effects = getEffects();
  
  let sound = 0;
  let visual = 0;
  let deprecated = 0;
  let requiresDataCount = 0;
  const byCategory: Record<string, number> = {
    mob: 0,
    conversion: 0,
    block: 0,
    portal: 0,
    dripstone: 0,
    copper: 0,
    plant: 0,
    other: 0,
  };
  
  for (const effect of effects) {
    if (isSoundEffect(effect)) sound++;
    if (isVisualEffect(effect)) visual++;
    if (isDeprecatedEffect(effect)) deprecated++;
    if (requiresData(effect)) requiresDataCount++;
    
    if (isMobEffect(effect)) byCategory.mob++;
    else if (isConversionEffect(effect)) byCategory.conversion++;
    else if (isBlockEffect(effect)) byCategory.block++;
    else if (isPortalEffect(effect)) byCategory.portal++;
    else if (isDripstoneEffect(effect)) byCategory.dripstone++;
    else if (isCopperEffect(effect)) byCategory.copper++;
    else if (isPlantEffect(effect)) byCategory.plant++;
    else byCategory.other++;
  }
  
  return {
    total: effects.length,
    sound,
    visual,
    deprecated,
    requiresData: requiresDataCount,
    byCategory,
  };
}