/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Polyfill
 * @param thisArgs
 * @param collection
 * @param callback
 */
export async function map(
  thisArgs: [],
  collection: [],
  callback: (element: any, index: number, collection: []) => Promise<any>
): Promise<any[]> {
  const O = Object(collection);
  const len = O.length;
  const T = thisArgs;
  const A = new Array(len);
  let k = 0;
  while (k < len) {
    let kValue;
    let mappedValue;

    if (k in O) {
      kValue = O[k];
      mappedValue = await callback.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
    k++;
  }
  return A;
}
