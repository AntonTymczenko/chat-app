// UNIX epoque  Jan 1st 1970 00:00:00 am

//milliseconds from that epoque

// npm i -S moment


const moment = require('moment')
const moment2 = moment().valueOf()
console.log('2:', moment2)
// moment.locale('uk')

let date = moment().subtract(30, 'm').add(16, 'h')
console.log(date.format('MMM Do, YYYY'))
console.log(date.format('h:mm a'))
