// this file is used to validate the user data

const joi = require('joi')

const userValidate = joi.object({
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
    }),

    usertype: joi.string().required().valid('user', 'admin').default("user").messages({
        'string.base': "usertype must be a string",
        'string.empty': "usertype cannot be empty",
        'any.required': "usertype is required",
        'any.valid': "usertype only User or admin"
    })
})

module.exports = userValidate