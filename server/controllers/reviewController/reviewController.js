const router = require('express').Router();
const ReviewRepository = require('./reviewRepository');
const { noReviews, serverError } = require('../../constants/httpResponses');

router.get('/:workspaceId', async (req, res) => {
    const repo = new ReviewRepository(req.params.workspaceId);
    try {
        const reviews = await repo.get();
        if (reviews.length === 0) return res.status(404).json({ message: noReviews });

        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

module.exports = router;
