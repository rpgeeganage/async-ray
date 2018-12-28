/***
 * This sample demonstrates how to chain couple of async calls
 * and get the final result buy calling 'process()'
 */
import axios from 'axios';
import * as should from 'should';
import { Chain } from '../lib';
import { AsyncArray } from '../lib/async_array';

const api = 'http://api.mathjs.org';

async function sample1(array: number[]): Promise<number[]> {
  return Chain(array)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aMap(async (e) => (await axios.get(`${api}/v4/?expr=10*${e}`)).data)
    .aFilter(
      async (e) => (await axios.get(`${api}/v4/?expr=${e}>100000000`)).data
    )
    .aFilter(
      async (e) => (await axios.get(`${api}/v4/?expr=${e}>200000000`)).data
    )
    .aFilter(
      async (e) => (await axios.get(`${api}/v4/?expr=${e}>300000000`)).data
    )
    .aFilter(
      async (e) => (await axios.get(`${api}/v4/?expr=${e}>400000000`)).data
    )
    .process();
}

sample1([1, 2, 3, 4, 5])
  .then((e) => {
    // Check for instance type
    should(e)
      .instanceOf(AsyncArray)
      .and.size(1);

    // Check for value
    should(e[0])
      .Number()
      .eql(500000000);
  })
  .catch(console.error);
