const express = require('express')
const { MongoClient } = require("mongodb")
const app = express()

const uri = "mongodb://172.22.128.1:27017";

const client = new MongoClient(uri);
const database = client.db('moveinmate');
const users = database.collection('users');
const listings = database.collection('listings');
const messages = database.collection('messages');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())

app.post('/users', async (req, res) => {
    const query = { }
    if(req.body.smoke !== "all") {
        query["smoke"] = req.body.smoke
    }
    if(req.body.pet !== "all") {
        query["pet"] = req.body.pet
    }
    if(req.body.food !== "all") {
        query["food"] = req.body.food
    }
    const allusers = await users.find(query).toArray()
    res.json(allusers)
})

app.post('/users/new', async (req, res) => {
    const query = req.body;
    const user = await users.insertOne(query);
    res.send("Success")
})

app.get('/listings', async (req, res) => {
    const query = { email: req.body.email };
    const listing = await listings.find(query);
    res.json(msg)
})

app.post('/listings', async (req, res) => {
    const query = req.body;
    const listing = await listings.insertOne(query);
    res.send("Success")
})

app.get('/messages', async (req, res) => {
    const query = { email: req.body.email };
    const msg = await messages.find(query);
    res.json(msg)
})

app.post('/messages', async (req, res) => {
    const query = req.body;
    const msg = await msg.insertOne(query);
    res.send("Success")
})

app.listen(4001, "0.0.0.0")