import {readJSON, writeJSON} from '../utils/icon-index.js'
import client from '../utils/client-config.js';
  
const collection = client.db('Projects').collection('new2024_Comp');
let iconIdxCache = await readJSON(); // reads once from json file in mongo

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
        return data.length > 0 ? data.sort((a, b) => b.rank - a.rank) : [];
    } 
    catch (error) { console.log(error);} 
  }

async function insertData(data){
    try {
        const doc = await collection.insertOne({
            name: data.name,
            email: data.email,
            length: parseInt(data.length),
            weight: parseInt(data.weight),
            profileIconIndex: iconIdxCache++,
            rank: parseInt(data.length) + parseInt(data.weight),
        }); 

        iconIdxCache = iconIdxCache >= 40 ? 0 : iconIdxCache;
        writeJSON(iconIdxCache); // update the json in mongo

        return doc.insertedId?? null;
    }
    catch (error) { console.log(error);} 
}

export {fetchData, insertData};