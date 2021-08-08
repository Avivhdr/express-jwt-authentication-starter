const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser')

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();
let user = {};

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Must first load the models
require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passportJWT')(passport);
require('./config/passportOAuth')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Allows our application to make HTTP requests to Express application
app.use(cors());
app.use(cookieParser())

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));

app.get("/user", (req, res) => {
  console.log("getting user data!");
  res.send({});
});

app.get("/auth/logout", (req, res) => {
  console.log("logging out!");
  user = {};
  res.redirect("/");
});

function errorMiddleware(err, req, res, next) {
  if (err) {
    res.send('<h1> Error from errorMiddleware </h1>');
  } else {
    next();
  }
}

app.use(errorMiddleware); // error handler should be last


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(5000, () => console.log('Develop Listening on 5000!'));