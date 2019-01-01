import { chunkByLimit } from '../util';
import { CallBackFilter, aFilter } from './a_filter';

/**
 * Async Filter Limit function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackFilter<T>} cb
 * @param {number} limit
 * @returns {Promise<T[]>}
 */
export async function aFilterLimit<T>(
  elements: T[],
  cb: CallBackFilter<T>,
  limit: number
): Promise<T[]> {
  let filteredResults: T[] = [];

  const chunks = chunkByLimit(limit, elements);
  for (const chunk of chunks) {
    const returnValue = await aFilter(chunk, cb);

    if (returnValue.length) {
      filteredResults = [...filteredResults, ...returnValue];
    }
  }

  return filteredResults;
}
