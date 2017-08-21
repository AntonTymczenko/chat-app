// dependencies:
const path = require('path'),
  express = require('express')

// configuration:
require('dotenv').config()

const app = express()
app.use(express.static(path.join(__dirname, '../public')))



app.listen(process.env.PORT, ()=>{
  console.log(`Chat app started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
