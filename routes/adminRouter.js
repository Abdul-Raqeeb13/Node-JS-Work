const express = require("express")
const router = express.Router()
const {AdminLogin, getAllUser, deleteUser} = require("../controllers/adminController")
const { adminMiddleare } = require("../middlewares/adminMiddleware")

router.post('/login', AdminLogin)
router.get('/getalluser', adminMiddleare, getAllUser)
router.get('/deleteuser', adminMiddleare, deleteUser)

module.exports = router