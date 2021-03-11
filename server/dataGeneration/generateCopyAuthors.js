const fs = require('fs');
const path = require('path');

const query = 'COPY public.authors (id, first_name, last_name, email, password) FROM stdin;';

fs.writeFile(path.join(__dirname, '..', 'dumps', 'copyAuthors.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
