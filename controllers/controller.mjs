import { fetchLocations } from "../models/data-models.mjs";

export async function serveCurrentData(team) {
    if (team == 'Management') {
        const jhhData = await fetchLocations('JHH');
        const currentData = jhhData.slice(0,4);
        return currentData;
    }
    else if (team == 'JHH'){
        const jhhData = await fetchLocations('JHH')
        const currentData = jhhData.slice(4);
        return currentData;
    }
    else {
        const currentData = await fetchLocations(team);
        return currentData;
    }
};

export async function sendTeamData(req, res) {
    // Convert binary string to json and get the team page being viewed.
    const jsonData = JSON.stringify(req.body);
    const teamObject = JSON.parse(jsonData);
    const team = teamObject.team;

    // Get the current location data for the specified team.
    const currentData = await serveCurrentData(team);
    
    // Send current location data as json.
    res.json(currentData);
}

