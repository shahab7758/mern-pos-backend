const Joi = require('@hapi/joi')



const brandValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        city: Joi.string().min(6).required(),
        phone_num: Joi.string().min(11).required()
    })
    return schema.validate(data)
}

const brandUpdateValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6),
        city: Joi.string().min(6),
        phone_num: Joi.string().min(11)
    })
    return schema.validate(data)
}

//--- User Validation ---

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

//--- Login Validation ---

const loginValidation = (data) => {
    
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}



module.exports.brandValidation = brandValidation
module.exports.brandUpdateValidation = brandUpdateValidation
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation