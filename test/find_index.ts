import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib';

async function dummy(condition: boolean): Promise<boolean> {
  return Promise.resolve(condition);
}

describe('AsyncRay', () => {
  let inputArray: number[];
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('findIndex', () => {
    it('should find the index', async () => {
      const output: number = await AsyncRay(inputArray).aFindIndex(
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

      should(output).eql(1);
    });

    it('should return -1 as index if unable to locate the item', async () => {
      const output: number = await AsyncRay(inputArray).aFindIndex(
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

      should(output).eql(-1);
    });

    it('should return -1 as index if array is empty', async () => {
      const output: number = await AsyncRay([]).aFindIndex(async () => {
        return true;
      });

      should(output).eql(-1);
    });
  });
});
