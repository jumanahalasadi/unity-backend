'use strict';

const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/game-routes');
const imageRoutes = require('./routes/image-routes');

// import our current configuration
const config = require('./config');

// set up our app using express
const app = express();

// express setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes (for uploading game streams and images to storage)
app.use('/api', gameRoutes.routes);
app.use('/api', imageRoutes.routes)

// app running
app.listen(config.port, () => {
    console.log ("app is listening on port:", config.port);
})