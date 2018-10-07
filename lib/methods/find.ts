/** returns T or undefined */
export type CallBackFind<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<T | undefined>;

/**
 * Async Find function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackFind<T>} cb
 * @returns {Promise<T[]>}
 */
export async function find<T>(
  elements: T[],
  cb: CallBackFind<T>
): Promise<T | undefined> {
  let foundItem: T | undefined;
  for (const [index, element] of elements.entries()) {
    foundItem = await cb(element, index, elements);
    if (foundItem !== undefined) {
      return foundItem;
    }
  }

  return undefined;
}
