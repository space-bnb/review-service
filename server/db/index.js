const mongoose = require('mongoose');

exports.connect = async (URI) => {
    try {
        const res = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (!res) throw new Error();

        console.log('Connected to Mongo Atlas');
    } catch (error) {
        console.log('Could not connect to Mongo Atlas');
    }
};

exports.close = () => mongoose.connection.close();
