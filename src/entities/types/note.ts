// sound/types/note.ts

import { JavaEnum, JavaEnumClass } from "../../java/types/enum";

// ============================================
// NOTE.TONE ENUM
// ============================================

/**
 * Note.Tone - An enum holding musical tones.
 * 
 * Represents the 7 natural notes in Western music.
 * 
 * SEMITONE LAYOUT (one octave):
 * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
 * │ F │F#/│ G │G#/│ A │A#/│ B │ C │C#/│ D │D#/│ E │
 * │   │Gb │   │Ab │   │Bb │   │   │Db │   │Eb │   │
 * └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
 *   0   1   2   3   4   5   6   7   8   9  10  11
 * 
 * SHARPABLE NOTES:
 * - F, G, A, C, D can be sharped
 * - B and E CANNOT be sharped (B# = C, E# = F)
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Note.Tone.html
 */
export type ToneKey =
  | "G"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F";

export interface BukkitTone extends JavaEnum<ToneKey> {
  /**
   * Returns the ID of this tone.
   * 
   * @param sharped Whether to get the sharped ID
   * @returns The tone ID
   * @deprecated Magic value
   */
  getId(sharped?: boolean): number;

  /**
   * Returns if this tone can be sharped.
   * 
   * B and E cannot be sharped:
   * - B# would be C
   * - E# would be F
   * 
   * @returns true if sharpable
   */
  isSharpable(): boolean;
}

interface ToneClass extends
  Omit<Record<ToneKey, BukkitTone>, keyof JavaEnumClass<BukkitTone>>,
  JavaEnumClass<BukkitTone> {
  /**
   * Get a tone by its ID.
   * 
   * @param id The tone ID
   * @returns The tone
   * @deprecated Magic value
   */
  getById(id: number): BukkitTone;
}

export const Tone: ToneClass = {
  /**
   * G tone (Sol)
   * 
   * Sharpable: YES (G# / Ab)
   */
  G: org.bukkit.Note.Tone.G,

  /**
   * A tone (La)
   * 
   * Sharpable: YES (A# / Bb)
   */
  A: org.bukkit.Note.Tone.A,

  /**
   * B tone (Si)
   * 
   * Sharpable: NO (B# = C)
   */
  B: org.bukkit.Note.Tone.B,

  /**
   * C tone (Do)
   * 
   * Sharpable: YES (C# / Db)
   */
  C: org.bukkit.Note.Tone.C,

  /**
   * D tone (Re)
   * 
   * Sharpable: YES (D# / Eb)
   */
  D: org.bukkit.Note.Tone.D,

  /**
   * E tone (Mi)
   * 
   * Sharpable: NO (E# = F)
   */
  E: org.bukkit.Note.Tone.E,

  /**
   * F tone (Fa)
   * 
   * Sharpable: YES (F# / Gb)
   */
  F: org.bukkit.Note.Tone.F,

  values(): BukkitTone[] {
    return org.bukkit.Note.Tone.values();
  },
  valueOf(name: string): BukkitTone {
    return org.bukkit.Note.Tone.valueOf(name);
  },
  getById(id: number): BukkitTone {
    return (org.bukkit.Note.Tone as any).getById(id);
  },
};

// ============================================
// NOTE CLASS
// ============================================

/**
 * Note - A class to store a specific musical note.
 * 
 * A note consists of:
 * - Octave (0, 1, or 2)
 * - Tone (G, A, B, C, D, E, F)
 * - Sharp modifier (optional)
 * 
 * MINECRAFT NOTE BLOCK RANGE:
 * The note block spans 2 octaves + 1 note (F#0 to F#2):
 * 
 * ┌─────────────────────────────────────────────────────────────┐
 * │ Octave 0: F#0, G0, G#0, A0, A#0, B0                        │
 * │ Octave 1: C1, C#1, D1, D#1, E1, F1, F#1, G1, G#1, A1, A#1, B1 │
 * │ Octave 2: C2, C#2, D2, D#2, E2, F2, F#2                    │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * Total: 25 notes (IDs 0-24)
 * 
 * NOTE IDS:
 *  0 = F#0    6 = C1    12 = F#1   18 = C2    24 = F#2
 *  1 = G0     7 = C#1   13 = G1    19 = C#2
 *  2 = G#0    8 = D1    14 = G#1   20 = D2
 *  3 = A0     9 = D#1   15 = A1    21 = D#2
 *  4 = A#0   10 = E1    16 = A#1   22 = E2
 *  5 = B0    11 = F1    17 = B1    23 = F2
 * 
 * PITCH VALUES:
 * The pitch for playSound() follows the formula:
 * pitch = 2^((note - 12) / 12)
 * 
 * - Note 0 (F#0):  pitch ≈ 0.5
 * - Note 12 (F#1): pitch = 1.0
 * - Note 24 (F#2): pitch ≈ 2.0
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Note.html
 */
