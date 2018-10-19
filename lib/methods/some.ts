/** returns boolean */
export type CallBackSome<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<boolean>;

/**
 * Async Some function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackSome<T>} cb
 * @returns {Promise<boolean>}
 */
export async function some<T>(
  elements: T[],
  cb: CallBackSome<T>
): Promise<boolean> {
  for (const [index, element] of elements.entries()) {
    if (await cb(element, index, elements)) {
      return true;
    }
  }

  return false;
}
