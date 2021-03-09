const fs = require('fs');
const path = require('path');

const query = 'COPY public.spaces (workspaceslug) FROM stdin;';

fs.writeFile(path.join(__dirname, '..', 'dumps', 'copySpaces.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
