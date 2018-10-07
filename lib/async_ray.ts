import * as Methods from './methods';

/**
 * AsyncArray Class
 *
 * @class AsyncArray
 * @extends {Array<T>}
 * @template T
 */
export class AsyncArray<T> extends Array<T> {
  private input: T[];

  /**
   * Creates an instance of AsyncArray
   * @param {...T[]} args
   * @memberof AsyncArray
   */
  constructor(...args: T[]) {
    super(...args);
    this.input = args;
  }

  /**
   * Async Filter method
   *
   * @param {Methods.CallBackFilter<T>} cb
   * @returns
   * @memberof AsyncArray
   */
  async aFilter(cb: Methods.CallBackFilter<T>) {
    return await Methods.filter<T>(this.input, cb);
  }

  /**
   * Async find method
   *
   * @param {Methods.CallBackFind<T>} cb
   * @returns
   * @memberof AsyncArray
   */
  async aFind(cb: Methods.CallBackFind<T>) {
    return await Methods.find<T>(this.input, cb);
  }

  /**
   * Async ForEach method
   *
   * @param {Methods.CallBackForEach<T>} cb
   * @memberof AsyncArray
   */
  async aForEach(cb: Methods.CallBackForEach<T>) {
    await Methods.forEach<T>(this.input, cb);
  }

  /**
   * Async Map method
   *
   * @template R
   * @param {Methods.CallBackMap<T, R>} cb
   * @returns
   * @memberof AsyncArray
   */
  async aMap<R>(cb: Methods.CallBackMap<T, R>) {
    return await Methods.map<T, R>(this.input, cb);
  }

  /**
   * Async Reduce method
   *
   * @template R
   * @param {Methods.CallBackReduce<T, R>} cb
   * @param {*} [initialValue]
   * @returns
   * @memberof AsyncArray
   */
  async aReduce<R>(cb: Methods.CallBackReduce<T, R>, initialValue?: any) {
    return await Methods.reduce(this.input, cb, initialValue);
  }
}
