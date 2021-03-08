const fs = require('fs');
const path = require('path');
const faker = require('faker');

let query = '';

function generateSpace(id) {
    return { id, workspaceSlug: `workspace-${id}` };
}

for (let i = 1; i <= 2; i++) {
    const space = generateSpace(i);
    query += `insert into spaces (workspaceSlug) values ('${space.workspaceSlug}');`;

    const calculation = {
        id: i,
        reviewCount: 0,
        avg: 0,
        total: 0,
        spaceId: i,
    };

    for (let j = 1; j <= Math.floor(Math.random() * 12); j++) {
        let first = faker.name.firstName();
        let last = faker.name.lastName();
        const rating = Math.floor(Math.random() * 5) + 1; // number between 1 and 5

        while (first.indexOf("'") === 1) {
            first = faker.name.firstName();
        }

        while (last.indexOf("'") === 1) {
            last = faker.name.lastName();
        }

        calculation.reviewCount++;
        calculation.total += rating;
        calculation.avg = (calculation.total / calculation.reviewCount).toFixed(1);

        query += `insert into reviews (author, date, rating, content, calcId, spaceId) values('${first} ${last}', '${faker.date
            .between(new Date('1970-01-01'), new Date())
            .toISOString()}', ${rating}, '${faker.lorem.sentence()}', ${i}, ${i});`;
    }

    query += `insert into calculations (total, reviewCount, avg, spaceId) values (${calculation.total}, ${calculation.reviewCount}, ${calculation.avg}, ${calculation.id});`;
}

fs.writeFile(path.join(__dirname, '..', 'reviewData', `space.sql`), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});

query = '';
