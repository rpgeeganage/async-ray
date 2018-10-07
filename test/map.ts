import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib/';

async function dummy(num: number): Promise<number> {
  return Promise.resolve(num * 10);
}

describe('AsyncRay', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('map', () => {
    it('should map the given cb', async () => {
      const outputArray = await AsyncRay(inputArray).aMap(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i)
            .not.undefined()
            .Number();
          should(index).not.undefined();

          return await dummy(i);
        }
      );

      should(outputArray).containDeepOrdered([10, 20, 30, 40]);
    });
  });
});
