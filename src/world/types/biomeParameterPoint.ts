/**
 * DESIGN
 * ------
 * BiomeParameterPoint represents the noise parameters used to determine
 * which biome should generate at a specific location.
 * 
 * MULTI-NOISE BIOME SYSTEM (1.18+):
 * 
 * Minecraft uses 6 noise parameters to select biomes:
 * 
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │                    BIOME SELECTION                          │
 *   │                                                             │
 *   │   Temperature ──┐                                           │
 *   │   Humidity ─────┤                                           │
 *   │   Continentalness ─┼──→ NoiseRouter ──→ Biome Selection     │
 *   │   Erosion ──────┤                                           │
 *   │   Depth ────────┤                                           │
 *   │   Weirdness ────┘                                           │
 *   │                                                             │
 *   └─────────────────────────────────────────────────────────────┘
 * 
 * PARAMETER MEANINGS:
 * 
 *   TEMPERATURE
 *   ├─ Low (-1.0)  → Cold biomes (snowy tundra, ice spikes)
 *   ├─ Mid (0.0)   → Temperate biomes (plains, forest)
 *   └─ High (1.0)  → Hot biomes (desert, badlands)
 * 
 *   HUMIDITY
 *   ├─ Low (-1.0)  → Dry biomes (desert, savanna)
 *   ├─ Mid (0.0)   → Normal biomes (plains, forest)
 *   └─ High (1.0)  → Wet biomes (jungle, swamp)
 * 
 *   CONTINENTALNESS
 *   ├─ Low (-1.0)  → Ocean, deep ocean
 *   ├─ Mid (0.0)   → Coast, beach
 *   └─ High (1.0)  → Inland, mountains
 * 
 *   EROSION
 *   ├─ Low (-1.0)  → Mountainous, peaks
 *   ├─ Mid (0.0)   → Hills, plateaus
 *   └─ High (1.0)  → Flat, valleys
 * 
 *   DEPTH
 *   ├─ Surface     → Surface biomes
 *   └─ Underground → Cave biomes (deep dark, lush caves)
 * 
 *   WEIRDNESS
 *   ├─ Normal      → Standard biome variants
 *   └─ Weird       → Unusual variants (mutated biomes)
 * 
 * USAGE IN CUSTOM GENERATORS:
 * 
 *   class MyBiomeProvider extends BiomeProvider {
 *     getBiome(worldInfo, x, y, z, parameterPoint) {
 *       if (parameterPoint.getTemperature() > 0.5 &&
 *           parameterPoint.getHumidity() < -0.5) {
 *         return Biome.DESERT;
 *       }
 *       // ... more logic
 *     }
 *   }
 * 
 * @see https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/generator/BiomeParameterPoint.html
 */

// ============================================
// INTERFACE
// ============================================

/**
 * Biome noise parameters at a specific point.
 * 
 * Used by custom BiomeProviders to determine which biome
 * should generate at a given location based on noise values.
 * 
 * All parameters are normalized to approximately -1.0 to 1.0 range,
 * though actual min/max values are provided by the getMin/getMax methods.
 */
export interface BukkitBiomeParameterPoint {
  // ==========================================
  // TEMPERATURE
  // ==========================================

  /**
   * Get the temperature at this point.
   * 
   * Affects hot vs cold biome selection.
   * - Low values → Cold biomes (snow, ice)
   * - High values → Hot biomes (desert, badlands)
   * 
   * @returns Temperature value (typically -1.0 to 1.0)
   */
  getTemperature(): number;

  /**
   * Get maximum possible temperature.
   */
  getMaxTemperature(): number;

  /**
   * Get minimum possible temperature.
   */
  getMinTemperature(): number;

  // ==========================================
  // HUMIDITY
  // ==========================================

  /**
   * Get the humidity at this point.
   * 
   * Affects wet vs dry biome selection.
   * - Low values → Dry biomes (desert, savanna)
   * - High values → Wet biomes (jungle, swamp)
   * 
   * @returns Humidity value (typically -1.0 to 1.0)
   */
  getHumidity(): number;

  /**
   * Get maximum possible humidity.
   */
  getMaxHumidity(): number;

  /**
   * Get minimum possible humidity.
   */
  getMinHumidity(): number;

  // ==========================================
  // CONTINENTALNESS
  // ==========================================

  /**
   * Get the continentalness at this point.
   * 
   * Affects ocean vs inland biome selection.
   * - Low values → Ocean, deep ocean
   * - Mid values → Coast, beach
   * - High values → Inland, mountains
   * 
   * @returns Continentalness value (typically -1.0 to 1.0)
   */
  getContinentalness(): number;

