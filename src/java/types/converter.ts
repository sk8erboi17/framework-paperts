// ============================================
// CONVERSION FUNCTIONS (PaperTS compatible)
// ============================================

import { JavaList } from "./list";

// ============================================
// JAVA → TYPESCRIPT
// ============================================

export function toList<E>(javaList: JavaList<E>): E[] {
  const result: E[] = [];
  for (let i = 0; i < javaList.size(); i++) {
    result.push(javaList.get(i));
  }
  return result;
}

export const asList = toList;

export function toListNonNull<E>(javaList: JavaList<E | null>): E[] {
  const result: E[] = [];
  for (let i = 0; i < javaList.size(); i++) {
    const item = javaList.get(i);
    if (item !== null) {
      result.push(item);
    }
  }
  return result;
}

export function toSet<E>(javaList: JavaList<E>): Set<E> {
  const result = new Set<E>();
  for (let i = 0; i < javaList.size(); i++) {
    result.add(javaList.get(i));
  }
  return result;
}

// ============================================
// TYPESCRIPT → JAVA
// ============================================

export function toJavaList<E>(array: E[]): JavaList<E> {
  const javaList: JavaList<E> = new (org.bukkit.util as any).ArrayList();
  for (const item of array) {
    javaList.add(item);
  }
  return javaList;
}

export const fromArray = toJavaList;

export function javaListOf<E>(...elements: E[]): JavaList<E> {
  return toJavaList(elements);
}

export function emptyJavaList<E>(): JavaList<E> {
  return new (org.bukkit.util as any).ArrayList() as JavaList<E>;
}

export function setToJavaList<E>(set: Set<E>): JavaList<E> {
  return toJavaList([...set]);
}