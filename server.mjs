import express from 'express';
import path from 'path';

// Create app
const app = express();

// Define port used for web server to listen on. Set a default if not in hosting environment. 
const PORT = process.env.PORT || 5500;

// Define root directory
const __dirname = path.dirname('.')

// Load pug view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');