  /**
   * Get maximum possible continentalness.
   */
  getMaxContinentalness(): number;

  /**
   * Get minimum possible continentalness.
   */
  getMinContinentalness(): number;

  // ==========================================
  // EROSION
  // ==========================================

  /**
   * Get the erosion at this point.
   * 
   * Affects terrain height variation.
   * - Low values → Mountainous, peaks
   * - Mid values → Hills, plateaus
   * - High values → Flat, valleys
   * 
   * @returns Erosion value (typically -1.0 to 1.0)
   */
  getErosion(): number;

  /**
   * Get maximum possible erosion.
   */
  getMaxErosion(): number;

  /**
   * Get minimum possible erosion.
   */
  getMinErosion(): number;

  // ==========================================
  // DEPTH
  // ==========================================

  /**
   * Get the depth at this point.
   * 
   * Affects surface vs underground biome selection.
   * Used for cave biomes like deep dark, lush caves.
   * 
   * @returns Depth value
   */
  getDepth(): number;

  /**
   * Get maximum possible depth.
   */
  getMaxDepth(): number;

  /**
   * Get minimum possible depth.
   */
  getMinDepth(): number;

  // ==========================================
  // WEIRDNESS
  // ==========================================

  /**
   * Get the weirdness at this point.
   * 
   * Affects biome variant selection.
   * Higher weirdness leads to more unusual/mutated biomes.
   * 
   * @returns Weirdness value (typically -1.0 to 1.0)
   */
  getWeirdness(): number;

  /**
   * Get maximum possible weirdness.
   */
  getMaxWeirdness(): number;

  /**
   * Get minimum possible weirdness.
   */
  getMinWeirdness(): number;
}

// ============================================
// PARAMETER NAMES
// ============================================

/**
 * Names of all biome parameters.
 */
export type BiomeParameterName =
  | "temperature"
  | "humidity"
  | "continentalness"
  | "erosion"
  | "depth"
  | "weirdness";

/**
 * All biome parameter names.
 */
export const BIOME_PARAMETER_NAMES: BiomeParameterName[] = [
  "temperature",
  "humidity",
  "continentalness",
  "erosion",
  "depth",
  "weirdness",
];

// ============================================
// PARAMETER VALUE INTERFACE
// ============================================

/**
 * A single parameter's value with its range.
 */
export interface ParameterValue {
  /** Current value at this point */
  value: number;
  /** Minimum possible value */
  min: number;
  /** Maximum possible value */
  max: number;
}

/**
 * All parameters as a structured object.
 */
export interface BiomeParameters {
  temperature: ParameterValue;
  humidity: ParameterValue;
  continentalness: ParameterValue;
  erosion: ParameterValue;
  depth: ParameterValue;
  weirdness: ParameterValue;
}

// ============================================
// EXTRACTION UTILITIES
// ============================================

/**
 * Get a specific parameter value.
 */
export function getParameter(
  point: BukkitBiomeParameterPoint,
  name: BiomeParameterName
): number {
  switch (name) {
    case "temperature":
      return point.getTemperature();
    case "humidity":
      return point.getHumidity();
    case "continentalness":
      return point.getContinentalness();
    case "erosion":
      return point.getErosion();
    case "depth":
      return point.getDepth();
    case "weirdness":
      return point.getWeirdness();
  }
}

/**
 * Get parameter minimum value.
 */
export function getParameterMin(
  point: BukkitBiomeParameterPoint,
  name: BiomeParameterName
): number {
  switch (name) {
    case "temperature":
      return point.getMinTemperature();
    case "humidity":
      return point.getMinHumidity();
    case "continentalness":
      return point.getMinContinentalness();
    case "erosion":
      return point.getMinErosion();
    case "depth":
      return point.getMinDepth();
    case "weirdness":
      return point.getMinWeirdness();
  }
}

/**
 * Get parameter maximum value.
 */
export function getParameterMax(
  point: BukkitBiomeParameterPoint,
  name: BiomeParameterName
): number {
  switch (name) {
    case "temperature":
      return point.getMaxTemperature();
    case "humidity":
      return point.getMaxHumidity();
    case "continentalness":
      return point.getMaxContinentalness();
    case "erosion":
      return point.getMaxErosion();
    case "depth":
      return point.getMaxDepth();
    case "weirdness":
      return point.getMaxWeirdness();
  }
}

/**
 * Get full parameter info (value, min, max).
 */
export function getParameterInfo(
  point: BukkitBiomeParameterPoint,
  name: BiomeParameterName
): ParameterValue {
  return {
    value: getParameter(point, name),
    min: getParameterMin(point, name),
    max: getParameterMax(point, name),
  };
}

/**
 * Get all parameters as structured object.
 */
