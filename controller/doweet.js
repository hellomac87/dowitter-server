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
    const doweet = await doweetRepository.getById(id);
    if(!doweet){
        return res.sendStatus(404)
    }
    if(doweet.userId !== req.userId){
        return res.sendStatus(403);
    }

    const updated = await doweetRepository.update(id, text);
    res.status(200).json(updated);
}

export async function deleteDoweet (req, res) {
    const { id } = req.params;
    const doweet = await doweetRepository.getById(id);
    if(!doweet){
        return res.sendStatus(404)
    }
    if(doweet.userId !== req.userId){
        return res.sendStatus(403);
    }
    
    await doweetRepository.remove(id);
    res.sendStatus(204);
}