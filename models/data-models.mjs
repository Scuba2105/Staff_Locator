import fs from 'fs';
import { availableLocations } from '../data/available-locations.mjs';
import { readJSON } from '../utils/read-data-from-json.mjs';

export function fetchLocations(team) { 
    return new Promise((resolve, reject) => {
        const currentLocations = readJSON('../data/current-locations.json');
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

export function fetchAllLocations() {
    return new Promise((resolve, reject) => {
        const currentLocations = readJSON('../data/current-locations.json');
        if (currentLocations == undefined) {
            reject('The json file has not been loaded from file');
        }
        const locationData = currentLocations;
        resolve(locationData);
    }); 
}

export function getActiveLocations() {
    return new Promise((resolve, reject) => {
        const currentLocations = readJSON('../data/current-locations.json');
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

export function getInactiveLocations(activeLocations) {
    return new Promise((resolve, reject) => {
        const currentLocations = readJSON('../data/current-locations.json');
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

export function updateLocations(newEntry) {
    return new Promise((resolve, reject) => {
        const oldLocations = readJSON('../data/current-locations.json');
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

export function mergeLocalStorage(localEntries) {
    return new Promise((resolve, reject) => {
        const currentLocations = readJSON('../data/current-locations.json');
        const updatedStaff = currentLocations.map((currentEntry) => {
            const localEntry = localEntries.find((staffMember) => {
                return staffMember.name = currentEntry.name;
            })
            if (localEntry.name != undefined) {
                
                if (localEntry.timestamp > currentEntry.timestamp)
                currentEntry.currentLocation = localEntry.currentLocation;
                currentEntry.comments = localEntry.comments;
                currentEntry.timestamp = localEntry.timestamp;
                return currentEntry;
            };
            return currentEntry;
        });

        resolve(updatedStaff);
    });
};






