import StorageProvider from './StorageProvider';

export default class LocalStorageProvider extends StorageProvider {
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get (key) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  remove (key) {
    window.localStorage.removeItem(key);
  }

  clear () {
    window.localStorage.clear();
  }
}
