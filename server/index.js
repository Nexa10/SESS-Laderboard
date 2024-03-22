import Express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Local install
import {readJSON, writeJSON} from "./utils/icon-index.js";

// Globals
const app = Express();
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.REACT_APP_MONGO_USERNAME}:${process.env.REACT_APP_MONGO_PASSWORD}@cluster0.lu9g8kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const collection = client.db('Projects').collection('new2024_Comp');

let iconIdxCache = await readJSON(); // reads once from localDB.json

function rank(len, wgt) {
  const [w1, w2] = [0.5, 0.7] // weights of each param to rank

  return Math.floor(w1 * len + w2 * wgt);
}

async function fetchData(){
    const option = {
      projection:{
        _id:1, 
        name:1, 
        length:1, 
        weight:1, 
        profileIconIndex:1,
        rank:1,
      }
    };

    try {
        const data = await collection.find({}, option).toArray();
        if(data.length > 0){
            return data.sort((a, b) => b.rank - a.rank);
        }
        else{
            return [];
        }
    } catch (error) {
        throw error;
    } 
  }

async function insertData(data){

    try {
        const doc = await collection.insertOne({
            name: data.name,
            length: parseInt(data.length),
            weight: parseInt(data.weight),
            profileIconIndex: iconIdxCache++,
            rank: rank(parseInt(data.length), parseInt(data.weight)),
        }); 

        iconIdxCache = iconIdxCache >= 40 ? 0 : iconIdxCache;
        writeJSON(iconIdxCache); // update the localDB.json
        return doc.insertedId?? null;
    } catch (error) {
        throw error;
    }
}


app.get("/getAll", async (req, res) => {  
    res.json(await fetchData());
});

app.post("/new", async (req, res) => {
    const data = req.body;
    console.log(data);
    const add = await insertData(data)
    add !== null ? res.status(200).send("Data added") : res.status(500).send("Error adding data");
});

app.listen(8080, () => {
    console.log(`Server is listening at http://localhost:${8080}`);
});