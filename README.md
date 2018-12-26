# Async-Ray
[![License](https://img.shields.io/npm/l/async-ray.svg)](https://img.shields.io/npm/l/async-ray.svg)
[![Version](https://img.shields.io/npm/v/async-ray.svg)](https://img.shields.io/npm/v/async-ray.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/rpgeeganage/async-ray.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/rpgeeganage/async-ray/context:javascript)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/967e339f9fdb4424a48ba37a0292f221)](https://app.codacy.com/app/rpgeeganage/async-ray?utm_source=github.com&utm_medium=referral&utm_content=rpgeeganage/async-ray&utm_campaign=Badge_Grade_Settings)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/3e1503ed17af4dc5aadb1fbbc41191d3)](https://www.codacy.com/app/rpgeeganage/async-ray?utm_source=github.com&utm_medium=referral&utm_content=rpgeeganage/async-ray&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/rpgeeganage/async-ray.svg?branch=master)](https://travis-ci.org/rpgeeganage/async-ray)
[![Known Vulnerabilities](https://snyk.io/test/github/rpgeeganage/async-ray/badge.svg?targetFile=package.json)](https://snyk.io/test/github/rpgeeganage/async-ray?targetFile=package.json)
[![Maintainability](https://api.codeclimate.com/v1/badges/4c9603df3595612def57/maintainability)](https://codeclimate.com/github/rpgeeganage/async-ray/maintainability)

Purpose of this package is to provide `async/await` callbacks for `every`, `filter`, `find`, `findIndex`, `forEach`, `map`, `reduce`, `reduceRight` and `some` methods in **_Array_**.

### TypeScript Doc: [https://rpgeeganage.github.io/async-ray/doc/](https://rpgeeganage.github.io/async-ray/doc/)

### Content
* [ ***Basic Usage*** ](#basic-usage)
* [ ***Supported methods*** ](#supported-methods)
* [ ***Using methods individually*** ](#using-methods-individually)
* [ ***Chaining*** ](#chaining)


## Basic usage

```js
const { AsyncRay } = require('async-ray');
```

## Supported methods
* [ ***.aEvery*** ](#aevery)
* [ ***.aFilter*** ](#afilter)
* [ ***.aFind*** ](#afind)
* [ ***.aFindIndex*** ](#afindindex)
* [ ***.aForEach*** ](#aforeach)
* [ ***.aMap*** ](#amap)
* [ ***.aReduce*** ](#areduce)
* [ ***.aReduceRight*** ](#areduceright)
* [ ***.aSome*** ](#asome)

### .aEvery

##### .aEvery(async callback(element[, index[, array]]))

```js
async function dummy(element, needle) {
  return Promise.resolve(element > needle);
}

const inputArray = [10, 20, 30, 40];

// Call Every method
const output = await AsyncRay(inputArray).aEvery(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i, 5);
  }
);

console.log(output);
// Output is true
```

### .aFilter

##### .aFilter(async callback(element[, index[, array]]))

```js
async function dummy(element, needle) {
  return Promise.resolve(element > needle);
}

const inputArray = [1, 2, 3, 4];

// Call Filter method
const filterArray = await AsyncRay(inputArray).aFilter(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i, 2);
  }
);

console.log(filterArray);
// Output is [3, 4]
```

### .aFind

##### .aFind(async callback(element[, index[, array]]))

Find will return the found value or undefined

```js
async function dummy(element, needle) {
  return Promise.resolve(element === needle);
}

const inputArray = [1, 2, 3, 4];

// Call Find method
const outputElement = await AsyncRay(inputArray).aFind(
  async (i, index, collection) => {
    return await dummy(i, 2);
  }
);

console.log('Output is ', outputElement);
// Output is 2
```
### .aFindIndex

##### .aFindIndex(async callback(element[, index[, array]]))

FindIndex will return the index of found value or -1

```js
async function dummy(element, needle) {
  return Promise.resolve(element === needle);
}

const inputArray = [1, 2, 3, 4];

// Call Find method
const outputIndex = await AsyncRay(inputArray).aFindIndex(
  async (i, index, collection) => {
    return await dummy(i, 2);
  }
);

console.log('Output is ', outputIndex);
// Output is 1
```

### .aForEach

##### .aForEach(async callback(element[, index[, array]]))

```js
async function dummy(element) {
  return Promise.resolve(element);
}

const inputArray = [1, 2, 3, 4];
const outputArray = [];

// Call ForEach method
await AsyncRay(inputArray).aForEach(async (i, index, collection) => {
  outputArray.push(await dummy(i));
});

console.log('Output is ', outputArray);
// Output is [1, 2, 3, 4]
```

### .aMap

##### .aMap(async callback(element[, index[, array]]))

```js
async function dummy(element) {
  return Promise.resolve(element);
}

const inputArray = [1, 2, 3, 4];

// Call Map method
const mappedArray = await AsyncRay(inputArray).aMap(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i);
  }
);
console.log(mappedArray);
// Output is [1, 2, 3, 4]
```

### .aReduce

##### .aReduce(async callback(accumulator, element[, index[, array]]), [initialValue])

```js
async function dummy(element) {
  return Promise.resolve(element);
}

const inputArray = [10, 20, 30, 40];

// Call Reduce method
const output = await AsyncRay(inputArray).aReduce(
  async (acc, i, index, collection) => {
    return acc + (await dummy(i));
  },
  1
);

console.log('Output is ', output);
// Output is 101
```
### .aReduceRight

##### .aReduceRight(async callback(accumulator, element[, index[, array]]), [initialValue])

```js
async function dummy(element) {
  return Promise.resolve(element);
}

const inputArray = [10, 20, 30, 40];

// Call Reduce method
const output = await AsyncRay(inputArray).aReduceRight(
  async (acc, i, index, collection) => {
    return acc + (await dummy(i));
  },
  1
);

console.log('Output is ', output);
// Output is 101
```

### .aSome

##### .aSome(async callback(element[, index[, array]]))

```js
async function dummy(element, needle) {
  return Promise.resolve(element > needle);
}

const inputArray = [10, 20, 30, 40];

// Call Some method
const output = await AsyncRay(inputArray).aSome(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i, 30);
  }
);

console.log(output);
// Output is true
```
## Using methods individually
You can use each method without creating ```AsyncRay ``` object.
```js
import {
  aEvery, aFilter, aFind, aFindIndex,
  aForEach, aMap, aReduce, aReduceRight, aSome
} from 'async-ray';

// aEvery
const everyResult = await aEvery(
  [1, 2, 3],
  async (e) => Promise.resolve(e > 0)
);

// aFilter
const filterResult = await aFilter(
  [1, 2, 3],
  async (e) => Promise.resolve(e > 1)
);

// aFind
const findResult = await aFind(
  [1, 2, 3],
  async (e) => Promise.resolve(e === 3)
);

// aFindIndex
const findIndexResult = await aFindIndex(
  [1, 2, 3],
  async (e) => Promise.resolve(e === 2)
);

// aForEach
const forEachResult: number[] = [];
await aForEach(
  [1, 2, 3],
  async (e) => {
    const op = await Promise.resolve(e * 10);
	  forEachResult.push(op);
  }
);

// aMap
const mapResult = await aMap(
  [1, 2, 3],
  async (e) => Promise.resolve(e * 10)
);

// aReduce
const reduceResult = await aReduce(
  [1, 2, 3],
  async (acc, e) => Promise.resolve(e + acc),
  0
);

// aReduceRight
const reduceRightResult = await aReduceRight(
  [1, 2, 3],
  async (acc, e) => Promise.resolve(e + acc),
  0
);

// aSome
const someResult = await aSome(
  [1, 2, 3],
  async (e) => Promise.resolve(e > 1)
);
```
## Chaining

### Async-Ray methods can be chained using ```Chain``` functionality
### Basic usage
```js
const { Chain } = require('async-ray');
```
---
***Chaining will return an instance of Async-Ray if returned type is an array.***

---

#### sample 1 - `aMap()` and `aFilter()`
---
The `process()` method  __***must be called explicitly***__ to process the chain because `aMap()` and `aFilter()` method returns an array.
```js
const input = [1, 2, 3];

const op = await Chain(input)
  .aMap(
    async (e) => Promise.resolve(e * 10)
  )
  .aFilter(
    async (e) => Promise.resolve(e > 10)
  )
  .aMap(
    async (e) => Promise.resolve(e * 10)
  )
  // Call the process() method to execute the chain
  .process();

console.log('Output is ', op);
// Output is [ 200, 300 ]
```
#### sample 2 - `aMap()`, `aFilter()` and `aFind()`
---
The `process()` method  __***not be called***__ to because `aFind()` does not return an array.
```js
const input = [1, 2, 3];

const op = await Chain(input)
  .aMap(
    async (e) => Promise.resolve(e * 10)
  )
  .aFilter(
    async (e) => Promise.resolve(e > 10)
  )
  .aMap(
    async (e) => Promise.resolve(e * 10)
  )
  .aFind(
    async (e) => Promise.resolve(e === 300)
  );
	// No need to call process() method

console.log('Output is ', op);
// Output is 300
```

#### Between other [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#) methods

---

#### Sample 1 - Async-Ray `Chain` with `filter()`
```js
const input = [1, 2, 3];

const op = (
  await Chain(input)
    .aMap(
      async (e) => Promise.resolve(e * 10)
    )
    .aFilter(
      async (e) => Promise.resolve(e > 10)
    )
    .aMap(
      async (e) => Promise.resolve(e * 10)
    )
    .process()
)
.filter(e => e > 200)

console.log('Output is ', op);
// Output is [ 300 ]
```
---

#### Sample 2 - Async-Ray `Chain` with `find()`
```js
const input = [1, 2, 3];

const op = (
    await Chain(input)
    .aMap(
      async (e) => Promise.resolve(e * 10)
    )
    .aFilter(
      async (e) => Promise.resolve(e > 10)
    )
    .aMap(
      async (e) => Promise.resolve(e * 10)
    )
    .process()
)
.find(e => e === 200)

console.log('Output is ', op);
// Output is 200
```
