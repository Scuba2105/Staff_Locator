import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getCredentials, retrieveCookieData, addCookieData, fetchLocations, fetchAllLocations, getActiveLocations, updateLocations, getInactiveLocations, mergeLocalData } from "../models/data-models.mjs";

export async function verifyUser(req, res) {
    try {
        const cookies = req.cookies
        const cookieID = cookies.uniqueID;

        // Get the data from the sessionStore and retrieve currently valid id's
        const sessionStore = await retrieveCookieData();
        const sessionData = sessionStore.sessionData;
        const sessionStoreIDs = sessionData.reduce((acc, currentSession) => {
            const sessionObject = JSON.parse(currentSession);
            acc.push(sessionObject.id);
            return acc;
        },[]);
        
        // Check if cookie id is in list of ids in session store.
        if (sessionStoreIDs.includes(cookieID)) {
            return true;
        }
        else {
            return false;
        }
    } 
    catch (error) {
        console.log(error);
    }
}

export async function authenticateUser(req, res) {
    try {
        // Convert binary string to json and get the team page being viewed.
        const jsonData = JSON.stringify(req.body);
        const loginInfo = JSON.parse(jsonData);
        const submittedUsername = loginInfo.username;
        const submittedPassword = loginInfo.password;
        const page = loginInfo.page;
  
        // Get the username and hashed password from the database
        const storedCredentials = await getCredentials();
        const storedUsername = storedCredentials.username;
        const hashedPassword = storedCredentials.password;

        // Compare the username and password and determine if they match
        const passwordResult = await bcrypt.compare(submittedPassword, hashedPassword);
        const usernameResult = submittedUsername == storedUsername ? true : false;
    
        // If credentials match then authorise login to the user
        if (usernameResult && passwordResult) {
            // Generate a unique session ID for the cookie and the expiry date 
            const uniqueID = uuidv4();
            const date = Date.now();
            const cookieMaxAge = 1000 * 60 * 60 * 720; // limits max age to 720 hours or 30 days 
            const expiryDate = date + cookieMaxAge;
            
            // Store the session ID and expiry date in the database
            addCookieData(uniqueID, expiryDate);
            
            // Authenticate the user BiomedLogin with unique ID
            res.cookie('uniqueID', uniqueID,{maxAge: cookieMaxAge});
            res.send('success');     
        }
        else {
            res.send('fail');
        };
    } catch (error) {
        console.log(error);
    }
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

