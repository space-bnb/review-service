// config env vars
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../', '.env')});

// connect db to production data
require('./db').connect(process.env.MONGO_URI_PROD);

// // run server on port 5002
require('./server');