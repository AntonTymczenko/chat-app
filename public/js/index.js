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
  var formattedTime = moment(msg.createdAt).format('H:mm:ss')
  var li = $('<li></li>')
  li.text(formattedTime + ' ' + msg.from + ': ' + msg.text)

  $('#messages').append(li)
})

socket.on('newLocationMessage', function (msg) {
  var formattedTime = moment(msg.createdAt).format('H:mm:ss')
  var li = $('<li></li>')
  var a = $('<a target="_blank">My current location</a>')
  li.text(formattedTime + ' ' + msg.from + ': ')
  a.attr('href', msg.url)
  li.append(a)
  $('#messages').append(li)
})

//form submit
$('#message-form').on('submit', function (e) {
  e.preventDefault()

  var messageTextbox = $('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(res){
    // console.log('got it!', res)
    messageTextbox.val('')
  })
})

var locationButton = $('#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported')
  }

  locationButton.attr('disabled', 'disabled').text('Sending...')

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location')
  })
})
