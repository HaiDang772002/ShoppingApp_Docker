const mongoose = require('mongoose')
const mySchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
}, { timestamps: true })
const myModel = mongoose.model('login', mySchema, 'account')
module.exports = myModel