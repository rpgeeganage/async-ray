const should = require('should');
const { AsyncArray } = require('../dist/');

async function dummy(input) {
  return input;
}
describe('AsyncArray', () => {
  let inputArray = null;
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  it('forEach', async () => {
    const outputArray = [];
    await AsyncArray(inputArray).forEach(async (i, index, collection) => {
      should(collection).instanceOf(Array);
      should(i).be.number;
      should(collection[index]).eql(i);

      const asyncValue = await dummy(i);
      outputArray.push(asyncValue);
    });

    should(outputArray).containDeepOrdered(inputArray);
  });
});
