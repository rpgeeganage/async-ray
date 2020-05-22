import { aMap } from './a_map';

/** returns any type values */
export type CallBackFlatMap<T, R> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<R>;

/**
 * Async Flay Map function
 *
 * @export
 * @template T
 * @template R
 * @param {T[]} elements
 * @param {CallBackFlatMap<T, R>} cb
 * @returns {Promise<R[]>}
 */
export async function aFlatMap<T, R>(
  elements: T[],
  cb: CallBackFlatMap<T, R>
): Promise<R[]> {
  const results = await aMap(elements, cb);

  return results.reduce(
    (a: R[], r: R | R[]) => (Array.isArray(r) ? a.concat(...r) : a.concat(r)),
    []
  );
}
