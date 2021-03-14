require('./db');
require('./db/relationships');

const app = require('./server');
const PORT = process.env.PORT || 5002;

module.exports = app.listen(PORT, () => console.log(`Review service running on ${PORT}`));
