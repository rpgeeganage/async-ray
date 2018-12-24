import 'mocha';
import * as should from 'should';
import { AsyncArray } from '../lib/async_array';

describe('Create an array', () => {
  it('should create an array of 1 positive number', () => {
    const array = new AsyncArray(...[20]);
    should(array)
      .instanceOf(AsyncArray)
      .size(1);

    should(array[0]).eql(20);
  });

  it('should create an array of 1 negative number', () => {
    const array = new AsyncArray(...[-20]);
    should(array)
      .instanceOf(AsyncArray)
      .size(1);
    should(array[0]).eql(-20);
  });

  it('should create an array of 3 positive number', () => {
    const array = new AsyncArray(...[20, 40, 10]);
    should(array)
      .instanceOf(AsyncArray)
      .size(3);
    should(array[0]).eql(20);
    should(array[1]).eql(40);
    should(array[2]).eql(10);
  });

  it('should create an array of 3 negative number', () => {
    const array = new AsyncArray(...[-20, -40, -10]);
    should(array)
      .instanceOf(AsyncArray)
      .size(3);
    should(array[0]).eql(-20);
    should(array[1]).eql(-40);
    should(array[2]).eql(-10);
  });

  it('should create an array of 1 string', () => {
    const array = new AsyncArray(...['test']);
    should(array)
      .instanceOf(AsyncArray)
      .size(1);
    should(array[0]).eql('test');
  });

  it('should create an array of 3 strings', () => {
    const array = new AsyncArray(...['test1', 'test2', 'test3']);
    should(array)
      .instanceOf(AsyncArray)
      .size(3);
    should(array[0]).eql('test1');
    should(array[1]).eql('test2');
    should(array[2]).eql('test3');
  });

  it('should create an array from string', () => {
    const array = new AsyncArray(...'test');
    should(array)
      .instanceOf(AsyncArray)
      .size(4);
    should(array[0]).eql('t');
    should(array[1]).eql('e');
    should(array[2]).eql('s');
    should(array[3]).eql('t');
  });
});
