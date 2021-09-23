import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import { Server } from 'socket.io';

import doweetsRouter from './router/doweets.js';
import authRouter from './router/auth.js';
import config from './config.js';


const app = express();
const port = config.host.port;

let id = 1;
const doweets = [];

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/doweets', doweetsRouter);
app.use('/auth' , authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error,req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

const socketIO = new Server(server,{
  cors: {
    origin:'*'
  }
});

socketIO.on('connect',socket => {
  console.log('client is here!');
})

setInterval(() => {
  socketIO.emit('dowitter', 'welcome dowitter');
},1000)