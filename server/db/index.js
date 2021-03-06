const mongoose = require('mongoose');

// exports.connect = (URI, cb) => new Promise((resolve, reject) => {
//   try {
//     mongoose.connect(URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     }, (err, data) => {
//       console.log('error', cb);
//       if (cb) {
//         resolve(cb(err, data));
//       } else {
//         console.log('ERROR ON LINE 12');
//         if(err) reject(err);
//         resolve(data);
//       }
//     });
//   } catch (error) {
//     reject('cannot connect to db');
//   }
// });

exports.connect = async (URI) => {
  try {
    const res = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true});
    
    if (!res) throw new Error();

    console.log('Connected to Mongo Atlas');
  } catch (error) {
    console.log('Could not connect to Mongo Atlas')
  }
}

exports.close = () => mongoose.connection.close();
