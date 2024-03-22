// This file also reads and writes the icon index to a local json file.

import { writeFile, promises} from "fs";
import filepath from "path";

const __dirname = "/Users/dennisaudu/Desktop/Projects/leaderboard/SESS-Laderboard/server/assets/"
const path = filepath.join(__dirname, 'localDB.json');
const MAX = 40;

const readJSON = async () => {
    try {
        const content = await promises.readFile(path, 'utf8');
        return JSON.parse(content).iconsCount ?? Math.floor(Math.random() * MAX);
    } catch (error) {
        console.log(error);
    }
}

const writeJSON = async (val) => {
    try {
        if (val >= MAX) val = 0;
        writeFile(path, JSON.stringify({iconsCount: val}), ()=>{});
    } catch (error) {
        console.log(error);
    }
};


export {writeJSON, readJSON}