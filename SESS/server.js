const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const hostname = '192.168.0.16'
app.use(express.static('assets'))
app.use(express.urlencoded({ extended: true }))
const exphbs = require("express-handlebars");
app.engine(".hbs", exphbs.engine({
  extname: ".hbs",
  helpers: {
      json: (context) => { return JSON.stringify(context) }
  }
}));
app.set("view engine", ".hbs");
//--------------------------------------------------------------
const fs = require('fs');
// specify the file path and the object to append
const filePath = 'database.txt';

//----------------------------------------------------------------
//Global Variables
const database = [] //Literals: {rank: 0, name: _name, email: _email, brgLen: _len, brgWeight: _weight, profileIcon: img}

let image_count = 0 //keeps track of the profiles icons in "images" folder, so every participant have a different icon


const setImageIcon = () =>{
  image_count ++
  if(image_count > 40) image_count = 0
  return (image_count).toString() + ".png" //e.g 1.png, 2.png ....
}

const rankUsers = (list)=>{
  sorted_list = list.sort((a, b) => b.brgLen - a.brgLen);
  let _rank = 0;
  //increment rank acccording to the sorted array
  sorted_list.forEach(function(i){
    _rank ++
    i.rank = _rank
  })
  return sorted_list;
}

const ifUserExist = (list) =>{
  let found = false
  for(let i = 0; i < database.length; i++){
    if(list.email === database[i].email && list.name === database[i].name){
      let temp = database[i].profileIcon
      database[i] = list
      database[i].profileIcon = temp; //maintains the original image of the participant
      found = true
      break
    }  
  }
  return found
}

//Helper for Top 3 in the leaderboard, when countUsers() is ture, top 3 shows
const countUsers = () =>{
  let count = 0;
  let isTrue = false
  database.forEach(function(i){
    count ++
  })

  if(count > 3 || (fs.readFileSync(filePath).length > 3)) isTrue = true
  return isTrue
}

app.get("/leaderboard", (req, res) => { 
  let filedata = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
  const data_to_string = filedata.toString()
  const file_dB = JSON.parse(data_to_string);
  let updatedList = rankUsers(file_dB);
  let top3 = countUsers() //bool

  res.render("index", {layout:false, rankingList: updatedList, usercount:top3})
})

app.get("/", (req, res) =>{
  res.render("update", {layout:false})
})

app.post("/update", (req, res) =>{
  if(req.body.userName === "" || req.body.userEmail === "" || req.body.userLen === "" || req.body.userWeight === ""){
    res.send("ERROR: Empty Fields!")
    return
  }
    
  if(isNaN(req.body.userLen) || isNaN(req.body.userWeight)){
      res.send("ERROR: Length & Weigth must be numbers")
      return
  }
  const _name = req.body.userName
  const _email = req.body.userEmail
  const _len = parseFloat(req.body.userLen).toFixed(2)
  const _weight = parseFloat(req.body.userWeight).toFixed(2)
  const img = setImageIcon() //e.g 1.png, 2.png ....

  const data = {rank: 0, name: _name, email: _email, brgLen: _len, brgWeight: _weight, profileIcon: img}
  
  const _exists = ifUserExist(data) //checks if participant already exists in the DB, if it does, updates their current data

  if(_exists === false){
     //Incase of a server restart, the object literals stored in the file has to be push into the database list again. If not the file data would be lost.
     if(database.length === 0 && (fs.readFileSync(filePath).length > 0)){
      let filedata = fs.readFileSync(filePath)
      const data_to_string = filedata.toString()
      const file_dB = JSON.parse(data_to_string)

      database.push(file_dB)
     }
  
      database.push(data)
      const stringToAppend = JSON.stringify(database);
  
      fs.writeFileSync(filePath, stringToAppend, function (err) {
        if (err) throw err;
      });
  }
  else image_count -- //this is because img in line 97 (setImageIcon()) incremented the count
  
  res.render("confirmation", {layout:false, _data: data})
})

const onHttpStart = () => {
    console.log("Express http server listening on: " + HTTP_PORT);
    console.log(`http://localhost:${HTTP_PORT}`);
   }
   app.listen(HTTP_PORT, onHttpStart);