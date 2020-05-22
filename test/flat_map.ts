import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib/';
import { AsyncArray } from '../lib/async_array';

async function dummyArray(num: number): Promise<number[]> {
  return Promise.resolve([num, num * 2]);
}

async function dummy(num: number): Promise<number> {
  return Promise.resolve(num * 2);
}

describe('AsyncRay', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('flatMap', () => {
    it('should return an instance of AsyncArray', async () => {
      const outputArray = await AsyncRay(inputArray).aFlatMap(async () => null);

      should(outputArray).instanceOf(AsyncArray);
    });

    it('should return an instance of Array', async () => {
      const outputArray = await AsyncRay(inputArray).aFlatMap(async () => null);

      should(outputArray).instanceOf(Array);
    });

    it('should flatMap the given cb return array', async () => {
      const outputArray = await AsyncRay(inputArray).aFlatMap(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i)
            .not.undefined()
            .Number();
          should(index).not.undefined();

          return dummyArray(i);
        }
      );

      should(outputArray).containDeepOrdered([1, 2, 2, 4, 3, 6, 4, 8]);
    });

    it('should flatMap the given cb return single element', async () => {
      const outputArray = await AsyncRay(inputArray).aFlatMap(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i)
            .not.undefined()
            .Number();
          should(index).not.undefined();

          return dummy(i);
        }
      );

      should(outputArray).containDeepOrdered([2, 4, 6, 8]);
    });
  });
});
