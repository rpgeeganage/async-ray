import {
  filter as filterPf,
  find as findPf,
  forEach as forEachPf,
  map as mapPf,
  reduce as reducePf
} from '../polyfill';

type pfFunctions =
  | typeof filterPf
  | typeof forEachPf
  | typeof mapPf
  | typeof reducePf;

export class Handler {
  private input: Handler | [];
  constructor(input: Handler | []) {
    if (!Array.isArray(input) && !(input instanceof Handler)) {
      throw new TypeError('Invalid input');
    }

    if (input instanceof Handler) {
      this.input = input.value;
    } else {
      this.input = input;
    }
  }

  get value() {
    return this.input;
  }

  /**
   * ForEach
   * @param  {any} cb
   * @returns Promise
   */
  public async forEach(
    cb: (value: any, index?: number, collection?: any[]) => Promise<void>
  ): Promise<void> {
    await this.callPf(forEachPf, cb);
  }

  /**
   * Map
   * @param  {any} cb
   * @returns Promise<any[]>
   */
  public async map(
    cb: (value: any, index?: number, collection?: any[]) => Promise<void>
  ): Promise<Handler> {
    return new Handler(await this.callPf(mapPf, cb));
  }

  /**
   * filter
   * @param  {any} cb
   * @returns Promise<any[]>
   */
  public async filter(
    cb: (value: any, index?: number, collection?: any[]) => Promise<void>
  ): Promise<Handler> {
    return new Handler(await this.callPf(filterPf, cb));
  }

  /**
   * find
   * @param  {any} cb
   * @returns Promise<any>
   */
  public async find(
    cb: (value: any, index?: number, collection?: any[]) => Promise<void>
  ): Promise<any> {
    return await this.callPf(findPf, cb);
  }

  /**
   * find
   * @param  {any} cb
   * @returns Promise<any>
   */
  public async reduce(
    initialValue: any,
    cb: (value: any, index?: number, collection?: any[]) => Promise<any>
  ): Promise<any> {
    if (initialValue === undefined) {
      throw new TypeError('initial value is not defined');
    }

    return await this.callPf(reducePf, cb, initialValue);
  }

  public toJSON() {
    return this.input;
  }

  public toString(): string {
    return this.input.toString();
  }

  /**
   * Check whether the give object is function
   * Source from https://github.com/then/is-promise/blob/master/index.js
   * @param  {any} cb
   * @returns boolean
   */
  private isPromise(cb: any): boolean {
    return (
      !!cb &&
      (((typeof cb === 'object' || typeof cb === 'function') &&
        typeof cb.then === 'function') ||
        (cb.constructor && cb.constructor.name === 'AsyncFunction'))
    );
  }

  /**
   * Call polly fills
   * @param  {pfFunctions} pfFunction
   * @param  {any} cb
   * @returns Promise
   */
  private async callPf(
    pfFunction: pfFunctions,
    cb: any,
    initialValue?: any
  ): Promise<any[] | undefined | any> {
    if (!this.isPromise(cb)) {
      throw new TypeError('Callback is not an async method');
    }
    if (initialValue !== undefined) {
      return pfFunction.apply(this, [this.input, this.input, initialValue, cb]);
    }

    return pfFunction.apply(this, [this.input, this.input, cb]);
  }
}
