import { availableLocations } from '../data/available-locations.mjs';
import { db } from '../data/firebase.mjs'

export async function getCredentials() {
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('Authentication').doc('Password');
        const doc = await dataFB.get();
        const storedPassword = (doc.data().password);
        const storedUsername = (doc.data().username);
        const credentials = {username: storedUsername, password: storedPassword};
        if (storedPassword == undefined) {
            reject('The password has not been retrieved from the database');
        }
        resolve(credentials);
    });
};

export async function retrieveCookieData() {
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('Session Store').doc('Cookies');
        const doc = await dataFB.get();
        const dataArray = doc.data();
        resolve(dataArray);
 });
};

export async function addCookieData(id, expiryDate) {
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('Session Store').doc('Cookies');
        const doc = await dataFB.get();
        const dataArray = (doc.data().sessionData);
        const newSessionData = JSON.stringify({id: id, expiry: expiryDate});
        dataArray.push(newSessionData);
        const updatedSessionData = await dataFB.set({
            sessionData: dataArray 
        }, {merge: true})
        resolve('New session ID successfully added to DB');
 });
};

export async function fetchLocations(team) { 
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('HNECT Staff Members').doc('Staff Locations');
        const doc = await dataFB.get();
        const dataArray = (doc.data().locationData);
        const currentLocations = dataArray.map((entry) => {
            return JSON.parse(entry);
        });

        if (currentLocations == undefined) {
            reject('The location data has not been retrieved from the database');
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
        const dataFB = db.collection('HNECT Staff Members').doc('Staff Locations');
        const doc = await dataFB.get();
        const dataArray = (doc.data().locationData);
        const currentLocations = dataArray.map((entry) => {
            return JSON.parse(entry);
        });

        if (currentLocations == undefined) {
            reject('The location data has not been retrieved from the database');
        }
        const locationData = currentLocations;
        resolve(locationData);
    }); 
}

export async function getActiveLocations() {
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('HNECT Staff Members').doc('Staff Locations');
        const doc = await dataFB.get();
        const dataArray = (doc.data().locationData);
        const currentLocations = dataArray.map((entry) => {
            return JSON.parse(entry);
        });

        if (currentLocations == undefined) {
            reject('The location data has not been retrieved from the database');
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

export async function getInactiveLocations() {
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('HNECT Staff Members').doc('Staff Locations');
        const doc = await dataFB.get();
        const dataArray = (doc.data().locationData);
        const currentLocations = dataArray.map((entry) => {
            return JSON.parse(entry);
        });
        
        if (currentLocations == undefined) {
            reject('The location data has not been retrieved from the database');
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
        const dataFB = db.collection('HNECT Staff Members').doc('Staff Locations');
        const doc = await dataFB.get();
        const dataArray = (doc.data().locationData);
        const oldLocations = dataArray.map((entry) => {
            return JSON.parse(entry);
        });

        const updatedStaff = oldLocations.map((oldEntry) => {
            if (oldEntry.name == newEntry.name) {
                oldEntry.currentLocation = newEntry.currentLocation;
                oldEntry.comments = newEntry.comments;
                oldEntry.timestamp = newEntry.timestamp;
                return oldEntry;
            };
            return oldEntry;
        });

        // If array is valid convert entries to JSON and update DB
        if (updatedStaff != undefined) {
            const updatedJson = updatedStaff.map((staffMember) => {
                return JSON.stringify(staffMember);
            });
            const updateDB = await dataFB.set({
                locationData: updatedJson
            }, { merge: true });

            resolve('The database has been updated');
        }
        else {
            reject('An error has occurred and the array is empty');
        }
        
    });
};

export async function filterCurrentData(department) {
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('HNECT Staff Members').doc('Staff Locations');
        const doc = await dataFB.get();
        const dataArray = (doc.data().locationData);
        const parsedLocationData = dataArray.map((entry) => {
            return JSON.parse(entry);
        });

        const filteredStaff = parsedLocationData.filter((staffMember) => {
            return staffMember.currentLocation == department;
        });

        resolve(filteredStaff);
    });
};

export async function mergeLocalData(localEntries) {
    return new Promise(async (resolve, reject) => {
        const dataFB = db.collection('HNECT Staff Members').doc('Staff Locations');
        const doc = await dataFB.get();
        const dataArray = (doc.data().locationData);
        const currentLocations = dataArray.map((entry) => {
            return JSON.parse(entry);
        });

        const updatedStaff = currentLocations.map((currentEntry) => {
            const localEntry = localEntries.find((staffMember) => {
                return staffMember.name == currentEntry.name;
            });
            
            if (localEntry != undefined) {
                
                // If local entry timestamp after DB entry timestamp then replace the field otherwise keep current DB entry    
                if (localEntry.timestamp > Number(currentEntry.timestamp)) {
                    currentEntry.currentLocation = localEntry.currentLocation;
                    currentEntry.comments = localEntry.comments;
                    currentEntry.timestamp = localEntry.timestamp;
                    return currentEntry;
                }
            };
            return currentEntry;
        });
        
        // Store the data within the array as strings.
        const mergedLocationData = updatedStaff.map((staffMember) => {
            return JSON.stringify(staffMember);
        });

        // Write the updated data to the DB.
        const updateDB = await dataFB.set({
            locationData: mergedLocationData
        }, { merge: true });
        
        resolve('The local storage data has been merged with the DB');
    });
};







