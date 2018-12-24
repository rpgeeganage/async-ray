/** returns any type value */
export type CallBackReduceRight<T, R> = (
  accumulator: T | R,
  value: T,
  index?: number,
  collection?: T[]
) => Promise<T | R>;

/**
 * Async ReduceRight function
 *
 * @export
 * @template T
 * @template R
 * @param {T[]} elements
 * @param {CallBackReduceRight<T, R>} cb
 * @param {R} [initialValue]
 * @returns {Promise<T | R>}
 */
export async function aReduceRight<T, R>(
  elements: T[],
  cb: CallBackReduceRight<T, R>,
  initialValue?: R
): Promise<T | R> {
  if (!elements.length && initialValue === undefined) {
    throw new Error('Reduce of empty array with no initial value');
  }

  let reducedValue: T | R;
  let index = elements.length - 1;

  if (initialValue === undefined) {
    reducedValue = elements[index] as T;
    index--;
  } else {
    reducedValue = initialValue;
  }

  for (; index >= 0; index--) {
    reducedValue = await cb(reducedValue, elements[index], index, elements);
  }

  return reducedValue;
}
