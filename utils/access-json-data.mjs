import fs from 'fs'

// Track whether file is currently accessed
let currentlyAccessed = false;

export function readJSON(path) {
    if (currentlyAccessed = false) {
        currentlyAccessed = true;
        const readStartTime = Date.now();
        const data = fs.readFileSync(new URL(path, import.meta.url));
        const elapsedTime = Date.now() - readStartTime // Time to read the file. 
        console.log(`Time to read file is approximately ${elapsedTime} ms`);
        currentlyAccessed = false;
        return JSON.parse(data)
    } 
    else {
        console.log('File is currently unavailable.');
        setTimeout(readJSON(path),500);
    }    
}

export function writeDataToFile(filename, content) {
    if (currentlyAccessed = false) {
        currentlyAccessed = true;
        try {
            const writeStartTime = Date.now();
            fs.writeFileSync(filename, content);
            const elapsedTime = Date.now() - writeStartTime // Time to write the file.    
            currentlyAccessed = false;
            console.log("File written successfully");
            console.log(`Time to write to file is approximately ${elapsedTime} ms`);
            return JSON.parse(data)
          } catch(err) {
            console.error(err);
          }
    } 
    else {
        console.log('File is currently unavailable.');
        setTimeout(writeDataToFile(filename, content),500);
    }
}