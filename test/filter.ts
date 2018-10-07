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

  it('filter', async () => {
    const outputArray = await AsyncRay(inputArray).aFilter(
      async (i, index, collection) => {
        console.log('eeeeeee');
        should(collection).instanceOf(Array);
        should(i).Number();
        should(collection)
          .not.empty()
          .undefined();
        should(index).not.undefined();

        return await dummy(i >= 2);
      }
    );

    should(outputArray).containDeepOrdered([2, 3, 4]);
  });
});
