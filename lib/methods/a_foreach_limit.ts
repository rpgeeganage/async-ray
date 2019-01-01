import { chunkByLimit } from '../util';
import { CallBackForEach, aForEach } from './a_foreach';

/**
 * Async ForEach Limit function
 *
 * @export
 * @template T
 * @param {T[]} elements
 * @param {CallBackForEach<T>} cb
 * @param {number} limit
 * @returns {Promise<void>}
 */
export async function aForEachLimit<T>(
  elements: T[],
  cb: CallBackForEach<T>,
  limit: number
): Promise<void> {
  const chunks = chunkByLimit(limit, elements);
  for (const chunk of chunks) {
    await aForEach(chunk, cb);
  }
}