export interface BukkitNote {
  /**
   * Returns the octave of this note.
   * 
   * @returns 0, 1, or 2
   */
  getOctave(): number;

  /**
   * Returns the tone of this note.
   * 
   * @returns The Tone enum value
   */
  getTone(): BukkitTone;

  /**
   * Returns if this note is sharped.
   * 
   * @returns true if sharped (e.g., F#, C#)
   */
  isSharped(): boolean;

  /**
   * Returns the internal ID of this note.
   * 
   * @returns 0-24
   * @deprecated Magic value
   */
  getId(): number;

  /**
   * Gets the pitch of this note.
   * 
   * This is the value used with:
   * - World.playSound(location, sound, volume, pitch)
   * - Player.playSound(location, sound, volume, pitch)
   * - /playsound command
   * 
   * @returns Pitch value (0.5 to 2.0)
   */
  getPitch(): number;

  /**
   * Returns the note a semitone above this one.
   * 
   * @returns New Note one semitone higher
   */
  sharped(): BukkitNote;

  /**
   * Returns the note a semitone below this one.
   * 
   * @returns New Note one semitone lower
   */
  flattened(): BukkitNote;

  equals(obj: any): boolean;
  hashCode(): number;
  toString(): string;
}

/**
 * Note class with constructors and static factory methods.
 */
interface NoteClass {
  /**
   * Creates a new note by internal ID.
   * 
   * @param note Internal note ID (0-24)
   * @throws IllegalArgumentException if note not in [0, 24]
   */
  new(note: number): BukkitNote;

  /**
   * Creates a new note.
   * 
   * @param octave The octave (0-2)
   * @param tone The tone within the octave
   * @param sharped Whether the tone is sharped
   * @throws IllegalArgumentException if invalid combination
   * 
   * Note: If octave is 2, the only valid note is F# (tone=F, sharped=true)
   */
  new(octave: number, tone: BukkitTone, sharped: boolean): BukkitNote;

  /**
   * Creates a new note for a flat tone, such as A-flat.
   * 
   * A flat note is enharmonically equivalent to the sharp
   * of the note below (Ab = G#).
   * 
   * @param octave The octave (0-1)
   * @param tone The tone
   * @returns The new note
   */
  flat(octave: number, tone: BukkitTone): BukkitNote;

  /**
   * Creates a new note for a sharp tone, such as A-sharp.
   * 
   * @param octave The octave (0-2)
   * @param tone The tone (if octave 2, must be F)
   * @returns The new note
   */
  sharp(octave: number, tone: BukkitTone): BukkitNote;

  /**
   * Creates a new note for a natural tone, such as A-natural.
   * 
   * Natural means not sharped or flatted.
   * 
   * @param octave The octave (0-1)
   * @param tone The tone
   * @returns The new note
   */
  natural(octave: number, tone: BukkitTone): BukkitNote;

  /**
   * The Tone enum (nested class)
   */
  Tone: typeof Tone;
}

export const Note: NoteClass = org.bukkit.Note as any;

// Attach Tone to Note for Note.Tone access
(Note as any).Tone = Tone;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create a note from octave and tone name.
 */
export function createNote(
  octave: number,
  toneName: ToneKey,
  sharped: boolean = false
): BukkitNote {
  const tone = Tone[toneName];
  return new Note(octave, tone, sharped);
}

/**
 * Create a natural (non-sharped) note.
 */
export function naturalNote(octave: number, toneName: ToneKey): BukkitNote {
  return Note.natural(octave, Tone[toneName]);
}

/**
 * Create a sharp note.
 */
export function sharpNote(octave: number, toneName: ToneKey): BukkitNote {
  return Note.sharp(octave, Tone[toneName]);
}

