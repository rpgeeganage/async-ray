/** returns boolean */
export type CallBackFilter<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<boolean>;

/**
 * Async Filter function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackFilter<T>} cb
 * @returns {Promise<T[]>}
 */
export async function filter<T>(
  elements: T[],
  cb: CallBackFilter<T>
): Promise<T[]> {
  const filteredResults: T[] = [];
  for (const [index, element] of elements.entries()) {
    if (await cb(element, index, elements)) {
      filteredResults.push(element);
    }
  }

  return filteredResults;
}
