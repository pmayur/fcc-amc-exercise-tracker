const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser  = require('body-parser')

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// include bodyparser to get data from body
app.use(bodyParser.urlencoded({
  extended: true
}));

// API's
app.use('/api/exercise/new-user', require('./router/new-user'))


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
