// sound/enums/instrument.ts

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";
import { BukkitSound } from "../../sounds/types/soundType";

/**
 * Instrument - Enum of all note block instruments.
 * 
 * Each instrument is triggered by placing specific blocks
 * under (or heads on top of) a note block.
 * 
 * BLOCK-BASED INSTRUMENTS:
 * ┌─────────────────┬──────────────────────────────┐
 * │   Instrument    │      Block Underneath        │
 * ├─────────────────┼──────────────────────────────┤
 * │ PIANO           │ Any other / Air (default)    │
 * │ BASS_DRUM       │ Stone, Netherrack, Obsidian  │
 * │ SNARE_DRUM      │ Sand, Gravel, Concrete Pow.  │
 * │ STICKS          │ Glass, Sea Lantern           │
 * │ BASS_GUITAR     │ Wood (logs, planks)          │
 * │ FLUTE           │ Clay                         │
 * │ BELL            │ Gold Block                   │
 * │ GUITAR          │ Wool                         │
 * │ CHIME           │ Packed Ice                   │
 * │ XYLOPHONE       │ Bone Block                   │
 * │ IRON_XYLOPHONE  │ Iron Block                   │
 * │ COW_BELL        │ Soul Sand                    │
 * │ DIDGERIDOO      │ Pumpkin                      │
 * │ BIT             │ Emerald Block                │
 * │ BANJO           │ Hay Block                    │
 * │ PLING           │ Glowstone                    │
 * └─────────────────┴──────────────────────────────┘
 * 
 * HEAD-BASED INSTRUMENTS (head ON TOP of note block):
 * ┌─────────────────┬──────────────────────────────┐
 * │   Instrument    │         Head Type            │
 * ├─────────────────┼──────────────────────────────┤
 * │ ZOMBIE          │ Zombie Head                  │
 * │ SKELETON        │ Skeleton Skull               │
 * │ CREEPER         │ Creeper Head                 │
 * │ DRAGON          │ Dragon Head                  │
 * │ WITHER_SKELETON │ Wither Skeleton Skull        │
 * │ PIGLIN          │ Piglin Head                  │
 * │ CUSTOM_HEAD     │ Player Head (with sound)     │
 * └─────────────────┴──────────────────────────────┘
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Instrument.html
 */
export type InstrumentKey =
  | "PIANO"
  | "BASS_DRUM"
  | "SNARE_DRUM"
  | "STICKS"
  | "BASS_GUITAR"
  | "FLUTE"
  | "BELL"
  | "GUITAR"
  | "CHIME"
  | "XYLOPHONE"
  | "IRON_XYLOPHONE"
  | "COW_BELL"
  | "DIDGERIDOO"
  | "BIT"
  | "BANJO"
  | "PLING"
  | "ZOMBIE"
  | "SKELETON"
  | "CREEPER"
  | "DRAGON"
  | "WITHER_SKELETON"
  | "PIGLIN"
  | "CUSTOM_HEAD";

export interface BukkitInstrument extends JavaEnum<InstrumentKey> {
  /**
   * Gets the sound associated with this instrument.
   * 
   * @returns The Sound, or null for CUSTOM_HEAD
   */
  getSound(): BukkitSound | null;

  /**
   * Returns the type ID of this instrument.
   * @deprecated Magic value
   */
  getType(): number;
}

interface InstrumentClass extends
  Omit<Record<InstrumentKey, BukkitInstrument>, keyof JavaEnumClass<BukkitInstrument>>,
  JavaEnumClass<BukkitInstrument> {
  /**
   * Get an instrument by its type ID.
   * 
   * @param type The type ID
   * @returns The instrument, or null if not found
   * @deprecated Magic value
   */
  getByType(type: number): BukkitInstrument | null;
}

