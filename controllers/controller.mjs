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
}

