import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib/';
import { AsyncArray } from '../lib/async_ray';

async function dummyAsync(num: number): Promise<number> {
  return Promise.resolve(num * 10);
}

async function dummyAsyncCond(condition: boolean): Promise<boolean> {
  return Promise.resolve(condition);
}

function dummy(num: number): number {
  return num * 10;
}

describe('Chaining', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  it('aMap() and aFilter()', async () => {
    const outputArray = 
      await(await AsyncRay(inputArray)
        .aMap(async (i) => 
          dummyAsync(i)))
        .aFilter(async (i) => 
          dummyAsyncCond(!!i))

    should(outputArray).instanceOf(AsyncArray);
  });

  it('aMap() and map()', async () => {
    const outputArray = (await AsyncRay(inputArray).aMap(async (i) =>
      dummyAsync(i)
    )).map(dummy);

    should(outputArray).containDeepOrdered([100, 200, 300, 400]);
  });

  it('aMap() and reduce()', async () => {
    const output = (await AsyncRay(inputArray).aMap(async (i) =>
      dummyAsync(i)
    )).reduce((acc, i) => acc + dummy(i), 100);

    should(output).eql(1100);
  });

  it('aMap() and find()', async () => {
    const output = (await AsyncRay(inputArray).aMap(async (i) =>
      dummyAsync(i)
    )).find((e) => e === 20);

    should(output).eql(20);
  });

  it('aFilter() and map()', async () => {
    const outputArray = (await AsyncRay(inputArray).aFilter(
      async (i) => (await dummyAsync(i)) > 20
    )).map(dummy);

    should(outputArray).containDeepOrdered([30, 40]);
  });

  it('aFilter() and reduce()', async () => {
    const output = (await AsyncRay(inputArray).aFilter(
      async (i) => (await dummyAsync(i)) > 20
    )).reduce((acc, i) => acc + dummy(i), 100);

    should(output).eql(170);
  });

  it('aFilter() and find()', async () => {
    const output = (await AsyncRay(inputArray).aFilter(
      async (i) => (await dummyAsync(i)) > 20
    )).find((e) => e === 4);

    should(output).eql(4);
  });
});
