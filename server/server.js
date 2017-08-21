// dependencies:
const path = require('path'),
  express = require('express'),
  http = require('http'),
  socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')

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

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)

    io.emit('newMessage', 
      generateMessage(message.from, message.text))
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', ()=> {
    console.log('user disconnected')
  })
})

server.listen(process.env.PORT, ()=>{
  console.log(`Chat app started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
