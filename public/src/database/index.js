const mongoose = require('mongoose');
const URI = "mongodb+srv://outrigger:laboral@cluster0.rda29.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;