const mongoose = require('mongoose')
const User = require('./User')

mongoose.connect('mongodb://localhost:27017/mongoose?directConnection=true')
//     .then(
//         console.log('connected to mongodb')
//     )
//     .catch((err) => {
//         console.log('some error occured while connecting to mongodb', err)
//     })        //this lines may not be required while using mongoose as it internally takes care of all this.

// creating a document inside the collection

// their are 2 methods
// async function run() {                     //1.save() method ....by creating a new instance of a 'User' model using mongoose.(in mongoose a model is constructor function) and then saving the user to the database
//     const user = new User({ name: 'mithun', age: 21 })
//     await user.save()
//         .then(() => { console.log('user data is saved', user) })
// }

// async function run() {                      //2. create() method to create a new user
//     const user = await User.create({          //note:- User.findOne,findMany,updateOne,Many all this methods skip validation process(they do not go through validation).so do not use it.instead u can do  this way User.findById().save() get ur user and call save() on it.
//         name: 'mithun',
//         age: 22,
//         hobbies: ['swimming', "dancing"],
//         address: { Street: 'attibele', city: 'bangalore' }
//     })
//     // user.name='ashish'       //the variables can be changed in the later part also before it is saved in the db
//     await user.save()           //saving the user in the db
//         .then(() => { console.log('user data is saved', user) })
// }
run()

async function run() {                      //2. create() method to create a new user
    try {
        const user = await User.create({     //create() method automatically saves the user dtat in the mongodb
            name: 'mithun',
            email: 'mia@gmail.com',
            age: 22,
            hobbies: ['swimming', "dancing"],
            address: { Street: 'attibele', city: 'bangalore' }
        })
        // user.name='ashish'       //the variables can be changed in the later part also before it is saved in the db
        // await user.save()           //saving the user in the db
        // user.createdAt = 5           //as createdAt is immutable it can not be changed even after accesing it. 
        // await user.save()          
        console.log(user)
    } catch (e) {
        console.log('come eror occured', e.message)
        // console.log(e.errors)     //to get more details of the error
    }
}

run2()

async function run2() {
    try {
        // const user = await User.find({name:'mithun'})
        // const user = await User.findOne({name:'mithun'})
        // const user = await User.exists({name:'mithun'})
        // const user = await User.deleteOne({name:'mithun'})
        // const user = await User.findById('65a6b9ee3260dd3a76d01d63')
        // console.log('this is the user found by id',user)
        const user = await User.where('name')
            .equals('mithun')
            .where('age')
            .gte(20)
            .lt(23)                 //some other comparison methods=> .gte()->greaterthan .lte()->lesserthan .ne()->not equal to  .equals()->equal too
            .limit(7)               // limits the number of result documents to numer mentioned inside it.
            .sort('-age')          //: Specifies the sorting order for the query results.(here negative-> decending order)
        // .select('age')       //returns only the "age" field of the user  (Specifies which fields to include or exclude in the query results.)
        //.populate("address")  // as address is inside an object called user and also itself is an object .so populate() basically tells the mongodb to fetch all the data of the inner object 'address' and display it
        console.log(user)
        //using logical methods
        // const user = User.where('age').gte(18).or([{ username: 'john_doe' }, { username: 'mithun' }])         // .or()-> array of conditions where at least one should be true .and()->array of conditions where all should be true .nor()->Specifies an array of conditions where none should be true
        //     .in(['john_doe', 'jane_doe']).      //in(array): Specifies that the field should match any of the values in the provided array.  nin(array): Specifies that the field should not match any of the values in the provided array.
    } catch (error) {
        console.error(erroe.message)
    }
}
