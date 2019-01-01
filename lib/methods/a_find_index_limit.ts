import { chunkByLimit } from '../util';
import { CallBackFindIndex, aFindIndex } from './a_find_index';

/**
 * Async FindIndex Limit function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackFindIndex<T>} cb
 * @param {number} limit
 * @returns {Promise<number>}
 */
export async function aFindIndexLimit<T>(
  elements: T[],
  cb: CallBackFindIndex<T>,
  limit: number
): Promise<number> {
  let processedElementCount = 0;

  const chunks = chunkByLimit(limit, elements);
  for (const chunk of chunks) {
    const returnValue = await aFindIndex(chunk, cb);
    if (returnValue > -1) {
      return returnValue + processedElementCount;
    }

    processedElementCount += chunk.length;
  }

  return -1;
}