/**
 * Create a flat note.
 */
export function flatNote(octave: number, toneName: ToneKey): BukkitNote {
  return Note.flat(octave, Tone[toneName]);
}

/**
 * Create a note from its ID (0-24).
 */
export function noteFromId(id: number): BukkitNote {
  return new Note(id);
}

/**
 * Get the lowest possible note (F#0).
 */
export function getLowestNote(): BukkitNote {
  return new Note(0);
}

/**
 * Get the highest possible note (F#2).
 */
export function getHighestNote(): BukkitNote {
  return new Note(24);
}

/**
 * Get the middle note (F#1).
 */
export function getMiddleNote(): BukkitNote {
  return new Note(12);
}

/**
 * Get note name in standard notation (e.g., "C#1", "Ab0").
 */
export function getNoteName(note: BukkitNote): string {
  const tone = note.getTone().name();
  const modifier = note.isSharped() ? "#" : "";
  const octave = note.getOctave();
  return `${tone}${modifier}${octave}`;
}

/**
 * Get note name with solfège (Do, Re, Mi, etc.)
 */
export function getSolfegeName(note: BukkitNote): string {
  const solfegeMap: Record<string, string> = {
    C: "Do",
    D: "Re",
    E: "Mi",
    F: "Fa",
    G: "Sol",
    A: "La",
    B: "Si",
  };
  
  const solfege = solfegeMap[note.getTone().name()];
  const modifier = note.isSharped() ? "#" : "";
  return `${solfege}${modifier}`;
}

/**
 * Check if a tone can be sharped.
 */
export function canBeSharpened(tone: BukkitTone): boolean {
  return tone.isSharpable();
}

/**
 * Get all 25 notes in order (F#0 to F#2).
 */
export function getAllNotes(): BukkitNote[] {
  const notes: BukkitNote[] = [];
  for (let id = 0; id <= 24; id++) {
    notes.push(new Note(id));
  }
  return notes;
}

/**
 * Get notes in a specific octave.
 */
export function getNotesInOctave(octave: number): BukkitNote[] {
  return getAllNotes().filter(note => note.getOctave() === octave);
}

/**
 * Calculate semitone distance between two notes.
 */
export function getSemitoneDistance(note1: BukkitNote, note2: BukkitNote): number {
  return Math.abs(note1.getId() - note2.getId());
}

/**
 * Transpose a note by a number of semitones.
 * 
 * @param note The original note
 * @param semitones Number of semitones (positive = up, negative = down)
 * @returns New transposed note, or null if out of range
 */
export function transpose(note: BukkitNote, semitones: number): BukkitNote | null {
  const newId = note.getId() + semitones;
  if (newId < 0 || newId > 24) {
    return null;
  }
  return new Note(newId);
}

/**
 * Check if note is within valid Minecraft range.
 */
export function isValidNoteId(id: number): boolean {
  return id >= 0 && id <= 24;
}

// ============================================
// MUSICAL SCALES
// ============================================

/**
 * Semitone patterns for common scales.
 */
export const ScalePatterns = {
  /** Major scale: W-W-H-W-W-W-H */
  MAJOR: [0, 2, 4, 5, 7, 9, 11],
  
  /** Natural minor scale: W-H-W-W-H-W-W */
  MINOR: [0, 2, 3, 5, 7, 8, 10],
  
  /** Pentatonic major: 5-note scale */
  PENTATONIC_MAJOR: [0, 2, 4, 7, 9],
  
  /** Pentatonic minor: 5-note scale */
  PENTATONIC_MINOR: [0, 3, 5, 7, 10],
  
  /** Blues scale */
  BLUES: [0, 3, 5, 6, 7, 10],
  
  /** Chromatic: all semitones */
  CHROMATIC: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

/**
 * Get notes in a scale starting from a root note.
 * 
 * @param rootId Starting note ID
 * @param pattern Scale pattern (semitone offsets)
 * @returns Array of notes in the scale (within valid range)
 */
export function getScale(
  rootId: number,
  pattern: number[] = ScalePatterns.MAJOR
): BukkitNote[] {
  const notes: BukkitNote[] = [];
  
  for (const offset of pattern) {
    const noteId = rootId + offset;
    if (isValidNoteId(noteId)) {
      notes.push(new Note(noteId));
    }
  }
  
  return notes;
}