import path from 'path';
import { fetchLocations, updateLocations } from "../models/data-models.mjs";
import { writeDataToFile } from '../utils/write-data-to-file.mjs';

export async function serveCurrentData(team) {
    try {
        const jhhData = await fetchLocations('JHH');
        if (team == 'Management') {
            const currentData = {teamData: jhhData.teamData.slice(0,4), allData: jhhData.allData};
            return currentData;
        }
        else if (team == 'JHH'){
            const currentData = {teamData: jhhData.teamData.slice(4), allData: jhhData.allData};
            return currentData;
        }
        else {
            const currentData = await fetchLocations(team);
            return currentData;
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
        const newLocations = await updateLocations(updateObject.newData);
        
        // Write the data to the json file.
        const filePath = path.join(__dirname, 'data', 'current-locations.json');
        writeDataToFile(filePath, newLocations);
        return updateObject;
    } catch (error) {
        console.log(error);
    }
}

