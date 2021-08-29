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

app.get('/doweets', (req, res) => {
    const {username} = req.query;
    const result = [];
    if(username) {
        const doweet = doweets.find(doweet => doweet.username === username);
        res.status(200).send(doweet);
    }else {
        res.status(200).send(doweets);
    }
    
});

app.get('/doweets/:id', (req, res) => {
    const id = Number(req.params.id);
    const doweet = doweets.find(doweet => doweet.id === id);
    if(!!doweet)res.status(200).send(doweet);
    else res.status(404).send('not found!')
    
})

app.post('/doweets',(req, res) => {
    const doweet = {...req.body, id: id++};
    doweets.push(doweet);
    res.status(201).send(doweet);
});

app.put('/doweets/:id',(req,res) => {
    const id = Number(req.params.id);
    const {text} = req.body;
    const index = doweets.findIndex(doweet => doweet.id === id);
    doweets[index].text = text;
    if(index === -1){
        res.status(401).send('not found!');
        return;
    }else{
        res.status(200).send(doweets[index]);
    }
});

app.delete('/doweets/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = doweets.findIndex(doweet => doweet.id === id);
    if(index === -1) {
        res.status(401).send('not found!');
        return;
    }else{
        doweets.splice(index,1);
        res.status(204).send('success');
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
