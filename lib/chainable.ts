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
  | methods.CallBackSome<any>;

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
  private callStack: SingleCall[] = [];

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
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aEvery(cb: methods.CallBackEvery<T>): Chainable<T> {
    this.add(methods.aEvery, cb);

    return this;
  }

  /**
   * aFilter method of Async-Ray lib
   *
   * @param {methods.CallBackFilter<T>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aFilter(cb: methods.CallBackFilter<T>): Chainable<T> {
    this.add(methods.aFilter, cb);

    return this;
  }

  /**
   * aFind method of Async-Ray lib
   *
   * @param {methods.CallBackFind<T>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aFind(cb: methods.CallBackFind<T>): Chainable<T> {
    this.add(methods.aFind, cb);

    return this;
  }

  /**
   * aFindIndex method of Async-Ray lib
   *
   * @param {methods.CallBackFindIndex<T>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aFindIndex(cb: methods.CallBackFindIndex<T>): Chainable<T> {
    this.add(methods.aFindIndex, cb);

    return this;
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
    this.add(methods.aMap, cb);

    return this;
  }

  /**
   * aReduce method of Async-Ray lib
   *
   * @template R
   * @param {methods.CallBackReduce<T, R>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aReduce<R>(cb: methods.CallBackReduce<T, R>, initialValue?: R): Chainable<T> {
    this.add(methods.aReduce, cb, initialValue);

    return this;
  }

  /**
   * aReduceRight method of Async-Ray lib
   *
   * @template R
   * @param {methods.CallBackReduceRight<T, R>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aReduceRight<R>(
    cb: methods.CallBackReduceRight<T, R>,
    initialValue?: R
  ): Chainable<T> {
    this.add(methods.aReduceRight, cb, initialValue);

    return this;
  }

  /**
   * aSome method of Async-Ray lib
   *
   * @template R
   * @param {methods.CallBackSome<T>} cb
   * @returns {Chainable<T>}
   * @memberof Chainable
   */
  aSome<R>(cb: methods.CallBackSome<T>): Chainable<T> {
    this.add(methods.aSome, cb);

    return this;
  }

  /**
   * Process the call stack
   *
   * @returns {Promise<any>}
   * @memberof Chainable
   */
  async process(): Promise<any> {
    let currentInput = this.input;
    while (this.callStack.length) {
      try {
        if (!Array.isArray(currentInput)) {
          throw new Error(
            'Unable to process, since last input is not an array'
          );
        }

        const method = this.callStack.shift() as SingleCall;
        currentInput = await method.method.call(
          null,
          currentInput,
          method.callBack,
          method.additional
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
   * Add element to the call stack
   *
   * @private
   * @param {Function} method
   * @param {CallBacks} callBack
   * @memberof Chainable
   */
  private add(method: Function, callBack: CallBacks, additional?: any): void {
    this.callStack.push({ method, callBack, additional });
  }

  /**
   * clear the call stack
   *
   * @private
   * @memberof Chainable
   */
  private clear() {
    this.callStack = [];
  }
}
