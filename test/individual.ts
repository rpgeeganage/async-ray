import 'mocha';
import * as should from 'should';
import {
  aEvery,
  aFilter,
  aFind,
  aFindIndex,
  aForEach,
  aMap,
  aReduce,
  aReduceRight,
  aSome
} from '../dist/index';

describe('Testing individual methods', () => {
  it('every', async () => {
    const response = await aEvery([1, 2, 3], async (e) =>
      Promise.resolve(e > 0)
    );
    should(response).be.true();
  });

  it('filter', async () => {
    const response = await aFilter([1, 2, 3], async (e) =>
      Promise.resolve(e > 1)
    );
    should(response).be.containDeepOrdered([2, 3]);
  });

  it('find', async () => {
    const response = await aFind([1, 2, 3], async (e) =>
      Promise.resolve(e === 3)
    );
    should(response).be.eql(3);
  });

  it('findIndex', async () => {
    const response = await aFindIndex([1, 2, 3], async (e) =>
      Promise.resolve(e === 2)
    );
    should(response).be.eql(1);
  });

  it('forEach', async () => {
    const response: number[] = [];
    await aForEach([1, 2, 3], async (e) => {
      const op = await await Promise.resolve(e * 10);
      response.push(op);
    });
    should(response).be.eql([10, 20, 30]);
  });

  it('map', async () => {
    const response = await aMap([1, 2, 3], async (e) =>
      Promise.resolve(e * 10)
    );
    should(response).be.containDeepOrdered([10, 20, 30]);
  });

  it('reduce', async () => {
    const response = await aReduce(
      [1, 2, 3],
      async (acc, e) => Promise.resolve(e + acc),
      0
    );
    should(response).eql(6);
  });

  it('reduceRight', async () => {
    const response = await aReduceRight(
      [1, 2, 3],
      async (acc, e) => Promise.resolve(e + acc),
      0
    );
    should(response).eql(6);
  });

  it('every', async () => {
    const response = await aSome([1, 2, 3], async (e) =>
      Promise.resolve(e > 1)
    );
    should(response).be.true();
  });
});
