const fs = require('fs');
const path = require('path');

const query = 'COPY public.reviews (author, date, rating, content, spaceid) FROM stdin;';

fs.writeFile(path.join(__dirname, '..', 'dumps', 'copyReviews.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
