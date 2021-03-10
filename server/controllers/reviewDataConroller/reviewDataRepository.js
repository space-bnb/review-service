const Review = require('../../db/models/Review');
const { fn, col } = require('sequelize');

class ReviewDataRepository {
    constructor(space) {
        this.space = space != null ? space : null;
    }

    getBySpace() {
        if (this.space != null)
            return Review.findAll({
                where: { space: this.space },
                attributes: [
                    [fn('count', col('id')), 'reviewCount'],
                    [fn('avg', col('rating')), 'avg'],
                ],
            });
    }
}

module.exports = ReviewDataRepository;
