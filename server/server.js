const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../', '.env')});
const express = require('express');
const { reviewInfo, reviews, notFound, errors } = require('./controllers/');

const app = express();

app.use(require('cors')());
app.get('/api/reviews/info/:workspaceId', reviewInfo);
app.get('/api/reviews/all/:workspaceId', reviews);
app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));
app.get('*', notFound);
app.use(errors);

const PORT = process.env.PORT || 5002;

//export server for closing connections, app for accessing middleware and endpoints
exports.server = app.listen(PORT, () => console.log(`Review service running on ${PORT}`));
exports.app = app;
