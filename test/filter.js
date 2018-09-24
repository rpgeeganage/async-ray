const should = require('should');
const { AsyncArray } = require('../dist/');

async function dummy(condition) {
  return condition;
}
describe('AsyncArray', () => {
  let inputArray = null;
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  it('filter', async () => {
    const outputArray = await AsyncArray(inputArray).filter(
      async (i, index, collection) => {
        should(collection).instanceOf(Array);
        should(i).be.number;
        should(collection[index]).eql(i);

        return await dummy(i >= 2);
      }
    );

    should(outputArray.toJSON()).containDeepOrdered([2, 3, 4]);
  });
});
