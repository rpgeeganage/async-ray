/***
 * This sample demonstrates how to chain couple of async calls
 * and get the final result without calling 'process()'
 */
import axios from 'axios';
import * as should from 'should';
import { Chain } from '../lib';

const api = 'http://api.mathjs.org';

async function sample2(array: number[]): Promise<number|undefined> {
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
    .aFind(
      async (e) =>
        (await axios.get(
          `${api}/v4/?expr=${encodeURIComponent(e + '==500000000')}`
        )).data
    );
}

sample2([1, 2, 3, 4, 5])
  .then((e) => {
    // Check for value
    should(e)
      .Number()
      .eql(500000000);
  })
  .catch(console.error);