export const Instrument: InstrumentClass = {
  // ==========================================
  // STANDARD BLOCK-BASED INSTRUMENTS
  // ==========================================

  /**
   * Piano is the standard instrument for a note block.
   * 
   * Block: Any other block or air (default)
   * Sound: Harp/Piano
   */
  PIANO: org.bukkit.Instrument.PIANO,

  /**
   * Bass drum is normally played when a note block is on top of a stone-like block.
   * 
   * Blocks: Stone, Cobblestone, Netherrack, Nylium, Obsidian, 
   *         Quartz, Sandstone, Ores, Bricks, Corals, Respawn Anchor,
   *         Bedrock, Concrete, Stonecutter, Furnace, Observer
   */
  BASS_DRUM: org.bukkit.Instrument.BASS_DRUM,

  /**
   * Snare drum is normally played when a note block is on top of a sandy block.
   * 
   * Blocks: Sand, Gravel, Concrete Powder, Soul Sand/Soil (pre-1.14)
   */
  SNARE_DRUM: org.bukkit.Instrument.SNARE_DRUM,

  /**
   * Sticks (hi-hat) are normally played when a note block is on top of a glass block.
   * 
   * Blocks: Glass, Glass Pane, Beacon, Sea Lantern
   */
  STICKS: org.bukkit.Instrument.STICKS,

  /**
   * Bass guitar is normally played when a note block is on top of a wooden block.
   * 
   * Blocks: Wood, Logs, Planks, Fences, Gates, Signs,
   *         Note Block, Banners, Mushroom Blocks
   */
  BASS_GUITAR: org.bukkit.Instrument.BASS_GUITAR,

  /**
   * Flute is normally played when a note block is on top of a clay block.
   * 
   * Blocks: Clay, Honeycomb Block, Beehive/Bee Nest
   */
  FLUTE: org.bukkit.Instrument.FLUTE,

  /**
   * Bell is normally played when a note block is on top of a gold block.
   * 
   * Blocks: Gold Block
   */
  BELL: org.bukkit.Instrument.BELL,

  /**
   * Guitar is normally played when a note block is on top of a woolen block.
   * 
   * Blocks: Wool (any color)
   */
  GUITAR: org.bukkit.Instrument.GUITAR,

  /**
   * Chime is normally played when a note block is on top of a packed ice block.
   * 
   * Blocks: Packed Ice
   */
  CHIME: org.bukkit.Instrument.CHIME,

  /**
   * Xylophone is normally played when a note block is on top of a bone block.
   * 
   * Blocks: Bone Block
   */
  XYLOPHONE: org.bukkit.Instrument.XYLOPHONE,

  /**
   * Iron Xylophone is normally played when a note block is on top of an iron block.
   * 
   * Blocks: Iron Block
   */
  IRON_XYLOPHONE: org.bukkit.Instrument.IRON_XYLOPHONE,

  /**
   * Cow Bell is normally played when a note block is on top of a soul sand block.
   * 
   * Blocks: Soul Sand, Soul Soil
   */
  COW_BELL: org.bukkit.Instrument.COW_BELL,

  /**
   * Didgeridoo is normally played when a note block is on top of a pumpkin block.
   * 
   * Blocks: Pumpkin, Carved Pumpkin, Jack o'Lantern
   */
  DIDGERIDOO: org.bukkit.Instrument.DIDGERIDOO,

  /**
   * Bit (8-bit/chiptune) is normally played when a note block is on top of an emerald block.
   * 
   * Blocks: Emerald Block
   */
  BIT: org.bukkit.Instrument.BIT,

  /**
   * Banjo is normally played when a note block is on top of a hay block.
   * 
   * Blocks: Hay Bale
   */
  BANJO: org.bukkit.Instrument.BANJO,

  /**
   * Pling (electric piano) is normally played when a note block is on top of a glowstone block.
   * 
   * Blocks: Glowstone
   */
  PLING: org.bukkit.Instrument.PLING,

  // ==========================================
  // HEAD-BASED INSTRUMENTS (mob sounds)
  // ==========================================

  /**
   * Zombie is normally played when a Zombie Head is on top of the note block.
   * 
   * Sound: Zombie ambient sound
   */
  ZOMBIE: org.bukkit.Instrument.ZOMBIE,

  /**
   * Skeleton is normally played when a Skeleton Skull is on top of the note block.
   * 
   * Sound: Skeleton ambient sound
   */
  SKELETON: org.bukkit.Instrument.SKELETON,

  /**
   * Creeper is normally played when a Creeper Head is on top of the note block.
   * 
   * Sound: Creeper primed/hiss sound
   */
  CREEPER: org.bukkit.Instrument.CREEPER,

  /**
   * Dragon is normally played when a Dragon Head is on top of the note block.
   * 
   * Sound: Ender Dragon ambient sound
   */
  DRAGON: org.bukkit.Instrument.DRAGON,

  /**
   * Wither Skeleton is normally played when a Wither Skeleton Skull is on top of the note block.
   * 
   * Sound: Wither Skeleton ambient sound
   */
  WITHER_SKELETON: org.bukkit.Instrument.WITHER_SKELETON,

  /**
   * Piglin is normally played when a Piglin Head is on top of the note block.
   * 
   * Sound: Piglin ambient sound
   */
  PIGLIN: org.bukkit.Instrument.PIGLIN,

  /**
   * Custom Sound is normally played when a Player Head with the required
   * note_block_sound NBT data is on top of the note block.
   * 
   * Note: getSound() returns null for this instrument.
   */
  CUSTOM_HEAD: org.bukkit.Instrument.CUSTOM_HEAD,

  values(): BukkitInstrument[] {
    return org.bukkit.Instrument.values();
  },
  valueOf(name: string): BukkitInstrument {
    return org.bukkit.Instrument.valueOf(name);
  },
  getByType(type: number): BukkitInstrument | null {
    return (org.bukkit.Instrument as any).getByType(type);
  },
};

