const app = require('./server');
require('./db').connect(process.env.MONGO_URI_DEV);

const PORT = process.env.PORT || 5002;

module.exports = app.listen(PORT, () =>
    console.log(`Review service running on ${PORT}`),
);
