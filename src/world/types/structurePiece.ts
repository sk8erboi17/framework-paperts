/**
 * DESIGN
 * ------
 * StructurePiece represents an individual part of a generated structure.
 * 
 * STRUCTURE COMPOSITION:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │              GENERATED STRUCTURE                            │
 *   │                                                             │
 *   │   ┌─────────────────────────────────────────────────────┐   │
 *   │   │                    VILLAGE                          │   │
 *   │   │                                                     │   │
 *   │   │   ┌───────────┐  ┌───────────┐  ┌───────────┐       │   │
 *   │   │   │  House 1  │  │  House 2  │  │   Well    │       │   │
 *   │   │   │  (piece)  │  │  (piece)  │  │  (piece)  │       │   │
 *   │   │   └───────────┘  └───────────┘  └───────────┘       │   │
 *   │   │                                                     │   │
 *   │   │   ┌───────────┐  ┌───────────┐  ┌───────────┐       │   │
 *   │   │   │   Path    │  │  Church   │  │  Farm     │       │   │
 *   │   │   │  (piece)  │  │  (piece)  │  │  (piece)  │       │   │
 *   │   │   └───────────┘  └───────────┘  └───────────┘       │   │
 *   │   │                                                     │   │
 *   │   └─────────────────────────────────────────────────────┘   │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * BOUNDING BOX:
 * 
 *   Each piece has a bounding box defining its 3D space:
 * 
 *         maxY ─────────────────────────
 *              │                       │
 *              │     ┌─────────┐       │
 *              │     │  Piece  │       │
 *              │     │ Content │       │
 *              │     └─────────┘       │
 *              │                       │
 *         minY ─────────────────────────
 *              minX               maxX
 *              minZ               maxZ
 * 
 * USE CASES:
 * - Detect if location is inside a structure piece
 * - Calculate structure piece dimensions
 * - Find overlapping pieces
 * - Iterate through all parts of a structure
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/generator/structure/StructurePiece.html
 */

import { BukkitBoundingBox } from "./boundingBox";


// ============================================
// INTERFACE
// ============================================

/**
 * An individual part of a generated structure.
 * 
 * Structures like villages are composed of multiple pieces
 * (houses, wells, paths, etc.). Each piece has its own
 * bounding box defining its space in the world.
 */
export interface BukkitStructurePiece {
  /**
   * Get the bounding box of this structure piece.
   * 
   * The bounding box defines the 3D rectangular region
   * that contains this piece.
   * 
   * @returns BoundingBox of this piece
   * 
   * @example
   * const box = piece.getBoundingBox();
   * const width = box.getWidthX();
   * const height = box.getHeight();
   * const depth = box.getWidthZ();
   */
  getBoundingBox(): BukkitBoundingBox;
}

// ============================================
// TYPE GUARD
// ============================================

/**
 * Check if object is a StructurePiece.
 */
export function isStructurePiece(obj: any): obj is BukkitStructurePiece {
  return obj !== null &&
         typeof obj === "object" &&
         typeof obj.getBoundingBox === "function";
}

// ============================================
// DIMENSION UTILITIES
// ============================================

/**
 * Get the width (X axis) of a structure piece.
 */
export function getPieceWidth(piece: BukkitStructurePiece): number {
  return piece.getBoundingBox().getWidthX();
}

/**
 * Get the height (Y axis) of a structure piece.
 */
export function getPieceHeight(piece: BukkitStructurePiece): number {
  return piece.getBoundingBox().getHeight();
}

/**
 * Get the depth (Z axis) of a structure piece.
 */
export function getPieceDepth(piece: BukkitStructurePiece): number {
  return piece.getBoundingBox().getWidthZ();
}

/**
 * Get all dimensions of a structure piece.
 */
export function getPieceDimensions(piece: BukkitStructurePiece): {
  width: number;
  height: number;
  depth: number;
} {
  const box = piece.getBoundingBox();
  return {
    width: box.getWidthX(),
    height: box.getHeight(),
    depth: box.getWidthZ(),
  };
}

/**
 * Get the volume of a structure piece.
 */
export function getPieceVolume(piece: BukkitStructurePiece): number {
  return piece.getBoundingBox().getVolume();
}

