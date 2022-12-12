const express = require('express')
const app = express()
const { Storage } = require("@google-cloud/storage")
const tmp = require('tmp');
const fs = require('fs');

const dbport = process.env.PORT_ENV || "4001"
const dbhost = process.env.HOST_ENV || "localhost"
const dbUrl = "http://" + dbhost + ":" + dbport + "/users"

const sessport = process.env.PORT_ENV || "3002"
const sesshost = process.env.HOST_ENV || "localhost"
const sessUrl = "http://" + sesshost + ":" + sessport + "/session"

const projectId = "projectedu-364623"
const keyFilename = "myKey.json"
const storage = new Storage({
    projectId,
    keyFilename
})
const bucket = storage.bucket("images_2022")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())


app.post('/users', async (req, res) => {
    const response = await fetch(dbUrl, {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify(req.body)
    });
    if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    res.json(result)
})

app.get("/img/:id", async (req, res) => {
    try {
      const  filename = "/tmp/"+req.params.id+".jpg"
      await bucket.file(req.params.id).download().then(data => {
        // const tmpobj = tmp.fileSync({ mode: 0o666, postfix: '.jpg' });
        fs.writeFileSync(filename, data[0])
        res.sendFile(filename)
        // fs.unlinkSync(filename)
        // tmpobj.removeCallback();
      });
      console.log("Success");
    } catch (error) {
      res.send("Error:" + error);
    }
  });

app.listen(5001, "0.0.0.0")