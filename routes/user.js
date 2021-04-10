const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//--- Register a user ---


router.post('/register', async (req, res) => {
    const  {error}  = registerValidation(req.body)
    console.log('reqqqqqqqqqq', req.body)
    if (error) {
        res.status(400).json(error.details[0].message)
    }
    else {
        //--- check if user already exists ---
        const userExists = await User.findOne({ email: req.body.email })

        
        if (userExists) {
            res.status(400).json('User Already Exists')
        } else {  

            //--- Hash Password ---

            const salt = await bycrypt.genSalt(10)
            const hashPassword = await bycrypt.hash(req.body.password, salt)

            //--- create new user ---

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })
            try {
                const savedUser = await user.save()
                res.status(400).json({user_id: savedUser._id})
            } catch (error) {
                res.status(401).json(error)
            }
        }
    }
})

//--- Login user ---

router.post('/login', async (req, res) => {
    console.log('reeeeeee', req.body)
    //--- Validate email and password for login ---
    const { error } = loginValidation(req.body)
    if (error) {
        res.status(400).json(error.details[0].message)
    } else {
        //--- check user exist or not by using requested email ---
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json('Email does not found!')
        
        //--- Compare password ---

        const validPassword = await bycrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).json('Invalid Password!')
        
        //--- create and assign token ---

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).json(token)

    }
})


module.exports = router