const mongoose = require('mongoose');
const URIPRODUCAO = "mongodb+srv://outrigger:laboral@cluster0.rda29.gcp.mongodb.net/producao?retryWrites=true&w=majority"
const URITESTE = "mongodb+srv://outrigger:laboral@cluster0.rda29.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
mongoose.connect(URIPRODUCAO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;