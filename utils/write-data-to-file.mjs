import fs from 'fs';

export function writeDataToFile(filename, content) {
      try {
        fs.writeFileSync(filename, content);   
        console.log("File written successfully");
      } catch(err) {
        console.error(err);
      }
}