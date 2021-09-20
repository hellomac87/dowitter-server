import * as userRepository from '../data/auth.js';

let doweets = [
    {
        id:'1',
        text: 'this is dobby :)',
        createdAt: new Date().toString(),
        userId:'1',
    },
    {
        id:'2',
        text: 'it is dobby222 :)',
        createdAt: new Date().toString(),
        userId:'1',
    }
];

export async function getAll () {
    return Promise.all(
        doweets.map(async(doweet) => {
            const {username, name, url} = await userRepository.findById(doweet.userId);
            return {...doweet, username, name, url}
        })
    )
}

export async function getAllByUsername (username) {
    return getAll().then((doweets) => {
        return doweets.filter(doweet => doweet.username === username);
    });
}

export async function getById(id) {
    const found =  doweets.find(doweet => doweet.id === id);
    if(!found){
        return null
    }
    const {username, name, url} = await userRepository.findById(found.userId);
    return {...found, username, name, url};
}

export async function create(text, userId) {
    const doweet = {
        id: new Date().toString(),
        text,
        createdAt: new Date().toString(),
        userId
    }
    doweets = [doweet, ...doweets];
    return getById(doweet.id);
}

export async function update (id, text) {
    const doweet = doweets.find(doweet => doweet.id === id);
    if(doweet) doweet.text = text;

    return getById(doweet.id);
}

export async function remove (id) {
    doweets = doweets.filter(doweet => doweet.id !== id);
}