// socket.io
var socket = io()

socket.on('connect', function () {
  console.log('connected to server')
})
socket.on('disconnect', function (){
  console.log('disconnected from server')
})

// custom events:
socket.on('newMessage', function(msg){
  var li = $('<li></li>')
  li.text(msg.from + ': ' + msg.text)
  
  $('#messages').append(li)
})

//form submit
$('#message-form').on('submit', function (e) {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(res){
    console.log('got it!', res)
  })
})
