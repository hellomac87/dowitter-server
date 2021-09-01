let doweets = [
    {id: '1' , text: 'dobby hello :)', createAt: Date.now().toString(), name: 'dobby', username: 'dobby' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'},
    {id: '2' , text: 'kimmy hello :)', createAt: Date.now().toString(), name: 'kimmy', username: 'kimmy' , url: 'http://yourheartbadge.co.kr/web/product/big/dogood001.jpg'}
];

export function getAll () {
    return doweets;
}

export function getByUsername (username) {
    return doweets.filter(doweet => doweet.username === username);
}

export function getById(id) {
    return doweets.find(doweet => doweet.id === id);
}

export function create(text, name, username) {
    const doweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username,
    }
    doweets = [doweet, ...doweets];
    return doweets;
}

export function update (id, text) {
    const doweet = doweets.find(doweet => doweet.id === id);
    if(doweet) doweet.text = text;
    return doweet;
}

export function remove (id) {
    doweets = doweets.filter(doweet => doweet.id !== id);
}