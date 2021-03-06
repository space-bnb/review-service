const { ReviewData } = require('../../db/models/Review');

class ReviewRepository {
    constructor(workspaceId) {
        this.workspaceId = workspaceId != null ? workspaceId : null;
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
}

module.exports = ReviewRepository;
