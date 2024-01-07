import { Memora } from 'memora';

const heavyFunction = (a, b) => {
  // heavy function
  console.log('will calculate a+b', a, b);
  return a + b;
};

const memoizedHeavyFunction = new Memora({
  name: 'user-getter'
}).memoize(heavyFunction);
console.log('will call');
console.log(memoizedHeavyFunction(1, 2));
