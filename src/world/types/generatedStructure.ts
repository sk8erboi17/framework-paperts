/**
 * DESIGN
 * ------
 * GeneratedStructure represents a structure that has been placed in the world.
 * 
 * STRUCTURE PLACEMENT:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │              STRUCTURE vs GENERATED STRUCTURE               │
 *   │                                                             │
 *   │   Structure (template)      GeneratedStructure (instance)   │
 *   │   ────────────────────      ─────────────────────────────   │
 *   │                                                             │
 *   │   "What can generate"       "What has generated"            │
 *   │   - Definition              - Actual placement              │
 *   │   - Type info               - World position                │
 *   │   - Registry entry          - Bounding box                  │
 *   │                             - Individual pieces             │
 *   │                             - Persistent data               │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * GENERATED STRUCTURE COMPOSITION:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │              GENERATED STRUCTURE (Village)                  │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │              Bounding Box (entire area)             │   │
 *   │   │  ┌───────────────────────────────────────────────┐  │   │
 *   │   │  │                                               │  │   │
 *   │   │  │   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐       │  │   │
 *   │   │  │   │House│   │House│   │Well │   │Farm │       │  │   │
 *   │   │  │   │  1  │   │  2  │   │     │   │     │       │  │   │
 *   │   │  │   └─────┘   └─────┘   └─────┘   └─────┘       │  │   │
 *   │   │  │        StructurePieces (individual parts)     │  │   │
 *   │   │  │                                               │  │   │
 *   │   │  │   ┌─────────────┐   ┌──────┐                  │  │   │
 *   │   │  │   │   Church    │   │ Path │                  │  │   │
 *   │   │  │   │             │   │      │                  │  │   │
 *   │   │  │   └─────────────┘   └──────┘                  │  │   │
 *   │   │  │                                               │  │   │
 *   │   │  └───────────────────────────────────────────────┘  │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   │   getStructure() -> Structure.VILLAGE_PLAINS                │
 *   │   getBoundingBox() -> Overall bounds                        │
 *   │   getPieces() -> [House1, House2, Well, Farm, Church, Path] │
 *   │   getPersistentDataContainer() -> Custom data storage       │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * USE CASES:
 * - Find structures near a location
 * - Check if player is inside a structure
 * - Iterate through structure pieces
 * - Store custom data on structures
 * - Calculate structure dimensions
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/generator/structure/GeneratedStructure.html
 */

import { JavaCollection } from "../../java/types/collections";
import { BukkitBoundingBox } from "./boundingBox";
import { BukkitPersistentDataContainer, BukkitPersistentDataHolder } from "./persistentData";
import { BukkitStructure } from "./structure";
import { BukkitStructurePiece, getPieceVolume } from "./structurePiece";

// ============================================
// INTERFACE
// ============================================

/**
 * A structure that has been placed in the world.
 * 
 * Contains the structure type, bounding box, all pieces,
 * and can store custom persistent data.
 */
export interface BukkitGeneratedStructure extends BukkitPersistentDataHolder {
  /**
   * Get the bounding box of the entire structure.
   * 
   * This encompasses all structure pieces.
   * 
   * @returns BoundingBox of the structure
   * 
   * @example
   * const box = structure.getBoundingBox();
   * const width = box.getWidthX();
   * const height = box.getHeight();
   */
  getBoundingBox(): BukkitBoundingBox;

  /**
   * Get the Structure type that was placed.
   * 
   * @returns The Structure template
   * 
   * @example
   * const structure = generated.getStructure();
   * console.log(`Type: ${structure.getKey()}`);
   */
  getStructure(): BukkitStructure;

  /**
   * Get all pieces that make up this structure.
   * 
   * Each piece is a separate part (house, well, path, etc.).
   * 
   * @returns Collection of StructurePieces
   * 
   * @example
   * const pieces = getPiecesArray(structure);
   * console.log(`Structure has ${pieces.length} pieces`);
   */
  getPieces(): JavaCollection<BukkitStructurePiece>;

