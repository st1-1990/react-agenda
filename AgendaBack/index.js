require('dotenv').config()
const Agenda = require('./models/persons')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
/* const password = 'fY447jqIaWnsPcbi' */



/* const url =
  `mongodb+srv://juanl19617:${password}@cluster0.yt4de.mongodb.net/agendaApp?retryWrites=true&w=majority` */

/* mongoose.set('strictQuery',false) */
/* mongoose.connect(url) */


/* const agendaSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Agenda = mongoose.model('Agenda', agendaSchema) */

app.use(express.static('dist'))
app.use(cors())

app.use(express.json()) /* Con este le decimos que soporte las request y luego las parsee para tenerlo disponible en el request.body */

/* let personas = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
] */

app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo!</h1>')
})

app.get('/api/personas', (request, response) => {
  Agenda.find({}).then(personas => {
    response.json(personas)
  })
  })

  app.get('/api/info', (request, response) => {
    const constadorP = personas.length
    const date = new Date().toISOString()
    response.send(`
        <p>Agenda telefonica tiene info de ${constadorP}<br/>${date}</p>
        `)
  })

  app.get('/api/persons/:id', (request, response) => { 
/*     const id = Number(request.params.id  )          
    const personita = personas.find(p => p.id === id)
    
    if(personita){

        response.json(personita)
    }else {
        response.status(404).end()
    } 
         */

    Agenda.findById(request.params.id).then(agenda => {
      response.json(agenda)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
  
    const initialLength = personas.length;
    personas = personas.filter(p => p.id !== id); // Actualiza el arreglo global
  
    if (personas.length < initialLength) {
      response.status(200).json({ message: 'Se borró correctamente' });
    } else {
      response.status(404).json({ error: 'Persona no encontrada' });
    }
  });


    app.post('/api/persons', (request, response) =>{
      const person = request.body  /* person contiene los datos que se envian en el Json desde el REST client */
  
      if(!person || !person.name){  
          return response.status(400).json({
              error: 'person.content esta vacio o no existe'
          })
      }
  
/*       const ids = personas.map(p => p.id)
      const maxId = Math.max (...ids)
  
      const newPerson = {
          id: maxId +1,
          name: person.name,
          number: person.number
      }
      personas = personas.concat(newPerson)

      response.json(person) */

      const persona = new Agenda({
        name: person.name,
        number: person.number 
      })
    
      persona.save().then(savedPersona => {
        response.json(savedPersona)
    })
  })
  

  /* const PORT = 3001 */
  const PORT = process.env.PORT
  app.listen(PORT, () => {     /** Aca se pasa un callback ya que el servidor ne inicia de forma asincrona, osea que le decimos que cuando termine de ejecutar el servidor ejecute el conslo.log*/
    console.log(`Server running on port ${PORT}`)
  })
    