export function getAllParameters(point: BukkitBiomeParameterPoint): BiomeParameters {
  return {
    temperature: getParameterInfo(point, "temperature"),
    humidity: getParameterInfo(point, "humidity"),
    continentalness: getParameterInfo(point, "continentalness"),
    erosion: getParameterInfo(point, "erosion"),
    depth: getParameterInfo(point, "depth"),
    weirdness: getParameterInfo(point, "weirdness"),
  };
}

/**
 * Get all parameter values as simple record.
 */
export function getParameterValues(
  point: BukkitBiomeParameterPoint
): Record<BiomeParameterName, number> {
  return {
    temperature: point.getTemperature(),
    humidity: point.getHumidity(),
    continentalness: point.getContinentalness(),
    erosion: point.getErosion(),
    depth: point.getDepth(),
    weirdness: point.getWeirdness(),
  };
}

// ============================================
// NORMALIZATION
// ============================================

/**
 * Normalize a parameter value to 0.0-1.0 range.
 * 
 * @param point The parameter point
 * @param name The parameter name
 * @returns Value normalized to 0.0-1.0
 */
export function normalizeParameter(
  point: BukkitBiomeParameterPoint,
  name: BiomeParameterName
): number {
  const value = getParameter(point, name);
  const min = getParameterMin(point, name);
  const max = getParameterMax(point, name);
  
  if (max === min) return 0.5;
  
  return (value - min) / (max - min);
}

/**
 * Get all parameters normalized to 0.0-1.0 range.
 */
export function getNormalizedParameters(
  point: BukkitBiomeParameterPoint
): Record<BiomeParameterName, number> {
  return {
    temperature: normalizeParameter(point, "temperature"),
    humidity: normalizeParameter(point, "humidity"),
    continentalness: normalizeParameter(point, "continentalness"),
    erosion: normalizeParameter(point, "erosion"),
    depth: normalizeParameter(point, "depth"),
    weirdness: normalizeParameter(point, "weirdness"),
  };
}

// ============================================
// CLASSIFICATION HELPERS
// ============================================

/**
 * Temperature classification.
 */
export type TemperatureClass = "freezing" | "cold" | "temperate" | "warm" | "hot";

/**
 * Classify temperature into categories.
 */
export function classifyTemperature(point: BukkitBiomeParameterPoint): TemperatureClass {
  const normalized = normalizeParameter(point, "temperature");
  
  if (normalized < 0.2) return "freezing";
  if (normalized < 0.4) return "cold";
  if (normalized < 0.6) return "temperate";
  if (normalized < 0.8) return "warm";
  return "hot";
}

/**
 * Humidity classification.
 */
export type HumidityClass = "arid" | "dry" | "normal" | "humid" | "wet";

/**
 * Classify humidity into categories.
 */
export function classifyHumidity(point: BukkitBiomeParameterPoint): HumidityClass {
  const normalized = normalizeParameter(point, "humidity");
  
  if (normalized < 0.2) return "arid";
  if (normalized < 0.4) return "dry";
  if (normalized < 0.6) return "normal";
  if (normalized < 0.8) return "humid";
  return "wet";
}

/**
 * Continentalness classification.
 */
export type ContinentalnessClass = "deep_ocean" | "ocean" | "coast" | "inland" | "far_inland";

/**
 * Classify continentalness into categories.
 */
export function classifyContinentalness(point: BukkitBiomeParameterPoint): ContinentalnessClass {
  const normalized = normalizeParameter(point, "continentalness");
  
  if (normalized < 0.2) return "deep_ocean";
  if (normalized < 0.4) return "ocean";
  if (normalized < 0.5) return "coast";
  if (normalized < 0.7) return "inland";
  return "far_inland";
}

/**
 * Erosion classification.
 */
export type ErosionClass = "peaks" | "mountains" | "hills" | "plains" | "valleys";

/**
 * Classify erosion into categories.
 */
export function classifyErosion(point: BukkitBiomeParameterPoint): ErosionClass {
  const normalized = normalizeParameter(point, "erosion");
  
  if (normalized < 0.2) return "peaks";
  if (normalized < 0.4) return "mountains";
  if (normalized < 0.6) return "hills";
  if (normalized < 0.8) return "plains";
  return "valleys";
}

/**
 * Weirdness classification.
 */
export type WeirdnessClass = "normal" | "slightly_weird" | "weird" | "very_weird";

/**
 * Classify weirdness into categories.
 */
export function classifyWeirdness(point: BukkitBiomeParameterPoint): WeirdnessClass {
  const normalized = normalizeParameter(point, "weirdness");
  const absFromCenter = Math.abs(normalized - 0.5) * 2; /* 0 at center, 1 at extremes */
  
  if (absFromCenter < 0.25) return "normal";
  if (absFromCenter < 0.5) return "slightly_weird";
  if (absFromCenter < 0.75) return "weird";
  return "very_weird";
}

