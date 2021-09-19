import * as userRepository from '../data/auth.js';

let doweets = [
    {id: '1' ,userId:'1', text: 'dobby hello :)', createAt: Date.now().toString(), name: 'dobby', username: 'dobby' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'},
    {id: '2' ,userId:'2', text: 'kimmy hello :)', createAt: Date.now().toString(), name: 'kimmy', username: 'kimmy' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'}
];

export async function getAll () {
    return Promise.all(
        doweets.map(async(doweet) => {
            const {username, name, url} = await userRepository.findById(doweet.userId);
            return {...doweet, username, name, url}
        })
    )
}

export async function getByUsername (username) {
    return getAll().then((doweets) => {
        doweets.filter(doweet => doweet.username === username);
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
        id: Date.now().toString(),
        text,
        createdAt: Date.now().toString(),
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