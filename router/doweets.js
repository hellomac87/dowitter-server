import express from "express";
import 'express-async-errors';

import * as doweetRepository from '../data/doweet.js';

let doweets = [
    {id: '1' , text: 'dobby hello :)', createAt: Date.now().toString(), name: 'dobby', username: 'dobby' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'},
    {id: '2' , text: 'kimmy hello :)', createAt: Date.now().toString(), name: 'kimmy', username: 'kimmy' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'}
];
const router = express.Router();

// GET /doweets
// GET /doweets?username=:username
router.get('/', (req, res) => {
    const { username } = req.query;
    const data = username 
    ? doweetRepository.getByUsername(username)
    : doweetRepository.getAll();
    res.status(200).json(data);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const doweet = doweetRepository.getById(id);
    if(doweet)res.status(200).json(doweet);
    else res.status(404).json({message:`doweet id : ${id} not found!`})
    
});

router.post('/',(req, res) => {
    const {text, name, username, url} = req.body;
    const doweet = doweetRepository.create(text, name, username );
    
    res.status(201).json(doweet);
});

router.put('/:id',(req,res) => {
    const { id } = req.params;
    const { text } = req.body;
    const doweet = doweetRepository.update(id, text);
    if(doweet){
        res.status(200).json(doweet)
    }else{
        res.status(404).json({message:`doweet id : ${id} not found!`})
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    doweetRepository.remove(id);
    res.sendStatus(204);
})

export default router;