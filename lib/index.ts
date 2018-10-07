import { AsyncArray } from './async_ray';

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
