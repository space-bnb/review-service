const ReviewDataRepository = require('../reviewDataConroller/reviewDataRepository');
const Review = require('../../db/models/Review');
const Author = require('../../db/models/Author');
const uuid = require('uuid').v4;

class ReviewRepository {
    constructor(space) {
        this.space = space != null ? space : null;
        this.reviewDataRepository = new ReviewDataRepository(this.space);
    }

    get() {
        if (this.space != null)
            return Review.findAll({
                where: { space: this.space },
                attributes: ['rating', 'content', 'date'],
                include: {
                    model: Author,
                    attributes: ['first_name', 'last_name'],
                },
            });
    }

    create(review) {
        if (this.space != null) return Review.create({ id: uuid(), ...review, space: this.space });
    }

    update(updatedReview) {
        return Review.update(updatedReview, { where: { id: updatedReview.id } });
    }

    delete(reviewId) {
        return Review.destroy({ where: { id: reviewId } });
    }
}

module.exports = ReviewRepository;
