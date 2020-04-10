const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'build')));

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});