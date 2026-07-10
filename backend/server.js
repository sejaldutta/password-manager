const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config()


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'Pass-Manager';

const app = express();
// console.log(process.env.MONGO_URI )
const port = 3000;
app.use(bodyparser.json())
app.use(cors())
client.connect();
const db = client.db(dbName)
    const collection = db.collection('documents')

// get all passwords
app.get("/", async (req,res)=>{
    
    const findResult = await collection.find({}).toArray()
    res.json(findResult)
})

// save a password
app.post("/", async (req,res)=>{
    const password = req.body
    const findResult = await collection.insertOne(password)
    res.send({success:true, result:findResult})
})

// delete password
app.delete('/', async (req, res)=>{
     const password = req.body
    const findResult = await collection.deleteOne({id : password.id})
    res.send({success:true, result:findResult})
})

app.put('/', async(req,res)=>{
    const {id, site, username, password} = req.body
    const result = await collection.updateOne(
       {id: id},
       {$set : {
        site, username, password
       }}
    )
     res.send({success:true, result: result}) // this is important as it sends response whether the task is sucessful to frontend, if it does not send res then frontend keeps waiting and eventually gets timed out
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})