// ============================================
// HELPER TYPES & FUNCTIONS
// ============================================

/**
 * Categories of instruments
 */
export type InstrumentCategory = 
  | "melodic"      // Can play melodies (piano, flute, etc.)
  | "percussion"   // Drums and percussive sounds
  | "mob"          // Mob head sounds
  | "special";     // Custom head

/**
 * Get the category of an instrument.
 */
export function getInstrumentCategory(instrument: BukkitInstrument): InstrumentCategory {
  switch (instrument) {
    case Instrument.BASS_DRUM:
    case Instrument.SNARE_DRUM:
    case Instrument.STICKS:
    case Instrument.COW_BELL:
      return "percussion";
    
    case Instrument.ZOMBIE:
    case Instrument.SKELETON:
    case Instrument.CREEPER:
    case Instrument.DRAGON:
    case Instrument.WITHER_SKELETON:
    case Instrument.PIGLIN:
      return "mob";
    
    case Instrument.CUSTOM_HEAD:
      return "special";
    
    default:
      return "melodic";
  }
}

/**
 * Check if instrument is melodic (can play proper notes).
 */
export function isMelodic(instrument: BukkitInstrument): boolean {
  return getInstrumentCategory(instrument) === "melodic";
}

/**
 * Check if instrument is percussion.
 */
export function isPercussion(instrument: BukkitInstrument): boolean {
  return getInstrumentCategory(instrument) === "percussion";
}

/**
 * Check if instrument is mob-based (head sounds).
 */
export function isMobInstrument(instrument: BukkitInstrument): boolean {
  return getInstrumentCategory(instrument) === "mob";
}

/**
 * Get all melodic instruments.
 */
export function getMelodicInstruments(): BukkitInstrument[] {
  return Instrument.values().filter(isMelodic);
}

/**
 * Get all percussion instruments.
 */
export function getPercussionInstruments(): BukkitInstrument[] {
  return Instrument.values().filter(isPercussion);
}

/**
 * Get all mob head instruments.
 */
export function getMobInstruments(): BukkitInstrument[] {
  return Instrument.values().filter(isMobInstrument);
}

/**
 * Get human-readable name for an instrument.
 */
