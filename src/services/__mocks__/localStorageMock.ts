class LocalStorageMock implements Storage {
    private store: { [key: string]: string } = {};

    get length() {
        return Object.keys(this.store).length;
    }

    clear() {
        this.store = {};
    }

    getItem(key: string) {
        return this.store[key] || null;
    }

    key(index: number) {
        const keys = Object.keys(this.store);
        return keys[index] || null;
    }

    removeItem(key: string) {
        delete this.store[key];
    }

    setItem(key: string, value: string) {
        this.store[key] = value;
    }
}

global.localStorage = new LocalStorageMock();
