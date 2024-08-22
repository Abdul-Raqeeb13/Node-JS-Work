const joi = require('joi')

const profileValidator  = joi.object({

    username : joi.string().trim().required().messages({
        'string.base': "usernmae must be a string",
        'string.empty': "usernmae cannot be empty",
        'any.required': "usernmae is required"
    }),
    age : joi.string().trim().required().messages({
        'string.base': "age must be a string",
        'string.empty': "age cannot be empty",
        'any.required': "age is required"
    }),
    gender : joi.string().required().valid('male', 'female').messages({
        'string.base': "gender must be a string",
        'string.empty': "gender cannot be empty",
        'any.required': "gender is required",
        'any.valid': "gender only male or female"
    })
})

module.exports = profileValidator