export function getInstrumentDisplayName(instrument: BukkitInstrument): string {
  const names: Record<string, string> = {
    PIANO: "Piano (Harp)",
    BASS_DRUM: "Bass Drum",
    SNARE_DRUM: "Snare Drum",
    STICKS: "Sticks (Hi-Hat)",
    BASS_GUITAR: "Bass Guitar",
    FLUTE: "Flute",
    BELL: "Bell",
    GUITAR: "Guitar",
    CHIME: "Chime",
    XYLOPHONE: "Xylophone",
    IRON_XYLOPHONE: "Iron Xylophone",
    COW_BELL: "Cow Bell",
    DIDGERIDOO: "Didgeridoo",
    BIT: "Bit (8-bit)",
    BANJO: "Banjo",
    PLING: "Pling (Electric Piano)",
    ZOMBIE: "Zombie",
    SKELETON: "Skeleton",
    CREEPER: "Creeper",
    DRAGON: "Ender Dragon",
    WITHER_SKELETON: "Wither Skeleton",
    PIGLIN: "Piglin",
    CUSTOM_HEAD: "Custom (Player Head)",
  };
  
  return names[instrument.name()] ?? instrument.name();
}

/**
 * Get the block needed underneath note block for this instrument.
 * Returns null for head-based instruments.
 */
export function getRequiredBlock(instrument: BukkitInstrument): string | null {
  const blocks: Record<string, string> = {
    PIANO: "Any other / Air",
    BASS_DRUM: "Stone, Netherrack, Obsidian, etc.",
    SNARE_DRUM: "Sand, Gravel, Concrete Powder",
    STICKS: "Glass, Sea Lantern",
    BASS_GUITAR: "Wood (Logs, Planks)",
    FLUTE: "Clay",
    BELL: "Gold Block",
    GUITAR: "Wool",
    CHIME: "Packed Ice",
    XYLOPHONE: "Bone Block",
    IRON_XYLOPHONE: "Iron Block",
    COW_BELL: "Soul Sand / Soul Soil",
    DIDGERIDOO: "Pumpkin",
    BIT: "Emerald Block",
    BANJO: "Hay Bale",
    PLING: "Glowstone",
  };
  
  return blocks[instrument.name()] ?? null;
}

/**
 * Get the head needed on top of note block for this instrument.
 * Returns null for block-based instruments.
 */
export function getRequiredHead(instrument: BukkitInstrument): string | null {
  const heads: Record<string, string> = {
    ZOMBIE: "Zombie Head",
    SKELETON: "Skeleton Skull",
    CREEPER: "Creeper Head",
    DRAGON: "Dragon Head",
    WITHER_SKELETON: "Wither Skeleton Skull",
    PIGLIN: "Piglin Head",
    CUSTOM_HEAD: "Player Head (with note_block_sound NBT)",
  };
  
  return heads[instrument.name()] ?? null;
}

/**
 * Get emoji/icon for an instrument.
 */
export function getInstrumentIcon(instrument: BukkitInstrument): string {
  const icons: Record<string, string> = {
    PIANO: "🎹",
    BASS_DRUM: "🥁",
    SNARE_DRUM: "🥁",
    STICKS: "🥢",
    BASS_GUITAR: "🎸",
    FLUTE: "🎵",
    BELL: "🔔",
    GUITAR: "🎸",
    CHIME: "🎐",
    XYLOPHONE: "🎵",
    IRON_XYLOPHONE: "🎵",
    COW_BELL: "🔔",
    DIDGERIDOO: "🎺",
    BIT: "🎮",
    BANJO: "🪕",
    PLING: "🎹",
    ZOMBIE: "🧟",
    SKELETON: "💀",
    CREEPER: "💥",
    DRAGON: "🐉",
    WITHER_SKELETON: "💀",
    PIGLIN: "🐷",
    CUSTOM_HEAD: "👤",
  };
  
  return icons[instrument.name()] ?? "🎵";
}