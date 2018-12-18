# Async-Ray

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/967e339f9fdb4424a48ba37a0292f221)](https://app.codacy.com/app/rpgeeganage/async-ray?utm_source=github.com&utm_medium=referral&utm_content=rpgeeganage/async-ray&utm_campaign=Badge_Grade_Settings)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5e8a5d0dc01a4392a474fff00888cc1a)](https://app.codacy.com/app/rpgeeganage/async-ray?utm_source=github.com&utm_medium=referral&utm_content=rpgeeganage/async-ray&utm_campaign=Badge_Grade_Dashboard)

Purpose of this package is to provide `async/await` callbacks for `every`, `filter`, `find`, `findIndex`, `forEach`, `map`, `reduce`, `reduceRight` and `some` methods in **_Array_**.

### TypeScript Doc: [https://rpgeeganage.github.io/async-ray/doc/](https://rpgeeganage.github.io/async-ray/doc/)

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

## Methods
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

## Chaining

## Between AsyncRay methods

### **Only** `.aFilter` and `.aMap` may be chained together.

Make sure to put before each AsyncRay method call an `await` (or call `.then(...)`) since a Promise is returned by the async methods.

#### sample
```js
await(await AsyncRay([1,2,3])
    .aFilter(...))
    .Map(...)
```


## Between other [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#) methods

`.aEvery`, `.aFilter`, `.aFind`,`.aFindIndex`, `.aForEach`, `.aMap`, `aReduce`, `aReduceRight` and  `.aSome` can be chained with other [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#).

#### sample 1 - `aMap` and `filter`

```js
async function dummy(ele) {
  return Promise.resolve(ele);
}

const inputArray = [1, 2, 3, 4];

const chainedValue = (await AsyncRay(inputArray).aMap(
  async (ele) => await dummy(ele * 10)
)).filter((ele) => ele > 20);

console.log('Output is ', chainedValue);
// Output is [30, 40]
```

#### sample 2 - `aMap` and `find`

```js
async function dummy(ele) {
  return Promise.resolve(ele);
}

const inputArray = [1, 2, 3, 4];

const chainedValue = (await AsyncRay(inputArray).aMap(
  async (ele) => await dummy(ele * 10)
)).find((ele) => ele === 20);

console.log('Output is ', chainedValue);
// Output is 20
```

#### sample 3 - `aMap` and `reduce`

```js
async function dummy(ele) {
  return Promise.resolve(ele);
}

const inputArray = [1, 2, 3, 4];

const chainedValue = (await AsyncRay(inputArray).aMap(
  async (ele) => await dummy(ele * 10)
)).reduce((acc, ele) => acc + ele), 1);

console.log('Output is ', chainedValue);
// Output is 101
```
