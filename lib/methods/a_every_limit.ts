import { chunkByLimit } from '../util';
import { CallBackEvery, aEvery } from './a_every';

/**
 * Async Every Limit function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackEvery<T>} cb
 * @param {number} limit
 * @returns {Promise<boolean>}
 */
export async function aEveryLimit<T>(
  elements: T[],
  cb: CallBackEvery<T>,
  limit: number
): Promise<boolean> {
  const chunks = chunkByLimit(limit, elements);
  for (const [index, chunk] of chunks.entries()) {
    const returnValue = await aEvery(chunk, cb);
    if (index === chunks.length - 1 && returnValue === false) {
      return false;
    }
  }

  return true;
}
