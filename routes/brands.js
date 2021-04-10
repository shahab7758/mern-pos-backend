const { json } = require('express')
const express = require('express')
const router = express.Router()
const { brandValidation , brandUpdateValidation} = require('../validation')
const Brand = require('../model/Brands')

//--- Add new brand ---

router.post('/brands', async(req, res) => {

    //--- Validate Brand before storing it to database ---

    const { error } = brandValidation(req.body)
    if (error) {
        res.json(error.details[0].message)
    } else {
        //--- checking if the user already exists ---
        const phoneNoExists = await Brand.findOne({ phone_num: req.body.phone_num })
        if (phoneNoExists) return res.status(400).json('Phone Number already exists')
        //--- Creating a new brand ---
        const brand = new Brand({
            name: req.body.name,
            city: req.body.city,
            phone_num: req.body.phone_num
        })
        try {        
            //--- saving user to DB ---
    
            const savedBrand = await brand.save()
    
            res.status(400).json(savedBrand)
        } catch (error) {
            res.status(401).json(error)
        }
    }
})


//--- fetch all brands ---

router.get('/brands', async (req, res) => {
    try {
        const brands = await Brand.find()
        res.status(400).json(brands)
    } catch (error) {
        res.status(401).json(error)
    }
})

//--- Fetch a specific brand by usig id ---

router.get('/brand/:id', async (req, res) => {
    
    try {
        let brand = await Brand.findById(req.params.id)
        res.status(400).json(brand)
    } catch (error) {
        res.status(401).json(error)
    }
})

//--- Update a brand ---

router.patch('/brand/:id', async (req, res) => {
    console.log('patch', req.params)
    
        const brand = await Brand.findById(req.params.id)
         brand.name = req.body.name;
         brand.city = req.body.city;
        brand.phone_num = req.body.phone_num
        
    //     const { error } = brandUpdateValidation(brand);
    // if (error) {
    //         res.status(400).json(error.details[0])
    // } 
    // else {   
    try { 
            const updateBrand = await brand.save()
        res.status(400).json(updateBrand)
            
        } catch (error) {
        res.status(401).json(error)
    }
    // }
})

//--- Remove a brand ---

router.delete('/brand/:id', async (req, res) => {
    const brand = await Brand.findById(req.params.id)
    try {
        brand.remove()
        res.status(400).json(brand)
    } catch (error) {
        res.status(401).json(error)
    }
})


module.exports = router