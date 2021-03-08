const fs = require('fs');
const path = require('path');

const query = `
CREATE TABLE spaces (
    id SERIAL PRIMARY KEY,
    workspaceSlug VARCHAR(255)
);


CREATE TABLE calculations (
    id SERIAL PRIMARY KEY,
    total INT,
    reviewCount INT,
    avg DECIMAL(10, 1),
    spaceId INT
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    author VARCHAR(50),
    date DATE,
    rating INT,
    content VARCHAR(255),
    calcId INT,
    spaceId INT
);

BEGIN;`;

fs.writeFile(path.join(__dirname, '..', 'reviewData', 'head.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
