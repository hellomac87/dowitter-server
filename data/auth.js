import jwt from 'jsonwebtoken';

const secret = 'dobbyisfree'

let users = [];

export async function createUser(user) {
    const id = Date.now().toString();
    users.push({
        ...user,
        id, 
    });
    return id;
}

export async function findByUsername(username){
    return users.find(user => user.username === username);
}