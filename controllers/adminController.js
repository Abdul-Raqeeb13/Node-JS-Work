const {findUser, findAllUsers, findAndDelete} = require('../models/authModel');
const exp = require('express')
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");
const { deleteProfile } = require('../models/profileModel');
require("dotenv").config()

exports.AdminLogin = ( async (req,res)=>{
    try {

        const {email , password} = req.body
        const checkUser = await findUser({email : email}).populate("profileId")
        if(checkUser && checkUser.usertype == "admin"){
            const checkPassword = await bcrypt.compare(password , checkUser.password )
            if(checkPassword){
                if (checkUser.isVerify && checkUser.isComplete) {
                    const token = JWT.sign({ _id : checkUser._id,userType : checkUser.usertype }, process.env.SCERET_KEY, {expiresIn : "2h"})  
                    res.send({
                        message:"Admin Login success",
                        data:checkUser,
                        userType : checkUser.usertype,
                        token
                    })
                } else if (checkUser.isVerify == false) {
                    res.send({
                        message:"Please verify your  account",
                        data:checkUser
                    })
                }
                 else if (checkUser.isComplete == false) {
                    res.send({
                        message:"Please complete your profile",
                        data:checkUser

                    })
                }
            
            }
            else{
                res.send({
                    message:"Invalid Password"
                })
            }
        }
        else if(checkUser.usertype != "admin"){
            res.send({
                message: "plz login as admin"
            })
        }
        else{
            res.send({
                message: "User not found"
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}
)

// read
exports.getAllUser = (async (req,res)=>{
    try {

        const userList = await findAllUsers({usertype : "user"})
        res.send({message : "get all users" , data:userList})

    } catch (error) {
        res.send({
            message  :"Not found any user"
        })
    }
})

// delete
exports.deleteUser = async (req,res)=>{
    try {
        const user = await findUser({_id : req.query.id}).populate("profileId")

        console.log(user.profileId._id);
        await deleteProfile({_id:user.profileId._id})
        await findAndDelete({_id:user._id})
        res.send({message : "get delete  users" , data:user})  
    } catch (error) {
        res.send({message : error})
    }
}