/**
 * Full classification of all parameters.
 */
export interface BiomeClassification {
  temperature: TemperatureClass;
  humidity: HumidityClass;
  continentalness: ContinentalnessClass;
  erosion: ErosionClass;
  weirdness: WeirdnessClass;
  isUnderground: boolean;
}

/**
 * Classify all parameters.
 */
export function classifyPoint(point: BukkitBiomeParameterPoint): BiomeClassification {
  return {
    temperature: classifyTemperature(point),
    humidity: classifyHumidity(point),
    continentalness: classifyContinentalness(point),
    erosion: classifyErosion(point),
    weirdness: classifyWeirdness(point),
    isUnderground: point.getDepth() > 0,
  };
}

// ============================================
// BIOME HINTS
// ============================================

/**
 * Check if parameters suggest an ocean biome.
 */
export function suggestsOcean(point: BukkitBiomeParameterPoint): boolean {
  const cont = normalizeParameter(point, "continentalness");
  return cont < 0.4;
}

/**
 * Check if parameters suggest a mountain biome.
 */
export function suggestsMountain(point: BukkitBiomeParameterPoint): boolean {
  const erosion = normalizeParameter(point, "erosion");
  const cont = normalizeParameter(point, "continentalness");
  return erosion < 0.3 && cont > 0.6;
}

/**
 * Check if parameters suggest a desert biome.
 */
export function suggestsDesert(point: BukkitBiomeParameterPoint): boolean {
  const temp = normalizeParameter(point, "temperature");
  const humidity = normalizeParameter(point, "humidity");
  return temp > 0.7 && humidity < 0.3;
}

/**
 * Check if parameters suggest a jungle biome.
 */
export function suggestsJungle(point: BukkitBiomeParameterPoint): boolean {
  const temp = normalizeParameter(point, "temperature");
  const humidity = normalizeParameter(point, "humidity");
  return temp > 0.6 && humidity > 0.7;
}

/**
 * Check if parameters suggest a snowy biome.
 */
export function suggestsSnowy(point: BukkitBiomeParameterPoint): boolean {
  const temp = normalizeParameter(point, "temperature");
  return temp < 0.2;
}

/**
 * Check if parameters suggest an underground/cave biome.
 */
export function suggestsCave(point: BukkitBiomeParameterPoint): boolean {
  return point.getDepth() > 0;
}

// ============================================
// COMPARISON
// ============================================

/**
 * Calculate distance between two parameter points.
 * 
 * Uses Euclidean distance in 6D parameter space.
 */
export function parameterDistance(
  a: BukkitBiomeParameterPoint,
  b: BukkitBiomeParameterPoint
): number {
  let sumSquares = 0;
  
  for (const name of BIOME_PARAMETER_NAMES) {
    const valA = normalizeParameter(a, name);
    const valB = normalizeParameter(b, name);
    sumSquares += (valA - valB) ** 2;
  }
  
  return Math.sqrt(sumSquares);
}

/**
 * Check if two points are similar (within threshold).
 */
export function areSimilar(
  a: BukkitBiomeParameterPoint,
  b: BukkitBiomeParameterPoint,
  threshold: number = 0.2
): boolean {
  return parameterDistance(a, b) < threshold;
}

// ============================================
// DESCRIPTION
// ============================================

/**
 * Describe the biome parameters at a point.
 */
export function describeBiomeParameters(point: BukkitBiomeParameterPoint): string {
  const classification = classifyPoint(point);
  
  const parts: string[] = [
    classification.temperature,
    classification.humidity,
    classification.continentalness,
    classification.erosion,
  ];
  
  if (classification.weirdness !== "normal") {
    parts.push(classification.weirdness);
  }
  
  if (classification.isUnderground) {
    parts.push("underground");
  }
  
  return parts.join(", ");
}

/**
 * Get detailed parameter dump for debugging.
 */
export function dumpParameters(point: BukkitBiomeParameterPoint): string {
  const lines: string[] = ["Biome Parameters:"];
  
  for (const name of BIOME_PARAMETER_NAMES) {
    const value = getParameter(point, name);
    const min = getParameterMin(point, name);
    const max = getParameterMax(point, name);
    const normalized = normalizeParameter(point, name);
    
    lines.push(`  ${name}: ${value.toFixed(3)} [${min.toFixed(3)} - ${max.toFixed(3)}] (${(normalized * 100).toFixed(1)}%)`);
  }
  
  return lines.join("\n");
}