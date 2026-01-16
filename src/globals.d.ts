declare const org: any;
declare const java: any;
declare const PaperTS: {
  registerEvent<T>(eventClass: any, listener: (event: T) => void): void;
}

/**
 * Java bridge for Javet (V8).
 * Provides access to Java classes, enums, and constructors from TypeScript.
 */
declare const Java: {
  /**
   * Get an enum value by class name and value name.
   * @example Java.enumValue("org.bukkit.TreeType", "DARK_OAK")
   */
  enumValue<T = unknown>(className: string, valueName: string): T;

  /**
   * Get all values of an enum.
   * @example Java.enumValues("org.bukkit.TreeType")
   */
  enumValues<T = unknown>(className: string): T[];

  /**
   * Create a new instance of a Java class.
   * @example Java.newInstance("org.bukkit.Location", world, 100, 64, 100)
   */
  newInstance<T = unknown>(className: string, ...args: unknown[]): T;

  /**
   * Call a static method on a Java class.
   * @example Java.callStatic("org.bukkit.Bukkit", "getServer")
   */
  callStatic<T = unknown>(className: string, methodName: string, ...args: unknown[]): T;

  /**
   * Get a static field value from a Java class.
   * @example Java.getStatic("org.bukkit.Bukkit", "SOME_CONSTANT")
   */
  getStatic<T = unknown>(className: string, fieldName: string): T;

  /**
   * Check if a Java class exists.
   * @example Java.classExists("org.bukkit.TreeType")
   */
  classExists(className: string): boolean;

  singletonList<T>(element: T): JavaList<T>;
  asList<T>(...elements: T[]): JavaList<T>;
  toList<T>(elements: T[]): JavaList<T>;
  emptyList<T>(): JavaList<T>;
  emptyImmutableList<T>(): JavaList<T>;
};