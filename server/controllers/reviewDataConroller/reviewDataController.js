const router = require('express').Router();
const ReviewDataRepository = require('./reviewDataRepository');
const { noReviewData, reviewDataNotCreated, serverError } = require('../../constants/httpResponses');

router.get('/:workspaceId', async (req, res) => {
    const repo = new ReviewDataRepository(req.params.workspaceId);
    try {
        const reviewData = await repo.getById();
        if (!reviewData) return res.status(404).json({ message: noReviewData });

        return res.status(200).json(reviewData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: serverError });
    }
});

router.post('/', async (_req, res) => {
    const repo = new ReviewDataRepository();
    try {
        const reviewData = await repo.create();
        if (!reviewData) return res.status(400).json({ message: reviewDataNotCreated });

        return res.status(201).json(reviewData);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

router.delete('/:workspaceId', async (req, res) => {
    const repo = new ReviewDataRepository(req.params.workspaceId);
    try {
        await repo.delete();
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

module.exports = router;
