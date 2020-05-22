import { AsyncArray } from './async_array';
import * as methods from './methods';

type CallBacks =
  | methods.CallBackEvery<any>
  | methods.CallBackFilter<any>
  | methods.CallBackFind<any>
  | methods.CallBackFindIndex<any>
  | methods.CallBackMap<any, any>
  | methods.CallBackReduce<any, any>
  | methods.CallBackReduceRight<any, any>
  | methods.CallBackSome<any>
  | methods.CallBackFlatMap<any, any>;

/**
 * Interface for the single entry for the call stack
 *
 * @interface SingleCall
 */
interface SingleCall {
  method: Function;
  callBack: CallBacks;
  additional?: any;
}

/**
 * Chainable function handler
 *
 * @export
 * @class Chainable
 * @template T
 */
export class Chainable<T> {
  /**
   * Call Stack
   *
   * @private
   * @type {SingleCall[]}
   * @memberof Chainable
   */
  private callQueue: SingleCall[] = [];

  /**
   * Creates an instance of Chainable.
   * @param {T[]} input
   * @memberof Chainable
   */
  constructor(public input: T[]) {}

  /**
   * aEvery method of Async-Ray lib
   *
   * @param {methods.CallBackEvery<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aEvery(cb: methods.CallBackEvery<T>): Promise<any> {
    return this.addNoneChainableMethod(methods.aEvery, cb);
  }

  /**
   * aFilter method of Async-Ray lib
   *
   * @param {methods.CallBackFilter<T>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aFilter(cb: methods.CallBackFilter<T>): Chainable<T> {
    return this.addChainableMethod(methods.aFilter, cb);
  }

  /**
   * aFindIndex method of Async-Ray lib
   *
   * @param {methods.CallBackFindIndex<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aFindIndex(cb: methods.CallBackFindIndex<T>): Promise<any> {
    return this.addNoneChainableMethod(methods.aFindIndex, cb);
  }

  /**
   * aFind method of Async-Ray lib
   *
   * @param {methods.CallBackFind<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aFind(cb: methods.CallBackFind<T>): Promise<any> {
    return this.addNoneChainableMethod(methods.aFind, cb);
  }

  /**
   * aForEach method of Async-Ray lib
   *
   * @param {methods.CallBackForEach<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aForEach(cb: methods.CallBackForEach<T>): Promise<any> {
    return this.addNoneChainableMethod(methods.aForEach, cb);
  }

  /**
   * aMap method of Async-Ray lib
   *
   * @template R
   * @param {methods.CallBackMap<T, R>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aMap<R>(cb: methods.CallBackMap<T, R>): Chainable<T> {
    return this.addChainableMethod(methods.aMap, cb);
  }

  /**
   * aReduceRight method of Async-Ray lib
   *
   * @template R
   * @param {methods.CallBackReduceRight<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aReduceRight<R>(
    cb: methods.CallBackReduceRight<T, R>,
    initialValue?: R
  ): Promise<any> {
    return this.addNoneChainableMethod(methods.aReduceRight, cb, initialValue);
  }

  /**
   * aReduce method of Async-Ray lib
   *
   * @template R
   * @param {methods.CallBackReduce<T, R>} cb
   * @param {R} [initialValue]
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aReduce<R>(cb: methods.CallBackReduce<T, R>, initialValue?: R): Promise<any> {
    return this.addNoneChainableMethod(methods.aReduce, cb, initialValue);
  }

  /**
   * aSome method of Async-Ray lib
   *
   * @template R
   * @param {methods.CallBackSome<T>} cb
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  aSome<R>(cb: methods.CallBackSome<T>): Promise<any> {
    return this.addNoneChainableMethod(methods.aSome, cb);
  }

  /**
   * aFlatMap method of Async-Ray lib
   *
   * @template R
   * @param {CallBackFlatMap<T, R>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aFlatMap<R>(cb: methods.CallBackFlatMap<T, R>): Chainable<T> {
    return this.addChainableMethod(methods.aFlatMap, cb);
  }

  /**
   * Process the call stack
   *
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  async process(): Promise<any> {
    let currentInput = this.input;
    while (this.callQueue.length) {
      try {
        const nextCall = this.callQueue.shift() as SingleCall;
        currentInput = await nextCall.method.call(
          null,
          currentInput,
          nextCall.callBack,
          nextCall.additional
        );
      } catch (error) {
        this.clear();

        throw error;
      }
    }

    if (Array.isArray(currentInput)) {
      return new AsyncArray<T>(...currentInput);
    }

    return currentInput;
  }

  /**
   * Add chainable method to the call queue
   *
   * @private
   * @param {Function} method
   * @param {CallBacks} callBack
   * @param {*} [additional]
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  private addChainableMethod(
    method: Function,
    callBack: CallBacks,
    additional?: any
  ): Chainable<T> {
    this.add(method, callBack, additional);

    return this;
  }

  /**
   * Add none chainable method to the queue and execute the chaining process
   *
   * @private
   * @param {Function} method
   * @param {CallBacks} callBack
   * @param {*} [additional]
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  private addNoneChainableMethod(
    method: Function,
    callBack: CallBacks,
    additional?: any
  ): Promise<any> {
    this.add(method, callBack, additional);

    return this.process();
  }

  /**
   * Add element to the call queue
   *
   * @private
   * @param {Function} method
   * @param {CallBacks} callBack
   * @memberof Chainable
   */
  private add(method: Function, callBack: CallBacks, additional?: any): void {
    this.callQueue.push({ method, callBack, additional });
  }

  /**
   * clear the call queue
   *
   * @private
   * @memberof Chainable
   */
  private clear() {
    this.callQueue = [];
  }
}
