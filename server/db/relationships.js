const Author = require('./models/Author');
const Review = require('./models/Review');

Author.hasMany(Review, { foreignKey: 'author_id' });
Review.belongsTo(Author, { foreignKey: 'author_id' });
