const cors = require('cors')
const express = require('express')
const app = express()
const logger = require('morgan')
const Contact = require('./models/phone')
//const { notEqual } = require('assert')
app.use(cors())

app.use(express.json())
app.use(express.static('dist'))

logger.token('body', (req, res) => {
  console.log(res)
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  else {
    return ''
  }
})
app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  console.log('/')
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/phonebook', (request, response) => {
  console.log('/api/phonebook')
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/phonebook/:id', (request, response) => {
  const id = request.params.id
  Contact.findById(id).then(contact => {
    if (contact.length > 0) {
      return response.json(contact)
    }
    else {
      return response.status(404).end()
    }
  })
})

app.delete('/api/phonebook/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id).then(result => {
    console.log(result)
    console.log('Contact was sucessfully deleted')
  }).catch(error => {
    next(error)
  })
  response.status(204).end()
})

// const generateId = () => {
//   const maxId = phonebook.length > 0
//     ? Math.max(...phonebook.map(n => Number(n.id)))
//     : 0
//   return String(maxId + 1)
// }

app.post('/api/phonebook', (request, response, next) => {
  console.log('This is a post request')
  console.log(request.body)
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  }).catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body
  Contact.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: 'query' }).then(result => {
    response.json(result)
  }).catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})