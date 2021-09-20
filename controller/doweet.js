import * as doweetRepository from '../data/doweet.js';

export async function getDoweets (req, res) {
    const { username } = req.query;
    const data = await (username 
        ? doweetRepository.getAllByUsername(username)
        : doweetRepository.getAll());
    res.status(200).json(data);
}

export async function getDoweet (req, res) {
    const { id } = req.params;
    const doweet = await doweetRepository.getById(id);
    if(doweet)res.status(200).json(doweet);
    else res.status(404).json({message:`doweet id : ${id} not found!`})
}

export async function createDoweet (req, res ) {
    const {text} = req.body;
    const doweet = await doweetRepository.create(text, req.userId );
    
    res.status(201).json(doweet);
}

export async function updateDoweet (req, res) {
    const { id } = req.params;
    const { text } = req.body;
    const doweet = await doweetRepository.update(id, text);
    if(doweet){
        res.status(200).json(doweet)
    }else{
        res.status(404).json({message:`doweet id : ${id} not found!`})
    }
}

export async function deleteDoweet (req, res) {
    const { id } = req.params;
    await doweetRepository.remove(id);
    res.sendStatus(204);
}