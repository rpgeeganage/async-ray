import 'mocha';
import * as should from 'should';
import { Chain } from '../lib/';
import { AsyncArray } from '../lib/async_array';
import { Chainable } from '../lib/chainable';

describe('Chainable', () => {
  it('should handle an empty array', async () => {
    const op = await Chain([])
      .aMap(async (e) => Promise.resolve(e * 10))
      .aMap(async (e) => Promise.resolve(e * 10))
      .aFilter(async (e) => Promise.resolve(e > 30))
      .aMap(async (e) => Promise.resolve(e * 10))
      .aFilter(async (e) => Promise.resolve(e > 600))
      .process();

    should(op)
      .instanceOf(AsyncArray)
      .instanceOf(Array)
      .empty();
  });

  it('should return AsyncRay instance if returned value is an array', async () => {
    const input = [1, 2, 3, 4];

    const op = await Chain(input)
      .aMap(async (e) => Promise.resolve(e * 10))
      .process();

    should(op)
      .instanceOf(AsyncArray)
      .instanceOf(Array)
      .containDeepOrdered([10, 20, 30, 40]);
  });

  it('should process multiple async functions', async () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const op = await Chain(input)
      .aMap(async (e) => Promise.resolve(e * 10))
      .aFilter(async (e) => Promise.resolve(e > 30))
      .aMap(async (e) => Promise.resolve(e * 10))
      .aFilter(async (e) => Promise.resolve(e > 600))
      .process();

    should(op)
      .instanceOf(AsyncArray)
      .instanceOf(Array)
      .containDeepOrdered([700, 800, 900, 1000]);
  });

  it('should throw and halt execution in case of error during the process', async () => {
    const input = [1, 2, 3, 4];

    should(
      Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 30))
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 30))
        .aFilter(async (e) => {
          throw new Error('This is an error');
        })
        .aMap(async (e) => Promise.resolve(e * 10))
        .process()
    ).be.rejectedWith('This is an error');
  });

  it('should execute chaining process, if none chainable method was added', async () => {
    const input = [1, 2, 3, 4, 5, 6, 7];

    const op = await Chain(input)
      .aMap(async (e) => Promise.resolve(e * 10))
      .aFilter(async (e) => Promise.resolve(e > 30))
      .aMap(async (e) => Promise.resolve(e * 10))
      .aFilter(async (e) => Promise.resolve(e > 400))
      .aMap(async (e) => Promise.resolve(e * 10))
      .aFilter(async (e) => Promise.resolve(e > 5000))
      .aSome(async (e) => Promise.resolve(e > 5000));

    should(op).be.true();
  });

  describe('Chainable methods', () => {
    it('aFilter', async () => {
      const input = [100, 200, 300];
      const op = await Chain(input)
        .aFilter(async (e) => Promise.resolve(e > 100))
        .aFilter(async (e) => Promise.resolve(e > 200))
        .process();

      should(op)
        .instanceOf(AsyncArray)
        .instanceOf(Array)
        .containDeepOrdered([300]);
    });

    it('aFlatMap', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aFlatMap(async (e) => Promise.resolve([e, e * 2]))
        .aMap(async (e) => Promise.resolve(e * 2))
        .process();

      should(op)
        .instanceOf(AsyncArray)
        .instanceOf(Array)
        .containDeepOrdered([2, 4, 4, 8, 6, 12, 8, 16, 10, 20]);
    });

    it('aMap', async () => {
      const input = [1, 2, 3];
      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aMap(async (e) => Promise.resolve(e * 10))
        .process();

      should(op)
        .instanceOf(AsyncArray)
        .instanceOf(Array)
        .containDeepOrdered([100, 200, 300]);
    });

    it('Chainable methods has to call process methods to get the value', async () => {
      const input = [1, 2, 3];
      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 10));

      should(op).instanceOf(Chainable);
    });
  });

  describe('Methods', () => {
    it('can be used without any chainable method', async () => {
      const input = [1, 2, 3, 4];

      const op = await Chain(input).aSome(async (e) => Promise.resolve(e > 1));

      should(op).be.true();
    });

    it('aEvery', async () => {
      const input = [1, 2, 3, 4];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 20))
        .aEvery(async (e) => Promise.resolve(e > 10));

      should(op).be.true();
    });

    it('aFind', async () => {
      const input = [1, 2, 3, 4];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 20))
        .aFind(async (e) => Promise.resolve(e === 30));

      should(op).eql(30);
    });

    it('aFindIndex', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 20))
        .aFindIndex(async (e) => Promise.resolve(e === 40));

      should(op).eql(1);
    });

    it('aForEach', async () => {
      const input = [1, 2, 3, 4, 5];
      const op: number[] = [];
      await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 20))
        .aForEach(async (e) => {
          const element = await Promise.resolve(e);
          op.push(element);
        });

      should(op).containDeepOrdered([30, 40, 50]);
    });

    it('aReduce with initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 10))
        .aReduce(async (acc, i) => {
          return acc + (await Promise.resolve(i));
        }, 10);

      should(op).eql(150);
    });

    it('aReduce without initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 10))
        .aReduce(async (acc, i) => {
          if (!acc) {
            return Promise.resolve(i);
          }
          return (acc as number) + (await Promise.resolve(i));
        });

      should(op).eql(140);
    });

    it('aReduceRight with initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 10))
        .aReduceRight(async (acc, i) => {
          return acc + (await Promise.resolve(i));
        }, 10);

      should(op).eql(150);
    });

    it('aReduceRight without initial value', async () => {
      const input = [1, 2, 3, 4, 5];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 10))
        .aReduceRight(async (acc, i) => {
          if (!acc) {
            return Promise.resolve(i);
          }
          return (acc as number) + (await Promise.resolve(i));
        });

      should(op).eql(140);
    });

    it('aSome', async () => {
      const input = [1, 2, 3, 4];

      const op = await Chain(input)
        .aMap(async (e) => Promise.resolve(e * 10))
        .aFilter(async (e) => Promise.resolve(e > 20))
        .aSome(async (e) => Promise.resolve(e > 10));

      should(op).be.true();
    });
  });
});
