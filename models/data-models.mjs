import fs from '@cyclic.sh/s3fs';
import { availableLocations } from '../data/available-locations.mjs';
import { readJSON } from '../utils/access-json-data.mjs';

export async function fetchLocations(team) { 
    return new Promise(async (resolve, reject) => {
        const currentLocations = await readJSON('../data/current-locations.json');
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
    });
};

export async function fetchAllLocations() {
    return new Promise(async (resolve, reject) => {
        const currentLocations = await readJSON('../data/current-locations.json');
        if (currentLocations == undefined) {
            reject('The json file has not been loaded from file');
        }
        const locationData = currentLocations;
        resolve(locationData);
    }); 
}

export async function getActiveLocations() {
    return new Promise(async (resolve, reject) => {
        const currentLocations = await readJSON('../data/current-locations.json');
        if (currentLocations == undefined) {
            reject('The json file has not been loaded from file');
        }
        const activeLocations = currentLocations.reduce((acc, staffMember) => {
            if (!acc.includes(staffMember.currentLocation)) {
                acc.push(staffMember.currentLocation)
                return acc;
            }
            return acc;
        }, []);
        resolve(activeLocations);
    }); 
} 

export async function getInactiveLocations(activeLocations) {
    return new Promise(async (resolve, reject) => {
        const currentLocations = await readJSON('../data/current-locations.json');
        if (currentLocations == undefined) {
            reject('The json file has not been loaded from file');
        }
        const inactiveLocations = availableLocations.reduce((acc, location) => {
            if (!currentLocations.includes(location)) {
                acc.push(location);
                return acc;
            }
            return acc;
        }, []);
        resolve(inactiveLocations);
    }); 
} 

export async function updateLocations(newEntry) {
    return new Promise(async (resolve, reject) => {
        const oldLocations = await readJSON('../data/current-locations.json');
        const updatedStaff = oldLocations.map((oldEntry) => {
            if (oldEntry.name == newEntry.name) {
                oldEntry.currentLocation = newEntry.currentLocation;
                oldEntry.comments = newEntry.comments;
                oldEntry.timestamp = newEntry.timestamp;
                return oldEntry;
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

export async function mergeLocalData(localEntries) {
    return new Promise(async (resolve, reject) => {
        
        const currentLocations = await readJSON('../data/current-locations.json');
        const updatedStaff = currentLocations.map((currentEntry) => {
            const localEntry = localEntries.find((staffMember) => {
                return staffMember.name == currentEntry.name;
            });
            
            if (localEntry != undefined) {
                
                // If local entry timestamp after server entry timestamp then replace the field otherwise keep current server entry    
                if (localEntry.timestamp > Number(currentEntry.timestamp)) {
                    currentEntry.currentLocation = localEntry.currentLocation;
                    currentEntry.comments = localEntry.comments;
                    currentEntry.timestamp = localEntry.timestamp;
                    return currentEntry;
                }
            };
            return currentEntry;
        });
        const mergedLocationData = JSON.stringify(updatedStaff, null, 2);
        resolve(mergedLocationData);
    });
};







