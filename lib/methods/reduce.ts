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
  if (!elements.length && !initialValue) {
    throw new Error('Reduce of empty array with no initial value');
  }

  let reducedValue: T | R;

  const copiedElements = [...elements];
  if (initialValue === undefined) {
    reducedValue = copiedElements.shift() as T;
  } else {
    reducedValue = initialValue;
  }

  for (const [index, element] of copiedElements.entries()) {
    reducedValue = await cb(reducedValue, element, index, copiedElements);
  }

  return reducedValue;
}
