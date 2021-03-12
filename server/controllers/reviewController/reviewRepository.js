const ReviewDataRepository = require('../reviewDataConroller/reviewDataRepository');
const Review = require('../../db/models/Review');
const User = require('../../db/models/User');
const uuid = require('uuid').v4;

class ReviewRepository {
    constructor(space) {
        this.space = space;
        this.reviewDataRepository = new ReviewDataRepository(this.space);
    }

    get() {
        if (this.space != null)
            return Review.findAll({
                where: { space: this.space },
                attributes: ['rating', 'content', 'date'],
                include: {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
                order: [['date', 'desc']],
            });
    }

    create(review) {
        return Review.create({ id: uuid(), ...review, space: this.space });
    }

    update(updatedReview) {
        return Review.update(updatedReview, { where: { id: updatedReview.id, user_id: updatedReview.user_id } });
    }

    delete(reviewId) {
        return Review.destroy({ where: { id: reviewId.id, user_id: reviewId.user_id } });
    }
}

module.exports = ReviewRepository;
