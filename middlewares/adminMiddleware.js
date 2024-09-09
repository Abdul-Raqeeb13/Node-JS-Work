const JWT = require("jsonwebtoken");
const { message } = require("../validator/authValidator");
require("dotenv").config()

exports.adminMiddleare = ((req,res,next)=>{
    try {
        
        const {authorization} = req.headers
        console.log(authorization);
        if(!authorization){
            res.send({message : "Toekn not provided"})
        }
        else{
            JWT.verify(authorization , process.env.SCERET_KEY, function (error , decode){
                if(error){
                    res.send({message : "Invalid Token"})
                }
                else{
                    const {userType} = decode
                    // res.send({data : userType} )

                    if(userType == "admin"){

                        next()
                    }
                    else{
                        res.send({message : "Please login as admin"})
                    }

                }

            })
        }
    } catch (error) {
        res.send(error)
    }
})