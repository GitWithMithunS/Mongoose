const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    age:Number
})

module.exports = mongoose.model('User',userSchema) //User here is the name of the collection inside database of mongodb with which ur interacting.