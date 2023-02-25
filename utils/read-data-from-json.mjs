import fs from 'fs'

export function readJSON(path) {
    return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
}

console.log(readJSON('../data/current-locations.json').length)
