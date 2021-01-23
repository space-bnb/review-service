const mongoose = require('mongoose');

exports.connect = (URI) => mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log(`mongoose connected to ${URI}`));

exports.close = () => mongoose.connection.close();
