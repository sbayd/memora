import { Memora } from 'memora';

const heavyFunction = (a, b) => {
  // heavy function
  console.log('will calculate a+b', a, b);
  return a + b;
};

const memoizedHeavyFunction = new Memora().memoize(heavyFunction);

console.log(memoizedHeavyFunction(1, 2)); // computed
console.log(memoizedHeavyFunction(1, 2)); // cached
