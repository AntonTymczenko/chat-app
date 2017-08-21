var socket = io()

socket.on('connect', function () {
  console.log('connected to server')

  socket.emit('createMessage', {
    from: 'john@doe.com',
    text: 'hello from client'
  })
})
socket.on('disconnect', function (){
  console.log('disconnected from server')
})

// custom events:
socket.on('newMessage', function(msg){
  console.log('new message', msg)
})
