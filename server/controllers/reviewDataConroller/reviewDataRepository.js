const { ReviewData } = require('../../db/models/Review');

class ReviewDataRepository {
    constructor(workspaceId) {
        this.workspaceId = workspaceId != null ? workspaceId : null;
    }

    getById() {
        if (this.workspaceId != null)
            return ReviewData.findOne({ workspaceId: this.workspaceId }).select({ _id: 0, avg: 1, reviewCount: 1 });
    }

    delete() {
        if (this.workspaceId != null) return ReviewData.findOneAndRemove({ workspaceId: this.workspaceId });
    }

    async create() {
        const latestRecord = await ReviewData.find().limit(1).sort({ $natural: -1 });
        if (latestRecord.length === 0) return ReviewData.create({ workspaceId: 1, workspaceSlug: `workspace-1` });

        const workspaceId = latestRecord[0].workspaceId + 1;
        return ReviewData.create({ workspaceId, workspaceSlug: `workspace-${workspaceId}` });
    }

    async update(reviewId) {
        const reviewData = await ReviewData.findOne({ workspaceId: this.workspaceId });
        const updatedReviews = reviewData.reviews.filter((review) => String(reviewId) !== String(review._id));

        reviewData.reviews = updatedReviews;
        return reviewData.save();
    }
}

module.exports = ReviewDataRepository;
