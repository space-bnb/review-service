const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
