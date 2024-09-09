// this is the file to control the data of user 

const userValidate = require("../validator/authValidator")
const authModel = require('../models/authModel')
const {findUser, createUser , findUserAndUpdate} = require('../models/authModel');
const bcrypt = require('bcrypt');
const {sendMail} = require('../utilities/sendMail')
const JWT = require("jsonwebtoken");
const profileValidator = require("../validator/profileValidate");
const { createUserProfile } = require("../models/profileModel");
const { date } = require("joi");
const loginValidate = require("../validator/loginValidator");
require("dotenv").config()


// create
exports.signup = async (req, res) => {
    try {
        // this line validate the data in authValidator file 
        const { error } = await userValidate.validate(req.body);
        if (error) {
            res.send({
                error: error.details[0].message
            })
        } else {
            const { email, password, usertype } = req.body

            const checkUser = await findUser({email:email})
            
            if(checkUser){
                res.status(400).send({
                    message : "Email is already exist",
                    status : false
                })
            }
            else{
                
                const hashpassword = await bcrypt.hash(password, 12)
                req.body.password = hashpassword

                const otp = Math.floor(Math.random() * 900000)
                req.body.otp = otp
                
                await sendMail(email , otp) 
                
                const data = await createUser(req.body)
                const token = JWT.sign({ _id : data._id }, process.env.SCERET_KEY, {expiresIn : "2h"})  
    
                res.send({
                   message : "Account Created Successfully",
                   data,
                   token
                })
            }

          
        }

    } catch (e) {
        res.send(e)
    }
}

exports.verifyOtp = async(req, res)=>{
    try {
        const {body , headers} = req 
        const {authorization} = headers
        const {otp} = body
        if (!authorization) {
            res.status(400).send({
                message : "Token Required",
             })
        }
        else if(!otp){
            res.status(400).send({
                message : "OTP Required",
             })
        } 
        else {
            JWT.verify(authorization,process.env.SCERET_KEY, async function(err,decoded){
                if (err) {
                    res.status(400).send({
                        message : "Token Invaliad",
                     })
                } else {
                    const data = await findUser({_id : decoded._id})
                    if (data) {
                        // res.send("Api Testing");
                        if (data.otp == otp) {
                            let id = data._id 
                            const resp = await findUserAndUpdate(id,{isVerify : "true" , otp : " "})
                            const token = JWT.sign({ _id : resp._id }, process.env.SCERET_KEY, {expiresIn : "2h"})  

                            res.send({
                                message : "User verify success",
                                data : resp,
                                token
                            })
                        }
                        else{
                            res.status(400).send({
                                message : "Invalid OTP",
                             })
                        }
                    } else {
                        res.status(400).send({
                            message : "User not found",
                         })
                    }
                    
                    
                }
            })            
        }
 
        
        
        


    } catch (error) {
        res.send(e)
    }
}

// update
exports.completeProfile = async (req,res)=>{
    try {

        const {body , headers} = req 
        const {authorization} = headers
        if (!authorization) {
            res.status(400).send({
                message : "Token Required",
             })
        }

     else{
        const {error} = await profileValidator.validate(req.body)
        if(error){
            res.status(400).send({
                error : error.details[0].message
             })
        }
        else{
            // res.send("test")
            JWT.verify(authorization,process.env.SCERET_KEY, async function(err,decoded){
                if(err){
                    res.status(400).send({
                        message : "Token Invaliad",
                     }) 
                }
                else{
                    const {_id} = decoded
                    
                    req.body.image = req.file.filename
                    req.body.authId = _id

                    const userProfile = await createUserProfile(req.body)

                    const updateAuth = await findUserAndUpdate({_id: _id} ,{
                        isComplete : 'true',
                        profileId : userProfile._id 
                    })

                    res.status(200).send({
                        // message : ""
                        data : userProfile,
                        message:"user profile completed"
                    })
                }
            })

        }
    }
    } catch (error) {
        res.send(error)
    }
}

// read
exports.login = async (req,res)=>{
    try {

        const { error } = await loginValidate.validate(req.body);
        if(error){
            res.send({
                error: error.details[0].message
            })
        }
        else{
        const {email , password} = req.body
        const checkUser = await findUser({email : email}).populate("profileId")
        if(checkUser){
            const checkPassword = await bcrypt.compare(password , checkUser.password )
            if(checkPassword){
                if (checkUser.isVerify && checkUser.isComplete) {
                    const token = JWT.sign({ _id : checkUser._id }, process.env.SCERET_KEY, {expiresIn : "2h"})  
                    res.send({
                        message:"user Login success",
                        data:checkUser,
                        userType : checkUser.userType,
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
        else{
            res.send({
                message: "User not found"
            })
        }
    }
    } catch (error) {
        res.send(error)
    }
}