const mongoose = require('mongoose')

const url = 'mongodb://<user>:<password>@ds125388.mlab.com:25388/fs3'

mongoose.connect(url)
//mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person