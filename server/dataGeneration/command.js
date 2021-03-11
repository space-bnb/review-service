const fs = require('fs');
const path = require('path');

module.exports = function (j) {
    let command = 'cat server/dumps/head.sql server/dumps/copyReviews.sql ';

    for (let i = 0; i <= j; i++) {
        command += `server/dumps/reviewsBody${i}.sql `;
    }

    command += 'server/dumps/copyAuthors.sql ';

    for (let i = 0; i <= j; i++) {
        command += `server/dumps/authorsBody${i}.sql `;
    }

    command += 'server/dumps/foot.sql > server/dumps/dump.sql';

    console.log(command);

    fs.writeFile(path.join(__dirname, '..', 'dumps', 'catScript.sh'), command, (err) => {
        if (err) throw err;
    });
};
