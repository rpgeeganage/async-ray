/** returns boolean */
export type CallBackEvery<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<boolean>;

/**
 * Async Every function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackEvery<T>} cb
 * @returns {Promise<boolean>}
 */
export async function every<T>(
  elements: T[],
  cb: CallBackEvery<T>
): Promise<boolean> {
  for (const [index, element] of elements.entries()) {
    if (!(await cb(element, index, elements))) {
      return false;
    }
  }

  return true;
}
