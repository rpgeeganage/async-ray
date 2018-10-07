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

  describe('reduce', () => {
    it('should return reduce values for number', async () => {
      const outputElement = await AsyncRay(inputArray).aReduce<number>(
        async (acc, i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArray);
          should(i)
            .not.undefined()
            .Number();
          should(index).not.undefined();

          return acc + (await dummy(i));
        },
        1
      );

      should(outputElement).eql(101);
    });

    it('should return reduce values for string', async () => {
      const inputString: string[] = ['s', 't', 'r', 'i', 'n', 'g'];
      const outputElement = await AsyncRay(inputString).aReduce<string>(
        async (acc, i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputString);
          should(i)
            .not.undefined()
            .String();
          should(index).not.undefined();

          return `${acc}${await Promise.resolve(i)}`;
        },
        ''
      );

      should(outputElement).eql('string');
    });
  });
});
