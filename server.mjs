import express from 'express';
import path from 'path';
import { serveCurrentData } from './controllers/controller.mjs';
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

app.post('/GetLocations', async (req, res) => {
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
    
  }
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})




