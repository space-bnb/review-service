const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../', '.env')});
const express = require('express');
const { reviewInfo, reviews, notFound, errors } = require('./controllers/');

const app = express();

app.get('/reviews-api/info/:workspaceId', reviewInfo);
app.get('/reviews-api/all/:workspaceId', reviews);
app.get('*', notFound);
app.use(errors);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Review service running on ${PORT}`));