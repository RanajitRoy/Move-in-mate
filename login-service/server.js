const express = require('express')
// const fileUpload = require("express-fileupload");
const app = express()
const bcrypt = require('bcrypt')
const Multer = require("multer");
const {v4: uuidv4 } = require('uuid')
const { Storage } = require("@google-cloud/storage")

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
    },
  });

const projectId = "projectedu-364623"
const keyFilename = "myKey.json"
const storage = new Storage({
    projectId,
    keyFilename
})
const bucket = storage.bucket("images_2022")

const dbport = process.env.PORT_ENV || "4001"
const dbhost = process.env.HOST_ENV || "localhost"
const dbUrl = "http://" + dbhost + ":" + dbport + "/users"

const sessport = process.env.PORT_ENV || "3002"
const sesshost = process.env.HOST_ENV || "localhost"
const sessUrl = "http://" + sesshost + ":" + sessport + "/session"

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())
// app.use(fileUpload())

app.post('/users/login', async (req, res) => {
    const resp = await fetch(dbUrl, {
        method: 'POST',
        headers: {
          "content-type": 'application/json',
        },
        body: JSON.stringify({pet:"all", smoke:"all", food:"all"})
    })
    const users = await resp.json()
    console.log(users)
    const user = users.find(u => u.email === req.body.email)
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
            res.header().send({msg:'Success', key:(await sessionKey.json())["key"]})
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
        const user = { ...req.body, pass: hashedPass }
        const resp = await fetch(dbUrl+"/new", {
            method: 'POST',
            headers: {
              "content-type": 'application/json',
            },
            body: JSON.stringify(user)
        })
        if(!resp.ok) {
            throw new Error(`Error! status: ${resp.status}`);
        }
        res.status(201).send({msg:"Success"});
    } catch{
        res.status(500).send({msg:"Failed"});
    }
})

app.post("/img", multer.single("img"), (req, res) => {
    try {
        if (req.file) {
          console.log("File found, trying to upload...");
          const newId = uuidv4()
          const blob = bucket.file(newId);
          const blobStream = blob.createWriteStream();
    
          blobStream.on("finish", () => {
            res.status(200).send(newId);
            console.log("Success");
          });
          blobStream.end(req.file.buffer);
        } else throw "error with img";
      } catch (error) {
        res.status(500).send(error);
      }
});

app.post("/img/get", async (req, res) => {
    try {
      const [files] = await bucket.file(req.body.name).download().then(data => {
        res.sendFile(data[0])
      });
      res.send([files]);
      console.log("Success");
    } catch (error) {
      res.send("Error:" + error);
    }
  });

app.listen(3001, "0.0.0.0")