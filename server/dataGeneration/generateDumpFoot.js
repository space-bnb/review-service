const fs = require('fs');
const path = require('path');

const query = `
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
`;

fs.writeFile(path.join(__dirname, '..', 'dumps', 'foot.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
