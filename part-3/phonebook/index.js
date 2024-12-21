const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.static('dist'))

logger.token('body', (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
  else {
    return ""
  }
})
app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))
let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});
  
app.get('/api/phonebook', (request, response) => {
    response.json(phonebook);
});

app.get('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    const contact = phonebook.find(contact => contact.id === id)

    if (contact) {
        response.json(contact);
    }
    else {
        response.status(404).end();
    }
  });

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(contact => contact.id !== id);
  
    response.status(204).end()
})

const generateId = () => {
    const maxId = phonebook.length > 0
      ? Math.max(...phonebook.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
app.post('/api/phonebook', (request, response) => {
    console.log("This is a post request")
    console.log(request.body)
    const body = request.body
    const duplicate = Boolean(phonebook.find(n => n.name === body.name))
    
    if (duplicate) {
      return response.status(400).json({ 
        error: 'Name is already in phonebook' 
        });
    }
    if (!body.name || !body.number) {
        return response.status(400).json({ 
        error: 'The name or number is missing' 
        });
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(contact)

    response.json(contact)
});

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
