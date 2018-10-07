/** returns boolean */
export type CallBackFind<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<boolean>;

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
  for (const [index, element] of elements.entries()) {
    if (await cb(element, index, elements)) {
      return element;
    }
  }

  return undefined;
}
