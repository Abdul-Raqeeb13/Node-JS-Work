const express = require("express")
const router = require("./authRouter")
const adminRouter = require("./adminRouter")
const mainrouter = express.Router()

mainrouter.use("/user",router)
mainrouter.use("/admin",adminRouter)

module.exports = mainrouter