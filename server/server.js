const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../', '.env')});
const express = require('express');
const { reviewInfo, reviews, notFound, errors } = require('./controllers/');

const app = express();

app.get('/api/reviews-api/info/:workspaceId', reviewInfo);
app.get('/api/reviews-api/all/:workspaceId', reviews);
app.get('*', notFound);
app.use(errors);

const PORT = process.env.PORT || 5002;

//export server for closing connections, app for accessing middleware and endpoints
exports.server = app.listen(PORT, () => console.log(`Review service running on ${PORT}`));
exports.app = app;
