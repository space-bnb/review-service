const ReviewDataRepository = require('../reviewDataConroller/reviewDataRepository');
const sequelize = require('../../db/index');
const Review = require('../../db/models/Review');
const Author = require('../../db/models/Author');

class ReviewRepository {
    constructor(space) {
        this.space = space != null ? space : null;
        this.reviewDataRepository = new ReviewDataRepository(this.space);
    }

    async get() {
        // if (this.workspaceId != null) {
        //     const reviewData = await ReviewData.findOne({ workspaceId: this.workspaceId });
        //     return reviewData.reviews;
        // }

        if (this.space != null)
            return Review.findAll({
                where: { space: this.space },
                attributes: ['rating', 'content', 'date'],
                include: {
                    model: Author,
                    attributes: ['first_name', 'last_name'],
                },
            });
        // return sequelize.query(
        //     'select reviews.rating, reviews.content, reviews.date, concat(authors.first_name, \' \', authors.last_name)  as "author" from reviews join authors on reviews.author_id=authors.id where reviews.space = 1 order by reviews.date desc;',
        // );
    }

    // async create(review) {
    //     if (this.workspaceId != null) {
    //         const reviewData = await ReviewData.findOne({ workspaceId: this.workspaceId });
    //         reviewData.reviews.push(review);

    //         const updatedReviewData = await reviewData.save();
    //         return updatedReviewData.reviews[updatedReviewData.reviews.length - 1];
    //     }
    // }

    // async update(updatedReview) {
    //     const reviewData = await this.reviewDataRepository.getById();
    //     const reviewIndex = reviewData.reviews.findIndex((review) => String(review._id) === String(updatedReview._id));

    //     reviewData.reviews[reviewIndex] = updatedReview;
    //     const updatedReviewData = await reviewData.save();
    //     return updatedReviewData.reviews[reviewIndex];
    // }

    // async delete(reviewId) {
    //     const reviewData = await this.reviewDataRepository.getById();
    //     const updatedReviews = reviewData.reviews.filter((review) => String(reviewId) !== String(review._id));

    //     reviewData.reviews = updatedReviews;
    //     return reviewData.save();
    // }
}

module.exports = ReviewRepository;
