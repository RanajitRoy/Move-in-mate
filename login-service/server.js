const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const port = process.env.PORT_ENV || "3002"
const host = process.env.HOST_ENV || "localhost"
const sessUrl = "http://" + host + ":" + port + "/session"

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
    res.json(users)
})


app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    console.log(req.body.email)
    if(user == null) {
        res.status(202).send({msg:'Failed', key:""});
    }
    try{
        if(await bcrypt.compare(req.body.pass, user.pass)) {
            const sessionKey = await fetch(sessUrl, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                },
            })
            if(!sessionKey.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            res.header().send({msg:'Success', key:sessionKey.json()["key"]})
        } else{
            res.send({msg:'Failed', key:""})
        }
    } catch{
        res.status(500).send();
    }
})

app.post('/users/register', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(req.body.pass, salt)
        console.log(req.body)
        const user = { ...req.body, pass: hashedPass }
        users.push(user)
        res.status(201).send({msg:"Success"});
    } catch{
        res.status(500).send({msg:"Failed"});
    }
})

app.listen(3001)