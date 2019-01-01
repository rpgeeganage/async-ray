import { chunkByLimit } from '../util';
import { CallBackFind, aFind } from './a_find';

/**
 * Async Find limit function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackFind<T>} cb
 * @param {number} limit
 * @returns {(Promise<T | undefined>)}
 */
export async function aFindLimit<T>(
  elements: T[],
  cb: CallBackFind<T>,
  limit: number
): Promise<T | undefined> {
  const chunks = chunkByLimit(limit, elements);
  for (const chunk of chunks) {
    const returnValue = await aFind(chunk, cb);
    if (returnValue !== undefined) {
      return returnValue;
    }
  }

  return undefined;
}
