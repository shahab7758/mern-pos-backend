const mongoose = require('mongoose')


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 12
    },
    city: {
        type: String,
        required: true,
        min: 6,
        max: 12
    },
    phone_num: {
        type: String,
        required: true,
        min: 6,
        max: 12
    }
})



module.exports = mongoose.model('Brand', brandSchema)