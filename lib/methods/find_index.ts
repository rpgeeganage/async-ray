/** returns boolean */
export type CallBackFindIndex<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<boolean>;

/**
 * Async FindIndex function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackFind<T>} cb
 * @returns {Promise<number>}
 */
export async function findIndex<T>(
  elements: T[],
  cb: CallBackFindIndex<T>
): Promise<number> {
  for (const [index, element] of elements.entries()) {
    if (await cb(element, index, elements)) {
      return index;
    }
  }

  return -1;
}
