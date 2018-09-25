const should = require('should');
const { AsyncRay } = require('../dist/');

async function dummy(ele) {
  return ele;
}
describe('AsyncRay', () => {
  let inputArray = null;
  before(() => {
    inputArray = [1, 2, 3, 4];
  });

  describe('Chaining methods', () => {
    it('should find', async () => {
      const chainedValue = await (await AsyncRay(inputArray).map(
        async (ele) => await dummy(ele * 10)
      )).reduce(1, async (acc, ele) => acc + (await dummy(ele)));

      should(chainedValue).eql(101);
    });
  });
});
