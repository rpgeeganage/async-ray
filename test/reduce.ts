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

  it('Should throw error if array is empty and initial value is not defined', async () => {
    await AsyncRay([])
      .aReduce<any>(async (i) => i)
      .should.rejectedWith('Reduce of empty array with no initial value');
  });

  describe('Reduce', () => {
    describe('with initial value', () => {
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

      it('should return reduce values for array containing arrays', async () => {
        const inputArrayOfArrays: [number, number][] = [[0, 1], [2, 3], [4, 5]];

        const outputElement = await AsyncRay(inputArrayOfArrays).aReduce<
          number[]
        >(async (acc, i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(inputArrayOfArrays);
          should(i)
            .instanceOf(Array)
            .containDeepOrdered(i);
          should(index).not.undefined();

          return Promise.resolve(acc.concat(i));
        }, []);

        should(outputElement).containDeepOrdered([0, 1, 2, 3, 4, 5]);
      });
    });

    describe('without initial value', () => {
      it('should return reduce values for number', async () => {
        const copiedArray = [...inputArray];
        copiedArray.shift();

        const outputElement = await AsyncRay(inputArray).aReduce<number>(
          async (acc, i, index, collection) => {
            should(collection)
              .instanceOf(Array)
              .containDeepOrdered(copiedArray);
            should(i)
              .not.undefined()
              .Number();
            should(index).not.undefined();

            return acc + (await dummy(i));
          }
        );

        should(outputElement).eql(91);
      });

      it('should return reduce values for string', async () => {
        const inputString: string[] = ['s', 't', 'r', 'i', 'n', 'g'];
        const copiedString = [...inputString];
        copiedString.shift();

        const outputElement = await AsyncRay(inputString).aReduce<string>(
          async (acc, i, index, collection) => {
            should(collection)
              .instanceOf(Array)
              .containDeepOrdered(copiedString);
            should(i)
              .not.undefined()
              .String();
            should(index).not.undefined();

            return `${acc}${await Promise.resolve(i)}`;
          }
        );

        should(outputElement).eql('string');
      });

      it('should return reduce values for array containing arrays', async () => {
        const inputArrayOfArrays: [number, number][] = [[0, 1], [2, 3], [4, 5]];
        const copiedArrayOfArrays = [...inputArrayOfArrays];
        copiedArrayOfArrays.shift();

        const outputElement = await AsyncRay(inputArrayOfArrays).aReduce<
          number[]
        >(async (acc, i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(copiedArrayOfArrays);
          should(i)
            .instanceOf(Array)
            .containDeepOrdered(i);
          should(index).not.undefined();

          return Promise.resolve(acc.concat(i));
        });

        should(outputElement).containDeepOrdered([0, 1, 2, 3, 4, 5]);
      });
    });
  });
});
