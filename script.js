const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect('mongodb://localhost:27017/mongoose?directConnection=true')
// .then( 
//     console.log('connected to mongodb')
// )
// .catch((err) => {
//     console.log('some error occured while connecting to mongodb',err)
// })        //this lines may not be required while using mongoose as it internally takes care of all this.

//creating a document inside the collection

//their are 2 methods 
// async function run() {                     //1.
//     const user =new User({name:'mithun' , age:21})
//     await user.save()
//     .then(()=>{console.log('user data is saved',user)})
// }

async function run() {                      //2. create() method
    const user =await User.create({name:'mithun' , age:22})
    await user.save()
    .then(()=>{console.log('user data is saved',user)})
}
run()   