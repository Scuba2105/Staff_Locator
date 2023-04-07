import express from 'express';
import session from 'express-session';
import path from 'path';
import cors from 'cors';
import Pusher from 'pusher';
import { serveCurrentData, sendTeamData, updateTeamData, mergeLocalStorage } from './controllers/controller.mjs';

// Create app
const app = express();

// Define port used for web server to listen on. Set a default if not in hosting environment. 
const PORT = process.env.PORT || 5555;

// Define root directory
const __dirname = path.dirname('.')

// Create new instance of Pusher for real time updates
const pusher = new Pusher({
  appId: "1580687",
  key: "37bc4f70b8b5ef5ca38a",
  secret: "e8128e8608c377656029",
  cluster: "ap4",
  useTLS: true
});

// Load pug view engine
app.set('view engine', 'pug');

// Set the express sessions middleware
app.use(session({secret: 'verifiedUser', resave: true, saveUninitialized: true, cookie : {
  sameSite: 'strict'
}}));

// Serve secure cookies 
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
};

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serving static files 
app.use(express.static('public'));

// Specify CORS to allow web page to access any Cross-Origin API including Amazon S3.
app.use(cors({origin: '*'}));

// Serve the login page when accessing the root directory
app.get('/', (req, res) => {
  try {
    res.sendFile("public/html/Login.html", { root: __dirname });
  } 
  catch (error) {
    res.send(error.message);
  }
});

// Authorise the user when login for submitted.
app.post('/auth', async (req, res) => {
  try {
    await authenticateUser(req, res);
    async function authenticateUser(req, res) {
      // Convert binary string to json and get the team page being viewed.
    const jsonData = JSON.stringify(req.body);
    const loginInfo = JSON.parse(jsonData);
    const username = loginInfo.username;
    const password = loginInfo.password;
    const page = loginInfo.page;
    
    if (username == 'BiomedLogin' && password == 'Bbroyg123456?') {
      
      // Authenticate the user BiomedLogin
      req.session.loggedin = true;
      req.session.username = username;      
    };

    res.end();
  } 
    
  }  
  catch (error) {
    res.send(error.message);
  }
});

// Serve up jhh.html when root page accessed
app.get('/Management', (req, res) => {
  try {
    
    // If logged in send the requested page otherwise send the login page
    if (req.session.loggedin) {
      res.sendFile("public/html/jhh.html", { root: __dirname });
    }
    else {
      res.redirect('/');
    }
  } 
  catch (error) {
    res.send(error.message);
  }
});
    
// Serve up jhhteam.html when JHH page accessed
app.get('/JHH', (req, res) => {
  try {
    
    // If logged in send the requested page otherwise send the login page
    if (req.session.loggedin) {
      res.sendFile("public/html/jhhteam.html", { root: __dirname });
    }
    else {
      res.redirect('/');
    }
  } 
  catch (error) {
    res.send(err.message);
  }
  });

// Serve up greenteam.html when Hunter team page accessed
app.get('/Hunter', (req, res) => {
  try {

    // If logged in send the requested page otherwise send the login page
    if (req.session.loggedin) {
      res.sendFile("public/html/greenteam.html", { root: __dirname });
    }
    else {
      res.redirect('/');
    }
  } 
  catch (error) {
    res.send(err.message);
  }
  });

// Serve up tamworth.html when New England page is accessed
app.get('/Tamworth', (req, res) => {
  try {
    
    // If logged in send the requested page otherwise send the login page
    if (req.session.loggedin) {
      res.sendFile("public/html/tamworth.html", { root: __dirname });
    }
    else {
      res.redirect('/');
    }
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
    const latestUpdateData = {newData: lastUpdatedData, svgLocationStatus: svgData};
    pusher.trigger("my-channel", "my-event", latestUpdateData);
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
    pusher.trigger("my-channel", "my-event", latestUpdateData);
  } 
  catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
});




