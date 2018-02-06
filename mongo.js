const mongoose = require('mongoose')

const url = 'mongodb://heebo:heebolainen@ds125388.mlab.com:25388/fs3'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const args = process.argv

if (args.length === 4) {
    const person = new Person({
        name: args[2],
        number: args[3]
    })
    console.log('lisätään henkilö ' + person.name + ' numero ' + person.number + ' luetteloon')
    person.save()
        .then(response => {
            mongoose.connection.close()
        })
} else {
    Person
        .find({})
        .then(result => {
            console.log('puhelinluettelo:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}