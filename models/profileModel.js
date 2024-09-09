const mongoose = require('mongoose')
const { model } = require('mongoose')

const profileSchema = mongoose.Schema({
    username : {
        type : String,
        require:true,
    },

    age :  {
        type : String,
        require:true,
    },

    gender :  {
        type : String,
        require:true,
        enum : ['male' , 'female']
    },

    image :  {
        type : String,
        require:true,
    },
    
    authId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "auth" 
    }
})


const profileModel = model('profile',profileSchema)

exports.createUserProfile = (obj) => profileModel.create(obj) 

// delete profile

exports.deleteProfile = (id) => profileModel.findOneAndDelete(id)