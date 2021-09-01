import * as doweetRepository from '../data/doweet.js';

export function getDoweets (req, res) {
    const { username } = req.query;
    const data = username 
    ? doweetRepository.getByUsername(username)
    : doweetRepository.getAll();
    res.status(200).json(data);
}

export function getDoweet (req, res) {
    const { id } = req.params;
    const doweet = doweetRepository.getById(id);
    if(doweet)res.status(200).json(doweet);
    else res.status(404).json({message:`doweet id : ${id} not found!`})
}

export function createDoweet (req, res ) {
    const {text, name, username, url} = req.body;
    const doweet = doweetRepository.create(text, name, username );
    
    res.status(201).json(doweet);
}

export function updateDoweet (req, res) {
    const { id } = req.params;
    const { text } = req.body;
    const doweet = doweetRepository.update(id, text);
    if(doweet){
        res.status(200).json(doweet)
    }else{
        res.status(404).json({message:`doweet id : ${id} not found!`})
    }
}

export function deleteDoweet (req, res) {
    const { id } = req.params;
    doweetRepository.remove(id);
    res.sendStatus(204);
}