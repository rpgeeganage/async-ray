/** returns any type value */
export type CallBackReduce<T, R> = (
  accumulator: R,
  value: T,
  index?: number,
  collection?: T[]
) => Promise<R>;

/**
 * Async Reduce function
 *
 * @export
 * @template T
 * @template R
 * @param {*} initialValue
 * @param {T[]} elements
 * @param {CallBackReduce<T, R>} cb
 * @returns {Promise<R>}
 */
export async function reduce<T, R>(
  elements: T[],
  cb: CallBackReduce<T, R>,
  initialValue?: R
): Promise<R> {
  let reducedValue: any;
  for (const [index, element] of elements.entries()) {
    reducedValue = await cb(reducedValue, element, index, elements);
  }

  return reducedValue;
}
