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
export async function reduceRight<T, R>(
  elements: T[],
  cb: CallBackReduceRight<T, R>,
  initialValue?: R
): Promise<T | R> {
  if (!elements.length && !initialValue) {
    throw new Error('Reduce of empty array with no initial value');
  }

  let reducedValue: T | R;

  const reversedElements = [...elements].reverse();
  if (initialValue === undefined) {
    reducedValue = reversedElements.shift() as T;
  } else {
    reducedValue = initialValue;
  }

  for (const [index, element] of reversedElements.entries()) {
    reducedValue = await cb(reducedValue, element, index, reversedElements);
  }

  return reducedValue;
}
