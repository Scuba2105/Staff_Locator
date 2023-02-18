import express from 'express';
import path from 'path';
import { serveCurrentData } from './controllers/controller.mjs';

// Create app
const app = express();

// Define port used for web server to listen on. Set a default if not in hosting environment. 
const PORT = process.env.PORT || 5500;

// Define root directory
const __dirname = path.dirname('.')

// Load pug view engine
app.set('view engine', 'pug');

// Serving static files 
app.use(express.static('public'));

// Serve up jhh.html when root page accessed
app.get('/', async (req, res) => {
  try {
    const currentData = await serveCurrentData('Management');
    console.log(currentData);
    res.render('management', {xyzh: 'HNECT Locator Board'});
    //res.sendFile("public/html/jhh.html", { root: __dirname });
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
app.get('/JHH', (req, res) => {
  try {
    //await serveCurrentData(req, res, 'Tamworth');
    res.sendFile("public/html/tamworth.html", { root: __dirname });
  } 
  catch (error) {
    res.send(err.message);
  }
  });

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})




