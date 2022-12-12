const port = process.env.PORT_ENV || "3001"
const host = process.env.HOST_ENV || "localhost"
const url = "http://" + host + ":" + port

async function handleLogin(email, pass) {
    const response = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify({
            email: email,
            pass: pass
        })
    });
    
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return [result.msg === "Success", result.key]
}

async function handleUserRegistration(user) {
    console.log(user)
    const response = await fetch(`${url}/users/register`, {
        method: 'POST',
        headers: {
          "content-type": 'application/json',
        },
        body: JSON.stringify(user)
    });
    
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.msg === "Success"
}

export { handleLogin, handleUserRegistration }
