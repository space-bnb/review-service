const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../', '.env')});
require('./db');
const express = require('express');
const { reviewInfo, reviews, notFound, errors } = require('./controllers/');

const app = express();

app.get('/reviews-api/info/:workspaceId', reviewInfo);
app.get('/reviews-api/all/:workspaceId', reviews);
app.get('*', notFound);
app.use(errors);

app.listen(process.env.PORT, () => console.log(`Service running on port ${process.env.PORT}`));