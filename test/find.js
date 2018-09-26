const should = require('should');
const { AsyncRay } = require('../dist/');

async function dummy(condition) {
  return Promise.resolve(condition);
}
describe('AsyncRay', () => {
  let inputArray = null;
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('find', () => {
    it('should find', async () => {
      const outputElement = await AsyncRay(inputArray).find(
        async (i, index, collection) => {
          should(collection).instanceOf(Array);
          should(i).be.number;
          should(collection[index]).eql(i);

          return await dummy(i === 2);
        }
      );

      should(outputElement).eql(2);
    });

    it('should not find', async () => {
      const outputElement = await AsyncRay(inputArray).find(
        async (i, index, collection) => {
          should(collection).instanceOf(Array);
          should(i).be.number;
          should(collection[index]).eql(i);

          return await dummy(i === 300);
        }
      );

      should(outputElement).eql(undefined);
    });
  });
});
