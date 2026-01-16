import type { JavaEnum } from "../types/enum";

/**
 * Creates a typed enum accessor with caching.
 */
export function createEnum<K extends string, T extends JavaEnum<K>>(
  className: string
): Record<K, T> & {
  values(): T[];
  valueOf(name: K): T;
  className: string;
} {
  const cache = new Map<string, T>();

  return new Proxy({} as any, {
    get(_, prop: string) {
      if (prop === "values") {
        return () => Java.enumValues<T>(className);
      }
      if (prop === "valueOf") {
        return (name: string) => Java.enumValue<T>(className, name);
      }
      if (prop === "className") {
        return className;
      }

      // Cache enum constants
      if (!cache.has(prop)) {
        try {
          cache.set(prop, Java.enumValue<T>(className, prop));
        } catch {
          return undefined;
        }
      }
      return cache.get(prop);
    },

    has(_, prop: string) {
      if (["values", "valueOf", "className"].includes(prop)) return true;
      try {
        Java.enumValue(className, prop);
        return true;
      } catch {
        return false;
      }
    },
  });
}