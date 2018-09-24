/**
 * Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Polyfill
 * @param thisArgs
 * @param collection
 * @param callback
 */
export async function filter(
  thisArgs: [],
  collection: [],
  callback: (element: any, index: number, collection: []) => Promise<any>
): Promise<any[]> {
  const len = collection.length;
  const res = new Array(len);
  const t = thisArgs;
  let c = 0;
  let i = -1;
  while (++i !== len) {
    if (i in t) {
      if (await callback.call(t, t[i], i, t)) {
        res[c++] = t[i];
      }
    }
  }

  res.length = c;
  return res;
}
