/** returns any type value */
export type CallBackReduce<T, R> = (
  accumulator: T | R,
  value: T,
  index?: number,
  collection?: T[]
) => Promise<T | R>;

/**
 * Async Reduce function
 *
 * @export
 * @template T
 * @template R
 * @param {T[]} elements
 * @param {CallBackReduce<T, R>} cb
 * @param {R} [initialValue]
 * @returns {Promise<T | R>}
 */
export async function reduce<T, R>(
  elements: T[],
  cb: CallBackReduce<T, R>,
  initialValue?: R
): Promise<T | R> {
  if (!elements.length && initialValue === undefined) {
    throw new Error('Reduce of empty array with no initial value');
  }

  let reducedValue: T | R;
  let index = 0;

  if (initialValue === undefined) {
    reducedValue = elements[0] as T;
    index++;
  } else {
    reducedValue = initialValue;
  }

  for (; index < elements.length; index++) {
    reducedValue = await cb(reducedValue, elements[index], index, elements);
  }

  return reducedValue;
}
