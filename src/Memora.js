import LocalStorageProvider from './LocalStorageProvider';

const defaultOptions = {
  name: undefined,
  prefix: 'memora::',
  Storage: LocalStorageProvider,
  // one day ttl
  TTL: 24 * 60 * 60 * 1000
};

export class Memora {
  constructor (options = defaultOptions) {
    const {
      name,
      prefix,
      Storage,
      TTL
    } = { ...defaultOptions, ...options };
    this.name = name;
    this.prefix = prefix;
    this.storage = new Storage();
    this.TTL = TTL;
    this.setKeyGenerator(this.defaultKeyGenerator);
  }

  defaultHasher = (input, chunkSize = 64) => {
    const FNV_PRIME = 0x811C9DC5;
    let hash = 0x811C9DC5; // FNV offset basis

    for (let i = 0; i < input.length; i += chunkSize) {
      for (let j = 0; j < chunkSize && (i + j) < input.length; j++) {
        hash ^= input.charCodeAt(i + j);
        hash *= FNV_PRIME;
      }
    }

    return hash >>> 0; // Convert to unsigned 32-bit integer
  };

  defaultKeyGenerator = (func, ...args) => {
    const funcReadable = this.name || func.toString();
    const funcHash = this.defaultHasher(funcReadable);
    const argsHash = this.defaultHasher(JSON.stringify(args));
    return `${this.prefix}${funcHash}:${argsHash}`;
  };

  setKeyGenerator = (func) => {
    this.keyGenerator = func;
  };

  memoize = (func) => {
    return (...args) => {
      const hash = this.keyGenerator(func, ...args);
      const storedValue = this.storage.get(hash);
      if (storedValue !== null && storedValue !== undefined) {
        return storedValue;
      }

      const result = func.apply(this, args);
      this.storage.set(hash, result);
      return result;
    };
  };

  memoizeAsync = (asyncFunc) => {
    return async (...args) => {
      const hash = this.keyGenerator(asyncFunc, ...args);
      const storedValue = this.storage.get(hash);
      if (storedValue !== null && storedValue !== undefined) {
        return storedValue;
      }

      const result = await asyncFunc.apply(this, args);
      this.storage.set(hash, result);
      return result;
    };
  };
}

export default Memora;
