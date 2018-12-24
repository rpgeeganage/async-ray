import { AsyncArray } from './async_ray';
import { Chainable } from './chain';

/**
 * Get AsyncArray element
 *
 * @export
 * @template T
 * @param {...T[]} elements
 * @returns
 */
export function AsyncRay<T>(elements: T[]) {
  return new AsyncArray<T>(...elements);
}

/**
 * Get chainable instance
 *
 * @export
 * @template T
 * @param {T[]} input
 * @returns
 */
export function Chain<T>(input: T[]) {
  return new Chainable<T>(input);
}

export * from './methods';
