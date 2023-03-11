import { clear } from 'console';
import express from 'express';
import path from 'path';
import { serveCurrentData, sendTeamData, updateTeamData, mergeLocalStorage } from './controllers/controller.mjs';
//import { availableLocations } from './data/available-locations.mjs';

// Create app
const app = express();

// Define port used for web server to listen on. Set a default if not in hosting environment. 
const PORT = process.env.PORT || 5555;

// Define root directory
const __dirname = path.dirname('.')

// Load pug view engine
app.set('view engine', 'pug');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serving static files 
app.use(express.static('public'));

// Serve up jhh.html when root page accessed
app.get('/Management', (req, res) => {
  try {
    //const currentData = await serveCurrentData('Management');
    //res.render('body', {formLocations: availableLocations, currentLocations: currentData, backgroundColor: '#ff4444'});
    res.sendFile("public/html/jhh.html", { root: __dirname });
  } 
  catch (error) {
    res.send(error.message);
  }
});
    
// Serve up jhhteam.html when JHH page accessed
app.get('/JHH', (req, res) => {
  try {
    //await serveCurrentData(req, res, 'JHH');
    res.sendFile("public/html/jhhteam.html", { root: __dirname });
  } 
  catch (error) {
    res.send(err.message);
  }
  });

// Serve up greenteam.html when Hunter team page accessed
app.get('/Hunter', (req, res) => {
  try {
    //await serveCurrentData(req, res, 'Green);
    res.sendFile("public/html/greenteam.html", { root: __dirname });
  } 
  catch (error) {
    res.send(err.message);
  }
  });

// Serve up tamworth.html when New England page is accessed
app.get('/Tamworth', (req, res) => {
  try {
    //await serveCurrentData(req, res, 'Tamworth');
    res.sendFile("public/html/tamworth.html", { root: __dirname });
  } 
  catch (error) {
    res.send(err.message);
  }
});

// Store the latest update data
let latestUpdateData = {newData: [{name: 'ISHAQUE KHAN', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'PAUL COOKSON', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'MICHELLE ISON', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'GLADY GIDEON', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'DURGA SOMPALLE', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'ATIF SIDDIQUI', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'MICHAEL DATHAN-HORDER', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'MITCHELL PACEY', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'STEVEN BRADBURY', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'KEITH BALL', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'ELLEN HEYDON', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'RODNEY BIRT', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'RAY AUNEI MOSE', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'MITCHELL PYNE', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'PEDRAM BIDAR', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'JOHN LARKWORTHY', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'AZMI REFAL', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'BRET PRYOR', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'TROY TRAEGAR', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'PATRICK SMALL', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'MATTHEW MURRELL', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'WAYNE FULLER', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'LEIGH RYAN', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'MATTHEW LAW', currentLocation: '', comments: '', timestamp: '', flag: 0},
{name: 'TOME TOMEV', currentLocation: '', comments: '', timestamp: '', flag: 0}, {name: 'KENDO WU', currentLocation: '', comments: '', timestamp: '', flag: 0}], svgLocationStatus: ''};

// Serve up the latest updated location to each client 
app.get('/LatestUpdate', (req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(() => {
      const currentUpdates = latestUpdateData.newData.filter((entry) => {
        return entry.flag == 1;
      })
      if (currentUpdates.length > 0) {
        const data = JSON.stringify({newData: currentUpdates, svgLocationStatus: latestUpdateData.svgLocationStatus});
        console.log(data);
        res.write(`data: ${data}\n\n`);
        res.end();
        latestUpdateData.newData.forEach((entry) => {
          entry.flag = 0;
        })
      }
    }, 5000);  
  } 
  catch (error) {
    res.send(err.message);
  }
});

app.post('/GetLocations', async (req, res) => {
  try {
    sendTeamData(req, res);
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.post('/UpdateLocations', async (req, res) => {
  try {
    const lastUpdatedData = await updateTeamData(req, res, __dirname);
    const svgData = await serveCurrentData('LocationOnly');
    const finalData = latestUpdateData.newData.map((entry) => {
      if (entry.name == lastUpdatedData.name) {
        lastUpdatedData.flag = 1;
        return lastUpdatedData;
      }
      else {
        return entry;
      }
    });
    latestUpdateData = {newData: finalData, svgLocationStatus: svgData};
    res.json({message: `Location was successfully updated for ${lastUpdatedData.name}`});
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.post('/MergeLocalStorage', async (req, res) => {
  try {
    await mergeLocalStorage(req, res, __dirname);
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
});




