const express = require('express')
const {v4: uuidv4 } = require('uuid')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())

const sessionKeys = []

app.get('/session', (req, res) => {
    const newKey = uuidv4()
    sessionKeys.push(newKey)
    res.json({key: newKey})
})



app.post('/session', async (req, res) => {
    const key = sessionKeys.find(key => key == req.body.key)
    if(key == null) {
        res.status(202).send({msg:'Failed'});
    }
    try{
        res.header().send({msg:'Success'})

    } catch{
        res.status(500).send();
    }
})

app.listen(3002, "0.0.0.0")