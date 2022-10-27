const Joi = require('joi');

let signupSchema = Joi.object({
    name: Joi.string().required().min(3).max(15),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required().min(10).max(90),

})

let signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports.userVaildation = (req, res, next) =>{
    let errorMesages = []
    let {error} = signupSchema.validate(req.body, {abortEarly: false});
    if(!error){
        next()
    }else{

        error.details.map((msg) =>{
            errorMesages.push(msg.message)
        })
        res.json(errorMesages)
    }
}

module.exports.signinVaildation = (req, res, next) =>{
    let errorMesages = []
    let {error} = signinSchema.validate(req.body, {abortEarly: false});
    if(!error){
        next()
    }else{

        error.details.map((msg) =>{
            errorMesages.push(msg.message)
        })
        res.json(errorMesages)
    }
}