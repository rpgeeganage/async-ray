import 'mocha';
import * as should from 'should';
import { Chain } from '../lib/';
import { AsyncArray } from '../lib/async_array';

describe('Chainable', () => {
  it('should handle an empty array', async () => {
    const op = await Chain([])
      .aMap((e) => Promise.resolve(e * 10))
      .aMap((e) => Promise.resolve(e * 10))
      .aFilter((e) => Promise.resolve(e > 30))
      .aMap((e) => Promise.resolve(e * 10))
      .aFilter((e) => Promise.resolve(e > 600))
      .process();

    should(op)
      .instanceOf(AsyncArray)
      .instanceOf(Array)
      .empty();
  });

  it('should return AsyncRay instance if returned value is an array', async () => {
    const input = [1, 2, 3, 4];

    const op = await Chain(input)
      .aMap((e) => Promise.resolve(e * 10))
      .process();

    should(op)
      .instanceOf(AsyncArray)
      .instanceOf(Array)
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
      .instanceOf(Array)
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

  describe('Chain methods', () => {
    it('aEvery', async () => {
      const input = [1, 2, 3, 4];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 20))
        .aEvery((e) => Promise.resolve(e > 10))
        .process();

      should(op).be.true();
    });

    it('aFind', async () => {
      const input = [1, 2, 3, 4];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 20))
        .aFind((e) => Promise.resolve(e === 30))
        .process();

      should(op).eql(30);
    });

    it('aFindIndex', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 20))
        .aFindIndex((e) => Promise.resolve(e === 40))
        .process();

      should(op).eql(1);
    });

    it('aReduce with initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 10))
        .aReduce(async (acc, i) => {
          return acc + (await Promise.resolve(i));
        }, 10)
        .process();

      should(op).eql(150);
    });

    it('aReduce without initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 10))
        .aReduce(async (acc, i) => {
          if (!acc) {
            return Promise.resolve(i);
          }
          return (acc as number) + (await Promise.resolve(i));
        })
        .process();

      should(op).eql(140);
    });

    it('aReduceRight with initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 10))
        .aReduceRight(async (acc, i) => {
          return acc + (await Promise.resolve(i));
        }, 10)
        .process();

      should(op).eql(150);
    });

    it('aReduceRight without initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 10))
        .aReduceRight(async (acc, i) => {
          if (!acc) {
            return Promise.resolve(i);
          }
          return (acc as number) + (await Promise.resolve(i));
        })
        .process();

      should(op).eql(140);
    });

    it('aSome', async () => {
      const input = [1, 2, 3, 4];

      const op = await Chain(input)
        .aMap((e) => Promise.resolve(e * 10))
        .aFilter((e) => Promise.resolve(e > 20))
        .aSome((e) => Promise.resolve(e > 10))
        .process();

      should(op).be.true();
    });
  });
});
