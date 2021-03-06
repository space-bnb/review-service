const router = require('express').Router();
const ReviewDataRepository = require('./reviewDataRepository');
const { noReviewData } = require('../../constants/httpResponses');

router.get('/:workspaceId', async (req, res) => {
    const repo = new ReviewDataRepository(req.params.workspaceId);
    try {
        const reviewData = await repo.getById();

        if (!reviewData) return res.status(404).json({ message: noReviewData });
        return res.status(200).json(reviewData);
    } catch (error) {
        console.log('ERROR in reviewDataController /:workspaceId', error);
    }
});

module.exports = router;
