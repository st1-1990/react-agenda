const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://juanl19617:${password}@cluster0.yt4de.mongodb.net/agendaApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const agendaSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Agenda = mongoose.model('Agenda', agendaSchema)

const agenda = new Agenda({
  name: 'Bola del mal',
  number: '040-123456',
})

/*   Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  }) */

agenda.save().then(result => {
  console.log('persons saved!')
  mongoose.connection.close()
})