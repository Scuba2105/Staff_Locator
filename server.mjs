import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import cors from 'cors';
import Pusher from 'pusher';
import { authenticateUser,serveCurrentData, sendTeamData, updateTeamData, mergeLocalStorage } from './controllers/controller.mjs';

// Create app
const app = express();

// Create Redis client and log if successfully connected or if error occurred
const redisClient  = createClient();
redisClient.connect();

client.on('connect', () => {
  console.log(`New Redis client created: ${client}`);
});

client.on('error', () => {
  console.log('Redis client error!');
});

// Create a Redis cache for storing session information
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'hnect-staff-locator'
});

// Define port used for web server to listen on. Set a default if not in hosting environment 
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

// Add redis store to production environment only after testing and set session middleware to store in Redis cache 
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  // Create a Redis cache for storing session information
  // const redisStore = new RedisStore({
  //   client: redisClient,
  //   prefix: 'hnect-staff-locator'
  // }); 
  // Set the express sessions middleware to validate user browser session and persist in Redis cache for 1 month 
//   app.use(session({
//     secret: 'verifiedUser', 
//     genid: function (req) {
//       return uuidv4(); 
//     },
//     store: redisStore,
//     resave: false, 
//     saveUninitialized: false, 
//     cookie : {
//     sameSite: 'strict',
//     maxAge: 1000 * 60 * 60 * 720,
//     secure: false
//   }
// }));
};

// Set the express sessions middleware to validate user browser session and persist in Redis cache for 10 mins for testing 
app.use(session({
  secret: 'verifiedUser', 
  genid: function (req) {
    return uuidv4(); 
  },
  store: redisStore,
  resave: false, 
  saveUninitialized: false, 
  cookie : {
    sameSite: 'strict',
    maxAge: 1000 * 60 * 10,
    secure: false
  }
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serving static files 
app.use(express.static('public'));

// Specify CORS to allow web page to access any Cross-Origin API including Amazon S3.
app.use(cors({origin: '*'}));

// Serve the login page when accessing the root directory
app.get('/', (req, res) => {
  try {
    res.sendFile("public/html/login.html", { root: __dirname });
  } 
  catch (error) {
    res.send(error.message);
  }
});

// Authorise the user when login for submitted.
app.post('/auth', async (req, res) => {
  try {
    await authenticateUser(req, res);
  }  
  catch (error) {
    res.send(error.message);
  }
});

// Serve up requested html page based on provided id parameter in the URL
app.get('/location/:id', (req, res) => {
  try {
    // Get id parameter from the url
    const id = (req.params.id).toLowerCase();
    
    // If logged in send the requested page otherwise send the login page
    if (req.session.loggedin) {
      res.sendFile(`public/html/${id}.html`, { root: __dirname });
    }
    else {
      res.redirect('/');
    }
  } 
  catch (error) {
    res.send(error.message);
  }
});

// When location ID is posted to route provide the location data for that location.
// This is used to initialise locations when page first loaded
app.post('/GetLocations', async (req, res) => {
  try {
    sendTeamData(req, res);
  } 
  catch (error) {
    res.send(error.message);
  }
});

// Update location data when update made and use Pusher to send to all clients 
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

// Merge local storage data when client reconnects and use Pusher to send relevant data to connected clients 
app.post('/MergeLocalStorage', async (req, res) => {
  try {
    const mergeData = await mergeLocalStorage(req, res, __dirname);
    const svgData = await serveCurrentData('LocationOnly');
    const latestUpdateData = {newData: mergeData, svgLocationStatus: svgData};
    
    // Send message to indicate successful merging of local storage
    const message = JSON.stringify({message: 'The local storage data has successfully merged'});
    res.json(message);
    pusher.trigger("my-channel", "my-event", latestUpdateData);
  } 
  catch (error) {
    res.send(error.message);
  }
});

// Set cron job for deleting expired session information from firebase


app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
});




