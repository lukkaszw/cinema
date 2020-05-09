const express = require('express');
const path = require('path');
const cors = require('cors');
require('./database');

//import routers
const moviesRouter = require('./routes/movies.router');
const scheduleRouter = require('./routes/schedule.router');

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));



app.use('/api/movies', moviesRouter);
app.use('/api/schedule', scheduleRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});