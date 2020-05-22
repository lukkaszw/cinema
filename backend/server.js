const express = require('express');
const path = require('path');
const cors = require('cors');
require('./database');

//import routers
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const moviesRouter = require('./routes/movies.router');
const scheduleRouter = require('./routes/schedule.router');
const messagesRouter = require('./routes/messages.router');

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'build')));

const auth = require('./middlewares/auth');

app.use('/auth', authRouter);
app.use('/user', auth, userRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});