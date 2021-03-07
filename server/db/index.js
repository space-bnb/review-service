const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

module.exports = mongoose.connect(process.env.MONGO_URI_DEV, options);
