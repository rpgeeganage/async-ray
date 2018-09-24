/**
 * Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
 * @param thisArgs
 * @param collection
 * @param callback
 */
export async function forEach(
  thisArgs: [],
  collection: [],
  callback: (element: any, index: number, collection: []) => Promise<void>
): Promise<void> {
  const O = Object(collection);
  const len = collection.length;
  const T = thisArgs;
  let k = 0;
  while (k < len) {
    let kValue;
    if (k in O) {
      kValue = O[k];
      await callback.apply(T, [kValue, k, O]);
    }
    k++;
  }
}
