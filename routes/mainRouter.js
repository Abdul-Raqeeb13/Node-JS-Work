const express = require("express")
const router = require("./authRouter")
const mainrouter = express.Router()

mainrouter.use("/user",router)

module.exports = mainrouter