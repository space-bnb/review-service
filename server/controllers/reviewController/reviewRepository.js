const ReviewDataRepository = require('../reviewDataConroller/reviewDataRepository');
const { ReviewData } = require('../../db/models/Review');

class ReviewRepository {
    constructor(workspaceId) {
        this.workspaceId = workspaceId != null ? workspaceId : null;
        this.reviewDataRepository = new ReviewDataRepository(this.workspaceId);
    }

    async get() {
        if (this.workspaceId != null) {
            const reviewData = await ReviewData.findOne({ workspaceId: this.workspaceId });
            return reviewData.reviews;
        }
    }

    async create(review) {
        if (this.workspaceId != null) {
            const reviewData = await ReviewData.findOne({ workspaceId: this.workspaceId });
            reviewData.reviews.push(review);

            const updatedReviewData = await reviewData.save();
            return updatedReviewData.reviews[updatedReviewData.reviews.length - 1];
        }
    }

    async update(updatedReview) {
        const reviewData = await this.reviewDataRepository.getById();
        const reviewIndex = reviewData.reviews.findIndex((review) => String(review._id) === String(updatedReview._id));

        reviewData.reviews[reviewIndex] = updatedReview;
        const updatedReviewData = await reviewData.save();
        return updatedReviewData.reviews[reviewIndex];
    }

    async delete(reviewId) {
        const reviewData = await this.reviewDataRepository.getById();
        const updatedReviews = reviewData.reviews.filter((review) => String(reviewId) !== String(review._id));

        reviewData.reviews = updatedReviews;
        return reviewData.save();
    }
}

module.exports = ReviewRepository;
