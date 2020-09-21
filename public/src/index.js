const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))

require('./app/controllers/index')(app)


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}
app.listen(port);