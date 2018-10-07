/** returns any type value */
export type CallBackReduce<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<any>;

/**
 * Interface for Async Reduce functionality
 *
 * @export
 * @interface Reduce
 * @template T
 */
export interface Reduce<T> {
  reduce(cb: CallBackReduce<T>): Promise<any>;
}

/**
 * Async Reduce function
 *
 * @export
 * @template T
 * @template R
 * @param {*} initialValue
 * @param {T[]} elements
 * @param {CallBackReduce<T>} cb
 * @returns {Promise<R>}
 */
export async function reduce<T>(
  initialValue: any,
  elements: T[],
  cb: CallBackReduce<T>
): Promise<any> {
  let reducedValue: any = initialValue;
  for (const [index, element] of elements.entries()) {
    reducedValue = await cb(element, index, elements);
  }

  return reducedValue;
}
