const path = require('path');
const express = require('express');
const reviewInfoRoutes = require('./controllers/reviewDataConroller/reviewDataController');
const reviewRoutes = require('./controllers/reviewController/reviewController');

const app = express();

app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/reviews/info', reviewInfoRoutes);
app.use('/api/reviews/all', reviewRoutes);
app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));
app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'client', 'dist')));

module.exports = app;
