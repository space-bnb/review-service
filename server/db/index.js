const mongoose = require('mongoose');

exports.connect = (URI, cb) => new Promise((resolve, reject) => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, data) => {
      if (cb) {
        resolve(cb(err, data));
      } else {
        if(err) reject(err);
        resolve(data);
      }
    });
  } catch (error) {
    reject('cannot connect to db');
  }
});

exports.close = () => mongoose.connection.close();
