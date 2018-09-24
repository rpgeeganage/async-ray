/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Polyfill
 * @param thisArgs
 * @param collection
 * @param callback
 */
export async function reduce(
  thisArgs: [],
  collection: [],
  initialValue: any,
  callback: (
    accumulator: any,
    element: any,
    index: number,
    collection: []
  ) => Promise<any[]>
) {
  const o = Object(collection);
  const len = o.length || 0;
  let k = 0;
  let value = initialValue;
  while (k < len) {
    if (k in o) {
      value = await callback(value, o[k], k, o);
    }
    k++;
  }

  return value;
}
