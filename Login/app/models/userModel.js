const mongoose = require('mongoose')
const mySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    }
}, { timestamps: true }
)
const myModel = mongoose.model('Users', mySchema, 'users')
module.exports = myModel