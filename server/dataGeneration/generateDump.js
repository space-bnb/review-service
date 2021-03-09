const fs = require('fs');
const path = require('path');
const faker = require('faker');
const command = require('./command');

const iterations = 0;

for (let k = 0; k <= iterations; k++) {
    let reviewsQuery = '';

    for (let i = 1 + k * 500000; i <= 500000 + k * 500000; i++) {
        const numberOfReviews = Math.floor(Math.random() * 12);

        for (let j = 1; j <= numberOfReviews; j++) {
            let first = faker.name.firstName();
            let last = faker.name.lastName();
            const rating = Math.floor(Math.random() * 5) + 1; // number between 1 and 5

            while (first.indexOf("'") === 1) {
                first = faker.name.firstName();
            }

            while (last.indexOf("'") === 1) {
                last = faker.name.lastName();
            }

            if (j === numberOfReviews && i === 500000 + iterations * 500000) {
                reviewsQuery += `
${first} ${last}	${faker.date
                    .between(new Date('1970-01-01'), new Date())
                    .toISOString()}	${rating}	${faker.lorem.sentence()}	${i}
\\.
`;
            } else {
                reviewsQuery += `
${first} ${last}	${faker.date
                    .between(new Date('1970-01-01'), new Date())
                    .toISOString()}	${rating}	${faker.lorem.sentence()}	${i}`;
            }
        }
    }

    fs.writeFile(path.join(__dirname, '..', 'dumps', `reviewsBody${k}.sql`), reviewsQuery, (err) => {
        if (err) throw err;
    });
}

command(iterations);
