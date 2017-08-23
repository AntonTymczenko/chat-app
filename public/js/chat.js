// socket.io
var socket = io()

socket.on('connect', function () {
  console.log('connected to server')
})
socket.on('disconnect', function (){
  console.log('disconnected from server')
})

//  receiving messages and render them:
socket.on('newMessage', function({text, from, createdAt}){
  var html = Mustache.render($('#message-template').html(), {
    text,
    from,
    createdAt: moment(createdAt).format('H:mm:ss')
  })

  $('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function({url, from, createdAt}){
  var html = Mustache.render($('#location-message-template').html(), {
    url,
    from,
    createdAt: moment(createdAt).format('H:mm:ss')
  })

  $('#messages').append(html)
  scrollToBottom()
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

// autoscroll messages:
function scrollToBottom () {
  //selectors:
  var messages = $('#messages')
  var newMessage = messages.children('li:last-child')

  //heights:
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }

}