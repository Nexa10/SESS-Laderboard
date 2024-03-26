// This file also reads and writes the icon index to a json file stored in mongo.
import client from './client-config.js';
const collection = client.db('Projects').collection('LeaderboardIconIndex');

const MAX = 40;

const readJSON = async () => {
    try {
        const data = await collection.find({}).toArray();
        return data.length > 0? data[0].iconsCount : 0;
    }
    catch (error) { console.log(error);}    
};

const writeJSON = async (val) => {
    try {
        if (val >= MAX) val = 0;
        collection.updateOne({name: "count"}, {$set: {iconsCount: val}});
    } 
    catch (error) { console.log(error);} 
};

export {writeJSON, readJSON};