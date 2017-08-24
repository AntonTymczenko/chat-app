// dependencies:
const path = require('path'),
  express = require('express'),
  http = require('http'),
  socketIO = require('socket.io')

const {generateMessage} = require('./utils/message'),
  {generateLocationMessage} = require('./utils/message'),
  {isRealString} = require('./utils/validation'),
  {Users} = require('./utils/users')


// configuration:
require('dotenv').config()

const app = express(),
  server = http.createServer(app),
  io = socketIO(server),
  users = new Users()

// middleware
app.use(express.static(path.join(__dirname, '../public')))


// server

io.on('connection', (socket)=> {
  console.log('new user connected')

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.')
    }

    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUserList',
      users.getUserList(params.room))




    socket.emit('newMessage',
      generateMessage('Admin', `Welcome to the ${params.room}!`))
    socket.broadcast.to(params.room).emit('newMessage',
      generateMessage('Admin', `${params.name} joined the ${params.room}`))
    callback()
  })


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
    let user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('updateUserList',
        users.getUserList(user.room))
      io.to(user.room).emit('newMessage',
        generateMessage('Admin', `${user.name} has left the group`))
    }
  })
})

server.listen(process.env.PORT, ()=>{
  console.log(`Chat app started on port \
${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
