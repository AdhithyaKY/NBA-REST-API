const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    height:{
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('basketball', playerSchema)