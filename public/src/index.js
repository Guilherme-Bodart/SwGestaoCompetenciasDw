const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))

require('./app/controllers/index')(app)


let porta = process.env.PORT;
if (porta == null || porta == "") {
  porta = 3001;
}
app.listen(porta);