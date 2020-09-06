const express = require('express')
const app = express()
const moment = require('moment')
const morgan = require('morgan')

app.use(express.json())

app.use(express.static('build'))



app.use(morgan('tiny'))




    let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]

    
  

    app.get('/api/persons', (req,res) => {
        res.json(persons)
    })

    app.get('/info', (req,res) => {

        res.send(`Phonebook has info for ${persons.length} people <br>  <br>  ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}`)
        
    })

    app.get('/api/persons/:id', (req,res) => {

        const id = Number(req.params.id)
        
        let person = persons.find(n => n.id == id)

        if (!person) {
            res.status(400).end()
        } 

        res.json(person)

    }) 

    // delete entry
    app.delete('/api/persons/:id', (req,res) => {

        const id = Number(req.params.id)
        persons = persons.filter(n => n.id !== id)
        res.status(204).end()
    })

    //add entry 
    app.post('/api/persons', (req,res) => {

        const generateId = Math.floor(Math.random()*10000)

        const person = {
            name: req.body.name,
            number: req.body.number,
            id: generateId
        }

        if(!person.name || !person.number) {
            res.status(400).json({error: 'name/number missing'})
        }

        persons = persons.concat(person)

        res.json(person)
    })








    const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})