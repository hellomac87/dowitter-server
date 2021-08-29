import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import doweetsRouter from './router/doweets.js';

const app = express();
const port = 8080;

let id = 1;
const doweets = [];

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/doweets', doweetsRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error,req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
