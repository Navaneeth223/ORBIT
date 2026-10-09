/**
 * Common TypeScript utility types
 */

/**
 * Nominal typing helper for creating branded types
 * @example
 * type UserId = Brand<string, 'UserId'>;
 * const id: UserId = 'abc' as UserId;
 */
export type Brand<K, T> = K & { __brand: T };

/**
 * Make specific keys required in a type
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific keys optional in a type
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Extract keys from T that are of type U
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
