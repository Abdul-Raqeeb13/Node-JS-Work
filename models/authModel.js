// this is used to again valdate the data after authvalidator because 
// in this file we save the data at database

const mongoose = require('mongoose')
const { model } = require('mongoose')
const { type } = require('../validator/authValidator')

const authSchema = mongoose.Schema({
    email : {
        type : String,
        require:true,
    },
    password : {
        type : String,
        require:true,
    },
    usertype : {
        type : String,
        require:true,
        enum : ['user', 'admin']
    },
    isVerify : {
        type : Boolean,
        default : false
    },
    otp : {
        type : String
    },
    isComplete : {
        type : Boolean,
        default : false
    },
    profileId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "profile" 
    }
})

const authModel = mongoose.model('auth',authSchema)
// module.exports = authModel

// save the data in database or insert the data
exports.createUser = (obj) => authModel.create(obj)

// check if user exist with the email user enter .check already exist email
exports.findUser = (query) => authModel.findOne(query)

// find the user and update
exports.findUserAndUpdate = (id,query) => authModel.findOneAndUpdate(id,query)

