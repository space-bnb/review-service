// const { ReviewData } = require('../../db/models/Review');
const Review = require('../../db/models/Review');
// const Author = require('../../db/models/Author');
const { fn, col } = require('sequelize');

class ReviewDataRepository {
    constructor(space) {
        this.space = space != null ? space : null;
    }

    // getById() {
    //     if (this.workspaceId != null) return ReviewData.findOne({ workspaceId: this.workspaceId });
    // }

    getBySpace() {
        console.log('space', this.space);
        if (this.space != null)
            return Review.findAll({
                where: { space: this.space },
                attributes: [
                    [fn('count', col('id')), 'reviewCount'],
                    [fn('avg', col('rating')), 'avg'],
                ],
            });
    }

    // getByIdAndShape() {
    //     if (this.workspaceId != null)
    //         return ReviewData.findOne({ workspaceId: this.workspaceId }).select({ _id: 0, avg: 1, reviewCount: 1 });
    // }

    // delete() {
    //     if (this.workspaceId != null) return ReviewData.findOneAndRemove({ workspaceId: this.workspaceId });
    // }

    // async create() {
    //     const latestRecord = await ReviewData.find().limit(1).sort({ $natural: -1 });
    //     if (latestRecord.length === 0) return ReviewData.create({ workspaceId: 1, workspaceSlug: `workspace-1` });

    //     const workspaceId = latestRecord[0].workspaceId + 1;
    //     return ReviewData.create({ workspaceId, workspaceSlug: `workspace-${workspaceId}` });
    // }
}

module.exports = ReviewDataRepository;