  /**
   * Get the persistent data container.
   * Inherited from PersistentDataHolder.
   * 
   * @returns Container for custom data
   */
  getPersistentDataContainer(): BukkitPersistentDataContainer;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a GeneratedStructure.
 */
export function isGeneratedStructure(obj: any): obj is BukkitGeneratedStructure {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getBoundingBox === "function" &&
         typeof obj.getStructure === "function" &&
         typeof obj.getPieces === "function" &&
         typeof obj.getPersistentDataContainer === "function";
}

// ============================================
// PIECES UTILITIES
// ============================================

/**
 * Get structure pieces as array.
 */
export function getPiecesArray(structure: BukkitGeneratedStructure): BukkitStructurePiece[] {
  const collection = structure.getPieces();
  const result: BukkitStructurePiece[] = [];
  
  if (typeof collection.iterator === "function") {
    const iter = collection.iterator();
    while (iter.hasNext()) {
      result.push(iter.next());
    }
  }
  
  return result;
}

/**
 * Get the number of pieces in the structure.
 */
export function getPieceCount(structure: BukkitGeneratedStructure): number {
  const collection = structure.getPieces();
  return typeof collection.size === "function" ? collection.size() : 0;
}

/**
 * Check if structure has multiple pieces.
 */
export function hasMultiplePieces(structure: BukkitGeneratedStructure): boolean {
  return getPieceCount(structure) > 1;
}

/**
 * Check if structure is a single piece.
 */
export function isSinglePiece(structure: BukkitGeneratedStructure): boolean {
  return getPieceCount(structure) === 1;
}

// ============================================
// DIMENSION UTILITIES
// ============================================

/**
 * Get the width (X axis) of the structure.
 */
export function getStructureWidth(structure: BukkitGeneratedStructure): number {
  return structure.getBoundingBox().getWidthX();
}

/**
 * Get the height (Y axis) of the structure.
 */
export function getStructureHeight(structure: BukkitGeneratedStructure): number {
  return structure.getBoundingBox().getHeight();
}

/**
 * Get the depth (Z axis) of the structure.
 */
export function getStructureDepth(structure: BukkitGeneratedStructure): number {
  return structure.getBoundingBox().getWidthZ();
}

/**
 * Get all dimensions of the structure.
 */
export function getStructureDimensions(structure: BukkitGeneratedStructure): {
  width: number;
  height: number;
  depth: number;
} {
  const box = structure.getBoundingBox();
  return {
    width: box.getWidthX(),
    height: box.getHeight(),
    depth: box.getWidthZ(),
  };
}

/**
 * Get the volume of the structure bounding box.
 */
export function getStructureVolume(structure: BukkitGeneratedStructure): number {
  return structure.getBoundingBox().getVolume();
}

/**
 * Get total volume of all pieces (may be less than bounding box).
 */
export function getTotalPiecesVolume(structure: BukkitGeneratedStructure): number {
  const pieces = getPiecesArray(structure);
  let total = 0;
  
  for (const piece of pieces) {
    total += getPieceVolume(piece);
  }
  
  return total;
}

// ============================================
// POSITION UTILITIES
// ============================================

/**
 * Get the center of the structure.
 */
export function getStructureCenter(structure: BukkitGeneratedStructure): {
  x: number;
  y: number;
  z: number;
} {
  const box = structure.getBoundingBox();
  return {
    x: box.getCenterX(),
    y: box.getCenterY(),
    z: box.getCenterZ(),
  };
}

/**
 * Get the minimum corner of the structure.
 */
export function getStructureMin(structure: BukkitGeneratedStructure): {
  x: number;
  y: number;
  z: number;
} {
  const box = structure.getBoundingBox();
  return {
    x: box.getMinX(),
    y: box.getMinY(),
    z: box.getMinZ(),
  };
}

/**
 * Get the maximum corner of the structure.
 */
export function getStructureMax(structure: BukkitGeneratedStructure): {
  x: number;
  y: number;
  z: number;
} {
  const box = structure.getBoundingBox();
  return {
    x: box.getMaxX(),
    y: box.getMaxY(),
    z: box.getMaxZ(),
  };
}

// ============================================
// LOCATION CHECKS
// ============================================

/**
 * Check if a location is inside the structure.
 */
export function isInsideStructure(
  structure: BukkitGeneratedStructure,
  x: number,
  y: number,
  z: number
): boolean {
  return structure.getBoundingBox().contains(x, y, z);
}

/**
 * Check if a location is within structure bounds (XZ only).
 */
export function isWithinStructureXZ(
  structure: BukkitGeneratedStructure,
  x: number,
  z: number
): boolean {
  const box = structure.getBoundingBox();
  return x >= box.getMinX() && x <= box.getMaxX() &&
         z >= box.getMinZ() && z <= box.getMaxZ();
}

/**
 * Check if a location is inside any piece of the structure.
 */
export function isInsideAnyPiece(
  structure: BukkitGeneratedStructure,
  x: number,
  y: number,
  z: number
): boolean {
  const pieces = getPiecesArray(structure);
  
  for (const piece of pieces) {
    if (piece.getBoundingBox().contains(x, y, z)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Find which piece contains a location.
 */
export function findPieceAt(
  structure: BukkitGeneratedStructure,
  x: number,
  y: number,
  z: number
): BukkitStructurePiece | null {
  const pieces = getPiecesArray(structure);
  
  for (const piece of pieces) {
    if (piece.getBoundingBox().contains(x, y, z)) {
      return piece;
    }
  }
  
  return null;
}

/**
 * Find all pieces that contain a location.
 */
export function findPiecesAt(
  structure: BukkitGeneratedStructure,
  x: number,
  y: number,
  z: number
): BukkitStructurePiece[] {
  const pieces = getPiecesArray(structure);
  return pieces.filter(piece => piece.getBoundingBox().contains(x, y, z));
}

// ============================================
// DISTANCE UTILITIES
// ============================================

/**
 * Get distance from a point to structure center.
 */
export function getDistanceToStructure(
  structure: BukkitGeneratedStructure,
  x: number,
  y: number,
  z: number
): number {
  const center = getStructureCenter(structure);
  const dx = x - center.x;
  const dy = y - center.y;
  const dz = z - center.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Get horizontal distance from a point to structure center.
 */
export function getHorizontalDistanceToStructure(
  structure: BukkitGeneratedStructure,
  x: number,
  z: number
): number {
  const center = getStructureCenter(structure);
  const dx = x - center.x;
  const dz = z - center.z;
  return Math.sqrt(dx * dx + dz * dz);
}

/**
 * Get distance between two structures.
 */
export function getDistanceBetweenStructures(
  structure1: BukkitGeneratedStructure,
  structure2: BukkitGeneratedStructure
): number {
  const center1 = getStructureCenter(structure1);
  const center2 = getStructureCenter(structure2);
  const dx = center1.x - center2.x;
  const dy = center1.y - center2.y;
  const dz = center1.z - center2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// ============================================
// STRUCTURE TYPE UTILITIES
// ============================================

/**
 * Get the structure type key.
 */
export function getGeneratedStructureKey(structure: BukkitGeneratedStructure): string | null {
  try {
    return structure.getStructure().getKeyOrThrow().toString();
  } catch {
    return null;
  }
}

/**
 * Get the structure type name.
 */
export function getGeneratedStructureName(structure: BukkitGeneratedStructure): string | null {
  try {
    return structure.getStructure().getKeyOrThrow().getKey();
  } catch {
    return null;
  }
}

/**
 * Check if structure is of a specific type.
 */
export function isStructureOfType(
  structure: BukkitGeneratedStructure,
  typeName: string
): boolean {
  const name = getGeneratedStructureName(structure);
  return name !== null && name.toUpperCase() === typeName.toUpperCase();
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Find the nearest generated structure to a location.
 */
export function findNearestStructure(
  structures: BukkitGeneratedStructure[],
  x: number,
  y: number,
  z: number
): BukkitGeneratedStructure | null {
  if (structures.length === 0) return null;
  
  let nearest = structures[0];
  let nearestDist = getDistanceToStructure(structures[0], x, y, z);
  
  for (let i = 1; i < structures.length; i++) {
    const dist = getDistanceToStructure(structures[i], x, y, z);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = structures[i];
    }
  }
  
  return nearest;
}

/**
 * Find structures containing a location.
 */
export function findStructuresContaining(
  structures: BukkitGeneratedStructure[],
  x: number,
  y: number,
  z: number
): BukkitGeneratedStructure[] {
  return structures.filter(s => isInsideStructure(s, x, y, z));
}

/**
 * Find structures within range of a location.
 */
export function findStructuresInRange(
  structures: BukkitGeneratedStructure[],
  x: number,
  y: number,
  z: number,
  range: number
): BukkitGeneratedStructure[] {
  return structures.filter(s => getDistanceToStructure(s, x, y, z) <= range);
}

/**
 * Filter structures by type.
 */
export function filterStructuresByType(
  structures: BukkitGeneratedStructure[],
  typeName: string
): BukkitGeneratedStructure[] {
  return structures.filter(s => isStructureOfType(s, typeName));
}

/**
 * Get the largest structure by volume.
 */
export function findLargestStructure(
  structures: BukkitGeneratedStructure[]
): BukkitGeneratedStructure | null {
  if (structures.length === 0) return null;
  
  let largest = structures[0];
  let largestVolume = getStructureVolume(structures[0]);
  
  for (let i = 1; i < structures.length; i++) {
    const volume = getStructureVolume(structures[i]);
    if (volume > largestVolume) {
      largestVolume = volume;
      largest = structures[i];
    }
  }
  
  return largest;
}

/**
 * Get the smallest structure by volume.
 */
export function findSmallestStructure(
  structures: BukkitGeneratedStructure[]
): BukkitGeneratedStructure | null {
  if (structures.length === 0) return null;
  
  let smallest = structures[0];
  let smallestVolume = getStructureVolume(structures[0]);
  
  for (let i = 1; i < structures.length; i++) {
    const volume = getStructureVolume(structures[i]);
    if (volume < smallestVolume) {
      smallestVolume = volume;
      smallest = structures[i];
    }
  }
  
  return smallest;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a generated structure.
 */
export function describeGeneratedStructure(structure: BukkitGeneratedStructure): string {
  const name = getGeneratedStructureName(structure) ?? "Unknown";
  const pieceCount = getPieceCount(structure);
  const center = getStructureCenter(structure);
  
  return `${name} at (${center.x.toFixed(0)}, ${center.y.toFixed(0)}, ${center.z.toFixed(0)}) with ${pieceCount} piece(s)`;
}

/**
 * Get generated structure info as plain object.
 */
export function getGeneratedStructureInfo(structure: BukkitGeneratedStructure): {
  key: string | null;
  name: string | null;
  dimensions: { width: number; height: number; depth: number };
  volume: number;
  center: { x: number; y: number; z: number };
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
  pieceCount: number;
  totalPiecesVolume: number;
  hasPersistentData: boolean;
} {
  return {
    key: getGeneratedStructureKey(structure),
    name: getGeneratedStructureName(structure),
    dimensions: getStructureDimensions(structure),
    volume: getStructureVolume(structure),
    center: getStructureCenter(structure),
    min: getStructureMin(structure),
    max: getStructureMax(structure),
    pieceCount: getPieceCount(structure),
    totalPiecesVolume: getTotalPiecesVolume(structure),
    hasPersistentData: !structure.getPersistentDataContainer().isEmpty(),
  };
}

/**
 * Get summary of multiple generated structures.
 */
export function getGeneratedStructureSummary(structures: BukkitGeneratedStructure[]): {
  total: number;
  totalPieces: number;
  totalVolume: number;
  averagePieceCount: number;
  typeCount: Map<string, number>;
  largestVolume: number;
  smallestVolume: number;
} {
  if (structures.length === 0) {
    return {
      total: 0,
      totalPieces: 0,
      totalVolume: 0,
      averagePieceCount: 0,
      typeCount: new Map(),
      largestVolume: 0,
      smallestVolume: 0,
    };
  }
  
  let totalPieces = 0;
  let totalVolume = 0;
  let largestVolume = 0;
  let smallestVolume = Number.MAX_VALUE;
  const typeCount = new Map<string, number>();
  
  for (const structure of structures) {
    totalPieces += getPieceCount(structure);
    
    const volume = getStructureVolume(structure);
    totalVolume += volume;
    
    if (volume > largestVolume) largestVolume = volume;
    if (volume < smallestVolume) smallestVolume = volume;
    
    const name = getGeneratedStructureName(structure) ?? "unknown";
    typeCount.set(name, (typeCount.get(name) ?? 0) + 1);
  }
  
  return {
    total: structures.length,
    totalPieces,
    totalVolume,
    averagePieceCount: totalPieces / structures.length,
    typeCount,
    largestVolume,
    smallestVolume: smallestVolume === Number.MAX_VALUE ? 0 : smallestVolume,
  };
}