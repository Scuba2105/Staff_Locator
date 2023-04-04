import { clear } from 'console';
import express from 'express';
import session from 'express-session';
import path from 'path';
import EventEmitter from 'events';
import { serveCurrentData, sendTeamData, updateTeamData, mergeLocalStorage } from './controllers/controller.mjs';
//import { availableLocations } from './data/available-locations.mjs';

// Create app
const app = express();

// Create event emitter object
const event = new EventEmitter();

// Define port used for web server to listen on. Set a default if not in hosting environment. 
const PORT = process.env.PORT || 5555;

// Define root directory
const __dirname = path.dirname('.')

// Load pug view engine
app.set('view engine', 'pug');

// Set the express sessions middleware
app.use(session({secret: 'verifiedUser', resave: true, saveUninitialized: true}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serving static files 
app.use(express.static('public'));

// Serve the login page when accessing the root directory
app.get('/', (req, res) => {
  try {
    res.sendFile("public/html/Login.html", { root: __dirname });
  } 
  catch (error) {
    res.send(error.message);
  }
});

// Authroise the user when login for submitted.
app.post('/auth', (req, res) => {
  try {
    
    // Convert binary string to json and get the team page being viewed.
    const jsonData = JSON.stringify(req.body);
    const loginInfo = JSON.parse(jsonData);
    const username = loginInfo.username;
    const password = loginInfo.password;
    const page = loginInfo.page;
    
    if (username == 'BiomedLogin' && password == 'Bbroyg123456?') {
      if (page == 'Management') {
        res.sendFile("/home/steven/WebDevelopment/LocatorBoard/Staff_Locator/public/html/jhh.html")
      }
      else if (page == 'JHH') {
        res.sendFile("public/html/jhhteam.html", { root: __dirname });
      }
      else if (page == 'Hunter') {
        res.sendFile("public/html/greenteam.html", { root: __dirname });
      }
      else if (page == 'Tamworth') {
        res.sendFile("public/html/tamworth.html", { root: __dirname });
      }
    };
  } 
  catch (error) {
    res.send(error.message);
  }
});

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
let latestUpdateData = {newData: {name: '', currentLocation: '', comments: '', timestamp: ''}, svgLocationStatus: ''};

// Serve up the latest updated location to each client 
app.get('/LatestUpdate', (req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");
    
    event.on('update', (arg1) => {
      const data = JSON.stringify(arg1);
      console.log(data);
      res.write(`data: ${data}\n\n`);
      res.flushHeaders();
    });
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
    latestUpdateData = {newData: lastUpdatedData, svgLocationStatus: svgData};
    event.emit('update', latestUpdateData);
    res.json({message: `Location was successfully updated for ${lastUpdatedData.name}`});
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.post('/MergeLocalStorage', async (req, res) => {
  try {
    const mergeData = await mergeLocalStorage(req, res, __dirname);
    const svgData = await serveCurrentData('LocationOnly');
    latestUpdateData = {newData: mergeData, svgLocationStatus: svgData};
    
    // Send message to indicate successful merging of local storage
    const message = JSON.stringify({message: 'The local storage data has successfully merged'});
    res.json(message);
    event.emit('update', latestUpdateData);
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
});




