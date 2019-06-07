const express = require('express');

const router = express.Router({ mergeParams: true });
const { asyncErrorHandler, isReviewAuthor } = require('../middleware');
const { reviewCreate, reviewUpdate, reviewDestroy } = require('../controllers/reviews');

/* POST reviews Create */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT reviews Update */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE reviews Destroy */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(reviewDestroy));

module.exports = router;
