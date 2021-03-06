const mongoose = require('mongoose');

exports.connect = async (URI) => {
    try {
        console.log('URI ON LINE 5', URI);
        const res = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        if (!res) throw new Error();

        console.log('Connected to Mongo Docker Container');
    } catch (error) {
        console.log('Could not connect to Mongo Container');
    }
};

exports.close = () => mongoose.connection.close();
