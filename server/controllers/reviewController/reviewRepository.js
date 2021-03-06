const { ReviewData } = require('../../db/models/Review');

class ReviewRepository {
    constructor(workspaceId) {
        this.workspaceId = workspaceId != null ? workspaceId : null;
    }

    async get() {
        const reviewData = await ReviewData.findOne({ workspaceId: this.workspaceId });
        return reviewData.reviews;
    }
}

module.exports = ReviewRepository;
