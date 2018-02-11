const mongoose = require('mongoose')

const url = 'mongodb://timo:tietokanta@ds125388.mlab.com:25388/fs3'

mongoose.connect(url)
//mongoose.Promise = global.Promise

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person