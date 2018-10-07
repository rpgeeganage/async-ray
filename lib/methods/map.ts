/** returns any type values */
export type CallBackMap<T> = (
  value: T,
  index?: number,
  collection?: T[]
) => Promise<any[]>;

/**
 * Interface for Async Map
 *
 * @export
 * @interface Map
 * @template T
 */
export interface Map<T> {
  map(cb: CallBackMap<T>): Promise<any[]>;
}

/**
 * Async Map function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackMap<T>} cb
 * @returns {Promise<any[]>}
 */
export async function map<T>(
  elements: T[],
  cb: CallBackMap<T>
): Promise<any[]> {
  const mappedResults: any[] = [];
  for (const [index, element] of elements.entries()) {
    const mappedResult = await cb(element, index, elements);
    mappedResults.push(mappedResult);
  }

  return mappedResults;
}
