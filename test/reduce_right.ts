import 'mocha';
import * as should from 'should';
import { AsyncRay } from '../lib';

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
      .aReduceRight<any>(async (i) => i)
      .should.rejectedWith('Reduce of empty array with no initial value');
  });

  describe('reduceRight', () => {
    describe('with initial value', () => {
      it('should return reduceRight values for number', async () => {
        const reversedArray = [...inputArray].reverse();

        const outputElement = await AsyncRay(inputArray).aReduceRight<number>(
          async (acc, i, index, collection) => {
            should(collection)
              .instanceOf(Array)
              .containDeepOrdered(reversedArray);
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

      it('should return reduceRight values for string', async () => {
        const inputString: string[] = ['s', 't', 'r', 'i', 'n', 'g'];
        const reversedArray = [...inputString].reverse();

        const outputElement = await AsyncRay(inputString).aReduceRight<string>(
          async (acc, i, index, collection) => {
            should(collection)
              .instanceOf(Array)
              .containDeepOrdered(reversedArray);
            should(i)
              .not.undefined()
              .String();
            should(index).not.undefined();

            return `${acc}${await Promise.resolve(i)}`;
          },
          ''
        );

        should(outputElement).eql([...'string'].reverse().join(''));
      });

      it('should return reduceRight values for array containing arrays', async () => {
        const inputArrayOfArrays: [number, number][] = [[0, 1], [2, 3], [4, 5]];
        const reversedArray = [...inputArrayOfArrays].reverse();

        const outputElement = await AsyncRay(inputArrayOfArrays).aReduceRight<
          number[]
        >(async (acc, i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(reversedArray);
          should(i)
            .instanceOf(Array)
            .containDeepOrdered(i);
          should(index).not.undefined();

          return Promise.resolve(acc.concat(i));
        }, []);

        should(outputElement).containDeepOrdered([4, 5, 2, 3, 0, 1]);
      });
    });

    describe('without initial value', () => {
      it('should return reduceRight values for number', async () => {
        const reversedArray = [...inputArray].reverse();
        reversedArray.shift();

        const outputElement = await AsyncRay(inputArray).aReduceRight<number>(
          async (acc, i, index, collection) => {
            should(collection)
              .instanceOf(Array)
              .containDeepOrdered(reversedArray);
            should(i)
              .not.undefined()
              .Number();
            should(index).not.undefined();

            return acc + (await dummy(i));
          }
        );

        should(outputElement).eql(64);
      });

      it('should return reduceRight values for string', async () => {
        const inputString: string[] = ['s', 't', 'r', 'i', 'n', 'g'];
        const reversedArray = [...inputString].reverse();
        reversedArray.shift();

        const outputElement = await AsyncRay(inputString).aReduceRight<string>(
          async (acc, i, index, collection) => {
            should(collection)
              .instanceOf(Array)
              .containDeepOrdered(reversedArray);
            should(i)
              .not.undefined()
              .String();
            should(index).not.undefined();

            return `${acc}${await Promise.resolve(i)}`;
          }
        );

        should(outputElement).eql([...'string'].reverse().join(''));
      });

      it('should return reduceRight values for array containing arrays', async () => {
        const inputArrayOfArrays: [number, number][] = [[0, 1], [2, 3], [4, 5]];
        const reversedArray = [...inputArrayOfArrays].reverse();
        reversedArray.shift();

        const outputElement = await AsyncRay(inputArrayOfArrays).aReduceRight<
          number[]
        >(async (acc, i, index, collection) => {
          should(collection)
            .instanceOf(Array)
            .containDeepOrdered(reversedArray);
          should(i)
            .instanceOf(Array)
            .containDeepOrdered(i);
          should(index).not.undefined();

          return Promise.resolve(acc.concat(i));
        });

        should(outputElement).containDeepOrdered([4, 5, 2, 3, 0, 1]);
      });
    });
  });
});
