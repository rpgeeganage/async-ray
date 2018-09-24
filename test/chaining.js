const should = require('should');
const { AsyncArray } = require('../dist/');

async function dummy(ele) {
  return ele;
}
describe('AsyncArray', () => {
  let inputArray = null;
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('Chaining methods', () => {
    it('should find', async () => {
      const chainedValue = await (await AsyncArray(inputArray).map(
        async (ele) => await dummy(ele * 10)
      )).reduce(1, async (acc, ele) => acc + (await dummy(ele)));

      should(chainedValue).eql(101);
    });
  });
});
