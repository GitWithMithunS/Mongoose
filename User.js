const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({      //a simple schema
//     name:String,
//     age:Number,
//     email:String,
//     createdAt: Date,
//     updatedAt: Date,
//     hobbies : [String],
//     address:{
//         Street:String,
//         city:String
//     }
// })

const addressSchema = new mongoose.Schema({
    Street: String,
    city: String
})

// const bestfriendSchema = new mongoose.Schema({      //this is not working  error:- "undefined"
//     type:mongoose.SchemaType.ObjectId,
//     ref:'User'
// })

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number, 
        min: 1,              //minimum and maximum number that can be entered 
        max: 100,
        validate : {                // validate is used to write custom validation by the programmer.
            validator : v => v % 2 === 0 ,      //The function should return true if the validation passes and false otherwise. 
            message : props => `${props.value} is not an even number`    //this message is shown if the validator is not satistified(as it returns false)
        }               //only users created by save(), create() method go through validation process. any other updation methods do not go through validation as the directly work with the database.
    },
    email: {
        type: String,
        minLength:3,          // email should be of atleast 3charecters
        required: true,
        lowercase: true,        //irrespective of wt user enter the email will be stored in lowercase 
    },
    createdAt: {
        type: Date,
        immutable: true,       //can not be changed once set
        default: () => Date.now()    // default : Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    // bestFriend: bestfriendSchema,
    hobbies: [String],
    address: addressSchema
})

module.exports = mongoose.model('User', userSchema) //User here is the name of the collection inside database of mongodb with which ur interacting.


