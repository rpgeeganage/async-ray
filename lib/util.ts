/**
 * Get chunked the array based on the limit
 *
 * @export
 * @template T
 * @param {number} limit
 * @param {T[]} array
 * @returns {T[][]}
 */
export function chunkByLimit<T>(limit: number, array: T[]): T[][] {
  const absLimit = Math.abs(limit);
  if (absLimit > array.length) {
    return [array];
  }

  return array.reduce((chunks: T[][], e, i) => {
    if (i % limit === 0) {
      chunks.push([e]);
    } else {
      chunks[chunks.length - 1].push(e);
    }
    return chunks;
  }, []);
}
