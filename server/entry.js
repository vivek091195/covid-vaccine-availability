import express from 'express';
import cors from 'cors';
// const availabilityCheck = require('./vaccineChecker');
import { availabilityCheck } from './vaccineChecker.js';

const port = 4000;
const app = express();

app.use(cors());

app.get('/fetchData', async (req, res) => {
  availabilityCheck().then(() => {
    console.log('Vaccine availability checker started.');
  });
});

app.listen(port, () => {
  console.log('Server is up');
});
