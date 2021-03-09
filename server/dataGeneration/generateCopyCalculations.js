const fs = require('fs');
const path = require('path');

const query = 'COPY public.calculations (total, reviewcount, avg, spaceid) FROM stdin;';

fs.writeFile(path.join(__dirname, '..', 'dumps', 'copyCalculations.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
