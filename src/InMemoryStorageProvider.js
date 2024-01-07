import StorageProvider from './StorageProvider';

export default class InMemoryStorageProvider extends StorageProvider {
  constructor () {
    super();
    this.storage = new Map();
  }

  set (key, value) {
    this.storage.set(key, value);
  }

  get (key) {
    return this.storage.get(key);
  }

  remove (key) {
    this.storage.delete(key);
  }

  clear () {
    this.storage.clear();
  }
}
