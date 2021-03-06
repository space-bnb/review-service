const { ReviewData } = require('../../db/models/Review');

class ReviewDataRepository {
    constructor(workspaceId) {
        this.workspaceId = workspaceId;
    }

    getById() {
        return ReviewData.findOne({ workspaceId: this.workspaceId }).select({
            _id: 0,
            avg: 1,
            reviewCount: 1,
        });
    }
}

module.exports = ReviewDataRepository;
