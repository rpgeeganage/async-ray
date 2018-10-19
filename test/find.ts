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

  describe('find', () => {
    it('should find', async () => {
      const output: number | undefined = await AsyncRay(inputArray).aFind(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i).Number();
          should(collection)
            .not.empty()
            .not.undefined();
          should(index).not.undefined();

          return dummy(i === 2);
        }
      );

      should(output).eql(2);
    });

    it('should not find', async () => {
      const output: number | undefined = await AsyncRay(inputArray).aFind(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i).Number();
          should(collection)
            .not.empty()
            .not.undefined();
          should(index).not.undefined();

          return dummy(i === 20);
        }
      );

      should(output).undefined();
    });
  });
});
