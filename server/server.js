// dependencies:
const path = require('path'),
  express = require('express'),
  http = require('http'),
  socketIO = require('socket.io')

const {generateMessage} = require('./utils/message'),
  {generateLocationMessage} = require('./utils/message')


// configuration:
require('dotenv').config()

const app = express(),
  server = http.createServer(app),
  io = socketIO(server)

// middleware
app.use(express.static(path.join(__dirname, '../public')))


// server

io.on('connection', (socket)=> {
  console.log('new user connected')

  socket.emit('newMessage',
    generateMessage('Admin', 'Welcome to the chat!'))
  socket.broadcast.emit('newMessage',
    generateMessage('Admin', 'New user joined the room'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)
    callback('This is from the server')

    io.emit('newMessage',
      generateMessage(message.from, message.text))
  })

  socket.on('createLocationMessage', ({latitude, longitude})=> {
    io.emit('newLocationMessage',
      generateLocationMessage('User', latitude, longitude))
  })

  socket.on('disconnect', ()=> {
    console.log('user disconnected')
  })
})

server.listen(process.env.PORT, ()=>{
  console.log(`Chat app started on port \
${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
