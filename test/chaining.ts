import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib/';

async function dummyAsync(num: number): Promise<number> {
  return Promise.resolve(num * 10);
}

function dummy(num: number): number {
  return num * 10;
}

describe('Chaining', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  it('Chaining aMap() and map()', async () => {
    const outputArray = (await AsyncRay(inputArray).aMap(
      async (i) => await dummyAsync(i)
    )).map(dummy);

    should(outputArray).containDeepOrdered([100, 200, 300, 400]);
  });

  it('Chaining aMap() and reduce()', async () => {
    const output = (await AsyncRay(inputArray).aMap(
      async (i) => await dummyAsync(i)
    )).reduce((acc, i) => acc + dummy(i), 100);

    should(output).eql(1100);
  });

  it('Chaining aMap() and find()', async () => {
    const output = (await AsyncRay(inputArray).aMap(
      async (i) => await dummyAsync(i)
    )).find((e) => e === 20);

    should(output).eql(20);
  });

  it('Chaining aFilter() and map()', async () => {
    const outputArray = (await AsyncRay(inputArray).aFilter(
      async (i) => (await dummyAsync(i)) > 20
    )).map(dummy);

    should(outputArray).containDeepOrdered([30, 40]);
  });

  it('Chaining aFilter() and reduce()', async () => {
    const output = (await AsyncRay(inputArray).aFilter(
      async (i) => (await dummyAsync(i)) > 20
    )).reduce((acc, i) => acc + dummy(i), 100);

    should(output).eql(170);
  });

  it('Chaining aFilter() and find()', async () => {
    const output = (await AsyncRay(inputArray).aFilter(
      async (i) => (await dummyAsync(i)) > 20
    )).find((e) => e === 4);

    should(output).eql(4);
  });
});
