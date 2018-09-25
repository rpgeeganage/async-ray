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
    it('should chain map and reduce', async () => {
      const chainedValue = await (await AsyncRay(inputArray).map(
        async (ele) => await dummy(ele * 10)
      )).reduce(1, async (acc, ele) => acc + (await dummy(ele)));

      should(chainedValue).eql(101);
    });

    it('should chain map and find', async () => {
      const chainedValue = await (await AsyncRay(inputArray).map(
        async (ele) => await dummy(ele * 10)
      )).find(async (ele) => ele === 20);

      should(chainedValue).eql(20);
    });

    it('should chain map and filter', async () => {
      const chainedValue = (await (await AsyncRay(inputArray).map(
        async (ele) => await dummy(ele * 10)
      )).filter(async (ele) => ele > 20)).value;

      should(chainedValue).eql([30, 40]);
    });
  });
});
