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

// Serving static files 
app.use(express.static('public'));

// Serve up jhh.html when root page accessed
app.get('/', (req, res) => {
    res.sendFile("public/html/jhh.html", { root: __dirname });
  });

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})




