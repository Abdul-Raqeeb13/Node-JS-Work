// this file is used to validate the user login data

const joi = require('joi')

const loginValidate = joi.object({
    
    email: joi.string().trim().required().email().messages({
        'string.base': "Email must be a string",
        'string.empty': "Email cannot be empty",
        'string.email': "Email must be a valid",
        'any.required': "Email is required"
    }),

    password: joi.string().trim().min(3).required().messages({
        'string.base': "password must be a string",
        'string.empty': "password cannot be empty",
        'string.min': "password must be at least 3 characters",
        'any.required': "password is required"
    })
})

module.exports = loginValidate