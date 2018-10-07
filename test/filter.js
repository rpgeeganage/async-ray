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

  it('filter', async () => {
    const outputArray = await AsyncRay(inputArray).aFilter(
      async (i, index, collection) => {
        console.log('eeeeeee')
        should(collection).instanceOf(Array);
        should(i).be.number;
        should(collection[index]).eql(i);

        return await dummy(i >= 2);
      }
    );

    should(outputArray).containDeepOrdered([2, 3, 4]);
  });
});
