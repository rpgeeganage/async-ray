import { chunkByLimit } from '../util';
import { CallBackSome, aSome } from './a_some';

/**
 * Async Some Limit function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackSome<T>} cb
 * @param {number} limit
 * @returns {Promise<boolean>}
 */
export async function aSomeLimit<T>(
  elements: T[],
  cb: CallBackSome<T>,
  limit: number
): Promise<boolean> {
  const chunks = chunkByLimit(limit, elements);
  for (const chunk of chunks) {
    const returnValue = await aSome(chunk, cb);
    if (returnValue) {
      return true;
    }
  }

  return false;
}
