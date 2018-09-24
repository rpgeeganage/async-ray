/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill
 * @param thisArgs
 * @param collection
 * @param callback
 */
export async function find(
  thisArgs: [],
  collection: [],
  predicate: (element: any, index: number, collection: []) => Promise<any>
): Promise<any> {
  const o = Object(collection);
  const len = o.length;
  const thisArg = thisArgs;
  let k = 0;
  while (k < len) {
    const kValue = o[k];
    if (await predicate.call(thisArg, kValue, k, o)) {
      return kValue;
    }
    k++;
  }

  return undefined;
}
