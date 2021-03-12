const router = require('express').Router();
const mapUserToReview = require('../../middleware/mapUserToReview');
const createReviewValidation = require('../../middleware/createReviewValidation');
const updateReviewValidation = require('../../middleware/updateReviewValidation');
const deleteReviewValidation = require('../../middleware/deleteReviewValidation');
const ReviewRepository = require('./reviewRepository');
const { validationResult } = require('express-validator');
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

router.post('/:space', mapUserToReview, createReviewValidation, async (req, res) => {
    const repo = new ReviewRepository(req.params.space);
    try {
        const validation = validationResult(req);
        const errorsPresent = !validation.isEmpty();
        if (errorsPresent) return res.status(400).json({ error: validation.array() });

        const newReview = await repo.create(req.body);
        return res.status(201).json(newReview);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

router.put('/:space', mapUserToReview, updateReviewValidation, async (req, res) => {
    const repo = new ReviewRepository(req.params.space);
    try {
        const validation = validationResult(req);
        const errorsPresent = !validation.isEmpty();
        if (errorsPresent) return res.status(400).json({ error: validation.array() });

        await repo.update(req.body);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

router.delete('/:space', mapUserToReview, deleteReviewValidation, async (req, res) => {
    const repo = new ReviewRepository(req.params.space);
    try {
        const validation = validationResult(req);
        const errorsPresent = !validation.isEmpty();
        if (errorsPresent) return res.status(400).json({ error: validation.array() });

        await repo.delete(req.body);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

module.exports = router;
