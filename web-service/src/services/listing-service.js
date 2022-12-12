const {v4: uuidv4 } = require('uuid')

const port = process.env.PORT_ENV || "5001"
const host = window.location.host || "localhost"
const url = "http://" + host + ":" + port

async function getUsers(food, pet, smoke) {
    const response = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify({
            food: food,
            pet: pet,
            smoke: smoke
        })
    });
    
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result
}

async function getPic(picId) {
    const response = await fetch(`${url}/img/get`, {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify({
            name: picId
        })
    });
    
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result
}

export { getUsers, getPic }