/**
 * JavaClass - TypeScript abstraction for Java Class<T> objects
 * 
 * DESIGN
 * ------
 * 
 * In Java, `Class<T>` represents a class object that can be used for:
 *   - Reflection (getting methods, fields, constructors)
 *   - Type checking (instanceof, isAssignableFrom)
 *   - Creating new instances (newInstance, getConstructor)
 * 
 * The wildcard `? extends T` means "any class that is T or a subclass of T".
 * 
 * Examples in Java:
 *   - Class<? extends Entity> can hold Entity.class, Player.class, Zombie.class
 *   - Class<? extends Number> can hold Number.class, Integer.class, Double.class
 * 
 * WHY: Why use a generic parameter?
 * ---------------------------------
 * 
 * Without generic:
 *   const clazz: JavaClass = entity.getClass();
 *   clazz.isAssignableFrom(other); // No type safety
 * 
 * With generic:
 *   const clazz: JavaClass<Entity> = entity.getClass();
 *   clazz.isAssignableFrom(playerClass); // Type-checked
 * 
 * @template T - The type or supertype that this class represents
 */
export interface JavaClass<T = unknown> {
  /**
   * Returns the name of the entity (class, interface, array class,
   * primitive type, or void) represented by this Class object.
   * 
   * @returns The fully qualified name of the class
   * 
   * @example
   * const clazz = entity.getClass();
   * clazz.getName(); // "org.bukkit.entity.Player"
   */
  getName(): string;

  /**
   * Returns the simple name of the underlying class.
   * 
   * @returns The simple name (without package)
   * 
   * @example
   * const clazz = entity.getClass();
   * clazz.getSimpleName(); // "Player"
   */
  getSimpleName(): string;

  /**
   * Returns the canonical name of the underlying class.
   * 
   * @returns The canonical name, or null if none exists
   */
  getCanonicalName(): string | null;

  /**
   * Determines if the class or interface represented by this Class object
   * is either the same as, or is a superclass/superinterface of, the class
   * represented by the specified Class parameter.
   * 
   * @param cls - The Class object to be checked
   * @returns true if objects of the type cls can be assigned to objects of this class
   * 
   * @example
   * // Entity.class.isAssignableFrom(Player.class) -> true
   * // Player.class.isAssignableFrom(Entity.class) -> false
   */
  isAssignableFrom(cls: JavaClass<any>): boolean;

  /**
   * Determines if the specified Object is assignment-compatible with the
   * object represented by this Class.
   * 
   * @param obj - The object to check
   * @returns true if obj is an instance of this class
   * 
   * @example
   * if (entityClass.isInstance(someObject)) {
   *   // someObject is an Entity
   * }
   */
  isInstance(obj: any): boolean;

  /**
   * Determines if this Class object represents an interface type.
   * 
   * @returns true if this class is an interface
   */
  isInterface(): boolean;

  /**
   * Determines if this Class object represents an array class.
   * 
   * @returns true if this class is an array
   */
  isArray(): boolean;

  /**
   * Determines if this Class object represents a primitive type.
   * 
   * @returns true if this class is a primitive
   */
  isPrimitive(): boolean;

  /**
   * Determines if this Class object represents an enum type.
   * 
   * @returns true if this class is an enum
   */
  isEnum(): boolean;

  /**
   * Returns the Class representing the superclass of the entity
   * represented by this Class.
   * 
   * @returns The superclass, or null if this is Object or an interface
   */
  getSuperclass(): JavaClass<any> | null;

  /**
   * Returns the interfaces directly implemented by this class.
   * 
   * @returns Array of interfaces
   */
  getInterfaces(): JavaClass<any>[];

  /**
   * Casts an object to the class or interface represented by this Class object.
   * 
   * @param obj - The object to cast
   * @returns The object after casting
   * @throws ClassCastException if the object is not assignable
   */
  cast(obj: any): T;

  /**
   * Creates a new instance of the class represented by this Class object.
   * 
   * @returns A new instance of T
   * @throws InstantiationException, IllegalAccessException
   * @deprecated Use getConstructor().newInstance() instead
   */
  newInstance(): T;
}

// ============================================
// TYPE ALIASES FOR COMMON PATTERNS
// ============================================

/**
 * Represents Class<? extends T> - a class that is T or a subclass of T.
 * 
 * @example
 * function spawn<T extends Entity>(clazz: ClassExtends<T>): T { ... }
 * spawn(Player.class); // OK
 * spawn(Zombie.class); // OK
 */
export type ClassExtends<T> = JavaClass<T>;

/**
 * Represents Class<? super T> - a class that is T or a superclass of T.
 * 
 * @example
 * function register<T>(clazz: ClassSuper<T>): void { ... }
 */
export type ClassSuper<T> = JavaClass<T>;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Checks if a class is a subclass of another.
 * 
 * @param child - The potential subclass
 * @param parent - The potential superclass
 * @returns true if child extends parent
 * 
 * @example
 * isSubclassOf(Player.class, Entity.class); // true
 * isSubclassOf(Entity.class, Player.class); // false
 */
export function isSubclassOf<P, C extends P>(
  child: JavaClass<C>,
  parent: JavaClass<P>
): boolean {
  return parent.isAssignableFrom(child);
}

/**
 * Checks if an object is an instance of a class.
 * 
 * @param obj - The object to check
 * @param clazz - The class to check against
 * @returns true if obj is an instance of clazz
 * 
 * @example
 * if (isInstanceOf(entity, Player.class)) {
 *   // entity is a Player
 * }
 */
export function isInstanceOf<T>(obj: any, clazz: JavaClass<T>): obj is T {
  return clazz.isInstance(obj);
}

/**
 * Gets the class of an object.
 * 
 * @param obj - The object
 * @returns The class of the object
 * 
 * @example
 * const clazz = getClass(player);
 * console.log(clazz.getSimpleName()); // "CraftPlayer"
 */
export function getClass<T>(obj: T): JavaClass<T> {
  return (obj as any).getClass();
}

/**
 * Safely casts an object to a type if it's an instance of that class.
 * 
 * @param obj - The object to cast
 * @param clazz - The target class
 * @returns The cast object, or null if not an instance
 * 
 * @example
 * const player = safeCast(entity, Player.class);
 * if (player) {
 *   player.sendMessage("Hello!");
 * }
 */
export function safeCast<T>(obj: any, clazz: JavaClass<T>): T | null {
  return clazz.isInstance(obj) ? clazz.cast(obj) : null;
}