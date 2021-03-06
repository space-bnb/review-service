const mongoose = require('mongoose');

exports.ReviewSchema = mongoose.Schema({
    author: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 40,
    },
    date: Date,
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true,
    },
    content: {
        type: String,
        maxlength: 150,
        minlength: 1,
    },
});

const reviewDataSchema = mongoose.Schema({
    workspaceSlug: String,
    workspaceId: Number,
    total: {
        type: Number,
        default: 0,
    },
    avg: Number,
    reviewCount: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: [exports.ReviewSchema],
        default: [],
    },
    avg: {
        type: Number,
        default: 0,
    },
});

reviewDataSchema.pre('save', function (next) {
    this.total = this.reviews.reduce((total, { rating }) => total + rating, 0);
    this.reviewCount = this.reviews.length;
    this.avg = (this.total / this.reviewCount).toFixed(1);
    next();
});

exports.ReviewData = mongoose.model('ReviewData', reviewDataSchema);
