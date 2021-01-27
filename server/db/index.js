const mongoose = require('mongoose');

exports.connect = (URI, cb) => new Promise((resolve, reject) => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, cb);
    resolve();
  } catch (error) {
    reject('cannot connect to db');
  }
});


exports.close = () => mongoose.connection.close();
