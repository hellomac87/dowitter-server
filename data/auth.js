let users = [
    {
        id: Date.now().toString(),
        username: "dobby",
        password:'$2b$12$tsX8Caa/QPmnOP/kJ/lmp.yRozAphL4asT4jNRhazBoX/ZwtSnfV.',
        name: "dobby",
        email: "dobby@gmail.com",
        url: "https://blog.kakaocdn.net/dn/5tome/btqQE8ByXTj/oHgWbIGVkswiBWZj3AKnW1/img.jpg"
    }
];

export async function createUser(user) {
    const id = Date.now().toString();
    users.push({
        ...user,
        id, 
    });
    return id;
}

export async function findById(id){
    const user = users.find(user => user.id === id);
    return user;
}

export async function findByUsername(username){
    return users.find(user => user.username === username);
}