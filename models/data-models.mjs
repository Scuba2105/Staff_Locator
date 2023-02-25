import fs from 'fs';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const currentLocations = loadJSON('../data/current-locations.json');

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
        
        const locationData = {teamData: teamArray, allData: currentLocations};
        resolve(locationData);
    }) 
};

export function updateLocations(newEntry) {
    return new Promise((resolve, reject) => {
        const oldLocations = currentLocations;
        const updatedStaff = oldLocations.map((oldEntry) => {
            console.log(oldEntry, newEntry);
            if (oldEntry.name == newEntry.name) {
                return newEntry;
            };
            return oldEntry;
        });
        // Add some more validation around updatedArray
        if (updatedStaff != undefined) {
            const updatedJson = JSON.stringify(updatedStaff, null, 2);
            resolve(updatedJson);
        }
        else {
            reject('An error has occurred and the array is empty');
        }
        
    });
};




