import Express from "express";
import cors from 'cors';
import { fetchData, insertData } from "./controllers/crud-db.js";


const app = Express();
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());
app.use(cors());


// Endpoints
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