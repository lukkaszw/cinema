const express = require('express');
const path = require('path');
const cors = require('cors');
require('./database');

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/api/movies', (req, res) => {
  res.json([]);
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});