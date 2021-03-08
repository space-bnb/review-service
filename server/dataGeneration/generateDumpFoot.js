const fs = require('fs');
const path = require('path');

const query = `
SELECT pg_catalog.setval('public.calculations_id_seq', 2, true);

SELECT pg_catalog.setval('public.reviews_id_seq', 5, true);

SELECT pg_catalog.setval('public.spaces_id_seq', 2, true);

ALTER TABLE ONLY public.calculations
    ADD CONSTRAINT calculations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.spaces
    ADD CONSTRAINT spaces_pkey PRIMARY KEY (id);
`;

fs.writeFile(path.join(__dirname, '..', 'dumps', 'foot.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
