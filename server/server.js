// dependencies:
const path = require('path'),
  express = require('express'),
  http = require('http'),
  socketIO = require('socket.io')

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
  socket.on('disconnect', ()=> {
    console.log('user disconnected')
  })
})

server.listen(process.env.PORT, ()=>{
  console.log(`Chat app started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
