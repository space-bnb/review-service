const fs = require('fs');
const path = require('path');

const query = `COMMIT;SELECT setval('Spaces_id_seq', (SELECT max(id) FROM Spaces));SELECT setval('Reviews_id_seq', (SELECT max(id) FROM Reviews));
SELECT setval('Calculations_id_seq', (SELECT max(id) FROM Calculations));`;

fs.writeFile(path.join(__dirname, '..', 'reviewData', 'foot.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
