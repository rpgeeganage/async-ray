import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib';

async function dummy(num: number, value: number): Promise<boolean> {
  return Promise.resolve(num > value);
}

describe('AsyncRay', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [10, 20, 30, 40];
  });

  describe('some', () => {
    it('should return true if all the elements satisfy the condition', async () => {
      const output = await AsyncRay(inputArray).aSome(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i)
            .not.undefined()
            .Number();
          should(index).not.undefined();

          return dummy(i, 5);
        }
      );

      should(output).eql(true);
    });

    it('should return true if at least one element satisfies the condition', async () => {
      const output = await AsyncRay(inputArray).aSome(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i)
            .not.undefined()
            .Number();
          should(index).not.undefined();

          return dummy(i, 35);
        }
      );

      should(output).eql(true);
    });

    it('should return false if none of elements satisfy the condition', async () => {
      const output = await AsyncRay(inputArray).aSome(
        async (i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i)
            .not.undefined()
            .Number();
          should(index).not.undefined();

          return dummy(i, 50);
        }
      );

      should(output).eql(false);
    });
  });
});
