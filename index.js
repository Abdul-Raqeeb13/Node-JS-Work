// this is the main file where the app is run

const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const { signup } = require("./controllers/authController")
const mainrouter = require("./routes/mainRouter")
require("dotenv").config()
const app = express()


const dbURL = process.env.DBConnectionURl
mongoose.connect(dbURL)

const db= mongoose.connection

db.once("open", ()=>{
    console.log("MongoDB Connection Successfull");
})

db.on("error",()=>{
    console.log("Error occured during MongoDB connection");

})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(mainrouter)
// app.get("/signup", signup)









// app.get("/",(req,res)=>{
//     res.send("hello from the get side")
// })

// app.post("/",(req,res)=>{
//     res.send(req.body)
// })

app.listen(8000, () => {
    console.log("App running on port no 8000");

})