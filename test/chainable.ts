import 'mocha';
import * as should from 'should';
import { Chain } from '../lib/';
import { AsyncArray } from '../lib/async_array';

describe('Chainable', () => {
  it('should return AsyncRay instance', async () => {
    const input = [1, 2, 3, 4];

    const op = await Chain(input)
      .aMap((e) => Promise.resolve(e * 10))
      .process();

    should(op)
      .instanceOf(AsyncArray)
      .containDeepOrdered([10, 20, 30, 40]);
  });

  it('should process multiple async functions', async () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const op = await Chain(input)
      .aMap((e) => Promise.resolve(e * 10))
      .aFilter((e) => Promise.resolve(e > 30))
      .aMap((e) => Promise.resolve(e * 10))
      .aFilter((e) => Promise.resolve(e > 600))
      .process();

    should(op)
      .instanceOf(AsyncArray)
      .containDeepOrdered([700, 800, 900, 1000]);
  });

  it('should not allow to chain if return value is not an array', async () => {
    const input = [1, 2, 3, 4];

    should(
      Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 30))
        .aEvery((e) => Promise.resolve(e > 10))
        .aFilter((e) => Promise.resolve(e > 30))
        .process()
    ).be.rejectedWith('Unable to process, since last input is not an array');
  });

  it('should allow to chain if return value is not an array in last call', async () => {
    const input = [1, 2, 3, 4, 5, 6, 7];

    const op = await Chain(input)
      .aMap((e) => Promise.resolve(e * 10))
      .aFilter((e) => Promise.resolve(e > 30))
      .aMap((e) => Promise.resolve(e * 10))
      .aFilter((e) => Promise.resolve(e > 400))
      .aMap((e) => Promise.resolve(e * 10))
      .aFilter((e) => Promise.resolve(e > 5000))
      .aSome((e) => Promise.resolve(e > 5000))
      .process();

    should(op).be.true();
  });
});
