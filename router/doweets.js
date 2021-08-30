import express from "express";
import 'express-async-errors';

let doweets = [
    {id: '1' , text: 'dobby hello :)', createAt: Date.now().toString(), name: 'dobby', username: 'dobby' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'},
    {id: '2' , text: 'kimmy hello :)', createAt: Date.now().toString(), name: 'kimmy', username: 'kimmy' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'}
]
const router = express.Router();

// GET /doweets
// GET /doweets?username=:username
router.get('/', (req, res) => {
    const { username } = req.query;
    const data = username ? doweets.filter(doweet => doweet.username === username) : doweets;
    res.status(200).json(data);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const doweet = doweets.find(doweet => doweet.id === id);
    if(doweet)res.status(200).json(doweet);
    else res.status(404).json({message:`doweet id : ${id} not found!`})
    
});

router.post('/',(req, res) => {
    const {text, name, username, url} = req.body;
    const doweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
        url,
    }
    doweets = [doweet, ...doweets];
    res.status(201).json(doweet);
});

router.put('/:id',(req,res) => {
    const { id } = req.params;
    const { text } = req.body;
    const doweet = doweets.find(doweet => doweet.id === id);
    if(doweet){
        doweet.text = text;
        res.status(200).json(doweet)
    }else{
        res.status(404).json({message:`doweet id : ${id} not found!`})
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    doweets = doweets.filter(doweet => doweet.id !== id);
    res.sendStatus(204);
})

export default router;