# Async-Ray

Purpose of this package is to provide `async/await` callbacks for `find`, `filter`, `forEach`, `map`, `reduce` methods in **_Array_**.

## Basic usage

```js
const { AsyncRay } = require('async-ray');
```

### .find

Find will return the found value or undefined

```js
async function dummy(element, needle) {
  return element === needle;
}

// Call Find method
const outputElement = await AsyncRay(inputArray).find(
  async (i, index, collection) => {
    return await dummy(i, 2);
  }
);

console.log('Output is ', outputElement);
// Output is 2
```

### .filter

- `map` function will send return you a **_Handler_** object (Which can be chained. Sample is provided below).

```js
async function dummy(element, needle) {
  return element > needle;
}

const inputArray = [1, 2, 3, 4];

// Call filter method
const filterArray = await AsyncRay(inputArray).filter(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i, 2);
  }
);
```

- Please call `.value` property to extract result as array

```js
async function dummy(element, needle) {
  return element > needle;
}

// Call filter method
const filterArray = await AsyncRay(inputArray).filter(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i, 2);
  }
);

console.log(filterArray.value);
// Output is [3, 4]
```

### .forEach

ForEach will work as **_Array.forEach_**.

```js
async function dummy(element) {
  return element === needle;
}

const inputArray = [1, 2, 3, 4];
const outputArray = [];

// Call ForEach method
await AsyncRay(inputArray).forEach(async (i, index, collection) => {
  outputArray.push(await dummy(i));
});

console.log('Output is ', outputArray);
// Output is [1, 2, 3, 4]
```

### .map

- `map` function will send return you a **_Handler_** object (Which can be chained. Sample is provided below).

```js
async function dummy(element) {
  return element;
}

const inputArray = [1, 2, 3, 4];

// Call Map method
const mappedArray = await AsyncRay(inputArray).map(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i);
  }
);
```

- Please call `.value` property to extract result as array

```js
async function dummy(element) {
  return element;
}

// Call Map method
const mappedArray = await AsyncRay(inputArray).map(
  async (i, index, collection) => {
    // Dummy async function
    return await dummy(i);
  }
);
console.log(mappedArray.value);
// Output is [1, 2, 3, 4]
```

### .reduce

Reduce will work same as **_Array.reduce_**.

```js
async function dummy(element, needle) {
  return element === needle;
}

const inputArray = [10, 20, 30, 40];

// Call reduce method
const output = await AsyncRay(inputArray).reduce(
  1,
  async (acc, i, index, collection) => {
    return acc + (await dummy(i));
  }
);

console.log('Output is ', output);
// Output is 101
```

## Chaining methods

You can chain methods. Only `.filter` and `.map` can be changed (Those particular methods returns `Handler` object).

##### sample 1 - `map` and `reduce`

```js
async function dummy(ele) {
  return ele;
}
const chainedValue = await (await AsyncRay(inputArray).map(
  async (ele) => await dummy(ele * 10)
)).reduce(1, async (acc, ele) => acc + (await dummy(ele)));

console.log('Output is ', chainedValue);
// Output is 101
```

##### sample 2 - `map` and `find`

```js
async function dummy(ele) {
  return ele;
}
const chainedValue = await (await AsyncRay(inputArray).map(
  async (ele) => await dummy(ele * 10)
)).find(async (ele) => ele === 20);

console.log('Output is ', chainedValue);
// Output is 20
```

##### sample 3 - `map` and `find`

```js
const chainedValue = (await (await AsyncRay(inputArray).map(
  async (ele) => await dummy(ele * 10)
)).filter(async (ele) => ele > 20)).value;

console.log('Output is ', chainedValue);
// Output is [30, 40]
```
