const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('payload', (req, res) => { return JSON.stringify(req.body)})

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :payload :status :res[content-length] - :response-time ms'))
app.use(cors())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
    {
        "name": "kettu",
        "number": "123",
        "id": 5
    }
]

app.get('/info', (req, res) => {
    res.send('<div><p>puhelinluettelossa on ' + persons.length + ' henkilön tiedot</p><p>' + new Date() + '</p></div>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    
    const body = request.body
    
    if (request.body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    if (request.body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({ error: 'name already listed' })
    }

    const person = {
        name: body.name,
        number: body.number || '',
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const body = request.body
    const oldPerson = persons.find(p => p.id === id)
    const person = {
        name: body.name,
        number: body.number,
        id: id
    }
    
    persons = persons.filter(p => p.id !== id) 
    persons = persons.concat(person)
    
    response.json(person)
})

generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000000));
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})