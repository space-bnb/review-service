const fs = require('fs');
const path = require('path');

module.exports = function (j) {
    let command = 'cat head.sql copySpaces.sql ';

    for (let i = 0; i <= j; i++) {
        command += `spacesBody${i}.sql `;
    }

    command += 'copyReviews.sql ';

    for (let i = 0; i <= j; i++) {
        command += `reviewsBody${i}.sql `;
    }

    command += 'copyCalculations.sql ';

    for (let i = 0; i <= j; i++) {
        command += `calculationsBody${i}.sql `;
    }

    command += 'foot.sql > dump.sql';

    console.log(command);

    fs.writeFile(path.join(__dirname, '..', 'dumps', 'catScript.sh'), command, (err) => {
        if (err) throw err;
    });
};
