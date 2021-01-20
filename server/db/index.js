const mongoose = require('mongoose')

const db = mongoose.connect(process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => console.log("mongoose connected"))

module.exports = db;