import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib/';

async function dummy(num: number): Promise<number> {
  return Promise.resolve(num);
}

describe('AsyncRay', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('forEach', () => {
    it('should execute the loop', async () => {
      const outputArray: number[] = [];
      await AsyncRay(inputArray).aForEach(async (i, index, collection) => {
        should(collection)
          .instanceOf(Array)
          .containDeepOrdered(inputArray);
        should(i).Number();
        should(collection)
          .not.empty()
          .not.undefined();
        should(index).not.undefined();

        outputArray.push(await dummy(i));
      });

      should(outputArray).containDeepOrdered(inputArray);
    });
  });
});
