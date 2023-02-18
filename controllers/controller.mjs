import { fetchLocations } from "../models/data-models.mjs";

export async function serveCurrentData(req, res, team) {
    if (team == 'Management') {
        const jhhData = await fetchLocations('JHH');
        const currentData = jhhData.slice(0,4);
        console.log(currentData);
    }
    else if (team == 'JHH'){
        const jhhData = await fetchLocations('JHH')
        const currentData = jhhData.slice(4);
        console.log(currentData);
    }
    else {
        const currentData = await fetchLocations(team);
        console.log(currentData);
    }
    //res.render('routes', currentData);
}

