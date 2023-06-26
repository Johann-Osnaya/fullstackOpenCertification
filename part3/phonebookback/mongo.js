const mongoose = require('mongoose')

const password = process.argv[2]

const url=
    `mongodb+srv://fullstack:${password}@cluster0.ktngqdx.mongodb.net/consolephoneApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const phoneSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Phone =  mongoose.model('Phone', phoneSchema)

    if(process.argv.length === 5){
        const phone = new Phone({
            name: process.argv[3],
            number: process.argv[4]
        })
    
        phone
        .save()
        .then(response => {
            console.log(`added ${phone.name} number ${phone.number} to phonebook`)
            mongoose.connection.close()
        })
    }


    if(process.argv.length === 3)
    {
        Phone
        .find({})
        .then(phones => {
            phones
            .forEach(element => {
                console.log(element)
            })
            mongoose.connection.close()
        })
    }
