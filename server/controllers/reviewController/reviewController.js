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

router.post('/:workspaceId', async (req, res) => {
    const repo = new ReviewRepository(req.params.workspaceId);
    try {
        const newReview = await repo.create(req.body);
        return res.status(201).json(newReview);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: serverError });
    }
});

router.put('/:workspaceId', async (req, res) => {
    const repo = new ReviewRepository(req.params.workspaceId);
    try {
        const updatedReview = await repo.update(req.body);
        return res.status(200).json(updatedReview);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

router.delete('/:workspaceId', async (req, res) => {
    const repo = new ReviewRepository(req.params.workspaceId);
    try {
        await repo.delete(req.body.reviewId);
        return res.status(204).end();
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

module.exports = router;
