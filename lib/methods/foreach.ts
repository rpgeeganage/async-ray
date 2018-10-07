/** returns nothing */
export type CallBackForEach<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<void>;

/**
 * Async ForEach function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackForEach<T>} cb
 * @returns {Promise<void>}
 */
export async function forEach<T>(
  elements: T[],
  cb: CallBackForEach<T>
): Promise<void> {
  for (const [index, element] of elements.entries()) {
    await cb(element, index, elements);
  }
}
