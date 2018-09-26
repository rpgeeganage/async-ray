const should = require('should');
const { AsyncRay } = require('../dist/');

async function dummy(input) {
  return Promise.resolve(input * 10);
}
describe('AsyncRay', () => {
  let inputArray = null;
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  it('map', async () => {
    const outputArray = await AsyncRay(inputArray).map(
      async (i, index, collection) => {
        should(collection).instanceOf(Array);
        should(i).be.number;
        should(collection[index]).eql(i);

        return await dummy(i);
      }
    );

    should(outputArray.toJSON()).containDeepOrdered([10, 20, 30, 40]);
  });
});
