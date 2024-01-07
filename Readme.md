# Memora

Memora is a highly efficient, customizable JavaScript caching library designed for effortless memoization of function outputs. With its advanced features like Time-To-Live (TTL), various storage options, and a sophisticated hashing mechanism, Memora optimizes performance in web applications by intelligently caching the results of function calls.

## Features

-   **Time-To-Live (TTL)**: Automatically expires cached data.
-   **Multiple Storage Options**: Supports `LocalStorage` and can be extended to other storage mechanisms.
-   **Function and Argument Tracking**: Recomputes cache when either the function implementation or arguments change.
-   **Customizable Hash Function**: Allows for a tailored hashing mechanism.
-   **Async Function Support**: Seamlessly handles asynchronous functions.

## Installation

Install Memora via npm, yarn or pnpm

```bash
npm install memora
yarn add memora
pnpm add memora
``` 

## Basic Usage

### Importing

```javascript
import { Memora } from 'memora';
``` 

### Simple Memoization

```javascript
const memora = new Memora();
const square = (n) => n * n;
const memoizedSquare = memora.memoize(square);

console.log(memoizedSquare(4));  // Computed
console.log(memoizedSquare(4));  // Cached
``` 

## Advanced Usage

### Memoizing Async Functions


```javascript
const fetchData = async (id) => { /* ... */ };
const memoizedFetchData = memora.memoizeAsync(fetchData);

memoizedFetchData('abc').then(console.log);  // Computed
memoizedFetchData('abc').then(console.log);  // Cached
``` 

### Using Custom Hash Function

```javascript
const customHashFunction = (input) => { /* ... */ };
const customMemora = new Memora();
customMemora.setHasher(customHashFunction);
```

### Custom Key Generator


```javascript
const customKeyGenerator = (func, ...args) => 'custom_' + JSON.stringify(args);
customMemora.setKeyGenerator(customKeyGenerator);
``` 

## API Documentation

-   **`Memora(options)`**: Constructor to create a new Memora instance.
    
    -   `options`: Object (optional)
        -   `name`: String (optional) - Unique name for the function caching (if not provided function content will be used).
        -   `prefix`: String (optional) - Prefix for cache keys.
        -   `Storage`: StorageProvider (optional) - Storage provider for caching, default localStorage
        -   `TTL`: Number (milliseconds) - Time to live for cached data in milliseconds, default 1 day.
-   **`memoize(func)`**: Memoizes a given function.
    
    -   `func`: Function - The function to be memoized.
-   **`memoizeAsync(asyncFunc)`**: Memoizes an asynchronous function.
    
    -   `asyncFunc`: Async Function - The async function to be memoized.
-   **`setKeyGenerator(func)`**: Sets a custom key generator function.
    
    -   `func`: Function - Custom key generator.
-   **`setHasher(func)`**: Sets a custom hash function for generating keys.
    
    -   `func`: Function - Custom hash function.

## Contributing

Contributions to Memora are welcome! Please follow the coding standards and include tests for new features.

## License

Memora is MIT licensed.
