const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env') });
const express = require('express');
const { reviews, notFound, errors } = require('./controllers/');
const reviewInfoRoutes = require('./controllers/reviewDataConroller/reviewDataController');

const app = express();

app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/reviews/info', reviewInfoRoutes);
app.get('/api/reviews/all/:workspaceId', reviews);
app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));
app.use(
    '/buildings/:workspaceId',
    express.static(path.join(__dirname, '../', 'client', 'dist')),
);
app.get('*', notFound);
app.use(errors);

module.exports = app;

//export server for closing connections, app for accessing middleware and endpoints
// exports.server = app.listen(PORT, () =>
//     console.log(`Review service running on ${PORT}`),
// );
// exports.app = app;
