import { chunkByLimit } from '../util';
import { CallBackMap, aMap } from './a_map';

/**
 * Async Map Limit function
 *
 * @export
 * @template T
 * @template R
 * @param {T[]} elements
 * @param {CallBackMap<T, R>} cb
 * @param {number} limit
 * @returns {Promise<R[]>}
 */
export async function aMapLimit<T, R>(
  elements: T[],
  cb: CallBackMap<T, R>,
  limit: number
): Promise<R[]> {
  let mappedResults: R[] = [];

  const chunks = chunkByLimit(limit, elements);
  for (const chunk of chunks) {
    const returnValue = await aMap(chunk, cb);
    mappedResults = [...mappedResults, ...returnValue];
  }

  return mappedResults;
}
