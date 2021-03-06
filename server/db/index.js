const mongoose = require('mongoose');

exports.connect = (URI, cb) => new Promise((resolve, reject) => {
  console.log('URI', URI);
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, data) => {
      if (cb) {
        resolve(cb(err, data));
      } else {
        console.log('ERROR ON LINE 12');
        if(err) reject(err);
        resolve(data);
      }
    });
  } catch (error) {
    reject('cannot connect to db');
  }
});

exports.close = () => mongoose.connection.close();
