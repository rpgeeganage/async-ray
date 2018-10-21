# Async-Ray

Purpose of this package is to provide `async/await` callbacks for `every`, `filter`, `find`, `forEach`, `map`, `reduce` and `some` methods in **_Array_**.

### TypeScript Doc: [https://rpgeeganage.github.io/async-ray/doc/](https://rpgeeganage.github.io/async-ray/doc/)

## Basic usage

```js
const { AsyncRay } = require('async-ray');
```

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

##### .aReduce(async callback(accumulator, element[, index[, array]]), [initialValueOptional])

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

## Chaining methods

### Please note that `.aEvery`, `.aFilter`, `.aFind`, `.aForEach`, `.aMap`, `aReduce` and  `.aSome` cannot be chained with each other.

Eg:

```js
// Below code will throw an error
AsyncRay([1,2,3]).aMap(...).aReduce(...)
```

But `.aEvery`, `.aFilter`, `.aFind`, `.aForEach`, `.aMap`, `aReduce` and  `.aSome` can be chained with other [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#).

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
