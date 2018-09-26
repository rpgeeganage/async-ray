const should = require('should');
const { AsyncRay } = require('../dist/');

async function dummy(input) {
  return Promise.resolve(input);
}
describe('AsyncRay', () => {
  let inputArray = null;
  before(() => {
    inputArray = [10, 20, 30, 40];
  });

  describe('reduce', () => {
    it('should return reduce values', async () => {
      const outputElement = await AsyncRay(inputArray).reduce(
        1,
        async (acc, i, index, collection) => {
          should(collection).instanceOf(Array);
          should(i).be.number;
          should(collection[index]).eql(i);

          return acc + (await dummy(i));
        }
      );

      should(outputElement).eql(101);
    });

    it('should throw an error if initial value is not defined', async () => {
      try {
        await AsyncRay(inputArray).reduce(
          undefined,
          async (acc, i, index, collection) => {
            should(collection).instanceOf(Array);
            should(i).be.number;
            should(collection[index]).eql(i);

            return acc + (await dummy(i));
          }
        );

        throw new Error('Should not execute');
      } catch (err) {
        should(err).instanceOf(TypeError);
        should(err.message).eql('initial value is not defined');
      }
    });
  });
});
