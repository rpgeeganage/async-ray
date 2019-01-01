import * as Methods from './methods';

/**
 * AsyncArray Class
 *
 * @class AsyncArray
 * @extends {Array<T>}
 * @template T
 */
export class AsyncArray<T> extends Array<T> {
  /**
   * Creates an instance of AsyncArray
   * @param {...T[]} args
   * @memberof AsyncArray
   */
  constructor(...args: T[]) {
    /***
     * Why we need this ?
     * if we pass one element array with an number as below,
     * const foo = AsyncArray(...[20]);
     * Based https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Syntax
     * a new Array will be created with 20 empty elements, as below.
     * [null, null, ...]
     * In order to avoid that, we need the particular workaround
     */
    if (args.length === 1 && typeof args[0] === 'number') {
      super(1);
      super[0] = args[0];
    } else {
      super(...args);
    }
  }

  /**
   * Async Every method
   *
   * @param {Methods.CallBackFilter<T>} cb
   * @returns {Promise<boolean>}
   * @memberof AsyncArray
   */
  async aEvery(cb: Methods.CallBackFilter<T>): Promise<boolean> {
    return Methods.aEvery<T>(this, cb);
  }

  /**
   * Async Every Limit method
   *
   * @param {Methods.CallBackFilter<T>} cb
   * @param {number} limit
   * @returns {Promise<boolean>}
   * @memberof AsyncArray
   */
  async aEveryLimit(
    cb: Methods.CallBackFilter<T>,
    limit: number
  ): Promise<boolean> {
    return Methods.aEveryLimit<T>(this, cb, limit);
  }

  /**
   * Async Filter method
   *
   * @param {Methods.CallBackFilter<T>} cb
   * @returns {Promise<T[]>}
   * @memberof AsyncArray
   */
  async aFilter(cb: Methods.CallBackFilter<T>): Promise<AsyncArray<T>> {
    return new AsyncArray(...(await Methods.aFilter<T>(this, cb)));
  }

  /**
   * Async Filter Limit method
   *
   * @param {Methods.CallBackFilter<T>} cb
   * @param {number} limit
   * @returns {Promise<T[]>}
   * @memberof AsyncArray
   */
  async aFilterLimit(
    cb: Methods.CallBackFilter<T>,
    limit: number
  ): Promise<AsyncArray<T>> {
    return new AsyncArray(...(await Methods.aFilterLimit<T>(this, cb, limit)));
  }

  /**
   * Async Find method
   *
   * @param {Methods.CallBackFind<T>} cb
   * @returns {Promise<T | undefined>}
   * @memberof AsyncArray
   */
  async aFind(cb: Methods.CallBackFind<T>): Promise<T | undefined> {
    return Methods.aFind<T>(this, cb);
  }

  /**
   * Async Find Limit method
   *
   * @param {Methods.CallBackFind<T>} cb
   * @param {number} limit
   * @returns {Promise<T | undefined>}
   * @memberof AsyncArray
   */
  async aFindLimit(
    cb: Methods.CallBackFind<T>,
    limit: number
  ): Promise<T | undefined> {
    return Methods.aFindLimit<T>(this, cb, limit);
  }

  /**
   * Async findIndex method
   *
   * @param {Methods.CallBackFindIndex<T>} cb
   * @returns {Promise<number>}
   * @memberof AsyncArray
   */
  async aFindIndex(cb: Methods.CallBackFindIndex<T>): Promise<number> {
    return Methods.aFindIndex<T>(this, cb);
  }

  /**
   * Async FindIndex Limit method
   *
   * @param {Methods.CallBackFindIndex<T>} cb
   * @param {number} limit
   * @returns {Promise<number>}
   * @memberof AsyncArray
   */
  async aFindIndexLimit(
    cb: Methods.CallBackFindIndex<T>,
    limit: number
  ): Promise<number> {
    return Methods.aFindIndexLimit<T>(this, cb, limit);
  }

  /**
   * Async ForEach method
   *
   * @param {Methods.CallBackForEach<T>} cb
   * @returns {Promise<void>}
   * @memberof AsyncArray
   */
  async aForEach(cb: Methods.CallBackForEach<T>): Promise<void> {
    await Methods.aForEach<T>(this, cb);
  }

  /**
   * Async ForEach method
   *
   * @param {Methods.CallBackForEach<T>} cb
   * @param {number} limit
   * @returns {Promise<void>}
   * @memberof AsyncArray
   */
  async aForEachLimit(
    cb: Methods.CallBackForEach<T>,
    limit: number
  ): Promise<void> {
    await Methods.aForEachLimit<T>(this, cb, limit);
  }

  /**
   * Async Map method
   *
   * @template R
   * @param {Methods.CallBackMap<T, R>} cb
   * @returns {Promise<R[]>}
   * @memberof AsyncArray
   */
  async aMap<R>(cb: Methods.CallBackMap<T, R>): Promise<AsyncArray<R>> {
    return new AsyncArray(...(await Methods.aMap<T, R>(this, cb)));
  }

  /**
   * Async Map Limit method
   *
   * @template R
   * @param {Methods.CallBackMap<T, R>} cb
   * @param {number} limit
   * @returns {Promise<R[]>}
   * @memberof AsyncArray
   */
  async aMapLimit<R>(
    cb: Methods.CallBackMap<T, R>,
    limit: number
  ): Promise<AsyncArray<R>> {
    return new AsyncArray(...(await Methods.aMapLimit<T, R>(this, cb, limit)));
  }

  /**
   * Async Reduce method
   *
   * @template R
   * @param {Methods.CallBackReduce<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<T | R>}
   * @memberof AsyncArray
   */
  async aReduce<R>(
    cb: Methods.CallBackReduce<T, R>,
    initialValue?: R
  ): Promise<T | R> {
    return Methods.aReduce(this, cb, initialValue);
  }

  /**
   * Async ReduceRight method
   *
   * @template R
   * @param {Methods.CallBackReduceRight<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<T | R>}
   * @memberof AsyncArray
   */
  async aReduceRight<R>(
    cb: Methods.CallBackReduceRight<T, R>,
    initialValue?: R
  ): Promise<T | R> {
    return Methods.aReduceRight(this, cb, initialValue);
  }

  /**
   * Async Some method
   *
   * @param {Methods.CallBackFilter<T>} cb
   * @returns {Promise<boolean>}
   * @memberof AsyncArray
   */
  async aSome(cb: Methods.CallBackFilter<T>): Promise<boolean> {
    return Methods.aSome<T>(this, cb);
  }

  /**
   * Async Some Limit method
   *
   * @param {Methods.CallBackFilter<T>} cb
   * @param {number} limit
   * @returns {Promise<boolean>}
   * @memberof AsyncArray
   */
  async aSomeLimit(
    cb: Methods.CallBackFilter<T>,
    limit: number
  ): Promise<boolean> {
    return Methods.aSomeLimit<T>(this, cb, limit);
  }
}
