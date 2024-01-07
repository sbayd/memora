export default class StorageProvider {
  set (key, value) {
    throw new Error('set method not implemented');
  }

  get (key) {
    throw new Error('get method not implemented');
  }

  remove (key) {
    throw new Error('remove method not implemented');
  }

  clear () {
    throw new Error('clear method not implemented');
  }
}
