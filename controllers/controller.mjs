import bcrypt from 'bcrypt';
import { fetchLocations, fetchAllLocations, getActiveLocations, updateLocations, getInactiveLocations, mergeLocalData } from "../models/data-models.mjs";

export async function authenticateUser(req, res) {
    // Convert binary string to json and get the team page being viewed.
    const jsonData = JSON.stringify(req.body);
    const loginInfo = JSON.parse(jsonData);
    const username = loginInfo.username;
    const password = loginInfo.password;
    const page = loginInfo.page;
  
    const hash = await bcrypt.hash(password, 10);
    const hashTest = await bcrypt.hash('Bbroyg123456?', 10);
    console.log(hashTest);

  if (username == 'BiomedLogin' && password == 'Bbroyg123456?') {
    
    // Authenticate the user BiomedLogin
    req.session.loggedin = true;
    req.session.username = username;      
  };

  res.end();
} 

export async function serveCurrentData(team) {
    try {
        const activeLocations = await getActiveLocations(); 
        const inactiveLocations = await getInactiveLocations();
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
        const team = teamObject.teamName;
        
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
        
        // Update the location data in the database.
        const newLocations = await updateLocations(updateObject);
        
        // Return the update data to controller.
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
        
        // Merge local storage entries with current data and write to DB
        const latestData = await mergeLocalData(mergeObjectArray);
        
        return mergeObjectArray;
        
    } catch (error) {
        console.log(error);
    }
}

