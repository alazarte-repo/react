/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import path from 'path';
import compression from 'compression';

const port = 9000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
});
