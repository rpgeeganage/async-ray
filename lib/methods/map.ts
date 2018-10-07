/** returns any type values */
export type CallBackMap<T, R> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<R>;

/**
 * Async Map function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackMap<T>} cb
 * @returns {Promise<any[]>}
 */
export async function map<T, R>(
  elements: T[],
  cb: CallBackMap<T, R>
): Promise<R[]> {
  const mappedResults: R[] = [];
  for (const [index, element] of elements.entries()) {
    const mappedResult = await cb(element, index, elements);
    mappedResults.push(mappedResult);
  }

  return mappedResults;
}
