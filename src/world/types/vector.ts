/**
 * Represents a mutable vector. Because the components of Vectors are mutable,
 * storing Vectors long term may be dangerous if passing code modifies the Vector later.
 * If you want to keep around a Vector, it may be wise to call clone() to get a copy.
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/util/Vector.html
 */


import { BukkitBlockVector } from "./blockVector";
import { BukkitLocation } from "./location";
import { BukkitWorld } from "./world";

// ============================================
// INTERFACE
// ============================================

export interface BukkitVector {
  /**
   * Adds a vector to this one. Mutates this vector.
   */
  add(vec: BukkitVector): BukkitVector;

  /**
   * Subtracts a vector from this one. Mutates this vector.
   */
  subtract(vec: BukkitVector): BukkitVector;

  /**
   * Multiplies the vector by another. Mutates this vector.
   */
  multiply(vec: BukkitVector): BukkitVector;

  /**
   * Scalar multiplication. Mutates this vector.
   */
  multiply(m: number): BukkitVector;

  /**
   * Divides the vector by another. Mutates this vector.
   */
  divide(vec: BukkitVector): BukkitVector;

  /**
   * Copies another vector into this one. Mutates this vector.
   */
  copy(vec: BukkitVector): BukkitVector;

  /**
   * Magnitude of the vector: sqrt(x^2 + y^2 + z^2).
   * Expensive. Don't call repeatedly. Use lengthSquared() when possible.
   */
  length(): number;

  /**
   * Magnitude squared. Cheaper than length().
   */
  lengthSquared(): number;

  /**
   * Distance to another vector. Expensive, uses sqrt.
   */
  distance(o: BukkitVector): number;

  /**
   * Squared distance. Cheaper than distance().
   */
  distanceSquared(o: BukkitVector): number;

  /**
   * Angle between this vector and another, in radians.
   */
  angle(other: BukkitVector): number;

  /**
   * Sets this vector to the midpoint between this and another. Mutates.
   */
  midpoint(other: BukkitVector): BukkitVector;

  /**
   * Returns a new vector that is the midpoint. Does not mutate.
   */
  getMidpoint(other: BukkitVector): BukkitVector;

  /**
   * Dot product: x1*x2 + y1*y2 + z1*z2. Returns a scalar.
   */
  dot(other: BukkitVector): number;

  /**
   * Cross product. Mutates this vector.
   */
  crossProduct(o: BukkitVector): BukkitVector;

  /**
   * Cross product without mutation. Returns a new vector.
   */
  getCrossProduct(o: BukkitVector): BukkitVector;

  /**
   * Converts to unit vector (length 1). Mutates.
   */
  normalize(): BukkitVector;

  /**
   * Sets all components to zero. Mutates.
   */
  zero(): BukkitVector;

  /**
   * True if all components are zero.
   */
  isZero(): boolean;

  /**
   * True if inside the axis-aligned bounding box defined by min and max.
   */
  isInAABB(min: BukkitVector, max: BukkitVector): boolean;

  /**
   * True if inside a sphere centered at origin with given radius.
   */
  isInSphere(origin: BukkitVector, radius: number): boolean;

  /**
   * True if this is a unit vector (length ~= 1).
   */
  isNormalized(): boolean;

  /**
   * Rotate around X axis. Angle in radians. Mutates.
   */
  rotateAroundX(angle: number): BukkitVector;

  /**
   * Rotate around Y axis. Angle in radians. Mutates.
   */
  rotateAroundY(angle: number): BukkitVector;

  /**
   * Rotate around Z axis. Angle in radians. Mutates.
   */
  rotateAroundZ(angle: number): BukkitVector;

  /**
   * Rotate around arbitrary axis. Axis is normalized internally.
   * Angle in radians. Mutates.
   */
  rotateAroundAxis(axis: BukkitVector, angle: number): BukkitVector;

  /**
   * Rotate around arbitrary axis without normalizing it first.
   * Use only if you know what you're doing. Mutates.
   */
  rotateAroundNonUnitAxis(axis: BukkitVector, angle: number): BukkitVector;

  getX(): number;
  getY(): number;
  getZ(): number;

  /** Floored X. The block coordinate. */
  getBlockX(): number;

  /** Floored Y. The block coordinate. */
  getBlockY(): number;

  /** Floored Z. The block coordinate. */
  getBlockZ(): number;

  setX(x: number): BukkitVector;
  setY(y: number): BukkitVector;
  setZ(z: number): BukkitVector;

  /**
   * Throws if any component is NaN or infinite.
   */
  checkFinite(): void;

  /**
   * Deep copy.
   */
  clone(): BukkitVector;

  /**
   * Convert to Location with yaw=0, pitch=0.
   */
  toLocation(world: BukkitWorld): BukkitLocation;

  /**
   * Convert to Location with specified yaw and pitch.
   */
  toLocation(world: BukkitWorld, yaw: number, pitch: number): BukkitLocation;

  /**
   * Convert to BlockVector (integer coordinates).
   */
  toBlockVector(): BukkitBlockVector;

  equals(obj: object): boolean;
  hashCode(): number;
  toString(): string;
}

// ============================================
// VECTOR CLASS INTERFACE
// ============================================

/*
 * Vector is a regular class with constructors and static utility methods.
 * No enum stuff here. Just factory methods and helpers.
 */
interface VectorClass {
  /**
   * The epsilon used for fuzzy equals().
   */
  getEpsilon(): number;

  /**
   * Component-wise minimum of two vectors.
   */
  getMinimum(v1: BukkitVector, v2: BukkitVector): BukkitVector;

  /**
   * Component-wise maximum of two vectors.
   */
  getMaximum(v1: BukkitVector, v2: BukkitVector): BukkitVector;

  /**
   * Random vector with components in [0, 1).
   */
  getRandom(): BukkitVector;

  /**
   * Deserialize from map.
   */
  deserialize(args: Map<string, object>): BukkitVector;

  /**
   * Create vector with all components zero.
   */
  create(): BukkitVector;

  /**
   * Create vector with given components.
   */
  create(x: number, y: number, z: number): BukkitVector;
}

// ============================================
// VECTOR
// ============================================

export const Vector: VectorClass = {
  getEpsilon(): number {
    return org.bukkit.util.Vector.getEpsilon();
  },

  getMinimum(v1: BukkitVector, v2: BukkitVector): BukkitVector {
    return org.bukkit.util.Vector.getMinimum(v1, v2);
  },

  getMaximum(v1: BukkitVector, v2: BukkitVector): BukkitVector {
    return org.bukkit.util.Vector.getMaximum(v1, v2);
  },

  getRandom(): BukkitVector {
    return org.bukkit.util.Vector.getRandom();
  },

  deserialize(args: Map<string, object>): BukkitVector {
    return org.bukkit.util.Vector.deserialize(args);
  },

  create(x?: number, y?: number, z?: number): BukkitVector {
    if (x !== undefined && y !== undefined && z !== undefined) {
      return new org.bukkit.util.Vector(x, y, z);
    }
    return new org.bukkit.util.Vector();
  },
};