// ============================================
// POSITION UTILITIES
// ============================================

/**
 * Get the center point of a structure piece.
 */
export function getPieceCenter(piece: BukkitStructurePiece): {
  x: number;
  y: number;
  z: number;
} {
  const box = piece.getBoundingBox();
  return {
    x: box.getCenterX(),
    y: box.getCenterY(),
    z: box.getCenterZ(),
  };
}

/**
 * Get the minimum corner of a structure piece.
 */
export function getPieceMin(piece: BukkitStructurePiece): {
  x: number;
  y: number;
  z: number;
} {
  const box = piece.getBoundingBox();
  return {
    x: box.getMinX(),
    y: box.getMinY(),
    z: box.getMinZ(),
  };
}

/**
 * Get the maximum corner of a structure piece.
 */
export function getPieceMax(piece: BukkitStructurePiece): {
  x: number;
  y: number;
  z: number;
} {
  const box = piece.getBoundingBox();
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
 * Check if a location is inside a structure piece.
 */
export function isInsidePiece(
  piece: BukkitStructurePiece,
  x: number,
  y: number,
  z: number
): boolean {
  return piece.getBoundingBox().contains(x, y, z);
}

/**
 * Check if a location (ignoring Y) is within piece bounds.
 */
export function isWithinPieceXZ(
  piece: BukkitStructurePiece,
  x: number,
  z: number
): boolean {
  const box = piece.getBoundingBox();
  return x >= box.getMinX() && x <= box.getMaxX() &&
         z >= box.getMinZ() && z <= box.getMaxZ();
}

/**
 * Check if two structure pieces overlap.
 */
export function doPiecesOverlap(
  piece1: BukkitStructurePiece,
  piece2: BukkitStructurePiece
): boolean {
  return piece1.getBoundingBox().overlaps(piece2.getBoundingBox());
}

/**
 * Check if a structure piece contains another piece.
 */
export function doesPieceContain(
  outer: BukkitStructurePiece,
  inner: BukkitStructurePiece
): boolean {
  const outerBox = outer.getBoundingBox();
  const innerBox = inner.getBoundingBox();
  
  return outerBox.contains(innerBox.getMinX(), innerBox.getMinY(), innerBox.getMinZ()) &&
         outerBox.contains(innerBox.getMaxX(), innerBox.getMaxY(), innerBox.getMaxZ());
}

// ============================================
// DISTANCE UTILITIES
// ============================================

/**
 * Get distance from a point to piece center.
 */
export function getDistanceToPieceCenter(
  piece: BukkitStructurePiece,
  x: number,
  y: number,
  z: number
): number {
  const center = getPieceCenter(piece);
  const dx = x - center.x;
  const dy = y - center.y;
  const dz = z - center.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Get horizontal distance from a point to piece center.
 */
export function getHorizontalDistanceToPieceCenter(
  piece: BukkitStructurePiece,
  x: number,
  z: number
): number {
  const center = getPieceCenter(piece);
  const dx = x - center.x;
  const dz = z - center.z;
  return Math.sqrt(dx * dx + dz * dz);
}

/**
 * Get distance between centers of two pieces.
 */
export function getDistanceBetweenPieces(
  piece1: BukkitStructurePiece,
  piece2: BukkitStructurePiece
): number {
  const center1 = getPieceCenter(piece1);
  const center2 = getPieceCenter(piece2);
  const dx = center1.x - center2.x;
  const dy = center1.y - center2.y;
  const dz = center1.z - center2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Find the largest piece by volume.
 */
export function findLargestPiece(pieces: BukkitStructurePiece[]): BukkitStructurePiece | null {
  if (pieces.length === 0) return null;
  
  let largest = pieces[0];
  let largestVolume = getPieceVolume(pieces[0]);
  
  for (let i = 1; i < pieces.length; i++) {
    const volume = getPieceVolume(pieces[i]);
    if (volume > largestVolume) {
      largestVolume = volume;
      largest = pieces[i];
    }
  }
  
  return largest;
}

/**
 * Find the smallest piece by volume.
 */
export function findSmallestPiece(pieces: BukkitStructurePiece[]): BukkitStructurePiece | null {
  if (pieces.length === 0) return null;
  
  let smallest = pieces[0];
  let smallestVolume = getPieceVolume(pieces[0]);
  
  for (let i = 1; i < pieces.length; i++) {
    const volume = getPieceVolume(pieces[i]);
    if (volume < smallestVolume) {
      smallestVolume = volume;
      smallest = pieces[i];
    }
  }
  
  return smallest;
}

/**
 * Find pieces that contain a location.
 */
export function findPiecesContaining(
  pieces: BukkitStructurePiece[],
  x: number,
  y: number,
  z: number
): BukkitStructurePiece[] {
  return pieces.filter(piece => isInsidePiece(piece, x, y, z));
}

/**
 * Find the nearest piece to a location.
 */
export function findNearestPiece(
  pieces: BukkitStructurePiece[],
  x: number,
  y: number,
  z: number
): BukkitStructurePiece | null {
  if (pieces.length === 0) return null;
  
  let nearest = pieces[0];
  let nearestDist = getDistanceToPieceCenter(pieces[0], x, y, z);
  
  for (let i = 1; i < pieces.length; i++) {
    const dist = getDistanceToPieceCenter(pieces[i], x, y, z);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = pieces[i];
    }
  }
  
  return nearest;
}

/**
 * Get total volume of all pieces.
 */
export function getTotalPieceVolume(pieces: BukkitStructurePiece[]): number {
  let total = 0;
  for (const piece of pieces) {
    total += getPieceVolume(piece);
  }
  return total;
}

/**
 * Get combined bounding box of all pieces.
 */
export function getCombinedBoundingBox(pieces: BukkitStructurePiece[]): {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
} | null {
  if (pieces.length === 0) return null;
  
  const first = pieces[0].getBoundingBox();
  let minX = first.getMinX();
  let minY = first.getMinY();
  let minZ = first.getMinZ();
  let maxX = first.getMaxX();
  let maxY = first.getMaxY();
  let maxZ = first.getMaxZ();
  
  for (let i = 1; i < pieces.length; i++) {
    const box = pieces[i].getBoundingBox();
    minX = Math.min(minX, box.getMinX());
    minY = Math.min(minY, box.getMinY());
    minZ = Math.min(minZ, box.getMinZ());
    maxX = Math.max(maxX, box.getMaxX());
    maxY = Math.max(maxY, box.getMaxY());
    maxZ = Math.max(maxZ, box.getMaxZ());
  }
  
  return { minX, minY, minZ, maxX, maxY, maxZ };
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe a structure piece.
 */
export function describeStructurePiece(piece: BukkitStructurePiece): string {
  const dims = getPieceDimensions(piece);
  const center = getPieceCenter(piece);
  
  return `Piece ${dims.width}x${dims.height}x${dims.depth} at (${center.x.toFixed(1)}, ${center.y.toFixed(1)}, ${center.z.toFixed(1)})`;
}

/**
 * Get structure piece info as plain object.
 */
export function getStructurePieceInfo(piece: BukkitStructurePiece): {
  dimensions: { width: number; height: number; depth: number };
  volume: number;
  center: { x: number; y: number; z: number };
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
} {
  return {
    dimensions: getPieceDimensions(piece),
    volume: getPieceVolume(piece),
    center: getPieceCenter(piece),
    min: getPieceMin(piece),
    max: getPieceMax(piece),
  };
}

/**
 * Get summary of structure pieces.
 */
export function getStructurePiecesSummary(pieces: BukkitStructurePiece[]): {
  count: number;
  totalVolume: number;
  averageVolume: number;
  largestVolume: number;
  smallestVolume: number;
  combinedBounds: {
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
  } | null;
} {
  if (pieces.length === 0) {
    return {
      count: 0,
      totalVolume: 0,
      averageVolume: 0,
      largestVolume: 0,
      smallestVolume: 0,
      combinedBounds: null,
    };
  }
  
  const volumes = pieces.map(getPieceVolume);
  const totalVolume = volumes.reduce((sum, v) => sum + v, 0);
  
  return {
    count: pieces.length,
    totalVolume,
    averageVolume: totalVolume / pieces.length,
    largestVolume: Math.max(...volumes),
    smallestVolume: Math.min(...volumes),
    combinedBounds: getCombinedBoundingBox(pieces),
  };
}