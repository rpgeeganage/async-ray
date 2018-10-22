/** returns any type value */
export type CallBackReduceRight<T, R> = (
  accumulator: R,
  value: T,
  index?: number,
  collection?: T[]
) => Promise<R>;

/**
 * Async ReduceRight function
 *
 * @export
 * @template T
 * @template R
 * @param {T[]} elements
 * @param {CallBackReduceRight<T, R>} cb
 * @param {R} [initialValue]
 * @returns {Promise<R>}
 */
export async function reduceRight<T, R>(
  elements: T[],
  cb: CallBackReduceRight<T, R>,
  initialValue?: R
): Promise<R> {
  let reducedValue: any = initialValue;
  for (const [index, element] of elements.reverse().entries()) {
    reducedValue = await cb(reducedValue, element, index, elements);
  }

  return reducedValue;
}
