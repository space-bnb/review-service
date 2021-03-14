const router = require('express').Router();
const mapUserToReview = require('../../middleware/mapUserToReview');
const ReviewRepository = require('./reviewRepository');
const { noReviews, serverError } = require('../../constants/httpResponses');

router.get('/:space', async (req, res) => {
    const repo = new ReviewRepository(req.params.space);
    try {
        const reviews = await repo.get();
        if (reviews.length === 0) return res.status(404).json({ message: noReviews });

        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

router.post('/:space', mapUserToReview, async (req, res) => {
    const repo = new ReviewRepository(req.params.space);
    try {
        const newReview = await repo.create(req.body);
        return res.status(201).json(newReview);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

router.put('/:space', mapUserToReview, async (req, res) => {
    const repo = new ReviewRepository(req.params.space);
    try {
        await repo.update(req.body);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

router.delete('/:space', mapUserToReview, async (req, res) => {
    const repo = new ReviewRepository(req.params.space);
    try {
        await repo.delete(req.body);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

module.exports = router;
