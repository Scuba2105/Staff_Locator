import fs from 'fs';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const currentLocations = loadJSON('../json/current-locations.json');

export function fetchLocations(team) { 
    return new Promise((resolve, reject) => {
        if (currentLocations == undefined) {
            reject('The json file has not been loaded from file');
        }
        const teamArray = currentLocations.reduce((acc, currentMember) => {
            if (currentMember.workshop == team) {
                acc.push(currentMember);
                return acc;
            }
            else {
                return acc;
            }
        }, []);
    
        resolve(teamArray);
    }) 
};


