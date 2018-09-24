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

  it('should throws error for none array', async () => {
    should(() => {
      AsyncArray('sting');
    }).throw('Invalid input');
  });

  it('should assign the array value properly', () => {
    const inputArray = [1, 2, 3];
    should(AsyncArray(AsyncArray(inputArray)).value).containDeepOrdered(
      inputArray
    );
  });

  it('should convert to string', () => {
    const inputArray = [1, 2, 3];
    should(AsyncArray(inputArray).toString()).eql(inputArray.toString());
  });

  it('should pass only an async cb function', async () => {
    const inputArray = [1, 2, 3];
    try {
      await AsyncArray(inputArray).map(() => {});
      throw new Error('should not execute');
    } catch (err) {
      should(err.message).eql('Callback is not an async method');
    }
  });

  it('should value contains the original array', async () => {
    const inputArray = [1, 2, 3];
    should(AsyncArray(inputArray).value).containDeepOrdered(inputArray);
  });
});
