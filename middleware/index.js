const Review = require('../models/review');

module.exports = {
    // Handle the asynchronous functions in routes
    asyncErrorHandler: fn => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    },

    // Check if current user is the author of the review
    isReviewAuthor: async (req, res, next) => {
        const review = await Review.findById(req.params.review_id);
        if (review.author.equals(req.user._id)) {
            return next();
        }
        req.session.error = 'Bye bye';
        return res.redirect('/');
    },
};
