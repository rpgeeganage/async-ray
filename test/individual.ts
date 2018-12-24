import 'mocha';
import * as should from 'should';
import {
  every,
  filter,
  find,
  findIndex,
  forEach,
  map,
  reduce,
  reduceRight,
  some
} from '../dist/index';

describe('Testing individual methods', () => {
  it('every', async () => {
    const response = await every([1, 2, 3], async (e) =>
      Promise.resolve(e > 0)
    );
    should(response).be.true();
  });

  it('filter', async () => {
    const response = await filter([1, 2, 3], async (e) =>
      Promise.resolve(e > 1)
    );
    should(response).be.containDeepOrdered([2, 3]);
  });

  it('find', async () => {
    const response = await find([1, 2, 3], async (e) =>
      Promise.resolve(e === 3)
    );
    should(response).be.eql(3);
  });

  it('findIndex', async () => {
    const response = await findIndex([1, 2, 3], async (e) =>
      Promise.resolve(e === 2)
    );
    should(response).be.eql(1);
  });

  it('forEach', async () => {
    const response: number[] = [];
    await forEach([1, 2, 3], async (e) => {
      const op = await await Promise.resolve(e * 10);
      response.push(op);
    });
    should(response).be.eql([10, 20, 30]);
  });

  it('map', async () => {
    const response = await map([1, 2, 3], async (e) => Promise.resolve(e * 10));
    should(response).be.containDeepOrdered([10, 20, 30]);
  });

  it('reduce', async () => {
    const response = await reduce(
      [1, 2, 3],
      async (acc, e) => Promise.resolve(e + acc),
      0
    );
    should(response).eql(6);
  });

  it('reduceRight', async () => {
    const response = await reduceRight(
      [1, 2, 3],
      async (acc, e) => Promise.resolve(e + acc),
      0
    );
    should(response).eql(6);
  });

  it('every', async () => {
    const response = await some([1, 2, 3], async (e) =>
      Promise.resolve(e > 1)
    );
    should(response).be.true();
  });
});
