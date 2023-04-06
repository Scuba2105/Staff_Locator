import fs from 'fs';

// create an asynclock constructor
class AsyncLock {
    constructor() {
        this.disable = () => {};
        this.promise = Promise.resolve();
    }

    enable() {
        this.promise = new Promise(resolve => this.disable = resolve);
    }
}

// Create a new instance of the object
const lock = new AsyncLock()

export async function readJSON(path) {
    await lock.promise;
    lock.enable();
    const data = fs.readFileSync(new URL(path, import.meta.url));
    lock.disable();
    return JSON.parse(data);
}

export async function writeDataToFile(filename, content) {
    try {
      await lock.promise;
      lock.enable();
      fs.writeFileSync(filename, content);  
      lock.disable(); 
      console.log("File written successfully");
    } 
    catch(err) {
      console.error(err);
    }
}