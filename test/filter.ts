import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib/';

async function dummy(condition: boolean): Promise<boolean> {
  return Promise.resolve(condition);
}

describe('AsyncRay', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('filter', () => {
    it('should filter and send a none-empty array', async () => {
      const outputArray = await AsyncRay(inputArray).aFilter(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i).Number();
          should(collection)
            .not.empty()
            .not.undefined();
          should(index).not.undefined();

          return await dummy(i >= 2);
        }
      );

      should(outputArray).containDeepOrdered([2, 3, 4]);
    });

    it('should filter and send a empty array', async () => {
      const outputArray = await AsyncRay(inputArray).aFilter(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i).Number();
          should(collection)
            .not.empty()
            .not.undefined();
          should(index).not.undefined();

          return await dummy(i >= 200);
        }
      );

      should(outputArray)
        .instanceOf(Array)
        .empty();
    });
  });
});
