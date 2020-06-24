const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const socket = require('socket.io');
const compression = require('compression');
require('./database');

//import routers
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const moviesRouter = require('./routes/movies.router');
const scheduleRouter = require('./routes/schedule.router');
const messagesRouter = require('./routes/messages.router');
const newsRouter = require('./routes/news.router');
const orderRouter = require('./routes/order.router');
const auth = require('./middlewares/auth');

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, '..', 'build')));

const server = app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('connectToShow', (showId) => {
    socket.join(showId);
    console.log('connected to room!');
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/auth', authRouter);
app.use('/user', auth, userRouter);
app.use('/news', auth, newsRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/orders', orderRouter);