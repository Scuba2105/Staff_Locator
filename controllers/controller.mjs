import path from 'path';
import { fetchLocations, fetchAllLocations, getActiveLocations, updateLocations, getInactiveLocations, mergeLocalData } from "../models/data-models.mjs";
import { writeDataToFile } from '../utils/access-json-data.mjs';

export async function serveCurrentData(team) {
    try {
        const activeLocations = await getActiveLocations(); 
        const inactiveLocations = await getInactiveLocations(activeLocations);
        if (team == 'LocationOnly') {
            return {activeLocations: activeLocations, inactiveLocations: inactiveLocations};
        }
        else {
            const currentData = await fetchLocations(team);
            
            return {teamData: currentData, activeLocations: activeLocations, inactiveLocations: inactiveLocations};
        }
    } catch (error) {
        console.log(error);
    }
};

export async function sendTeamData(req, res) {
    try {
        // Convert binary string to json and get the team page being viewed.
        const jsonData = JSON.stringify(req.body);
        const teamObject = JSON.parse(jsonData);
        const team = teamObject.team;

        // Get the current location data for the specified team.
        const currentData = await serveCurrentData(team);
        
        // Send current location data as json.
        res.json(currentData);  
    } catch (error) {
        console.log(error);
    }
};

export async function updateTeamData(req, res, __dirname) {
    try {
        // Convert binary string to json and get the team page being viewed.
        const jsonData = JSON.stringify(req.body);
        const updateObject = JSON.parse(jsonData);
        
        // Get the current location data for the specified team.
        const newLocations = await updateLocations(updateObject);
        
        // Write the data to the json file.
        const filePath = path.join(__dirname, 'data', 'current-locations.json');
        await writeDataToFile(filePath, newLocations);
        return updateObject;
    } catch (error) {
        console.log(error);
    }
}

export async function mergeLocalStorage(req, res, __dirname) {
    try {
        
        // Parse the json data into an object 
        const jsonData = JSON.stringify(req.body);
        const mergeObjectArray = JSON.parse(jsonData);
        
        // Merge local storage entries with current server data
        const latestData = await mergeLocalData(mergeObjectArray);
        
        // Write the data to the json file.
        const filePath = path.join(__dirname, 'data', 'current-locations.json');
        await writeDataToFile(filePath, latestData);

        // Send message
        const message = JSON.stringify({message: 'The local storage data has successfully merged'});
        res.json(message);
        
    } catch (error) {
        console.log(error);
    }
}

