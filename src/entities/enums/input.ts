// input/types/input.ts

/**
 * Input
 * 
 * Represents a movement input applied to an entity.
 * 
 * ⚠️ EXPERIMENTAL API - May change in future versions!
 * 
 * This interface represents the current movement keys/inputs
 * being pressed by a player or applied to an entity.
 * 
 * MOVEMENT INPUTS:
 * ┌─────────────────────────────────────┐
 * │           FORWARD (W)               │
 * │              ↑                      │
 * │   LEFT (A) ← + → RIGHT (D)          │
 * │              ↓                      │
 * │          BACKWARD (S)               │
 * └─────────────────────────────────────┘
 * 
 * MODIFIER INPUTS:
 * - JUMP (Space)
 * - SNEAK (Shift)
 * - SPRINT (Ctrl / Double-tap W)
 * 
 * USE CASES:
 * - Custom vehicle controls
 * - Movement-based abilities
 * - Input recording/playback
 * - Anti-cheat systems
 * - Custom entity AI
 * 
 * @experimental This API is experimental and may change
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Input.html
 */
export interface BukkitInput {
  /**
   * Gets whether a forward input is applied.
   * 
   * Default key: W
   * 
   * @returns true if moving forward
   */
  isForward(): boolean;

  /**
   * Gets whether a backward input is applied.
   * 
   * Default key: S
   * 
   * @returns true if moving backward
   */
  isBackward(): boolean;

  /**
   * Gets whether a left input is applied.
   * 
   * Default key: A
   * 
   * @returns true if moving left (strafing)
   */
  isLeft(): boolean;

  /**
   * Gets whether a right input is applied.
   * 
   * Default key: D
   * 
   * @returns true if moving right (strafing)
   */
  isRight(): boolean;

  /**
   * Gets whether a jump input is applied.
   * 
   * Default key: Space
   * 
   * @returns true if jumping
   */
  isJump(): boolean;

  /**
   * Gets whether a sneak input is applied.
   * 
   * Default key: Shift
   * 
   * @returns true if sneaking
   */
  isSneak(): boolean;

  /**
   * Gets whether a sprint input is applied.
   * 
   * Default key: Ctrl (or double-tap W)
   * 
   * @returns true if sprinting
   */
  isSprint(): boolean;
}

// ============================================
// HELPER TYPES
// ============================================

/**
 * Enum-like type for individual input types
 */
export type InputType =
  | "FORWARD"
  | "BACKWARD"
  | "LEFT"
  | "RIGHT"
  | "JUMP"
  | "SNEAK"
  | "SPRINT";

/**
 * Represents a direction input (WASD)
 */
export type DirectionInput = "FORWARD" | "BACKWARD" | "LEFT" | "RIGHT";

/**
 * Represents a modifier input (Space, Shift, Ctrl)
 */
export type ModifierInput = "JUMP" | "SNEAK" | "SPRINT";

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all active inputs as an array
 */
export function getActiveInputs(input: BukkitInput): InputType[] {
  const active: InputType[] = [];
  
  if (input.isForward()) active.push("FORWARD");
  if (input.isBackward()) active.push("BACKWARD");
  if (input.isLeft()) active.push("LEFT");
  if (input.isRight()) active.push("RIGHT");
  if (input.isJump()) active.push("JUMP");
  if (input.isSneak()) active.push("SNEAK");
  if (input.isSprint()) active.push("SPRINT");
  
  return active;
}

/**
 * Check if any movement input is active (WASD)
 */
export function isMoving(input: BukkitInput): boolean {
  return input.isForward() || input.isBackward() ||
         input.isLeft() || input.isRight();
}

/**
 * Check if any input at all is active
 */
export function hasAnyInput(input: BukkitInput): boolean {
  return isMoving(input) || input.isJump() ||
         input.isSneak() || input.isSprint();
}

/**
 * Check if moving in a specific direction
 */
export function isMovingDirection(
  input: BukkitInput,
  direction: DirectionInput
): boolean {
  switch (direction) {
    case "FORWARD": return input.isForward();
    case "BACKWARD": return input.isBackward();
    case "LEFT": return input.isLeft();
    case "RIGHT": return input.isRight();
  }
}

/**
 * Get horizontal movement as a vector-like object
 * 
 * Returns values between -1 and 1 for each axis:
 * - x: -1 (left) to 1 (right)
 * - z: -1 (backward) to 1 (forward)
 */
export function getMovementVector(input: BukkitInput): { x: number; z: number } {
  let x = 0;
  let z = 0;
  
  if (input.isForward()) z += 1;
  if (input.isBackward()) z -= 1;
  if (input.isRight()) x += 1;
  if (input.isLeft()) x -= 1;
  
  return { x, z };
}

/**
 * Check if input matches a specific combination
 */
export function matchesInputs(
  input: BukkitInput,
  required: InputType[]
): boolean {
  for (const req of required) {
    switch (req) {
      case "FORWARD": if (!input.isForward()) return false; break;
      case "BACKWARD": if (!input.isBackward()) return false; break;
      case "LEFT": if (!input.isLeft()) return false; break;
      case "RIGHT": if (!input.isRight()) return false; break;
      case "JUMP": if (!input.isJump()) return false; break;
      case "SNEAK": if (!input.isSneak()) return false; break;
      case "SPRINT": if (!input.isSprint()) return false; break;
    }
  }
  return true;
}

/**
 * Check if input matches EXACTLY the given combination (no extra inputs)
 */
export function matchesExactInputs(
  input: BukkitInput,
  required: InputType[]
): boolean {
  const active = getActiveInputs(input);
  
  if (active.length !== required.length) return false;
  
  for (const req of required) {
    if (!active.includes(req)) return false;
  }
  
  return true;
}

/**
 * Get a human-readable description of the input
 */
export function describeInput(input: BukkitInput): string {
  const parts: string[] = [];
  
  if (input.isSprint()) parts.push("Sprinting");
  if (input.isSneak()) parts.push("Sneaking");
  
  const movement: string[] = [];
  if (input.isForward()) movement.push("Forward");
  if (input.isBackward()) movement.push("Backward");
  if (input.isLeft()) movement.push("Left");
  if (input.isRight()) movement.push("Right");
  
  if (movement.length > 0) {
    parts.push(movement.join("+"));
  }
  
  if (input.isJump()) parts.push("Jumping");
  
  return parts.length > 0 ? parts.join(" | ") : "Idle";
}

/**
 * Get the default key binding for an input type
 */
export function getDefaultKeyBinding(inputType: InputType): string {
  switch (inputType) {
    case "FORWARD": return "W";
    case "BACKWARD": return "S";
    case "LEFT": return "A";
    case "RIGHT": return "D";
    case "JUMP": return "Space";
    case "SNEAK": return "Shift";
    case "SPRINT": return "Ctrl";
  }
}

/**
 * Check if player is moving diagonally
 */
export function isMovingDiagonally(input: BukkitInput): boolean {
  const horizontal = input.isLeft() || input.isRight();
  const vertical = input.isForward() || input.isBackward();
  return horizontal && vertical;
}

/**
 * Check if player is sprint-jumping (common movement technique)
 */
export function isSprintJumping(input: BukkitInput): boolean {
  return input.isSprint() && input.isJump() && input.isForward();
}

/**
 * Check if player is crouch-walking
 */
export function isCrouchWalking(input: BukkitInput): boolean {
  return input.isSneak() && isMoving(input);
}